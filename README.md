# DevOps Monitor

Professional SaaS monitoring platform for projects, deployments, pipelines, metrics, logs, and alerts.

> **Status:** Phase 1 complete — application foundation with dashboard, projects, deployments, builds, pipelines, alerts, and activity views.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**Demo login:** `alex@devopsmonitor.io` / `demo1234`

---

## Features

| Module | Status | Description |
| ------ | ------ | ----------- |
| Dashboard | ✅ | KPI overview, charts, recent activity |
| Projects | ✅ | Project list and detail views |
| Deployments | ✅ | Deployment history and status |
| Builds | ✅ | Build history with branch/commit info |
| Pipelines | ✅ | CI/CD pipeline stages |
| Alerts | ✅ | Alert list with severity and status |
| Activity | ✅ | Team activity feed |
| Settings | ✅ | Profile and theme preferences |
| Auth | ✅ | Mock login with session persistence |
| Dark Mode | ✅ | Light / dark / system themes |
| Logs | 🔜 | Phase 3 |
| Metrics | 🔜 | Phase 2 |
| Command Palette | 🔜 | Phase 3 |
| Search | 🔜 | Phase 3 |

---

## Stack

| Category | Technology |
| -------- | ---------- |
| UI | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Routing | React Router 7 |
| State | TanStack Query, Zustand |
| Charts | Recharts |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library |
| Quality | ESLint, Prettier, Husky, lint-staged |
| CI/CD | GitHub Actions, Vercel |

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch) |
| `npm run test:run` | Vitest (single run) |

---

## Architecture

Feature-based SPA with mock API layer ready for backend integration.

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details.

---

## Documentation

| Document | Purpose |
| -------- | ------- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture |
| [ROADMAP.md](ROADMAP.md) | Development phases |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide |
| [.claude/doc/](.claude/doc/README.md) | SSOT specifications |

---

## Deployment

Configured for [Vercel](https://vercel.com) with SPA routing via `vercel.json`.

```bash
npm run build
```

---

## License

Portfolio project — license TBD.
