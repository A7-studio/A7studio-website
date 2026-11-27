import { createFileRoute } from '@tanstack/react-router'

import { WorkShell } from '#/components/WorkShell'
import { CV_REQUEST_HREF } from '#/content/contact'
import { experience } from '#/content/experience'
import { hiring } from '#/content/offers'
import { SITE_URL, workItems } from '#/content/work'
import type { WorkItem } from '#/content/work'

export const Route = createFileRoute('/experience')({
  head: () => ({
    meta: [
      { title: 'Experience — A7Studio | Samuel Gichu' },
      {
        name: 'description',
        content: 'Where Samuel Gichu has worked and what he owned at each company, newest first.',
      },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/experience` }],
  }),
  component: ExperiencePage,
})

/** The full history, moved off the home page so the home page can stay a pitch (spec 0017). */
function ExperiencePage() {
  return (
    <WorkShell>
      <section className="section-wrap section-spacing" aria-labelledby="experience-title">
        <div className="section-header">
          <span className="section-tag">Experience</span>
          <h1 id="experience-title" className="section-title">
            What I owned, and where.
          </h1>
          <p className="section-lead">The same history as my CV, newest first.</p>
        </div>

        <div className="now-card offer-hiring">
          <h2>Hiring? {hiring.title}</h2>
          <p>{hiring.body}</p>
          <a className="btn btn-outline btn-sm" href={CV_REQUEST_HREF}>
            Request a CV
          </a>
        </div>

        <h2 className="sr-only">Roles</h2>
        <ol className="timeline">
          {experience.map((role) => (
            <li className="timeline-row" key={role.id}>
              <div className="timeline-when">
                {role.dates ?? 'Co-founder'}
                <br />
                {role.location}
                {role.note && (
                  <>
                    <br />
                    <span className="work-status" style={{ marginTop: '0.5rem' }}>
                      {role.note}
                    </span>
                  </>
                )}
              </div>
              <div>
                <h3 className="timeline-company">
                  {role.url ? (
                    <a href={role.url} target="_blank" rel="noopener noreferrer">
                      {role.company} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    role.company
                  )}
                </h3>
                <p className="timeline-title">{role.title}</p>
                <ul className="timeline-points">
                  {role.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {role.workIds && role.workIds.length > 0 && (
                  <p className="offer-proof">
                    <span className="offer-proof-label">Projects</span>
                    {role.workIds
                      .map((id) => workItems.find((item) => item.id === id))
                      .filter((item): item is WorkItem => Boolean(item))
                      .map((item) => (
                        <a
                          key={item.id}
                          href={item.story ? `/work/${item.id}` : item.url}
                          {...(item.story ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {item.shortName ?? item.projectTitle}
                        </a>
                      ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </WorkShell>
  )
}
