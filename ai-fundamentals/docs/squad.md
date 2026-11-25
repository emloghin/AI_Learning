# Squad: A Small AI Team You Direct

**Chapter 10b · Hands-on Squad**

Squad gives a project persistent AI roles, routing and shared context. Start with a small team, give it an approved plan, and review the combined result. More agents are useful only when their work can be separated clearly.

> **📘 In plain words:** You stay the product owner and release decision-maker. Squad is the coordinator and its agents are helpers. Giving one helper the title "reviewer" does not make its approval equivalent to a human review.

## 1. Which Squad, and which version?

This guide covers **[github/squad](https://github.com/github/squad)**. Its current documentation is at **[github.github.io/squad](https://github.github.io/squad/)**. Use that upstream rather than the `bradygaster/squad` fork, which has no current release stream. The npm package is still named **`@bradygaster/squad-cli`**.

The walkthrough uses **v2.0.0**, released on **19 November 2026**. See the [release](https://github.com/github/squad/releases/tag/v2.0.0), [installation guide](https://github.github.io/squad/docs/get-started/installation/) and [CLI reference](https://github.github.io/squad/docs/reference/cli/). Older tutorials that call all v2 builds previews or use `.ai-team` paths describe an earlier baseline.

We use the **Copilot-hosted path**, not a custom application built with the Squad SDK. You do not need to install the SDK as an application dependency to follow this page.

## 2. Install and initialize

For the npm route, install **Node.js 22.5 or newer**, npm, Git, and **Copilot CLI separately**. Sign in to Copilot and check that your organization allows it. GitHub CLI (`gh`) is needed for workflows that manage GitHub issues, PRs and boards, not simply to create the local team.

Use the [official Copilot installation instructions](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) and run a simple Copilot session before adding Squad. That separates account/host problems from Squad problems.

**Terminal — install once:**

```text
node --version
npm install -g @bradygaster/squad-cli@2.0.0
squad --version
```

Node is required for this npm route. Official standalone archives and platform packages include Node; see [installation alternatives](https://github.github.io/squad/docs/get-started/installation/) if you cannot use npm. Do not mix installation channels casually, or an older executable can remain first on `PATH`.

**Terminal — from the root of your Git repository:**

```text
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

```text
copilot --agent squad
```

Alternatively, open the repository as a single-root workspace in VS Code, review workspace trust, open Copilot Chat and select the **Squad** agent. Both hosts use the repository's team files, but available tools, permissions and model support can differ. Switch back to ordinary Agent mode when returning to the Spec Kit walkthrough.

> **⚠️ Outdated-command trap:** Current CLI documentation deprecates the bare `squad` interactive shell in favour of `copilot --agent squad`. Some older scenario pages still show bare `squad`. Prefer the current installation/CLI reference and your installed `squad --help`.

## 3. Form a team before assigning implementation

**Chat with the Squad coordinator:**

```text
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

These are inspectable project artifacts, not model training. Sharing them gives another session context; it does not fine-tune the model or guarantee that every fact will be recalled correctly.

The [first-session walkthrough](https://github.github.io/squad/docs/get-started/first-session/) and [team setup guide](https://github.github.io/squad/docs/features/team-setup/) explain formation and memory. Review state before committing it: team memory can contain internal decisions, paths, personal data or copied prompts.

## 4. A first bounded assignment

Before trying a team-wide feature, address one member by the name shown in your roster:

```text
<backend member>, inspect the booking create path and the approved plan.
Report which files you would change, which helpers you would reuse,
and which tests prove the conflict rule. Do not edit yet.
```

Replace `<backend member>` with the real name. After reviewing that answer, authorize one task:

```text
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

```text
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

```text
Summarize completed and blocked task IDs, actual test results, decisions
that need human approval, and the next bounded action.
Identify any statement in team memory that now conflicts with the spec.
```

Correct stale memory before the next task. Avoid copying a whole transcript into every agent's context. A small current decision record is more useful than a growing pile of contradictory history.

For a second project, the safe default is **initialize a separate team** and carry over only reviewed generic conventions. Export/import and shared-team features are optional; the [multi-project section](sdd-production.md) explains the privacy and context boundaries.

## 7. Models, permissions and cost

**Host-specific limitation:** Squad's [model-selection guide](https://github.github.io/squad/docs/features/model-selection/) describes per-agent profiles, but the v2.0.0 [host feature matrix](https://github.github.io/squad/docs/reference/host-feature-matrix/) marks the per-spawn selection feature unsupported for its Copilot projection, despite the underlying host capability. The [VS Code guide](https://github.github.io/squad/docs/features/vscode/) says agents use the session model. The official pages are inconsistent: do not promise that asking the coordinator for two models actually selects two.

For independent review, use separately configured review sessions with different available models, and verify the actual model in each. Give each session the same artifacts and this prompt:

```text
Independently check the requirements against the implementation and its
failure cases. Report the actual model used, source/evidence references,
and disagreements. Do not treat agreement as permission to release.
```

Do not select models from a stale hard-coded list. Use the host's available-model picker and the current support documentation.

**Budget for the whole loop:** planning, every agent's context, tool results, retries, tests and review. Parallel work can reduce elapsed time while increasing total usage. Start with one bounded assignment, inspect usage, and set supported account/session limits before expanding.

For this Copilot-hosted path, use Copilot's session/account or organization usage reporting. The [Squad cost ledger](https://github.github.io/squad/docs/features/cost-tracking/) is not populated by Copilot CLI or VS Code; `squad cost` is not a complete bill for this workflow.

**Keep permissions narrow:** no production credentials in the learning environment; no unrestricted tool approval just to avoid prompts; human approval for destructive or external changes. SDK governance features do not automatically prove that every Copilot-hosted tool call has identical enforcement. Check your actual execution path.

Our launch command intentionally omits `--yolo`. Spec Kit headless Copilot workflows add that flag by default unless `SPECKIT_COPILOT_ALLOW_ALL_TOOLS=0` is set; Squad automation paths can also auto-approve tools. Interactive review is not inherited automatically by unattended execution. Treat those as separate deployment designs, not shortcuts around prompts.

## 8. Troubleshooting and updates

| Symptom | Next check |
|---|---|
| `squad` is not found | Reopen the terminal; inspect the installation channel and `PATH` |
| Squad agent is missing | Check `.github\agents\squad.agent.md`, the open repo root and host discovery/trust; restart the chat |
| `.squad` cannot be found | Run from the initialized repository; current resolution searches the working directory and parents, not a profile-wide fallback |
| Doctor reports missing team state | Confirm the repository root and that `init` succeeded; read the failing check. Team formation is a separate conversation, not a cure for failed scaffolding |
| Several agents overwrite work | Stop them; inspect the diff; assign one owner per file or use verified worktree isolation |
| Team repeatedly adds unrequested features | Tighten the task IDs and stop condition; use one named member |
| GitHub operations fail | Verify `gh` authentication and repository permissions without broadening access unnecessarily |
| A requested model is not used | Inspect resolved-model/fallback reporting and host availability |

Update the CLI through the same installation channel, then run `squad upgrade` and `squad doctor` in each initialized project. Review the diff and any local backups. Updating one global executable is not the same as refreshing every project's generated coordinator files.

Skip background work loops, remote-control access, SDK customization and marketplaces on your first project. Add one only when a specific workflow needs it and you understand its permissions, stop condition and cost.

## Check Your Understanding

**1. Does a Spec Kit `[P]` marker make simultaneous edits to the same file safe?**

> **✅ Answer:** No. Respect dependencies and file ownership. Parallel contexts do not guarantee filesystem isolation.

**2. Does exporting a team create a clean, anonymous starter template?**

> **✅ Answer:** No. An export can include project decisions and history. Review and sanitize it before reuse, especially across clients.

**3. If Squad says the feature is done, what comes next?**

> **✅ Answer:** Inspect the combined diff, run checks, reconcile task state, assess remaining gaps, and apply the human-controlled release gates.

[← Spec Kit walkthrough](spec-kit.md) · [Shipping and reusing the workflow →](sdd-production.md)
