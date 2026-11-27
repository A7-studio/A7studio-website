/**
 * The loop each feature goes through (spec 0014), following the AI Blueprint
 * workflow (https://ai-blueprint.dev/). No time frames until Samuel confirms them.
 */
export interface ProcessStep {
  id: 'spec' | 'build' | 'prove' | 'land'
  command: string
  title: string
  line: string
}

export const processSteps: ProcessStep[] = [
  { id: 'spec', command: '/feature', title: 'Spec', line: 'I write what the feature must do. You approve it before any code exists.' },
  { id: 'build', command: '/implement', title: 'Build', line: 'AI writes small changes. I read and approve each one.' },
  { id: 'prove', command: '/check', title: 'Prove', line: 'Every done-when is checked in the running app, not just claimed.' },
  { id: 'land', command: '/complete', title: 'Land', line: 'You approve, it lands, and the history records what changed.' },
]
