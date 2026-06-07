---
title: "Context Engineering Is Not Prompt Engineering: The Four Operations That Actually Matter"
description: "Prompt engineering is about instructions. Context engineering is about information. They are different disciplines, and confusing them is why most agent systems underperform."
date: 2026-06-07
readTime: "10 min"
keywords: ["context engineering", "prompt engineering", "agentic AI", "LLM context", "RAG"]
author: "Angshuman Rudra"
---

The term "prompt engineering" has done a lot of damage to how people think about building AI systems.

Not because the practice is wrong — careful prompt design matters. But because "prompt engineering" frames the problem as one of instruction-writing. Get the instructions right and the model will behave correctly. Iterate on the wording. Add more specificity. Reorder the steps. Eventually it will work.

This frame breaks down almost immediately when you move from simple chatbots to production agent systems. The issue is not the instructions. It is the information.

An agent asked to analyze a customer account cannot produce good analysis if it doesn't have the customer's history, the relevant product context, and the current state of any open issues. You can write perfect instructions. The agent will still produce a bad analysis because it is reasoning from incomplete information.

This is the context engineering problem. And it is categorically different from prompt engineering.

## The Distinction

**Prompt engineering** is the practice of shaping the model's behavior through instructions. System prompts, few-shot examples, chain-of-thought guidance, output format specifications. You are telling the model what to do and how to do it.

**Context engineering** is the practice of shaping what information the model has access to at the moment it reasons. What data is in the context window, where it came from, how it is structured, how much of the token budget it consumes, and whether it is isolated from other information that might contaminate the reasoning.

You need both. They are not substitutes.

The distinction matters because their failure modes are different. Bad prompt engineering produces misconfigured behavior — the model does the wrong thing even with good information. Bad context engineering produces uninformed behavior — the model does the right thing with the wrong information, or no information, and produces a wrong result anyway.

In production agent systems, context engineering failures are more common and harder to diagnose because they are invisible. A misconfigured instruction produces obviously wrong behavior. An agent reasoning from stale or incomplete context produces plausibly wrong behavior — outputs that look reasonable until they are checked against ground truth.

## The Four Operations

Context engineering for agent systems involves four operations. They are not sequential. They happen continuously throughout the agent's operation, often simultaneously.

### Write

Writing to context is the operation of putting information into the context window. This happens through multiple mechanisms:

- **Retrieval** — fetching relevant documents, records, or chunks from a knowledge base in response to what the agent is currently working on
- **Tool results** — when an agent calls a tool, the result is written to context so the agent can reason about it
- **Memory retrieval** — fetching relevant information from prior interactions or prior agent runs
- **User inputs** — whatever the user provided, structured or unstructured
- **System state** — the current state of external systems the agent is operating on

Most teams think about write operations at system design time ("what information will the agent need?") and then treat it as solved. It is not solved. What the agent needs changes as the task progresses. An agent that wrote relevant context at the start of a task may be reasoning from outdated information by step seven, because the task's path revealed that different information is actually relevant.

Write operations need to be designed as ongoing decisions, not one-time initialization.

### Select

Selecting is the operation of choosing what to include from what is available.

This is where most systems have the most room to improve. The naive implementation is to retrieve the top-k most semantically similar chunks for every query and include them all. This works in simple cases and fails in complex ones for reasons that are predictable:

**Semantic similarity is not the same as task relevance.** The chunk most similar to the current query is not always the chunk most useful for the current task. Relevance depends on what the agent is trying to accomplish, what it already knows, and what it still needs — not just on surface-level similarity to the query string.

**Recency matters and is not always captured in similarity.** For tasks involving current state — account status, system health, recent activity — the most recent information is often more relevant than the most semantically similar, even if the semantically similar content is from months ago.

**Volume degrades quality.** More context is not always better context. Context windows have capacity limits, but the real limit is attention — a model reasoning over 50 retrieved chunks with mixed relevance often produces worse outputs than a model reasoning over 5 highly relevant chunks. The signal-to-noise ratio in the context window matters.

