import type { LabEntry } from '#/content/lab'

/**
 * Unpublished Lab entries. No route or component may import this file, so draft
 * text never reaches the client bundle. `check:static` fails the build if a draft
 * name or slug appears anywhere in the built output. To publish a draft, move its
 * entry into `entries` in `lab.ts`.
 */
export const drafts: LabEntry[] = []
