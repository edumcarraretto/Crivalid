import { motion } from 'motion/react'
import { CreationShowcaseTrack } from './CreationShowcaseTrack'

// ─── Component ────────────────────────────────────────────────────────────────

export function CreationShowcase() {
  return (
    <section className="relative py-12 sm:py-16" aria-labelledby="showcase-heading">
      <h2 id="showcase-heading" className="sr-only">
        Exemplos de interfaces criadas com a plataforma
      </h2>
      
      {/* Scoped styles */}
      <style>{`
        @keyframes showcase-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(calc(-1 * var(--showcase-distance)), 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .showcase-marquee-track {
            animation: none !important;
          }
        }

        @media (hover: hover) {
          .showcase-marquee-track {
            transition: animation-play-state 0.4s ease;
          }
          .showcase-marquee-track:hover {
            animation-play-state: paused;
          }
        }

        /* Item hover effects */
        .showcase-item {
          transition: transform 250ms ease-out, box-shadow 250ms ease-out;
        }

        @media (hover: hover) {
          .showcase-item:hover {
            transform: scale(1.03) translateY(-6px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            z-index: 20;
          }

          /* Dim siblings on hover */
          .showcase-marquee-track:has(.showcase-item:hover) .showcase-item:not(:hover) {
            opacity: 0.55;
            transition: opacity 300ms ease-out, transform 250ms ease-out;
          }

          /* Pill glow on hover */
          .showcase-item:hover .showcase-pill {
            background-color: rgba(0, 0, 0, 0.65);
            border-color: rgba(255, 255, 255, 0.22);
          }

          /* Reveal subcategory on hover */
          .showcase-item:hover .showcase-subcategory {
            max-width: 160px;
            opacity: 1;
          }
        }
      `}</style>

      {/* ── Marquee track ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <CreationShowcaseTrack />
      </motion.div>
    </section>
  )
}
