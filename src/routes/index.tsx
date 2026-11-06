import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { WorkCover } from '#/components/WorkShell'
import { employerStrip, experience } from '#/content/experience'
import { formatLabDate, hasLab, latestDate, publishedEntries } from '#/content/lab'
import { featuredStories, workItems } from '#/content/work'

const CV_HREF = '/samuel-gichu-cv.pdf'
const LINKEDIN = 'https://www.linkedin.com/in/samuel-gichu-a29695b9/'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'A7Studio.dev — Samuel Gichu | Senior Software Engineer (Mobile, Fintech & AI)' },
      {
        name: 'description',
        content:
          'Samuel Gichu is a Senior Software Engineer with 6+ years shipping mobile apps (Flutter), web products (React/TypeScript), fintech payment systems, and now AI powered products. Available now for remote roles and contracts.',
      },
      { name: 'author', content: 'Samuel Gichu' },
      {
        name: 'keywords',
        content:
          'Samuel Gichu, A7Studio, Senior Software Engineer, Flutter, React, TypeScript, NestJS, Mobile Engineer, Fintech, AI Products, Payments, Stripe Connect, M-Pesa, Nairobi Kenya, Remote Engineer',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'A7Studio' },
      { property: 'og:title', content: 'A7Studio.dev — Samuel Gichu | Senior Software Engineer' },
      {
        property: 'og:description',
        content: 'Mobile, web, fintech and AI engineer. Available now for remote roles and contracts.',
      },
      { property: 'og:url', content: 'https://a7studio.dev/' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:see_also', content: LINKEDIN },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'A7Studio.dev — Samuel Gichu' },
      {
        name: 'twitter:description',
        content: 'Senior Software Engineer with 6+ years across mobile (Flutter), web (React/TS), fintech and AI powered products.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://a7studio.dev/' }],
  }),
  component: HomePage,
})

const inquiryTopics = [
  { id: 'role', label: '💼 Full-Time Role', subject: 'Senior%20Software%20Engineer%20Role' },
  { id: 'contract', label: '🤝 Contract Engagement', subject: 'Contract%20Engagement%20Inquiry' },
  { id: 'other', label: '💬 Something Else', subject: 'Hello%20Samuel' },
]

