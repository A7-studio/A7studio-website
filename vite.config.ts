import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'

import { hasLab, labSlugs } from './src/content/lab.ts'
import { storySlugs } from './src/content/work.ts'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      pages: [
        { path: '/work' },
        ...storySlugs.map((slug) => ({ path: `/work/${slug}` })),
        // The Lab is prerendered only once an entry is published (spec 0005).
        ...(hasLab ? [{ path: '/lab' }, ...labSlugs.map((slug) => ({ path: `/lab/${slug}` }))] : []),
      ],
      prerender: {
        enabled: true,
        crawlLinks: false,
        // Skip /lab and /lab/* while no entry is published, so the empty Lab has no output.
        filter: (page) => hasLab || !page.path.startsWith('/lab'),
      },
    }),
    viteReact(),
  ],
})

export default config
