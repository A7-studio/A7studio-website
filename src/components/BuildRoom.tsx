import { useEffect, useMemo, useRef, useState } from 'react'

import { buildIdeas } from '#/content/buildRoom'
import type { BuildIdea } from '#/content/buildRoom'
import { processSteps } from '#/content/process'

const TICK_MS = 260
const SPEC_TYPE = 12
/** How long the spec waits for a click before the run carries on. */
const SPEC_WAIT = 14
const DIFF_TYPE = 8
const DIFF_REVIEW = 8
const SENT_BACK = 10
const PER_CHECK = 5

/** The whole run is worked out up front, so any tick can be drawn on its own. */
function schedule(idea: BuildIdea) {
  const specEnd = 3 + SPEC_TYPE + SPEC_WAIT
  let at = specEnd
  const diffs = idea.diffs.map((diff) => {
    const start = at
    const reviewAt = start + DIFF_TYPE
    const approvedAt = reviewAt + DIFF_REVIEW + (diff.sendBack ? SENT_BACK : 0)
    at = approvedAt + 3
    return { diff, start, reviewAt, approvedAt }
  })
  const checkStart = at
  const end = checkStart + idea.doneWhen.length * PER_CHECK + 2
  return { specEnd, diffs, checkStart, end }
}

const TABS = ['Loop', 'Workspace', 'Preview']

