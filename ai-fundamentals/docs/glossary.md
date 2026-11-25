# AI Glossary

**Reference · A–Z**

This glossary explains the words you meet throughout AI Learn in plain language. Each entry gives a short definition, an example where it helps, and a link to the chapter that covers the idea in more depth.

## A

### Acceptance criterion
An observable condition for accepting a change. Example: two simultaneous requests for the same room and time produce only one reservation. See [Chapter 10](spec-driven-development.md).

### Activation function
A small math function inside each neuron that decides how strongly it "fires", adding the non-linearity that lets networks learn complex patterns. Common ones are ReLU (turns negatives into 0) and sigmoid (squashes values between 0 and 1). See [Chapter 2](neural-networks.md).

### Agent
An AI system that uses a model in a loop to plan, call tools, look at the results and decide the next step until a goal is reached. Example: a coding agent that reads an error, edits a file, runs tests and repeats. See [Chapter 6](using-ai.md).

### AI literacy
The skills, knowledge and understanding people need to use AI systems in an informed way and to be aware of their opportunities, risks and possible harms. In the EU, Article 4 of the AI Act requires providers and deployers of AI systems to take measures to support the AI literacy of their staff. See [Chapter 9](ai-at-work.md).

### Alignment
The work of making a model behave the way people intend: helpful, honest and harmless. Techniques such as RLHF and DPO are used for alignment. See [Chapter 4](training.md).

### Attention
The transformer mechanism that lets each token "look at" other tokens and decide which ones matter for its meaning. In "The cat sat because it was tired", attention helps "it" connect to "cat". See [Chapter 3](transformers.md).

## B

### Backpropagation
The method that works out how much each weight contributed to the error, moving backwards from the output layer to the input. Those amounts (gradients) are then used by gradient descent to update the weights. See [Chapter 2](neural-networks.md).

### Batch
A group of training examples processed together before the weights are updated once. A batch of 32 images means the network looks at 32 images, averages the error, then takes one learning step. See [Chapter 2](neural-networks.md).

### Batch API
A way to send many model requests as one job that finishes later (often within 24 hours) in exchange for a lower price, typically half. Useful for non-urgent work such as classifying thousands of reviews overnight. See [Chapter 7](tokens.md).

### Benchmark
A standard test set used to compare models, such as a collection of math problems or coding tasks. Scores are useful signals but may not reflect how a model performs on your own task. See [Chapter 4](training.md).

### Bias (fairness)
When an AI system treats people or groups unfairly, often because its training data under-represents them or reflects past prejudice. Example: a hiring model that scores CVs lower for one gender. See [Chapter 8](best-practices.md).

### Bias (neuron)
A learned number added inside a neuron before the activation function, shifting when the neuron switches on. It plays the role of the intercept `b` in `y = w·x + b`. See [Chapter 2](neural-networks.md).

### BPE (Byte Pair Encoding)
A tokenization method that starts from single characters or bytes and repeatedly merges the most common neighbouring pairs into new tokens. Frequent words end up as one token, rare words as several pieces. See [Chapter 3](transformers.md).

## C

### Chain-of-thought
Asking or allowing a model to work through a problem step by step before giving the final answer, which often improves results on maths and logic. Example prompt: "Think through this step by step, then give the answer." See [Chapter 6](using-ai.md).

### Checkpoint
A saved snapshot of a model's weights at a point during training, so training can resume or an earlier version can be reused. Downloaded open models are usually checkpoints too. See [Chapter 5](models.md).

### Constitution (Spec Kit)
A project's reviewed engineering principles and constraints, used to guide planning and implementation. It is not a security boundary or a replacement for feature requirements. See [Spec Kit](spec-kit.md).

### Context engineering
Choosing and maintaining the best set of information (instructions, tools, history, retrieved data) in the model's context at every step. It extends prompt engineering to agents and long tasks. See [Chapter 8](best-practices.md).

### Context window
The maximum number of tokens a model can handle in one request, counting both input and output. Everything must fit: instructions, history, documents, the question and the answer. See [Chapter 3](transformers.md) and [Chapter 7](tokens.md).

