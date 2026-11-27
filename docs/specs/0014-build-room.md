# 0014. Build room

**Date**: 2026-11-27
**Status**: Accepted

## Summary

An interactive IDE style simulation replaces the four "How I work with you" cards (and the spec 0012 step illustrations). A visitor picks an example idea and watches one feature go through the AI Blueprint loop (https://ai-blueprint.dev/), which Samuel pointed to as how they work: spec, build, prove, land.

## Requirements

- **AC-1**: three AI app ideas (support assistant, invoice reader, voice booking agent); picking one restarts the run; play, pause, replay and a faster speed work.
- **AC-2**: the loop column shows `/feature`, `/implement`, `/check` and `/complete` with a plain line and a status each; setup is shown as done once.
- **AC-3**: "Watch" runs by itself; any review click switches to "You review", which waits at each gate. The visitor can add one extra requirement to the spec, approve it, then approve or send back each change.
- **AC-4**: one change per idea has a gap. If it is approved as is, its check fails and the run returns to build for the fix. Nothing lands until the visitor clicks "Approve and land". After the checks pass, "Try it" shows example answers. The idea action opens an email prefilled with the chosen idea.
- **AC-5 (Honesty)**: labelled a simulation, "not a live system or a real client", answers labelled as examples, with the workflow credited and linked; no counters, figures or time frames.
- **AC-6**: runs only while on screen and the tab is visible; with reduced motion there is no timer and the run moves only when the visitor clicks; no JavaScript shows it landed.
- **AC-7**: three columns from 1024 pixels, tabs below (workspace first); no horizontal scroll; text at least 4.5 to 1 in both themes.

## Checks, 2026-11-27

Reduced motion, 768 pixels and keyboard use were checked in headless Chrome. Fixed: timer controls are hidden under reduced motion; keyboard focus stays in the workspace after a review button disappears; the closed phone menu can no longer be tabbed into and the open one keeps focus and returns it; focused controls clear the sticky header; standalone links are at least 24 pixels; `/work` and `/lab` no longer skip a heading level. Not tested: real devices, screen readers, speed.

## Follow-up

- [ ] Pages other than home have no navigation menu below desktop width (`WorkShell` has no menu button).

- [x] Samuel confirmed on 2026-11-27 that the loop matches how they work.
- [ ] Code in the panel is illustrative; swap in real snippets if wanted.

## Placement

Directly after the employer strip, before the build catalog. Content in `src/content/buildRoom.ts`, run logic in `src/components/useBuildRun.ts`, component in `src/components/BuildRoom.tsx`.
