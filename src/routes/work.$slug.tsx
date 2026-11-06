import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { WorkCover, WorkShell } from '#/components/WorkShell'
import { SITE_URL, findStory, nextStory, visibleImage } from '#/content/work'
import type { StoryChapter, WorkItem } from '#/content/work'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const item = findStory(params.slug)
    if (!item) throw notFound()
    return item
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const cover = visibleImage(loaderData, loaderData.story?.cover)
    const title = `${loaderData.projectTitle} — A7Studio | Samuel Gichu`
    const description = loaderData.story?.brief.body ?? loaderData.headline
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${SITE_URL}/work/${loaderData.id}` },
        ...(cover ? [{ property: 'og:image', content: `${SITE_URL}${cover.src}` }] : []),
      ],
      links: [{ rel: 'canonical', href: `${SITE_URL}/work/${loaderData.id}` }],
    }
  },
  notFoundComponent: StoryNotFound,
  component: StoryPage,
})

function StoryNotFound() {
  return (
    <WorkShell>
      <section className="section-wrap section-spacing">
        <h1 className="section-title">Story not found.</h1>
        <p className="section-lead">That project does not have a story page.</p>
        <Link className="btn btn-outline" to="/work">
          Back to all work
        </Link>
      </section>
    </WorkShell>
  )
}

function Chapter({ item, number, label, chapter }: { item: WorkItem; number: string; label: string; chapter: StoryChapter }) {
  const images = (chapter.images ?? []).map((image) => visibleImage(item, image)).filter((image) => image !== undefined)
  return (
    <section className="story-chapter" aria-labelledby={`chapter-${number}`}>
      <span className="story-chapter-label">
        {number} · {label}
      </span>
      <h2 id={`chapter-${number}`} className="story-chapter-title">
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

function StoryPage() {
  const item = Route.useLoaderData()
  const story = item.story
  if (!story) return null
  const next = nextStory(item.id)

  return (
    <WorkShell>
      <article className="section-wrap story">
        <header className="story-header">
          <Link className="story-back" to="/work">
            <span aria-hidden="true">←</span> All work
          </Link>
          <span className="section-tag">
            {item.clientContext}
            {item.year ? ` · ${item.year}` : ''}
          </span>
          <h1 className="section-title">{item.projectTitle}</h1>
          <p className="story-outcome">{item.headline}</p>
          <p className="section-lead">{item.description}</p>

          <dl className="story-meta">
            <div>
              <dt>My role</dt>
              <dd>{story.role}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{item.impactBadge}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{item.tags.join(' · ')}</dd>
            </div>
          </dl>

          {item.url && (
            <a className="btn btn-outline btn-sm" href={item.url} target="_blank" rel="noopener noreferrer">
              Visit project <span aria-hidden="true">↗</span>
            </a>
          )}
        </header>

        <WorkCover item={item} priority />

        <Chapter item={item} number="01" label="The brief" chapter={story.brief} />
        <Chapter item={item} number="02" label="My part" chapter={story.myPart} />
        <Chapter item={item} number="03" label="The build" chapter={story.build} />
        {story.result && <Chapter item={item} number="04" label="Result" chapter={story.result} />}

        {story.credits && <p className="story-credits">{story.credits}</p>}

        <nav className="story-next" aria-label="Next project">
          <span className="story-chapter-label">Next project</span>
          <Link className="story-next-link" to="/work/$slug" params={{ slug: next.id }}>
            {next.projectTitle} <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <div className="work-lead-banner">
          <div className="work-lead-banner-text">
            <h3>Have a similar product in mind?</h3>
            <p>Tell me what you are building and where it needs to be.</p>
          </div>
          <a className="btn btn-primary" href="/#contact">
            Let’s Discuss Your Project <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </WorkShell>
  )
}
