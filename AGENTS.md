# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Astro routes. Localized routes live under `src/pages/es` and `src/pages/pt` (e.g., `src/pages/pt/certifications/[id].astro`).
- `src/components/`: React components in TypeScript (`.tsx`). Use PascalCase filenames (e.g., `CertificationGrid.tsx`).
- `src/data/certifications/`: Typed certification data sources (`*.ts`).
- `src/config/`, `src/constants/`, `src/types/`, `src/utils/`: App config, shared constants, types, and helpers.
- `public/`: Static assets served as-is. `dist/`: Build output. `scripts/`: Dev/CI helpers. `terraform/`: Infra-related files.

## Build, Test, and Development Commands
- `npm run dev`: Start Astro dev server with hot reload.
- `npm run build`: Build site to `dist/` (runs i18n sync and post-build optimizations).
- `npm run preview`: Serve the production build locally.
- `npm run validate`: TypeScript, ESLint (simplified), and Prettier check.
- `npm run typecheck | lint | format | format:check | clean | sync-i18n`
- `./scripts/test-ci-local.sh [quality|build|security|links|docker|all]`: Simulate CI locally.
- `npm run test:lighthouse`: Run Lighthouse locally (requires `@lhci/cli`).

Example: `npm ci && npm run validate && npm run build && npm run preview`.

## Coding Style & Naming Conventions
- Formatting: Prettier (2 spaces, single quotes, width 100). Run `npm run format`.
- Linting: ESLint basic rules (prefer `const`, no `var`, no unused vars, `no-debugger`).
- TypeScript: strict config via `astro/tsconfigs/strict`; React JSX enabled.
- Naming: components in PascalCase; routes/files in `src/pages` reflect kebab-case URLs; constants in `src/constants`, types in `src/types`.

## Testing Guidelines
- No unit test framework yet. Use `npm run validate` and `./scripts/test-ci-local.sh quality build` before PRs.
- If adding tests, colocate near source and prefer TypeScript. Keep fast and deterministic.
- Use `npm run test:lighthouse` for performance/accessibility checks on key pages.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (e.g., `feat: ...`, `fix: ...`) as used in history.
- Before PR: `npm run prepare-pr` (runs validation + build) and ensure CI script passes (`./scripts/test-ci-local.sh all`).
- PRs: clear description, linked issue, screenshots/GIFs for UI changes, note i18n impacts (run `npm run sync-i18n`).
- Branch protection requires passing checks (quality, build, security, lighthouse, link-check).

## Security & Configuration Tips
- Node >= 18 required. Do not commit secrets; avoid hardcoded tokens/keys. Use local envs for tooling and run `./scripts/test-ci-local.sh security`.
