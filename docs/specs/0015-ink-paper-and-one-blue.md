# 0015. Ink, paper and one blue

**Date**: 2026-11-27
**Status**: Accepted

## Summary

The palette moves away from the all blue look to ink black, cream paper and one blue, taking its cue from AI Blueprint. Paper is now the default theme. Code panels (hero editor, build room, jobmigo panel) stay ink black in both themes. This replaces the colours in specs 0010 and 0011.

## Requirements

- **AC-1**: paper theme canvas `#f5f6f3`, ink text `#121817`, accent text `#0b43ba`; ink theme canvas `#121817`, cream text `#f5f6f3`, accent `#76a8ff`; buttons `#155eef` with white text.
- **AC-2**: no coloured pools behind sections; a faint blue grid and a very light hero glow remain.
- **AC-3**: paper is shown unless the visitor saved the ink theme; no flash on load.
- **AC-4**: visible text at least 4.5 to 1 in both themes.

Amber stays only for the Founder label and review notes, and WhatsApp keeps its green.
