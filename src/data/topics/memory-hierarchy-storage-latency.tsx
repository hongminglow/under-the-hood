import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Cpu, Database, HardDrive, Layers, MemoryStick, Network } from "lucide-react";

export const memoryHierarchyStorageLatencyTopic: Topic = {
	id: "memory-hierarchy-storage-latency",
	title: "Memory Hierarchy & Storage Latency",
	description:
		"Why registers, CPU caches, RAM, Redis, SSDs, and hard disks all exist at once — and how latency, capacity, cost, and durability force real systems to spread data across layers.",
	tags: ["performance", "hardware", "architecture", "storage", "caching"],
	icon: "MemoryStick",
	content: [
		<p key="1">
			Computers are fast only when the CPU can get data <strong>close enough</strong> to itself. The closer the data is,
			the faster it is to access, but the smaller and more expensive that layer becomes. The farther away the data is,
			the slower it gets, but the cheaper, larger, and usually more durable it becomes.
		</p>,
		<p key="2" className="mt-4">
			This is why real systems are never built on one storage layer alone. Registers are unbelievably fast but tiny. RAM
			is fast but volatile. Redis is fast for a distributed system, but still slower than local RAM because the network
			is involved. SSDs and HDDs are slow compared to memory, but they persist data when power disappears.
		</p>,

		<h3 key="3" className="text-xl font-bold mt-12 mb-4">
			The Latency Ladder
		</h3>,
		<Table
			key="4"
			headers={["Layer", "Approximate Access Time", "What Actually Lives Here", "What It Feels Like"]}
			rows={[
				["CPU Registers", "~0.2-0.5 ns", "Current instruction operands, loop counters, temporary values", "Basically immediate"],
				["L1 Cache", "~0.5-1 ns", "The hottest instructions and data the core needs right now", "Still feels instant"],
				["L2 Cache", "~3-5 ns", "Slightly less hot per-core working set", "Tiny slowdown, still extremely fast"],
				["L3 Cache", "~10-20 ns", "Shared CPU cache across cores", "Fast, but noticeably behind L1/L2 to the CPU"],
				["RAM (DRAM)", "~60-100 ns", "Active process memory, app heap, OS page cache", "Fast for humans, slow for CPUs"],
				["Redis / Remote In-Memory Cache", "~0.1-1 ms", "Sessions, hot keys, counters, distributed cache entries", "Fast for services, slow versus local memory"],
				["NVMe SSD", "~50-150 µs", "Databases, WAL, indexes, files, containers, local persistence", "Much slower than RAM, much faster than HDD"],
				["SATA SSD", "~100-500 µs", "General persistent app/data storage", "Still good, but not top-tier"],
				["HDD", "~5-10 ms", "Cheap bulk storage, backups, cold datasets", "Mechanical and slow"],
				["Remote DB / Object Storage", "~1-100+ ms", "S3, network databases, API-backed data", "Network dominates everything"],
			]}
		/>,

		<Callout key="5" type="warning" title="The Important Distinction About Redis">
			People say Redis is "memory speed," but that is only true <strong>inside the Redis process itself</strong>. Your
			application still pays network, kernel, serialization, and protocol overhead. Redis is extremely fast for a
			distributed cache, but it is nowhere near CPU cache or local RAM latency.
		</Callout>,

		<h3 key="6" className="text-xl font-bold mt-12 mb-4">
			Why Each Layer Exists
		</h3>,
		<Grid key="7" cols={2} gap={6} className="mb-10 items-stretch">
			<FeatureCard icon={Cpu} title="Registers" subtitle="single-instruction working state" theme="emerald">
				<p className="text-sm text-emerald-700 dark:text-emerald-100/80 mb-3">
					The absolute fastest place the CPU can read from. This is where arithmetic actually happens.
				</p>
				<ul className="text-sm text-emerald-700 dark:text-emerald-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-emerald-700 dark:text-emerald-400">Use case:</strong> temporary values while an instruction is executing.</li>
					<li><strong className="text-emerald-700 dark:text-emerald-400">Real-world example:</strong> loop counters, function arguments, arithmetic intermediates.</li>
					<li><strong className="text-emerald-700 dark:text-emerald-400">Drawback:</strong> microscopic capacity. You do not "store application state" here manually.</li>
				</ul>
			</FeatureCard>

			<FeatureCard icon={Layers} title="L1 / L2 / L3 Cache" subtitle="keep the CPU fed" theme="amber">
				<p className="text-sm text-amber-700 dark:text-amber-100/80 mb-3">
					These caches exist because RAM is too slow relative to modern CPUs. The processor guesses what data it will
					need next and keeps it near the core.
				</p>
				<ul className="text-sm text-amber-700 dark:text-amber-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-amber-700 dark:text-amber-400">Use case:</strong> hot code paths, tight loops, recently touched memory.</li>
					<li><strong className="text-amber-700 dark:text-amber-400">Real-world example:</strong> a B-tree node or hot hash bucket reused repeatedly.</li>
					<li><strong className="text-amber-700 dark:text-amber-400">Drawback:</strong> tiny capacity and cache misses are expensive.</li>
				</ul>
			</FeatureCard>

			<FeatureCard icon={MemoryStick} title="RAM" subtitle="the main active workspace" theme="cyan">
				<p className="text-sm text-cyan-700 dark:text-cyan-100/80 mb-3">
					RAM is where your running processes, heaps, stacks, buffers, and OS page cache live. It is the normal place
					for active program state.
				</p>
				<ul className="text-sm text-cyan-700 dark:text-cyan-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-cyan-700 dark:text-cyan-400">Use case:</strong> active requests, application memory, in-process caches.</li>
					<li><strong className="text-cyan-700 dark:text-cyan-400">Real-world example:</strong> Node.js heap, JVM heap, Postgres buffer cache.</li>
					<li><strong className="text-cyan-700 dark:text-cyan-400">Drawback:</strong> volatile. Power loss means the data disappears.</li>
				</ul>
			</FeatureCard>

			<FeatureCard icon={Database} title="Redis / Distributed Cache" subtitle="shared fast state across machines" theme="sky">
				<p className="text-sm text-sky-700 dark:text-sky-100/80 mb-3">
					Redis exists when one machine's RAM is not enough because the state must be shared across many app servers.
				</p>
				<ul className="text-sm text-sky-700 dark:text-sky-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-sky-700 dark:text-sky-400">Use case:</strong> sessions, rate limits, hot keys, counters, queues.</li>
					<li><strong className="text-sky-700 dark:text-sky-400">Real-world example:</strong> login sessions, feature flags, caching product pages.</li>
					<li><strong className="text-sky-700 dark:text-sky-400">Drawback:</strong> network hop, memory cost, and possible durability tradeoffs.</li>
				</ul>
			</FeatureCard>

			<FeatureCard icon={HardDrive} title="SSD" subtitle="durable storage with acceptable latency" theme="violet">
				<p className="text-sm text-violet-700 dark:text-violet-100/80 mb-3">
					SSDs are slow compared to memory but fast enough to make databases, indexes, WAL files, and general
					persistent workloads practical.
				</p>
				<ul className="text-sm text-violet-700 dark:text-violet-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-violet-700 dark:text-violet-400">Use case:</strong> primary database storage, indexes, logs, file systems.</li>
					<li><strong className="text-violet-700 dark:text-violet-400">Real-world example:</strong> Postgres tables and indexes on NVMe.</li>
					<li><strong className="text-violet-700 dark:text-violet-400">Drawback:</strong> still orders of magnitude slower than RAM.</li>
				</ul>
			</FeatureCard>

			<FeatureCard icon={Network} title="HDD / Remote Storage" subtitle="capacity and durability over speed" theme="orange">
				<p className="text-sm text-orange-700 dark:text-orange-100/80 mb-3">
					These layers are used because they are cheap, large, durable, and operationally useful, not because they are
					fast.
				</p>
				<ul className="text-sm text-orange-700 dark:text-orange-100/70 list-disc pl-5 space-y-2">
					<li><strong className="text-orange-700 dark:text-orange-400">Use case:</strong> archives, backups, object storage, cold analytics data.</li>
					<li><strong className="text-orange-700 dark:text-orange-400">Real-world example:</strong> S3 objects, HDD-based backup arrays, log archives.</li>
					<li><strong className="text-orange-700 dark:text-orange-400">Drawback:</strong> latency is high enough that you design around it, not through it.</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<h3 key="8" className="text-xl font-bold mt-12 mb-4">
			When To Use Which Layer
		</h3>,
		<Table
			key="9"
			headers={["Need", "Best Layer", "Why", "What You Give Up"]}
			rows={[
				[
					"Fastest possible arithmetic and instruction execution",
					"Registers + CPU caches",
					"Nothing beats on-chip access",
					"Almost zero capacity and no direct application-level control",
				],
				[
					"Normal active program state",
					"RAM",
					"Fast enough for application logic and huge compared to caches",
					"Data disappears on power loss",
				],
				[
					"Shared fast state across many app servers",
					"Redis",
					"Centralized in-memory access for distributed systems",
					"Network hop, memory cost, and infrastructure complexity",
				],
				[
					"Primary durable storage for live applications",
					"SSD",
					"Strong compromise between speed and persistence",
					"Still too slow for CPU-style random access patterns",
				],
				[
					"Cheap bulk storage",
					"HDD",
					"Low cost per GB",
					"Mechanical latency and weak random I/O performance",
				],
				[
					"Massive durable remote storage",
					"Object storage / remote services",
					"Scales operationally and economically",
					"Network latency dominates and access is far from instant",
				],
			]}
		/>,

		<h3 key="10" className="text-xl font-bold mt-12 mb-4">
			What a Real Request Usually Touches
		</h3>,
		<Flow
			key="11"
			steps={[
				{
					title: "1. CPU tries registers and caches first",
					description:
						"If the needed instruction or data is already hot, the request stays extremely fast.",
				},
				{
					title: "2. Cache miss falls back to RAM",
					description:
						"The application reads process memory, heap objects, or OS-managed page cache.",
				},
				{
					title: "3. Distributed state may hit Redis",
					description:
						"If the app needs shared session state, a distributed counter, or a hot cache entry, a network trip happens here.",
				},
				{
					title: "4. Durable source of truth hits SSD-backed storage",
					description:
						"If the data is not already cached, the database or filesystem eventually reaches persistent storage.",
				},
				{
					title: "5. Cold or remote data may go even farther",
					description:
						"Backups, archives, object storage, and remote analytics systems are slower still, but cheaper and more durable at scale.",
				},
			]}
		/>,

		<Callout key="12" type="tip" title="Why Slow Layers Still Matter">
			If SSDs and HDDs are "slow," why use them? Because <strong>speed is not the only axis</strong>. Real systems care
			about durability, capacity, cost per GB, operational simplicity, replication, and recoverability. The fast layers
			make the system responsive. The slow layers make the system survive.
		</Callout>,

		<Callout key="13" type="warning" title="The Most Common Performance Mistake">
			Teams often optimize CPU code while the real bottleneck is elsewhere: cache misses, RAM pressure, Redis network
			hops, disk I/O, or cross-region calls. The farther away the data is from the CPU, the more the architecture starts
			to matter more than the individual line of code.
		</Callout>,
	],
};
