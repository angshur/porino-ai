export const articles = {
  'data-layer-prerequisite-ai-agents': {
    description: 'Teams are rushing into multi-agent systems without the infrastructure underneath. Here is why that fails, and what the data layer has to do with it.',
    html: `
      <p>Everyone is racing to build agents.</p>
      <p>Sales teams want an agent that qualifies leads. Finance teams want one that closes the books. Operations teams want one that monitors inventory and reorders automatically. The demos look impressive. The vendors make it sound inevitable.</p>
      <p>What nobody is talking about is the foundation those agents are standing on.</p>

      <hr />

      <h2>The Demo Works. The Production System Doesn't.</h2>
      <p>Here's the pattern I keep seeing: a team builds a proof-of-concept agent in two weeks. It's impressive. The agent reads data, makes decisions, takes actions. Everyone gets excited. Then they try to put it in production.</p>
      <p>Six months later, it's still not in production.</p>
      <p>The bottleneck is almost never the agent. It's the data underneath it.</p>
      <p>The agent is trying to pull customer records — but the CRM has three different definitions of "active customer" across five teams. It's trying to calculate churn risk — but the revenue data in the warehouse doesn't match the billing system. It's trying to route a support ticket — but the product taxonomy hasn't been updated in two years and half the categories are dead.</p>
      <p>The agent isn't broken. The data layer is.</p>

      <hr />

      <h2>What Agents Actually Depend On</h2>
      <p>An agent is, at its core, a decision loop: observe, reason, act, repeat.</p>
      <p>Every step in that loop depends on data:</p>
      <ul>
        <li><strong>Observe</strong> — the agent needs to read state from somewhere. A database, an API, a stream, a file. If that data is stale, incomplete, or inconsistently modeled, the observation is wrong before reasoning even starts.</li>
        <li><strong>Reason</strong> — the LLM reasons over whatever context you give it. Garbage in, garbage out is too gentle a phrase here. A model reasoning over contradictory data doesn't just produce wrong answers — it produces confidently wrong answers, at scale, automatically.</li>
        <li><strong>Act</strong> — the agent writes back to systems. Updates a record, sends a message, triggers a workflow. If your data systems don't have clean APIs, clear ownership, or reliable write paths, the action either fails silently or corrupts state.</li>
        <li><strong>Repeat</strong> — the loop runs again. If the previous action didn't propagate correctly — if the system isn't observable enough to confirm the write landed — the agent is now reasoning on top of its own errors.</li>
      </ul>
      <p>This is why agents fail in production. Not because the LLM isn't capable. Because the data layer underneath wasn't built to support autonomous systems operating at speed.</p>

      <hr />

      <h2>The Three Data Layer Failures That Kill Agents</h2>

      <h3>1. Inconsistent definitions</h3>
      <p>Your agent asks: "Is this customer active?" The answer depends on which system you ask. The CRM says yes. The billing system says their last payment was 90 days ago. The product database says they haven't logged in since January.</p>
      <p>A human navigates this contradiction using institutional knowledge and judgment. An agent can't. It will pick one answer, act on it, and be wrong a third of the time in ways that are hard to trace.</p>
      <p>The fix isn't an agent fix. It's a data modeling fix — semantic layer, agreed definitions, a single source of truth per entity. This is exactly what dbt, data contracts, and semantic layers are for. You need that work done before you build the agent.</p>

      <h3>2. Latency mismatch</h3>
      <p>Your agent is designed to react to customer behavior in real time. But your warehouse runs a batch job every 24 hours. The data the agent is reading is yesterday's data.</p>
      <p>For some use cases that's fine. For anything time-sensitive — pricing, fraud, customer support, inventory — it's fatal. The agent is acting on a world that no longer exists.</p>
      <p>This is a streaming problem. Kafka, Kinesis, Pub/Sub, Flink — this is what that infrastructure exists to solve. Agents that need to act in real time need a data layer that moves in real time.</p>

      <h3>3. No observability</h3>
      <p>The agent took an action. Did it work? Did the downstream system receive it? Did it produce the expected state change?</p>
      <p>Most data systems can't answer that question reliably. There's no event log, no confirmation signal, no way to query "what was the state of X at time T."</p>
      <p>Without observability, the agent is flying blind. It either acts redundantly (taking the same action twice) or fails to act (assuming a previous action succeeded when it didn't). Both break the feedback loop the agent depends on.</p>

      <hr />

      <h2>What a Good Data Foundation Looks Like</h2>
      <p>The teams that ship agents successfully aren't the ones with the fanciest LLMs or the most sophisticated prompting strategies. They're the ones whose data layer was already in good shape.</p>
      <p>Concretely, that means:</p>
      <ul>
        <li><strong>Modeled, agreed-upon entities.</strong> One definition of customer, order, product, event. Enforced in a semantic layer or a well-maintained warehouse model. The agent reads from the model, not from raw tables.</li>
        <li><strong>Real-time or near-real-time signals where they matter.</strong> If the agent needs to react to something, there's a stream for it. Not because streaming is cool — because the decision loop requires fresh data.</li>
        <li><strong>Clean write paths.</strong> Every system the agent can act on has a documented, tested, idempotent API. The agent can write to it and know whether the write succeeded.</li>
        <li><strong>Lineage and observability.</strong> The data has provenance. You can trace where it came from, when it was last updated, and whether it's healthy. Data quality monitoring is running. Anomalies surface before the agent acts on them.</li>
        <li><strong>Access control and audit logs.</strong> You know what the agent read and what it wrote. This is a compliance requirement in most enterprises and a debugging requirement everywhere.</li>
      </ul>
      <p>None of this is agent infrastructure. It's data infrastructure. It's the work that good data engineering teams have been doing for years, often without a clear business case to point to. The agent use cases are that business case, retroactively.</p>

      <hr />

      <h2>The Implication for How You Build</h2>
      <p>If you're an engineering leader who wants to ship agents: audit your data layer first. Ask whether your agents could answer their own questions reliably with the data they'd actually have access to. If the answer is no, fix that before you invest in agent orchestration frameworks, prompt engineering, or evaluation pipelines.</p>
      <p>If you're a data engineer who has been heads-down building pipelines and warehouse models: the agents are coming to depend on your work. The quality bar for your outputs is about to get much higher, because the consumer is no longer a human who can fill in the gaps — it's a system that takes your data literally and acts on it automatically.</p>
      <p>If you're a consultant or technical lead trying to help a business ship AI: the engagement that ends in production has the data layer conversation first. The engagement that ends in a stalled pilot skips it.</p>
    `,
  },
};
