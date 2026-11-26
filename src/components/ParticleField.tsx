import { useEffect, useRef } from 'react'

/**
 * A slow rotating sphere of points behind the hero (spec 0010). Plain canvas,
 * no dependency. It pauses when off screen or in a hidden tab, and draws one
 * still frame when the visitor asks for reduced motion. Decorative only.
 */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768
    const count = small ? 420 : 900
    // Points on a sphere (golden spiral), each with a fixed colour.
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = i * 2.399963
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, lime: i % 9 === 0 }
    })

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const lime = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-fill').trim() || '#c6ff3d'
    let angle = 0.6
    let frame = 0
    let running = false

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      const base = light ? '11, 21, 48' : '244, 247, 251'
      const radius = Math.min(width, height) * 0.42
      const cx = width * 0.5
      const cy = height * 0.5
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      for (const p of points) {
        const x = p.x * cos - p.z * sin
        const z = p.x * sin + p.z * cos
        const depth = (z + 1) / 2
        const size = 0.6 + depth * 1.4
        ctx.globalAlpha = 0.12 + depth * 0.7
        ctx.fillStyle = p.lime ? lime : `rgb(${base})`
        ctx.fillRect(cx + x * radius, cy + p.y * radius * 0.92, size, size)
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      angle += 0.0018
      draw()
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    draw()
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()))
    observer.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    const onResize = () => {
      resize()
      draw()
    }
    window.addEventListener('resize', onResize)
    const themeObserver = new MutationObserver(() => draw())
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      observer.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />
}
