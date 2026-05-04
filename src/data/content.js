export const patternsLibrary = [
  {
    category: 'Agentic Systems',
    slug: 'agentic-systems',
    subcategories: [
      {
        name: 'Foundations',
        slug: 'foundations',
        articles: [
          { title: 'Why the Data Layer Is the Prerequisite for AI Agents', slug: 'data-layer-prerequisite-ai-agents', status: 'published' },
          { title: 'Prompt Engineering vs Context Engineering', slug: 'prompt-vs-context-engineering', status: 'published' },
          { title: 'The LLM as CPU, Context Window as RAM', slug: 'llm-as-cpu-context-as-ram', status: 'published' },
          { title: 'Why Agents Are Harder Than Chatbots', slug: 'why-agents-harder-than-chatbots', status: 'published' },
          { title: 'Context Engineering Is the New Product Skill', slug: 'context-engineering-new-product-skill', status: 'published' },
          { title: 'Orchestrator Patterns: Hub-and-Spoke, Hierarchical, Pipeline', slug: 'orchestrator-patterns', status: 'planned' },
          { title: 'Stateful vs Stateless Orchestrators — What Actually Matters', slug: 'stateful-vs-stateless-orchestrators', status: 'planned' },
        ],
      },
      {
        name: 'Architecture Patterns',
        slug: 'architecture-patterns',
        articles: [
          { title: 'Fan-Out / Fan-In: Parallelizing Agent Work', slug: 'fan-out-fan-in', status: 'planned' },
          { title: 'Designing Idempotent Agent Tasks', slug: 'idempotent-agent-tasks', status: 'planned' },
          { title: 'Context Propagation Without Blowing Token Budgets', slug: 'context-propagation', status: 'planned' },
          { title: 'Circuit Breakers for Unreliable Sub-Agents', slug: 'circuit-breakers-sub-agents', status: 'planned' },
          { title: 'Agent Pooling: Load Balancing Across Agent Instances', slug: 'agent-pooling', status: 'planned' },
          { title: 'Context Isolation: Spawning Agents With Fresh State', slug: 'context-isolation', status: 'planned' },
        ],
      },
      {
        name: 'Performance & Cost',
        slug: 'performance-cost',
        articles: [
          { title: 'Model Routing: Cheap Models for Routing, Expensive for Reasoning', slug: 'model-routing', status: 'planned' },
          { title: 'Why Your LangGraph Workflow Is Slow (And How to Fix It)', slug: 'langgraph-latency', status: 'planned' },
          { title: 'Token Efficiency Across Agent Chains', slug: 'token-efficiency', status: 'planned' },
          { title: 'Parallelism vs Sequential — Knowing the Difference', slug: 'parallelism-vs-sequential', status: 'planned' },
        ],
      },
      {
        name: 'Evaluation & Reliability',
        slug: 'evaluation-reliability',
        articles: [
          { title: 'How the Orchestrator Knows the Sub-Agent Did It Right', slug: 'orchestrator-evaluation', status: 'planned' },
          { title: 'When More Agents Makes Things Worse', slug: 'when-more-agents-makes-things-worse', status: 'published' },
          { title: 'Hallucination in Multi-Agent Systems (It\'s Not Just the Model)', slug: 'hallucination-multi-agent', status: 'planned' },
          { title: 'Partial Failure Handling and Retry Strategies', slug: 'partial-failure-retry', status: 'planned' },
          { title: 'Observability: Trace IDs Across Agent Chains', slug: 'observability-trace-ids', status: 'planned' },
        ],
      },
      {
        name: 'Governance & Security',
        slug: 'governance-security',
        articles: [
          { title: 'What Data Can Your Agent Actually See?', slug: 'agent-data-access', status: 'published' },
          { title: 'Audit Trails for Autonomous Systems', slug: 'audit-trails-agents', status: 'planned' },
          { title: 'Access Control Patterns for Agent Networks', slug: 'access-control-agent-networks', status: 'planned' },
        ],
      },
      {
        name: 'Case Studies',
        slug: 'case-studies',
        articles: [
          { title: 'AI Agent for Media Planning and Measurement', slug: 'ai-agent-media-planning', status: 'published' },
          { title: 'SDR Personalization at Scale', slug: 'case-study-sdr-personalization', status: 'planned' },
          { title: 'Contract Review Across 500 Agreements', slug: 'case-study-contract-review', status: 'planned' },
          { title: 'L1 Ticket Triage Without Hiring', slug: 'case-study-ticket-triage', status: 'planned' },
          { title: 'Candidate Sourcing Pipeline', slug: 'case-study-candidate-sourcing', status: 'planned' },
          { title: 'Monthly Close Automation', slug: 'case-study-monthly-close', status: 'planned' },
          { title: 'Inventory and Pricing Decisions at Scale', slug: 'case-study-inventory-pricing', status: 'planned' },
        ],
      },
      {
        name: 'Stack & Tooling',
        slug: 'stack-tooling',
        articles: [
          { title: 'Claude SDK vs LangGraph vs CrewAI — Honest Tradeoffs', slug: 'sdk-comparison', status: 'planned' },
          { title: 'When Tool Use Is Enough (You Don\'t Need Agents)', slug: 'when-tool-use-is-enough', status: 'planned' },
          { title: 'Multi-Model Orchestration: Cheap Router, Expensive Executor', slug: 'multi-model-orchestration', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'Stream Processing',
    slug: 'stream-processing',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'The Log Is the Database', slug: 'log-is-the-database', status: 'planned' },
          { title: 'When Storm Wasn\'t Enough', slug: 'when-storm-wasnt-enough', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'Storage & Table Formats',
    slug: 'storage-table-formats',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'Why Parquet Wasn\'t Enough', slug: 'why-parquet-wasnt-enough', status: 'planned' },
          { title: 'The Medallion Architecture Explained', slug: 'medallion-architecture', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'Orchestration',
    slug: 'orchestration',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'From Cron Jobs to DAGs', slug: 'cron-jobs-to-dags', status: 'planned' },
          { title: 'Task-Centric vs Asset-Centric Orchestration', slug: 'task-centric-vs-asset-centric', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'ML Infrastructure',
    slug: 'ml-infrastructure',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'MMM and Budget Optimization: A Reference Architecture', slug: 'mmm-budget-optimization-architecture', status: 'published' },
          { title: 'The Feature Store Problem', slug: 'feature-store-problem', status: 'planned' },
          { title: 'Training-Serving Skew: The Silent Killer', slug: 'training-serving-skew', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'Real-Time & OLAP',
    slug: 'real-time-olap',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'Sub-Second at Scale', slug: 'sub-second-at-scale', status: 'planned' },
          { title: 'User-Facing Analytics vs Internal BI', slug: 'user-facing-vs-internal-analytics', status: 'published' },
        ],
      },
    ],
  },
  {
    category: 'Observability & Quality',
    slug: 'observability-quality',
    subcategories: [
      {
        name: 'Patterns',
        slug: 'patterns',
        articles: [
          { title: 'Data Observability as a Category', slug: 'data-observability-category', status: 'planned' },
          { title: 'The Five Pillars of Data Health', slug: 'five-pillars-data-health', status: 'planned' },
        ],
      },
    ],
  },
  {
    category: 'Platform Deep Dives',
    slug: 'platform-deep-dives',
    subcategories: [
      {
        name: 'AWS Data Stack',
        slug: 'aws-data-stack',
        articles: [
          { title: 'Kinesis vs Kafka on AWS', slug: 'kinesis-vs-kafka-aws', status: 'planned' },
          { title: 'Redshift vs S3 + Athena vs EMR', slug: 'redshift-vs-s3-athena-emr', status: 'planned' },
          { title: 'Glue vs Custom ETL', slug: 'glue-vs-custom-etl', status: 'planned' },
          { title: 'When to Use Which AWS Data Service', slug: 'which-aws-data-service', status: 'planned' },
        ],
      },
      {
        name: 'GCP Data Stack',
        slug: 'gcp-data-stack',
        articles: [
          { title: 'BigQuery Architecture and Cost Traps', slug: 'bigquery-architecture-cost-traps', status: 'planned' },
          { title: 'Pub/Sub vs Kafka on GCP', slug: 'pubsub-vs-kafka-gcp', status: 'planned' },
          { title: 'Dataflow vs Spark on Dataproc', slug: 'dataflow-vs-spark-dataproc', status: 'planned' },
          { title: 'When GCP Wins vs AWS for Data', slug: 'gcp-vs-aws-data', status: 'planned' },
        ],
      },
      {
        name: 'Azure Data Stack',
        slug: 'azure-data-stack',
        articles: [
          { title: 'Synapse vs Databricks on Azure', slug: 'synapse-vs-databricks-azure', status: 'planned' },
          { title: 'Event Hubs vs Kafka', slug: 'event-hubs-vs-kafka', status: 'planned' },
          { title: 'Azure Data Factory Patterns', slug: 'azure-data-factory-patterns', status: 'planned' },
          { title: 'When Azure Is the Right Call', slug: 'when-azure-is-right', status: 'planned' },
        ],
      },
      {
        name: 'Snowflake',
        slug: 'snowflake',
        articles: [
          { title: 'Where Snowflake Wins and Where It Doesn\'t', slug: 'snowflake-wins-and-doesnt', status: 'published' },
          { title: 'Snowflake vs BigQuery Honest Comparison', slug: 'snowflake-vs-bigquery', status: 'planned' },
          { title: 'Cost Modeling at Different Scales', slug: 'snowflake-cost-modeling', status: 'planned' },
          { title: 'Snowflake + dbt + Cortex AI: The Marketing Measurement Stack', slug: 'snowflake-dbt-canonical-stack', status: 'published' },
          { title: 'Privacy-Safe Clean Room Measurement Architecture', slug: 'clean-room-measurement-architecture', status: 'published' },
        ],
      },
      {
        name: 'Databricks',
        slug: 'databricks',
        articles: [
          { title: 'When Databricks Beats Snowflake', slug: 'databricks-beats-snowflake', status: 'planned' },
          { title: 'Delta Lake vs Iceberg on Databricks', slug: 'delta-lake-vs-iceberg-databricks', status: 'planned' },
          { title: 'Unity Catalog and the Governance Layer', slug: 'unity-catalog-governance', status: 'planned' },
          { title: 'Databricks for ML vs for Data Engineering', slug: 'databricks-ml-vs-data-engineering', status: 'planned' },
        ],
      },
    ],
  },
];

export function getCategoryBySlug(slug) {
  return patternsLibrary.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(categorySlug, subcategorySlug) {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((s) => s.slug === subcategorySlug);
}

export function getArticleBySlug(categorySlug, subcategorySlug, articleSlug) {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  return subcategory?.articles.find((a) => a.slug === articleSlug);
}

export function getAllArticlePaths() {
  const paths = [];
  for (const category of patternsLibrary) {
    for (const subcategory of category.subcategories) {
      for (const article of subcategory.articles) {
        paths.push({
          category: category.slug,
          subcategory: subcategory.slug,
          slug: article.slug,
        });
      }
    }
  }
  return paths;
}
