# Lab 1 — The Great Fridge Heist (30-minute lightning talk, Spec Kit only)

> *Somebody on this floor keeps eating other people's yoghurt. In 30 minutes we build the app that ends it — the way a heist crew works: blueprint first, break-in second.*

Companion deck: `lab-1-30min-lightning.pptx` (14 slides). Format: 15 minutes of talk wrapped around **15 minutes of live demo**. No Squad — Spec Kit only. Everything is synthetic: no real names, no real data.

**The demo app — FridgeWatch:** a single-page tracker for the office fridge. Colleagues label an item with a shelf, a team alias and a best-before date. Cards turn amber 24 hours before expiry and red after it. A "Friday purge" lists expired items and removes them after one confirmation. Plain HTML/CSS/JS, data in `localStorage`, logic tested with `node --test`.

---

## 1. Pinned versions

| Tool | Version | Check |
|---|---|---|
| GitHub Spec Kit (`specify` CLI) | **v1.2.5** | `specify version` |
| GitHub Copilot (VS Code Agent mode or Copilot CLI) | current, same model as rehearsal | — |
| Python + uv | 3.11+ / current | `python --version`, `uv --version` |
| Node.js | 22+ (for `node --test`) | `node --version` |
| git | current | `git --version` |

```powershell
uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git@v1.2.5
specify version
```

> Command names changed between versions (`/speckit.specify` in older material, `/speckit-specify` now). Type `/speckit` in chat and pick from the list if in doubt.

---

## 2. The crew (slide 4) — memorise this mapping

| Heist role | Command | Writes | Used live? |
|---|---|---|---|
| The Mastermind — crew rules that never bend | `/speckit-constitution` | `.specify/memory/constitution.md` | yes |
| The Architect — what we steal and why | `/speckit-specify` | `specs/001-*/spec.md` | yes |
| The Inside Man — asks the awkward questions | `/speckit-clarify` | updates `spec.md` | yes (bingo) |
| The Planner — tools and getaway route | `/speckit-plan` | `plan.md`, `data-model.md` | yes |
| The Quartermaster — the numbered checklist | `/speckit-tasks` | `tasks.md` (`[P]` = parallel) | yes |
| The Lookout — read-only contradiction check | `/speckit-analyze` | report only | cameo (the trap) |
| The Safecracker — the actual break-in | `/speckit-implement` | code + tests | yes |
| The Cleaner — spec changed? closes the gaps | `/speckit-converge` | gap tasks in `tasks.md` | yes (getaway) |

---

## 3. Run of show (30 minutes)

| Time | Slide | What happens | Room activity |
|---|---|---|---|
| 0:00 | 1 | Welcome, the yoghurt crime | — |
| 0:01 | 2 | "Heist movies have a blueprint scene" | Show of hands: agent built the wrong thing? |
| 0:03 | 3 | Case file #001: the 14-word prompt vs 17 silent decisions | Shout one more unasked question |
| 0:06 | 4 | Meet the crew | — |
| 0:08 | 5 | The blueprint in four boxes | Spot the numbers |
| 0:10 | 6–7 | Switch to VS Code; heist clock on second screen | — |
| 0:10 | — | **Recon** (2 min) | — |
| 0:12 | 8 | **Blueprint** (5 min) — clarify bingo | Pick 3 squares, shout "Heist!" |
| 0:15 | 9 | Twist vote (inside Blueprint) | Hands up A/B/C/D |
| 0:17 | — | **Rehearsal** (3 min) — plan + tasks | — |
| 0:20 | 10 | **Break-in** (3 min) — implement; alibi check while it runs | Rewrite shaky sentences |
| 0:23 | — | **Getaway** (2 min) — change + converge | — |
| 0:24 | 11 | Plan the heist or buy a yoghurt? | — |
| 0:26 | 12 | Your first job on Monday | Type 10/30/60 in chat |
| 0:28 | 13–14 | Questions | Bug bounty |

---

## 4. The heist, act by act (copy-paste prompts)

### Act 1 — Recon (2 min)

```powershell
mkdir fridgewatch; cd fridgewatch
git init
specify init --here --integration copilot
git add -A; git commit -m "chore: spec kit scaffolding"
code .
```

Point at `.specify/` (memory, scripts, templates) and `.github/skills/speckit-*`. One line: *"No magic: templates, scripts and Markdown instructions for Copilot."*

### Act 2 — Blueprint (5 min)

**The Mastermind** — paste in Copilot Chat (Agent mode):

