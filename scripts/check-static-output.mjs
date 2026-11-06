import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const homeHtml = await readFile(new URL('../dist/client/index.html', import.meta.url), 'utf8')
const workIndexHtml = await readFile(new URL('../dist/client/work/index.html', import.meta.url), 'utf8')
const storySlugs = ['boya', 'alvin', 'kakitoo', 'telkom', 'syntax']
const storyHtml = await Promise.all(
  storySlugs.map((slug) => readFile(new URL(`../dist/client/work/${slug}/index.html`, import.meta.url), 'utf8')),
)
// Project copy moved from the home page to /work and the story pages (spec 0003), so check them together.
const html = [homeHtml, workIndexHtml, ...storyHtml].join('\n')
const stylesheetPath = homeHtml.match(/href="([^"]+\.css)"/)?.[1]
assert.ok(stylesheetPath, 'Prerendered page does not include its stylesheet')
const css = await readFile(new URL(`../dist/client${stylesheetPath}`, import.meta.url), 'utf8')

// Verify the required sections (spec 0004) are present
const expectedSections = [
  'A7Studio',
  'Samuel Gichu',
  'Selected work',
  'Where I have worked',
  'What I owned, and where.',
  'Job hunting and sharpening the saw.',
  'Work with me',
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
]

for (const project of expectedProjects) {
  assert.ok(html.includes(project), `Prerendered page is missing project: ${project}`)
}

const expectedCareerCopy = [
  'embeddable React finance widgets',
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
  'Stripe Connect',
  'Temporal',
  'Gavtech Solutions',
  'Available now',
  '11 November 2026',
]

for (const phrase of expectedCareerCopy) {
  assert.ok(html.includes(phrase), `Prerendered page is missing career detail: ${phrase}`)
}

// Spec 0004: retired claims must not return
const homeText = [homeHtml, workIndexHtml, ...storyHtml].join('\n')
for (const retired of [/\b(?:30|35|40|50|60|85)\s?%/, /Valuencer/i, /Senior Product Engineer/i, /A7Markets/i, /Career OS/i, /Start a Project/]) {
  assert.ok(!retired.test(homeText), `Prerendered pages contain retired copy: ${retired}`)
}
assert.match(homeHtml, /Senior Software Engineer/, 'Home page is missing the title')
const { existsSync: cvExists } = await import('node:fs')
assert.ok(cvExists(new URL('../public/samuel-gichu-cv.pdf', import.meta.url)), 'CV file missing: public/samuel-gichu-cv.pdf')
assert.match(homeHtml, /href="\/samuel-gichu-cv\.pdf"/, 'Home page does not link the CV')

// Verify metadata & links
assert.match(homeHtml, /A7Studio\.dev — Samuel Gichu/)
assert.match(homeHtml, /rel="canonical" href="https:\/\/a7studio\.dev\/"/)
assert.match(html, /https:\/\/kakitoo\.com/)
assert.match(html, /https:\/\/synt\.ax\//)
assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.tkashapp&amp;hl=en/)
assert.match(html, /https:\/\/chupachap\.co\.ke/)
assert.match(html, /https:\/\/alvin\.finance/)
assert.match(html, /https:\/\/www\.boyahq\.com/)
assert.match(html, /https:\/\/www\.linkedin\.com\/in\/samuel-gichu-a29695b9\//)
assert.match(homeHtml, /hello@a7studio\.io/)
assert.match(css, /prefers-reduced-motion/)

// Case study pages (spec 0003)
for (const [index, slug] of storySlugs.entries()) {
  const page = storyHtml[index]
  assert.match(page, new RegExp(`rel="canonical" href="https://a7studio\\.dev/work/${slug}"`), `Missing canonical for /work/${slug}`)
  assert.match(page, /<h1/, `Story /work/${slug} has no h1`)
}
assert.match(workIndexHtml, /rel="canonical" href="https:\/\/a7studio\.dev\/work"/, 'Missing canonical for /work')

// Clearance guard: images may only ship when a story is marked cleared (AC-3, AC-4)
const { workItems } = await import('../src/content/work.ts')
const { existsSync } = await import('node:fs')
for (const item of workItems) {
  if (!item.story) continue
  const images = [item.story.cover, ...[item.story.brief, item.story.myPart, item.story.build, item.story.result].flatMap((chapter) => chapter?.images ?? [])].filter(Boolean)
  if (!item.story.screensCleared) {
    assert.equal(images.length, 0, `${item.id} lists images but screensCleared is false`)
    assert.ok(!/<img /.test(storyHtml[storySlugs.indexOf(item.id)] ?? ''), `${item.id} renders an image without clearance`)
    continue
  }
  for (const image of images) {
    assert.ok(image.alt && image.alt.trim().length > 0, `${item.id} image ${image.src} has no alt text`)
    assert.ok(image.width > 0 && image.height > 0, `${item.id} image ${image.src} has no dimensions`)
    assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), `${item.id} image file missing: ${image.src}`)
  }
}

