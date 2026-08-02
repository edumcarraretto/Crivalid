import type { ShowcaseProject } from './showcaseData'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ShowcaseCardProps {
  project: ShowcaseProject
  layout: 'horizontal' | 'vertical'
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ShowcaseCard({ project, layout }: ShowcaseCardProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={`
        showcase-card relative overflow-hidden bg-neutral-950 h-full
        ${isHorizontal 
          ? 'flex-none w-[75vw] sm:w-[45vw] md:w-[38vw] max-w-[700px]' 
          : 'flex-none w-fit'
        }
      `}
      style={{ borderRadius: '16px' }}
      aria-label={`Projeto ${project.title} — ${project.category}`}
    >
      <img
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        className={isHorizontal ? 'absolute inset-0 w-full h-full object-cover' : 'block h-full w-auto object-cover'}
        style={{
          objectPosition: project.objectPosition ?? 'top center',
        }}
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}
