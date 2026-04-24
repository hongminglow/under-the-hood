import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Database, Film, ShoppingCart, Users } from "lucide-react";

export const databaseChoicesAtScaleTopic: Topic = {
	id: "database-choices-at-scale",
	title: "Database Choices at Scale",
	description:
		"Why Netflix uses Cassandra, Instagram uses PostgreSQL, Discord migrated from MongoDB, and how billion-user companies pick their databases. A deep dive into real-world database decisions.",
	tags: ["database", "scale", "architecture", "nosql", "sql", "cassandra", "postgresql", "redis"],
	icon: "ServerCrash",
	content: [
		<p key="1" className="mb-4">
			There is no universally "best" database. Every database is a set of <strong>deliberate trade-offs</strong>, and
			billion-user companies pick databases based on their specific access patterns, consistency requirements, and scale
			demands — not hype. Here's how the world's largest engineering teams actually think about this decision.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Big Picture: Database Categories
		</h3>,
		<Table
			key="3"
			headers={["Type", "Examples", "Best For", "Famous Users"]}
			rows={[
				[
					"Relational (SQL)",
					"PostgreSQL, MySQL",
					"Structured data, complex queries, strong consistency",
					"Instagram, Notion, GitHub, Shopify",
				],
				[
					"Wide-Column",
					"Cassandra, HBase, ScyllaDB",
					"Massive write throughput, time-series, event logs",
					"Netflix, Apple, Discord, Facebook Messenger",
				],
				[
					"Document",
					"MongoDB, Firestore",
					"Flexible schema, nested documents, rapid iteration",
					"Forbes, Expedia, early-stage apps",
				],
				[
					"Key-Value",
					"Redis, DynamoDB",
					"Caching, sessions, leaderboards, ultra-low latency",
					"Twitter, Airbnb, GitHub, Amazon",
				],
				[
					"Graph",
					"Neo4j, Amazon Neptune",
					"Relationship-heavy queries (friends-of-friends, recommendations)",
					"LinkedIn, Twitter (social graph), Uber",
				],
				[
					"Search Engine",
					"Elasticsearch, OpenSearch",
					"Full-text search, log analytics, faceted filtering",
					"Netflix, LinkedIn, GitHub, Uber",
				],
				[
					"Time-Series",
					"InfluxDB, TimescaleDB, ClickHouse",
					"Metrics, IoT, financial events, analytics dashboards",
					"Tesla, Cloudflare, Airbnb",
				],
				[
					"NewSQL",
					"CockroachDB, Spanner, Vitess",
					"Global SQL consistency with horizontal scaling",
					"YouTube (Vitess), Slack, DoorDash",
				],
			]}
		/>,

		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			Deep Dives: Real Company Decisions
		</h3>,

		<h4 key="5" className="text-lg font-semibold mt-6 mb-3 text-primary">
			📸 Instagram: PostgreSQL at Massive Scale
		</h4>,
		<p key="6" className="mb-4">
			Instagram serves over 2 billion users and stores hundreds of billions of photos — and they built it on{" "}
			<strong>PostgreSQL</strong>. The primary reason: engineers who already understood SQL could move fast without
			context-switching. They scaled it horizontally using <strong>sharding via Vitess-like patterns</strong> and{" "}
			<strong>read replicas</strong>.
		</p>,
		<Grid key="7" cols={2} gap={6} className="my-6">
			<FeatureCard icon={Database} title="Why PostgreSQL?" subtitle="Why relational depth won" theme="emerald">
				<ul className="text-sm text-emerald-100/75 space-y-1 list-disc list-inside">
					<li>ACID guarantees — critical for financial transactions and consistency</li>
					<li>Rich query language: JOINs, window functions, CTEs</li>
					<li>PostGIS extension for geospatial queries</li>
					<li>Battle-tested ecosystem and operational tooling</li>
					<li>pgBouncer for connection pooling at scale</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Database} title="How They Scaled It" subtitle="Stay SQL, scale around it" theme="teal">
				<ul className="text-sm text-teal-100/75 space-y-1 list-disc list-inside">
					<li>
						Horizontal sharding by <code>user_id</code>
					</li>
					<li>Thousands of read replicas for follower feed queries</li>
					<li>Django ORM with custom shard routing logic</li>
					<li>Cassandra added separately for feed/activity data</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h4 key="8" className="text-lg font-semibold mt-6 mb-3 text-primary">
			🎬 Netflix: Apache Cassandra for Everything Writes
		</h4>,
		<p key="9" className="mb-4">
			Netflix is one of the world's largest Cassandra users, running hundreds of clusters with tens of petabytes of
			data. They use it for <strong>viewing history, billing events, user preferences, and A/B test tracking</strong> —
			workloads with billions of rows and astronomical write rates.
		</p>,
		<Grid key="10" cols={2} gap={6} className="my-6">
			<FeatureCard icon={Film} title="Why Cassandra?" subtitle="Why Netflix optimized for writes" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-1 list-disc list-inside">
					<li>Linear horizontal scalability — add nodes, get proportional throughput</li>
					<li>Masterless architecture: no single point of failure</li>
					<li>Multi-datacenter replication built-in (global availability)</li>
					<li>Optimized for write-heavy workloads (LSM tree storage)</li>
					<li>Tunable consistency: choose between AP/CP per query</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Film} title="The Trade-offs" subtitle="What you give up for that throughput" theme="rose">
				<ul className="text-sm text-rose-100/75 space-y-1 list-disc list-inside">
					<li>No JOINs — data must be denormalized by access pattern</li>
					<li>Queries must match a partition key — no arbitrary WHERE clauses</li>
					<li>Eventual consistency by default — "last write wins"</li>
					<li>Schema must be designed around queries, not entities</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<CodeBlock
			key="11"
			title="Cassandra data model — design by access pattern"
			language="sql"
			code={`-- Cassandra table is designed for ONE specific query pattern
-- "Get all viewing history for a user, ordered by watched_at"
CREATE TABLE viewing_history (
  user_id   UUID,
  watched_at TIMESTAMP,
  show_id   UUID,
  progress  INT,
  PRIMARY KEY (user_id, watched_at)  -- user_id = partition key
) WITH CLUSTERING ORDER BY (watched_at DESC);

-- This query is blazing fast (hits one partition):
SELECT * FROM viewing_history WHERE user_id = ? LIMIT 50;

-- But this query is IMPOSSIBLE without a full table scan:
SELECT * FROM viewing_history WHERE show_id = ?;
-- You'd need a SEPARATE table for that access pattern.`}
		/>,

		<h4 key="12" className="text-lg font-semibold mt-6 mb-3 text-primary">
			💬 Discord: The MongoDB → Cassandra Migration
		</h4>,
		<p key="13" className="mb-4">
			Discord's story is one of the most famous database migrations in tech. They started with <strong>MongoDB</strong>{" "}
			for its flexible schema and rapid iteration, but by 2017 they were storing 100 million messages per day and
			MongoDB simply couldn't keep up. They migrated to <strong>Cassandra</strong> for their messages store, and later
			to <strong>ScyllaDB</strong> (a C++ reimplementation of Cassandra) for even better performance.
		</p>,
		<Callout key="14" type="warning" title="Why They Left MongoDB">
			MongoDB's storage engine was creating massive "hot spots" — certain shards were overwhelmed while others were
			idle. The random I/O pattern for message retrieval caused high tail latencies. A single shard holding a popular
			Discord server's history would hit 100% CPU regularly. The core problem was that MongoDB's document model wasn't
			designed for the append-heavy, time-ordered access pattern of a chat application.
		</Callout>,
		<Callout key="15" type="success" title="Why ScyllaDB Won Over Cassandra">
			ScyllaDB is API-compatible with Cassandra but written in C++ (Cassandra is JVM-based). Discord saw P99 latencies
			drop from 40ms to under 15ms and garbage collection pauses disappeared entirely. They now store billions of
			messages with single-digit millisecond reads.
		</Callout>,

		<h4 key="16" className="text-lg font-semibold mt-6 mb-3 text-primary">
			👥 Facebook: MySQL + Custom Layers
		</h4>,
		<p key="17" className="mb-4">
			Facebook runs on <strong>MySQL</strong>, but not the MySQL you're thinking of. They built <strong>MyRocks</strong>{" "}
			(a custom MySQL storage engine using RocksDB/LSM trees), developed <strong>Vitess</strong> for horizontal
			sharding, and created <strong>TAO</strong> — a purpose-built distributed graph database for their social graph —
			sitting on top of MySQL.
		</p>,
		<Grid key="18" cols={3} gap={6} className="my-6">
			<FeatureCard icon={Users} title="MySQL + MyRocks" subtitle="Compress the write engine" theme="amber">
				<p className="text-sm text-amber-100/75">
					Facebook's custom storage engine reduces disk space by 50% vs InnoDB using LSM trees — critical at petabyte
					scale. They contribute the most patches back to MySQL and MariaDB of any single company.
				</p>
			</FeatureCard>
			<FeatureCard icon={Users} title="TAO" subtitle="Graph traversal on top of MySQL" theme="sky">
				<p className="text-sm text-sky-100/75">
					Facebook's social graph (who follows whom, who liked what) lives in TAO — a distributed caching and
					persistence layer on top of MySQL designed for graph traversal. It handles trillions of edges.
				</p>
			</FeatureCard>
			<FeatureCard icon={Users} title="Cassandra for Inbox" subtitle="Messenger needed write scaling" theme="cyan">
				<p className="text-sm text-cyan-100/75">
					Facebook Messenger moved to Cassandra (HBase, specifically) for message storage due to its linear write
					scalability — the exact same reason as Netflix.
				</p>
			</FeatureCard>
		</Grid>,

		<h4 key="19" className="text-lg font-semibold mt-6 mb-3 text-primary">
			🐦 Twitter/X: Redis + Manhattan
		</h4>,
		<p key="20" className="mb-4">
			Twitter's timeline is powered by <strong>Redis</strong> at its core. When you tweet, Twitter's Fanout Service
			pushes your tweet ID into the Redis sorted sets of all your followers' home timelines — in real time. This makes
			timeline reads instantaneous (a Redis ZRANGE call) at the cost of massive write amplification for popular
			accounts.
		</p>,
		<Callout key="21" type="info" title="The Celebrity Problem (again)">
			Beyoncé has 28 million followers. When she tweets, Twitter must write to 28 million Redis sorted sets in
			milliseconds. For mega-celebrities, Twitter uses a hybrid approach: followers over a threshold pull tweets on read
			(instead of receiving them on write), which is then merged with their personalized Redis timeline.
		</Callout>,
		<p key="22" className="mt-4 mb-4">
			For persistent storage, Twitter built <strong>Manhattan</strong> — their own distributed key-value store inspired
			by Dynamo. It powers tweets, DMs, user data, and ad targeting, replacing a patchwork of MySQL, Cassandra, and
			other stores.
		</p>,

		<h4 key="23" className="text-lg font-semibold mt-6 mb-3 text-primary">
			🛒 Amazon: DynamoDB
		</h4>,
		<p key="24" className="mb-4">
			Amazon runs their e-commerce platform on <strong>DynamoDB</strong> — which they invented and open-sourced the
			design of in 2007 (the famous Dynamo paper). It's a fully managed key-value + document store with single-digit
			millisecond SLA at any scale.
		</p>,
		<Grid key="25" cols={2} gap={6} className="my-6">
			<FeatureCard icon={ShoppingCart} title="Why DynamoDB?" subtitle="Managed scale and latency" theme="emerald">
				<ul className="text-sm text-emerald-100/75 space-y-1 list-disc list-inside">
					<li>Guaranteed single-digit millisecond latency at any scale</li>
					<li>No operational overhead — fully serverless, auto-scaling</li>
					<li>Multi-region Active-Active replication with Global Tables</li>
					<li>Pay-per-request pricing for variable traffic (huge for Black Friday spikes)</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={ShoppingCart} title="The DynamoDB Tax" subtitle="Managed convenience has sharp edges" theme="rose">
				<ul className="text-sm text-rose-100/75 space-y-1 list-disc list-inside">
					<li>No JOINs, limited query patterns (must use GSI for secondary access)</li>
					<li>Expensive at high sustained throughput vs self-hosted alternatives</li>
					<li>AWS vendor lock-in — no clean migration path</li>
					<li>Complex data modeling requires up-front design discipline</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h3 key="26" className="text-xl font-bold mt-8 mb-4">
			Decision Framework: Choosing the Right Database
		</h3>,
		<Table
			key="27"
			headers={["Scenario", "Recommended DB", "Reason"]}
			rows={[
				[
					"User accounts, orders, billing",
					"PostgreSQL / MySQL",
					"ACID transactions, relational integrity, complex queries",
				],
				[
					"Real-time messaging / chat history",
					"Cassandra / ScyllaDB",
					"Append-only writes, time-ordered reads per partition",
				],
				["Session store / rate limiting / cache", "Redis", "In-memory, sub-millisecond, TTL support, sorted sets"],
				[
					"Product catalog with flexible attributes",
					"MongoDB / DynamoDB",
					"Schema flexibility, nested documents, key-value lookups",
				],
				[
					"Social graph / friend recommendations",
					"Neo4j / Amazon Neptune",
					"Graph traversal is O(relationships), not O(all users)",
				],
				["Product search / full-text search", "Elasticsearch", "Inverted index, relevance scoring, faceted filtering"],
				[
					"Analytics / business intelligence",
					"ClickHouse / BigQuery",
					"Columnar storage, OLAP queries over billions of rows",
				],
				[
					"Global multi-region SQL app",
					"CockroachDB / Spanner",
					"Distributed SQL with strong consistency across regions",
				],
				["IoT sensor data / metrics", "InfluxDB / TimescaleDB", "Optimized compaction for time-series, downsampling"],
			]}
		/>,

		<h3 key="28" className="text-xl font-bold mt-8 mb-4">
			The Polyglot Persistence Reality
		</h3>,
		<p key="29" className="mb-4">
			No large company uses just one database. At scale, you discover that different problems genuinely need different
			tools. This is called <strong>Polyglot Persistence</strong> — using multiple databases, each chosen for a specific
			use case, within the same application.
		</p>,
		<Grid key="30" cols={2} gap={6} className="my-6">
			<Card title="Uber's Stack Example">
				<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
					<li>
						<strong>MySQL</strong> — trip history, driver/rider profiles
					</li>
					<li>
						<strong>Redis</strong> — driver location cache, surge pricing state
					</li>
					<li>
						<strong>Elasticsearch</strong> — search by location, destination autocomplete
					</li>
					<li>
						<strong>Kafka + Flink</strong> — real-time event streaming and analytics
					</li>
				</ul>
			</Card>
			<Card title="Airbnb's Stack Example">
				<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
					<li>
						<strong>MySQL</strong> — core transactional data (bookings, listings)
					</li>
					<li>
						<strong>DynamoDB</strong> — messaging, dynamic feature configs
					</li>
					<li>
						<strong>Elasticsearch</strong> — listing search with geo + filters
					</li>
					<li>
						<strong>Druid + Presto</strong> — internal analytics and data science
					</li>
				</ul>
			</Card>
		</Grid>,

		<Callout key="31" type="tip" title="Engineer's Golden Rule">
			Start with <strong>a single PostgreSQL instance</strong>. It scales further than most engineers expect
			(Instagram's first billion users ran on Postgres). Only add a specialized database when you hit a concrete
			bottleneck that Postgres genuinely cannot solve. Premature polyglot persistence introduces operational complexity,
			dual-write hazards, and synchronization nightmares before you've earned the need for them.
		</Callout>,
	],
};
