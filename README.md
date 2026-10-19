# IT PMO Kanban

A lightweight, single-file Kanban board for tracking IT project-delivery tasks — demo / training project.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
[![CI](https://github.com/hp-liu00/testing/actions/workflows/pages.yml/badge.svg)](https://github.com/hp-liu00/testing/actions/workflows/pages.yml)
[![Live demo](https://img.shields.io/badge/demo-GitHub%20Pages-222?logo=github)](https://hp-liu00.github.io/testing/)

**Live demo:** https://hp-liu00.github.io/testing/

## Features

- **Four-column board** — Backlog, In Progress, Blocked, Done.
- **Add Task** modal with validation: title (max 80 chars), description (max 500), project / workstream, category, assignee, priority, due date (not in the past) and status, with inline error messages and character counters.
- **Move tasks** by drag and drop, or with the keyboard-accessible Move control on each card.
- **Delete** with an inline confirmation step; Escape cancels move/delete.
- **Filters** by project, assignee (text match) and priority, with a live result count and a "Clear filters" button.
- **Summary bar** showing total tasks, counts per status and overdue tasks.
- **Overdue highlighting** for tasks past their due date and not done.
- **Priority colour-coding** (Critical, High, Medium, Low) and IDs like `UOB-ITPM-0001`.
- **Optional email notification** for new tasks via [FormSubmit](https://formsubmit.co/). A failed notification only shows a warning toast and never affects the board.
- **Accessible**: ARIA labels, live regions for the summary, filter count and toasts, and focus management.
- Seeded with 8 demo tasks. State is **in memory only**, so refreshing resets the board.

## How to install

```bash
git clone https://github.com/hp-liu00/testing.git
cd testing
```

There are no dependencies, no package manager and no build step.

## How to run

Open `index.html` directly in a browser:

```bash
open index.html
```

Or serve it locally (closer to production for fetch/CORS behaviour):

```bash
python3 -m http.server
```

Then visit http://localhost:8000.

## Configuration

New-task email notifications are sent through FormSubmit. The recipient is set in one place, near the top of the script in `index.html`:

```js
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/YOUR_EMAIL@example.com";
```

1. Replace `YOUR_EMAIL@example.com` with your address. Do this in a local copy; committing a real address publishes it.
2. Add one task. FormSubmit emails an **activation link** to that address, and nothing is delivered until you click it.

FormSubmit is the app's only outbound network call; there are no analytics or third-party scripts.

## Project structure

```
index.html                    The whole app (inline CSS + JS)
CLAUDE.md                     Notes for Claude Code
.github/workflows/pages.yml   CI + GitHub Pages deployment
```

## CI/CD

GitHub Actions (`.github/workflows/pages.yml`):

- **check** (every push, pull request and manual run): parses `index.html` for HTML structure errors and scans the repository history for secrets with Gitleaks.
- **deploy** (pushes to `main` only, after `check` passes): publishes only `index.html` to GitHub Pages.

## License

No license has been chosen yet; all rights reserved by the author until one is added.