```text
/speckit-constitution Crew rules for a tiny internal web tool:
- Simplicity: no frameworks, no build step, no backend.
- Privacy: never store personal data. Only a team alias (max 12 characters) identifies an owner. No names, emails or person-level logs.
- Accessibility: semantic HTML, keyboard-only use, colour is never the only signal (amber/red also show a text label).
- Testability: all date and shelf logic lives in a pure module without DOM access, covered by node --test.
- Any deviation from these rules must be written down with a reason.
```

**The Architect** — paste:

```text
/speckit-specify Build FridgeWatch, a tracker for one shared office fridge.
The fridge has 4 shelves with 6 slots each. A colleague adds an item with: a name (max 40 characters),
a shelf (1-4), a team alias (max 12 characters) and a best-before date.
Items are shown per shelf. An item turns amber 24 hours before its best-before date and red once it has passed,
with a text label "expires soon" or "expired".
A "Friday purge" button lists all expired items and removes them after one confirmation.
An owner can remove their own item at any time. Data survives a page reload. Used on one shared screen in the kitchen.
```

Open `specs/001-*/spec.md` and scroll: user stories, Given/When/Then scenarios, FR-numbers, `[NEEDS CLARIFICATION]` markers.

**Clarify bingo (slide 8)** — before running, everyone picks 3 of the 9 squares:

| | | |
|---|---|---|
| Can an item have no best-before date? | Who may delete someone else's item? | What timezone is "today"? |
| Is "amber" < 24 h or < 48 h? | **FREE: "use reasonable defaults"** | Purge only on Fridays, or any day? |
| Max items per person? | What happens when a shelf is full? | Is the team alias required? |

```text
/speckit-clarify
```

When a square is hit, people mark it. First line of three shouts **"Heist!"** and answers the next clarify question for the room. Suggested answers if nobody wins: date is required; anyone may purge expired items but only the owner removes a fresh one; local browser time; purge works any day but the button is highlighted on Fridays; a full shelf refuses the item and suggests the next shelf with a free slot.

**The twist vote (slide 9)** — count hands, then paste the winner:

| Option | Paste after `/speckit-clarify Add this requirement from the team vote:` |
|---|---|
| A Shelf map | A 4 × 6 grid shows every slot; empty slots are dashed; expired slots blink once per second unless the user prefers reduced motion. |
| B Allergen flags | Items can carry nuts, lactose and gluten flags; a filter hides flagged items. |
| C Up for grabs | An owner can mark an item "free"; it moves to a public "up for grabs" list and is never purged before someone takes it. |
| D Suspect log (the trap) | Record which person removed each item, with a timestamp, so we know who ate the yoghurt. |

**If D wins (it usually does):** add it, then run the Lookout:

```text
/speckit-analyze
```

It should flag a conflict with the privacy principle ("no person-level logs"). Say: *"The Mastermind's rules beat a popular vote — and we found out before a single line of code."* Then replace D with the runner-up:

```text
/speckit-clarify Remove the suspect log requirement; it violates the constitution's privacy rule. Instead add: <runner-up text>.
```

> If analyze does not flag it on the day, that is a teaching moment too: point at the constitution line and ask the room "who should have caught this?" — the answer is the reviewer, i.e. you.

Commit: `git add -A; git commit -m "spec: fridgewatch blueprint"`.

### Act 3 — Rehearsal (3 min)

```text
/speckit-plan Plain HTML, CSS and JavaScript: index.html, styles.css, app.js. No frameworks, no build step.
Store data in localStorage under one key. Put expiry classification, shelf capacity and purge selection
in fridge.js as pure functions with no DOM access, and test them in fridge.test.js with node --test.
Treat "now" as a parameter so tests can freeze time.
```

Open `plan.md` → the **constitution check** section. Then:

```text
/speckit-tasks
```

Open `tasks.md`: phases (Setup, Foundational, one per user story, Polish) and `[P]` tasks. Commit.

> **Teach it:** "Treat now as a parameter" is the single most valuable line in the plan. Without it, every expiry test is flaky at midnight. Ask the room why.

### Act 4 — Break-in (3 min)

```text
/speckit-implement
```

While it works, flip to **slide 10 — Alibi check**. Read a shaky sentence, let the room rewrite it, then reveal the testable version. When it finishes:

```powershell
node --test
start index.html
```

Add three items: "Greek yoghurt" (shelf 2, team alias `Kraken`, best-before tomorrow → amber), "Leftover lasagne" (shelf 1, `Otters`, yesterday → red), "Hummus" (shelf 2, `Kraken`, next week). Reload. Run the purge. Show the twist. Commit.

### Act 5 — Getaway (2 min)

Change the intent, not the code:

```text
/speckit-clarify Add: a shelf holds at most 6 items. Adding a 7th is refused with the message
"Shelf N is full — try shelf M", where M is the nearest shelf with a free slot, or "Fridge full" if none.
```

