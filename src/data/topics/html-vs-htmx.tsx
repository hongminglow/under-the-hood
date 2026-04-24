import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FileCode2, Zap } from "lucide-react";

export const htmlVsHtmxTopic: Topic = {
	id: "html-vs-htmx",
	title: "HTML vs HTMX",
	description:
		"HTMX is not a new version of HTML. It is a lightweight library that extends normal HTML with server-driven interactivity via hx-* attributes.",
	tags: ["frontend", "html", "htmx", "javascript", "web"],
	icon: "CodeXml",
	content: [
		<p key="1">
			When people say <strong>&quot;HTMLX&quot;</strong>, they usually mean <strong>HTMX</strong>. HTMX is{" "}
			<strong>not</strong> an enhanced version of the HTML language itself. It is a{" "}
			<strong>small JavaScript library</strong> that lets plain HTML elements make requests, swap content, and trigger
			UI updates using attributes like <code>hx-get</code>, <code>hx-post</code>, and <code>hx-target</code>.
		</p>,
		<Callout key="2" type="info" title="Short Answer">
			<strong className="text-blue-300">HTML</strong> describes page structure and content.{" "}
			<strong className="text-blue-300">HTMX</strong> keeps HTML as the main authoring model, but adds browser-side
			behavior so the server can return <strong>HTML fragments</strong> instead of a full new page or a JSON API
			response.
		</Callout>,
		<Table
			key="3"
			headers={["Dimension", "HTML", "HTMX"]}
			rows={[
				["What it is", "The core markup language of the web", "A JavaScript library that augments HTML"],
				[
					"Interactivity",
					"Mostly full-page navigation and native form submits",
					"Partial page updates via hx-* attributes",
				],
				[
					"Primary data flow",
					"Browser loads whole documents",
					"Browser requests fragments and swaps them into the DOM",
				],
				["Server expectation", "Returns full HTML pages", "Often returns partial HTML snippets"],
				["JavaScript needed", "None for static pages", "A little, via the HTMX runtime"],
				["Best fit", "Static pages, documents, simple forms", "Server-rendered apps that need sprinkles of dynamic UI"],
			]}
		/>,
		<Grid key="4" cols={2} gap={6} className="my-8">
			<FeatureCard icon={FileCode2} title="When Plain HTML Is Enough" subtitle="Static-first, browser-native flow" theme="cyan">
				<ul className="list-disc pl-5 space-y-2 text-sm text-cyan-100/75">
					<li>Content pages, docs, landing pages, and simple forms.</li>
					<li>Cases where full-page reloads are acceptable and complexity should stay low.</li>
					<li>Projects leaning on native browser behavior instead of custom client interactions.</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Zap} title="When HTMX Helps" subtitle="Server-driven interactivity without an SPA" theme="emerald">
				<ul className="list-disc pl-5 space-y-2 text-sm text-emerald-100/75">
					<li>
						You want <strong>small dynamic interactions</strong> without moving to a full SPA framework.
					</li>
					<li>
						Your backend already renders HTML and you prefer returning fragments instead of building a large JSON API.
					</li>
					<li>
						You want simpler frontend code for tables, search, filters, modals, inline forms, and partial refreshes.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<Callout key="5" type="warning" title="HTMX Is Not Magic">
			HTMX reduces the amount of custom JavaScript you write, but it does not remove complexity from the system. You
			still need server routes, response fragments, careful DOM targeting, and a good mental model for what the server
			is returning on each interaction.
		</Callout>,
		<CodeBlock
			key="6"
			title="Plain HTML Form"
			language="html"
			code={`<form action="/search" method="GET">
  <input name="q" placeholder="Search articles" />
  <button type="submit">Search</button>
</form>

<!-- Browser submits, server returns a whole new page -->`}
		/>,
		<CodeBlock
			key="7"
			theme="emerald"
			title="HTMX Form"
			language="html"
			code={`<form hx-get="/search" hx-target="#results" hx-swap="innerHTML">
  <input name="q" placeholder="Search articles" />
  <button type="submit">Search</button>
</form>

<div id="results"></div>

<!-- Browser submits in the background, server returns only the results HTML -->`}
		/>,
		<FeatureCard key="8" icon={Zap} title="What Changes Behind The Scenes?" subtitle="The transport model is the real difference" theme="emerald">
			<ul className="list-disc pl-5 space-y-2 text-sm text-emerald-100/75">
				<li>
					With <strong>plain HTML</strong>, clicking links and submitting forms usually means loading a{" "}
					<strong>new full document</strong>.
				</li>
				<li>
					With <strong>HTMX</strong>, the library intercepts those interactions, makes an HTTP request in the
					background, and swaps the returned HTML fragment into a selected DOM target.
				</li>
				<li>
					That means the server still owns most of the rendering logic, which is why HTMX is often called{" "}
					<strong>server-driven UI</strong>.
				</li>
			</ul>
		</FeatureCard>,
		<Table
			key="9"
			headers={["If You Need...", "Usually Choose..."]}
			rows={[
				["Pure content and full-page navigation", "HTML"],
				["Small dynamic updates without a SPA", "HTMX"],
				["Heavy client-side state and rich app behavior", "React/Vue/other SPA tools"],
			]}
		/>,
		<Callout key="10" type="success" title="Rule Of Thumb">
			HTML is the <strong>language</strong>. HTMX is a <strong>library on top of HTML</strong>. If you want mostly
			server-rendered pages with a bit of dynamic behavior, HTMX is a great fit. If you just need normal documents and
			forms, plain HTML is simpler.
		</Callout>,
	],
};
