import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { useTheme } from './useTheme'
import { MenuToggle, MobileDrawer, useMobileMenu } from './MobileMenu'

import type { StoryImage, WorkItem } from '#/content/work'
import { visibleImage } from '#/content/work'
import { hasLab } from '#/content/lab'
import { WorkIllustration } from '#/components/WorkIllustration'

export function WorkShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme()
  const menu = useMobileMenu()

  return (
    <>
      <a className="skip-link" href="#main" inert={menu.open}>
        Skip to main content
      </a>
      <header className="site-header" role="banner" inert={menu.open}>
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
            <Link className="nav-link" to="/work">
              Work
            </Link>
            {hasLab && (
              <Link className="nav-link" to="/lab">
                Lab
              </Link>
            )}
            <a className="nav-link" href="/#experience">
              Experience
            </a>
            <a className="nav-link" href="/#services">
              Build with me
            </a>
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
            <a id="header-cta-btn" className="btn btn-primary btn-sm" href="/#contact">
              Get in touch
            </a>
            <MenuToggle menu={menu} />
          </div>
        </div>
      </header>

      <MobileDrawer menu={menu} root="/" />

      <main id="main" inert={menu.open}>
        {children}
      </main>

      <footer className="site-footer" role="contentinfo" inert={menu.open}>
        <div className="footer-container">
          <div className="footer-left">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <p className="footer-desc">
              Samuel Gichu. AI-powered apps for founders and teams.
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
      <WorkIllustration category={item.category} />
      <div className="work-cover-top">
        <span className="work-cover-pill">{item.shortName ?? item.projectTitle}</span>
      </div>
      <span className="work-cover-cat">{item.category.join(' · ')} · Illustration</span>
    </div>
  )
}
