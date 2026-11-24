/** Ways to work with Samuel (spec 0006, AC-8). Prices are never shown. */
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

export const hiring = {
  title: 'Full-time, hybrid or remote role',
  body: 'Full-time, hybrid or remote role: full-stack, Flutter, payments or applied AI engineer, in Kenya or remote and open to Kenya.',
}

export const offers: Offer[] = [
  {
    id: 'mobile',
    title: 'Mobile app build',
    lines: ['Flutter and React Native apps built for low cost phones and patchy data, from design to store release.', 'I have led mobile teams and built apps for clients in Kenya, Canada and the US.'],
    proof: [
      { label: 'Giraffe Spotter', href: '/work/syntax' },
      { label: 'Kakitoo', href: '/work/kakitoo' },
      { label: 'T-Kash', href: '/work/telkom' },
    ],
  },
  {
    id: 'payments',
    title: 'Payments and fintech',
    lines: ['Stripe Connect, M-PESA, wallets and ledgers, KYC and KYB, a money market fund feature, and payments that stay correct through retries and failures.', 'Built inside fintech teams, on mobile, web and NestJS APIs.'],
    proof: [
      { label: 'Boya', href: '/work/boya' },
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Kakitoo', href: '/work/kakitoo' },
    ],
  },
  {
    id: 'web',
    title: 'Web app build',
    lines: ['React, Next.js and TypeScript products, finance dashboards and embeddable mini apps, on REST and NestJS APIs.'],
    proof: [
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Chupachap', href: '/work/chupachap' },
    ],
  },
  {
    id: 'ai',
    title: 'AI powered features',
    label: 'New',
    lines: ['Claude-based code review and AI reconciliation tools at Boya, AI photo matching in Giraffe Spotter, and jobmigo (in development).'],
    proof: [{ label: 'jobmigo', href: '/jobmigo' }],
  },
]
