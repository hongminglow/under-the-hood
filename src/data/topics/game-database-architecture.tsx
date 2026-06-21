import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Card } from "@/components/ui/Card";
import { Database, Zap, Server, Layers, ShieldAlert, ShieldCheck, MessageSquare } from "lucide-react";

export const gameDatabaseArchitectureTopic: Topic = {
	id: "game-database-architecture",
	title: "Game Database Architecture",
	description:
		"How online games like Genshin Impact persist massive real-time player state — from inventory and character builds to live position and gacha economy. A deep dive into hot-path memory structures, event-sourced persistence, and why game databases break every conventional web assumption.",
	tags: ["gaming", "database", "persistence", "mmo", "state-management", "architecture"],
	icon: "Database",
	content: [
		<p key="1" className="mb-4">
			When a player logs into <em>Genshin Impact</em>, the server must reconstruct their exact world state: which
			characters they own, what artifacts are equipped, how much Primogem currency they have, and which quests are
			completed. With millions of daily active users and billions of rows of player data, game databases face a problem
			no web application has:{" "}
			<strong>
				they must reconcile real-time volatile state with permanent financial-grade persistence
			</strong>{" "}
			— and they must do it without ever blocking the game loop.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Two Worlds: Runtime State vs. Persistent Truth
		</h3>,

		<p key="3" className="mb-4">
			Game databases operate on a fundamental split that web developers rarely encounter. During gameplay, the database
			is not the source of truth — <strong>RAM is</strong>. The persistent database only becomes relevant at session
			boundaries: login, logout, and periodic checkpoints.
		</p>,

		<Grid key="4" cols={2} gap={6}>
			<FeatureCard icon={Zap} title="Runtime State (Hot Path)" subtitle="Volatile, nanosecond access" theme="emerald">
				<ul className="list-disc pl-5 mt-2 text-sm text-emerald-700 dark:text-emerald-100/75 space-y-1">
					<li>
						<strong>Location:</strong> Game server RAM (C++ structs, Rust enums)
					</li>
					<li>
						<strong>Lifespan:</strong> Exists only for the duration of the match or session
					</li>
					<li>
						<strong>Access:</strong> Direct memory pointer dereference — single-digit microseconds
					</li>
					<li>
						<strong>Volume:</strong> Player position, HP, buff timers, cooldowns, live inventory deltas
					</li>
					<li>
						<strong>Loss tolerance:</strong> High — losing 5 seconds of movement is acceptable
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Database} title="Persistent State (Cold Path)" subtitle="Durable, millisecond access" theme="cyan">
				<ul className="list-disc pl-5 mt-2 text-sm text-cyan-700 dark:text-cyan-100/75 space-y-1">
					<li>
						<strong>Location:</strong> Distributed databases (PostgreSQL, DynamoDB, ScyllaDB)
					</li>
					<li>
						<strong>Lifespan:</strong> Permanent — survives server crashes and restarts
					</li>
					<li>
						<strong>Access:</strong> Network round-trip plus disk I/O — 1-50 milliseconds
					</li>
					<li>
						<strong>Volume:</strong> Account metadata, owned characters, completed quests, transaction history
					</li>
					<li>
						<strong>Loss tolerance:</strong> Zero — losing a gacha pull or currency purchase is a legal liability
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h3 key="5" className="text-xl font-bold mt-8 mb-4">
			What Exactly Gets Stored?
		</h3>,

		<p key="6" className="mb-4">
			Not all player data is equal. Game architects classify data by mutation frequency, loss tolerance, and query
			pattern. This classification directly determines which storage layer handles it.
		</p>,

		<Table
			key="7"
			headers={["Data Category", "Examples", "Storage Layer", "Persistence Strategy"]}
			rows={[
				[
					"Transient State",
					"World position, velocity, animation state",
					"Game Server RAM only",
					"Not persisted — regenerated on login",
				],
				[
					"Session State",
					"HP, MP, buffs, temporary inventory",
					"Game Server RAM + Redis",
					"Async write to Redis every 30s",
				],
				[
					"Account Core",
					"Username, UID, auth credentials",
					"PostgreSQL / MySQL",
					"Immediate synchronous write",
				],
				[
					"Character Roster",
					"Owned characters, levels, constellations",
					"Document DB (MongoDB) or SQL",
					"Event-sourced, async flush",
				],
				[
					"Inventory & Items",
					"Weapons, artifacts, materials",
					"SQL with JSONB columns or Document DB",
					"Snapshot + delta log",
				],
				[
					"Economy / Currency",
					"Primogems, Mora, Genesis Crystals",
					"SQL (ACID transactions)",
					"Immediate write + audit log",
				],
				[
					"Gacha History",
					"Banner pulls, pity counters",
					"Append-only event store (Kafka)",
					"Immutable event stream",
				],
				[
					"Social Data",
					"Friends list, chat history, guilds",
					"Graph DB or SQL",
					"Eventual consistency, async",
				],
			]}
		/>,

		<h3 key="8" className="text-xl font-bold mt-8 mb-4">
			The Hot Path: Why Games Cannot Query Databases Mid-Gameplay
		</h3>,

		<p key="9" className="mb-4">
			In a 60Hz game server, every tick has a budget of ~16.6ms. If the physics simulation, AI, and networking consume
			12ms, only 4.6ms remains for everything else. A single PostgreSQL query over TCP can take 2-20ms.{" "}
			<strong>Querying a database inside the game loop is architectural suicide.</strong>
		</p>,

		<Callout key="10" type="warning" title="The 16-Millisecond Budget">
			A single database round-trip during a boss fight would stall the entire server instance. All 16 players in the
			co-op session would experience a simultaneous lag spike. This is why game servers pre-load{" "}
			<em>everything</em> into RAM at login and never touch disk until logout.
		</Callout>,

		<Grid key="11" cols={2} gap={6}>
			<FeatureCard icon={Server} title="Pre-Load at Login" subtitle="The hydration pattern" theme="amber">
				<p className="mt-2 text-sm text-amber-700 dark:text-amber-100/75 leading-relaxed">
					When a player connects, the game server issues <strong>one bulk read</strong> from the persistent database:
					character stats, inventory, quest progress, and friend lists. This data is deserialized into native C++
					structs and placed in a contiguous memory arena. For the next 2 hours, the server never queries the DB again.
				</p>
			</FeatureCard>
			<FeatureCard icon={Zap} title="In-Memory Mutations" subtitle="Zero I/O during gameplay" theme="emerald">
				<p className="mt-2 text-sm text-emerald-700 dark:text-emerald-100/75 leading-relaxed">
					Every action — equipping an artifact, using a potion, or defeating a monster — modifies only RAM. The server
					maintains a <strong>delta buffer</strong>: a ring buffer of all state changes since the last snapshot. This
					buffer lives entirely in L1/L2 cache and is flushed asynchronously.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="12" className="text-xl font-bold mt-8 mb-4">
			The Persistence Pipeline: From RAM to Disk
		</h3>,

		<p key="13" className="mb-4">
			When a player logs out or a checkpoint triggers, the volatile RAM state must be serialized and written to durable
			storage. This is not a simple <code>UPDATE</code> statement. Game studios use multi-stage pipelines to ensure zero
			data loss and horizontal scalability.
		</p>,

		<Flow
			key="14"
			steps={[
				{
					title: "1. Delta Accumulation",
					description:
						"During gameplay, every state change is appended to an in-memory delta ring buffer. 'Player A used item X', 'Player B dealt 500 damage'. These are tiny, immutable events.",
				},
				{
					title: "2. Snapshot Trigger",
					description:
						"Every 30-60 seconds, or on logout, the server serializes the full current state into a snapshot protobuf. This is the 'save file' format.",
				},
				{
					title: "3. Async Queue Insert",
					description:
						"The snapshot and delta log are pushed to a message queue (Kafka, RabbitMQ, or NATS). The game server immediately returns — it does not wait for disk confirmation.",
				},
				{
					title: "4. Consumer Persistence",
					description:
						"A fleet of stateless consumer workers reads from the queue. They handle the actual database writes, retry logic, and conflict resolution. If a consumer crashes, Kafka redelivers the message.",
				},
				{
					title: "5. Database Commit",
					description:
						"Consumers write to the appropriate store: SQL for currency, Document DB for inventory, S3 for large blobs. Each store acknowledges independently.",
				},
			]}
		/>,

		<h3 key="15" className="text-xl font-bold mt-8 mb-4">
			Database Technology Stack: Polyglot Persistence
		</h3>,

		<p key="16" className="mb-4">
			No single database handles all game data well. Successful games use <strong>polyglot persistence</strong>: matching
			each data type to the storage engine optimized for its access pattern.
		</p>,

		<Grid key="17" cols={2} gap={6}>
			<FeatureCard icon={Database} title="PostgreSQL / MySQL" subtitle="ACID for financial data" theme="indigo">
				<ul className="list-disc pl-5 mt-2 text-sm text-indigo-700 dark:text-indigo-100/75 space-y-1">
					<li>
						<strong>Use:</strong> Currency balances, gacha transactions, IAP receipts
					</li>
					<li>
						<strong>Why:</strong> Strict ACID guarantees prevent currency duplication exploits
					</li>
					<li>
						<strong>Pattern:</strong> Row-level locking plus SERIALIZABLE isolation for wallet updates
					</li>
					<li>
						<strong>Scale:</strong> Vertically scaled with read replicas; sharded by player_uid
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Layers} title="MongoDB / DynamoDB" subtitle="Flexible schema for inventory" theme="violet">
				<ul className="list-disc pl-5 mt-2 text-sm text-violet-700 dark:text-violet-100/75 space-y-1">
					<li>
						<strong>Use:</strong> Character builds, artifact collections, quest progress
					</li>
					<li>
						<strong>Why:</strong> Schema-less documents handle irregular item attributes without migrations
					</li>
					<li>
						<strong>Pattern:</strong> One document per player, nested arrays for inventory slots
					</li>
					<li>
						<strong>Scale:</strong> Horizontally sharded by player_uid; sub-10ms reads with caching
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Zap} title="Redis / KeyDB" subtitle="Sub-millisecond session cache" theme="amber">
				<ul className="list-disc pl-5 mt-2 text-sm text-amber-700 dark:text-amber-100/75 space-y-1">
					<li>
						<strong>Use:</strong> Session tokens, online status, temporary buffs, leaderboard cache
					</li>
					<li>
						<strong>Why:</strong> In-memory speed with TTL for automatic expiration
					</li>
					<li>
						<strong>Pattern:</strong> Hash per player (HSET player:1234); Sorted Sets for rankings
					</li>
					<li>
						<strong>Scale:</strong> Redis Cluster with 16384 hash slots; failover via Sentinel
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={MessageSquare} title="Kafka / NATS" subtitle="Event sourcing backbone" theme="sky">
				<ul className="list-disc pl-5 mt-2 text-sm text-sky-700 dark:text-sky-100/75 space-y-1">
					<li>
						<strong>Use:</strong> Gacha pull history, audit logs, cross-service state sync
					</li>
					<li>
						<strong>Why:</strong> Immutable append-only log perfect for event sourcing
					</li>
					<li>
						<strong>Pattern:</strong> Topic per event type; consumers replay from offset
					</li>
					<li>
						<strong>Scale:</strong> Partitioned by player_uid modulo partition_count
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h3 key="18" className="text-xl font-bold mt-8 mb-4">
			Player Data Sharding: Scaling to 50 Million Users
		</h3>,

		<p key="19" className="mb-4">
			A single PostgreSQL instance cannot hold 50 million player inventories. Game backends shard data by{" "}
			<code>player_uid</code> using consistent hashing. This ensures a player's data always lives on the same physical
			node, eliminating cross-shard joins.
		</p>,

		<CodeBlock
			key="20"
			title="Sharding logic (simplified)"
			language="python"
			code={`# player_uid is a 64-bit integer assigned at account creation
shard_id = player_uid % 256  # 256 physical shards

# Routing table maps shard_id -> database connection pool
db_pool = shard_router.get_pool(shard_id)

# All queries for this player hit the same shard
db_pool.execute(
    "UPDATE player_inventory SET artifacts = ? WHERE uid = ?",
    (new_artifacts, player_uid)
)`}
		/>,

		<Callout key="21" type="info" title="The Shard Key Choice">
			<code>player_uid</code> is the ideal shard key because it is immutable, uniformly distributed, and every player
			query includes it. Sharding by <code>region</code> or <code>level</code> creates hot shards — e.g., a new region
			launch would overwhelm a single database node.
		</Callout>,

		<h3 key="22" className="text-xl font-bold mt-8 mb-4">
			Gacha & Economy: The Hardest Data to Get Right
		</h3>,

		<p key="23" className="mb-4">
			Gacha games involve real-money transactions for virtual currency. A single bug that allows currency duplication can
			cost millions in revenue and trigger regulatory action.{" "}
			<strong>The economy layer is the only part of a game that demands full ACID compliance.</strong>
		</p>,

		<Grid key="24" cols={2} gap={6}>
			<FeatureCard icon={ShieldAlert} title="The Pity System" subtitle="Guaranteed rarity mechanics" theme="rose">
				<p className="mt-2 text-sm text-rose-700 dark:text-rose-100/75 leading-relaxed">
					Gacha games track a <strong>pity counter</strong>: how many pulls since the last 5-star item. This counter must
					be atomically incremented with every pull and reset on success. A race condition here would allow players to
					exploit the guarantee. SQL row-level locks or Redis Lua scripts ensure atomicity.
				</p>
			</FeatureCard>
			<FeatureCard icon={ShieldCheck} title="Idempotent Purchases" subtitle="Preventing double-charge" theme="teal">
				<p className="mt-2 text-sm text-teal-700 dark:text-teal-100/75 leading-relaxed">
					Every IAP (In-App Purchase) is tagged with a unique <code>transaction_id</code> from Apple or Google. The
					backend uses an idempotent upsert: <code>INSERT ... ON CONFLICT DO NOTHING</code>. If the client retries due
					to network timeout, the duplicate request is silently discarded.
				</p>
			</FeatureCard>
		</Grid>,

		<Table
			key="25"
			headers={["Economy Operation", "Consistency Required", "Storage", "Pattern"]}
			rows={[
				["Currency deduct (pull cost)", "Strong ACID", "PostgreSQL", "UPDATE with CHECK constraint"],
				["Item grant (pull result)", "Eventual", "MongoDB / DynamoDB", "Async append to inventory array"],
				["Pity counter increment", "Strong ACID", "PostgreSQL / Redis Lua", "Atomic counter or row lock"],
				["Purchase receipt", "Strong ACID", "PostgreSQL", "Idempotent INSERT with transaction_id"],
				["Leaderboard update", "Eventual", "Redis Sorted Set", "ZINCRBY async"],
			]}
		/>,

		<h3 key="26" className="text-xl font-bold mt-8 mb-4">
			Snapshot & Checkpoint Strategy
		</h3>,

		<p key="27" className="mb-4">
			How often should a game save? Too frequent and the database is overwhelmed. Too sparse and players lose progress on
			crash. The answer depends on data criticality and mutation rate.
		</p>,

		<Grid key="28" cols={1} gap={6} className="my-6">
			<Card title="Checkpoint Frequency by Data Type">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
					<li>
						<strong>Currency & Purchases:</strong> Immediate synchronous write — never buffered
					</li>
					<li>
						<strong>Inventory Changes:</strong> Every 30-60 seconds, or on zone transition
					</li>
					<li>
						<strong>Quest Progress:</strong> On milestone completion (e.g., quest turn-in)
					</li>
					<li>
						<strong>World Position:</strong> Every 5-10 minutes, or on logout — position is trivial to reconstruct
					</li>
					<li>
						<strong>Social Actions:</strong> Async batch write every 2-5 minutes
					</li>
				</ul>
			</Card>
		</Grid>,

		<Callout key="29" type="tip" title="The 'Quicksave' Pattern">
			Many open-world games use a <strong>shadow save</strong> system: they maintain two save slots per player. The
			active slot is written to every 5 minutes. The backup slot is updated only on clean logout. If the server crashes
			during an active write, the backup slot remains uncorrupted and the player rolls back to their last clean state.
		</Callout>,

		<h3 key="30" className="text-xl font-bold mt-8 mb-4">
			Conflict Resolution: When Multiple Servers Touch the Same Data
		</h3>,

		<p key="31" className="mb-4">
			What if a player plays on mobile, suspends the app, then immediately opens the game on PC? Two different game
			servers may hold conflicting state snapshots. Resolving this requires explicit conflict resolution strategies.
		</p>,

		<Table
			key="32"
			headers={["Strategy", "How It Works", "Best For", "Risk"]}
			rows={[
				[
					"Last-Write-Wins (LWW)",
					"Timestamp on every snapshot; highest timestamp wins",
					"Single-device games, offline-first mobile",
					"Clock skew can cause data loss",
				],
				[
					"Vector Clocks",
					"Each server maintains a version vector; merge function resolves conflicts",
					"Distributed MMOs, cross-platform play",
					"Complex to implement; merge functions are game-specific",
				],
				[
					"Operational Transform",
					"Every action is an operation; operations are replayed in order",
					"Real-time collaborative editing (rare in games)",
					"Overkill for most game state; used in shared creative modes",
				],
				[
					"Server-Authoritative",
					"Client state is always discarded; server state is the only truth",
					"Competitive multiplayer, anti-cheat",
					"Requires always-online; frustrating on poor networks",
				],
			]}
		/>,

		<h3 key="33" className="text-xl font-bold mt-8 mb-4">
			Real-World Architecture: How Genshin Impact Does It
		</h3>,

		<p key="34" className="mb-4">
			miHoYo (HoYoverse) runs Genshin Impact with a hybrid cloud infrastructure. While exact internals are proprietary,
			architectural leaks, job postings, and datamine analysis reveal a pattern consistent with modern gacha game
			backends.
		</p>,

		<div key="35" className="space-y-3 mb-6">
			<Step index={1}>
				<strong>Login Authentication:</strong> Player authenticates via miHoYo Passport (OAuth2). The auth service
				returns a JWT and a <code>player_uid</code>. The UID's first digits encode the server region (e.g., 6xx = Asia,
				1xx = America).
			</Step>
			<Step index={2}>
				<strong>State Hydration:</strong> The game client connects to a dedicated gateway server. The gateway queries a
				sharded document store for the full player state: characters, weapons, artifacts, quest flags, and world
				exploration progress. This is a single bulk read.
			</Step>
			<Step index={3}>
				<strong>Gameplay Session:</strong> The player enters the open world. Their position, HP, elemental bursts, and
				enemy states live entirely in the game server's RAM. No database queries occur while fighting monsters or
				exploring.
			</Step>
			<Step index={4}>
				<strong>Periodic Snapshots:</strong> Every 30-60 seconds, or on teleport or zone change, the server pushes a
				delta snapshot to an asynchronous pipeline. Inventory changes (e.g., picking up a Spectral Husk) are serialized
				and queued.
			</Step>
			<Step index={5}>
				<strong>Economy Operations:</strong> When the player pulls on a banner, the request hits an isolated
				microservice. This service locks the player's currency row in PostgreSQL, deducts Primogems, runs the gacha RNG
				algorithm, and appends the result to both the inventory document and an immutable event log.
			</Step>
			<Step index={6}>
				<strong>Cross-Save Sync:</strong> PlayStation, PC, and mobile share the same backend. When a player switches
				devices, the new device fetches the latest snapshot. Because the snapshot pipeline is globally consistent
				(within ~1 second), the transition is seamless.
			</Step>
		</div>,

		<h3 key="36" className="text-xl font-bold mt-8 mb-4">
			Failure Modes: What Happens When Persistence Breaks
		</h3>,

		<Grid key="37" cols={2} gap={6}>
			<FeatureCard icon={ShieldAlert} title="Database Lag Spike" subtitle="Async queue backlog" theme="rose">
				<p className="mt-2 text-sm text-rose-700 dark:text-rose-100/75 leading-relaxed">
					If the Kafka consumer fleet falls behind, snapshots accumulate in RAM. When RAM fills, the game server must
					either <strong>backpressure</strong> (stop accepting new players) or <strong>drop snapshots</strong> (risk data
					loss). Most games choose backpressure, showing a "Server Busy" error.
				</p>
			</FeatureCard>
			<FeatureCard icon={ShieldCheck} title="Partial Write" subtitle="Inventory saved, currency not" theme="teal">
				<p className="mt-2 text-sm text-teal-700 dark:text-teal-100/75 leading-relaxed">
					A crash between the inventory write and currency write creates an exploit: the player has the item but was
					never charged. The fix is <strong>two-phase commit</strong> or <strong>Saga pattern</strong>: currency is
					deducted first, then the item is granted. If the second step fails, the currency is refunded.
				</p>
			</FeatureCard>
		</Grid>,
	],
};
