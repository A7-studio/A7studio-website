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
  /** A product with its own page (for example `/jobmigo`). It then has no `/lab/<slug>` page (spec 0006). */
  path?: string
  /** A public code repository, shown as "View the code". */
  repo?: string
}

/** A short dated learning note, shown newest first (spec 0006, AC-7). */
export interface LabNote {
  id: string
  /** ISO date, for example 2026-11-12. */
  date: string
  title: string
  topic: string
  body: string
}

/**
 * Published Lab entries. Everything in this file ships in the client bundle, so
 * only publish what is ready. Work in progress lives in `lab.drafts.ts`, which
 * no route imports. Career OS stays a draft until Samuel has designs and a plan:
 * moving its entry here is what publishes it.
 */
export const entries: LabEntry[] = [
  {
    slug: 'jobmigo',
    name: 'jobmigo',
    status: 'Building',
    tagline: 'An AI powered job search and application assistant.',
    updated: '2026-11-12',
    tags: ['AI', 'Job search', 'TanStack Start', 'FastAPI', 'PostgreSQL'],
    path: '/jobmigo',
    repo: 'https://github.com/A7-studio/jobmigo',
    why: {
      headline: 'Applying is the bottleneck, not searching.',
      body: 'Hiring software screens CVs before a person reads them, popular roles bury generic applications, and many postings are stale or never real. Searching, tailoring and tracking also live in separate tools. jobmigo aims to tell you which few verified jobs are worth your time, why, and to prepare an application you can stand behind. It proposes and you decide. It never fabricates: generated documents reuse only facts you have confirmed, and a job\'s fit is a band with evidence, not a percentage.',
    },
    stack: {
      headline: 'Two services over one database.',
      body: 'A web app (TanStack Start, React, TypeScript, Tailwind, Better Auth, Drizzle) handles the interface, sign in and authorisation. A Python engine (FastAPI, Pydantic, SQLAlchemy, Alembic) does everything that calls a model or parses a file. It has no public port, so only the web server can reach it. PostgreSQL holds both schemas, and CV files sit in private S3 compatible storage. CV parsing runs in an isolated child process with CPU, memory and time limits.',
    },
    log: [
      {
        date: '2026-11-12',
        title: 'What runs today',
        body: 'The homepage, account sign up and sign in, and the privacy notice. Onboarding, profile review, job evaluation, the application kit and the board are designed but not built yet.',
      },
    ],
  },
]

/** Learning notes. Samuel writes each one; the block is left out while this is empty. */
export const notes: LabNote[] = []

export const publishedEntries: LabEntry[] = [...entries].sort((a, b) => latestDate(b).localeCompare(latestDate(a)))
export const sortedNotes: LabNote[] = [...notes].sort((a, b) => b.date.localeCompare(a.date))

export const hasLab = publishedEntries.length > 0
/** Entries that live at `/lab/<slug>`. Entries with their own `path` are prerendered there instead. */
export const labSlugs = publishedEntries.filter((entry) => !entry.path).map((entry) => entry.slug)
export const labPaths = publishedEntries.flatMap((entry) => (entry.path ? [entry.path] : []))

export function entryHref(entry: LabEntry) {
  return entry.path ?? `/lab/${entry.slug}`
}

/** Entries served by the `/lab/$slug` route. */
export function findLabEntry(slug: string) {
  return publishedEntries.find((entry) => entry.slug === slug && !entry.path)
}

export function findLabEntryByPath(path: string) {
  return publishedEntries.find((entry) => entry.path === path)
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
