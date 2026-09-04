import { BulletList, ContentSection, InstitutionalShell } from '@/components/institutional/InstitutionalShell'
import { LegalDocumentLayout } from '@/components/institutional/LegalDocumentLayout'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import { SITE } from '@/lib/site'

const SECTIONS = [
  { id: 'responsavel', label: 'Quem é responsável' },
  { id: 'dados', label: 'Dados recebidos' },
  { id: 'uso', label: 'Como usamos' },
  { id: 'base-legal', label: 'Base legal' },
  { id: 'retencao', label: 'Retenção e segurança' },
  { id: 'direitos', label: 'Seus direitos' },
  { id: 'alteracoes', label: 'Alterações' },
]

export function PrivacyPolicyPage() {
  usePageMetadata('Política de Privacidade', 'Entenda como a MAKEPLOY trata dados pessoais e protege a sua privacidade.')
  return (
    <InstitutionalShell section="privacy" eyebrow="Privacidade" title="Política de Privacidade" description="Esta política explica, em linguagem direta, quais dados podemos tratar, para quais finalidades e quais são os seus direitos." updated={SITE.lastLegalUpdate}>
      <LegalDocumentLayout sections={SECTIONS} accent="var(--color-brand-blue)">
      <ContentSection id="responsavel" title="1. Quem é responsável pelos dados">
        <p>A MAKEPLOY é responsável pelo tratamento dos dados relacionados a este site e aos contatos sobre o acesso antecipado. Nesta fase, o canal oficial para assuntos de privacidade é <a className="font-bold text-blue-600 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </ContentSection>
      <ContentSection id="dados" title="2. Dados que podemos receber">
        <BulletList items={["E-mail e informações enviadas voluntariamente em contatos ou solicitações de acesso.", "Conteúdo de mensagens, sugestões e pedidos de suporte.", "Dados técnicos essenciais fornecidos pelo navegador e pela infraestrutura de hospedagem, como endereço IP, tipo de dispositivo, data e registros de segurança."]} />
        <p>Não solicitamos dados pessoais sensíveis por meio deste site.</p>
      </ContentSection>
      <ContentSection id="uso" title="3. Como usamos os dados">
        <BulletList items={["Responder mensagens e prestar suporte.", "Gerenciar manifestações de interesse no produto.", "Melhorar conteúdo, usabilidade, segurança e desenvolvimento da plataforma.", "Cumprir obrigações legais e prevenir abuso ou fraude."]} />
      </ContentSection>
      <ContentSection id="base-legal" title="4. Base legal e compartilhamento">
        <p>O tratamento ocorre conforme o consentimento fornecido, a execução de procedimentos solicitados por você, interesses legítimos relacionados à segurança e melhoria do serviço e obrigações legais aplicáveis.</p>
        <p>Dados podem ser processados por fornecedores estritamente necessários, como hospedagem e comunicação, sob deveres de segurança e confidencialidade. Não vendemos dados pessoais.</p>
      </ContentSection>
      <ContentSection id="retencao" title="5. Retenção e segurança">
        <p>Mantemos os dados somente pelo período necessário às finalidades informadas ou a exigências legais. Aplicamos medidas técnicas e organizacionais razoáveis, mas nenhum serviço conectado à internet oferece risco zero.</p>
      </ContentSection>
      <ContentSection id="direitos" title="6. Seus direitos">
        <p>Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção, portabilidade quando aplicável, informação sobre compartilhamento, eliminação ou anonimização de dados desnecessários e revogação de consentimento.</p>
        <p>Envie sua solicitação para <a className="font-bold text-blue-600 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>. Poderemos pedir informações mínimas para confirmar sua identidade.</p>
      </ContentSection>
      <ContentSection id="alteracoes" title="7. Alterações">
        <p>Esta política poderá ser atualizada à medida que a plataforma evoluir. A data no início da página indicará a versão vigente.</p>
      </ContentSection>
      </LegalDocumentLayout>
    </InstitutionalShell>
  )
}
