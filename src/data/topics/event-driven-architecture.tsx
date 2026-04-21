import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const eventDrivenArchitectureTopic: Topic = {
  id: "event-driven-architecture",
  title: "Event-Driven Architecture",
  description:
    "Moving from tight synchronous function calls to asynchronous Publish-Subscribe models.",
  tags: ["architecture", "system-design", "async"],
  icon: "PlaySquare",
  content: [
    <p key="1">
      In a standard REST architecture, the `Order Service` makes a strict HTTP GET call to the `Inventory Service` to check warehouse stock. What happens if the Inventory team goes completely offline for a 3-hour database maintenance window? The `Order Service` instantly breaks, and you lose $50,000 in sales.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Publish, Don't Point
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Synchronous Web">
        <p className="text-sm text-slate-400 mb-2">
          Services are strictly coupled. They specifically demand things from each other: `EmailServer.send(userId)`. When one server struggles, the latency propagates mathematically across all tight functions until the entire app freezes.
        </p>
      </Card>
      <Card title="Event-Driven (PubSub)">
        <p className="text-sm text-slate-400">
          The `Order Service` never talks to the `Email Service`. Instead, when an order is placed, it just screams a message into the void (Kafka/RabbitMQ): "EVENT OCCURRED: USER 5 ORDERED A MACBOOK." 
        </p>
      </Card>
    </Grid>,
    <p key="4" className="mb-4">
      The `Email Service` is constantly independently listening to that Kafka queue. It hears the scream, picks it up, and emails the user. The `Inventory Service` also happened to be organically listening, and deducts a MacBook independently.
    </p>,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Delivery Guarantees: The Hard Part
    </h3>,
    <Table
      key="6"
      headers={["Guarantee", "How It Works", "Risk"]}
      rows={[
        ["At-Most-Once", "Fire and forget. The broker delivers the message once and doesn't retry.", "Messages can be permanently lost if the consumer crashes mid-processing."],
        ["At-Least-Once", "The broker retries until the consumer acknowledges (ACK). If ACK is lost, the message is re-delivered.", "The consumer may process the same event twice. You MUST handle duplicates."],
        ["Exactly-Once", "Achieved via idempotent consumers + transactional outbox patterns. Extremely expensive.", "Near impossible at the broker level alone. Requires application-level cooperation."]
      ]}
    />,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Idempotency: Surviving Duplicate Events
    </h3>,
    <p key="7a" className="mb-4">
      With At-Least-Once delivery (the industry default), your consumer <strong>will</strong> receive duplicates. If the "Order Placed" event fires twice, you must not charge the customer twice or ship two MacBooks.
    </p>,
    <Grid key="7b" cols={2} gap={6} className="my-8">
      <Card title="Idempotency Key">
        <p className="text-sm text-slate-400">
          Every event carries a unique <code>event_id</code>. Before processing, the consumer checks a <strong>deduplication table</strong> (Redis SET or DB unique constraint). If the ID exists, skip processing silently.
        </p>
      </Card>
      <Card title="Transactional Outbox">
        <p className="text-sm text-slate-400">
          Instead of publishing events directly to Kafka, the producer writes the event to an <strong>outbox table</strong> inside the same database transaction as the business write. A separate poller reads the outbox and publishes to the broker. This guarantees the event is published if and only if the business write succeeds.
        </p>
      </Card>
    </Grid>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Dead Letter Queues (DLQs)
    </h3>,
    <p key="8a" className="mb-4">
      What happens when a consumer <strong>permanently</strong> cannot process an event? (e.g., malformed JSON, missing required field, downstream API permanently removed). After N retry attempts, the broker moves the "poison" message to a <strong>Dead Letter Queue</strong> — a separate queue for failed events. Engineers can inspect, fix, and replay DLQ messages later without blocking the main consumer.
    </p>,

    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Event Sourcing vs. Event-Driven
    </h3>,
    <Table
      key="10"
      headers={["Concept", "What It Is", "When to Use"]}
      rows={[
        ["Event-Driven Architecture", "Services communicate via events through a broker. Each service maintains its own current state.", "Decoupling microservices, async workflows, notification fanout."],
        ["Event Sourcing", "The event log IS the database. Current state is derived by replaying all historical events from the beginning.", "Audit-heavy domains (banking, healthcare), time-travel debugging, CQRS."]
      ]}
    />,

    <Callout key="11" type="tip" title="The Benefit of Extensibility">
      A year later, the Data Science team wants to track all orders in real-time. Without Event-Driven architecture, you have to formally update the `Order Service` codebase to physically run `DataScienceServer.push()`. With EDA, they just silently subscribe to the Kafka queue entirely independently. The `Order Service` doesn't even know they exist!
    </Callout>,

    <Callout key="12" type="warning" title="Ordering Guarantees">
      Events within a Kafka <strong>partition</strong> are strictly ordered, but across partitions they are not. If you need "Order Created" to always arrive before "Order Shipped," both events must share the same <strong>partition key</strong> (e.g., <code>order_id</code>). Misunderstanding this is the #1 cause of event-driven bugs.
    </Callout>,
  ],
};
