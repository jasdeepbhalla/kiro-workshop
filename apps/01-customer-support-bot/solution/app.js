const LOGS_KEY = 'kiro_support_logs';

function getLogs() {
  return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
}

function saveLog(question, answer) {
  const logs = getLogs();
  logs.push({ ts: new Date().toISOString(), question, answer });
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

function timeStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, sender) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.innerHTML = `
    <div class="message-avatar">${sender === 'bot' ? '🤖' : '👤'}</div>
    <div>
      <div class="message-bubble">${text}</div>
      <div class="message-time">${timeStr()}</div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function handleSend() {
  const input = document.getElementById('userInput');
  const typing = document.getElementById('typing');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addMessage(text, 'user');

  typing.style.display = 'block';
  document.getElementById('messages').scrollTop = 99999;

  await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
  typing.style.display = 'none';

  const answer = findAnswer(text);
  const reply = answer || "I don't have an answer for that yet. Try rephrasing or click 'Talk to a human'.";
  addMessage(reply, 'bot');
  saveLog(text, reply);
}

function renderFAQ() {
  const list = document.getElementById('faqList');
  const count = document.getElementById('faqCount');
  count.textContent = `${faqData.length} entries`;
  list.innerHTML = faqData.map(item => `
    <div class="faq-item">
      <div class="faq-item-q">Q: ${item.question}</div>
      <div class="faq-item-a">${item.answer}</div>
    </div>
  `).join('');
}

function renderLogs() {
  const list = document.getElementById('logsList');
  const logs = getLogs().reverse();
  if (!logs.length) {
    list.innerHTML = '<div class="empty-state">No conversations yet.</div>';
    return;
  }
  list.innerHTML = logs.map(log => {
    const ts = new Date(log.ts).toLocaleString();
    return `
      <div class="log-item">
        <div class="log-item-time">${ts}</div>
        <div class="log-item-q">Q: ${log.question}</div>
        <div class="log-item-a">A: ${log.answer}</div>
      </div>
    `;
  }).join('');
}

function switchView(show) {
  document.getElementById('chatView').style.display = show === 'chat' ? 'flex' : 'none';
  document.getElementById('faqView').style.display = show === 'faq' ? 'flex' : 'none';
  document.getElementById('logsView').style.display = show === 'logs' ? 'flex' : 'none';

  document.querySelectorAll('.nav-item').forEach((btn, i) => {
    btn.classList.toggle('active', ['chat', 'faq', 'logs'][i] === show);
  });

  if (show === 'faq') renderFAQ();
  if (show === 'logs') renderLogs();
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadFAQ();

  document.getElementById('sendBtn').addEventListener('click', handleSend);
  document.getElementById('userInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
  });

  document.getElementById('escalateBtn').addEventListener('click', () => {
    const banner = document.createElement('div');
    banner.className = 'escalated-banner';
    banner.textContent = 'Connecting you to a human agent. Average wait: 2 minutes.';
    const messages = document.getElementById('messages');
    messages.appendChild(banner);
    addMessage('A human agent will join shortly. Please hold.', 'bot');
  });

  document.querySelectorAll('.nav-item')[0].addEventListener('click', () => switchView('chat'));
  document.getElementById('faqNavBtn').addEventListener('click', () => switchView('faq'));
  document.getElementById('logsNavBtn').addEventListener('click', () => switchView('logs'));

  document.getElementById('clearLogsBtn').addEventListener('click', () => {
    localStorage.removeItem(LOGS_KEY);
    renderLogs();
  });

  setTimeout(() => {
    addMessage('Hi! I\'m the Kiro Support Bot. Ask me anything about Kiro, its features, or this workshop.', 'bot');
  }, 400);
});
