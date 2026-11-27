# Shipping and Reusing the Workflow

**Chapter 18 · Production, multiple projects and community lessons**

A working demo is the beginning, not the release gate. This page shows how to reuse Spec Kit and Squad without mixing project context, turn real failure modes into acceptance criteria, and collect evidence before shipping. The examples are teaching scenarios, not claims that a generated sample has already passed production review.

> **📘 In plain words:** Production means real users depend on the result. Your workflow must cover what happens when requests collide, credentials are wrong, a migration fails, or the new version needs to be rolled back — not only the happy-path demo.

## 1. Use the same method across different projects

Install the CLIs once on your machine, but initialize and review their files **per project**. A good reusable asset is a small set of engineering conventions, not another customer's entire agent memory.

| Scope | Keep here | Do not blindly copy |
|---|---|---|
| **Personal machine** | Tool installations, approved account access, your own general preferences | Credentials into repository files |
| **Organization** | Reviewed baseline principles, approved integrations, onboarding checklist | One application's architecture as a universal rule |
| **Repository** | Its constitution, build/test commands, team, routing, scoped decisions | Another project's assumptions, paths and secrets |
| **Feature** | Its spec, plan, tasks, contracts and acceptance evidence | An old task list with unrelated IDs |
| **Session** | The current task and active-feature selection | The assumption that a prior chat knows the current repository |

### A repeatable onboarding checklist

For project B, repeat the same small sequence you used for project A:

1. Open **project B's root** and establish a clean baseline. Record the current test/build commands and results.
2. Initialize Spec Kit there; for a non-empty repository, use the reviewed `--here --force` flow from the [existing-projects page](sdd-existing-projects.md).
3. Write the constitution from **B's actual conventions**. Select one feature and verify its active-feature directory.
4. If Squad is useful, run `squad init --no-workflows --no-vscode-default` in B and form a team for B. Review generated files and run `squad doctor`.
5. Commit reviewed shared configuration through the normal PR process. Start a fresh session in B and verify the agent identifies B before authorizing edits.

