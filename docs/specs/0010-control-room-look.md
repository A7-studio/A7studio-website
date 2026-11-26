# 0010. Control room look

**Date**: 2026-11-27
**Status**: Accepted

## Summary

The home page takes the feel of scrums.com (a precise, space dark engineering look) with electric lime instead of their blue. It adds a huge thin headline, a slow particle sphere in the hero, a filterable build catalog, a drawn jobmigo product panel, numbered mono section labels and an employer logo row. Palette, motion rules and copy from specs 0008 and 0009 stay.

## Requirements

- **AC-1 (Palette)**: dark theme canvas `#03060f` with navy panels (`#0a1020`, `#0f1730`); cloud theme unchanged; lime only as a fill or as text on dark.
- **AC-2 (Hero)**: headline "AI-powered apps. Built." at a light weight; the pitch line with the rotating phrase under it; both actions visible on the first screen at 375, 768 and 1280 pixels.
- **AC-3 (Particle field)**: decorative canvas, hidden from screen readers, paused off screen and in hidden tabs, one still frame under reduced motion, follows the theme.
- **AC-4 (Build catalog)**: filter buttons All, AI apps, Mobile, Payments, Web with `aria-pressed`; each card shows a number, its kinds, an honest status (Shipped or Building) and proof links.
- **AC-5 (jobmigo panel)**: a drawn panel lists the working features and "Production deploy" as next, labelled as an illustration, not a screenshot. The real screenshot stays on `/jobmigo`.
- **AC-6 (Labels and rows)**: home sections are numbered `[01]`, `[02]` with CSS counters; employers show as a large muted logo row.
- **AC-7 (Quality)**: text contrast at least 4.5 to 1 in both themes; no horizontal scroll; no console errors.

## Decision

Plain canvas and CSS, no dependency. Lime replaces the reference site's blue so the look is ours, not a copy.

## Amendment, 2026-11-27: electric blue with a touch of lime

Dark canvas is now deep blue `#041236` with blue panels (`#071b4a`, `#0a2259`). Primary buttons are electric blue `#135bff` with white text (5.3 to 1); lime stays as the accent for "Built.", the rotating phrase, status dots, filters and labels. Buttons, the copy button and contact topics use a 4px radius. Revert this commit to go back to space black with lime buttons.
