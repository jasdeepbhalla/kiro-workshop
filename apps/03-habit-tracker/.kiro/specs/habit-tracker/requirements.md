# Habit Tracker — Requirements

## Overview
A browser-based daily habit tracking application. Users create habits, mark daily
completions on a 30-day calendar grid, and track streaks and completion rates.
All data persisted to localStorage.

## User Stories

### US-1: Add a Habit
**As a** user who wants to build a new habit,
**I want to** create a habit with a name, emoji, color, and frequency,
**so that** I can track it going forward.

**Acceptance Criteria:**
- [ ] "Add Habit" button opens a modal
- [ ] Modal fields: Name (required, text), Emoji (optional, defaults to 💪), Color (6 preset swatches), Frequency (Daily / Weekdays / Weekly)
- [ ] Pressing Enter in the name field saves the habit
- [ ] New habit appears immediately in the list

### US-2: Track Daily Completions
**As a** user working on a habit,
**I want to** mark each day as complete or incomplete on a calendar grid,
**so that** I can see my progress visually.

**Acceptance Criteria:**
- [ ] Each habit card shows a 30-day calendar grid (today and 29 days prior)
- [ ] Completed days show a filled circle in the habit's color
- [ ] Missed/unmarked days show a faint empty circle
- [ ] Future days show a grey circle and are not clickable
- [ ] Clicking any past day toggles its completion state
- [ ] Clicking the habit icon also toggles today's completion

### US-3: View Streaks
**As a** user tracking a habit,
**I want to** see my current and longest streaks,
**so that** I am motivated to maintain consistency.

**Acceptance Criteria:**
- [ ] Each habit card shows Current Streak (🔥) — consecutive days completed up to today
- [ ] Each habit card shows Longest Streak (⭐) — the longest streak ever recorded
- [ ] Streak values update immediately when a day is toggled

### US-4: View Completion Rate
**As a** user reviewing my progress,
**I want to** see what percentage of days in the last 30 days I completed a habit,
**so that** I can evaluate my consistency.

**Acceptance Criteria:**
- [ ] Each habit card shows a progress bar with the 30-day completion rate %
- [ ] Rate is calculated only over past days (today counts if completed)
- [ ] Bar color matches the habit's chosen color

### US-5: Delete a Habit
**As a** user who no longer tracks a habit,
**I want to** delete it,
**so that** it no longer appears in my list.

**Acceptance Criteria:**
- [ ] Each habit card has a delete button (✕)
- [ ] Deletion requires confirmation
- [ ] All completion data for the deleted habit is removed from localStorage

## Non-Functional Requirements
- No external libraries or CDN dependencies
- Dark theme (#0f1117 background, #10b981 accent)
- Habits: localStorage key `kiro_habits`
- Completions: localStorage key `kiro_completions` (object keyed by `habitId-YYYY-MM-DD`)
