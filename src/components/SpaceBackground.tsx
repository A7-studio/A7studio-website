import { useEffect, useRef } from 'react'

/**
 * Page background motion (spec 0013): drifting stars across the whole page and
 * a slowly turning spiral of points behind the hero. One plain canvas, no
 * dependency. It stops in a hidden tab and draws a single still frame when the
 * visitor asks for reduced motion. Decorative only.
 */
export function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768
    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    const stars = Array.from({ length: small ? 60 : 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      depth: rand(0.2, 1),
      phase: rand(0, Math.PI * 2),
    }))
    // Spiral arms: distance from the centre sets the angle, plus a little scatter.
    const galaxy = Array.from({ length: small ? 500 : 1400 }, (_, i) => {
      const d = Math.pow(Math.random(), 0.7)
      return {
        d,
        a: (i % 3) * ((Math.PI * 2) / 3) + d * 5.2 + rand(-0.35, 0.35),
        lift: rand(-0.06, 0.06) * (1 - d * 0.5),
        cyan: i % 6 === 0,
        blue: i % 4 === 0,
      }
    })

    let width = 0
    let height = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let pointerX = 0
    let pointerY = 0
    let time = 0
    let frame = 0

    const draw = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      const base = light ? '18, 24, 23' : '245, 246, 243'
      const blue = light ? '21, 94, 239' : '118, 168, 255'
      const cyan = light ? '11, 67, 186' : '118, 168, 255'
      const scroll = window.scrollY
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        // Nearer stars move more with scroll and pointer (parallax).
        const x = (((s.x * width + time * 6 * s.depth + pointerX * 18 * s.depth) % width) + width) % width
        const y = (((s.y * height - scroll * 0.12 * s.depth + pointerY * 12 * s.depth) % height) + height) % height
        const twinkle = 0.65 + Math.sin(time * 1.4 + s.phase) * 0.35
        ctx.fillStyle = `rgba(${base}, ${(light ? 0.22 : 0.45) * s.depth * twinkle})`
        ctx.fillRect(x, y, s.depth * 2, s.depth * 2)
      }

      // The spiral belongs to the hero, so it fades as the page scrolls.
      const fade = Math.max(0, 1 - scroll / (height * 0.9))
      if (fade > 0) {
        const radius = Math.min(width * 0.46, height * 0.75)
        const cx = width * (small ? 0.78 : 0.72) + pointerX * 14
        const cy = height * (small ? 0.72 : 0.46) - scroll * 0.35 + pointerY * 10
        const tilt = -0.38
        const cos = Math.cos(tilt)
        const sin = Math.sin(tilt)
        for (const p of galaxy) {
          const angle = p.a + time * (0.05 + (1 - p.d) * 0.09)
          const gx = Math.cos(angle) * p.d * radius
          const gy = Math.sin(angle) * p.d * radius * 0.42 + p.lift * radius
          const near = (Math.sin(angle) + 1) / 2
          const alpha = (0.15 + (1 - p.d) * 0.45 + near * 0.2) * fade * (light ? 0.4 : small ? 0.5 : 0.85)
          const size = 0.7 + near * 1.3
          ctx.fillStyle = `rgba(${p.cyan ? cyan : p.blue ? blue : base}, ${alpha})`
          ctx.fillRect(cx + gx * cos - gy * sin, cy + gx * sin + gy * cos, size, size)
        }
      }
    }

    let last = 0
    const tick = (now: number) => {
      time += Math.min((now - (last || now)) / 1000, 0.05)
      last = now
      draw()
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      last = 0
      if (!reduce && !document.hidden) frame = requestAnimationFrame(tick)
    }

    resize()
    draw()
    start()

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start())
    const onResize = () => {
      resize()
      draw()
    }
    const onPointer = (e: PointerEvent) => {
      if (reduce || e.pointerType !== 'mouse') return
      pointerX = e.clientX / width - 0.5
      pointerY = e.clientY / height - 0.5
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return <canvas ref={ref} className="space-background" aria-hidden="true" />
}
