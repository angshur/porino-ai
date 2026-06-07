---
title: "Eval Frameworks for Non-Deterministic Agents: What the Data Actually Shows"
description: "Most teams are watching their agents but not testing them in production. A practitioner's framework for evaluating systems where the output is never the same twice."
date: 2026-06-07
readTime: "11 min"
keywords: ["AI evaluation", "agentic AI", "LLM evals", "agent reliability", "observability"]
author: "Angshuman Rudra"
---

Here is a number worth sitting with: 89% of teams building agent systems have observability in place. Only 37% have online evals running in production.

This gap is not an oversight. It is the shape of a hard problem.

Observability is tractable — you log inputs, outputs, latency, and token counts. Online evals are hard because they require you to know what "correct" looks like for a system that, by design, produces different outputs on every run. When you cannot specify the right answer in advance, how do you know when the answer is wrong?

This is the central challenge in evaluating non-deterministic agents, and most teams are not solving it — they are avoiding it.

## Why Agent Evals Are Different From Everything Else

Evaluation in traditional ML is a comparatively clean problem. You have a test set. You run the model. You compute accuracy, F1, precision, recall against known labels. The model either improved or it didn't.

Agents break every assumption in that workflow.

**There is no single right output.** An agent asked to research a competitor, summarize findings, and draft a briefing can produce a hundred different correct briefings. Measuring whether the output matches a pre-specified answer is meaningless. What you actually want to know is: did it complete the task? Did it use the right sources? Did it miss anything important? Did it hallucinate?

**The path through the system varies.** A multi-step agent doesn't just produce variable outputs — it takes variable paths. It might call five tools or two. It might loop back or proceed linearly. Evaluating the final output without evaluating the intermediate steps misses most of what can go wrong.

**Failures are silent.** A traditional model either crashes or produces a measurable output. An agent can successfully complete every step of a workflow, produce a confident-sounding result, and be entirely wrong because it retrieved stale data at step three, misinterpreted a tool response at step five, and never flagged either.

**The model itself changes.** LLM providers update their models. A behavior that worked reliably last month may not work reliably this month — not because you changed anything, but because the model was updated. Without regression testing, you do not know when this happens.

## The Three-Tier Framework

Most teams that have working eval systems in production converge on three layers. These are not sequential — they run in parallel and serve different purposes.

### Tier 1: Regression Testing (Offline)

This is the golden set. A curated collection of task inputs with human-verified expected behaviors.

The key word is *behaviors*, not *outputs*. You are not specifying the exact text the agent should produce. You are specifying the properties the output must have: it should mention the competitor's pricing model, it should not include information from before the acquisition, it should cite at least one primary source.

Behavioral assertions are testable even when exact outputs are not.

A well-designed regression set has:
- Coverage across the normal cases you care about most
- Coverage of the edge cases that have caused production failures before
- A process for adding new cases whenever something breaks in production

The regression suite runs before every deployment. It is your minimum bar for "this did not get worse." It is not your bar for "this is correct in production."

### Tier 2: LLM-as-Judge (Online, Sampled)

For outputs that cannot be evaluated with assertions — open-ended synthesis, qualitative analysis, strategic recommendations — you use a model to evaluate a model.

The evaluator model receives the task input, the agent output, and a rubric. It scores the output against the rubric and flags issues.

This sounds circular but works in practice because the evaluation task is easier than the generation task. Judging whether a briefing is factually accurate and complete is a simpler problem than generating a factually accurate and complete briefing.

Practical constraints:
- Sample, do not evaluate every output. LLM-as-judge at 100% scale is expensive and usually unnecessary.
- The rubric is the hard part. "Was the output good?" is not a rubric. "Did the output correctly identify the primary use case, avoid claims not supported by the source material, and remain under 400 words?" is a rubric.
- Use a different model family for the judge than the agent. If your agent is Claude, use GPT as the judge. Cross-provider judgments are more reliable.

### Tier 3: Production Telemetry (Online, All Traffic)

The first two tiers tell you what can happen. Telemetry tells you what is happening.

Production evals are not about scoring outputs — they are about detecting when the system's behavior is shifting in ways that matter:

**Tool call patterns.** If your agent normally calls three tools and starts calling seven, something changed. Maybe it's handling a new class of requests. Maybe a tool is timing out and the agent is retrying. Either way, you want to know.

**Escalation and refusal rates.** If the agent's rate of "I cannot complete this task" responses doubles, that is a signal worth investigating before users start complaining.

**Latency distribution, not just averages.** A p99 latency spike that doesn't move the mean can still mean 1% of your requests are failing badly.

**Downstream error rates.** If your agent is writing to a CRM and the CRM error rate for those writes goes up, the agent's outputs probably changed in a way that the CRM is rejecting. You won't see this without connecting agent telemetry to downstream system telemetry.

The goal of production telemetry is not to evaluate every output — it is to detect drift early, before it becomes visible to users.

## The Eval That Most Teams Skip

There is a fourth evaluation that is technically simple but organizationally hard: **the task completion eval**.

Not "was the output good?" but "did the agent actually do the thing it was supposed to do?"

For agents that take real-world actions — send an email, update a record, trigger a workflow — this should be measurable in the downstream system. Did the record get updated? Did the email get sent? Did the workflow fire?

Most teams log the agent's intent ("I am going to update this record") but do not verify the outcome ("the record was updated"). The gap between intent and outcome is where silent failures live.

## What 37% Online Eval Adoption Actually Means

Most teams have observability but not production evals. This tells you something about where the industry is.

Observability is the foundation — you cannot eval what you cannot see. But observability without evals means you are watching your agent without knowing what to watch for. You see the logs. You do not know if the logs represent a system that is working.

The teams that have closed this gap share one practice: they treat evals as a product discipline, not an ML discipline. They have an owner for eval coverage. They add eval cases from production failures the way an engineering team adds regression tests from bug reports. They track eval pass rates over time the same way they track uptime.

The 89% with observability have instrumented their systems. The 37% with online evals have decided to be accountable for what those instruments show.

## A Starting Point

If you are building a production agent system and have not started on evals, the sequence is:

1. Define three behavioral assertions for your most critical task. Not "the output is correct" — three specific, testable properties the output must have.
2. Build a 20-case golden set. Use real production inputs, human-verified.
3. Run the golden set before every model update or prompt change.
4. Add one production signal to your monitoring: task completion rate, escalation rate, or tool call count. Pick the one most likely to move when something breaks.

That is not a complete eval framework. It is enough to stop flying blind.

The teams shipping reliable agents in production did not build perfect eval systems on day one. They built a minimum viable eval system and expanded it from every production failure. Start small, instrument everything, and treat each failure as a new test case.

That is the practice. The tooling follows.
