# DevOps Monitor — Git Strategy

Version: 1.0  
Status: Active

---

# Purpose

Defines the mandatory Git workflow for all development: branching, commits, pull requests, and integration rules.

Every agent and contributor must follow this document. No exceptions without PM and client approval.

Precedence: `CONSTITUTION.md` > this document.

---

# Core Principles

1. **Never develop directly on `main`** — `main` is always deployable and protected
2. **One branch, one responsibility** — each branch addresses a single coherent unit of work
3. **Small, frequent commits** — each commit closes one functional unit
4. **Conventional Commits always** — no generic messages
5. **PR-based integration** — all merges go through review and CI
6. **Documentation before code commits** — when docs must change, update them in the same branch before or with the related commit

---

# Branch Workflow

```
main (protected, deployable)
  └── feature/add-deployment-status-panel
  └── fix/chart-tooltip-overflow
  └── refactor/extract-metrics-hooks
  └── perf/virtualize-build-log-table
  └── docs/update-data-model
  └── test/add-pipeline-filter-tests
  └── ci/add-bundle-size-check
  └── chore/upgrade-vite
```

## Branch Naming

| Prefix       | Use case                                      | Example                              |
| ------------ | --------------------------------------------- | ------------------------------------ |
| `feature/*`  | New functionality                             | `feature/deployment-timeline`        |
| `fix/*`      | Bug fixes                                     | `fix/alert-badge-count`              |
| `refactor/*` | Code structure without behavior change        | `refactor/split-dashboard-layout`    |
| `perf/*`     | Performance improvements                      | `perf/lazy-load-metrics-charts`      |
| `docs/*`     | Documentation only                            | `docs/git-strategy`                  |
| `test/*`     | Test additions or fixes only                  | `test/pipeline-status-integration`   |
| `ci/*`       | CI/CD pipeline changes                        | `ci/github-actions-typecheck`        |
| `chore/*`    | Tooling, deps, housekeeping                   | `chore/eslint-flat-config`           |

**Rules:**

- Use kebab-case after the prefix
- Be descriptive: `feature/add-build-history-filters` not `feature/stuff`
- Branch from latest `main` (or designated integration branch)
- Delete branch after merge

---

# Conventional Commits

All commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional-scope>): <description>

[optional body]

[optional footer]
```

## Types

| Type       | When to use                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | New feature or user-visible capability           |
| `fix`      | Bug fix                                          |
| `refactor` | Code change without feature or fix               |
| `perf`     | Performance improvement                          |
| `test`     | Adding or updating tests                         |
| `docs`     | Documentation only                               |
| `style`    | Formatting, no logic change                      |
| `chore`    | Build, deps, tooling                             |
| `ci`       | CI/CD configuration                              |
| `revert`   | Revert a previous commit                         |

## Scope (optional but recommended)

Use feature or module name: `feat(dashboard):`, `fix(deployments):`, `refactor(metrics):`

## Description Rules

- Imperative mood: "add filter panel" not "added filter panel"
- Lowercase, no period at end
- Max ~72 characters for subject line
- **One responsibility per commit**

## Good Examples

```
feat(dashboard): add deployment health summary cards
fix(pipelines): correct status badge color mapping
refactor(metrics): extract useMetricsQuery hook
perf(logs): virtualize log table rows
docs(data-model): add Build entity schema
test(alerts): add filter integration tests
ci: add vitest job to pull request workflow
chore: upgrade @tanstack/react-query to 5.x
```

## Forbidden Examples

```
update stuff
fix bug
WIP
changes
feat: add dashboard, fix charts, update docs
```

---

# Commit Discipline

| Rule | Detail |
| ---- | ------ |
| Atomic commits | One logical change per commit |
| Separate refactors | Never mix refactor with feature in same commit |
| Separate docs | Doc-only changes get `docs:` commits when standalone |
| No WIP on merge | Squash or clean history before PR if needed |
| Tests with feature | Feature commits include tests when part of same unit |

---

# Pull Request Workflow

1. Create branch from `main`
2. Implement with small commits following this strategy
3. Push branch and open PR
4. PR must pass CI (lint, typecheck, test, build)
5. Review by Senior Frontend Developer (code) or designated gate agent
6. Merge to `main` (squash or merge commit per team preference — prefer squash for clean history)
7. Delete branch

## PR Requirements

- Title follows Conventional Commits format
- Description links to approved plan in `.claude/plans/`
- Screenshots/video for UI (light + dark)
- Test coverage for new behavior
- No eslint/prettier violations
- Self-review checklist (a11y, responsive, states, performance)

---

# Agent Obligations

All engineering agents must:

- Assume work happens on a feature branch, never `main`
- Recommend branch name when starting implementation
- Structure work as commit-sized units in briefs
- Use Conventional Commit messages in commit instructions
- Reject bundling unrelated changes in one commit

---

# Integration with Development Workflow

See `DEVELOPMENT_WORKFLOW.md` for full lifecycle. Git strategy applies at step **EXECUTE** and beyond.

```
Plan approved → Create branch → Implement (commits) → PR → Review → Merge → Deploy preview
```

---

# Definition of Done (Git)

- [ ] Work done on appropriately named branch
- [ ] All commits follow Conventional Commits
- [ ] Each commit has single responsibility
- [ ] PR opened with proper title and description
- [ ] CI green
- [ ] Review approved
- [ ] Merged to `main`
