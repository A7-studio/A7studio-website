import { buildIdeas } from '#/content/buildRoom'
import type { BuildIdea } from '#/content/buildRoom'

/** The build room's state machine: one tick at a time, with gates a person can drive. */
export const SPEC_TYPE = 10
export const DIFF_TYPE = 8
const SPEC_WAIT = 16
const REVIEW_WAIT = 12
const APPROVED_PAUSE = 4
export const PER_CHECK = 4

export interface RunState {
  ideaId: string
  withExtra: boolean
  /** True while the run decides for itself; false once the visitor reviews. */
  auto: boolean
  phase: 'spec' | 'build' | 'prove' | 'land' | 'landed'
  step: number
  wait: number
  diff: number
  status: 'writing' | 'review' | 'fixing' | 'approved'
  note: string
  /** Changes that have had their fix. */
  fixed: number[]
  approved: number[]
  log: string[]
}

export function ideaFor(state: Pick<RunState, 'ideaId' | 'withExtra'>): BuildIdea {
  const idea = buildIdeas.find((item) => item.id === state.ideaId) ?? buildIdeas[0]
  if (!state.withExtra) return idea
  return { ...idea, doneWhen: [...idea.doneWhen, idea.extra.doneWhen], diffs: [...idea.diffs, idea.extra.diff] }
}

export function startRun(ideaId: string, auto: boolean): RunState {
  return { ideaId, withExtra: false, auto, phase: 'spec', step: 0, wait: 0, diff: 0, status: 'writing', note: '', fixed: [], approved: [], log: ['plan ready'] }
}

export function landedRun(ideaId: string): RunState {
  const idea = ideaFor({ ideaId, withExtra: false })
  const all = idea.diffs.map((_, i) => i)
  return { ...startRun(ideaId, false), phase: 'landed', diff: all.length - 1, status: 'approved', fixed: all, approved: all, log: ['feature landed'] }
}

const say = (state: RunState, line: string) => [...state.log, line].slice(-4)

export type Action =
  | { type: 'tick' }
  | { type: 'approveSpec' }
  | { type: 'toggleExtra' }
  | { type: 'approve' }
  | { type: 'sendBack' }
  | { type: 'land' }
  | { type: 'auto'; value: boolean }
  | { type: 'reset'; state: RunState }

function approveSpec(s: RunState): RunState {
  return { ...s, phase: 'build', step: 0, wait: 0, diff: 0, status: 'writing', log: say(s, 'spec approved') }
}

function approve(s: RunState): RunState {
  const file = ideaFor(s).diffs[s.diff].file
  return { ...s, status: 'approved', wait: 0, note: '', approved: [...new Set([...s.approved, s.diff])], log: say(s, `${file} approved`) }
}

function sendBack(s: RunState): RunState {
  const diff = ideaFor(s).diffs[s.diff]
  return { ...s, status: 'fixing', step: 0, wait: 0, note: `Sent back: ${diff.note}`, log: say(s, `${diff.file} sent back`) }
}

function tick(s: RunState): RunState {
  const idea = ideaFor(s)
  if (s.phase === 'spec') {
    if (s.step < SPEC_TYPE) return { ...s, step: s.step + 1 }
    if (!s.auto) return s
    return s.wait < SPEC_WAIT ? { ...s, wait: s.wait + 1 } : approveSpec(s)
  }
  if (s.phase === 'build') {
    if (s.status === 'writing' || s.status === 'fixing') {
      if (s.step < DIFF_TYPE) return { ...s, step: s.step + 1 }
      const fixed = s.status === 'fixing' ? [...new Set([...s.fixed, s.diff])] : s.fixed
      return { ...s, status: 'review', wait: 0, fixed }
    }
    if (s.status === 'review') {
      if (!s.auto) return s
      if (s.wait < REVIEW_WAIT) return { ...s, wait: s.wait + 1 }
      return s.diff === idea.flawed && !s.fixed.includes(s.diff) ? sendBack(s) : approve(s)
    }
    if (s.wait < APPROVED_PAUSE) return { ...s, wait: s.wait + 1 }
    const next = idea.diffs.findIndex((_, i) => !s.approved.includes(i))
    if (next === -1) return { ...s, phase: 'prove', step: 0, wait: 0, note: '', log: say(s, 'running checks') }
    return { ...s, diff: next, status: 'writing', step: 0, wait: 0 }
  }
  if (s.phase === 'prove') {
    const step = s.step + 1
    const checking = Math.floor(step / PER_CHECK) - 1
    // A gap that was approved as is gets caught here and goes back to build.
    if (step % PER_CHECK === 0 && checking === idea.flawed && !s.fixed.includes(idea.flawed)) {
      const diff = idea.diffs[idea.flawed]
      return {
        ...s,
        phase: 'build',
        diff: idea.flawed,
        status: 'fixing',
        step: 0,
        wait: 0,
        approved: s.approved.filter((i) => i !== idea.flawed),
        note: `Check failed: “${idea.doneWhen[idea.flawed]}”. ${diff.note}`,
        log: say(s, 'check failed, back to build'),
      }
    }
    if (step >= idea.doneWhen.length * PER_CHECK + 2) return { ...s, phase: 'land', step, log: say(s, 'all checks passed') }
    return { ...s, step }
  }
  return s
}

export function runReducer(s: RunState, action: Action): RunState {
  switch (action.type) {
    case 'tick':
      return tick(s)
    case 'approveSpec':
      return s.phase === 'spec' ? approveSpec({ ...s, auto: false }) : s
    case 'toggleExtra':
      return s.phase === 'spec' ? { ...s, withExtra: !s.withExtra, auto: false, step: SPEC_TYPE } : s
    case 'approve':
      return s.phase === 'build' && s.status === 'review' ? approve({ ...s, auto: false }) : s
    case 'sendBack':
      return s.phase === 'build' && s.status === 'review' ? sendBack({ ...s, auto: false }) : s
    case 'land':
      return s.phase === 'land' ? { ...s, phase: 'landed', log: say(s, 'feature landed') } : s
    case 'auto':
      return { ...s, auto: action.value, wait: 0 }
    case 'reset':
      return action.state
  }
}

/** With reduced motion there is no timer: jump straight to the next thing a person decides. */
export function settle(state: RunState): RunState {
  let current = state
  for (let i = 0; i < 400; i += 1) {
    const next = tick(current)
    if (next === current) break
    current = next
  }
  return current
}
