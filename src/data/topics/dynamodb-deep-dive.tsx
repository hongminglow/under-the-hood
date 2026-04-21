import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const dynamoDbDeepDiveTopic: Topic = {
  id: "dynamodb-deep-dive",
  title: "DynamoDB",
  description:
    "Why Amazon DynamoDB achieves single-digit millisecond latency at any scale. How consistent hashing, LSM trees, and eventual consistency form the engine behind one of the world's most battle-tested NoSQL databases.",
  tags: ["database", "nosql", "dynamodb", "aws", "key-value", "scale"],
  icon: "Zap",
  content: [
    <p key="1" className="mb-4">
      DynamoDB is Amazon's fully managed, serverless key-value and document
      database. It underpins Amazon.com's shopping cart, Prime Video, and
      hundreds of AWS services internally — and it guarantees{" "}
      <strong>single-digit millisecond latency at literally any scale</strong>.
      Understanding <em>how</em> it achieves that is a masterclass in
      distributed systems engineering.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Origins: The Dynamo Paper (2007)
    </h3>,
    <p key="3" className="mb-4">
      DynamoDB is the productized, managed evolution of the internal{" "}
      <strong>Amazon Dynamo</strong> system described in the legendary 2007
      paper <em>"Dynamo: Amazon's Highly Available Key-Value Store"</em>. That
      paper introduced the world to consistent hashing rings, vector clocks, and
      tunable consistency — concepts that now underpin Cassandra, Riak, and most
      modern distributed databases.
    </p>,
    <Callout key="4" type="info" title="Why Amazon Built Dynamo">
      In 2004, a single RDBMS bottleneck caused Amazon.com's checkout cart to go
      down during peak traffic. Engineers realized relational databases — with
      their strict consistency guarantees and single-master writes —
      fundamentally could not handle Amazon's scale. Dynamo was born from the
      requirement:{" "}
      <strong>
        "always writable, always available, even during network partitions."
      </strong>
    </Callout>,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Architecture Behind Single-Digit Millisecond Latency
    </h3>,

    <h4 key="6" className="text-lg font-semibold mt-6 mb-3 text-primary">
      1. Consistent Hashing — Where Your Data Lives
    </h4>,
    <p key="7" className="mb-4">
      DynamoDB operates a massive fleet of storage nodes arranged in a{" "}
      <strong>consistent hash ring</strong>. When you write an item, DynamoDB
      hashes your <code>Partition Key</code> value and maps it to a position on
      the ring. That position determines which physical storage node(s) store
      your data. This means:
    </p>,
    <div key="8" className="space-y-3 mb-6">
      <Step index={1}>
        <strong>Deterministic routing:</strong> Given a partition key, the
        router can compute exactly which node holds the data in O(1) — no
        directory lookup, no central coordinator.
      </Step>
      <Step index={2}>
        <strong>Automatic sharding:</strong> Data is automatically distributed
        across thousands of internal partitions without you managing shard keys
        or rebalancing.
      </Step>
      <Step index={3}>
        <strong>Elastic scaling:</strong> Adding a node only moves a slice of
        the ring — the rest of the data stays put. No full resharding needed.
      </Step>
    </div>,

    <h4 key="9" className="text-lg font-semibold mt-6 mb-3 text-primary">
      2. LSM Trees — Why Writes Are Blindingly Fast
    </h4>,
    <p key="10" className="mb-4">
      DynamoDB's storage engine is built on{" "}
      <strong>Log-Structured Merge Trees (LSM trees)</strong> — the same
      structure used by Cassandra, RocksDB, and LevelDB. Unlike B-Trees (which
      PostgreSQL uses and which require random disk seeks), LSM trees convert
      all writes into <strong>sequential appends</strong>.
    </p>,
    <Grid key="11" cols={2} gap={6} className="my-6">
      <Card title="How LSM Tree Writes Work">
        <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
          <li>
            Write lands in an in-memory buffer (<strong>MemTable</strong>)
          </li>
          <li>Also appended to a WAL (Write-Ahead Log) for durability</li>
          <li>
            MemTable is periodically flushed to immutable disk files (
            <strong>SSTables</strong>)
          </li>
          <li>Background compaction merges SSTables, removing old versions</li>
        </ol>
      </Card>
      <Card title="Why This Beats B-Trees at Scale">
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li>
            Every write is a sequential append — disk I/O is maximally efficient
          </li>
          <li>No lock contention on a shared B-Tree root structure</li>
          <li>
            Writes are acknowledged after MemTable + WAL — microseconds, not
            disk seeks
          </li>
          <li>
            Trade-off: reads may need to check multiple SSTables (partially
            mitigated by Bloom filters)
          </li>
        </ul>
      </Card>
    </Grid>,

    <h4 key="12" className="text-lg font-semibold mt-6 mb-3 text-primary">
      3. Replication & Durability — 3AZ by Default
    </h4>,
    <p key="13" className="mb-4">
      Every write to DynamoDB is{" "}
      <strong>synchronously replicated to 3 Availability Zones</strong> before
      it's acknowledged as successful. Each replica runs its own LSM storage
      engine. A write is confirmed only when at least 2 of 3 replicas commit it
      to their WAL — guaranteeing no data loss even if an entire AZ goes dark.
    </p>,
    <CodeBlock
      key="14"
      title="Quorum Write Flow (simplified)"
      language="text"
      code={`Client → DynamoDB Request Router
  → Hash(partition_key) → Storage Node Leader (AZ-1)
       ├─ Write to MemTable + WAL (AZ-1) ✓
       ├─ Replicate → Follower (AZ-2)  ✓  (quorum met)
       └─ Replicate → Follower (AZ-3)  ✓  (async)

Once 2/3 nodes confirm → ACK returned to client
Entire round trip: ~1-5ms`}
    />,

    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      The Data Model: Everything Revolves Around Access Patterns
    </h3>,
    <p key="16" className="mb-4">
      DynamoDB has no declarative query language like SQL. You get exactly what
      you design for. The data model is built around two keys:
    </p>,
    <Table
      key="17"
      headers={["Key", "Purpose", "Analogy"]}
      rows={[
        [
          "Partition Key (PK)",
          "Hashed to determine which physical partition stores the item. Must be included in every query.",
          "The folder on disk — all items with the same PK live together.",
        ],
        [
          "Sort Key (SK) — optional",
          "Sorts items within a partition. Enables range queries (BETWEEN, begins_with) within a partition.",
          "The filename within the folder — allows ordering and filtering inside one partition.",
        ],
      ]}
    />,
    <CodeBlock
      key="18"
      title="DynamoDB table design — e-commerce orders"
      language="javascript"
      code={`// Table: Orders
// PK = customer_id, SK = order_date#order_id

// ✅ Blazing fast: get all orders for a customer (single partition read)
const orders = await dynamo.query({
  TableName: "Orders",
  KeyConditionExpression: "pk = :cid",
  ExpressionAttributeValues: { ":cid": "user_42" },
});

// ✅ Fast: get recent orders for a customer (range query on SK)
const recent = await dynamo.query({
  TableName: "Orders",
  KeyConditionExpression: "pk = :cid AND sk BETWEEN :start AND :end",
  ExpressionAttributeValues: {
    ":cid": "user_42",
    ":start": "2024-01-01",
    ":end": "2024-12-31",
  },
});

// ❌ SLOW/Costly: get all orders for a product across all customers
// This requires a Scan (full table read) OR a Global Secondary Index (GSI)`}
    />,

    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      Global Secondary Indexes (GSI) — The Escape Hatch
    </h3>,
    <p key="20" className="mb-4">
      When you need to query by a non-primary-key attribute, you define a{" "}
      <strong>Global Secondary Index (GSI)</strong>. DynamoDB asynchronously
      maintains a separate, fully replicated copy of your table projected on a
      different key pattern. It's essentially a second table maintained
      transparently.
    </p>,
    <Callout key="21" type="warning" title="GSI Consistency Trade-off">
      GSI reads are <strong>eventually consistent</strong> — there's a small
      replication lag between a write to the base table and when that write
      becomes visible in the GSI (typically milliseconds, but not zero). For
      strict read-after-write consistency, you must query the base table
      directly using its primary key.
    </Callout>,

    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      Reads: Strongly Consistent vs Eventually Consistent
    </h3>,
    <Table
      key="23"
      headers={["Mode", "Latency", "Cost", "When to Use"]}
      rows={[
        [
          "Eventually Consistent Read (default)",
          "Lower (~1ms)",
          "0.5× read capacity unit",
          "User feeds, product listings, non-critical reads where staleness of milliseconds is acceptable",
        ],
        [
          "Strongly Consistent Read",
          "Slightly higher (~2-4ms)",
          "1× read capacity unit (2× cost)",
          "Financial balances, inventory counts, any read-after-write scenario where stale data causes bugs",
        ],
        [
          "Transactional Read (TransactGetItems)",
          "Higher (~5ms)",
          "2× read capacity unit",
          "Reading multiple items that must be consistent with each other atomically",
        ],
      ]}
    />,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Massive Write Throughput: How DynamoDB Handles It
    </h3>,
    <p key="25" className="mb-4">
      DynamoDB's write path is intentionally simple. There are no foreign key
      checks, no join validations, no constraint evaluations beyond primary key
      uniqueness. Every write just needs to:
    </p>,
    <div key="26" className="space-y-3 mb-6">
      <Step index={1}>
        <strong>Authenticate & authorize</strong> the IAM request (pre-computed,
        cached).
      </Step>
      <Step index={2}>
        <strong>Route</strong> to the correct partition via consistent hash
        (O(1)).
      </Step>
      <Step index={3}>
        <strong>Write to MemTable + WAL</strong> on leader node (in-memory,
        sequential write).
      </Step>
      <Step index={4}>
        <strong>Replicate</strong> to 2 follower nodes for quorum (parallel
        network calls).
      </Step>
      <Step index={5}>
        <strong>Return ACK</strong> to client. Total: single-digit milliseconds,
        regardless of table size.
      </Step>
    </div>,
    <Callout
      key="27"
      type="success"
      title="On-Demand Capacity: Instant Auto-Scaling"
    >
      In <strong>On-Demand mode</strong>, DynamoDB automatically scales write
      throughput to handle sudden spikes — no pre-provisioning needed.
      Amazon.com uses this for Black Friday, where writes jump 100× in minutes.
      DynamoDB has handled sustained workloads of{" "}
      <strong>89 million requests per second</strong> (documented at AWS
      re:Invent).
    </Callout>,

    <h3 key="28" className="text-xl font-bold mt-8 mb-4">
      When DynamoDB is the Right Choice
    </h3>,
    <Table
      key="29"
      headers={["Use Case", "Why DynamoDB Wins"]}
      rows={[
        [
          "Shopping carts / session state",
          "Key-value lookup by user_id — single-digit ms, infinite scale, TTL for auto-expiry",
        ],
        [
          "Gaming leaderboards",
          "Sorted sets via PK+SK (score#userId), atomic counter increments with UpdateExpression",
        ],
        [
          "IoT device telemetry",
          "Massive write throughput, time-series data modeled by device_id (PK) + timestamp (SK)",
        ],
        [
          "Feature flags & config",
          "Low-latency reads, rarely written, simple key-value lookups",
        ],
        [
          "Multi-region / global apps",
          "DynamoDB Global Tables: active-active replication across regions with sub-second convergence",
        ],
        [
          "Serverless / Lambda backends",
          "No connection pool management — HTTP API, scales to zero, pay-per-request",
        ],
        [
          "Audit logs & event sourcing",
          "Append-only writes by transaction_id + timestamp, immutable records",
        ],
      ]}
    />,

    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      When DynamoDB is the Wrong Choice
    </h3>,
    <Grid key="31" cols={2} gap={6} className="my-6">
      <Card title="❌ Avoid DynamoDB When...">
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li>
            You need complex multi-table JOINs or ad-hoc analytics queries
          </li>
          <li>
            Your access patterns are not known at design time (exploratory data)
          </li>
          <li>
            You have relational integrity requirements (foreign keys, cascades)
          </li>
          <li>
            You are cost-sensitive at high sustained throughput (self-hosted
            Cassandra is cheaper)
          </li>
          <li>
            You need full-text search (use Elasticsearch alongside DynamoDB)
          </li>
          <li>
            Your team already operates PostgreSQL well — don't change what works
          </li>
        </ul>
      </Card>
      <Card title="✅ DynamoDB Shines When...">
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li>
            You need guaranteed single-digit ms SLA at unpredictable scale
          </li>
          <li>
            You want zero operational overhead (no patches, backups, replication
            setup)
          </li>
          <li>
            Traffic is spiky and unpredictable — Black Friday, viral moments
          </li>
          <li>
            You are 100% on AWS and want native IAM, CloudWatch, Lambda
            integration
          </li>
          <li>
            You can design your data model around known access patterns up front
          </li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="32" type="tip" title="The Single-Table Design Pattern">
      Advanced DynamoDB practitioners use <strong>Single-Table Design</strong> —
      storing multiple entity types (users, orders, products) in one table,
      differentiated by a naming convention on PK/SK (e.g.,{" "}
      <code>PK="USER#42"</code>, <code>SK="ORDER#2024-05-01#xyz"</code>). This
      eliminates cross-table joins entirely since all related data lives in one
      partition, dramatically reducing latency and cost. Libraries like{" "}
      <strong>ElectroDB</strong> and <strong>Dynamoose</strong> provide a schema
      layer on top of this pattern.
    </Callout>,
  ],
};