const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#lab', label: 'Lab' },
  { href: '#now', label: 'Now' },
  { href: '#contact', label: 'Contact' },
]

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(inquiryTopics[0])
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function handleCopyEmail(address = 'kibochas@gmail.com') {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    })
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      {/* SITE HEADER */}
      <header className="site-header" role="banner">
        <div className="header-container">
          <a className="brand" href="#home" aria-label="A7Studio Home">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <span className="brand-badge">
              <span className="pulse-dot" aria-hidden="true" /> Samuel Gichu
            </span>
          </a>

          <nav className="nav-links" aria-label="Main Navigation">
            {navItems.map((item) =>
              item.href === '#work' ? (
                <Link key={item.href} className="nav-link" to="/work">
                  Work
                </Link>
              ) : item.href === '#lab' ? (
                hasLab ? (
                  <a key={item.href} className="nav-link" href="#lab">
                    Lab
                  </a>
                ) : null
              ) : (
                <a key={item.href} className="nav-link" href={item.href}>
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              id="theme-toggle-btn"
              className="btn-icon"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
            <a id="header-cv-btn" className="btn btn-outline btn-sm" href={CV_HREF} download>
              Download CV <span aria-hidden="true">↓</span>
            </a>
            <a id="header-connect-btn" className="btn btn-primary btn-sm header-cta-btn" href="#contact">
              Hire me <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              id="mobile-menu-toggle"
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close mobile navigation' : 'Open mobile navigation'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`mobile-nav-backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <span className="brand-mark">
            A7<span className="brand-dot">.</span>Studio
          </span>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/work" onClick={() => setMenuOpen(false)}>
              Work <span>→</span>
            </Link>
          </li>
          <li>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              Experience <span>→</span>
            </a>
          </li>
          {hasLab && (
            <li>
              <a href="#lab" onClick={() => setMenuOpen(false)}>
                Lab <span>→</span>
              </a>
            </li>
          )}
          <li>
            <a href="#now" onClick={() => setMenuOpen(false)}>
              Now <span>→</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact &amp; Links <span>→</span>
            </a>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a className="btn btn-outline" style={{ width: '100%' }} href={CV_HREF} download>
            Download CV ↓
          </a>
          <a
            className="btn btn-whatsapp"
            style={{ width: '100%' }}
            href="https://wa.me/254728370802?text=Hi%20Samuel%2C%20I'd%20like%20to%20discuss%20a%20role."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp 💬
          </a>
          <a className="btn btn-primary" style={{ width: '100%' }} href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>

      <main id="main">
        {/* 1. HERO */}
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow-1" aria-hidden="true" />
          <div className="hero-glow-2" aria-hidden="true" />

          <div className="section-wrap hero-content">
            <div className="hero-body">
              <div className="hero-left">
                <div className="hero-status-pill">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span>
                    <span className="highlight">Available now</span> for remote roles and contracts
                  </span>
                </div>

                <h1 id="hero-title" className="hero-title">
                  Senior Software Engineer building <span className="text-accent">mobile</span>, <span>web</span> &amp;{' '}
                  <span className="text-accent">fintech</span> &amp; <span>AI</span> products.
                </h1>

                <p className="hero-subhead">
                  I'm Samuel Gichu. Over 6 years I have shipped mobile apps with Flutter, web products with React and
                  TypeScript, and payments and ledger systems on NestJS and Stripe. I own features from design to release.
                </p>

                <div className="hero-actions">
                  <a id="hero-cv-btn" className="btn btn-primary" href={CV_HREF} download>
                    Download CV <span aria-hidden="true">↓</span>
                  </a>
                  <a id="hero-cta-contact" className="btn btn-outline" href="#contact">
                    Contact me <span aria-hidden="true">→</span>
                  </a>
                  <Link id="hero-explore-btn" className="btn btn-ghost" to="/work">
                    See my work <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="hero-pills" aria-label="Core Competencies">
                  <span className="tech-pill">Flutter &amp; Dart</span>
                  <span className="tech-pill">React &amp; TypeScript</span>
                  <span className="tech-pill">Node.js &amp; NestJS</span>
                  <span className="tech-pill">Payments &amp; Ledgers</span>
                  <span className="tech-pill">Nairobi, KE ➔ Remote</span>
                </div>
              </div>

              <div className="hero-right" aria-label="Quick Highlights">
                <div className="hero-stat-card">
                  <span className="hero-stat-value">6+</span>
                  <span className="hero-stat-label">Years in software engineering</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Mobile</span>
                  <span className="hero-stat-label">Flutter and React Native apps</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Web</span>
                  <span className="hero-stat-label">React and TypeScript products</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Fintech &amp; AI</span>
                  <span className="hero-stat-label">Payments, ledgers and AI powered products</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EMPLOYERS AND STACK */}
        <section className="section-wrap" aria-labelledby="employers-title" style={{ paddingTop: '2.5rem' }}>
          <p id="employers-title" className="employer-strip-label">
            Where I have worked
          </p>
          <ul className="employer-strip">
            {employerStrip.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="stack-line" style={{ marginTop: '1.5rem' }}>
            <strong>Stack I ship with:</strong> Flutter, Dart, React, TypeScript, Vue.js, Node.js, NestJS, PostgreSQL,
            Firebase, Stripe Connect, M-PESA STK and USSD, CI/CD and automated testing.
          </p>
        </section>

        {/* 3. SELECTED WORK */}
        <section id="work" className="section-wrap section-spacing" aria-labelledby="work-title">
          <div className="section-header">
            <span className="section-tag">Proof</span>
            <h2 id="work-title" className="section-title">
              Selected work.
            </h2>
            <p className="section-lead">
              Four stories of products I helped build, with an honest label on each. Most were built inside employers, so
              screens appear only where they are cleared.
            </p>
          </div>

          <ul className="work-tiles work-teaser-grid work-teaser-four">
            {featuredStories.map((item) => (
              <li className="work-tile" key={item.id}>
                <Link className="work-tile-link" to="/work/$slug" params={{ slug: item.id }}>
                  <WorkCover item={item} />
                  <div className="work-tile-body">
                    <span className="work-tile-meta">{item.clientContext}</span>
                    {item.status && <span className="work-status">{item.status}</span>}
                    <h3 className="work-title">{item.projectTitle}</h3>
                    <p className="work-headline">{item.headline}</p>
                    <span className="work-link">
                      Read the story <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="work-teaser-more">
            <Link className="btn btn-outline" to="/work">
              See all {workItems.length} projects <span aria-hidden="true">→</span>
            </Link>
          </p>
        </section>

        {/* 4. EXPERIENCE TIMELINE */}
        <section id="experience" className="section-wrap section-spacing" aria-labelledby="experience-title">
          <div className="section-header">
            <span className="section-tag">Experience</span>
            <h2 id="experience-title" className="section-title">
              What I owned, and where.
            </h2>
            <p className="section-lead">The same history as my CV, newest first.</p>
          </div>

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
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* LAB TEASER: rendered only when an entry is published (spec 0005) */}
        {hasLab && (
          <section id="lab" className="section-wrap section-spacing" aria-labelledby="lab-title">
            <div className="section-header">
              <span className="section-tag">Lab</span>
              <h2 id="lab-title" className="section-title">
                What I am building.
              </h2>
              <p className="section-lead">Products I am building and learning from, documented as they happen.</p>
            </div>
            <ul className="work-tiles work-teaser-grid">
              {publishedEntries.slice(0, 3).map((entry) => (
                <li className="work-tile" key={entry.slug}>
                  <Link className="work-tile-link" to="/lab/$slug" params={{ slug: entry.slug }}>
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
            <p className="work-teaser-more">
              <Link className="btn btn-outline" to="/lab">
                See the lab <span aria-hidden="true">→</span>
              </Link>
            </p>
          </section>
        )}

        {/* 5. NOW */}
        <section id="now" className="section-wrap section-spacing" aria-labelledby="now-title">
          <div className="section-header">
            <span className="section-tag">Now</span>
            <h2 id="now-title" className="section-title">
              Job hunting and sharpening the saw.
            </h2>
            <p className="section-lead">
              I am applying for senior roles and using the time to sharpen fundamentals.
            </p>
          </div>

          <div className="now-grid">
            <div className="now-card">
              <h3>Interviews and applications</h3>
              <p>Applying for senior mobile, full stack, fintech and AI roles, mostly remote.</p>
            </div>
            <div className="now-card">
              <h3>System design, data structures and algorithms</h3>
              <p>Regular practice for interviews and for designing better systems at work.</p>
            </div>
            <div className="now-card">
              <h3>Building with AI</h3>
              <p>Building an AI powered product to learn how to design, ship and run one end to end.</p>
            </div>
            <div className="now-card">
              <h3>Backend and Odoo</h3>
              <p>Refreshing backend skills, and starting Odoo training on 11 November 2026.</p>
            </div>
          </div>

          <p className="now-paused">
            Paused while I focus on this: Kakitoo and Good Call, my own product projects.
          </p>
        </section>

        {/* 6. WORK WITH ME */}
        <section id="services" className="section-wrap section-spacing" aria-labelledby="services-title">
          <div className="section-header">
            <span className="section-tag">Work with me</span>
            <h2 id="services-title" className="section-title">
              Two ways to work together.
            </h2>
          </div>
          <div className="now-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
            <div className="now-card">
              <h3>Full-time remote role</h3>
              <p>Senior mobile, full stack, fintech or AI engineer on a distributed team.</p>
            </div>
            <div className="now-card">
              <h3>Contract engagement</h3>
              <p>Payments, ledger and mobile app work for a defined scope, delivered end to end.</p>
            </div>
          </div>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" className="section-wrap section-spacing" aria-labelledby="contact-title">
          <div className="contact-container">
            <div className="contact-info">
              <div className="section-tag">Contact</div>
              <h2 id="contact-title">Let’s talk about the role.</h2>
              <p>
                Recruiters and hiring teams can reach me directly. Choose a topic to open a prepared email, or message me on
                LinkedIn or WhatsApp.
              </p>
              <div className="contact-availability">
                <span className="pulse-dot" />
                <span>Available now for remote roles and contracts</span>
              </div>

              <div className="inquiry-selector" style={{ marginTop: '2rem' }}>
                <span className="inquiry-label">What would you like to discuss?</span>
                <div className="inquiry-pills">
                  {inquiryTopics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      className={`inquiry-pill${selectedInquiry.id === topic.id ? ' active' : ''}`}
                      onClick={() => setSelectedInquiry(topic)}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-actions-card">
              <div className="email-copy-box">
                <div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Direct Email
                  </span>
                  <a
                    href={`mailto:kibochas@gmail.com?subject=${selectedInquiry.subject}&body=Hi%20Samuel%2C%0A%0AI'm%20reaching%20out%20regarding%20...`}
                    className="email-address"
                    style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    kibochas@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  id="copy-email-btn"
                  className="copy-btn"
                  onClick={() => handleCopyEmail('kibochas@gmail.com')}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              <a
                id="contact-whatsapp-btn"
                className="btn btn-whatsapp"
                href={`https://wa.me/254728370802?text=Hi%20Samuel%2C%20I'm%20reaching%20out%20regarding%20${encodeURIComponent(selectedInquiry.label)}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp (+254 728 370 802) 💬
              </a>

              <a id="contact-linkedin-btn" className="btn btn-primary" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn <span aria-hidden="true">↗</span>
              </a>

              <a id="contact-cv-btn" className="btn btn-outline" href={CV_HREF} download>
                Download CV <span aria-hidden="true">↓</span>
              </a>

              <div className="contact-social-row" aria-label="Profiles">
                <a className="social-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="social-link" href="mailto:hello@a7studio.io">
                  hello@a7studio.io
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-left">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <p className="footer-desc">Samuel Gichu, Senior Software Engineer. Mobile, web, fintech and AI.</p>
          </div>

          <div className="footer-right">
            <span>© 2026 A7Studio</span>
            <a href="#home">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    </>
  )
}
