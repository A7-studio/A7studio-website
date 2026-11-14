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

/** Source: CV dated 2026-11-01 plus facts Samuel supplied. No performance figures. */
export const experience: Experience[] = [
  {
    id: 'boya',
    company: 'Boya',
    title: 'Full Stack Engineer, Fintech & Payments',
    location: 'Nairobi, Kenya',
    dates: 'May 2026 – Oct 2026',
    kind: 'employer',
    summary: [
      'Built payment workflows across mobile, backend APIs and integrations: Stripe Connect, webhooks and transaction lifecycle handling.',
      'Worked on KYC/KYB onboarding, ledger workflows managed with Temporal, and reconciliation.',
      'Strengthened wallet and ledger integrity: double-entry correctness, negative balances, failure and retry paths.',
      'Built payments and operations dashboards in React and Vue.js on NestJS APIs.',
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
      'Led a distributed mobile team as a hands-on engineer: architecture, code review, mentoring, and shipping the hardest parts.',
      'Introduced automated testing and CI/CD for the Flutter apps, and used AI-assisted workflows (MCP, coding agents).',
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
      'Built Budgets and Insights, an embedded app for enterprise users to plan spend, budget and see insights about their money in real time.',
      'Maintained and built new features for the Alvin app, a personal finance management app.',
      'Built an embeddable mini app for booking flight tickets for enterprise clients such as bank apps.',
      'Built custom Flutter packages integrating native iOS and Android APIs.',
      'Built React and Vue.js dashboards on NestJS APIs, with automated testing and CI/CD.',
    ],
    url: 'https://alvin.finance/',
    workIds: ['alvin'],
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
      'Led a privacy-first M-PESA tipping platform end to end: Flutter on iOS and Android, a React web app, STK Push and USSD flows.',
      'Designed mobile-first experiences for low-connectivity users and owned app-store releases.',
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
      'Shipped production Flutter apps for US and UK clients, including Giraffe Spotter.',
      'Built reusable component libraries and fixed production issues.',
    ],
    url: 'https://synt.ax/',
    workIds: ['syntax'],
  },
  {
    id: 'mb96',
    company: 'mb96 Ltd',
    title: 'Software Engineer, Mobile & Web',
    location: 'Kenya',
    dates: 'Sep 2019 – Apr 2021',
    kind: 'employer',
    summary: [
      'Shipped cross-platform mobile and web products for clients in Kenya, Canada and the US, with Flutter, React and React Native.',
      'Helped build T-Kash, Fueling Brains, Missing Voices and Chupachap.',
    ],
    workIds: ['telkom', 'chupachap', 'fuelingbrains', 'missingvoices'],
  },
  {
    id: 'gavtech',
    company: 'Gavtech Solutions',
    title: 'Co-founder',
    location: 'Kenya',
    kind: 'cofounded',
    summary: ['Co-founded a studio that built websites for clients.'],
    url: 'https://gavtechsolutions.co.ke/',
  },
]

/** Companies shown in the employer strip, in the order recruiters should read them. */
export const employerStrip = ['Boya', 'BeatBnk', 'Alvin Technologies', 'SYNTAX', 'mb96', 'Gavtech']
