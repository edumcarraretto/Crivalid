import { useState, useEffect } from "react"

const cn = (...args: (string | undefined | null | false)[]) => args.filter(Boolean).join(" ");

interface Badge {
  id: string
  label: string
  color: string
  size: "sm" | "md" | "lg"
  rotation: number
  zIndex: number
  offsetX: number
  offsetY: number
}

const badges: Badge[] = [
  {
    id: "marketing",
    label: "Ideia",
    color: "from-amber-300 to-yellow-400",
    size: "lg",
    rotation: -6,
    zIndex: 1,
    offsetX: -80,
    offsetY: -85,
  },
  {
    id: "social-media",
    label: "Criação",
    color: "from-amber-400 to-yellow-500",
    size: "lg",
    rotation: 5,
    zIndex: 2,
    offsetX: 75,
    offsetY: -70,
  },
  {
    id: "email-marketing",
    label: "Lançamento",
    color: "from-pink-300 to-pink-400",
    size: "lg",
    rotation: -2,
    zIndex: 3,
    offsetX: -60,
    offsetY: -10,
  },
  {
    id: "conversions",
    label: "Escala",
    color: "from-blue-400 to-blue-500",
    size: "md",
    rotation: 2,
    zIndex: 4,
    offsetX: 85,
    offsetY: 0,
  },
]

const sizeClasses = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3.5 text-base",
  lg: "px-8 py-4 text-lg",
}

export function JourneyPreviewCard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)
  const [autoIndex, setAutoIndex] = useState(0)

  // Auto-cycle effect
  useEffect(() => {
    // Pause auto-rotation if user is interacting
    if (hoveredId !== null || clickedId !== null) return;

    const timer = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % badges.length)
    }, 2000) // Change highlight every 2 seconds

    return () => clearInterval(timer)
  }, [hoveredId, clickedId])

  const handleClick = (id: string) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center">
      {badges.map((badge, idx) => {
        const isHovered = hoveredId === badge.id || (hoveredId === null && clickedId === null && autoIndex === idx)
        const isClicked = clickedId === badge.id
        const isOtherHovered = 
          (hoveredId !== null && hoveredId !== badge.id) || 
          (hoveredId === null && clickedId === null && autoIndex !== idx)

        return (
          <div
            key={badge.id}
            className={cn(
              "absolute cursor-pointer select-none rounded-full font-bold transition-all duration-500 ease-out",
              "bg-gradient-to-b shadow-lg",
              badge.color,
              sizeClasses[badge.size],
              "hover:shadow-2xl",
            )}
            style={{
              transform: `
                translate(${badge.offsetX}px, ${badge.offsetY}px) 
                rotate(${isHovered ? 0 : badge.rotation}deg)
                scale(${isClicked ? 1.15 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1})
                translateY(${isHovered ? -8 : 0}px)
              `,
              zIndex: isHovered || isClicked ? 100 : badge.zIndex,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                : isClicked
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(badge.id)}
          >
            <span
              className={cn(
                "relative block transition-transform duration-300",
                "text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]",
              )}
              style={{
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {badge.label}
            </span>
            {/* Inner highlight effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
