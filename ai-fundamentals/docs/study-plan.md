# Study Plan: Your Complete AI Learning Path

**Start here · Study plan**

A complete, week-by-week plan that combines the chapters of this site with the best free and low-cost AI courses from Google, Microsoft, OpenAI, Anthropic and the University of Helsinki — plus a daily practice habit, because applying AI to your own work is what turns learning into results.

## 1. How the plan works

Every path mixes three ingredients:

| Ingredient | What it gives you | Where it comes from |
|---|---|---|
| **Understand** | How AI models work, so you can judge what they can and cannot do | Chapters 1–9 of this site, Elements of AI |
| **Use** | Hands-on skill with real AI tools and good prompting habits | Google AI Essentials, OpenAI Academy, Claude Academy, Chapter 6 |
| **Apply** | Visible results on your own daily work | [Chapter 10: AI at Work](ai-at-work.md) and the weekly practice tasks below |

> **📘 In plain words:** Learn a little, use it the same week on a real task, and write down what happened. Repeat. That loop beats binge-watching a course.

## 2. Choose your path

| If you… | Take | Time |
|---|---|---|
| Use AI rarely and want a solid, practical foundation | **Path A: AI-literate professional** | 4 weeks · ~3 h/week |
| Already use ChatGPT, Claude, Gemini or Copilot and want to get much better at it | **Path B: AI power user** | 6 weeks · ~4 h/week |
| Want to build AI solutions or earn a Microsoft certification | **Path C: AI builder** | 8 weeks · ~5 h/week |

The paths stack: B assumes A's basics, and C assumes B's. If you already know a topic, skip that week.

> **🎯 Try it:** Paste the "learning plan" prompt from [Chapter 10, §7](ai-at-work.md) into your AI assistant to adapt the path you picked to your role and calendar.

## 3. Path A — AI-literate professional (4 weeks)

**Goal:** understand what AI is, use a chat assistant confidently and safely, and apply it to two or three of your own tasks.

| Week | Learn | Practise on your own work | Deliverable |
|---|---|---|---|
| 1 | [Home](index.md) "big picture" + [Chapter 1: Foundations](foundations.md) · Elements of AI, chapters 1–2 | List the tasks in your week that take over 15 minutes ([Chapter 10, §2](ai-at-work.md)) | Your task inventory |
| 2 | Google AI Essentials *or* OpenAI Academy "Apply AI at Work" (first modules) · [Chapter 6, §2: Prompting](using-ai.md) | Do one real task per day with an approved AI assistant | 3 tasks where AI clearly helped |
| 3 | Claude Academy: *AI Fluency: Framework & Foundations* · [Chapter 9, §5–6: Privacy & Responsible AI](best-practices.md) | Rewrite your best prompts; start a prompt library | 3 saved prompts |
| 4 | Claude Academy: *AI Capabilities and Limitations* · [Chapter 10: AI at Work](ai-at-work.md) | Log time and quality for every AI-assisted task | One-page "how I use AI for X" |

> **✅ Key takeaway:** After Path A you can explain AI in plain words, prompt well, know the safety rules, and point to real tasks you do better.

## 4. Path B — AI power user (6 weeks)

**Goal:** understand why models behave as they do, master prompting and context, and build repeatable AI workflows for your role.

| Week | Learn | Practise on your own work | Deliverable |
|---|---|---|---|
| 1 | [Chapter 2: Neural Networks](neural-networks.md) · 3Blue1Brown neural network videos | Explain to a colleague, in 2 minutes, what "training" means | Your own one-paragraph explanation |
| 2 | [Chapter 3: Transformers & LLMs](transformers.md) · [Chapter 8: Tokens & Cost](tokens.md) | Paste text into a tokenizer; compare long vs short prompts | A note on context limits in your tools |
| 3 | Anthropic Prompt Engineering Interactive Tutorial, chapters 1–5 | Apply each technique to one of your saved prompts | Improved prompt library |
| 4 | Anthropic tutorial, chapters 6–9 · [Chapter 6: Using Models](using-ai.md) §2–3 and [Chapter 7: Connecting Models](connecting-ai.md) §1–4 | Use examples and step-by-step reasoning on a complex task | A multi-step workflow (e.g. notes → summary → email) |
| 5 | OpenAI Academy "Apply AI at Work" (workflows and agents) · [Chapter 5: Model Landscape](models.md) | Try the same task in two different assistants and compare | A short comparison table |
| 6 | [Chapter 9: Best Practices](best-practices.md) · [Chapter 10, §5–6](ai-at-work.md) | Measure a month of AI use; share your best workflow | 5-minute team demo |

## 5. Path C — AI builder (8 weeks)

**Goal:** build simple AI-powered solutions, understand training and evaluation, and prepare for the Microsoft Azure AI Fundamentals certification (exam AI-901).

**Before you start:** Microsoft expects AI-901 candidates to know basic Python syntax and to be familiar with Azure resources. If you are new to either, add a free Python basics course and the Azure fundamentals material on Microsoft Learn before week 2.

