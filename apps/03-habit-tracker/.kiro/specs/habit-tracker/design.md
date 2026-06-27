# Habit Tracker — Design

## Architecture
```
index.html   — header with Add button, habit list container, empty state, add modal
style.css    — dark theme, habit cards, calendar grid dots, progress bar, modal
app.js       — all logic: habits, completions, streaks, rendering, event handling
```

## Data Models

### Habit (localStorage: `kiro_habits`)
```json
{
  "id": "1719400000000",
  "name": "Morning Run",
  "emoji": "🏃",
  "color": "#10b981",
  "frequency": "Daily",
  "createdAt": "2026-06-26T10:00:00.000Z"
}
```

### Completions (localStorage: `kiro_completions`)
```json
{
  "1719400000000-2026-06-25": true,
  "1719400000000-2026-06-26": true
}
```
Key format: `{habitId}-{YYYY-MM-DD}`

## Key Algorithms

### Streak Calculation (`calcStreak(habitId)`)
Walk backwards from today up to 365 days:
- Current streak: count consecutive completed days from today backwards (stop at first gap)
- Longest streak: track maximum consecutive sequence seen

### Monthly Rate (`calcMonthRate(habitId)`)
`rate = (completed past days in last 30) / (total past days in last 30) × 100`
Excludes future days from denominator.

### Calendar Grid
`getLast30Days()` returns array of 30 date strings `YYYY-MM-DD` from 29 days ago to today.
Each day renders as a `<div class="day-dot">` with:
- `background: habit.color` if completed
- `opacity: 0.3` if missed (past, not completed)
- `opacity: 1` if completed
- Not clickable if future

## Key Functions
- `renderAll()` — full re-render of all habit cards
- `toggleCompletion(habitId, dateStr)` — toggles completion key in localStorage, calls renderAll
- `calcStreak(habitId)` → `{ current, longest }`
- `calcMonthRate(habitId)` → number 0-100
- `saveNewHabit()` — validates, creates habit object, saves, re-renders
