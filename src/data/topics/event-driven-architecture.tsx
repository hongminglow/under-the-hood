import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const eventDrivenArchitectureTopic: Topic = {
  id: "event-driven-architecture",
  title: "Event-Driven Architecture",
  description:
    "The architectural paradigm where services communicate through events instead of direct API calls — powering Kafka, CQRS, and Event Sourcing.",
  tags: ["architecture", "kafka", "cqrs", "event-sourcing"],
  icon: "Zap",
  content: [
    <p key="1">
      In a traditional request-driven architecture, Service A directly calls
      Service B's API and <strong>waits for a response</strong>. This creates{" "}
      <strong>tight coupling</strong> — if Service B is slow or down, Service A
      is stuck. <strong>Event-Driven Architecture (EDA)</strong> decouples
      services by having them communicate through{" "}
      <strong>asynchronous events</strong> published to a message broker.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Core Patterns
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Event Notification">
        <p className="text-sm">
          A service emits a lightweight event like{" "}
          <code>{`{ "type": "OrderPlaced", "orderId": 42 }`}</code>. Consumers
          receive the notification and fetch full details from the source if
          needed. Minimal coupling.
        </p>
      </Card>
      <Card title="Event-Carried State Transfer">
        <p className="text-sm">
          The event carries the <strong>full payload</strong>:{" "}
          <code>{`{ "type": "OrderPlaced", "order": { ... } }`}</code>.
          Consumers don't need to call back. Eliminates round-trips but
          increases event size.
        </p>
      </Card>
      <Card title="Event Sourcing">
        <p className="text-sm">
          Instead of storing <em>current state</em>, you store a{" "}
          <strong>log of every state change</strong> (events). The current state
          is derived by replaying all events. Gives you a complete audit trail
          and time-travel debugging.
        </p>
      </Card>
      <Card title="CQRS (Command Query Separation)">
        <p className="text-sm">
          <strong>Commands</strong> (writes) and <strong>Queries</strong>{" "}
          (reads) use separate models. Writes go to a normalized database. Reads
          are served from a{" "}
          <strong>denormalized, pre-computed read model</strong> (often
          projected from events).
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Aspect", "Request-Driven", "Event-Driven"]}
      rows={[
        [
          "Coupling",
          "Tight (direct API dependency)",
          "Loose (events via broker)",
        ],
        [
          "Failure Impact",
          "Cascading failures",
          "Events buffered; retry later",
        ],
        ["Latency", "Synchronous — predictable", "Asynchronous — eventual"],
        [
          "Scalability",
          "Vertical (bigger servers)",
          "Horizontal (add consumers)",
        ],
        ["Debugging", "Linear request traces", "Complex distributed traces"],
        [
          "Data Consistency",
          "Strong (immediate)",
          "Eventual (requires idempotency)",
        ],
      ]}
    />,
    <Callout key="5" type="warning" title="The Hidden Cost of EDA">
      Event-Driven Architecture introduces <strong>eventual consistency</strong>
      , <strong>message ordering challenges</strong>, and{" "}
      <strong>idempotency requirements</strong>. If you can't answer "what
      happens when an event is processed twice?" in an interview, you haven't
      understood EDA deeply enough.
    </Callout>,
  ],
};
