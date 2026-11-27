# Get Ready: Terminal, Tools and Git Basics

**Before Parts 3 and 4 · Setup**

Parts 1 and 2 need nothing but a browser. Parts 3 and 4 are hands-on: you will type commands, install a few tools and save your work with Git. This page gives you exactly the basics those chapters assume, and ends with a one-hour path that strings them together.

> **📘 In plain words:** You do not need to be a developer to follow Parts 3 and 4, but you do need to be comfortable with three things: typing a command in a terminal, knowing which folder you are in, and saving a snapshot of your work with Git. Thirty minutes here saves hours of confusion later.

## 1. What you need

| Tool | What it is for | Needed from |
|---|---|---|
| **A terminal** | Typing commands. On Windows this guide uses PowerShell | Chapter 11 |
| **Git** | Saving snapshots of your work and undoing mistakes | Chapter 11 |
| **VS Code with GitHub Copilot**, or the **Copilot CLI** | The AI coding agent itself. Needs a GitHub account with Copilot access | Chapter 11 |
| **Node.js** (LTS version) | Runs many helper tools, including the Copilot CLI and Squad | Chapter 11 |
| **uv** | Installs Python tools such as Spec Kit, and Python itself | Chapter 14 |
| **A practice folder** | A throwaway place to experiment. Never your production repository | Always |

**Cost and permission.** The tools are free; the AI agent is not. Copilot uses a paid plan or your organization's licence, and agent sessions consume usage. At work, use only AI services your organization has approved, and use made-up data while learning.

## 2. The terminal in five minutes

Open **Windows Terminal** or **PowerShell** from the Start menu. In VS Code, the menu **Terminal → New Terminal** opens one that already sits in your project folder.

```powershell
pwd                      # where am I? prints the current folder
ls                       # what is in this folder?
cd Documents             # go into a folder
cd ..                    # go up one level
mkdir ai-practice        # create a folder
cd ai-practice
code .                   # open this folder in VS Code
```

Three habits prevent most beginner problems:

- **Check where you are before you run anything.** Most commands act on the current folder. `pwd` tells you.
- **Read the output.** A command that prints red text or the word "error" did not work, even if the prompt comes back.
- **Copy commands exactly.** Spaces, dashes and quotes matter.

**The colour code used on this site:** a green **Terminal** block is typed in PowerShell. A purple **Agent chat** block is typed in the AI assistant's chat window. Typing one in the other place does nothing useful.

## 3. Environment variables and PATH

An **environment variable** is a named value that programs can read. They are used for settings and for secrets such as API keys, so that those values do not have to be written into files.

```powershell
$env:MY_SETTING = "hello"          # set it for this terminal window only
$env:MY_SETTING                    # show its value
```

A value set this way disappears when you close the window. To keep it for your user account:

```powershell
[Environment]::SetEnvironmentVariable("MY_SETTING", "hello", "User")
```

Then **close and reopen** the terminal and VS Code, because running programs do not see the change. On macOS or Linux the equivalent for one session is `export MY_SETTING=hello`.

You will use this in later chapters, for example to keep an API key out of a configuration file (the file says `${NAME}` and the real value lives in the variable) or to switch a tool's behaviour (`$env:SPECKIT_COPILOT_ALLOW_ALL_TOOLS = "0"`).

**PATH** is one special variable: the list of folders the terminal searches when you type a command name. This explains the most common installation problem.

| Symptom | Cause | Fix |
|---|---|---|
| "`specify` is not recognized as the name of a cmdlet…" right after installing | The terminal was opened before the installation, so its PATH is old | Close the terminal and open a new one |
| Still not found in a new terminal | The tool's folder was not added to PATH | For tools installed with uv, run `uv tool update-shell`, then reopen the terminal |
| An old version runs instead of the new one | Two copies are installed and the older one comes first on PATH | `Get-Command specify` shows which file runs; remove the copy you do not want |

## 4. Install and check the tools

