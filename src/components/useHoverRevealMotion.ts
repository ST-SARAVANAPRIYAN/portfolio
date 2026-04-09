import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent, RefObject } from 'react'
import gsap from 'gsap'

type HoverRevealMotionParams = {
  containerRef: RefObject<HTMLElement | null>
  revealRef: RefObject<HTMLElement | null>
}

const INTERACTIVE_QUERY = '(hover: hover) and (pointer: fine)'

// Generate a fluid splash polygon using radial spikes.
// cx, cy = center in px; radius = base radius in px; el = target element for size reference
function buildSplashClipPath(
  cx: number,
  cy: number,
  baseRadius: number,
  containerW: number,
  containerH: number,
): string {
  if (baseRadius <= 0) {
    return `polygon(${cx}px ${cy}px, ${cx}px ${cy}px)`
  }

  // 16 points around the circle — alternating spike outward and indent inward
  const POINTS = 16
  const SPIKE_RATIO = 1.35   // outer spike multiplier
  const DENT_RATIO = 0.78   // inner dent multiplier

  const pts: string[] = []
  for (let i = 0; i < POINTS; i++) {
    const angle = (i / POINTS) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0
      ? baseRadius * SPIKE_RATIO
      : baseRadius * DENT_RATIO
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    // Clamp within container so edges don't flicker
    const clampedX = Math.max(-baseRadius * 0.5, Math.min(containerW + baseRadius * 0.5, x))
    const clampedY = Math.max(-baseRadius * 0.5, Math.min(containerH + baseRadius * 0.5, y))
    pts.push(`${clampedX.toFixed(1)}px ${clampedY.toFixed(1)}px`)
  }

  return `polygon(${pts.join(', ')})`
}

export function useHoverRevealMotion({ containerRef, revealRef }: HoverRevealMotionParams) {
  const [interactive, setInteractive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Current cursor position in px (container-local)
  const cursorRef = useRef({ x: 0, y: 0 })
  // Animated radius value
  const radiusRef = useRef(0)
  // GSAP tween for radius
  const radiusTweenRef = useRef<gsap.core.Tween | null>(null)
  // rAF for polygon updates
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia(INTERACTIVE_QUERY)
    const update = () => {
      setInteractive(mq.matches)
      if (!mq.matches) setIsHovering(false)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Drive the clip-path polygon every frame while mounted
  useEffect(() => {
    if (!interactive) return
    const revealEl = revealRef.current
    if (!revealEl) return

    // Pre-seed position so first enter is smooth
    const containerEl = containerRef.current
    if (containerEl) {
      const rect = containerEl.getBoundingClientRect()
      cursorRef.current = { x: rect.width / 2, y: rect.height / 2 }
    }

    function loop() {
      const containerEl = containerRef.current
      const revealEl2 = revealRef.current
      if (!containerEl || !revealEl2) { rafRef.current = requestAnimationFrame(loop); return }

      const { x, y } = cursorRef.current
      const r = radiusRef.current
      const w = containerEl.offsetWidth
      const h = containerEl.offsetHeight
      revealEl2.style.clipPath = buildSplashClipPath(x, y, r, w, h)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [interactive, containerRef, revealRef])

  const animateRadius = useCallback(
    (target: number) => {
      if (radiusTweenRef.current) radiusTweenRef.current.kill()
      radiusTweenRef.current = gsap.to(radiusRef, {
        current: target,
        duration: target > 0 ? 0.65 : 0.45,
        ease: target > 0 ? 'elastic.out(1.1, 0.48)' : 'power3.in',
        overwrite: true,
      })
    },
    [],
  )

  const onPointerEnter = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!interactive) return
      setIsHovering(true)

      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      cursorRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }

      const targetRadius = clamp(110, Math.round(rect.width * 0.28), 340)
      animateRadius(targetRadius)
    },
    [interactive, containerRef, animateRadius],
  )

  const onPointerLeave = useCallback(() => {
    if (!interactive) return
    setIsHovering(false)
    animateRadius(0)
  }, [interactive, animateRadius])

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!interactive) return
      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      cursorRef.current = {
        x: gsap.utils.clamp(0, rect.width, event.clientX - rect.left),
        y: gsap.utils.clamp(0, rect.height, event.clientY - rect.top),
      }
    },
    [containerRef, interactive],
  )

  return useMemo(
    () => ({ interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove }),
    [interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove],
  )
}

function clamp(min: number, val: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
