/**
 * The build room simulation (spec 0014). Every idea, line of code and answer is
 * an example. Nothing is a real client, result or model output.
 */
export interface BuildDiff {
  file: string
  code: string[]
  /** What shows up in the preview once this change is approved. */
  screen: string
  /** What a reviewer should send this change back for. */
  note: string
  /** The line added by the fix. */
  fix: string
}

export interface BuildTry {
  ask: string
  answer: string
  proof: string
}

export interface BuildIdea {
  id: string
  label: string
  founder: string
  app: string
  feature: string
  /** What must be true before the feature counts as done, one per change. */
  doneWhen: string[]
  diffs: BuildDiff[]
  /** The change that has a real gap: its check fails if it is approved as is. */
  flawed: number
  /** An extra requirement the visitor can add to the spec. */
  extra: { doneWhen: string; diff: BuildDiff }
  tries: BuildTry[]
}

export const buildIdeas: BuildIdea[] = [
  {
    id: 'assistant',
    label: 'Support assistant',
    founder: 'Customers keep asking the same questions.',
    app: 'Help desk AI',
    feature: 'Answer from your docs',
    doneWhen: ['Finds the right pages', 'Unsure questions go to a person', 'Every answer shows its source'],
    flawed: 1,
    diffs: [
      { file: 'retrieve.py', screen: 'Search your docs', note: 'Drop weak matches before they reach the model.', fix: '+     hits = rerank(hits)', code: ['+ def retrieve(question):', '+     hits = index.search(question)', '+     return [h for h in hits if h.score > 0.7]'] },
      { file: 'answer.py', screen: 'Answer or hand off', note: 'With no source, hand off to a person.', fix: '+ if not ctx: return handoff(q)', code: ['+ ctx = retrieve(q.text)', '+ reply = llm.answer(q, ctx)', '+ return reply'] },
      { file: 'Chat.tsx', screen: 'Source under each answer', note: 'Show the source even on small screens.', fix: '+   <Source doc={reply.source} />', code: ['+ export function Chat() {', '+   const { reply, ask } = useAnswer()', '+   return <Thread reply={reply} onAsk={ask} /> }'] },
    ],
    extra: {
      doneWhen: 'Answers in Swahili too',
      diff: { file: 'language.py', screen: 'English and Swahili', note: 'Reply in the language of the question.', fix: '+ reply.lang = detect(q.text)', code: ['+ def localise(q, reply):', '+     lang = detect(q.text)', '+     return translate(reply, lang)'] },
    },
    tries: [
      { ask: 'How do I reset my PIN?', answer: 'Open Settings, choose Security, then Reset PIN.', proof: 'Source: account-help.md' },
      { ask: 'Can you refund my friend?', answer: 'I am not sure, so I am passing you to a person.', proof: 'No source found, handed off' },
    ],
  },
  {
    id: 'invoices',
    label: 'Invoice reader',
    founder: 'We type supplier invoices into a spreadsheet by hand.',
    app: 'Invoice AI',
    feature: 'Read an invoice photo',
    doneWhen: ['Reads supplier, date and total', 'Totals that do not add up are flagged', 'A person approves before saving'],
    flawed: 1,
    diffs: [
      { file: 'extract.py', screen: 'Read a photo', note: 'Return empty, not a guess, for unreadable fields.', fix: '+     fields = drop_unsure(fields)', code: ['+ def extract(image):', '+     fields = llm.read(image, Invoice)', '+     return fields'] },
      { file: 'validate.py', screen: 'Check the totals', note: 'Never trust the model with arithmetic. Add it up in code.', fix: '+ assert sum(lines) == inv.total, "flag"', code: ['+ def validate(inv):', '+     lines = [l.amount for l in inv.lines]', '+     return inv'] },
      { file: 'Approve.tsx', screen: 'Approve and save', note: 'Disable save while a flag is open.', fix: '+   disabled={inv.flags.length > 0}', code: ['+ export function Approve({ inv }) {', '+   return <Button onClick={() => save(inv)}>', '+     Save</Button> }'] },
    ],
    extra: {
      doneWhen: 'Duplicate invoices are caught',
      diff: { file: 'dedupe.py', screen: 'Catch duplicates', note: 'Match on supplier and number, not the file name.', fix: '+     key = (inv.supplier, inv.number)', code: ['+ def is_duplicate(inv):', '+     key = inv.file_name', '+     return key in saved'] },
    },
    tries: [
      { ask: 'Scan a clear invoice', answer: 'Supplier, date and total read. Totals add up.', proof: 'Ready for your approval' },
      { ask: 'Scan one with a wrong total', answer: 'The lines do not add up to the total. Please check.', proof: 'Flagged, save is blocked' },
    ],
  },
  {
    id: 'voice',
    label: 'Voice booking agent',
    founder: 'We miss calls, so we miss bookings.',
    app: 'Booking voice AI',
    feature: 'Book a slot over a call',
    doneWhen: ['Understands the day and time', 'No slot is booked twice', 'The caller hears it confirmed'],
    flawed: 1,
    diffs: [
      { file: 'listen.py', screen: 'Hear the caller', note: 'Ask again when the time is unclear.', fix: '+     if unsure(t): return ask_again()', code: ['+ def understand(audio):', '+     text = speech.to_text(audio)', '+     return llm.parse(text, BookingRequest)'] },
      { file: 'book.py', screen: 'Hold the slot', note: 'Two callers must not get the same slot.', fix: '+ with lock(req.slot):', code: ['+ def book(req):', '+     if slots.free(req.slot):', '+         slots.save(req)'] },
      { file: 'confirm.py', screen: 'Read it back', note: 'Confirm the date in words, not numbers.', fix: '+     day = spoken(booking.date)', code: ['+ def confirm(booking):', '+     line = say(booking.date, booking.time)', '+     return speech.to_audio(line)'] },
    ],
    extra: {
      doneWhen: 'A message is sent after the call',
      diff: { file: 'notify.py', screen: 'Send a message', note: 'Send only after the booking is saved.', fix: '+     if not booking.saved: return', code: ['+ def notify(booking):', '+     sms.send(booking.phone, summary(booking))', '+     return True'] },
    },
    tries: [
      { ask: '“Tomorrow at ten, please”', answer: 'Ten tomorrow morning is booked for you.', proof: 'Slot held, confirmed aloud' },
      { ask: '“Ten again” (second caller)', answer: 'Ten is taken. I can offer half past ten.', proof: 'No double booking' },
    ],
  },
]
