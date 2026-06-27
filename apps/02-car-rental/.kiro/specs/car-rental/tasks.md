# Car Rental App — Tasks

## Implementation Checklist

- [x] 1. Create `cars.json` with 10 diverse cars (Sedan, SUV, Luxury, Electric types)
- [x] 2. Create `index.html` with header tabs, browse view container, bookings view container, and booking modal overlay
- [x] 3. Create `style.css` with dark theme, responsive card grid, filter buttons, modal, and booking cards
- [x] 4. Implement `loadCars()` — fetch cars.json and call renderCars with all cars
- [x] 5. Implement `renderCars(cars)` — build card grid with icon, name, type, price, seats, features, and Book Now / Unavailable
- [x] 6. Implement filter buttons — All/Sedan/SUV/Luxury/Electric with active state tracking
- [x] 7. Implement `openModal(car)` and `closeModal()` with outside-click and Cancel button support
- [x] 8. Implement `updateCostPreview()` — calculate and display total cost on date change
- [x] 9. Implement `confirmBooking()` with full validation (name, dates, location, date order check)
- [x] 10. Implement booking persistence — save to localStorage, generate 6-char random booking ID
- [x] 11. Implement `renderBookings()` — sorted booking cards with formatted dates and cancel button
- [x] 12. Implement `switchView(view)` — tab switching between browse and bookings
- [x] 13. Wire all event listeners in DOMContentLoaded

## Extension Tasks (optional)
- [ ] 14. Add a search box to filter cars by name
- [ ] 15. Add sort dropdown: Price (Low to High), Price (High to Low), Name A-Z
- [ ] 16. Show total active bookings count on the My Bookings tab
