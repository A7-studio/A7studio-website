import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { WorkCover, WorkShell } from '#/components/WorkShell'
import { SITE_URL, categoryFilters, throughFilters, workItems } from '#/content/work'
import type { ProjectCategory, WorkItem } from '#/content/work'

export const Route = createFileRoute('/work/')({
  head: () => ({
    meta: [
      { title: 'Work — A7Studio | Samuel Gichu' },
      {
        name: 'description',
        content:
          'Selected mobile, frontend, fintech and AI products Samuel Gichu has built, with the story behind each one.',
      },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/work` }],
  }),
  component: WorkIndexPage,
})

function WorkCardBody({ item }: { item: WorkItem }) {
  return (
    <>
      <WorkCover item={item} />
      <div className="work-tile-body">
        <span className="work-tile-meta">
          {item.clientContext}
          {item.year ? ` · ${item.year}` : ''}
        </span>
        {item.status && <span className="work-status">{item.status}</span>}
        <h3 className="work-title">{item.projectTitle}</h3>
        <p className="work-headline">{item.headline}</p>
        {!item.story && <p className="work-desc">{item.description}</p>}
        {item.story ? (
          <span className="work-link">
            Read the story <span aria-hidden="true">→</span>
          </span>
        ) : (
          item.url && (
            <a className="work-link" href={item.url} target="_blank" rel="noopener noreferrer">
              Visit site <span aria-hidden="true">↗</span>
            </a>
          )
        )}
      </div>
    </>
  )
}

function WorkIndexPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')
  const [activeCompany, setActiveCompany] = useState<string>('all')
  const items = workItems.filter(
    (item) =>
      (activeCategory === 'all' || item.category.includes(activeCategory)) &&
      (activeCompany === 'all' || item.through === activeCompany),
  )

  return (
    <WorkShell>
      <section className="section-wrap section-spacing" aria-labelledby="work-index-title">
        <div className="section-header">
          <span className="section-tag">{workItems.length} Projects</span>
          <h1 id="work-index-title" className="section-title">
            Work.
          </h1>
          <p className="section-lead">
            Mobile, web, fintech and AI products I have built, with the story behind each one. Open a project to see what the
            problem was, what I owned, and how it was built.
          </p>
        </div>

        <div className="filter-tabs" role="group" aria-label="Filter projects by category">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-tab${activeCategory === filter.id ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(filter.id)}
              aria-pressed={activeCategory === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="filter-tabs" role="group" aria-label="Filter projects by company">
          {['all', ...throughFilters].map((company) => (
            <button
              key={company}
              type="button"
              className={`filter-tab${activeCompany === company ? ' is-active' : ''}`}
              onClick={() => setActiveCompany(company)}
              aria-pressed={activeCompany === company}
            >
              {company === 'all' ? 'All companies' : company}
            </button>
          ))}
        </div>

        {items.length === 0 && <p className="section-lead">No projects match these filters.</p>}

        <ul className="work-tiles">
          {items.map((item) => (
            <li className="work-tile" key={item.id} id={`work-${item.id}`}>
              {item.story ? (
                <Link className="work-tile-link" to="/work/$slug" params={{ slug: item.id }}>
                  <WorkCardBody item={item} />
                </Link>
              ) : (
                <div className="work-tile-static">
                  <WorkCardBody item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </WorkShell>
  )
}
