# Job Application Tracker — Design

## Architecture
```
index.html   — stats bar, filter tabs, job list, empty state, add modal
style.css    — dark theme, status badge colors, expandable cards, modal
app.js       — CRUD, filtering, stats, rendering, event handling
```

## Data Model

### Job Application (localStorage: `kiro_jobs`)
```json
{
  "id": "1719400000000",
  "company": "Acme Corp",
  "role": "Software Engineer",
  "dateApplied": "2026-06-26",
  "status": "Technical Interview",
  "salaryMin": "120000",
  "salaryMax": "150000",
  "url": "https://acme.com/jobs/123",
  "notes": "Met recruiter at AWS re:Invent. Strong match for the platform team.",
  "createdAt": "2026-06-26T10:00:00.000Z"
}
```

## Status System

| Status | Badge Color | Filter Group |
|--------|-------------|--------------|
| Applied | Blue | Active |
| Phone Screen | Yellow | Active |
| Technical Interview | Orange | Active, Interviews |
| Final Round | Purple | Active, Interviews |
| Offer | Green | Offers |
| Rejected | Red | Rejected |
| Withdrawn | Grey | — |

## Filter Logic
```
All       → all jobs
Active    → status in [Applied, Phone Screen, Technical Interview, Final Round]
Interviews → status in [Technical Interview, Final Round]
Offers    → status === 'Offer'
Rejected  → status === 'Rejected'
```

## Key Functions
- `renderJobs()` — gets all jobs, updates stats, applies filter, builds card HTML
- `filterJobs(jobs)` → filtered array based on `activeFilter`
- `updateStats(jobs)` — updates the 4 stat counters (always uses all jobs)
- `openModal()` / `closeModal()` — modal management
- `saveJob()` — validates required fields, creates job object with `Date.now()` id
- `formatSalary(min, max)` → formatted string or null

## Card Expand Pattern
Cards toggle `.expanded` class on click of `.job-card-main`.
The `.job-expanded` div is hidden by default (max-height: 0) and revealed with CSS transition.
Status select and delete button use `e.stopPropagation()` to prevent card toggle.
