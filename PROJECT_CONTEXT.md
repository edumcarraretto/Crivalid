# PROJECT_CONTEXT.md — MAKEPLOY

## Diretriz central (obrigatória para qualquer IA que trabalhar neste projeto)

Este projeto deve ser tratado com o mesmo padrão de qualidade de uma grande empresa de tecnologia (referência: Stripe, Linear, Vercel, Google, Microsoft). Não são aceitos código ou design de padrão amador, genérico ou de baixa qualidade, sob nenhuma circunstância. Qualidade não é negociável.

## Organização de código (obrigatório)

- Estrutura de pastas clara e escalável (separação por componentes, páginas, hooks, utils, tipos, etc.)
- Cada arquivo deve ter uma responsabilidade única e bem definida — proibido "arquivos gigantes" fazendo várias coisas
- Nomenclatura consistente e descritiva em todo o projeto (arquivos, componentes, variáveis, funções)
- Nenhum código morto, comentado sem uso, ou duplicado deve permanecer no projeto
- Toda nova funcionalidade deve seguir o mesmo padrão de organização já estabelecido no projeto

## Segurança (obrigatório, sem exceção)

- Nunca expor chaves de API, senhas, tokens ou dados sensíveis diretamente no código — sempre usar variáveis de ambiente (.env)
- Validar e sanitizar toda entrada de dados do usuário (formulários, inputs) contra ataques comuns (XSS, injeção, etc.)
- Sempre verificar vulnerabilidades de dependências (`npm audit`) antes de considerar uma entrega finalizada
- Seguir boas práticas de autenticação e autorização quando implementadas (nunca lógica de segurança feita "no improviso")
- Nenhuma dependência ou biblioteca desatualizada, abandonada, ou com vulnerabilidade conhecida deve ser utilizada

## Atualização e versionamento (obrigatório)

- Sempre utilizar as versões estáveis mais recentes das linguagens, frameworks e bibliotecas (evitar versões antigas, depreciadas ou beta/experimentais sem justificativa)
- Antes de instalar qualquer nova dependência, verificar se ela está ativamente mantida e atualizada
- Ao identificar uma dependência desatualizada no projeto, sinalizar e sugerir atualização

## Design

- Design profissional, moderno e sério — nunca amador, infantil ou genérico
- Nunca usar clichês visuais de "template pronto" (efeitos exagerados, cores excessivas, ilustrações fofas/infantis)
- Toda interface deve ser responsiva (mobile, tablet, desktop) por padrão — não é opcional
- Acessibilidade obrigatória: contraste adequado, navegação por teclado, HTML semântico correto

## Performance (obrigatório)

- Priorizar baixa latência e carregamento rápido em toda a aplicação
- Proibido: imagens não otimizadas, animações pesadas/excessivas, bibliotecas desnecessárias, código que gere lentidão perceptível
- Sempre validar com `npm run build` antes de considerar qualquer tarefa concluída

## Qualidade de código (obrigatório, sem exceção)

- Código deve ser escrito no nível de um engenheiro sênior, não de um iniciante
- Proibido: código duplicado, funções gigantes fazendo várias coisas ao mesmo tempo, nomes de variáveis genéricos (tipo "data1", "temp", "x"), gambiarra ou solução improvisada
- TypeScript estrito, sem uso de "any" a menos que estritamente necessário e justificado
- Componentes devem ser reutilizáveis, bem organizados, e seguir separação clara de responsabilidades

## Dados e conteúdo

- Proibido usar informação vaga, "enrolação"
- Toda alegação sobre o produto deve ser clara, direta e sustentável

## Regra final

Se em algum momento uma IA identificar que está prestes a entregar uma solução abaixo desse padrão (seja design, código, segurança ou organização), ela deve refazer antes de apresentar o resultado.

Este é um documento vivo, que será atualizado conforme mais decisões de design e arquitetura forem tomadas.

## Dados Estruturados (Schema Markup) — Obrigatório

- Implementar Schema.org via JSON-LD (formato recomendado pelo Google, nunca Microdata ou RDFa) em todas as páginas relevantes
- Schema.org "Organization" na Home, com nome, logo, e redes sociais da empresa (propriedade "sameAs")
- Schema.org "SoftwareApplication" ou "Product" nas páginas descrevendo a MAKEPLOY como produto/SaaS
- Schema.org "FAQPage" na seção de perguntas frequentes, estruturando pergunta e resposta corretamente
- Schema.org "BreadcrumbList" se houver navegação hierárquica entre páginas
- Todo schema deve corresponder exatamente ao conteúdo visível na página — nunca marcar dados que não aparecem visualmente (isso é penalizado)
- Validar todo schema implementado usando o Google Rich Results Test antes de finalizar qualquer página

## Otimização para Buscadores de IA (AEO/GEO) — Obrigatório

