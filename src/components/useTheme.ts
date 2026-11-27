import { useCallback, useEffect, useState } from 'react'

import { CHOICE_KEY, THEME_COLOR, currentTheme, nextSwitch } from '#/content/theme'
import type { Theme } from '#/content/theme'

/**
 * The theme and the toggle. The first render is always 'light' so the server and
 * browser HTML match. After mount it follows the visitor's clock, also while the
 * page stays open. Only a click is saved, and only until the next switch.
 */
export function useTheme() {
  const [theme, setState] = useState<Theme>('light')
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    const sync = () => setState(currentTheme())
    sync()
    setSynced(true)
    const timer = window.setInterval(sync, 30_000)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    if (!synced) return
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme, synced])

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(CHOICE_KEY, JSON.stringify({ theme: next, until: nextSwitch(new Date()) }))
    } catch {
      // Storage can be blocked; the choice still applies for this page.
    }
    setState(next)
  }, [])

  return [theme, toggle] as const
}
