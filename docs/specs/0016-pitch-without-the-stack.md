# 0016. A pitch, without the tech stack

**Date**: 2026-11-27
**Status**: Accepted

## Summary

The home page speaks to founders and employers about what Samuel can do for them, not which tools they use. The hero describes the offer (an idea or slow manual task turned into an app, with approval at each step), the tool pills and the "Stack I ship with" line are gone, and the build cards, principles and jobmigo case study are in plain words. This reverses the earlier requests to lead the intro with Flutter and to list the stack.

## Requirements

- **AC-1**: the hero intro leads with what the visitor gets, then names Samuel and their proof. The voice stays "I".
- **AC-2**: hero chips list benefits (a plan you approve first, progress you can try, checked before launch, you own the code).
- **AC-3**: no tool names in the hero text, build cards or case study. `check:static` fails if one returns. The hero code editor and build room still show example code.
- **AC-4**: tools stay where they are proof: experience, work stories, `/jobmigo`, and hidden search data (keywords and job title).
- **AC-5**: no new figures, prices, time frames or clients.
- **AC-6**: the hero intro names Boya, Alvin, mb96 and SYNTAX, not BeatBnk, which has closed. BeatBnk stays in the employer row, principles and experience.

## Follow-up

- [ ] Decide whether the experience timeline and learning section, which still read like a CV, move off the home page.
- [ ] Samuel to confirm "you own the code" is a promise they want to make.
