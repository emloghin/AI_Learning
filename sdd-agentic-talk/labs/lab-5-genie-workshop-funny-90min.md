# Lab 5 — The Genie Workshop (funny, competitive, 90 minutes)

*Be careful what you wish for.* An AI agent is a very fast, very literal genie: it grants exactly what you said, not what you meant. Teams of 2–3 play four rounds, collect points and learn why specs beat prompts. Install and versions: `..\lab-guide.md` (B1, B3). Spec Kit **v1.2.5**, Node 22.5+, git, Copilot. Synthetic content only; throwaway folder, so `--yolo` is fine.

**You learn:** ambiguity hurts (Round 1), `clarify` finds it (Round 2), `analyze` and testable wording catch contradictions (Round 3), and you fix the **spec**, not the code (Round 4).

## Pick your cursed app

| | App | Why it is funny |
|---|---|---|
| A | **Cat tracker** — which office cat sat on which keyboard, and when | Cats are not data; "sat on" has no definition |
| B | **Excuse generator** — believable reasons for being late to stand-up | "Believable" is not testable |
| C | **Coffee queue** — fair order for the single coffee machine | "Fair" starts wars |
| D | **Meeting bingo** — a card of phrases, tick them during meetings | Who decides a phrase was said? |

## Run of show

| Time | Round | Points |
|---|---|---|
| 0:00 | Briefing, teams, install check (10 min) | — |
| 0:10 | **Round 1 — The Wish** (10 min) | Genie points |
| 0:20 | **Round 2 — The Spec** (15 min) | Assumption bingo |
| 0:35 | **Round 3 — Sabotage** (15 min) | Saboteur vs inspector |
| 0:50 | **Round 4 — Bug court and rebuild** (20 min) | Spec lawyer |
| 1:10 | Awards and debrief (10 min) | — |
| 1:20 | Take-home challenge, Q&A (10 min) | — |

## Round 1 — The Wish (10 min)

No Spec Kit yet. In an empty folder, ask Copilot like a bad boss:

```text
Make me a <your app>. Make it fast, modern and user-friendly. Just do it, no questions.
```

Run what it built (one page, no install). Screenshot the **most literal or ridiculous** thing it did.

**Scoring:** +1 for every behaviour you did not ask for and do not want, +2 if it made the whole room laugh (the presenter judges). Write the list on the board: this is your *assumption debt*.

> **Learning moment:** each surprise is a decision the agent made **for you** and wrote down nowhere.

## Round 2 — The Spec (15 min)

```powershell
mkdir <app>-spec; cd <app>-spec; git init
specify init --here --integration copilot
git add -A; git commit -m "chore: scaffolding"
```

```text
/speckit-constitution Three principles for a silly but serious internal tool: plain HTML/CSS/JS with no build step,
every rule must be testable (no words like fast, easy, modern, fair, believable without a number or an example),
and pure logic is tested with node --test.
```

```text
/speckit-specify <describe your app in 4–6 sentences, with at least one rule that needs a number>
```

Then `/speckit-clarify` and answer **as a team**, out loud. **Assumption Bingo:** before clarify runs, each team writes down 3 questions it expects. +2 for each question clarify really asked, +1 for each gap you find yourselves in `spec.md`.

### The weasel-word translator

| Weasel word | Say this instead |
|---|---|
| fast | "the list appears in under 200 ms for 100 items" |
| easy / user-friendly | "a new user adds an item in 2 clicks, no instructions" |
| modern | delete it, or name the exact design rule |
| fair | "everyone gets a turn before anyone gets a second one" |
| believable | "the excuse mentions one cause, one place, and is under 140 characters" |
| etc. / and so on | write the full list |

## Round 3 — Sabotage (15 min)

Swap **spec folders** with another team (copy `specs\` over, or push to a shared repo). Each team becomes the **saboteur** of the other's spec:

1. Add **one sneaky flaw** to `spec.md` — a contradiction, a weasel word, or an edge case that breaks another rule. Examples:
   - "Every action asks for confirmation" **and** "Deleting must take one click".
   - "The list is sorted fairly".
   - "Maximum 5 items" in one section, "unlimited items" in another.
2. Hand it back. The owners run `/speckit-analyze` and read the report like detectives.

**Scoring:** inspector +3 if the flaw is found (by analyze or by eye) and named correctly, saboteur +3 if it slips through. The owners must then repair the spec.

> **Learning moment:** `analyze` is a read-only consistency check — it finds contradictions between spec, plan and tasks, but it cannot read your mind. Wording that can be tested is wording that can be checked.

## Round 4 — Bug court and rebuild (20 min)

```text
/speckit-plan Plain HTML, CSS and JavaScript (index.html, styles.css, app.js), localStorage; logic in a module without DOM access, tested with node --test.
```

```text
/speckit-tasks
```

```text
/speckit-implement
```

Open the app and **hunt for a bug** in another team's build (3 minutes). Then hold **bug court**:

1. The finder presents the bug in one sentence.
2. The owners answer: *"Which sentence of our spec should have prevented this?"* If none: the spec is guilty.
3. Write the missing requirement, add it with `/speckit-clarify`, run `/speckit-converge`, implement the gap tasks.

**Scoring:** finder +2 per real bug; owners +3 when they fix it by changing the spec first (show `git diff`: `spec.md` before code), −2 if they patch the code by hand.

## Awards (10 min)

| Award | Goes to |
|---|---|
| **The Literal Genie** | funniest Round 1 result |
| **Bingo Master** | most clarify questions predicted |
| **Sneakiest Saboteur** | flaw that survived `analyze` |
| **Spec Lawyer** | best bug-court argument |
| **Gold Spec** | team with the highest total |

Debrief questions, one minute each: *Which Round 1 surprise would have hurt in production? Which word did you ban for good? What did `analyze` miss?*

## Scoreboard

| Team | R1 | R2 | R3 | R4 | Total |
|---|---|---|---|---|---|
| | | | | | |

## Trainer notes

- Prepare a Round 1 example yourself (a coffee queue "make it fair" result) to show what funny looks like.
- Pre-bake branches `round2-done` to `round4-done`; keep a zipped copy for outages.
- Never use real names, customers or data in apps and flaws: cats and coffee only.
- If an agent misbehaves, celebrate it: it is Round 1 material.

## Take-home challenge

Find **one weasel word** in a real user story or ticket this week, rewrite it so it can be tested, and share the before and after in your team channel.