```text
/speckit-converge
```

It appends gap tasks to `tasks.md`. Run `/speckit-implement`, rerun `/speckit-converge` until converged (or show the pre-baked result). Finish with:

```powershell
git log --stat -3
```

> **Closing line:** "Next month a new colleague reads 70 lines of blueprint instead of reverse-engineering 350 lines of JavaScript."

---

## 5. Interactive exercises (teach more than the tool)

1. **Count the silent decisions (slide 3, 2 min).** Before the reveal, pairs list every decision the 14-word prompt leaves to the agent. Most pairs find 8–10; the rehearsal code made 17. Lesson: *every missing sentence is a decision you delegated without noticing.*
2. **Clarify bingo (slide 8).** Lesson: clarify is a question generator for *you*; squares nobody picked are blind spots in your own spec reading.
3. **The trap vote (slide 9).** Lesson: the constitution is not decoration — it is the rule that outranks the backlog, and `/speckit-analyze` enforces it early.
4. **Alibi check (slide 10).** Lesson: *no number, no test, no alibi.* Rewrite rule: add a quantity, a trigger and an observable result.
5. **Bug bounty (Q&A).** Anyone who finds a real bug in the generated app writes the requirement that would have prevented it. Best one becomes the next `/speckit-clarify` line.

---

## 6. Plan B

| Problem | Recovery |
|---|---|
| Command not recognised | Type `/speckit`, pick from the list; check `specify version` |
| Clarify asks more than 3 questions | Answer two, then "use reasonable defaults for the rest" (the free bingo square!) |
| Any act runs 60 s over the heist clock | `git switch act2-done` / `act3-done` / `act4-done` and narrate |
| Tool approval prompts every few seconds | Approve for the session; say why you would not auto-approve on a real repo |
| Analyze misses the trap | Point at the constitution yourself — "the reviewer is the last Lookout" |
| App has a visible bug | Celebrate it: write the requirement, `/speckit-clarify`, `/speckit-converge` |
| No network / no Copilot | Walk through the committed rehearsal: `git log`, spec → plan → tasks → code |

Pre-bake the branches during your second rehearsal:

```powershell
git switch -c act2-done   # after constitution + specify + clarify (+ twist)
git switch -c act3-done   # after plan + tasks
git switch -c act4-done   # after implement, tests green
git switch -c act5-done   # after shelf-capacity change converged
```

---

## 7. Trainer notes

- **Rehearse twice on the demo laptop** and replace the numbers on slides 3, 7 and 11 (17 decisions, 4 questions, ≈70 spec lines, ≈20 tasks, ≈350 code lines, ≈11 minutes) with *your own* rehearsal numbers. They are illustrative, not benchmarks.
- Screen: VS Code zoom 175%, terminal 18 pt, light theme, notifications off. Heist clock (slide 7) on the second screen.
- Keep the same Copilot model as in rehearsal; implement/converge use premium requests.
- Team aliases in the demo (`Kraken`, `Otters`, `Pelicans`) are deliberately non-personal — reinforce that while typing.
- Humour budget: one yoghurt joke per act, maximum. The trap vote is the big laugh; do not spoil it before the hands go up.
- If you run long, drop the alibi check reveal (leave the slide up silently) — never drop the getaway; it is the payoff.

---

## 8. Attendee follow-up — the 60-minute solo heist

Rebuild FridgeWatch on your own, then make it yours.

| Minutes | Do | Done when |
|---|---|---|
| 0–5 | Install pinned `specify`, `specify init --here --integration copilot` | You can name every folder created |
| 5–20 | Constitution + specify + clarify with the prompts above; pick a *different* twist than the room | `spec.md` has no `[NEEDS CLARIFICATION]` left |
| 20–30 | Plan + tasks + `/speckit-analyze` | You changed at least one line in `plan.md` by hand |
| 30–50 | `/speckit-implement` | `node --test` is green; three test items behave as described |
| 50–60 | Add the shelf-capacity change; converge | `/speckit-converge` reports converged |

**Stretch goals:** a "move item" action that respects capacity; a `?today=2026-11-06` URL parameter to demo the Friday purge on any day; swap the plan to another stack and keep `spec.md` untouched — then diff.

**Share:** post in the team channel one question clarify asked that you would never have thought of.

### Ground rules

- Synthetic or sanitised data only — no customer data, personal data, secrets or credentials in prompts, specs or logs; everything lands in git.
- Throwaway repository for experiments; review every artefact before the next command. The agent drafts; you sign the blueprint.

Sources: <https://github.com/github/spec-kit> · <https://github.github.io/spec-kit/> · main guide `..\lab-guide.md`.
