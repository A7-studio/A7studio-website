# 0009. Midnight, lime and motion

**Date**: 2026-11-27
**Status**: Accepted

## Summary

The site moves to Midnight Navy and Cloud White with an Electric Lime accent, and gains light motion so it is fun to use: a rotating hero phrase, scroll reveals, a cursor spotlight on cards, a small tilt on work covers, a magnetic main button and a moving employer strip. It replaces the paper and cornflower palette from 2026-11-27. No dependency was added, and every effect is off for visitors who ask for reduced motion.

## Context

Samuel wants a modern, memorable site that founders enjoy, inspired by the feel of napilistudios.co (dark, cinematic, scroll driven) without copying it. Spec 0008 made the home page a pitch; this spec gives the pitch its look.

## Requirements

- **AC-1 (Palette)**: navy theme is the default (`#0b1530` background, `#f4f7fb` headings). Cloud theme is `#f4f7fb` with navy text. Lime `#c6ff3d` is used only as a fill with navy text or as text on navy, never as text on white (1.1 to 1). In the cloud theme, accent text is a dark lime `#3f6b00` and hero accent words get a lime highlighter behind navy text.
- **AC-2 (Contrast)**: every visible text element on the home page is at least 4.5 to 1 (3 to 1 for large text) in both themes.
- **AC-3 (Hero motion)**: the hero rotates "AI-powered apps", "mobile apps", "payment systems", "web platforms" with a lime underline. All words share one grid cell, so the line never shifts. Screen readers hear "AI-powered apps" only.
- **AC-4 (Page motion)**: section headers and cards reveal on scroll with a short stagger; build and process cards get a cursor spotlight; work covers tilt slightly; the main hero button is magnetic; the employer strip scrolls slowly and pauses on hover. Pointer effects run only on a fine pointer.
- **AC-5 (Reduced motion and no JavaScript)**: with reduced motion, nothing moves and the hero shows "AI-powered apps". Without JavaScript all content is visible.
- **AC-6 (Focus)**: a lime focus ring with a canvas gap shows on every focused control.
- **AC-7 (Layout)**: no horizontal scroll and both hero buttons on the first screen at 375, 768 and 1280 pixels.

## Decision

Plain CSS plus a small hook (`src/components/Motion.tsx`) using IntersectionObserver and pointer events. Runner up: the Motion library, if richer animation is wanted later. No intro loader, because it delays the first screen.

## Follow-up

- [ ] The saved cloud theme still shows navy for a moment on load (an existing theme script issue). Fix with an inline theme script in the document head.
- [ ] Check reduced motion and a keyboard pass on a real device.
