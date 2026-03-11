import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Highlight } from "@/components/ui/Highlight";

export const frontendFrameworksTopic: Topic = {
	id: "frontend-frameworks",
	title: "React vs Vue vs Angular",
	description:
		"Analyzing the mental models, rendering strategies, and reactivity systems of the Big Three frontend powerhouses.",
	tags: ["frontend", "javascript", "react", "vue", "angular"],
	icon: "LayoutTemplate",
	content: [
		<p key="1">
			Modern web development is dominated by component-based architectures. While they all aim to solve the problem of
			synchronizing state with the UI, their internal mental models and performance characteristics diverge
			significantly. Choosing the "wrong" framework can lead to maintenance nightmares or performance debt if your
			project goals don't align with the framework's philosophy.
		</p>,

		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			The Architectural Deep-Dive
		</h4>,

		<Grid key="3" cols={2} gap={6} className="my-8">
			<Card title="React: The VDOM King" description="JS-First, Unopinionated">
				<ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4 mt-2">
					<li>
						<strong className="text-foreground">Mechanism:</strong> Uses a{" "}
						<Highlight variant="primary">Virtual DOM</Highlight>. Updates trigger a full re-render of the component tree
						(unless memoized), which React then diffs against the real DOM.
					</li>
					<li>
						<strong className="text-foreground">Reactivity:</strong> One-way data flow via "Pull" reactivity. React
						doesn't know *what* changed, only that *something* might have, so it re-runs everything.
					</li>
					<li>
						<strong className="text-foreground">Pros:</strong> Massive ecosystem (Next.js), largest talent pool, total
						architectural freedom.
					</li>
				</ul>
			</Card>

			<Card title="Angular: The Enterprise Tank" description="Opinionated, Full-Featured">
				<ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4 mt-2">
					<li>
						<strong className="text-foreground">Mechanism:</strong> Traditionally used "Dirty Checking" with Zone.js.
						Recent versions moved to <Highlight variant="warning">Signals</Highlight> for fine-grained updates without
						checking the whole app.
					</li>
					<li>
						<strong className="text-foreground">Reactivity:</strong> Strongly opinionated MVC/Service architecture with
						Dependency Injection.
					</li>
					<li>
						<strong className="text-foreground">Pros:</strong> Batteries-included (Routing, HTTP, Forms all built-in),
						perfect for huge teams needing strict standardized patterns.
					</li>
				</ul>
			</Card>

			<Card title="Vue 3: The Hybrid Gem" description="Approachable & Optimized">
				<ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4 mt-2">
					<li>
						<strong className="text-foreground">Mechanism:</strong> Uses a VDOM but with{" "}
						<Highlight variant="info">Static Hoisting</Highlight>. The compiler optimizes the templates, marking static
						parts so they are never re-diffed.
					</li>
					<li>
						<strong className="text-foreground">Reactivity:</strong> Push-based via JavaScript Proxies. Updates are
						precise; only what changed is updated.
					</li>
					<li>
						<strong className="text-foreground">Pros:</strong> Gentlest learning curve, excellent official tooling,
						best-in-class performance/bundle-size ratio for middle-tier apps.
					</li>
				</ul>
			</Card>

			<Card title="Svelte/Solid: The Next Gen" description="Zero VDOM, Pure JS">
				<ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4 mt-2">
					<li>
						<strong className="text-foreground">Mechanism:</strong> <Highlight variant="info">Compile-time</Highlight>{" "}
						(Svelte) or <Highlight variant="primary">Signals</Highlight> (Solid). They bypass the VDOM entirely,
						updating the DOM nodes directly.
					</li>
					<li>
						<strong className="text-foreground">Performance:</strong> Lowest runtime overhead and smallest bundle sizes.
					</li>
					<li>
						<strong className="text-foreground">Pros:</strong> Native-feeling performance, high developer satisfaction,
						minimal boilerplate.
					</li>
				</ul>
			</Card>
		</Grid>,

		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			The Executive Decision Matrix
		</h4>,

		<div key="5" className="mb-8">
			<Table
				headers={["Criterion", "React", "Angular", "Vue", "Svelte"]}
				rows={[
					["Learning Curve", "Medium", "High (Hard)", "Low (Easy)", "Very Low"],
					["Ecosystem", "Massive (Best)", "Built-in (Good)", "Mature", "Growing"],
					["State Management", "Fragmented/Flex", "RxJS / Signals", "Pinia (Official)", "Store API"],
					["Bundle Size", "Medium-Large", "Large", "Medium", "Tiny"],
					["Performance", "Reliant on optimization", "Very Solid (AOT)", "Highly Optimized", "Best"],
				]}
			/>
		</div>,

		<h4 key="6" className="text-xl font-bold mt-8 mb-4">
			Which One Should You Actually Use?
		</h4>,

		<div key="7" className="space-y-4">
			<Callout type="info" title="The Industry Default: React">
				Best for <strong>startups and agencies</strong>. When you need to hire fast, find libraries for every niche
				problem, or want to leverage the massive Next.js ecosystem for SEO/SSR. Its "unopinionated" nature means you
				must have a senior developer to enforce patterns.
			</Callout>

			<Callout type="warning" title="The Enterprise Choice: Angular">
				Best for <strong>Large Corporations (Banks, Insurance, Fortune 500)</strong>. When you have 50+ developers
				working on one app and need a "One True Way" to build features. The steep learning curve is an investment in
				long-term standard consistency.
			</Callout>

			<Callout type="tip" title="The High Performance Path: Vue or Svelte">
				Best for <strong>Performance-critical or lean projects</strong>. Choose Vue if you want a reliable,
				batteries-included middle ground. Choose Svelte if you want to push the boundaries of bundle size and "no-V-DOM"
				developer experience.
			</Callout>
		</div>,

		<h4 key="8" className="text-xl font-bold mt-8 mb-4">
			Modern Trend: The Rise of Signals
		</h4>,
		<p key="9">
			In 2024/2025, every major framework is pivoting toward <strong>Signals</strong>. Unlike React's heavy-handed tree
			re-rendering, Signals allow for "fine-grained" reactivity—where changing a single number in memory updates exactly
			one <code>&lt;span&gt;</code> in the DOM without running any JS in the business components. This represents a
			massive shift from "Virtual DOM" (The 2014 era) to "Proxied Reactivity" (The 2025 era).
		</p>,
	],
};
