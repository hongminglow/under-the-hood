import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const sagaPatternTopic: Topic = {
  id: "saga-pattern",
  title: "The Saga Pattern (Distributed Transactions)",
  description:
    "How to process an Uber order when the Payment database and the Driver database refuse to talk to each other.",
  tags: ["architecture", "microservices", "system-design"],
  icon: "Orbit",
  content: [
    <p key="1">
      The Saga pattern is a failure management strategy for <strong>Distributed Systems</strong>. In a microservices architecture, you cannot use standard ACID transactions across multiple databases. A Saga coordinates a sequence of local transactions to ensure <strong>Eventual Consistency</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      ACID vs. BASE
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      Monoliths aim for <strong>ACID</strong> (Atomicity, Consistency, Isolation, Durability). Distributed Sagas settle for <strong>BASE</strong> (Basically Available, Soft state, Eventual consistency).
    </p>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Saga Implementation Patterns
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Choreography (Event-Driven)">
        <p className="text-sm text-muted-foreground mb-2">
          Decentralized. Each service produces and listens to events from other services.
        </p>
        <p className="text-xs italic text-muted-foreground">
          <strong>Pros:</strong> Simple for few services. No single point of failure. <strong>Cons:</strong> Hard to debug "Event Storms". Hard to track global state.
        </p>
      </Card>
      <Card title="Orchestration (Centralized)">
        <p className="text-sm text-muted-foreground mb-2">
          Centralized. A "Saga Execution Coordinator" (SEC) tells each service what to do.
        </p>
        <p className="text-xs italic text-muted-foreground">
          <strong>Pros:</strong> Easy to track complex workflows. Prevents cyclic dependencies. <strong>Cons:</strong> The Orchestrator can become a bottleneck.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The 'Undo' Button: Compensating Transactions
    </h3>,
    <Table
      key="7"
      headers={["Phase", "Action", "Failure Scenario"]}
      rows={[
        ["Forward Action", "Service A reserves inventory.", "Success: Move to Service B."],
        ["The Crash", "Service B fails to process payment.", "Trigger 'Undo' for Service A."],
        ["Compensating Action", "Service A <strong>un-reserves</strong> inventory.", "Restores system to a consistent state."]
      ]}
    />,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Reliability: The Transactional Outbox
    </h3>,
    <p key="9" className="mb-4">
      What if a service updates its database but crashes before it can send the 'Success' event to Kafka? Use the <strong>Outbox Pattern</strong>: write the event into an <code>Outbox</code> table in the <em>same</em> local transaction as the data update. A separate process then polls the table and publishes to the message broker.
    </p>,
    <Callout key="10" type="danger" title="The 'Lack of Isolation' Problem">
      Sagas do not have <strong>Isolation</strong> (the 'I' in ACID). Other users might see the "Soft State" (e.g., an item marked as 'Reserved' but not yet 'Paid') while the Saga is still running. Use <strong>Semantic Locks</strong> or <strong>Versioning</strong> to mitigate this risk.
    </Callout>,
  ],
};
