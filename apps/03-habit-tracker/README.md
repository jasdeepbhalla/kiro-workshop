# App 3 — Habit Tracker

A dark-themed daily habit tracker. Add habits with a name, emoji, color, and frequency. Each habit shows a 30-day calendar grid, streak counters, and a monthly completion rate. Built with plain HTML, CSS, and JavaScript.

## Features

- Add habits with name, emoji, color (6 presets), and frequency (Daily/Weekdays/Weekly)
- Habit cards with a 30-day calendar grid: filled dot = completed, empty = missed
- Click any past day dot to toggle completion for that day
- Click the habit icon to mark today complete
- Current streak and longest streak counters on every card
- Monthly completion rate shown as a percentage bar
- Delete habits with confirmation (removes all completion data)
- All data persisted to localStorage across page refreshes

## Kiro Spec Prompt

Use this as your prompt in Kiro to generate this app from scratch:

```
Build a daily habit tracker app with:
- Add habits with a name, emoji icon, color, and frequency (Daily/Weekdays/Weekly)
- Habit cards showing a 30-day calendar grid with colored dots for completed/missed days
- Current streak and longest streak counters on each card
- Click any day on the grid to toggle completion
- Monthly completion rate percentage
- Delete habits with confirmation
- All data persisted to localStorage
```

## Steering File

Create `.kiro/steering/tech-stack.md` in your project with this content before running the spec:

```
Plain HTML/CSS/JS habit tracking app. No frameworks, no build step, no external libraries.
Dark theme: #0f1117 background, #1a1f2e surface, #10b981 accent.
Habits stored in localStorage under 'kiro_habits'.
Completions stored in localStorage under 'kiro_completions' as object keyed by 'habitId-YYYY-MM-DD'.
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
  index.html   — layout, habit list, add-habit modal
  style.css    — dark theme, habit card grid, day dot styles
  app.js       — habit CRUD, completion toggling, streak calculation
prompt.md      — the exact Kiro spec prompt
steering.md    — the steering file content
```
