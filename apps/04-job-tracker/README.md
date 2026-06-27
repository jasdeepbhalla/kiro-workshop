# App 4 — Job Application Tracker

A dark-themed job application tracker with stats, filters, and expandable job cards. Track every application from Applied to Offer or Rejection. Built with plain HTML, CSS, and JavaScript.

## Features

- Add applications with company, role, date applied, status, salary range, job URL, and notes
- Stats bar: Total, Active, Interviews, Offers counts (updates in real time)
- Filter tabs: All, Active, Interviews, Offers, Rejected
- Job cards with color-coded status badges per status
- Click a card to expand: shows full notes, job link button, status dropdown, delete button
- Update status inline from the expanded card
- All data persisted to localStorage

## Status Colors

| Status | Color |
|---|---|
| Applied | Blue |
| Phone Screen | Yellow |
| Technical Interview | Orange |
| Final Round | Purple |
| Offer | Green |
| Rejected | Red |
| Withdrawn | Grey |

## Kiro Spec Prompt

Use this as your prompt in Kiro to generate this app from scratch:

```
Build a job application tracker with:
- Add job applications with company, role, date applied, status, salary range, job URL, and notes
- Status options: Applied, Phone Screen, Technical Interview, Final Round, Offer, Rejected, Withdrawn
- Stats bar showing total, active, interviews, and offers counts
- Filter tabs to view by status group
- Job cards with status badges (color-coded per status)
- Expandable cards showing full notes and a link to the job posting
- Update status from the expanded card view
- All data saved to localStorage
```

## Steering File

Create `.kiro/steering/tech-stack.md` in your project with this content before running the spec:

```
Plain HTML/CSS/JS job application tracker. No frameworks, no build step, no external libraries.
Dark theme: #0f1117 background, #1a1f2e surface, #8b5cf6 accent.
Applications stored in localStorage under 'kiro_jobs'.
Status values: Applied, Phone Screen, Technical Interview, Final Round, Offer, Rejected, Withdrawn.
All files open directly in the browser — no server required.
```

## How to Run

Open `solution/index.html` directly in your browser. No server needed.

```
open solution/index.html
```

## File Structure

```
solution/
  index.html   — layout, stats bar, filter tabs, job list, add modal
  style.css    — dark theme, status badge colors, expandable card styles
  app.js       — CRUD, filtering, stats calculation, localStorage
prompt.md      — the exact Kiro spec prompt
steering.md    — the steering file content
```
