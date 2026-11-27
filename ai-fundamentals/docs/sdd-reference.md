# Command Reference: Spec Kit and Squad

**Reference · Cheat sheet**

Every command from this section in one place, grouped by where you type it and what it is for. Use the walkthroughs to learn; come back here when you have forgotten a name or a flag.

> **📘 In plain words:** There are only two places to type. The **terminal** runs the `specify` and `squad` programs, which set things up. The **agent chat** runs `/speckit-*` skills and your conversation with the Squad coordinator, which do the development work. If a command starts with a slash, it belongs in chat.

## 1. How to read this page

| Marker in this guide | Where you type it | Looks like |
|---|---|---|
| Green **Terminal** block | PowerShell, or another shell, in the project folder | `specify init …`, `squad doctor` |
| Purple **Agent chat** block | Copilot Chat in VS Code, or the `copilot` CLI session | `/speckit-plan …`, "Team, review the codebase" |

**Baseline:** Spec Kit **v1.4.5** (25 November 2026) and Squad **v2.0.0** (19 November 2026), checked on 27 November 2026 against the official documentation and the tagged source. Your installed `specify --help` and `squad --help` are the final authority for your version. Nothing on this page was executed as a certification; it is a source-checked summary.

**One command, several spellings.** The same Spec Kit command is written differently depending on the coding agent. This guide uses the first row.

| Integration | You type | Example |
|---|---|---|
| GitHub Copilot, default skills layout | `/speckit-<name>` | `/speckit-specify`, `/speckit-bug-assess` |
| Official reference pages and many older tutorials | `/speckit.<name>` | `/speckit.specify`, `/speckit.bug.assess` |
| Codex and some other skill-based agents | `$speckit-<name>` | `$speckit-specify` |
| Kimi | `/skill:speckit-<name>` | `/skill:speckit-specify` |

