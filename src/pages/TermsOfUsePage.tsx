import { BulletList, ContentSection, InstitutionalShell } from '@/components/institutional/InstitutionalShell'
import { LegalDocumentLayout } from '@/components/institutional/LegalDocumentLayout'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import { SITE } from '@/lib/site'

const SECTIONS = [
  { id: 'aceitacao', label: 'Aceitação' }, { id: 'fase-atual', label: 'Fase atual' },
  { id: 'uso-permitido', label: 'Uso permitido' }, { id: 'propriedade', label: 'Propriedade intelectual' },
  { id: 'conteudo', label: 'Conteúdo enviado' }, { id: 'disponibilidade', label: 'Disponibilidade' },
  { id: 'alteracoes', label: 'Alterações e contato' },
]

export function TermsOfUsePage() {
  usePageMetadata('Termos de Uso', 'Conheça as condições de acesso e uso do site e dos recursos da MAKEPLOY.')
  return (
    <InstitutionalShell section="terms" eyebrow="Uso responsável" title="Termos de Uso" description="Estas condições regulam o uso do site institucional, do conteúdo e dos recursos de acesso antecipado da MAKEPLOY." updated={SITE.lastLegalUpdate}>
      <LegalDocumentLayout sections={SECTIONS} accent="var(--color-brand-green)">
      <ContentSection id="aceitacao" title="1. Aceitação"><p>Ao acessar este site, você concorda com estes termos e com a legislação aplicável. Caso não concorde, interrompa o uso do site.</p></ContentSection>
      <ContentSection id="fase-atual" title="2. Fase atual do produto"><p>A MAKEPLOY encontra-se em desenvolvimento e acesso antecipado. Imagens, protótipos, integrações, funcionalidades, métricas demonstrativas e previsões podem mudar antes do lançamento comercial. Um cadastro de interesse não garante acesso imediato nem cria obrigação de contratação.</p></ContentSection>
      <ContentSection id="uso-permitido" title="3. Uso permitido">
        <BulletList items={["Navegar pelo conteúdo e entrar em contato de forma legítima.", "Não tentar comprometer a segurança, disponibilidade ou integridade do site.", "Não utilizar automações abusivas, identidade falsa, conteúdo ilícito ou violação de direitos de terceiros."]} />
      </ContentSection>
      <ContentSection id="propriedade" title="4. Propriedade intelectual"><p>Marca, identidade visual, textos, software, interfaces e demais materiais da MAKEPLOY são protegidos pela legislação aplicável. Estes termos não transferem direitos de propriedade intelectual ao visitante.</p></ContentSection>
      <ContentSection id="conteudo" title="5. Conteúdo enviado"><p>Você continua responsável e titular do conteúdo que enviar. Ao compartilhar uma ideia, mensagem ou feedback, autoriza seu uso para atendimento e melhoria do produto, sem transferência de propriedade sobre sua ideia ou material.</p></ContentSection>
      <ContentSection id="disponibilidade" title="6. Disponibilidade e responsabilidade"><p>Buscamos manter informações corretas e o site disponível, mas não garantimos operação ininterrupta ou ausência absoluta de erros. Na extensão permitida por lei, a MAKEPLOY não responde por decisões tomadas exclusivamente com base em conteúdo informativo ou por serviços externos.</p></ContentSection>
      <ContentSection id="alteracoes" title="7. Alterações e contato"><p>Os termos podem mudar para refletir a evolução do produto ou requisitos legais. Dúvidas podem ser enviadas para <a className="font-bold text-blue-600 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></ContentSection>
      </LegalDocumentLayout>
    </InstitutionalShell>
  )
}
