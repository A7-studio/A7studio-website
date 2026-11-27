import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

/**
 * The theme toggle state. The first render is always 'light' so the server and
 * browser HTML match (no hydration error). After mount it reads the theme the
 * head script already applied, then saves every change.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    setSynced(true)
  }, [])

  useEffect(() => {
    if (!synced) return
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('a7-theme', theme)
    } catch {
      // Storage can be blocked; the theme still applies for this page.
    }
  }, [theme, synced])

  return [theme, setTheme] as const
}
