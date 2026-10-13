# GH-600 Glossary of Terms

Every exam-critical term defined in context. Each entry includes exam context, related file paths, and domain tags.

46 terms. Navigation: [Home](index.md) · [D1](domain-1.md) · [D2](domain-2.md) · [D3](domain-3.md) · [D4](domain-4.md) · [D5](domain-5.md) · [D6](domain-6.md) · [Resources](resources.md)

---

## A

### Agent
*Domain 1*

An **autonomous AI system** that takes actions against real infrastructure within the SDLC (Software Development Lifecycle). Unlike chatbots that only answer questions, agents execute tool calls — reading, editing, running commands, delegating sub-tasks, and persisting results. The exam defines agents by their **autonomy level** and **tool set**.

### Agent Firewall
*Domain 2*

The configurable **network firewall** of Copilot cloud agent that limits which external domains/URLs the agent can reach at runtime (org and repo settings, recommended allowlist on by default). It does not cover MCP server processes or `copilot-setup-steps` and doesn't apply to self-hosted runners. See [Customize the agent firewall](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall).

### Agent Skill
*Domain 2*

A packaged capability in `.github/skills/<skill>/SKILL.md` (frontmatter `name` + `description`, plus instructions and optional resources). Loaded on demand when invoked (`/skill-name`) or when the agent decides it is relevant — unlike custom instructions, which always apply.

`.github/skills/<skill>/SKILL.md`

### Agents Secrets
*Domain 6*

Secrets and variables stored in the repository's **Agents** secrets settings. These are the only secrets exposed to Copilot cloud agent (e.g. for MCP servers via `COPILOT_MCP_*`); regular Actions secrets are not passed to it.

### Agent Profile
*Domain 2*

A Markdown file with YAML frontmatter that defines a custom agent. Repository-level profiles live in `.github/agents/*.agent.md`; organization/enterprise-level profiles live in the `agents/` directory of the org's `.github` or `.github-private` repository. Frontmatter properties: **`description`** (the **only required** field), `name`, `target` (`vscode` or `github-copilot`; both if unset), `tools`, `model`, `disable-model-invocation`, `user-invocable`, `mcp-servers`, and `metadata`. `mcp-servers` and `metadata` are ignored by VS Code/IDE custom agents. `infer` is **retired** — use `disable-model-invocation` / `user-invocable` instead. The Markdown body (the agent prompt) can be up to 30,000 characters.

`.github/agents/*.agent.md`

### Autonomy Level
*Domain 1*

Microsoft Learn's four levels: **1. Read-only** (inspect, summarize, recommend), **2. Propose-only** (create branches/PRs, no merge or deploy), **3. Execute with guardrails** (run pre-approved workflows within limits), **4. Human-authorized execution** (high-impact actions only after human approval). Map risk to autonomy: *higher risk = lower autonomy*; start low and expand progressively. See [Domain 6](domain-6.md#autonomy-levels).

### Autonomy Mismatch
*Domain 1*

An **anti-pattern** where an agent is granted more autonomy than a task requires (over-privileged) or less than it needs (under-privileged). Over-privileged agents create unnecessary risk; under-privileged agents can't complete their work. Fix: **match the minimum autonomy level to the task's actual requirements**.

## B

### Branch Protection
*Domain 6*

GitHub rules that **prevent direct pushes** to protected branches (typically `main` or `production`). Requirements include: pull request reviews, passing status checks, up-to-date branches, and no force pushes. **Essential for agent governance** — agents should never bypass branch protection. (Copilot cloud agent is already blocked from pushing to the default branch and from merging PRs.)

### Bypass List
*Domain 6*

A configured list of **actors exempt** from a ruleset's rules. Eligible actors are **roles** (repository admin, organization/enterprise owner, maintain, write or custom write-based roles), **teams** (not secret teams), **GitHub Apps**, and **Dependabot** — not arbitrary individual users. In agent contexts, a bypass list might allow a specific CI app to merge without human review while requiring it for all other agents. **Use sparingly** — bypass lists reduce governance.

## C

### Case Study
*Domain 1*

A **scenario-based exam question format**. Each case study presents a realistic agent system scenario with multiple sub-questions. You must analyze the situation, identify problems, and choose the correct architectural decisions. The original site states there are **2 case studies** (56 questions total) — *this is not stated in official Microsoft Learn/GitHub sources; treat as unverified*.

### CI Integration
*Domain 2*

