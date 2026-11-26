# 0013. Page background motion

**Date**: 2026-11-27
**Status**: Accepted

## Summary

More background motion in the spirit of scrums.com: stars drift across the whole home page with a little depth on scroll and mouse movement, a spiral of blue, cyan and white points turns slowly behind the hero and fades as you scroll, and short light beams run along the hero mesh lines.

## Requirements

- **AC-1**: one decorative canvas (`src/components/SpaceBackground.tsx`), behind all content, ignores pointer events, hidden from screen readers, no dependency.
- **AC-2**: fewer points on phones; the loop stops in a hidden tab.
- **AC-3**: with reduced motion the canvas draws one still frame and the beams stay hidden.
- **AC-4**: follows the theme; fainter on the cloud theme and on phones.
- **AC-5**: no horizontal scroll, menu and header stay above it.