On Windows, `winget` (included in Windows 11) installs most tools from the terminal. If a package name below is not found, use `winget search <name>` or the linked official page.

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Microsoft.VisualStudioCode -e
winget install --id astral-sh.uv -e
```

**Close and reopen the terminal**, then check each one. Every command should print a version number, not an error:

```powershell
git --version
node --version
npm --version
code --version
uv --version
```

| Tool | Official instructions |
|---|---|
| Git | [git-scm.com/downloads](https://git-scm.com/downloads) |
| Node.js | [nodejs.org](https://nodejs.org/) |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com/) |
| uv | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |
| GitHub Copilot in VS Code | [Set up Copilot in VS Code](https://code.visualstudio.com/docs/setup/copilot) |
| GitHub Copilot CLI | [Install Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) |

**Tell Git who you are** (once per computer). Git records this name on every snapshot:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**Sign in to Copilot.** In VS Code, open the Chat view and follow the sign-in prompt. For the CLI, install it as the official page describes, run `copilot` in your practice folder and follow the sign-in instructions. Ask it something harmless first ("What files are in this folder?") to confirm it works **before** adding Spec Kit or Squad. That way, if something fails later you know which layer is the problem.

**If PowerShell refuses to run a script** ("running scripts is disabled on this system"), the computer's *execution policy* is blocking it. This also affects tools installed with npm, such as `squad`, because they start through a small `.ps1` script. First look at what is set, and where:

```powershell
Get-ExecutionPolicy -List
```

The list shows five scopes. `MachinePolicy` and `UserPolicy` are set centrally by your organization (Group Policy). If either of them shows a value, you **cannot** override it locally, even as administrator: ask your IT department.

If those two say `Undefined`, you may change the policy yourself. Choose the smallest change that works:

| What you run | Effect | Needs administrator? |
|---|---|---|
| `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` | Allows scripts in **this terminal window only**. Gone when you close it | No |
| `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` | Allows your own local scripts permanently, for your account. Scripts downloaded from the internet must still be signed | No |
| `Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy RemoteSigned` | The same, for every user of the computer | **Yes.** Open PowerShell with "Run as administrator" |

`RemoteSigned` for `CurrentUser` is the usual choice for a developer machine. Avoid setting `Unrestricted` or `Bypass` permanently: that switches the protection off for every script, including ones you did not mean to run. To return to the default later, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Undefined`.

On a computer managed by your employer, check the rules before changing anything, even if you have administrator rights. For Spec Kit there is also a route that avoids PowerShell scripts altogether: choose the Python helper scripts with `--script py`.

## 5. The ten Git commands you need

Git keeps a history of snapshots, called **commits**, of a folder. When an AI agent edits your files, Git is how you see exactly what it changed and how you undo it. Without Git you cannot work safely with an agent.

| Command | What it does | When you use it |
|---|---|---|
| `git init` | Turns the current folder into a Git repository | Once, in a new project |
| `git status` | Shows which files changed since the last commit | Constantly. Before and after every agent task |
| `git diff` | Shows the exact lines that changed | To read what the agent did |
| `git add -A` | Marks all changes to be included in the next commit | Before committing |
| `git commit -m "message"` | Saves a snapshot with a description | When a step works |
| `git log --oneline` | Lists past commits | To find a point to return to |
| `git switch -c my-branch` | Creates a new branch and moves to it | Before starting any new piece of work |
| `git switch main` | Moves back to the main branch | When you are done with a branch |
| `git restore .` | Throws away all uncommitted changes to tracked files | When the agent made a mess. This cannot be undone |
| `git stash` | Puts uncommitted changes aside temporarily; `git stash pop` brings them back | When you need a clean folder for a moment |

**A branch** is a separate line of work. You keep the `main` branch in a working state and make changes on a branch, so an experiment can be abandoned without harm.

**Try the whole cycle once**, in your practice folder:

```powershell
git init
"# My practice project" | Out-File README.md -Encoding utf8
git add -A
git commit -m "First commit"
git switch -c try-something
"A second line" | Add-Content README.md
git status
git diff
git add -A
git commit -m "Add a second line"
git log --oneline
```

