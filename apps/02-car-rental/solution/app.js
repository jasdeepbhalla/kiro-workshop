const BOOKINGS_KEY = 'kiro_car_rentals';
let allCars = [];
let selectedCar = null;
let activeFilter = 'All';

function getBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function randomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function daysBetween(from, to) {
  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function renderCars(cars) {
  const grid = document.getElementById('carGrid');
  grid.innerHTML = cars.map(car => `
    <div class="car-card ${car.available ? '' : 'unavailable'}">
      <span class="car-icon">${car.icon}</span>
      <div class="car-name">${car.name}</div>
      <div class="car-type">${car.type}</div>
      <div class="car-meta">
        <span>👥 ${car.seats} seats</span>
        <span>⚙️ ${car.transmission}</span>
        <span>⛽ ${car.fuel}</span>
      </div>
      <div class="car-features">
        ${car.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
      </div>
      <div class="car-footer">
        <div class="car-price">$${car.pricePerDay}<span>/day</span></div>
        ${car.available
          ? `<button class="book-btn" data-id="${car.id}">Book Now</button>`
          : `<span class="unavailable-badge">Unavailable</span>`
        }
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const car = allCars.find(c => c.id === parseInt(btn.dataset.id));
      openModal(car);
    });
  });
}

function openModal(car) {
  selectedCar = car;
  document.getElementById('modalTitle').textContent = `Book ${car.name}`;
  document.getElementById('bookingName').value = '';
  document.getElementById('pickupDate').value = '';
  document.getElementById('returnDate').value = '';
  document.getElementById('pickupLocation').value = '';
  document.getElementById('costPreview').style.display = 'none';
  document.getElementById('formError').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
  selectedCar = null;
}

function updateCostPreview() {
  const pickup = document.getElementById('pickupDate').value;
  const ret = document.getElementById('returnDate').value;
  const preview = document.getElementById('costPreview');
  if (pickup && ret && selectedCar) {
    const days = daysBetween(pickup, ret);
    if (days > 0) {
      const total = days * selectedCar.pricePerDay;
      document.getElementById('costAmount').textContent = `$${total} (${days} day${days > 1 ? 's' : ''})`;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  } else {
    preview.style.display = 'none';
  }
}

function confirmBooking() {
  const name = document.getElementById('bookingName').value.trim();
  const pickup = document.getElementById('pickupDate').value;
  const ret = document.getElementById('returnDate').value;
  const location = document.getElementById('pickupLocation').value;
  const errorEl = document.getElementById('formError');

  errorEl.style.display = 'none';

  if (!name) {
    errorEl.textContent = 'Please enter your name.';
    errorEl.style.display = 'block';
    return;
  }
  if (!pickup || !ret) {
    errorEl.textContent = 'Please select both pickup and return dates.';
    errorEl.style.display = 'block';
    return;
  }
  if (!location) {
    errorEl.textContent = 'Please select a pickup location.';
    errorEl.style.display = 'block';
    return;
  }
  const days = daysBetween(pickup, ret);
  if (days <= 0) {
    errorEl.textContent = 'Return date must be after pickup date.';
    errorEl.style.display = 'block';
    return;
  }

  const totalCost = days * selectedCar.pricePerDay;
  const booking = {
    bookingId: randomId(),
    carId: selectedCar.id,
    carName: selectedCar.name,
    carIcon: selectedCar.icon,
    customerName: name,
    pickupDate: pickup,
    returnDate: ret,
    location,
    totalCost,
    days,
    bookedAt: new Date().toISOString()
  };

  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
  closeModal();
  alert(`Booking confirmed! ID: ${booking.bookingId}`);
}

function renderBookings() {
  const list = document.getElementById('bookingsList');
  const bookings = getBookings().sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

  if (!bookings.length) {
    list.innerHTML = `
      <div class="empty-bookings">
        <p>No bookings yet.</p>
        <small>Browse cars and click "Book Now" to make a reservation.</small>
      </div>`;
    return;
  }

  list.innerHTML = bookings.map(b => `
    <div class="booking-card">
      <div class="booking-info">
        <div class="booking-car">${b.carIcon} ${b.carName}</div>
        <div class="booking-meta">
          <span>👤 ${b.customerName}</span>
          <span>📅 ${formatDate(b.pickupDate)} → ${formatDate(b.returnDate)}</span>
          <span>📍 ${b.location}</span>
          <span>🗓 ${b.days} day${b.days > 1 ? 's' : ''}</span>
        </div>
        <div class="booking-id">Booking ID: ${b.bookingId}</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="booking-total">$${b.totalCost}</div>
        <button class="cancel-btn" data-id="${b.bookingId}">Cancel</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Cancel this booking?')) {
        const bookings = getBookings().filter(b => b.bookingId !== btn.dataset.id);
        saveBookings(bookings);
        renderBookings();
      }
    });
  });
}

function switchView(view) {
  document.getElementById('browseView').style.display = view === 'browse' ? 'block' : 'none';
  document.getElementById('bookingsView').style.display = view === 'bookings' ? 'block' : 'none';
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.view === view);
  });
  if (view === 'bookings') renderBookings();
}

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('./cars.json');
  allCars = await res.json();
  renderCars(allCars);

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.type;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtered = activeFilter === 'All' ? allCars : allCars.filter(c => c.type === activeFilter);
      renderCars(filtered);
    });
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  document.getElementById('pickupDate').addEventListener('change', updateCostPreview);
  document.getElementById('returnDate').addEventListener('change', updateCostPreview);
  document.getElementById('confirmBook').addEventListener('click', confirmBooking);
});
