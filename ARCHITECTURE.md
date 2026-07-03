# Architecture

DevOps Monitor follows a **feature-based architecture** optimized for long-term maintainability and API-ready mock data.

## Stack

| Layer | Technology |
| ----- | ---------- |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Routing | React Router 7 (lazy routes) |
| Server state | TanStack Query v5 |
| Client state | Zustand (theme, layout, auth) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Tables | TanStack Table (planned integration) |
| Testing | Vitest, React Testing Library |
| CI/CD | GitHub Actions, Vercel |

## Directory Structure

```
src/
├── app/           # Bootstrap, router, layout shell, providers
├── features/      # Domain modules (auth, dashboard, projects, …)
├── shared/        # Design system, hooks, types, mocks, utils
├── styles/        # Global CSS and design tokens
└── test/          # Test setup
```

Each feature owns its components, hooks, services, types, and tests. Cross-feature imports go through `shared/` or public feature exports.

## Data Flow

```
UI Component → Query Hook → Service → Mock API (future: HTTP)
                    ↓
              TanStack Query cache
```

Mock services in `shared/services/mockServices.ts` mirror the interface planned for a real backend. Swapping to HTTP requires only service-layer changes.

## State Management

| Concern | Solution |
| ------- | -------- |
| Async data | TanStack Query |
| Theme, sidebar | Zustand + localStorage |
| Auth session | Zustand + localStorage |
| Form state | React Hook Form |

## Routing

- Public: `/login`
- Protected (auth required): all app routes under `AppLayout`
- Lazy-loaded page components with route-level code splitting
- Manual chunks: vendor, query, charts, table

## Design System

Located in `src/shared/components/ui/`. All feature code consumes primitives — no hardcoded colors in features.

Semantic tokens defined in `src/styles/globals.css` support light and dark modes.

## Testing Strategy

- Unit tests for design system and pure utilities
- Integration tests for critical user flows (planned)
- CI runs typecheck, lint, format, test, and build on every PR

## Deployment

Static SPA deployed to Vercel. `vercel.json` configures SPA fallback routing.

## Future Extensions

- Command palette (cmdk scaffolded in dependencies)
- Logs viewer with virtualization
- Metrics deep-dive pages
- Global search
- Real API integration (requires client approval)

See `.claude/doc/TECH_ARCHITECTURE.md` for full SSOT specifications.
