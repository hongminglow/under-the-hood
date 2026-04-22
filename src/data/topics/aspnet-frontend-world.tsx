import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const aspNetFrontendWorldTopic: Topic = {
	id: "aspnet-frontend-world",
	title: "ASP.NET in the Frontend World",
	description:
		"Why ASP.NET rarely appears in the React/Vue/Angular debate, what is actually special about it, and where it still wins in real companies.",
	tags: ["frontend", "asp.net", "blazor", "razor", "csharp", "architecture"],
	icon: "Layers",
	content: [
		<p key="intro-1" className="text-slate-300 leading-relaxed">
			When frontend engineers compare <Highlight variant="primary">React</Highlight>,{" "}
			<Highlight variant="primary">Vue</Highlight>, and <Highlight variant="primary">Angular</Highlight>, ASP.NET often
			feels strangely absent. That is not because ASP.NET is irrelevant. It is because <strong>ASP.NET historically was
			not just a frontend framework</strong> at all. It was a full web application platform whose UI story was usually{" "}
			<em>server-rendered HTML first</em>, with the frontend and backend living inside one .NET stack.
		</p>,
		<p key="intro-2" className="mt-4 text-slate-400 leading-relaxed">
			So the real question is not "Why does nobody compare ASP.NET to React?" but rather:{" "}
			<strong>which part of ASP.NET are we talking about?</strong>&nbsp;Classic Web Forms, MVC, Razor Pages, and
			Blazor all sit under the broader ASP.NET umbrella, and each occupies a different position in the frontend world.
		</p>,

		<h2 key="what-title" className="text-xl font-bold text-white mt-10 mb-4">
			What ASP.NET Actually Is
		</h2>,
		<Table
			key="what-table"
			headers={["Term", "What it really means", "Frontend position"]}
			rows={[
				[
					"ASP.NET",
					"Microsoft's broad web application platform for building web apps on .NET",
					"Not a single frontend framework. More like an ecosystem with multiple UI models over time.",
				],
				[
					"ASP.NET MVC / Razor Pages",
					"Server-side rendering with C# views and templates that produce HTML on the server",
					"Closer to traditional web architecture than to SPA-first frontend frameworks.",
				],
				[
					"Blazor",
					"A component model for interactive web UI using C# instead of JavaScript as the primary authoring language",
					"This is the part most comparable to React/Vue/Angular, but with a very different tradeoff profile.",
				],
			]}
		/>,
		<Callout key="what-callout" type="info" title="Why the Comparison Usually Feels Off">
			React, Vue, and Angular are usually discussed as <strong>client-side UI frameworks for browser-heavy
			applications</strong>. ASP.NET historically entered companies through the <strong>backend and full-stack
			server-rendered world</strong>. That is why it often gets left out of mainstream frontend debates even though it
			powers a lot of real business software.
		</Callout>,

		<h2 key="history-title" className="text-xl font-bold text-white mt-10 mb-4">
			The Evolution of ASP.NET's Frontend Story
		</h2>,
		<Flow
			key="history-flow"
			steps={[
				{
					title: "1. Web Forms era",
					description:
						"ASP.NET originally offered a desktop-like programming model with server controls, ViewState, and event-driven pages. It abstracted the web heavily, which felt productive at first but often generated opaque markup and lifecycle complexity.",
				},
				{
					title: "2. MVC and Razor era",
					description:
						"The platform shifted toward cleaner separation, explicit routing, controllers, and Razor views. This was more web-native, more maintainable, and much better aligned with SEO-friendly and server-rendered application architectures.",
				},
				{
					title: "3. SPA coexistence era",
					description:
						"As React, Angular, and Vue rose, many .NET shops kept ASP.NET on the backend while moving the frontend to a JavaScript SPA. ASP.NET became the API and identity layer more than the UI layer.",
				},
				{
					title: "4. Blazor era",
					description:
						"Microsoft re-entered the component-based frontend conversation with Blazor, letting teams build interactive UI components in C# via server interactivity or WebAssembly.",
				},
			]}
		/>,

		<h2 key="absence-title" className="text-xl font-bold text-white mt-10 mb-4">
			Why ASP.NET Is Usually Missing from the Big 3 Frontend Conversation
		</h2>,
		<Grid key="absence-grid" cols={2} gap={6} className="my-8">
			<Card title="Different Historical Job" description="ASP.NET solved the full web app problem, not only the browser UI problem.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Traditional ASP.NET pages were rendered on the server. That means routing, templates, auth, model binding,
					and view generation often lived in one platform. React and Vue, by contrast, became famous as browser-side UI
					engines for highly interactive apps.
				</p>
			</Card>
			<Card title="Different Developer Culture" description="ASP.NET usually enters through enterprise .NET teams.">
				<p className="text-sm text-slate-300 leading-relaxed">
					React discourse is driven heavily by frontend specialists and startup ecosystems. ASP.NET discourse is often
					owned by C# and enterprise full-stack teams concerned with identity, internal tooling, long-lived systems, and
					organizational consistency.
				</p>
			</Card>
			<Card title="Blazor Is Newer Than the ASP.NET Brand" description="People often judge the whole stack by its oldest eras.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Some engineers still mentally map ASP.NET to old Web Forms or "old Microsoft stack" stereotypes. That makes
					the conversation lag reality, because modern ASP.NET Core and Blazor are very different from the heavy
					abstractions that gave the older stack its reputation.
				</p>
			</Card>
			<Card title="JS Ecosystem Gravity" description="The browser world still revolves around JavaScript and TypeScript.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Even if Blazor is technically capable, the center of gravity for frontend libraries, tutorials, talent, UI
					component ecosystems, and browser experimentation still lives overwhelmingly in the JS/TS universe.
				</p>
			</Card>
		</Grid>,

		<h2 key="oldschool-title" className="text-xl font-bold text-white mt-10 mb-4">
			So Is ASP.NET Just Traditional and Old-School?
		</h2>,
		<Table
			key="oldschool-table"
			headers={["Statement", "Reality"]}
			rows={[
				[
					"\"ASP.NET is old-school.\"",
					"Partly true historically. Web Forms and server-rendered MVC patterns are older styles. But ASP.NET Core is modern, cross-platform, actively maintained, and far cleaner than the old stack.",
				],
				[
					"\"It is just backend, not frontend.\"",
					"Not quite. Razor Pages and MVC absolutely shape frontend delivery, and Blazor is directly a UI component model. It simply approaches frontend from a server-first and C#-first angle.",
				],
				[
					"\"There is nothing special about it.\"",
					"False. Its special value is exactly that it offers a full-stack .NET path where UI, backend, auth, validation, tooling, and deployment can stay in one ecosystem.",
				],
				[
					"\"Modern companies only want React now.\"",
					"Too simplistic. Public-facing startup UIs skew React, but many enterprise, healthcare, finance, government, and internal-platform teams still choose .NET-based stacks for strong organizational reasons.",
				],
			]}
		/>,

		<h2 key="special-title" className="text-xl font-bold text-white mt-10 mb-4">
			What Is Actually Special About ASP.NET on the UI Side?
		</h2>,
		<Grid key="special-grid" cols={2} gap={6}>
			<Card title="1. C# Across the Stack" description="One language, one toolchain, one hiring story for many teams.">
				<p className="text-sm text-slate-300 leading-relaxed">
					This is the biggest differentiator. A company with strong C# talent can build backend services, business
					logic, validation, identity flows, and interactive UI without switching organizationally into a separate
					JavaScript-first world for every layer.
				</p>
			</Card>
			<Card title="2. Server-First Architecture Feels Native" description="Razor Pages and MVC make SSR feel like the default, not the add-on.">
				<p className="text-sm text-slate-300 leading-relaxed">
					If your app is form-heavy, content-heavy, admin-heavy, or SEO-aware, a server-rendered architecture can be
					simpler, cheaper, and more operationally predictable than shipping a large SPA for everything.
				</p>
			</Card>
			<Card title="3. Blazor Offers a Non-JS Component Path" description="Interactive UI without making JavaScript the center of your codebase.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Blazor is unusual because it says: <em>what if the component model, state management, and rendering logic are
					primarily written in C#?</em> That is genuinely different in the frontend market, not because it beats React
					at everything, but because it changes who can build UI comfortably.
				</p>
			</Card>
			<Card title="4. Enterprise Integration Is Strong" description="Identity, Windows shops, Azure, and existing .NET assets line up naturally.">
				<p className="text-sm text-slate-300 leading-relaxed">
					In many companies the real cost is not "can the browser render this?" but "how cleanly does this fit our
					platform, SSO, auditing, compliance, deployment model, and existing teams?" ASP.NET often scores very well on
					that kind of organizational fit.
				</p>
			</Card>
		</Grid>,

		<h2 key="modes-title" className="text-xl font-bold text-white mt-10 mb-4">
			The Three Main Ways ASP.NET Touches Frontend Work
		</h2>,
		<Table
			key="modes-table"
			headers={["Mode", "How UI is delivered", "Best fit", "Main tradeoff"]}
			rows={[
				[
					"Razor Pages / MVC",
					"HTML rendered on the server and sent to the browser",
					"Forms, CRUD portals, content sites, admin tools, SSR-first apps",
					"Less SPA-style fluidity unless you add extra client-side behavior",
				],
				[
					"Blazor Server",
					"UI events handled on the server with a live SignalR circuit",
					"Internal apps, enterprise dashboards, authenticated line-of-business tools",
					"High interactivity depends on connection quality and server state management",
				],
				[
					"Blazor WebAssembly",
					".NET runtime and app code downloaded to the browser",
					"C#-centric teams wanting richer client-side interactivity",
					"Larger client payload and smaller browser ecosystem than mainstream JS stacks",
				],
			]}
		/>,
		<CodeBlock
			key="razor-code"
			title="Counter.razor"
			language="razor"
			code={`@page "/counter"

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>
<p>Current count: @count</p>

<button class="btn btn-primary" @onclick="IncrementCount">
    Click me
</button>

@code {
    private int count = 0;

    private void IncrementCount()
    {
        count++;
    }
}`}
		/>,
		<p key="razor-desc" className="mt-4 text-slate-400 leading-relaxed">
			That is the key feel of Blazor: component UI, event handlers, and state written in C# instead of React hooks or
			Vue composition code.
		</p>,

		<h2 key="hot-title" className="text-xl font-bold text-white mt-10 mb-4">
			Is It Still a Hot Company Choice?
		</h2>,
		<p key="hot-desc" className="text-slate-300 leading-relaxed">
			As of <strong>April 22, 2026</strong>, the honest answer is: <strong>yes, but in a specific lane</strong>. ASP.NET
			is not the loudest default in public frontend hype cycles, but it remains a serious choice in companies that are
			already invested in .NET, Microsoft identity, Azure, internal tooling, regulated environments, or C#-centric
			engineering teams.
		</p>,
		<Grid key="hot-grid" cols={2} gap={6} className="my-8">
			<Card title="Where It Is Still Strong" description="Organizational fit matters more than hype here.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Enterprise portals, internal dashboards, government systems, healthcare software, banking back offices, B2B
					admin tools, and long-lived line-of-business applications are all places where ASP.NET stays very credible.
				</p>
			</Card>
			<Card title="Where It Is Less Often the Default" description="The public internet frontend scene skews differently.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Consumer startups, design-heavy marketing sites, bleeding-edge browser UI experiments, and teams hiring pure
					frontend specialists usually lean toward the larger React or broader JS ecosystem.
				</p>
			</Card>
		</Grid>,
		<Callout key="hot-callout" type="tip" title="The Right Mental Model">
			ASP.NET is often <strong>hot inside companies</strong> even when it is not <strong>loud on social media</strong>.
			Those are two very different forms of relevance.
		</Callout>,

		<h2 key="choose-title" className="text-xl font-bold text-white mt-10 mb-4">
			When ASP.NET Is the Smart Frontend Choice
		</h2>,
		<Grid key="choose-grid" cols={2} gap={6} className="my-8">
			<Card title="Choose It When..." description="The stack should amplify existing strengths.">
				<ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
					<li>Your company is already deeply invested in C#, .NET, Azure, and Microsoft identity.</li>
					<li>Your app is form-heavy, data-heavy, internal, compliance-heavy, or admin-centric.</li>
					<li>You want fewer moving parts than a separate SPA + API + auth choreography.</li>
					<li>You care more about long-term maintainability and organizational consistency than trend alignment.</li>
				</ul>
			</Card>
			<Card title="Avoid It When..." description="The ecosystem mismatch becomes the real cost.">
				<ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
					<li>Your frontend team is strongly JS/TS-native and depends heavily on that ecosystem.</li>
					<li>You need maximum access to browser-first libraries, design systems, and community examples.</li>
					<li>You are building a very public, design-led SPA where frontend experimentation velocity matters most.</li>
					<li>You want the broadest possible hiring pool of dedicated frontend engineers.</li>
				</ul>
			</Card>
		</Grid>,

		<h2 key="closing-title" className="text-xl font-bold text-white mt-10 mb-4">
			The Real Position of ASP.NET in Frontend Architecture
		</h2>,
		<p key="closing" className="text-slate-300 leading-relaxed">
			ASP.NET is not absent from frontend because it has nothing to offer. It is absent from the usual comparisons
			because it represents a <strong>different architectural philosophy</strong>: server-first roots, strong full-stack
			integration, and now a C#-driven component model through Blazor. It is not the universal answer, and it is not the
			trendiest public choice, but it remains a very real and sometimes excellent option for companies whose priorities
			are stability, platform alignment, and full-stack coherence more than frontend fashion.
		</p>,
	],
};
