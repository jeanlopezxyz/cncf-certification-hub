# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CNCF Certification Resources Hub - A multilingual Astro-based static site for tracking CNCF certifications with React components following Atomic Design pattern.

## Core Commands

```bash
# Development
npm run dev              # Start dev server on localhost:4321
npm run dev:host         # Start dev server accessible on network
npm run build            # Build static site (includes i18n sync and optimization)
npm run preview          # Preview production build locally
npm run clean            # Clean build artifacts (dist/ and .astro/)

# Code Quality
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
npm run typecheck        # TypeScript type checking
npm run check            # Run all checks (lint, format, types)

# Quality Control
npm run check            # Run all checks (lint, format, types)
npm run validate         # Alias for typecheck + lint + format:check
npm run prepare-pr       # Full validation + build for PR preparation

# Testing
npm run test             # Placeholder (will be added soon)
npm run test:unit        # Run unit tests with Vitest
npm run test:watch       # Run tests in watch mode
npm run coverage         # Generate test coverage report
npm run test:ci-local    # Run local CI simulation
npm run test:lighthouse  # Run Lighthouse performance tests

# Development Utilities
npm run sync-i18n        # Sync internationalization pages across languages
```

## Architecture

### Tech Stack

- **Astro 5** - Static site generator with file-based routing
- **React 19** - Interactive components with TypeScript
- **Tailwind CSS 3** - Utility-first styling framework
- **TypeScript** - Strict mode enabled
- **Vitest** - Testing framework with 80% coverage thresholds

### Project Structure

```
src/
├── components/         # React components following Atomic Design
│   ├── achievements/   # Kubestronaut achievement tracking
│   ├── certifications/ # Certification cards, grids, filters
│   ├── hero/          # Landing page hero section
│   ├── sidebar/       # Navigation sidebar components
│   └── study-tips/    # Study guidance components
├── pages/             # Astro pages with i18n routing
│   ├── index.astro    # English homepage
│   ├── es/           # Spanish pages
│   └── pt/           # Portuguese pages
├── data/
│   └── certifications/ # Individual cert definitions (cka.ts, ckad.ts, etc.)
├── i18n/
│   └── locales/       # Translation files (en.ts, es.ts, pt.ts)
├── config/            # Centralized configuration
│   ├── app.config.ts  # Colors, dimensions, animations, external URLs
│   ├── sidebar.config.ts # Navigation structure and categories
│   └── styles.config.ts  # Tailwind class configurations
└── types/             # TypeScript definitions with type guards
```

### Key Patterns

1. **Internationalization**: Multi-language support (en/es/pt) with `prefixDefaultLocale: false`
2. **Atomic Design**: Components organized by complexity
3. **File-based Routing**: Dynamic routes using `[id].astro`
4. **Configuration-driven**: All settings centralized in `src/config/`
5. **Type Safety**: Comprehensive types in `src/types/index.ts`

### Important Files

- `src/data/certifications/index.ts` - All certification data exports
- `src/config/app.config.ts` - COLORS, DIMENSIONS, EXTERNAL_URLS constants
- `src/config/sidebar.config.ts` - CERTIFICATION_CATEGORIES navigation
- `src/i18n/locales/*.ts` - Translation dictionaries
- `astro.config.mjs` - Site URL, base path, i18n, build settings

### Component Conventions

- React function components with TypeScript interfaces
- Tailwind classes from config objects (COLORS, DIMENSIONS)
- Props interfaces defined inline or in component file
- Use configuration constants from `src/config/`

### Certification Data Structure

Each certification in `src/data/certifications/` exports:

- Basic info (id, name, level, duration, questions)
- Exam domains with weights and topics
- Study resources (official, GitHub, practice)
- Prerequisites and related certifications

Special groups:

- **Kubestronaut**: CKA, CKAD, CKS, KCNA, KCSA
- **Golden Kubestronaut**: All 15+ certifications

### Deployment Configuration

- **Site URL**: https://jeanlopezxyz.github.io
- **Base Path**: /cncf-certification-hub
- **Output**: Static HTML
- **GitHub Pages** ready with optimized build process

### Development Notes

- I18n pages auto-sync via `npm run sync-i18n`
- Build optimization with `scripts/optimize-build.cjs`
- Vite build configuration optimizes bundle splitting (React vendor chunks)
- Asset optimization with custom file naming patterns
- 15+ CNCF certifications with exam domains and study resources

### Scripts and Automation

Key utility scripts in `/scripts`:
- `sync-i18n-pages.js` - Automatically syncs i18n page structure
- `optimize-build.cjs` - Post-build optimization and asset cleanup
- `test-ci-local.sh` - Local CI environment simulation
- `test-lighthouse-local.sh` - Local Lighthouse testing

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
