import { useEffect, useState } from 'react'

/**
 * Decorative hero editor (spec 0011): a short snippet for a founder's AI idea types itself out,
 * a terminal shows the evaluation tests passing, and two cursors (a founder
 * and Samuel) collaborate on one line. Illustration only, hidden from screen
 * readers. Without JavaScript or with reduced motion, the finished state shows.
 */
const CODE: { text: string; tone?: 'comment' }[] = [
  { text: "// your idea: answer customers from your own docs", tone: 'comment' },
  { text: 'const context = await retrieve(yourDocs, question)' },
  { text: 'const answer = await llm.answer(question, context)' },
  { text: '' },
  { text: "test('every answer comes from your docs', () => {" },
  { text: '  expect(answer.sources).toBeFoundIn(context)' },
  { text: '})' },
]

const TERMINAL = ['$ pnpm test:eval', '✓ 4 evaluation tests passed', '$ pnpm deploy --preview', '✓ preview is live']

const TOTAL = CODE.reduce((sum, line) => sum + line.text.length + 1, 0)

export function HeroEditor() {
  const [typed, setTyped] = useState(TOTAL)
  const [terminal, setTerminal] = useState(TERMINAL.length)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let chars = 0
    let lines = 0
    setTyped(0)
    setTerminal(0)
    let id = window.setInterval(() => {
      chars += 3
      setTyped(chars)
      if (chars >= TOTAL) {
        window.clearInterval(id)
        id = window.setInterval(() => {
          lines += 1
          setTerminal(lines)
          if (lines >= TERMINAL.length) window.clearInterval(id)
        }, 420)
      }
    }, 22)
    return () => window.clearInterval(id)
  }, [])

  let remaining = typed
  const done = typed >= TOTAL

  return (
    <div className="hero-editor" aria-hidden="true">
      <div className="hero-editor-bar">
        <span className="mock-dots">
          <span />
          <span />
          <span />
        </span>
        <span>evaluate.ts</span>
        <span className="hero-editor-live">
          <span className="pulse-dot" /> 2 people here
        </span>
      </div>
      <pre className="hero-editor-code">
        {CODE.map((line, i) => {
          const shown = line.text.slice(0, Math.max(0, remaining))
          remaining -= line.text.length + 1
          const active = !done && remaining < 0 && remaining + line.text.length + 1 >= 0
          return (
            <span key={i} className={`code-line${line.tone === 'comment' ? ' is-comment' : ''}${i === 5 && done ? ' is-highlight' : ''}`}>
              <span className="code-num">{i + 1}</span>
              <span className="code-text">
                {shown}
                {active && <span className="code-caret" />}
              </span>
            </span>
          )
        })}
      </pre>
      <div className="hero-terminal">
        {TERMINAL.slice(0, terminal).map((line) => (
          <span key={line} className={line.startsWith('✓') ? 'is-ok' : ''}>
            {line}
          </span>
        ))}
      </div>

      <span className="collab-cursor is-founder">
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M1 1l5 12 2-5 5-2z" />
        </svg>
        <span className="collab-label">Founder</span>
        <span className="collab-note">Can it answer from our own docs?</span>
      </span>
      <span className="collab-cursor is-samuel">
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M1 1l5 12 2-5 5-2z" />
        </svg>
        <span className="collab-label">Samuel</span>
      </span>
    </div>
  )
}
