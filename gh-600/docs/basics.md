# Start Here: Fundamentals for GH-600

**Beginner primer · Read this first**

The six domain pages assume you already speak the language of AI agents, Git, GitHub Actions, and Copilot. This page teaches that language from zero. Each section is short, uses plain words and small examples, and links to the official source. Read it once end to end, then come back to any section when a domain page uses a term you don't recognize. Section 11 gives you a 2–4 week study plan with hands-on labs.

---

## 1. LLMs, Prompts, Tokens, and the Context Window

A **large language model (LLM)** is the "brain" behind Copilot. It reads text and predicts the most likely text that comes next. When you ask a question, the model isn't looking up an answer in a database; it produces the response that best continues your input ([Microsoft Learn: prompt engineering basics](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering)).

A **prompt** is everything the model receives for one request: your question, plus instructions, chat history, file contents, and tool results that the app adds behind the scenes.

Models read text as **tokens**, small chunks of text. A common word is often one token; rare words get split into several pieces ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering#space-efficiency)). Tokens matter because limits and cost are counted in tokens.

The **context window** is the maximum number of tokens the model can look at in one request. Think of it as the model's desk: everything it needs must fit on the desk at once. Anything that falls off the desk is simply not seen.

> **📘 In plain words:** The model has no memory between requests. Each time, the app re-sends the important parts of the conversation. "Memory" in an AI tool is really "what the tool chooses to put back on the desk".

