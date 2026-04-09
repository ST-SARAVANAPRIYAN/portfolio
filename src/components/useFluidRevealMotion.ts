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

  useEffect(() => {
    const mq = window.matchMedia(INTERACTIVE_QUERY)
    const update = () => {
      setInteractive(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Idle "wandering" animation when not hovering
  useEffect(() => {
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
        
        // Smaller base radius for idle state
        if (radius.get() === 0 || radius.get() < 30) {
          animate(radius, 45, { duration: 1.5, ease: 'easeInOut' })
        }
      }
      
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isHovering, containerRef, mouseX, mouseY, radius, idleNoise])

  const onPointerEnter = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      setIsHovering(true)
      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      const targetRadius = Math.max(75, rect.width * 0.22)
      animate(radius, targetRadius, {
        type: 'spring',
        stiffness: 140,
        damping: 25,
      })
    },
    [containerRef, radius],
  )

  const onPointerLeave = useCallback(() => {
    setIsHovering(false)
    // Don't go to 0, go to idle radius
    animate(radius, 45, {
      duration: 0.8,
      ease: 'easeInOut',
    })
  }, [radius])

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    },
    [containerRef, mouseX, mouseY],
  )

  // Ripple effect on tap/click
  const triggerRipple = useCallback(() => {
    const currentRadius = radius.get()
    const containerEl = containerRef.current
    if (!containerEl) return
    
    const rect = containerEl.getBoundingClientRect()
    const peakRadius = Math.max(currentRadius + 60, rect.width * 0.4)
    
    animate(radius, peakRadius, {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      onComplete: () => {
        const resetRadius = isHovering ? Math.max(75, rect.width * 0.22) : 45
        animate(radius, resetRadius, {
          type: 'spring',
          stiffness: 100,
          damping: 20
        })
      }
    })
  }, [radius, isHovering, containerRef])

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
