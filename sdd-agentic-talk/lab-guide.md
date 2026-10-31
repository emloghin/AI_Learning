# Specs made for agents — demo runbook and lab guide

Companion to `spec-kit-squad-talk.pptx`. Part A is the presenter's runbook for the 60-minute session (35 minutes of live demo). Part B is the hands-on guide colleagues can follow afterwards.

Facts checked on 31 October 2026 against the official repositories and docs (sources at the end). Both tools release often — **rehearse on the exact versions you will demo**.

---

## Part A — Presenter runbook

### A1. Versions and prerequisites

| Tool | Version to pin | Check |
|---|---|---|
| GitHub Spec Kit (`specify` CLI) | v1.2.5 (28 Oct 2026) | `specify version` |
| Squad (`@bradygaster/squad-cli`) | v1.1.0 stable (20 Oct 2026) — avoid the v2 previews for a live demo | `squad --version` |
| GitHub Copilot CLI | current | `copilot --version` |
| Python | 3.11+ | `python --version` |
| uv | current | `uv --version` |
| Node.js | 22.5+ (Squad requirement) | `node --version` |
| git, GitHub CLI (`gh`) | current; `gh auth login` done | `gh auth status` |
| VS Code with GitHub Copilot | current | — |

> **On your laptop today:** `specify` reports **0.13.0**, far behind 1.2.5 (the `--integration` flag and the skill-style commands are newer), and Squad is **not installed**. Upgrade and install before the first rehearsal.

```powershell
# Spec Kit, pinned
uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git@v1.2.5
specify version
specify self check          # tells you if a newer release exists

# Squad
npm install -g @bradygaster/squad-cli@1.1.0
squad --version
squad doctor
gh auth login
```

### A2. The day before

1. **Rehearse twice, end to end, on the demo laptop.** Time each act. Nothing official is published about how long each phase takes; your rehearsal numbers are the only reliable ones.
2. **Pre-bake recovery branches.** During the second rehearsal, commit after every act and create a branch, so you can jump ahead if a step stalls:
   ```powershell
   git switch -c act2-done   # after constitution + spec + clarify
   git switch -c act3-done   # after plan + tasks
   git switch -c act4-done   # after a working app
   git switch -c alt-plan-react   # optional: same spec, plan regenerated for React + Vite
   ```
   Push them to a private repo or keep a zipped copy of the folder on the desktop.
3. **Screen setup.** VS Code zoom at 150–175%, terminal font 18pt+, light theme for projectors, notifications off (Teams, Outlook, Windows Focus Assist on), browser tabs closed, runbook on a second screen.
4. **Model and budget.** Pick the Copilot model you rehearsed with and keep it. Implement/converge loops consume premium requests; check your remaining budget.
5. **Data.** Only synthetic content. Everything Spec Kit and Squad write (specs, decisions, logs) lands in git.
6. **Auto-approval.** Decide in advance whether you use `--yolo` / allow-all-tools. For a live demo on a throwaway repo it saves time; say so out loud and explain why you would not do it on a real project.

### A3. Run of show (60 minutes)

| Time | Slide | What happens |
|---|---|---|
| 0:00 | 1–3 | Welcome, agenda, hook question (show of hands) |
| 0:04 | 4–5 | From autocomplete to agent teams; vibe coding vs spec-driven |
| 0:09 | 6–7 | Spec Kit flow and the files it creates |
| 0:14 | 8–9 | Squad, and how we combine the two |
| 0:17 | 10–11 | Switch to the demo; show the five-act map |
| 0:17 | — | **Act 1 Setup** (3 min) |
| 0:20 | 12 | **Act 2 Intent** (8 min), including the twist vote |
| 0:28 | — | **Act 3 Design** (7 min) |
| 0:35 | — | **Act 4 Build** (10 min) |
| 0:45 | — | **Act 5 Change** (7 min) |
| 0:52 | 13–15 | Shines/hurts, guardrails, six ideas |
| 0:58 | 16–17 | 7-day challenge, Q&A |

### A4. The demo, act by act

The app: a **sprint retrospective board** — three columns (Went well · To improve · Actions), add and delete cards, data kept in the browser. Small, familiar to every developer, and done in one HTML page.

#### Act 1 — Setup (3 min)

```powershell
mkdir retro-board; cd retro-board
git init
specify init --here --integration copilot
git add -A; git commit -m "chore: spec kit scaffolding"
code .
```

Show in the explorer: `.specify/` (memory, scripts, templates) and `.github/skills/speckit-*`. One sentence each — do not read file contents yet.

> **Talking point:** "Nothing in here is magic. It is templates, a few scripts and Markdown instructions for Copilot."

#### Act 2 — Intent (8 min)

Open Copilot Chat in **Agent** mode (or Copilot CLI) and type `/speckit` to show the command list. In current versions the commands are skills named `/speckit-constitution`, `/speckit-specify` and so on; older material shows `/speckit.specify`.

**Constitution** — paste:

