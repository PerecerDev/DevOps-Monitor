# DevOps Monitor — Development Workflow

Version: 1.0  
Status: Active

---

# Purpose

Defines how software is developed: lifecycle, standards, testing, PRs, Git workflow, and definition of done.

For Git specifics, see `GIT_STRATEGY.md`.

---

# Development Lifecycle

```
Request → BA Analysis → Plan Approval → Design Pipeline → Engineering Pipeline → QA → Delivery
```

No implementation without an approved plan in `.claude/plans/`.

---

# Git-First Development

All implementation follows `GIT_STRATEGY.md`:

1. Create appropriately named branch from `main`
2. Implement with small, Conventional Commits
3. Open PR when feature unit is complete
4. Pass CI and review
5. Merge to `main`

**Never commit directly to `main` for feature work.**

---

# Implementation Order (Within a Feature)

1. Create branch (`feature/<descriptive-name>`)
2. Types and data model alignment (`DATA_MODEL.md`)
3. Service/mock API layer
4. TanStack Query hooks
5. Shared UI primitives (if new)
6. Feature components (all states)
7. Data visualization (charts, tables) per specs
8. Route integration
9. Tests (unit + component + critical integration)
10. Accessibility and responsive pass
11. Performance check (virtualization, lazy load)
12. Documentation updates if patterns changed
13. PR with Conventional Commit history

---

# Coding Standards

## TypeScript

- `strict: true`
- Prefer `interface` for object shapes; `type` for unions/intersections
- No `any`; use `unknown` + narrowing
- Explicit return types on public APIs

## React

- Function components only
- One primary component per file
- Extract hooks when logic exceeds ~15 lines or is reused
- Keys on lists; no index keys for dynamic reorderable lists

## Styling

- Tailwind utility classes; extract patterns to components when repeated 3+ times
- Design tokens via Tailwind config (colors, spacing, typography)
- Dark mode: `class` strategy on `html` or root
- Status colors semantic: success, warning, error, info, neutral

## Forms

- React Hook Form + Zod resolver
- Accessible labels, errors linked with `aria-describedby`
- Disable submit during pending mutation

## Data Visualization

- Recharts: accessible color pairs, tooltips, responsive containers
- TanStack Table: column definitions colocated; sorting/filtering typed
- Framer Motion: respect `prefers-reduced-motion`

---

# PR Standards

Every PR includes:

- Title in Conventional Commits format
- Summary of change and link to plan
- Branch name documented
- Screenshots/video for UI changes (light + dark if applicable)
- Test coverage for new behavior
- No eslint/prettier violations
- Self-review checklist (a11y, responsive, states, performance, viz)

---

# Testing Philosophy

- Test behavior, not implementation details
- Prioritize: user flows, edge cases, regressions, data transforms
- Mock services in tests, not fetch globally
- Test empty/error states for data-heavy views
- Coverage target: meaningful coverage on features, not 100% vanity

---

# Pre-Commit (Husky + lint-staged)

- ESLint on staged TS/TSX
- Prettier format
- Typecheck on CI

---

# AI-Assisted Development

- PM orchestrates via agent network (see `CLAUDE.md`)
- Agents read SSOT docs before acting
- Task reports in `.claude/reports/` for session memory
- Human approval for architecture, scope, and schema changes
- Agents must recommend branch names and commit structure

---

# Definition of Done

A feature is done when:

- [ ] Acceptance criteria from plan met
- [ ] Work on feature branch with proper commits
- [ ] All UI states implemented (loading, empty, error, success)
- [ ] Responsive on mobile, tablet, desktop
- [ ] WCAG 2.1 AA checks passed (Design + a11y review)
- [ ] Charts/tables accessible and performant
- [ ] Tests written and passing
- [ ] No new lint/type errors
- [ ] PR merged to `main`
- [ ] Design Guardian + Engineering Guardian approved
- [ ] QA sign-off

---

# Local Development (When Code Exists)

```bash
npm install
npm run dev      # Vite dev server
npm run test     # Vitest
npm run lint
npm run build
```

Deploy preview via Vercel on PR.
