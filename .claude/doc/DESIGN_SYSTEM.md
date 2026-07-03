# DevOps Monitor — Design System

Version: 1.0  
Status: Active

---

# Purpose

Visual and UX source of truth: layout, typography, color, components, patterns, and anti-patterns.

Design references: **Vercel Dashboard**, **Datadog**, **Grafana**, **GitHub**, **Linear** — professional, data-dense, credible monitoring SaaS. Do not copy interfaces; use as inspiration only.

---

# Design Principles

1. **Operational clarity** — status and health visible at a glance
2. **Density with hierarchy** — information-rich without chaos
3. **Consistency** — same patterns for tables, charts, status badges, empty states
4. **Keyboard-first power** — search, filters, navigation without mouse
5. **Accessible by default** — contrast, focus, non-color status cues, chart/table a11y
6. **Credible engineering aesthetic** — feels like a tool operators trust

---

# Layout

- **App shell:** Sidebar (collapsible) + top bar (search, alerts, user) + main content
- **Dashboard:** Grid of widgets/cards; responsive stack on mobile
- **Detail views:** Header + tabs or split panel (metadata + logs/metrics)
- **Max content width:** Full-width for tables/logs; constrained for forms (~640px)
- **Spacing scale:** 4px base (Tailwind default)
- **Grid:** 12-column on desktop; stack on mobile

---

# Typography

| Role           | Style                               |
| -------------- | ----------------------------------- |
| Font family    | Inter, system-ui, sans-serif        |
| Page title     | text-2xl / font-semibold            |
| Section title  | text-lg / font-medium               |
| Body           | text-sm / text-base                 |
| Meta / caption | text-xs, muted color                |
| Monospace      | Logs, commit SHAs, IDs — ui-monospace |

---

# Color System

Semantic tokens (light / dark):

| Token          | Usage                         |
| -------------- | ----------------------------- |
| `background`   | Page background               |
| `surface`      | Cards, panels, table rows     |
| `border`       | Dividers, inputs              |
| `text-primary` | Headings, body                |
| `text-muted`   | Secondary text, timestamps    |
| `accent`       | Primary actions, links        |
| `destructive`  | Failed deploys, critical alerts |
| `success`      | Healthy, passed builds        |
| `warning`      | Degraded, warnings            |
| `info`         | Informational states          |

**Status colors:** success (green), warning (amber), error (red), info (blue), neutral (gray) — always paired with icon/label, not color alone.

**Contrast:** WCAG AA minimum 4.5:1 for body text; chart colors distinguishable in dark mode.

---

# Components (Design System)

## Primitives

Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Badge, Avatar, Tooltip, Dropdown, Modal, Sheet, Toast, Skeleton, Spinner, EmptyState, ErrorState, Tabs, Breadcrumb

## Status & Monitoring

- **StatusBadge:** deployment, build, pipeline, health states
- **HealthIndicator:** project/service health dot + label
- **MetricCard:** KPI with sparkline or delta
- **AlertRow:** severity, title, time, status
- **DeploymentCard:** version, environment, status, duration

## Data Display

- **DataTable:** TanStack Table wrapper with sorting, filtering
- **LogViewer:** monospace, level colors, virtualized rows
- **MetricChart:** Recharts line/area/bar with accessible tooltips
- **Timeline:** vertical event stream with icons
- **PipelineStage:** horizontal step indicator

## Patterns

- **Filter bar:** chips + date range + clear all
- **Global search:** command-palette style overlay
- **Detail header:** title, status, actions, metadata grid
- **Activity feed:** compact list with actor, action, time

## Motion

- Framer Motion for panel transitions (150–250ms)
- Respect `prefers-reduced-motion`
- No animation on high-frequency data updates (logs streaming)

---

# Forms

- Labels always visible
- Inline validation on blur/submit
- Error messages specific and actionable
- Destructive actions (rollback, delete) require confirmation

---

# Dashboard UX

- Health summary above the fold
- Failed deployments and open alerts prominently visible
- Quick navigation to projects and recent activity
- Empty states guide first project setup

---

# Dark Mode

- Class-based toggle + system preference
- Charts and tables tested in both themes
- Log viewer optimized for dark (primary operator mode)
- Surfaces elevate via border/background shift

---

# Responsive Rules

- Mobile: hamburger nav; single column; essential metrics only
- Tablet: collapsible sidebar; simplified charts
- Desktop: full sidebar + multi-column dashboard + side panels

Touch targets ≥ 44×44px on mobile.

---

# Anti-Patterns

- Decorative gradients on data views
- More than one primary action per critical status view
- Color-only status indicators
- Charts without axis labels or tooltips
- Tables without horizontal scroll strategy on mobile
- Infinite scroll on logs without virtualization indicator
- Icon-only buttons without aria-label
- Fake "live" animations when data is static mock

---

# Review Checklist

- [ ] Works in light and dark
- [ ] Keyboard navigable (tables, charts, filters)
- [ ] Focus visible
- [ ] Status has non-color cues
- [ ] Empty and error states designed
- [ ] Mobile layout verified
- [ ] Uses design tokens, not hardcoded hex in features
