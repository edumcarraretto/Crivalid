import { useState, useEffect } from "react";

const STATUS_PHRASES = [
  'Analisando contexto e referências...',
  'Buscando referências relevantes...',
  'Mapeando ideias e direções...',
  'Conectando contexto e intenção...',
  'Investigando a melhor abordagem...',
]

/* ---------------------------------------------------------------
   Pétalas: cada uma é um <rect> arredondado, deslocado do centro
   e rotacionado. 6 pétalas a cada 60°.
--------------------------------------------------------------- */
const PETALS = [
  { rotate: 0, color: "#FF4D8D" },
  { rotate: 60, color: "#FF7A3D" },
  { rotate: 120, color: "#FFC94A" },
  { rotate: 180, color: "#38BDF8" },
  { rotate: 240, color: "var(--color-brand-blue)" },
  { rotate: 300, color: "var(--color-brand-magenta)" },
];

function FlowerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="pp-flower" aria-hidden="true">
      <defs>
        <filter id="pp-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <g transform="translate(32 32)" filter="url(#pp-soft)">
        {PETALS.map((p) => (
          <rect
            key={p.rotate}
            x="-8.5"
            y="-18"
            width="17"
            height="21"
            rx="8.5"
            fill={p.color}
            transform={`rotate(${p.rotate})`}
            style={{ mixBlendMode: "screen" }}
          />
        ))}

        {/* miolo — squircle claro, o mesmo primitivo <rect> */}
        <rect
          x="-7"
          y="-7"
          width="14"
          height="14"
          rx="5"
          fill="#FFF0F7"
          opacity="0.95"
        />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- */

export function DeepSearchStatusPanel() {
  const [statusIndex, setStatusIndex] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)

  // Rotate text
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_PHRASES.length)
      setProgressWidth(0) // reset before animating next
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Animate progress
  useEffect(() => {
    const t = setTimeout(() => {
      // Animate progress bar between 65% and 75%
      setProgressWidth(65 + Math.random() * 10)
    }, 200)
    return () => clearTimeout(t)
  }, [statusIndex])

  const label = STATUS_PHRASES[statusIndex];
  const pct = Math.min(100, Math.max(0, progressWidth));

  return (
    <div className="relative z-20 mt-auto w-full flex justify-end translate-x-[20%] sm:translate-x-[25%] pb-2">
      <style>{`
        @property --pill-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .pp-root {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          min-width: 340px;
          max-width: 460px;
          padding: 14px 27px 14px 14px;
          border-radius: 9999px;
          border: none;
          background: var(--color-surface-inverse);
          box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(16px);
          font-family: var(--font-family-brand);
        }

        /* linha nítida (rastro de 1px) */
        .pp-root::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(
            from var(--pill-angle),
            rgba(255, 255, 255, 0.06) 0deg,
            rgba(255, 255, 255, 0.06) 20deg,
            rgba(255, 77, 141, 0.45) 48deg,
            rgba(255, 235, 245, 0.90) 68deg,
            rgb(217 45 187 / 0.45) 92deg,
            rgba(255, 255, 255, 0.06) 130deg,
            rgba(255, 255, 255, 0.06) 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: pill-border 6s linear infinite;
          pointer-events: none;
        }


        /* --- ícone: totalmente contido no pill --- */
        .pp-icon {
          position: relative;
          flex: 0 0 auto;
          width: 60px;
          height: 60px;
          display: grid;
          place-items: center;
          isolation: isolate;
        }



        .pp-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: conic-gradient(
            from 0deg,
            #FF4D8D 0deg,
            #FF7A3D 60deg,
            #FFC94A 120deg,
            #38BDF8 180deg,
            var(--color-brand-blue) 240deg,
            var(--color-brand-magenta) 300deg,
            #FF4D8D 360deg
          );
          z-index: 1;
          animation: pp-spin 4s linear infinite;
        }



        .pp-core {
          position: absolute;
          inset: 1.5px;
          border-radius: 9999px;
          background: #0B0B0E;
          z-index: 2;
          display: grid;
          place-items: center;
        }

        .pp-flower {
          width: 46px;
          height: 46px;
          animation: pp-breathe 4s ease-in-out infinite;
          transform-origin: center;
        }

        /* --- conteúdo --- */
        .pp-content {
          flex: 1 1 auto;
          min-width: 0;
          text-align: left;
        }

        .pp-label {
          margin: 0 0 11px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.88);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pp-track {
          height: 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .pp-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #15803D 0%, #22C55E 55%, #4ADE80 100%);
          transition: width 500ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .pp-fill::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          transform: translateX(-100%);
          animation: pp-shimmer 2s ease-in-out infinite;
        }

        @keyframes pp-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pp-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.06) rotate(8deg); }
        }
        @keyframes pp-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pill-border {
          to { --pill-angle: 360deg; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-ring, .pp-flower,
          .pp-fill::after, .pp-root::before {
            animation: none;
          }
        }

        @media (max-width: 480px) {
          .pp-root { min-width: 0; width: 100%; padding-right: 20px; gap: 12px; }
          .pp-icon { width: 48px; height: 48px; }
          .pp-flower { width: 36px; height: 36px; }
          .pp-label { font-size: 13px; }
        }
      `}</style>

      <div
        className="pp-root"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="pp-icon">
          <div className="pp-ring" />
          <div className="pp-core">
            <FlowerIcon />
          </div>
        </div>

        <div className="pp-content">
          <p className="pp-label">{label}</p>
          <div className="pp-track">
            <div className="pp-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
