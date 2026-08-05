import { motion } from 'motion/react'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Ferramentas', href: '#ferramentas' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Global', href: '#global' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="bg-white pt-0 pb-14 sm:pb-20">
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <div
          id="site-footer"
          aria-label="Rodapé do site"
          className="relative bg-black rounded-b-[32px] sm:rounded-b-[40px] rounded-t-none overflow-hidden"
        >
          {/* ── Concave notch transition ── */}
      <div
        aria-hidden="true"
        className="
          relative z-10 pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          h-[28px] w-[86vw]
          sm:h-[34px] sm:w-[74vw]
          md:h-[40px] md:w-[64vw]
          rounded-b-[20px] sm:rounded-b-[22px]
          bg-white
        "
      />

      {/* ── Top section (rule + nav) ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 pt-[36px] sm:pt-[42px] md:pt-[48px]">
        <div className="mx-auto w-full max-w-md h-px bg-white/[0.12]" />

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          aria-label="Links do footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8 md:gap-x-10 pt-10 pb-8 sm:pt-12 sm:pb-10"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="
                text-[13px] sm:text-sm font-medium text-white/45
                transition-colors duration-200
                hover:text-white/80
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40
              "
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* ── Central brand watermark (full width) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="relative z-10 w-full flex items-center justify-center text-center py-6 sm:py-8 md:py-10"
      >
          <span
            aria-hidden="true"
            className="
              relative select-none pointer-events-none whitespace-nowrap
              text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] xl:text-[17rem]
              font-extrabold tracking-[-0.05em] leading-[0.80]
              text-[#0e0e0e]
            "
          >
          MAKEPLOY
        </span>
      </motion.div>

      {/* ── Bottom section (rule + legal) ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="w-full h-px bg-white/[0.08]" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            flex flex-col items-center gap-3 text-center
            sm:flex-row sm:items-center sm:justify-between sm:text-left
            py-6 sm:py-8
          "
        >
          <span className="text-xs text-white/30 tracking-wide">
            ©2026 MAKEPLOY.
          </span>
          <span className="text-xs text-white/30 tracking-wide">
            Todos os direitos reservados.
          </span>
          <span className="text-xs text-white/30 tracking-wide">
            Criado por MAKEPLOY
          </span>
        </motion.div>
      </div>
        </div>
      </div>
    </footer>
  )
}
