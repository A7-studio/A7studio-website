# 0014. Build room

**Date**: 2026-11-27
**Status**: Accepted

## Summary

An interactive IDE style simulation replaces the four "How I work with you" cards (and the spec 0012 step illustrations). A visitor picks an example idea and watches agents draft, Samuel review (with one change sent back), and a preview build up, then approves it as the founder. It borrows the idea of showing AI plus human review as moving work, in this site's own look and words.

## Requirements

- **AC-1**: three example ideas (support assistant, tipping app, booking app); picking one restarts the run; play, pause and replay work.
- **AC-2**: four process steps from `process.ts` stay readable as text and the current one is marked; phones show the current step only.
- **AC-3**: each task passes drafting, review (intent, architecture, security, tests) and signature; one per idea is sent back once with a note; reviewed features appear in the preview.
- **AC-4**: "Approve as founder" enables only when all tasks are reviewed; the idea action opens an email prefilled with the chosen idea.
- **AC-5 (Honesty)**: labelled a simulation and "not a live system or a real client"; no counters, figures or time frames.
- **AC-6**: runs only while on screen and the tab is visible; reduced motion and no JavaScript show the finished run.
- **AC-7**: three columns from 1024 pixels, tabs below; no horizontal scroll; text at least 4.5 to 1 in both themes.

## Follow-up

- [ ] Samuel to confirm the panel matches how they build with AI agents and review the output.
- [ ] Code in the panel is illustrative; swap in real snippets if wanted.

## Placement

Directly after the employer strip, before the build catalog. Content in `src/content/buildRoom.ts`, component in `src/components/BuildRoom.tsx`.
