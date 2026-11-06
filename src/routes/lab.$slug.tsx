import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { LabCover, LabNotFound } from '#/components/LabParts'
import { WorkShell } from '#/components/WorkShell'
import {
  findLabEntry,
  formatLabDate,
  latestDate,
  nextLabEntry,
  publishedEntries,
  revenueLabel,
  sortedLog,
  visibleLabImage,
} from '#/content/lab'
import type { LabChapter, LabEntry } from '#/content/lab'
import { SITE_URL } from '#/content/work'

export const Route = createFileRoute('/lab/$slug')({
  loader: ({ params }) => {
    const entry = findLabEntry(params.slug)
    if (!entry) throw notFound()
    return entry
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const cover = visibleLabImage(loaderData, loaderData.cover)
    const title = `${loaderData.name} — Lab | A7Studio`
    const description = loaderData.tagline
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${SITE_URL}/lab/${loaderData.slug}` },
        ...(cover ? [{ property: 'og:image', content: `${SITE_URL}${cover.src}` }] : []),
      ],
      links: [{ rel: 'canonical', href: `${SITE_URL}/lab/${loaderData.slug}` }],
    }
  },
  notFoundComponent: LabNotFound,
  component: LabEntryPage,
})

function Chapter({ entry, number, label, chapter }: { entry: LabEntry; number: string; label: string; chapter: LabChapter }) {
  const images = (chapter.images ?? []).map((image) => visibleLabImage(entry, image)).filter((image) => image !== undefined)
  return (
    <section className="story-chapter" aria-labelledby={`lab-chapter-${number}`}>
      <span className="story-chapter-label">
        {number} · {label}
      </span>
      <h2 id={`lab-chapter-${number}`} className="story-chapter-title">
        {chapter.headline}
      </h2>
      <p className="story-chapter-body">{chapter.body}</p>
      {images.length > 0 && (
        <div className="story-images">
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}
    </section>
  )
}

function LabEntryPage() {
  const entry = Route.useLoaderData()
  const revenue = revenueLabel(entry.revenue)
  const log = sortedLog(entry)
  const chapters = [
    { label: 'What it does and why', chapter: entry.why },
    { label: 'Stack and architecture', chapter: entry.stack },
    { label: "What I'm learning", chapter: entry.learning },
  ].filter((item): item is { label: string; chapter: LabChapter } => Boolean(item.chapter))
  const next = publishedEntries.length > 1 ? nextLabEntry(entry.slug) : undefined

  return (
    <WorkShell>
      <article className="section-wrap story">
        <header className="story-header">
          <Link className="story-back" to="/lab">
            <span aria-hidden="true">←</span> All of the lab
          </Link>
          <span className="section-tag">
            {entry.status} · Updated {formatLabDate(latestDate(entry))}
          </span>
          <h1 className="section-title">{entry.name}</h1>
          <p className="story-outcome">{entry.tagline}</p>

          <dl className="story-meta">
            {entry.tags && entry.tags.length > 0 && (
              <div>
                <dt>Built with</dt>
                <dd>{entry.tags.join(' · ')}</dd>
              </div>
            )}
            {revenue && (
              <div>
                <dt>Revenue</dt>
                <dd>{revenue}</dd>
              </div>
            )}
          </dl>

          {entry.url && (
            <a className="btn btn-outline btn-sm" href={entry.url} target="_blank" rel="noopener noreferrer">
              Visit <span aria-hidden="true">↗</span>
            </a>
          )}
        </header>

        <LabCover entry={entry} priority />

        {chapters.map((item, index) => (
          <Chapter key={item.label} entry={entry} number={String(index + 1).padStart(2, '0')} label={item.label} chapter={item.chapter} />
        ))}

        {log.length > 0 && (
          <section className="story-chapter" aria-labelledby="lab-log-title">
            <span className="story-chapter-label">Build log</span>
            <h2 id="lab-log-title" className="story-chapter-title">
              What happened, newest first.
            </h2>
            <ol className="timeline">
              {log.map((item) => (
                <li className="timeline-row" key={`${item.date}-${item.title}`}>
                  <div className="timeline-when">{formatLabDate(item.date)}</div>
                  <div>
                    <h3 className="timeline-company">{item.title}</h3>
                    <p className="timeline-title">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {next && (
          <nav className="story-next" aria-label="Next in the lab">
            <span className="story-chapter-label">Next in the lab</span>
            <Link className="story-next-link" to="/lab/$slug" params={{ slug: next.slug }}>
              {next.name} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        )}

        <div className="work-lead-banner">
          <div className="work-lead-banner-text">
            <h3>Hiring a senior engineer?</h3>
            <p>I am available now for remote roles and contracts.</p>
          </div>
          <a className="btn btn-primary" href="/#contact">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </WorkShell>
  )
}