After `git status` you should see `README.md` listed as modified. After `git diff` you should see the new line marked with a `+`. After `git log --oneline` you should see two commits.

> **✅ Key takeaway:** The working rhythm with an agent is: commit your own work → let the agent do one task → `git status` and `git diff` to read what changed → run the tests → commit, or `git restore .` to discard. A clean starting point is what makes the agent's changes reviewable.

**Files Git should ignore.** A file named `.gitignore` lists what must never be committed: build output, dependency folders and, above all, files with secrets.

```file
node_modules/
.venv/
.env
*.log
```

## 6. Pull requests in one minute

So far everything stayed on your computer. A team shares a repository on a hosting service such as GitHub or Azure DevOps (Azure Repos). `git push` sends your branch there.

A **pull request** (PR) is a page on that service that says: "please merge this branch into `main`". It shows the diff, lets colleagues comment and approve, and runs automated checks such as tests. Only after the required approvals and checks does the change enter `main`.

| | GitHub | Azure DevOps |
|---|---|---|
| Proposal to merge | Pull request | Pull request |
| Rules for the main branch | Branch protection rules or rulesets | Branch policies |
| "These people must review this path" | `CODEOWNERS` file | Automatically included reviewers |
| "Tests must pass first" | Required status checks | Build validation |
| Link to planned work | Linked issue | Linked work item |

The pull request is the most important human control point in this whole course: whatever an agent wrote, a person reads the diff and approves it there. [Chapter 12](agent-guardrails.md) shows how to make that review a rule instead of a habit.

## 7. Secrets: keep them out of Git and out of chat

A **secret** is anything that grants access: a password, an API key, a token, a connection string.

- **Never commit a secret.** Git keeps history, so deleting the line later does not remove it. Put secrets in environment variables or a secret manager, and add files such as `.env` to `.gitignore` before you create them.
- **Never paste a secret into an AI chat.** The conversation may be stored, and the agent may repeat the value in a file or a command.
- **Keep secrets out of the agent's reach.** An agent can read every file in the folder you opened. Do not keep production credentials there.
- **If a secret leaks, rotate it.** That means: create a new one and disable the old one at the service that issued it. Removing it from the file is not enough.
- **Use made-up data while learning.** No real customer names, personal identifiers or confidential documents in practice projects or prompts.

## 8. Your first hour: one path through Parts 3 and 4

When the checks in section 4 pass, this sequence takes you from an empty folder to a small reviewed change. Each step links to the chapter that explains it. Pick a tiny feature that needs **no database and no web server**, for example a tip calculator that runs in the terminal.

