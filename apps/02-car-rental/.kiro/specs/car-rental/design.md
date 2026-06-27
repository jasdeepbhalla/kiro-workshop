# Car Rental App — Design

## Architecture
```
index.html   — layout with header tabs, browse view, bookings view, booking modal
style.css    — dark theme, card grid, modal overlay, filter buttons
app.js       — data loading, rendering, booking logic, localStorage
cars.json    — 10 cars with full metadata
```

## Views
Two views toggled by tab clicks:
- **Browse** (`#browseView`): filter bar + car grid
- **My Bookings** (`#bookingsView`): list of saved reservations

## Data Models

### Car (from cars.json)
```json
{
  "id": 1,
  "name": "Toyota Camry",
  "type": "Sedan",
  "icon": "🚗",
  "pricePerDay": 45,
  "seats": 5,
  "transmission": "Automatic",
  "fuel": "Gasoline",
  "features": ["Bluetooth", "Backup Camera", "AC"],
  "available": true
}
```

### Booking (localStorage)
```json
{
  "bookingId": "A3X9KL",
  "carId": 1,
  "carName": "Toyota Camry",
  "carIcon": "🚗",
  "customerName": "Jane Smith",
  "pickupDate": "2026-07-01",
  "returnDate": "2026-07-05",
  "location": "Airport",
  "days": 4,
  "totalCost": 180,
  "bookedAt": "2026-06-26T10:00:00.000Z"
}
```

## Key Functions
- `renderCars(cars)` — builds car grid from filtered array
- `openModal(car)` / `closeModal()` — modal management
- `updateCostPreview()` — live total cost calculation on date change
- `confirmBooking()` — validates form, creates booking object, saves to localStorage
- `renderBookings()` — renders reservation list from localStorage
- `switchView(view)` — toggles browse/bookings visibility

## Cost Calculation
`days = Math.round((returnDate - pickupDate) / 86400000)`
`total = days × car.pricePerDay`