Selection should be tuned to the task type, not set once at system configuration. A context selection strategy appropriate for factual Q&A is not appropriate for multi-step analysis. This is an engineering decision that compounds: poor selection strategy produces poor outputs, which produces feedback that is hard to attribute back to context quality.

### Compress

Compressing is the operation of reducing the token cost of information in context without losing the signal it carries.

The motivation is token budget management. Every token in the context window costs money and consumes capacity that could hold more relevant information. Raw documents, long tool responses, and verbose retrieval results are expensive. Well-compressed representations of the same information are cheap.

The compression techniques that work in production:

**Structured extraction over prose.** If the agent needs to know a customer's subscription tier, renewal date, and open support tickets — extract those fields into a structured format rather than including the entire account record. The model reasons more reliably over structured data for structured questions.

**Summarization of prior context.** In long-running agent tasks, the accumulated tool results and intermediate observations from early steps often contain information that has been incorporated into the agent's working model. Summarizing those early steps — collapsing verbose logs into a brief state summary — frees context budget for what is happening now.

**Truncation with priority.** When information must be truncated to fit, truncation should preserve the most relevant parts — not just the beginning of the document. A truncation strategy that drops the last 30% of a document may discard the conclusion, which is often the most relevant part.

Compression is where practitioner instinct matters most. The right compression for a given piece of information depends on what the agent will do with it — knowledge that lives in the system designer, not in any framework.

### Isolate

Isolating is the operation of keeping contexts separate so they do not contaminate each other.

This is the least-discussed context operation and often the most consequential in multi-agent systems.

**Subagent isolation.** When an orchestrator spawns subagents to work in parallel, each subagent should receive only the context relevant to its specific task — not the orchestrator's full context window, and not each other's context. A subagent doing web research does not need to see the raw output from the subagent doing database queries. Sharing full context across agents inflates token costs and introduces noise that degrades subagent performance.

**Conversation thread isolation.** In systems handling multiple concurrent users or multiple concurrent sessions, context from one conversation should not leak into another. This sounds obvious and is routinely violated when context is stored in ways that assume single-user, single-session operation.

**Temporal isolation.** Information from a prior run should not be indiscriminately included in the current run's context. The agent's prior conclusions about a customer's status from two weeks ago may be actively misleading today if the customer's situation has changed. Episodic memory needs to be tagged with recency and relevance before inclusion, not included by default because it was previously generated.

The failure mode for poor isolation is subtle: the agent produces outputs that seem informed by relevant prior knowledge but are actually contaminated by prior context that no longer applies. These failures are particularly hard to diagnose because the outputs look reasonable.

## Why This Matters More Than Model Selection

There is a persistent tendency in enterprise AI teams to attribute poor agent performance to the model. The model isn't capable enough. We need to switch from GPT to Claude. We need a larger model.

Sometimes this is true. More often, the bottleneck is context quality.

The same model that performs poorly with poorly engineered context will perform dramatically better with well-engineered context. This is not a theoretical claim — it is consistently demonstrated in practice. Teams that invest in context engineering before escalating model requirements routinely find that their current model is sufficient, or that the uplift from model improvement is far smaller than the uplift from context improvement.

The economic implication matters too. Better models are more expensive. Better context engineering is a one-time investment that improves with iteration. The ROI calculation usually favors context work first.

## The Practitioner's Starting Question

Before you write the next version of your system prompt, answer this question for the task you are building:

What information does the agent need, that it currently does not have, to produce the output you actually want?

If the answer is "nothing, the instructions are just wrong" — that is a prompt engineering problem. Fix the instructions.

If the answer is "it needs the customer's last three interactions, the current product catalog, and the status of any open tickets" — that is a context engineering problem. Fix the information architecture.

Most production failures are the second kind. Most teams spend their time on the first.

That mismatch is what context engineering, as a discipline, is designed to correct.
