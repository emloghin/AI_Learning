# Learning Resources

**Reference · Keep learning**

These are hand-picked, free or freely readable resources for going deeper after AI Learn. The original course and model references were checked in October 2026; the agent, Spec Kit and Squad references in sections 9 and 10 were checked on 27 November 2026. Where a resource has moved or been renamed, the table points to its current home.

## 1. Free courses

For a week-by-week plan that combines these courses with the chapters of this site, see the [Study Plan](study-plan.md).

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| Elements of AI (University of Helsinki & MinnaLearn) | Course | Beginner | Free, non-technical introduction to what AI is, how it works and its societal impact, with a free certificate; local sites for NL, BE, RO and LT. Part 2, *Building AI*, adds basic Python. | [elementsofai.com](https://www.elementsofai.com/) |
| Google AI Essentials | Course + certificate | Beginner | Five short courses on using generative AI tools at work, prompting and responsible use; Coursera subscription required for the certificate. | [coursera.org](https://www.coursera.org/specializations/ai-essentials-google) |
| OpenAI Academy | Course hub | Beginner → Intermediate | Free self-paced courses by audience: Apply AI at Work, Build with AI, Lead AI Adoption, Teach and Learn with AI. Needs a ChatGPT account. | [academy.openai.com](https://academy.openai.com/) |
| Claude Academy (formerly Anthropic Academy): AI Fluency | Course | Beginner | Free courses on working well with AI (*AI Fluency: Framework & Foundations*, *AI Capabilities and Limitations*). | [academy.claude.com](https://academy.claude.com/) |
| Claude Academy: product & developer courses | Course hub | Beginner → Intermediate | Free courses with a completion badge: Claude 101, Claude Code in Action, Building with the Claude API, Model Context Protocol. | [academy.claude.com](https://academy.claude.com/courses) |
| Anthropic Prompt Engineering Interactive Tutorial | GitHub course | Beginner → Intermediate | Nine hands-on chapters from basic prompt structure to avoiding hallucinations; examples use Claude 3 model names, but the techniques still apply. | [github.com](https://github.com/anthropics/prompt-eng-interactive-tutorial) |
| Google Machine Learning Crash Course | Course | Beginner | Short lessons, visuals and exercises covering regression, neural networks, overfitting and gradient descent. | [developers.google.com](https://developers.google.com/machine-learning/crash-course) |
| Microsoft Learn: AI learning hub | Course hub | Beginner | Microsoft's starting point for AI training, including an introduction to generative AI and Responsible AI. | [learn.microsoft.com/ai](https://learn.microsoft.com/en-us/ai/) |
| Microsoft: Introduction to AI in Azure (AI-901) | Course + certification | Beginner | Prepares for the Azure AI Fundamentals certification, which now uses exam AI-901 and covers AI concepts plus Microsoft Foundry. | [Course](https://learn.microsoft.com/en-us/training/courses/ai-901t00) · [Exam AI-901](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/) |
| Generative AI for Beginners (Microsoft) | GitHub course | Beginner | 21 free lessons on building generative AI apps: prompting, RAG, agents and more, with code samples. | [github.com](https://github.com/microsoft/generative-ai-for-beginners) |
| ML for Beginners (Microsoft) | GitHub course | Beginner | A 12-week classic machine learning curriculum with quizzes and projects. | [github.com](https://github.com/microsoft/ML-For-Beginners) |
| Hugging Face LLM Course | Course | Beginner → Intermediate | Hands-on introduction to transformers, tokenizers, fine-tuning and sharing models with the Hugging Face ecosystem. | [huggingface.co](https://huggingface.co/learn/llm-course) |
| fast.ai: Practical Deep Learning for Coders | Course | Intermediate | Top-down, code-first deep learning course for people who can already program. | [course.fast.ai](https://course.fast.ai/) |
| DeepLearning.AI Short Courses | Short courses | Beginner → Intermediate | Mostly one- to two-hour courses on prompting, RAG, agents and evaluation, often made with model providers. | [deeplearning.ai](https://www.deeplearning.ai/courses/) |
| Andrej Karpathy: Neural Networks: Zero to Hero | Video course | Intermediate | Build neural networks and a small GPT from scratch in Python, explaining every line. | [karpathy.ai](https://karpathy.ai/zero-to-hero.html) |

> **💡 Example:** For using AI at work, start with Elements of AI and one of Google AI Essentials, OpenAI Academy or Anthropic AI Fluency. For how models work inside, a good path is Google's crash course first, then 3Blue1Brown's videos, then the Hugging Face LLM Course, and finally Karpathy's series once you are comfortable with Python.

## 2. Videos

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| 3Blue1Brown: Neural Networks | Video series | Beginner | Beautiful visual explanations of neurons, gradient descent and backpropagation. | [3blue1brown.com](https://www.3blue1brown.com/topics/neural-networks) |
| 3Blue1Brown: Transformers, the tech behind LLMs | Video lesson | Beginner → Intermediate | Shows how GPT-style models turn tokens into embeddings and predict the next token, step by step. | [3blue1brown.com](https://www.3blue1brown.com/lessons/gpt) |
| Matt Wolfe | YouTube channel + newsletter | Beginner | Weekly AI news and tool walk-throughs; his Future Tools site is a searchable AI tool directory. Good for discovering tools — some listings are sponsored, so test before you rely on them. | [YouTube](https://www.youtube.com/@mreflow) · [futuretools.io](https://www.futuretools.io/) |

## 3. Interactive tools

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| TensorFlow Playground | Browser tool | Beginner | Train a tiny neural network in your browser and watch layers, neurons and learning rate change the result. | [playground.tensorflow.org](https://playground.tensorflow.org) |
| Transformer Explainer | Browser tool | Beginner → Intermediate | Runs a small GPT-2 model live in the browser and visualizes attention and next-token probabilities. | [poloclub.github.io](https://poloclub.github.io/transformer-explainer/) |
| OpenAI Tokenizer | Browser tool | Beginner | Paste text and see exactly how it splits into tokens and how many there are. | [platform.openai.com](https://platform.openai.com/tokenizer) |
| LLM Visualization (Brendan Bycroft) | Browser tool | Intermediate | A 3D walk-through of every step inside a GPT-style model. | [bbycroft.net](https://bbycroft.net/llm) |

## 4. Official documentation

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| OpenAI API docs | Docs | Beginner → Advanced | Guides for text generation, structured outputs, function calling, reasoning, caching and batch. | [developers.openai.com](https://developers.openai.com/api/docs) |
| Anthropic (Claude) docs | Docs | Beginner → Advanced | Prompt engineering guide, token counting, prompt caching and tool use for Claude models. | [platform.claude.com](https://platform.claude.com/docs/en/home) |
| Google Gemini API docs | Docs | Beginner → Advanced | Prompting strategies, context caching, batch API and multimodal input for Gemini. | [ai.google.dev](https://ai.google.dev/gemini-api/docs) |
| Microsoft Foundry (formerly Azure AI Foundry) | Docs | Intermediate | Build, evaluate and deploy AI apps and agents on Azure with many model families. | [learn.microsoft.com](https://learn.microsoft.com/en-us/azure/foundry/) |
| GitHub Copilot docs | Docs | Beginner → Advanced | Using Copilot in the editor, agents, custom instructions, models and billing. | [docs.github.com](https://docs.github.com/en/copilot) |
| Hugging Face docs | Docs | Beginner → Advanced | The Hub, Transformers library, datasets and model cards for open models. | [huggingface.co](https://huggingface.co/docs) |
| Ollama docs | Docs | Beginner | Run open-weight models on your own computer with a single command. | [docs.ollama.com](https://docs.ollama.com/) |

## 5. Key papers

You do not need to read these to use AI, but each one changed the field. The arXiv abstract pages are free to read.

| Resource | Type | Level | Why it's useful (one-line summary) | Link |
|---|---|---|---|---|
| Attention Is All You Need (Vaswani et al., 2017) | Paper | Advanced | Introduced the transformer: attention alone, no recurrence, which became the basis of modern LLMs. | [arXiv:1706.03762](https://arxiv.org/abs/1706.03762) |
| Language Models are Few-Shot Learners (GPT-3, Brown et al., 2020) | Paper | Advanced | Showed that a very large language model can do new tasks from just a few examples in the prompt. | [arXiv:2005.14165](https://arxiv.org/abs/2005.14165) |
| Training language models to follow instructions with human feedback (InstructGPT, Ouyang et al., 2022) | Paper | Advanced | Used RLHF to make a model follow instructions; a smaller tuned model was preferred over a much larger untuned one. | [arXiv:2203.02155](https://arxiv.org/abs/2203.02155) |
| LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021) | Paper | Advanced | Fine-tune huge models cheaply by training small add-on matrices instead of all the weights. | [arXiv:2106.09685](https://arxiv.org/abs/2106.09685) |
| Training Compute-Optimal Large Language Models (Chinchilla, Hoffmann et al., 2022) | Paper | Advanced | Found that for a fixed compute budget, model size and training data should grow together; many models were under-trained. | [arXiv:2203.15556](https://arxiv.org/abs/2203.15556) |
| Direct Preference Optimization (DPO, Rafailov et al., 2023) | Paper | Advanced | Aligns models directly from preference pairs, skipping the separate reward model used in RLHF. | [arXiv:2305.18290](https://arxiv.org/abs/2305.18290) |
| LLaMA: Open and Efficient Foundation Language Models (Touvron et al., 2023) | Paper | Advanced | Released strong models trained on public data, kick-starting the open-weight model wave. | [arXiv:2302.13971](https://arxiv.org/abs/2302.13971) |

## 6. Security & responsible AI

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| OWASP Top 10 for LLM Applications (2026) | Guide | Beginner → Intermediate | The community list of the biggest security risks in LLM apps, from prompt injection to improper output handling. | [genai.owasp.org](https://genai.owasp.org/top-10-for-llm-applications-2026/) |
| OWASP LLM01: Prompt Injection | Guide | Intermediate | Explains direct and indirect prompt injection with attack scenarios and mitigations. | [genai.owasp.org](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) |
| NIST AI Risk Management Framework | Framework | Intermediate | A voluntary framework (Govern, Map, Measure, Manage) plus a Generative AI Profile for managing AI risk. | [nist.gov](https://www.nist.gov/itl/ai-risk-management-framework) |
| Microsoft: What is Responsible AI? | Docs | Beginner | Microsoft's six Responsible AI principles explained with practical tooling. | [learn.microsoft.com](https://learn.microsoft.com/en-us/azure/machine-learning/concept-responsible-ai) |

## 7. Token-saving references

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| OpenAI: Prompt caching | Docs | Intermediate | How automatic caching works, minimum sizes, pricing and how to keep prefixes stable. | [developers.openai.com](https://developers.openai.com/api/docs/guides/prompt-caching) |
| Anthropic: Prompt caching | Docs | Intermediate | Cache breakpoints, lifetimes and how to read cache usage fields. | [platform.claude.com](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) |
| Gemini: Context caching | Docs | Intermediate | Implicit and explicit caching for Gemini models. | [aistudio.google.com](https://aistudio.google.com/docs/caching) |
| OpenAI: Batch API | Docs | Intermediate | Run large non-urgent jobs at a discount. | [developers.openai.com](https://developers.openai.com/api/docs/guides/batch) |
| Anthropic: Batch processing | Docs | Intermediate | Message Batches for asynchronous, discounted processing. | [platform.claude.com](https://platform.claude.com/docs/en/build-with-claude/batch-processing) |
| Gemini: Batch API | Docs | Intermediate | Asynchronous batch jobs for Gemini at reduced cost. | [aistudio.google.com](https://aistudio.google.com/docs/batch-api) |
| Anthropic: Effective context engineering for AI agents | Article | Intermediate | Why context is a finite budget and how to curate it for agents. | [anthropic.com](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) |
| GitHub: Optimizing your AI usage | Docs | Beginner | Practical habits for spending fewer AI credits in Copilot. | [docs.github.com](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) |
| VS Code: Optimize AI credit usage | Docs | Beginner | Editor-specific tips: compacting chats, tool sets, cache explorer and usage indicators. | [code.visualstudio.com](https://code.visualstudio.com/docs/agents/guides/optimize-usage) |
| tiktoken | Library | Intermediate | Count OpenAI tokens locally in Python. | [github.com](https://github.com/openai/tiktoken) |

## 8. Communities

| Resource | Type | Level | Why it's useful | Link |
|---|---|---|---|---|
| Hugging Face Forums | Forum | All levels | Questions about open models, the Transformers library, datasets and fine-tuning. | [discuss.huggingface.co](https://discuss.huggingface.co/) |
| fast.ai Forums | Forum | All levels | Friendly help for fast.ai students and deep learning practitioners. | [forums.fast.ai](https://forums.fast.ai/) |
| OpenAI Developer Community | Forum | All levels | Discussion and help for building with the OpenAI API. | [community.openai.com](https://community.openai.com/) |
| Google AI Developers Forum | Forum | All levels | Discussion and help for the Gemini API and Google AI tools. | [discuss.ai.google.dev](https://discuss.ai.google.dev/) |
| r/LocalLLaMA | Reddit community | Intermediate | Active community for running open-weight models on your own hardware. | [reddit.com](https://www.reddit.com/r/LocalLLaMA/) |

> **⚠️ Common misconception:** "If a forum post says a model is best, it is best for me." Community opinions move fast and depend on the poster's hardware and tasks. Test claims on your own data (see [Chapter 9](best-practices.md)).

## 9. Agents: customization, MCP and guardrails

Background reading for [Chapter 11](agent-toolkit.md) and [Chapter 12](agent-guardrails.md). Checked on 27 November 2026.

| Resource | Provenance | What to use it for |
|---|---|---|
| [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) | Official (GitHub) | One table of instructions, skills, agents, hooks and MCP, and where each is supported |
| [Custom agents in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents) and [configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | Official | Agent file format, fields and tool names |
| [Agent Skills specification](https://agentskills.io/specification) and [skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) | Open standard; official | `SKILL.md` format, naming rules and how skills are loaded |
| [AGENTS.md](https://agents.md/) | Open format | Cross-tool instruction file |
| [MCP specification](https://modelcontextprotocol.io/specification/latest) and [build-a-server tutorial](https://modelcontextprotocol.io/docs/develop/build-server) | Official | The protocol and a first server |
| [Add MCP servers in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) and [GitHub MCP server](https://github.com/github/github-mcp-server) | Official | Configuration format; toolsets and read-only mode |
| [MCP security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | Official | Risks of local servers, tool descriptions and tokens |
| [Copilot CLI: allowing tools](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools) and [hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | Official | Approval prompts, allow and deny rules, hooks |
| [VS Code agent approvals](https://code.visualstudio.com/docs/agents/run/approvals) and [security](https://code.visualstudio.com/docs/agents/run/security) | Official | Permission levels, auto-approve settings, checkpoints, sandbox |
| [Copilot cloud agent: risks and mitigations](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) | Official | Built-in limits of the cloud agent |
| [The lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) and [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/) | Practitioner; vendor engineering blog | Two simple rules for judging whether an agent setup is dangerous |
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) and [Beyond permission prompts](https://www.anthropic.com/engineering/claude-code-sandboxing) | Vendor engineering blog | Simple designs, stopping conditions, sandboxing and approval fatigue |
| [EU AI Act, Article 14](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14) | Official (European Commission service desk) | Human-oversight requirements for high-risk AI systems, as a design benchmark |

## 10. Spec-driven development with Spec Kit and Squad

Start with [Chapter 13's guided learning path](spec-driven-development.md), then use these sources to check the commands and adapt the workflow. Open-source tools do not make model usage free.

| Resource | Provenance | What to use it for |
|---|---|---|
| [Spec Kit installation](https://github.github.io/spec-kit/installation.html) and [releases](https://github.com/github/spec-kit/releases) | Official | Prerequisites, supported installation channels and version changes |
| [Spec Kit quickstart](https://github.github.io/spec-kit/quickstart.html) and [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html) | Official | Workflow steps, artifacts, checklists, analysis and convergence |
| [Copilot integration](https://github.github.io/spec-kit/integrations/copilot.html) and [invocation syntax](https://github.github.io/spec-kit/integrations/cli.html#command-invocation) | Official | Default skills versus other command layouts; host-specific behaviour |
| [Existing projects](https://github.github.io/spec-kit/how-to/existing-projects.html), [evolving specs](https://github.github.io/spec-kit/how-to/evolving-specs.html), [persistence](https://github.github.io/spec-kit/how-to/persisting-specs.html) | Official | Bounded brownfield adoption, changing intent and choosing what to retain |
| [Spec Kit core commands](https://github.github.io/spec-kit/overview/core.html) and [upgrade guide](https://github.github.io/spec-kit/upgrade.html) | Official | Active-feature selection, multiple project roots, CLI versus project-file upgrades |
| [Squad installation](https://github.github.io/squad/docs/get-started/installation/) and [releases](https://github.com/github/squad/releases) | Official | Current repository, npm package, stable versions and platform prerequisites |
| [Squad first session](https://github.github.io/squad/docs/get-started/first-session/) and [CLI reference](https://github.github.io/squad/docs/reference/cli/) | Official | Team formation, launch, diagnostics, memory, export/import and updates |
| [Squad model selection](https://github.github.io/squad/docs/features/model-selection/) and [host feature matrix](https://github.github.io/squad/docs/reference/host-feature-matrix/) | Official, with conflicting claims | Check actual host support rather than assuming per-agent model preferences work everywhere |
| [Squad hardening](https://github.github.io/squad/docs/features/security-hardening/) and [cost tracking](https://github.github.io/squad/docs/features/cost-tracking/) | Official | Shared-memory risks, permission boundaries and which execution paths populate cost records |
| [Understanding SDD: Kiro, spec-kit and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) | Independent practitioner analysis, October 2025 | Lifecycle taxonomy and evaluation questions; not a current CLI tutorial |
| [squad-sdd-workshop](https://github.com/ananegru/squad-sdd-workshop) (public template) | Community workshop | Hour-long hands-on lab that builds a Rock-Paper-Scissors CLI with Spec Kit and Squad; presented in the 21 August 2026 GitHub Copilot Summer Bootcamp. Not checked line by line; verify commands against the current Squad version before use |
| [Combining Spec Kit and Squad: github/squad#1033](https://github.com/github/squad/issues/1033#issuecomment-4658769575) | Maintainer reply | Confirms complementary roles; not a specification for an automatic integration |
| [Spec Kit monorepo guide](https://github.github.io/spec-kit/how-to/monorepo.html), [bug-fix guide](https://github.github.io/spec-kit/guides/bugfix.html) and [idea assessment](https://github.github.io/spec-kit/guides/assessment.html) | Official | Several projects in one repository; the opt-in bug and assessment extensions |
| [Spec Kit extensions](https://github.github.io/spec-kit/extensions/cli.html), [presets](https://github.github.io/spec-kit/presets/cli.html) and [workflows](https://github.github.io/spec-kit/workflows/cli.html) | Official | Optional add-ons and their commands; read the security notes before installing community entries |
| [Spec Kit community walkthroughs](https://github.github.io/spec-kit/community/walkthroughs.html) | Community, listed by the project but not reviewed by GitHub | Real prompts used on new and large existing codebases; walked through in [Chapter 16](sdd-examples.md) |
| [Squad existing-repository](https://github.github.io/squad/docs/scenarios/existing-repo/), [mid-project](https://github.github.io/squad/docs/scenarios/mid-project/) and [upgrading](https://github.github.io/squad/docs/scenarios/upgrading/) scenarios | Official; some pages show older commands | Adding a team to a codebase you already have; upgrading from 1.x |
| [Spec Kit brownfield setup: auditing a generated constitution](https://hubreb.github.io/blog/spec-kit-brownfield-setup) | Practitioner blog, May 2026, older Spec Kit version | Why every generated principle needs checking against the repository |
| [Thoughtworks Technology Radar: GitHub Spec Kit](https://www.thoughtworks.com/en-cl/radar/languages-and-frameworks/github-spec-kit) | Consultancy assessment, April 2026 | An outside view of strengths and rough edges on existing systems |
| [Existing projects and migration](sdd-existing-projects.md) and [command reference](sdd-reference.md) | This site | Step-by-step adoption in a codebase you already have; every command in one place |
| [Community lessons and production examples](sdd-production.md) | This site's sourced synthesis | Concrete failure cases, release gates, multi-project reuse and how to weigh practitioner evidence |

> **✅ Key takeaway:** Start with one beginner course, one visual series and one interactive tool, then use the official docs as your source of truth whenever you build something real.

[← Glossary](glossary.md) · [About & Feedback →](about.md)
