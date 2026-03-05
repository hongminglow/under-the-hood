import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const distributedTransactionsTopic: Topic = {
  id: "saga-distributed-transactions",
  title: "Saga Pattern (Distributed Transact...)",
  description:
    "How to maintain ACID-like atomicity when operations span across 5 different microservice databases.",
  tags: ["architecture", "microservices", "databases", "patterns"],
  icon: "GitBranch",
  content: [
    <p key="1">
      In a monolithic database, you use a simple `BEGIN TRANSACTION`. If an
      error occurs, you trigger a `ROLLBACK` and the database fixes itself.
    </p>,
    <p key="2" className="mt-4 mb-8">
      However, in a <strong>Microservices Architecture</strong>, an "Order
      Placement" might involve 3 completely separate databases: The "Order DB",
      the "Inventory DB", and the "Payment DB". Because there is no single
      shared database, you <em>cannot</em> use a standard SQL `ROLLBACK`. If
      Payment fails, how do you un-reserve the Inventory?
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Saga Pattern
    </h4>,
    <p key="4" className="mb-4">
      A Saga is a sequence of local transactions. Each microservice updates its
      local database and immediately publishes an Event (via Kafka/RabbitMQ) to
      trigger the next microservice.
    </p>,
    <Step key="5" index={1}>
      Order Service creates status: <code>PENDING</code>. Publishes "Order
      Created".
    </Step>,
    <Step key="6" index={2}>
      Inventory Service reserves items. Publishes "Inventory Reserved".
    </Step>,
    <Step key="7" index={3}>
      Payment Service tries to charge card. <strong>FAILED!</strong> Publishes
      "Payment Failed".
    </Step>,
    <h4 key="8" className="text-xl font-bold mt-8 mb-4">
      Compensating Transactions
    </h4>,
    <Grid key="9" cols={2} gap={6} className="mb-4">
      <Card title="The Hard Reversal">
        Because the initial local databases committed their rows, you must write
        custom <em>"Compensating"</em> logic.
      </Card>
      <Card title="The Workflow">
        When the Inventory Service hears "Payment Failed", it executes a brand
        new transaction to ADD the items back to the pool. When Order Service
        hears it, it updates status to <code>CANCELLED</code>.
      </Card>
    </Grid>,
    <Callout key="10" type="warning" title="Choreography vs Orchestrator">
      In a <em>Choreography Saga</em>, microservices just listen to
      decentralized events blindly. This becomes spaghetti fast. In an{" "}
      <em>Orchestrator Saga</em>, a central controller microservice holds the
      state machine, tells every sub-service exactly what to do, and tracks
      compensation rollbacks.
    </Callout>,
  ],
};
