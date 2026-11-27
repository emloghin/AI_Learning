# Squad: A Small AI Team You Direct

**Chapter 17 · Hands-on Squad**

Squad gives a project persistent AI roles, routing and shared context. Start with a small team, give it an approved plan, and review the combined result. More agents are useful only when their work can be separated clearly.

> **📘 In plain words:** You stay the product owner and release decision-maker. Squad is the coordinator and its agents are helpers. Giving one helper the title "reviewer" does not make its approval equivalent to a human review.

## 1. Which Squad, and which version?

This guide covers **[github/squad](https://github.com/github/squad)**. Its current documentation is at **[github.github.io/squad](https://github.github.io/squad/)**. Use that upstream rather than the `bradygaster/squad` fork, which has no current release stream. The npm package is still named **`@bradygaster/squad-cli`**.

The walkthrough uses **v2.0.0**, released on **19 November 2026**. See the [release](https://github.com/github/squad/releases/tag/v2.0.0), [installation guide](https://github.github.io/squad/docs/get-started/installation/) and [CLI reference](https://github.github.io/squad/docs/reference/cli/). Older tutorials that call all v2 builds previews or use `.ai-team` paths describe an earlier baseline.

We use the **Copilot-hosted path**, not a custom application built with the Squad SDK. You do not need to install the SDK as an application dependency to follow this page.

## 2. Install and initialize

For the npm route, install **Node.js 22.5 or newer**, npm, Git, and **Copilot CLI separately**. Sign in to Copilot and check that your organization allows it. GitHub CLI (`gh`) is needed for workflows that manage GitHub issues, PRs and boards, not simply to create the local team.

Use the [official Copilot installation instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) and run a simple Copilot session before adding Squad. That separates account/host problems from Squad problems.

**Terminal — install once:**

```terminal
node --version
npm install -g @bradygaster/squad-cli@2.0.0
squad --version
```

Node is required for this npm route. Official standalone archives and platform packages include Node; see [installation alternatives](https://github.github.io/squad/docs/get-started/installation/) if you cannot use npm. Do not mix installation channels casually, or an older executable can remain first on `PATH`.

**Terminal — from the root of your Git repository:**

```terminal
git status --short
squad init --no-workflows --no-vscode-default
squad doctor
git diff
git status --short
```

Save unrelated work first. `init` installs the coordinator at `.github\agents\squad.agent.md` and creates `.squad\` scaffolding. It also manages files such as the root `.mcp.json` and `.gitattributes`; inspect all changed and untracked files. The two flags above deliberately skip GitHub Actions workflow installation and leave your VS Code default chat mode unchanged. Without them, initialization can install write-capable workflows and make new VS Code chats open in Squad mode. Review any generated automation before pushing it to GitHub.

`doctor` checks setup integrity **after initialization**, not product correctness. It can pass before you have agreed the team roster in chat.

**Combined-repository caveat:** v2.0.0's initializer skips its starter skills when `.github\skills\` is already non-empty — as it is after Spec Kit initialization. Inspect that directory; do not assume `/squad` skills were installed or that `doctor` checks them. The coordinator launch used below is separate from those optional starter skills. This is a [source-identified limitation](https://github.com/github/squad/blob/v2.0.0/packages/squad-sdk/src/config/init.ts), not an end-to-end integration test.

**Start the team:**

The opt-out flags above are present in v2.0.0's [CLI help/source](https://github.com/github/squad/blob/v2.0.0/packages/squad-cli/src/cli-entry.ts), even when omitted from a shortened command table.

```terminal
copilot --agent squad
```

Alternatively, open the repository as a single-root workspace in VS Code, review workspace trust, open Copilot Chat and select the **Squad** agent. Both hosts use the repository's team files, but available tools, permissions and model support can differ. Switch back to ordinary Agent mode when returning to the Spec Kit walkthrough.

> **⚠️ Outdated-command trap:** Current CLI documentation deprecates the bare `squad` interactive shell in favour of `copilot --agent squad`. Some older scenario pages still show bare `squad`. Prefer the current installation/CLI reference and your installed `squad --help`.

## 3. Form a team before assigning implementation

**Chat with the Squad coordinator:**

```chat
We are building RoomBook, a small employee room-booking API.
Read the repository and .specify\memory\constitution.md first.
Propose the smallest team for backend implementation, tests and review.
Use our existing stack and conventions. Explain the proposed roles.
Do not implement, publish, push, or deploy anything yet.
```

Review the proposal and confirm or change it. Names can vary; use the actual roster rather than assuming a character from a tutorial exists. The team-specific roster and history are developed through the conversation, not fully invented by the package installer.

| File or area | What to inspect |
|---|---|
| `.squad\team.md` | The roster and each member's role |
| `.squad\routing.md` | Which member handles which kind of work |
| `.squad\decisions.md` | Shared decisions and durable directives |
| `.squad\agents\` | Member charters and persistent context/history |
| `.squad\skills\` | Reusable capabilities learned or supplied to the team |
| Logs and decision inboxes | What happened, what remains unmerged, and whether sensitive data was captured |

**Built-in roles and casting.** A new v2.0.0 team has four built-in members: **Scribe** (silently records and merges decisions), **Ralph** (work monitor for the queue), **Rai** (Responsible-AI reviewer that gives green, yellow or red verdicts) and **Fact Checker** (verification and devil's advocate). On a team upgraded from an older version, Rai and Fact Checker are opt-in: add them with `squad roster add rai` or `squad roster add fact-checker`. Check `.squad\team.md` to see who is on your team. The coordinator may also offer to add `@copilot` (the Copilot coding agent) to the roster, so it can pick up issues later; accept only if you want that. The *themed* teammates you describe (planner, spec expert, implementer, tester) are created later, when you approve the roster. Squad "casts" them with names from a fictional universe, so **names differ on every run; the role is what matters**. Our advice: treat `rai` and `fact-checker` as extra reviewers for the human, not as a release gate.

These are inspectable project artifacts, not model training. Sharing them gives another session context; it does not fine-tune the model or guarantee that every fact will be recalled correctly.

The [first-session walkthrough](https://github.github.io/squad/docs/get-started/first-session/) and [team setup guide](https://github.github.io/squad/docs/features/team-setup/) explain formation and memory. Review state before committing it: team memory can contain internal decisions, paths, personal data or copied prompts.

## 4. A first bounded assignment

Before trying a team-wide feature, address one member by the name shown in your roster:

```chat
<backend member>, inspect the booking create path and the approved plan.
Report which files you would change, which helpers you would reuse,
and which tests prove the conflict rule. Do not edit yet.
```

Replace `<backend member>` with the real name. After reviewing that answer, authorize one task:

```chat
Implement only the approved booking-conflict task.
Keep the API contract unchanged. Run the relevant tests.
Report changed files, actual commands and results, and remaining gaps.
Do not mark blocked or skipped checks as passed.
```

A good result contains a reviewable diff and evidence. "Done, all good" without commands, results or a clear scope is not enough.

## 5. Combine Spec Kit and Squad explicitly

A maintainer described the tools as **complementary** in [github/squad#1033](https://github.com/github/squad/issues/1033#issuecomment-4658769575): Spec Kit defines the product specs; Squad organizes agents implementing them. That comment does not define an automatic adapter or guarantee a shared task-state protocol.

**This is a manual coordination pattern:** complete Spec Kit's constitution, spec, clarification, plan, checklist, tasks and analysis first. Then give Squad those reviewed artifacts. Return to Spec Kit for a completeness assessment after implementation.

Before pasting this handoff, replace the feature directory and task IDs with the ones actually generated in your project:

```chat
Read .specify\memory\constitution.md and the approved files in
specs\<your-feature>\: spec.md, plan.md, tasks.md and relevant contracts.

Implement only <selected task IDs>. First show the assignment plan:
task ID, owner, files, dependencies and verification command.
Wait for approval before implementation.

Treat the spec as the intended behaviour and the plan as the agreed design.
If they conflict with the code or each other, report the conflict; do not
silently rewrite requirements or expand scope.

Parallelize only dependency-ready work with non-overlapping file ownership.
Give one owner each shared file, migration and dependency manifest.
Only the coordinator should reconcile tasks.md after inspecting evidence.
Record proposed design changes in the team decisions and request approval;
reflect approved changes in the Spec Kit artifacts before continuing.

Run the repository's checks. Report failures, skipped checks and blockers.
Do not push, merge, publish packages, change credentials or deploy.
Stop after the selected tasks and give me the combined diff summary.
```

**Speed-run variant.** For a throwaway proof of concept you can tell the team to run the Spec Kit gates in strict order (constitution → specify → plan → tasks → implement; no planning before a spec, no code before tasks), use `clarify` only when the spec is genuinely ambiguous, skip `analyze`, and define "done" as a happy-path smoke test. The recorded demo (a Rock-Paper-Scissors CLI in Python, about an hour from an empty folder) worked this way, and a later change (a score counter) went back through spec → plan → tasks before the implementer touched code. That is a reasonable trade for a demo. For client or production work keep `clarify`, the checklist and `analyze`, and require real tests; see [shipping the workflow](sdd-production.md).

This prompt supplies instructions, **not an enforceable sandbox**. Configure the host's actual permissions and repository controls too.

Spec Kit's default core skills are also model-invocable. Its optional `--integration-options="--no-model-invocation"` setup setting can require manual skill invocation in supported hosts, but it is not a hard security boundary and can affect extension hooks. Read the [integration caveats](https://github.github.io/spec-kit/integrations/copilot.html) before changing an existing setup.

### A sensible task split

| Work | Can run together? | Reason |
|---|---|---|
| Agree the API contract and migration design | First, before implementation | Other tasks depend on these decisions |
| Implement backend in owned source files; write acceptance tests in separate test files | Often, after the contract is agreed | Different files, shared behavioural contract |
| Two agents change the same migration or dependency lockfile | No | Conflicting edits and ordering risks |
| Review the combined diff and run integration tests | After the pieces are integrated | Individually passing fragments can fail together |

Separate model contexts are **not separate working directories**. Do not assume Squad automatically gives every agent a Git worktree. If your chosen host/workflow provides worktree isolation, verify how changes are merged and tested; otherwise keep non-overlapping ownership and serialize shared edits.

### Close the loop

Inspect the integrated diff and run tests yourself. Reconcile task checkboxes with the evidence. Then use your Spec Kit-enabled chat to run `/speckit-converge` against the **correct active feature**. Review any gap tasks and give them to **one** implementation path: Squad or `/speckit-implement`, not both concurrently.

If Squad drifts, stop its work, inspect and preserve useful changes, and continue with one named member or the ordinary Spec Kit implementation flow. A smaller coordination problem is often the right fix.

## 6. Keep memory useful, not unquestionable

Record a decision with its reason and scope: "This repository uses PostgreSQL transactions for booking conflict control", not "Always use PostgreSQL in every future product".

At the end of a session, ask:

```chat
Summarize completed and blocked task IDs, actual test results, decisions
that need human approval, and the next bounded action.
Identify any statement in team memory that now conflicts with the spec.
```

Squad can also run a **retro**: a Scrum Master-style agent reads the orchestration log, decisions and agent histories and proposes one charter improvement per teammate. The community workshop asks it to propose one improvement per charter. Our advice is to add "propose, do not apply", and to approve each change yourself, because charters steer every later task.

Correct stale memory before the next task. Avoid copying a whole transcript into every agent's context. A small current decision record is more useful than a growing pile of contradictory history.

For a second project, the safe default is **initialize a separate team** and carry over only reviewed generic conventions. Export/import and shared-team features are optional; the [multi-project section](sdd-production.md) explains the privacy and context boundaries.

## 7. Models, permissions and cost

**What a recorded demo showed, and what remains unverified.** The official pages disagree about per-agent models: the [model-selection guide](https://github.github.io/squad/docs/features/model-selection/) describes per-agent profiles, while the v2.0.0 [host feature matrix](https://github.github.io/squad/docs/reference/host-feature-matrix/) marks per-spawn selection unsupported for the Copilot projection. In a Copilot-hosted session recorded on 21 August 2026 (GitHub Copilot Summer Bootcamp), the coordinator was asked in a single prompt to use a stronger model for the planner and spec expert, a mid-tier model for the implementer and a cheap, fast model for the coordinator and tester. The terminal then labelled each spawned agent with a different model (for example a Claude Opus-class model for the Spec Kit expert and planner, a Sonnet-class model for the implementer, a Haiku-class model for the tester), and the choices were persisted in `.squad/config.json` under `agentModelOverrides`. That recording predates v2.0.0 (19 November 2026), so it may reflect a different build. Do not rely on it either way: ask the team to state the model per role, then check the label on each spawned agent and the file. If they differ, trust the label and your host's usage report.

For independent review, use separately configured review sessions with different available models, and verify the actual model in each. Give each session the same artifacts and this prompt:

```chat
Independently check the requirements against the implementation and its
failure cases. Report the actual model used, source/evidence references,
and disagreements. Do not treat agreement as permission to release.
```

Do not select models from a stale hard-coded list. Use the host's available-model picker and the current support documentation.

**Budget for the whole loop:** planning, every agent's context, tool results, retries, tests and review. Parallel work can reduce elapsed time while increasing total usage. Start with one bounded assignment, inspect usage, and set supported account/session limits before expanding.

For this Copilot-hosted path, use Copilot's session/account or organization usage reporting. The [Squad cost ledger](https://github.github.io/squad/docs/features/cost-tracking/) is not populated by Copilot CLI or VS Code; `squad cost` is not a complete bill for this workflow.

**Keep permissions narrow** (the settings are explained in [Chapter 12](agent-guardrails.md#5-keeping-people-in-the-loop-with-squad))**:** no production credentials in the learning environment; no unrestricted tool approval just to avoid prompts; human approval for destructive or external changes. SDK governance features do not automatically prove that every Copilot-hosted tool call has identical enforcement. Check your actual execution path.

Our launch command intentionally omits `--yolo`. Spec Kit headless Copilot workflows add that flag by default unless `SPECKIT_COPILOT_ALLOW_ALL_TOOLS=0` is set; Squad automation paths can also auto-approve tools. Interactive review is not inherited automatically by unattended execution. Treat those as separate deployment designs, not shortcuts around prompts.

## 8. Troubleshooting and updates

| Symptom | Next check |
|---|---|
| `squad` is not found | Reopen the terminal; inspect the installation channel and `PATH` |
| "Running scripts is disabled on this system" | PowerShell's execution policy blocks the npm launcher script. See [Setup and Git basics](setup.md#4-install-and-check-the-tools) |
| Squad agent is missing | Check `.github\agents\squad.agent.md`, the open repo root and host discovery/trust; restart the chat |
| `.squad` cannot be found | Run from the initialized repository; current resolution searches the working directory and parents, not a profile-wide fallback |
| Doctor reports missing team state | Confirm the repository root and that `init` succeeded; read the failing check. Team formation is a separate conversation, not a cure for failed scaffolding |
| Several agents overwrite work | Stop them; inspect the diff; assign one owner per file or use verified worktree isolation |
| Team repeatedly adds unrequested features | Tighten the task IDs and stop condition; use one named member |
| GitHub operations fail | Verify `gh` authentication and repository permissions without broadening access unnecessarily |
| A requested model is not used | Inspect resolved-model/fallback reporting and host availability |

Update the CLI through the same installation channel, then run `squad upgrade --dry-run`, `squad upgrade` and `squad doctor` in each initialized project. Review the diff and any local backups. Judging by the v2.0.0 source, `squad upgrade` can also **add** GitHub Actions workflow files, even in a project initialized with `--no-workflows`; delete the ones you do not want before pushing. Updating one global executable is not the same as refreshing every project's generated coordinator files.

Skip background work loops, remote-control access, SDK customization and marketplaces on your first project. Add one only when a specific workflow needs it and you understand its permissions, stop condition and cost.

## 9. Adopt Squad in an existing repository

Squad does not need a new project. The official [existing-repository](https://github.github.io/squad/docs/scenarios/existing-repo/) and [mid-project](https://github.github.io/squad/docs/scenarios/mid-project/) scenarios describe a short sequence: add the team, let it read before it writes, teach it your conventions, then give it one real task. Parts of those scenario pages still show older commands, so the steps below use the current v2.0.0 forms. Working on a branch and the two opt-out flags are this guide's additions for safety.

**Step 1 — add the scaffolding on a branch and review it.**

```terminal
git switch -c chore/add-squad
squad init --no-workflows --no-vscode-default
squad doctor
git status --short
git diff
```

| What `init` adds or changes | Why it matters |
|---|---|
| `.squad\` (team, routing, decisions, agents, casting, ceremonies, configuration) | The team's state. Review before committing |
| `.github\agents\squad.agent.md` | The coordinator. Owned by Squad; do not edit |
| `.mcp.json` in the repository root | Registers Squad's state server for the agent host |
| Lines appended to `.gitattributes` | Makes decision and history files merge by combining lines instead of conflicting. Existing rules are left alone |
| Lines appended to `.gitignore` | Keeps logs, sessions, the decisions inbox and scratch files out of Git |
| `.github\workflows\squad-*.yml` and `sync-squad-labels.yml` | Only **without** `--no-workflows`. Write-capable automation; add later, after review |
| `.vscode\settings.json` default chat mode | Only **without** `--no-vscode-default` |

**Step 2 — describe the project as it is today.** Start `copilot --agent squad` and tell the coordinator what exists, not what you wish existed:

```chat
This project is already in progress. It is RoomBook, a room-booking service:
Node.js and TypeScript API, PostgreSQL, a small web front end. About a year old.
Propose the smallest team that fits. Do not change any file yet.
```

Confirm or adjust the proposed roster. For one developer, the [solo scenario](https://github.github.io/squad/docs/scenarios/solo-dev/) suggests three members: a lead, a developer and a tester.

**Step 3 — explore before building.** This is the step beginners skip.

```chat
Team, review the codebase and tell me what you find.
Report the architecture, the test setup, risky areas and anything unclear.
Do not edit application files.
```

Findings are stored in each member's `history.md`. Read them: they show what the team believes about your system, including anything it got wrong. The mid-project scenario notes that agents are usually up to speed after two or three sessions, not one.

**Step 4 — teach your conventions as directives.** Sentences with "always", "never" or "from now on" are recorded as standing rules in `.squad\decisions.md`, which every member reads before working.

```chat
Always validate request bodies with the existing schema library.
Never change files under src\legacy\payments without asking me first.
From now on, run the integration tests before reporting a task as done.
```

**Step 5 — give one real, bounded task** using the pattern from [section 4](#4-a-first-bounded-assignment), then review the diff and the test results yourself.

**Step 6 — commit the team.**

```terminal
git add .squad .github/agents .gitattributes .gitignore .mcp.json
git status --short
```

Check the staged list. Team memory can contain internal decisions, file paths or copied prompts; remove what should not be in the repository. Only `.github\agents` is staged from the `.github` folder on purpose, so that other files there are not swept in. When the list is right, commit:

```terminal
git commit -m "Add Squad team"
```

> **💡 Using Spec Kit too?** Adopt Spec Kit first and finish one feature with a single agent, following the [existing-projects page](sdd-existing-projects.md). Then add Squad. Spec Kit will already have filled `.github\skills\`, so Squad's initializer skips its own starter skills (see the caveat in [section 2](#2-install-and-initialize)). Point the team at the constitution so both tools work from the same rules.

**Monorepo:** the [official scenario](https://github.github.io/squad/docs/scenarios/monorepo/) recommends one squad for the repository with domain specialists, not one squad per package. Note that Squad 2.0 finds `.squad\` only in the current folder or its parents, so start the session inside the repository.

## 10. Upgrading and migrating from older Squad setups

| You have | Do this | Notes |
|---|---|---|
| **Squad 1.x project** | Update the CLI, then run `squad upgrade` in each project, then `squad doctor` | No re-initialization. [Migration guide](https://github.github.io/squad/docs/get-started/migration/) |
| **Old `.ai-team\` folder** | Commit everything first, then `squad upgrade`, then `squad upgrade --migrate-directory`, on a branch | Renames the folder and updates the Git ignore and attribute rules. **`--dry-run` does not preview the rename**: in v2.0.0 it happens anyway, so a commit and a branch are your undo. The docs also describe `squad migrate --from ai-team` and a manual copy, and the pages disagree |
| **Installed from `npx github:bradygaster/squad` or `create-squad`** | Install `@bradygaster/squad-cli` instead | The old distributions are removed or deprecated. The repository is now `github/squad`; the npm name is unchanged |
| **Used personal squads, consult mode or `--global`** | Plan a replacement before upgrading | Removed in 2.0 with no migration tool |

```terminal
squad upgrade --dry-run
squad upgrade
squad doctor
git diff
```

**What `squad upgrade` replaces:** the coordinator file, Squad's skills under `.github\skills\`, its workflow files and `.squad\templates\`. It also creates Squad-owned files that are missing. Files you customized are backed up next to the original as `<file>.local-backup`. **What it leaves alone:** `team.md`, `routing.md`, decisions, member histories, the casting registry and `config.json`.

> **⚠️ No way back:** the upgrade notes say there is no supported downgrade. Do not run an older CLI against an upgraded repository. Upgrade on a branch, review the diff, and merge only when the team has moved to the same CLI version. If you inherit conventions through `squad upstream`, run `squad upstream sync` afterwards, because precedence between upstream sources changed in 2.0.

Sources: [upgrading scenario](https://github.github.io/squad/docs/scenarios/upgrading/), [what's new](https://github.github.io/squad/docs/whatsnew/) and the [v2.0.0 CLI source](https://github.com/github/squad/blob/v2.0.0/packages/squad-cli/src/cli-entry.ts). The complete command list is in the [command reference](sdd-reference.md#6-squad-terminal-commands).

## Recap

- Squad adds a coordinator and a small team of AI roles to a repository. You remain the product owner and the release decision-maker.
- Form the team first, let it read before it writes, and give it one bounded, reviewed task at a time.
- Combining it with Spec Kit is a manual handoff of reviewed artifacts, with one path implementing at a time.
- Team memory is useful and fallible: read it, correct it, and review it before committing or exporting.
- Unattended modes remove the approval step. Treat them as a separate, deliberately designed deployment.

## Check Your Understanding

**1. Does a Spec Kit `[P]` marker make simultaneous edits to the same file safe?**

- A) Yes. Squad gives every agent its own Git worktree automatically
- B) Yes, as long as each agent works in a separate model context
- C) No. Respect dependencies and give each shared file one owner
- D) No. Squad members can only work one after the other

> **✅ Answer:** C — Respect dependencies and file ownership. Parallel contexts do not guarantee filesystem isolation: separate model contexts are not separate working directories.

**2. You export your Squad team to reuse it in a second project. Is that export a clean, anonymous starter template?**

- A) Yes. An export holds only the role names from the roster
- B) Yes. Squad removes project details when it writes an export
- C) No. It holds a fine-tuned model that only fits the first project
- D) No. It can carry project decisions and history, so review it first

> **✅ Answer:** D — An export can include project decisions and history. Review and sanitize it before reuse, especially across clients. Team files are inspectable project artifacts, not model training.

**3. If Squad says the feature is done, what comes next?**

- A) Inspect the combined diff, run the tests yourself and assess remaining gaps
- B) Merge and deploy, because the team's reviewer role has already approved the work
- C) Ask Rai for a green verdict and treat that verdict as the release gate
- D) Run `/speckit-implement` on the same tasks at the same time as a check

> **✅ Answer:** A — Inspect the combined diff, run checks, reconcile task state, assess remaining gaps, and apply the human-controlled release gates. Rai is an extra reviewer for the human, not a release gate, and only one implementation path should work at a time.

**4. Why does this guide run `squad init` with `--no-workflows --no-vscode-default`?**

- A) To create the whole team roster without having to start a conversation in chat
- B) To skip GitHub Actions workflows and keep the VS Code default chat mode
- C) To stop `init` from changing `.mcp.json` and `.gitattributes`
- D) To make `squad doctor` check that the product works correctly

> **✅ Answer:** B — The two flags skip GitHub Actions workflow installation and leave your VS Code default chat mode unchanged. Without them, initialization can install write-capable workflows and make new VS Code chats open in Squad mode. `init` still manages `.mcp.json` and `.gitattributes`, and the roster is agreed in chat.

**5. A member of your Squad team has the role "reviewer" and approves a change. What is that approval worth?**

- A) It is useful input, but it is not equivalent to a human review
- B) It replaces the human review, because reviewing is that member's role
- C) It proves that the tests were run and that all of them passed
- D) It is the release decision, as long as the coordinator agrees

> **✅ Answer:** A — Giving one helper the title "reviewer" does not make its approval equivalent to a human review. You stay the product owner and release decision-maker, and "Done, all good" without commands and results is not evidence.

[← Chapter 16: Real Examples](sdd-examples.md) · [Chapter 18: Shipping & Reuse →](sdd-production.md)
