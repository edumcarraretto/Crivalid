import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { InstitutionalShell } from '@/components/institutional/InstitutionalShell'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import { createMailto, SITE } from '@/lib/site'

const SUBJECT_OPTIONS = ['Suporte', 'Acesso antecipado', 'Privacidade', 'Parceria', 'Imprensa', 'Outro assunto'] as const

export function ContactPage() {
  usePageMetadata('Contato e suporte', 'Entre em contato com a MAKEPLOY para suporte, privacidade, parcerias ou acesso antecipado.')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [site, setSite] = useState('')
  const [subject, setSubject] = useState('Suporte')
  const [message, setMessage] = useState('')
  const mailto = createMailto(
    `[${subject}] Contato pelo site`,
    `${message}\n\nNome: ${name}\nE-mail: ${email}\nSite: ${site || '—'}\nCategoria: ${subject}`,
  )

  return (
    <InstitutionalShell section="contact" eyebrow="Contato e suporte" title="Como podemos ajudar?" description="Fale sobre acesso antecipado, suporte, privacidade, parcerias ou qualquer dúvida relacionada à MAKEPLOY.">
      {/* Formulário — estilo Vercel */}
      <form
        className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8"
        onSubmit={(event) => { event.preventDefault(); window.location.href = mailto }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">Fale com a MAKEPLOY.</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">Preencha seus dados, escolha um assunto e conte como podemos ajudar.</p>

        {/* Nome e E-mail lado a lado */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-bold text-neutral-900">Nome completo</label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-bold text-neutral-900">E-mail</label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>
        </div>

        {/* Site */}
        <div className="mt-5">
          <label htmlFor="contact-site" className="text-sm font-bold text-neutral-900">Site ou empresa <span className="font-normal text-neutral-400">(opcional)</span></label>
          <input
            id="contact-site"
            type="url"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="https://www.exemplo.com"
            className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
          />
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-neutral-900">Assunto</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUBJECT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSubject(opt)}
                aria-pressed={subject === opt}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                  subject === opt
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <label htmlFor="contact-message" className="text-sm font-bold text-neutral-900">Como podemos te ajudar?</label>
          <textarea
            id="contact-message"
            required
            minLength={10}
            maxLength={1200}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Conte-nos sobre sua necessidade, caso de uso ou dúvida e como podemos ajudar."
            className="mt-3 w-full resize-y border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm leading-relaxed text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
          />
          <p className="mt-1.5 text-right text-xs tabular-nums text-neutral-400">{message.length} / 1.200</p>
        </div>

        <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-bold text-neutral-900">Política de Privacidade</p>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
            Nada será enviado automaticamente. A mensagem será preparada e aberta no seu aplicativo de e-mail para que você revise antes de enviar.
          </p>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
        >
          Fale com a MAKEPLOY <ArrowRight size={16} />
        </button>
      </form>

      {/* Card Canal Oficial — estilo "Construa com a gente" */}
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white sm:p-10">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-1" style={{ background: 'var(--gradient-brand)' }} />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Canal oficial</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Prefere enviar direto? Use nosso e-mail.</h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-400">Não envie senhas, chaves de API, documentos pessoais ou outras informações sensíveis por e-mail.</p>
        <a href={`mailto:${SITE.email}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-blue-50">
          <Mail size={16} /> {SITE.email}
        </a>
      </div>
    </InstitutionalShell>
  )
}
