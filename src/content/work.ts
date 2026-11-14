export type ProjectCategory = 'all' | 'mobile' | 'frontend' | 'fintech'

export interface StoryImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface StoryChapter {
  headline: string
  body: string
  images?: StoryImage[]
}

export interface Story {
  /** Screens render only when true. Set it after removing real user and employer data. */
  screensCleared: boolean
  role: string
  cover?: StoryImage
  brief: StoryChapter
  myPart: StoryChapter
  build: StoryChapter
  /** Omitted until Samuel confirms an outcome. */
  result?: StoryChapter
  credits?: string
}

export interface WorkItem {
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
  year?: string
  /** One honest label: Employer work, Live, Company closed, Side product (paused). */
  status?: string
  /** The company the work was done through (employer or agency). Drives the company filter. */
  through?: string
  /** Short name shown on typographic covers. */
  shortName?: string
  story?: Story
}

export const categoryFilters: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile / Flutter' },
  { id: 'frontend', label: 'Frontend & Web' },
  { id: 'fintech', label: 'Fintech & Payments' },
]

export const projects: WorkItem[] = [
  {
    id: 'boya',
    status: 'Employer work',
    index: '01',
    projectTitle: 'Business Payments & Ledger Systems',
    clientContext: 'Shipped for Boya · Fintech · Nairobi, Kenya',
    impactBadge: 'Fintech Product Engineering',
    category: ['mobile', 'fintech'],
    headline: 'Payments, money movement, ledger integrity, and business investment products.',
    description:
      'Worked on Stripe KYC/KYB onboarding and Stripe integration for business financial workflows. Revamped money movement processes by fixing double-entry ledger issues, strengthening ledger integrity, and addressing negative balance scenarios. Also helped revamp a money market fund investment option for businesses.',
    tags: ['Stripe', 'KYC/KYB', 'Money Movement', 'Double-Entry Ledger', 'Ledger Integrity', 'Money Market Funds'],
    url: 'https://www.boyahq.com/',
  },
  {
    id: 'beatbnk',
    status: 'Company closed',
    index: '02',
    projectTitle: 'Lifestyle & Entertainment Mobile Apps',
    clientContext: 'Shipped for BeatBnk · Mobile Team Lead',
    impactBadge: 'Mobile Product Engineering',
    category: ['mobile', 'fintech'],
    headline: 'Mobile engineering leadership, Flutter architecture, and AI assisted delivery.',
    description:
      'Led mobile development and mentored the team across Flutter architecture, testing, CI/CD, and AI augmented workflows. Automated testing and CI/CD raised velocity by 35% and cut production bugs by 60%. Used MCP servers and tools including Antigravity, Cursor, and Claude in the team workflow.',
    tags: ['Flutter', 'Mobile Architecture', 'AI Assisted Development', 'MCP', 'Testing', 'CI/CD'],
    url: 'https://www.linkedin.com/in/samuel-gichu-a29695b9/',
  },
  {
    id: 'alvin',
    status: 'Employer work',
    index: '03',
    projectTitle: 'Embedded Finance Applications',
    clientContext: 'Shipped for Alvin Technologies (alvin.finance) · Remote',
    impactBadge: 'Embedded Finance Engineering',
    category: ['mobile', 'frontend', 'fintech'],
    headline: 'Embedded budgeting, flight booking, and a personal finance app for enterprise clients.',
    description:
      'Most of the apps were mini apps that add personal finance features inside existing mobile and web apps of enterprise clients, mainly banks in Nigeria. Built Budgets and Insights, an embedded app that lets enterprise users plan their spend, budget and get insights about their money in real time. Built an embeddable mini app for booking flight tickets for enterprise clients such as bank apps, embeddable React finance widgets, and custom Flutter packages with native iOS and Android APIs. Maintained and built new features for the Alvin app, a personal finance management app, with automated testing and CI/CD.',
    tags: ['Flutter', 'React', 'Next.js', 'TanStack Query', 'Firebase', 'Native APIs', 'CI/CD', 'Flask'],
    url: 'https://alvin.finance/',
  },
  {
    id: 'kakitoo',
    status: 'Side product, paused',
    index: '04',
    projectTitle: 'Privacy Focused Tipping Platform',
    clientContext: 'Kakitoo · Lead Mobile Engineer',
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
    status: 'Live',
    index: '05',
    projectTitle: 'Liquor Delivery E-commerce Platform',
    clientContext: 'Built through mb96 · for Chupachap, Nairobi',
    impactBadge: 'Mobile Product Engineering',
    category: ['mobile'],
    headline: 'A WooCommerce commerce platform for fast liquor delivery in Nairobi.',
    description:
      'Helped build the e-commerce solution with WooCommerce integration, a 500+ item product catalog, responsive mobile shopping experience, and payment gateway checkout. The platform is live and serving Nairobi customers through Chupa Chap’s fast delivery service.',
    tags: ['Flutter', 'React', 'React Native', 'WordPress', 'WooCommerce', 'Node.js', 'REST APIs', 'MongoDB'],
    url: 'https://chupachap.co.ke',
  },
  {
    id: 'telkom',
    status: 'Employer work',
    index: '06',
    projectTitle: 'T-Kash Mobile Payments App',
    clientContext: 'Built through mb96 · for Telkom Kenya',
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
    status: 'Employer work',
    index: '07',
    projectTitle: 'Giraffe Spotter & Client Applications',
    clientContext: 'Built through SYNTAX · for the Giraffe Conservation Foundation',
    impactBadge: 'Product Engineering',
    category: ['mobile', 'frontend'],
    headline: 'An AI assisted citizen science app for giraffe research and conservation.',
    description:
      'Built Flutter applications from design, reusable component libraries, backend integrations, and production fixes for international clients. For Giraffe Spotter, built the mobile experience for uploading giraffe photos, fur pattern matching, location and date capture, directory browsing, and donations, helping GCF turn safari sightings into research data.',
    tags: ['Flutter', 'AI Image Matching', 'Citizen Science', 'Firebase', 'REST APIs', 'Cloud Functions'],
    url: 'https://synt.ax/',
  },
  {
    id: 'fuelingbrains',
    status: 'Employer work',
    index: '08',
    projectTitle: 'Early Childhood Education Platform',
    clientContext: 'Built through mb96 · for Fueling Brains',
    impactBadge: 'Web Product Engineering',
    category: ['frontend'],
    headline: 'A learning platform for early childhood education.',
    description:
      'Part of the team at mb96 that built web products for Fueling Brains, an early childhood education company with a learning system, school solutions, and tools for educators and parents.',
    tags: ['Web'],
    url: 'https://www.fuelingbrains.com/',
  },
  {
    id: 'missingvoices',
    status: 'Employer work',
    index: '09',
    projectTitle: 'Human Rights Reporting Platform',
    clientContext: 'Built through mb96 · for Missing Voices, Kenya',
    impactBadge: 'Web Product Engineering',
    category: ['frontend'],
    headline: 'A public record of police killings and enforced disappearances in Kenya.',
    description:
      'Part of the team at mb96 that built the Missing Voices website, which documents extrajudicial killings and enforced disappearances, publishes news and statistics, and lets people report an incident, sign petitions, and follow trials.',
    tags: ['Web'],
    url: 'https://missingvoices.or.ke/',
  },
]

