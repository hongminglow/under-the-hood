import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const databaseShardingTopic: Topic = {
  id: "database-sharding",
  title: "Database Sharding & Partitioning",
  description:
    "The horizontal scaling technique that splits a single massive database across multiple servers to handle billions of rows.",
  tags: ["databases", "system-design", "scalability", "sharding"],
  icon: "SplitSquareHorizontal",
  content: [
    <p key="1">
      When your PostgreSQL table hits <strong>500 million rows</strong>, even
      perfectly indexed queries start crawling. Vertical scaling (bigger CPU /
      more RAM) has a hard ceiling. <strong>Sharding</strong> breaks your single
      table into smaller, faster <em>shards</em> spread across multiple
      independent database servers.
    </p>,
    <p key="2" className="mt-4 mb-8">
      Each shard holds a <strong>subset</strong> of the total data. The
      application (or a proxy layer) uses a <strong>shard key</strong> to
      deterministically route every read/write to the correct shard server.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Sharding Strategies
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Range-Based Sharding">
        <p className="text-sm">
          Rows with IDs <code>1–1M</code> go to Shard A, <code>1M–2M</code> go
          to Shard B. Simple to implement but causes <strong>hotspots</strong> —
          the latest shard absorbs all new writes.
        </p>
      </Card>
      <Card title="Hash-Based Sharding">
        <p className="text-sm">
          Apply <code>hash(user_id) % N</code> to distribute rows uniformly.
          Eliminates hotspots but makes <strong>range queries</strong> across
          shards extremely expensive.
        </p>
      </Card>
      <Card title="Directory-Based Sharding">
        <p className="text-sm">
          A central lookup table maps each shard key value to its physical
          shard. Maximum flexibility, but the directory itself becomes a{" "}
          <strong>single point of failure</strong>.
        </p>
      </Card>
      <Card title="Geo-Based Sharding">
        <p className="text-sm">
          Data is partitioned by geographic region. US users hit the US shard,
          EU users hit the EU shard. Reduces latency but complicates{" "}
          <strong>cross-region queries</strong>.
        </p>
      </Card>
    </Grid>,
    <Table
      key="5"
      headers={["Challenge", "Why It Hurts", "Mitigation"]}
      rows={[
        [
          "Cross-Shard Joins",
          "JOINs spanning 2+ shards require scatter-gather queries.",
          "Denormalize data or use application-level joins.",
        ],
        [
          "Rebalancing",
          "Adding a new shard requires redistributing billions of rows.",
          "Use consistent hashing or virtual shards.",
        ],
        [
          "Global Unique IDs",
          "Auto-increment breaks across shards.",
          "Use UUIDs, Snowflake IDs, or a centralized ID service.",
        ],
        [
          "Distributed Transactions",
          "ACID becomes extremely expensive across shards.",
          "Use Saga pattern or eventual consistency.",
        ],
      ]}
    />,
    <CodeBlock
      key="6"
      language="typescript"
      title="Hash-Based Shard Router"
      code={`function getShardIndex(userId: string, totalShards: number): number {
  let hash = 0;
  for (const char of userId) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash % totalShards;
}

// Route: user "u_9f3a1" → Shard 2 out of 4
getShardIndex("u_9f3a1", 4); // → 2`}
    />,
    <Callout key="7" type="warning" title="Shard vs. Partition">
      <strong>Partitioning</strong> splits data within a{" "}
      <em>single database server</em> (e.g., PostgreSQL table partitions).{" "}
      <strong>Sharding</strong> splits data across{" "}
      <em>multiple independent servers</em>. Interviewers love testing this
      distinction — don't confuse them.
    </Callout>,
  ],
};
