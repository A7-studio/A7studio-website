import { useEffect, useState } from 'react'

/** True when the visitor has not asked for reduced motion (spec 0009). */
function motionAllowed() {
  return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Cycles through `count` items every `ms`, only when motion is allowed. */
export function useRotatingIndex(count: number, ms = 2600) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!motionAllowed() || count < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ms)
    return () => window.clearInterval(id)
  }, [count, ms])
  return index
}

/**
 * Page motion (spec 0009): scroll reveals for `.reveal`, a cursor spotlight on
 * `.spotlight`, a small tilt on `.tilt`, and a magnetic pull on `.magnetic`.
 * Everything is skipped when the visitor asks for reduced motion, and content
 * stays visible without JavaScript.
 */
export function usePageMotion() {
  useEffect(() => {
    if (!motionAllowed()) return
    const root = document.documentElement
    root.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (item.isIntersecting) {
            item.target.classList.add('is-visible')
            observer.unobserve(item.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const cleanups: Array<() => void> = []

    if (finePointer) {
      document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        el.addEventListener('pointermove', move)
        cleanups.push(() => el.removeEventListener('pointermove', move))
      })

      document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`
        }
        const leave = () => {
          el.style.transform = ''
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      })

      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - (r.left + r.width / 2)
          const y = e.clientY - (r.top + r.height / 2)
          el.style.transform = `translate(${(x * 0.18).toFixed(1)}px, ${(y * 0.25).toFixed(1)}px)`
        }
        const leave = () => {
          el.style.transform = ''
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      })
    }

    return () => {
      observer.disconnect()
      cleanups.forEach((fn) => fn())
      root.classList.remove('motion-ready')
    }
  }, [])
}
