import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { usePageMotion, useRotatingIndex } from '#/components/Motion'
import { useTheme } from '#/components/useTheme'
import { WorkCover } from '#/components/WorkShell'
import { employerStrip, experience } from '#/content/experience'
import { LabCover } from '#/components/LabParts'
import { entryHref, formatLabDate, hasLab, publishedEntries, sortedNotes } from '#/content/lab'
import { hiring, offers } from '#/content/offers'
import { principles } from '#/content/principles'
import { processSteps } from '#/content/process'
import { featuredStories, workItems } from '#/content/work'
import type { WorkItem } from '#/content/work'

const CV_REQUEST_HREF =
  'mailto:kibochas@gmail.com?subject=CV%20request&body=Hi%20Samuel%2C%0A%0ACould%20you%20send%20me%20your%20CV%20for%20this%20role%3A%20...'
const LINKEDIN = 'https://www.linkedin.com/in/samuel-gichu-a29695b9/'
const GITHUB = 'https://github.com/kibzsam'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Samuel Gichu | AI-powered apps for founders and teams' },
      {
        name: 'description',
        content:
          'Samuel Gichu builds AI-powered apps for founders and teams, from the first idea to something people use. Full-stack and Flutter engineer with 6+ years shipping payments, mobile and web products. Available for freelance projects and roles.',
      },
      { name: 'author', content: 'Samuel Gichu' },
      {
        name: 'keywords',
        content:
          'Samuel Gichu, A7Studio, Full-Stack Engineer, Flutter Engineer, React, Next.js, TypeScript, NestJS, Mobile Engineer, Fintech, AI Products, Payments, Stripe Connect, M-Pesa, Nairobi Kenya, Remote Engineer',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'A7Studio' },
      { property: 'og:title', content: 'Samuel Gichu | AI-powered apps for founders and teams' },
      {
        property: 'og:description',
        content: 'I build AI-powered apps for founders and teams, from the first idea to something people use.',
      },
      { property: 'og:url', content: 'https://a7studio.dev/' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:see_also', content: LINKEDIN },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'A7Studio.dev — Samuel Gichu' },
      {
        name: 'twitter:description',
        content: 'I build AI-powered apps for founders and teams, from the first idea to something people use.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://a7studio.dev/' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Samuel Gichu',
          jobTitle: 'Full-Stack & Flutter Engineer',
          url: 'https://a7studio.dev/',
          sameAs: [LINKEDIN, GITHUB],
        }),
      },
    ],
  }),
  component: HomePage,
})

const caseStudy = publishedEntries.find((entry) => entry.slug === 'jobmigo') ?? publishedEntries[0]

const HERO_WORDS = ['AI-powered apps', 'mobile apps', 'payment systems', 'web platforms']

const IDEA_BRIEF =
  'Hi%20Samuel%2C%0A%0AThe%20idea%3A%20%0AWho%20it%20is%20for%3A%20%0AWhat%20exists%20today%3A%20%0AWhen%20I%20need%20a%20first%20version%3A%20%0A'

const inquiryTopics = [
  { id: 'ai-app', label: '🤖 AI-powered app', subject: 'AI-powered%20app%20idea', body: IDEA_BRIEF },
  { id: 'add-ai', label: '✨ Add AI to my product', subject: 'Add%20AI%20to%20my%20product', body: IDEA_BRIEF },
  { id: 'mobile', label: '📱 Mobile or payments app', subject: 'Mobile%20or%20payments%20app', body: IDEA_BRIEF },
  { id: 'role', label: '💼 Hiring', subject: 'Engineering%20role', body: "Hi%20Samuel%2C%0A%0AI'm%20reaching%20out%20about%20a%20role%3A%20" },
  { id: 'other', label: '💬 Something else', subject: 'Hello%20Samuel', body: 'Hi%20Samuel%2C%0A%0A' },
]

function ideaHref(topicId: string) {
  const topic = inquiryTopics.find((item) => item.id === topicId) ?? inquiryTopics[0]
  return `mailto:kibochas@gmail.com?subject=${topic.subject}&body=${topic.body}`
}