For a monorepo, begin with one clearly scoped configuration at the repository root unless independently governed components genuinely need separate ones. For project-scoped commands **after initialization**, Spec Kit documents `SPECIFY_INIT_DIR` for selecting a member project and `SPECIFY_FEATURE_DIRECTORY` for selecting a feature. `init` itself uses its explicit target, not `SPECIFY_INIT_DIR`. These are **different selectors**; see the [core reference](https://github.github.io/spec-kit/overview/core.html).

For concurrent features, prefer separate checkouts or deliberately configured worktrees and explicitly select the feature in each. Current Spec Kit's active-feature pointer is mutable local state. Do not have unrelated sessions repeatedly switching it in one shared checkout. A separate conversation is not sufficient isolation.

For an advanced shared-checkout workflow, the core reference documents `SPECIFY_FEATURE_NO_PERSIST=1` alongside each process's own `SPECIFY_FEATURE_DIRECTORY` to prevent scripts from overwriting the shared pointer. That does not isolate code edits or database state; separate workspaces remain the simpler beginner choice.

### Reuse a Squad carefully

Squad supports `squad export` and `squad import`, and its CLI documents remote-team linking and upstream sources. These are optional ways to share team state; they are not required to work on multiple projects.

An export can include **charters, histories, skills and decisions**. Review its contents before it leaves the original project's trust boundary. Remove project-specific assumptions and confidential material; verify your organization's permission to share it. Import into a disposable repository first and inspect the resulting team before using it on real code.

Do not use `squad import --force` just to suppress an existing-team warning. The command replaces existing team state and has archival behaviour you need to understand. Start with the [CLI reference](https://github.github.io/squad/docs/reference/cli/) and [first-session export example](https://github.github.io/squad/docs/get-started/first-session/).

**Recommendation for beginners:** separate teams, shared reviewed principles. Add shared-team infrastructure only when maintaining duplicate conventions becomes a demonstrated problem.

## 2. Decide how specifications age

You need one answer to "Which document describes today's intended behaviour?" Spec Kit deliberately does not choose that policy for you. Its [persistence guide](https://github.github.io/spec-kit/how-to/persisting-specs.html) describes four options:

| Policy | After delivery | Main tradeoff |
|---|---|---|
| **Flow-back** | Accepted discoveries can update the spec, plan and tasks; reconcile them | Flexible, but easy to leave contradictions |
| **Flow-forward** | Completed feature artifacts remain historical; new changes get new feature directories | Clear history, but fragmented context |
| **Living spec** | Maintain `spec.md` as the contract; revise or regenerate derived plan/tasks | Clear current intent, but preserve important design rationale elsewhere |
| **Constitution-only** | Retire feature artifacts after delivery, keeping enduring requirements and decisions in another maintained home | Less maintained material, but intent can be lost if the handoff is weak |

These are **team conventions, not CLI settings**. None means "skip requirements while developing" or "the constitution replaces the product specification".

For a first product, a living spec with ordinary Git history is a reasonable starting convention. Add links between requirements, PRs and tests. When intent changes, update the contract and its derived work before asking an agent to make the code agree.

**Example:** RoomBook changes its minimum duration from 30 to 15 minutes. Update the rule, the API validation, the 14/15/16-minute boundary tests, user documentation and any UI hint together. Preserve the reason for the change. Do not leave an old "30 minutes" decision in Squad memory that contradicts the current spec.

## 3. Scenario A: add a feature to an existing product

This scenario continues the RoomBook example from [Chapter 15](sdd-existing-projects.md). Scenario B is also RoomBook; Scenarios C and D use other systems on purpose.

**Situation:** RoomBook has been in use for a year. Facility managers want a CSV export of bookings. This is a brownfield change, not a reason to rebuild the application or retrospectively specify every screen. The step-by-step adoption of Spec Kit in such a repository is on the [existing-projects page](sdd-existing-projects.md); this scenario concentrates on the acceptance checks.

**Spec Kit chat prompt:**

```chat
/speckit-specify Add CSV export to the existing RoomBook bookings list.
Export only bookings the signed-in user is authorized to see, applying the
same filters as the list. Keep the existing JSON API and permission checks
unchanged. Include a header row and a stable, documented column order.
Specify how to handle an empty result, large exports, Unicode, commas,
quotes, line breaks and values that spreadsheet apps might interpret
as formulas. Do not introduce a new UI framework or change how bookings
are created or cancelled.
Ask me to choose the maximum export size and spreadsheet-safety policy.
```

Clarify whether export covers the current page or all filtered results. "Same as the list" is otherwise ambiguous. Capture who may export, which sensitive columns are excluded, and what happens if authorization changes during a long-running job.

| Acceptance check | Why it matters |
|---|---|
| User A cannot export bookings they are not allowed to see, even by tampering with filters or identifiers | UI filtering is not server-side authorization |
| Export agrees with the approved filter/sort semantics | "Export all" and "export current page" are different products |
| Cells round-trip with commas, quotes, line breaks and non-ASCII text | CSV is a format with edge cases, not `join(",")` |
| Formula-like cells follow an explicitly reviewed spreadsheet-safety policy | Quoting a CSV value alone does not necessarily neutralize formula interpretation |
| Empty and oversized results have defined behaviour | Prevent broken files and unbounded memory/work |
| Existing booking, cancellation and API tests still pass | New capability must not regress existing users |

**Plan:** reuse the existing authorization/query helper and installed CSV support before writing another serializer. Agree on a bounded synchronous export or a background job based on measured size, not speculation. **Squad:** one owner for backend export, one for UI integration after the contract is agreed, a tester working from the spec. **Release:** use the existing rollout mechanism; monitor export failures and resource use.

This follows the official [existing-project adoption guidance](https://github.github.io/spec-kit/how-to/existing-projects.html). The specific export acceptance cases above are this guide's engineering examples, not built-in Spec Kit checks.

## 4. Scenario B: prevent double bookings

**Situation:** RoomBook works in a single-user demo but two users occasionally reserve the same room. The feature's real requirement is a concurrency invariant: at most one active booking may occupy an overlapping interval for a room.

The wrong fix is to add another "is available?" check in the browser. Two requests can both see an available room before either inserts a record.

**Plan requirement:** enforce the invariant atomically in the database, or with an equivalent correctly scoped transaction/locking design. Choose the mechanism appropriate to your actual database. An application-wide in-memory lock does not coordinate several server instances.

**Concrete test recipe using your existing integration-test runner:**

1. Seed an empty test room and two authenticated test users.
2. Submit the same future interval concurrently from two independent requests.
3. Assert that exactly one succeeds, the other reports a conflict, and only one active booking exists.
4. Repeat for partially overlapping intervals; also test adjacent intervals and a different room.
5. Verify cancellation frees the interval and a different user's cancellation is rejected.

Run against the real database engine used by the service, not just an in-memory repository mock. Choose enough repeated/concurrent execution to exercise the race, but recognize that tests support the design review rather than proving every possible schedule safe.

**Spec Kit:** capture the invariant and boundary rules in the spec before choosing the transaction design. **Squad:** let one owner change the schema/migration; let a different role derive tests from the spec. **Production gate:** rehearse migration against representative data and detect pre-existing conflicts before enabling the new constraint.

> **💡 Example:** A database migration refuses to install because duplicate reservations already exist. That is valuable evidence, not an instruction to delete customer data. Agree on a repair policy and recovery plan with the product owner before proceeding.

## 5. Scenario C: process payment notifications safely

**Situation:** A payment provider calls your webhook when a payment succeeds. A webhook is an HTTP notification from another service. Delivery can be repeated or delayed; "handle it once in the happy-path demo" is not a sufficient spec.

**Example specification prompt:**

```chat
/speckit-specify Add payment-success webhook handling to the existing service.
Verify the provider signature before accepting an event. Process repeated
deliveries without creating duplicate fulfillment or credit. Handle concurrent
duplicates and a crash between receiving an event and completing its work.
Do not assume event arrival order. Persist accepted work durably and define
retry, failed-event review and reconciliation behaviour.
Use provider test mode and synthetic accounts only during development.
No live payments, refunds or customer messaging in this implementation task.
```

**Idempotent** means that repeating the same operation has the same business effect as performing it once. It does not mean a network delivers an event exactly once.

| Risk | Required evidence |
|---|---|
| Forged payload | Signature verification rejects it; raw-body handling matches the provider's instructions |
| Same event arrives twice or concurrently | One durable business effect, not merely two successful HTTP responses |
| Process crashes mid-handler | Recovery completes the work without loss or duplication |
| Older event arrives after a newer one | Defined state transitions; no assumption of delivery order |
| Downstream service is unavailable | Bounded retries, visible failure state and an operator recovery path |
| Separate events refer to the same business action | A business-level deduplication rule where necessary, not only an event-ID cache |

For Stripe, the [official webhook guide](https://docs.stripe.com/webhooks) discusses signature verification, retries, duplicate events, ordering and asynchronous processing. Read your provider's actual delivery contract rather than copying another provider's assumptions.

**Plan:** durable event recording and processing state, with transaction boundaries and any downstream idempotency key explicitly designed. A successful response should follow durable acceptance; merely starting a background promise can lose the work. Provider-specific details require a qualified review.

**Squad:** separate implementation and adversarial test design, but keep one owner of the business transaction. **Release:** provider test mode first, replay/reconciliation rehearsal, restricted live credentials, dashboards and a human-authorized rollout. Never let an agent "test" with real payments.

## 6. Scenario D: ship a change across repositories

**Situation:** A mobile application and API live in separate repositories. The API adds booking cancellation. Updating both on your laptop does not mean every mobile user updates at the same time.

Use a shared, reviewed API contract and link the two feature specs to its version. Keep implementation plans and tests local to their repositories.

| Step | Evidence to collect |
|---|---|
| Define the contract | Request/response shape, authorization, error cases and compatibility with older clients |
| Implement the API additively | Existing clients still work; server-side permission checks do not depend on the new UI |
| Update clients | Loading, conflict, unavailable-service and cancellation states are handled |
| Test across versions | Old client/new server and new client/new server combinations meet the support policy |
| Roll out in order | Server capability is available before the dependent client feature is enabled |
| Retire old behaviour deliberately | Usage and support policy justify removal; document the migration |

Give each repository its own Spec Kit feature and Squad context. A shared team is optional; it does not create an atomic cross-repository release. Name a human integration owner and avoid two agents independently changing the contract.

## 7. Community lessons — with their limitations

The community does not have one settled recipe or a universal productivity result. These are specific experiences and arguments, not proof that the same outcome will occur in your project. Older reports are useful for identifying failure modes; their command syntax and implementation details may no longer apply.

| Source and provenance | What it actually supports | A practice to try |
|---|---|---|
| [Birgitta Böckeler: Understanding SDD](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), Thoughtworks practitioner analysis on Martin Fowler's site, October 2025 | Distinguishes spec-first, spec-anchored and spec-as-source; explains the effort needed to evaluate tools on realistic greenfield and brownfield work | Decide how specs age, and measure the time spent reviewing intermediate artifacts. Use current docs for commands, not the article's older examples |
| [github/spec-kit#75: a practitioner's balanced experience](https://github.com/github/spec-kit/issues/75#issuecomment-3266694509) | Reports value for significant changes but overhead for small changes; warns that planning can ignore the existing architecture | Use a full workflow for consequential changes; require the plan to cite reusable existing components |
| [github/spec-kit#75: a contrasting experience](https://github.com/github/spec-kit/issues/75#issuecomment-3267488204) | Reports unrequested interfaces, tests and scope despite a detailed feature description | Review the task list for scope creep. More generated artifacts are not automatically more value |
| [github/spec-kit#581: maintainer follow-up](https://github.com/github/spec-kit/issues/581#issuecomment-5625830594) | Says monorepo support evolved by separating features from Git | Recheck old workaround advice against today's feature-pointer and project-root rules; do not assume every monorepo topology is solved |
| [Squad Team: upgrade testing report](https://github.com/github/squad/blob/v2.0.0/docs/src/content/blog/029-upgrade-testing-at-scale.md), maintainer retrospective | Describes testing beyond clean fixtures against existing configurations and finding an edge case (a raw stack trace on a read-only file system). Published in March 2026, before 2.0 | Rehearse upgrades on a copy of your own customized repository; compare intended and unintended changes. This is self-reported experience, not a universal reliability guarantee |
| [github/squad#1033: maintainer reply](https://github.com/github/squad/issues/1033#issuecomment-4658769575) | Describes Spec Kit and Squad as complementary | Use an explicit artifact handoff and a single owner of task reconciliation; do not imply a built-in automatic integration |

### Turn the reports into a working agreement

**Before work:** pick one outcome and explicit non-goals; agree how much review and model usage the experiment is worth. **During work:** stop at each artifact, remove invented scope, and check references to the real code. **After work:** compare total effort, including correction and review, against the simpler one-agent approach.

Do not turn every complaint into a timeless limitation. For example, [github/spec-kit#1401's later closure](https://github.com/github/spec-kit/issues/1401#issuecomment-5821556138) says the old always-loaded command-token claim no longer describes skills-based integrations. That comment explicitly identifies itself as AI-drafted on a maintainer's behalf: it is a pointer to investigate, not an independent benchmark. Current [Copilot integration documentation](https://github.github.io/spec-kit/integrations/copilot.html) describes the skills layout; measure actual invocation, artifact and review costs in your own host.

> **✅ Key takeaway:** The defensible community lesson is not "always use specs" or "always use more agents". It is to match the process to the risk, inspect what the tools actually produce, preserve existing architecture, and keep only the coordination that pays for itself.

## 8. A release gate, not a "production-ready" prompt

### Protect the development workflow itself

Shared agent memory can preserve **prompt injection**: untrusted instructions in an issue or web page get summarized into decisions, then influence other agents later. Review externally derived memory before reuse; separate external-content ingestion from writing trusted team state. Delimiters help communicate a boundary, but are not an enforcement mechanism.

Inspect `.mcp.json`, installed skills, extensions and GitHub Actions before enabling them. Pin reviewed dependencies/actions appropriately and use narrow token permissions. A community catalog listing is not a security audit. For Copilot-hosted Squad, enforce permissions in the host, workspace and repository; do not assume SDK hooks protect that path. The separate Microsoft Agent Framework integration documents an `ApproveAll` default that is not production-safe.

The official [Squad hardening guide](https://github.github.io/squad/docs/features/security-hardening/) describes these risks and explicitly says Squad has no built-in network egress filtering. It is a threat model, not proof of an incident or a guarantee of isolation. Build your application's operational controls separately.

Put the relevant gates in your issue or PR template. Scale them to the feature's risk, but never silently turn a failed or unexecuted check into a pass.

| Gate | Evidence before release | Accountable person |
|---|---|---|
| **Intent** | Reviewed spec, explicit non-goals, approved policy decisions | Product owner |
| **Correctness** | Test results linked to acceptance criteria, including failure/concurrency cases | Implementer and reviewer |
| **Compatibility** | Regression and contract checks; upgrade/downgrade implications | Service owner |
| **Security and privacy** | Authorization tests, input validation, secret/dependency checks, reviewed data handling | Assigned reviewer/security owner |
| **Accessibility** | Keyboard, focus, labels and error announcements for affected interfaces | UI owner |
| **Operations** | Health checks, useful redacted logs/metrics, actionable alerts and an on-call owner | Operations/service owner |
| **Data changes** | Migration rehearsal, backup/restore evidence, repair plan for bad existing data | Database/service owner |
| **Delivery** | Protected branch, required CI, reviewed release artifact, staged rollout and recovery plan | Release owner |
| **After release** | Monitor agreed signals; record the decision to continue or roll back | Release/on-call owner |

For a small team, one person may hold several roles. Still name the person; "the tester agent approved" is not accountability.

**Rollback is not always "run the down migration".** A destructive schema change may be irreversible after new writes. Prefer compatible staged changes where possible, and document whether recovery means reverting code, restoring data, or rolling forward with a repair.

**Example release exercise:** In staging, enable the new booking path for a small test group. Check conflict rate, error rate and latency against agreed thresholds. Deliberately disable the new path and verify the previous supported behaviour. Keep production credentials and the actual release outside the agent's implementation task.

## 9. Verify with multiple models — and independent evidence

Different models can catch different mistakes, but shared training data, shared prompts and shared documentation can also produce shared errors. Use model review as one layer of evidence.

1. **First pass: authoritative facts.** Ask one model to check install commands, prerequisites, file locations and lifecycle behaviour against current official docs and the selected release.
2. **Second pass: an independent critique.** Give another model the artifacts and source links, not the first model's verdict. Ask it to find unsupported claims, unsafe assumptions, missing failure cases and stale instructions.
3. **Resolve disagreements against evidence.** Prefer installed help, tagged source, release notes and actual execution results over a majority vote.
4. **Execute the relevant checks.** In a safe repository, confirm the tool setup, run the application's tests, inspect the diff and rehearse delivery. Record what you did not run.

A useful review prompt:

```chat
Independently review this spec, plan and implementation.
For each issue, report the claim or requirement, severity, exact source
or file location, and the smallest correction. Distinguish documented
behaviour from inference. Inspect failure paths and existing behaviour.
Do not infer that a command was executed because documentation shows it.
Do not treat another model's agreement as verification.
```

For important claims, keep a small evidence table:

| Claim | Evidence | Result / limitation |
|---|---|---|
| "This flag is supported" | Versioned help or tagged CLI source | Record the version; latest docs alone may be newer |
| "Two bookings cannot conflict" | Atomic design review plus real-database concurrency tests | Test results cover the exercised conditions |
| "The migration is recoverable" | Restore/repair rehearsal | Record dataset and environment |
| "This is a community best practice" | Named report or maintainer discussion | An experience report is not universal consensus |

## 10. A first month without over-automation

| Week | Your goal | Keep as evidence |
|---|---|---|
| 1 | Finish one Spec Kit feature with one agent in a learning repo | Spec corrections you made, working diff and actual check results |
| 2 | Apply the method to one small existing-code change | Compatibility boundaries and regression evidence |
| 3 | Try Squad on two genuinely independent tasks | Assignment/ownership plan, combined checks and usage/cost |
| 4 | Repeat in another repository and rehearse a release | Reusable onboarding checklist, separate context and recovery runbook |

Measure **review time, rework, escaped defects, elapsed delivery time and total model usage**, not just generated lines or number of agents. Compare against a similar task completed with your simpler workflow. Keep the extra coordination only if it helps.

## 11. Sources and verification scope

This section of the site draws on official installation and command references, tagged releases/source, integration and upgrade guides, existing-project and persistence guidance, Squad's host compatibility and hardening documentation, and the community reports above. The [Resources index](resources.md#10-spec-driven-development-with-spec-kit-and-squad) groups the main references.

**Checked on 27 November 2026:** Spec Kit v1.4.5 and Squad v2.0.0 are the release baselines, not promises that later versions behave identically. Official documentation conflicts are called out where they affect the walkthrough, notably Squad's model-selection claims.

The instructions are source-checked, not an executed certification of Spec Kit/Squad setup on every platform. The RoomBook, CSV, webhook and cross-repository scenarios are examples of requirements and verification work, not shipped reference applications. Before relying on the workflow, run a small feature in your own safe environment and record the actual versions, commands, results and unresolved gaps.

## Recap

- Install the tools once; initialize, configure and review them per project. Reuse conventions, not another project's memory.
- Decide how specifications age, and write the decision down.
- Turn real failure modes (permissions, concurrency, duplicates, migrations) into acceptance criteria before code is written.
- A release needs evidence and a named person at every gate; "the agent finished" is neither.
- Treat community reports as experiences to test, not as rules.

## Check Your Understanding

**1. Can you safely reuse a customer's full Squad export in another customer's repository?**

- A) Yes. An export contains only generic role descriptions
- B) Not without permission and a careful review of its contents
- C) Yes, if `squad import --force` replaces the existing team
- D) No. An export can only be imported into its original repository

> **✅ Answer:** B — Not without permission and a careful review of histories, decisions and other contents. Reuse sanitized conventions, not confidential context. `--force` only replaces existing team state; it does not make the contents safe to share.

**2. A webhook handler keeps processed event IDs in memory. Is that enough for production idempotency?**

- A) Yes. The provider delivers every event exactly once anyway
- B) Yes, as long as the handler answers with a successful response
- C) No. Restarts, several instances and concurrent duplicates need a durable design
- D) No. The handler should rely on the order in which the provider's events arrive instead

> **✅ Answer:** C — Restarts, multiple instances, concurrent deliveries and partial failures require a durable design and business-effect checks. Delivery can be repeated or delayed, so neither "exactly once" nor arrival order can be assumed.

**3. Must every project keep every generated spec forever?**

- A) Yes. Spec Kit has a CLI setting that enforces this
- B) Yes. Otherwise the constitution has to replace the product specification
- C) No. Delete them after delivery; nothing from them needs a new home
- D) No. Choose and document a policy, and keep enduring requirements somewhere maintained

