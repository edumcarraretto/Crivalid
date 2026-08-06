import { useState, useEffect, useRef } from "react";

/* =========================================================
   Leque de ferramentas — carrossel infinito
   Sempre mostra 3 tiles em arco. A cada ~2.5s, um tile sai
   com transição (escala + fade) e outro entra no lugar dele,
   ciclando por todo o pool infinitamente.
   ========================================================= */

const ALL_TILES = [
  {
    id: "comunidades",
    label: "Comunidades",
    from: "var(--color-brand-magenta)",
    to: "#C026D3",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="7" r="3.4" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="7" cy="23" r="3.4" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="25" cy="23" r="3.4" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M13.4 9.4 9.6 19.6M18.6 9.4l3.8 10.2M10.4 23h11.2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "saas",
    label: "SaaS",
    from: "#38BDF8",
    to: "var(--color-brand-blue)",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 3.2 29 10 16 16.8 3 10l13-6.8Z"
          fill="currentColor"
        />
        <path
          d="m3 16 13 6.8L29 16M3 22l13 6.8L29 22"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "cursos",
    label: "Cursos",
    from: "#FDBA74",
    to: "#F0603C",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 4 30 10.4 16 16.8 2 10.4 16 4Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M7.6 13.2v6.6c0 2 3.8 3.6 8.4 3.6s8.4-1.6 8.4-3.6v-6.6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M29.2 11.2v7.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ebook",
    label: "E-book",
    from: "#3F3F52",
    to: "#18182B",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 9.2c-2.4-2-5.6-3.2-9.2-3.2a1.4 1.4 0 0 0-1.4 1.4v15.2c0 .8.6 1.4 1.4 1.4 3.6 0 6.8 1.2 9.2 3.2 2.4-2 5.6-3.2 9.2-3.2.8 0 1.4-.6 1.4-1.4V7.4c0-.8-.6-1.4-1.4-1.4-3.6 0-6.8 1.2-9.2 3.2Z"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path d="M16 9.2v18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "marketplace",
    label: "Marketplace",
    from: "#FDE047",
    to: "#EFA113",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M5 13.6V26a1.6 1.6 0 0 0 1.6 1.6h18.8A1.6 1.6 0 0 0 27 26V13.6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M3.4 9.6 5.6 4.4h20.8l2.2 5.2c0 2.4-1.9 4.2-4.2 4.2S20.2 12 20.2 9.6c0 2.4-1.9 4.2-4.2 4.2s-4.2-1.8-4.2-4.2c0 2.4-1.9 4.2-4.2 4.2S3.4 12 3.4 9.6Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M13.2 27.6v-6.4h5.6v6.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "landing",
    label: "Landing Page",
    from: "#34D399",
    to: "#059669",
    glyph: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="24" height="18" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M4 11h24" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
        <circle cx="12" cy="8" r="1.2" fill="currentColor" />
        <path d="M10 17h12M10 21h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 25v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M11 29h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function MultiplayerAIPreview() {
  // Which 3 tiles from ALL_TILES are currently visible (by index)
  const [visible, setVisible] = useState([0, 1, 2]);
  // Which slot (0, 1, 2) is currently transitioning out
  const [exitingSlot, setExitingSlot] = useState<number | null>(null);
  // Next tile index from the pool to bring in
  const nextTileRef = useRef(3);
  // Which slot to swap next (cycles 0 → 1 → 2 → 0 …)
  const nextSlotRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    if (isHovering) return;

    const interval = setInterval(() => {
      const slotToSwap = nextSlotRef.current;

      // Phase 1: mark the slot as "exiting"
      setExitingSlot(slotToSwap);

      // Phase 2: after the exit animation, swap the tile and enter
      setTimeout(() => {
        const newTileIndex = nextTileRef.current;

        setVisible((prev) => {
          const next = [...prev];
          next[slotToSwap] = newTileIndex;
          return next;
        });

        // Advance pool pointer (loop around)
        nextTileRef.current = (newTileIndex + 1) % ALL_TILES.length;
        // Advance slot pointer
        nextSlotRef.current = (slotToSwap + 1) % 3;

        // Clear exit state so the new tile enters with animation
        setExitingSlot(null);
      }, 500); // matches the CSS exit transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const mid = 1; // always 3 visible, mid = 1

  return (
    <div className="tf__stage w-full relative flex items-center justify-center min-h-[160px] pb-4">
      <style>{`
        .tf__stage {
          font-family: var(--font-family-brand);
        }

        .tf {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 10px;
          transform: scale(0.85);
          transform-origin: center bottom;
        }

        .tf__slot {
          margin-left: -16px;
          transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1),
                      filter 500ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: 50% 130%;
          filter: blur(0px);
          will-change: transform, opacity, filter;
        }
        .tf__slot:first-child { margin-left: 0; }

        /* Exit animation — slides down with blur and rotation */
        .tf__slot[data-exiting="true"] {
          opacity: 0;
          filter: blur(6px);
          transform: translateY(30px) scale(0.5) rotate(8deg) !important;
          transition: transform 500ms cubic-bezier(0.55, 0, 1, 0.45),
                      opacity 450ms cubic-bezier(0.55, 0, 1, 0.45),
                      filter 450ms cubic-bezier(0.55, 0, 1, 0.45);
        }

        /* Enter animation — floats in from above with elastic bounce */
        .tf__slot[data-entering="true"] {
          animation: tileEnter 650ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes tileEnter {
          0% {
            opacity: 0;
            filter: blur(6px);
            transform: translateY(-24px) scale(0.5) rotate(-6deg);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }

        /* ---- tile ---- */
        .tf__tile {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 16px 8px 10px;
          border-radius: 24px;
          border: none;
          cursor: pointer;
          font: inherit;
          background: linear-gradient(165deg, var(--from) 0%, var(--to) 100%);
          box-shadow:
            0 18px 34px -14px rgba(0, 0, 0, 0.85),
            0 2px 6px -2px rgba(0, 0, 0, 0.5);
          transition: box-shadow 420ms ease;
        }

        /* rim claro: dá o acabamento de vidro sem borda dura */
        .tf__tile::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(
            170deg,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 255, 255, 0.12) 38%,
            rgba(255, 255, 255, 0) 62%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }

        /* brilho superior interno */
        .tf__tile::after {
          content: "";
          position: absolute;
          inset: 1.5px;
          border-radius: 23px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0) 46%
          );
          pointer-events: none;
        }

        .tf__glyph {
          width: 30px;
          height: 30px;
          color: #FFFFFF;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.28));
        }
        .tf__glyph svg { width: 100%; height: 100%; }

        .tf__label {
          max-width: 100%;
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.012em;
          text-align: center;
          color: #FFFFFF;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        /* ---- interação hover ---- */
        .tf__slot[data-hot="true"] { z-index: 40 !important; }
        .tf__slot[data-hot="true"] .tf__tile {
          box-shadow:
            0 30px 52px -16px rgba(0, 0, 0, 0.92),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .tf__tile:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.9);
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .tf__slot { transition-duration: 1ms; }
          .tf__slot[data-exiting="true"] { transition-duration: 1ms; }
          @keyframes tileEnter { from { opacity: 1; } }
        }
      `}</style>

      <div
        className="tf"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {visible.map((tileIdx, slotIdx) => {
          const tile = ALL_TILES[tileIdx];
          const off = slotIdx - mid;       // -1, 0, 1
          const dist = Math.abs(off);
          const isExiting = exitingSlot === slotIdx;

          const rotate = off * 14;
          const lift = Math.pow(dist, 1.3) * 18;
          const scale = 1 - dist * 0.05;

          return (
            <div
              key={`${tile.id}-${slotIdx}`}
              className="tf__slot"
              data-exiting={isExiting}
              style={{
                zIndex: 3 - dist,
                ...(!isExiting && {
                  transform: `translateY(${lift}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity: 1,
                }),
              }}
            >
              <button
                type="button"
                className="tf__tile"
                style={{ "--from": tile.from, "--to": tile.to } as React.CSSProperties}
              >
                <span className="tf__glyph">{tile.glyph}</span>
                <span className="tf__label">{tile.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
