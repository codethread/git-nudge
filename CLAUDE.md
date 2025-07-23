# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

All npm-based tools MUST be run via `volta run ...` for consistent tooling versions:

### Development
- `volta run pnpm boot` - Initial setup (schema, types, fakes)
- `volta run pnpm dev` - Start Vite development server
- `volta run pnpm app` - Start Tauri development app

### Code Quality
- `volta run pnpm lint` - Run Biome linter with auto-fix
- `volta run pnpm format` - Format code with Prettier
- `volta run pnpm ts` - Run TypeScript compiler in watch mode

### Build & Deploy
- `volta run pnpm build` - Production build with git hash
- `volta run pnpm preview` - Preview production build

### Testing
- `volta run pnpm test:e2e` - Run Playwright E2E tests
- `volta run pnpm test:e2e:tui` - Run tests with list reporter
- `volta run pnpm test:e2e:failed` - Re-run only failed tests

### Code Generation
- `volta run pnpm types` - Generate all TypeScript types
- `volta run pnpm types:client` - Generate GraphQL client types
- `volta run pnpm types:lsp` - Generate LSP types
- `volta run pnpm schema` - Download GraphQL schema
- `volta run pnpm fakes` - Generate fake data

## Architecture

This is a **Tauri-based GitLab dashboard application** with the following stack:

### Frontend Stack
- **Runtime**: Tauri v2 (Rust backend + web frontend)
- **Framework**: React 18 with TypeScript
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS v4 with Radix UI components
- **State**: Zustand for client state, TanStack Query for server state
- **GraphQL**: Apollo Server with codegen for type safety

### Key Architecture Patterns

1. **File-based Routing**: Routes defined in `src/routes/` with TanStack Router
2. **GraphQL-First**: All API interactions through GraphQL with strict typing
3. **Component Architecture**: Radix UI + shadcn/ui component system
4. **Dual Fetcher System**: 
   - Production: Web fetcher for real GitLab API
   - Development: Fake fetcher with mock data for testing
5. **Tauri Integration**: Native desktop app with web UI

### Project Structure
- `src/routes/` - File-based routes (generated tree in `routeTree.gen.ts`)
- `src/components/` - Reusable UI components (Radix + custom)
- `src/hooks/` - Custom hooks (config, theme, fetchers, GraphQL)
- `src/lib/` - Utilities and core logic (fetchers, storage, utils)
- `src/page/` - Page-specific components and logic
- `src/graphql/` - GraphQL schema, generated types, and queries
- `src-tauri/` - Rust backend code for Tauri
- `scripts/` - Build and codegen scripts
- `e2e/` - Playwright end-to-end tests

### Configuration Management
- Environment-based config switching (fake vs real data)
- Netrc authentication for GitLab access
- Theme system with dark/light mode support

### Code Style Rules (from .cursor/rules/)
- Use kebab-case for file names
- Use camelCase for variables/functions, PascalCase for types/classes
- Avoid default exports unless required by framework
- Prefix generic type parameters with 'T' (e.g., `TItem`)
- Install libraries using package manager commands, not manual package.json edits

### Development Features
- Hot reload with Vite
- GraphQL schema introspection and codegen
- Fake data generation for offline development
- TypeScript strict mode with GraphQL LSP integration
- Biome for linting, Prettier for formatting