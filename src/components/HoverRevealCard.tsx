import { useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFluidRevealMotion } from './useFluidRevealMotion'
import './HoverRevealCard.css'

type HoverRevealCardProps = {
  title: string
  frontImage: string
  backImage: string
  className?: string
}

export function HoverRevealCard({ title, frontImage, backImage, className }: HoverRevealCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const maskId = useId().replace(/:/g, '') // SVG IDs don't like colons

  const { interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove, blobs } =
    useFluidRevealMotion({ containerRef })

  return (
    <div
      ref={containerRef}
      className={`hover-reveal-card ${className ?? ''}`.trim()}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      aria-label={title}
    >
      {/* Front image — always visible */}
      <img
        src={frontImage}
        alt="Saravana Priyan"
        className="hrc-image hrc-front"
        draggable={false}
      />

      {/* Back image — revealed via fluid splash on hover */}
      {interactive && (
        <>
          <svg className="hrc-svg-mask-definitions" aria-hidden="true">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>

              <mask id={`mask-${maskId}`}>
                <g filter="url(#goo)">
                  {blobs.map((blob, i) => (
                    <motion.circle
                      key={i}
                      cx={blob.x}
                      cy={blob.y}
                      r={blob.r}
                      fill="white"
                    />
                  ))}
                </g>
              </mask>
            </defs>
          </svg>

          <div
            className={`hrc-reveal ${isHovering ? 'is-hovering' : ''}`}
            style={{
              WebkitMaskImage: `url(#mask-${maskId})`,
              maskImage: `url(#mask-${maskId})`,
            }}
          >
            <img
              src={backImage}
              alt=""
              className="hrc-image hrc-back"
              draggable={false}
            />
          </div>
        </>
      )}

      {/* Hover hint tooltip */}
      <div className={`hrc-hint ${isHovering ? 'hidden' : ''}`} aria-hidden="true">
        <span>hover to reveal</span>
      </div>
    </div>
  )
}