function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroWord = useRotatingIndex(HERO_WORDS.length)
  usePageMotion()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(inquiryTopics[0])
  const [theme, setTheme] = useTheme()

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
            <Link className="nav-link" to="/work">
              Work
            </Link>
            {hasLab && (
              <Link className="nav-link" to="/lab">
                Lab
              </Link>
            )}
            <a className="nav-link" href="#experience">
              Experience
            </a>
            <a className="nav-link" href="#services">
              Build with me
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
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
            <a id="header-cta-btn" className="btn btn-primary btn-sm" href="#contact">
              Get in touch
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
          {hasLab && (
            <li>
              <Link to="/lab" onClick={() => setMenuOpen(false)}>
                Lab <span>→</span>
              </Link>
            </li>
          )}
          <li>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              Experience <span>→</span>
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Build with me <span>→</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact &amp; Links <span>→</span>
            </a>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a className="btn btn-outline" style={{ width: '100%' }} href={CV_REQUEST_HREF}>
            Request a CV
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
                    <span className="highlight">Available now</span> for freelance projects, and for roles in Kenya or remote
                  </span>
                </div>

                <h1 id="hero-title" className="hero-title">
                  I build{' '}
                  <span className="hero-rotator">
                    <span className="sr-only">AI-powered apps</span>
                    <span className="hero-rotator-words" aria-hidden="true">
                      {HERO_WORDS.map((word, i) => (
                        <span key={word} className={`hero-rotator-word text-accent${i === heroWord ? ' is-active' : ''}`}>
                          {word}
                        </span>
                      ))}
                    </span>
                  </span>{' '}
                  for founders and teams, from the first idea to something people use.
                </h1>

                <p className="hero-subhead">
                  I'm Samuel Gichu, a full-stack and Flutter engineer. For 6+ years I have shipped payments, mobile and web
                  products in TypeScript, React, Node.js, SQL and Flutter for companies like Boya, Alvin and BeatBnk. Now I
                  build AI products like jobmigo, and I can build yours.
                </p>

                <div className="hero-actions">
                  <a id="hero-idea-btn" className="btn btn-primary magnetic" href={ideaHref('ai-app')}>
                    Tell me about your idea <span aria-hidden="true">→</span>
                  </a>
                  <a id="hero-explore-btn" className="btn btn-outline" href="#services">
                    See what I can build <span aria-hidden="true">→</span>
                  </a>
                  <a id="hero-cv-btn" className="btn btn-ghost" href={CV_REQUEST_HREF}>
                    Hiring? Request a CV
                  </a>
                </div>

                <div className="hero-pills" aria-label="Core Competencies">
                  <span className="tech-pill">Flutter &amp; Dart</span>
                  <span className="tech-pill">TypeScript, React &amp; Next.js</span>
                  <span className="tech-pill">Node.js &amp; NestJS</span>
                  <span className="tech-pill">Payments &amp; Ledgers</span>
                  <span className="tech-pill">AI-powered products</span>
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
                  <span className="hero-stat-value">AI apps</span>
                  <span className="hero-stat-label">LLM features, retrieval and evaluation tests</span>
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
          <div className="marquee">
            <ul className="employer-strip marquee-track">
              {employerStrip.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <ul className="employer-strip marquee-track marquee-copy" aria-hidden="true">
              {employerStrip.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <p className="stack-line" style={{ marginTop: '1.5rem' }}>
            <strong>Stack I ship with:</strong> TypeScript, JavaScript, HTML, CSS, React, Next.js, Vue.js, Node.js, NestJS, SQL (PostgreSQL), MongoDB, Redis,
            Flutter, Dart, Stripe Connect, M-PESA STK and USSD, Git, CI/CD and automated testing.
          </p>
        </section>

        {/* 3. WHAT I CAN BUILD (spec 0008) */}
        <section id="services" className="section-wrap section-spacing" aria-labelledby="services-title">
          <div className="section-header reveal">
            <span className="section-tag">Build with me</span>
            <h2 id="services-title" className="section-title">
              What I can build for you.
            </h2>
            <p className="section-lead">Each one links to work I have shipped or am building. I scope and quote after we talk.</p>
          </div>

          <ul className="offer-grid">
            {offers.map((offer) => (
              <li className="now-card offer-card reveal spotlight" key={offer.id}>
                <h3>
                  {offer.title}
                  {offer.label && <span className="work-status offer-label">{offer.label}</span>}
                </h3>
                {offer.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="offer-proof">
                  <span className="offer-proof-label">Proof</span>
                  {offer.proof.map((item) => (
                    <a key={item.href} href={item.href}>
                      {item.label}
                    </a>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <p className="work-teaser-more">
            <a className="btn btn-primary" href={ideaHref('ai-app')}>
              Tell me about your idea <span aria-hidden="true">→</span>
            </a>
          </p>
        </section>

        {/* 4. JOBMIGO CASE STUDY (spec 0008) */}
        {caseStudy && (
          <section id="products" className="section-wrap section-spacing" aria-labelledby="products-title">
            <div className="section-header reveal">
              <span className="section-tag">Case study · {caseStudy.status}</span>
              <h2 id="products-title" className="section-title">
                What I am building.
              </h2>
              <p className="section-lead">{caseStudy.name}: {caseStudy.tagline.replace(/\.$/, '')}. An example of what an AI-powered first version looks like.</p>
            </div>

            <div className="case-study">
              <div className="case-study-text">
                {caseStudy.why && (
                  <>
                    <h3>The problem</h3>
                    <p>{caseStudy.why.headline}</p>
                  </>
                )}
                {caseStudy.features && (
                  <>
                    <h3>What it does</h3>
                    <ul className="case-study-list">
                      {caseStudy.features.map((feature) => (
                        <li className="reveal" key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
                {caseStudy.statusNote && <p className="status-note">{caseStudy.statusNote}</p>}
                <p className="case-study-actions">
                  <a className="btn btn-outline" href={entryHref(caseStudy)}>
                    Read the {caseStudy.name} story <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
              <a className="case-study-cover" href={entryHref(caseStudy)} tabIndex={-1} aria-hidden="true">
                <LabCover entry={caseStudy} />
              </a>
            </div>
          </section>
        )}

        {/* 5. HOW I WORK WITH YOU (spec 0008) */}
        <section id="process" className="section-wrap section-spacing" aria-labelledby="process-title">
          <div className="section-header reveal">
            <span className="section-tag">Process</span>
            <h2 id="process-title" className="section-title">
              How I work with you.
            </h2>
            <p className="section-lead">Four steps from your idea to something people use.</p>
          </div>
          <ol className="process-list">
            {processSteps.map((step, index) => (
              <li className="now-card reveal spotlight" key={step.id}>
                <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.line}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. SELECTED WORK (proof) */}
        <section id="work" className="section-wrap section-spacing" aria-labelledby="work-title">
          <div className="section-header reveal">
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
              <li className="work-tile reveal tilt" key={item.id}>
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

        {/* 7. BUILT TO KEEP WORKING (spec 0007) */}
        <section id="how-i-work" className="section-wrap section-spacing" aria-labelledby="how-title">
          <div className="section-header reveal">
            <span className="section-tag">Principles</span>
            <h2 id="how-title" className="section-title">
              Built to keep working.
            </h2>
            <p className="section-lead">I build for weak networks, cheap phones and systems I do not control.</p>
          </div>

          <ul className="principle-grid">
            {principles.map((p) => (
              <li className="now-card reveal" key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.line}</p>
                <Link className="work-link" to={p.proof.href}>
                  {p.proof.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. EXPERIENCE TIMELINE */}
        <section id="experience" className="section-wrap section-spacing" aria-labelledby="experience-title">
          <div className="section-header reveal">
            <span className="section-tag">Experience</span>
            <h2 id="experience-title" className="section-title">
              What I owned, and where.
            </h2>
            <p className="section-lead">The same history as my CV, newest first.</p>
          </div>

          <div className="now-card offer-hiring">
            <h3>Hiring? {hiring.title}</h3>
            <p>{hiring.body}</p>
            <a className="btn btn-outline btn-sm" href={CV_REQUEST_HREF}>
              Request a CV
            </a>
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

        {/* 6. LEARNING (replaces Now, spec 0006) */}
        <section id="learning" className="section-wrap section-spacing" aria-labelledby="learning-title">
          <div className="section-header reveal">
            <span className="section-tag">Learning</span>
            <h2 id="learning-title" className="section-title">
              What I am learning.
            </h2>
            <p className="section-lead">
              I am applying for senior roles while I build jobmigo and sharpen the fundamentals.
            </p>
          </div>

          <div className="now-grid now-grid-three">
            <div className="now-card">
              <h3>AI engineering</h3>
              <p>Building jobmigo to learn how to design, ship and run an AI powered product end to end, and using AI tools in my daily work.</p>
            </div>
            <div className="now-card">
              <h3>System design, data structures and algorithms</h3>
              <p>Regular practice for interviews and for designing better systems at work.</p>
            </div>
            <div className="now-card">
              <h3>Backend and Odoo</h3>
              <p>Refreshing backend skills, and Odoo training, which started on 11 November 2026.</p>
            </div>
          </div>

          {sortedNotes.length > 0 && (
            <div className="learning-notes">
              <h3 className="learning-notes-title">Latest notes</h3>
              <ul className="learning-notes-list">
                {sortedNotes.slice(0, 3).map((note) => (
                  <li key={note.id}>
                    <a href={`/lab#note-${note.id}`}>
                      <span className="learning-note-date">{formatLabDate(note.date)}</span>
                      <span className="learning-note-title">{note.title}</span>
                      <span className="work-status">{note.topic}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="work-teaser-more">
                <a className="btn btn-outline" href="/lab#notes">
                  All notes <span aria-hidden="true">→</span>
                </a>
              </p>
            </div>
          )}

          <p className="now-paused">Paused while I focus on this: Kakitoo and Good Call, my own product projects.</p>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" className="section-wrap section-spacing" aria-labelledby="contact-title">
          <div className="contact-container">
            <div className="contact-info">
              <div className="section-tag">Contact</div>
              <h2 id="contact-title">Let’s talk.</h2>
              <p>
                Tell me about your idea. Choose a topic to open an email with a short brief to fill in, or message me on LinkedIn or
                WhatsApp. Hiring teams are welcome too.
              </p>
              <div className="contact-availability">
                <span className="pulse-dot" />
                <span>Available now for freelance projects, and for roles in Kenya or remote</span>
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
                    href={ideaHref(selectedInquiry.id)}
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

              <a id="contact-cv-btn" className="btn btn-outline" href={CV_REQUEST_HREF}>
                Request a CV
              </a>

              <div className="contact-social-row" aria-label="Profiles">
                <a className="social-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="social-link" href={GITHUB} target="_blank" rel="noopener noreferrer">
                  GitHub
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
