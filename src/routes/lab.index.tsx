import { createFileRoute, notFound } from '@tanstack/react-router'

import { WorkShell } from '#/components/WorkShell'
import { LabCover, LabNotFound } from '#/components/LabParts'
import { entryHref, formatLabDate, hasLab, latestDate, publishedEntries, sortedNotes } from '#/content/lab'
import { SITE_URL } from '#/content/work'

export const Route = createFileRoute('/lab/')({
  // With no published entries the Lab does not exist publicly (spec 0005, AC-2).
  loader: () => {
    if (!hasLab) throw notFound()
    return null
  },
  head: () => ({
    meta: [
      { title: 'Lab — A7Studio | Samuel Gichu' },
      {
        name: 'description',
        content: 'Products Samuel Gichu is building and learning from, documented as they happen.',
      },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/lab` }],
  }),
  notFoundComponent: LabNotFound,
  component: LabIndexPage,
})

function LabIndexPage() {
  return (
    <WorkShell>
      <section className="section-wrap section-spacing" aria-labelledby="lab-index-title">
        <div className="section-header">
          <span className="section-tag">{publishedEntries.length} {publishedEntries.length === 1 ? 'product' : 'products'}</span>
          <h1 id="lab-index-title" className="section-title">
            Lab.
          </h1>
          <p className="section-lead">
            Products I am building, with the story behind each one, and short notes on what I am learning along the way.
          </p>
        </div>

        <ul className="work-tiles">
          {publishedEntries.map((entry) => (
            <li className="work-tile" key={entry.slug}>
              <a className="work-tile-link" href={entryHref(entry)}>
                <LabCover entry={entry} />
                <div className="work-tile-body">
                  <span className="work-tile-meta">Updated {formatLabDate(latestDate(entry))}</span>
                  <span className="work-status">{entry.status}</span>
                  <h3 className="work-title">{entry.name}</h3>
                  <p className="work-headline">{entry.tagline}</p>
                  <span className="work-link">
                    Read the build log <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {sortedNotes.length > 0 && (
          <div id="notes" className="lab-notes">
            <div className="section-header">
              <span className="section-tag">Notes</span>
              <h2 className="section-title">What I am learning.</h2>
              <p className="section-lead">Short dated notes on AI engineering, system design and backend work.</p>
            </div>
            <ol className="timeline">
              {sortedNotes.map((note) => (
                <li className="timeline-row" id={`note-${note.id}`} key={note.id}>
                  <div className="timeline-when">
                    {formatLabDate(note.date)}
                    <br />
                    <span className="work-status" style={{ marginTop: '0.5rem' }}>
                      {note.topic}
                    </span>
                  </div>
                  <div>
                    <h3 className="timeline-company">{note.title}</h3>
                    <p className="timeline-title">{note.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </WorkShell>
  )
}