### Cross-entropy
A loss function for classification that measures how much probability the model gave to the correct answer; the less probability, the higher the loss. Language models are trained with cross-entropy on the next token. See [Chapter 2](neural-networks.md).

## D

### Dataset
A collection of examples used to train, validate or test a model. Example: 50,000 labelled photos of cats and dogs, or trillions of tokens of web text for pretraining. See [Chapter 1](foundations.md).

### Decoder
The part of a transformer that generates output one token at a time, only looking at earlier tokens. GPT-style chat models are decoder-only transformers. See [Chapter 3](transformers.md).

### Distillation
Training a smaller "student" model to imitate the outputs of a larger "teacher" model, keeping much of the quality at lower cost. See [Chapter 4](training.md).

### DPO (Direct Preference Optimization)
A preference-tuning method that learns directly from pairs of "better" and "worse" answers, without training a separate reward model as RLHF does. See [Chapter 4](training.md).

## E

### Embedding
A list of numbers (a vector) that represents the meaning of a token, sentence or document, so that similar meanings are close together. Embeddings power semantic search and RAG. See [Chapter 3](transformers.md) and [Chapter 6](using-ai.md).

### Encoder
The part of a transformer that reads the whole input at once and builds a representation of it, looking in both directions. BERT is an encoder-only model often used for classification and search. See [Chapter 3](transformers.md).

### Epoch
One complete pass through the entire training dataset. Training for 10 epochs means the model has seen every example 10 times. See [Chapter 2](neural-networks.md).

### Evaluation
Measuring how well a model or AI feature performs, using test sets, automated checks, human review or another model as a judge. Good evaluation is how you know a change made things better. See [Chapter 6](using-ai.md) and [Chapter 8](best-practices.md).

## F

### Few-shot
Including a few worked examples in the prompt so the model copies the pattern. Example: three "review → sentiment" pairs followed by a new review to label. See [Chapter 6](using-ai.md).

### Fine-tuning
Continuing to train an existing model on a smaller, specific dataset to adapt it to a task, style or domain. See [Chapter 4](training.md).

### FLOPs
Floating-point operations: the count of basic arithmetic steps a computer performs. Used to describe how much compute training a model takes (total FLOPs) or how fast hardware is (FLOPs per second). See [Chapter 4](training.md).

### Foundation model
A large model pretrained on broad data that can be adapted to many tasks, such as the base models behind chat assistants. See base models in [Chapter 4](training.md).

### Function calling
A feature where the model, instead of answering in text, returns a structured request to run one of your functions (for example `get_weather(city="Paris")`). Your code runs it and sends the result back. Also called tool calling. See [Chapter 6](using-ai.md).

## G

### GGUF
A file format for storing (often quantized) model weights so they can run efficiently on ordinary computers with tools like llama.cpp and Ollama. See [Chapter 5](models.md).

### GPU
Graphics Processing Unit: a chip with thousands of small cores that do many multiplications in parallel, which makes it ideal for training and running neural networks. See [Chapter 2](neural-networks.md) and [Chapter 4](training.md).

### Gradient
A set of numbers that says, for each weight, which direction and how strongly changing it would increase the loss. Training moves weights the opposite way. See [Chapter 2](neural-networks.md).

### Gradient descent
The training method that repeatedly nudges weights a small step in the direction that reduces the loss, like walking downhill in fog. See [Chapter 2](neural-networks.md).

### Guardrails
Checks and limits around an AI system that block or correct unsafe or unwanted inputs and outputs, such as content filters, output validation or approval steps. See [Chapter 8](best-practices.md).

## H

### Hallucination
When a model produces confident but false or made-up information, such as a citation to a paper that does not exist. It happens because models predict likely text, not verified facts. See [Chapter 3](transformers.md).

## I

### Idempotency
The property that repeating an operation has the same business effect as performing it once. Important for retrying requests and processing duplicate payment notifications. See [Shipping and Reuse](sdd-production.md).

### Inference
Using a trained model to make predictions or generate output, as opposed to training it. Every chat message you send triggers inference. See [Chapter 1](foundations.md).

### Instruction tuning
Fine-tuning a base model on examples of instructions and good responses so it learns to follow requests instead of just continuing text. See [Chapter 4](training.md).

## K