export function BuildRoom() {
  const [ideaId, setIdeaId] = useState(buildIdeas[0].id)
  const idea = buildIdeas.find((item) => item.id === ideaId) ?? buildIdeas[0]
  const run = useMemo(() => schedule(idea), [idea])

  // Server and no JavaScript render the finished, landed run.
  const [tick, setTick] = useState(run.end)
  const [landed, setLanded] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [column, setColumn] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced.current) {
      setTick(0)
      setLanded(false)
      setPlaying(true)
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const done = tick >= run.end

  useEffect(() => {
    if (!playing || !visible || done) return
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1)
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [playing, visible, done])

  function restart(nextId = ideaId) {
    setIdeaId(nextId)
    if (reduced.current) {
      setTick(schedule(buildIdeas.find((item) => item.id === nextId) ?? buildIdeas[0]).end)
      setLanded(false)
    } else {
      setTick(0)
      setLanded(false)
      setPlaying(true)
    }
  }

  const stage = tick < run.specEnd ? 0 : tick < run.checkStart ? 1 : done ? 3 : 2
  const specLines = [`# Feature: ${idea.feature}`, '', 'Done when:', ...idea.doneWhen.map((d) => `- [ ] ${d}`)]
  const specShown = Math.max(0, Math.ceil(((tick - 3) / SPEC_TYPE) * specLines.length))
  const specReady = tick >= 3 + SPEC_TYPE

  const current = [...run.diffs].reverse().find((d) => tick >= d.start) ?? run.diffs[0]
  const sentBack = Boolean(current.diff.sendBack) && tick >= current.reviewAt + 3 && tick < current.reviewAt + 3 + SENT_BACK
  const diffState = tick >= current.approvedAt ? 'approved' : sentBack ? 'sent back' : tick >= current.reviewAt ? 'my review' : 'writing'
  const diffShown = Math.ceil(((tick - current.start) / DIFF_TYPE) * current.diff.code.length)

  const approvedDiffs = run.diffs.filter((d) => tick >= d.approvedAt)
  const passed = idea.doneWhen.filter((_, i) => tick >= run.checkStart + (i + 1) * PER_CHECK).length
  const slug = idea.feature.toLowerCase().replace(/[^a-z]+/g, '-')

  const badges = [
    stage > 0 ? 'approved' : specReady ? 'your review' : 'writing',
    stage > 1 ? 'approved' : stage === 1 ? `${approvedDiffs.length} / ${idea.diffs.length} diffs` : 'waiting',
    stage > 2 || passed === idea.doneWhen.length ? 'passed' : stage === 2 ? `${passed} / ${idea.doneWhen.length}` : 'waiting',
    landed ? 'archived' : done ? 'your call' : 'waiting',
  ]

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
        <button type="button" className="catalog-filter room-play" onClick={() => (done ? restart() : setPlaying((p) => !p))}>
          {done ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
        </button>
      </div>

      <p className="room-founder">
        <span>Founder</span> {idea.founder}
      </p>

      <div className="room-tabs" role="group" aria-label="Choose a panel">
        {TABS.map((name, i) => (
          <button key={name} type="button" className={`catalog-filter${column === i ? ' is-active' : ''}`} aria-pressed={column === i} onClick={() => setColumn(i)}>
            {name}
          </button>
        ))}
      </div>

      <div className="room-columns">
        <div className={`room-column${column === 0 ? ' is-shown' : ''}`}>
          <h3 className="room-heading">One feature, one loop</h3>
          <p className="room-setup">Set up once: we talk, I write the plan ✓</p>
          <ol className="room-loop">
            {processSteps.map((step, i) => (
              <li key={step.id} className={i === stage ? 'is-current' : i < stage ? 'is-past' : ''} aria-current={i === stage ? 'step' : undefined}>
                <span className="room-loop-head">
                  <code>{step.command}</code>
                  <span>{step.title}</span>
                  <span className="room-badge">{badges[i]}</span>
                </span>
                <span className="room-loop-line">{step.line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={`room-column${column === 1 ? ' is-shown' : ''}`}>
          <h3 className="room-heading">Workspace</h3>
          <div className="room-screen">
            <p className="room-prompt">
              <span aria-hidden="true">$ </span>
              {processSteps[stage].command}
            </p>

            {stage === 0 && (
              <>
                <p className="room-file">current-feature.md</p>
                <pre>
                  {specLines.slice(0, specShown).join('\n')}
                </pre>
                {specReady && (
                  <button type="button" className="btn btn-primary room-gate" onClick={() => setTick(run.specEnd)}>
                    Approve the spec
                  </button>
                )}
              </>
            )}

            {stage === 1 && (
              <>
                <p className="room-file">
                  {current.diff.file} <span className={`room-badge is-${diffState.replace(' ', '-')}`}>{diffState}</span>
                </p>
                <pre className="is-diff">{current.diff.code.slice(0, diffShown).join('\n')}</pre>
                {sentBack && <p className="room-note">Sent back: {current.diff.sendBack}</p>}
                {diffState === 'approved' && <p className="room-signature">Reviewed by Samuel ✓</p>}
              </>
            )}

            {stage === 2 && (
              <>
                <p className="room-file">Proof, in the running app</p>
                <ul className="room-checks">
                  {idea.doneWhen.map((item, i) => (
                    <li key={item} className={i < passed ? 'is-done' : ''}>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {stage === 3 && (
              <>
                <p className="room-file">{landed ? `history/features/01-${slug}.md` : 'Ready to land'}</p>
                <ul className="room-checks">
                  {idea.doneWhen.map((item) => (
                    <li key={item} className="is-done">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="room-note is-result">
                  {landed ? 'Landed. The history is written, and the next feature can start.' : 'Nothing is merged or released until you approve.'}
                </p>
              </>
            )}
          </div>
        </div>

        <div className={`room-column${column === 2 ? ' is-shown' : ''}`}>
          <h3 className="room-heading">Your preview</h3>
          <div className="room-phone">
            <p className="room-app">{idea.app}</p>
            <ul>
              {run.diffs.map(({ diff, approvedAt }) => (
                <li key={diff.file} className={tick >= approvedAt ? 'is-live' : ''}>
                  {tick >= approvedAt ? diff.screen : 'Building'}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary room-approve" disabled={!done || landed} onClick={() => setLanded(true)}>
              {landed ? 'Landed ✓' : 'Approve and land'}
            </button>
          </div>
          <p className="room-status" role="status">
            {landed && done ? 'The feature has landed.' : done ? 'Waiting for your approval.' : ''}
          </p>
        </div>
      </div>

      <div className="room-foot">
        <p>
          An example, not a live system or a real client. The loop follows{' '}
          <a href="https://ai-blueprint.dev/" target="_blank" rel="noopener noreferrer">
            AI Blueprint
          </a>
          .
        </p>
        <a className="btn btn-primary" href={mail}>
          Tell me about your idea <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}