Running agents within GitHub Actions. For **Copilot cloud agent**, the environment is customized by `.github/workflows/copilot-setup-steps.yml`: a workflow with a single job that **must be named `copilot-setup-steps`**, whose steps run in GitHub Actions before Copilot starts working. Only `steps`, `permissions`, `runs-on`, `services`, `snapshot`, and `timeout-minutes` (max 59) can be customized, and the file must be on the default branch. Copilot receives its own token for its session; the `GITHUB_TOKEN` is only used by the setup steps. Each Actions run is ephemeral; cross-session context comes from durable artifacts and, for Copilot cloud agent, **Copilot Memory**.

`.github/workflows/copilot-setup-steps.yml`

### Concurrency
*Domain 6*

The ability of multiple agents to **operate simultaneously** on the same repository or workflow. Concurrency introduces risks of conflict (two agents editing the same file), race conditions, and coordination failures. Managed through **isolation strategies**, **branch strategies**, and **GitHub Actions concurrency groups**.

### Context Drift
*Domain 3*

When an agent's **internal model of the world diverges from reality**. Caused by stale memory, external state changes, concurrent modifications, or erroneous assumptions. Detection strategies include **re-read confirmation**, **timestamp checking**, and **consistency validation**. Correction: *re-read → re-validate → re-plan*.

### Control Plane
*Domain 1*

The **central management layer** that governs all agent activity. GitHub serves as the control plane for agentic AI systems — it manages agent registration, authentication, authorization, audit logging, and governance policies. The control plane is **distinct from the data plane** (where agents execute actions).

### Copilot Memory
*Domain 3*

GitHub's **long-term memory** feature (public preview), used by Copilot cloud agent, Copilot code review, Copilot CLI, and agentic autofix. Stores **repository-level facts** (coding conventions, architectural decisions, build commands) and **user-level preferences** (personal coding style/workflow). Repository facts are stored with code citations and **validated against the current branch** before use. Any fact or preference that goes **unused for 28 days is automatically deleted**; the timer may reset when Copilot successfully validates and uses an entry. Code review uses repository facts only.

## D

### Durable Artifact
*Domain 3*

A **permanent record** of agent activity that survives session termination. Includes **commits** (Git history), **PRs** (change proposals with reviews), **workflow logs** (CI execution records, 90-day retention by default, configurable), and **issues/comments** (persistent threads). Durable artifacts are the **system of record** for agent actions.

## E

### Environment Protection
*Domain 6*

GitHub **deployment protection rules** that gate deployments to specific environments (e.g., production, staging). Rules include: required reviewers, wait timers, and deployment branch/tag restrictions. **Critical for agent governance** — prevents agents from deploying without human approval.

### Error Handling
*Domain 2*

The **retry, rollback, and escalation patterns** that govern what an agent does when a tool call fails. Best practices: implement **exponential backoff** for transient errors, **rollback changes** on critical failures, and **escalate to a human** when retries are exhausted. **Silent failure** (agent fails without notification) is a key anti-pattern.

### Evaluation
*Domain 4*

The process of **measuring agent output against defined success criteria**. Core to the **Plan-Act-Evaluate (PAE)** loop. Uses **evaluation signals** (functional, quality, compliance, process) to determine if an agent performed correctly. Includes automated scanning (CodeQL, Dependabot, Secret Scanning) and human review (PR review).

### execute (Tool)
*Domain 2*

The tool alias that allows the agent to **run shell commands, scripts, tests, and build commands**. Compatible aliases: `shell`, `Bash`, `powershell` (maps to the `bash`/`powershell` shell tools in cloud agent). Permission level: **Write + Execute** (orange). Used when the agent needs to *run* code. **Not** for editing files — that's the **edit** tool. **Exam tip:** Never choose `execute` when `edit` will do — that's privilege creep.

### edit (Tool)
*Domain 2*

The tool alias that allows the agent to **create, modify, or delete files** in the workspace (compatible aliases: `Edit`, `MultiEdit`, `Write`, `NotebookEdit`). Permission level: **Write** (yellow). Used when the agent needs to *change* code but doesn't need to run anything. Part of the five core agent tools in the least-privilege hierarchy.

### agent (Tool)
*Domain 2*

The tool alias (compatible: `custom-agent`, `Task`) that allows an agent to **invoke a different custom agent as a sub-agent** to accomplish a task. Permission level: **Highest autonomy** (red). Used to parallelize complex multi-step work or use specialized sub-agents. **Highest-risk tool** — requires strong governance.

### read (Tool)
*Domain 2*

The tool alias that allows the agent to **read file contents** (maps to `view` in cloud agent). Permission level: **Read-only** (green). Used when the agent needs to *see* code but not change it. The **lowest-privilege** tool in the hierarchy — always prefer `read` when the task only requires information gathering.

### search (Tool)
*Domain 2*