Source: [command invocation](https://github.github.io/spec-kit/integrations/cli.html#command-invocation). If a tutorial's spelling does not work, type `/speckit` in chat and pick from the list your installation offers.

## 2. Spec Kit — the nine workflow commands (agent chat)

These are the core of spec-driven development, in the order the [official reference](https://github.github.io/spec-kit/reference/agentic-sdd.html) lists them.

| # | Command | What it does | Reads | Writes | Needed? |
|---|---|---|---|---|---|
| 1 | `/speckit-constitution` | Records project-wide principles | Your description | `.specify\memory\constitution.md` | Once per project |
| 2 | `/speckit-specify` | Describes **what** to build and **why** | Your description | `specs\<NNN-name>\spec.md`, a requirements checklist, the active-feature pointer | **Required** |
| 3 | `/speckit-clarify` | Asks up to five targeted questions about gaps | `spec.md` | Answers go into `spec.md` | Optional, recommended |
| 4 | `/speckit-plan` | Chooses the technical approach (**how**) | Spec, constitution, your stack notes | `plan.md` plus research, data model, contracts and `quickstart.md` | **Required** |
| 5 | `/speckit-checklist` | Reviews the quality of the requirements | Spec | A checklist that the reviewer owns and ticks | Optional gate |
| 6 | `/speckit-tasks` | Breaks the plan into ordered tasks | Plan and design files | `tasks.md` | **Required** |
| 7 | `/speckit-analyze` | Reports contradictions between spec, plan and tasks | All three | Nothing. Read-only | Optional, recommended |
| 8 | `/speckit-implement` | Carries out the tasks | `tasks.md`, checklist state | Your source code | **Required** |
| 9 | `/speckit-converge` | Checks the code against spec, plan and tasks | All of them plus the code | Only appends remaining work to `tasks.md` | Recommended; repeat with implement until nothing remains |

**Shortest documented path:** specify → plan → tasks → implement → converge. Only `specify` is strictly required before `plan`. The extra steps are the points where you catch mistakes cheaply.

> **⚠️ Things people assume that are not true:** `analyze` does not fix anything. `converge` does not edit code or rewrite the spec. `checklist` is not a test suite. The constitution command no longer rewrites templates; an optional preset (`constitution-sync`) restores that behaviour. (One upstream reference page still describes the old behaviour.)

**Moved out of core:** creating GitHub issues from tasks now lives in the optional `github` extension (see section 4), not in the core command set.

## 3. Spec Kit — terminal commands

### Everyday commands

| Command | Purpose | Example |
|---|---|---|
| `specify init <name>` | Create a new project folder with Spec Kit files | `specify init room-book --integration copilot --script ps` |
| `specify init --here --force` | Add Spec Kit to the current, non-empty folder | `specify init --here --force --integration copilot --script ps` |
| `specify version` | Show the installed version | `specify version` |
| `specify check` | Check that the surrounding tools are available | `specify check` |
| `specify self check` | See whether a newer release exists. Read-only | `specify self check` |
| `specify self upgrade` | Upgrade the CLI itself. On Windows with a uv installation it only **prints** the command to run; copy and run that command | `specify self upgrade --dry-run` |
| `specify integration status` | Show which agent integration the project uses and its state | `specify integration status` |
| `specify integration upgrade <key>` | Refresh the project's generated agent files after a CLI upgrade | `specify integration upgrade copilot` |

**Important `init` options** ([core reference](https://github.github.io/spec-kit/overview/core.html)):

| Option | Meaning |
|---|---|
| `--integration <key>` | Which coding agent to set up, for example `copilot`, `claude`, `codex`, `gemini` |
| `--script sh` / `ps` / `py` | Helper script flavour. Default is `ps` on Windows and `sh` elsewhere |
| `--here` | Use the current folder instead of creating one |
| `--force` | Allow a non-empty folder; may replace Spec Kit's own managed files |
| `--integration-options="…"` | Agent-specific options, for example `--no-model-invocation` for Copilot |
| `--preset <id>` | Apply a preset during initialization |
| `--non-interactive` | Do not prompt; useful in scripts |

### Managing integrations

| Command | Purpose |
|---|---|
| `specify integration list` | List available integrations |
| `specify integration info <id>` | Show details of one |
| `specify integration install <key>` | Add an integration to the project |
| `specify integration use <key>` / `switch <key>` | Change which integration is the default / switch the project to another agent |
| `specify integration uninstall [<key>]` | Remove one |
| `specify integration upgrade [<key>]` | Refresh generated files; stops on locally modified files unless you pass `--force` |

More than forty integration keys exist, including `copilot`, `claude`, `codex`, `cursor-agent`, `gemini`, `kiro-cli`, `opencode`, `junie`, `zed`, `none` and `generic`. See the [integrations index](https://github.github.io/spec-kit/integrations/index.html) for the current list. Teams whose members use different agents can initialize with `none` and let each developer switch locally.

### Extensions, presets, workflows and bundles

These are optional building blocks. A beginner needs at most `extension add` for the bug and assessment flows.

| Concept | What it is | Bundled with Spec Kit | Key commands |
|---|---|---|---|
| **Extension** | Adds commands and hooks | `git`, `bug`, `assess`, `github`, `agent-context` (none installed by default) | `specify extension list`, `add <name>`, `add --from <url>`, `remove <name>`, `update`, `enable` / `disable <name>`, `info <name>`, `search` |
| **Preset** | Stackable customization of templates, commands and scripts | `lean`, `constitution-sync` | `specify preset list`, `add <id>`, `remove <id>`, `info <id>`, `resolve <template-name>`, `enable` / `disable <id>` |
| **Workflow** | A scripted, resumable run of several steps with review gates | `speckit`, `bugfix`, `assess` | `specify workflow list`, `run <id> --input key=value` (short form `-i`), `status`, `resume <run_id>` |
| **Bundle** | A package of extensions, presets and workflows installed together | `bugfix`, `assess` | `specify bundle list`, `install <id>`, `update <id>`, `remove <id>` |

```terminal
specify extension search
specify extension add bug
specify workflow run speckit --input spec="Add CSV export to the RoomBook bookings list"
```

Sources: [extensions](https://github.github.io/spec-kit/extensions/cli.html), [presets](https://github.github.io/spec-kit/presets/cli.html), [workflows](https://github.github.io/spec-kit/workflows/cli.html), [bundles](https://github.github.io/spec-kit/bundles/cli.html).

> **⚠️ Before installing anything from a catalog:** the maintainers state they "do **not review, audit, endorse, or support the extension code itself**". Community entries install by URL, and custom workflow steps "contain executable Python". Read the source, and try it in a copy of your repository. Unattended Copilot workflow runs add an allow-all-tools flag by default unless you set `SPECKIT_COPILOT_ALLOW_ALL_TOOLS=0`.

Two smaller commands exist for tooling: `specify artifact list --json` and `specify artifact info <name> --json` (read-only inspection of installed commands and templates), and `specify mcp` (an experimental, read-only MCP server). You can ignore both while learning.

## 4. Spec Kit — optional extension commands (agent chat)

Install the extension in the terminal first (`specify extension add <name>`), then use its commands in chat.

| Extension | Commands | What you get |
|---|---|---|
| **bug** | `/speckit-bug-assess "<symptom>" slug=<name>` → `/speckit-bug-fix slug=<name>` → `/speckit-bug-test slug=<name>` | Records in `.specify\bugs\<slug>\`. Only the fix stage edits code. Final verdict: verified, partial or failed |
| **assess** | `/speckit-assess-intake "<idea>" slug=<name>` → `-research` → `-define` → `-shape` → `-decide` | Records in `.specify\assessments\<slug>\`. No code changes. Verdict: go, needs-clarification or kill |
| **git** | Initialize a repository, create a feature branch, validate, detect the remote URL, commit | Automatic feature branches before `specify`; optional auto-commit hooks, all off by default |
| **github** | Tasks-to-issues | Creates GitHub issues from `tasks.md`. Needs a GitHub remote and the GitHub MCP server |
| **agent-context** | Update agent context | Keeps the agent's context file in step with the project |

Guides: [bug fixing](https://github.github.io/spec-kit/guides/bugfix.html), [idea assessment](https://github.github.io/spec-kit/guides/assessment.html). Worked examples are on the [existing-projects page](sdd-existing-projects.md#7-not-every-backlog-item-needs-a-spec).

## 5. Spec Kit — files, folders and settings

The "Commit it?" column is this guide's recommendation, except where the documentation says a file is machine-local.

| Path | What it holds | Commit it? |
|---|---|---|
| `.specify\memory\constitution.md` | Project principles | Yes |
| `.specify\templates\`, `.specify\scripts\` | Managed templates and helper scripts | Yes |
| `.specify\templates\overrides\` | Your own template changes, which survive upgrades | Yes |
| `.specify\feature.json` | Pointer to the active feature on **this machine** | No. Ignored by the managed `.specify\.gitignore` |
| `.specify\extensions\`, `.specify\presets\` | Installed extensions and presets | Yes, except per-machine `local-config.yml` |
| `.specify\bugs\`, `.specify\assessments\` | Records from the bug and assessment extensions | Team decision |
| `.github\skills\speckit-*\SKILL.md` | The Copilot skills | Yes |
| `specs\<NNN-name>\` | `spec.md`, `plan.md`, `tasks.md`, checklists and design files for one feature | Team decision. See [how specs age](sdd-production.md#2-decide-how-specifications-age) |

| Environment variable | Use |
|---|---|
| `SPECIFY_FEATURE_DIRECTORY` | Select the feature folder explicitly; wins over `feature.json`. PowerShell: `$env:SPECIFY_FEATURE_DIRECTORY = "specs/001-my-feature"`, set before you start the agent |
| `SPECIFY_INIT_DIR` | Select which project (folder containing `.specify\`) a command applies to, for monorepos. Not used by `init` |
| `SPECIFY_FEATURE_NO_PERSIST` | Set to `1` so scripts do not overwrite the shared `feature.json` |
| `SPECIFY_FEATURE` | A label only. It does not select a folder |
| `SPECKIT_COPILOT_ALLOW_ALL_TOOLS` | Set to `0` to stop unattended Copilot workflow runs from allowing all tools |
| `SPECKIT_INTEGRATION_DEFAULT` | Which integration `init` uses when it cannot ask |

**Upgrade in three steps** ([upgrade guide](https://github.github.io/spec-kit/upgrade.html)): update the CLI (`specify self upgrade`, or reinstall the pinned version with `uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git@vX.Y.Z`), then `specify integration upgrade copilot` in each project, then `specify extension update` if you use extensions. Your `specs\`, source code and constitution are not touched. Restart the editor afterwards.

## 6. Squad — terminal commands

Squad's CLI is large. The first table is everything a beginner needs for the Copilot-hosted path used in this guide.

### Start here

| Command | Purpose | Example |
|---|---|---|
| `squad init` | Add the coordinator and `.squad\` scaffolding to the repository. Safe to repeat | `squad init --no-workflows --no-vscode-default` |
| `copilot --agent squad` | Start a session with the Squad coordinator (this is a Copilot CLI command) | `copilot --agent squad` |
| `squad doctor` | Check that the setup is intact | `squad doctor` |
| `squad status` / `squad health` | Quick status and health report | `squad health --json` |
| `squad upgrade` | Refresh Squad-owned files in this project after a CLI update. It can also **add** workflow files, even if you initialized with `--no-workflows`; check the dry run | `squad upgrade --dry-run` |
| `squad upgrade --self` | Update the CLI itself | `squad upgrade --self` |
| `squad roles` | Browse the built-in role catalogue | `squad roles --search test` |
| `squad cast` | Add a team member from the terminal (alias: `hire`) | `squad cast --name Ada --role "Backend developer"` |
| `squad roster add` / `remove` | Add the reviewers `rai` and `fact-checker` to a team upgraded from an older version; `remove` only undoes what `roster add` added | `squad roster add fact-checker --dry-run` |
| `squad nap` | Compress and tidy team memory | `squad nap --dry-run` |
| `squad export` / `squad import <file>` | Save a team to a file / load one | `squad export --out team.json` |

**Useful `init` options:** `--no-workflows` skips installing GitHub Actions workflows; `--no-vscode-default` leaves your VS Code default chat mode alone; `--roles` and `--preset <name>` start from predefined roles; `--client <list>` sets up hosts other than Copilot.

### Automation and scale (add later, deliberately)

| Command | Purpose | Note |
|---|---|---|
| `squad triage` (alias `watch`) | "Ralph" work loop: polls GitHub issues and routes them | Add `--execute` only when you want it to act. Stop with a `.squad\ralph-stop` file |
| `squad loop` | Run a prepared `loop.md` prompt repeatedly | The file must be marked as configured first |
| `squad schedule list` / `run` / `status` | Scheduled jobs | |
| `squad copilot` | Add or remove the Copilot coding agent as a team member | `--auto-assign` needs a repository secret |
| `squad economy on` / `off` | Prefer cheaper models | |
| `squad cost` | Usage summary | **Not populated** for Copilot CLI or VS Code sessions; use Copilot's own usage reporting |
| `squad memory …`, `squad lockout …` | Inspect memory; manage the reviewer lock-out protocol | Advanced |
| `squad upstream add` / `list` / `sync` | Inherit conventions from a shared source | After a 2.0 upgrade, run `squad upstream sync` |
| `squad preset list` / `apply` / `save` | Reusable team presets | |
| `squad plugin marketplace …`, `squad skill …` | Add plugins and skills from external sources | Review before installing; treat like any third-party code |
| `squad subsquads`, `squad registry`, `squad discover`, `squad delegate` | Several squads working together | Advanced |
| `squad migrate` | Convert between formats or from the old `.ai-team` folder. The folder rename is **not** previewed by `--dry-run` | See the [Squad page](squad.md#10-upgrading-and-migrating-from-older-squad-setups) |
| `squad scrub-emails .squad` | Remove e-mail addresses from team files. Name the folder: without it, the command targets the legacy `.ai-team` folder | Worth running before `squad export` (this guide's suggestion) |

**Deprecated or removed in 2.0:** the bare `squad` interactive shell and `squad shell` (use `copilot --agent squad`), `squad start` and `squad rc`, and the personal-squad, consult-mode and `--global` features. Older tutorials that rely on them will not work as written.

Sources: [CLI reference](https://github.github.io/squad/docs/reference/cli/) and the [v2.0.0 command source](https://github.com/github/squad/blob/v2.0.0/packages/squad-cli/src/cli-entry.ts). The reference page lists fewer commands than the program accepts; commands that appear only in the source are left out of this table or marked advanced.

## 7. Squad — talking to the team (agent chat)

You direct the team in plain sentences, and the coordinator recognizes certain patterns. Squad adds a single slash command, `/squad`, which opens its command menu; it exists only if Squad's starter skills were installed (see the caveat on the [Squad page](squad.md#2-install-and-initialize)).

| You want to… | Say something like | What happens |
|---|---|---|
| See what is possible | "squad commands" or `/squad` | A categorized menu. Needs Squad's starter skills |
| Ask one member | "Ada, review the booking endpoint" | That member answers; names are case-insensitive |
| Ask everyone | "Team, review the codebase and tell me what you find" | Work fans out in parallel |
| Let Squad choose | Any general request | Routed using `.squad\routing.md` |
| Set a standing rule | "Always use the existing test runner." "Never log personal data." | Saved as a directive in the decisions inbox, then merged into `decisions.md` |
| Add or remove a member | "I need a DevOps person." "Remove the designer." | Roster changes; removed members are archived, not deleted |
| Add a human | "Add Sarah as design reviewer" | Squad pauses for that person's input and you relay it |
| Run a ceremony | "Run a design meeting." "Run a retro." | Design review before shared work; retrospective after failures |
| Work from issues | "Show the backlog." "Work on #12." | Uses GitHub issues through `gh` |
| Read an existing spec | "Read the PRD at docs\product-spec.md and suggest implementation slices" | Ingests the document; it is not a tracker |
| Change models | "Use a stronger model for the planner in this session" | Check the label on each spawned agent; host support varies |
| Start or stop monitoring | "Ralph, go." "Ralph, status." "Ralph, idle." | Controls the work monitor |
| Tidy memory | Run `squad nap` in the terminal | Compresses and tidies team memory. (The docs also describe "Team, reskill", but say it is not yet shipped through the normal installation) |

**Built-in members.** A new v2.0.0 team has four: *Scribe* silently records decisions, *Ralph* monitors the work queue, *Rai* is a responsible-AI reviewer and *Fact Checker* verifies claims. On a team upgraded from an older version, Rai and Fact Checker are opt-in and are added with `squad roster add`. Their approval is review input, not a release decision.

## 8. Squad — files and folders

| Path | What it holds | Commit it? |
|---|---|---|
| `.squad\team.md` | Roster and roles, including human members | Yes |
| `.squad\routing.md` | Who handles which kind of work | Yes |
| `.squad\decisions.md` | Shared decisions and directives, append-only | Yes |
| `.squad\decisions\inbox\` | Proposed decisions waiting to be merged | No (ignored) |
| `.squad\agents\<name>\charter.md`, `history.md` | Each member's role description and memory | Yes |
| `.squad\casting\` | Name and role registry. Do not edit by hand | Yes |
| `.squad\skills\`, `.squad\ceremonies.md`, `.squad\config.json` | Skills, ceremony settings, model and client settings | Yes |
| `.squad\log\`, `orchestration-log\`, `sessions\`, `.scratch\`, `.cache\` | Run logs and temporary state | No (ignored) |
| `.github\agents\squad.agent.md` | The coordinator. Owned by Squad; do not edit | Yes |
| `.github\workflows\squad-*.yml`, `sync-squad-labels.yml` | Optional automation; skipped by `init --no-workflows` | Only after review |
| `.mcp.json` (repository root) | Registers Squad's state server | Yes, after review |
| `.gitattributes` | Merge rules so decision and history files combine instead of conflicting | Yes |
| `.vscode\settings.json` | Sets Squad as the default chat mode unless you used `--no-vscode-default` | Your choice |

Review team files before committing: memory can contain internal decisions, paths, copied prompts or personal data.

## 9. Which command when?

| Situation | Reach for |
|---|---|
| I have an idea but it is vague | Assessment extension: `/speckit-assess-intake` |
| I know what I want to build | `/speckit-specify`, then `/speckit-clarify` |
| The spec feels incomplete | `/speckit-clarify`, `/speckit-checklist` |
| I want to choose the technology | `/speckit-plan` |
| Spec, plan and tasks may disagree | `/speckit-analyze` |
| The agent says it is finished | Run the tests yourself, read the diff, then `/speckit-converge` |
| The requirement changed | Edit `spec.md`, update plan and tasks, `/speckit-analyze`, implement, converge |
| A bug was reported | Bug extension: `/speckit-bug-assess`, `-fix`, `-test` |
| A skill is working on the wrong feature | Check `.specify\feature.json` |
| I upgraded the Spec Kit CLI | `specify integration upgrade copilot` in each project |
| The work splits into independent parts | Hand reviewed tasks to Squad: `copilot --agent squad` |
| Squad seems broken | `squad doctor`, then check `.github\agents\squad.agent.md` exists |
| I upgraded the Squad CLI | `squad upgrade`, then `squad doctor`, in each project |
| The team's memory is getting long or contradictory | `squad nap --dry-run`, then correct `decisions.md` |

## Check Your Understanding

**1. A tutorial says to type `/speckit.plan`, but nothing happens in Copilot Chat. What is the likely reason?**

- A) It is the dotted spelling; the default Copilot skills layout uses hyphens
- B) A command that starts with a slash has to be typed in the terminal, not in chat
- C) The plan command only works after `/speckit-clarify` has been run
- D) The plan command has moved into the optional `github` extension

> **✅ Answer:** A — That is the dotted spelling. The default Copilot skills layout uses hyphens: `/speckit-plan`. Type `/speckit` and choose from the list. A command that starts with a slash belongs in chat, and only `specify` is strictly required before `plan`.

**2. Which of the nine workflow commands writes to your source code?**

- A) `/speckit-constitution`
- B) `/speckit-analyze`
- C) `/speckit-converge`
- D) `/speckit-implement`

> **✅ Answer:** D — None of them changes your source code except `implement` (and, in the bug extension, the fix stage). `analyze` is read-only, and `converge` can only append tasks to `tasks.md`.

**3. You updated the `specify` CLI. Are the skills in your project updated too?**

- A) Yes. The skills are part of the CLI, so they change with it
- B) No. Run `specify integration upgrade copilot` in the project
- C) No. Run `specify self check` in the project to refresh them
- D) Yes, as soon as you have restarted the editor

> **✅ Answer:** B — The CLI and the project's generated files are separate. Run `specify integration upgrade copilot` in the project and review the diff. `specify self check` only shows whether a newer release exists.

**4. Why is `squad cost` not a reliable bill for the workflow in this guide?**

- A) It only counts sessions after `squad economy on`
- B) It only counts runs that were started with `--execute`
- C) It is not populated by Copilot CLI or VS Code sessions
- D) It was removed from the CLI in version 2.0

> **✅ Answer:** C — Its ledger is not written by Copilot CLI or VS Code sessions. Use Copilot's own usage reporting.

**5. You suspect that the spec, the plan and the tasks contradict each other. What does `/speckit-analyze` do?**

- A) It reports the contradictions and writes nothing
- B) It rewrites the plan and the tasks to match the spec
- C) It appends the remaining work to `tasks.md`
- D) It asks five questions and updates `spec.md`

> **✅ Answer:** A — `analyze` reports contradictions between spec, plan and tasks and is read-only; it does not fix anything. Appending work to `tasks.md` is what `converge` does, and the questions belong to `clarify`.

[← Chapter 18: Shipping & Reuse](sdd-production.md) · [Glossary →](glossary.md)
