import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PointerEvent, RefObject } from 'react'
import { animate, useMotionValue, useSpring, useTransform } from 'framer-motion'

type FluidRevealMotionParams = {
  containerRef: RefObject<HTMLElement | null>
}

const INTERACTIVE_QUERY = '(hover: hover) and (pointer: fine)'
const BLOB_COUNT = 8

export function useFluidRevealMotion({ containerRef }: FluidRevealMotionParams) {
  const [interactive, setInteractive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Main cursor position (MotionValues for spring physics)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Base radius (MotionValue for expansion animation)
  const radius = useMotionValue(0)

  // Trails for blobs
  const blobs = useMemo(() => {
    return Array.from({ length: BLOB_COUNT }).map((_, i) => {
      // Each blob has a slightly different spring for fluid lag
      const stiffness = 80 - i * 8
      const damping = 15 + i * 2
      const mass = 1 + i * 0.2

      // We use a transformed motion value for the trailing radius
      // to make each successive blob smaller.
      const springRadius = useSpring(radius, { stiffness, damping, mass })
      const scaledRadius = useTransform(springRadius, (r) => r * (1 - i * 0.08))

      return {
        x: useSpring(mouseX, { stiffness, damping, mass }),
        y: useSpring(mouseY, { stiffness, damping, mass }),
        r: scaledRadius,
      }
    })
  }, [mouseX, mouseY, radius])

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

  const onPointerEnter = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!interactive) return
      setIsHovering(true)

      const containerEl = containerRef.current
      if (!containerEl) return

      const rect = containerEl.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Snap mouse values to initial enter position
      mouseX.set(x)
      mouseY.set(y)

      // Animate expansion
      const targetRadius = Math.max(120, rect.width * 0.35)
      animate(radius, targetRadius, {
        type: 'spring',
        stiffness: 120,
        damping: 25,
      })
    },
    [interactive, containerRef, mouseX, mouseY, radius],
  )

  const onPointerLeave = useCallback(() => {
    if (!interactive) return
    setIsHovering(false)
    // Animate retraction
    animate(radius, 0, {
      duration: 0.4,
      ease: 'circIn',
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

  return useMemo(
    () => ({ interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove, blobs }),
    [interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove, blobs],
  )
}
