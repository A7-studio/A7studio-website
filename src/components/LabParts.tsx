import { Link } from '@tanstack/react-router'

import { WorkShell } from '#/components/WorkShell'
import {
  entryHref,
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

/** A cover image when the entry is cleared, otherwise a typographic cover. */
export function LabCover({ entry, priority = false }: { entry: LabEntry; priority?: boolean }) {
  const shown = visibleLabImage(entry, entry.cover)
  if (shown) {
    return (
      <div className="work-cover">
        <img
          src={shown.src}
          alt={shown.alt}
          width={shown.width}
          height={shown.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    )
  }
  return (
    <div className="work-cover work-cover-type" aria-hidden="true">
      <span className="work-cover-mark">{entry.name}</span>
      <span className="work-cover-cat">{entry.status}</span>
    </div>
  )
}

export function LabNotFound() {
  return (
    <WorkShell>
      <section className="section-wrap section-spacing">
        <title>Not found — A7Studio</title>
        <h1 className="section-title">Nothing here.</h1>
        <p className="section-lead">That page does not exist.</p>
        <Link className="btn btn-outline" to="/">
          Back home
        </Link>
      </section>
    </WorkShell>
  )
}


/** Page head shared by every route that renders a Lab entry. */
export function labEntryHead(entry: LabEntry) {
  const cover = visibleLabImage(entry, entry.cover)
  const title = `${entry.name} — ${entry.path ? 'A7Studio' : 'Lab | A7Studio'}`
  const url = `${SITE_URL}${entryHref(entry)}`
  return {
    meta: [
      { title },
      { name: 'description', content: entry.tagline },
      { property: 'og:title', content: title },
      { property: 'og:description', content: entry.tagline },
      { property: 'og:url', content: url },
      ...(cover ? [{ property: 'og:image', content: `${SITE_URL}${cover.src}` }] : []),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

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

/** The product page body, used by `/lab/$slug` and by entries with their own path such as `/jobmigo`. */
export function LabEntryView({ entry }: { entry: LabEntry }) {
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

          <div className="hero-actions">
            {entry.url && (
              <a className="btn btn-primary btn-sm" href={entry.url} target="_blank" rel="noopener noreferrer">
                Open {entry.name} <span aria-hidden="true">↗</span>
              </a>
            )}
            {entry.repo && (
              <a className="btn btn-outline btn-sm" href={entry.repo} target="_blank" rel="noopener noreferrer">
                View the code <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
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
            <a className="story-next-link" href={entryHref(next)}>
              {next.name} <span aria-hidden="true">→</span>
            </a>
          </nav>
        )}

        <div className="work-lead-banner">
          <div className="work-lead-banner-text">
            <h3>Hiring a senior engineer, or need a product built?</h3>
            <p>I am available now for remote roles, contracts and freelance projects.</p>
          </div>
          <a className="btn btn-primary" href="/#contact">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </WorkShell>
  )
}
