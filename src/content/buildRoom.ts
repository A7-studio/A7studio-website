/**
 * The build room simulation (spec 0014). Every idea here is an example to show
 * how one feature moves through the loop. Nothing is a real client or result.
 */
export interface BuildDiff {
  file: string
  code: string[]
  /** What shows up in the preview once this change is approved. */
  screen: string
  /** A review note that sends the first version back once. */
  sendBack?: string
}

export interface BuildIdea {
  id: string
  label: string
  founder: string
  app: string
  feature: string
  /** The things that must be true before the feature counts as done. */
  doneWhen: string[]
  diffs: BuildDiff[]
}

export const buildIdeas: BuildIdea[] = [
  {
    id: 'assistant',
    label: 'Support assistant',
    founder: 'Customers keep asking the same questions.',
    app: 'Help desk',
    feature: 'Answer from your docs',
    doneWhen: ['Answers show their source', 'Unsure questions go to a person', 'Answer tests pass'],
    diffs: [
      { file: 'retrieve.py', screen: 'Ask a question', code: ['+ def retrieve(question):', '+     hits = index.search(question)', '+     return [h for h in hits if h.score > 0.7]'] },
      { file: 'answer.py', screen: 'Answer with its source', sendBack: 'With no source, hand off to a person.', code: ['+ ctx = retrieve(q.text)', '+ if not ctx: return handoff(q)', '+ return llm.answer(q, ctx)'] },
      { file: 'Chat.tsx', screen: 'Talk to a person', code: ['+ export function Chat() {', '+   const { ask } = useAnswer()', '+   return <Thread onAsk={ask} /> }'] },
    ],
  },
  {
    id: 'tipping',
    label: 'Tipping app',
    founder: 'People want to tip workers without carrying cash.',
    app: 'Tip jar',
    feature: 'Send a tip by worker ID',
    doneWhen: ['A tip reaches the right worker', 'A retry is recorded once', 'No personal details are shown'],
    diffs: [
      { file: 'workers.py', screen: 'Find a worker by ID', code: ['+ def find(worker_id):', '+     w = workers.get(worker_id)', '+     return w.public_profile()'] },
      { file: 'tips.py', screen: 'Pay with mobile money', sendBack: 'A retried payment must be recorded only once.', code: ['+ if seen(key): return prior(key)', '+ receipt = pay.prompt(tip)', '+ ledger.record(key, receipt)'] },
      { file: 'TipScreen.tsx', screen: 'Thank you receipt', code: ['+ export function TipScreen() {', '+   const worker = useWorker(id)', '+   return <Amount to={worker} /> }'] },
    ],
  },
  {
    id: 'booking',
    label: 'Booking app',
    founder: 'We take bookings by phone and lose track of them.',
    app: 'Bookings',
    feature: 'Book a free slot',
    doneWhen: ['Only free slots show', 'No slot is booked twice', 'A confirmation is sent'],
    diffs: [
      { file: 'slots.py', screen: 'Pick a time', code: ['+ def free_slots(day):', '+     taken = bookings.on(day)', '+     return day.slots - taken'] },
      { file: 'bookings.py', screen: 'Confirmation message', sendBack: 'Two people must not get the same slot.', code: ['+ with lock(b.slot):', '+     save_if_free(b)', '+     notify(b.phone)'] },
      { file: 'DayView.tsx', screen: 'Owner day view', code: ['+ export function DayView() {', '+   const day = useBookings(today)', '+   return <Timeline items={day} /> }'] },
    ],
  },
]
