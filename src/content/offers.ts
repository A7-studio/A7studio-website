/** What I can build for founders and teams (spec 0008, AC-2). Prices are never shown. */
export interface OfferProof {
  label: string
  /** An internal path that must exist: `check:static` fails on a dead proof link. */
  href: string
}

export interface Offer {
  id: string
  title: string
  lines: string[]
  proof: OfferProof[]
  /** For example "New" for an offer backed by work in progress. */
  label?: string
}

/** For recruiters: shown lower on the page, next to the experience timeline. */
export const hiring = {
  title: 'Full-time, hybrid or remote role',
  body: 'Full-stack, Flutter, payments or applied AI engineer, in Kenya or remote and open to Kenya.',
}

export const offers: Offer[] = [
  {
    id: 'ai-app',
    title: 'An AI-powered first version',
    label: 'New',
    lines: [
      'Your idea as a working app: LLM features, retrieval over your own data, and tests that check what the AI returns.',
      'I am building jobmigo this way, from the first screen to the evaluation tests.',
    ],
    proof: [{ label: 'jobmigo', href: '/jobmigo' }],
  },
  {
    id: 'ai-features',
    title: 'AI features in your product',
    lines: [
      'AI added to a product you already run: review, reconciliation, matching or an assistant, built into your current stack.',
      'Claude-based code review and an AI reconciliation tool at Boya, and AI photo matching in Giraffe Spotter.',
    ],
    proof: [
      { label: 'Boya', href: '/work/boya' },
      { label: 'Giraffe Spotter', href: '/work/syntax' },
    ],
  },
  {
    id: 'mobile-payments',
    title: 'Mobile and payments apps',
    lines: [
      'Flutter and React Native apps from design to store release, with M-PESA or Stripe payments, wallets and ledgers that stay correct through retries and failures.',
    ],
    proof: [
      { label: 'Kakitoo', href: '/work/kakitoo' },
      { label: 'Boya', href: '/work/boya' },
      { label: 'T-Kash', href: '/work/telkom' },
    ],
  },
  {
    id: 'web',
    title: 'Web apps and dashboards',
    lines: ['React, Next.js and TypeScript products, finance dashboards and embeddable mini apps, on REST and NestJS APIs.'],
    proof: [
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Chupachap', href: '/work/chupachap' },
    ],
  },
]
