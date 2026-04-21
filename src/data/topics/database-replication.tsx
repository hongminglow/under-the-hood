import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

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
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Synchronous vs Asynchronous Replication
    </h3>,
    <Table
      key="8"
      headers={["Type", "How It Works", "Trade-off"]}
      rows={[
        ["Asynchronous", "Primary commits immediately. Replicas sync in the background.", "Fast writes, but risk of data loss if Primary crashes before replication."],
        ["Synchronous", "Primary waits for at least 1 Replica to confirm before committing.", "Slower writes, but zero data loss. Used in financial systems."],
        ["Semi-Synchronous", "Primary waits for 1 Replica, others sync async.", "Balanced approach. Default in MySQL."]
      ]}
    />,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Read-After-Write Consistency Problem
    </h3>,
    <p key="10">
      User updates their email on the Primary. The app immediately redirects them to their profile page, which reads from a Replica. The Replica hasn't synced yet, so the old email displays. <strong>Solutions:</strong>
    </p>,
    <ul key="11" className="list-disc pl-6 space-y-2 text-sm">
      <li><strong>Sticky Sessions:</strong>&nbsp;Route the user to the same Replica for 5 seconds after a write.</li>
      <li><strong>Read-Your-Writes:</strong>&nbsp;Force critical reads (like "my profile") to hit the Primary.</li>
      <li><strong>Timestamp Tracking:</strong>&nbsp;Client sends the timestamp of their last write. Replica waits until it's caught up to that timestamp before responding.</li>
    </ul>,
  ],
};
