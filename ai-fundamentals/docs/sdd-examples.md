# Learn from Real Repositories: Spec Kit and Squad in Practice

**Chapter 16 · Real examples**

Reading someone else's finished work is the fastest way to see what "good enough" looks like. This page walks through public repositories where people used Spec Kit from an empty folder and on large existing codebases, quotes the prompts they actually typed, and points you to projects that ship real releases with their specs committed.

> **📘 In plain words:** Every example here is a public repository you can open in your browser. Nothing needs to be installed to learn from them. Read the prompts, open the generated `spec.md` and `tasks.md`, and compare them with what you would have written.

## 1. Before you open them

**They are examples, not gold standards.** The official [community walkthroughs page](https://github.github.io/spec-kit/community/walkthroughs.html) says its entries are "**not reviewed, nor endorsed, nor supported by GitHub**" and are "not official golden outputs for generated specs, plans, or tasks". All seven walkthroughs were written by one Spec Kit collaborator as demonstrations. Treat them as worked homework from a knowledgeable colleague.

**They use an older version.** The walkthrough repositories were created in March 2026 and refreshed in July 2026 for Spec Kit 0.14.3. This guide uses v1.4.5. The ideas carry over; some spellings do not.

| In the example you may see | With current Spec Kit and Copilot skills, use |
|---|---|
| `speckit.specify`, `/speckit.specify`, or picking an agent called `speckit.specify` | `/speckit-specify` |
| `/agent speckit.constitution` followed by a prompt (Copilot CLI, older layout) | `/speckit-constitution` followed by the prompt |
| `specify init . --integration copilot --integration-options="--skills"` | `specify init --here --integration copilot --script ps` in an empty folder; add `--force` only in a folder that already has files (skills are now the default layout) |
| `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` (no version) | The pinned install from the [setup page](spec-kit.md#2-install-once-initialize-each-project) |
| A prompt that is just `Execute` | Still valid: it means "run this step with no extra instructions" |

None of the walkthroughs states which AI model was used, so do not expect identical output when you repeat them.

## 2. Which example should I open?

| I want to see… | Open | Size of the starting code |
|---|---|---|
| The shortest complete run from an empty folder | [.NET command-line tool](https://github.com/mnriem/spec-kit-dotnet-cli-demo) | Empty |
| A from-zero run that includes clarify and analyze | [Spring Boot + React platform](https://github.com/mnriem/spec-kit-spring-react-demo) | Empty |
| Two features added to a large existing .NET application | [ASP.NET CMS](https://github.com/mnriem/spec-kit-aspnet-brownfield-demo) | About 307,000 lines |
| A feature added to a very large Java project, with a naming correction | [Java runtime](https://github.com/mnriem/spec-kit-java-brownfield-demo) | About 420,000 lines, 180 modules |
| An honest list of what went wrong, plus a step-by-step workshop | [Go and React dashboard](https://github.com/mnriem/spec-kit-go-brownfield-demo) | About 98,500 lines |
| Real products that ship releases with specs in the repository | [Section 6](#6-projects-that-ship-releases-with-specs-committed) | Varies |
| A real AI team definition in a production repository | [Section 7](#7-squad-in-practice) | — |

## 3. From zero: two greenfield runs

### Example A — a command-line tool in five prompts

Repository: [spec-kit-dotnet-cli-demo](https://github.com/mnriem/spec-kit-dotnet-cli-demo). A time-zone utility built from a blank directory. This is the minimal path: constitution, specify, plan, tasks, implement. The prompts below are quoted from its README, rewritten only in the command spelling.

```chat
/speckit-constitution Create principles focused on code quality, testing
standards, user experience consistency, and performance requirements. Include
governance for how these principles should guide technical decisions and
implementation choices.
```

```chat
/speckit-specify Create a command utility that I can use to determine the
current date and time for a given location using the timezone, the name of the
location, a zip code if in the US or whatever else would work to make it easy
to use. Add anything that would be relevant to be able to schedule meetings
across timezones easily.
```

```chat
/speckit-plan Use .NET core for a single binary deployment and make sure we can
generate it for various OS-es and architectures
```

```chat
/speckit-tasks Execute
```

```chat
/speckit-implement Execute
```

**What came out:** a spec of about 1,870 words, and a task list of **69 tasks**. Implementation needed **three** `implement` runs before every task was ticked.

**What to notice:**

- The `specify` prompt contains no technology at all. ".NET" appears only in the `plan` prompt. That separation of *what* from *how* is the core habit.
- Two sentences of request became 69 tasks. This is why you read `tasks.md` before implementing: the agent filled in a great deal ("add anything that would be relevant") and you should decide whether you want all of it.
- One `implement` run is often not enough. Repeating it is normal, not a failure.

### Example B — a web platform, with clarify and analyze

Repository: [spec-kit-spring-react-demo](https://github.com/mnriem/spec-kit-spring-react-demo). An analytics platform with a REST API, a database and a web front end. The sequence adds the two optional checks: specify → **clarify** → plan → tasks → **analyze** → implement (twice).

```chat
/speckit-specify Create a web-based platform that can be used to capture
performance analysis for LLM interactions / chats using prompt sent, tokens in,
tokens out, time started, time ended, tools called, etceteras. Make it possible
to store different iterations and make it possible to show graphs and all the
other relevant ways that one can determine performance. Include a REST API so
results can be uploaded. Include sample data so we can see how it would look like.
```

```chat
/speckit-plan Use Spring Boot with an embedded React frontend using PostgreSQL
and Docker compose
```

**What came out:** a spec of about 2,650 words, an OpenAPI contract, and **85 tasks**. The analyze step found gaps, which were resolved before implementing.

**The author's own lesson**, quoted from the README:

> **💡 Example:** "Additional agent-assisted Copilot work was needed to resolve runtime and integration issues stemming from context that was not provided to spec-kit upfront: JDK version, environment variable conventions, and API client configuration details. Providing that context in the plan prompt would have eliminated most of this work."

A one-line plan prompt is quick to type and expensive later. Compare it with the plan prompt in [our walkthrough](spec-kit.md#6-plan-the-implementation-and-the-verification), which names versions, test strategy and constraints.

## 4. Existing code: three brownfield runs

All three start the same way: clone a real open-source project, initialize Spec Kit inside it, and ask for a constitution based on the code. Each README notes that the project had no constitution or specification before.

**The constitution prompt used in all three:**

```chat
/speckit-constitution As this is a pre-existing brownfield project I need you
to analyze the codebase exhaustive and in-depth. Do NOT skim over but use
multiple iterations to do a deep analysis and use or create principles focused
on code quality, testing standards, user experience consistency, and
performance requirements. Include governance for how these principles should
guide technical decisions and implementation choices.
```

> **⚠️ Compare with this guide's advice:** this prompt lets the agent "use or create" principles. That is fine for a demonstration. For a project your team must live with, add the checking step from the [existing-projects page](sdd-existing-projects.md#5-phase-2-write-a-constitution-from-evidence): ask for the evidence behind each rule and delete the ones nobody actually agreed to.

### Example C — two features in a 307,000-line ASP.NET application

Repository: [spec-kit-aspnet-brownfield-demo](https://github.com/mnriem/spec-kit-aspnet-brownfield-demo), built on the open-source CarrotCakeCMS. The generated constitution has seven principles, including "Layered Architecture Fidelity", "Plugin Contract Compliance" and "Security by Default": names that clearly come from reading this particular codebase.

**Feature 1: local development infrastructure.** The specify prompt (about 170 words in full) asks for Docker Compose support so developers can run the database without installing SQL Server, and ends with an explicit boundary: "Containerizing CMSAdmin itself is out of scope." Result: **15 tasks**, three implement passes. One task was flagged as manual twice, and the third pass used the prompt `Perform the manual steps`.

**Feature 2: a read-only REST API.**

```chat
/speckit-specify Add a public read-only REST API to the CMS that exposes pages,
blog posts, navigation trees, content snippets, and widget zones as JSON
endpoints. API consumers should be able to query content by URL slug, category,
tag, date range, and site ID for multi-site setups. Secure the API with
token-based authentication so it can serve as a headless backend for SPAs,
static site generators, or mobile apps.
```

```chat
/speckit-plan Execute and keep in mind that we also need simple scripts to test
the API ourselves
```

Result: a spec of about 2,360 words, a 502-line plan, **45 tasks**, plus contract documents for authentication and endpoints and the requested test scripts.

**What to notice:** the first feature was small infrastructure, not a headline capability. That is a sensible first change: low risk, easy to verify, and it made the second feature testable. Neither feature ran clarify or analyze.

### Example D — a 420,000-line Java project, and a correction

Repository: [spec-kit-java-brownfield-demo](https://github.com/mnriem/spec-kit-java-brownfield-demo), built on the Piranha Jakarta EE runtime. The feature is a password-protected admin console.

```chat
/speckit-specify I want to be able to manage the applications hosted using the
Piranha Server distribution and as such I need a web application for that I can
use to manage it. It must be password protected and allow starting / stopping a
web application, show JVM memory statistics, and make it possible to deploy and
undeploy a web application.
```

```chat
/speckit-plan Store the web application module you will use to create the WAR
project in webapp/server-admin. Use JSP pages for the UI so we have minimal web
dependencies. Piranha Server already has JSP available as part of its runtime
stack. Use or create a global ServerPiranha or something similar to be able to
interact with the Piranha Server distribution. When creating the module make
the Piranha Server API a provided dependency.
```

After reading the plan, the author saw that a proposed class name did not follow the project's existing naming convention, and went back with one question:

```chat
/speckit-clarify Should we call it MultiPiranhaSingleton though?
```

Result: **24 tasks**. The implement prompt added a practical reminder about how to test inside the real server.

**What to notice:** this is the brownfield review habit in action. The plan prompt points at existing folders and existing capabilities ("already has JSP available"), and the human caught a convention violation by *reading the plan* before any code existed. Fixing a name in a plan costs one sentence.

### Example E — a 98,000-line Go project, and an honest retrospective

Repository: [spec-kit-go-brownfield-demo](https://github.com/mnriem/spec-kit-go-brownfield-demo), built on NASA's Hermes and driven entirely from the Copilot CLI. The whole feature request was a title and a single sentence, and plan, tasks and implement were each just `Execute`. It produced **31 tasks** and then a series of follow-up chats to get the result running, including a cross-origin bug.

The README's section "What Could Have Been Done Better" is the most useful part of the repository. Its headings:

- "The feature spec was too thin."
- "`speckit.plan` received no guidance."
- "`speckit.analyze` was skipped."
- "YOLO mode was required but not anticipated."
- "The simulator was throwaway."

Its conclusion says: "Treat `speckit.specify`, `speckit.plan`, and `speckit.analyze` as investments, not formalities."

The same repository contains a `WORKSHOP.md` that repeats the exercise properly, adding clarify and analyze and replacing the empty plan prompt with this one:

```chat
/speckit-plan Use React for the frontend, reuse the existing src/modules/ where
possible. Serve the dashboard from the Go backend on port 8080. Use gRPC-web for
communication. Keep dependencies minimal.
```

That run added about 1,580 lines to the existing 98,500. Its tips include "Brownfield is the default." and "Constitution first, always."

> **⚠️ One trap in this repository:** its committed `.specify\memory\constitution.md` is still the unfilled template. Do not use it as a model. Look at the ASP.NET or Java repository for a completed constitution.

## 5. What a finished feature looks like

Open any `specs\` folder in the examples and you will find the same shape. This is the second feature of the ASP.NET example:

```file
specs/002-headless-rest-api/
├── spec.md              what and why (198 lines)
├── plan.md              how (502 lines)
├── tasks.md             45 tasks, all ticked
├── research.md          options considered
├── data-model.md        entities and fields
├── quickstart.md        how to run and test it
├── checklists/
│   └── requirements.md  quality check of the requirements
├── contracts/
│   ├── auth.md
│   └── endpoints.md
└── test-scripts/        the scripts requested in the plan prompt
```

| Example | Request length | Spec length | Tasks | Implement runs |
|---|---|---|---|---|
| A. .NET CLI (new) | 2 sentences | ~1,870 words | 69 | 3 |
| B. Spring + React (new) | 4 sentences | ~2,650 words | 85 | 2 |
| C1. ASP.NET, Docker infrastructure | ~170 words | ~2,000 words | 15 | 3 |
| C2. ASP.NET, REST API | 3 sentences | ~2,360 words | 45 | 1 |
| D. Java admin console | 2 sentences | ~2,300 words | 24 | 1 |
| E. Go dashboard | 3 lines | ~1,660 words | 31 | 1, plus follow-up chats |

The counts are from the committed files. Two things stand out. First, a few sentences reliably expand into about two thousand words of specification, so **reading time is the real cost** of this workflow. Second, the most detailed request (C1) produced the fewest tasks: precision about scope keeps the work small.

## 6. Projects that ship releases with specs committed

The repositories below are ordinary open-source projects, not demonstrations. Each has a filled-in constitution under `.specify\memory\` and feature folders under `specs\`, and each published a release in 2026. We confirmed that the files exist; we did not review the quality of their specs or check which Spec Kit version produced them.

| Project | What it is | What to look at |
|---|---|---|
| [Azure/missionlz](https://github.com/Azure/missionlz) | Microsoft's landing-zone infrastructure project; release v2.0.0 in October 2026 | Adoption in an existing project. Three feature folders, each with the full artifact set; the first is a test-coverage ratchet. Constitution at v1.2.0, so it has been amended since adoption |
| [sitkoru/Sitko.Core](https://github.com/sitkoru/Sitko.Core) | A .NET application framework with frequent releases | Twelve spec folders with **timestamp** names instead of numbers. Most hold only `spec.md`, and none has a plan or task list: a lightweight convention |
| [alfredoperez/ngx-dev-toolbar](https://github.com/alfredoperez/ngx-dev-toolbar) | An Angular developer toolbar | Twenty numbered feature folders, most with spec, plan and tasks. Constitution at v3.0.0: the rules evolved with the project |
| [lausser/coshsh](https://github.com/lausser/coshsh) | A long-lived Python tool for monitoring configuration | Spec Kit on a legacy codebase. One folder also keeps the author's original sketch next to the generated spec |
| [galax-io/gatling-picatinny](https://github.com/galax-io/gatling-picatinny) | A Scala testing library | Fifteen feature folders, including a build-tool upgrade handled as a spec |

**What these show:** teams keep different amounts. Some commit spec, plan and tasks for every feature; one keeps only the spec. All of them kept their constitution, and four of the five have amended it since. That matches the official position that [how specs age](sdd-production.md#2-decide-how-specifications-age) is a team choice.

**Spec Kit uses Spec Kit, selectively.** The project's [contributing guide](https://github.com/github/spec-kit/blob/main/CONTRIBUTING.md) answers the question "Does Spec Kit use Spec Kit?" with: "Yes — we dogfood Spec Kit while developing Spec Kit, especially for substantial features and changes to the development workflow." It continues: "This does not mean every change goes through the full workflow. Small fixes can use the normal issue, pull request, review, and test process." Its own [constitution](https://github.com/github/spec-kit/blob/main/.specify/memory/constitution.md) was added to the existing codebase in June 2026 and describes itself as derived from an analysis of the source tree, tests, CI pipelines and conventions: a brownfield constitution written by the people who build the tool.

## 7. Squad in practice

> **📘 Reading order:** this section previews [Chapter 17](squad.md). If terms such as coordinator, Scribe or routing are new to you, read that chapter first and come back.

**A real team in a production repository.** The Squad project develops itself with Squad and commits its team: see [`.squad` in github/squad](https://github.com/github/squad/tree/dev/.squad). Open `team.md` and you will find a coordinator and eighteen specialists with plain, descriptive roles: among them a lead architect, a CLI engineer, a Git specialist, a unit and contract tester, an integration and end-to-end tester, a security reviewer, a release engineer and a documentation engineer. The built-in members (Scribe, Ralph, Rai, Fact Checker) are listed too, and the Copilot coding agent appears with a table of which work is a good fit, which needs review and which is not suitable, with automatic assignment switched **off**.

This is useful for two reasons. It shows that a large team is something you grow into over months, not something to create on day one. And it shows what committed team state looks like: `routing.md`, `decisions.md`, `ceremonies.md`, per-member charters and a governance file.

**Prompts for an existing codebase**, quoted from the official [existing-repository](https://github.github.io/squad/docs/scenarios/existing-repo/), [large-codebase](https://github.github.io/squad/docs/scenarios/large-codebase/) and [mid-project](https://github.github.io/squad/docs/scenarios/mid-project/) scenarios:

```chat
This is a 200k line codebase — help me understand the architecture before we
start making changes
```

```chat
Team, review the codebase and tell me what you find.
```

```chat
We always use Zod for API validation. Never use any/unknown casts in
TypeScript. All database queries go through Prisma — no raw SQL. The payment
integration with Stripe is fragile, be careful around it.
```

```chat
Route all payment code work to the specialist who knows that domain
```

Those scenario pages still show some output from older versions, such as `.ai-team\` paths. The prompts themselves are current.

**Squad driving Spec Kit.** The community [squad-sdd-workshop](https://github.com/ananegru/squad-sdd-workshop) is a set of instructions (no generated files are committed) that builds a small game in about an hour. Its key idea is one dedicated "spec-kit expert" on the team who owns the workflow, with a rule that nobody plans before a spec exists or codes before tasks exist. Prompts from the workshop:

```chat
Begin the build. Have the spec-kit expert drive the Spec Kit workflow end to end.
```

```chat
Spec-kit expert: review the current spec against Spec Kit standards and against
our objective: a very simple, interactive, CLI-based Rock-Paper-Scissors game.
Point out anything ambiguous, missing, or over-scoped, and suggest improvements
before we implement.
```

```chat
Add a very simple score counter. Run it through Spec Kit the same way: specify
the feature, update the plan and tasks, then implement.
```

The workshop is deliberately tuned for a throwaway proof of concept: it skips analyze and accepts a smoke test as "done". It uses unpinned install commands and the dotted command spelling. Our [Squad page](squad.md#5-combine-spec-kit-and-squad-explicitly) keeps the same structure with the checks left in. We found no public repository that commits the artifacts of Spec Kit and Squad used together (searched in November 2026).

## 8. Patterns worth copying, and mistakes worth avoiding

| Seen in the examples | Take away |
|---|---|
| In the from-zero examples, technology appears in `plan`, not in `specify` | Keep *what* and *how* in separate steps |
| The best plan prompts name existing folders, existing capabilities and constraints (D, the workshop in E) | Tell the plan what to reuse |
| Thin plan prompts (one line in B, a bare `Execute` in E) led to later repair work | Put versions, conventions and environment details in the plan prompt |
| A human caught a naming problem by reading the plan (D) | Review the plan against your codebase before generating tasks |
| An explicit "out of scope" sentence produced the smallest task list (C1) | State boundaries; they shrink the work |
| Two sentences became 69 tasks (A) | Read `tasks.md` and delete what you did not ask for |
| Analyze was skipped, and the author later regretted it (E) | Run `/speckit-analyze`; it is read-only and cheap |
| Several implement runs were needed (A, B, C1) | Expect to repeat implement, then run converge |
| Tool approvals blocked progress until allow-all was switched on (E) | Decide your permission settings in advance; see [human control and guardrails](agent-guardrails.md) |
| Most real projects revise their constitution (versions 1.2.0, 3.0.0) | Treat the constitution as a living agreement |
| Even the Spec Kit project skips the workflow for small fixes | Use the full process for consequential changes only |

## 9. Your turn: repeat an example in an hour

1. Create an empty folder and follow the [setup steps](spec-kit.md#2-install-once-initialize-each-project) to initialize it.
2. Use the five prompts from **Example A**, but change the request to something you understand well, such as a tip calculator or a unit converter. Name your own familiar technology in the plan prompt.
3. Before `/speckit-plan`, add `/speckit-clarify`. Before `/speckit-implement`, add `/speckit-analyze`.
4. Open `tasks.md` and count the tasks. Remove at least one that you did not ask for.
5. Run implement, run the tests yourself, then run `/speckit-converge`.
6. Compare your `specs\` folder with the one in the example repository. What did the agent add that you would not have thought of? What did it add that you do not want?

Then do the same in a **copy** of a project you already work on, using the [existing-projects page](sdd-existing-projects.md) as the guide and Examples C to E as reference.

## Recap

- Real runs follow the same few prompts: constitution, specify, plan, tasks, implement. The optional steps (clarify, analyze, converge) are where the reported problems would have been caught.
- A couple of sentences become about two thousand words of spec and dozens of tasks. Budget time for reading.
- On existing code, the best results came from plan prompts that named what to reuse and from a person reading the plan against the codebase.
- Projects that ship keep different amounts of spec material, and even the Spec Kit project skips the workflow for small fixes.

## Check Your Understanding

**1. An example README says to select the agent `speckit.plan`. What do you type with the current Copilot skills layout?**

- A) `/speckit.plan` in the chat
- B) `/speckit-plan` in the chat
- C) `/agent speckit.plan` in the chat
- D) `speckit.plan` in the terminal

> **✅ Answer:** B — Type `/speckit-plan` in the chat. The examples were written for an older version that used dotted names, and `/agent` followed by a dotted name belongs to the older Copilot CLI layout.

**2. In the Java example, at which step was the naming problem caught, and why does that matter?**

- A) While reading the plan, before code existed; the fix cost one sentence
- B) In the pull request review; the fix needed a refactoring of the module
- C) During `/speckit-analyze`; the tool reported the name automatically
- D) After the first implement run; the tests failed on the class name

> **✅ Answer:** A — A person caught it while reading the plan, before tasks or code existed. A correction at that point cost one sentence instead of a refactoring.

**3. The Go example's author lists "the feature spec was too thin" as a lesson. What was the visible consequence?**

- A) The agent could not produce a task list from the request
- B) The run produced the longest spec of all the examples
- C) The implement step had to be run three times
- D) Follow-up chats were needed to get the result running

> **✅ Answer:** D — Extra follow-up work after implementation was needed to get the feature running, which better context in the spec and plan prompts would largely have avoided. The run still produced 31 tasks and a single implement run.

**4. Does the Spec Kit project itself run every change through the full workflow?**

- A) Yes. Dogfooding means every change gets a spec, a plan and tasks
- B) No. The project does not use Spec Kit on its own code at all
- C) No. Substantial features use it; small fixes follow the normal process
- D) Yes, but it works without a constitution of its own

> **✅ Answer:** C — Its contributing guide says substantial features use it, while small fixes follow the normal issue, pull request, review and test process.

**5. In Example A, a request of two sentences became 69 tasks. What does this page tell you to do with such a list?**

- A) Read `tasks.md` and remove what you did not ask for
- B) Implement all of it, because the agent knows what is relevant
- C) Start again with a much longer constitution prompt
- D) Skip reading it and repeat implement until all is ticked

> **✅ Answer:** A — The agent filled in a great deal ("add anything that would be relevant"), so you read `tasks.md` before implementing and decide whether you want all of it. Repeating implement is normal, but it does not replace reading the list.

[← Chapter 15: Existing Projects](sdd-existing-projects.md) · [Chapter 17: Squad →](squad.md)
