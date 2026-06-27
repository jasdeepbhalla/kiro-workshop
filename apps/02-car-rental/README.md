# App 2 — Car Rental

A dark-themed car rental browsing and booking app. Browse 10 cars, filter by type, book with a modal form, and manage reservations. Built with plain HTML, CSS, and JavaScript.

## Features

- Grid of car cards loaded from cars.json with icon, name, type, price, seats, transmission, fuel, and features
- Filter buttons: All, Sedan, SUV, Luxury, Electric
- Book Now modal with name, pickup date, return date, and pickup location
- Total cost calculated automatically (days x price per day)
- Bookings saved to localStorage with a random 6-character booking ID
- My Bookings tab showing all reservations with cancel option
- Unavailable cars shown as greyed-out with no booking button

## Kiro Spec Prompt

Use this as your prompt in Kiro to generate this app from scratch:

```
Build a car rental browsing and booking app with:
- Grid of car cards loaded from cars.json, each showing icon, name, type, price per day, seats, features, and availability
- Filter buttons to show All / Sedan / SUV / Luxury / Electric cars
- Book Now button opens a modal form with name, pickup date, return date, location dropdown
- Total cost calculated automatically from selected dates
- Bookings saved to localStorage
- My Bookings tab showing all reservations with option to cancel
```

## Steering File

Create `.kiro/steering/tech-stack.md` in your project with this content before running the spec:

```
Plain HTML/CSS/JS car rental app. No frameworks, no build step, no external libraries.
Dark theme: #0f1117 background, #1a1f2e surface, #3b82f6 accent.
Data comes from cars.json — load with fetch().
Bookings are stored in localStorage under the key 'kiro_car_rentals'.
All files open directly in the browser — no server required.
```

## How to Run

**Option 1 — Direct browser open (may hit CORS on fetch):**
```
open solution/index.html
```

**Option 2 — Local server (recommended, avoids CORS with cars.json):**
```bash
cd solution
python3 -m http.server 8080
# then open http://localhost:8080
```

## File Structure

```
solution/
  index.html   — layout, header, car grid, bookings view, modal
  style.css    — dark theme styles and responsive card grid
  app.js       — car loading, filtering, booking logic, localStorage
  cars.json    — 10 car records with all properties
cars.json      — starter data (same content, for Kiro to find)
prompt.md      — the exact Kiro spec prompt
steering.md    — the steering file content
```
