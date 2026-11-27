# 0014. Build room

**Date**: 2026-11-27
**Status**: Accepted

## Summary

An interactive IDE style simulation replaces the four "How I work with you" cards (and the spec 0012 step illustrations). A visitor picks an example idea and watches one feature go through the AI Blueprint loop (https://ai-blueprint.dev/), which Samuel pointed to as how they work: spec, build, prove, land.

## Requirements

- **AC-1**: three example ideas; picking one restarts the run; play, pause and replay work.
- **AC-2**: the loop column shows `/feature`, `/implement`, `/check` and `/complete` with a plain line and a status each; setup (talk and plan) is shown as done once.
- **AC-3**: the spec shows done-whens and can be approved by the visitor (it carries on by itself after a short wait); changes arrive one at a time and each is reviewed, one per idea sent back once; every done-when is checked off.
- **AC-4**: nothing lands until the visitor clicks "Approve and land"; the idea action opens an email prefilled with the chosen idea.
- **AC-5 (Honesty)**: labelled a simulation, "not a live system or a real client", with the workflow credited and linked; no counters, figures or time frames.
- **AC-6**: runs only while on screen and the tab is visible; reduced motion shows the finished run waiting for approval; no JavaScript shows it landed.
- **AC-7**: three columns from 1024 pixels, tabs below (workspace first); no horizontal scroll; text at least 4.5 to 1 in both themes.

## Follow-up

- [ ] Samuel to confirm the loop and wording match how they work.
- [ ] Code in the panel is illustrative; swap in real snippets if wanted.

## Placement

Directly after the employer strip, before the build catalog. Content in `src/content/buildRoom.ts`, component in `src/components/BuildRoom.tsx`.