```text
/speckit-constitution Create principles for a small internal web tool:
- Simplicity first: no frameworks and no build step unless the plan justifies it.
- Accessibility: keyboard-usable, sufficient colour contrast, semantic HTML.
- Privacy: no personal data, no external services, data stays in the browser.
- Testability: pure logic is covered by automated tests.
- Every decision that deviates from these principles must be written down with a reason.
```

**Specify** — paste:

```text
/speckit-specify Build a sprint retrospective board for a team of up to 10 people.
The board has three columns: "Went well", "To improve" and "Actions".
Anyone can add a short card (max 200 characters) to a column, edit it, or delete it.
Cards show when they were created. The board survives a page reload.
A "New retro" button clears the board after a confirmation.
This is used in a single browser on a shared screen during the retro meeting.
```

While it runs, ask the room: *"What do you think it will ask us?"* Then open `specs/001-.../spec.md` and scroll: user stories, acceptance scenarios, functional requirements, and **[NEEDS CLARIFICATION]** markers if it found gaps.

**Vote (slide 12)** — switch to the slide, count hands, then add the winning twist:

```text
/speckit-clarify Also add this requirement from the team vote: <winning option>.
```

| Option | Text to paste as the requirement |
|---|---|
| A Dark mode | A dark mode toggle; the choice is remembered after reload. |
| B Export | An "Export" button that copies the board as a Markdown summary, grouped by column. |
| C Timebox | A 5-minute countdown per column, started manually, with a visible and accessible alert at zero. |
| D Dot-voting | Each person can place three votes on cards in "To improve"; votes are anonymous and cards can be sorted by votes. |

Answer clarify's questions out loud with the audience ("Should cards be editable after voting? Show of hands…"). Commit.

> **Fallback:** if clarify asks more than three questions, answer the first two and say "use reasonable defaults for the rest". If anything stalls: `git switch act2-done`.

#### Act 3 — Design (7 min)

```text
/speckit-plan Use plain HTML, CSS and JavaScript in a single page (index.html, styles.css, app.js).
No frameworks, no build step. Store data in localStorage.
Keep board logic in a separate module with no DOM access, and test it with Node's built-in test runner (node --test).
```

Open `plan.md`: point to the **constitution check** section and to `data-model.md`. Then the stack-swap moment:

> **Talking point:** "If the architect says 'we use React and Vite here', I change one sentence in the plan prompt and keep the spec untouched." Show `git diff act3-done alt-plan-react -- specs/` (pre-baked) instead of regenerating live.

```text
/speckit-tasks
```

Open `tasks.md`: phases (Setup, Foundational, one phase per user story, Polish), and tasks marked **[P]** that can run in parallel.

Optional if you are on time:

```text
/speckit-analyze
```

It is read-only and reports inconsistencies between spec, plan and tasks — a nice "AI reviewing AI" moment. Commit.

#### Act 4 — Build with Squad (10 min)

> **Honest label:** there is no official Spec Kit + Squad integration. This is the experiment. Rehearse it; if it misbehaves on the day, switch to `/speckit-implement` (fallback below) and say why.

Cast the team (it asks a few questions about the project; keep answers short) and start the coordinator in Copilot CLI:

```powershell
$env:SPECIFY_FEATURE_NO_PERSIST = "1"   # parallel agents must not overwrite .specify/feature.json
squad init
copilot --agent squad
```

Paste to the coordinator:

```text
Team, implement the feature described in specs/001-retro-board/ (spec.md, plan.md, tasks.md).
Work through tasks.md phase by phase. Tasks marked [P] may run in parallel.
Respect .specify/memory/constitution.md. Mark each task [X] in tasks.md when it is done.
Record any decision that deviates from the plan in .squad/decisions.md.
Run the tests with "node --test" before you report a phase as finished.
```

While it works, narrate on screen:

- the cast names and who picked which task;
- `.squad/decisions.md` filling up;
- `tasks.md` getting ticked.

When it finishes, open `index.html` in the browser, add three cards, reload, show the twist. Run `node --test`. Commit.

> **Fallback A (no Squad):** in Copilot Chat run `/speckit-implement` — the official path.
> **Fallback B (time):** `git switch act4-done` and show the finished app and `decisions.md` from the rehearsal.

#### Act 5 — Change request (7 min)

This is the payoff: change the intent, not the code.

1. Ask the room for a small change, or use this one:
   > "Cards show the author's initials (optional, max 3 letters), and the whole board works with keyboard only."
2. Add it to the spec in front of them:
   ```text
   /speckit-clarify Add requirements: cards can carry optional author initials (max 3 letters),
   and every action on the board must be possible with the keyboard only.
   ```
3. Let Spec Kit find the gap between the spec and the code:
   ```text
   /speckit-converge
   ```
   It appends gap tasks to `tasks.md`. Show them.
4. Implement the gap tasks (`/speckit-implement`, or ask the Squad coordinator), then rerun `/speckit-converge` until it reports the feature as converged.
5. Show the diff: `spec.md` changed first, code second.

