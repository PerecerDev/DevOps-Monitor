# Contributing

Thank you for contributing to DevOps Monitor. This project follows professional engineering practices.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm run dev
```

Demo credentials: `alex@devopsmonitor.io` / `demo1234`

## Branch Strategy

Never commit directly to `main`. Use branch prefixes:

| Prefix | Use case |
| ------ | -------- |
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `refactor/` | Code restructuring |
| `perf/` | Performance improvements |
| `docs/` | Documentation |
| `test/` | Tests |
| `ci/` | CI/CD changes |
| `chore/` | Tooling, dependencies |

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(dashboard): add metrics overview cards
fix(layout): correct sidebar overflow on mobile
refactor(chat): simplify query hooks
```

Each commit should represent a single responsibility.

## Pull Requests

1. Create a feature branch from `main`
2. Implement changes with tests where appropriate
3. Ensure CI passes: `npm run typecheck && npm run lint && npm run test:run && npm run build`
4. Open a PR with summary and test plan
5. Address review feedback before merge

## Code Standards

- TypeScript strict mode — no `any`
- Feature-based architecture — see `ARCHITECTURE.md`
- Use design system components from `shared/components/ui`
- Handle loading, empty, and error states in every view
- WCAG 2.1 AA accessibility baseline

## Documentation

Update relevant docs when making architectural or feature changes:

- `README.md` — project overview
- `CHANGELOG.md` — user-facing changes
- `ARCHITECTURE.md` — technical decisions
- `ROADMAP.md` — phase progress

## Agent Network

This project uses an AI agent orchestration network. See `CLAUDE.md` for the development workflow.
