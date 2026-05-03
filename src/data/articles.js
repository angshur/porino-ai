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
  'snowflake-dbt-canonical-stack': {
    description: 'The canonical stack for marketing measurement data engineering: Snowflake as the warehouse, dbt for transformation, Cortex AI for ML workflows. Architecture patterns, cost traps, and what actually breaks in production.',
    html: `
      <p>If you're building a marketing measurement stack in 2025, you're probably going to land on some combination of Snowflake, dbt, and an ML layer. This isn't a vendor recommendation — it's what the evidence points to when you work backwards from what marketing data actually requires.</p>
      <p>This pattern covers the architecture, the specific choices that matter, and the traps that are easy to fall into.</p>

      <hr />

      <h2>Why Marketing Data Is Uniquely Hard</h2>
      <p>Marketing data has properties that make it harder to engineer than most enterprise data:</p>
      <ul>
        <li><strong>Source fragmentation.</strong> A typical brand pulls data from 10–30 ad platforms, a CRM, an analytics tool, a CDP, an email platform, and a payment processor. Each has a different schema, different latency, different API limits, and different definitions for the same concepts.</li>
        <li><strong>Definitional inconsistency.</strong> "Conversion" means something different in Google Ads, Meta, Salesforce, and your data warehouse. "Revenue" means something different before and after returns, before and after discounts. Normalizing across these requires explicit, maintained semantic modeling — not just raw ingestion.</li>
        <li><strong>Time sensitivity that varies by use case.</strong> Campaign pacing decisions need data that's hours old at most. MMM can run on week-old data. Incrementality experiment analysis can wait days. One pipeline does not fit all of these.</li>
        <li><strong>High-cardinality dimensions.</strong> Ad creative IDs, audience segment IDs, placement IDs — marketing data has enormous dimensional cardinality that creates query performance problems if the data model isn't designed for it.</li>
      </ul>
      <p>The stack you choose has to handle all of this without becoming unmaintainable.</p>

      <hr />

      <h2>The Three-Layer Architecture</h2>
      <p>The architecture that works consistently has three layers:</p>
      <ul>
        <li><strong>Ingest</strong> — raw data from all sources, landed as-is into Snowflake staging schemas. No transformation at this layer. High fidelity, append-only, timestamped.</li>
        <li><strong>Transform</strong> — dbt models that clean, normalize, and semantically model the raw data into clean intermediate and mart layers. This is where "conversion" gets a single definition, where spend is normalized to a common currency and attribution window, where customer identity gets resolved.</li>
        <li><strong>Serve</strong> — marts and feature tables that are purpose-built for downstream consumers: BI tools, MMM pipelines, ML feature stores, activation APIs.</li>
      </ul>
      <p>The critical discipline: transformation happens only in the transform layer. Raw data stays raw. Serve layer tables are built from transform layer models, never directly from staging. This separation is what makes the system debuggable when something breaks.</p>

      <hr />

      <h2>Snowflake as the Hub</h2>
      <p>Snowflake works well as the hub for marketing data for specific reasons:</p>
      <p><strong>Zero-copy data sharing.</strong> For clean room use cases — sharing data with a publisher or a partner without exposing raw records — Snowflake's secure data sharing is a native capability. You don't need a separate clean room vendor if your counterparty is also on Snowflake.</p>
      <p><strong>Separation of compute and storage.</strong> Marketing data ingestion is bursty. End-of-month reporting runs are heavy. Cortex AI inference jobs are episodic. Snowflake's compute/storage separation means you can size compute to the workload, not to the peak, which matters for cost.</p>
      <p><strong>Semi-structured data handling.</strong> Ad platform APIs return JSON. Snowflake's VARIANT type and FLATTEN function handle this natively without a preprocessing step. For teams ingesting from 20+ platforms, this removes a class of brittle ETL.</p>
      <p>Where Snowflake creates problems:</p>
      <p><strong>Cost at high query concurrency.</strong> If you're serving user-facing analytics — dashboards refreshing for hundreds of users simultaneously — Snowflake's credit model gets expensive fast. For internal BI and analytical workloads, it's fine. For embedded analytics, you likely want a purpose-built OLAP layer in front of it.</p>
      <p><strong>Streaming ingestion.</strong> Snowflake is not a streaming database. If you need sub-minute freshness for any part of your marketing stack (real-time bidding signals, live pacing), you need a streaming layer upstream — Kafka, Kinesis, or Pub/Sub — landing into Snowpipe or a dedicated real-time store. Don't try to make Snowflake real-time.</p>

      <hr />

      <h2>dbt for Marketing Data Models</h2>
      <p>dbt is the right transformation layer for marketing data because marketing data models are logic-heavy, not compute-heavy. The transformation work is mostly normalization, joining, and aggregation — SQL workloads that benefit more from good model design than from Spark-scale compute.</p>
      <p>Specific patterns that matter for marketing data:</p>
      <p><strong>Spend normalization as a base model.</strong> Build a single <code>fct_spend</code> model that unions all ad platform spend, normalizes to a common schema (date, channel, campaign, ad group, creative, spend, impressions, clicks), and applies a consistent attribution window definition. Everything downstream joins to this. When a new platform gets added, you add one source model and the base model absorbs it.</p>
      <p><strong>Identity resolution as a separate model layer.</strong> Customer identity stitching — connecting email addresses, phone numbers, CRM IDs, and anonymous web IDs into unified customer records — is its own modeling problem. Build it as a dedicated model layer with clear inputs and outputs. Don't bake it into your conversion attribution models, or you'll never be able to debug either.</p>
      <p><strong>Slowly changing dimensions for campaign metadata.</strong> Campaign names, audience targeting parameters, creative copy — these change over time and you need history. Model them as SCDs so you can attribute performance to the right configuration at the time the spend ran.</p>
      <p><strong>Data contracts via tests.</strong> Every mart model that feeds downstream ML or reporting should have dbt tests enforcing: no nulls on key columns, referential integrity on join keys, row count within expected range, spend non-negative. Marketing data from ad platforms is surprisingly dirty. Catch it at the model layer, not downstream in an MMM that produces nonsensical outputs.</p>

      <hr />

      <h2>Cortex AI for ML Workflows</h2>
      <p>Snowflake Cortex AI brings ML inference inside the warehouse, which removes a class of data movement problems. For marketing data specifically, the use cases where it earns its place:</p>
      <p><strong>Audience quality scoring.</strong> Running a propensity or lookalike model against your customer base to score likelihood-to-convert, likelihood-to-churn, or predicted LTV. With Cortex, this runs as a SQL function against data that's already in Snowflake — no ETL to a separate ML platform, no training-serving skew from moving data between environments.</p>
      <p><strong>Creative performance classification.</strong> Using Cortex's multimodal capabilities to classify ad creative by visual attributes, copy tone, and format — then joining that to performance data to understand which creative attributes correlate with outcomes. This is a workflow that previously required a custom pipeline and a separate vision model.</p>
      <p><strong>Anomaly detection on spend and performance.</strong> Running statistical anomaly detection on daily spend and KPI data to surface significant deviations before they compound. Useful for catching trafficking errors, budget pacing issues, and performance drops early.</p>
      <p>Where Cortex is not the right tool: complex MMM modeling, geo experiment analysis, or any ML workflow that requires custom training on proprietary architectures. For those, you want a Python environment — a Snowpark notebook, a Hex workspace, or a dedicated ML platform — that can access Snowflake data but isn't constrained by Cortex's model options.</p>

      <hr />

      <h2>The Traps</h2>
      <p><strong>Ingesting everything before modeling anything.</strong> The temptation is to land all sources in Snowflake first, then figure out the data models. This produces a warehouse full of raw data and no analytical layer. The transformation work takes longer than the ingestion work. Prioritize the models for the use cases that have immediate value — spend normalization, conversion attribution, channel performance reporting — and build ingest for those sources first.</p>
      <p><strong>Using Snowflake credits for development workloads.</strong> Development queries run against full datasets are expensive. Use cloning and zero-copy branching to create dev environments against production data without paying full scan costs. Set warehouse auto-suspend to 60 seconds. Tag workloads with query tags so you can see where credits are going.</p>
      <p><strong>Skipping the semantic layer.</strong> dbt transforms raw data into clean tables. But "clean tables" and "agreed business definitions" are not the same thing. If your BI tool or your data scientists are writing their own metric calculations in queries, you'll have definition drift within 6 months. Build a semantic layer — dbt Metrics, Looker LookML, or a dedicated tool like Cube — that enforces single definitions for revenue, ROAS, CPA, and conversion across all consumers.</p>
      <p><strong>Cortex costs without governance.</strong> Cortex AI inference is billed per token or per function call depending on the model. Marketing data at scale — scoring millions of customer records, classifying tens of thousands of creatives — can generate significant Cortex spend if it's not governed. Set up resource monitors and query budgets before running any Cortex workload at scale.</p>

      <hr />

      <h2>What the Full Stack Looks Like</h2>
      <p>The working version of this stack for a mid-market brand looks like:</p>
      <ul>
        <li>Fivetran or Airbyte landing raw data from ad platforms, CRM, and analytics into Snowflake staging schemas</li>
        <li>dbt Cloud running transformation on a daily schedule, with tests enforcing data quality at each layer</li>
        <li>A semantic layer (dbt Metrics or equivalent) exposing agreed definitions to BI tools and downstream consumers</li>
        <li>Cortex AI functions for scoring and classification workloads that can tolerate batch latency</li>
        <li>A Python environment (Snowpark or external) for MMM modeling and incrementality analysis, reading from mart tables</li>
        <li>Snowflake secure data sharing for clean room use cases with publisher partners</li>
      </ul>
      <p>The thing that makes this stack work is not the tools — it's the modeling discipline. The tools are commodity. The decision to build a single <code>fct_spend</code> model that everything joins to, the decision to enforce data contracts at the mart layer, the decision to separate identity resolution from attribution logic — those are the decisions that determine whether the stack is still maintainable in two years.</p>
    `,
  },
};
