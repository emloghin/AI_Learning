# AI at Work: From Knowing to Doing

**Chapter 10 · AI at Work**

Courses teach you what AI can do; daily practice is what turns that into a skill people notice. This chapter is a practical playbook: find the tasks in your own week where AI helps, use a simple delegate-review-refine loop, measure the effect, build a personal prompt library, and even use an AI assistant to design your own learning plan.

> **📘 In plain words:** Chapters 1–9 explain the engine. This chapter is about driving: picking real trips, building the habit, and showing where you got to.

## 1. Why practice beats certificates

Free AI courses are excellent, and the [Study Plan](study-plan.md) lists the best ones. But a certificate only shows that you *learned about* AI. What colleagues and managers notice is that you *deliver differently*: faster first drafts, clearer summaries, fewer repetitive hours, and better questions.

That is also common advice in talks about learning AI for your career: pick a course to get the vocabulary, then apply the tools to your own daily tasks until it becomes routine. The second step is the one that is easiest to skip.

> **⚠️ Common misconception:** "Once I finish a course, I will know how to use AI." Courses give you patterns. Only repeated use on *your* work shows you where a tool is strong, where it is wrong, and how much checking it needs.

## 2. Find your AI-ready tasks

Start with an inventory, not a tool. For one week, write down the tasks you do that take more than 15 minutes. Then score each one:

