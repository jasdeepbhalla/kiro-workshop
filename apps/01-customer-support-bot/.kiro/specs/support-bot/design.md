# Customer Support Bot — Design

## Architecture

Single-page application with three views managed by JS `style.display` toggling.
No routing library needed.

```
index.html     — shell, layout, DOM structure
style.css      — dark theme, chat bubbles, animations
bot.js         — FAQ loading and keyword search engine
app.js         — UI logic, event handlers, localStorage, view switching
faq.json       — knowledge base (18 Q&A entries, editable)
```

## Component Structure

### Layout
```
.container
  aside.sidebar
    .logo
    nav.nav (Chat | FAQ | Logs buttons)
    .sidebar-footer (online status)
  main.chat-main (chat view)
    .chat-header (agent info + escalate button)
    .messages (scrollable message list)
    .typing-indicator (hidden by default)
    .input-area (text input + send button)
  main.panel-main (faq view)
  main.panel-main (logs view)
```

### Message Model
Each message is a DOM element with class `message user` or `message bot`:
```
.message
  .message-avatar (emoji)
  div
    .message-bubble (text)
    .message-time (HH:MM)
```

## Search Algorithm (`bot.js`)

1. Normalize query: lowercase, strip punctuation
2. Tokenize by whitespace
3. Remove stop words: `{what, how, why, when, where, who, is, are, the, a, an, do, does, can, i}`
4. For each FAQ entry, score = count of query tokens found in (question + answer)
5. Return the answer of the highest-scoring entry if score > 0, else null

## Data Format (`faq.json`)
```json
[
  {
    "question": "What is Kiro?",
    "answer": "Kiro is an AI-powered IDE from AWS..."
  }
]
```

## localStorage Schema
Key: `kiro_support_logs`
Value: array of `{ ts: ISO string, question: string, answer: string }`

## View Switching
`switchView(name)` — sets `display` on each main panel, updates `.nav-item.active` class.
Views: `'chat'` | `'faq'` | `'logs'`
