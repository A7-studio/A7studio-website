import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'A7Studio.dev — Samuel Gichu | Senior Product Engineer (Mobile, Frontend & AI)' },
      {
        name: 'description',
        content:
          'A7Studio is Samuel Gichu’s engineering lab. Senior Product Engineer with 7+ years shipping high-performance mobile apps (Flutter), modern web frontends (React/TypeScript), fintech payment systems, and AI-native applications. Available for senior remote roles and contract sprints.',
      },
      { name: 'author', content: 'Samuel Gichu' },
      {
        name: 'keywords',
        content:
          'Samuel Gichu, A7Studio, Senior Product Engineer, Flutter, React, TypeScript, Next.js, Mobile Engineer, Frontend Engineer, Fintech, M-Pesa, Stripe, MCP, AI Coding Agents, Nairobi Kenya, Remote Engineer',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'A7Studio' },
      { property: 'og:title', content: 'A7Studio.dev — Samuel Gichu | Senior Product Engineer' },
      {
        property: 'og:description',
        content:
          'Engineering lab for mobile, frontend, fintech, and AI-assisted products. Open for senior remote roles and contract sprints.',
      },
      { property: 'og:url', content: 'https://a7studio.dev/' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:see_also', content: 'https://www.linkedin.com/in/samuel-gichu-a29695b9/' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'A7Studio.dev — Samuel Gichu' },
      {
        name: 'twitter:description',
        content:
          'Senior Product Engineer with 7+ years across mobile (Flutter), frontend (React/TS), fintech, and AI-native engineering.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://a7studio.dev/' }],
  }),
  component: HomePage,
})

type ProjectCategory = 'all' | 'mobile' | 'frontend' | 'fintech'

interface WorkItem {
  id: string
  index: string
  projectTitle: string
  clientContext: string
  impactBadge: string
  category: ProjectCategory[]
  headline: string
  description: string
  tags: string[]
  url?: string
}

const projects: WorkItem[] = [
  {
    id: 'boya',
    index: '01',
    projectTitle: 'Business Payments & Ledger Systems',
    clientContext: 'Shipped for Boya · Fintech · Nairobi, Kenya',
    impactBadge: 'Fintech Product Engineering',
    category: ['mobile', 'fintech'],
    headline: 'Payments, money movement, ledger integrity, and business investment products.',
    description:
      'Worked on Stripe KYC/KYB onboarding and Stripe integration for business financial workflows. Revamped money movement processes by fixing double-entry ledger issues, strengthening ledger integrity, and addressing negative balance scenarios. Also revamped Boya’s money market fund investment option for businesses.',
    tags: ['Stripe', 'KYC/KYB', 'Money Movement', 'Double-Entry Ledger', 'Ledger Integrity', 'Money Market Funds'],
    url: 'https://www.boyahq.com/',
  },
  {
    id: 'beatbnk',
    index: '02',
    projectTitle: 'Lifestyle & Entertainment Mobile Apps',
    clientContext: 'Shipped for BeatBnk · Mobile Team Lead',
    impactBadge: 'Mobile Product Engineering',
    category: ['mobile', 'fintech'],
    headline: 'Mobile engineering leadership, Flutter architecture, and AI assisted delivery.',
    description:
      'Led mobile development and mentored the team across Flutter architecture, testing, CI/CD, and AI augmented workflows. Used MCP servers and tools including Antigravity, Cursor, and Claude to reduce development time by 40%, improve team velocity by 35%, and reduce production bugs by 60%.',
    tags: ['Flutter', 'Mobile Architecture', 'AI Assisted Development', 'MCP', 'Testing', 'CI/CD'],
    url: 'https://www.linkedin.com/in/samuel-gichu-a29695b9/',
  },
  {
    id: 'alvin',
    index: '03',
    projectTitle: 'Embedded Finance Applications',
    clientContext: 'Shipped for Alvin Technologies (alvin.finance) · Remote',
    impactBadge: 'Embedded Finance Engineering',
    category: ['mobile', 'frontend', 'fintech'],
    headline: 'React widgets, Flutter packages, and cross platform finance infrastructure.',
    description:
      'Built embeddable React finance widgets for enterprise clients, custom Flutter packages with native iOS and Android APIs, and backend services for financial transactions. Added mini program deployment, reached 85% code coverage, cut deployment time by 50%, increased client adoption by 40%, and reduced feature development time by 30%.',
    tags: ['Flutter', 'React', 'Next.js', 'TanStack Query', 'Firebase', 'Native APIs', 'CI/CD', 'Flask'],
    url: 'https://alvin.finance/',
  },
  {
    id: 'valuencer',
    index: '04',
    projectTitle: 'Web3 Investment Platform',
    clientContext: 'Shipped for Valuencer · Denmark',
    impactBadge: 'Frontend Product Engineering',
    category: ['frontend', 'fintech'],
    headline: 'A creator investment platform connecting creators with fans.',
    description:
      'Built the React and TypeScript frontend, integrated the Sui Blockchain SDK, and collaborated with blockchain engineers on smart contract flows. Focused on making Web3 investment experiences understandable to non technical users.',
    tags: ['React', 'TypeScript', 'PWA', 'Sui SDK', 'Web3', 'Smart Contracts', 'REST APIs'],
    url: 'https://www.linkedin.com/in/samuel-gichu-a29695b9/',
  },
  {
    id: 'kakitoo',
    index: '05',
    projectTitle: 'Privacy Focused Tipping Platform',
    clientContext: 'Shipped for Kakitoo · Lead Mobile Engineer',
    impactBadge: 'Mobile & Payments Engineering',
    category: ['mobile', 'frontend', 'fintech'],
    headline: "We're here for the kiDOGO.",
    description:
      'A hassle free tipping platform for blue collar workers in East Africa, helping people boost their income securely and anonymously. Built the Flutter mobile app and React web frontend with M-Pesa STK Push, anonymous USSD tipping through *835*77#, and the custom KAKITOO ID privacy system.',
    tags: ['Flutter', 'React', 'Next.js', 'M-Pesa STK Push', 'USSD', 'KAKITOO ID'],
    url: 'https://kakitoo.com',
  },
  {
    id: 'chupachap',
    index: '06',
    projectTitle: 'Liquor Delivery E-commerce Platform',
    clientContext: 'Shipped for Chupachap · Nairobi, Kenya',
    impactBadge: 'Mobile Product Engineering',
    category: ['mobile'],
    headline: 'A WooCommerce commerce platform for fast liquor delivery in Nairobi.',
    description:
      'Built the complete e-commerce solution with WooCommerce integration, a 500+ item product catalog, responsive mobile shopping experience, and payment gateway checkout. The platform is live and serving Nairobi customers through Chupa Chap’s fast delivery service.',
    tags: ['Flutter', 'React', 'React Native', 'WordPress', 'WooCommerce', 'Node.js', 'REST APIs', 'MongoDB'],
    url: 'https://chupachap.co.ke',
  },
  {
    id: 'telkom',
    index: '07',
    projectTitle: 'T-Kash Mobile Payments App',
    clientContext: 'Built with mb96 for Telkom Kenya',
    impactBadge: 'Mobile Product Engineering',
    category: ['mobile'],
    headline: 'A mobile payments app for Telkom Kenya customers.',
    description:
      'Part of the team at mb96 that built T-Kash, with mobile flows for payments, account balances, and telecom services through Telkom APIs.',
    tags: ['Flutter', 'Mobile Payments', 'Telecom APIs', 'Self Service'],
    url: 'https://play.google.com/store/apps/details?id=com.tkashapp&hl=en',
  },
  {
    id: 'syntax',
    index: '08',
    projectTitle: 'Giraffe Spotter & Client Applications',
    clientContext: 'Shipped for SYNTAX Ltd · US & UK Clients',
    impactBadge: 'Product Engineering',
    category: ['mobile', 'frontend'],
    headline: 'An AI assisted citizen science app for giraffe research and conservation.',
    description:
      'Built Flutter applications from design, reusable component libraries, backend integrations, and production fixes for international clients. For Giraffe Spotter, built the mobile experience for uploading giraffe photos, fur pattern matching, location and date capture, directory browsing, and donations, helping GCF turn safari sightings into research data.',
    tags: ['Flutter', 'AI Image Matching', 'Citizen Science', 'Firebase', 'REST APIs', 'Cloud Functions'],
    url: 'https://synt.ax/',
  },
  {
    id: 'mb96',
    index: '09',
    projectTitle: 'Commerce Products & UI Systems',
    clientContext: 'Shipped for mb96 Ltd · Kenya, Canada & US Clients',
    impactBadge: 'Mobile & Web Product Engineering',
    category: ['mobile', 'frontend'],
    headline: 'Cross platform applications and reusable UI systems for international clients.',
    description:
      'Built mobile and web applications for clients in Kenya, Canada, and the US, with reusable UI components, design systems, microservice integrations, and REST APIs. Worked across Agile delivery cycles to turn product requirements into reliable client applications.',
    tags: ['Flutter', 'React', 'React Native', 'WordPress', 'WooCommerce', 'REST APIs', 'Node.js'],
    url: 'https://www.linkedin.com/in/samuel-gichu-a29695b9/',
  },
]

