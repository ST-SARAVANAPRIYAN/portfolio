import { useRef } from 'react'
import { useHoverRevealMotion } from './useHoverRevealMotion'
import './HoverRevealCard.css'

type HoverRevealCardProps = {
  title: string
  frontImage: string
  backImage: string
  className?: string
}

export function HoverRevealCard({ title, frontImage, backImage, className }: HoverRevealCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const revealRef = useRef<HTMLDivElement | null>(null)

  const { interactive, isHovering, onPointerEnter, onPointerLeave, onPointerMove } =
    useHoverRevealMotion({ containerRef, revealRef })

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
        <div
          ref={revealRef}
          className={`hrc-reveal ${isHovering ? 'is-hovering' : ''}`}
        >
          <img
            src={backImage}
            alt=""
            className="hrc-image hrc-back"
            draggable={false}
          />
          {/* Shimmer edge at the reveal boundary */}
          <div className="hrc-edge-shimmer" aria-hidden="true" />
        </div>
      )}

      {/* Hover hint tooltip */}
      <div className={`hrc-hint ${isHovering ? 'hidden' : ''}`} aria-hidden="true">
        <span>hover to reveal</span>
      </div>
    </div>
  )
}
