import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Highlight as HighlightText } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Send, Boxes, Rabbit, Radio } from "lucide-react";

export const messageQueuesTopic: Topic = {
	id: "message-queues",
	title: "Message Queues (Kafka & RabbitMQ)",
	description:
		"How to handle chaotic Black Friday traffic spikes by decoupling instant APIs from massive background processing.",
	tags: ["backend", "system-design", "async"],
	icon: "ListOrdered",
	content: [
		<p key="1">
			If an e-commerce user hits "Buy", your API needs to charge their card, update inventory, email them a receipt, and
			notify shipping. If your API does all 4 of these synchronously, the user is staring at a freezing loading spinner
			for 12 seconds.
		</p>,
		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			Asynchronous Decoupling
		</h3>,
		<p key="3" className="mb-4">
			Instead, your API instantly charges their card, drops a tiny JSON message into a <strong>Message Queue</strong>{" "}
			reading <code>{'{"type": "OrderPlaced", "id": 55}'}</code>, and immediately returns <code>200 Success</code> to
			the user in 100 milliseconds.
		</p>,
		<Grid key="4" cols={2} gap={6} className="my-8">
			<FeatureCard icon={Send} title="The Producer (Your API)" subtitle="Fast and forgetful" theme="cyan">
				<p className="text-sm text-cyan-100/75">
					It blindly drops messages onto the conveyor belt and walks away. It never cares who processes the email or how
					long it takes.
				</p>
			</FeatureCard>
			<FeatureCard icon={Boxes} title="The Workers (Consumers)" subtitle="Slow and steady" theme="emerald">
				<p className="text-sm text-emerald-100/75">
					Five separate background servers blindly pull tasks off the conveyor belt to send emails. If Black Friday
					happens and 10,000 orders drop on the belt, the API never crashes. The Workers just peacefully spend the next
					hour chewing through the backlog line.
				</p>
			</FeatureCard>
		</Grid>,
		<Callout key="5" type="tip" title="RabbitMQ vs Kafka">
			<strong>RabbitMQ</strong> is a traditional active queue: Once the Email server reads the message, it is
			permanently deleted from the queue immediately. <br />
			<br />
			<strong>Apache Kafka</strong> is a brutal immutable log: Messages are <em>never</em> deleted. Hundreds of
			different microservices can replay the entire history of every order ever placed from the very beginning of time.
		</Callout>,
		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			Message Delivery Guarantees
		</h3>,
		<Table
			key="7"
			headers={["Guarantee", "Behavior", "Risk"]}
			rows={[
				[
					"At-Most-Once",
					"Fire and forget. If the worker crashes, the message is lost.",
					"Data loss. Fast but unreliable.",
				],
				[
					"At-Least-Once",
					"Message is redelivered until acknowledged. Worker might process it twice.",
					"Duplicate processing. Requires idempotent handlers.",
				],
				[
					"Exactly-Once",
					"Message is processed exactly once, guaranteed.",
					"Complex to implement. Kafka supports this with transactions.",
				],
			]}
		/>,
		<h3 key="8" className="text-xl font-bold mt-8 mb-4">
			Dead Letter Queues (DLQ)
		</h3>,
		<p key="9">
			What if a message is malformed and crashes the worker every time? After 3 failed retries, the message is moved to
			a <strong>Dead Letter Queue</strong>&nbsp;for manual inspection. This prevents one bad message from blocking the
			entire queue.
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

		<h3 key="11" className="text-xl font-bold mt-8 mb-4">
			The Problem Message Queues Solve
		</h3>,
		<Grid key="12" cols={2} gap={6} className="my-8">
			<Card title="Traffic Spike Protection">
				<p className="text-sm text-muted-foreground mb-2">Black Friday: 10,000 orders/sec → 100 orders/sec.</p>
				<p className="text-xs italic text-muted-foreground">
					Without queues, your API servers crash under load. With queues, the API accepts all 10,000 orders instantly
					(writes to queue in 1ms), returns success, and workers process them over the next hour. The queue acts as a{" "}
					<strong>shock absorber</strong>.
				</p>
			</Card>
			<Card title="Decoupling Services">
				<p className="text-sm text-muted-foreground mb-2">Order Service doesn't know Email Service exists.</p>
				<p className="text-xs italic text-muted-foreground">
					Order Service publishes "OrderPlaced" event. Email Service, SMS Service, Analytics Service all subscribe
					independently. You can add new consumers without touching the producer. This is{" "}
					<strong>event-driven architecture</strong>.
				</p>
			</Card>
			<Card title="Retry & Fault Tolerance">
				<p className="text-sm text-muted-foreground mb-2">Email service crashes? Message stays in queue.</p>
				<p className="text-xs italic text-muted-foreground">
					If a worker crashes mid-processing, the message isn't lost. It becomes "visible" again after a timeout and
					another worker picks it up. With <HighlightText variant="primary">at-least-once delivery</HighlightText>, no
					message is ever lost.
				</p>
			</Card>
			<Card title="Rate Limiting Downstream">
				<p className="text-sm text-muted-foreground mb-2">Third-party API allows 100 req/sec max.</p>
				<p className="text-xs italic text-muted-foreground">
					Your app receives 1000 orders/sec but Stripe only allows 100 charges/sec. Queue buffers the requests, and
					workers consume at exactly 100/sec to avoid rate limit errors.
				</p>
			</Card>
		</Grid>,

		<h3 key="13" className="text-xl font-bold mt-8 mb-4">
			Kafka vs RabbitMQ vs SQS vs MQTT: The Complete Comparison
		</h3>,
		<Table
			key="14"
			headers={["Feature", "RabbitMQ", "Apache Kafka", "AWS SQS", "MQTT"]}
			rows={[
				["Architecture", "Message Broker (queue)", "Distributed Log (stream)", "Managed Queue (AWS)", "Pub/Sub (IoT)"],
				[
					"Message Retention",
					"Deleted after consumption",
					"Retained for days/weeks",
					"Max 14 days",
					"Not retained (fire-and-forget)",
				],
				["Throughput", "10k-50k msg/sec", "1M+ msg/sec", "Unlimited (AWS scales)", "100k+ msg/sec"],
				["Ordering Guarantee", "Per queue", "Per partition", "FIFO queues only", "Per topic"],
				["Replay Messages", "❌ No", "✅ Yes (rewind offset)", "❌ No", "❌ No"],
				["Use Case", "Task queues, RPC", "Event streaming, logs", "Serverless, AWS-native", "IoT sensors, real-time"],
				["Latency", "< 10ms", "< 5ms", "~100ms (network)", "< 1ms"],
				["Complexity", "Medium", "High (Zookeeper/KRaft)", "Low (managed)", "Low"],
				["Multi-Consumer", "Competing consumers", "Consumer groups", "Multiple queues", "All subscribers get copy"],
			]}
		/>,

		<h3 key="15" className="text-xl font-bold mt-8 mb-4">
			When to Use Each Technology
		</h3>,
		<Grid key="16" cols={2} gap={6} className="my-8">
			<FeatureCard icon={Rabbit} title="Use RabbitMQ When..." subtitle="Broker-style task queue" theme="amber">
				<ul className="text-xs text-amber-100/75 space-y-1 list-disc pl-4">
					<li>
						<strong>Task queues:</strong>&nbsp;Background jobs (email, image processing)
					</li>
					<li>
						<strong>RPC patterns:</strong>&nbsp;Request-reply with correlation IDs
					</li>
					<li>
						<strong>Complex routing:</strong>&nbsp;Topic exchanges, routing keys, bindings
					</li>
					<li>
						<strong>Priority queues:</strong>&nbsp;High-priority messages jump the line
					</li>
					<li>
						<strong>Small-medium scale:</strong>&nbsp;10k-50k messages/sec
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Radio} title="Use Kafka When..." subtitle="Replayable distributed log" theme="violet">
				<ul className="text-xs text-violet-100/75 space-y-1 list-disc pl-4">
					<li>
						<strong>Event streaming:</strong>&nbsp;Audit logs, user activity, CDC
					</li>
					<li>
						<strong>Replay needed:</strong>&nbsp;Reprocess last 7 days of events
					</li>
					<li>
						<strong>High throughput:</strong>&nbsp;1M+ messages/sec
					</li>
					<li>
						<strong>Multiple consumers:</strong>&nbsp;Analytics, ML, search all read same stream
					</li>
					<li>
						<strong>Event sourcing:</strong>&nbsp;Rebuild state from event log
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Boxes} title="Use AWS SQS When..." subtitle="Managed queue for AWS-native stacks" theme="cyan">
				<ul className="text-xs text-cyan-100/75 space-y-1 list-disc pl-4">
					<li>
						<strong>AWS-native:</strong>&nbsp;Lambda triggers, S3 events
					</li>
					<li>
						<strong>Zero ops:</strong>&nbsp;No servers to manage, auto-scales
					</li>
					<li>
						<strong>Serverless:</strong>&nbsp;Pay per message, not per hour
					</li>
					<li>
						<strong>Simple queues:</strong>&nbsp;No complex routing needed
					</li>
					<li>
						<strong>FIFO guarantees:</strong>&nbsp;SQS FIFO queues (300 msg/sec limit)
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Send} title="Use MQTT When..." subtitle="Lightweight pub/sub for devices" theme="emerald">
				<ul className="text-xs text-emerald-100/75 space-y-1 list-disc pl-4">
					<li>
						<strong>IoT devices:</strong>&nbsp;Sensors, smart home, wearables
					</li>
					<li>
						<strong>Low bandwidth:</strong>&nbsp;2G/3G networks, satellite
					</li>
					<li>
						<strong>Real-time pub/sub:</strong>&nbsp;Chat, live dashboards
					</li>
					<li>
						<strong>Lightweight:</strong>&nbsp;Runs on microcontrollers (ESP32)
					</li>
					<li>
						<strong>QoS levels:</strong>&nbsp;Fire-and-forget, at-least-once, exactly-once
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h3 key="17" className="text-xl font-bold mt-8 mb-4">
			Kafka Deep Dive: Why It's Different
		</h3>,
		<p key="18" className="mb-4">
			Kafka isn't a queue—it's an <strong>immutable, distributed commit log</strong>. Messages are never deleted after
			consumption. Instead, each consumer tracks its <strong>offset</strong>&nbsp;(position in the log). This enables
			powerful patterns impossible with traditional queues.
		</p>,
		<CodeBlock
			key="19"
			title="Kafka Consumer Groups & Offsets"
			language="javascript"
			code={`// Consumer Group: "email-service"
// Partition 0: [msg1, msg2, msg3, msg4, msg5]
//                              ↑ offset = 3

// If consumer crashes and restarts:
consumer.seek({ partition: 0, offset: 3 });  // Resume from offset 3

// Replay last 24 hours of events:
const yesterday = Date.now() - 86400000;
consumer.seekToTimestamp(yesterday);  // Rewind to timestamp

// Multiple consumer groups read independently:
// - "email-service" at offset 1000
// - "analytics-service" at offset 500
// - "ml-training" at offset 0 (reading from beginning)`}
		/>,

		<h3 key="20" className="text-xl font-bold mt-8 mb-4">
			Real-World War Story: Uber's Kafka Migration
		</h3>,
		<p key="21" className="mb-4">
			In 2015, Uber was using RabbitMQ for trip events. As they scaled to 1M trips/day, RabbitMQ couldn't keep up.
			Messages were lost during broker restarts. They migrated to Kafka and unlocked new capabilities.
		</p>,
		<Grid key="22" cols={2} gap={6} className="my-8">
			<Card title="Before Kafka (RabbitMQ)">
				<ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
					<li>Messages deleted after consumption (no replay)</li>
					<li>Broker restarts = lost messages</li>
					<li>Couldn't rebuild driver location history</li>
					<li>Analytics team had to scrape databases</li>
				</ul>
			</Card>
			<Card title="After Kafka">
				<ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
					<li>All trip events retained for 30 days</li>
					<li>ML team replays events to train models</li>
					<li>Fraud detection analyzes historical patterns</li>
					<li>Zero data loss during deployments</li>
				</ul>
			</Card>
		</Grid>,

		<h3 key="23" className="text-xl font-bold mt-8 mb-4">
			Common Message Queue Mistakes
		</h3>,
		<MistakeCard
			key="24"
			number={1}
			title="Non-Idempotent Message Handlers"
			problem="With at-least-once delivery, messages can be processed twice. If your handler charges a credit card or increments a counter without checking for duplicates, you'll double-charge users or corrupt data."
			solution="Make handlers idempotent: check if message was already processed (use message ID in database), or design operations to be naturally idempotent (SET status = 'paid' instead of INCREMENT balance)."
		>
			<CodeBlock
				language="javascript"
				code={`// BAD: Not idempotent
async function handleOrder(message) {
  await db.query('UPDATE inventory SET stock = stock - 1');
  await chargeCard(message.amount);  // Charges twice if retried!
}

// GOOD: Idempotent with deduplication
async function handleOrder(message) {
  const processed = await db.query(
    'SELECT 1 FROM processed_messages WHERE id = ?',
    [message.id]
  );
  if (processed) return;  // Already processed
  
  await db.transaction(async (tx) => {
    await tx.query('UPDATE inventory SET stock = stock - 1');
    await tx.query('INSERT INTO processed_messages (id) VALUES (?)', [message.id]);
  });
  await chargeCard(message.amount);
}`}
			/>
		</MistakeCard>,
		<MistakeCard
			key="25"
			number={2}
			title="Ignoring Message Ordering"
			problem="Messages can arrive out of order. If you process 'UserDeleted' before 'UserCreated', your system breaks. RabbitMQ doesn't guarantee order across multiple consumers. Kafka only guarantees order within a partition."
			solution="For Kafka: use the same partition key for related messages (e.g., userId). For RabbitMQ: use a single consumer or message groups. Or design your system to handle out-of-order events (event sourcing with version numbers)."
		/>,
		<MistakeCard
			key="26"
			number={3}
			title="Poison Messages Blocking the Queue"
			problem="A malformed message crashes the worker. Worker restarts, picks up the same message, crashes again. Infinite loop. The entire queue is blocked."
			solution="Implement retry limits (max 3 attempts) and Dead Letter Queues (DLQ). After 3 failures, move the message to DLQ for manual inspection. Set up alerts when DLQ receives messages."
		>
			<CodeBlock
				language="javascript"
				code={`async function processMessage(message) {
  try {
    await handleOrder(message);
    await channel.ack(message);  // Success
  } catch (error) {
    message.retryCount = (message.retryCount || 0) + 1;
    
    if (message.retryCount >= 3) {
      // Move to Dead Letter Queue
      await channel.sendToQueue('orders.dlq', message);
      await channel.ack(message);  // Remove from main queue
      logger.error('Message moved to DLQ', { message, error });
    } else {
      // Retry with exponential backoff
      await channel.nack(message, false, true);
    }
  }
}`}
			/>
		</MistakeCard>,

		<h3 key="27" className="text-xl font-bold mt-8 mb-4">
			Pros and Cons of Message Queues
		</h3>,
		<Grid key="28" cols={2} gap={6} className="my-8">
			<Card title="Pros">
				<ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
					<li>
						<strong>Decoupling:</strong>&nbsp;Services don't need to know about each other
					</li>
					<li>
						<strong>Scalability:</strong>&nbsp;Add more workers to process faster
					</li>
					<li>
						<strong>Fault tolerance:</strong>&nbsp;Messages survive crashes
					</li>
					<li>
						<strong>Traffic smoothing:</strong>&nbsp;Handle spikes without crashing
					</li>
					<li>
						<strong>Async processing:</strong>&nbsp;API responds instantly
					</li>
					<li>
						<strong>Retry logic:</strong>&nbsp;Built-in retry and DLQ
					</li>
				</ul>
			</Card>
			<Card title="Cons">
				<ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
					<li>
						<strong>Complexity:</strong>&nbsp;Another system to monitor and debug
					</li>
					<li>
						<strong>Eventual consistency:</strong>&nbsp;Data isn't immediately consistent
					</li>
					<li>
						<strong>Ordering challenges:</strong>&nbsp;Hard to guarantee order at scale
					</li>
					<li>
						<strong>Debugging difficulty:</strong>&nbsp;Async errors are harder to trace
					</li>
					<li>
						<strong>Operational overhead:</strong>&nbsp;Kafka requires Zookeeper, tuning
					</li>
					<li>
						<strong>Cost:</strong>&nbsp;Managed services (AWS MSK) can be expensive
					</li>
				</ul>
			</Card>
		</Grid>,

		<h3 key="29" className="text-xl font-bold mt-8 mb-4">
			Advanced Pattern: Saga Orchestration with Queues
		</h3>,
		<p key="30" className="mb-4">
			In microservices, you can't use database transactions across services. <strong>Sagas</strong>&nbsp;use message
			queues to coordinate multi-step workflows with compensating transactions.
		</p>,
		<CodeBlock
			key="31"
			title="Saga Pattern: Order Processing"
			language="javascript"
			code={`// Order Saga Orchestrator
async function processOrder(order) {
  const saga = new Saga(order.id);
  
  try {
    // Step 1: Reserve inventory
    await saga.execute('inventory.reserve', { orderId: order.id });
    
    // Step 2: Charge payment
    await saga.execute('payment.charge', { orderId: order.id, amount: order.total });
    
    // Step 3: Create shipment
    await saga.execute('shipping.create', { orderId: order.id });
    
    await saga.complete();
  } catch (error) {
    // Compensating transactions (undo in reverse order)
    await saga.compensate('shipping.cancel', { orderId: order.id });
    await saga.compensate('payment.refund', { orderId: order.id });
    await saga.compensate('inventory.release', { orderId: order.id });
    
    throw new Error('Order failed: ' + error.message);
  }
}

// Each step publishes events to queues:
// - inventory.reserve → InventoryService listens
// - payment.charge → PaymentService listens
// - shipping.create → ShippingService listens`}
		/>,

		<Callout key="32" type="tip" title="Pro Tip: Use Message Schemas">
			As your system grows, enforce message schemas with tools like <strong>Avro</strong>&nbsp;(Kafka) or{" "}
			<strong>JSON Schema</strong>&nbsp;(RabbitMQ). This prevents breaking changes when producers update message
			formats. Schema registry (Confluent) versions schemas and validates compatibility.
		</Callout>,

		<h3 key="33" className="text-xl font-bold mt-8 mb-4">
			When NOT to Use Message Queues
		</h3>,
		<Callout key="34" type="warning" title="Avoid Queues For...">
			<ul className="text-sm space-y-2 list-disc pl-4">
				<li>
					<strong>Synchronous workflows:</strong>&nbsp;User needs immediate response (payment confirmation). Use direct
					API calls.
				</li>
				<li>
					<strong>Low latency requirements:</strong>&nbsp;Real-time gaming, video calls. Use WebSockets or UDP.
				</li>
				<li>
					<strong>Simple CRUD apps:</strong>&nbsp;If you're just reading/writing to a database, queues add unnecessary
					complexity.
				</li>
				<li>
					<strong>Strong consistency needed:</strong>&nbsp;Financial transactions requiring ACID. Use database
					transactions, not eventual consistency.
				</li>
			</ul>
		</Callout>,
	],
};
