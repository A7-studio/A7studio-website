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
    line: 'Tips on Kakitoo arrive through M-Pesa STK Push, and anonymously over USSD for workers who have no smartphone.',
    proof: { label: 'Kakitoo', href: '/work/kakitoo' },
  },
  {
    id: 'ledger',
    title: 'Keep the money right when things fail',
    line: 'At Boya I worked on double entry ledgers, retries and failure paths so balances stay correct.',
    proof: { label: 'Boya', href: '/work/boya' },
  },
  {
    id: 'embedded',
    title: 'Fit inside apps I do not control',
    line: 'At Alvin, finance features ran as mini apps embedded in existing bank apps and web apps in Nigeria.',
    proof: { label: 'Alvin', href: '/work/alvin' },
  },
  {
    id: 'testing',
    title: 'Catch problems before users do',
    line: 'At BeatBnk, automated testing and CI/CD raised velocity by 35% and cut production bugs by 60%.',
    proof: { label: 'BeatBnk', href: '/work/beatbnk' },
  },
]
