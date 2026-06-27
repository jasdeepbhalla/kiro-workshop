# Customer Support Bot — Requirements

## Overview
A browser-based customer support chat interface that answers user questions using a
local FAQ knowledge base. Built with plain HTML, CSS, and JavaScript — no frameworks,
no build step.

## User Stories

### US-1: Chat Interface
**As a** user with a question,
**I want to** type my question into a chat input and receive an instant response,
**so that** I can get help without waiting for a human agent.

**Acceptance Criteria:**
- [ ] Chat input accepts free-form text
- [ ] Pressing Enter or clicking Send submits the message
- [ ] User messages appear immediately on the right side of the chat
- [ ] A typing indicator (animated dots) appears while the bot "thinks"
- [ ] Bot responses appear after a 700–1200ms simulated delay
- [ ] Chat scrolls to the latest message automatically

### US-2: FAQ-Based Answers
**As a** user asking a question,
**I want to** receive accurate answers drawn from the FAQ knowledge base,
**so that** I get reliable information and the bot never invents answers.

**Acceptance Criteria:**
- [ ] Bot searches faq.json for the best matching answer using keyword scoring
- [ ] Stop words (what, how, why, is, the, a, an, etc.) are excluded from scoring
- [ ] If no match is found, bot responds with a fallback message directing the user to a human
- [ ] faq.json can be edited to add or remove entries without changing any code

### US-3: Escalate to Human
**As a** user whose question is not answered,
**I want to** request a human agent,
**so that** I can get help with issues the bot cannot resolve.

**Acceptance Criteria:**
- [ ] An "Talk to a human" button is visible in the chat header
- [ ] Clicking it shows an escalation banner in the chat
- [ ] Bot sends a message confirming the escalation

### US-4: FAQ Browser
**As a** user,
**I want to** browse the full FAQ knowledge base,
**so that** I can find answers by reading rather than asking.

**Acceptance Criteria:**
- [ ] A "FAQ" tab in the sidebar shows all entries from faq.json
- [ ] Each entry shows the question and answer
- [ ] The entry count is displayed in the header

### US-5: Conversation Logs
**As a** user,
**I want to** see my past conversations,
**so that** I can review what was discussed.

**Acceptance Criteria:**
- [ ] A "Logs" tab shows all past Q&A pairs with timestamps
- [ ] Logs persist across page reloads using localStorage
- [ ] A "Clear" button wipes all logs
- [ ] If no logs exist, an empty state message is shown

## Non-Functional Requirements
- All files open directly in the browser without a web server (except faq.json fetch — use `python3 -m http.server` if CORS blocks it)
- No external libraries or CDN dependencies
- Dark theme throughout (#141414 background, #2563eb accent)
