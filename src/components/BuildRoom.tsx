import { useEffect, useMemo, useRef, useState } from 'react'

import { buildIdeas } from '#/content/buildRoom'
import { processSteps } from '#/content/process'
import type { BuildIdea, BuildTask } from '#/content/buildRoom'

const CHECKS = ['Intent', 'Architecture', 'Security', 'Tests']
const DRAFT = 14
const REDRAFT = 8
const REVIEW = 8
/** Ticks a signature stays on screen before the next review. */
const HOLD = 4
const TICK_MS = 260

interface Plan {
  task: BuildTask
  draftStart: number
  reviewStart: number
  sentBackAt?: number
  secondReviewStart?: number
  signedAt: number
}

/** The whole run is worked out up front, so any tick can be drawn on its own. */
function schedule(idea: BuildIdea) {
  let reviewerFree = 0
  const plans: Plan[] = idea.tasks.map((task, i) => {
    const draftStart = 6 + i * 3
    const reviewStart = Math.max(draftStart + DRAFT, reviewerFree)
    if (task.sendBack) {
      const sentBackAt = reviewStart + REVIEW / 2
      const secondReviewStart = sentBackAt + REDRAFT
      const signedAt = secondReviewStart + REVIEW
      reviewerFree = signedAt + HOLD
      return { task, draftStart, reviewStart, sentBackAt, secondReviewStart, signedAt }
    }
    const signedAt = reviewStart + REVIEW
    reviewerFree = signedAt + HOLD
    return { task, draftStart, reviewStart, signedAt }
  })
  return { plans, end: reviewerFree }
}

type State = 'waiting' | 'drafting' | 'queued' | 'review' | 'sent back' | 'signed'

function stateAt(plan: Plan, tick: number): { state: State; progress: number; checks: number } {
  const { draftStart, reviewStart, sentBackAt, secondReviewStart, signedAt } = plan
  const pct = (from: number, length: number) => Math.min(100, Math.round(((tick - from) / length) * 100))
  if (tick >= signedAt) return { state: 'signed', progress: 100, checks: CHECKS.length }
  if (tick < draftStart) return { state: 'waiting', progress: 0, checks: 0 }
  if (tick < draftStart + DRAFT) return { state: 'drafting', progress: pct(draftStart, DRAFT), checks: 0 }
  if (tick < reviewStart) return { state: 'queued', progress: 100, checks: 0 }
  if (sentBackAt !== undefined && secondReviewStart !== undefined) {
    if (tick < sentBackAt) return { state: 'review', progress: 100, checks: Math.floor((tick - reviewStart) / 2) }
    if (tick < secondReviewStart) return { state: 'sent back', progress: pct(sentBackAt, REDRAFT), checks: 2 }
    return { state: 'review', progress: 100, checks: Math.floor((tick - secondReviewStart) / 2) }
  }
  return { state: 'review', progress: 100, checks: Math.floor((tick - reviewStart) / 2) }
}

const COLUMNS = ['Agents', 'Review', 'Preview']

