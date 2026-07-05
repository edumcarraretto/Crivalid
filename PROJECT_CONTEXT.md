# PROJECT_CONTEXT.md — Crivalid

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
