/**
 * The theme follows the visitor's own clock (spec 0018): paper by day, ink by
 * night. Their device gives local time, so this works in every time zone.
 * A click on the theme button wins until the next sunrise or sunset hour.
 */
export type Theme = 'dark' | 'light'

export const DAY_STARTS = 6
export const NIGHT_STARTS = 18
export const CHOICE_KEY = 'a7-theme-choice'
export const THEME_COLOR: Record<Theme, string> = { light: '#f5f6f3', dark: '#121817' }

export function themeForTime(date: Date): Theme {
  const hour = date.getHours()
  return hour >= DAY_STARTS && hour < NIGHT_STARTS ? 'light' : 'dark'
}

/** The moment the clock next changes the theme. */
export function nextSwitch(date: Date): number {
  const next = new Date(date)
  const hour = date.getHours()
  if (hour < DAY_STARTS) next.setHours(DAY_STARTS, 0, 0, 0)
  else if (hour < NIGHT_STARTS) next.setHours(NIGHT_STARTS, 0, 0, 0)
  else {
    next.setDate(next.getDate() + 1)
    next.setHours(DAY_STARTS, 0, 0, 0)
  }
  return next.getTime()
}

/** The visitor's click if it is still current, otherwise the theme for the time of day. */
export function currentTheme(): Theme {
  const now = new Date()
  try {
    const choice = JSON.parse(localStorage.getItem(CHOICE_KEY) ?? 'null') as { theme?: string; until?: number } | null
    if (choice && (choice.theme === 'light' || choice.theme === 'dark') && now.getTime() < Number(choice.until)) {
      return choice.theme
    }
  } catch {
    // Blocked or broken storage: follow the clock.
  }
  return themeForTime(now)
}

/**
 * Runs in the document head before first paint, so there is no flash. It repeats
 * `currentTheme` because it cannot import anything.
 */
export const THEME_SCRIPT = `(function(){var d=document.documentElement,n=new Date(),h=n.getHours(),t=h>=${DAY_STARTS}&&h<${NIGHT_STARTS}?'light':'dark';try{var c=JSON.parse(localStorage.getItem('${CHOICE_KEY}'));if(c&&(c.theme==='light'||c.theme==='dark')&&n.getTime()<c.until){t=c.theme}}catch(e){}d.setAttribute('data-theme',t);d.classList.add('theme-init');requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.remove('theme-init')})})})()`
