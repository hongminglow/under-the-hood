import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Step } from "@/components/ui/Step";

export const databaseShardingTopic: Topic = {
  id: "database-sharding",
  title: "Database Sharding (Horizontal Scaling)",
  description:
    "When one database server hits its ceiling -- and whether sharding is actually the right weapon to reach for.",
  tags: ["database", "architecture", "scale"],
  icon: "Scissors",
  content: [
    <p key="1">
      Your Postgres server starts struggling at ~10,000 writes/second. You upgrade to a bigger machine -- more cores, faster SSDs. This is <strong>Vertical Scaling</strong>. But eventually, you hit the physical ceiling of what one machine can do. Sharding is the nuclear option when vertical scaling is no longer enough.
    </p>,

    <h3 key="h-vs" className="text-xl font-bold mt-8 mb-4">
      Vertical vs. Horizontal: The Scaling Spectrum
    </h3>,
    <Table
      key="t-vs"
      headers={["Approach", "How", "Ceiling", "Cost"]}
      highlightedRows={[1]}
      rows={[
        ["Vertical Scaling (Scale Up)", "Upgrade CPU, RAM, SSD on the same machine", "Hard hardware limit (~128 cores, ~4TB RAM)", "Expensive per unit, single point of failure"],
        ["Horizontal Scaling / Sharding", "Split data across N independent database servers", "Theoretically unlimited — add more shards", "Massive operational complexity"],
        ["Read Replicas", "Primary handles writes; replicas serve reads", "Only solves read bottlenecks", "Low complexity, common first step"],
        ["Connection Pooling (e.g. PgBouncer)", "Reuse DB connections; don't spin one per request", "Delays the bottleneck significantly", "Very low complexity — do this first"],
      ]}
    />,

    <Callout key="c-first" type="warning" title="Sharding is almost always overkill. Try these first.">
      Before sharding, exhaust: <strong>connection pooling</strong> (PgBouncer), <strong>read replicas</strong>, <strong>query optimisation + indexes</strong>, <strong>Redis caching</strong> for hot reads, and <strong>vertical scaling</strong>. Sharding introduces so much complexity that companies like GitHub and Shopify ran on a single (very beefy) Postgres instance for years.
    </Callout>,

    <h3 key="h-when" className="text-xl font-bold mt-8 mb-4">
      When Does Sharding Actually Make Sense?
    </h3>,
    <Grid key="g-when" cols={2} gap={6} className="my-8">
      <Card title="✅ Right Time to Shard">
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
          <li>Write throughput exceeds what one primary can handle (typically over 10K writes/sec sustained)</li>
          <li>Dataset size exceeds a single server's disk (multi-TB tables, billions of rows)</li>
          <li>You need geographic distribution — data sovereignty laws require EU user data to stay in EU</li>
          <li>Regulatory isolation — tenant data must be completely separated (multi-tenant SaaS)</li>
        </ul>
      </Card>
      <Card title="❌ Wrong Time to Shard">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>Your DB is slow because of missing indexes (fix the query first)</li>
          <li>You have fewer than ~1M active users</li>
          <li>Your team doesn't have operational expertise to manage N database clusters</li>
          <li>You're doing this "just in case" — premature optimisation kills startups</li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="h-how" className="text-xl font-bold mt-8 mb-4">
      How Sharding Works: The Mechanics
    </h3>,
    <p key="p-how" className="mb-6">
      The fundamental idea: split one large table across multiple independent database servers (<strong>shards</strong>). A <strong>Shard Key</strong> determines which shard each row lives on. Your application (or a proxy layer like Vitess / Citus) routes every query to the correct shard.
    </p>,
    <div key="steps-how" className="my-6 pl-2">
      <Step index={1}>
        <strong>Choose a Shard Key</strong> — This is the most critical decision. Common choices: <code>user_id</code>, <code>tenant_id</code>, <code>region</code>. A bad shard key creates hotspots.
      </Step>
      <Step index={2}>
        <strong>Define the sharding strategy</strong> — Range-based (A–M on Shard 1, N–Z on Shard 2), Hash-based (<code>user_id % 4</code> for 4 shards), or Directory-based (a lookup table maps keys to shards).
      </Step>
      <Step index={3}>
        <strong>Deploy N database clusters</strong> — Each shard is an independent Postgres/MySQL instance, often with its own read replica.
      </Step>
      <Step index={4}>
        <strong>Route at the application layer</strong> — Your backend calculates the shard for each query and connects to the right server. Or use a proxy (Vitess, Citus, PlanetScale) that handles routing transparently.
      </Step>
    </div>,

    <h3 key="h-strategies" className="text-xl font-bold mt-8 mb-4">
      Sharding Strategies Compared
    </h3>,
    <Table
      key="t-strat"
      headers={["Strategy", "How", "Pros", "Cons"]}
      highlightedRows={[1]}
      rows={[
        ["Range-Based", "Shard 1: user_id 1-1M, Shard 2: 1M-2M, etc.", "Simple to understand, range queries are efficient", "Uneven distribution if users cluster in one range"],
        ["Hash-Based", "shard = hash(user_id) % N", "Even distribution guaranteed", "Range queries across shards are impossible; resharding is painful"],
        ["Directory-Based", "A lookup table maps each key to a shard", "Maximum flexibility, easy to rebalance", "Lookup table becomes a bottleneck / single point of failure"],
        ["Geo-Based", "EU users -> EU shard; US users -> US shard", "Data locality, compliance-friendly", "Imbalanced if user distribution is lopsided"],
      ]}
    />,

    <h3 key="h-chaos" className="text-xl font-bold mt-8 mb-4">
      The Real Cost: What You Lose When You Shard
    </h3>,
    <Grid key="g-chaos" cols={2} gap={6} className="my-8">
      <Card title="No Cross-Shard JOINs">
        <p className="text-sm text-muted-foreground mb-2">
          SQL <code>JOIN</code> only works within one database. If a User lives on Shard 1 and their Orders are on Shard 3, you must fetch both separately and join in application memory.
        </p>
        <p className="text-xs italic text-muted-foreground">
          This forces you to denormalise your data (duplicate fields across tables) or accept the network overhead.
        </p>
      </Card>
      <Card title="No Global Transactions (ACID)">
        <p className="text-sm text-muted-foreground mb-2">
          Traditional ACID transactions are scoped to a single database. A transaction touching two shards requires a <strong>Two-Phase Commit (2PC)</strong> -- complex, slow, and a consistency risk.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Most architectures avoid cross-shard transactions entirely by designing shard keys so related data is always co-located.
        </p>
      </Card>
      <Card title="Resharding Pain">
        <p className="text-sm text-muted-foreground mb-2">
          Adding a 5th shard to a 4-shard setup means migrating ~20% of your data live, without downtime. This is an operational nightmare.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Solutions: Consistent hashing (minimises data movement), virtual shards (over-provision shards upfront), or managed services (PlanetScale, Vitess).
        </p>
      </Card>
      <Card title="Operational Complexity">
        <p className="text-sm text-muted-foreground mb-2">
          You now manage N database instances, N backup schedules, N monitoring dashboards, N upgrade cycles.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Teams that shard without operational maturity spend more time on database maintenance than on product features.
        </p>
      </Card>
    </Grid>,

    <Callout key="c-hotkey" type="warning" title="The Celebrity Problem (Hot Shard / Hot Key)">
      If you shard Instagram posts by <code>author_id</code>, one shard ends up holding Cristiano Ronaldo's account. He generates 95% of your traffic -- that shard is always on fire while the others sit idle. The fix: use a <strong>composite shard key</strong> (e.g., <code>author_id + post_id</code>) or add a random suffix to distribute writes across sub-shards.
    </Callout>,

    <h3 key="h-alt" className="text-xl font-bold mt-8 mb-4">
      Alternatives Worth Considering First
    </h3>,
    <Table
      key="t-alt"
      headers={["Alternative", "What it Solves", "When to Use"]}
      rows={[
        ["Read Replicas", "Read-heavy bottlenecks", "90%+ of DB load is reads (most apps)"],
        ["Redis Caching", "Hot-path reads hitting DB repeatedly", "Same data read by many users (product pages, leaderboards)"],
        ["Partitioning (within one DB)", "Large table scan performance", "Time-series data — partition by month; query stays on one server"],
        ["NewSQL (CockroachDB, Spanner)", "Distributed SQL with automatic sharding", "When you need sharding but want to keep SQL semantics + ACID"],
        ["NoSQL (Cassandra, DynamoDB)", "Write-heavy workloads at planet scale", "When you can give up JOINs and design around access patterns"],
      ]}
    />,

    <Callout key="c-rule" type="tip" title="The Rule of Thumb">
      Start with a single well-indexed Postgres instance + Redis cache. Add read replicas when reads scale out. Consider NewSQL (CockroachDB, PlanetScale/Vitess) before hand-rolling sharding. Only hand-shard when you have Facebook/Instagram scale — and a dedicated database engineering team to maintain it.
    </Callout>,
  ],
};
