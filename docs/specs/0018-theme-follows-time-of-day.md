# 0018. Theme follows the time of day

**Date**: 2026-11-28
**Status**: Accepted

## Summary

The site shows the paper (light) theme by day and the ink (dark) theme by night, using the clock on the visitor's device, so it works in any location. This replaces "paper by default" (spec 0015, AC-3).

## Requirements

- **AC-1**: light from 06:00 to 17:59 local time, dark from 18:00 to 05:59.
- **AC-2**: the right theme applies before first paint, and changes within about 30 seconds while a page stays open.
- **AC-3**: a click on the theme button wins until the next 06:00 or 18:00, then the clock takes over again.
- **AC-4**: themes saved by earlier versions are ignored. With blocked storage the clock still works; without JavaScript the light theme shows.

## Decision

Fixed hours rather than real sunrise and sunset, which would need the visitor's location and a permission prompt.
