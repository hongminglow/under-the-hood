import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const hashTablesTopic: Topic = {
	id: "hash-tables-internals",
	title: "Hash Tables Under the Hood",
	description:
		"How JavaScript objects, Python dicts, and Java HashMaps achieve O(1) lookups — and the collisions that can destroy that guarantee.",
	tags: ["data-structures", "algorithms", "interview", "cs"],
	icon: "Hash",
	content: [
		<p key="1">
			A hash table is the most important data structure in computer science. It maps <strong>keys to values</strong> in{" "}
			<code>O(1)</code> average time — but achieving this requires a carefully designed <strong>hash function</strong>,
			a <strong>collision resolution strategy</strong>, and intelligent <strong>resizing</strong>.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			How It Works
		</h4>,
		<CodeBlock
			key="3"
			language="typescript"
			title="The Core Mechanism"
			code={`// Step 1: Hash the key to get an integer
const hash = hashFunction("name"); // → 2847291

// Step 2: Map to a bucket index using modulo
const index = hash % bucketArray.length; // → 5

// Step 3: Store the key-value pair in bucket[5]
bucketArray[5] = { key: "name", value: "Alice" };

// Lookup: hash("name") → 2847291 → % 8 → bucket[5] → "Alice"
// O(1) — no scanning required!`}
		/>,
		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			Collision Resolution
		</h4>,
		<p key="5" className="mb-4">
			Two different keys can hash to the <strong>same bucket index</strong>. This is a <strong>collision</strong>. How
			we handle it determines real performance.
		</p>,
		<Grid key="6" cols={2} gap={6} className="mb-8">
			<Card title="Chaining (Linked Lists)">
				<p className="text-sm text-muted-foreground">
					Each bucket stores a <strong>linked list</strong> of entries. On collision, append to the list. Lookup scans
					the list at that bucket. Java's HashMap uses this — switching to <strong>red-black trees</strong> when a chain
					exceeds 8 entries.
				</p>
			</Card>
			<Card title="Open Addressing (Linear Probing)">
				<p className="text-sm text-muted-foreground">
					On collision, probe the <strong>next empty bucket</strong> sequentially. No linked lists needed. Python's dict
					uses a variant of open addressing. Faster cache performance but suffers from <strong>clustering</strong>.
				</p>
			</Card>
		</Grid>,
		<Table
			key="7"
			headers={["Operation", "Average", "Worst (All Collisions)"]}
			rows={[
				["Insert", "O(1)", "O(n)"],
				["Lookup", "O(1)", "O(n)"],
				["Delete", "O(1)", "O(n)"],
			]}
		/>,
		<Callout key="8" type="tip" title="Load Factor & Resizing">
			The <strong>load factor</strong> = (number of entries) / (number of buckets). When it exceeds ~0.75, the hash
			table <strong>doubles its bucket array</strong> and rehashes every entry. This single resize is <code>O(n)</code>,
			but amortized over all inserts, each insert is still <code>O(1)</code>. This is why interviewers ask about{" "}
			<strong>amortized complexity</strong>.
		</Callout>,
	],
};