const stories: Record<string, Story> = {
  boya: {
    screensCleared: false,
    role: 'Full Stack Engineer, Fintech & Payments',
    brief: {
      headline: 'Businesses needed to move money with confidence.',
      body: 'Boya is a fintech product for business finance. The work covered payments, KYC/KYB onboarding, money movement, and a money market fund investment option for businesses.',
    },
    myPart: {
      headline: 'Payments across mobile, APIs, and integrations.',
      body: 'I built payment workflows across mobile, backend APIs, and integrations, including Stripe Connect, webhooks, and transaction lifecycle handling. I also built payments and operations dashboards in React and Vue.js on NestJS APIs.',
    },
    build: {
      headline: 'Ledgers that balance, workflows that recover.',
      body: 'Money movement ran as workflows managed with Temporal. I strengthened ledger integrity: double-entry correctness, negative balance cases, failure and retry paths, and reconciliation.',
    },
  },
  alvin: {
    screensCleared: false,
    role: 'Senior Frontend & Mobile Engineer',
    brief: {
      headline: 'Enterprise clients wanted finance inside their own products.',
      body: 'Alvin Technologies builds embedded finance: mini apps and widgets that put personal finance features inside the existing mobile and web apps of enterprise clients, mainly banks in Nigeria. It also makes the Alvin app, a personal finance management app.',
    },
    myPart: {
      headline: 'Mobile and web, working asynchronously with a remote team.',
      body: 'I maintained and built new features for the Alvin app, a personal finance management app, and built embedded products for enterprise clients across mobile and web.',
    },
    build: {
      headline: 'Budgets, flights, widgets, and dashboards.',
      body: 'Budgets and Insights is an embedded app that lets enterprise users plan their spend, budget and see insights about their money in real time. I also built an embeddable mini app for booking flight tickets for enterprise clients such as bank apps, embeddable React widgets, custom Flutter packages that integrate native iOS and Android APIs, and React and Vue.js dashboards on NestJS APIs, shipped with automated testing and CI/CD.',
    },
  },
  kakitoo: {
    screensCleared: true,
    role: 'Lead Mobile Engineer',
    cover: {
      src: '/work/kakitoo/welcome.webp',
      alt: 'The Kakitoo welcome page, showing how to dial *835*77# to tip with M-Pesa and the first step of getting a KAKITOO ID.',
      width: 1280,
      height: 800,
    },
    brief: {
      headline: 'Blue collar workers needed a safe way to be tipped.',
      body: 'Kakitoo is a tipping platform for blue collar workers in East Africa. The aim is to help people boost their income securely and anonymously, whether or not the tipper has a smartphone.',
    },
    myPart: {
      headline: 'Mobile lead, across the app and the web.',
      body: 'I led the mobile engineering and built the Flutter app and the React web frontend for the product.',
    },
    build: {
      headline: 'Payments and privacy, built into the flow.',
      body: 'Tips are paid with M-Pesa STK Push. Anonymous USSD tipping works through *835*77#, and the custom KAKITOO ID system keeps tipper and worker details private.',
    },
  },
  telkom: {
    screensCleared: false,
    role: 'Mobile engineer, part of the mb96 team',
    brief: {
      headline: 'Telkom Kenya customers needed one app for payments and self service.',
      body: 'T-Kash is a mobile payments app for Telkom Kenya customers, covering payments, balances, and telecom services.',
    },
    myPart: {
      headline: 'One of the mobile engineers at mb96.',
      body: 'I was part of the team at mb96 that built T-Kash.',
    },
    build: {
      headline: 'Flutter flows on top of Telkom APIs.',
      body: 'The mobile flows for payments, account balances, and telecom services run through Telkom APIs.',
    },
  },
  syntax: {
    screensCleared: false,
    role: 'Flutter engineer at SYNTAX Ltd',
    brief: {
      headline: 'Safari sightings could become research data.',
      body: 'Giraffe Spotter is an AI assisted citizen science app for giraffe research and conservation, helping GCF turn safari sightings into research data.',
    },
    myPart: {
      headline: 'The mobile experience, from design to production.',
      body: 'At SYNTAX I built Flutter applications from design, with reusable component libraries, backend integrations, and production fixes for international clients. For Giraffe Spotter I built the mobile experience.',
    },
    build: {
      headline: 'Photos in, matched sightings out.',
      body: 'People upload giraffe photos, the app handles fur pattern matching, captures location and date, lets people browse a directory, and takes donations.',
    },
  },
}

