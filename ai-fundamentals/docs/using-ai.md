# Using Models: Requests, Prompts and Outputs

**Chapter 6 · Using Models**

A model on its own only turns input tokens into output tokens; everything useful you see in AI products is built *around* that one call. This chapter opens up a real API request, teaches the prompt techniques that work across models, shows how to get structured data and use images or audio, and ends with how to test the results and keep them fast.

> **📘 In plain words:** This chapter is about a single conversation with a model: what you send, how to ask well, and how to check what comes back. [Chapter 7](connecting-ai.md) then connects the model to your documents, tools and other systems.

## 1. Anatomy of a Request

Whether you use a chat website, GitHub Copilot or your own code, every interaction ends up as a **request** sent to a model and a **response** coming back. The request is a list of **messages**, each with a **role**, plus some **parameters**.

| Role | Who writes it | Purpose |
|---|---|---|
| **system** / **developer** | The app builder | Rules, persona, tone, format and boundaries. Takes priority over user messages. OpenAI's current APIs call this the `developer` role (older APIs and other providers say `system`). |
| **user** | The end user | The question or task |
| **assistant** | The model | Earlier answers from the model. You send them back so the model "remembers" the conversation. |
| **tool** (tool output) | Your code | Results of a function the model asked you to run (see [Chapter 7](connecting-ai.md#3-function-and-tool-calling)) |

> **📘 In plain words:** The model has no memory between requests. Every call, your app sends the *whole* relevant conversation again — rules, earlier questions and earlier answers — inside the context window you met in [Chapter 3](transformers.md).

### 1.1 An annotated example

Here is a request in the shape of OpenAI's [Responses API](https://developers.openai.com/api/docs/guides/text), which OpenAI recommends over its older Chat Completions API for new projects. Replace `your-model-id` with a model from the provider's current models page:

```json
{
  "model": "your-model-id",
  "instructions": "You are a patient tutor for complete beginners. Answer in at most three sentences.",
  "input": [
    { "role": "user", "content": "What is a token?" },
    { "role": "assistant", "content": "A token is a small chunk of text, often part of a word, that a model reads and writes." },
    { "role": "user", "content": "Roughly how many tokens is the word 'unbelievable'?" }
  ],
  "max_output_tokens": 200,
  "temperature": 0.2,
  "stream": false
}
```

What each field does:

| Field | Meaning |
|---|---|
| `model` | Which model answers. For production, pin a specific dated version so behavior does not change silently. |
| `instructions` | High-level developer rules for this request. OpenAI's docs say these take priority over the prompt in `input`. It is equivalent to putting a `developer` message first. |
| `input` | The conversation so far, as a list of messages with roles. It can also be a single string for one-shot questions. |
| `role: "assistant"` | The model's earlier reply, sent back so it can answer the follow-up "the word" in context. |
| `max_output_tokens` | A ceiling on how long the answer may be — a cost and latency safety net ([Chapter 8](tokens.md)). |
| `temperature` | Randomness: low (around 0–0.3) for factual, repeatable answers; higher for creative variety. Some reasoning models ignore or do not accept sampling settings and offer a "reasoning effort" setting instead — check the model's documentation. |
| `stream` | `true` sends the answer back piece by piece as it is generated (Section 6). |

The response comes back as JSON. Shortened, it looks like this:

```json
{
  "id": "resp_abc123",
  "status": "completed",
  "model": "your-model-id",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        { "type": "output_text", "text": "Usually about 2 to 3 tokens, for example 'un', 'believ' and 'able', but the exact split depends on the model's tokenizer." }
      ]
    }
  ],
  "usage": { "input_tokens": 71, "output_tokens": 29, "total_tokens": 100 }
}
```

The answer is inside `output`, and `usage` tells you how many tokens you paid for. OpenAI's docs warn that `output` can contain several items — tool calls, reasoning summaries and messages — so do not assume the text is always the first item; some official SDKs offer an `output_text` shortcut that joins all the text for you.

> **💡 Example:** Other providers use the same ideas with slightly different names. Anthropic's Messages API takes a `system` field, a `messages` list and `max_tokens`; Ollama's local `/api/chat` takes `messages` and returns `message.content`. Once you understand roles, messages and parameters, every API looks familiar.

## 2. Prompt Engineering Fundamentals

**Prompt engineering** is writing instructions so the model reliably produces what you need. Five habits do most of the work.

### 2.1 Be clear and specific

Vague prompts get generic answers. Say who the audience is, what you want, and how long.

```text
BEFORE:
Write about solar panels.

AFTER:
Write a 120-word explanation of how home solar panels make electricity,
for a 12-year-old. Use one everyday comparison and no technical jargon.
```

### 2.2 Give context

The model only knows what is in its training data and its context window. Paste in the facts it needs.

```text
BEFORE:
Write a reply to this customer.

AFTER:
You work for Contoso Bikes support. Our policy: free returns within 30 days
with a receipt; after 30 days, store credit only.
Customer message: "I bought a helmet 40 days ago and it doesn't fit. Refund?"
Write a polite reply that applies the policy and offers store credit.
```

### 2.3 Show examples (few-shot prompting)

Showing two or three input→output examples teaches format and style better than describing them. This is called **few-shot** prompting (zero examples is **zero-shot**).

```text
Classify each review as POSITIVE, NEGATIVE or MIXED.

Review: "Arrived fast, works perfectly." → POSITIVE
Review: "Great screen, but the battery dies by noon." → MIXED
Review: "Stopped working after two days." → NEGATIVE

Review: "Comfortable, though the strap feels cheap." →
```

The model continues the pattern and answers `MIXED`.

### 2.4 Specify the output format

If code will read the answer, say exactly what shape it must have — or better, use structured outputs (Section 3).

```text
BEFORE:
What are the main points of this article?

AFTER:
List the 3 main points of the article below as a numbered list.
Each point: one sentence, max 20 words. Then add one line starting
"Bottom line:" with your overall summary.
```

### 2.5 Ask for step-by-step work on hard problems

For multi-step problems, ask the model to work through the steps before the final answer, or break the task into smaller prompts. Reasoning models do much of this internally, so for them, clear goals and constraints matter more than "think step by step" phrases.

```text
BEFORE:
Is this lease a good deal?

AFTER:
Evaluate this car lease. Step 1: list every cost (monthly, upfront, fees).
Step 2: calculate the total cost over the lease. Step 3: compare it with the
typical range I give below. Step 4: give a verdict in one sentence.
```

> **✅ Key takeaway:** Good prompts read like a good brief to a new colleague: who it is for, what to do, the facts to use, an example of good output, and the exact format to hand back.

> **⚠️ Common misconception:** "There is a magic prompt." Prompts that work for one model may work less well on another, or on a newer version of the same model. Treat prompts like code: keep them in version control and test them (Section 5) whenever you change the prompt or the model.

## 3. Structured Outputs (JSON)

Apps often need data, not prose — for example, to fill a form or save to a database. Many APIs offer **structured outputs**: you supply a [JSON Schema](https://json-schema.org/) and the model's answer is constrained to match it. OpenAI's [Structured Outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs) contrasts this with older **JSON mode**, which only guarantees valid JSON, not your schema.

This part of a Responses API request asks for a calendar event extracted from text:

```json
"text": {
  "format": {
    "type": "json_schema",
    "name": "calendar_event",
    "strict": true,
    "schema": {
      "type": "object",
      "properties": {
        "title": { "type": "string" },
        "date": { "type": "string", "format": "date" },
        "attendees": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["title", "date", "attendees"],
      "additionalProperties": false
    }
  }
}
```

With the input "Alice and Bob are meeting for the science fair on 2026-11-06", the model returns text that parses to `{"title": "Science fair", "date": "2026-11-06", "attendees": ["Alice", "Bob"]}`. `strict: true` turns on schema enforcement, and OpenAI requires every property to be listed in `required` and `additionalProperties` to be `false` in that mode.

> **⚠️ Warning:** A schema guarantees the *shape*, not the *truth*. The model can still put a wrong date in a perfectly valid field, and it may refuse or stop early (for example when it hits `max_output_tokens`). Check the response status and validate important values in your code.

## 4. Multimodal Inputs

**Multimodal** models accept more than text: images, screenshots, scanned documents and PDFs, audio and sometimes video. Images are cut into small patches and turned into tokens, and audio is turned into tokens or features, so the same transformer can attend across text and pictures together.

| Input | Typical uses |
|---|---|
| Images and screenshots | Describe a photo, read a chart, explain an error dialog, turn a whiteboard sketch into code |
| Documents and PDFs | Extract tables and fields from invoices, forms and contracts |
| Audio | Transcribe meetings, voice assistants, translate speech |
| Video | Summarize or search recorded content (support varies a lot by model) |

> **💡 Example:** You paste a screenshot of a spreadsheet chart and ask, "Which month had the biggest drop, and by roughly how much?" The model reads the axes and bars and answers in text — no manual data entry.

Images and audio consume tokens too, often many per image, so resize large images and send only what is needed. Supported formats, size limits and request shapes differ by provider, so check the model's documentation before building.

## 5. Evaluating Outputs

You cannot improve what you do not measure. Because model output varies, "it looked fine when I tried it twice" is not testing. Build an **evaluation** (often shortened to **eval**) that you can rerun whenever you change the prompt, the retrieval or the model.

| Method | How it works | Strengths | Watch out for |
|---|---|---|---|
| **Golden set** | 20–200 real inputs with known good answers or required facts | Repeatable; catches regressions | Must be kept up to date and representative |
| **Automatic checks** | Code checks: valid JSON, required fields, contains a citation, exact match for classifications | Fast, cheap, objective | Cannot judge tone or subtle correctness |
| **LLM-as-judge** | A model scores outputs against a written rubric ("Is every claim supported by the sources? 1–5") | Scales to open-ended answers | Judges can favor longer answers or their own style; check a sample against human scores |
| **Human review** | People rate a sample of outputs | Best for quality, safety and nuance | Slow and expensive; use for samples and high-risk cases |

For retrieval-augmented generation (RAG, covered in [Chapter 7](connecting-ai.md)), measure retrieval and generation separately: *Did we retrieve the right chunk?* and *Is the answer faithful to the retrieved chunks?* A wrong answer with the right chunk is a prompt or model problem; a wrong answer without it is a retrieval problem.

> **✅ Key takeaway:** Keep a golden set, add automatic checks, use LLM-as-judge to scale, and keep humans on a sample. Pin model versions and rerun the eval before every change goes live.

## 6. Latency and Streaming

Users notice speed. Three numbers matter:

| Metric | Meaning |
|---|---|
| **Time to first token (TTFT)** | How long until the first word appears |
| **Output speed** | Tokens per second once it starts |
| **Total time** | TTFT plus generation time, plus any tool calls and retrieval |

Bigger models, longer prompts, longer answers, higher reasoning effort and extra tool round-trips all add time. **Streaming** sends the answer as it is generated, so the user starts reading after the first token instead of waiting for the last. With the Responses API you set `"stream": true` and receive server-sent events such as `response.output_text.delta` (a new piece of text) and finally `response.completed`.

> **💡 Example:** A 400-word answer might take 10 seconds to finish. Without streaming the user stares at a spinner for 10 seconds; with streaming, words start appearing in under a second and the wait feels much shorter.

Other ways to cut latency: use a smaller model for simple steps, cap output length, run retrieval and independent tool calls in parallel, and reuse repeated prompt prefixes so providers can cache them ([Chapter 8](tokens.md)).

## Recap

- A request is a list of **role-tagged messages** (developer/system, user, assistant, tool) plus **parameters** like the model, output limit and temperature; the model has no memory, so the app resends the conversation each time.
- **Prompt engineering** basics: be specific, give context, show examples, specify the format, and break hard problems into steps.
- **Structured outputs** constrain answers to a JSON Schema — the shape is guaranteed, the facts are not.
- **Multimodal** models read images, documents and audio as tokens too.
- **Evaluate** with golden sets, automatic checks, LLM-as-judge and human review.
- **Stream** answers to improve perceived speed, and watch time to first token.

## Check Your Understanding

**1. Why does a chat app send the earlier assistant messages back to the model with every new question?**

- A) To train the model on the conversation
- B) Because the model keeps no memory between requests, so the conversation must be in the context
- C) To reduce the number of tokens used
- D) Because the API rejects requests without assistant messages

