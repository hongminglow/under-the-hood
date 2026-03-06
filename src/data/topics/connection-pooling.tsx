import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const connectionPoolingTopic: Topic = {
  id: "connection-pooling",
  title: "Database Connection Pooling",
  description:
    "Why opening a new database connection per request kills your server — and how connection pools solve it with pre-warmed sockets.",
  tags: ["databases", "performance", "backend", "node"],
  icon: "Plug",
  content: [
    <p key="1">
      Opening a database connection involves a <strong>TCP handshake</strong>,
      <strong> TLS negotiation</strong>, and{" "}
      <strong>authentication exchange</strong> — costing{" "}
      <strong>20–100ms</strong> each time. Under 100 requests/second, that's 100
      new connections competing for database resources. PostgreSQL's default
      limit is <strong>100 connections</strong>. You're dead.
    </p>,
    <p key="2" className="mt-4 mb-8">
      A <strong>Connection Pool</strong> opens N connections at startup and{" "}
      <strong>reuses them</strong>. When your code needs a connection, the pool
      lends one out. When done, the connection returns to the pool — never
      closed, never reopened.
    </p>,
    <CodeBlock
      key="3"
      language="typescript"
      title="Node.js Pool vs No Pool"
      code={`// ❌ Without pool: new connection per query (~50ms overhead each)
import { Client } from 'pg';
async function getUser(id: string) {
  const client = new Client();    // TCP + TLS + Auth = 50ms
  await client.connect();
  const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  await client.end();             // Connection destroyed
  return result.rows[0];
}

// ✅ With pool: reuse pre-warmed connections (~0ms overhead)
import { Pool } from 'pg';
const pool = new Pool({ max: 20 }); // 20 connections, pre-warmed
async function getUser(id: string) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];           // Connection auto-returned to pool
}`}
    />,
    <Table
      key="4"
      headers={["Setting", "Too Low", "Too High"]}
      rows={[
        [
          "Pool Size",
          "Requests queue up waiting for a connection",
          "Database overwhelmed, context switching overhead",
        ],
        [
          "Idle Timeout",
          "Connections die too fast, re-opened constantly",
          "Stale connections consume DB resources",
        ],
        [
          "Connection Lifetime",
          "Frequent reconnects, instability",
          "Connections never refresh, memory leaks accumulate",
        ],
      ]}
    />,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Serverless Connection Problem">
        <p className="text-sm">
          Each Lambda/Cloud Function cold-start opens a{" "}
          <strong>new connection</strong>. 1000 concurrent Lambdas = 1000
          connections. Solutions: <strong>RDS Proxy</strong> (AWS),{" "}
          <strong>PgBouncer</strong>, or <strong>Prisma Accelerate</strong> —
          external poolers between serverless functions and the database.
        </p>
      </Card>
      <Card title="Pool Size Formula">
        <p className="text-sm">
          PostgreSQL recommends:{" "}
          <code>pool_size = (core_count * 2) + effective_spindle_count</code>.
          For a 4-core SSD server: <strong>~10 connections</strong>.
          Counter-intuitive — more connections means more lock contention and
          context switching.
        </p>
      </Card>
    </Grid>,
    <Callout key="6" type="warning" title="The Connection Leak Bug">
      If your code acquires a connection but <strong>never releases it</strong>{" "}
      (e.g., an error thrown before <code>client.release()</code>), the pool
      drains to zero and all subsequent requests hang forever. Always use{" "}
      <code>try/finally</code> or the pool's auto-release query method.
    </Callout>,
  ],
};