| Question | Good sign for AI help |
|---|---|
| Is it mostly reading, writing, summarising or reformatting text? | Yes |
| Do you already know what a good result looks like? | Yes (you can check the output) |
| Is a first draft that is 70% right still useful? | Yes |
| Does it need facts the model cannot know (internal data, today's numbers)? | Only if you can paste in the needed context — and are allowed to |
| Would a mistake be costly or hard to spot? | No — or only with careful review |

Tasks that score well are your **AI-ready tasks**. Start with two or three.

### 2.1 Common patterns

Almost every useful work task fits one of these eight patterns:

| Pattern | What you ask for | Example |
|---|---|---|
| **Summarise** | Shorten long material and keep what matters | "Summarise this 20-page spec in 10 bullets for a project manager." |
| **Draft** | A first version you will edit | "Draft a status email for the steering group from these notes." |
| **Transform** | Change format, tone, language or structure | "Turn this meeting transcript into a table of decisions and action items." |
| **Extract** | Pull structured facts out of messy text | "List every requirement in this document with its section number." |
| **Brainstorm** | Many options to choose from | "Give me 10 possible names for this internal tool, with a one-line reason each." |
| **Critique** | Find weaknesses in your own work | "Act as a sceptical reviewer. What is unclear or missing in this proposal?" |
| **Plan** | Break a goal into steps | "Break this migration into phases with risks for each phase." |
| **Explain** | Teach you something new at your level | "Explain OAuth 2.0 to me like I know HTTP but not security." |

### 2.2 Examples by role

| Role | AI-ready tasks to try first |
|---|---|
| **Developer** | Explain unfamiliar code, write unit tests, draft commit messages and PR descriptions, convert scripts between languages (see [Chapter 9, §10](best-practices.md)) |
| **Consultant / analyst** | Summarise requirement documents, draft workshop agendas, turn interview notes into themes, review a proposal for gaps |
| **Project manager / scrum master** | Turn meeting notes into action lists, draft release notes, prepare risk registers, rewrite updates for different audiences |
| **Tester** | Generate test-case ideas from user stories, find edge cases, turn bug reports into clear reproduction steps |
| **Manager** | Prepare 1:1 agendas, draft job descriptions, structure feedback, summarise long email threads |
| **Sales / account** | Research a public company profile, draft tailored outreach, prepare objection-handling notes |

> **🎯 Try it:** Pick one row from the table that fits your job. Do one of its tasks with an AI assistant today, and note how long it took compared with doing it yourself.

## 3. The delegate → review → refine loop

Treat an AI assistant like a fast, well-read new colleague who has never seen your project and is sometimes confidently wrong.

1. **Delegate clearly.** Give the task, the audience, the context and the output format (the prompting basics from [Chapter 6](using-ai.md)).
2. **Review critically.** Check facts, numbers, names and logic. Ask yourself: "Would I sign this?"
3. **Refine.** Tell the model exactly what to change ("shorter", "more formal", "you missed requirement 4") instead of starting again.
4. **Decide.** The final version and the responsibility stay with you.

> **💡 Example:** You need a customer-facing project update. Delegate: paste your (anonymised) notes and ask for a 150-word update for a non-technical sponsor. Review: you spot that the model turned "planned for Q3" into "delivered in Q3". Refine: "Keep all dates exactly as in my notes." Decide: you edit two sentences and send it. Total: 6 minutes instead of 20.

> **⚠️ Common misconception:** "If the answer sounds professional, it is correct." Fluency is not accuracy (see hallucinations in [Chapter 3, §13](transformers.md)). The more polished the output, the easier it is to miss an error.

## 4. Rules of the road at work

Before using any AI tool on work material, know your organisation's rules. In general:

- **Use approved tools only.** Company-approved assistants usually come with enterprise data controls (no training on your data, retention limits). Personal accounts usually do not.
- **Do not paste what you may not share.** Customer data, personal data, credentials, secrets and confidential documents stay out unless the tool and your policy explicitly allow it. Use synthetic or anonymised examples instead (see [Chapter 9, §5](best-practices.md)).
- **Be transparent.** If AI substantially wrote something, say so where your policy or your audience expects it.
- **Keep a human decision.** AI output is a draft. Decisions about people, money, contracts or compliance are made by a person who has checked the facts.
- **Know the regulation.** In the EU, [Article 4 of the AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4) requires providers and deployers of AI systems — which includes most organisations that use AI at work — to take measures to support the AI literacy of their staff. Since the 2026 "Digital Omnibus" amendment, no specific level is mandated, but the obligation, which has applied since 2 February 2025, remains ([Commission AI literacy Q&A](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers)) — one more reason structured learning is worth the time.

## 5. Measure the effect

Improvements you can show are worth more than improvements you feel. Keep a simple log for a month:

| Date | Task | Time without AI (estimate) | Time with AI (incl. review) | Quality note |
|---|---|---|---|---|
| 03 Nov | Sprint review summary | 40 min | 15 min | Needed one date fix |
| 05 Nov | Test cases for login story | 60 min | 25 min | Found 2 edge cases I would have missed |
| 06 Nov | Proposal review | 30 min | 30 min | No gain — AI critique too generic |

Rows with no gain are valuable too: they show you where *not* to use AI.

> **💡 Example:** After four weeks the log shows about 3 hours saved per week, mostly on summaries and test design, and no gain on proposals. That is a concrete story to share in a team meeting or a performance conversation — and a guide to where to invest next.

> **⚠️ Common misconception:** "Time saved is the only benefit." Often the bigger win is quality: a second opinion on your own work, edge cases you missed, or a clearer explanation for a different audience. Note those too.

## 6. Build a personal prompt library

When a prompt works well, save it. A prompt library turns one good result into a repeatable one.

- Keep prompts in a document or note with a **name**, **when to use it**, the **prompt text** with placeholders, and **pitfalls** you found.
- Most assistants also let you store instructions once: custom instructions, projects, custom GPTs, Claude projects or Copilot custom instructions. Use these for context you repeat every time (your role, writing style, output format).
- Share good prompts with your team. A shared library spreads the gains and avoids everyone rediscovering the same tricks.

```
Name: Meeting notes → action list
Use when: after any project meeting
Prompt:
  You are a project assistant. From the notes below, produce:
  1. Decisions (one line each)
  2. Action items as a table: owner | action | due date
  3. Open questions
  Use only information in the notes. Write "unknown" if an owner or date is missing.
  <notes>
  {paste notes here}
  </notes>
Pitfalls: invents due dates if you don't include the "unknown" rule.
```

## 7. Use AI to build your own learning plan

An AI assistant is a good tutor and planner — if you give it enough context and verify what it suggests. You can use it to tailor the [Study Plan](study-plan.md) to your role and schedule.

```
I work as a {role} at an IT services company. I use AI tools
{never / occasionally / daily} and want to {goal, e.g. "use AI confidently
for analysis work" or "pass the Azure AI Fundamentals exam"}.

I can study {N} hours per week for {M} weeks.

Create a week-by-week learning plan that:
- mixes short theory with a practical exercise on my own type of work each week
- uses free courses from well-known providers (name the provider and course)
- ends each week with a small deliverable I can show
- includes a weekly 15-minute review of what worked

Ask me up to 3 clarifying questions before you write the plan.
```

Then use the assistant as a tutor while you learn:

- **"Explain it at my level":** "Explain attention in transformers using an analogy from logistics."
- **"Quiz me":** "Ask me 5 questions on tokens and context windows, one at a time, and correct my answers."
- **"Check my understanding":** "Here is my explanation of RAG in my own words. What is wrong or missing?"

> **⚠️ Common misconception:** "The plan the AI gives me is accurate." Models can invent course names, outdated links and wrong durations. Check every course it suggests against the provider's own site — or start from the verified list in the [Study Plan](study-plan.md).

## 8. A 30-day practice challenge

| Week | Focus | Daily habit (10–20 min) | End-of-week deliverable |
|---|---|---|---|
| 1 | **Explore** | Use AI on one real task per day from your inventory | A list of 3 tasks where AI clearly helps |
| 2 | **Improve prompts** | Rewrite one prompt per day using the Chapter 6 techniques; compare results | 3 saved prompts in your library |
| 3 | **Measure** | Log time and quality for every AI-assisted task | One week of log entries |
| 4 | **Share** | Polish your best workflow and write it up | A 5-minute demo or a one-page "how I use AI for X" for your team |

> **✅ Key takeaway:** Learn the basics once, then practise on your own work every day, measure the result and share it. Skill with AI shows in what you deliver, not in how many courses you finished.

## Recap

- Certificates give vocabulary; daily application on real tasks builds the skill people notice.
- Inventory your week, score tasks for AI-readiness, and start with two or three that fit common patterns (summarise, draft, transform, extract, brainstorm, critique, plan, explain).
- Work in a delegate → review → refine → decide loop; the responsibility and final decision stay with you.
- Follow your organisation's rules: approved tools, no confidential or personal data unless allowed, transparency, and human decisions.
- Log time and quality to see where AI helps and where it does not, and save good prompts in a shared library.
- Use an AI assistant to tailor a learning plan and to quiz you — but verify every course and link it suggests.

## Check Your Understanding

**1. Which task is the best first candidate for AI help?**

- A) Approving a contract amendment
- B) Turning your own meeting notes into a list of action items
- C) Calculating a client's final invoice without checking it
- D) Deciding which candidate to hire

