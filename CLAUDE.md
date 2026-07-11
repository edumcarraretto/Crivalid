# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Crivalid — a marketing/landing site (React 19 + Vite + TypeScript + Tailwind v4) built as a single-page scroll experience (`src/App.tsx` composes ordered `<section>` components: Hero, LogoCloud, ProblemSection, ToolsSection, GlobeSection). Content is currently Portuguese (pt-BR).

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`, project-referenced via `tsconfig.json` → `tsconfig.app.json`/`tsconfig.node.json`) then production build. Always run this before considering a task complete — it is the only type-checking step (no separate `typecheck` script).
- `npm run lint` — Oxlint (`.oxlintrc.json`; plugins: react, typescript, oxc). No type-aware rules enabled.
- `npm run preview` — serve the production build locally
- No test runner is configured in this repo.

## Architecture

- **Path alias**: `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import via `@/...`, not relative `../../` chains.
- **Section-per-folder convention**: each landing-page section lives in `src/components/<section>/`, e.g. `hero/`, `globe/`, `logos/`, `problem/`, `tools/`. A section folder typically contains the top-level `<X>Section.tsx` (or bare component for Hero), plus co-located subcomponents and a `<name>Data.ts` file holding static content/config arrays (see `components/globe/globeData.ts`, `components/tools/toolsData.ts`). When adding a new section, follow this same folder shape and register it in `App.tsx`.
- **Data/presentation split**: content data (tool lists, globe markers/arcs, card mockups) is defined as typed arrays/objects in a sibling `*Data.ts` file rather than inlined in JSX, so it can later be swapped for an API response with no template changes (see comment in `GlassDashboard.tsx`: "arrays para futura integração com API").
- **File section-comment convention**: larger component files are internally divided with banner comments like `// ─── Types ───...`, `// ─── Constants ───...`, `// ─── <ComponentName> ───...` to separate types, constants, subcomponents, and the exported component. Follow this pattern in new files of similar size rather than leaving them unstructured.
- **Styling**: Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 uses CSS-based config in `src/index.css`). Utility classes are composed directly in JSX with template-literal conditionals for dark/light theme variants (see `isDark ? '...' : '...'` throughout `Hero.tsx`) rather than a `cn()`/`clsx` helper.
- **Animation**: `motion/react` (Motion, formerly Framer Motion) for transitions, `AnimatePresence`, and scroll-triggered (`whileInView`) reveals.
- **Icons**: `lucide-react` is the default icon set; `react-icons` and `@icons-pack/react-simple-icons` are available for brand/logo icons (e.g. `LogoCloud`).
- **3D globe**: `InteractiveGlobe.tsx` wraps the `cobe` WebGL globe library behind a typed props API (`Marker`, `Arc`); section-specific marker/arc data is supplied externally (`globeData.ts`), keeping the globe component reusable.
- Other notable deps present but not yet wired into visible components: `react-router-dom`, `react-hook-form` + `@hookform/resolvers` + `zod`, `recharts`, `sonner` — expect routing, forms, charts, and toast notifications to be added following each library's standard React patterns.

## Project standards (from PROJECT_CONTEXT.md)

This project is held to a high bar — treat it like production code at a top-tier tech company, not a template/demo:

- One responsibility per file; no giant files doing multiple things; no dead/duplicated/commented-out code.
- Strict TypeScript — avoid `any` unless strictly necessary and justified.
- No inline secrets/API keys — use environment variables.
- Sanitize/validate all user input (forms) against XSS/injection.
- Design must be original and professional — avoid generic "template" clichés, excessive effects/colors, or childish illustrations. Fully responsive (mobile/tablet/desktop) and accessible (contrast, keyboard nav, semantic HTML) by default.
- Run `npm run build` before considering any task finished; check `npm audit` before finalizing dependency changes; avoid outdated/abandoned/vulnerable packages.
- SEO/AEO: pages should carry JSON-LD Schema.org markup (Organization on the home page, SoftwareApplication/Product for the product, FAQPage for FAQs, BreadcrumbList for hierarchical nav) that matches on-page content exactly. Write direct, factual, front-loaded copy (avoid vague/"filler" language) since it's optimized for both traditional search and AI answer engines.
- Once the site is deployed: HTTPS only, with CSP/X-Content-Type-Options/X-Frame-Options/HSTS headers and no mixed content.
