# DevOps Monitor — Constitution

## Single Source of Truth (SSOT)

Version: 1.0  
Status: Active  
Project: DevOps Monitor

---

# Purpose

This document defines what DevOps Monitor is, what it is not, and how decisions must be made across the project.

All agents, contributors, and documentation must treat this file as the primary source of truth.

If any task, proposal, feature, design, or technical decision conflicts with this document, **this document takes precedence**.

---

# Document Hierarchy

| Document                          | Role                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| **`CONSTITUTION.md`** (this file) | Product identity, philosophy, decision framework, and non-negotiable boundaries               |
| **`PRODUCT_REQUIREMENTS.md`**     | Features, scope, modules, flows, and functional requirements                                  |
| **`PRODUCT_WORKFLOW.md`**         | Idea-to-feature lifecycle, evaluation criteria, scope control, and approval rules             |
| **`TECH_ARCHITECTURE.md`**        | Stack, frontend architecture, API layer, state, security, and performance principles          |
| **`DEVELOPMENT_WORKFLOW.md`**     | Development lifecycle, coding standards, testing philosophy, PR standards, definition of done |
| **`GIT_STRATEGY.md`**             | Branch workflow, Conventional Commits, PR integration rules                                   |
| **`PROJECT_STRUCTURE.md`**        | Repository layout, feature organization, naming conventions, and import rules                 |
| **`DATA_MODEL.md`**               | Domain entities, types, DTOs, relationships, and mock-data conventions                        |
| **`DESIGN_SYSTEM.md`**            | Visual and UX principles, layout, typography, color, components, and anti-patterns            |
| **`DESIGN_WORKFLOW.md`**          | Design process, UX validation, decision rules, and design lifecycle                           |
| **`BRAND_GUIDELINES.md`**         | Product voice, messaging, UX writing, and communication principles                            |
| **`AGENT_OPERATING_SYSTEM.md`**   | How AI agents contribute — rules, responsibilities, and behavior standards                    |

Use all documents together. For **what the product is** and **how to decide**, follow this constitution. For **what to build**, follow `PRODUCT_REQUIREMENTS.md`. For **how to build it**, follow `TECH_ARCHITECTURE.md`, `DEVELOPMENT_WORKFLOW.md`, `GIT_STRATEGY.md`, and `PROJECT_STRUCTURE.md`.

---

# Mission

Build a professional-grade DevOps monitoring SaaS web application that demonstrates advanced frontend engineering — complex dashboards, data visualization, clean architecture, modern UX, accessibility, performance, and maintainability.

---

# Vision

Become a portfolio reference project: a monitoring platform that feels as polished and credible as Vercel Dashboard, Datadog, Grafana, GitHub, or Linear — not a demo, but a real engineering tool experience.

---

# Core Belief

Great monitoring UIs make complex systems understandable at a glance. Density and clarity coexist when information hierarchy, visualization, and interaction design are disciplined.

Complexity belongs in architecture and abstractions — never in the operator's workflow.

---

# What DevOps Monitor Is

DevOps Monitor is a **modern web monitoring platform** for projects, deployments, pipelines, metrics, logs, alerts, and team activity.

It is:

- A **React + TypeScript** SPA built with professional engineering practices
- A **portfolio showcase** for frontend expertise (dashboards, data viz, architecture, UX, testing, performance)
- A **SaaS-quality interface** with dashboards, deployment status, build history, CI/CD pipelines, metrics, logs, alerts, timeline, search, filters, and dark mode (evolving incrementally)
- An app designed to integrate **AI-assisted workflows** (agents, MCP, copilots) for intelligent monitoring insights

The primary value proposition is **operational visibility** — understanding system health, deployments, and team activity quickly and confidently.

---

# What DevOps Monitor Is Not

DevOps Monitor is not:

- A full observability backend or real infrastructure agent
- A backend-first or full-stack demo (backend is mock/API-ready initially)
- A rush MVP with shortcuts that compromise code quality
- A visual-only prototype without tests, types, or architecture
- A clone of Datadog complexity — power without bloat
- A "pretty dashboard" without accessibility, responsive design, or performance discipline
- AI Task Manager or a productivity/task app

---

# Target User