> **✅ Answer:** B — It is text transformation, you know what a good result looks like, and errors are easy to spot. The others involve high-stakes decisions that must stay with a person.

**2. In the delegate → review → refine loop, what should you do when the model gets one detail wrong?**

- A) Start a new chat from scratch
- B) Accept it, since the rest is good
- C) Tell the model precisely what to fix and keep the rest
- D) Switch to a different AI tool

> **✅ Answer:** C — Targeted feedback ("keep all dates as in my notes") is the fastest way to a correct result.

**3. Why keep a log of AI-assisted tasks?**

- A) Providers require it for billing
- B) It shows where AI saves time or improves quality — and where it does not
- C) It trains the model on your work
- D) It replaces the need to review outputs

> **✅ Answer:** B — Measured results tell you where to invest and give you concrete examples to share.

**4. An AI assistant gives you a learning plan with five courses. What should you do next?**

- A) Enrol in all five immediately
- B) Verify each course and link on the provider's own website
- C) Ask the same assistant whether the courses are real
- D) Ignore it; AI cannot help with learning

> **✅ Answer:** B — Models can invent or misdate courses; the provider's site is the source of truth. Asking the same model to check itself is not independent verification.

**5. You want to use AI to summarise a document containing customer personal data. What is the right first step?**

- A) Paste it into any free chatbot; it is only a summary
- B) Check your organisation's policy and use an approved tool, or anonymise the data first
- C) Remove the customer's name and assume the rest is fine
- D) Ask the model to forget the data afterwards

> **✅ Answer:** B — Personal data needs an approved tool and a policy that allows it; otherwise use anonymised or synthetic input. Removing one name rarely anonymises a document.

[← Chapter 9: Best Practices](best-practices.md) · [Chapter 11: Equip Your Agent →](agent-toolkit.md)