| Week | Learn | Build / practise | Deliverable |
|---|---|---|---|
| 1 | [Chapter 4: Training & Tuning](training.md) · Google ML Crash Course (first modules) | Train a tiny network in TensorFlow Playground | Screenshot + what you changed and why |
| 2 | Microsoft Learn: *Introduction to AI in Azure* (AI-901 course), concepts part | Explore Microsoft Foundry's model catalogue | Notes mapped to the AI-901 skills outline |
| 3 | AI-901 course, Foundry part · [Chapter 6, §3](using-ai.md) and [Chapter 7, §3](connecting-ai.md) (structured outputs, tool calling) | Call a model from code or a playground with JSON output | Working sample |
| 4 | [Chapter 7, §1–2: Embeddings & RAG](connecting-ai.md) · Microsoft *Generative AI for Beginners*, RAG lessons | Build the mini Q&A bot from [Chapter 7, §7](connecting-ai.md#7-mini-project-a-qa-bot-over-your-notes) on public or synthetic documents | Demo bot |
| 5 | Claude Academy: *Building with the Claude API* or OpenAI Academy "Build with AI" | Add tool calling to your bot | Bot with one tool |
| 6 | Claude Academy: *Introduction to Model Context Protocol* · [Chapter 7, §5: MCP](connecting-ai.md) | Connect an assistant to a tool via MCP | MCP experiment notes |
| 7 | [Chapter 9, §3–4: Evaluation & Security](best-practices.md) · OWASP Top 10 for LLM Apps | Write 10 test cases for your bot; try a prompt-injection attack on it | Eval results + fixes |
| 8 | AI-901 practice assessment (free; linked from the certification page, runs on Microsoft AI Skills Navigator) · review weak areas | Take the practice assessment until you pass comfortably | Exam booked or passed |

> **⚠️ Common misconception:** "A certificate proves I can build AI solutions." AI-901 is a *fundamentals* exam. The bot, the evaluation and the security test from weeks 4–7 are what show you can build.

### Optional builder workshop: spec to production

After you can run and test a small application, use [Chapter 13](spec-driven-development.md) to practise AI-assisted software delivery. This is separate from the AI-901 exam path; your product does not need to contain an AI model.

| Session | Practise | Deliverable |
|---|---|---|
| 0 | [Equip your agent](agent-toolkit.md) with instructions, one skill, one read-only MCP server and a reviewer agent; apply the [control checklist](agent-guardrails.md#10-control-checklist) | A prepared repository and a ticked control checklist |
| 1 | [Set up Spec Kit](spec-kit.md), write one bounded feature and resolve ambiguities | Reviewed spec with observable acceptance criteria |
| 2 | Review the plan, tasks and analysis; implement with one agent | Small working change with tests you have actually run |
| 3 | [Try Squad](squad.md) on independent remaining tasks, then review the combined result | A recorded task handoff and evidence of what each role changed |
| 4 | [Adopt Spec Kit in an existing project](sdd-existing-projects.md): baseline, evidence-based constitution and one bounded change | The adoption commit, a reviewed constitution and one merged change |
| 5 | Follow [Shipping and Reuse](sdd-production.md), including a release rehearsal | PR checklist, rollback plan and a reusable project setup checklist |

Keep the [command reference](sdd-reference.md) open while you practise.

Start with synthetic data and a learning repository. The tutorial is not permission to deploy an unreviewed application.

## 6. The courses at a glance

All facts below come from the providers' own pages, checked on 31 October 2026. Prices, content and names change often — check the link before you enrol.

| Course | Provider | Best for | Effort | Cost & certificate | Link |
|---|---|---|---|---|---|
| **Elements of AI** (Part 1: Introduction to AI) | University of Helsinki & MinnaLearn | Absolute beginners; what AI is and is not; ethics | Six chapters with exercises; self-paced | Free, including a free digital certificate. Local sites for NL, BE, RO and LT exist. | [elementsofai.com](https://www.elementsofai.com/) |
| **Building AI** (Elements of AI Part 2) | University of Helsinki & MinnaLearn | Next step after Part 1; some algorithms in practice | Self-paced | Free to study; basic Python recommended; optional paid certificate (€50) | [buildingai.elementsofai.com](https://buildingai.elementsofai.com/) |
| **Google AI Essentials** | Google on Coursera | Using generative AI tools for everyday work; prompting; responsible use | 5 short courses: Introduction to AI · Maximize Productivity With AI Tools · Discover the Art of Prompting · Use AI Responsibly · Stay Ahead of the AI Curve (under 10 h) | Coursera subscription (financial aid available); Google certificate | [coursera.org](https://www.coursera.org/specializations/ai-essentials-google) |
| **OpenAI Academy** | OpenAI | Practical ChatGPT skills by audience: *Apply AI at Work*, *Build with AI*, *Lead AI Adoption*, *Teach and Learn with AI* | Self-paced | Free; needs a ChatGPT account | [academy.openai.com](https://academy.openai.com/) |
| **Claude Academy** (formerly Anthropic Academy) — AI Fluency | Anthropic | How to work *with* AI well: delegation, description, discernment, diligence; capabilities and limitations | *AI Fluency: Framework & Foundations* ~4 h · *AI Capabilities and Limitations* ~3.5 h | Free | [academy.claude.com](https://academy.claude.com/) |
| **Claude Academy** (formerly Anthropic Academy) — product & developer courses | Anthropic | *Claude 101*, *Claude Code in Action*, *Building with the Claude API*, *Introduction to Model Context Protocol* and more | Self-paced | Free; completion badge | [academy.claude.com](https://academy.claude.com/courses) |
| **Prompt Engineering Interactive Tutorial** | Anthropic (GitHub) | Hands-on prompting, from basic structure to avoiding hallucinations and complex prompts | 9 chapters + appendix (chaining, tool use, retrieval); notebooks or a Google Sheets version | Free | [github.com](https://github.com/anthropics/prompt-eng-interactive-tutorial) |
| **Azure AI Fundamentals** (exam AI-901) | Microsoft | AI concepts (40–45%) and building with Microsoft Foundry (55–60%); a recognised entry-level certification | Free Learn course + practice assessment; exam has a regional fee | Learning free; exam paid; certificate does not expire | [Certification](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/) · [Exam AI-901](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/) |

> **⚠️ Watch out for outdated material:**
> - **AI-900 is replaced by AI-901.** Microsoft's certification page now lists AI-901 as the required exam. Older study guides and videos about AI-900 miss the generative AI and Foundry content.
> - **Anthropic's GitHub tutorial uses Claude 3 model names.** The prompting techniques are still valid; just use a current model when you run the exercises. The older `anthropics/courses` repository was archived in September 2026 — prefer Claude Academy for maintained material.
> - **OpenAI Academy** has reorganised its catalogue, so older blog posts and videos may list course names that no longer match the current site.

More courses, videos, tools and papers are on the [Resources](resources.md) page.

## 7. Stay current: a 30-minute weekly routine

AI tools change every month. A short, fixed routine keeps you up to date without drowning in hype.

| Time | Activity | Suggested sources |
|---|---|---|
| 10 min | **News & new tools** — what was released this week? | [Matt Wolfe on YouTube](https://www.youtube.com/@mreflow) and his [Future Tools](https://www.futuretools.io/) site and newsletter (AI news and a searchable tool directory) |
| 10 min | **Primary sources** — changelogs of the tools you actually use | Provider docs and release notes (OpenAI, Anthropic, Google, GitHub Copilot, Microsoft — see [Resources](resources.md)) |
| 10 min | **Try one thing** — test one new feature or tool on a real task | Your own work, logged as in [Chapter 10, §5](ai-at-work.md) |

> **⚠️ Common misconception:** "If a popular creator shows it, it works for my job." News channels and tool directories are great for *discovering* tools, but some listings are sponsored or affiliate links and demos show best cases. Check that a tool is approved by your organisation and test it on your own (anonymised) work before relying on it.

## 8. Track your progress

Tick these off as you go. Your ticks are saved in this browser.

**Understand**
- [ ] I can explain the difference between AI, machine learning, deep learning and generative AI ([Ch. 1](foundations.md))
- [ ] I can explain what parameters, training and inference are ([Ch. 1](foundations.md), [Ch. 2](neural-networks.md))
- [ ] I can explain tokens, context windows and why models hallucinate ([Ch. 3](transformers.md), [Ch. 8](tokens.md))
- [ ] I finished at least one external foundation course (Elements of AI, Google AI Essentials, OpenAI Academy or Anthropic AI Fluency)

**Use**
- [ ] I use clear task, context, examples and format in my prompts ([Ch. 6](using-ai.md))
- [ ] I know which AI tools my organisation approves and what data I may not paste ([Ch. 9](best-practices.md))
- [ ] I completed the Anthropic Prompt Engineering Interactive Tutorial

**Apply**
- [ ] I have a list of my AI-ready tasks ([Ch. 10](ai-at-work.md))
- [ ] I keep a prompt library with at least 5 prompts
- [ ] I logged AI use for 4 weeks and know where it helps and where it does not
- [ ] I shared one workflow with my team

**Build (Path C)**
- [ ] I built a small RAG bot with tests and a prompt-injection check
- [ ] I passed the AI-901 practice assessment / exam
- [ ] Optional: I wrote one skill and one custom agent, added a read-only MCP server, and know which permission level my agent sessions use ([Ch. 11](agent-toolkit.md), [Ch. 12](agent-guardrails.md))
- [ ] Optional: I delivered one bounded feature with Spec Kit, tried a reviewed Squad handoff, and rehearsed the release checklist ([Ch. 13](spec-driven-development.md))

> **✅ Key takeaway:** Pick one path, combine one course with this site's chapters, and practise on your own work every week. Completed checklists and a log of real results are worth more than a pile of half-finished courses.

[← Home](index.md) · [Chapter 1: Foundations →](foundations.md)