The tool alias (compatible: `Grep`, `Glob`) that allows the agent to **search for files or text in files**. Permission level: **Read-only** (green). Used when the agent needs to *find* something before it can read it. Unlike `read` which requires a known path, `search` discovers content across the repository.

## F

### Fleet (/fleet)
*Domain 5*

A **Copilot CLI** feature: the `/fleet` slash command (or the `--fleet` command-line option) makes the main agent act as an **orchestrator** that breaks a request/implementation plan into independent subtasks and runs them **in parallel via subagents**, each with its own context window (optionally using custom agents, e.g. `@test-writer`). Often combined with autopilot mode, but independent of it. More subagents can mean more AI-credit consumption.

`/fleet` (Copilot CLI slash command) · `copilot --fleet`

## G

### Guardrails
*Domain 6*

The **safety boundaries and governance controls** that constrain agent behavior. Include: **rulesets** (repo-level policies), **branch protection** (prevent direct pushes), **environment protection** (deployment gates), **CODEOWNERS** (required reviewers), and **autonomy levels** (capability limits). Guardrails are the **primary mechanism for safe agent deployment**.

## H

### Handoff
*Domain 5*

A custom-agent feature (VS Code) that suggests moving to the next agent with prepared context — e.g. planner → implementer → reviewer — defined in the profile's `handoffs` property (`label`, `agent`, `prompt`, optional `send`). Ignored by Copilot cloud agent on GitHub.com. In GitHub-native workflows, handoffs are made through durable artifacts (issues, PRs, workflow artifacts).

### Human-in-the-Loop (HITL)
*Domain 6*

A design where a human must approve before an agent performs a high-risk or irreversible action. Implemented with required PR reviews, CODEOWNERS, environment required reviewers, and "Approve and run workflows" for Copilot PRs. Apply only where it materially reduces risk to preserve delivery speed.

## L

### Least Privilege
*Domain 2*

The **security principle** that an agent should be granted only the minimum permissions necessary to complete its task. Applied through tool selection (choose `read` over `edit`, `edit` over `execute`), tool configuration (restrict commands and directories), and autonomy levels. **The single most tested concept in Domain 2.**

### Long-Term Memory
*Domain 3*

**Tier 2** of the three-tier memory hierarchy. Persists **across sessions** via **Copilot Memory**. Stores repository-level facts and user-level preferences. Unused entries are **auto-deleted after 28 days**. Distinguished from **short-term memory** (session-scoped, volatile) and **durable artifacts** (permanent records).

## M

### Matrix Strategy
*Domain 2*

A **GitHub Actions feature** that allows running a job across multiple combinations of variables (e.g., different OS, runtime versions, environments). In agent contexts, a matrix strategy enables testing agent behavior across **multiple configurations** simultaneously, providing **comprehensive evaluation signals** in a single workflow run.

### MCP
*Domain 2*

**Model Context Protocol** — an open standard that lets AI agents connect to external tools, data sources, and services through a standardized interface. Described as **"USB-C for AI agents"**. MCP architecture: Agent → MCP Client → MCP Server → External Service. Where it is configured depends on the surface:

- **Copilot cloud agent / code review:** repository **Settings → Copilot → MCP servers** (JSON with an `mcpServers` object), plus `mcp-servers` in a custom agent profile. GitHub and Playwright MCP servers are enabled by default.
- **Copilot CLI:** `~/.copilot/mcp-config.json` (user), and workspace `.mcp.json` / `.github/mcp.json`.
- **VS Code:** `.vscode/mcp.json` (uses a `servers` key).

`.mcp.json` · `.github/mcp.json` · `.vscode/mcp.json` · `~/.copilot/mcp-config.json`

### MCP Allow List
*Domain 2*

A **security control** that limits which MCP servers/tools an agent may use. Mechanisms:

- **Per-server `tools` list** in the MCP JSON configuration (required key; GitHub recommends allowlisting specific read-only tools rather than `*`).
- **Agent profile `tools`** property: `server-name/tool-name` or `server-name/*` to enable specific MCP tools; `tools: []` disables all tools.
- **Enterprise MCP allowlist** (generally available, via `managed-settings.json`) or **registry-based restriction** (public preview) to block non-approved servers across the company.

The agent profile's `mcp-servers` field *adds* servers; it is not itself an allow list. Least privilege: agents should only connect to servers/tools they actually need.

### MCP Registry
*Domain 2*

A **catalog of MCP servers** (HTTPS endpoints following the v0.1 MCP registry spec, e.g. `GET /v0.1/servers`) that an organization or enterprise can self-host or run in Azure API Center, and then use to **restrict which MCP servers developers can access**. Provides server metadata and connection details. Public preview; the private MCP registry policy does **not** apply to Copilot cloud agent.