const inquiryTopics = [
  { id: 'mobile', label: '📱 Mobile App (Flutter)', subject: 'Mobile%20App%20(Flutter)%20Project%20Inquiry' },
  { id: 'frontend', label: '💻 Frontend / Web App', subject: 'Frontend%20/%20Web%20App%20Project%20Inquiry' },
  { id: 'fintech', label: '💳 Fintech & Payments', subject: 'Fintech%20&%20Payments%20Integration%20Inquiry' },
  { id: 'ai', label: '⚡ AI-Native Product', subject: 'AI-Native%20Product%20Development%20Inquiry' },
  { id: 'role', label: '💼 Senior Full-Time Role', subject: 'Senior%20Engineering%20Role%20Discussion' },
]

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')
  const [tipAmount, setTipAmount] = useState<number>(10)
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

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false)
        if (cvOpen) setCvOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, cvOpen])

  useEffect(() => {
    if (cvOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [cvOpen])

  function handleCopyEmail(address = 'kibochas@gmail.com') {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    })
  }

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory))

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
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#skills">
              Skills
            </a>
            <a className="nav-link" href="#work">
              Selected Work
            </a>
            <a className="nav-link" href="#lab">
              In The Lab
            </a>
            <a className="nav-link" href="#services">
              Work With Me
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
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
            <button
              type="button"
              id="header-cv-btn"
              className="btn btn-outline btn-sm"
              onClick={() => setCvOpen(true)}
              aria-label="View Samuel Gichu's CV"
            >
              View CV <span aria-hidden="true">↗</span>
            </button>
            <a
              id="header-connect-btn"
              className="btn btn-primary btn-sm header-cta-btn"
              href="#contact"
            >
              Start a Project <span aria-hidden="true">→</span>
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
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About Samuel <span>→</span>
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setMenuOpen(false)}>
              Skills <span>→</span>
            </a>
          </li>
          <li>
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Selected Work <span>→</span>
            </a>
          </li>
          <li>
            <a href="#lab" onClick={() => setMenuOpen(false)}>
              In The Lab <span>→</span>
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Work With Me <span>→</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact &amp; Links <span>→</span>
            </a>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%' }}
            onClick={() => {
              setMenuOpen(false)
              setCvOpen(true)
            }}
          >
            View Full CV ↗
          </button>
          <a
            className="btn btn-whatsapp"
            style={{ width: '100%' }}
            href="https://wa.me/254728370802?text=Hi%20Samuel%2C%20I'm%20interested%20in%20discussing%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp 💬
          </a>
          <a
            className="btn btn-primary"
            style={{ width: '100%' }}
            href="https://www.linkedin.com/in/samuel-gichu-a29695b9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>

      <main id="main">
        {/* 1. HERO SECTION */}
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
                    Available for <span className="highlight">Senior Remote Roles</span> &amp; High-Impact Contracts
                  </span>
                </div>

                <h1 id="hero-title" className="hero-title">
                  Senior Product Engineer building{' '}
                  <span className="text-accent">mobile</span>,{' '}
                  <span>web</span> &amp;{' '}
                  <span className="text-accent">fintech</span> products.
                </h1>

                <p className="hero-subhead">
                  <strong>A7Studio</strong> is Samuel Gichu's engineering lab. I build and improve products with Flutter,
                  React, TypeScript, and financial APIs, with a focus on mobile apps, web products, payments, and money movement.
                </p>

                <div className="hero-pills" aria-label="Core Competencies">
                  <span className="tech-pill">Flutter &amp; Dart</span>
                  <span className="tech-pill">React &amp; TypeScript</span>
                  <span className="tech-pill">Payments &amp; Money Movement</span>
                  <span className="tech-pill">AI Assisted Engineering</span>
                  <span className="tech-pill">Nairobi, KE ➔ Worldwide Remote</span>
                </div>

                <div className="hero-actions">
                  <a id="hero-cta-contact" className="btn btn-primary" href="#contact">
                    Start a Project / Discuss Role <span aria-hidden="true">→</span>
                  </a>
                  <a id="hero-explore-btn" className="btn btn-outline" href="#work">
                    Explore Shipped Work <span aria-hidden="true">↓</span>
                  </a>
                  <button
                    type="button"
                    id="hero-cv-btn"
                    className="btn btn-ghost"
                    onClick={() => setCvOpen(true)}
                  >
                    View Full CV <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>

              <div className="hero-right" aria-label="Quick Highlights">
                <div className="hero-stat-card">
                  <span className="hero-stat-value">7+</span>
                  <span className="hero-stat-label">Years in software engineering</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Mobile</span>
                  <span className="hero-stat-label">Flutter product work</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Web</span>
                  <span className="hero-stat-label">React and TypeScript products</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-value">Fintech</span>
                  <span className="hero-stat-label">Payments and ledger systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE KINETIC STRIP */}
        <div className="marquee-bar" aria-hidden="true">
          <div className="marquee-track">
            {[
              'Mobile Engineering (Flutter & Dart)',
              'Frontend Systems (React, Next.js, TS)',
              'Fintech & Payments (M-Pesa, Stripe, Visa)',
              'AI Assisted Engineering (MCP & Coding Agents)',
              '7+ Years Shipping Production Code',
              'Distributed Remote Leadership',
              'Mobile Engineering (Flutter & Dart)',
              'Frontend Systems (React, Next.js, TS)',
              'Fintech & Payments (M-Pesa, Stripe, Visa)',
              'AI Assisted Engineering (MCP & Coding Agents)',
              '7+ Years Shipping Production Code',
              'Distributed Remote Leadership',
            ].map((text, i) => (
              <span className="marquee-item" key={`${text}-${i}`}>
                {text} <span className="dot" />
              </span>
            ))}
          </div>
        </div>

        {/* 2. ABOUT SAMUEL */}
        <section id="about" className="section-wrap section-spacing" aria-labelledby="about-title">
          <div className="section-header">
            <span className="section-tag">About Samuel Gichu</span>
            <h2 id="about-title" className="section-title">
              Senior Product Engineer.
            </h2>
            <p className="section-lead">
              Mobile, web, and financial products built with a focus on clear user experiences and dependable systems.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-bio-card">
              <div className="about-avatar-row">
                <div className="about-avatar" aria-hidden="true">
                  SG
                </div>
                <div className="about-identity">
                  <h3>Samuel Gichu</h3>
                  <p>Senior Product Engineer · Nairobi, Kenya</p>
                </div>
              </div>

              <div className="about-narrative">
                <p>
                  I am a senior product engineer with <strong>7+ years of software engineering experience</strong> across
                  cross-platform mobile apps, web frontends, and financial systems. I work mainly with{' '}
                  <strong>Flutter, React, TypeScript, and API driven products</strong>.
                </p>
                <p>
                  I also build in the AI lab, using coding agents and Model Context Protocol tools to explore product ideas and
                  improve the engineering workflow.
                </p>
                <p>
                  My product experience includes <strong>payments, embedded finance, consumer products, Web3, and commerce</strong>.
                </p>
              </div>

              <div className="about-location-tag">
                <span className="pulse-dot" /> Nairobi, Kenya · +254 728 370 802 · Open to Global Remote Roles &amp; Contracts
              </div>
            </div>

            <div className="pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon" aria-hidden="true">
                  📱
                </div>
                <h4 className="pillar-title">Mobile Engineering</h4>
                <p className="pillar-desc">
                  Flutter, Dart, Bloc, Riverpod, custom packages, native iOS &amp; Android bridges, offline-first sync, and 60/120fps fluid interfaces.
                </p>
                <div className="pillar-tags">
                  <span className="pillar-tag">Flutter</span>
                  <span className="pillar-tag">Dart</span>
                  <span className="pillar-tag">iOS / Android</span>
                  <span className="pillar-tag">Bloc</span>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon" aria-hidden="true">
                  💻
                </div>
                <h4 className="pillar-title">Frontend &amp; Web Systems</h4>
                <p className="pillar-desc">
                  React, TypeScript, Next.js, Progressive Web Apps, design tokens, and clean architectures.
                </p>
                <div className="pillar-tags">
                  <span className="pillar-tag">React</span>
                  <span className="pillar-tag">TypeScript</span>
                  <span className="pillar-tag">Next.js</span>
                  <span className="pillar-tag">PWA (90+)</span>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon" aria-hidden="true">
                  💳
                </div>
                <h4 className="pillar-title">Fintech &amp; Payments</h4>
                <p className="pillar-desc">
                  Stripe integrations, M-PESA STK Push &amp; USSD, corporate Visa card issuing, Webhooks, KYC/KYB, wallets/ledgers, and idempotent APIs.
                </p>
                <div className="pillar-tags">
                  <span className="pillar-tag">M-PESA STK</span>
                  <span className="pillar-tag">Stripe</span>
                  <span className="pillar-tag">Visa Rails</span>
                  <span className="pillar-tag">Wallets</span>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon" aria-hidden="true">
                  ⚡
                </div>
                <h4 className="pillar-title">AI-Native Engineering</h4>
                <p className="pillar-desc">
                  Model Context Protocol (MCP), Claude, Cursor, autonomous coding agents, structured workflows, research automation, and 40% faster execution.
                </p>
                <div className="pillar-tags">
                  <span className="pillar-tag">MCP</span>
                  <span className="pillar-tag">Claude / Cursor</span>
                  <span className="pillar-tag">Agents</span>
                  <span className="pillar-tag">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 SKILLS / COMPETENCIES */}
        <section id="skills" className="skills-section section-spacing" aria-labelledby="skills-title">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-tag">Core Competencies</span>
              <h2 id="skills-title" className="section-title">
                What I Build With.
              </h2>
              <p className="section-lead">
                The tools and product areas I use across mobile, web, payments, and AI assisted engineering.
              </p>
            </div>

            <div className="skills-grid">
              <div className="skill-card" id="skill-mobile">
                <div className="skill-card-icon" aria-hidden="true">📱</div>
                <h3 className="skill-card-title">Mobile Engineering</h3>
                <p className="skill-card-desc">
                  Production-grade Flutter &amp; Dart applications for iOS and Android. Architecture patterns (Bloc, Riverpod),
                  custom native packages, offline-first sync, and 60/120fps fluid interfaces at enterprise scale.
                </p>
                <div className="skill-tags" aria-label="Mobile engineering skills">
                  <span className="skill-tag">Flutter</span>
                  <span className="skill-tag">Dart</span>
                  <span className="skill-tag">Bloc / Riverpod</span>
                  <span className="skill-tag">iOS & Android</span>
                  <span className="skill-tag">Native Packages</span>
                  <span className="skill-tag">CI/CD</span>
                </div>
              </div>

              <div className="skill-card" id="skill-frontend">
                <div className="skill-card-icon" aria-hidden="true">💻</div>
                <h3 className="skill-card-title">Frontend & Web</h3>
                <p className="skill-card-desc">
                  React, TypeScript, and Next.js applications. Design systems, Progressive Web Apps,
                  clean component architecture, and responsive interfaces built for real-world performance.
                </p>
                <div className="skill-tags" aria-label="Frontend engineering skills">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Vite</span>
                  <span className="skill-tag">PWA (90+)</span>
                  <span className="skill-tag">Design Systems</span>
                </div>
              </div>

              <div className="skill-card" id="skill-fintech">
                <div className="skill-card-icon" aria-hidden="true">💳</div>
                <h3 className="skill-card-title">Fintech & Payments</h3>
                <p className="skill-card-desc">
                  Deep expertise in payment rails: M-PESA STK Push &amp; USSD, Stripe integrations, Visa card issuing, corporate ledgers,
                  KYC/KYB digital onboarding, idempotent webhooks, and multi-currency wallet infrastructure.
                </p>
                <div className="skill-tags" aria-label="Fintech and payments skills">
                  <span className="skill-tag">M-PESA STK</span>
                  <span className="skill-tag">Stripe</span>
                  <span className="skill-tag">Visa Rails</span>
                  <span className="skill-tag">KYC/KYB</span>
                  <span className="skill-tag">Ledger</span>
                  <span className="skill-tag">Webhooks</span>
                </div>
              </div>

              <div className="skill-card" id="skill-ai">
                <div className="skill-card-icon" aria-hidden="true">⚡</div>
                <h3 className="skill-card-title">AI-Native Engineering</h3>
                <p className="skill-card-desc">
                  Practical AI embedded into the full engineering lifecycle. Model Context Protocol (MCP) servers, autonomous
                  coding agents, structured tool calling, and AI-assisted architecture &amp; debugging workflows.
                </p>
                <div className="skill-tags" aria-label="AI native engineering skills">
                  <span className="skill-tag">MCP</span>
                  <span className="skill-tag">Claude</span>
                  <span className="skill-tag">Cursor</span>
                  <span className="skill-tag">AI Agents</span>
                  <span className="skill-tag">Gemini</span>
                  <span className="skill-tag">Agentic Workflows</span>
                </div>
              </div>
            </div>

            {/* TECH STACK & TOOLS BREAKDOWN */}
            <div className="stack-breakdown-card">
              <div className="stack-breakdown-header">
                <span className="section-tag">Technology Matrix</span>
                <h3 className="stack-breakdown-title">Production Tech Stack &amp; Tools</h3>
                <p className="stack-breakdown-lead">
                  Technologies, frameworks, and developer toolchains battle-tested in high-throughput production environments.
                </p>
              </div>

              <div className="stack-categories-grid">
                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">📱</span>
                    <h4 className="stack-cat-name">Mobile &amp; Cross-Platform</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge primary-skill">Flutter</span>
                    <span className="stack-badge primary-skill">Dart</span>
                    <span className="stack-badge">Bloc Pattern</span>
                    <span className="stack-badge">Riverpod</span>
                    <span className="stack-badge">React Native</span>
                    <span className="stack-badge">iOS (Swift / Obj-C Bridge)</span>
                    <span className="stack-badge">Android (Kotlin / Java Bridge)</span>
                    <span className="stack-badge">Custom Native Plugins</span>
                  </div>
                </div>

                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">💻</span>
                    <h4 className="stack-cat-name">Frontend &amp; Web Systems</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge primary-skill">React</span>
                    <span className="stack-badge primary-skill">TypeScript</span>
                    <span className="stack-badge primary-skill">Next.js</span>
                    <span className="stack-badge">JavaScript (ESNext)</span>
                    <span className="stack-badge">Vite</span>
                    <span className="stack-badge">TanStack Router / Query</span>
                    <span className="stack-badge">Tailwind CSS</span>
                    <span className="stack-badge">Progressive Web Apps</span>
                  </div>
                </div>

                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">💳</span>
                    <h4 className="stack-cat-name">Fintech &amp; Payments</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge primary-skill">M-PESA STK Push</span>
                    <span className="stack-badge primary-skill">Stripe Integration</span>
                    <span className="stack-badge primary-skill">Formance</span>
                    <span className="stack-badge">Visa Rails / Card Issuing</span>
                    <span className="stack-badge">USSD Workflows</span>
                    <span className="stack-badge">Idempotent Webhooks</span>
                    <span className="stack-badge">KYC &amp; KYB Verification</span>
                    <span className="stack-badge">Wallets &amp; Ledger Design</span>
                  </div>
                </div>

                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">⚡</span>
                    <h4 className="stack-cat-name">AI-Native &amp; Agentic Tools</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge primary-skill">Model Context Protocol (MCP)</span>
                    <span className="stack-badge primary-skill">Claude &amp; Structured Workflows</span>
                    <span className="stack-badge">Cursor AI</span>
                    <span className="stack-badge">Autonomous Coding Agents</span>
                    <span className="stack-badge">Gemini Flash / Pro</span>
                    <span className="stack-badge">Structured Spec Generation</span>
                  </div>
                </div>

                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">🛠️</span>
                    <h4 className="stack-cat-name">Backend, APIs &amp; Web3</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge">RESTful APIs</span>
                    <span className="stack-badge">Node.js</span>
                    <span className="stack-badge">Temporal Workflows</span>
                    <span className="stack-badge">PostgreSQL</span>
                    <span className="stack-badge">Supabase / Firebase</span>
                    <span className="stack-badge">Sui Blockchain SDK</span>
                    <span className="stack-badge">Smart Contract Integration</span>
                    <span className="stack-badge">WebSocket Feeds</span>
                  </div>
                </div>

                <div className="stack-cat-box">
                  <div className="stack-cat-header">
                    <span className="stack-cat-icon" aria-hidden="true">🚀</span>
                    <h4 className="stack-cat-name">DevOps, QA &amp; Architecture</h4>
                  </div>
                  <div className="stack-badge-list">
                    <span className="stack-badge primary-skill">Git &amp; GitHub Actions</span>
                    <span className="stack-badge">Automated CI/CD Pipelines</span>
                    <span className="stack-badge">85%+ Test Coverage (TDD)</span>
                    <span className="stack-badge">Clean Architecture</span>
                    <span className="stack-badge">Docker</span>
                    <span className="stack-badge">Figma to Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK (PROJECT-FIRST TITLES) */}
        <section id="work" className="section-wrap section-spacing" aria-labelledby="work-title">
          <div className="section-header">
            <span className="section-tag">Proven Track Record</span>
            <h2 id="work-title" className="section-title">
              Selected Work.
            </h2>
            <p className="section-lead">
              A concise record of products I have helped build, improve, and ship.
            </p>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
            <button
              type="button"
              id="filter-all"
              className={`filter-tab${activeCategory === 'all' ? ' is-active' : ''}`}
              onClick={() => setActiveCategory('all')}
              role="tab"
              aria-selected={activeCategory === 'all'}
            >
              All Projects ({projects.length})
            </button>
            <button
              type="button"
              id="filter-mobile"
              className={`filter-tab${activeCategory === 'mobile' ? ' is-active' : ''}`}
              onClick={() => setActiveCategory('mobile')}
              role="tab"
              aria-selected={activeCategory === 'mobile'}
            >
              Mobile / Flutter
            </button>
            <button
              type="button"
              id="filter-frontend"
              className={`filter-tab${activeCategory === 'frontend' ? ' is-active' : ''}`}
              onClick={() => setActiveCategory('frontend')}
              role="tab"
              aria-selected={activeCategory === 'frontend'}
            >
              Frontend &amp; Web
            </button>
            <button
              type="button"
              id="filter-fintech"
              className={`filter-tab${activeCategory === 'fintech' ? ' is-active' : ''}`}
              onClick={() => setActiveCategory('fintech')}
              role="tab"
              aria-selected={activeCategory === 'fintech'}
            >
              Fintech &amp; Payments
            </button>
          </div>

          <div className="work-grid">
            {filteredProjects.map((project) => (
              <article className="work-card" key={project.id} id={`work-${project.id}`}>
                <div className="work-card-top">
                  <span className="work-index">{project.index}</span>
                  <span className="work-badge">{project.clientContext}</span>
                </div>

                {/* PROJECT-FIRST TITLE */}
                <h3 className="work-title">{project.projectTitle}</h3>
                <span className="work-impact-badge">
                  <span aria-hidden="true">★</span> {project.impactBadge}
                </span>

                <p className="work-headline">{project.headline}</p>
                <p className="work-desc">{project.description}</p>

                <div className="work-tags" aria-label={`Technologies used in ${project.projectTitle}`}>
                  {project.tags.map((tag) => (
                    <span className="work-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {project.url && (
                  <a
                    className="work-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View details about ${project.projectTitle}`}
                  >
                    View Project Details <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>

          {/* IN-LINE LEAD GENERATION CALLOUT */}
          <div className="work-lead-banner">
            <div className="work-lead-banner-text">
              <h3>Have a similar product or mobile project in mind?</h3>
              <p>
                Whether you need a senior mobile engineer to take your Flutter app from 0 to 1, integrate complex payment rails,
                or boost engineering velocity, let’s talk about your requirements.
              </p>
            </div>
            <a className="btn btn-primary" href="#contact">
              Let’s Discuss Your Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* 4. IN THE LAB */}
        <section id="lab" className="lab-section section-spacing" aria-labelledby="lab-title">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-tag">A7Studio Research &amp; Builds</span>
              <h2 id="lab-title" className="section-title">
                In The Lab.
              </h2>
              <p className="section-lead">
                Upcoming products and engineering experiments outside client work.
              </p>
            </div>

            <div className="lab-grid">
              {/* Card 1: Kakitoo */}
              <article className="lab-card" id="lab-kakitoo">
                <div className="lab-visual" aria-hidden="true">
                  <div className="mock-tip-widget">
                    <div className="mock-tip-header">
                      <div className="mock-avatar">☕</div>
                      <div>
                        <div className="mock-author-title">Kakitoo.</div>
                        <div className="mock-author-handle">@creator · tip</div>
                      </div>
                    </div>
                    <div className="mock-amounts">
                      {[1, 5, 10, 25].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`mock-amount-btn${tipAmount === amt ? ' active' : ''}`}
                          onClick={() => setTipAmount(amt)}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="mock-privacy-badge">
                      <span aria-hidden="true">🛡️</span> Private by default · Zero tracking
                    </div>
                    <div className="mock-send-btn">Send ${tipAmount} Tip</div>
                  </div>
                </div>

                <div className="lab-card-body">
                  <div className="lab-status">
                    <span className="pulse-dot" /> Live Product · Active Development
                  </div>
                  <h3 className="lab-card-title">Kakitoo</h3>
                  <p className="lab-card-desc">
                    A privacy-first tipping platform for creators. Send micro-support without invasive tracking, ad trackers, or
                    data brokers. Built with Flutter mobile and React web, with native M-Pesa STK push and USSD flows.
                  </p>
                  <a
                    className="lab-action-link"
                    href="https://kakitoo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit kakitoo.com <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>

              {/* Card 2: Good Call */}
              <article className="lab-card" id="lab-good-call">
                <div className="lab-visual" aria-hidden="true">
                  <div className="mock-good-call-widget">
                    <div className="mock-good-call-mark">GOOD CALL</div>
                    <div className="mock-good-call-type">PERSONAL FINANCE APP</div>
                    <div className="mock-good-call-rule" />
                    <div className="mock-good-call-loop">PAUSE / DECIDE / SPEND / REFLECT / IMPROVE</div>
                    <div className="mock-good-call-status">UPCOMING PROJECT</div>
                  </div>
                </div>

                <div className="lab-card-body">
                  <div className="lab-status">
                    <span className="pulse-dot" /> Upcoming Project
                  </div>
                  <h3 className="lab-card-title">Good Call</h3>
                  <p className="lab-card-desc">
                    A personal finance app designed to help people pause, understand trade offs, and improve how they make spending decisions.
                  </p>
                  <span className="lab-action-link" style={{ cursor: 'default', color: 'var(--color-muted)' }}>
                    Coming Up
                  </span>
                </div>
              </article>

              {/* Card 3: AI-Native Systems */}
              <article className="lab-card" id="lab-ai-trading">
                <div className="lab-visual" aria-hidden="true">
                  <div className="mock-chart-widget">
                    <div className="mock-chart-header">
                      <span className="mock-chart-title">AI ASSISTED ENGINEERING</span>
                      <span style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}>ACTIVE</span>
                    </div>
                    <svg viewBox="0 0 300 90" style={{ width: '100%', height: '70px' }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f0a0" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#00f0a0" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,75 Q40,65 80,55 T160,35 T240,40 T300,10"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0,75 Q40,65 80,55 T160,35 T240,40 T300,10"
                        fill="none"
                        stroke="#00f0a0"
                        strokeWidth="2"
                      />
                      <circle cx="80" cy="55" r="3" fill="#00f0a0" />
                      <circle cx="160" cy="35" r="3" fill="#00f0a0" />
                      <circle cx="240" cy="40" r="3" fill="#00f0a0" />
                      <circle cx="300" cy="10" r="3" fill="#00f0a0" />
                    </svg>
                    <div className="mock-chart-stats">
                      <div>
                        <span style={{ color: 'var(--color-dim)', display: 'block' }}>MCP</span>
                        <span style={{ color: 'var(--color-accent)' }}>TOOLS</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-dim)', display: 'block' }}>AGENTS</span>
                        <span>WORKFLOWS</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-dim)', display: 'block' }}>FOCUS</span>
                        <span>PRODUCT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lab-card-body">
                  <div className="lab-status">
                    <span className="pulse-dot" /> AI Assisted Engineering
                  </div>
                  <h3 className="lab-card-title">AI assisted workflows</h3>
                  <p className="lab-card-desc">
                    Exploring coding agents, MCP tooling, and structured workflows for product development.
                  </p>
                  <span className="lab-action-link" style={{ cursor: 'default', color: 'var(--color-muted)' }}>
                    Active Lab Experiment
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 5. WORK WITH ME (LEAD GENERATION OFFERINGS) */}
        <section id="services" className="section-wrap section-spacing" aria-labelledby="services-title">
          <div className="section-header">
            <span className="section-tag">Engagement &amp; Roles</span>
            <h2 id="services-title" className="section-title">
              Work With Me.
            </h2>
            <p className="section-lead">
              How we can collaborate — tailored for engineering leaders hiring senior remote talent, founders building 0-to-1 products, and fintechs scaling transaction rails.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card" id="service-remote-roles">
              <span className="service-number">01</span>
              <h3 className="service-title">Senior Full-Time Remote Roles</h3>
              <p className="service-desc">
                High-output Senior Product Engineer (Flutter, React, TypeScript) joining your distributed engineering team.
                Proven experience managing teams, cutting bugs by 60%, and lifting sprint velocity by 35%.
              </p>
              <ul className="service-list">
                <li>
                  <span aria-hidden="true">✓</span> Full ownership of mobile architecture (Flutter) &amp; web frontends
                </li>
                <li>
                  <span aria-hidden="true">✓</span> Automated testing (85%+ coverage), CI/CD pipelines, and code mentorship
                </li>
                <li>
                  <span aria-hidden="true">✓</span> Seamless alignment across global timezones (US, Europe, Africa)
                </li>
              </ul>
              <div className="service-fit">
                <strong>Best for:</strong> Series A-C startups, remote-first companies, product scaleups
              </div>
              <a
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem', width: 'fit-content' }}
                href={`mailto:kibochas@gmail.com?subject=Senior%20Engineering%20Role%20Inquiry%20-%20Samuel%20Gichu&body=Hi%20Samuel%2C%0A%0AWe're%20interested%20in%20discussing%20a%20Senior%20Product%20Engineer%20role%20at%20...`}
              >
                Discuss Full-Time Role →
              </a>
            </div>

            <div className="service-card" id="service-contract-sprints">
              <span className="service-number">02</span>
              <h3 className="service-title">Contract &amp; 0-to-1 Product Sprints</h3>
              <p className="service-desc">
                End-to-end mobile app or web platform delivery on milestone-based sprints. Turning Figma designs and product specs
                into shippable, App Store &amp; Google Play approved applications.
              </p>
              <ul className="service-list">
                <li>
                  <span aria-hidden="true">✓</span> Rapid MVP development for iOS, Android, and web browsers
                </li>
                <li>
                  <span aria-hidden="true">✓</span> App Store &amp; Google Play Store submission and release management
                </li>
                <li>
                  <span aria-hidden="true">✓</span> 40% faster turnaround using modern AI-assisted engineering tools
                </li>
              </ul>
              <div className="service-fit">
                <strong>Best for:</strong> Early-stage founders, launch deadlines, new product exploration
              </div>
              <a
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem', width: 'fit-content' }}
                href={`mailto:kibochas@gmail.com?subject=Product%20Sprint%20Inquiry%20-%20Samuel%20Gichu&body=Hi%20Samuel%2C%0A%0AWe%20have%20a%20project%20we'd%20like%20to%20build%20and%20ship%3A%20...`}
              >
                Request a Sprint Quote →
              </a>
            </div>

            <div className="service-card" id="service-fintech">
              <span className="service-number">03</span>
              <h3 className="service-title">Fintech &amp; Payments Implementation</h3>
              <p className="service-desc">
                Architecting secure, compliant financial interfaces and transactional rails: mobile wallets, corporate card issuance,
                mobile money (M-Pesa), Stripe integrations, and multi-currency checkouts.
              </p>
              <ul className="service-list">
                <li>
                  <span aria-hidden="true">✓</span> M-PESA STK Push, USSD, Stripe, and Visa rails integration
                </li>
                <li>
                  <span aria-hidden="true">✓</span> Ledger integrity, double-entry money movement, digital KYC/KYB, and idempotent webhooks
                </li>
                <li>
                  <span aria-hidden="true">✓</span> Financial data security and biometric auth implementations
                </li>
              </ul>
              <div className="service-fit">
                <strong>Best for:</strong> Fintech startups, e-commerce platforms, payment processors
              </div>
              <a
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem', width: 'fit-content' }}
                href={`mailto:kibochas@gmail.com?subject=Fintech%20Integration%20Inquiry%20-%20Samuel%20Gichu&body=Hi%20Samuel%2C%0A%0AWe%20need%20assistance%20integrating%20payment%20rails%20or%20fintech%20features%3A%20...`}
              >
                Consult on Payments →
              </a>
            </div>

            <div className="service-card" id="service-ai">
              <span className="service-number">04</span>
              <h3 className="service-title">AI-Native Product Tooling &amp; Agents</h3>
              <p className="service-desc">
                Embedding practical AI into modern applications. Moving beyond simple wrappers into structured tool calling,
                autonomous agent loops, and Model Context Protocol (MCP) integrations.
              </p>
              <ul className="service-list">
                <li>
                  <span aria-hidden="true">✓</span> Real-time LLM tool execution, structured JSON outputs, and research agents
                </li>
                <li>
                  <span aria-hidden="true">✓</span> AI-assisted engineering workflows for codebase exploration and debugging
                </li>
                <li>
                  <span aria-hidden="true">✓</span> High-efficiency agentic workflows for operational workflows
                </li>
              </ul>
              <div className="service-fit">
                <strong>Best for:</strong> AI startups, productivity apps, predictive intelligence systems
              </div>
              <a
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem', width: 'fit-content' }}
                href={`mailto:kibochas@gmail.com?subject=AI%20Product%20Inquiry%20-%20Samuel%20Gichu&body=Hi%20Samuel%2C%0A%0AWe're%20looking%20to%20build%20an%20AI-native%20feature%20or%20agentic%20workflow%3A%20...`}
              >
                Explore AI Solutions →
              </a>
            </div>
          </div>
        </section>

        {/* 6. CONTACT / LEAD CAPTURE & CV LINKS */}
        <section id="contact" className="section-wrap section-spacing" aria-labelledby="contact-title">
          <div className="contact-container">
            <div className="contact-info">
              <div className="section-tag">Direct Inbound Line</div>
              <h2 id="contact-title">Let’s build something remarkable.</h2>
              <p>
                Whether you’re hiring for a senior engineering role, planning a contract sprint, or integrating fintech/AI features,
                I’m ready to help you ship. Choose a topic below to kick off the conversation directly.
              </p>
              <div className="contact-availability">
                <span className="pulse-dot" />
                <span>Open for Senior Remote Roles &amp; High-Impact Sprints</span>
              </div>

              {/* INTERACTIVE INQUIRY TOPIC SELECTOR */}
              <div className="inquiry-selector" style={{ marginTop: '2rem' }}>
                <span className="inquiry-label">What are you looking to build or hire for?</span>
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
              {/* PRIMARY EMAIL WITH COPY */}
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

              {/* WHATSAPP DIRECT CHAT */}
              <a
                id="contact-whatsapp-btn"
                className="btn btn-whatsapp"
                href={`https://wa.me/254728370802?text=Hi%20Samuel%2C%20I'm%20reaching%20out%20regarding%20${encodeURIComponent(selectedInquiry.label)}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp (+254 728 370 802) 💬
              </a>

              {/* LINKEDIN */}
              <a
                id="contact-linkedin-btn"
                className="btn btn-primary"
                href="https://www.linkedin.com/in/samuel-gichu-a29695b9/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn <span aria-hidden="true">↗</span>
              </a>

              {/* CV BUTTON */}
              <button
                type="button"
                id="contact-cv-btn"
                className="btn btn-outline"
                onClick={() => setCvOpen(true)}
              >
                View Full CV &amp; Credentials <span aria-hidden="true">📄</span>
              </button>

              <div className="contact-social-row" aria-label="Profiles and Products">
                <a
                  className="social-link"
                  href="https://www.linkedin.com/in/samuel-gichu-a29695b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="social-link"
                  href="https://kakitoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kakitoo
                </a>
                <a
                  className="social-link"
                  href="mailto:hello@a7studio.io"
                >
                  hello@a7studio.io
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CV MODAL (FULL VERIFIED CV DATA) */}
      {cvOpen && (
        <div
          className="cv-modal-backdrop"
          onClick={() => setCvOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-title"
        >
          <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cv-modal-header">
              <div>
                <h3 id="cv-title" className="cv-modal-title">
                  Samuel Gichu · Curriculum Vitae
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Senior Product Engineer | Mobile, Frontend &amp; AI-Powered Applications · Nairobi, Kenya
                </span>
              </div>
              <button
                type="button"
                id="close-cv-modal"
                className="menu-toggle"
                onClick={() => setCvOpen(false)}
                aria-label="Close CV preview"
              >
                ✕
              </button>
            </div>

            <div className="cv-modal-body">
              <div className="cv-section">
                <h4>Contact &amp; Location</h4>
                <p style={{ color: 'var(--color-text)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  <strong>Location:</strong> Nairobi, Kenya (Global Remote) &nbsp;|&nbsp;{' '}
                  <strong>Phone / WhatsApp:</strong> +254 728 370 802 &nbsp;|&nbsp;{' '}
                  <strong>Email:</strong> kibochas@gmail.com &nbsp;|&nbsp;{' '}
                  <strong>LinkedIn:</strong> linkedin.com/in/samuel-gichu-a29695b9
                </p>
              </div>

              <div className="cv-section">
                <h4>Professional Summary</h4>
                <p style={{ color: 'var(--color-muted)', lineHeight: '1.7', fontSize: '0.875rem' }}>
                  Senior Product Engineer with 7+ years of software engineering experience across mobile, frontend, and production
                  financial systems. Strong in Flutter, React, TypeScript, and API-driven product development, with experience owning
                  architecture, delivery, testing, and cross-functional execution. Increasingly focused on AI-powered applications and
                  AI-native engineering: using coding agents, MCP, and structured AI-assisted workflows for codebase exploration,
                  architecture planning, debugging, refactoring, documentation, and delivery. Brings domain experience across payments,
                  embedded finance, Web3, consumer products, and e-commerce, with a product mindset focused on turning complex systems
                  into usable customer experiences.
                </p>
              </div>

              <div className="cv-section">
                <h4>Core Skills</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-ink)', display: 'block', fontSize: '0.8125rem' }}>
                      Product Engineering
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      React, TypeScript, Next.js, Flutter, Dart, REST APIs, Product Architecture, Cross-Functional Delivery
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-ink)', display: 'block', fontSize: '0.8125rem' }}>
                      AI-Native Engineering
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      MCP, Claude, Cursor, AI Coding Agents, Agentic Workflows, AI-Assisted Debugging, Refactoring &amp; Documentation
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-ink)', display: 'block', fontSize: '0.8125rem' }}>
                      Payments &amp; Fintech
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      Stripe integrations, Payment APIs, Webhooks, KYC/KYB, Digital Onboarding, Wallets/Ledger, M-PESA STK &amp; USSD
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-ink)', display: 'block', fontSize: '0.8125rem' }}>
                      Engineering Practices
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      Testing (85% Coverage), CI/CD, Code Reviews, Technical Leadership, Performance Optimization, Maintainability
                    </span>
                  </div>
                </div>
              </div>

              <div className="cv-section">
                <h4>Professional Experience</h4>

                {/* Boya */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Software Engineer | Fintech Product Engineering</span>
                    <span className="cv-item-date">May 2026 – Present</span>
                  </div>
                  <span className="cv-item-company">Boya · Nairobi, Kenya</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Worked on Stripe KYC/KYB onboarding and Stripe integration for Boya’s business financial workflows.</li>
                    <li>Revamped money movement processes by fixing double-entry ledger issues, strengthening ledger integrity, and addressing negative balance scenarios.</li>
                    <li>Revamped Boya’s money market fund investment option for businesses.</li>
                  </ul>
                </div>

                {/* BeatBnk */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Mobile Team Lead | Senior Flutter Engineer</span>
                    <span className="cv-item-date">Jan 2025 – May 2026</span>
                  </div>
                  <span className="cv-item-company">BeatBnk · Nairobi, Kenya</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Led mobile engineering for production lifestyle and entertainment applications built with Flutter.</li>
                    <li>Architected Flutter applications using scalable architecture patterns and engineering best practices.</li>
                    <li>Managed the mobile development team, mentored engineers, and established modern engineering standards.</li>
                    <li>Implemented comprehensive testing and CI/CD practices; improved team velocity by 35% and reduced production bugs by 60%.</li>
                    <li>Used MCP servers and AI development tools to reduce development time by approximately 40% and accelerate feature delivery.</li>
                  </ul>
                </div>

                {/* Alvin Technologies */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Senior Frontend &amp; Mobile Engineer</span>
                    <span className="cv-item-date">Mar 2022 – Dec 2024</span>
                  </div>
                  <span className="cv-item-company">Alvin Technologies · Remote</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Built production embedded-finance applications for enterprise clients across mobile and web.</li>
                    <li>Developed custom Flutter packages integrating native iOS and Android APIs.</li>
                    <li>Built embeddable React finance widgets and connected product interfaces to financial APIs and transactional backend services.</li>
                    <li>Achieved approximately 85% automated test coverage and reduced deployment time by 50% through CI/CD automation.</li>
                    <li>Contributed to a 30% reduction in new-feature development time and increased client adoption through improved product experience.</li>
                  </ul>
                </div>

                {/* Valuencer */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Senior Frontend Engineer</span>
                    <span className="cv-item-date">Nov 2023 – Jun 2024</span>
                  </div>
                  <span className="cv-item-company">Valuencer · Denmark</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Built a blockchain investment platform connecting creators with their communities using React and TypeScript.</li>
                    <li>Developed a Progressive Web Application with responsive and accessible interfaces.</li>
                    <li>Integrated Sui blockchain functionality using its TypeScript SDK and collaborated on smart-contract integration.</li>
                    <li>Designed frontend experiences that made complex Web3 functionality accessible to non-technical users.</li>
                  </ul>
                </div>

                {/* Kakitoo */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Lead Mobile Engineer</span>
                    <span className="cv-item-date">Jan 2023 – Jan 2024</span>
                  </div>
                  <span className="cv-item-company">KAKITOO · Kenya</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Led development of a privacy-focused tipping and payments platform for the Kenyan market.</li>
                    <li>Built cross-platform iOS and Android applications using Flutter and a React-based web experience.</li>
                    <li>Integrated M-PESA STK Push and USSD transaction workflows for mobile-money payments.</li>
                    <li>Designed mobile-first user experiences and collaborated with backend engineers on APIs and deployment.</li>
                  </ul>
                </div>

                {/* SYNTAX */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Software Engineer | Mobile</span>
                    <span className="cv-item-date">Apr 2021 – Mar 2022</span>
                  </div>
                  <span className="cv-item-company">SYNTAX Ltd</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Shipped production Flutter applications and product features for US and UK clients.</li>
                    <li>Built reusable interfaces, integrated backend APIs, and resolved production stability issues.</li>
                  </ul>
                </div>

                {/* mb96 */}
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Software Engineer</span>
                    <span className="cv-item-date">Sep 2019 – Apr 2021</span>
                  </div>
                  <span className="cv-item-company">mb96 Ltd</span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6' }}>
                    <li>Shipped cross-platform mobile and web products for clients in Kenya, Canada, and the US.</li>
                    <li>Built reusable React, Flutter, and React Native interfaces connected to backend services and REST APIs.</li>
                  </ul>
                </div>
              </div>

              <div className="cv-section">
                <h4>Education</h4>
                <div className="cv-item">
                  <div className="cv-item-header">
                    <span className="cv-item-role">Bachelor of Science in Computer Science</span>
                    <span className="cv-item-date">2014 – 2018</span>
                  </div>
                  <span className="cv-item-company">Meru University of Science and Technology</span>
                </div>
              </div>
            </div>

            <div className="cv-modal-footer">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => window.print()}
              >
                Print / Save PDF 🖨️
              </button>
              <a
                className="btn btn-whatsapp btn-sm"
                href="https://wa.me/254728370802?text=Hi%20Samuel%2C%20reviewing%20your%20CV%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Samuel 💬
              </a>
              <a
                className="btn btn-primary btn-sm"
                href="mailto:kibochas@gmail.com?subject=Senior%20Engineering%20Role%20/%20Contract%20Discussion"
              >
                Email Samuel →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-left">
            <span className="brand-mark">
              A7<span className="brand-dot">.</span>Studio
            </span>
            <p className="footer-desc">
              Independent engineering lab of Samuel Gichu. Mobile, frontend, fintech and AI-assisted products.
            </p>
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
