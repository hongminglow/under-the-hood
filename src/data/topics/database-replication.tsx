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
      A single SQL database handling all reads and writes is a Single Point of Failure. If the hardware fails, your application goes down. 
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Multi-Server Matrix
    </h3>,
    <p key="3" className="mb-4">
      Instead of `Sharding` (cutting data apart), we use <strong>Replication</strong> (copying the identical data to other servers).
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The Primary (The Boss)">
        <p className="text-sm text-muted-foreground">
          ALL `INSERT`, `UPDATE`, and `DELETE` queries strictly hit the Primary Database. The moment the query finishes, the Primary writes it to a WAL (Write-Ahead Log).
        </p>
      </Card>
      <Card title="The Replicas (The Workers)">
        <p className="text-sm text-muted-foreground">
          You spin up multiple "Read-Replica" databases globally. They ping the Primary to check for changes and copy the logs. Read queries (`SELECT`) hit the Replicas, offloading work from the Primary.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Eventual Consistency Latency">
      Replication is inherently Asynchronous. If a user updates their profile picture (Hitting Primary) and instantly refreshes the page (Hitting Replica 3), they might see their old picture for a few seconds. The data takes a few milliseconds to securely propagate globally!
    </Callout>,
    <Callout key="6" type="info" title="Automatic Failover">
      If the Primary Master node fails, the system can automatically initiate a global vote, promote a Replica to become the new Primary, and resume write capabilities with minimal downtime.
    </Callout>,
  ],
};