### MCP Server
*Domain 2*

A **service that implements the Model Context Protocol**, exposing tools, data, or capabilities that agents can consume. A server entry has a name and a `type` (`local`/`stdio`, `http`, or `sse`); local servers specify `command`, `args`, and optional `env`; remote servers specify `url` and optional `headers`; and a `tools` list selects which tools are enabled. Defined in MCP configuration (repository MCP settings, `.mcp.json`, etc.) and/or in agent profiles via the `mcp-servers` field.

## N

### needs
*Domain 2*

A **GitHub Actions keyword** that defines job dependencies. In agent workflows, `needs` is used to **separate planning from execution** — a plan job runs first, then the execution job runs `if: needs.plan.result == 'success'`. `needs` only orders jobs; the **human review pause** comes from targeting an **environment with required reviewers** on the execution job. Together they enforce the **plan-review-execution gate** pattern.

## P

### Plan-Act-Evaluate (PAE)
*Domain 4*

The **core feedback loop** for all agentic AI systems. **Plan:** Agent generates a proposed approach. **Act:** Agent executes the plan (with human review gate). **Evaluate:** Agent's output is measured against success criteria. The loop repeats iteratively to improve agent quality. **The foundational model for Domain 4.**

### Plan-as-Checklist
*Domain 1*

An **anti-pattern** where an agent treats its plan as a **rigid checklist** rather than a set of intended outcomes. The agent generates a plan, the human approves it, and then the agent executes *exactly* what it said — even if conditions change. Fix: treat plans as **reviewable intent**, not fixed contracts. Agents should re-evaluate against current state.

## R

### Responsible AI (RAI)
*Domain 6*

Microsoft's principles — **fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability**. The exam expects autonomy levels and guardrails to stay compliant with organizational security and RAI standards, enforced by platform controls (not just written policy). See [Domain 6](domain-6.md#responsible-ai-standards-in-agent-governance).

### Root Cause Analysis
*Domain 4*

The process of tracing agent failures from **symptom → root cause → fix**. Uses a structured decision framework: Is the **configuration** correct? Are the **instructions** complete? Are **evaluation signals** catching the right things? The exam tests your ability to match symptoms (e.g., "agent produces wrong code") to root causes ("instructions too vague") and fixes ("add detailed instructions").

### Ruleset
*Domain 6*

A **named list of rules** enforced at the repository or organization level. **Branch/tag rulesets** target branches or tags (via `fnmatch` patterns) and control merge requirements, required checks, signed commits, commit metadata, force pushes, etc. **Push rulesets** block pushes by file path, file extension, path length, or file size. More flexible than traditional branch protection — multiple rulesets layer (most restrictive rule wins) and can be set to Evaluate mode. A **bypass list** exempts specific roles, teams, or GitHub Apps (useful for agent contexts).

## S

### Session Logs
*Domain 4*

The **complete timestamped record** of an agent's interaction — every prompt, every tool call, every output, every error. Used for **post-mortem analysis**, debugging failures, and auditing agent decisions. The **first diagnostic step** when an agent produces unexpected output is always: check the session logs.

### Short-Term Memory
*Domain 3*

**Tier 1** of the three-tier memory hierarchy. The agent's **working memory** for the current conversation or session. Includes conversation history, in-session decisions, intermediate results, and temporary state. **Volatile** — disappears when the session ends. Also called **session memory**. Do not confuse with **Copilot Memory** (long-term).

### System of Record
*Domain 1*

The **authoritative data source** for agent activity. GitHub serves as the system of record — all agent actions (commits, PRs, issues, workflow runs, comments) are recorded permanently. The control plane governs the system of record. **Durable artifacts** are the evidence stored in the system of record.

## T

### Tool
*Domain 2*

A **capability** that an agent can use to interact with the outside world. The five core tool aliases are **read**, **search**, **edit**, **execute**, and **agent**. Additional aliases are **web** (`WebSearch`/`WebFetch`: fetch URLs and web search) and **todo** (`TodoWrite`: structured task lists); both are **currently not applicable to Copilot cloud agent** but are supported in VS Code. If `tools` is omitted, all tools are enabled; `tools: []` disables all. Tools form a **permission hierarchy** from read-only (lowest) to agent (highest).

### Tool Tuning
*Domain 4*

One of the **four tuning levers** for improving agent performance. Involves adjusting which tools an agent has access to, adding tool-specific constraints (restricted commands, allowed directories), enabling/disabling the **web** tool, or adding/removing the **agent** tool. **Second priority lever** after instructions — lower risk than environment or MCP changes.

---

[← D6: Guardrails](domain-6.md) · [Resources →](resources.md)
