import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'

import { CV_REQUEST_HREF, LINKEDIN, WHATSAPP_ROLE_HREF } from '#/content/contact'
import { hasLab } from '#/content/lab'

/**
 * State for the menu shown below desktop width, shared by every page. While it
 * is open the page behind it must be made `inert`, so focus stays in the menu.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef(false)

  /** Closes the menu and puts focus back on the menu button. */
  const close = useCallback(() => {
    returnFocus.current = true
    setOpen(false)
  }, [])

  /** Closes the menu after a link is followed, leaving focus to the browser. */
  const dismiss = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (open) {
      closeRef.current?.focus()
    } else if (returnFocus.current) {
      returnFocus.current = false
      toggleRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }
    // The menu button is hidden at desktop width, so the menu must not stay open there.
    const desktop = window.matchMedia('(min-width: 1024px)')
    const handleResize = () => {
      if (desktop.matches) dismiss()
    }
    window.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [open, close, dismiss])

  return { open, toggle: () => setOpen((value) => !value), close, dismiss, toggleRef, closeRef }
}

type Menu = ReturnType<typeof useMobileMenu>

export function MenuToggle({ menu }: { menu: Menu }) {
  return (
    <button
      ref={menu.toggleRef}
      type="button"
      id="mobile-menu-toggle"
      className="menu-toggle"
      onClick={menu.toggle}
      aria-label={menu.open ? 'Close mobile navigation' : 'Open mobile navigation'}
      aria-expanded={menu.open}
      aria-controls="mobile-nav-drawer"
    >
      <span aria-hidden="true">{menu.open ? '✕' : '☰'}</span>
    </button>
  )
}

/** `root` is empty on the home page and "/" elsewhere, so section links lead home. */
export function MobileDrawer({ menu, root = '' }: { menu: Menu; root?: '' | '/' }) {
  const sections = [
    { hash: 'experience', label: 'Experience' },
    { hash: 'services', label: 'Build with me' },
    { hash: 'contact', label: 'Contact & Links' },
  ]
  return (
    <>
      <div className={`mobile-nav-backdrop${menu.open ? ' is-open' : ''}`} onClick={menu.close} aria-hidden="true" />
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${menu.open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        inert={!menu.open}
      >
        <div className="mobile-drawer-header">
          <span className="brand-mark">
            A7<span className="brand-dot">.</span>Studio
          </span>
          <button ref={menu.closeRef} type="button" className="menu-toggle" onClick={menu.close} aria-label="Close navigation">
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/work" onClick={menu.dismiss}>
              Work <span>→</span>
            </Link>
          </li>
          {hasLab && (
            <li>
              <Link to="/lab" onClick={menu.dismiss}>
                Lab <span>→</span>
              </Link>
            </li>
          )}
          {sections.map((section) => (
            <li key={section.hash}>
              <a href={`${root}#${section.hash}`} onClick={menu.dismiss}>
                {section.label} <span>→</span>
              </a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a className="btn btn-outline" style={{ width: '100%' }} href={CV_REQUEST_HREF}>
            Request a CV
          </a>
          <a className="btn btn-whatsapp" style={{ width: '100%' }} href={WHATSAPP_ROLE_HREF} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp 💬
          </a>
          <a className="btn btn-primary" style={{ width: '100%' }} href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  )
}
