# DevOps Monitor — Design Team

## Propósito

Equipo oficial de diseño de producto para **DevOps Monitor**.

Objetivo: experiencia SaaS de monitorización profesional — densa, clara, accesible — comparable a Vercel Dashboard, Datadog, Grafana, GitHub o Linear.

**Fuente de verdad:** Lee los documentos en `.claude/doc/` (ver `doc/README.md`). La constitución prevalece en conflictos.

---

# Visión de Producto

Ver documentos SSOT — no duplicar aquí.

Referencias clave:

- Identidad y filosofía → `doc/CONSTITUTION.md`
- Módulos y flujos → `doc/PRODUCT_REQUIREMENTS.md`
- Sistema visual → `doc/DESIGN_SYSTEM.md`
- Proceso → `doc/DESIGN_WORKFLOW.md`

---

# Principios Fundamentales

1. **Claridad operacional** — el estado del sistema visible de un vistazo
2. **Densidad con jerarquía** — información rica sin ruido visual
3. **Mobile First** — usable en móvil, excelente en desktop
4. **Teclado como ciudadano de primera clase** — búsqueda, filtros, navegación
5. **Accesibilidad no negociable** — WCAG 2.1 AA; tablas y gráficos accesibles
6. **Consistencia de patrones** — design system antes que one-offs
7. **Estados completos** — loading, empty, error, success siempre diseñados
8. **Credibilidad de herramienta real** — no parecer un mockup decorativo

---

# Usuario Objetivo

Ingenieros de software, DevOps y tech leads que monitorizan proyectos, despliegues y pipelines.

Asumir:

- Valoran visibilidad operacional y velocidad de respuesta
- Usan teclado cuando es más rápido
- Alternan móvil y desktop
- Rechazan interfaces recargadas sin jerarquía clara
- Esperan densidad de datos similar a herramientas profesionales

---

# Reglas Globales

Antes de aprobar, aplicar el **Decision Framework** de `doc/CONSTITUTION.md` y responder:

1. ¿Mejora la visibilidad operacional o la velocidad de respuesta?
2. ¿El estado crítico es comprensible en segundos?
3. ¿Qué genera dudas o fricción?
4. ¿Qué puede eliminarse o simplificarse?
5. ¿Usa componentes del design system?
6. ¿Funciona en móvil y con teclado?
7. ¿Los estados tienen indicadores más allá del color?

---

# Formato de Trabajo

Cada agente responde con:

## Análisis

## Problemas

## Recomendaciones

## Riesgos

## Veredicto

- APROBADO | APROBADO CON CAMBIOS | RECHAZADO

---

# Equipo de Diseño

| #   | Rol                         | Agent File                       | Entrega                               |
| --- | --------------------------- | -------------------------------- | ------------------------------------- |
| 01  | UX Researcher               | `ux-researcher.md`               | Personas, journeys, problem statement |
| 02  | Product Designer            | `product-designer.md`            | Scope simplificado, flujos mínimos    |
| 03  | UX Designer                 | `ux-designer.md`                 | IA, wireframes, estados               |
| 04  | Dashboard Architect         | `dashboard-architect.md`         | Layout, widgets, densidad, jerarquía  |
| 05  | Friction Hunter             | `friction-hunter.md`             | Fricción, pasos innecesarios          |
| 06  | Cognitive Psychology Expert | `cognitive-psychology-expert.md` | Carga cognitiva en UIs densas       |
| 07  | UI Designer                 | `ui-designer.md`                 | Hi-fi, tokens, specs visuales         |
| 08  | Accessibility Specialist    | `accessibility-specialist.md`    | Auditoría WCAG, tablas/gráficos       |
| 09  | Mobile First Designer       | `mobile-first-designer.md`       | Touch, responsive (veto)              |
| 10  | Design System Architect     | `design-system-architect.md`     | Componentes, tokens, patrones         |
| 11  | Design Guardian             | `design-guardian.md`             | Aprobación final (veto)               |

**Eliminados del pipeline:** Conversion Designer, SaaS Growth Designer — no aplican a monitorización operacional.

---

# Flujo Oficial (11 pasos)

```
UX Researcher → Product Designer → UX Designer → Dashboard Architect
  → Friction Hunter → Cognitive Psychology Expert → UI Designer
  → Accessibility Specialist → Mobile First Designer → Design System Architect
  → Design Guardian
```

Tras **APROBADO** del Design Guardian, PM delega implementación al **Senior Frontend Developer** (par con Frontend Developer).

**Nota:** Dashboard Architect puede omitirse en features sin componente dashboard (ej. settings simple) — decisión del PM con justificación.

---

# Handoffs

| De                      | A                         | Entrega                              |
| ----------------------- | ------------------------- | ------------------------------------ |
| UX Researcher           | Product Designer          | Problema, personas, métricas         |
| Product Designer        | UX Designer               | Scope, flujos prioritarios           |
| UX Designer             | Dashboard Architect       | Wireframes + estados                 |
| Dashboard Architect     | Friction Hunter           | Layout grids, widget placement       |
| UI Designer             | Accessibility Specialist  | Specs visuales + chart/table specs   |
| Design System Architect | Design Guardian           | Component breakdown                  |
| Design Guardian         | Senior Frontend Developer | Paquete aprobado + veredictos        |

---

# Criterios de Aprobación

Funcionalidad aprobada para ingeniería cuando:

- Todos los agentes emitieron análisis
- Dashboard Architect **aprueba** (si aplica)
- Mobile First Designer **aprueba**
- Accessibility Specialist **aprueba**
- Friction Hunter sin **bloqueos graves**
- Design Guardian **APROBADO**

Rechazo del Design Guardian reinicia desde el agente indicado.

---

# Objetivo Final

Producto que parezca **herramienta de monitorización real**: profesional, denso, confiable — no un dashboard decorativo sin usabilidad.
