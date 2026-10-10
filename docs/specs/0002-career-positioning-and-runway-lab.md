# 0002. Career positioning and Good Call lab refresh

**Date**: 2026-10-10
**Status**: Accepted

## Summary

This enhancement makes the A7Studio portfolio easier for recruiters to understand in one pass. It keeps the existing one page structure, but reduces title and description complexity, describes Samuel's contribution plainly, and replaces the A7Markets lab concept with Good Call, an upcoming personal finance app focused on better spending decisions.

## Requirements

- A recruiter can identify Samuel's role across mobile, frontend, fintech, and AI assisted product work without decoding product jargon.
- Selected work titles name the product or capability in plain language and avoid long stacked labels.
- Each selected work item uses concise copy that separates what the product is from what Samuel worked on.
- The Boya entry accurately includes Stripe KYC/KYB onboarding, Stripe integration, money movement work, double entry ledger fixes, ledger integrity, negative balance handling, and the business money market fund investment option.
- A7Markets is removed from the current lab presentation and scope.
- Good Call is presented as an upcoming personal finance app that helps people pause, understand trade offs, and improve spending decisions. The page must not invent Good Call features, metrics, status, or an outbound URL.
- Good Call's product direction is grounded in the behavioral loop `Pause / Decide / Spend / Reflect / Improve`, without requiring the portfolio page to explain the full product.
- Existing navigation, filters, contact actions, and static prerendering remain intact.
- The change does not add a backend, data store, external service, or new dependency.

## Decision

Use the existing typed static content in `src/routes/index.tsx` as the source of truth. Keep the page structure and visual system. Improve clarity through shorter titles, one sentence headlines, concise descriptions, and status labels that distinguish shipped work from upcoming lab work. Position Good Call as a decision support product rather than a generic budgeting tool.

## Content contract

For selected work, the title answers what was built, the company line answers where it was shipped, the headline gives the product area, and the description gives the contribution. Do not add a result, metric, role, project status, technology, or product feature unless it is already confirmed in the worktree or directly confirmed by Samuel.

For the lab, shipped or live work may have an outbound link when confirmed. Upcoming work may show only its name, type, and upcoming status. Good Call is confirmed as an upcoming personal finance app that aims to make spending decisions more deliberate and understandable. Do not turn the card into a feature inventory.

## Visual design

Keep the current A7Studio dark and light themes, section order, card layout, filters, and accessible static page behavior. Use the existing lab card visual language for Good Call, with a small behavioral loop cue alongside its status and product type. Do not add a new dashboard, interaction model, or explanatory section.

## Build plan

1. Rewrite selected work titles, headlines, descriptions, and tags for fast scanning while preserving confirmed project facts.
2. Update the Boya card and CV entry with the confirmed work areas.
3. Replace the A7Markets lab card with an upcoming Good Call personal finance app card and remove A7Markets wording from the current page.
4. Position Good Call around its spending decision thesis and show the behavioral loop as a compact visual cue.
5. Tighten the hero, supporting copy, and lab introduction so the page leads with role and product areas without dense proof claims.
6. Run the static content check and production build, then verify the rendered page against the recruiter scanning goal.

## Consequences

The page will communicate a smaller number of stronger facts, which makes it easier to scan and reduces the risk of overstating work. Good Call will have a clear product thesis without pretending that its full feature set or behavior is already built. Detailed project history, metrics, and implementation claims remain out of scope until they are confirmed.

## Follow-up

- Design the full Good Call product experience around low friction tracking, understandable trade offs, reflection, autonomy, and privacy before implementation begins.
- Add verified career dates, roles, and outcomes in a later content pass if they are needed for the CV and portfolio.
