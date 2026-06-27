# Car Rental App — Requirements

## Overview
A browser-based car rental browsing and booking application. Users can browse
available cars, filter by type, book a car for specific dates, and manage their
reservations. No backend — all data in localStorage.

## User Stories

### US-1: Browse Cars
**As a** user looking to rent a car,
**I want to** see a grid of available cars with key details,
**so that** I can compare options and make an informed choice.

**Acceptance Criteria:**
- [ ] Cars loaded from cars.json and rendered as cards in a grid
- [ ] Each card shows: emoji icon, name, type badge, price per day, seat count, transmission, fuel type, features list
- [ ] Unavailable cars are visually greyed out with an "Unavailable" badge
- [ ] Available cars show a "Book Now" button

### US-2: Filter by Type
**As a** user with a preference for a specific car category,
**I want to** filter cars by type,
**so that** I only see relevant options.

**Acceptance Criteria:**
- [ ] Filter buttons: All, Sedan, SUV, Luxury, Electric
- [ ] Clicking a filter shows only cars of that type
- [ ] Active filter button is visually highlighted
- [ ] "All" is active by default

### US-3: Book a Car
**As a** user who has chosen a car,
**I want to** submit a booking with my details and travel dates,
**so that** I can reserve the car.

**Acceptance Criteria:**
- [ ] "Book Now" opens a modal with: name (required), pickup date (required), return date (required), pickup location (required: Airport / Downtown / Hotel)
- [ ] Total cost is calculated and displayed as dates are selected: days × price/day
- [ ] Return date must be after pickup date — validated before submission
- [ ] All four fields are required — inline error shown if any are missing
- [ ] Successful booking shows confirmation with booking ID and closes the modal
- [ ] Modal closes when clicking outside it or the Cancel button

### US-4: View Bookings
**As a** user with existing reservations,
**I want to** see all my bookings in one place,
**so that** I can manage my upcoming rentals.

**Acceptance Criteria:**
- [ ] "My Bookings" tab shows all reservations sorted by most recent
- [ ] Each booking card shows: car icon and name, customer name, pickup/return dates, location, days, booking ID, and total cost
- [ ] A "Cancel" button removes the booking after confirmation

## Non-Functional Requirements
- No external libraries or CDN dependencies
- Dark theme (#0f1117 background, #3b82f6 accent)
- All data persisted to localStorage key `kiro_car_rentals`
