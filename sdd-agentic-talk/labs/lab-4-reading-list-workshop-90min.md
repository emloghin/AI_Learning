# Lab 4 — Reading list (90-minute hands-on workshop, pairs)

Attendees do the work; the presenter walks the room. Spec Kit only, Squad is a stretch goal. Install and versions: `..\lab-guide.md` (B1, B3).

**Before the session (send 2 days ahead):** install Spec Kit **v1.2.5**, Node 22.5+, git and Copilot; run `specify version` and `copilot --version`. Pairs share one laptop: one drives, one reviews; swap after every step.

| Time | Block |
|---|---|
| 0:00 | Slides: why prompting harder fails, Spec Kit in ten minutes (15 min) |
| 0:15 | Step 1 Setup (10 min) |
| 0:25 | Step 2 Intent (15 min) |
| 0:40 | Step 3 Design (15 min) |
| 0:55 | Step 4 Build (15 min) |
| 1:10 | Step 5 Change (5 min) |
| 1:15 | Show and tell: each pair shows one thing (10 min) |
| 1:25 | Guardrails, 7-day challenge, Q&A (5 min) |

Each step has a **done when**. If you are not done at the timer, take the presenter's branch `stepN-done` and move on.

## Step 1 — Setup (10 min)

```powershell
mkdir reading-list; cd reading-list
git init
specify init --here --integration copilot
git add -A; git commit -m "chore: scaffolding"
code .
```

**Done when:** you can say in one sentence what `.specify\` and `.github\skills\` contain.

## Step 2 — Intent (15 min)

```text
/speckit-constitution Principles for a small personal web tool: no frameworks, no build step, semantic HTML and keyboard use,
data stays in the browser, pure logic tested with node --test. Deviations must be written down with a reason.
```

```text
/speckit-specify Build a personal reading list. I can add a book (title required, author optional),
mark it as read, delete it, and see how many books are read. The list survives a page reload.
Empty titles and titles over 120 characters are rejected with a clear message.
```

Now choose your **twist** — each pair a different one if possible — and add it with `/speckit-clarify`:

| Option | Requirement |
|---|---|
| A Tags | Free tags on every book; a filter shows books with a chosen tag. |
| B Status | Status is want to read, reading or finished (replaces the read flag); the list can be filtered by status. |
| C Rating | A one-to-five star rating for finished books; the list can be sorted by rating. |
| D Backup | Export the list as a JSON file and import it back; invalid files are rejected without changing the list. |

Answer clarify's questions yourselves. **Done when:** `spec.md` has your twist and no `[NEEDS CLARIFICATION]` markers left.

## Step 3 — Design (15 min)

```text
/speckit-plan Plain HTML, CSS and JavaScript (index.html, styles.css, app.js), localStorage for data.
List logic in a module with no DOM access, tested with node --test.
```

`/speckit-tasks`, then `/speckit-analyze`. Review `plan.md` and `tasks.md` **like a pull request**: change at least one thing you disagree with (a file name, a test approach, a task order) and say why.

**Done when:** you changed one decision and committed.

## Step 4 — Build (15 min)

```text
/speckit-implement
```

Open `index.html`, add three books, reload, try your twist, then `node --test`.

**Done when:** the app runs and the tests pass. Write down one thing that went wrong or surprised you.

> **Stretch (fast pairs):** `npm install -g @bradygaster/squad-cli@1.1.0`, `squad init`, `copilot --agent squad`, and ask the coordinator to take the remaining tasks. Read `.squad/decisions.md` afterwards.

## Step 5 — Change (5 min)

```text
/speckit-clarify Add: every action works with the keyboard only, and the focused book is clearly visible.
```

`/speckit-converge`, implement the gap tasks. **Done when:** converge reports no gaps, or you have listed what is left.

## Show and tell (10 min)

Each pair, 60 seconds: *the twist you chose, the decision you changed in the plan, one thing the agent got wrong.*

## Trainer notes

- Pre-bake `step1-done` to `step5-done` on a branch each and share a zip, for pairs who fall behind or for a Copilot outage.
- Use synthetic data only. `--yolo` is fine on this throwaway folder; say why not for real projects.
- Keep a slide with the command list visible; names differ between Spec Kit versions (`/speckit` shows what is installed).
- Walk the room at every timer; the most common blocker is a command name or a missing tool approval.

## Take-home

Finish whatever you missed, then continue with the 7-day challenge in `..\lab-guide.md` (B2).
