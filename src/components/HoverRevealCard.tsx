import { useId, useMemo, useRef } from 'react'
import { motion, useSpring, useTransform, useTime } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { createNoise2D } from 'simplex-noise'
import { useFluidRevealMotion } from './useFluidRevealMotion'
import './HoverRevealCard.css'

type HoverRevealCardProps = {
  title: string
  frontImage: string
  backImage: string
  className?: string
}

interface FluidBlobProps {
  i: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  radius: MotionValue<number>
  offsetX: number
  offsetY: number
  total: number
  noiseScale: number
  noiseSpeed: number
  noise2D: (x: number, y: number) => number
}

function FluidBlob({ i, mouseX, mouseY, radius, offsetX, offsetY, total, noise2D, noiseScale, noiseSpeed }: FluidBlobProps) {
  const time = useTime()

  // Loose physics with variations
  const stiffness = 82 - i * 1.1
  const damping = 10 + i * 0.65
  const mass = 0.9 + i * 0.08

  const springX = useSpring(mouseX, { stiffness, damping, mass })
  const springY = useSpring(mouseY, { stiffness, damping, mass })
  const springRadius = useSpring(radius, { stiffness, damping, mass })

  // Use Simplex Noise to jitter the blob even when the mouse is static
  const x = useTransform([springX, time], ([baseX, t]) => {
    const timeSec = (t as number) / 1000
    const noise = noise2D(i * 10, timeSec * noiseSpeed) * noiseScale
    return (baseX as number) + offsetX + noise
  })

  const y = useTransform([springY, time], ([baseY, t]) => {
    const timeSec = (t as number) / 1000
    const noise = noise2D(i * 10 + 50, timeSec * noiseSpeed) * noiseScale
    return (baseY as number) + offsetY + noise
  })

  const scaledRadius = useTransform(springRadius, (r) => {
    const scale = (1 - (i / total) * 0.84) * 0.82
    return r * scale
  })

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={scaledRadius}
      fill="white"
    />
  )
}

const BLOB_COUNT = 34

export function HoverRevealCard({ title, frontImage, backImage, className }: HoverRevealCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const maskId = useId().replace(/:/g, '')
  const noise2D = useMemo(() => createNoise2D(), [])

  const {
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    triggerRipple,
    mouseX,
    mouseY,
    radius,
  } = useFluidRevealMotion({ containerRef })

  const blobData = useMemo(() => {
    return Array.from({ length: BLOB_COUNT }).map((_, i) => ({
      x: (Math.random() - 0.5) * (56 + i * 4.4),
      y: (Math.random() - 0.5) * (44 + i * 3.8),
      noiseScale: 22 + Math.random() * 34,
      noiseSpeed: 0.4 + Math.random() * 1.1,
    }))
  }, [])

  return (
    <div
      ref={containerRef}
      className={`hover-reveal-card ${className ?? ''}`.trim()}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onClick={triggerRipple}
      aria-label={title}
    >
      {/* Front image */}
      <img
        src={frontImage}
        alt="Saravana Priyan"
        className="hrc-image hrc-front"
        draggable={false}
      />

      {/* Back image — revealed via fluid splash */}
      <svg className="hrc-svg-mask-definitions" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 36 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          <mask id={`mask-${maskId}`}>
            <g filter="url(#goo)">
              {blobData.map((data, i) => (
                <FluidBlob
                  key={i}
                  i={i}
                  total={BLOB_COUNT}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  radius={radius}
                  offsetX={data.x}
                  offsetY={data.y}
                  noise2D={noise2D}
                  noiseScale={data.noiseScale}
                  noiseSpeed={data.noiseSpeed}
                />
              ))}
            </g>
          </mask>
        </defs>
      </svg>

      <div
        className="hrc-reveal"
        style={{
          WebkitMaskImage: `url(#mask-${maskId})`,
          maskImage: `url(#mask-${maskId})`,
          opacity: 1
        }}
      >
        <img
          src={backImage}
          alt=""
          className="hrc-image hrc-back"
          draggable={false}
        />
      </div>
    </div>
  )
}
