# DevOps Monitor — Technical Architecture

Version: 1.0  
Status: Active

---

# Purpose

Technical source of truth for stack, boundaries, patterns, and engineering principles.

Precedence: `CONSTITUTION.md` > this document > implementation details.

---

# Architecture Principles

## Feature-Based Architecture

Organize by **domain feature** (deployments, pipelines, metrics, logs), not by technical type at the root level.

Each feature owns: components, hooks, services, types, utils, and tests — colocated where practical.

## Separation of Concerns

| Layer                      | Responsibility                                         |
| -------------------------- | ------------------------------------------------------ |
| **UI components**          | Presentation, composition, local UI state              |
| **Features**               | Domain UI flows and feature-specific logic             |
| **Hooks**                  | Reusable stateful logic                                |
| **Services / API**         | HTTP calls, mock adapters, DTO mapping                 |
| **Stores (Zustand)**       | Global UI state only (theme, sidebar, filters UI)      |
| **Query (TanStack Query)** | Server/async data, cache, mutations                    |
| **Types / DTOs**           | Domain and API contracts                               |
| **Utils**                  | Pure helpers (formatters, status mappers)              |

## Global State Only When Necessary

- **TanStack Query:** projects, deployments, builds, pipelines, metrics, logs, alerts
- **Zustand:** theme, layout chrome, sidebar state, global filter UI, date range picker state
- **React Context:** providers (theme, auth mock, query client) — not for high-churn data
- **Local state:** form inputs, chart interactions, component toggles

## Composition Over Inheritance

Prefer small composable components and hooks over class hierarchies or mega-components.

## API-Ready Mock Layer

Initial data comes from mock services with the **same interface** planned for real APIs. Swapping mock → real backend must not require UI rewrites.

---

# Technology Stack

## Core

| Category     | Technology            |
| ------------ | --------------------- |
| Framework    | React 18+             |
| Language     | TypeScript (strict)   |
| Build        | Vite                  |
| Routing      | React Router          |
| Server state | TanStack Query        |
| Client state | Zustand               |
| Styling      | Tailwind CSS          |
| Forms        | React Hook Form + Zod |

## Data Visualization & UI

| Category   | Technology      | Use case                              |
| ---------- | --------------- | ------------------------------------- |
| Tables     | TanStack Table  | Builds, logs, alerts, pipelines       |
| Charts     | Recharts        | Metrics, trends, time-series          |
| Motion     | Framer Motion   | Transitions, panel animations         |

## Quality

| Tool                  | Purpose                |
| --------------------- | ---------------------- |
| ESLint                | Linting                |
| Prettier              | Formatting             |
| Husky + lint-staged   | Pre-commit checks      |
| Vitest                | Unit/integration tests |
| React Testing Library | Component tests        |

## Deployment & Tooling

| Tool           | Purpose         |
| -------------- | --------------- |
| Vercel         | Hosting         |
| GitHub Actions | CI              |
| Git / GitHub   | Version control |

## AI Development

| Tool                   | Purpose                   |
| ---------------------- | ------------------------- |
| Cursor / Claude agents | Orchestrated development  |
| MCP                    | External tool integration |
| GitHub Copilot         | In-IDE assistance         |

---

# Application Structure (Target)

```
src/
├── app/                 # App bootstrap, providers, router
├── features/            # Feature modules
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── utils/
│       └── __tests__/
├── shared/              # Cross-feature UI, hooks, utils
│   ├── components/      # Design system + viz primitives
│   ├── hooks/
│   ├── lib/             # queryClient, fetch wrapper
│   ├── types/
│   └── utils/
├── assets/
└── styles/              # Global CSS, Tailwind entry
```

See `PROJECT_STRUCTURE.md` for detailed rules.

---

# Routing

- React Router with lazy-loaded route modules
- Protected routes for authenticated areas
- Route-level code splitting
- Deep links to deployments, builds, alerts

---

# Data Flow

```
UI → hook → TanStack Query mutation/query → service → mock API / future HTTP
                ↓
         cache invalidation → UI update
```

Forms: React Hook Form → Zod schema → service → query mutation.

Charts/Tables: Query data → transform hook → Recharts / TanStack Table → UI.

---

# Dashboard Architecture

- **Shell:** Collapsible sidebar + top bar + main content area
- **Widgets:** Composable dashboard cards (metric, status, activity feed)
- **Layouts:** Grid-based responsive layout; stack on mobile
- **Real-time feel:** Polling or mock refresh intervals; skeleton on load

---

# Security (Frontend)

- No secrets in client bundle
- Sanitize log content if rendered as HTML
- CSRF-aware when real API is added
- Secure cookie/session strategy documented before real auth
- Dependency audit in CI

---

# Performance

- Route-based code splitting
- Virtualize long tables (logs, builds) via TanStack Table + virtualization
- Memoize chart data transforms; avoid re-render storms
- Lazy load Recharts per route
- Debounce search and filter inputs
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 on reference hardware

---

# Testing Strategy

- **Unit:** utils, hooks, data transformers, status mappers
- **Component:** RTL for UI behavior and accessibility
- **Integration:** feature flows with mocked services
- **Visualization:** chart/table rendering with stable mock data
- Critical paths: auth gate, dashboard load, deployment status, alert list

---

# Prohibited Patterns

- Business logic inside presentational components
- Fetch calls directly in components (use services + query)
- Duplicated types across features (shared types in `DATA_MODEL.md` alignment)
- Prop drilling > 3 levels without context or composition
- `any` without ADR exception
- CSS-in-JS libraries (use Tailwind + design tokens)
- Next.js or server components (SPA + Vite only unless constitution amended)
- Chart libraries other than Recharts without ADR
- Developing on `main` branch

---

# Future Backend Integration

When approved, introduce:

- REST API behind existing service interfaces
- Real auth (e.g. JWT + httpOnly cookies)
- Environment-based API base URL
- WebSocket or SSE for live metrics/logs

No database or server implementation without explicit human approval.
