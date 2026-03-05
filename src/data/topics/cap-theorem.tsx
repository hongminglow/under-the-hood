import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const capTheoremTopic: Topic = {
  id: "cap-theorem",
  title: "CAP Theorem",
  description:
    "The fundamental theoretical limit of distributed data stores: you can only pick two of three guarantees.",
  tags: ["databases", "architecture", "dist-systems"],
  icon: "DatabaseZapped",
  content: [
    <p key="1">
      Proposed by Eric Brewer in 2000, the CAP theorem states that any
      distributed data store can only provide two of the following three
      guarantees simultaneously. When a network partition happens, a system must
      choose between Consistency and Availability.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Three Pillars
    </h4>,
    <Grid key="3" cols={3} gap={6} className="mb-8">
      <Card title="Consistency (C)">
        <p className="text-sm">
          Every read receives the most recent write or an error. All nodes see
          the exact same data at the exact same time.
        </p>
      </Card>
      <Card title="Availability (A)">
        <p className="text-sm">
          Every request receives a non-error response, without the guarantee
          that it contains the most recent write.
        </p>
      </Card>
      <Card title="Partition Tolerance (P)">
        <p className="text-sm">
          The system continues to operate despite an arbitrary number of
          messages being dropped (or delayed) by the network between nodes.
        </p>
      </Card>
    </Grid>,
    <p key="4" className="mb-4">
      Because network partitions (P) are unavoidable in the real world (cables
      get cut, routers crash, switches fail), distributed systems <em>must</em>{" "}
      support Partition Tolerance. Thus, the real choice is between{" "}
      <strong>CP</strong> and <strong>AP</strong>.
    </p>,
    <Table
      key="5"
      headers={["System Type", "Choice", "Examples", "Use Case"]}
      rows={[
        [
          "CP (Consistent & Partition Tolerant)",
          "Rejects requests if it cannot guarantee up-to-date data.",
          "MongoDB, HBase, Redis, Etcd",
          "Financial transactions, billing platforms.",
        ],
        [
          "AP (Available & Partition Tolerant)",
          "Returns the local data it has, even if it might be stale.",
          "Cassandra, CouchDB, DynamoDB",
          "Social media feeds, messaging, analytics.",
        ],
        [
          "CA (Consistent & Available)",
          "Cannot handle network partitions. (Only exists in single-node systems).",
          "Traditional Single-node PostgreSQL / MySQL",
          "Legacy monolithic data stores.",
        ],
      ]}
    />,
    <Callout key="6" type="warning" title="PACELC Theorem Extension">
      The CAP theorem technically only applies <em>during a network outage</em>.
      The PACELC theorem expands on it: <strong>If Partition (P)</strong>, trade
      off <strong>Availability (A)</strong> or <strong>Consistency (C)</strong>.{" "}
      <strong>Else (E)</strong> (when running normally), trade off{" "}
      <strong>Latency (L)</strong> or <strong>Consistency (C)</strong>.
    </Callout>,
  ],
};