> **💡 Example:** A Copilot CLI session keeps growing as you chat and as it reads files. When it reaches about 95% of the token limit, Copilot CLI automatically compresses older history; `/context` shows how the window is being used and `/compact` compresses on demand ([GitHub Docs: Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli#automatic-context-management)).

**Context drift** is what happens in long sessions: the original goal and early instructions get buried or summarized away, so the agent slowly wanders off-task. The fixes you will meet in [Domain 3](domain-3.md) all come from this section: keep tasks short, write plans and progress into files or pull requests (so they can be re-read), and put rules that must always apply into instruction files instead of chat.

> **⚠️ Common mistake:** Assuming that something you told the agent an hour ago is still "remembered". If it matters, write it into a file the agent re-reads (instructions, a plan, an issue).

---

## 2. Assistant vs Agent, and the Plan → Act → Evaluate Loop

An **assistant** answers or suggests; you do the work. Code completion and "explain this code" in chat are assistant behavior.

An **agent** is given a goal and takes actions to reach it: it reads files, edits code, runs commands, calls tools, and checks results, repeating until done or until it needs a human.

Agents work in a loop, not a straight line ([Microsoft Learn: plan, act, evaluate](https://learn.microsoft.com/en-us/training/modules/foundations-agentic-ai/3-explain-agent-lifecycle-plan-act-evaluate)):

1. **Plan** — interpret the goal and decide the steps. Good plans are visible artifacts, such as a checklist in an issue or the pull request description, with scope, success criteria, and a rollback or escalation path.
2. **Act** — execute in the repository: create a branch, change files, push commits, open or update a pull request, respond to review feedback.
3. **Evaluate** — judge the result with system signals: workflow runs and status checks, review feedback, and security signals such as code scanning and secret scanning.

If evaluation fails, the loop continues: revise the plan, adjust the change, re-evaluate, or hand off to a human.

> **📘 In plain words:** An assistant is a calculator; an agent is an intern with a to-do list. You check the intern's work with tests and reviews, not by asking "are you sure?"

> **💡 Example:** Goal: "Upgrade the `lodash` package to fix a vulnerability." Plan: issue checklist says which package, which version, and "CI green + alert closed" as success. Act: the agent edits `package.json`, commits on a branch, opens a PR. Evaluate: CI fails on one test, so the agent fixes the test and pushes again; the alert closes and checks turn green.

> **⚠️ Common mistake:** Treating the agent's confidence ("All done, everything works!") as evaluation. The Learn module is explicit: evaluation must be grounded in system signals, not in the agent's confidence.

---

## 3. Git and GitHub Basics

- **Repository (repo):** a project folder plus its full history, hosted on GitHub.
- **Commit:** a saved snapshot of changes with a message, an author, and a unique ID.
- **Branch:** a separate line of work. You change files on a branch without touching the main line.
- **Default branch:** the main line of the repo, usually `main`. What is on it is "the real code".
- **Pull request (PR):** a request to merge a branch into another (usually the default branch). It shows the diff, runs checks, and collects review comments.
- **Review:** a teammate reads the PR and comments, requests changes, or approves.
- **Merge:** applies the PR's commits to the target branch. After merging, the change is part of `main`.

> **💡 Example:** A tiny flow from your terminal:
>
> ```bash
> git switch -c fix-typo          # create and switch to a new branch
> # ...edit README.md...
> git add README.md               # stage the change
> git commit -m "Fix typo in README"  # save a snapshot
> git push -u origin fix-typo     # upload the branch to GitHub
> ```
>
> Then on GitHub: open a PR from `fix-typo` into `main`, wait for checks, get one approval, and merge.

**Why the PR is the unit of change agents produce.** An agent works on its own branch and proposes its work as a pull request. That gives you one place to see exactly what changed, run automated checks, require human review, and keep a permanent record of who (or what) changed what and why. Copilot cloud agent works exactly this way: it pushes to a `copilot/` branch and opens a PR for a human to review; it can't approve or merge its own work ([GitHub Docs: risks and mitigations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)).

> **📘 In plain words:** Agents propose; humans and policy accept. The PR is the "proposal form".

---

## 4. GitHub Actions Basics

**GitHub Actions** runs automation in response to things that happen in your repo. Agents interact with Actions constantly: their PRs trigger checks, and Copilot cloud agent itself runs in an Actions-powered environment.

- **Workflow:** a YAML file in `.github/workflows/` (for example `.github/workflows/ci.yml`).
- **Event (trigger):** what starts the workflow, set with `on:` — for example `push`, `pull_request`, `workflow_dispatch` (manual button), or `schedule`.
- **Job:** a group of steps that runs on one machine. Jobs run in parallel by default.
- **Step:** one command (`run:`) or one reusable action (`uses:`), executed in order inside a job.
- **Runner:** the machine that runs a job — GitHub-hosted (like `ubuntu-latest`) or self-hosted.
- **`needs`:** makes one job wait for another to succeed (creates an order).
- **`permissions`:** what the job's `GITHUB_TOKEN` is allowed to do. Setting any scope sets every unlisted scope to `none` ([workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions)).
- **`GITHUB_TOKEN`:** a token GitHub creates automatically at the start of each job, limited to this repository, that expires when the job finishes ([GitHub Docs: GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token)).
- **Secrets:** encrypted values (API keys, passwords) stored in settings and read as `${{ secrets.NAME }}`. They are masked in logs.
- **Environments:** named deployment targets (like `production`) that can require a human approval before a job runs and can hold their own secrets.
- **Artifacts:** files a run saves (test reports, build outputs) so you or later jobs can download them.
- **Logs:** every run has step-by-step logs on the repo's **Actions** tab — the first place to look when a check fails.

> **💡 Example:** A minimal workflow, one comment per line:
>
> ```yaml
> name: CI                                   # Name shown on the Actions tab
> on:                                        # Events that start this workflow
>   push:                                    # Run on pushes...
>     branches: [main]                       # ...to main (that is, after a merge)
>   pull_request:                            # Also run on every PR...
>     branches: [main]                       # ...that targets main
> permissions:                               # Default GITHUB_TOKEN scopes for all jobs
>   contents: read                           # Read-only code access (least privilege)
> jobs:                                      # The work, split into jobs
>   test:                                    # Job ID; also the check name on PRs
>     runs-on: ubuntu-latest                 # Runner: fresh GitHub-hosted Linux VM
>     steps:                                 # Steps run in order on that runner
>       - uses: actions/checkout@v4          # Reusable action: clone the repo
>       - run: npm ci && npm test            # Shell command; a non-zero exit fails the check
>       - uses: actions/upload-artifact@v4   # Reusable action: save files from this run
>         with:                              # Inputs for that action
>           name: test-report                # Artifact name on the run page
>           path: report/                    # Folder to upload
>   deploy:                                  # Second job
>     needs: test                            # Start only if "test" succeeded
>     if: github.event_name == 'push'        # Deploy after merge only, never from a PR
>     runs-on: ubuntu-latest                 # Its own fresh runner
>     environment: production                # Waits here for a required reviewer
>     steps:                                 # Deploy steps
>       - uses: actions/checkout@v4          # Clone the repo again (new machine)
>       - run: ./deploy.sh                   # Run the deploy script
>         env:                               # Environment variables for this step
>           DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}  # Secret injected and masked in logs
> ```

> **⚠️ Common mistake:** Writing `permissions: write-all` "to make it work". Grant only the scopes a job needs; [Domain 6](domain-6.md) tests least privilege heavily.

### GitHub Actions vs Azure DevOps

If you know Azure DevOps, its CI/CD service is **Azure Pipelines**; GitHub's equivalent is **Actions**. The concepts map almost one-to-one, but the YAML vocabulary differs:

| Azure DevOps | GitHub Actions |
|---|---|
| Azure Pipelines (the CI/CD service) | GitHub Actions |
| Pipeline — one YAML file | Workflow — one YAML file in `.github/workflows/` |
| Stage | No stages: order jobs with `needs:` (or split into reusable workflows) |
| Job | Job (`runs-on` picks the machine) |
| Task (prebuilt, versioned, GUID-addressed) | Action (`uses:` — from GitHub Marketplace, a repo, or Docker) |
| Script step (`bash`/`pwsh:`) | `run:` step |
| Agent — Microsoft-hosted or self-hosted, from agent pools | Runner — GitHub-hosted (e.g. `ubuntu-latest`) or self-hosted |
| Trigger with branch filters | `on:` — `push`, `pull_request`, `schedule`, `workflow_dispatch`, etc. |
| Environment with approvals and checks | Environment with required reviewers (nearly identical concept) |
| Variable groups / secure files | Secrets and configuration variables (repo or environment scope) |
| Service connection | `GITHUB_TOKEN` with scoped `permissions:`, a GitHub App, PAT, or OIDC federation |
| YAML templates | Reusable workflows (`workflow_call`) and composite actions |
| Full ALM suite: Boards, Repos, Test Plans | Lighter: Issues and Projects; no built-in test-management equivalent |

The muscle memory that transfers: YAML jobs on fresh hosted machines, environments with human approvals, least-privilege credentials, and artifacts for passing files between jobs. The syntax you must relearn: `on:` triggers, `needs:` ordering, `permissions:` scoping, and `uses:` actions.

> **🎯 Exam angle:** GH-600 tests **GitHub Actions only** — never Azure Pipelines syntax. If you come from Azure DevOps, use the mapping above to translate concepts, then drill the Actions-specific keywords (`on:`, `needs:`, `permissions:`, `uses:`, `environment:`) that the exam expects.

---

## 5. YAML and Markdown Front Matter

**YAML** is a plain-text format for settings. You need to read it for workflows and for agent profiles.

```yaml
name: planner                 # key: value
tools: ["read", "search"]     # a list, inline style
labels:                       # a list, block style (each item starts with "- ")
  - docs
  - agent
timeout-minutes: 30           # a number
enabled: true                 # a boolean
description: |                # "|" keeps the following lines as multi-line text
  Line one.
  Line two.
```

Rules that matter: indentation uses **spaces** (never tabs) and shows nesting; `#` starts a comment; strings usually need no quotes, but quote them if they contain `:` or start with special characters.

**Front matter** is a YAML block at the very top of a Markdown file, between two `---` lines. The tool reads the YAML as settings and the Markdown below as instructions. This is how `.agent.md`, `.instructions.md`, `.prompt.md`, and `SKILL.md` files work.

> **💡 Example:** A custom agent profile, `.github/agents/planner.agent.md`:
>
> ```markdown
> ---
> name: planner
> description: Researches the codebase and writes an implementation plan. Never edits code.
> tools: ["read", "search"]
> ---
>
> You are a planning agent. Read the relevant files, then write a step-by-step
> plan with scope, success criteria, and risks. Stop after the plan.
> ```
>
> `description` is the only required key; `tools` is the enforced limit; the Markdown body is guidance ([custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)).

> **⚠️ Common mistake:** Leaving out `tools` to be "safe". Omitting `tools` gives the agent **all** tools; use `tools: []` for none. See [Domain 2](domain-2.md).

---

## 6. Governance Building Blocks

These are the GitHub controls that keep agents (and people) in check no matter what an agent "decides". [Domain 6](domain-6.md) goes deep; here is the one-paragraph version of each.

### Branch protection vs rulesets

Both protect branches, for example "no direct pushes to `main`" or "PRs need one approval". A **branch protection rule** is the older mechanism: one rule per branch pattern, managed by admins. A **ruleset** is the newer, more flexible one: several rulesets can apply to the same branch, you can turn a ruleset off (or, on GitHub Enterprise, to "evaluate" test mode) without deleting it, anyone with read access can see which rulesets apply, and a **bypass list** names who may skip the rules. When both exist, all rules apply and the strictest version wins ([GitHub Docs: about rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)).

> **💡 Example:** Ruleset "protect-main" targets the default branch: block force pushes, require a pull request with 1 approval, require the `test` check to pass. Bypass list: repository admins only.

### Required status checks

A required status check is a CI job that must pass before a PR can merge. It turns "tests should pass" into "tests must pass".

> **💡 Example:** Require the `test` job from the workflow in section 4. A PR with a failing test shows a red ❌ and the merge button stays disabled.

### Required reviews

A required review means a set number of approvals before merge. You can also dismiss old approvals when new commits arrive and require approval of the most recent push. For PRs that Copilot authors, the person who asked Copilot to create the PR can't approve it ([risks and mitigations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)).

> **💡 Example:** "Require 1 approval" + "Dismiss stale approvals". An agent pushes a fix after approval, so a human must look again.

### CODEOWNERS

A `CODEOWNERS` file (in `.github/`, the repo root, or `docs/`) maps paths to people or teams who are automatically requested as reviewers when those paths change. It only **blocks** merges when "Require review from Code Owners" is turned on in branch protection or a ruleset ([GitHub Docs: about code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)).

> **💡 Example:**
>
> ```text
> # .github/CODEOWNERS
> *                     @org/developers
> /.github/workflows/   @org/platform-team
> /.github/agents/      @org/ai-governance
> /.github/CODEOWNERS   @org/repo-admins
> ```

### Environments with required reviewers

An environment (like `production`) can list required reviewers. A job that uses `environment: production` pauses until one of them approves. It is the "second key" for irreversible actions such as deploying ([Deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)).

> **💡 Example:** The `deploy` job in section 4 waits with the status "Waiting for review". A release manager clicks **Approve and deploy**, and only then does `deploy.sh` run.

### Audit log

The audit log records who did what in an organization or enterprise: settings changes, permission changes, and agent activity. Filtering with `actor:Copilot` shows Copilot agent events, and each one links back to the person who started the session ([agentic audit log events](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events)).

> **💡 Example:** After an unexpected change, an admin filters the audit log by `actor:Copilot` and finds the `pull_request.create` event, the agent session ID, and the user who triggered it.

---

## 7. The Copilot Surfaces

GitHub Copilot shows up in several places. The exam expects you to know where each one runs and what it is allowed to do.

| Surface | Where it runs | Who triggers it | What it can change | Where config lives |
|---|---|---|---|---|
| **IDE — VS Code agent mode** | On your machine, inside the editor | You, in Copilot Chat (choose Agent) | Files in your workspace; runs terminal commands after your approval | `.github/copilot-instructions.md`, `.github/instructions/`, `.github/agents/`, `.github/prompts/`, `.vscode/mcp.json` |
| **Copilot CLI** | On your machine, in the terminal (`copilot`) | You, interactively or with `copilot -p "..."` | Files and shell commands in trusted directories; can create issues and PRs as you ([about Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)) | Custom instructions, `.github/agents/`, skills, hooks in `.github/hooks/`, MCP servers via `/mcp` |
| **Copilot cloud agent** (formerly "coding agent") | On GitHub, in an ephemeral GitHub Actions–powered environment | A user with write access: assign an issue, use the agents panel, chat, or `@copilot` on a PR | Only its own `copilot/` branch (or the PR branch when mentioned) in one repo; opens a PR for human review; max 59 minutes per session ([about cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)) | Instructions, `AGENTS.md`, `.github/agents/`, skills, hooks, `.github/workflows/copilot-setup-steps.yml`, repository settings (MCP, firewall) |
| **Copilot code review** | On GitHub.com PRs (agentic parts run on Actions) and in IDEs | Requesting Copilot as a reviewer, or automatic reviews set by a user, repo, or ruleset | Leaves review comments and suggested changes; it doesn't push to your branch, but it can hand suggestions to cloud agent, which opens a separate PR ([about code review](https://docs.github.com/en/copilot/concepts/agents/code-review)) | `.github/copilot-instructions.md`, `.github/instructions/`, `AGENTS.md`, skills (read from the PR's head branch), repository MCP settings |

> **📘 In plain words:** IDE and CLI are "agent at your desk" — you watch it work live. Cloud agent is "agent in the office down the hall" — you hand it an issue and get a PR back. Code review is "a reviewer who comments" rather than an author.

> **⚠️ Common mistake:** Assuming Copilot's review counts as the required approval. By default, Copilot's reviews don't count toward required approvals.

---

## 8. Customization Map

Every way to shape Copilot's behavior, in one table. [Domain 2](domain-2.md) and [Domain 4](domain-4.md) build on this.

| What | Path | When it applies |
|---|---|---|
| **Repository custom instructions** | `.github/copilot-instructions.md` | Always, for every Copilot request in that repo ([add repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)) |
| **Path-specific instructions** | `.github/instructions/*.instructions.md` with `applyTo: "glob"` in front matter | Automatically when Copilot works on files that match the glob (added on top of the repo-wide file) |
| **Agent instructions** | `AGENTS.md` (root or any folder; nearest one wins) | Always; shared with other AI tools, not only Copilot |
| **Custom agents** | `.github/agents/*.agent.md` | When you pick that agent (or another agent delegates to it); its `tools` list limits what it can do |
| **Agent skills** | `.github/skills/<name>/SKILL.md` | On demand: when invoked (`/skill-name`) or when the agent decides the skill is relevant |
| **Prompt files** | `.github/prompts/*.prompt.md` | Only when a user runs it manually in VS Code chat by typing `/` + its name |
| **Hooks** | `.github/hooks/*.json` | At lifecycle events in Copilot CLI and cloud agent (for example `preToolUse` can allow or deny a tool call); must be on the default branch for cloud agent ([use hooks](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-hooks)) |
| **MCP servers** | Repository settings (cloud agent and code review), `mcp-servers` in an agent profile, `.vscode/mcp.json` (VS Code), CLI config via `/mcp` | Whenever the agent decides to call one of the server's tools |
| **Cloud agent setup steps** | `.github/workflows/copilot-setup-steps.yml` (one job named `copilot-setup-steps`) | Before Copilot cloud agent starts working, to preinstall tools and dependencies |
| **Copilot Memory** | Stored by GitHub, managed in settings (no file) | Learned automatically as Copilot works; each memory is checked against the current code before use and deleted after 28 days unused ([about Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)) |

> **📘 In plain words:** Instructions are the house rules (always on). Agents are job descriptions (who does what, with which tools). Skills are recipes (used when needed). Prompt files are saved requests (you press the button). Hooks are security guards (they check actions as they happen). Memory is notes Copilot takes on its own.

> **⚠️ Common mistake:** Putting a custom agent definition in `AGENTS.md`. `AGENTS.md` holds instructions; agent definitions go in `.github/agents/`.

---

## 9. MCP in One Minute

The **Model Context Protocol (MCP)** is an open standard that lets AI apps plug into external tools and data in one consistent way — like USB for AI tools ([MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture)).

- **Host:** the AI app (VS Code, Copilot CLI, Copilot cloud agent).
- **Client:** a connector the host creates, one per server.
- **Server:** a program that offers capabilities, for example the GitHub MCP server or a database server.

A server can offer three kinds of things:

- **Tools** — actions the model can call (`create_issue`, `run_query`).
- **Resources** — data to read (file contents, records, schemas).
- **Prompts** — reusable templates.

Messages use **JSON-RPC 2.0** ("call this method with these arguments"). They travel over **stdio** (the host starts the server as a local process) or **HTTP** (Streamable HTTP, for remote servers reached by URL).

> **💡 Example:** You ask Copilot "find good first issues in this repo". The host sees that the GitHub MCP server offers a search tool, the client sends a `tools/call` JSON-RPC request, the server queries GitHub, and the result goes back into the model's context.

> **⚠️ Common mistake:** Enabling every tool a server offers. Each tool is a capability the agent can use; allow only the ones the task needs.

---

## 10. How the Six Domains Fit Together

Follow one feature request from idea to production. Each step maps to the domain that tests it.

1. **Issue.** A product owner opens an issue: "Add CSV export to the reports page", with acceptance criteria. → [Domain 1: Architecture](domain-1.md) (structured tasks with inputs, outputs, success criteria).
2. **Plan.** A planning agent with read-only tools writes a step-by-step plan into the issue. → [Domain 1](domain-1.md) (separating planning from execution).
3. **Agent works on a branch.** The issue is assigned to Copilot cloud agent. It runs with scoped tools and MCP servers, in an environment prepared by `copilot-setup-steps.yml`, and pushes to a `copilot/` branch. → [Domain 2: Tools & Environment](domain-2.md).
4. **State and memory.** The agent records progress in the PR description and commits, so a later session can resume without drifting. → [Domain 3: Memory & State](domain-3.md).
5. **Pull request.** The agent opens a PR that links the issue and summarizes the change. → [Domain 1](domain-1.md) (the PR as the unit of change).
6. **Checks and scans.** Required status checks run tests; CodeQL code scanning and secret scanning look for security problems. Failures send the agent back to fix them. → [Domain 4: Evaluation & Tuning](domain-4.md).
7. **Parallel work (optional).** A second agent writes docs on its own branch at the same time; conflicts are caught by checks and review. → [Domain 5: Multi-Agent](domain-5.md).
8. **Review.** CODEOWNERS request the right humans; a ruleset requires an approval from someone other than the person who triggered the agent. → [Domain 6: Guardrails](domain-6.md).
9. **Merge.** Rulesets enforce that nothing reaches `main` without passing checks and review. → [Domain 6](domain-6.md).
10. **Deploy with approval.** The deploy job targets the `production` environment and waits for a required reviewer. The audit log records every step. → [Domain 6](domain-6.md).

> **📘 In plain words:** Domains 1–2 set up the work, Domain 3 keeps it on track, Domain 4 checks it, Domain 5 scales it to many agents, and Domain 6 makes sure nothing unsafe gets through.

---

## 11. Suggested Beginner Study Plan (2–4 Weeks)

Do the weeks in order. On a tight schedule, combine weeks 1–2 and 3–4 for a 2-week plan. Labs marked **Skills** are GitHub Skills exercises: you copy a template repo and a bot guides you step by step. Use **public** repo copies, as the exercises recommend. Copilot cloud agent needs a paid Copilot plan (Pro or higher). All labs are listed with platform and domain in [Resources → Hands-On Labs](resources.md#hands-on-labs).

**Week 1 — GitHub foundations**

- Read: this page, then [Domain 1](domain-1.md).
- Learn module: [Foundations of Agentic AI in GitHub](https://learn.microsoft.com/en-us/training/modules/foundations-agentic-ai/).
- Labs:
  1. Skills: [Introduction to GitHub](https://github.com/skills/introduction-to-github) — branch, commit, PR, merge.
  2. Skills: [Review pull requests](https://github.com/skills/review-pull-requests) — request, leave, and apply reviews.
  3. Skills: [Hello GitHub Actions](https://github.com/skills/hello-github-actions) — your first workflow.
  4. Optional (Learn): [Automate development tasks by using GitHub Actions](https://learn.microsoft.com/en-us/training/modules/github-actions-automate-tasks/) — exercise unit included.

**Week 2 — Copilot, customization, tools, and MCP**

- Read: [Domain 2](domain-2.md) (the heaviest domain).
- Learn module: [Designing Agent Architecture and SDLC Integration](https://learn.microsoft.com/en-us/training/modules/design-agent-architecture-integration/) and [Tooling, MCP, and Agent Execution Environments](https://learn.microsoft.com/en-us/training/modules/agent-tooling-mcp-execution-environments/).
- Labs:
  1. Skills: [Getting Started with GitHub Copilot](https://github.com/skills/getting-started-with-github-copilot).
  2. Skills: [Build applications with GitHub Copilot agent mode](https://github.com/skills/build-applications-w-copilot-agent-mode).
  3. Skills: [Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience) — instructions, agent skills, custom agents.
  4. Skills: [Integrate MCP with GitHub Copilot](https://github.com/skills/integrate-mcp-with-copilot).
  5. Learn exercise: [Automate repository updates with GitHub Agentic Workflows](https://learn.microsoft.com/en-us/training/modules/agent-tooling-mcp-execution-environments/exercise).

**Week 3 — Cloud agent, memory, evaluation**

- Read: [Domain 3](domain-3.md) and [Domain 4](domain-4.md).
- Learn module: [Memory, State, and Evaluation](https://learn.microsoft.com/en-us/training/modules/memory-state-evaluation/).
- Labs:
  1. Skills: [Expand your team with Copilot cloud agent](https://github.com/skills/expand-your-team-with-copilot) — assign issues, review its PRs, customize its environment.
  2. Skills: [Create applications with the Copilot CLI](https://github.com/skills/create-applications-with-the-copilot-cli).
  3. Skills: [Enable CodeQL to secure your source code](https://github.com/skills/introduction-to-codeql) — code scanning as an evaluation signal.

**Week 4 — Multi-agent, governance, and practice**

- Read: [Domain 5](domain-5.md), [Domain 6](domain-6.md), and the [Glossary](glossary.md).
- Learn modules: [Multi-Agent Systems and Orchestration](https://learn.microsoft.com/en-us/training/modules/multi-agent-systems-orchestration/) and [Governance, Guardrails, and Operations](https://learn.microsoft.com/en-us/training/modules/governance-guardrails-operations/).
- Labs:
  1. Learn exercise: [Build an AI dream team with GitHub Copilot CLI custom agents](https://learn.microsoft.com/en-us/training/modules/multi-agent-systems-orchestration/exercise).
  2. Skills: [Secure your repository's supply chain](https://github.com/skills/secure-repository-supply-chain) (optional).
  3. In a test repo of your own: create a ruleset for `main` (require a PR, 1 approval, a required check), add a `CODEOWNERS` file, and add a `production` environment with a required reviewer. No verified guided lab covers rulesets, so build this one yourself using section 6.
- Practice: the community [mock exam](https://github.com/jtur671/gh-600-study-guide/blob/main/mock-exam.md) and [flashcards](https://github.com/jtur671/gh-600-study-guide/blob/main/flashcards.md) (unofficial), each Learn module's knowledge check, and the official [exam sandbox](https://ghcertdemo.starttest.com/) to get used to the exam interface.

> **💡 Example:** A 30-minute daily routine: 15 minutes reading one section of a domain page, 15 minutes in a lab. At the end of each week, take that week's Learn knowledge checks and note every term you couldn't explain in your own words.

> **⚠️ Common mistake:** Only reading. The exam is scenario-based; you remember "which control stops this?" much better after you have watched a required check block your own PR.

---

[← Home](index.md) · [Domain 1: Architecture →](domain-1.md)
