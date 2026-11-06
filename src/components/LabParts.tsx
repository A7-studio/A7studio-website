import { Link } from '@tanstack/react-router'

import { WorkShell } from '#/components/WorkShell'
import { visibleLabImage } from '#/content/lab'
import type { LabEntry } from '#/content/lab'

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
