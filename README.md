<p align="center">
  <img src="public/text-logo-512.webp" alt="MAKEPLOY" width="280" />
</p>

<h1 align="center">MAKEPLOY</h1>

<p align="center">Criação, publicação e operação de produtos digitais em um só lugar.</p>

<p align="center">
  <a href="https://makeploy.vercel.app">Explorar o site</a> ·
  <a href="#executar-localmente">Executar localmente</a> ·
  <a href="#qualidade-e-testes">Qualidade e testes</a> ·
  <a href="#contribuir">Contribuir</a>
</p>

![Apresentação da MAKEPLOY](public/og-makeploy.png)

## Sobre o projeto

A MAKEPLOY está em desenvolvimento, com a proposta de reunir ferramentas de criação, inteligência artificial, publicação e operação de produtos digitais.

Este repositório contém o **frontend do site de apresentação e pré-lançamento**: uma aplicação React com seções interativas, demonstrações de interface, blog e páginas institucionais. A plataforma operacional completa ainda não está implementada neste repositório.

## O que você encontra aqui

- **Página principal:** apresentação da proposta, ferramentas e fluxos planejados para a plataforma.
- **Interfaces interativas:** prévias de editor, criação no-code, recursos de IA, carrosséis e globo animado.
- **Blog:** listagem e páginas de artigos com conteúdo mantido no código.
- **Páginas institucionais:** sobre, contato, privacidade, termos de uso e cookies.
- **Acessibilidade:** navegação por teclado, gerenciamento de foco em modais, link para pular ao conteúdo e suporte à redução de movimento em componentes.
- **Carregamento progressivo:** divisão de código por rotas e seções, com estados de carregamento e tratamento de erros.

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Interface | React, TypeScript e React Router |
| Estilos e animações | Tailwind CSS e Motion |
| Desenvolvimento e build | Vite |
| Testes | Vitest, Testing Library, jsdom e axe-core |
| Análise estática | TypeScript em modo estrito e Oxlint |
| Publicação | Configuração para Vercel |

## Executar localmente

Use **Node.js 24** e npm. Na página do repositório, copie o endereço em **Code → HTTPS** e clone o projeto. Dentro da pasta clonada:

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite no terminal. O frontend atual não exige chaves de API ou configuração de banco de dados.

Para gerar e visualizar o build de produção:

```bash
npm run build
npm run preview
```

## Qualidade e testes

```bash
npm test
npm run lint
npm run build
```

A suíte inclui verificações de navegação, componentes interativos, modais e acessibilidade automatizada. As verificações com axe-core não incluem contraste de cores no jsdom e não substituem uma revisão manual de acessibilidade no navegador.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o servidor de desenvolvimento |
| `npm test` | Executar a suíte de testes |
| `npm run test:watch` | Executar testes durante o desenvolvimento |
| `npm run lint` | Verificar o código com Oxlint |
| `npm run build` | Verificar TypeScript e gerar o build |
| `npm run preview` | Visualizar o build localmente |
| `npm audit` | Consultar vulnerabilidades conhecidas nas dependências |

## Estrutura

```text
src/
├── components/   # Seções, interfaces e componentes reutilizáveis
├── hooks/        # Foco de modais e metadados de páginas
├── lib/          # Identidade do site e eventos de acesso antecipado
├── pages/        # Blog e páginas institucionais
├── styles/       # Paleta e tipografia
├── test/         # Configuração e testes de integração
└── vendor/       # Código de terceiros utilizado pelo globo
public/           # Imagens, fontes e arquivos públicos
docs/             # Documentação de apoio
```

Os testes de componentes também ficam próximos dos respectivos arquivos de implementação.

## Próximos passos

- Conectar o acesso antecipado a um serviço de cadastro e confirmar sucesso apenas após persistência.
- Substituir métricas demonstrativas por informações verificáveis ou identificá-las claramente na interface.
- Implementar o primeiro fluxo operacional completo da plataforma.
- Automatizar testes, lint e build com integração contínua.
- Publicar versões acompanhadas de notas de lançamento.

## Contribuir

Sugestões e correções são bem-vindas. Abra uma issue com o contexto e, para bugs, os passos de reprodução, o resultado esperado e o comportamento observado.

Antes de enviar um pull request, execute os testes, o lint e o build. Descreva a mudança e inclua imagens quando houver alterações visuais. Para mudanças maiores, abra uma discussão em uma issue primeiro.

## Licença

Distribuído sob a [Apache License 2.0](LICENSE).
