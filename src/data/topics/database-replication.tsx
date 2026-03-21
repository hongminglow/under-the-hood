import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const databaseReplicationTopic: Topic = {
  id: "database-replication",
  title: "Database Replication (Primary/Replica)",
  description:
    "How to seamlessly handle 50,000 Read requests per second while having a perfectly synchronized instant backup server.",
  tags: ["database", "scale", "system-design"],
  icon: "Copy",
  content: [
    <p key="1">
      A single SQL database aggressively handling all reads and writes is a massive Single Point of Failure. If the hardware SSD burns out, your company completely flatlines. 
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Multi-Server Matrix
    </h3>,
    <p key="3" className="mb-4">
      Instead of `Sharding` (cutting data apart), we use <strong>Replication</strong> (copying the exact identical data everywhere perfectly).
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The Primary (The Boss)">
        <p className="text-sm text-muted-foreground">
          ALL `INSERT`, `UPDATE`, and `DELETE` queries strictly hit exactly one solitary central Primary Database. The moment the query mathematically finishes, the Primary securely writes it to an isolated WAL (Write-Ahead Log) log.
        </p>
      </Card>
      <Card title="The Replicas (The Workers)">
        <p className="text-sm text-muted-foreground">
          You spin up 5 cheap, massive "Read-Replica" databases organically scattered globally. They relentlessly ping the Primary saying, "What changed?!" and silently securely copy the logs. ALL thousands of fast `SELECT` queries strictly hit the 5 Replicas! Your Main DB practically sleeps.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Eventual Consistency Latency">
      Replication is inherently terribly Asynchronous. If a user beautifully updates their exact profile picture (Hitting Primary) and intensely instantly organically refreshes the exact page (Hitting Replica 3), they might stare at their completely old picture for 2 seconds! The data scientifically takes a few milliseconds to securely propagate globally!
    </Callout>,
    <Callout key="6" type="info" title="Automatic Failover">
      If the Primary Master machine physically catches fire, the network flawlessly initiates a strict global vote, natively promotes Replica 3 up to become the new Primary Boss, and perfectly resumes all write capabilities completely organically with zero downtime.
    </Callout>,
  ],
};