O site deve ser otimizado não apenas para o Google tradicional, mas para ser corretamente entendido e citado por sistemas de IA (ChatGPT, Perplexity, Gemini, Google AI Overviews). Isso é hoje tão importante quanto o SEO tradicional.

- Conteúdo deve responder perguntas de forma direta e clara logo no início dos parágrafos (IAs extraem respostas mais facilmente de texto direto do que de texto "enrolado")
- Usar linguagem factual, específica e consistente — nunca ambígua
- Toda afirmação sobre o produto deve ser consistente entre o texto visível e o schema markup (inconsistência reduz confiança da IA na fonte)
- Estruturar conteúdo em blocos claros e "citáveis" (parágrafos curtos, respostas objetivas, definições claras quando aplicável)
- Priorizar clareza de entidade: deixar claro em todo o site quem é a empresa (MAKEPLOY), o que ela faz, e para quem, de forma consistente em todas as páginas

## Segurança como Fator de SEO — Obrigatório

- Todo o site deve operar exclusivamente sob HTTPS quando publicado
- Implementar headers de segurança HTTP: Content-Security-Policy (CSP), X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security (HSTS)
- Nunca expor conteúdo misto (recursos HTTP dentro de página HTTPS)
- Formulários (login, cadastro) devem ter proteção contra XSS e injeção de dados desde a implementação inicial

## Auditoria Contínua — Recomendado

- Validar periodicamente com Google Rich Results Test (schema) e Google Search Console (indexação, Core Web Vitals) assim que o site estiver publicado
- Revisar meta tags, títulos e schema a cada nova página ou seção adicionada, garantindo que nada fique duplicado ou desatualizado
- Sempre que o conteúdo de uma página mudar de forma relevante, revisar se o schema markup correspondente também precisa ser atualizado

Este documento reflete práticas de SEO e AEO/GEO atualizadas para 2026, incluindo os requisitos técnicos para visibilidade tanto em buscadores tradicionais quanto em sistemas de resposta por IA.

## Tipografia da marca

- A família tipográfica de marca é `Makeploy Rounded`, baseada na M PLUS Rounded 1c.
- Usar peso 500 em textos longos, descrições e conteúdo auxiliar.
- Usar peso 700 em títulos, botões, destaques, navegação e demais elementos de interface que precisam de ênfase.
- Reservar o peso 800 para títulos de alto impacto e elementos de marca.
- A M PLUS Rounded 1c não oferece peso 600 nativo. Não declarar nem simular esse peso; usar 700 para preservar consistência entre design e arquivo real.
- Não usar peso 400 na identidade visual da MAKEPLOY.
- Manter `font-synthesis: none` para impedir que o navegador fabrique pesos inexistentes.
- Os arquivos oficiais da família ficam em `public/fonts/`, e suas declarações `@font-face`, tokens e classes utilitárias ficam em `src/styles/typography.css`, importado por `src/index.css`.
- `Makeploy Rounded` é a tipografia global de toda a interface. A configuração em `src/styles/typography.css` também redefine as famílias `sans`, `serif` e `mono` do Tailwind para impedir o retorno acidental de fontes antigas.
- A classe utilitária `.makeploy-type` permanece disponível para contextos isolados, previews incorporados ou conteúdo que precise reafirmar explicitamente a identidade tipográfica.
- Sempre que família, pesos, tokens ou regras de uso mudarem, atualizar em conjunto `src/styles/typography.css`, os arquivos em `public/fonts/` e esta documentação.
- Antes de adicionar ou substituir um arquivo de fonte, conferir nome interno, peso real, licença e impacto no tamanho transferido. Não manter arquivos ou licenças que pertençam a outra família.

## Paleta de cores — fase experimental

- A paleta em avaliação fica centralizada em `src/styles/palette.css`; componentes não devem criar uma identidade paralela com novos valores fixos.
- Textos claros usam grafite `#171717`, carvão `#3F3F46`, mineral `#52525B` e ardósia `#71717A`, conforme a hierarquia de importância.
- Ações e links usam azul profundo `#0067D9`, hover `#0057B8` e active `#004A9E`. O azul luminoso `#168CFF` é reservado principalmente à expressão visual da marca.
- O espectro oficial usa coral `#FF2D55`, laranja `#FF7A00`, amarelo `#FACC15`, verde `#22C55E`, azul `#168CFF` e magenta `#D92DBB`.
- Cores oficiais de empresas integradas podem permanecer nos respectivos logotipos, mas não devem orientar a interface da MAKEPLOY.
- Esta paleta ainda está em avaliação visual e deve continuar facilmente reversível por meio dos tokens globais.
- A documentação operacional completa fica em `docs/TYPOGRAPHY.md` e deve permanecer sincronizada com esta seção.
