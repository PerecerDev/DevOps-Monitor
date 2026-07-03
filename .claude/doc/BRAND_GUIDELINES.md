# DevOps Monitor — Brand Guidelines

Version: 1.0  
Status: Active

---

# Purpose

Product voice, messaging, UX writing, and communication principles.

---

# Brand Identity

**Name:** DevOps Monitor  
**Positioning:** Professional monitoring SaaS for projects, deployments, and pipelines — built with modern frontend craft  
**Personality:** Precise, confident, operational, calm under pressure — not playful, not corporate-bureaucratic

---

# Voice Principles

| Do                              | Don't                                        |
| ------------------------------- | -------------------------------------------- |
| Use plain, operational language | Jargon without context                       |
| Be concise                      | Walls of text in dense views                 |
| Action-oriented labels          | Vague "Submit" when "Deploy" is clearer      |
| Helpful error messages          | Blame the user                               |
| Consistent terminology          | Synonyms for same concept                    |
| Calm, factual tone for incidents| Alarmist or casual copy for failures         |

---

# Terminology (Canonical)

| Term        | Usage                                      |
| ----------- | ------------------------------------------ |
| Project     | Monitored application or service           |
| Deployment  | Release to an environment                  |
| Build       | CI build execution                         |
| Pipeline    | CI/CD workflow                             |
| Alert       | Operational notification requiring attention |
| Metric      | Measured value over time                   |
| Log         | System or application log entry            |
| Environment | production, staging, development           |
| Health      | Overall project/service status             |

---

# Messaging Hierarchy

1. **Primary:** Operational visibility — know what's running, what failed, what needs attention
2. **Secondary:** Built with modern React architecture and data visualization craft
3. **Tertiary:** AI-assisted insights when they help, never opaque

---

# UX Writing Patterns

## Buttons

- Deploy, View logs, Acknowledge alert, Roll back, Retry build
- Avoid: OK, Yes, Done (without context)

## Status Labels

- Use canonical status names: `In progress`, `Failed`, `Healthy`, `Degraded`
- Pair with icons/badges; don't rely on color alone

## Empty States

- Title: what is missing
- Body: one sentence on why + primary CTA
- Example: "No deployments yet" → "Connect a project to start tracking deployments."

## Errors

- What happened + what to do
- Example: "Build failed. View logs for details or retry the pipeline."

## Success

- Brief toast for routine actions; no modal for acknowledgments

---

# AI Content Guidelines

- Disclose when content is AI-generated analysis
- User always confirms destructive or bulk AI actions
- No fake "human" persona in copy
- AI suggestions labeled as suggestions, not facts

---

# Words to Prefer / Avoid

| Prefer              | Avoid                              |
| ------------------- | ---------------------------------- |
| Deployment, build   | Release job (unless CI-specific)   |
| Alert, incident     | Problem, issue (ambiguous)         |
| Healthy, degraded   | Good, bad                          |
| View logs           | See details (vague)                |
| —                   | Synergy, leverage, revolutionary   |

---

# Portfolio / README Tone

Professional, factual, confident. Highlight dashboard architecture, data visualization, and engineering quality without hype.

---

# Communication Principles

1. Respect operator time — short copy in dense UIs
2. One concept per alert or notification
3. Progressive disclosure for advanced metrics
4. Consistency across monitoring modules
