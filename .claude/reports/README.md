# Task Reports

Agents write task reports to `.claude/reports/<agent-name>-task-report.json` on completion.

## Schema

```json
{
  "agent": "agent-name",
  "task": "Brief task description",
  "status": "completed | blocked | needs_review",
  "timestamp": "ISO 8601",
  "fact_case": {},
  "review": {},
  "persisted_data": {},
  "blockers": [],
  "next_agent": "optional-agent-name"
}
```

## Rules

- PM reads `persisted_data` before next delegation
- Never store secrets or PII
- Senior Frontend Developer owns pair reports for Senior ↔ Developer work
- Clean up reports after delivery (keep this README)

## Git Notes

When implementation is involved, include in `persisted_data`:

- `branch_name`: e.g. `feature/deployment-status-panel`
- `commits`: list of Conventional Commit messages applied
- `pr_url`: if available
