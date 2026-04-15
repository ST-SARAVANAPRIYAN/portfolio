import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent, RefObject } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import { createNoise2D } from 'simplex-noise'

type FluidRevealMotionParams = {
  containerRef: RefObject<HTMLElement | null>
}

const INTERACTIVE_QUERY = '(hover: hover) and (pointer: fine)'

export function useFluidRevealMotion({ containerRef }: FluidRevealMotionParams) {
  const [interactive, setInteractive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)

  const idleNoise = useMemo(() => createNoise2D(), [])
  const rafRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const didSetIdleRadius = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia(INTERACTIVE_QUERY)
    const update = () => {
      setInteractive(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Idle wandering only on devices with precise pointers.
  useEffect(() => {
    if (!interactive) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    const loop = (t: number) => {
      timeRef.current = t / 1500
      
      if (!isHovering && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const cx = rect.width / 2
        const cy = rect.height / 2
        
        // Wander around the center
        const nx = idleNoise(timeRef.current * 0.4, 0) * (rect.width * 0.25)
        const ny = idleNoise(0, timeRef.current * 0.4) * (rect.height * 0.25)
        
        mouseX.set(cx + nx)
        mouseY.set(cy + ny)
        
        if (!didSetIdleRadius.current) {
          radius.set(64)
          didSetIdleRadius.current = true
        }
      }
      
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [interactive, isHovering, containerRef, mouseX, mouseY, radius, idleNoise])

  const onPointerEnter = useCallback(
    () => {
      if (!interactive) return
      setIsHovering(true)
      didSetIdleRadius.current = false
      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      const targetRadius = Math.max(110, rect.width * 0.26)
      animate(radius, targetRadius, {
        type: 'spring',
        stiffness: 88,
        damping: 21,
        mass: 1,
      })
    },
    [containerRef, interactive, radius],
  )

  const onPointerLeave = useCallback(() => {
    if (!interactive) return
    setIsHovering(false)
    didSetIdleRadius.current = false
    animate(radius, 64, {
      type: 'spring',
      stiffness: 72,
      damping: 20,
      mass: 1,
    })
  }, [interactive, radius])

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!interactive) return
      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    },
    [containerRef, interactive, mouseX, mouseY],
  )

  // Ripple effect on tap/click
  const triggerRipple = useCallback(() => {
    if (!interactive) return
    const currentRadius = radius.get()
    const containerEl = containerRef.current
    if (!containerEl) return
    
    const rect = containerEl.getBoundingClientRect()
    const peakRadius = Math.max(currentRadius + 84, rect.width * 0.44)
    
    animate(radius, peakRadius, {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 0.9,
      onComplete: () => {
        const resetRadius = isHovering ? Math.max(110, rect.width * 0.26) : 64
        animate(radius, resetRadius, {
          type: 'spring',
          stiffness: 78,
          damping: 21,
          mass: 1,
        })
      }
    })
  }, [interactive, radius, isHovering, containerRef])

  return useMemo(
    () => ({
      interactive,
      isHovering,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      triggerRipple,
      mouseX,
      mouseY,
      radius,
    }),
    [interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove, triggerRipple, mouseX, mouseY, radius],
  )
}
