import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

/**
 * Sets the saved theme (paper by default) before first paint, so a dark theme
 * visitor never sees a flash (spec 0009 follow-up). Transitions stay off until
 * after the first frame. Mirrors the theme logic in the page components.
 */
const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('a7-theme');if(t!=='light'&&t!=='dark'){t='light'}d.setAttribute('data-theme',t)}catch(e){}d.classList.add('theme-init');requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.remove('theme-init')})})})()`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#f5f6f3',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: [{ children: THEME_SCRIPT }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Scripts />
      </body>
    </html>
  )
}
