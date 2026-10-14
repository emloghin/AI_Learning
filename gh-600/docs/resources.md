# GH-600 Resources & References

A catalog of study materials for the GH-600 exam (GitHub Certified: Agentic AI Developer) — official modules, documentation, study guides, videos, and practice resources. Items marked **(community, unofficial)** are not published by GitHub or Microsoft.

Navigation: [Home](index.md) · [D1](domain-1.md) · [D2](domain-2.md) · [D3](domain-3.md) · [D4](domain-4.md) · [D5](domain-5.md) · [D6](domain-6.md) · [Glossary](glossary.md)

---

## 1. Official Microsoft Learn Modules

These six modules form the core Learn training for GH-600. **Start here.** Note: the official study guide's "Get trained" section links only the first three; the other three are live on Microsoft Learn and cover Domains 3–6.

### Foundations of Agentic AI in GitHub
*Module · All domains*

Introductory module covering what agentic AI means in the GitHub ecosystem: how the developer role shifts to guiding, reviewing, and validating agents across the SDLC, and GitHub's role as system of record and control plane. Prerequisite reading before diving into individual domains.

**Good for:** Building foundational vocabulary and understanding the big picture.

https://learn.microsoft.com/en-us/training/modules/foundations-agentic-ai/

### Designing Agent Architecture and SDLC Integration
*Module · Domain 1*

Agent architecture patterns, SDLC integration points (branches, pull requests, checks, repository rules), planning vs execution boundaries, and observability. Maps to Domain 1.

**Good for:** Agent architecture patterns, SDLC integration, and planning/execution separation.

https://learn.microsoft.com/en-us/training/modules/design-agent-architecture-integration/

### Tooling, MCP, and Agent Execution Environments
*Module · Domain 2*

How agents interact with tools, APIs, and execution environments: MCP, GitHub Actions, agentic workflows, execution boundaries and safeguards. Domain 2 is the heaviest domain (20–25%).

**Good for:** Tool selection, MCP configuration, execution environments, error handling.

https://learn.microsoft.com/en-us/training/modules/agent-tooling-mcp-execution-environments/

### Memory, State, and Evaluation
*Module · Domains 3 & 4*

Agent memory structure, persisting progress through GitHub artifacts, consistency across environments (Domain 3), and defining success signals, error analysis, and tuning (Domain 4).

**Good for:** Memory strategies, state management, evaluation criteria, and tuning levers.

https://learn.microsoft.com/en-us/training/modules/memory-state-evaluation/

### Multi-Agent Systems and Orchestration
*Module · Domain 5*

Designing multi-agent systems that coordinate through GitHub-native artifacts, stay observable through logs and workflow outputs, and recover safely via retry, rollback, and human escalation.

**Good for:** Multi-agent design patterns, orchestration strategies, isolation mechanisms, and observability.

https://learn.microsoft.com/en-us/training/modules/multi-agent-systems-orchestration/

### Governance, Guardrails, and Operations
*Module · Domain 6*

Risk-based autonomy, GitHub-native controls (rulesets, checks, CODEOWNERS, environments), human-in-the-loop workflows, least-privilege permissions, and governance maintenance.

**Good for:** Governance frameworks, guardrail configuration, human-in-the-loop design, and auditability.

https://learn.microsoft.com/en-us/training/modules/governance-guardrails-operations/

---

## Hands-On Labs

