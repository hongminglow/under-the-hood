import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const messageQueuesTopic: Topic = {
  id: "message-queues",
  title: "Message Queues (Kafka & RabbitMQ)",
  description:
    "How to handle chaotic Black Friday traffic spikes by decoupling instant APIs from massive background processing.",
  tags: ["backend", "system-design", "async"],
  icon: "ListOrdered",
  content: [
    <p key="1">
      If an e-commerce user hits "Buy", your API needs to charge their card, update inventory, email them a receipt, and notify shipping. If your API does all 4 of these synchronously, the user is staring at a freezing loading spinner for 12 seconds.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Asynchronous Decoupling
    </h3>,
    <p key="3" className="mb-4">
      Instead, your API instantly charges their card, drops a tiny JSON message into a <strong>Message Queue</strong> reading <code>{"{\"type\": \"OrderPlaced\", \"id\": 55}"}</code>, and immediately returns <code>200 Success</code> to the user in 100 milliseconds.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The Producer (Your API)" description="Fast and Forgetful">
        <p className="text-sm text-muted-foreground">
          It blindly drops messages onto the conveyor belt and walks away. It never cares who processes the email or how long it takes.
        </p>
      </Card>
      <Card title="The Workers (Consumers)" description="Slow and Steady">
        <p className="text-sm text-muted-foreground">
          Five separate background servers blindly pull tasks off the conveyor belt to send emails. If Black Friday happens and 10,000 orders drop on the belt, the API never crashes. The Workers just peacefully spend the next hour chewing through the backlog line.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="RabbitMQ vs Kafka">
      <strong>RabbitMQ</strong> is a traditional active queue: Once the Email server reads the message, it is permanently deleted from the queue immediately. <br/><br/>
      <strong>Apache Kafka</strong> is a brutal immutable log: Messages are <em>never</em> deleted. Hundreds of different microservices can replay the entire history of every order ever placed from the very beginning of time.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Message Delivery Guarantees
    </h3>,
    <Table
      key="7"
      headers={["Guarantee", "Behavior", "Risk"]}
      rows={[
        ["At-Most-Once", "Fire and forget. If the worker crashes, the message is lost.", "Data loss. Fast but unreliable."],
        ["At-Least-Once", "Message is redelivered until acknowledged. Worker might process it twice.", "Duplicate processing. Requires idempotent handlers."],
        ["Exactly-Once", "Message is processed exactly once, guaranteed.", "Complex to implement. Kafka supports this with transactions."]
      ]}
    />,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Dead Letter Queues (DLQ)
    </h3>,
    <p key="9">
      What if a message is malformed and crashes the worker every time? After 3 failed retries, the message is moved to a <strong>Dead Letter Queue</strong>&nbsp;for manual inspection. This prevents one bad message from blocking the entire queue.
    </p>,
    <CodeBlock
      key="10"
      language="json"
      title="Example Message"
      code={`{
  "type": "OrderPlaced",
  "orderId": 12345,
  "userId": 789,
  "timestamp": "2026-04-14T10:30:00Z",
  "retryCount": 0
}`}
    />,
  ],
};
