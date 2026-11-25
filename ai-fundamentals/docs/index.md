# AI Learn: How AI Models Really Work

**Beginner guide · Start here**

A friendly, from-zero guide to how AI models like ChatGPT, Claude, Gemini, Llama and Mistral actually work — no math or programming background needed, just curiosity.

## 1. What this site is

AI Learn is a step-by-step course that explains what happens *inside* an AI model: how it learns from data, what its "billions of parameters" really are, why it writes one word-piece at a time, and why it sometimes gets things confidently wrong.

Every chapter uses plain language first, then a small worked example with real numbers, then a picture. Where a fact matters, we link to the source — mainly the [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), [Microsoft Learn: Introduction to AI concepts](https://learn.microsoft.com/training/modules/get-started-ai-fundamentals/), the [Hugging Face LLM Course](https://huggingface.co/learn/llm-course), the [3Blue1Brown neural network series](https://www.3blue1brown.com/topics/neural-networks), and the original research papers.

> **📘 In plain words:** Chapters 1–8 are the "how does the engine work" manual. Chapter 9 and the [Study Plan](study-plan.md) are the driving lessons: they connect this site with the best free courses from Google, Microsoft, OpenAI, Anthropic and the University of Helsinki, and show you how to apply AI to your own daily work. [Chapter 10](spec-driven-development.md) is the software-building workshop: use Spec Kit and Squad to turn an idea into a reviewed change, then learn what it takes to ship it.

## 2. Who it is for

- **Curious beginners** who use AI chat tools and want to know what is going on behind the text box.
- **Professionals** (managers, analysts, writers, IT staff) who need to make decisions about AI and want a solid mental model instead of buzzwords.
- **Future builders** who plan to go on to coding courses and want the concepts in place first.

You do **not** need to know calculus, statistics, or programming. When a formula appears, it is explained in words and followed by a tiny example you can check with a phone calculator.

## 3. How to use it

1. **Pick a path.** The [Study Plan](study-plan.md) offers three week-by-week paths — AI-literate professional, AI power user and AI builder — that mix these chapters with external courses and practice on your own work.
2. **Read in order.** Each chapter builds on the previous one. Chapter 3 (Transformers) makes much more sense after Chapter 2 (Neural Networks).
3. **Look for the callouts.** 📘 boxes restate an idea in plain words, 💡 boxes give examples, ⚠️ boxes flag common misconceptions, ✅ boxes summarize, and 🎯 boxes suggest something to try.
4. **Do the quiz.** Each chapter ends with "Check Your Understanding". If you miss a question, reread that section — it is the fastest way to make ideas stick.
5. **Use the glossary.** Any unfamiliar word is probably in the [Glossary](glossary.md).

> **🎯 Try it:** Keep an AI chat tool open while you read. When a chapter explains an idea (for example, tokens or temperature), try it out and see the effect for yourself.

## 4. The learning path

| Chapter | What you will learn | Reading time |
|---|---|---|
| [1. Foundations](foundations.md) | AI vs machine learning vs deep learning vs generative AI; what a "model" is; training vs inference; overfitting | ~25 min |
| [2. Neural Networks](neural-networks.md) | Neurons, weights, layers, parameters, loss, gradient descent, backpropagation — with a worked example | ~40 min |
| [3. Transformers & LLMs](transformers.md) | Embeddings, attention, the Transformer architecture, and how a large language model predicts the next token | ~40 min |
| [4. Training & Tuning](training.md) | Pre-training, fine-tuning, instruction tuning, RLHF, and why training is so expensive | ~30 min |
| [5. Model Landscape](models.md) | Proprietary vs open-weight models, licenses, model families and sizes, model cards, running models locally, how to choose | ~30 min |
| [6. Using Models](using-ai.md) | Prompting, temperature, system prompts, structured outputs, RAG, tools, agents and MCP | ~35 min |
| [7. Tokens & Cost](tokens.md) | What tokens are, context windows, how pricing works, and how to estimate cost | ~25 min |
| [8. Best Practices](best-practices.md) | Prompting and context engineering, evaluation, security, privacy, responsible AI and reliability | ~30 min |
| [9. AI at Work](ai-at-work.md) | Finding AI-ready tasks, the delegate-review-refine loop, measuring impact, a prompt library, and building your own learning plan | ~15 min |
| [10. Spec-Driven Development](spec-driven-development.md) | A beginner's introduction, [Spec Kit setup and workflow](spec-kit.md), [Squad teams](squad.md), and [production examples, community lessons and multi-project reuse](sdd-production.md) | ~80 min across four pages |
| [Study Plan](study-plan.md) | Three week-by-week learning paths combining these chapters with Elements of AI, Google AI Essentials, OpenAI Academy, Anthropic Academy and Microsoft AI-901 | plan |
| [Glossary](glossary.md) | Every key term in one place | reference |
| [Resources](resources.md) | Free courses, videos, papers, and tools for going further | reference |

Chapters 1–9 take about four and a half hours to read. The optional software-building section adds about 80 minutes plus hands-on practice. The Study Plan paths add external courses and practice, from 4 to 8 weeks depending on the path.

## 5. The big picture in 60 seconds

Imagine you want to build a machine that finishes sentences.

**Step 1 — Collect data.** You gather an enormous pile of text: books, articles, websites, code. This is the *training data*.

**Step 2 — Train.** You start with a giant mathematical function full of random numbers. You show it the beginning of a sentence from your data — "The cat sat on the" — and ask it to guess the next word. At first it guesses nonsense. You measure how wrong it was, then nudge every number a tiny bit in the direction that would have made the right answer ("mat") more likely. Repeat this trillions of times across the whole pile of text. This is *training*, and for large models it takes thousands of specialized chips (GPUs) running for weeks or months.

**Step 3 — Keep the numbers.** When training finishes, the numbers are frozen. These numbers are called *weights* or *parameters*, and together with the recipe for how to combine them, they *are* the model. A "7B" model has about 7 billion of them. The model does not store the books it read; it stores patterns compressed into those numbers.

**Step 4 — Use it (inference).** Now you type a *prompt*: "Write a haiku about rain." The text is chopped into small pieces called *tokens*. The model runs the tokens through its frozen weights and produces a probability for every possible next token. One token is picked, added to the text, and the whole process repeats — one token at a time — until the answer is complete. That is *inference*, and it is what happens every time you press Enter in a chat app.

![Diagram showing four stages: data, training, model weights, and inference turning a prompt into output tokens](images/big-picture.svg)

*Figure 1 — The life of a model: build once (data and training), then use many times (inference).*

> **⚠️ Common misconception:** "The AI looks up answers in a database of everything it read." It does not. A plain language model has no search index of its training data. It generates text from patterns stored in its weights, which is why it can be fluent and wrong at the same time. (Some products *add* a search step on top — you will learn about that, called RAG, in [Using Models](using-ai.md).)

> **✅ Key takeaway:** Data → training → weights → inference. Almost every question about AI ("Why is it expensive?", "Why does it make things up?", "Why does it have a knowledge cut-off?") traces back to one of these four stages.

## 6. Ten terms to know first

Short definitions now; fuller explanations in the chapters and the [Glossary](glossary.md).

| Term | Quick definition |
|---|---|
| **Model** | A mathematical function with learned numbers that turns an input (text, image) into an output (an answer, a label, the next word). |
| **Parameters (weights)** | The learned numbers inside a model. Training adjusts them; inference uses them unchanged. |
| **Training** | The process of adjusting a model's parameters by showing it examples and correcting its mistakes. |
| **Inference** | Using a trained model to produce an output for new input — what happens when you chat with an AI. |
| **Neural network** | A model made of layers of simple units ("neurons") connected by weights. The engine behind modern AI. |
| **Transformer** | The neural network design (introduced in 2017) that powers today's language models, built around a mechanism called *attention*. |
| **LLM (large language model)** | A very large Transformer trained on huge amounts of text to predict the next token. GPT, Claude, Gemini, Llama and Mistral models are LLMs. |
| **Token** | A chunk of text (a word, part of a word, or punctuation) — the unit a language model reads, writes, and is billed by. |
| **Prompt** | The input you give a model: your question, instructions, and any context. |
| **Context window** | The maximum number of tokens a model can consider at once, including both your prompt and its reply. |

[Choose your path in the Study Plan →](study-plan.md) · [Start Chapter 1: Foundations →](foundations.md)
