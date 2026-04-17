import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

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
				<p className="text-sm text-muted-foreground mb-2">
					Handles <strong>Commands</strong>: <code>PlaceOrder</code>, <code>CancelOrder</code>,{" "}
					<code>UpdateAddress</code>. Each command validates business rules, mutates state, and writes to the{" "}
					<strong>write database</strong> (optimized for transactional integrity — normalized, ACID-compliant).
				</p>
				<p className="text-xs italic text-muted-foreground">
					Think: PostgreSQL with strict foreign keys, constraints, and normalized tables.
				</p>
			</Card>
			<Card title="Query Side (Read)">
				<p className="text-sm text-muted-foreground mb-2">
					Handles <strong>Queries</strong>: <code>GetOrderSummary</code>, <code>GetDashboardStats</code>,{" "}
					<code>SearchProducts</code>. Reads from a <strong>read database</strong> that is pre-computed, denormalized,
					and optimized purely for query speed.
				</p>
				<p className="text-xs italic text-muted-foreground">
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
				<p className="text-sm text-muted-foreground mb-2">
					After a write succeeds, the application <strong>immediately</strong> updates the read model in the same
					request cycle. Simple, consistent, but couples the two sides together and adds latency to every write.
				</p>
				<p className="text-xs italic text-muted-foreground">
					Good for: Low-traffic systems where consistency matters more than write speed.
				</p>
			</Card>
			<Card title="Asynchronous Projection (Event-Driven)">
				<p className="text-sm text-muted-foreground mb-2">
					The write side publishes a <strong>Domain Event</strong> (e.g., <code>OrderPlaced</code>) to a message broker
					(Kafka, RabbitMQ). A separate projector service consumes events and updates the read model asynchronously.
				</p>
				<p className="text-xs italic text-muted-foreground">
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
			Real-World Architecture
		</h3>,
		<p key="10a" className="mb-4">
			A production CQRS system typically looks like this:
		</p>,
		<ul key="10b" className="list-disc pl-5 text-sm text-muted-foreground space-y-2 mb-8">
			<li>
				<strong>Write Side:</strong> API → Command Handler → Validate Business Rules → Write to PostgreSQL → Publish{" "}
				<code>OrderPlaced</code> event to Kafka.
			</li>
			<li>
				<strong>Projector:</strong> Kafka Consumer → Read <code>OrderPlaced</code> → Update Elasticsearch index + Redis
				cache + Materialized View.
			</li>
			<li>
				<strong>Read Side:</strong> API → Query Handler → Read from Elasticsearch (for search) or Redis (for dashboard
				counts). No JOINs, no locking, sub-millisecond responses.
			</li>
		</ul>,

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
