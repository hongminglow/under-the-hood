import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Package2, SplitSquareVertical } from "lucide-react";

export const microFrontendsTopic: Topic = {
	id: "micro-frontends",
	title: "Micro-Frontends",
	description:
		"How enterprise engineering teams safely split massive monolithic web applications into independent deployable fragments.",
	tags: ["frontend", "architecture", "micro-frontends"],
	icon: "Layers",
	content: [
		<p key="1" className="mb-6">
			When an application grows to involve hundreds of frontend developers, a traditional React/Vue "Monolith" breaks
			down. Build times reach 10 minutes, merge conflicts become a nightmare, and one bad PR can take down the entire
			production site. <Highlight variant="primary">Micro-Frontends (MFEs)</Highlight> solve this by breaking the UI
			into completely independent applications that are dynamically stitched together at runtime inside a "Host" shell.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Challenge: Seamless Integration
		</h3>,

		<p key="2a" className="mb-6">
			<strong>The Problem:</strong> Splitting applications is easy, but integrating them into a seamless UX is
			incredibly difficult. You risk forcing the user to download 5 different copies of React, dealing with global CSS
			collisions, and solving cross-domain routing issues.
			<br />
			<br />
			<strong>The Solution:</strong> Choosing the correct architectural framework that handles dependency sharing and
			runtime injection natively over the network without massive overhead.
		</p>,

		<h3 key="3" className="text-xl font-bold mt-8 mb-4">
			Popular MFE Frameworks Comparison
		</h3>,

		<Table
			key="4"
			headers={["Technology", "How it Works", "UX / Performance", "Verdict"]}
			rows={[
				[
					"Module Federation (Webpack/Vite)",
					"Native bundler feature that streams compiled JS chunks dynamically via CDN at runtime.",
					"Excellent. Supports intelligent 'Shared Dependencies' to prevent downloading React twice.",
					"The undeniable modern standard. It is natively built into modern bundlers and offers seamless execution.",
				],
				[
					"Single-SPA",
					"A top-level JavaScript router that mathematically mounts and unmounts entire SPA frameworks.",
					"Good, but brittle. Relies heavily on SystemJS and manual global variables to share libraries.",
					"Legacy standard. Great if you need to mount an old Angular app strictly next to a new React app.",
				],
				[
					"Iframes",
					"Physically embeds a completely isolated browser window inside the existing DOM.",
					"Terrible. Massively heavy memory footprint, isolated routing, and difficult communication.",
					"Only use for absolute security isolation (like 3rd party Stripe payment forms).",
				],
				[
					"Web Components",
					"Wrapping frameworks inside native browser Custom Elements.",
					"Decent, but styling encapsulation (Shadow DOM) causes mass headaches for global design systems like Tailwind.",
					"Best used for micro-component libraries, not massive architectural page routing.",
				],
			]}
		/>,

		<h3 key="5" className="text-xl font-bold mt-8 mb-4">
			Why Module Federation is the Industry Standard
		</h3>,

		<Grid key="6" cols={1} gap={6} className="mb-8">
			<FeatureCard icon={Package2} title="The Power of Shared Dependencies" subtitle="Why shared singletons matter" theme="cyan">
				<p className="text-sm text-cyan-100/75 mb-4">
					<strong>The Problem:</strong> Previously, if Team A's Cart App and Team B's Product App both used React, the
					final user physically downloaded React twice.
				</p>
				<p className="text-sm font-semibold mb-2 text-cyan-300">Architectural Solution:</p>
				<ul className="text-sm text-cyan-100/75 list-disc pl-5 space-y-2">
					<li>
						Module Federation solves this natively via <code>shared</code> singletons.
					</li>
					<li>
						The <strong>Host</strong> app declares React as a shared dependency. When the <strong>Remote</strong> app
						arrives over the network, it physically checks if the Host already loaded React.
					</li>
					<li>
						If yes, it cleverly skips downloading its own copy. This enables extremely fast performance while
						maintaining entirely isolated Git repositories for each team.
					</li>
				</ul>
			</FeatureCard>

			<FeatureCard
				icon={SplitSquareVertical}
				title="Horizontal vs Vertical Composition"
				subtitle="How teams divide ownership"
				theme="violet"
			>
				<p className="text-sm text-violet-100/75 mb-4">
					<strong>The Problem:</strong> How do you structurally divide the screen real estate between different
					enterprise teams?
				</p>
				<p className="text-sm font-semibold mb-2 text-violet-300">Architectural Solutions:</p>
				<ul className="text-sm text-violet-100/75 list-disc pl-5 space-y-2">
					<li>
						<strong>Vertical Split (Recommended):</strong> Team A owns <code>/checkout</code> entirely. When navigated
						there, the Shell mounts Team A's comprehensive app. Cleanest separation of concerns.
					</li>
					<li>
						<strong>Horizontal Split:</strong> Team A owns only the Navbar, Team B owns the Sidebar. Both load
						simultaneously. Much higher complexity, requiring strict API communication contracts (using Custom Events)
						to talk to each other.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<Callout key="7" type="warning" title="The High-Risk Micro-Frontend Trap">
			<strong>The Danger:</strong> Distributed architecture natively introduces a distributed failure model. If the
			backend CDN hosting the 'Navbar MFE' goes down entirely, your core <code>Host</code> app can mathematically crash
			due to a missing JavaScript chunk request.
			<br />
			<br />
			<strong>The Solution:</strong> You must strictly wrap every single Remote component inside a robust React{" "}
			<strong>Error Boundary</strong>. If the Navbar fails to load, the Error Boundary catches the native crash and
			renders a graceful functional fallback without taking down the critical checkout flow.
		</Callout>,
	],
};
