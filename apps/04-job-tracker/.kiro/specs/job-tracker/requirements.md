# Job Application Tracker — Requirements

## Overview
A browser-based job application management tool. Users track job applications
through a status pipeline from Applied to Offer (or Rejected/Withdrawn), with
stats, filters, and expandable detail cards.

## User Stories

### US-1: Add an Application
**As a** job seeker,
**I want to** log a new job application with all relevant details,
**so that** I have a complete record of where I have applied.

**Acceptance Criteria:**
- [ ] "Add Application" button opens a modal
- [ ] Fields: Company (required), Role (required), Date Applied (defaults to today), Status (dropdown), Salary Min, Salary Max, Job URL, Notes (textarea)
- [ ] Saving without company or role focuses the missing field
- [ ] Application appears at the top of the list immediately after saving
- [ ] Modal closes on Cancel, outside click, or successful save

### US-2: View Application Pipeline
**As a** job seeker,
**I want to** see all my applications in a filterable list,
**so that** I can understand where I stand at a glance.

**Acceptance Criteria:**
- [ ] Applications sorted newest first by date applied
- [ ] Each card shows: company, role, status badge (color-coded), date applied, salary range if provided, notes preview (first 80 chars)
- [ ] Status badges are color-coded: Applied=blue, Phone Screen=yellow, Technical=orange, Final Round=purple, Offer=green, Rejected=red, Withdrawn=grey
- [ ] Filter tabs: All, Active, Interviews, Offers, Rejected

### US-3: Expand Application Details
**As a** user reviewing an application,
**I want to** expand a card to see full details and take actions,
**so that** I can manage each application without leaving the list.

**Acceptance Criteria:**
- [ ] Clicking a card expands it to show: full notes, status update dropdown, Open Job Link button (if URL provided), Delete button
- [ ] Clicking the expanded card again collapses it
- [ ] Changing status in the dropdown updates immediately and re-renders
- [ ] "Open Job Link" opens in a new tab with rel="noopener"
- [ ] Delete requires confirmation

### US-4: Dashboard Stats
**As a** job seeker,
**I want to** see summary statistics at a glance,
**so that** I can track my overall job search progress.

**Acceptance Criteria:**
- [ ] Stats bar shows: Total, Active (Applied + Phone Screen + Technical + Final Round), Interviews (Technical + Final Round), Offers
- [ ] Stats always reflect all applications regardless of active filter

## Non-Functional Requirements
- No external libraries or CDN dependencies
- Dark theme (#0f1117 background, #8b5cf6 accent)
- Data persisted to localStorage key `kiro_jobs`
- Status values: Applied, Phone Screen, Technical Interview, Final Round, Offer, Rejected, Withdrawn
