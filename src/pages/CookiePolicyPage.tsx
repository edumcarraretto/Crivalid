import { ContentSection, InstitutionalShell } from '@/components/institutional/InstitutionalShell'
import { LegalDocumentLayout } from '@/components/institutional/LegalDocumentLayout'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import { SITE } from '@/lib/site'

const SECTIONS = [
  { id: 'situacao', label: 'Situação atual' }, { id: 'definicao', label: 'O que são cookies' },
  { id: 'essenciais', label: 'Cookies essenciais' }, { id: 'analise', label: 'Análise e marketing' },
  { id: 'controle', label: 'Controle' }, { id: 'contato', label: 'Contato' },
]

export function CookiePolicyPage() {
  usePageMetadata('Política de Cookies', 'Saiba como cookies e tecnologias semelhantes são usados no site da MAKEPLOY.')
  return (
    <InstitutionalShell section="cookies" eyebrow="Transparência" title="Política de Cookies" description="Explicamos aqui o uso atual de cookies e como futuras escolhas de medição serão apresentadas a você." updated={SITE.lastLegalUpdate}>
      <LegalDocumentLayout sections={SECTIONS} accent="var(--color-brand-yellow)">
      <ContentSection id="situacao" title="1. Situação atual"><p>Este site não utiliza, neste momento, cookies publicitários nem cookies próprios de análise comportamental. Recursos básicos podem depender de armazenamento técnico temporário do navegador ou de registros essenciais da infraestrutura para segurança e funcionamento.</p></ContentSection>
      <ContentSection id="definicao" title="2. O que são cookies"><p>Cookies são pequenos arquivos armazenados no dispositivo. Eles podem preservar preferências, permitir funções essenciais, medir desempenho ou apoiar publicidade, dependendo de sua finalidade.</p></ContentSection>
      <ContentSection id="essenciais" title="3. Cookies essenciais"><p>Tecnologias estritamente necessárias podem ser usadas sem consentimento quando forem indispensáveis para entregar uma função solicitada, proteger o serviço ou manter a sessão. Elas não devem ser utilizadas para publicidade.</p></ContentSection>
      <ContentSection id="analise" title="4. Análise e marketing"><p>Se ferramentas opcionais de análise ou marketing forem adicionadas, esta política será atualizada e o site solicitará a sua escolha antes de ativá-las, quando exigido. Recusar tecnologias opcionais não deve impedir a navegação essencial.</p></ContentSection>
      <ContentSection id="controle" title="5. Controle pelo navegador"><p>Você pode consultar, bloquear ou apagar cookies nas configurações do navegador. O bloqueio de recursos essenciais poderá afetar partes do funcionamento do site.</p></ContentSection>
      <ContentSection id="contato" title="6. Contato"><p>Dúvidas sobre tecnologias de armazenamento podem ser enviadas para <a className="font-bold text-blue-600 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></ContentSection>
      </LegalDocumentLayout>
    </InstitutionalShell>
  )
}
