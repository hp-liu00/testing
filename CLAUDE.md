# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

An IT PMO Kanban board delivered as a **single self-contained file**, `index.html` (inline `<style>` and `<script>`, no dependencies, no build step, no package manager, no tests). It is not a git repository.

To run it, open `index.html` in a browser (e.g. `open index.html`). For fetch/CORS behaviour closer to production, serve it locally instead: `python3 -m http.server` and visit `http://localhost:8000`.

## Architecture (all inside `index.html`)

- **State is in memory only.** A single `state` object (`tasks`, `filters`, `nextId`, `ui`) is the source of truth; nothing is persisted, so a reload resets to the seed data from `seedTasks()` (8 demo tasks with due dates relative to today).
- **Render-from-state pattern.** Every mutation (`addTask`, `moveTask`, `deleteTask`, filter changes) updates `state` and calls `renderBoard()`, which rebuilds the whole board's `innerHTML` and then calls `renderSummary()`. Don't patch DOM nodes directly; change state and re-render. Use `renderAndFocus(selector)` when a re-render must restore keyboard focus.
- **HTML is built with string concatenation.** Any user-supplied value must go through `escapeHtml()`.
- **Event delegation.** Listeners are attached once in `init()` on the board/filter containers. Card controls dispatch on `data-action` attributes (`open-move`, `do-move`, `cancel-move`, `ask-delete`, `confirm-delete`, `cancel-delete`) in `handleBoardClick`. Inline confirm/move UI is driven by `state.ui.pendingDeleteId` / `openMoveId`. Escape cancels them.
- **Drag and drop** uses the native HTML5 API. The column's `data-status` is the drop target status.
- **Reference data** (`STATUSES`, `PROJECTS`, `CATEGORIES`, `PRIORITIES`) are constants at the top of the script. They populate all selects via `populateSelects()`, and CSS classes like `prio-<priority>` derive from them.
- **Task IDs** are formatted `UOB-ITPM-0001` by `formatId()`.
- **Dates** are local `YYYY-MM-DD` strings (`toISODate`, which deliberately avoids `toISOString()` to prevent a UTC shift). "Overdue" is computed by string comparison against `todayISO()`.

## Add Task flow and email notification

- Submitting the modal form validates (`validateForm`), then adds the card **optimistically**, then POSTs to FormSubmit in `notifyNewTask()`. A notification failure only shows a warning toast and must never roll back or break the board.
- `FORMSUBMIT_ENDPOINT` (top of the script) is the **only** place the recipient email is configured. FormSubmit needs a one-time activation: the first submission emails an activation link, and nothing is delivered until it is clicked. FormSubmit can return HTTP 200 with `success: "false"`, which is treated as a failure.

## Conventions

- Styling uses CSS custom properties defined on `:root` (colors, `--sp-*` spacing, radii, shadows). Use the tokens rather than hard-coded values.
- Accessibility is deliberate: ARIA labels, `aria-live` regions (summary, filter count, toasts), `aria-invalid` plus `err-<field>` messages for validation, and focus management after re-renders. Preserve these when changing markup.
