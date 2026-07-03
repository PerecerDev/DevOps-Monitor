# DevOps Monitor — Project Structure

Version: 1.0  
Status: Active

---

# Purpose

Defines repository layout, feature organization, naming conventions, and where code belongs.

---

# Core Principles

## Feature-Based Organization

Code is organized by **business domain** (deployments, pipelines, metrics, logs), not by technical layer at the top level.

## Co-Locate Related Code

Keep components, hooks, services, types, and tests close to the feature that owns them.

## Shared vs Feature-Specific

| Location                 | Belongs here                                    |
| ------------------------ | ----------------------------------------------- |
| `src/features/<name>/`   | Domain-specific UI and logic                    |
| `src/shared/components/` | Design system + viz primitives                |
| `src/shared/hooks/`      | Generic hooks (useMediaQuery, useDebounce)      |
| `src/shared/lib/`        | Query client, API client, constants             |
| `src/app/`               | Router, providers, root layout                  |

## Clear Boundaries

Features must not import from sibling features' internals. Cross-feature needs go through `shared/` or public feature APIs (`features/deployments/index.ts`).

---

# Root Structure (Target)

```
devops-monitor/
├── .claude/                 # Agent network, plans, reports, SSOT docs
├── .github/workflows/       # CI
├── public/
├── src/
│   ├── app/
│   ├── features/
│   ├── shared/
│   ├── assets/
│   └── styles/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
└── README.md
```

---

# Feature Module Structure

```
src/features/deployments/
├── components/
│   ├── DeploymentList.tsx
│   ├── DeploymentCard.tsx
│   └── DeploymentStatusBadge.tsx
├── hooks/
│   └── useDeploymentFilters.ts
├── services/
│   └── deploymentService.ts
├── types/
│   └── deployment.types.ts
├── utils/
│   └── deploymentHelpers.ts
├── __tests__/
│   └── DeploymentList.test.tsx
└── index.ts               # Public exports only
```

---

# Planned Features (Folders)

| Feature          | Path                      |
| ---------------- | ------------------------- |
| Auth             | `features/auth/`          |
| Dashboard        | `features/dashboard/`     |
| Projects         | `features/projects/`      |
| Deployments      | `features/deployments/`   |
| Builds           | `features/builds/`        |
| Pipelines        | `features/pipelines/`     |
| Metrics          | `features/metrics/`       |
| Logs             | `features/logs/`          |
| Alerts           | `features/alerts/`        |
| Team Activity    | `features/activity/`      |
| Timeline         | `features/timeline/`      |
| Search           | `features/search/`        |
| Settings         | `features/settings/`      |
| Notifications    | `features/notifications/` |

---

# Naming Conventions

| Artifact   | Convention              | Example                    |
| ---------- | ----------------------- | -------------------------- |
| Components | PascalCase              | `DeploymentCard.tsx`       |
| Hooks      | camelCase, `use` prefix | `useDeployments.ts`        |
| Services   | camelCase + Service     | `deploymentService.ts`     |
| Types file | kebab or dot types      | `deployment.types.ts`      |
| Utils      | camelCase               | `formatDuration.ts`        |
| Tests      | same name + `.test.tsx` | `DeploymentCard.test.tsx`  |
| Routes     | kebab-case paths        | `/projects/:id/deployments`|

---

# Import Rules

1. Use path aliases (`@/features/...`, `@/shared/...`) — configure in `vite.config.ts` and `tsconfig`
2. Prefer named exports
3. Feature `index.ts` exports only public API
4. No deep imports into another feature's `components/` folder
5. Shared components must not import from features

---

# Where New Code Belongs

| Need                       | Location                                           |
| -------------------------- | -------------------------------------------------- |
| Deployment list UI         | `features/deployments/components/`                 |
| Deployment API call        | `features/deployments/services/`                   |
| Reusable status badge      | `shared/components/ui/`                            |
| Metric chart wrapper       | `shared/components/charts/`                        |
| Data table wrapper         | `shared/components/tables/`                        |
| App-wide theme provider    | `app/providers/`                                   |
| Route definition           | `app/router/`                                      |
| Zod schema for alert form  | `features/alerts/schemas/`                         |
| Mock data                  | `features/<f>/mocks/` or `shared/mocks/`           |

---

# Design System Location

```
src/shared/components/
├── ui/                    # Button, Input, Badge, Modal, ...
├── charts/                # MetricChart, Sparkline, ChartTooltip
├── tables/                # DataTable, LogTable, BuildTable
└── layout/                # AppShell, Sidebar, PageHeader
```

Each primitive: component + variants + optional test + export from barrel.

---

# State Location

| State type        | Location                                |
| ----------------- | --------------------------------------- |
| Server data       | TanStack Query in hooks                 |
| Theme, sidebar    | Zustand store in `shared/stores/`       |
| Date range filter | Zustand or URL search params            |
| Form              | React Hook Form local to form component |

---

# Documentation in Code

- JSDoc for non-obvious public APIs only
- ADRs in `.claude/decisions/` for significant architecture choices
- No duplicate SSOT — link to `.claude/doc/` files in README and CLAUDE.md
