/** How I work with a founder or team (spec 0008, AC-4). No time frames until Samuel confirms them. */
/** One line of the small animated illustration on a step (decorative, spec 0012). */
export interface DemoLine {
  kind: 'founder' | 'samuel' | 'check' | 'commit' | 'term' | 'ok'
  text: string
}

export interface ProcessStep {
  id: string
  title: string
  line: string
  demo: DemoLine[]
}

export const processSteps: ProcessStep[] = [
  {
    id: 'talk',
    title: 'Talk it through',
    line: 'You tell me the idea, who it is for and what has to work first. I tell you what I would build first and what I would leave out.',
    demo: [
      { kind: 'founder', text: 'Customers keep asking the same questions.' },
      { kind: 'samuel', text: 'Could an assistant answer them from your docs?' },
      { kind: 'founder', text: 'Yes, and hand off to a person when it is unsure.' },
    ],
  },
  {
    id: 'plan',
    title: 'A short plan',
    line: 'I write down the first version, the stack, the risks, and how I will check that the AI parts give good answers.',
    demo: [
      { kind: 'check', text: 'First version: answers from your docs' },
      { kind: 'check', text: 'Stack: Next.js, Postgres, an LLM API' },
      { kind: 'check', text: 'Risk: wrong answers, so add a hand off' },
      { kind: 'check', text: 'Evals: every answer cites a source' },
    ],
  },
  {
    id: 'build',
    title: 'Build in small steps',
    line: 'I share a working link often, so you see progress in the product, not in reports.',
    demo: [
      { kind: 'commit', text: 'feat: upload and index your docs' },
      { kind: 'commit', text: 'feat: answer with sources' },
      { kind: 'commit', text: 'test: evaluation suite' },
      { kind: 'ok', text: 'preview link sent to you' },
    ],
  },
  {
    id: 'launch',
    title: 'Launch and hand over',
    line: 'I ship it with tests and a deploy pipeline, and you own the code and the accounts.',
    demo: [
      { kind: 'term', text: '$ pnpm deploy --production' },
      { kind: 'ok', text: 'tests passed, site is live' },
      { kind: 'ok', text: 'repo and accounts handed over' },
    ],
  },
]
