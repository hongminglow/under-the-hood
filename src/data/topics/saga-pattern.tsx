import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const sagaPatternTopic: Topic = {
  id: "saga-pattern",
  title: "Saga Pattern (Distributed Transactions)",
  description:
    "How to maintain ACID-like consistency when operations span across multiple microservice databases without a shared transaction.",
  tags: ["architecture", "microservices", "system-design", "databases"],
  icon: "Orbit",
  content: [
    <p key="1">
      In a monolithic database, you use a simple <code>BEGIN TRANSACTION</code>. If an error occurs, you trigger a <code>ROLLBACK</code> and the database fixes itself. But in a <strong>Microservices Architecture</strong>, an "Order Placement" might involve 3 completely separate databases: Order DB, Inventory DB, and Payment DB.
    </p>,
    <p key="2" className="mt-4 mb-4">
      Because there is no single shared database, you <em>cannot</em>&nbsp;use a standard SQL <code>ROLLBACK</code>. If Payment fails, how do you un-reserve the Inventory? Enter the <strong>Saga Pattern</strong>.
    </p>,

    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      What is a Saga?
    </h3>,
    <p key="4" className="mb-4">
      A Saga is a sequence of <strong>local transactions</strong>&nbsp;where each microservice updates its own database and publishes an event to trigger the next step. If any step fails, the Saga executes <strong>compensating transactions</strong>&nbsp;to undo the work of preceding steps.
    </p>,
    <Flow
      key="5"
      steps={[
        { title: "1. Order Created", description: "Order Service: status = PENDING" },
        { title: "2. Inventory Reserved", description: "Inventory Service: items -= quantity" },
        { title: "3. Payment Processed", description: "Payment Service: charge card" },
        { title: "4. Order Confirmed", description: "Order Service: status = CONFIRMED" }
      ]}
    />,
    <Callout key="6" type="warning" title="What if Step 3 Fails?">
      If payment fails, we can't just <code>ROLLBACK</code> across services. Instead, we must execute <strong>compensating transactions</strong>: Inventory Service adds items back, Order Service sets status to CANCELLED.
    </Callout>,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      ACID vs BASE
    </h3>,
    <Table
      key="8"
      headers={["Model", "Guarantee", "System shape", "Tradeoff"]}
      rows={[
        [
          "ACID (Monoliths)",
          "Atomicity, Consistency, Isolation, Durability.",
          "One database controls the whole transaction boundary.",
          "Perfect local consistency, but poor fit for independently owned services.",
        ],
        [
          "BASE (Distributed Sagas)",
          "Basically Available, Soft state, Eventual consistency.",
          "Each service commits locally and compensates when later steps fail.",
          "Higher availability and service autonomy, but users may observe temporary states.",
        ],
      ]}
    />,

    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Saga Implementation: Choreography vs Orchestration
    </h3>,
    <Grid key="10" cols={2} gap={6} className="my-8">
      <Card title="Choreography (Event-Driven)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Decentralized</strong>. Each service produces and listens to events from other services.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Order Service
await db.orders.create({ status: 'PENDING' });
await eventBus.publish('OrderCreated', { orderId });

// Inventory Service listens
eventBus.on('OrderCreated', async (event) => {
  await reserveItems(event.orderId);
  await eventBus.publish('InventoryReserved', event);
});`}
        />
        <p className="text-xs italic text-muted-foreground mt-2">
          <strong>Pros</strong>: Simple, no single point of failure<br/>
          <strong>Cons</strong>: Hard to debug "event storms", difficult to track global state
        </p>
      </Card>
      <Card title="Orchestration (Centralized)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Centralized</strong>. A Saga Execution Coordinator (SEC) tells each service what to do.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Saga Orchestrator
class OrderSaga {
  async execute(orderId) {
    try {
      await orderService.create(orderId);
      await inventoryService.reserve(orderId);
      await paymentService.charge(orderId);
      await orderService.confirm(orderId);
    } catch (error) {
      await this.compensate(orderId);
    }
  }
}`}
        />
        <p className="text-xs italic text-muted-foreground mt-2">
          <strong>Pros</strong>: Easy to track, prevents cyclic dependencies<br/>
          <strong>Cons</strong>: Orchestrator can become a bottleneck
        </p>
      </Card>
    </Grid>,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Compensating Transactions: The 'Undo' Button
    </h3>,
    <Table
      key="12"
      headers={["Phase", "Forward Action", "Compensating Action"]}
      rows={[
        ["Order", "Create order (status: PENDING)", "Cancel order (status: CANCELLED)"],
        ["Inventory", "Reserve items (stock -= qty)", "Release items (stock += qty)"],
        ["Payment", "Charge card", "Refund card"],
        ["Shipping", "Create shipment", "Cancel shipment"]
      ]}
    />,
    <p key="13" className="mb-4">
      Each forward action must have a corresponding compensating action. When a step fails, the Saga executes compensations in <strong>reverse order</strong>.
    </p>,
    <CodeBlock
      key="14"
      title="Compensation Example"
      language="javascript"
      code={`class OrderSaga {
  async execute(orderId) {
    const completedSteps = [];
    
    try {
      await orderService.create(orderId);
      completedSteps.push('order');
      
      await inventoryService.reserve(orderId);
      completedSteps.push('inventory');
      
      await paymentService.charge(orderId); // FAILS HERE
      completedSteps.push('payment');
      
    } catch (error) {
      // Compensate in reverse order
      for (const step of completedSteps.reverse()) {
        if (step === 'inventory') {
          await inventoryService.release(orderId);
        }
        if (step === 'order') {
          await orderService.cancel(orderId);
        }
      }
      throw error;
    }
  }
}`}
    />,

    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      The Transactional Outbox Pattern
    </h3>,
    <p key="16" className="mb-4">
      <strong>Problem</strong>: What if a service updates its database but crashes before publishing the event to Kafka? The Saga gets stuck.
    </p>,
    <p key="17" className="mb-4">
      <strong>Solution</strong>: Use the <strong>Outbox Pattern</strong>. Write the event into an <code>outbox</code> table in the <em>same</em>&nbsp;local transaction as the data update. A separate process polls the table and publishes to the message broker.
    </p>,
    <CodeBlock
      key="18"
      title="Transactional Outbox"
      language="sql"
      code={`BEGIN TRANSACTION;

-- Update business data
INSERT INTO orders (id, status) VALUES (123, 'PENDING');

-- Write event to outbox (same transaction!)
INSERT INTO outbox (event_type, payload, created_at)
VALUES ('OrderCreated', '{"orderId": 123}', NOW());

COMMIT;

-- Separate process polls outbox and publishes to Kafka
SELECT * FROM outbox WHERE published = false ORDER BY created_at;`}
    />,
    <Callout key="19" type="success" title="Guaranteed Event Delivery">
      Because the event is written in the same transaction as the data, either both succeed or both fail. No lost events.
    </Callout>,

    <h3 key="20" className="text-xl font-bold mt-8 mb-4">
      The Lack of Isolation Problem
    </h3>,
    <p key="21" className="mb-4">
      Sagas do not have <strong>Isolation</strong>&nbsp;(the 'I' in ACID). Other users might see intermediate "soft state" while the Saga is running.
    </p>,
    <Card key="22" title="Example: Dirty Reads">
      <p className="text-sm text-slate-300 leading-relaxed mb-2">
        User A starts a Saga to buy the last iPhone. Inventory is reserved (stock = 0). User B tries to buy the same iPhone and sees "Out of Stock". But then User A's payment fails, and the Saga compensates by releasing the inventory. User B missed their chance due to a temporary state.
      </p>
    </Card>,
    <Table
      key="23"
      headers={["Mitigation", "How it works", "Best when"]}
      rows={[
        [
          "Semantic locks",
          "Add a reserved_by or pending state so other users see Reserved instead of a misleading final state.",
          "The resource has a human-visible reservation window.",
        ],
        [
          "Versioning",
          "Use optimistic locking with version numbers; if two Sagas modify the same resource, one fails and retries.",
          "Conflicts are rare but correctness still matters.",
        ],
      ]}
    />,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Real-World Examples
    </h3>,
    <Table
      key="25"
      headers={["System", "Saga path", "Failure response", "Coordination style"]}
      rows={[
        [
          "Uber ride booking",
          "Create ride -> find driver -> reserve driver -> charge rider -> confirm ride.",
          "If payment fails, release the driver and cancel the ride.",
          "Orchestration with a central Saga coordinator.",
        ],
        [
          "Amazon order fulfillment",
          "Validate order -> reserve inventory -> process payment -> create shipment -> update order status.",
          "If a later step fails, previous services publish compensating events.",
          "Choreography with event-driven microservices.",
        ],
      ]}
    />,

    <h3 key="27" className="text-xl font-bold mt-8 mb-4">
      When NOT to Use Sagas
    </h3>,
    <Callout key="28" type="warning" title="Sagas Add Complexity">
      Don't use Sagas if you can avoid distributed transactions entirely:
      <ul className="text-sm mt-2 space-y-1">
        <li>• <strong>Keep it monolithic</strong>: If your data fits in one database, don't split it</li>
        <li>• <strong>Eventual consistency is OK</strong>: Some operations don't need immediate consistency</li>
        <li>• <strong>Use 2PC if possible</strong>: If all databases support XA transactions (rare in cloud)</li>
      </ul>
    </Callout>,

    <h3 key="29" className="text-xl font-bold mt-8 mb-4">
      Saga vs Two-Phase Commit (2PC)
    </h3>,
    <Table
      key="30"
      headers={["Feature", "Saga Pattern", "Two-Phase Commit (2PC)"]}
      rows={[
        ["Consistency", "Eventual", "Immediate (ACID)"],
        ["Availability", "High (services independent)", "Low (coordinator blocks)"],
        ["Complexity", "High (compensations)", "Medium (protocol overhead)"],
        ["Failure Handling", "Compensating transactions", "Automatic rollback"],
        ["Use Case", "Microservices, cloud-native", "Monoliths, legacy systems"]
      ]}
    />,

    <Callout key="31" type="tip" title="Decision Guide">
      <strong>Use Sagas when</strong>: You have microservices with separate databases, need high availability, and can tolerate eventual consistency.<br/><br/>
      <strong>Avoid Sagas when</strong>: You can use a single database, need strict ACID guarantees, or operations are simple enough to not need distributed transactions.
    </Callout>,
  ],
};
