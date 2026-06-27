# Habit Tracker — Tasks

## Implementation Checklist

- [x] 1. Create `index.html` with header (title + Add Habit button), empty state, habit list div, and add-habit modal
- [x] 2. Create `style.css` with dark theme, habit card layout, 30-column calendar grid, day dot styles, progress bar, color swatches, modal
- [x] 3. Implement storage helpers: `getHabits()`, `saveHabits()`, `getCompletions()`, `saveCompletions()`
- [x] 4. Implement `getLast30Days()` returning array of 30 YYYY-MM-DD strings
- [x] 5. Implement `calcStreak(habitId)` returning `{ current, longest }` by walking backwards 365 days
- [x] 6. Implement `calcMonthRate(habitId)` returning completion % over past 30 days
- [x] 7. Implement `toggleCompletion(habitId, dateStr)` — guard future dates, toggle key in completions, re-render
- [x] 8. Implement `renderAll()` — build habit cards with icon, name, frequency badge, stats, calendar grid, rate bar, delete button
- [x] 9. Render calendar grid: 30 day-dots with correct colors, opacity, click handlers (skip future dots)
- [x] 10. Implement `openModal()` / `closeModal()` with color swatch selection and outside-click close
- [x] 11. Implement `saveNewHabit()` — validate name, create habit with Date.now() id, save, close modal, re-render
- [x] 12. Implement delete — confirm dialog, remove habit, clean up all related completion keys, re-render
- [x] 13. Wire all event listeners in DOMContentLoaded

## Extension Tasks (optional)
- [ ] 14. Add week-view toggle (show current week only, larger dots)
- [ ] 15. Edit habit name/emoji after creation
- [ ] 16. Export completion data as CSV
