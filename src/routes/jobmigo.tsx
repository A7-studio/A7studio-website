import { createFileRoute, notFound } from '@tanstack/react-router'

import { LabEntryView, LabNotFound, labEntryHead } from '#/components/LabParts'
import { findLabEntryByPath } from '#/content/lab'

export const Route = createFileRoute('/jobmigo')({
  loader: () => {
    const entry = findLabEntryByPath('/jobmigo')
    if (!entry) throw notFound()
    return entry
  },
  head: ({ loaderData }) => (loaderData ? labEntryHead(loaderData) : {}),
  notFoundComponent: LabNotFound,
  component: JobmigoPage,
})

function JobmigoPage() {
  return <LabEntryView entry={Route.useLoaderData()} />
}
