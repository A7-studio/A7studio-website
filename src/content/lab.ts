import type { StoryImage } from '#/content/work'

export type LabStatus = 'Planned' | 'Building' | 'Live' | 'Paused'

export interface LabChapter {
  headline: string
  body: string
  images?: StoryImage[]
}

export interface LabLogEntry {
  /** ISO date, for example 2026-11-06. */
  date: string
  title: string
  body: string
}

/** Samuel supplies every field. Never estimated, projected, or derived. */
export interface LabRevenue {
  amount: string
  currency: string
  /** For example "per month" or "to date". */
  period: string
  /** ISO date the figure was true on. */
  asOf: string
}

export interface LabEntry {
  slug: string
  name: string
  status: LabStatus
  tagline: string
  /** ISO date of the last meaningful update. */
  updated: string
  tags?: string[]
  why?: LabChapter
  stack?: LabChapter
  learning?: LabChapter
  /** Newest first is applied when rendering. */
  log?: LabLogEntry[]
  /** Screens render only when true. Never show personal job data. */
  screensCleared?: boolean
  cover?: StoryImage
  revenue?: LabRevenue
  url?: string
}

/**
 * Published Lab entries. Everything in this file ships in the client bundle, so
 * only publish what is ready. Work in progress lives in `lab.drafts.ts`, which
 * no route imports. Career OS stays a draft until Samuel has designs and a plan:
 * moving its entry here is what publishes it.
 */
export const entries: LabEntry[] = []

export const publishedEntries: LabEntry[] = [...entries].sort((a, b) => latestDate(b).localeCompare(latestDate(a)))

export const hasLab = publishedEntries.length > 0
export const labSlugs = publishedEntries.map((entry) => entry.slug)

export function findLabEntry(slug: string) {
  return publishedEntries.find((entry) => entry.slug === slug)
}

export function nextLabEntry(slug: string) {
  const index = publishedEntries.findIndex((entry) => entry.slug === slug)
  return publishedEntries[(index + 1) % publishedEntries.length]
}

export function latestDate(entry: LabEntry) {
  const dates = [entry.updated, ...(entry.log ?? []).map((item) => item.date)]
  return dates.sort().at(-1) ?? entry.updated
}

export function sortedLog(entry: LabEntry) {
  return [...(entry.log ?? [])].sort((a, b) => b.date.localeCompare(a.date))
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-11-06" becomes "6 Nov 2026" without any timezone shift. */
export function formatLabDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

/** Renders only a complete figure. Returns undefined otherwise, never a placeholder. */
export function revenueLabel(revenue?: LabRevenue) {
  if (!revenue?.amount || !revenue.currency || !revenue.period || !revenue.asOf) return undefined
  return `${revenue.currency} ${revenue.amount} ${revenue.period}, as of ${formatLabDate(revenue.asOf)}`
}

/** Images may be shown only when the entry has been cleared. */
export function visibleLabImage(entry: LabEntry, image?: StoryImage) {
  return entry.screensCleared ? image : undefined
}
