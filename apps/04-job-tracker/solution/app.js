const JOBS_KEY = 'kiro_jobs';
let activeFilter = 'All';

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const STATUS_CLASSES = {
  'Applied': 'status-Applied',
  'Phone Screen': 'status-Phone-Screen',
  'Technical Interview': 'status-Technical-Interview',
  'Final Round': 'status-Final-Round',
  'Offer': 'status-Offer',
  'Rejected': 'status-Rejected',
  'Withdrawn': 'status-Withdrawn'
};

const ACTIVE_STATUSES = ['Applied', 'Phone Screen', 'Technical Interview', 'Final Round'];
const INTERVIEW_STATUSES = ['Technical Interview', 'Final Round'];

function getJobs() {
  return JSON.parse(localStorage.getItem(JOBS_KEY) || '[]');
}

function saveJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatSalary(min, max) {
  const fmt = n => n ? '$' + Number(n).toLocaleString() : null;
  const a = fmt(min), b = fmt(max);
  if (a && b) return `${a} - ${b}`;
  if (a) return `${a}+`;
  if (b) return `up to ${b}`;
  return null;
}

function filterJobs(jobs) {
  if (activeFilter === 'All') return jobs;
  if (activeFilter === 'Active') return jobs.filter(j => ACTIVE_STATUSES.includes(j.status));
  if (activeFilter === 'Interviews') return jobs.filter(j => INTERVIEW_STATUSES.includes(j.status));
  if (activeFilter === 'Offers') return jobs.filter(j => j.status === 'Offer');
  if (activeFilter === 'Rejected') return jobs.filter(j => j.status === 'Rejected');
  return jobs;
}

function updateStats(jobs) {
  document.getElementById('statTotal').textContent = jobs.length;
  document.getElementById('statActive').textContent = jobs.filter(j => ACTIVE_STATUSES.includes(j.status)).length;
  document.getElementById('statInterviews').textContent = jobs.filter(j => INTERVIEW_STATUSES.includes(j.status)).length;
  document.getElementById('statOffers').textContent = jobs.filter(j => j.status === 'Offer').length;
}

function renderJobs() {
  const allJobs = getJobs().sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
  updateStats(allJobs);

  const jobs = filterJobs(allJobs);
  const list = document.getElementById('jobsList');
  const empty = document.getElementById('emptyState');

  if (!jobs.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  list.innerHTML = jobs.map(job => {
    const salaryStr = formatSalary(job.salaryMin, job.salaryMax);
    const notesPreview = job.notes ? escHtml(job.notes.substring(0, 80)) + (job.notes.length > 80 ? '...' : '') : '';
    const statusClass = STATUS_CLASSES[job.status] || 'status-Applied';

    return `
      <div class="job-card" data-id="${job.id}">
        <div class="job-card-main">
          <div class="job-info-left">
            <div class="job-company">${escHtml(job.company)}</div>
            <div class="job-role">${escHtml(job.role)}</div>
          </div>
          <div class="job-meta">
            <span class="status-badge ${statusClass}">${job.status}</span>
            <span class="job-date">${formatDate(job.dateApplied)}</span>
            ${salaryStr ? `<span class="job-salary">${salaryStr}</span>` : ''}
          </div>
          ${notesPreview ? `<span class="job-notes-preview">${notesPreview}</span>` : ''}
          <span class="expand-icon">▼</span>
        </div>
        <div class="job-expanded">
          <div class="expanded-grid">
            <div class="expanded-notes">${job.notes ? escHtml(job.notes) : '<span style="color:#444">No notes.</span>'}</div>
            <div class="expanded-actions">
              <select class="status-select" data-id="${job.id}">
                ${['Applied','Phone Screen','Technical Interview','Final Round','Offer','Rejected','Withdrawn']
                  .map(s => `<option value="${s}" ${s === job.status ? 'selected' : ''}>${s}</option>`)
                  .join('')}
              </select>
              ${job.url ? `<a class="link-btn" href="${job.url}" target="_blank" rel="noopener">Open Job Link ↗</a>` : ''}
              <button class="delete-job-btn" data-id="${job.id}">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  // Toggle expand
  list.querySelectorAll('.job-card-main').forEach(main => {
    main.addEventListener('click', () => {
      const card = main.closest('.job-card');
      card.classList.toggle('expanded');
    });
  });

  // Status update
  list.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', e => {
      e.stopPropagation();
      const jobs = getJobs().map(j => j.id === sel.dataset.id ? { ...j, status: sel.value } : j);
      saveJobs(jobs);
      renderJobs();
    });
  });

  // Delete
  list.querySelectorAll('.delete-job-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (confirm('Delete this application?')) {
        const jobs = getJobs().filter(j => j.id !== btn.dataset.id);
        saveJobs(jobs);
        renderJobs();
      }
    });
  });

  // Prevent link clicks from toggling expand
  list.querySelectorAll('.link-btn').forEach(a => {
    a.addEventListener('click', e => e.stopPropagation());
  });
}

function openModal() {
  document.getElementById('jobCompany').value = '';
  document.getElementById('jobRole').value = '';
  document.getElementById('jobDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('jobStatus').value = 'Applied';
  document.getElementById('jobSalaryMin').value = '';
  document.getElementById('jobSalaryMax').value = '';
  document.getElementById('jobUrl').value = '';
  document.getElementById('jobNotes').value = '';
  document.getElementById('modalOverlay').style.display = 'flex';
  document.getElementById('jobCompany').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function saveJob() {
  const company = document.getElementById('jobCompany').value.trim();
  const role = document.getElementById('jobRole').value.trim();
  if (!company || !role) {
    if (!company) document.getElementById('jobCompany').focus();
    else document.getElementById('jobRole').focus();
    return;
  }

  const job = {
    id: Date.now().toString(),
    company,
    role,
    dateApplied: document.getElementById('jobDate').value,
    status: document.getElementById('jobStatus').value,
    salaryMin: document.getElementById('jobSalaryMin').value,
    salaryMax: document.getElementById('jobSalaryMax').value,
    url: document.getElementById('jobUrl').value.trim(),
    notes: document.getElementById('jobNotes').value.trim(),
    createdAt: new Date().toISOString()
  };

  const jobs = getJobs();
  jobs.push(job);
  saveJobs(jobs);
  closeModal();
  renderJobs();
}

document.addEventListener('DOMContentLoaded', () => {
  renderJobs();

  document.getElementById('addJobBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('saveJob').addEventListener('click', saveJob);

  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.filter;
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderJobs();
    });
  });
});