Guided exercises verified to exist on Microsoft Learn and GitHub Skills (October 2026). GitHub Skills exercises copy a template repository into your account and a bot guides you step by step; use a **public** copy, as the exercises recommend. Copilot cloud agent requires a paid Copilot plan (Pro or higher). For a week-by-week order, see the study plan in [Start Here: Fundamentals](basics.md#11-suggested-beginner-study-plan-24-weeks).

| Lab | Platform | Domain(s) | What you practice | Link |
|---|---|---|---|---|
| Introduction to GitHub | GitHub Skills | Prerequisite (D1) | Branch, commit, open and merge a pull request | [skills/introduction-to-github](https://github.com/skills/introduction-to-github) |
| Exercise – A guided tour of GitHub | Microsoft Learn | Prerequisite (D1) | Repositories, GitHub flow, issues, notifications | [introduction-to-github](https://learn.microsoft.com/en-us/training/modules/introduction-to-github/) |
| Review pull requests | GitHub Skills | D1, D6 | Request, leave, suggest, and apply reviews before merging | [skills/review-pull-requests](https://github.com/skills/review-pull-requests) |
| Exercise – Reviewing pull requests | Microsoft Learn | D1, D6 | PR statuses, reviewing and merging into a base branch | [manage-changes-pull-requests-github](https://learn.microsoft.com/en-us/training/modules/manage-changes-pull-requests-github/) |
| Hello GitHub Actions | GitHub Skills | D2 | Workflow file, job, run step, watching a run | [skills/hello-github-actions](https://github.com/skills/hello-github-actions) |
| Exercise – Create and run a basic GitHub Actions workflow | Microsoft Learn | D2 | Workflow components, triggers, a container action | [github-actions-automate-tasks](https://learn.microsoft.com/en-us/training/modules/github-actions-automate-tasks/) |
| Getting Started with GitHub Copilot | GitHub Skills | D2 | Copilot interaction modes in a Codespace, plan agent, PR summary and review | [skills/getting-started-with-github-copilot](https://github.com/skills/getting-started-with-github-copilot) |
| Build applications with GitHub Copilot agent mode | GitHub Skills | D2, D4 | Prompting agent mode to build and iterate on a multi-tier app | [skills/build-applications-w-copilot-agent-mode](https://github.com/skills/build-applications-w-copilot-agent-mode) |
| GitHub skills exercise (agent mode module) | Microsoft Learn | D2, D4 | Agent mode in a Codespace: fix errors, refactor, add features | [github-copilot-agent-mode](https://learn.microsoft.com/en-us/training/modules/github-copilot-agent-mode/) |
| Customize Your GitHub Copilot Experience | GitHub Skills | D2, D4 | Repository and path-specific instructions, agent skills, custom agents | [skills/customize-your-github-copilot-experience](https://github.com/skills/customize-your-github-copilot-experience) |
| Integrate MCP with GitHub Copilot | GitHub Skills | D2 | GitHub MCP server setup, issue management from agent mode, idea to PR | [skills/integrate-mcp-with-copilot](https://github.com/skills/integrate-mcp-with-copilot) |
| Exercise – Automate repository updates with GitHub Agentic Workflows | Microsoft Learn (GH-600 module) | D2, D1, D6 | `gh aw` setup, a Markdown agentic workflow, reviewing its PR | [agent-tooling-mcp-execution-environments/exercise](https://learn.microsoft.com/en-us/training/modules/agent-tooling-mcp-execution-environments/exercise) |
| Create applications with the Copilot CLI | GitHub Skills | D2, D5 | Standalone Copilot CLI: issues from templates, iterative development in the terminal | [skills/create-applications-with-the-copilot-cli](https://github.com/skills/create-applications-with-the-copilot-cli) |
| Expand your team with Copilot cloud agent | GitHub Skills | D1, D2, D3, D5 | Enable cloud agent, assign issues, review its PRs, customize its environment, parallel tasks | [skills/expand-your-team-with-copilot](https://github.com/skills/expand-your-team-with-copilot) |
| Enable CodeQL to secure your source code | GitHub Skills | D4, D6 | Enable code scanning, review alerts, fix vulnerabilities | [skills/introduction-to-codeql](https://github.com/skills/introduction-to-codeql) |
| Secure your repository's supply chain | GitHub Skills | D6, D4 | Dependency graph, Dependabot alerts, security and version updates | [skills/secure-repository-supply-chain](https://github.com/skills/secure-repository-supply-chain) |
| Exercise – Build an AI dream team with GitHub Copilot CLI custom agents | Microsoft Learn (GH-600 module) | D5, D1 | Orchestrator, planner, designer, and coder custom agents in `.github/agents/`; coordinated handoff | [multi-agent-systems-orchestration/exercise](https://learn.microsoft.com/en-us/training/modules/multi-agent-systems-orchestration/exercise) |

The other four GH-600 modules (Foundations, Architecture, Memory/State/Evaluation, Governance) have no exercise unit. No verified guided lab covers rulesets or branch protection; practice them in your own test repository using [Domain 6](domain-6.md).

---

## 2. GitHub Documentation

Official GitHub Docs pages covering the implementation details the exam tests. The first six are the per-domain documentation links listed in the official study guide.

| Domain (per study guide) | Page | What it covers |
|---|---|---|
| D1 – Agent architecture & SDLC | [Preparing to use custom agents in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) | Org-level custom agents stored in `agents/` of the org `.github` / `.github-private` repo |
| D2 – Tool use & environment / D5 – Multi-agent | [Custom agents and sub-agent orchestration (Copilot SDK)](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/custom-agents) | Per-agent prompts, scoped `tools`, MCP servers, sub-agent delegation and lifecycle events |
| D3 – Memory, state & execution | [About GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | Repository facts vs user preferences, citation validation, 28-day deletion of unused entries |
| D4 – Evaluation, error analysis & tuning | [Implementation planner (customization library)](https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents/implementation-planner) | Example custom agent profile (`tools: ["read", "search", "edit"]`) that writes Markdown implementation plans |
| D6 – Guardrails & accountability | [Building guardrails for Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) | Policies, rulesets, CODEOWNERS for Copilot/MCP config, runners, secrets |
| D6 – Guardrails & accountability | [Risks and mitigations for Copilot cloud agent](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) | Built-in protections of Copilot cloud agent |

Additional pages (replacing the original site's broken links):

### Copilot Memory documentation
How Copilot Memory stores, validates, and expires memories, and how to enable/manage it.

**Good for:** Domain 3 memory configuration details.

[Concept](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) · [Manage for yourself](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-for-yourself)

### Custom agent configuration
How to define custom agents in `.github/agents/*.agent.md` — frontmatter (`description` required, `name`, `target`, `tools`, `model`, `disable-model-invocation`, `user-invocable`, `mcp-servers`, `metadata`), tool aliases, and MCP server configuration. (Agent profiles have no "autonomy level" field; autonomy is controlled through tools, MCP, and repository controls.)

**Good for:** Hands-on agent profile creation and least-privilege configuration.

[Creating custom agents for Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents) · [Custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

### Implementation Planner
An **example custom agent** from GitHub's customization library (not a built-in GitHub planning tool) that breaks features into phases/tasks and writes Markdown implementation plans.

**Good for:** Understanding planning agents with limited tools and the planning-to-execution handoff.

https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents/implementation-planner

---

## 3. Community Study Materials

Created by the GH-600 study community. These go beyond the official modules with flashcards, mock exams, and labs.

### jtur671/gh-600-study-guide (community, unofficial)
*All domains*

Community study repository. Contains **67 flashcards** (`flashcards.md`), a **41-question mock exam** with answer key (`mock-exam.md`), **6 hands-on labs** focused on the tool-use and custom-agent domains (`lab-guide.md`), Mermaid diagrams (`diagrams.md`), and **Anki decks** (`media/gh-600.apkg`, `media/nlm-flashcards.apkg`).

**Good for:** Flashcards for quick review, mock exam for practice, labs for hands-on learning, Anki for long-term retention.

[Repository](https://github.com/jtur671/gh-600-study-guide) · [Flashcards](https://github.com/jtur671/gh-600-study-guide/blob/main/flashcards.md) · [Mock exam](https://github.com/jtur671/gh-600-study-guide/blob/main/mock-exam.md) · [Labs](https://github.com/jtur671/gh-600-study-guide/blob/main/lab-guide.md)

### Naim149 "GH-600 Public Study Guide" gist (community, unofficial)
*File paths*

A **full study workbook** (~2,600 lines, organized by all six domains) in a single GitHub Gist: Copilot customization file inventory (`.github/agents/*.agent.md`, `.github/instructions/*.instructions.md`), custom-agent configuration, MCP transport types, Copilot CLI commands and `~/.copilot/` paths, hooks, and concurrency. The artifact/file-path mapping tables are one component. Verify details against the official docs above.

**Good for:** Second full pass after the Learn modules; quick lookup of file paths during study sessions.

https://gist.github.com/naim149/a8aa41c7468685b7d984822c38863aae

### More community study repos (community, unofficial)
*All domains*

Additional community material that appeared after the beta (verified reachable October 2026):

| Resource | What it offers | Link |
|---|---|---|
| vicentegnz GH-600 study plan | Study plan, practice questions, and a rendered companion site | [github.com/vicentegnz/GH-600-Developing-in-Agentic-AI-Systems](https://github.com/vicentegnz/GH-600-Developing-in-Agentic-AI-Systems) |
| serkutYILDIRIM GH-600 guide | Six domain deep-dives, flashcards, mock exam, labs | [github.com/serkutYILDIRIM/gh-600-agentic-ai-developer-guide](https://github.com/serkutYILDIRIM/gh-600-agentic-ai-developer-guide) |
| CertyPro GH-600 course | Free 15-lesson course with per-domain lab repos, cheat sheets, capstone, practice questions | [github.com/CertyPro/certy-gh600-course-content](https://github.com/CertyPro/certy-gh600-course-content) |
| jetstreamin practice Q&A | 50+ practice questions with answers | [jetstreamin.github.io](https://jetstreamin.github.io/gh-certifications/gh-600-practice-questions-answers.html) |
| gh600lab.com | Free 12-question diagnostic; paid practice scenarios and timed mock exams | [gh600lab.com](https://www.gh600lab.com/) |

⚠️ Avoid dump vendors (e.g. sites advertising "real exam questions" with match-rate claims): exam content is under NDA, and their material is fake or stolen.

---

## 4. Video Resources

| Resource | Description | Good for | Link |
|---|---|---|---|
| **PromptLab — "GH-600 GitHub Agentic AI Developer Certification — Full Study Series"** (community, unofficial) | Free YouTube playlist, one video per exam domain plus an overview (7 videos). | Domain overviews, visual explanations. | [Watch playlist](https://www.youtube.com/playlist?list=PLxgUmxsBhjMhyjJhNM9dxSCdJj2yExS2Y) |
| **Microsoft Reactor — "The Agentic AI Developer: Deep Dive into the GitHub GH-600 Certification"** | Walkthrough of the six exam domains with study tips, on the Microsoft Reactor channel. | Domain overview, study strategy. | [Watch on YouTube](https://www.youtube.com/watch?v=bgj20o0kYKg) |
| **Agent Orchestration On-Demand** (Microsoft Reactor session on multi-agent orchestration, attributed by the original site to Ari Levigny, May 7) | Multi-agent teams with orchestrator, planner, coder, and designer agents. | Multi-agent orchestration patterns. | ⚠️ **Link not found** — the original site linked the same video as the Deep Dive above; the session's own URL could not be verified. |

---

## 5. Practice & Exam

| Resource | Description | Good for | Link |
|---|---|---|---|
| **Exam sandbox** (official) | Demo of the exam **user interface** — try the different question types before test day. It is not a GitHub repository playground. | Getting familiar with the exam UI and question formats. | https://ghcertdemo.starttest.com/ |
| **Community mock exam** (community, unofficial) | 41-question mock exam in the jtur671 repo (Section 3). The original site also mentioned Quizlet/StudyBlue tests but gave no links — unverified. | Self-assessment, identifying weak domains. | [mock-exam.md](https://github.com/jtur671/gh-600-study-guide/blob/main/mock-exam.md) |
| **LeetCode Discussion — GH-600** (community, unofficial) | ⚠️ **Dead link** — `leetcode.com/discuss/gh-600` shows the generic Discuss feed, no GH-600 thread. | — | ~~https://leetcode.com/discuss/gh-600~~ |
| **Udemy course** (community, unofficial) | ⚠️ **Dead link** — returns HTTP 404. | — | ~~https://www.udemy.com/course/gh-600-gh600/~~ |

For hands-on practice with real agent configuration, use your own test repository with Copilot cloud agent, or the labs in the jtur671 repo.

---

## 6. Registration & Exam Details

### GitHub Certified: Agentic AI Developer — certification page
*Official*

Hosted on Microsoft Learn. Exam overview, skills measured, preparation resources, and registration. Key facts: **120 minutes**, proctored, scheduled **through Pearson VUE**, passing score **700**, offered in **English** only. GitHub certifications are **valid for 2 years**. GitHub is transitioning to Microsoft's recertification process: certifications expiring before the new process is available are **extended by 6 months**, and already-expired certs can get **one free renewal-attempt voucher** by emailing **learn@github.com**. The number of questions and case studies is **not published** by Microsoft; "56 questions + 2 case studies" is unverified community info (still the post-GA consensus on Reddit as of October 2026).

**Good for:** Exam registration, official details, skill domain breakdown.

https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-developer/ (short link `gh.io/gh-600` redirects here)

### Official study guide
*Official*

Web page on Microsoft Learn (not a PDF). Contains the skills measured with domain weights, the audience profile, and links to training and GitHub Docs. For question formats, use the exam sandbox.

**Good for:** Exam blueprint reference, understanding what's tested, study planning.

https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-600

### Beta discount code GH600Flanders — expired (historical)
*Discount · no longer applicable*

During the beta, the community reported code **GH600Flanders** for **80% off** for the first 100 candidates. The beta has ended (community sources: beta through **May 31, 2026**, GA **July 2026**; beta results took 8–12 weeks). Use current pricing on the certification page.

---

## Quick-Reference: Which Resource for What?

| If You Need... | Use This Resource |
|---|---|
| Official learning path | Microsoft Learn Modules (Section 1) |
| Quick domain overviews | PromptLab 7-Video Series (Section 4) |
| Deep hands-on practice | jtur671 6 Labs (Section 3) |
| Flashcard memorization | jtur671 Anki Decks + 67 Flashcards (Section 3) |
| Simulated exam experience | jtur671 41-Question Mock Exam (Section 3) + Exam sandbox for the UI (Section 5) |
| File path reference | Naim149 Gist (Section 3), verified against GitHub Docs (Section 2) |
| Implementation details | GitHub Docs — Custom agents, Memory, MCP, Guardrails (Section 2) |
| Exam logistics | Certification page + Study guide (Section 6) |
| Community tips & Q&A | Reddit (see [index](index.md)); the LeetCode link is dead |
| Exam UI familiarization | Exam sandbox (Section 5) |
| Discounted exam registration | No current beta discount — GH600Flanders expired (Section 6) |

---

## Exam Tips from Ari Levigny (Microsoft Reactor)

Key takeaways the original site attributes to Ari Levigny's (GitHub Sr. Developer Advocate) Microsoft Reactor sessions — useful for last-minute review and study prioritization.

> - **"Trust but verify"** — evaluate work by workflow standards, not novelty of author
> - **Plan → Act → Evaluate** is the central cycle
> - **Domain 2 (Tooling)** is the heaviest (20–25%) — spend the most study time here
> - Planning agents should be **read-only** (just read/search tools)
> - **Context rot/drift** happens when context windows get too full
> - Agents never merge directly to main — always **PR + checks + review**
> - **Execution without validation** is an anti-pattern
> - Understand **least privilege** for tools, branches, environments
> - *(Historical)* **Beta exam counts** — passing the beta earned the same credential as GA; the beta has ended
> - GitHub Actions knowledge needed at **high level only**, not deep YAML

---

[← Glossary](glossary.md) · [Home →](index.md)
