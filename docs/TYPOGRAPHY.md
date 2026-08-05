# Tipografia da MAKEPLOY

Este documento é a referência de implementação da identidade tipográfica do projeto.

## Família oficial

O nome usado pela aplicação é **Makeploy Rounded**, baseado na família M PLUS Rounded 1c. Ela é a tipografia global da MAKEPLOY, hospedada pelo próprio projeto e sem dependência de CDN ou de serviços externos.

Arquivos locais:

- `public/fonts/mplus-rounded-500.ttf` — textos longos, descrições e conteúdo auxiliar;
- `public/fonts/mplus-rounded-700.ttf` — títulos, botões, navegação e interface;
- `public/fonts/mplus-rounded-800.ttf` — títulos de alto impacto e elementos de marca.

## Implementação

As declarações `@font-face`, os tokens CSS, a integração com o tema do Tailwind e as classes utilitárias ficam em `src/styles/typography.css`. Esse arquivo é carregado por `src/index.css`. A família é definida no elemento `html`, herdada por toda a interface e aplicada explicitamente aos controles de formulário.

Para aplicar somente a família:

```tsx
<section className="makeploy-type">...</section>
```

Classes semânticas disponíveis:

- `.makeploy-type-body` — peso 500;
- `.makeploy-type-interface` — peso 700;
- `.makeploy-type-display` — peso 800.

Essas classes de peso devem ser usadas junto de `.makeploy-type` quando o elemento não herdar a família de um ancestral.

## Regras

- Não usar peso 400.
- Não usar peso 600: a família não possui esse arquivo no projeto.
- Não permitir síntese de pesos pelo navegador.
- Não substituir os arquivos sem conferir nome interno, peso real e licença.
- A fonte é global. Não introduzir outra família em páginas, componentes, estilos embutidos ou classes utilitárias.

## Lista de atualização

Ao mudar a tipografia, revisar em conjunto:

1. arquivos em `public/fonts/`;
2. `src/styles/typography.css`;
3. este documento;
4. a seção “Tipografia da marca” em `PROJECT_CONTEXT.md`.

Depois, executar `npm run lint` e `npm run build`.
