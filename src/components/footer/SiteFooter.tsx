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
    <footer
      id="site-footer"
      aria-label="Rodapé do site"
      className="relative w-full bg-black overflow-hidden"
    >
      {/* ── Top section (rule + nav) ── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
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
        className="relative flex items-center justify-center py-6 sm:py-8 md:py-10"
      >
        <span
          aria-hidden="true"
          className="
            relative select-none pointer-events-none whitespace-nowrap
            text-[7rem] sm:text-[11rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem]
            font-black tracking-[-0.05em] leading-[0.80]
            text-[#0e0e0e]
          "
        >
          Crivalid
        </span>
      </motion.div>

      {/* ── Bottom section (rule + legal) ── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="w-full h-px bg-white/[0.08]" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            flex flex-col items-center gap-3
            sm:flex-row sm:justify-between
            py-6 sm:py-8
          "
        >
          <span className="text-xs text-white/30 tracking-wide">
            ©2026 Crivalid. All rights reserved.
          </span>
          <span className="text-xs text-white/30 tracking-wide">
            Crafted by Crivalid
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