stories.chupachap = {
  screensCleared: true,
  role: 'Software Engineer, mobile and web',
  cover: {
    src: '/work/chupachap/home.webp',
    alt: 'The Chupachap home page, with the category menu, search, and a promotional banner.',
    width: 1280,
    height: 800,
  },
  brief: {
    headline: 'Nairobi needed liquor delivered fast.',
    body: 'Chupa Chap is a liquor delivery store for Nairobi customers, built around fast delivery.',
  },
  myPart: {
    headline: 'The whole shopping experience.',
    body: 'I helped build the e-commerce solution at mb96: a responsive mobile shopping experience and a payment gateway checkout.',
  },
  build: {
    headline: 'WooCommerce at the core.',
    body: 'The store runs on WooCommerce, with a catalog of more than 500 items, and it is live at chupachap.co.ke.',
  },
}

const storyByProject: Record<string, string> = {
  boya: 'boya',
  alvin: 'alvin',
  telkom: 'telkom',
  syntax: 'syntax',
  kakitoo: 'kakitoo',
  chupachap: 'chupachap',
}

const throughByProject: Record<string, string> = {
  boya: 'Boya',
  beatbnk: 'BeatBnk',
  alvin: 'Alvin Technologies',
  kakitoo: 'Kakitoo',
  chupachap: 'mb96',
  telkom: 'mb96',
  fuelingbrains: 'mb96',
  missingvoices: 'mb96',
  syntax: 'SYNTAX',
}

const shortNames: Record<string, string> = {
  boya: 'Boya',
  beatbnk: 'BeatBnk',
  alvin: 'Alvin',
  kakitoo: 'Kakitoo',
  chupachap: 'Chupachap',
  telkom: 'T-Kash',
  syntax: 'Giraffe Spotter',
  fuelingbrains: 'Fueling Brains',
  missingvoices: 'Missing Voices',
}

export const workItems: WorkItem[] = projects.map((project) => {
  const storyKey = storyByProject[project.id]
  const withName = { ...project, shortName: shortNames[project.id], through: throughByProject[project.id] }
  return storyKey ? { ...withName, story: stories[storyKey] } : withName
})

/** Companies the work was done through, in the order they first appear. */
export const throughFilters = [...new Set(projects.map((project) => throughByProject[project.id]))]

export const storyItems = workItems.filter((item) => item.story)
export const storySlugs = storyItems.map((item) => item.id)

/** Stories shown on the home page, in this order (spec 0004). */
export const featuredStories = ['boya', 'alvin', 'syntax', 'kakitoo']
  .map((id) => storyItems.find((item) => item.id === id))
  .filter((item): item is WorkItem => Boolean(item))

export function findStory(slug: string) {
  return storyItems.find((item) => item.id === slug)
}

export function nextStory(slug: string) {
  const index = storyItems.findIndex((item) => item.id === slug)
  return storyItems[(index + 1) % storyItems.length]
}

/** Images that may be shown: only when the story has been cleared. */
export function visibleImage(item: WorkItem, image?: StoryImage) {
  return item.story?.screensCleared ? image : undefined
}

export const SITE_URL = 'https://a7studio.dev'
