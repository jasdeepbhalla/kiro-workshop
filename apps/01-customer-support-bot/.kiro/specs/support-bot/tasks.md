# Customer Support Bot — Tasks

## Implementation Checklist

- [x] 1. Create `index.html` with sidebar, chat view, FAQ view, and logs view DOM structure
- [x] 2. Create `style.css` with dark theme, chat bubble styles, typing indicator animation, and sidebar nav
- [x] 3. Create `faq.json` with 18 starter Q&A entries covering Kiro features and workshop topics
- [x] 4. Create `bot.js` with `loadFAQ()` and `findAnswer(query)` using keyword scoring and stop-word filtering
- [x] 5. Implement `addMessage(text, sender)` in `app.js` to render chat bubbles with avatar, text, and timestamp
- [x] 6. Implement `handleSend()` with typing indicator delay and bot response logic
- [x] 7. Implement escalation button — show banner and bot confirmation message
- [x] 8. Implement `renderFAQ()` to populate the FAQ tab from loaded faq.json data
- [x] 9. Implement `saveLog()` and `renderLogs()` with localStorage persistence and clear button
- [x] 10. Implement `switchView(name)` to toggle between chat, faq, and logs views
- [x] 11. Wire all event listeners in `DOMContentLoaded`: send button, Enter key, nav buttons, escalate, clear logs
- [x] 12. Show welcome message from bot 400ms after page load

## Extension Tasks (optional)
- [ ] 13. Add search input to FAQ tab to filter entries
- [ ] 14. Add message count badge to Logs nav item
- [ ] 15. Support markdown-style bold text in bot answers
