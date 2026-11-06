---
name: a7studio-portfolio-design-system
source: design/code.html and docs/specs/0001-portfolio-product-lab.md
character: "An editorial portfolio with a near black canvas, luminous green accents, monumental outlined typography, restrained technical grids, orbital motifs, and a kinetic project wordmark strip. Its composition follows the supplied A7Studio reference while its copy stays strictly within verified portfolio facts."
tokens: "CSS custom properties in src/styles.css are the source of truth for visual values."
contrast: "WCAG contrast for body on canvas is 12.3:1, ink on canvas is 17.5:1, muted on canvas is 7.3:1, on accent on accent is 11.9:1, and accent control borders on raised surface are 12:1."
---

# Design Language

## Design Principles

- Let accurate project names and links carry the story; do not fill gaps with invented biography or metrics.
- Use generous negative space, editorial type scale, and precise labels to make this one page feel calm and intentional.
- Reserve the green signal for navigation emphasis, links, and concise technical details.

## Brand

A7Studio uses a compact A7.Studio wordmark, a near black canvas, luminous green accents, fine grids, orbital marks, outlined display type, and an animated project strip. The tone is independent, curious, and direct.

## Color

Near black surfaces, pale primary copy, muted lavender gray supporting text, and one luminous green accent. The canonical color tokens are in `src/styles.css`.

## Typography

Use Space Grotesk for the hero, section, project, lab, navigation, and body copy so the portfolio is easy to scan. Use DM Mono for small technical labels, dates, and technology metadata. Keep display type open and readable; use weight, size, and spacing to create hierarchy rather than switching to a decorative title font.

## Spacing

Build from a four pixel base and eight pixel rhythm, with generous section spacing. Keep all component gaps and padding on the scale defined in `src/styles.css`.

## Layout

Use one centered content frame, an oversized introduction with a restrained orbital visual, an editorial project strip, an ordered work list, a three card lab grid, and a direct contact panel. At medium widths stack the work and lab columns. On small screens keep the menu compact and the cards single column.

## Components

Use fine neutral borders, small corner radii, and restrained motion. Cards are static content, not fake links. Provide a visible link only when its destination is confirmed.

## Work and case studies

`/work` shows a cover grid with category filters. Each story page has a header (company line, outcome, role, category, stack), numbered chapters (Brief, My part, The build, Result), a next project link, and a contact banner. Screens render only when a story is marked `screensCleared`; otherwise a typographic cover uses the project short name. Styles live under `WORK INDEX AND CASE STUDIES` in `src/styles.css`. See spec 0003.

## Recruiter first home (spec 0004)

The home page reads in this order: hero (title, availability pill, Download CV, Contact), employer strip with one stack line, four story tiles with a status pill, dated experience timeline, Now cards, two offers, contact. Status pills (`work-status`) use one label per project: Employer work, Live, Company closed, or Side product, paused. The timeline (`timeline`, `timeline-row`) and Now cards (`now-card`) reuse the existing tokens. No performance figures appear anywhere, and the CV is a download, not a modal.

## Lab (spec 0005)

The Lab reuses the work components: `work-tiles`, `work-tile`, `work-status` (status pill: Planned, Building, Live, Paused), `story-*` chapter styles and the `timeline` rows for the dated build log. It is invisible until an entry is published: no route output, nav link, home section or sitemap line. Revenue renders only as "currency amount period, as of date" from a complete figure Samuel supplies. Screens appear only when `screensCleared` is true and never show personal job data.

## Navigation

Use native anchors to the work, product lab, and contact sections. The same anchors remain visible in a compact bottom bar on narrow screens. Do not intercept native fragment behavior or force smooth scrolling.

## Forms

This site has no forms.

## Feedback

Use hover color shifts and keyboard focus rings to show interactivity without adding unsupported status indicators.

## Loading States

Not applicable. The public portfolio content is static and included with the page.

## Empty States

Not applicable. Every scoped work and lab entry is represented; unsupported details remain absent.

## Error States

Not applicable. The page makes no API calls, does not load remote fonts or images, and has no visitor input.

## Responsive Design

Use one column below 640 pixels, a two column lab at medium widths, and a three column lab on wide screens. Keep body type comfortable, section anchors at least 44 pixels tall, and decorative line art behind content.

## Accessibility

Use semantic header, nav, main, sections, lists, and footer. Maintain high contrast for readable content, visible keyboard focus, a skip link, native anchor behavior, and reduced motion support. Hide decorative CSS art from assistive technology.

## Content Guidelines

Only display details and destinations confirmed by the portfolio spec and existing worktree. Keep missing roles, descriptions, project statuses, URLs, experience claims, and metrics absent. Label Good Call as an upcoming personal finance app until more details are confirmed.
