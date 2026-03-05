import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const messageQueuesTopic: Topic = {
  id: "message-queues",
  title: "Message Queues & Event-Driven",
  description:
    "Decoupling services via asynchronous communication: Kafka, RabbitMQ, and the event-driven paradigm.",
  tags: ["architecture", "dist-systems", "kafka"],
  icon: "MailPlus",
  content: [
    <p key="1">
      In a tightly-coupled system, Service A calls Service B synchronously and
      waits. If B is slow or down, A fails too. <strong>Message Queues</strong>{" "}
      decouple producers from consumers by introducing an intermediary buffer
      where messages persist until processed.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Queuing vs Streaming
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Traditional Queue (RabbitMQ)">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Push-based:</strong> The broker actively pushes messages to
            consumers.
          </li>
          <li>
            Messages are <strong>deleted</strong> after acknowledgment.
          </li>
          <li>
            Great for task distribution (e.g., send emails, process payments).
          </li>
          <li>Supports complex routing (topic, fanout, headers).</li>
        </ul>
      </Card>
      <Card title="Event Log (Apache Kafka)">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Pull-based:</strong> Consumers poll the broker and track
            their own offset.
          </li>
          <li>
            Messages are <strong>retained</strong> (often for days/weeks).
            Multiple consumers can replay the stream.
          </li>
          <li>
            Great for event sourcing, analytics pipelines, and real-time
            streaming.
          </li>
          <li>Partitioned logs enable massive parallelism.</li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Feature", "RabbitMQ", "Apache Kafka"]}
      rows={[
        ["Delivery Model", "Push to consumers", "Pull by consumers"],
        ["Message Retention", "Deleted after ACK", "Retained by TTL/size"],
        ["Throughput", "Thousands/sec per queue", "Millions/sec per partition"],
        ["Use Case", "Task queues, RPC", "Event streaming, CQRS, analytics"],
        ["Ordering", "Per-queue FIFO", "Per-partition ordering guaranteed"],
      ]}
    />,
    <Callout key="5" type="tip" title="The CQRS + Event Sourcing Pattern">
      Instead of storing the <em>current state</em> of an entity (a bank account
      balance of $500), you store every <em>event</em> that led to it (Deposited
      $1000, Withdrew $300, Withdrew $200). Kafka's immutable log is the perfect
      backbone for this, enabling full audit trails, time-travel debugging, and
      rebuilding state from scratch.
    </Callout>,
  ],
};
