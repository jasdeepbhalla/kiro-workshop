# Job Application Tracker — Tasks

## Implementation Checklist

- [x] 1. Create `index.html` with stats bar, filter tabs, job list, empty state, and add-application modal
- [x] 2. Create `style.css` with dark theme, 7 status badge colors, expandable card transition, modal, filter tabs
- [x] 3. Define `STATUS_CLASSES`, `ACTIVE_STATUSES`, `INTERVIEW_STATUSES` constants
- [x] 4. Implement `getJobs()` / `saveJobs()` storage helpers
- [x] 5. Implement `formatDate(dateStr)` and `formatSalary(min, max)` display helpers
- [x] 6. Implement `updateStats(jobs)` — compute and display all 4 stat values
- [x] 7. Implement `filterJobs(jobs)` — return subset based on `activeFilter`
- [x] 8. Implement `renderJobs()` — sort by date, update stats, filter, build card HTML, attach handlers
- [x] 9. Render job cards: company, role, status badge, date, salary, notes preview, expand chevron
- [x] 10. Render expanded section: full notes, status select, link button (if url), delete button
- [x] 11. Card expand toggle: click `.job-card-main` to toggle `.expanded` class
- [x] 12. Status update: `e.stopPropagation()` on select change, update job in array, re-render
- [x] 13. Delete: `e.stopPropagation()`, confirm dialog, filter out job, save, re-render
- [x] 14. Implement `openModal()` — reset all fields, set date to today, open overlay
- [x] 15. Implement `saveJob()` — validate company and role, build job object, push to storage, re-render
- [x] 16. Wire filter tabs, Add button, modal close, overlay click, Enter key in modal
- [x] 17. Initialize with `renderJobs()` on DOMContentLoaded

## Extension Tasks (optional)
- [ ] 18. Add edit functionality to update existing application details
- [ ] 19. Add export to CSV button
- [ ] 20. Add notes character counter in modal (max 500)
