# DevOps Monitor — Product Workflow

Version: 1.0  
Status: Active

---

# Purpose

Defines how ideas become features: lifecycle, evaluation, scope control, and approval rules.

---

# Idea-to-Feature Lifecycle

```
1. Intake (client request)
2. Business Analysis (BA)
3. Scoping (Technical Product Owner)
4. Technical Plan (Software Architect)
5. Client plan approval ← GATE
6. Design pipeline (11 steps)
7. Design Guardian approval ← GATE
8. Engineering pipeline (15 steps)
9. Engineering Guardian + QA ← GATE
10. Delivery to client
```

---

# Evaluation Criteria

Before adding a feature, score against:

| Criterion       | Question                                                       |
| --------------- | -------------------------------------------------------------- |
| User value      | Does it improve operational visibility or response speed?      |
| Portfolio value | Does it demonstrate frontend/dashboard craft?                    |
| Complexity cost | Is the maintenance cost justified?                             |
| Consistency     | Does it fit existing patterns and design language?             |
| Scope           | Can it ship in the current slice without blocking others?      |

Reject features that fail user value or add disproportionate complexity.

---

# Feature Types

| Type               | Example                    | Approval                 |
| ------------------ | -------------------------- | ------------------------ |
| **Core**           | Dashboard, deployments     | TPO + plan               |
| **Enhancement**    | Advanced metric filters    | Plan + design review     |
| **Infrastructure** | CI, testing setup          | Architect + DevOps       |
| **Visualization**  | New chart type, log table  | Dashboard Architect + Data Viz Specialist |
| **Experimental**   | AI log analysis            | Explicit client approval |

---

# Scope Control

- One approved plan per feature slice
- No "while we're here" additions without BA re-analysis
- Defer P2 items unless client reprioritizes
- Refactors: via Refactoring Specialist or Staff Engineer recommendation, not drive-by
- Git: one branch per feature slice per `GIT_STRATEGY.md`

---

# Approval Rules

| Decision                | Who approves                            |
| ----------------------- | --------------------------------------- |
| New feature in scope    | Client + TPO                            |
| Design deliverable      | Design Guardian                         |
| Dashboard layout        | Dashboard Architect + Design Guardian   |
| Visualization approach  | Data Visualization Specialist           |
| Architecture change     | Software Architect + client if critical |
| Engineering deliverable | Engineering Guardian                    |
| Release                 | PM + QA                                 |

---

# Anti-Feature Rules

Do not add:

- Dashboard widgets without operational data value
- Charts without clear metric purpose
- Settings screens with no user need
- Custom chart library when Recharts suffices
- Duplicate navigation patterns
- AI features that hide actions from the user
- Features that break Git workflow discipline

---

# Definition of Done (Product)

Feature is product-complete when:

- Solves the user story in the plan
- Documented in changelog or release notes if user-facing
- No open P0/P1 bugs
- Merged via PR with proper commit history
- Aligns with `PRODUCT_REQUIREMENTS.md` boundaries
