/**
 * The build room simulation (spec 0014). Every idea here is an example to show
 * how a build runs. Nothing is a real client, result or live system.
 */
export interface BuildTask {
  id: 'spec' | 'api' | 'ui' | 'tests'
  agent: string
  file: string
  code: string[]
  /** What shows up in the preview once this task passes review. */
  feature: string
  /** A review note that sends the first draft back once. */
  sendBack?: string
}

export interface BuildIdea {
  id: string
  label: string
  founder: string
  app: string
  tasks: BuildTask[]
}

export const buildIdeas: BuildIdea[] = [
  {
    id: 'assistant',
    label: 'Support assistant',
    founder: 'Customers keep asking the same questions.',
    app: 'Help desk',
    tasks: [
      { id: 'spec', agent: 'agent/spec', file: 'spec.md', code: ['# First version', '- answer from your docs', '- show the source', '- hand off when unsure'], feature: 'Ask a question' },
      { id: 'api', agent: 'agent/api', file: 'answer.py', code: ['@app.post("/answer")', 'def answer(q: Question):', '    ctx = retrieve(q.text)', '    return llm.answer(q, ctx)'], feature: 'Answer with its source', sendBack: 'Hand off to a person when no source is found.' },
      { id: 'ui', agent: 'agent/ui', file: 'Chat.tsx', code: ['export function Chat() {', '  const { ask } = useAnswer()', '  return <Thread onAsk={ask} />', '}'], feature: 'Talk to a person' },
      { id: 'tests', agent: 'agent/tests', file: 'test_answers.py', code: ['def test_grounded():', '    a = answer(sample)', '    assert a.sources', '    assert a.sources <= docs'], feature: 'Every answer checked' },
    ],
  },
  {
    id: 'tipping',
    label: 'Tipping app',
    founder: 'People want to tip workers without carrying cash.',
    app: 'Tip jar',
    tasks: [
      { id: 'spec', agent: 'agent/spec', file: 'spec.md', code: ['# First version', '- tip by worker ID', '- mobile money prompt', '- no personal details shared'], feature: 'Find a worker by ID' },
      { id: 'api', agent: 'agent/api', file: 'tips.py', code: ['@app.post("/tips")', 'def tip(t: Tip, key: str):', '    if seen(key): return prior(key)', '    return pay.prompt(t)'], feature: 'Pay with mobile money', sendBack: 'A retried payment must be recorded only once.' },
      { id: 'ui', agent: 'agent/ui', file: 'TipScreen.tsx', code: ['export function TipScreen() {', '  const worker = useWorker(id)', '  return <Amount to={worker} />', '}'], feature: 'Thank you receipt' },
      { id: 'tests', agent: 'agent/tests', file: 'test_tips.py', code: ['def test_retry_once():', '    tip(t, key="a1")', '    tip(t, key="a1")', '    assert ledger.count() == 1'], feature: 'Retries are safe' },
    ],
  },
  {
    id: 'booking',
    label: 'Booking app',
    founder: 'We take bookings by phone and lose track of them.',
    app: 'Bookings',
    tasks: [
      { id: 'spec', agent: 'agent/spec', file: 'spec.md', code: ['# First version', '- pick a free slot', '- confirm by message', '- owner sees the day'], feature: 'Pick a time' },
      { id: 'api', agent: 'agent/api', file: 'bookings.py', code: ['@app.post("/bookings")', 'def book(b: Booking):', '    with lock(b.slot):', '        return save_if_free(b)'], feature: 'Confirmation message', sendBack: 'Two people must not get the same slot.' },
      { id: 'ui', agent: 'agent/ui', file: 'Slots.tsx', code: ['export function Slots() {', '  const free = useFreeSlots(day)', '  return <Grid slots={free} />', '}'], feature: 'Owner day view' },
      { id: 'tests', agent: 'agent/tests', file: 'test_slots.py', code: ['def test_no_double_booking():', '    book(slot)', '    with raises(Taken):', '        book(slot)'], feature: 'No double bookings' },
    ],
  },
]