1. **Create and commit an empty project** (5 min). Make a folder, run `git init`, add a README and commit, as in section 5.
2. **Give the agent house rules** (5 min). Create `.github\copilot-instructions.md` with three lines: the language you want, how to run tests, and "ask before adding dependencies". See [Chapter 11, section 2](agent-toolkit.md#2-custom-instructions-the-house-rules).
3. **Add a read-only reviewer agent** (5 min). Copy the Reviewer file from [Chapter 11, section 5](agent-toolkit.md#5-custom-agents-a-role-with-limited-powers). Commit.
4. **Check your permission level** (2 min). Manual approvals, no allow-all. See [Chapter 12, section 4](agent-guardrails.md#4-settings-that-actually-stop-an-agent).
5. **Add Spec Kit** (10 min). Install it and initialize the folder as shown in [Chapter 14, section 2](spec-kit.md#2-install-once-initialize-each-project). Read `git status`, then commit.
6. **Specify, plan and list tasks** (15 min). In chat: `/speckit-specify` with two sentences describing the calculator, then `/speckit-clarify`, `/speckit-plan` naming a language you know, then `/speckit-tasks`. Read each file before the next command.
7. **Implement on a branch** (10 min). `git switch -c feature/tip-calculator`, then `/speckit-implement`. Read every approval prompt.
8. **Verify it yourself** (5 min). `git diff`, run the tests the plan describes, try the program by hand.
9. **Review and commit** (5 min). Ask the Reviewer agent to check the diff, fix what matters, commit.

You have now used instructions, a custom agent, approvals, a spec, a plan, tasks, an implementation and a review: every idea in Parts 3 and 4 at small scale. The chapters explain each one properly.

## 9. If something does not work

| Problem | First thing to check |
|---|---|
| A command is "not recognized" | Reopen the terminal; then section 3 on PATH |
| A command works in one terminal but not in VS Code | Restart VS Code so it picks up the new PATH |
| Git says "Author identity unknown" | Run the two `git config --global` lines in section 4 |
| Git says "not a git repository" | You are in the wrong folder (`pwd`), or you have not run `git init` |
| Copilot will not sign in or says you have no access | Your account or organization may not have Copilot enabled; ask the administrator |
| Downloads fail at work | A company proxy or policy may block them; ask IT instead of working around it |
| The agent's slash commands do not appear | Open the project's root folder, not a subfolder; restart the chat |
| PowerShell says scripts are disabled | Section 4, execution policy |

More specific tables: [Spec Kit troubleshooting](spec-kit.md#10-troubleshooting-and-deliberate-upgrades), [Squad troubleshooting](squad.md#8-troubleshooting-and-updates) and [adoption pitfalls](sdd-existing-projects.md#13-pitfalls-and-how-to-recover).

## Recap

- Know where you are in the terminal, read the output, and reopen the terminal after installing anything.
- Environment variables hold settings and secrets; PATH decides which programs the terminal can find.
- Git makes an agent's work reviewable and reversible: commit before, `git diff` after.
- A pull request is where a person approves a change before it reaches the main branch.
- Secrets never go into Git, into chat, or into the folder an agent can read.

## Check Your Understanding

**1. You installed a tool and the terminal says the command is not recognized. What do you try first?**

- A) Install the tool a second time
- B) Close the terminal and open a new one
- C) Change the PowerShell execution policy
- D) Run `git init` in the current folder

> **✅ Answer:** B — Close the terminal and open a new one, so it reads the updated PATH. A terminal that was opened before the installation still has the old PATH.

**2. An agent changed twelve files and you do not like the result. Nothing was committed since your last commit. How do you get back?**

- A) `git switch main`
- B) `git add -A`
- C) `git log --oneline`
- D) `git restore .`

> **✅ Answer:** D — `git restore .` discards the uncommitted changes to tracked files and returns them to the last commit. Files the agent newly created stay, and `git status` lists them so you can delete them. This works because you committed before the agent started.

**3. You accidentally committed an API key and pushed it. You delete the line and commit again. Is the problem solved?**

- A) No. The key is still in the history, so rotate it
- B) Yes. The new commit replaces the old one
- C) Yes, once `.env` is listed in `.gitignore`
- D) No, but `git restore .` removes it from the history

> **✅ Answer:** A — The key is still in the history. Rotate it: create a new key and disable the old one. Removing it from the file is not enough.

**4. Where does a person formally approve a change before it reaches the main branch?**

- A) In the agent's chat, when it asks for approval
- B) In the message of the commit
- C) In the pull request
- D) In the `CODEOWNERS` file

> **✅ Answer:** C — In the pull request, backed by branch protection (GitHub) or branch policies (Azure DevOps) that require the review. `CODEOWNERS` only says which people must review a path.

**5. You run `$env:MY_SETTING = "hello"` and later close the terminal window. What happens to the value?**

- A) It is kept for your user account
- B) It disappears with that window
- C) It is added to PATH
- D) It is saved in the `.env` file

> **✅ Answer:** B — A value set this way is set for that terminal window only and disappears when you close the window. To keep it for your user account you use `[Environment]::SetEnvironmentVariable`, then close and reopen the terminal.

[← Study Plan](study-plan.md) · [Chapter 1: Foundations →](foundations.md)