export function BuildRoom() {
  const [ideaId, setIdeaId] = useState(buildIdeas[0].id)
  const idea = buildIdeas.find((item) => item.id === ideaId) ?? buildIdeas[0]
  const { plans, end } = useMemo(() => schedule(idea), [idea])

  // Server and no JavaScript render the finished run.
  const [tick, setTick] = useState(end)
  const [playing, setPlaying] = useState(false)
  const [approved, setApproved] = useState(false)
  const [visible, setVisible] = useState(false)
  const [column, setColumn] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced.current) {
      setTick(0)
      setPlaying(true)
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const done = tick >= end

  useEffect(() => {
    if (!playing || !visible || done) return
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1)
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [playing, visible, done])

  function restart(nextId = ideaId) {
    setIdeaId(nextId)
    setApproved(false)
    if (reduced.current) {
      setTick(schedule(buildIdeas.find((item) => item.id === nextId) ?? buildIdeas[0]).end)
    } else {
      setTick(0)
      setPlaying(true)
    }
  }

  const states = plans.map((plan) => ({ plan, ...stateAt(plan, tick) }))
  const reviewing = states.find((s) => s.state === 'review' || s.state === 'sent back')
  const lastSigned = [...states].reverse().find((s) => s.state === 'signed')
  const justSigned = states.find((s) => tick >= s.plan.signedAt && tick < s.plan.signedAt + HOLD)
  const inReview = justSigned ?? reviewing ?? lastSigned
  const signed = states.filter((s) => s.state === 'signed')
  const stage = approved ? 3 : tick < 6 ? 0 : tick < plans[0].signedAt ? 1 : 2

  const mail = `mailto:kibochas@gmail.com?subject=${encodeURIComponent(`${idea.label} idea`)}&body=${encodeURIComponent(
    `Hi Samuel,\n\nI have an idea like the ${idea.label.toLowerCase()} in your build room.\n\nThe idea: \nWho it is for: \nWhat exists today: \nWhen I need a first version: \n`,
  )}`

  return (
    <div className="room" ref={ref} data-stage={stage}>
      <div className="room-bar">
        <span className="room-title">
          <span className="pulse-dot" aria-hidden="true" /> Build room · simulation
        </span>
        <div className="room-group" role="group" aria-label="Pick an example idea">
          {buildIdeas.map((item) => (
            <button key={item.id} type="button" className={`catalog-filter${item.id === idea.id ? ' is-active' : ''}`} aria-pressed={item.id === idea.id} onClick={() => restart(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="catalog-filter room-play"
          onClick={() => (done ? restart() : setPlaying((p) => !p))}
        >
          {done ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
        </button>
      </div>

      <ol className="room-steps">
        {processSteps.map((step, i) => (
          <li key={step.id} className={i === stage ? 'is-current' : i < stage ? 'is-past' : ''} aria-current={i === stage ? 'step' : undefined}>
            <h3>
              <span>{String(i + 1).padStart(2, '0')}</span> {step.title}
            </h3>
            <p>{step.line}</p>
          </li>
        ))}
      </ol>

      <p className="room-founder">
        <span>Founder</span> {idea.founder}
      </p>

      <div className="room-tabs" role="group" aria-label="Choose a panel">
        {COLUMNS.map((name, i) => (
          <button key={name} type="button" className={`catalog-filter${column === i ? ' is-active' : ''}`} aria-pressed={column === i} onClick={() => setColumn(i)}>
            {name}
          </button>
        ))}
      </div>

      <div className="room-columns">
        <div className={`room-column${column === 0 ? ' is-shown' : ''}`}>
          <h4 className="room-heading">01 Agents draft</h4>
          <ul className="room-list">
            {states.map(({ plan, state, progress }) => {
              const total = plan.task.code.length
              const shown = state === 'drafting' ? Math.ceil((progress / 100) * total) : state === 'waiting' ? 0 : total
              return (
                <li key={`${idea.id}-${plan.task.id}`} className={`room-agent is-${state.replace(' ', '-')}`}>
                  <span className="room-agent-head">
                    <span>{plan.task.agent}</span>
                    <span className="room-state">{state === 'drafting' ? `drafting ${progress}%` : state}</span>
                  </span>
                  <pre aria-hidden="true">
                    {plan.task.code.map((line, i) => (
                      <span key={line} className={i < shown ? '' : 'is-hidden'}>
                        {line}
                        {'\n'}
                      </span>
                    ))}
                  </pre>
                  <span className="room-progress" aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={`room-column${column === 1 ? ' is-shown' : ''}`}>
          <h4 className="room-heading">02 I review</h4>
          {inReview ? (
            <div className={`room-review is-${inReview.state.replace(' ', '-')}`}>
              <p className="room-file">{inReview.plan.task.file}</p>
              <ul className="room-checks">
                {CHECKS.map((check, i) => (
                  <li key={check} className={i < inReview.checks ? 'is-done' : ''}>
                    {check}
                  </li>
                ))}
              </ul>
              {inReview.state === 'sent back' && <p className="room-note">Sent back: {inReview.plan.task.sendBack}</p>}
              {inReview.state === 'signed' && (
                <p className="room-signature">
                  <svg viewBox="0 0 160 40" aria-hidden="true">
                    <path d="M6 30c10-18 18-26 20-18s-10 22-4 20 14-20 20-16-4 16 3 14 10-12 15-10 0 11 7 9 9-9 15-8 3 8 11 6 14-12 22-11 14 6 38 2" />
                  </svg>
                  Reviewed by Samuel
                </p>
              )}
            </div>
          ) : (
            <p className="room-empty">{tick < plans[0].reviewStart ? 'Waiting for the first draft.' : 'Waiting for the next draft.'}</p>
          )}
          <ul className="room-log">
            {signed.map(({ plan }) => (
              <li key={`${idea.id}-${plan.task.id}`}>
                {plan.task.file} reviewed{plan.task.sendBack ? ' after one fix' : ''}
              </li>
            ))}
          </ul>
        </div>

        <div className={`room-column${column === 2 ? ' is-shown' : ''}`}>
          <h4 className="room-heading">03 Your preview</h4>
          <div className="room-phone">
            <p className="room-app">{idea.app}</p>
            <ul>
              {states.map(({ plan, state }) => (
                <li key={`${idea.id}-${plan.task.id}`} className={state === 'signed' ? 'is-live' : ''}>
                  {state === 'signed' ? plan.task.feature : 'Building'}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary room-approve" disabled={!done || approved} onClick={() => setApproved(true)}>
              {approved ? 'Approved ✓' : 'Approve as founder'}
            </button>
          </div>
          <p className="room-status" role="status">
            {approved ? 'Approved. Next step: launch and hand over.' : done ? 'The preview is ready for your approval.' : ''}
          </p>
        </div>
      </div>

      <div className="room-foot">
        <p>An example of how a build runs, not a live system or a real client.</p>
        <a className="btn btn-primary" href={mail}>
          Tell me about your idea <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}
