# DevOps Monitor Documentation

## What is DevOps Monitor?

**Read [`CONSTITUTION.md`](./CONSTITUTION.md) first.** SSOT for product identity, philosophy, decision framework, and boundaries.

DevOps Monitor is a professional SaaS monitoring platform for projects, deployments, pipelines, metrics, logs, and alerts — built as a portfolio-grade React/TypeScript application.

## Document Index

| Document                                                   | Purpose                                         |
| ---------------------------------------------------------- | ----------------------------------------------- |
| [`CONSTITUTION.md`](./CONSTITUTION.md)                     | Mission, vision, philosophy, decision framework |
| [`PRODUCT_REQUIREMENTS.md`](./PRODUCT_REQUIREMENTS.md)     | Features, modules, flows, MVP boundaries        |
| [`PRODUCT_WORKFLOW.md`](./PRODUCT_WORKFLOW.md)             | Idea-to-feature lifecycle and approvals         |
| [`TECH_ARCHITECTURE.md`](./TECH_ARCHITECTURE.md)           | Stack, architecture, data flow, performance     |
| [`DEVELOPMENT_WORKFLOW.md`](./DEVELOPMENT_WORKFLOW.md)     | Coding standards, testing, PRs, DoD             |
| [`GIT_STRATEGY.md`](./GIT_STRATEGY.md)                     | Branches, Conventional Commits, PR workflow     |
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)           | Folder layout, naming, imports                  |
| [`DATA_MODEL.md`](./DATA_MODEL.md)                         | Entities, types, DTOs, mocks                    |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)                   | Visual system, components, anti-patterns        |
| [`DESIGN_WORKFLOW.md`](./DESIGN_WORKFLOW.md)               | Design process and handoff                      |
| [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md)             | Voice, terminology, UX writing                  |
| [`AGENT_OPERATING_SYSTEM.md`](./AGENT_OPERATING_SYSTEM.md) | Agent rules and behavior                        |

If documents conflict, **`CONSTITUTION.md` takes precedence**.

## Agent Network

| Resource                                                                                          | Purpose                         |
| ------------------------------------------------------------------------------------------------- | ------------------------------- |
| [`../../CLAUDE.md`](../../CLAUDE.md)                                                              | Project Manager orchestration   |
| [`.claude/design-team/DESIGN-TEAM.md`](../design-team/DESIGN-TEAM.md)                             | Design pipeline (11 steps)      |
| [`.claude/engineering-team/ENGINEERING-TEAM.md`](../engineering-team/ENGINEERING-TEAM.md)         | Engineering pipeline (15 steps) |
| [`.claude/agents/`](../agents/)                                                                   | Agent role definitions          |
| [`.claude/plans/`](../plans/)                                                                     | Approved feature plans          |
| [`.claude/decisions/`](../decisions/)                                                             | Architecture decision records   |

Do not duplicate SSOT content elsewhere — link to these documents.
