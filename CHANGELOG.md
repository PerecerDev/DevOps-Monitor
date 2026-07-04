# Changelog

All notable changes to DevOps Monitor are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Virtualized `LogViewer` with TanStack Virtual (800 mock entries)
- Log level filter chips and message/source search
- Logs page at `/logs` with project and highlight query params
- Global `CommandPalette` (⌘K / Ctrl+K) powered by cmdk
- Cross-entity search service (projects, deployments, builds, alerts, logs, navigation)
- `Dialog` primitive for modal overlays

## [0.3.0] - 2026-07-04

### Added

- TanStack Table `DataTable` wrapper with sorting, filtering, and pagination
- Reusable `MetricChart` component (area/line variants)
- `Timeline` component for deployment event streams
- `PipelineStages` horizontal stage visualization
- Deployment detail page with metadata and timeline (`/deployments/:id`)
- Project metrics page with time-series charts (`/projects/:id/metrics`)
- Refactored Deployments, Builds, and Alerts pages to use DataTable

## [0.2.0] - 2026-07-03

### Added

- Vite + React 19 + TypeScript strict application scaffold
- Tailwind CSS v4 design tokens (light/dark/system themes)
- Design system primitives: Button, Badge, Card, Input, StatusBadge, Loading, EmptyState
- App shell with collapsible sidebar, top bar, and mobile navigation
- React Router with lazy-loaded routes and code splitting
- Mock auth flow with Zod validation and persisted session
- TanStack Query data layer with mock services
- Dashboard with KPI cards, activity feed, deployments, builds, and charts
- Projects list and project detail views
- Deployments, Builds, Pipelines, Alerts, and Activity pages
- Settings page with theme and profile preferences
- Vitest + React Testing Library test suite
- ESLint, Prettier, Husky, lint-staged quality tooling
- GitHub Actions CI pipeline
- Vercel deployment configuration

## [0.1.0] - 2026-07-03

### Added

- Agent network and SSOT documentation
- Product requirements, architecture, and design system specifications
