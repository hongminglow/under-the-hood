import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";

export const cqrsPatternTopic: Topic = {
	id: "cqrs-pattern",
	title: "CQRS (Command Query Responsibility Segregation)",
	description:
		"Why reading data and writing data are fundamentally different problems — and why forcing them through the same model creates silent performance nightmares.",
	tags: ["architecture", "system-design", "database", "backend", "cqrs"],
	icon: "SplitSquareHorizontal",
	content: [
		<p key="1">
			In a traditional CRUD application, the same data model handles both reads and writes. Your <code>Order</code>{" "}
			entity is used to insert new orders <em>and</em> to query complex dashboard reports. This works fine at small
			scale. At high scale, it creates a fundamental conflict: <strong>writes need normalized, consistent data</strong>,
			while <strong>reads need denormalized, fast-to-query data</strong>. CQRS solves this by splitting them into two
			entirely separate models.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Idea: Separate Read and Write
		</h3>,
		<Grid key="3" cols={2} gap={6} className="my-8">
			<Card title="Command Side (Write)">
				<p className="text-sm text-slate-400 mb-2">
					Handles <strong>Commands</strong>: <code>PlaceOrder</code>, <code>CancelOrder</code>,{" "}
					<code>UpdateAddress</code>. Each command validates business rules, mutates state, and writes to the{" "}
					<strong>write database</strong> (optimized for transactional integrity — normalized, ACID-compliant).
				</p>
				<p className="text-xs italic text-slate-400">
					Think: PostgreSQL with strict foreign keys, constraints, and normalized tables.
				</p>
			</Card>
			<Card title="Query Side (Read)">
				<p className="text-sm text-slate-400 mb-2">
					Handles <strong>Queries</strong>: <code>GetOrderSummary</code>, <code>GetDashboardStats</code>,{" "}
					<code>SearchProducts</code>. Reads from a <strong>read database</strong> that is pre-computed, denormalized,
					and optimized purely for query speed.
				</p>
				<p className="text-xs italic text-slate-400">
					Think: Elasticsearch for search, Redis for dashboards, materialized views for reports.
				</p>
			</Card>
		</Grid>,

		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			Why Bother? The CRUD Bottleneck
		</h3>,
		<Table
			key="5"
			headers={["Problem", "In Traditional CRUD", "With CQRS"]}
			rows={[
				[
					"Query Complexity",
					"A dashboard JOIN across 7 tables locks rows and slows down writes.",
					"Reads hit a pre-built denormalized view. Zero impact on write performance.",
				],
				[
					"Scaling",
					"You scale the entire database, even though 90% of traffic is reads.",
					"Scale read and write databases independently. Add read replicas without touching the write DB.",
				],
				[
					"Model Mismatch",
					"The ORM entity is a compromise — too normalized for reads, too denormalized for writes.",
					"Each side has a purpose-built model. No compromises.",
				],
				[
					"Performance Tuning",
					"Indexes that speed up reads slow down writes (and vice versa).",
					"Write DB has minimal indexes for fast inserts. Read DB has aggressive indexes for fast queries.",
				],
			]}
		/>,

		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			How the Read Model Stays in Sync
		</h3>,
		<p key="6a" className="mb-4">
			The critical question: if the write DB and read DB are separate, how does the read model know about new writes?
			There are two primary approaches:
		</p>,
		<Grid key="7" cols={2} gap={6} className="my-8">
			<Card title="Synchronous Projection">
				<p className="text-sm text-slate-400 mb-2">
					After a write succeeds, the application <strong>immediately</strong> updates the read model in the same
					request cycle. Simple, consistent, but couples the two sides together and adds latency to every write.
				</p>
				<p className="text-xs italic text-slate-400">
					Good for: Low-traffic systems where consistency matters more than write speed.
				</p>
			</Card>
			<Card title="Asynchronous Projection (Event-Driven)">
				<p className="text-sm text-slate-400 mb-2">
					The write side publishes a <strong>Domain Event</strong> (e.g., <code>OrderPlaced</code>) to a message broker
					(Kafka, RabbitMQ). A separate projector service consumes events and updates the read model asynchronously.
				</p>
				<p className="text-xs italic text-slate-400">
					Good for: High-traffic systems. The read model is <strong>eventually consistent</strong> — there's a brief
					delay (milliseconds to seconds) before reads reflect the latest write.
				</p>
			</Card>
		</Grid>,

		<h3 key="8" className="text-xl font-bold mt-8 mb-4">
			CQRS + Event Sourcing: The Power Combo
		</h3>,
		<p key="8a" className="mb-4">
			CQRS and Event Sourcing are often paired but are <strong>independent concepts</strong>. You can use CQRS without
			Event Sourcing (and vice versa). When combined, the write side stores events as the source of truth, and the read
			side rebuilds its projections by replaying those events.
		</p>,
		<Table
			key="9"
			headers={["Concept", "What It Does", "Used Alone?"]}
			rows={[
				[
					"CQRS",
					"Separates read and write models into different databases/services.",
					"Yes. You can use CQRS with a normal relational write DB and a denormalized read DB.",
				],
				[
					"Event Sourcing",
					"Stores every state change as an immutable event. Current state = replay all events.",
					"Yes. You can event-source a single model without separating reads and writes.",
				],
				[
					"CQRS + Event Sourcing",
					"Events are the write model. Read models are projections rebuilt from the event stream.",
					"The canonical combination. Used in banking, healthcare, and audit-heavy domains.",
				],
			]}
		/>,

		<h3 key="10" className="text-xl font-bold mt-8 mb-4">
			Real-World Examples: Choosing the Right DBs
		</h3>,
		<p key="10a" className="mb-4 font-bold text-primary">
			Scenario A: The Standard Enterprise Setup
		</p>,
		<p key="10a-desc" className="mb-4">
			A very common enterprise setup uses <strong>PostgreSQL for writes</strong> (because you need strict ACID transactions, foreign keys, and data integrity when processing payments) and <strong>MongoDB or Elasticsearch for reads</strong> (because you want to fetch a massive, fully-assembled JSON document instantly without running 8 costly SQL <code>JOIN</code>s).
		</p>,
		<Flow key="10b" steps={[
			{ title: "1. The Write (PostgreSQL)", description: <>A user places an order. The API validates the business rules and inserts rows into the <code>orders</code> and <code>order_items</code> tables in PostgreSQL. If anything fails, the transaction rolls back.</> },
			{ title: "2. The Sync (Event Bus)", description: <>Immediately after the Postgres commit, the system publishes an <code>OrderPlaced</code> event to a message broker like <strong>Kafka</strong> (often using a tool like Debezium for CDC).</> },
			{ title: "3. The Projector (Worker)", description: <>A backend worker listens to that Kafka queue. It picks up the <code>OrderPlaced</code> event, grabs nested data, and constructs a "fat", denormalized JSON document representing the dashboard UI.</> },
			{ title: "4. The Read (MongoDB)", description: <>The worker saves this JSON document into MongoDB. When the user opens their app, the Query API fetches the ready-made document instantly. Zero <code>JOIN</code>s required.</> }
		]} />,

		<p key="10c" className="mb-4 mt-8 font-bold text-primary">
			Scenario B: The Extreme Ingest Setup (DynamoDB to PostgreSQL)
		</p>,
		<p key="10c-desc" className="mb-4">
			If your system is an IoT platform ingesting 100,000 events per second, PostgreSQL would collapse under the write contention lock limits. In this case, the architecture is flipped: NoSQL handles the brutal, infinite writes, and the relational database handles the complex analytical reads.
		</p>,
		<Flow key="10d" steps={[
			{ title: "1. The Write (DynamoDB)", description: <>An IoT device emits a sensor reading. The lightweight API instantly blind-writes the raw data directly into <strong>DynamoDB</strong>, which scales infinitely for simple <code>PUT</code> operations without locks.</> },
			{ title: "2. The Sync (DynamoDB Streams)", description: <>DynamoDB has a <strong>built-in event queue</strong>. Every time a row is written, DynamoDB automatically drops a Change Event into DynamoDB Streams.</> },
			{ title: "3. The Projector (Lambda)", description: <>A tiny serverless worker function (like AWS Lambda) is configured to continuously listen to that stream and grab batches of the new events efficiently.</> },
			{ title: "4. The Read (PostgreSQL)", description: <>The Lambda function transforms the raw data and executes SQL <code>UPDATE</code> statements against PostgreSQL, allowing data analysts to run complex <code>JOIN</code> reports safely in Postgres.</> }
		]} />,

		<Callout key="11" type="warning" title="Eventual Consistency: The Trade-off">
			With async projections, a user might place an order and <em>not immediately</em> see it on their dashboard
			(because the read model hasn't caught up yet). This 50-200ms delay is usually invisible, but for some UIs you need
			to handle it. Common patterns: <strong>optimistic UI updates</strong> (show the data locally before the read model
			confirms) or <strong>read-your-own-writes</strong> (route the user's next read to the write DB temporarily).
		</Callout>,

		<Callout key="12" type="danger" title="When NOT to Use CQRS">
			CQRS adds <strong>significant operational complexity</strong> — two databases, an event bus, projector services,
			eventual consistency handling. For a simple CRUD app with moderate traffic, this is massive overkill. Use CQRS
			only when you have a genuine read/write asymmetry problem: dashboards with complex aggregations, high
			read-to-write ratios (100:1+), or domains where the read and write shapes are fundamentally different.
		</Callout>,
	],
};
