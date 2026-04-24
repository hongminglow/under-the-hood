import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Repeat2, ShieldCheck } from "lucide-react";

export const idempotencyTopic: Topic = {
	id: "api-idempotency",
	title: "Idempotency in APIs",
	description:
		"The subtle but critical API property that prevents double charges, duplicate orders, and data corruption in distributed systems.",
	tags: ["api", "architecture", "dist-systems", "interview"],
	icon: "Repeat2",
	content: [
		<p key="1">
			An operation is <strong>idempotent</strong> if performing it <strong>multiple times</strong> produces the{" "}
			<strong>exact same result</strong> as performing it once. In distributed systems where networks are unreliable,
			the client might <strong>retry a request</strong> because the response was lost — even though the server already
			processed it. Without idempotency, the user gets <strong>charged twice</strong>.
		</p>,
		<Table
			key="2"
			headers={["HTTP Method", "Idempotent?", "Why"]}
			rows={[
				["GET", "Yes", "Reading data never changes state."],
				["PUT", "Yes", "Replacing with the same payload produces same result."],
				["DELETE", "Yes", "Deleting an already-deleted resource = same outcome."],
				["POST", "No", "Each call creates a NEW resource (unless you add idempotency)."],
				["PATCH", "Depends", "If patch increments (x + 1), it's not idempotent."],
			]}
		/>,
		<h4 key="3" className="text-xl font-bold mt-8 mb-4">
			Making POST Idempotent: Idempotency Keys
		</h4>,
		<CodeBlock
			key="4"
			language="typescript"
			title="Stripe's Idempotency Key Pattern"
			code={`// Client generates a unique key for each logical operation
const response = await fetch('/api/charges', {
  method: 'POST',
  headers: {
    'Idempotency-Key': 'charge_abc123_retry',  // Same key = same result
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ amount: 1000, currency: 'usd' }),
});

// Server-side logic:
// 1. Check if idempotency key exists in Redis/DB
// 2. If yes → return the cached response (no re-processing)
// 3. If no → process the charge, store the response with the key`}
		/>,
		<Grid key="5" cols={2} gap={6} className="my-8">
			<FeatureCard icon={Repeat2} title="Without Idempotency" subtitle="Retry becomes a duplicate mutation" theme="rose">
				<p className="text-sm text-rose-200/80">
					Client sends POST /charge. Server processes it. Response lost in transit. Client retries. Server processes it{" "}
					<strong className="text-rose-300">again</strong>. User is charged <strong className="text-rose-300">$200 instead of $100</strong>.
				</p>
			</FeatureCard>
			<FeatureCard icon={ShieldCheck} title="With Idempotency Key" subtitle="Retry returns the cached result" theme="emerald">
				<p className="text-sm text-emerald-200/80">
					Client sends POST /charge with key <code>abc123</code>. Server processes it, stores result keyed by{" "}
					<code>abc123</code>. Response lost. Client retries with same <code>abc123</code>. Server returns{" "}
					<strong className="text-emerald-300">cached result</strong>. User charged exactly <strong className="text-emerald-300">$100</strong>.
				</p>
			</FeatureCard>
		</Grid>,
		<Callout key="6" type="warning" title="The Database Insert Trap">
			<code>INSERT INTO orders ...</code> is <strong>never idempotent</strong> — retrying creates duplicate rows. Fix:
			use a <strong>unique constraint</strong> on the idempotency key column, or use{" "}
			<code>INSERT ... ON CONFLICT DO NOTHING</code> (PostgreSQL) to skip duplicate inserts. Every payment and order
			system in production must handle this.
		</Callout>,
	],
};