**Primary:** Software engineers, DevOps engineers, and tech leads who monitor projects, deployments, and pipelines and expect modern SaaS UX.

**Secondary (portfolio audience):** Hiring managers and senior frontend engineers evaluating dashboard craft, data visualization, architecture, component design, testing, and polish.

Design and engineering decisions should serve **real operational monitoring use**, not gimmicks.

---

# Product Philosophy

## 1. Quality over speed of delivery

Prefer fewer features done well over many features done poorly.

## 2. Clarity in dense interfaces

Monitoring UIs are information-rich by nature. Hierarchy, grouping, and progressive disclosure prevent overload.

## 3. Architecture that scales

Feature-based structure, clear boundaries, reusable primitives. The codebase must remain pleasant to extend after dozens of monitoring modules.

## 4. Type safety and testability

TypeScript strict mode, explicit contracts, tests for behavior that matters — especially data transforms and critical flows.

## 5. Accessibility by default

WCAG 2.1 AA is not optional. Keyboard navigation, focus management, semantic HTML, and accessible charts/tables are part of "done."

## 6. Performance as UX

Perceived speed (skeleton states, virtualization, code splitting, efficient re-renders) is critical for data-heavy dashboards.

## 7. AI as augmentation

AI features assist incident triage, log analysis, and anomaly explanation — they do not replace clear UI or add opaque magic.

---

# Decision Framework

Before approving any feature, design, or implementation, answer:

1. Does it align with the mission and vision?
2. Does it improve operational visibility or response speed?
3. Does it increase unnecessary complexity for users or maintainers?
4. Is it consistent with the tech stack and architecture?
5. Can it be built with reusable patterns already in the codebase?
6. Does it meet accessibility and responsive requirements?
7. Is it testable and type-safe?
8. Would this impress a senior frontend reviewer — for the right reasons?

**Reject** proposals that add scope without user value, duplicate existing patterns, or sacrifice quality for speed.

---

# Allowed vs Forbidden

## Allowed

- Feature-based folders and colocated code
- Mock auth and mock API layer until real backend is introduced
- Zustand for global UI state; TanStack Query for server/async state
- TanStack Table, Recharts, Framer Motion for data-heavy UI
- Dark mode, global search, advanced filters
- Incremental delivery of modules (dashboard → projects → deployments → pipelines → …)
- AI integrations that respect user control and transparency
- Professional Git workflow (branches, Conventional Commits, PRs)

## Forbidden

- Implementing features outside approved plans
- Developing directly on `main`
- Global state for data that belongs in TanStack Query
- Inline styles or one-off components when design-system primitives exist
- `any` in TypeScript without documented exception
- Shipping UI without loading, empty, and error states
- Skipping accessibility or mobile layout "for later"
- Backend/database work unless explicitly scoped and approved
- Generic commit messages or multi-responsibility commits

---

# Non-Negotiable Engineering Standards

- React 18+ with TypeScript (strict)
- Vite, React Router, TanStack Query, Zustand, Tailwind CSS
- TanStack Table, Recharts, Framer Motion
- React Hook Form + Zod for forms
- Vitest + React Testing Library for tests
- ESLint, Prettier, Husky, lint-staged
- Deployment target: Vercel
- Git: feature branches, Conventional Commits, PR-based integration
- Clean Code, SOLID (where applicable), DRY, KISS, composition over inheritance

---

# Authority

| Domain                              | Authority                                |
| ----------------------------------- | ---------------------------------------- |
| Product scope                       | Technical Product Owner + human client   |
| Design approval                     | Design Guardian (final gate)             |
| Engineering approval                | Engineering Guardian (final gate)        |
| Architecture                        | Software Architect (within constitution) |
| Git workflow                        | All agents per `GIT_STRATEGY.md`         |
| Critical scope/architecture changes | Human client explicit approval           |

---

# Success Criteria

The project succeeds when:

- The app feels like a real monitoring SaaS (UX, polish, consistency)
- Dashboards and visualizations are credible and performant
- The codebase demonstrates scalable frontend architecture
- Tests, types, and documentation support confident change
- Git history reflects professional team discipline
- A senior engineer reviewing the repo recognizes professional craft
- Features deliver value without architectural debt that blocks future work
