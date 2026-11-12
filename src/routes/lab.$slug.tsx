import { createFileRoute, notFound } from '@tanstack/react-router'

import { LabEntryView, LabNotFound, labEntryHead } from '#/components/LabParts'
import { findLabEntry } from '#/content/lab'

export const Route = createFileRoute('/lab/$slug')({
  // Entries with their own path (for example /jobmigo) are not served here (spec 0006, AC-5).
  loader: ({ params }) => {
    const entry = findLabEntry(params.slug)
    if (!entry) throw notFound()
    return entry
  },
  head: ({ loaderData }) => (loaderData ? labEntryHead(loaderData) : {}),
  notFoundComponent: LabNotFound,
  component: LabEntryPage,
})

function LabEntryPage() {
  return <LabEntryView entry={Route.useLoaderData()} />
}
