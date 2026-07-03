# DevOps Monitor — Design Workflow

Version: 1.0  
Status: Active

---

# Purpose

Defines the design process, validation steps, decision rules, and design lifecycle.

Implements design pipeline in `.claude/design-team/DESIGN-TEAM.md`.

---

# Design Process

```
Research → Product scope → UX flows → Dashboard layout → Friction review → Cognitive review
  → Visual design → A11y review → Mobile review → Design system alignment → Guardian
```

Each step produces a structured deliverable: **Análisis, Problemas, Recomendaciones, Riesgos, Veredicto**.

---

# Phase Deliverables

| Phase     | Owner                       | Output                                |
| --------- | --------------------------- | ------------------------------------- |
| Research  | UX Researcher               | Personas, journeys, problem statement |
| Scope     | Product Designer            | Feature scope, simplified flows       |
| UX        | UX Designer                 | IA, wireframes, all states            |
| Dashboard | Dashboard Architect         | Layout grids, widget placement, density |
| Friction  | Friction Hunter             | Blockers, unnecessary steps           |
| Cognitive | Cognitive Psychology Expert | Load reduction for dense UIs          |
| Visual    | UI Designer                 | Hi-fi specs, tokens usage             |
| A11y      | Accessibility Specialist    | WCAG audit, chart/table a11y          |
| Mobile    | Mobile First Designer       | Touch, responsive approval            |
| System    | Design System Architect     | Component specs, tokens               |
| Final     | Design Guardian             | Approve / reject                      |

---

# UX Validation Rules

1. Every screen has wireframes for: default, loading, empty, error
2. Critical status (failed deploy, critical alert) visible within 3 seconds
3. Maximum 7±2 primary nav items
4. Destructive actions require confirmation
5. Data tables and charts have keyboard-accessible interaction paths
6. Status always has non-color indicator (icon, label, pattern)

---

# Decision Rules

When two designs are valid, prefer:

1. Faster operational comprehension
2. Fewer concepts to learn
3. Existing design system component
4. Keyboard-accessible variant
5. Proven monitoring UX patterns (not novelty)

Escalate to Design Guardian on unresolved trade-offs.

---

# Handoff to Engineering

UI Designer + Design System Architect + Dashboard Architect provide:

- Component breakdown aligned with `PROJECT_STRUCTURE.md`
- Widget and chart specifications for Data Visualization Specialist
- Spacing, typography, color token references
- Interaction notes (hover, focus, disabled, tooltip)
- Responsive breakpoints behavior

Senior Frontend Developer confirms feasibility before implementation starts.

---

# Design Quality Checklist

- [ ] Aligns with `CONSTITUTION.md` and `PRODUCT_REQUIREMENTS.md`
- [ ] All states specified
- [ ] Dashboard Architect approved (for dashboard-heavy features)
- [ ] Mobile First Designer approved
- [ ] Accessibility Specialist approved
- [ ] No Friction Hunter bloqueos graves
- [ ] Design Guardian APROBADO

---

# Definition of Done (Design)

Design phase complete when Design Guardian issues **APROBADO** or **APROBADO CON CAMBIOS** with all changes applied.
