import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { DatabaseZap, Gauge } from "lucide-react";

export const connectionPoolingTopic: Topic = {
  id: "connection-pooling",
  title: "Connection Pooling (PgBouncer)",
  description:
    "How to organically stop 10,000 aggressive API requests from violently shattering your database's strict TCP limits.",
  tags: ["database", "backend", "performance"],
  icon: "Cable",
  content: [
    <p key="1">
      Connection Pooling is a <strong>Resource Management Strategy</strong> designed to solve a fundamental architectural bottleneck: PostgreSQL's <strong>Process-per-Connection</strong> model.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Overhead of a New Connection
    </h3>,
    <p key="3" className="mb-4">
      Every time a client connects to Postgres, the database must <code>fork()</code> a brand new OS process. This consumes ~10MB of RAM immediately and requires a heavy TLS 1.3 handshake. Doing this 1,000 times per second will melt your CPU.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Gauge} title="Without Pooling" subtitle="Cold connection per query" theme="rose">
        <p className="text-sm text-rose-200/80 mb-2">
          Your app opens and closes a TCP socket for every single <code>SELECT</code>.
        </p>
        <p className="text-sm text-rose-300 font-bold">Latency: High (+50ms per query)</p>
      </FeatureCard>
      <FeatureCard icon={DatabaseZap} title="With PgBouncer" subtitle="Warm shared connection pool" theme="emerald">
        <p className="text-sm text-emerald-200/80 mb-2">
          A tiny C daemon maintains a "warm" pool of connections. Your app talks to PgBouncer instantly.
        </p>
        <p className="text-sm text-emerald-300 font-bold">Latency: Ultra-Low (&lt;1ms per query)</p>
      </FeatureCard>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Pooling Modes (PgBouncer)
    </h3>,
    <Table
      key="6"
      headers={["Mode", "How it Works", "Trade-off"]}
      rows={[
        [
          "Session Mode",
          "The connection is locked to 1 client until they disconnect.",
          "Safest, but inefficient for high-concurrency apps."
        ],
        [
          "Transaction Mode",
          "The connection is returned to the pool as soon as a <code>COMMIT</code> is sent.",
          "Highest throughput. Does not support <code>SET</code> or <code>LISTEN/NOTIFY</code>."
        ],
        [
          "Statement Mode",
          "The connection is returned after every single query.",
          "Extreme scaling, but breaks multi-query transactions entirely."
        ]
      ]}
    />,
    <Callout key="7" type="warning" title="The Serverless Challenge">
      In <strong>AWS Lambda</strong> or <strong>Vercel</strong>, functions are ephemeral. If 1,000 Lambdas fire at once, they can't "share" a pool in-memory. You <strong>MUST</strong> use an external proxy like <strong>Supabase Connection Pooler</strong> or <strong>AWS RDS Proxy</strong> to act as a global traffic controller.
    </Callout>,
  ],
};
