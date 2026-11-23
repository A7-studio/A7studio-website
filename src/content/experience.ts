export type ExperienceKind = 'employer' | 'cofounded' | 'side-product'

export interface Experience {
  id: string
  company: string
  title: string
  location: string
  /** Free text such as "May 2026 – Oct 2026". Omitted when not yet supplied. */
  dates?: string
  kind: ExperienceKind
  /** Extra label such as "Company closed" or "Paused". */
  note?: string
  summary: string[]
  url?: string
  /** Ids of projects in `work.ts` that were done in this role. */
  workIds?: string[]
}

/** Source: the candidate profile and CV (2026-11-24) plus facts Samuel supplied. Figures are the ones Samuel confirmed. */
export const experience: Experience[] = [
  {
    id: 'boya',
    company: 'Boya',
    title: 'Full Stack Engineer, Fintech & Payments',
    location: 'Nairobi, Kenya',
    dates: 'May 2026 – Oct 2026',
    kind: 'employer',
    summary: [
      'Built a money market fund (MMF) investment feature end to end, from NestJS APIs to a Vue.js dashboard, so businesses could invest their money.',
      'Fixed duplicate payments and negative wallet balances by adding idempotency keys and safe retries in PostgreSQL, so a retried payment is recorded only once.',
      'Worked on a Stripe Connect integration with KYB/KYC onboarding so businesses in the US market could use Boya.',
      'Built data-driven finance dashboards in React on REST APIs.',
      'Built payment, wallet and access features in the Boya Flutter app (Google Play and App Store).',
      'Helped build a Claude-based AI code-review step in the CI/CD pipeline, and improved an AI reconciliation tool to reduce discrepancies for some transaction types.',
      'Set up Redis rate limiting and caching and feature flags for staged rollouts, and supported production releases.',
    ],
    url: 'https://www.boyahq.com/',
    workIds: ['boya'],
  },
  {
    id: 'beatbnk',
    company: 'BeatBnk',
    title: 'Mobile Team Lead, Senior Flutter Engineer',
    location: 'Nairobi, Kenya',
    dates: 'Jan 2025 – May 2026',
    kind: 'employer',
    note: 'Company closed',
    summary: [
      'Introduced automated testing and CI/CD, raising team velocity by 35% and cutting production bugs by 60%.',
      'Brought Claude Code, Cursor and MCP servers into daily work, cutting development time by about 40%.',
      'Mentored engineers on Flutter architecture and set engineering standards for the mobile codebase.',
      'The company has closed and the app is no longer on the Play Store.',
    ],
  },
  {
    id: 'alvin',
    company: 'Alvin Technologies',
    title: 'Senior Frontend & Mobile Engineer',
    location: 'Remote',
    dates: 'Mar 2022 – Dec 2024',
    kind: 'employer',
    summary: [
      'Delivered embedded-finance apps and data-driven finance dashboards for enterprise clients with React and TypeScript. Most were mini apps inside existing mobile and web apps, mainly for banks in Nigeria.',
      'Built Budgets and Insights, an embedded app for enterprise users to plan spend, budget and see insights about their money in real time, with spend split into needs, wants and savings and transactions synced and categorised when a bank account is linked.',
      'Built an embeddable mini app for booking flight tickets, from search to traveller details and confirmation, for enterprise clients such as bank apps.',
      'Built embedded mini apps in Next.js and Tailwind CSS, and Flutter packages using native iOS and Android APIs. Maintained and built new features for the Alvin personal finance app.',
      'Built backend services for financial transactions and contributed to the team\'s Python (Flask) codebase.',
      'Reached about 85% automated test coverage and cut deployment time by 50% with CI/CD pipelines.',
      'Increased client adoption by 40% and cut new-feature development time by 30%.',
    ],
    url: 'https://alvin.finance/',
    workIds: ['alvin'],
  },
  {
    id: 'valuencer',
    company: 'Valuencer',
    title: 'Senior Frontend Engineer',
    location: 'Denmark',
    dates: 'Nov 2023 – Apr 2024',
    kind: 'employer',
    note: 'Freelance',
    summary: [
      'Built the React and TypeScript frontend for a platform where fans invest in creators, shipped as a PWA.',
      'Integrated the Sui blockchain SDK with REST APIs for the platform\'s decentralised features.',
    ],
  },
  {
    id: 'kakitoo',
    company: 'Kakitoo',
    title: 'Lead Mobile Engineer',
    location: 'Kenya',
    dates: 'Jan 2023 – Jan 2024',
    kind: 'side-product',
    note: 'Side product, paused',
    summary: [
      'Led the platform end to end: Flutter apps for iOS and Android, and a Next.js web app.',
      'Integrated M-PESA STK Push and USSD so people can tip with mobile money.',
      'Built a custom Kakitoo ID so users can receive tips without sharing personal details.',
    ],
    url: 'https://kakitoo.com',
    workIds: ['kakitoo'],
  },
  {
    id: 'syntax',
    company: 'SYNTAX Ltd',
    title: 'Mobile Engineer (Flutter)',
    location: 'Remote',
    dates: 'Apr 2021 – Mar 2022',
    kind: 'employer',
    summary: [
      'Built Giraffe Spotter for the Giraffe Conservation Foundation, live on Google Play and the App Store: users upload giraffe photos and an AI algorithm matches each fur pattern. I integrated the AI matching and built the backend APIs in Laravel (PHP).',
      'Delivered Flutter apps for iOS and Android from UI designs, including Camo Chess.',
      'Created reusable component libraries that cut development time by 25%, with all projects delivered on time.',
    ],
    url: 'https://synt.ax/',
    workIds: ['syntax'],
  },
  {
    id: 'mb96',
    company: 'mb96 Ltd',
    title: 'Software Engineer',
    location: 'Kenya',
    dates: 'Sep 2019 – Apr 2021',
    kind: 'employer',
    summary: [
      'Part of the initial team that built the first version of T-Kash, Telkom Kenya\'s mobile payments app, in React Native.',
      'Delivered Chupachap (chupachap.co.ke), a live liquor-delivery store in Nairobi with a 500+ product catalogue and online checkout.',
      'Worked on NGO projects Missing Voices and Fueling Brains.',
      'Worked on the app side of the first version (MVP) of Power (yourpower.io).',
    ],
    workIds: ['telkom', 'chupachap', 'fuelingbrains', 'missingvoices'],
  },
  {
    id: 'gavtech',
    company: 'Gavtech Solutions',
    title: 'Software Developer, Co-founder',
    location: 'Kenya',
    dates: 'Jun 2017 – Jan 2020',
    kind: 'cofounded',
    summary: [
      'Co-founded a web development firm building websites and e-commerce platforms for Kenyan clients.',
      'Built websites for government and NGO clients, and e-commerce sites with payment integration.',
      'Worked with clients from requirements to launch.',
    ],
    url: 'https://gavtechsolutions.co.ke/',
  },
]

/** Companies shown in the employer strip, in the order recruiters should read them. */
export const employerStrip = ['Boya', 'BeatBnk', 'Alvin Technologies', 'SYNTAX', 'mb96', 'Gavtech']
