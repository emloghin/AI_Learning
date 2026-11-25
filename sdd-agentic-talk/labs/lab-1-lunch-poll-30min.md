# Lab 1 — Lunch poll (30-minute lightning version, Spec Kit only)

Short format: 15 minutes of live demo, no Squad. Install, versions and ground rules: see `..\lab-guide.md` (A1, B1, B3). Pin Spec Kit **v1.2.5**.

**The app:** a team lunch poll — add options, everyone votes once, the winner is shown. One HTML page, data in `localStorage`.

| Time | Act | Commands |
|---|---|---|
| 0:00 | 1 Setup (2 min) | `mkdir lunch-poll; cd lunch-poll; git init; specify init --here --integration copilot; git add -A; git commit -m "chore: scaffolding"` |
| 0:02 | 2 Intent (4 min) | constitution, specify, clarify (vote the twist) |
| 0:06 | 3 Design (3 min) | plan, tasks |
| 0:09 | 4 Build (4 min) | `/speckit-implement` |
| 0:13 | 5 Change (2 min) | clarify + converge |

## Prompts

```text
/speckit-constitution Principles for a tiny internal web tool: no frameworks, no build step,
semantic HTML and keyboard use, no personal data and no external services, pure logic covered by node --test.
```

```text
/speckit-specify Build a lunch poll for a team of up to 12 people on one shared screen.
Anyone can add an option (max 60 characters). Each person has one vote, which they can move to another option.
The option with most votes is highlighted. Options show their vote count. A "New poll" button clears everything after confirmation.
The poll survives a page reload.
```

```text
/speckit-plan Plain HTML, CSS and JavaScript (index.html, styles.css, app.js). localStorage for data.
Poll logic in a module without DOM access, tested with node --test.
```

```text
/speckit-tasks
```

```text
/speckit-implement
```

## Twist vote (add with `/speckit-clarify`)

| Option | Requirement |
|---|---|
| A Dietary tags | Each option can be tagged vegetarian or vegan; a filter shows only tagged options. |
| B Tie-breaker | When votes are equal at the top, a "Pick for us" button chooses one of the tied options at random and shows which. |
| C Price cap | Options have an optional price; a maximum-price field hides options above it. |
| D Dark mode | A dark mode toggle that is remembered after reload. |

## Act 5 — change

```text
/speckit-clarify Add: a poll can be closed; after closing, votes can no longer change and the winner stays highlighted.
```

Then `/speckit-converge`, implement the gap tasks, rerun until converged. Show `git diff` with `spec.md` first.

## Plan B

- Command not found: type `/speckit` and pick from the list (names changed between versions).
- Phase over 2 minutes: `git switch` to a pre-baked branch (`act2-done`, `act3-done`, `act4-done`).
- No Copilot access: walk through the committed spec, plan and tasks of the rehearsal.

## Attendee follow-up

Run the same flow on your own toy idea in 30 minutes. Done when `node --test` passes and you can name one thing the clarify step caught.
