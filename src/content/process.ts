/** How I work with a founder or team (spec 0008, AC-4). No time frames until Samuel confirms them. */
export interface ProcessStep {
  id: string
  title: string
  line: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'talk',
    title: 'Talk it through',
    line: 'You tell me the idea, who it is for and what has to work first. I tell you what I would build first and what I would leave out.',
  },
  {
    id: 'plan',
    title: 'A short plan',
    line: 'I write down the first version, the stack, the risks, and how I will check that the AI parts give good answers.',
  },
  {
    id: 'build',
    title: 'Build in small steps',
    line: 'I share a working link often, so you see progress in the product, not in reports.',
  },
  {
    id: 'launch',
    title: 'Launch and hand over',
    line: 'I ship it with tests and a deploy pipeline, and you own the code and the accounts.',
  },
]