> **✅ Answer:** B — Each request is independent. Sending earlier turns puts them in the context window so the model can follow the conversation; it does not change the model's weights.

**2. You give the model three labelled reviews and then a fourth without a label. What is this technique called, and why does it work?**

- A) Fine-tuning; the examples change the model's weights
- B) Few-shot prompting; the examples show the pattern to continue
- C) Structured output; the examples act as a schema
- D) Streaming; the examples arrive one at a time

> **✅ Answer:** B — A few input-to-output examples in the prompt teach format and style without any training. The weights do not change.

**3. A response matches your JSON Schema exactly, but the `date` field holds the wrong day. What does that tell you about structured outputs?**

- A) The schema was not strict
- B) Structured outputs guarantee the shape of the answer, not that its values are true
- C) The model ignored the schema
- D) JSON mode should have been used instead

> **✅ Answer:** B — A schema constrains structure. Important values still need validation in your code or by a person.

**4. You changed a prompt and it "looked fine" on two tries. What is missing before you ship it?**

- A) Nothing; two good answers are enough
- B) A higher temperature
- C) A repeatable evaluation, such as a golden set with automatic checks
- D) A longer system prompt

> **✅ Answer:** C — Model output varies, so two tries prove little. A golden set you can rerun catches regressions whenever the prompt or the model changes.

**5. A 400-word answer takes ten seconds to generate. Which change improves how fast it *feels* without making generation any faster?**

- A) Raising `max_output_tokens`
- B) Streaming the answer
- C) Adding more examples to the prompt
- D) Using a larger model

> **✅ Answer:** B — Streaming shows text as soon as the first token arrives, so the user starts reading almost immediately.

[← Chapter 5: Model Landscape](models.md) · [Chapter 7: Connecting Models →](connecting-ai.md)