### KV cache
Stored "key" and "value" results from attention for tokens already processed, so the model does not recompute them when generating each new token. It speeds up generation but uses memory. See [Chapter 3](transformers.md).

## L

### Latency
How long you wait for a response. Often split into time to first token (affected by input size) and total time (affected by output length). See [Chapter 6](using-ai.md) and [Chapter 7](tokens.md).

### Layer
A group of neurons that process data at the same stage; data flows from the input layer through hidden layers to the output layer. "Deep" learning means many layers. See [Chapter 2](neural-networks.md).

### Learning rate
The size of each step gradient descent takes when updating weights. Too large and training jumps around or diverges; too small and it crawls. See [Chapter 2](neural-networks.md).

### LLM (Large Language Model)
A neural network, usually a transformer, trained on huge amounts of text to predict the next token, with billions of parameters. Examples include the models behind ChatGPT, Claude, Gemini and Copilot. See [Chapter 3](transformers.md).

### LoRA (Low-Rank Adaptation)
A parameter-efficient fine-tuning method that freezes the original weights and trains small add-on matrices instead, making fine-tuning far cheaper. See [Chapter 4](training.md).

### Loss
A single number that measures how wrong the model's predictions are; training tries to make it smaller. See [Chapter 2](neural-networks.md).

## M

### MCP (Model Context Protocol)
An open standard that lets AI applications connect to tools and data sources through "MCP servers" in a consistent way, like a USB-C port for AI tools. See [Chapter 6](using-ai.md).

### MoE (Mixture of Experts)
A model design with many "expert" sub-networks where a router activates only a few for each token, so the model can have many parameters but use only some per step. See [Chapter 4](training.md).

### Model card
A document published with a model describing its intended use, training data, evaluation results, limitations and license. See [Chapter 5](models.md).

### Multimodal
A model that can handle more than one type of data, such as text plus images, audio or video. Example: asking a model to describe a photo. See [Chapter 3](transformers.md) and [Chapter 6](using-ai.md).

## N

### Neural network
A model made of layers of connected artificial neurons whose weights are learned from data. See [Chapter 2](neural-networks.md).

### Neuron
The basic unit of a neural network: it multiplies its inputs by weights, adds a bias, and passes the result through an activation function. See [Chapter 2](neural-networks.md).

## O

### Open-weight
A model whose trained weights are published for download, so you can run it yourself, even if its training data and code are not released. See [Chapter 5](models.md).

### Overfitting
When a model memorizes its training data, including noise, and performs poorly on new data. Like a student who memorized past exam answers but cannot solve new questions. See [Chapter 1](foundations.md) and [Chapter 2](neural-networks.md).

## P

### Parameter
A number inside the model that is learned during training, mainly weights and biases. "7B" means about 7 billion parameters. See [Chapter 2](neural-networks.md).

### Perplexity
A measure of how "surprised" a language model is by a piece of text; lower perplexity means it predicts the text better. Not covered in depth on this site; related: evaluation and benchmarks in [Chapter 4](training.md).

### Pretraining
The first, most expensive training stage, where a model learns general patterns of language from massive amounts of text by predicting the next token. See [Chapter 4](training.md).

### Prompt
The input you give a model: instructions, context, examples and the question. See [Chapter 6](using-ai.md).

### Prompt caching
A provider feature that reuses the already-processed beginning of a prompt when later requests start with the same tokens, making them cheaper and faster. Put stable content first to benefit. See [Chapter 7](tokens.md).

### Prompt injection
An attack where text in the input, or in content the model reads such as a web page or email, tries to override the app's instructions. It is number one on the OWASP Top 10 for LLM Applications. See [Chapter 8](best-practices.md).

## Q

### Quantization
Storing a model's weights with fewer bits (for example 4-bit instead of 16-bit) to cut memory and speed up inference, usually with a small loss in quality. See [Chapter 4](training.md) and [Chapter 5](models.md).

## R

### RAG (Retrieval-Augmented Generation)
A pattern where your app first searches your own documents for relevant passages and adds them to the prompt, so the model answers from that information. Example: a bot answering questions from a company handbook. See [Chapter 6](using-ai.md).