// Every story must be prerendered and listed in the sitemap (AC-5, AC-6)
const sitemap = await readFile(new URL('../dist/client/sitemap.xml', import.meta.url), 'utf8')
for (const loc of ['', '/work', ...workItems.filter((item) => item.story).map((item) => `/work/${item.id}`)]) {
  assert.ok(sitemap.includes(`<loc>https://a7studio.dev${loc}`), `Sitemap is missing ${loc || '/'}`)
}
assert.deepEqual(
  workItems.filter((item) => item.story).map((item) => item.id).sort(),
  [...storySlugs].sort(),
  'Story slugs in content do not match the pages this check expects',
)

// Lab gate (spec 0005): unpublished entries must not leak, published ones must be complete
const labModule = await import('../src/content/lab.ts')
const { drafts } = await import('../src/content/lab.drafts.ts')
const { readdir } = await import('node:fs/promises')
const distFiles = (await readdir(new URL('../dist/client/', import.meta.url), { recursive: true }))
  .filter((file) => /\.(html|xml|txt|json|js|css|map)$/.test(file))
const distText = (
  await Promise.all(distFiles.map((file) => readFile(new URL(`../dist/client/${file}`, import.meta.url), 'utf8')))
).join('\n').toLowerCase()
// Drafts must not appear anywhere in the built output, JavaScript bundles included
for (const draft of drafts) {
  for (const needle of [draft.name, draft.slug]) {
    assert.ok(!distText.includes(needle.toLowerCase()), `Draft lab entry leaks into built output: ${needle}`)
  }
}
// No route or component may import the drafts file
const { execSync } = await import('node:child_process')
const importers = execSync("grep -rlE \"(from|import\\()\\s*['\\\"][^'\\\"]*lab\\.drafts\" src || true", { cwd: new URL('..', import.meta.url), encoding: 'utf8' })
  .split('\n')
  .filter((file) => file && !file.endsWith('lab.drafts.ts'))
assert.deepEqual(importers, [], `Drafts file is imported by app code: ${importers.join(', ')}`)

for (const entry of labModule.entries) {
  const page = await readFile(new URL(`../dist/client/lab/${entry.slug}/index.html`, import.meta.url), 'utf8').catch(() => '')
  assert.ok(page, `Published lab entry has no page: /lab/${entry.slug}`)
  assert.match(page, new RegExp(`rel="canonical" href="https://a7studio\\.dev/lab/${entry.slug}"`), `Missing canonical for /lab/${entry.slug}`)
  assert.ok(sitemap.includes(`<loc>https://a7studio.dev/lab/${entry.slug}`), `Sitemap is missing /lab/${entry.slug}`)
  if (entry.revenue) {
    for (const field of ['amount', 'currency', 'period', 'asOf']) {
      assert.ok(entry.revenue[field], `${entry.slug} revenue is missing ${field}`)
    }
  }
  const labImages = [entry.cover, ...[entry.why, entry.stack, entry.learning].flatMap((chapter) => chapter?.images ?? [])].filter(Boolean)
  if (!entry.screensCleared) {
    assert.equal(labImages.length, 0, `${entry.slug} lists images but screensCleared is false`)
    assert.ok(!/<img /.test(page), `${entry.slug} renders an image without clearance`)
  } else {
    for (const image of labImages) {
      assert.ok(image.alt?.trim(), `${entry.slug} image ${image.src} has no alt text`)
      assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), `${entry.slug} image file missing: ${image.src}`)
    }
  }
}
if (labModule.publishedEntries.length === 0) {
  assert.ok(!existsSync(new URL('../dist/client/lab', import.meta.url)), 'No entries are published but /lab was prerendered')
  assert.ok(!/href="\/lab/.test(homeHtml), 'No entries are published but the home page links to /lab')
  assert.ok(!sitemap.includes('/lab'), 'No entries are published but the sitemap lists /lab')
}

console.log('Static portfolio content, sections, and metadata checks passed.')
