# DevOps Monitor — Agent Operating System

Version: 1.0  
Status: Active

---

# Purpose

Defines how AI agents contribute: rules, responsibilities, decision framework, and behavior standards.

Applies to all agents in `.claude/agents/` orchestrated via `CLAUDE.md`.

---

# Source of Truth Hierarchy

1. `CONSTITUTION.md`
2. `PRODUCT_REQUIREMENTS.md`
3. `PRODUCT_WORKFLOW.md`
4. `TECH_ARCHITECTURE.md`
5. `DEVELOPMENT_WORKFLOW.md`
6. `GIT_STRATEGY.md`
7. `PROJECT_STRUCTURE.md`
8. `DATA_MODEL.md`
9. `DESIGN_SYSTEM.md`
10. `DESIGN_WORKFLOW.md`
11. `BRAND_GUIDELINES.md`
12. `AGENT_OPERATING_SYSTEM.md` (this file)
13. Task-specific instructions from PM

Higher document wins on conflict.

---

# Primary Responsibility

Agents **execute within the established framework** for DevOps Monitor.

They do not reinvent product vision, stack, or scope without PM and client approval.

---

# Core Agent Principles

## Follow Existing Decisions

Do not reopen settled architecture or design without explicit PM request.

## Respect Product Boundaries

Frontend-first; mock API; no backend unless approved. See `CONSTITUTION.md` forbidden list.

## Git Discipline

Never develop on `main`. Use Conventional Commits. One branch, one responsibility. See `GIT_STRATEGY.md`.

## Simplicity First

Simplest solution that meets requirements and quality bar.

## Quality Over Speed

Portfolio-grade code: types, tests, a11y, performance — not shortcuts.

## Consistency Over Novelty

Match existing patterns in codebase and docs.

## Type Safety

TypeScript strict; no silent `any`.

---

# Decision Framework

Before proposing a solution:

1. Aligns with Constitution?
2. Improves operational visibility without unnecessary complexity?
3. Reusable in other features?
4. Testable and accessible?
5. Consistent with TECH_ARCHITECTURE and PROJECT_STRUCTURE?
6. Appropriate agent owns this work?
7. Git workflow compliant?

If any answer fails, revise or escalate to PM.

---

# Agent Behavior Standards

## All Agents

- Read relevant SSOT docs before acting
- Report to PM only (not client directly)
- Write task report to `.claude/reports/<agent>-task-report.json` on completion
- Never store secrets or PII in reports
- Emit structured output per role template
- Recommend branch names and commit structure for implementation work

## Product Agents

- Tech-agnostic requirements (BA)
- User stories with testable acceptance criteria (TPO)

## Design Agents

- Format: Análisis, Problemas, Recomendaciones, Riesgos, Veredicto
- No implementation code

## Engineering Agents

- Format: Análisis, Riesgos, Recomendaciones, Impacto, Prioridad, Veredicto
- Follow DEVELOPMENT_WORKFLOW definition of done
- Follow GIT_STRATEGY for all code changes

---

# Escalation Rules

| Situation                   | Escalate to                   |
| --------------------------- | ----------------------------- |
| Scope ambiguity             | PM → client                   |
| Design conflict             | Design Guardian               |
| Dashboard layout conflict   | Dashboard Architect → Guardian |
| Visualization approach      | Data Visualization Specialist |
| Architecture conflict       | Software Architect → PM       |
| Security concern            | Security Engineer → PM        |
| Critical bug before release | QA → PM                       |
| Veto                        | Design / Engineering Guardian |

---

# Anti-Patterns

- Skipping upstream pipeline steps
- Implementing without approved plan
- Developing on `main`
- Generic or multi-responsibility commits
- Duplicating SSOT content in agent outputs
- Backend/database work without approval
- Approving own work without paired reviewer (Senior ↔ Developer)
- Feature code in `shared/` without generalization need
- Charts/tables without accessibility review

---

# Task Reports

Schema: `.claude/reports/README.md`

Senior owns pair reports for Senior ↔ Developer duos.

PM carries `persisted_data` forward between delegations.

---

# Definition of Success (Agents)

An agent succeeds when:

- Deliverable matches role charter
- SSOT alignment verified
- Next agent can continue without guessing
- Task report persisted
- Quality gates respected
- Git workflow respected for implementation work