> **Talking point:** "Next month, a new colleague reads 40 lines of spec instead of reverse-engineering 400 lines of JavaScript."

### A5. Plan B table

| Problem | Recovery |
|---|---|
| A command is not recognised | Type `/speckit` and pick from the list; check `specify version`; the names changed between versions |
| The agent asks for tool approval every few seconds | Approve for the session, or restart with the auto-approval you rehearsed (explain the risk) |
| A phase runs longer than 3 minutes | Narrate what it is doing for one minute, then `git switch` to the next pre-baked branch |
| Squad coordinator goes off-script | Address one member directly (`@Name, implement T005`), or fall back to `/speckit-implement` |
| Network or Copilot outage | Switch to the pre-baked branches and walk through the files and the git history; it still tells the story |
| The app has a visible bug | Celebrate it — ask the room to write the requirement that would have prevented it, add it to the spec, run converge |

### A6. Ideas that keep the room awake

- **Predict the question.** Before clarify runs, collect two guesses of what the agent will ask. Check them.
- **Spot the assumption.** Put `spec.md` on screen for 60 seconds; first person to find an unstated assumption chooses the next twist.
- **Bug bounty.** After Act 4, whoever finds a real bug in the generated app gets a coffee — then it becomes a requirement in Act 5.
- **Human vs agent.** Show your own hand-written acceptance criteria for the same story (prepared beforehand) next to the generated ones.
- **The two-diff test.** Show `git log --stat` at the end: how much was spec, how much was code.
- **Show the meter.** Mention the premium requests and wall-clock time the build used, so expectations stay realistic.

---

## Part B — Try it yourself (attendees)

### B1. Install (about 15 minutes)

You need Python 3.11+, [uv](https://docs.astral.sh/uv/), Node.js 22.5+, git, the GitHub CLI and GitHub Copilot (VS Code and/or Copilot CLI).

```powershell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.2.5
npm install -g @bradygaster/squad-cli
specify version; squad --version
```

### B2. The 7-day challenge (about 30 minutes a day)

| Day | Do this | Done when |
|---|---|---|
| 1 | `specify init my-toy --integration copilot` on a toy idea (a reading list, a lunch poll, a meeting-room board) | You can name every folder Spec Kit created |
| 2 | Write a constitution from your team's real coding standards and Definition of Done | `constitution.md` has 4–6 principles you would defend in a review |
| 3 | Spec one real, **sanitised** user story with `/speckit-specify`, then `/speckit-clarify` | You found at least one gap you had not thought about |
| 4 | `/speckit-plan` and `/speckit-tasks`; review them like a pull request | You changed at least one decision in the plan |
| 5 | `/speckit-implement`, time-boxed to one hour | Something runs; note what went wrong |
| 6 | `squad init`, then ask the coordinator to work the remaining tasks | You read `.squad/decisions.md` and agree or disagree with each entry |
| 7 | Share one lesson in the team channel: what you would use at work, what you would not | Posted |

### B3. Ground rules

- Use synthetic or sanitised data only — no customer data, personal data, secrets or credentials in prompts, specs or logs. Everything is committed to git.
- Use a throwaway repository for experiments with auto-approval (`--yolo`).
- Review every generated artefact before moving to the next step; the agent drafts, you decide.
- Pin versions and read the release notes before upgrading.

### B4. Going further

- **Existing codebases:** follow the official [existing projects guide](https://github.github.io/spec-kit/guides/existing-projects.html): commit a baseline, `specify init --here --force --integration copilot`, write a constitution from your real standards, then pick one bounded change.
- **Extensions:** `specify extension add git` adds numbered feature branches; there are also `bug`, `assess` and `github` extensions.
- **Squad watch mode:** Squad can triage GitHub issues and hand small ones to the Copilot coding agent — try it on a side project first.

---

## Sources

- GitHub Spec Kit — repository and releases: <https://github.com/github/spec-kit>
- Spec Kit documentation and quickstart: <https://github.github.io/spec-kit/> · <https://github.github.io/spec-kit/quickstart.html>
- Spec Kit integrations: <https://github.github.io/spec-kit/integrations/index.html>
- GitHub Blog launch post (2 Sep 2025): <https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/>
- Squad — repository and docs: <https://github.com/bradygaster/squad> · <https://bradygaster.github.io/squad/>
- Squad installation and CLI reference: <https://bradygaster.github.io/squad/docs/get-started/installation/> · <https://bradygaster.github.io/squad/docs/reference/cli/>
- "Spec Kit and Squad are complementary" — maintainer answer in Squad issue #1033: <https://github.com/bradygaster/squad/issues/1033>

**Not verified (check during rehearsal):** the exact command names your installed version exposes; how `squad init` behaves interactively in your terminal; whether the Squad coordinator follows `tasks.md` as instructed; time and premium-request cost per phase; which Copilot plan tier your account needs for Copilot CLI and Squad.
