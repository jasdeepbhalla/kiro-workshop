# App 1 — Customer Support Bot

A dark-themed customer support chatbot that answers questions from a local FAQ knowledge base. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Sidebar navigation with Chat, FAQ, and Logs views
- Chat view with message bubbles, typing indicator, send button, and escalate to human button
- FAQ view showing the full knowledge base (faq.json)
- Logs view with conversation history, timestamps, and a clear button
- Bot answers are sourced exclusively from faq.json — never invents answers
- Conversations saved to localStorage across page refreshes

## Kiro Spec Prompt

Use this as your prompt in Kiro to generate this app from scratch:

```
Build a customer support chat bot with:
- Sidebar with Chat, FAQ, and Logs navigation
- Chat view: message bubbles with typing indicator, send button, escalate to human button
- FAQ view: searchable list of all knowledge base entries
- Logs view: conversation history with timestamps and clear button
- Bot answers questions using faq.json as the knowledge base — never invents answers
- Conversations saved to localStorage
```

## Steering File

Create `.kiro/steering/tech-stack.md` in your project with this content before running the spec:

```
This is a plain HTML/CSS/JS customer support bot. No frameworks, no build step.
Use a dark theme (#141414 background, #2563eb accent color).
Bot answers must come only from faq.json — never invent answers.
Keep JS files separate: bot.js for FAQ search logic, app.js for UI and conversation.
All files open directly in the browser — no server required.
```

## How to Run

**Option 1 — Direct browser open (may hit CORS on fetch):**
```
open solution/index.html
```

**Option 2 — Local server (recommended, avoids CORS with faq.json):**
```bash
cd solution
python3 -m http.server 8080
# then open http://localhost:8080
```

## File Structure

```
solution/
  index.html   — layout and navigation
  style.css    — dark theme styles
  bot.js       — FAQ search logic (loads and queries faq.json)
  app.js       — UI, conversation handling, logs
  faq.json     — knowledge base (18 Q&A entries about Kiro)
faq.json       — starter knowledge base (same content, for Kiro to find)
prompt.md      — the exact Kiro spec prompt
steering.md    — the steering file content
```