> **✅ Answer:** D — Choose and document a retention policy. Preserve enduring requirements and rationale in an agreed maintained location. The policies are team conventions, not CLI settings, and none of them means the constitution replaces the product specification.

**4. What evidence proves an agent-generated migration can be recovered?**

- A) A reviewed recovery strategy and a successful restore or repair rehearsal
- B) The agent's statement that a down migration exists for the change
- C) A green run of the unit tests after the migration was written
- D) A second, different model that reviews the migration and agrees that it is safe

> **✅ Answer:** A — A reviewed recovery strategy and a successful rehearsal in an appropriate test environment, not the agent's confidence or a green unit test alone. Rollback is not always "run the down migration".

**5. RoomBook works in a single-user demo, but two users occasionally reserve the same room. Which fix meets the requirement?**

- A) Another "is available?" check in the browser before the form is sent
- B) An application-wide in-memory lock around the code that creates bookings
- C) Enforcing the rule atomically in the database, or an equivalent transaction design
- D) A second availability check on the server, run just before the booking record is inserted

> **✅ Answer:** C — The invariant must be enforced atomically in the database, or with an equivalent correctly scoped transaction/locking design. Two requests can both see an available room before either inserts a record, and an in-memory lock does not coordinate several server instances.

[← Chapter 17: Squad](squad.md) · [Command Reference →](sdd-reference.md)