### Reasoning model
A model trained to "think" through problems internally, producing hidden reasoning tokens before its final answer. Better on hard problems, but slower and more expensive. See [Chapter 3](transformers.md) and [Chapter 7](tokens.md).

### Reasoning tokens
The hidden "thinking" tokens a reasoning model generates before answering. You do not see them, but they use context space and are billed as output tokens. See [Chapter 7](tokens.md).

### Reinforcement learning
A type of learning where an agent tries actions, receives rewards or penalties, and learns to maximize reward over time. See [Chapter 1](foundations.md).

### Reranking
A second step in search that reorders retrieved results with a more accurate model so the best few go into the prompt. See [Chapter 6](using-ai.md) and [Chapter 7](tokens.md).

### RLHF (Reinforcement Learning from Human Feedback)
A tuning method where humans rank model answers, a reward model learns those preferences, and the language model is trained to produce answers the reward model scores highly. See [Chapter 4](training.md).

## S

### Sampling
How a model picks the next token from its probability list. Settings such as temperature and top-p control how random the choice is. See [Chapter 3](transformers.md).

### SFT (Supervised Fine-Tuning)
Fine-tuning on example prompts paired with high-quality answers written or approved by people. It is usually the first step in turning a base model into a chat model. See [Chapter 4](training.md).

### Softmax
A function that turns a list of raw scores into probabilities that are all positive and add up to 1. Used at a model's output and inside attention. See [Chapter 2](neural-networks.md) and [Chapter 3](transformers.md).

### Spec-driven development (SDD)
A development approach in which explicit requirements guide planning, implementation and verification. A useful spec describes observable behaviour and boundaries rather than vague aspirations. See [Chapter 10](spec-driven-development.md).

### Spec Kit
GitHub's toolkit of CLI commands, templates, scripts and agent instructions for structured development processes. Its SDD workflow carries a feature specification through implementation and completeness assessment. See [Spec Kit](spec-kit.md).

### Squad
An open-source toolkit for coordinating AI-agent teams with repository-based roles, routing and shared context. A team remains under human direction; multiple agents do not guarantee correctness or isolated edits. See [Squad](squad.md).

### Stop sequence
A string that tells the model to stop generating when it appears, such as `"\n\n"` or `"END"`. Useful for keeping outputs short. See [Chapter 7](tokens.md).

### Structured output
Asking a model to reply in a fixed format, usually JSON that matches a schema, so your code can read it reliably. See [Chapter 6](using-ai.md).

### System prompt
Instructions given to the model with higher priority than user messages, setting its role, rules and style for the whole conversation. See [Chapter 6](using-ai.md).

## T

### Temperature
A sampling setting that controls randomness: low values make answers more predictable, high values more varied and creative. See [Chapter 3](transformers.md).

### Token
The unit of text a model reads and writes, often a word or part of a word. In English, 1 token is roughly 4 characters or ¾ of a word. See [Chapter 3](transformers.md) and [Chapter 7](tokens.md).

### Tokenizer
The component that splits text into tokens and maps them to numbers (and back). Different model families use different tokenizers. See [Chapter 3](transformers.md).

### Top-p
A sampling setting (nucleus sampling) that limits choices to the smallest group of tokens whose probabilities add up to p, for example 0.9. See [Chapter 3](transformers.md).

### Training
The process of adjusting a model's parameters using data so its predictions improve. See [Chapter 1](foundations.md) and [Chapter 4](training.md).

### Transformer
The neural network architecture behind modern LLMs, built around attention so every token can consider every other token in parallel. Introduced in the 2017 paper "Attention Is All You Need". See [Chapter 3](transformers.md).

## V

### Vector database
A database built to store embeddings and quickly find the ones most similar to a query, used for semantic search and RAG. See [Chapter 6](using-ai.md).

## W

### Weights
The learned numbers on the connections between neurons that determine how strongly each input influences the output. "Downloading a model" mostly means downloading its weights. See [Chapter 2](neural-networks.md).

## Z

### Zero-shot
Asking a model to do a task with no examples in the prompt, relying only on instructions. Example: "Classify this review as positive or negative." See [Chapter 6](using-ai.md).

[← Shipping and Reuse](sdd-production.md) · [Resources →](resources.md)
