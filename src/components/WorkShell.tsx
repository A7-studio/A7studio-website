import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import type { StoryImage, WorkItem } from '#/content/work'
import { visibleImage } from '#/content/work'
import { hasLab } from '#/content/lab'

export function WorkShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('a7-theme') as 'dark' | 'light' | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('a7-theme', theme)
  }, [theme])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header" role="banner">
        <div className="header-container">
          <Link className="brand" to="/" aria-label="A7Studio Home">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <span className="brand-badge">
              <span className="pulse-dot" aria-hidden="true" /> Samuel Gichu
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main Navigation">
            <a className="nav-link" href="/">
              Home
            </a>
            <Link className="nav-link" to="/work">
              Work
            </Link>
            {hasLab && (
              <Link className="nav-link" to="/lab">
                Lab
              </Link>
            )}
            <a className="nav-link" href="/#contact">
              Contact
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn-icon"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            </button>
            <a id="header-cv-btn" className="btn btn-outline btn-sm" href="/samuel-gichu-cv.pdf" download>
              Download CV <span aria-hidden="true">↓</span>
            </a>
            <a className="btn btn-primary btn-sm header-cta-btn" href="/#contact">
              Hire me <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-left">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <p className="footer-desc">
              Samuel Gichu, Senior Software Engineer. Mobile, web and fintech.
            </p>
          </div>
          <div className="footer-right">
            <span>© 2026 A7Studio</span>
            <Link to="/work">All work</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

/** A cover image when the story is cleared, otherwise a typographic cover. */
export function WorkCover({ item, image, priority = false }: { item: WorkItem; image?: StoryImage; priority?: boolean }) {
  const shown = visibleImage(item, image ?? item.story?.cover)
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
      <span className="work-cover-mark">{item.shortName ?? item.projectTitle}</span>
      <span className="work-cover-cat">{item.category.join(' · ')}</span>
    </div>
  )
}
