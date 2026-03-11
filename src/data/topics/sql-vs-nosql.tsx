import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const sqlVsNosqlTopic: Topic = {
	id: "sql-vs-nosql",
	title: "SQL vs NoSQL Paradigms",
	description:
		"Rethinking data persistency: the classic relational consistency approach versus modern distributed scalability.",
	tags: ["databases", "architecture", "acid", "dist-systems"],
	icon: "Database",
	content: [
		<p key="1">
			For decades, the Relational Database (SQL) was the undisputed king of data persistence, relying on strict tables,
			schemas, and foreign keys. The explosion of unstructured web data and the need for massive horizontal scalability
			birthed <strong>NoSQL ("Not Only SQL")</strong>, an umbrella term for alternative database architectures optimized
			for flexibility, rapid iteration, and distributed clustering.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Architectural Differences
		</h4>,
		<Grid key="3" cols={2} gap={6}>
			<Card title="SQL (Relational)" description="Structured & Consistent">
				<ul className="list-disc pl-5 space-y-2 mt-2 text-sm text-muted-foreground">
					<li>
						<strong className="text-foreground">Schema:</strong> Rigid. You must define tables and columns before
						inserting data. Altering schemas later can be painful.
					</li>
					<li>
						<strong className="text-foreground">Data Structure:</strong> Tables with rows and columns. High reliance on{" "}
						<strong>Normalization</strong> to eliminate data redundancy.
					</li>
					<li>
						<strong className="text-foreground">Scaling:</strong> Primarily{" "}
						<Highlight variant="warning">Vertical</Highlight>. You scale by buying a bigger, more expensive server (more
						CPU/RAM).
					</li>
					<li>
						<strong className="text-foreground">Queries:</strong> Uses SQL (Structured Query Language), a powerful,
						standardized language for complex joins and aggregations.
					</li>
					<li>
						<strong className="text-foreground">Examples:</strong> PostgreSQL, MySQL, SQL Server, Oracle.
					</li>
				</ul>
			</Card>
			<Card title="NoSQL (Non-Relational)" description="Flexible & Distributed">
				<ul className="list-disc pl-5 space-y-2 mt-2 text-sm text-muted-foreground">
					<li>
						<strong className="text-foreground">Schema:</strong> Dynamic/Schemaless. You can insert JSON documents with
						completely different fields into the same collection.
					</li>
					<li>
						<strong className="text-foreground">Data Structure:</strong> Documents, Key-Value pairs, Wide-Column, or
						Graphs. Embraces <strong>Denormalization</strong> (duplicating data to optimize read speeds).
					</li>
					<li>
						<strong className="text-foreground">Scaling:</strong> Built for{" "}
						<Highlight variant="info">Horizontal</Highlight> scaling. You split data across many cheap commodity servers
						(Sharding).
					</li>
					<li>
						<strong className="text-foreground">Queries:</strong> Proprietary query APIs (e.g., MongoDB's find methods).
						Often lacks native support for complex JOINs.
					</li>
					<li>
						<strong className="text-foreground">Examples:</strong> MongoDB, DynamoDB, Redis, Cassandra.
					</li>
				</ul>
			</Card>
		</Grid>,
		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			The Consistency Trade-off: ACID vs BASE
		</h4>,
		<p key="5" className="mb-4">
			The deepest technical divergence between the systems revolves around state guarantees, often explained through the
			CAP Theorem.
		</p>,
		<Table
			key="6"
			headers={["Philosophy", "Focus", "Characteristics"]}
			rows={[
				[
					"ACID (SQL)",
					"Data Integrity",
					"Atomicity, Consistency, Isolation, Durability. Ensures transactions are completely valid or entirely rolled back. Perfect for financial data.",
				],
				[
					"BASE (NoSQL)",
					"High Availability",
					"Basically Available, Soft state, Eventual consistency. Prioritizes keeping the system up and fast, even if some nodes temporarily show stale data.",
				],
			]}
		/>,
		<h4 key="7" className="text-xl font-bold mt-8 mb-4">
			The "Which Should I Choose?" Cheat Sheet
		</h4>,
		<div key="8" className="space-y-4">
			<Callout type="success" title="Choose SQL When:">
				<ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
					<li>
						You are building a <strong>financial, billing, or ledger system</strong> where data integrity (ACID) is an
						absolute non-negotiable requirement.
					</li>
					<li>
						Your data is highly relational (e.g., Users have many Orders, Orders have many Products) and you need to
						perform complex <code>JOIN</code> operations.
					</li>
					<li>Your data structure is well-understood and unlikely to change drastically over time.</li>
					<li>Read-to-write ratio is balanced, and vertical scaling is sufficient for your current needs.</li>
				</ul>
				<p className="mt-3 text-sm font-bold opacity-80">
					Default Recommendation: Start with PostgreSQL. It's incredibly robust and can handle JSON relatively well if
					you need minor flexibility.
				</p>
			</Callout>

			<Callout type="warning" title="Choose NoSQL When:">
				<ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
					<li>
						You are building a highly read-heavy application like a{" "}
						<strong>social media feed, product catalog, or content management system (CMS)</strong>.
					</li>
					<li>
						You are practicing <strong>Rapid Prototyping</strong> and the data schema is volatile and constantly
						changing.
					</li>
					<li>You need to handle massive volumes of unstructured data (e.g., IoT sensor logs, massive telemetry).</li>
					<li>
						You anticipate explosive growth requiring seamless horizontal scaling across global data centers without
						manual sharding headaches.
					</li>
				</ul>
				<p className="mt-3 text-sm font-bold opacity-80">
					Default Recommendation: Start with MongoDB for document storage, or Redis for caching/ephemeral data.
				</p>
			</Callout>
		</div>,
		<h4 key="9" className="text-xl font-bold mt-8 mb-4">
			The Modern Reality: Polyglot Persistence
		</h4>,
		<p key="10" className="mb-4">
			The "SQL vs NoSQL" debate is becoming a false dichotomy. Modern enterprise architectures rarely choose just one.
			They use best-of-breed tools for specific microservices, a pattern known as <strong>Polyglot Persistence</strong>.
		</p>,
		<Step key="11" index={1}>
			<strong>Core Business Logic & Users:</strong> Stored in <Highlight variant="primary">PostgreSQL</Highlight> (SQL)
			to guarantee transactional integrity.
		</Step>,
		<Step key="12" index={2}>
			<strong>Product Catalog / Activity Feeds:</strong> Stored in <Highlight variant="info">MongoDB</Highlight> (NoSQL
			Document) for flexible schemas and fast read access.
		</Step>,
		<Step key="13" index={3}>
			<strong>Session Management & Caching:</strong> Stored in <Highlight variant="warning">Redis</Highlight> (NoSQL
			Key-Value) for sub-millisecond lookups.
		</Step>,
		<Step key="14" index={4}>
			<strong>Recommendation Engine:</strong> Powered by <Highlight variant="primary">Neo4j</Highlight> (NoSQL Graph) to
			map complex user relationships.
		</Step>,
	],
};
