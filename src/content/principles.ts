/** How I work points (spec 0007, AC-2). Every point links to work that proves it. */
export interface Principle {
  id: string
  title: string
  line: string
  proof: { label: string; href: string }
}

/** Source: Samuel's bio (2026-11-15) and the work stories. No figures. */
export const principles: Principle[] = [
  {
    id: 'no-smartphone',
    title: 'Reach people without smartphones',
    line: 'Tips on Kakitoo arrive by M-PESA, and workers without a smartphone can receive them anonymously.',
    proof: { label: 'Kakitoo', href: '/work/kakitoo' },
  },
  {
    id: 'ledger',
    title: 'Keep the money right when things fail',
    line: 'At Boya I worked on duplicate payments, retries and failure cases so balances stay correct.',
    proof: { label: 'Boya', href: '/work/boya' },
  },
  {
    id: 'embedded',
    title: 'Fit inside apps I do not control',
    line: 'At Alvin, finance features ran inside banks’ own apps and websites in Nigeria.',
    proof: { label: 'Alvin', href: '/work/alvin' },
  },
  {
    id: 'testing',
    title: 'Catch problems before users do',
    line: 'At BeatBnk, automated testing raised velocity by 35% and cut production bugs by 60%.',
    proof: { label: 'BeatBnk', href: '/work/beatbnk' },
  },
]
