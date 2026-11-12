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
  title: 'Full time or contract role',
  body: 'Senior mobile, full stack, fintech or AI engineer on a distributed team, or a contract with a defined scope.',
}

export const offers: Offer[] = [
  {
    id: 'mobile',
    title: 'Mobile app build',
    lines: ['Flutter and React Native apps, from design to store release.', 'I have led mobile teams and built apps for clients in Kenya, Canada and the US.'],
    proof: [
      { label: 'Giraffe Spotter', href: '/work/syntax' },
      { label: 'Kakitoo', href: '/work/kakitoo' },
      { label: 'T-Kash', href: '/work/telkom' },
    ],
  },
  {
    id: 'payments',
    title: 'Payments and fintech',
    lines: ['Stripe Connect, M-Pesa, ledgers, KYC and KYB onboarding, and money movement that recovers from failure.', 'Built inside fintech teams, on mobile, web and NestJS APIs.'],
    proof: [
      { label: 'Boya', href: '/work/boya' },
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Kakitoo', href: '/work/kakitoo' },
    ],
  },
  {
    id: 'web',
    title: 'Web app build',
    lines: ['React and TypeScript products, dashboards and embeddable widgets.', 'Reusable UI systems on top of REST and NestJS APIs.'],
    proof: [
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Chupachap', href: '/work/chupachap' },
    ],
  },
  {
    id: 'ai',
    title: 'AI powered features',
    label: 'New',
    lines: ['Adding AI features to a product, from the idea to something people can use.', 'I am building jobmigo to learn this end to end, and I use AI tools in my daily work.'],
    proof: [{ label: 'jobmigo', href: '/jobmigo' }],
  },
]
