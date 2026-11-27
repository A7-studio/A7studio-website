# 0017. Experience on its own page

**Date**: 2026-11-27
**Status**: Accepted

## Summary

The home page stops reading like a CV. The experience timeline and hiring card move to a new `/experience` page, and the learning cards move to the Lab. This changes spec 0006 (home order, learning on home) and spec 0008 (AC-5).

## Requirements

- **AC-1**: `/experience` is prerendered with its own title, description, canonical and sitemap line, and carries the hiring card and every role.
- **AC-2**: the learning cards and the paused line are on `/lab` under "What I am learning.", with dated notes below when there are any. The home page no longer shows notes.
- **AC-3**: the home page keeps the employer row with a "See my full experience" link. The row keeps the id `experience`, so old `/#experience` links still land there.
- **AC-4**: "Experience" in the header and menu opens `/experience`.
- **AC-5**: `check:static` fails if the timeline or learning block returns to the home page.

## Follow-up

- [ ] The Lab learning lead still says "I am applying for senior roles". Samuel to confirm or reword it.
