import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const sqlVsNosqlTopic: Topic = {
  id: "sql-vs-nosql",
  title: "SQL vs NoSQL Paradigms",
  description:
    "Rethinking data persistency: the classic relational consistency approach versus modern distributed scalability.",
  tags: ["databases", "architecture", "acid", "dist-systems"],
  icon: "Database",
  content: [
    <p key="1">
      For decades, the Relational Database Management System (RDBMS) was the
      undisputed king of data persistence, relying on strict tables and foreign
      keys. The advent of massive, unstructured web data birthed{" "}
      <strong>NoSQL ("Not Only SQL")</strong>, an umbrella term for alternative
      storage paradigms optimized for rapid iteration and horizontal scaling.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Paradigms
    </h4>,
    <Grid key="3" cols={2} gap={6}>
      <Card title="Relational (SQL)" description="Strict Schema & Integrity">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Data is strictly structured into <strong>Tables</strong>{" "}
            (Rows/Columns).
          </li>
          <li>
            Follows <Highlight variant="primary">Normalization</Highlight> to
            reduce data redundancy.
          </li>
          <li>
            Scales vertically (requires a bigger, more expensive CPU/RAM).
          </li>
          <li>Examples: PostgreSQL, MySQL, SQL Server.</li>
        </ul>
      </Card>
      <Card title="Non-Relational (NoSQL)" description="Flexible & Distributed">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Data is often stored as JSON-like documents, key-value pairs, or
            graphs.
          </li>
          <li>
            Follows <Highlight variant="warning">Denormalization</Highlight> to
            optimize read-heavy application patterns.
          </li>
          <li>
            Scales horizontally (add cheaper commodity servers to a cluster).
          </li>
          <li>Examples: MongoDB, Redis, Cassandra, Neo4j.</li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      ACID vs BASE Guarantees
    </h4>,
    <p key="5">
      The deepest technical divergence between the systems revolves around state
      guarantees during failure points in distributed networks.
    </p>,
    <Table
      key="6"
      headers={["Concept", "Meaning", "Used By"]}
      rows={[
        [
          "Atomicity (ACID)",
          "All or nothing. If a transaction fails in the middle, it rolls back entirely. No partial states.",
          "SQL / RDBMS",
        ],
        [
          "Consistency (ACID)",
          "Data always moves from one valid state to another perfectly following constraints.",
          "SQL / RDBMS",
        ],
        [
          "Isolation (ACID)",
          "Concurrent transactions safely execute as if they were strictly sequential.",
          "SQL / Spanner",
        ],
        [
          "Basic Availability (BASE)",
          "The database will continue answering requests, even if nodes are down.",
          "NoSQL / AP-Systems",
        ],
        [
          "Soft State (BASE)",
          "The data state might temporally change on its own without user interaction due to background syncing.",
          "NoSQL / Caches",
        ],
        [
          "Eventual Consistency (BASE)",
          "If you stop writing, eventually every node in the cluster will hold the exact same data.",
          "NoSQL / Cassandra",
        ],
      ]}
    />,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      Types of NoSQL Stores
    </h4>,
    <Step key="8" index={1}>
      <strong>Document Stores (MongoDB, DynamoDB):</strong> Store JSON-like
      documents. Excellent for rapid prototyping, e-commerce product catalogs,
      and CMS platforms.
    </Step>,
    <Step key="9" index={2}>
      <strong>Key-Value Stores (Redis, Memcached):</strong> Ultra-fast,
      RAM-based dictionaries mapping a key to a payload. Used for caching,
      leaderboards, and rate-limiting.
    </Step>,
    <Step key="10" index={3}>
      <strong>Column-Family Stores (Cassandra, HBase):</strong> Optimized for
      writing massive amounts of time-series or analytical data across huge
      clusters without single points of failure.
    </Step>,
    <Step key="11" index={4}>
      <strong>Graph Databases (Neo4j, Neptune):</strong> Nodes and Edges are
      first-class citizens. Specifically designed for calculating relationships,
      recommendation engines, and social networking friends-of-friends queries.
    </Step>,
    <Callout key="12" type="tip" title="The Polyglot Persistence Pattern">
      Modern architectures rarely choose just one. A standard web app might use
      PostgreSQL for transactional user billing (ACID), MongoDB for rapidly
      iterating product catalogs (Document), and Redis for session caching
      (Key-Value).
    </Callout>,
  ],
};
