# 0011. Shine, code and collaboration

**Date**: 2026-11-27
**Status**: Accepted

## Summary

Cyan replaces lime as the accent next to electric blue, and the hero now shows the story in motion: a glass editor types a short AI app snippet, a terminal shows evaluation tests passing and a preview going live, and two cursors ("Founder" and "Samuel") work on the same line. A slow aurora of blue and cyan light sits behind the hero, panels are frosted glass, buttons and catalog cards get a sheen on hover, the How I work steps fill a progress bar as they appear, and an example commit ticker runs under the employer row.

## Requirements

- **AC-1 (Accent)**: accent text is cyan `#5ce1ff` on dark (11.9 to 1) and `#0b6a85` on cloud (5.7 to 1); fills and signals are `#22d3ee` with navy text; buttons stay electric blue `#135bff`.
- **AC-2 (Hero editor)**: decorative and hidden from screen readers; shows the finished code without JavaScript or with reduced motion; shown from 1024 pixels wide, hidden below so phones keep both actions on the first screen.
- **AC-3 (Honesty)**: the code is an illustration of a founder's AI idea (answer customers from their own docs: retrieve, answer, test that answers come from the docs), not a claim about real results; the ticker starts with "example log". Changed from a jobmigo snippet on 2026-11-27.
- **AC-4 (Motion limits)**: aurora, cursors, caret, sheen and progress bars stop under reduced motion.
- **AC-5 (Quality)**: every visible text element at least 4.5 to 1 in both themes; no horizontal scroll; no console errors.

## Not done

The faint "code rain" behind the whole page was left out: with the aurora and the editor, it made the hero busy.
