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
  /** Catalog filters this card appears under (spec 0010). */
  kinds: OfferKind[]
  /** Honest status of the proof: shipped work, or a product still being built. */
  status: 'Shipped' | 'Building'
}

export type OfferKind = 'ai' | 'mobile' | 'payments' | 'web'

export const offerFilters: { id: OfferKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'payments', label: 'Payments' },
  { id: 'web', label: 'Web' },
]

/** For recruiters: shown lower on the page, next to the experience timeline. */
export const hiring = {
  title: 'Full-time, hybrid or remote role',
  body: 'An engineer for payments, mobile, web or applied AI work, in Kenya or remote and open to Kenya.',
}

export const offers: Offer[] = [
  {
    id: 'ai-app',
    kinds: ['ai'],
    status: 'Building',
    title: 'An AI-powered first version',
    label: 'New',
    lines: [
      'Your idea as a working app people can try. The AI answers from your own information, and its answers are tested before they reach anyone.',
      'I am building jobmigo this way.',
    ],
    proof: [{ label: 'jobmigo', href: '/jobmigo' }],
  },
  {
    id: 'ai-features',
    kinds: ['ai'],
    status: 'Shipped',
    title: 'AI features in your product',
    lines: [
      'Hand slow work to AI inside the product you already run: reviewing, matching records or answering common questions, with a person still in charge.',
      'I have worked on AI review and reconciliation tools at Boya, and added AI photo matching to Giraffe Spotter.',
    ],
    proof: [
      { label: 'Boya', href: '/work/boya' },
      { label: 'Giraffe Spotter', href: '/work/syntax' },
    ],
  },
  {
    id: 'mobile-payments',
    kinds: ['mobile', 'payments'],
    status: 'Shipped',
    title: 'Mobile and payments apps',
    lines: [
      'An app on your customers’ phones that takes M-PESA or card payments, and keeps the money records right when a network drops or someone taps twice.',
    ],
    proof: [
      { label: 'Kakitoo', href: '/work/kakitoo' },
      { label: 'Boya', href: '/work/boya' },
      { label: 'T-Kash', href: '/work/telkom' },
    ],
  },
  {
    id: 'web',
    kinds: ['web', 'payments'],
    status: 'Shipped',
    title: 'Web apps and dashboards',
    lines: [
      'A dashboard your team can read at a glance, or a new feature that fits inside a product your customers already use.',
    ],
    proof: [
      { label: 'Alvin', href: '/work/alvin' },
      { label: 'Chupachap', href: '/work/chupachap' },
    ],
  },
]
