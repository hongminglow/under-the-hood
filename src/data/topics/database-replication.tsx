import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const databaseReplicationTopic: Topic = {
  id: "database-replication",
  title: "Database Replication Strategies",
  description:
    "How production databases clone data across multiple servers for fault tolerance, read scaling, and disaster recovery.",
  tags: ["databases", "system-design", "high-availability", "replication"],
  icon: "CopyPlus",
  content: [
    <p key="1">
      A single database server is a <strong>single point of failure</strong>. If
      it dies, your entire application goes down and data could be permanently
      lost. <strong>Replication</strong> solves this by maintaining identical
      copies of data across multiple servers in real-time.
    </p>,
    <p key="2" className="mt-4 mb-8">
      Every major database (PostgreSQL, MySQL, MongoDB) supports native
      replication, but the <em>topology</em> and <em>consistency model</em> you
      choose dramatically affects your system's behavior under failure.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Replication Topologies
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Primary–Replica (Master–Slave)">
        <p className="text-sm">
          One <strong>primary</strong> handles all writes. One or more{" "}
          <strong>replicas</strong> receive a copy of every write via a
          replication log (WAL in PostgreSQL, binlog in MySQL). Reads can be
          load-balanced across replicas. If the primary dies, a replica is{" "}
          <strong>promoted</strong>.
        </p>
      </Card>
      <Card title="Multi-Primary (Master–Master)">
        <p className="text-sm">
          Multiple nodes accept writes simultaneously. Increases write
          throughput but introduces <strong>write conflicts</strong> — two nodes
          modifying the same row at the same millisecond. Conflict resolution
          (last-write-wins, merge) is complex.
        </p>
      </Card>
      <Card title="Synchronous Replication">
        <p className="text-sm">
          The primary <strong>waits</strong> for at least one replica to confirm
          the write before acknowledging the client. Zero data loss guarantee,
          but <strong>higher latency</strong> on every write operation.
        </p>
      </Card>
      <Card title="Asynchronous Replication">
        <p className="text-sm">
          The primary acknowledges the write <strong>immediately</strong> and
          ships the change to replicas in the background. Fastest writes, but
          replicas can <strong>lag behind</strong> — reading from a replica
          might return stale data.
        </p>
      </Card>
    </Grid>,
    <Table
      key="5"
      headers={["Property", "Synchronous", "Asynchronous"]}
      rows={[
        [
          "Write Latency",
          "Higher (waits for replica ACK)",
          "Lowest (fire and forget)",
        ],
        [
          "Data Loss Risk",
          "Zero (replica confirmed)",
          "Possible (replica lag)",
        ],
        ["Read Consistency", "Strong consistency", "Eventual consistency"],
        [
          "Failure Impact",
          "Write blocked if replica down",
          "Writes continue unaffected",
        ],
        ["Use Case", "Banking, financial systems", "Social media, analytics"],
      ]}
    />,
    <Callout key="6" type="tip" title="Replication Lag: The Interview Trap">
      A user updates their profile (hits the primary), then immediately
      refreshes (hits a replica). They see <strong>stale data</strong> because
      the replica hasn't replicated yet. This is called{" "}
      <strong>"read-after-write inconsistency."</strong> Solutions:{" "}
      <em>read-your-own-writes</em> routing (force reads to primary for the same
      user who just wrote) or <em>causal consistency</em> tokens.
    </Callout>,
  ],
};
