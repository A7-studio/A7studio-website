# 0012. Process illustrations

**Date**: 2026-11-27
**Status**: Accepted

## Summary

Each "How I work with you" step gets a small animated illustration of the same example founder project the hero editor shows (an assistant that answers customers from their own docs): a short founder and Samuel chat, a plan checklist, a commit list with a preview link, and a deploy terminal. The contact section shows an example brief filling in. Lines appear one by one when the card scrolls into view.

## Requirements

- **AC-1**: illustrations are decorative and hidden from screen readers; the step text stays the real content.
- **AC-2**: with reduced motion or no JavaScript, every line shows at once.
- **AC-3**: the example is generic and clearly an illustration; no real client, figure or result is implied.
- **AC-4**: text in the illustrations meets 4.5 to 1 in both themes.

Content lives in `src/content/process.ts` (`demo` on each step) and `BRIEF_DEMO` in `src/routes/index.tsx`.
