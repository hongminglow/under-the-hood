import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Building2, FileCode2, FileText, GitBranch, Repeat2, Rows3 } from "lucide-react";

export const sdlcMethodologiesTopic: Topic = {
	id: "sdlc-methodologies",
	title: "SDLC Methodologies: Agile, Scrum, Kanban & Beyond",
	description:
		"A deep comparison of the most widely used software development lifecycle (SDLC) methodologies — how each one affects your team's velocity, costs, quality, and ability to adapt to change.",
	tags: ["engineering", "process", "agile", "project-management"],
	icon: "GitBranch",
	content: [
		<p key="intro">
			Choosing a software development methodology is not a religious debate — it is an engineering decision with
			measurable consequences on delivery speed, cost predictability, code quality, and team burnout. The methodology
			you pick shapes when stakeholders get feedback, how bugs are caught, how scope changes are handled, and whether
			the final product actually matches what users needed. Understanding the trade-offs is essential for any engineer
			who eventually leads a team or sits in a room where these decisions are made.
		</p>,

		/* ── SECTION 1: The Big Picture ─────────────────────────────────────── */
		<h3 key="h3-overview" className="text-xl font-bold mt-12 mb-4">
			The Spectrum: Predictive vs Adaptive
		</h3>,
		<p key="spectrum-sub" className="mb-6">
			Every SDLC methodology sits somewhere on a spectrum between two extremes. Understanding the spectrum first makes
			every specific methodology easier to reason about.
		</p>,
		<Grid key="spectrum-grid" cols={2} gap={6} className="mb-8">
			<Card title="Predictive / Plan-Driven">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>
						Define <strong>all requirements upfront</strong> before writing a single line of code.
					</li>
					<li>
						The plan is the contract. Change is treated as an <strong>exception</strong>, not an expectation.
					</li>
					<li>
						Works well when the problem domain is <strong>fully known</strong> and stable — government contracts,
						embedded systems, regulatory software.
					</li>
					<li>
						<strong className="text-muted-foreground">Examples:</strong> Waterfall, V-Model, CMMI.
					</li>
				</ul>
			</Card>
			<Card title="Adaptive / Iterative">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>
						Requirements <strong>emerge over time</strong> through short feedback cycles between the team and
						stakeholders.
					</li>
					<li>
						Change is a <strong>first-class citizen</strong>. The plan adapts as learning happens.
					</li>
					<li>
						Works well when the problem is <strong>uncertain or novel</strong> — SaaS products, consumer apps, startup
						MVPs.
					</li>
					<li>
						<strong className="text-muted-foreground">Examples:</strong> Agile, Scrum, Kanban, XP, SAFe.
					</li>
				</ul>
			</Card>
		</Grid>,

		<h3 key="h3-actors" className="text-xl font-bold mt-12 mb-4">
			The Main Characters
		</h3>,
		<p key="actors-sub" className="mb-6">
			These methodologies come back throughout the article, so it helps to treat each one as a distinct operating
			model rather than a generic process label.
		</p>,
		<Grid key="actors-grid" cols={3} gap={6} className="mb-8">
			<FeatureCard icon={FileText} title="Waterfall" subtitle="phase-gate certainty" theme="amber">
				<p>
					Optimizes for upfront scope, formal sign-off, and auditability. Strong when the domain is stable; painful
					when learning arrives late.
				</p>
			</FeatureCard>
			<FeatureCard icon={Repeat2} title="Scrum" subtitle="time-boxed feedback" theme="cyan">
				<p>
					Optimizes for sprint rhythm, stakeholder review, and team commitment. Strong for product delivery; noisy
					when work is mostly interrupts.
				</p>
			</FeatureCard>
			<FeatureCard icon={Rows3} title="Kanban" subtitle="flow and WIP limits" theme="teal">
				<p>
					Optimizes for continuous delivery, visible bottlenecks, and operational responsiveness. Strong when work
					arrives unpredictably.
				</p>
			</FeatureCard>
			<FeatureCard icon={FileCode2} title="XP" subtitle="engineering discipline" theme="emerald">
				<p>
					Optimizes for technical quality through TDD, CI, pairing, and refactoring. Strong when speed must not
					decay into fragile code.
				</p>
			</FeatureCard>
			<FeatureCard icon={Building2} title="SAFe" subtitle="enterprise coordination" theme="violet">
				<p>
					Optimizes for dependency visibility across many teams. Strong in large organizations; risky when ceremony
					becomes a substitute for autonomy.
				</p>
			</FeatureCard>
			<FeatureCard icon={GitBranch} title="Agile" subtitle="the philosophy layer" theme="sky">
				<p>
					Not a framework by itself. Agile is the value system underneath Scrum, Kanban, XP, and many hybrid team
					operating models.
				</p>
			</FeatureCard>
		</Grid>,

		/* ── SECTION 2: Waterfall ────────────────────────────────────────────── */
		<h3 key="h3-waterfall" className="text-xl font-bold mt-12 mb-4 text-amber-100">
			Waterfall — The Phase-Gate Classic
		</h3>,
		<p key="waterfall-sub" className="mb-6">
			Waterfall is the original, sequential model. Each phase must be <strong>fully completed and signed off</strong>{" "}
			before the next begins. Requirements → Design → Implementation → Testing → Deployment → Maintenance.
		</p>,
		<Grid key="waterfall-grid" cols={2} gap={6} className="mb-6">
			<FeatureCard icon={FileText} title="Waterfall Strengths" subtitle="where phase gates help" theme="amber">
				<ul className="text-sm text-amber-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-amber-300">Highly predictable cost & timeline.</strong> The entire scope is
						defined upfront, so budgeting is straightforward.
					</li>
					<li>
						<strong className="text-amber-300">Clear documentation.</strong> Every phase produces formal
						artefacts — specs, design docs, test plans. Critical for regulated industries.
					</li>
					<li>
						<strong className="text-amber-300">Easy to manage.</strong> Sequential stages are simple to track.
						Non-technical stakeholders understand Gantt charts.
					</li>
					<li>
						<strong className="text-amber-300">Good for fixed-price contracts.</strong> When a client signs a
						contract demanding a specific deliverable, Waterfall's change-resistant structure protects the vendor.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={FileText} title="Waterfall Failure Modes" subtitle="where phase gates hurt" theme="amber">
				<ul className="text-sm text-amber-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-amber-300">Catastrophically late feedback.</strong> Users see the product for
						the first time <em>after</em> it's built. Discovering "this isn't what we wanted" at deployment costs
						10–100× more to fix than at requirements.
					</li>
					<li>
						<strong className="text-amber-300">Change is lethal.</strong> A scope change in phase 3 means
						re-doing phases 1 & 2 artefacts. Change orders are expensive and contentious.
					</li>
					<li>
						<strong className="text-amber-300">Testing is too late.</strong> Bugs found during testing (the
						penultimate phase) have already had enormous design and implementation work built on top of them.
					</li>
					<li>
						<strong className="text-amber-300">High risk of delivering the wrong thing.</strong> Markets move. A
						24-month Waterfall project delivers to a world that has changed.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<FeatureCard
			key="waterfall-callout"
			icon={FileText}
			title="When Waterfall Still Makes Sense"
			subtitle="compliance is the product requirement"
			theme="amber"
		>
			<p>
				Government procurement, aerospace firmware, nuclear plant control software, and medical device development often{" "}
				<em>require</em> Waterfall-like phase gates due to regulatory mandate (FDA, DO-178C, IEC 62304). The compliance
				documentation Waterfall produces is a legal necessity, not an engineering choice.
			</p>
		</FeatureCard>,

		/* ── SECTION 3: Agile ───────────────────────────────────────────────── */
		<h3 key="h3-agile" className="text-xl font-bold mt-12 mb-4 text-sky-100">
			Agile — The Philosophy, Not the Framework
		</h3>,
		<p key="agile-sub" className="mb-4">
			A critical distinction: <strong>Agile is not a methodology</strong>. It is a set of values and principles
			documented in the 2001 Agile Manifesto. Scrum, Kanban, XP, and SAFe are all specific{" "}
			<strong>frameworks that implement</strong> Agile principles. Teams that say "we do Agile" without a specific
			framework often do neither.
		</p>,
		<Grid key="agile-values-grid" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={GitBranch} title="The 4 Agile Values" subtitle="the philosophy layer" theme="sky">
				<ul className="text-sm text-sky-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-sky-300">Individuals & interactions</strong> over processes & tools
					</li>
					<li>
						<strong className="text-sky-300">Working software</strong> over comprehensive documentation
					</li>
					<li>
						<strong className="text-sky-300">Customer collaboration</strong> over contract negotiation
					</li>
					<li>
						<strong className="text-sky-300">Responding to change</strong> over following a plan
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={GitBranch} title="Agile in Practice" subtitle="feedback before certainty" theme="sky">
				<ul className="text-sm text-sky-100/75 space-y-2 list-disc pl-4">
					<li>
						Deliver working software <strong className="text-sky-300">frequently</strong> (weeks, not months) so you get real feedback while
						change is still cheap.
					</li>
					<li>
						Embrace late requirements changes — even near the end — as a <strong className="text-sky-300">competitive advantage</strong>, not a
						failure.
					</li>
					<li>
						Build projects around <strong className="text-sky-300">motivated individuals</strong>. Trust the team. Stop excessive oversight and
						reporting.
					</li>
					<li>
						At regular intervals, the team <strong className="text-sky-300">reflects</strong> on how to become more effective and adjusts its
						behaviour.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		/* ── SECTION 4: Scrum ───────────────────────────────────────────────── */
		<h3 key="h3-scrum" className="text-xl font-bold mt-12 mb-4 text-cyan-100">
			Scrum — Time-Boxed Sprints & Ceremonies
		</h3>,
		<p key="scrum-sub" className="mb-6">
			Scrum is the most widely adopted Agile framework. It organizes work into fixed-length <strong>Sprints</strong>{" "}
			(1–4 weeks), with a defined set of roles, artefacts, and ceremonies.
		</p>,
		<Grid key="scrum-grid" cols={2} gap={6} className="mb-6">
			<FeatureCard icon={Repeat2} title="Scrum Roles" subtitle="ownership boundaries" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-cyan-300">Product Owner (PO):</strong> Owns the Product Backlog. Prioritizes
						features by business value. The single voice of the customer/stakeholder to the team.
					</li>
					<li>
						<strong className="text-cyan-300">Scrum Master:</strong> A servant-leader. Facilitates ceremonies,
						removes blockers, coaches the team on Scrum theory. NOT a project manager.
					</li>
					<li>
						<strong className="text-cyan-300">Development Team:</strong> Self-organizing, cross-functional
						(design, dev, QA). Collectively responsible for sprint delivery. Ideally 3–9 people.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Repeat2} title="Scrum Ceremonies" subtitle="the sprint operating system" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-cyan-300">Sprint Planning:</strong> Team selects items from the backlog and
						commits to what they will deliver this sprint.
					</li>
					<li>
						<strong className="text-cyan-300">Daily Standup (15 min max):</strong> What did I do yesterday? What
						am I doing today? Any blockers?
					</li>
					<li>
						<strong className="text-cyan-300">Sprint Review:</strong> Demo the working software to stakeholders.
						Collect feedback. Update the backlog.
					</li>
					<li>
						<strong className="text-cyan-300">Sprint Retrospective:</strong> What went well? What should we
						improve? How do we change our process?
					</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<Grid key="scrum-pros-cons" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={Repeat2} title="Scrum Strengths" subtitle="rhythm and feedback" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-cyan-300">Regular delivery creates a rhythm and momentum.</strong> The
						entire company can plan around it.
					</li>
					<li>
						<strong className="text-cyan-300">Velocity metrics create a data-driven forecast.</strong> Story
						points per sprint give a rough view of future delivery pace.
					</li>
					<li>
						<strong className="text-cyan-300">Sprint Reviews create a stakeholder feedback loop.</strong> The
						team gets structured input every 2–4 weeks.
					</li>
					<li>
						Clear roles reduce organisational ambiguity — everyone knows who owns the backlog, who facilitates, who
						builds.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Repeat2} title="Scrum Failure Modes" subtitle="when ceremony outruns value" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-cyan-300">Ceremony overhead.</strong> Small teams burn non-trivial time in
						standups, planning, reviews, and retros. At 2-week sprints, that's 6–8 hours of meetings per cycle.
					</li>
					<li>
						<strong className="text-cyan-300">The "Sprint" becomes a hard ceiling.</strong> A story that doesn't
						fit in the sprint gets split artificially or deferred, sometimes creating technical debt.
					</li>
					<li>
						<strong className="text-cyan-300">Story points are often cargo-culted.</strong> Teams argue about
						estimates more than they build. The numbers frequently don't correlate to real time.
					</li>
					<li>
						<strong className="text-cyan-300">Doesn't suit pure operational/support work.</strong> It clashes
						with unpredictable interrupt-driven tasks. (Kanban is better there.)
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		/* ── SECTION 5: Kanban ───────────────────────────────────────────────── */
		<h3 key="h3-kanban" className="text-xl font-bold mt-12 mb-4 text-teal-100">
			Kanban — Flow Over Time-Boxes
		</h3>,
		<p key="kanban-sub" className="mb-6">
			Kanban (originating from Toyota's manufacturing system) manages work as a continuous flow through a visible board.
			There are no sprints, no velocity estimates, no fixed team roles. The core discipline is{" "}
			<strong>limiting Work In Progress (WIP)</strong> to keep flow smooth and expose bottlenecks.
		</p>,
		<Grid key="kanban-principles-grid" cols={2} gap={6} className="mb-6">
			<FeatureCard icon={Rows3} title="The 4 Core Kanban Principles" subtitle="flow control" theme="teal">
				<ul className="text-sm text-teal-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-teal-300">Visualise the Workflow:</strong> Every task on a board. Every
						column is a stage (Backlog → In Progress → Review → Done).
					</li>
					<li>
						<strong className="text-teal-300">Limit WIP:</strong> Each column has a maximum capacity (e.g. "In
						Progress: max 3"). When a column is full, the team pulls from earlier instead of starting new work.
					</li>
					<li>
						<strong className="text-teal-300">Manage Flow:</strong> Track cycle time (time from start to done).
						Focus on making individual items flow through quickly, not on keeping everyone busy.
					</li>
					<li>
						<strong className="text-teal-300">Improve Collaboratively:</strong> Use metrics (lead time,
						throughput) to drive process improvements. No prescribed cadence.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Rows3} title="Kanban vs Scrum" subtitle="continuous pull versus sprint batch" theme="teal">
				<ul className="text-sm text-teal-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-teal-300">No sprints.</strong> Work is delivered continuously, item by item,
						not in batched sprint increments.
					</li>
					<li>
						<strong className="text-teal-300">No story points.</strong> Cycle time (how long does an item take?)
						replaces velocity as the planning metric.
					</li>
					<li>
						<strong className="text-teal-300">No prescribed roles.</strong> No Scrum Master or Product Owner
						requirement. Works with existing team structure.
					</li>
					<li>
						<strong className="text-teal-300">Change is welcome anytime.</strong> Since there's no sprint
						commitment to protect, priorities can shift day-to-day without "breaking" a sprint.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,
		<FeatureCard
			key="kanban-callout"
			icon={Rows3}
			title="Kanban Shines in Operations & Support"
			subtitle="interrupt-driven work needs pull flow"
			theme="teal"
		>
			<p>
				Kanban is the natural fit for DevOps teams, platform engineering, SRE (Site Reliability Engineering), and
				technical support — where work is interrupt-driven and unpredictable. Sprints create artificial resistance to
				unplanned incoming bugs and incidents. Kanban's pull system absorbs them naturally.
			</p>
		</FeatureCard>,

		/* ── SECTION 6: XP ───────────────────────────────────────────────────── */
		<h3 key="h3-xp" className="text-xl font-bold mt-12 mb-4 text-emerald-100">
			Extreme Programming (XP) — Engineering Discipline First
		</h3>,
		<p key="xp-sub" className="mb-6">
			XP is the most engineering-intensive Agile framework. It is less about process ceremonies and more about{" "}
			<strong>specific technical practices</strong> that keep code quality high under rapid iteration pressure.
		</p>,
		<Grid key="xp-grid" cols={2} gap={6} className="mb-6">
			<FeatureCard icon={FileCode2} title="Core XP Practices" subtitle="quality as daily discipline" theme="emerald">
				<ul className="text-sm text-emerald-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-emerald-300">Test-Driven Development (TDD):</strong> Write the failing test
						first. Write the minimal code to make it pass. Refactor. No production code without a test.
					</li>
					<li>
						<strong className="text-emerald-300">Pair Programming:</strong> Two developers, one keyboard. One types
						(driver), one reviews and thinks ahead (navigator). Rotate frequently.
					</li>
					<li>
						<strong className="text-emerald-300">Continuous Integration:</strong> Merge and build code multiple
						times per day. Never let branches diverge for more than a few hours.
					</li>
					<li>
						<strong className="text-emerald-300">Refactoring:</strong> Continuously improve design without changing
						external behaviour. The test suite makes this safe.
					</li>
					<li>
						<strong className="text-emerald-300">Simple Design:</strong> Build the simplest thing that works.
						Resist speculative over-engineering. YAGNI (You Aren't Gonna Need It).
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={FileCode2} title="XP Trade-Offs" subtitle="discipline is not free" theme="emerald">
				<ul className="text-sm text-emerald-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-emerald-300">Higher upfront investment:</strong> Pair programming effectively
						doubles engineer hours per story. But it halves defect rates and knowledge silos.
					</li>
					<li>
						<strong className="text-emerald-300">TDD discipline is hard to maintain:</strong> Under deadline
						pressure, teams skip tests. Without them, XP collapses into cowboy coding.
					</li>
					<li>
						<strong className="text-emerald-300">Not prescriptive about management process:</strong> XP tells you{" "}
						<em>how</em> to write code, not how to plan sprints or interface with stakeholders. Often combined with
						Scrum.
					</li>
					<li>
						<strong className="text-emerald-300">The safety net it creates is massive:</strong> A codebase built
						with TDD + CI can be refactored aggressively. Velocity typically <em>increases</em> over time rather than
						decaying.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		/* ── SECTION 7: SAFe ─────────────────────────────────────────────────── */
		<h3 key="h3-safe" className="text-xl font-bold mt-12 mb-4 text-violet-100">
			SAFe — Scaling Agile Across the Enterprise
		</h3>,
		<p key="safe-sub" className="mb-4">
			The Scaled Agile Framework (SAFe) is designed for organisations with{" "}
			<strong>many teams (50–10,000+ engineers)</strong> that need to coordinate dependencies across squads while
			maintaining Agile principles. It introduces concepts like the Agile Release Train (ART) and Program Increment (PI)
			planning.
		</p>,
		<Grid key="safe-grid" cols={2} gap={6} className="mb-8">
			<FeatureCard icon={Building2} title="Who SAFe Is For" subtitle="coordination at enterprise scale" theme="violet">
				<ul className="text-sm text-violet-100/75 space-y-2 list-disc pl-4">
					<li>
						Large enterprises where multiple Scrum teams share infrastructure, APIs, or databases and need to{" "}
						<strong className="text-violet-300">coordinate releases</strong>.
					</li>
					<li>
						Organisations transitioning from Waterfall at scale — SAFe provides familiar planning horizons (Quarterly PI
						plans ≈ Waterfall quarters) while introducing iteration.
					</li>
					<li>
						Environments with significant <strong className="text-violet-300">regulatory reporting</strong> requirements — SAFe provides Lean
						Portfolio Management to satisfy governance.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Building2} title="SAFe Criticisms" subtitle="coordination can become bureaucracy" theme="violet">
				<ul className="text-sm text-violet-100/75 space-y-2 list-disc pl-4">
					<li>
						<strong className="text-violet-300">"Wagile":</strong> SAFe critics argue it re-introduces Waterfall
						at the programme level (quarterly PI plans are essentially mini-Waterfalls) while calling it Agile.
					</li>
					<li>
						<strong className="text-violet-300">Certification-heavy & expensive:</strong> The SAFe consulting
						industry and certification ecosystem is a significant budget overhead.
					</li>
					<li>
						<strong className="text-violet-300">Bureaucracy creep:</strong> The number of roles, artefacts, and
						meetings SAFe prescribes can overwhelm small-to-medium teams.
					</li>
					<li>
						<strong className="text-violet-300">Team autonomy suffers:</strong> Top-down PI planning reduces
						individual team's ability to self-organize around emerging priorities.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		/* ── SECTION 8: The Big Comparison ──────────────────────────────────── */
		<h3 key="h3-compare" className="text-xl font-bold mt-12 mb-4">
			Side-by-Side Comparison
		</h3>,
		<Table
			key="compare-table"
			headers={[
				"Dimension",
				"<span class='text-amber-300'>Waterfall</span>",
				"<span class='text-cyan-300'>Scrum</span>",
				"<span class='text-teal-300'>Kanban</span>",
				"<span class='text-emerald-300'>XP</span>",
				"<span class='text-violet-300'>SAFe</span>",
			]}
			rows={[
				[
					"Planning Horizon",
					"Full project upfront",
					"Sprint (1–4 weeks)",
					"Continuous (no fixed cycle)",
					"Short iterations (1–2 weeks)",
					"Quarter (PI = 8–12 weeks)",
				],
				["Change Tolerance", "Very low", "Per sprint boundary", "Anytime", "Anytime", "Per PI boundary"],
				["Team Size", "Any", "3–9 per team", "Any", "2–12", "50–10,000+"],
				[
					"Delivery Frequency",
					"Once at end",
					"Every sprint",
					"Continuously",
					"Daily / continuously",
					"Every PI (~quarterly)",
				],
				[
					"Stakeholder Feedback Loop",
					"End of project",
					"Every sprint review",
					"When items complete",
					"Daily (on-site customer)",
					"Every PI Demo",
				],
				[
					"Cost Predictability",
					"High (fixed scope)",
					"Medium",
					"Medium (cycle time based)",
					"Medium",
					"High (quarterly budget)",
				],
				[
					"Technical Quality Focus",
					"Low (testing is last phase)",
					"Medium (Definition of Done)",
					"Low (process agnostic)",
					"Very high (TDD, CI, Pairing)",
					"Medium",
				],
				[
					"Best Fit",
					"Fixed-scope, regulated, known domain",
					"Product teams, SaaS, startups",
					"Support, DevOps, operations",
					"High-quality product engineering",
					"Large enterprise coordination",
				],
			]}
		/>,

		/* ── SECTION 9: Impact on Speed, Cost & Quality ─────────────────────── */
		<h3 key="h3-impact" className="text-xl font-bold mt-12 mb-4">
			How Methodology Choice Affects Speed, Cost & Quality
		</h3>,
		<Table
			key="impact-grid"
			headers={[
				"Dimension",
				"<span class='text-amber-300'>Waterfall</span>",
				"<span class='text-cyan-300'>Scrum</span> / <span class='text-teal-300'>Kanban</span> / <span class='text-emerald-300'>XP</span>",
				"<span class='text-violet-300'>SAFe</span>",
			]}
			rows={[
				[
					"Speed to market",
					"Slow: all features ship together at the end, so the first usable version arrives late.",
					"Fast: a shippable increment exists after each sprint or each completed item.",
					"Medium: faster than Waterfall at scale, but often tied to quarterly PI cadence.",
				],
				[
					"Cost dynamics",
					"Cheap only when requirements stay fixed; change orders and re-architecture make late changes expensive.",
					"Predictable ongoing cost; rework surfaces earlier while it is still cheaper to fix.",
					"Highest overhead from coordination roles, ceremonies, certifications, and enterprise tooling.",
				],
				[
					"Code quality over time",
					"Quality is front-loaded in design, then often degrades under late implementation pressure.",
					"Strong when paired with XP practices like TDD and CI; weaker when sprint pressure creates unchecked debt.",
					"Depends heavily on engineering discipline inside each team; process alignment alone does not create quality.",
				],
				[
					"Team health",
					"Low autonomy and heavy documentation can demotivate senior engineers.",
					"Kanban keeps ceremony low; Scrum works when retros produce real action; XP improves shared ownership.",
					"Useful for dependency visibility, but autonomy suffers when planning becomes too top-down.",
				],
			]}
		/>,

		/* ── SECTION 10: Common Mistakes ─────────────────────────────────────── */
		<h3 key="h3-mistakes" className="text-xl font-bold mt-12 mb-4">
			Common SDLC Mistakes
		</h3>,
		<MistakeCard
			key="m1"
			number={1}
			title="'We Do Agile' Without a Specific Framework"
			problem={
				<>
					A team cancels Waterfall, puts stories on a Jira board, calls their monthly meetings 'sprints', and announces
					they are now Agile. In reality they have daily standups nobody listens to, no Definition of Done, no
					retrospectives, and zero delivery rhythm. This is called <strong>'Fake Agile'</strong> or{" "}
					<strong>'Zombie Scrum'</strong> — the ceremonies without the principles.
				</>
			}
			solution="Commit to a specific framework and implement it fully first, then adapt. Start with basic Scrum or Kanban. The ceremonies exist for a reason — learn why before you skip them."
		/>,
		<MistakeCard
			key="m2"
			number={2}
			title="Using Scrum for Pure Operations Work"
			problem="An infrastructure team is forced to use 2-week sprints with story point estimates. A P0 production outage hits in the middle of a sprint. The team either blows up their sprint commitment to fix it, or ignores the outage to 'protect the sprint'. Both outcomes are terrible."
			solution="Operations, support, and platform teams that deal with interrupt-driven, unplanned work should use Kanban. Sprints and fixed commitments are designed for planned feature development, not reactive operations."
		/>,
		<MistakeCard
			key="m3"
			number={3}
			title="Treating Story Points as Time Estimates"
			problem="A Product Owner tells a client: '50 story points × our 5 points/day velocity = 10 working days.' Management now treats this as a deadline. Engineers know the estimate was a relative complexity guess, not a time forecast. The team is now accountable to something that was never meant to be a time commitment."
			solution="Story points are a team-internal planning tool for capacity forecasting. For external deadline commitments, use historical cycle time data or probabilistic forecasting (Monte Carlo simulation on past throughput). Never convert story points to calendar days for stakeholder contracts."
		/>,
		<MistakeCard
			key="m4"
			number={4}
			title="Scaling Scrum to 50+ People Without an Explicit Scaling Framework"
			problem="A company doubles its engineering team. Instead of updating their process, they add more Scrum teams and try to coordinate with 'sync meetings' between team leads. Teams diverge on API contracts, duplicate work, and step on each other's releases. The coordination meetings multiply until engineers spend more time in meetings than writing code."
			solution="Beyond 3–4 teams sharing a codebase or domain, an explicit scaling framework is necessary — whether Scrum of Scrums, LeSS (Large-Scale Scrum), or SAFe. Dependencies must be made visible and resolved at a programme level, not ad-hoc."
		/>,

		/* ── SECTION 11: Lean ────────────────────────────────────────────────── */
		<Callout key="lean-callout" type="info" title="Lean Software Development — The Foundation Under Everything">
			Lean principles (originating from Toyota Production System) underpin virtually every modern Agile framework. The 7
			core Lean wastes applied to software are: <strong>Partially Done Work</strong> (unmerged branches),{" "}
			<strong>Extra Features</strong> (YAGNI violations), <strong>Relearning</strong> (no documentation/onboarding),{" "}
			<strong>Handoffs</strong> (silos between dev and ops), <strong>Delays</strong> (waiting for approvals),{" "}
			<strong>Task Switching</strong> (too much WIP), and <strong>Defects</strong> (bugs). Every Agile practice can be
			traced back to eliminating one of these wastes.
		</Callout>,

		<Callout key="final-tip" type="tip" title="The Right Answer: Hybrid">
			In practice, the most effective teams rarely adopt one methodology religiously. A common high-performance pattern
			is <strong>Scrum as the management framework</strong> (sprints, backlog, ceremonies) combined with{" "}
			<strong>XP engineering practices</strong> (TDD, CI, pairing) and <strong>Kanban for operations work</strong>{" "}
			(support tickets, infrastructure tasks running in parallel). The methodology serves the team — not the other way
			around.
		</Callout>,
	],
};
