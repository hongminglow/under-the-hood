import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Clock, Database } from "lucide-react";

export const bigOComplexityTopic: Topic = {
	id: "big-o-complexity",
	title: "Big O & Time Complexity",
	description:
		"How algorithm cost grows as input size increases, which complexity classes are actually good, and where they show up in real systems like indexes, scans, sorting, and search.",
	tags: ["algorithms", "fundamentals", "cs", "performance"],
	icon: "TrendingUp",
	content: [
		<p key="1">
			<strong>Big O notation</strong> describes how runtime or memory cost grows as input size grows. It does{" "}
			<strong>not</strong> mean "how fast is this code on my laptop right now?" It means: if today's data volume becomes
			10x larger, does the cost stay flat, grow gently, or explode?
		</p>,
		<p key="1b" className="mt-4">
			The practical question is not just "which Big O is smaller?" The real engineering question is{" "}
			<strong>what size of input, how often, and on which hot path?</strong> An <code>O(n)</code> scan over 30 rows is
			fine. An <code>O(n)</code> scan over 50 million rows on every request is a design problem. An{" "}
			<code>O(n²)</code> loop might be acceptable in an offline admin batch, but disastrous inside a keystroke handler.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			Which Complexity Is Better?
		</h4>,
		<Table
			key="3"
			headers={["Big O", "Human Meaning", "n = 1,000", "Typical Real-World Example"]}
			rows={[
				["O(1)", "Cost stays roughly flat", "1 step", "HashMap lookup, Redis key lookup, array index access"],
				["O(log n)", "Cost grows slowly by halving/searching levels", "~10 steps", "Binary search, B-tree index lookup"],
				["O(n)", "Touch every item once", "1,000 steps", "Array scan, full table scan, summing a list"],
				["O(n log n)", "Near-linear, but with sorting/tree overhead", "~10,000 steps", "Sorting, merge sort, quicksort average case"],
				["O(n²)", "Every item compared with many others", "1,000,000 steps", "Nested loops, naive duplicate detection, pairwise comparisons"],
				["O(2ⁿ)", "Blows up with each extra item", "~2^1000", "Brute-force subset search, naive recursive combinations"],
				["O(n!)", "Practically unusable very quickly", "astronomical", "Trying every permutation, brute-force traveling salesman"],
			]}
		/>,
		<Grid key="4" cols={2} gap={6} className="my-8">
			<FeatureCard icon={Clock} title="O(1) to O(log n)" subtitle="Usually the premium tier" theme="cyan">
				<p className="text-sm text-cyan-100/80 mb-3">
					These are the complexities you want on <strong className="text-cyan-300">hot request paths</strong> and
					high-frequency operations. They scale well and remain practical as systems grow.
				</p>
				<ul className="text-sm text-cyan-100/70 list-disc pl-5 space-y-2">
					<li><strong>O(1):</strong> Great for direct access, caches, hash maps, and precomputed lookups.</li>
					<li><strong>O(log n):</strong> Excellent when ordered structure matters, such as indexes and trees.</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Database} title="O(n) to O(n log n)" subtitle="Usually acceptable in real systems" theme="amber">
				<p className="text-sm text-amber-100/80 mb-3">
					This is where a lot of normal engineering lives. <strong className="text-amber-300">Linear work</strong> is
					not "bad" by itself. It becomes bad when the input is massive or when the operation runs too often.
				</p>
				<ul className="text-sm text-amber-100/70 list-disc pl-5 space-y-2">
					<li><strong>O(n):</strong> Fine for scans, aggregations, validation passes, and one-off jobs.</li>
					<li><strong>O(n log n):</strong> Strong default for sorting and many balanced-tree workflows.</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<Grid key="4b" cols={2} gap={6} className="my-8">
			<FeatureCard icon={Database} title="O(n²) and Beyond" subtitle="Danger zone unless tightly bounded" theme="rose">
				<p className="text-sm text-rose-100/80 mb-3">
					Quadratic and exponential algorithms are where systems start to feel broken. These are acceptable only when{" "}
					<strong className="text-rose-300">n is provably small</strong>, the job is offline, or there is no simpler
					approach.
				</p>
				<ul className="text-sm text-rose-100/70 list-disc pl-5 space-y-2">
					<li><strong>O(n²):</strong> Common accidental bug from nested loops over large datasets.</li>
					<li><strong>O(2ⁿ) / O(n!):</strong> Usually theoretical or brute-force fallback, not production request logic.</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Clock} title="Space Complexity" subtitle="Time is not the only bill you pay" theme="violet">
				<p className="text-sm text-violet-100/80 mb-3">
					Some algorithms are fast because they spend more memory. Others save memory but do more work. Always discuss{" "}
					<strong className="text-violet-300">space-time tradeoffs</strong>, especially in backend and data workloads.
				</p>
				<ul className="text-sm text-violet-100/70 list-disc pl-5 space-y-2">
					<li>Hash maps buy speed with extra memory.</li>
					<li>Merge sort is fast but needs extra space.</li>
					<li>Indexes accelerate reads but cost RAM, disk, and write overhead.</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<h4 key="4c" className="text-xl font-bold mt-8 mb-4">
			Real-World Examples You Already Use
		</h4>,
		<Table
			key="4d"
			headers={["Scenario", "Underlying Complexity", "Why It Matters"]}
			rows={[
				[
					"Array index access: arr[500]",
					"O(1)",
					"The machine can jump directly to the memory offset. No scan required.",
				],
				[
					"HashMap / object key lookup",
					"Usually O(1) average",
					"Great for caches, dedup maps, session stores, and constant-time lookup tables.",
				],
				[
					"Database lookup with a B-tree index",
					"O(log n)",
					"Indexes avoid scanning the whole table. This is one reason indexes are so valuable.",
				],
				[
					"Full table scan without an index",
					"O(n)",
					"The database must inspect rows one by one, which becomes expensive as data grows.",
				],
				[
					"Sorting an array before rendering a leaderboard",
					"O(n log n)",
					"Reasonable and expected. Sorting is one of the most common near-linear costs in production.",
				],
				[
					"Checking every user against every other user for similarity",
					"O(n²)",
					"Works for 100 users, collapses for 10 million unless moved to offline pipelines or approximations.",
				],
			]}
		/>,
		<h4 key="4e" className="text-xl font-bold mt-8 mb-4">
			When Is Each Complexity Acceptable?
		</h4>,
		<Table
			key="4f"
			headers={["Complexity", "Usually Fine When...", "Usually Dangerous When..."]}
			rows={[
				[
					"O(1)",
					"You need fast repeated lookup and can afford the underlying data structure.",
					"The constant factor hides huge memory usage or expensive setup cost.",
				],
				[
					"O(log n)",
					"You need ordered access, range queries, or scalable search on large data.",
					"You assume it is always faster than O(1); it is not if n is tiny and constants dominate.",
				],
				[
					"O(n)",
					"The scan is over a bounded list, background job, batch process, or one-time pass.",
					"It runs per request over massive datasets or inside tight UI loops.",
				],
				[
					"O(n log n)",
					"You are sorting, balancing, or doing normal algorithmic heavy lifting once per operation.",
					"You repeat it unnecessarily inside another large loop or on every keystroke/frame.",
				],
				[
					"O(n²)",
					"The input is small and permanently bounded, such as comparing 20 UI elements.",
					"The input can grow unpredictably or the code runs on a request path.",
				],
				[
					"O(2ⁿ) / O(n!)",
					"You are doing brute-force search on tiny inputs, research tooling, or exact offline optimization.",
					"You expect it to scale with real user data or production traffic.",
				],
			]}
		/>,
		<CodeBlock
			key="5"
			language="typescript"
			title="Recognizing Complexity in Real Code"
			code={`// O(1) — direct access
const item = ordersById[id];

// O(log n) — binary search over sorted data
let lo = 0;
let hi = sortedIds.length - 1;
while (lo <= hi) {
  const mid = (lo + hi) >>> 1;
  if (sortedIds[mid] === target) return mid;
  if (sortedIds[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}

// O(n) — full scan
for (const order of orders) {
  if (order.status === "failed") failedCount++;
}

// O(n²) — hidden pairwise comparison smell
for (const a of users) {
  for (const b of users) {
    if (a.id !== b.id && areSimilar(a, b)) {
      recommendations.push([a.id, b.id]);
    }
  }
}`}
		/>,
		<Callout key="6" type="warning" title="Better Big O Does Not Automatically Mean Better Engineering">
			Big O drops constants and lower-order terms, but real systems still pay them.{" "}
			<code>O(2n + 100)</code> becomes <code>O(n)</code>, yet a supposedly "better" algorithm can still lose in practice
			if it has huge constants, poor cache behavior, expensive allocations, or terrible readability. Use Big O to reason
			about growth, not to end every performance argument.
		</Callout>,
		<Callout key="7" type="tip" title="The Database Analogy That Makes This Click">
			A database index exists largely to turn "scan everything" work into "walk the structure intelligently" work. A
			full table scan is often <code>O(n)</code>. An index lookup is often closer to <code>O(log n)</code>. That one
			shift is the difference between "fast enough forever" and "this query died at scale."
		</Callout>,
	],
};
