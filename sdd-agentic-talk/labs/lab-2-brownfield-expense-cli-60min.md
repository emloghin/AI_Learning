# Lab 2 — Brownfield: one change to an existing expense CLI (60 minutes, Spec Kit + Squad)

Same 60-minute format as the main lab, but the code already exists. Install and versions: `..\lab-guide.md` (A1). Official reference: the Spec Kit [existing projects guide](https://github.github.io/spec-kit/guides/existing-projects.html).

## Prepare the base repo (day before)

A small Node CLI, about 150 lines, **synthetic data only**:

- `expense add <amount> <category> [note]`, `expense list`, `expense total` — stored in `expenses.json`.
- Files: `src/store.js` (read/write), `src/commands.js`, `bin/expense.js`, `test/store.test.js`.
- Two or three passing tests (`node --test`). Commit it as `main`.

Pre-bake branches after rehearsal: `act2-done`, `act3-done`, `act4-done`.

## Run of show

| Act | Min | What |
|---|---|---|
| 1 Baseline | 5 | Clean `git status`, then init **in place** |
| 2 Intent | 8 | Constitution from the real code, specify one slice, vote the twist |
| 3 Design | 7 | Plan against existing modules, tasks, analyze |
| 4 Build | 10 | Squad changes only the files the plan names |
| 5 Change | 5 | New rule into the spec, converge |

### Act 1 — Baseline

```powershell
cd expense-cli
git status                      # must be clean
specify init --here --force --integration copilot
git add -A; git commit -m "chore: spec kit scaffolding"
```

> **Talking point:** "Spec Kit adds files; it does not touch `src/`. `git diff --stat` proves it."

### Act 2 — Intent

```text
/speckit-constitution Read this repository and write principles that match how it is built today:
plain Node with no dependencies, small modules in src/, tests with node --test, JSON file storage.
Add: new code must follow the existing module structure, and every change needs tests.
```

```text
/speckit-specify Add a monthly summary to the expense CLI. "expense summary 2026-10" prints, for that month,
the total per category and the grand total, sorted by total descending. A month without expenses prints
"No expenses" and exits with code 0. An invalid month format exits with code 1 and a clear message.
```

Twist vote, added with `/speckit-clarify`:

| Option | Requirement |
|---|---|
| A Category filter | `--category <name>` limits the summary to one category. |
| B CSV export | `--csv <file>` also writes the summary to a CSV file. |
| C Currency | Each expense may carry a currency (EUR or RON); the summary shows one total per currency, never mixes them. |
| D Budget alert | `expense budget <category> <amount>` sets a limit; the summary marks categories over their limit. |

### Act 3 — Design

```text
/speckit-plan Reuse src/store.js for reading data and add the summary logic as a pure function in a new src/summary.js.
Register the command in src/commands.js. Do not change the storage format. Tests in test/summary.test.js.
```

Open `plan.md` and check the **constitution check** section. Then `/speckit-tasks` and `/speckit-analyze`.

> **Brownfield tip:** if the plan wants to rewrite existing modules, that is a finding — push back in the plan prompt and regenerate.

### Act 4 — Build with Squad

```powershell
$env:SPECIFY_FEATURE_NO_PERSIST = "1"
squad init
copilot --agent squad
```

```text
Team, implement specs/001-monthly-summary/ (spec.md, plan.md, tasks.md). Change only the files named in plan.md.
Do not modify existing tests. Tick tasks in tasks.md as you finish them. Run "node --test" before reporting done.
Record deviations from the plan in .squad/decisions.md.
```

Check: `git diff --stat main` lists only the files from the plan.

Fallbacks: `/speckit-implement`, or `git switch act4-done`.

### Act 5 — Change

```text
/speckit-clarify Add: amounts with more than two decimals are rejected by "expense add" with a clear message.
```

Then `/speckit-converge`. This one touches **old** code — a good moment to show why the spec has to cover existing behaviour, not only the new slice.

## Plan B

| Problem | Recovery |
|---|---|
| Agent edits unrelated files | Revert them, add "change only files named in plan.md" to the prompt, rerun |
| Existing tests break | Show it as the value of the constitution rule "do not modify existing tests"; fix with a new task |
| Squad off-script | `@Name, implement T003`, or `/speckit-implement` |

## Attendee follow-up

Pick **one bounded change** in a real repo (sanitised, a branch, no secrets). Baseline commit, `specify init --here --force`, constitution from your real standards, one spec. Done when the diff touches only what the plan named.
