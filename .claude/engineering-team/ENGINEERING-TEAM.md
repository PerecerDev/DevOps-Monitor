# DevOps Monitor — Engineering Team

## Propósito

Equipo oficial de ingeniería para **DevOps Monitor**.

Objetivo: codebase frontend de calidad portfolio — dashboards complejos, visualización de datos, arquitectura mantenible, tipada, testeada, performante — con arquitectura feature-based.

**Fuente de verdad:** Lee los documentos en `.claude/doc/` (ver `doc/README.md`). `CONSTITUTION.md` prevalece.

---

# Filosofía Técnica

1. La solución más simple que cumple el quality bar
2. No construir backend hasta aprobación explícita
3. Mantenibilidad > sofisticación
4. Type safety y tests son parte del producto
5. Reutilizar design system, shared hooks y viz primitives
6. Performance y accesibilidad son requisitos, no extras
7. Cada PR debe impresionar a un senior frontend reviewer
8. Git profesional obligatorio — ver `doc/GIT_STRATEGY.md`

Ver `doc/TECH_ARCHITECTURE.md` y `doc/DEVELOPMENT_WORKFLOW.md`.

---

# Stack Oficial

| Área         | Tecnología                           |
| ------------ | ------------------------------------ |
| UI           | React, TypeScript, Vite              |
| Routing      | React Router                         |
| Server state | TanStack Query                       |
| Client state | Zustand                              |
| Styling      | Tailwind CSS                         |
| Tables       | TanStack Table                       |
| Charts       | Recharts                             |
| Motion       | Framer Motion                        |
| Forms        | React Hook Form + Zod                |
| Tests        | Vitest, React Testing Library        |
| Quality      | ESLint, Prettier, Husky, lint-staged |
| Deploy       | Vercel                               |
| CI           | GitHub Actions                       |
| AI dev       | Cursor agents, MCP, Copilot          |

**No en scope:** Next.js, PostgreSQL, server-side rendering (salvo enmienda a constitución).

---

# Reglas Globales

Antes de aprobar, aplicar Decision Framework y responder:

1. ¿Resuelve el requisito con el patrón existente?
2. ¿Hay alternativa más simple?
3. ¿Es testeable y tipada?
4. ¿Respeta PROJECT_STRUCTURE y feature boundaries?
5. ¿Afecta performance o bundle de forma medible?
6. ¿Tablas/gráficos son accesibles y performantes?
7. ¿Cumple GIT_STRATEGY (rama, commits)?
8. ¿Otro dev lo entenderá en 6 meses?

---

# Formato de Respuesta Obligatorio

## Análisis

## Riesgos

## Recomendaciones

## Impacto

## Prioridad (Baja | Media | Alta | Crítica)

## Veredicto (APROBADO | APROBADO CON CAMBIOS | RECHAZADO)

---

# Equipo de Ingeniería

| #   | Rol                         | Agent File                          | Notas                           |
| --- | --------------------------- | ----------------------------------- | ------------------------------- |
| 01  | Technical Product Owner     | `technical-product-owner.md`        | User stories, priorización      |
| 02  | Software Architect          | `software-architect.md`             | Plan técnico, ADRs              |
| 03  | Context Guardian            | `context-guardian.md`               | Coherencia, duplicados          |
| 04  | Data Model Architect        | `data-model-architect.md`           | Types, DTOs, mocks              |
| 05  | Product Engineer            | `product-engineer.md`               | Integración end-to-end frontend |
| 06  | Senior Frontend Developer   | `senior-frontend-developer.md`    | Brief + review (par)            |
| 07  | Frontend Developer          | `frontend-developer.md`             | Implementación UI               |
| 08  | Data Visualization Specialist | `data-visualization-specialist.md` | Charts, tables, metrics      |
| 09  | TypeScript Specialist       | `typescript-specialist.md`        | Types, generics, strictness     |
| 10  | Testing Engineer            | `testing-engineer.md`               | Vitest, RTL, coverage           |
| 11  | AI Systems Engineer         | `ai-systems-engineer.md`          | Features IA (si aplica)         |
| 12  | AI Code Reviewer            | `ai-code-reviewer.md`               | Review automatizado             |
| 13  | Security Engineer           | `security-engineer.md`              | OWASP frontend                  |
| 14  | Performance Engineer        | `performance-engineer.md`           | Bundle, Core Web Vitals, viz    |
| 15  | QA Engineer                 | `qa-engineer.md`                    | Acceptance, regresión           |
| 16  | Staff Engineer              | `staff-engineer.md`                 | Deuda técnica, sostenibilidad   |
| 17  | Refactoring Specialist      | `refactoring-specialist.md`         | On-demand, no gate              |
| 18  | DevOps Engineer             | `devops-engineer.md`                | CI/CD, Vercel                   |
| 19  | Engineering Guardian        | `engineering-guardian.md`           | Aprobación final (veto)         |

**Eliminados:** Senior/Backend Developer, Database Administrator, Cardilan guardians — proyecto frontend-first.

---

# Flujo Oficial (15 pasos + DevOps paralelo)

```
TPO → Software Architect → Context Guardian → Data Model Architect
  → Product Engineer → Senior FE (+ Frontend Dev) → Data Visualization Specialist
  → TypeScript Specialist → Testing Engineer → AI Systems Engineer (si aplica)
  → AI Code Reviewer → Security Engineer → Performance Engineer → QA Engineer
  → Staff Engineer → Engineering Guardian
```

**DevOps Engineer:** interviene en setup CI/CD, pipelines, Vercel — en paralelo al inicio del proyecto o cuando el plan lo requiera.

**Refactoring Specialist:** invocado por PM bajo recomendación de Staff Engineer o Senior FE; no bloquea pipeline estándar.

**Data Visualization Specialist:** puede omitirse en features sin tablas/gráficos — decisión del PM.

---

# Handoffs Clave

| De                          | A                         | Entrega                            |
| --------------------------- | ------------------------- | ---------------------------------- |
| Software Architect          | Context Guardian          | Plan por rol, contratos            |
| Data Model Architect        | Product Engineer          | Types, schemas Zod, mock API shape |
| Design Guardian (design)    | Senior Frontend Developer | Specs UI aprobados                 |
| Senior Frontend Developer   | Frontend Developer        | Brief paso a paso + branch name    |
| Frontend Developer          | Senior Frontend Developer | PR/code para review                |
| Frontend Developer          | Data Visualization Specialist | Charts/tables para review      |
| TypeScript Specialist       | Testing Engineer          | Types aprobados                    |
| Testing Engineer            | AI Code Reviewer          | Tests + cobertura crítica          |
| Engineering Guardian        | PM                        | Veredicto final                    |

---

# Git en el Pipeline

Todo trabajo de implementación:

1. Rama desde `main` (`feature/`, `fix/`, etc.)
2. Commits Conventional Commits atómicos
3. PR con CI verde
4. Merge a `main`

Ver `doc/GIT_STRATEGY.md`.

---

# Criterios de Entrega

Feature entregable cuando:

- Plan aprobado ejecutado
- Definition of done (`DEVELOPMENT_WORKFLOW.md`) cumplida
- Security, Performance, QA sin bloqueos críticos
- Staff Engineer aprueba sostenibilidad
- PR mergeado con historial limpio
- **Engineering Guardian APROBADO**

---

# Objetivo Final

Demostrar ingeniería frontend avanzada: dashboards complejos, visualización de datos, arquitectura escalable, UX pulida, disciplina Git — listo para portfolio profesional.
