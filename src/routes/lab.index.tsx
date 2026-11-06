import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { WorkShell } from '#/components/WorkShell'
import { LabCover, LabNotFound } from '#/components/LabParts'
import { formatLabDate, hasLab, latestDate, publishedEntries } from '#/content/lab'
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
          <span className="section-tag">{publishedEntries.length} in the lab</span>
          <h1 id="lab-index-title" className="section-title">
            Lab.
          </h1>
          <p className="section-lead">
            Products I am building and learning from, documented as they happen: what each is, how it is built, and what I
            learned.
          </p>
        </div>

        <ul className="work-tiles">
          {publishedEntries.map((entry) => (
            <li className="work-tile" key={entry.slug}>
              <Link className="work-tile-link" to="/lab/$slug" params={{ slug: entry.slug }}>
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
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </WorkShell>
  )
}
