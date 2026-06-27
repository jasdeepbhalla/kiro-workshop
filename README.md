# Kiro Workshop — Sample Apps

Four apps to build live during the Kiro IDE and CLI workshop. Each includes the exact Kiro spec prompt, a steering file, and a working solution backup.

---

## Apps

| App | What it demonstrates | Stack |
|---|---|---|
| 01 Customer Support Bot | Chat UI, knowledge base search, multi-view navigation, localStorage logs | HTML / CSS / JS |
| 02 Car Rental | Data-driven card grid, modal booking form, filter buttons, localStorage | HTML / CSS / JS |
| 03 Habit Tracker | Calendar grid, streak calculation, color customization, toggle completions | HTML / CSS / JS |
| 04 Job Application Tracker | Stats bar, filter tabs, expandable cards, inline status updates | HTML / CSS / JS |

---

## How to Use This Repo

Each app folder (`apps/01-customer-support-bot/`, etc.) contains three things:

1. **`prompt.md`** — the exact spec prompt to paste into Kiro. Use this to generate the app from scratch.
2. **`steering.md`** — the content for your `.kiro/steering/tech-stack.md` file. Create this in your project before running the spec so Kiro follows the right conventions.
3. **`solution/`** — a fully working backup. Open it in the browser if you want to see the finished result or if the live build runs long during the session.

### Workflow for each app

```
# 1. Create a new folder
mkdir ~/kiro-live-demo && cd ~/kiro-live-demo

# 2. Copy the starter data file if the app has one (cars.json, faq.json)
cp <path-to-repo>/apps/02-car-rental/cars.json .

# 3. Create the steering file
mkdir -p .kiro/steering
# Paste the content of steering.md into .kiro/steering/tech-stack.md

# 4. Open Kiro and paste the prompt from prompt.md
# Kiro will generate index.html, style.css, app.js

# 5. If you need the backup, open solution/index.html
```

---

## Running Any Solution

Every solution app is plain HTML/CSS/JS with no build step.

**Direct browser open** (works for apps that do not use fetch):
```bash
open apps/03-habit-tracker/solution/index.html
open apps/04-job-tracker/solution/index.html
```

**Local server** (required for apps that fetch a JSON file — apps 1 and 2):
```bash
cd apps/01-customer-support-bot/solution
python3 -m http.server 8080
# open http://localhost:8080
```

---

## Workshop Sessions

| Date | Group | Time | Topic |
|---|---|---|---|
| June 27, 2026 | AWS SBGL (Vishesh Singla) | 10 PM IST / 9:30 AM PST | From Idea to App: Building with Kiro IDE and Kiro CLI |
| June 30, 2026 | AWS Student Builder Group, University of Central Missouri (Pooja Shrestha) | 8 PM CDT / 6 PM PST | Getting Started with Kiro |

---

## Speaker

**Jasdeep Singh Bhalla**
Senior Software Engineer at GoDaddy · AWS Community Builder
[linkedin.com/in/jsblive](https://linkedin.com/in/jsblive)
