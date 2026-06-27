const HABITS_KEY = 'kiro_habits';
const COMPLETIONS_KEY = 'kiro_completions';

let selectedColor = '#10b981';

function getHabits() {
  return JSON.parse(localStorage.getItem(HABITS_KEY) || '[]');
}

function saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

function getCompletions() {
  return JSON.parse(localStorage.getItem(COMPLETIONS_KEY) || '{}');
}

function saveCompletions(c) {
  localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(c));
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function dateKey(habitId, dateStr) {
  return `${habitId}-${dateStr}`;
}

function getLast30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function calcStreak(habitId) {
  const completions = getCompletions();
  const today = todayStr();
  let current = 0;
  let longest = 0;
  let streak = 0;
  let d = new Date();

  // Current streak: count backwards from today
  let checking = true;
  for (let i = 0; i <= 365; i++) {
    const ds = d.toISOString().split('T')[0];
    if (ds > today) { d.setDate(d.getDate() - 1); continue; }
    const done = completions[dateKey(habitId, ds)];
    if (done) {
      if (checking) current++;
      streak++;
      longest = Math.max(longest, streak);
    } else {
      if (checking && i > 0) checking = false;
      streak = 0;
    }
    d.setDate(d.getDate() - 1);
    if (i > 365) break;
  }

  return { current, longest };
}

function calcMonthRate(habitId) {
  const completions = getCompletions();
  const days = getLast30Days();
  const today = todayStr();
  const pastDays = days.filter(d => d <= today);
  if (!pastDays.length) return 0;
  const done = pastDays.filter(d => completions[dateKey(habitId, d)]).length;
  return Math.round((done / pastDays.length) * 100);
}

function toggleCompletion(habitId, dateStr) {
  const today = todayStr();
  if (dateStr > today) return;
  const completions = getCompletions();
  const key = dateKey(habitId, dateStr);
  if (completions[key]) {
    delete completions[key];
  } else {
    completions[key] = true;
  }
  saveCompletions(completions);
  renderAll();
}

function renderAll() {
  const habits = getHabits();
  const list = document.getElementById('habitsList');
  const empty = document.getElementById('emptyState');

  if (!habits.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  const completions = getCompletions();
  const today = todayStr();
  const days = getLast30Days();

  list.innerHTML = habits.map(habit => {
    const { current, longest } = calcStreak(habit.id);
    const rate = calcMonthRate(habit.id);
    const todayDone = completions[dateKey(habit.id, today)];

    const dotsHtml = days.map(d => {
      const isFuture = d > today;
      const done = completions[dateKey(habit.id, d)];
      let bg;
      if (isFuture) {
        bg = '#252a3a';
      } else if (done) {
        bg = habit.color;
      } else {
        bg = '#252a3a';
      }
      const opacity = isFuture ? '' : done ? '1' : '0.3';
      return `<div class="day-dot"
        style="background:${bg};opacity:${opacity};border:1.5px solid ${done ? habit.color : '#2a2f3e'}"
        data-future="${isFuture}"
        data-habit="${habit.id}"
        data-date="${d}"
        title="${d}"></div>`;
    }).join('');

    const freqColors = { Daily: '#10b98122', Weekdays: '#3b82f622', Weekly: '#8b5cf622' };
    const freqText = { Daily: '#10b981', Weekdays: '#3b82f6', Weekly: '#8b5cf6' };
    const fc = freqColors[habit.frequency] || '#10b98122';
    const ft = freqText[habit.frequency] || '#10b981';

    return `
      <div class="habit-card" data-id="${habit.id}">
        <div class="habit-card-top">
          <div class="habit-icon-wrap" style="background:${habit.color}22" data-habit="${habit.id}" data-date="${today}">
            ${habit.emoji}
          </div>
          <div class="habit-title-area">
            <div class="habit-name">${habit.name}</div>
            <span class="habit-freq" style="background:${fc};color:${ft}">${habit.frequency}</span>
          </div>
          <div class="habit-stats">
            <div class="stat">
              <div class="stat-value">🔥 ${current}</div>
              <div class="stat-label">Current</div>
            </div>
            <div class="stat">
              <div class="stat-value">⭐ ${longest}</div>
              <div class="stat-label">Longest</div>
            </div>
          </div>
          <button class="delete-btn" data-habit="${habit.id}">✕</button>
        </div>
        <div class="calendar-label">Last 30 days</div>
        <div class="calendar-grid">${dotsHtml}</div>
        <div class="rate-bar-wrap">
          <div class="rate-bar-label">
            <span>This month</span>
            <span>${rate}%</span>
          </div>
          <div class="rate-bar-bg">
            <div class="rate-bar-fill" style="width:${rate}%;background:${habit.color}"></div>
          </div>
        </div>
      </div>`;
  }).join('');

  // Attach click handlers
  list.querySelectorAll('.day-dot').forEach(dot => {
    if (dot.dataset.future === 'true') return;
    dot.addEventListener('click', () => toggleCompletion(dot.dataset.habit, dot.dataset.date));
  });

  list.querySelectorAll('.habit-icon-wrap').forEach(el => {
    el.addEventListener('click', () => toggleCompletion(el.dataset.habit, el.dataset.date));
  });

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this habit? All completion data will be lost.')) {
        const habits = getHabits().filter(h => h.id !== btn.dataset.habit);
        saveHabits(habits);
        const completions = getCompletions();
        Object.keys(completions).forEach(k => {
          if (k.startsWith(btn.dataset.habit + '-')) delete completions[k];
        });
        saveCompletions(completions);
        renderAll();
      }
    });
  });
}

function openModal() {
  selectedColor = '#10b981';
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  document.querySelector('.swatch[data-color="#10b981"]').classList.add('active');
  document.getElementById('habitName').value = '';
  document.getElementById('habitEmoji').value = '';
  document.getElementById('habitFreq').value = 'Daily';
  document.getElementById('modalOverlay').style.display = 'flex';
  document.getElementById('habitName').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function saveNewHabit() {
  const name = document.getElementById('habitName').value.trim();
  const emoji = document.getElementById('habitEmoji').value.trim() || '💪';
  const frequency = document.getElementById('habitFreq').value;

  if (!name) {
    document.getElementById('habitName').focus();
    return;
  }

  const habit = {
    id: Date.now().toString(),
    name,
    emoji,
    color: selectedColor,
    frequency,
    createdAt: new Date().toISOString()
  };

  const habits = getHabits();
  habits.push(habit);
  saveHabits(habits);
  closeModal();
  renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  document.getElementById('addHabitBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('saveHabit').addEventListener('click', saveNewHabit);

  document.getElementById('habitName').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveNewHabit();
  });

  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  document.getElementById('colorSwatches').addEventListener('click', e => {
    const swatch = e.target.closest('.swatch');
    if (!swatch) return;
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    selectedColor = swatch.dataset.color;
  });
});
