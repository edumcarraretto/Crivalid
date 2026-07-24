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
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
          transition: transform 250ms ease-out, filter 250ms ease-out;
        }

        @media (hover: hover) {
          .showcase-item:hover {
            transform: scale(1.03) translateY(-6px);
            filter: drop-shadow(0 12px 36px rgba(0, 0, 0, 0.5));
            z-index: 20;
          }

          /* Dim siblings on hover */
          .showcase-marquee-track:has(.showcase-item:hover) .showcase-item:not(:hover) {
            opacity: 0.55;
            transition: opacity 300ms ease-out, transform 250ms ease-out;
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
