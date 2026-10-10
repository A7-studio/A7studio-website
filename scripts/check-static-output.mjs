import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const html = await readFile(new URL('../dist/client/index.html', import.meta.url), 'utf8')
const stylesheetPath = html.match(/href="([^"]+\.css)"/)?.[1]
assert.ok(stylesheetPath, 'Prerendered page does not include its stylesheet')
const css = await readFile(new URL(`../dist/client${stylesheetPath}`, import.meta.url), 'utf8')

// Verify all 6 required sections are present
const expectedSections = [
  'A7Studio',
  'Samuel Gichu',
  'Selected Work',
  'In The Lab',
  'Work With Me',
  'About Samuel',
  'Contact',
]

for (const section of expectedSections) {
  assert.ok(html.includes(section), `Prerendered page is missing section or brand: ${section}`)
}

// Verify key projects
const expectedProjects = [
  'Boya',
  'BeatBnk',
  'alvin.finance',
  'Chupachap',
  'Telkom',
  'SYNTAX',
  'mb96',
  'Kakitoo',
  'Good Call',
]

for (const project of expectedProjects) {
  assert.ok(html.includes(project), `Prerendered page is missing project: ${project}`)
}

const expectedCareerCopy = [
  'reduce development time by 40%',
  'reduce production bugs by 60%',
  'embeddable React finance widgets',
  '85% code coverage',
  'Sui Blockchain SDK',
  'WooCommerce integration',
  '500+ item product catalog',
  'anonymous USSD tipping',
  'KAKITOO ID privacy system',
  '*835*77#',
  'kiDOGO',
  'boost their income securely and anonymously',
  'Liquor Delivery E-commerce Platform',
  'https://chupachap.co.ke',
  'Giraffe Spotter',
  'fur pattern matching',
  'Stripe Integration',
  'Formance',
  'Temporal Workflows',
]

for (const phrase of expectedCareerCopy) {
  assert.ok(html.includes(phrase), `Prerendered page is missing career detail: ${phrase}`)
}

// Verify metadata & links
assert.match(html, /A7Studio\.dev — Samuel Gichu/)
assert.match(html, /rel="canonical" href="https:\/\/a7studio\.dev\/"/)
assert.match(html, /https:\/\/kakitoo\.com/)
assert.match(html, /https:\/\/synt\.ax\//)
assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.tkashapp&amp;hl=en/)
assert.match(html, /https:\/\/chupachap\.co\.ke/)
assert.match(html, /https:\/\/alvin\.finance/)
assert.match(html, /https:\/\/www\.boyahq\.com/)
assert.match(html, /https:\/\/www\.linkedin\.com\/in\/samuel-gichu-a29695b9\//)
assert.match(html, /hello@a7studio\.io/)
assert.match(css, /prefers-reduced-motion/)

console.log('Static portfolio content, sections, and metadata checks passed.')
