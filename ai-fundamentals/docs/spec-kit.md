# Spec Kit: Set Up and Deliver Your First Feature

**Chapter 14 · Hands-on Spec Kit, from zero**

Use one small room-booking feature to learn the complete cycle: install, specify, clarify, plan, implement and verify. The important habit is not memorizing commands; it is reviewing the artifact from each step before asking the agent to continue.

> **📘 In plain words:** `specify` runs in your terminal and prepares the project. `/speckit-*` runs inside your coding agent's chat and does the development work. Pasting a chat command into PowerShell will not run it.

## 1. Prerequisites and version baseline

If the terminal, Git or environment variables are new to you, read [Setup and Git basics](setup.md) first; it also covers installing the tools in the table below.

This walkthrough uses **Spec Kit v1.4.5**, released on 25 November 2026 (a maintenance update to v1.4.4), and the **GitHub Copilot default skills layout**. See the [release](https://github.com/github/spec-kit/releases/tag/v1.4.5), [installation guide](https://github.github.io/spec-kit/installation.html) and [Copilot integration guide](https://github.github.io/spec-kit/integrations/copilot.html).

| You need | Why / where to get it |
|---|---|
| Python 3.11 or newer | Runs Specify; [Python downloads](https://www.python.org/downloads/). uv can also manage Python runtimes. |
| uv | Installs the CLI in its own tool environment; follow the [official uv installation guide](https://docs.astral.sh/uv/getting-started/installation/) for your OS |
| Git | Required for the source-based install below and our reviewable branch workflow; [Git downloads](https://git-scm.com/downloads) |
| A working coding agent | Use [Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) or VS Code with Copilot Chat; sign in and confirm your account/organization enables access |
| A safe project folder | A new learning repository, or an existing repository with a clean, backed-up baseline |

Spec Kit supports Windows, macOS and Linux. The commands below choose **PowerShell scripts on Windows** with `--script ps`; use `--script sh` for Bash on macOS/Linux. Python helper scripts are another documented option (`--script py`). Paths in this guide use Windows notation.

**Cost:** Spec Kit is open source, but the coding agent and selected models can consume paid usage. Check your account's allowance and organization policy; installing Spec Kit does not grant Copilot access.

## 2. Install once, initialize each project

**Terminal — install the pinned CLI:**

```terminal
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.4.5
specify version
specify check
```

Each command should print information, not an error; `specify version` must show 1.4.5. If it shows an older number, another copy is installed and comes first on your PATH. Confirm that the reported version is the one you intended. `specify check` checks the surrounding tool environment; it does not prove that your application works. If an older install is already present, follow the [upgrade instructions](https://github.github.io/spec-kit/upgrade.html) rather than mixing several package managers.

**Terminal — create a new project:**

```terminal
specify init room-book --integration copilot --script ps
cd room-book
git init
```

Review the generated files, then save them as a first commit and start a branch for the feature:

```terminal
git add -A
git commit -m "Add Spec Kit scaffolding"
git switch -c feature/room-bookings
```

This gives you a baseline against which to review the feature, not just an empty repository. If Git asks who you are, set your name and e-mail as shown in [Setup and Git basics](setup.md#4-install-and-check-the-tools).

`specify init` creates the directory and Spec Kit scaffolding; it does **not** create a finished application. Git initialization and automatic feature branching are not core defaults in current Spec Kit. We use ordinary Git ourselves; the optional `git` extension is not needed for this tutorial.

Open the folder in VS Code and use Copilot Chat in Agent mode, or run `copilot` in this directory. Review the folder's instructions before trusting it. In chat, type `/speckit` and choose a discovered skill.

> **⚠️ Version trap:** `/speckit-specify` is the current default Copilot skill spelling. `/speckit.specify` is still the canonical notation in several references and other layouts; it is not simply "always wrong". Codex skills use `$speckit-specify`. Match your installed integration, not a random video's command list. See [command invocation](https://github.github.io/spec-kit/integrations/cli.html#command-invocation).

### Existing project instead?

Do **not** create another application around it. Save unrelated changes through your normal Git workflow, create an adoption branch, and record the current build/test results first. From the existing repository root:

```terminal
specify init --here --force --integration copilot --script ps
git diff
git status --short
```

`--force` permits initialization in a non-empty directory and can overwrite conflicting managed paths. It is not a safety switch. Review both changed and untracked files before continuing. Initialization does not infer a complete spec for the existing system.

**Continue on the dedicated page:** [Spec Kit in an existing project](sdd-existing-projects.md) walks through the whole adoption, from a safe baseline and an evidence-based constitution to the first change and a team rollout. Come back here for the details of each workflow command.

## 3. Know the files you are reviewing

| Location | Purpose |
|---|---|
| `.specify\memory\constitution.md` | Project-wide principles |
| `.specify\templates\` and `.specify\scripts\` | Managed templates and helper scripts |
| `.github\skills\speckit-*\SKILL.md` | Copilot skills in the default layout |
| `specs\<feature>\spec.md` | Feature behaviour and acceptance criteria |
| `specs\<feature>\plan.md` | Technical approach |
| `specs\<feature>\tasks.md` | Dependency-ordered work items |
| Other files under the feature directory | Research, data model, contracts, quickstart and checklists as required by the workflow |
| `.specify\feature.json` | Machine-local pointer to the active feature, not the feature specification itself |

**Important current behaviour:** commands select the feature through `.specify\feature.json`, or the `SPECIFY_FEATURE_DIRECTORY` environment override. **Changing Git branches alone does not select a feature.** Before running a skill, check the selected feature directory. Do not copy a feature number from this tutorial and assume it exists in your checkout.

After creating a feature, open `.specify\feature.json` and inspect its `feature_directory` value. To resume an existing feature, update that value to its actual directory, written with forward slashes (for example `specs/001-room-bookings`; backslashes are not valid inside this JSON file), as described in the [quickstart](https://github.github.io/spec-kit/quickstart.html). Feature directories are normally numbered even without the Git extension. `SPECIFY_FEATURE` alone is only a label, not a directory selector.

Current initialization supplies a `.specify\.gitignore` for machine-local state such as `feature.json`. Keep the constitution and reviewed shared configuration in version control; choose an explicit policy for feature artifacts in the [reuse guide](sdd-production.md). See the [core reference](https://github.github.io/spec-kit/overview/core.html) for the exact selection rules.

## 4. Set the project rules once

**Copilot chat:**

```chat
/speckit-constitution For RoomBook: keep changes small and reviewable.
Validate untrusted input at the server boundary. Derive user identity from
the authenticated session, never from a caller-supplied owner ID.
Test business rules and failure cases. Enforce booking conflicts atomically.
Do not log secrets or personal booking descriptions.
Reuse the repository's existing stack and test tools where present.
Require a human-reviewed migration, rollout and recovery plan before release.
```

Read the resulting constitution. Remove invented organizational rules and vague absolutes. In current versions this command writes the constitution only; it no longer rewrites the templates to match (an optional preset, `constitution-sync`, restores that). For an existing service, make the agent read the README, architecture decisions, contribution guide and CI configuration first.

**Stop here until:** the rules match decisions your team actually supports. A constitution is a reviewed agreement, not a magic policy-enforcement engine.

## 5. Specify behaviour, then answer the hard questions

**Copilot chat — describe the what and why, not the framework:**

```chat
/speckit-specify Build the first RoomBook booking API for employees.
An authenticated employee can list rooms and create a booking for a room.
Each booking has a start and end instant, lasts 30 to 120 minutes, and must
start in the future. Bookings for the same room must not overlap, including
when two employees submit at the same time. Adjacent bookings are allowed.
A user can cancel only their own future booking. Cancelled bookings no
longer block availability. Invalid requests must not create partial records.
For this slice, exclude recurring meetings, email, calendar sync, an admin
dashboard and a public sign-up flow. Use synthetic data while learning.
```

Then invoke separately. `clarify` asks up to five targeted questions and writes your answers into `spec.md`:

```chat
/speckit-clarify Focus on authorization, time zones, simultaneous requests,
cancellation boundaries and error responses. Ask me to decide any missing
business policy rather than inventing it.
```

**Example decisions to record:** require offset-bearing timestamps and store instants consistently; a start exactly at the current time is not in the future; only active reservations block a room; return a conflict response when a room is already booked. Distinguish business rules from the technical choice of how to enforce them.

Review the spec against these **acceptance examples**:

| Case | Expected outcome |
|---|---|
| Room A already has 10:00–11:00; another user requests 10:30–11:30 | Reject the overlap; no extra reservation |
| Room A has 10:00–11:00; a user requests 11:00–12:00 | Accept if the remaining rules pass |
| Two simultaneous requests claim an empty room for the same interval | Exactly one succeeds; the other gets a conflict |
| Employee B tries to cancel employee A's reservation | Reject; the reservation remains unchanged |
| A valid cancellation completes before another user requests that interval | The interval can be booked again |
| A timestamp has no timezone offset, or duration is 20 minutes | Reject with a clear validation response |

Use future dates when running these examples. They describe intended behaviour; they are not results from an already-built sample application.

## 6. Plan the implementation and the verification

**Copilot chat — now name the technology:**

```chat
/speckit-plan Read the repository first and reuse its framework, authentication,
database access and test conventions. If this is the empty learning repo,
propose Node.js LTS, TypeScript, Fastify and PostgreSQL with pinned compatible
versions. Use the existing identity provider in a real deployment; a test-only
identity fixture must never be enabled in production.
Design a database-enforced conflict rule or equivalent atomic transaction.
Specify API contracts, migrations, failure responses and observability.
Include unit tests and real-database integration tests for concurrency.
Document exact local setup, test commands and cleanup in quickstart.md.
Explain tradeoffs before adding dependencies. Do not implement yet.
```

This is **one example stack**, not a requirement of either tool. It assumes Node.js and a PostgreSQL database you can run locally, neither of which is in the prerequisites table. **For a first practice run, keep it lighter:** tell the plan to use a language you already know and an embedded database such as SQLite, and keep the concurrency test as a requirement. For a .NET, Java or Python project, keep the stack you already know.

Read `plan.md` and the generated supporting artifacts. Check that they explain authentication, database setup, migration order and the actual test commands. A plan saying "check availability, then insert" without an atomic guarantee does not meet the simultaneous-request requirement.

**Copilot chat — create a requirements-quality checklist:**

```chat
/speckit-checklist Review authorization, time boundaries, concurrency,
failure behaviour and operational requirements for completeness and clarity.
```

This checklist is a **review of requirements**, not a suite of executable application tests. Custom checklist items belong to the reviewer: mark them complete only when their requirement-quality criteria are actually satisfied.

**Stop here until:** you can explain why the design satisfies each acceptance example and how you will verify it.

## 7. Generate tasks and check consistency

Run these in chat, **one at a time**:

```chat
/speckit-tasks
```

Read `tasks.md`, then:

```chat
/speckit-analyze
```

Tasks should include the tests you requested, not just application code. A useful task names the work, target files, prerequisites and completion evidence. `[P]` marks work identified as parallelizable; it is not permission to ignore dependencies or edit the same file concurrently.

`analyze` reports inconsistencies across the spec, plan and tasks. It is read-only. Fix contradictory artifacts, then analyze again. Do not ask the implementation agent to silently decide whether the spec or plan wins.

## 8. Implement, inspect, converge

**Copilot chat:**

```chat
/speckit-implement
```

Use the reviewed task list. For a larger feature, ask for a bounded phase and review before continuing. The implementation flow checks checklist state and asks before proceeding with incomplete items; it does not complete reviewer-owned checklists for you.

Run the application and test commands documented in the project's `quickstart.md`. Read their real output. Check the Git diff for unrelated edits, skipped tests, disabled validation and new dependencies.

Then:

```chat
/speckit-converge
```

Converge compares implementation with the spec, plan and tasks. When it finds remaining work, it can **append gap tasks to `tasks.md`**. It does not fix the code or rewrite requirements to match the code. Review those tasks, implement them, run the checks, and converge again.

Where a person decides at each of these steps, and which settings back that decision, is mapped in [Chapter 12](agent-guardrails.md#3-human-decision-points-in-the-spec-driven-workflow).

> **⚠️ Common misconception:** "Converged means approved for production." It means the agent's completeness assessment found no remaining gaps. It is not a security certification, a test runner, or your release approval. A failing test still fails, whatever the summary says.

At this point you can continue with one agent or use the [manual Squad handoff](squad.md). Do not have both implementation paths modifying the same work at once.

## 9. Change the spec without losing control

Suppose the product owner now wants a **15-minute minimum** instead of 30 minutes.

1. Decide whether this is an intended behaviour change, not a bug in the existing 30-minute rule.
2. Update the relevant `spec.md`, or create a new feature under your team's retention policy.
3. Revise the plan and tasks, including validation, boundary tests and user-facing documentation. Preserve useful design rationale.
4. Run `analyze`; resolve contradictions.
5. Implement, run tests and converge again.

There is **no core command that automatically reconciles all three artifacts**. `clarify` helps resolve ambiguity; `analyze` reports inconsistency; `converge` assesses implementation and appends work. None excuses leaving a 30-minute rule in the spec while a task says 15 minutes. See [evolving specifications](https://github.github.io/spec-kit/how-to/evolving-specs.html).

## 10. Troubleshooting and deliberate upgrades

| Symptom | Check before trying again |
|---|---|
| `specify` is not found | Finish uv installation, reopen the terminal and check the tool executable is on `PATH` |
| `--integration` is not recognized | Run `specify version`; an old executable may be first on `PATH` |
| No `/speckit-*` skills | Open the initialized project root, inspect `.github\skills\`, restart the agent, and check its skills discovery and trust settings |
| A skill reads the wrong feature | Inspect `.specify\feature.json` and any `SPECIFY_FEATURE_DIRECTORY` override; do not rely on the current Git branch |
| PowerShell helper fails | Confirm the selected script variant and required PowerShell runtime; follow your organization's execution policy rather than disabling it globally |
| Converge repeatedly adds the same gaps | Stop the loop; inspect requirements, failing evidence and the actual diff instead of spending more tokens blindly |
| A new CLI still exposes old project skills | CLI and generated project files are separate; use the manifest-aware integration upgrade |

Before upgrading, commit or back up your reviewed configuration, read release notes, and try the change in one learning repository. The documented inspection commands include:

```terminal
specify self check
specify self upgrade --dry-run
specify integration status
```

After updating the CLI through the chosen installation route, refresh the project's integration deliberately with `specify integration upgrade copilot`. Review the diff; update installed extensions separately if you use any. Do not reflexively add `--force` to bypass a warning about customized files.

**Pinning is only part of reproducibility.** In v1.4.5, initialization uses assets bundled with the installed CLI, so pinning it also pins its core templates and scripts. Record the generated integration files, enabled extensions and model/host too: separately installed community components, the coding host and model output are not frozen by that CLI pin.

## Recap

- `specify` commands run in the terminal and set the project up; `/speckit-*` commands run in the agent's chat and do the work.
- The order is constitution, specify, clarify, plan, checklist, tasks, analyze, implement, converge. Read the file each step produces before running the next.
- Describe behaviour in `specify` and technology in `plan`.
- `analyze` and `converge` report; they do not fix. You run the tests and read the diff.
- When the requirement changes, change the spec first, then the plan and tasks, then the code.

## Check Your Understanding

**1. Where do you run `/speckit-plan`?**

- A) In PowerShell, right after `specify init`
- B) In the coding agent's chat
- C) In any terminal where `specify check` passes
- D) In the terminal, from the project root

> **✅ Answer:** B — It runs in the coding agent's chat, not in the terminal. The terminal runs `specify` installation and configuration commands, and pasting a chat command into PowerShell will not run it.

**2. You change Git branches. Does current Spec Kit automatically select the other feature?**

- A) Yes. The name of the current branch selects the feature
- B) Yes, as long as the feature directories are numbered
- C) No. You run `specify init` again in the project root to select another feature
- D) No. It uses `.specify\feature.json` or `SPECIFY_FEATURE_DIRECTORY`

> **✅ Answer:** D — Changing Git branches alone does not select a feature. Feature selection uses `.specify\feature.json` or `SPECIFY_FEATURE_DIRECTORY`, so check it explicitly before running a skill.

**3. Converge finds a gap. What does it do about it?**

- A) It can append gap tasks to `tasks.md`; it does not fix the code
- B) It fixes the code and then runs the tests again
- C) It rewrites the requirements so that they match the code
- D) It approves the feature for production with a note

> **✅ Answer:** A — Converge does not implement the fix. It can append work to `tasks.md`. Review that work, implement it, run the checks, and assess again. "Converged" is also not your release approval.

**4. In which step do you name the framework and the database?**

- A) `/speckit-constitution`
- B) `/speckit-specify`
- C) `/speckit-plan`
- D) `/speckit-analyze`

> **✅ Answer:** C — Describe behaviour in `specify` (the what and why, not the framework) and technology in `plan`. `analyze` only reports inconsistencies across the spec, plan and tasks.

**5. The product owner now wants a 15-minute minimum instead of 30 minutes. What do you change first?**

- A) The code, and then `converge` updates the spec to match it
- B) The spec, then the plan and tasks, and then the code
- C) Only `tasks.md`, because the agent implements from the task list
- D) Nothing by hand, because `analyze` reconciles the three artifacts

> **✅ Answer:** B — When the requirement changes, change the spec first, then the plan and tasks, then the code. There is no core command that automatically reconciles all three artifacts: `analyze` reports inconsistency and `converge` appends work.

[← Chapter 13: Spec-Driven Development](spec-driven-development.md) · [Chapter 15: Existing Projects →](sdd-existing-projects.md)
