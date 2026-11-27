import { useEffect, useRef, useState } from 'react'

import { DIFF_TYPE, PER_CHECK, SPEC_TYPE, ideaFor, landedRun, runReducer, settle, startRun } from '#/components/useBuildRun'
import type { Action, RunState } from '#/components/useBuildRun'
import { buildIdeas } from '#/content/buildRoom'
import { processSteps } from '#/content/process'

const TICK_MS = 260
const TABS = ['Loop', 'Workspace', 'Preview']

export function BuildRoom() {
  // Server and no JavaScript render a finished, landed run.
  const [run, setRun] = useState<RunState>(() => landedRun(buildIdeas[0].id))
  const [playing, setPlaying] = useState(true)
  const [fast, setFast] = useState(false)
  const [visible, setVisible] = useState(false)
  const [column, setColumn] = useState(1)
  const [tried, setTried] = useState<number | null>(null)
  const [typed, setTyped] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  function dispatch(action: Action) {
    setRun((current) => {
      const next = runReducer(current, action)
      return reduced.current ? settle(next) : next
    })
  }

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setRun(reduced.current ? settle(startRun(buildIdeas[0].id, false)) : startRun(buildIdeas[0].id, true))
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || !visible || reduced.current || run.phase === 'landed') return
    const id = window.setInterval(
      () => {
        if (!document.hidden) setRun((current) => runReducer(current, { type: 'tick' }))
      },
      fast ? TICK_MS / 2.5 : TICK_MS,
    )
    return () => window.clearInterval(id)
  }, [playing, visible, fast, run.phase])

  const idea = ideaFor(run)
  const answer = tried === null ? undefined : idea.tries[tried]

  // The sample answer types itself out.
  useEffect(() => {
    if (!answer) return
    if (reduced.current) {
      setTyped(answer.answer.length)
      return
    }
    setTyped(0)
    const id = window.setInterval(() => setTyped((n) => Math.min(n + 2, answer.answer.length)), 28)
    return () => window.clearInterval(id)
  }, [answer])

  function restart(ideaId = run.ideaId) {
    const next = startRun(ideaId, reduced.current ? false : run.auto || run.phase === 'landed')
    setTried(null)
    setPlaying(true)
    setRun(reduced.current ? settle(next) : next)
  }

  const stage = run.phase === 'spec' ? 0 : run.phase === 'build' ? 1 : run.phase === 'prove' ? 2 : 3
  const ready = run.phase === 'land' || run.phase === 'landed'
  const passed = run.phase === 'prove' ? Math.floor(run.step / PER_CHECK) : ready ? idea.doneWhen.length : 0
  const specLines = [`# Feature: ${idea.feature}`, '', 'Done when:', ...idea.doneWhen.map((d) => `- [ ] ${d}`)]
  const specDone = run.phase !== 'spec' || run.step >= SPEC_TYPE
  const specShown = specDone ? specLines.length : Math.ceil((run.step / SPEC_TYPE) * specLines.length)
  const diff = idea.diffs[Math.min(run.diff, idea.diffs.length - 1)]
  const code = run.fixed.includes(run.diff) ? [...diff.code, diff.fix] : diff.code
  const codeShown =
    run.status === 'writing' ? Math.ceil((run.step / DIFF_TYPE) * code.length) : code.length
  const slug = idea.feature.toLowerCase().replace(/[^a-z]+/g, '-')

  const badges = [
    stage > 0 ? 'approved' : specDone ? 'your review' : 'writing',
    stage > 1 ? 'approved' : stage === 1 ? `${run.approved.length} / ${idea.diffs.length} approved` : 'waiting',
    stage > 2 ? 'passed' : stage === 2 ? `${passed} / ${idea.doneWhen.length}` : 'waiting',
    run.phase === 'landed' ? 'archived' : run.phase === 'land' ? 'your call' : 'waiting',
  ]

  const turn =
    run.phase === 'spec' && specDone
      ? 'Your turn: add a requirement or approve the spec.'
      : run.phase === 'build' && run.status === 'review'
        ? 'Your turn: read the change, then approve it or send it back.'
        : run.phase === 'land'
          ? 'Your turn: approve and land.'
          : run.phase === 'landed'
            ? 'Landed. Try it in the preview.'
            : 'AI is working.'

  const mail = `mailto:kibochas@gmail.com?subject=${encodeURIComponent(`${idea.label} idea`)}&body=${encodeURIComponent(
    `Hi Samuel,\n\nI have an idea like the ${idea.label.toLowerCase()} in your build room.\n\nThe idea: \nWho it is for: \nWhat exists today: \nWhen I need a first version: \n`,
  )}`

  return (
    <div className="room" ref={ref} data-stage={stage} data-phase={run.phase}>
      <div className="room-bar">
        <span className="room-title">
          <span className="pulse-dot" aria-hidden="true" /> Build room · simulation
        </span>
        <div className="room-group" role="group" aria-label="Pick an AI app idea">
          {buildIdeas.map((item) => (
            <button key={item.id} type="button" className={`catalog-filter${item.id === run.ideaId ? ' is-active' : ''}`} aria-pressed={item.id === run.ideaId} onClick={() => restart(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="room-controls">
        <div className="room-group" role="group" aria-label="Who reviews">
          <button type="button" className={`catalog-filter${run.auto ? ' is-active' : ''}`} aria-pressed={run.auto} onClick={() => dispatch({ type: 'auto', value: true })}>
            Watch
          </button>
          <button type="button" className={`catalog-filter${run.auto ? '' : ' is-active'}`} aria-pressed={!run.auto} onClick={() => dispatch({ type: 'auto', value: false })}>
            You review
          </button>
        </div>
        <p className="room-turn" role="status">
          {run.auto && run.phase !== 'land' && run.phase !== 'landed' ? 'Watching. Click any review button to take over.' : turn}
        </p>
        <div className="room-group">
          <button type="button" className="catalog-filter" aria-pressed={fast} onClick={() => setFast((f) => !f)}>
            {fast ? '2.5× speed' : '1× speed'}
          </button>
          <button type="button" className="catalog-filter room-play" onClick={() => (run.phase === 'landed' ? restart() : setPlaying((p) => !p))}>
            {run.phase === 'landed' ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
          </button>
        </div>
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

            {run.phase === 'spec' && (
              <>
                <p className="room-file">current-feature.md</p>
                <pre>{specLines.slice(0, specShown).join('\n')}</pre>
                {specDone && (
                  <div className="room-actions">
                    <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'approveSpec' })}>
                      Approve the spec
                    </button>
                    <button type="button" className="btn btn-outline" aria-pressed={run.withExtra} onClick={() => dispatch({ type: 'toggleExtra' })}>
                      {run.withExtra ? '− Remove' : '+ Add'}: {idea.extra.doneWhen}
                    </button>
                  </div>
                )}
              </>
            )}

            {run.phase === 'build' && (
              <>
                <p className="room-file">
                  {diff.file} <span className={`room-badge is-${run.status}`}>{run.status === 'review' ? 'ready for review' : run.status}</span>
                </p>
                <pre className="is-diff">{code.slice(0, codeShown).join('\n')}</pre>
                {run.note && <p className="room-note">{run.note}</p>}
                {run.status === 'review' && (
                  <div className="room-actions">
                    <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'approve' })}>
                      Approve
                    </button>
                    {!run.fixed.includes(run.diff) && (
                      <button type="button" className="btn btn-outline" onClick={() => dispatch({ type: 'sendBack' })}>
                        Send back
                      </button>
                    )}
                  </div>
                )}
                {run.status === 'approved' && <p className="room-signature">Reviewed ✓</p>}
              </>
            )}

            {(run.phase === 'prove' || ready) && (
              <>
                <p className="room-file">
                  {run.phase === 'landed' ? `history/features/01-${slug}.md` : run.phase === 'land' ? 'Ready to land' : 'Proof, in the running app'}
                </p>
                <ul className="room-checks">
                  {idea.doneWhen.map((item, i) => (
                    <li key={item} className={i < passed ? 'is-done' : ''}>
                      {item}
                    </li>
                  ))}
                </ul>
                {ready && (
                  <p className="room-note is-result">
                    {run.phase === 'landed' ? 'Landed. The history is written, and the next feature can start.' : 'Nothing is merged or released until you approve.'}
                  </p>
                )}
                {run.phase === 'land' && (
                  <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'land' })}>
                    Approve and land
                  </button>
                )}
              </>
            )}

            <ul className="room-log" aria-label="Activity">
              {run.log.map((line, i) => (
                <li key={`${line}-${i}`}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`room-column${column === 2 ? ' is-shown' : ''}`}>
          <h3 className="room-heading">Your preview</h3>
          <div className="room-phone">
            <p className="room-app">{idea.app}</p>
            <ul>
              {idea.diffs.map((item, i) => (
                <li key={item.file} className={run.approved.includes(i) ? 'is-live' : ''}>
                  {run.approved.includes(i) ? item.screen : 'Building'}
                </li>
              ))}
            </ul>
            {ready ? (
              <div className="room-try">
                <span className="room-try-label">Try it (example answers)</span>
                {idea.tries.map((item, i) => (
                  <button key={item.ask} type="button" className={`catalog-filter${tried === i ? ' is-active' : ''}`} onClick={() => setTried(i)}>
                    {item.ask}
                  </button>
                ))}
                {answer && (
                  <p className="room-answer" aria-live="polite">
                    <span className="sr-only">{answer.answer}</span>
                    <span aria-hidden="true">{answer.answer.slice(0, typed)}</span>
                    {typed >= answer.answer.length && <em>{answer.proof}</em>}
                  </p>
                )}
              </div>
            ) : (
              <p className="room-hint">You can try it once the checks pass.</p>
            )}
          </div>
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
