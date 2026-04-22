import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const webSecurityTopic: Topic = {
	id: "web-security",
	title: "Web Security (XSS, CSRF & Browser Trust Boundaries)",
	description:
		"Why classic browser attacks became so destructive, what they caused over time, and how modern teams actually keep them contained.",
	tags: ["security", "frontend", "backend", "browser", "xss", "csrf"],
	icon: "ShieldAlert",
	content: [
		<p key="intro-1" className="text-slate-300 leading-relaxed">
			Web security is not just "block hackers." It is the constant discipline of preventing the browser from confusing{" "}
			<strong>attacker-controlled input</strong> with <strong>trusted application intent</strong>. Most devastating web
			attacks happened because the browser was willing to send cookies, execute scripts, render HTML, or follow embeds
			without enough context about who really initiated the action.
		</p>,
		<p key="intro-2" className="mt-4 text-slate-400 leading-relaxed">
			The old web normalized inline scripts, server-rendered HTML, third-party widgets, ambient cookies, and weak admin
			panels. That combination made attacks like <Highlight variant="warning">XSS</Highlight>,{" "}
			<Highlight variant="warning">CSRF</Highlight>, clickjacking, and session theft incredibly effective. Modern
			frameworks and browsers are much better than they used to be, but they do not remove the need for explicit
			security engineering.
		</p>,

		<h2 key="history-title" className="text-xl font-bold text-white mt-10 mb-4">
			Why the Web Became a Security Battlefield
		</h2>,
		<Flow
			key="history-flow"
			steps={[
				{
					title: "1. Early Web: HTML was trusted by default",
					description:
						"Sites were mostly server-rendered documents. Browsers happily rendered whatever HTML came back, and there were very few built-in client-side safety rails.",
				},
				{
					title: "2. Dynamic content created script injection paths",
					description:
						"Forums, guestbooks, CMSes, blog comments, and profile pages started storing user input and re-displaying it to other users. If output encoding was weak, malicious script tags executed for everyone who viewed the page.",
				},
				{
					title: "3. Cookies created the 'confused deputy' problem",
					description:
						"Browsers automatically attached session cookies to requests. That made login seamless, but it also allowed malicious pages to trigger authenticated actions against banks, routers, and admin panels.",
				},
				{
					title: "4. AJAX and SPAs widened the blast radius",
					description:
						"Once apps moved more logic into the browser, a single injected script could read DOM state, scrape data, invoke APIs, steal tokens, and impersonate real users inside rich application flows.",
				},
				{
					title: "5. Modern browsers added guardrails, not immunity",
					description:
						"SameSite cookies, CSP, framework auto-escaping, safer defaults, and better sandboxing reduced many accidental bugs. But dangerous HTML rendering, third-party scripts, legacy endpoints, and business logic flaws still create openings.",
				},
			]}
		/>,
		<Callout key="history-callout" type="info" title="The Core Pattern Behind Most Web Attacks">
			If a site lets attacker input cross a trust boundary without strict validation, encoding, sanitization, or policy
			enforcement, the browser will often do the dangerous thing quite obediently.
		</Callout>,

		<h2 key="attack-map-title" className="text-xl font-bold text-white mt-10 mb-4">
			The Main Attack Families
		</h2>,
		<Table
			key="attack-map-table"
			headers={["Threat", "What the attacker abuses", "What it historically caused", "Primary modern defenses"]}
			rows={[
				[
					"Stored / Reflected / DOM XSS",
					"Untrusted data becomes executable HTML or JavaScript",
					"Account takeover, worm-like self-propagation, credential theft, admin session hijack, silent API abuse",
					"Output escaping, HTML sanitization, CSP, avoiding dangerous DOM sinks, dependency hygiene",
				],
				[
					"CSRF",
					"Browser auto-sends victim cookies to another site",
					"Bank transfers, password changes, router DNS changes, admin action abuse",
					"SameSite cookies, anti-CSRF tokens, Origin/Referer checks, POST-only mutations, re-auth for sensitive actions",
				],
				[
					"Clickjacking",
					"Victim is tricked into clicking hidden or framed UI",
					"One-click approvals, account setting changes, OAuth consent abuse",
					"frame-ancestors CSP, X-Frame-Options, explicit confirmation screens",
				],
				[
					"Session / Token Theft",
					"Secrets exposed to JavaScript, logs, URLs, or third-party code",
					"Persistent impersonation until expiry or revocation",
					"HttpOnly cookies, short-lived tokens, rotation, secure storage, telemetry and revocation",
				],
			]}
		/>,

		<h2 key="xss-title" className="text-xl font-bold text-white mt-10 mb-4">
			XSS: The Attack That Executes as Your User
		</h2>,
		<p key="xss-desc" className="text-slate-300 leading-relaxed">
			Cross-Site Scripting is historically one of the most feared web bugs because it turns your own application into the
			attacker's execution environment. Once malicious script runs in the victim's origin, it can read what the page can
			read, click what the user can click, and call what the frontend can call. Old communities and social networks were
			especially vulnerable because profile fields, comments, signatures, and rich text boxes often stored raw HTML.
		</p>,
		<Grid key="xss-grid" cols={3} gap={6} className="my-8">
			<Card title="Stored XSS" description="Malicious payload is saved and replayed to every future visitor.">
				<p className="text-sm text-slate-300 leading-relaxed">
					This was the classic forum, CMS, and social-network disaster. A malicious payload hidden inside a comment,
					profile bio, or admin note executes every time the page loads. The famous MySpace Samy worm is the iconic
					example: one profile payload spread itself automatically across huge numbers of accounts.
				</p>
			</Card>
			<Card title="Reflected XSS" description="Attacker input bounces off the server immediately in the response.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Common in older search pages, error templates, and server-rendered query string views. A victim clicks a
					crafted URL, and the response reflects unsanitized input into the DOM. This was heavily abused in phishing
					campaigns because one click could execute arbitrary script under a trusted brand domain.
				</p>
			</Card>
			<Card title="DOM-Based XSS" description="The client-side code itself builds dangerous HTML at runtime.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Modern SPAs reduced many server template bugs, but they introduced client-side sinks like{" "}
					<code>innerHTML</code>, URL fragment parsing, unsafe markdown rendering, and third-party widget injection.
					The server can be perfectly fine while the browser code creates the vulnerability locally.
				</p>
			</Card>
		</Grid>,
		<Table
			key="xss-impact-table"
			headers={["What XSS can do", "Why it hurts so badly"]}
			rows={[
				["Steal non-HttpOnly tokens and secrets", "Anything in localStorage, sessionStorage, global JS state, or readable cookies becomes accessible."],
				["Perform actions as the user", "Attackers do not always need to exfiltrate a token if the script can call your APIs directly from the victim session."],
				["Deface content or self-propagate", "Stored payloads can edit profiles, post comments, or plant more payloads, turning one bug into a platform-wide worm."],
				["Target admins", "A low-privilege input field becomes catastrophic if an admin dashboard later renders the malicious content."],
			]}
		/>,
		<CodeBlock
			key="xss-code"
			title="unsafe-vs-safe-rendering.tsx"
			language="tsx"
			code={`// ❌ Dangerous: turns attacker-controlled HTML into DOM nodes
export function UserBio({ bioHtml }: { bioHtml: string }) {
  return <div dangerouslySetInnerHTML={{ __html: bioHtml }} />;
}

// ✅ Safer: render as text when you do not need HTML
export function UserBio({ bioText }: { bioText: string }) {
  return <div>{bioText}</div>;
}

// ✅ If rich HTML is truly required, sanitize before rendering
import DOMPurify from "dompurify";

export function TrustedRichText({ html }: { html: string }) {
  const safeHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}`}
		/>,
		<Callout key="xss-callout" type="warning" title="Modern Frameworks Reduce XSS, They Do Not Eliminate It">
			React, Vue, Svelte, Angular, and modern template engines escape text by default, which is a huge improvement over
			older string-built HTML. But the moment a team uses <code>dangerouslySetInnerHTML</code>, raw markdown plugins,
			unsanitized CMS HTML, dangerous URL handling, inline event handlers, or a compromised third-party script, the old
			problem comes right back.
		</Callout>,

		<h2 key="csrf-title" className="text-xl font-bold text-white mt-10 mb-4">
			CSRF: When the Browser Sends Trust to the Wrong Place
		</h2>,
		<p key="csrf-desc" className="text-slate-300 leading-relaxed">
			Cross-Site Request Forgery is less flashy than XSS, but historically it caused brutal real-world damage because it
			does not need to run code inside your site. It only needs the victim to be logged in somewhere important while
			visiting an attacker-controlled page. The browser, trying to be helpful, automatically attaches cookies to the
			request. That innocent convenience is what attackers abused for years.
		</p>,
		<Flow
			key="csrf-flow"
			steps={[
				{
					title: "1. Victim logs into a trusted app",
					description: "A bank, admin console, cloud dashboard, router UI, or internal company tool sets a session cookie.",
				},
				{
					title: "2. Victim visits attacker content elsewhere",
					description: "An email, ad, forum post, or malicious page causes the browser to initiate a cross-site request.",
				},
				{
					title: "3. Browser attaches the trusted cookies automatically",
					description: "If the target site accepts the request, it may treat it as a legitimate user action.",
				},
				{
					title: "4. Sensitive action executes silently",
					description: "Transfers, password changes, DNS changes, account linking, or admin mutations happen without real user intent.",
				},
			]}
		/>,
		<Grid key="csrf-grid" cols={2} gap={6} className="my-8">
			<Card title="Why CSRF Was So Popular" description="The old web loved cookie-based auth and form submissions.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Many old endpoints accepted state-changing <code>GET</code> requests or simple form posts with no
					additional proof of intent. Home routers were notorious here: attackers could trick victims into changing DNS
					settings or admin configuration because the browser happily sent the local router credentials.
				</p>
			</Card>
			<Card title="Why It Feels Less Universal Today" description="Browsers now ship better cookie behavior.">
				<p className="text-sm text-slate-300 leading-relaxed">
					<Highlight variant="primary">SameSite=Lax</Highlight> became the de facto baseline in modern browsers, and
					many frontend apps now use JSON APIs plus explicit CSRF protections. That lowers the default blast radius,
					but legacy apps, OAuth flows, cross-site embeds, and weakly protected internal tools still get hit.
				</p>
			</Card>
		</Grid>,
		<CodeBlock
			key="csrf-code"
			title="csrf-defense.ts"
			language="typescript"
			code={`// Sensitive mutation routes should require multiple defenses:
// 1. A non-GET method
// 2. SameSite cookies
// 3. A CSRF token or Origin check

app.post("/account/email", requireAuth, (req, res) => {
  const origin = req.get("origin");
  const csrfToken = req.get("x-csrf-token");

  if (origin !== "https://app.example.com") {
    return res.status(403).json({ error: "Invalid origin" });
  }

  if (!timingSafeEqual(csrfToken, req.session.csrfToken)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  // Perform the sensitive update only after both checks pass
  res.json({ ok: true });
});`}
		/>,
		<Callout key="csrf-callout" type="tip" title="SameSite Helps a Lot, But It Is Not a Full Strategy">
			Teams sometimes assume modern browsers have "solved CSRF already." They have reduced many casual cases, but
			sensitive applications should still use explicit anti-CSRF design for mutation endpoints, especially around account
			settings, payments, admin operations, and legacy browser support.
		</Callout>,

		<h2 key="history-attacks-title" className="text-xl font-bold text-white mt-10 mb-4">
			What Classic Web Attacks Actually Caused
		</h2>,
		<Grid key="history-attacks-grid" cols={2} gap={6}>
			<Card title="Worms, Defacement & Forced Posting" description="Old social platforms learned this the hard way.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Stored XSS did not just steal data. It posted on behalf of users, rewrote profiles, spread malicious links,
					and recursively infected more viewers. These incidents taught the industry that "user content" is not a safe
					category by default.
				</p>
			</Card>
			<Card title="Banking & Account Abuse" description="CSRF weaponized ordinary browser behavior.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Transfer forms, password updates, email changes, and payout settings were popular targets. Any site that
					treated cookies as sufficient proof of user intent could be tricked into executing dangerous requests.
				</p>
			</Card>
			<Card title="Admin Panel Compromise" description="Low-privilege input became high-privilege execution.">
				<p className="text-sm text-slate-300 leading-relaxed">
					A harmless-looking support ticket, markdown field, CMS entry, or logs viewer could become an admin-targeted
					XSS sink. Once an admin opened the page, the attacker effectively gained the administrator's browser powers.
				</p>
			</Card>
			<Card title="Supply Chain & Third-Party Script Fallout" description="The risk shifted, but it did not disappear.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Even if your own code is careful, compromised analytics tags, ad scripts, chat widgets, or browser bundles
					can behave like first-party JavaScript at runtime. Modern incidents often look less like raw{" "}
					<code>&lt;script&gt;</code> injection and more like trusted code becoming hostile.
				</p>
			</Card>
		</Grid>,

		<h2 key="modern-title" className="text-xl font-bold text-white mt-10 mb-4">
			Do Modern Frameworks and Browsers Already Handle This for Us?
		</h2>,
		<Table
			key="modern-table"
			headers={["Layer", "What it helps with", "What it does NOT guarantee"]}
			rows={[
				[
					"React / Vue / modern templating",
					"Escapes text content by default, reducing many classic reflected and stored XSS bugs",
					"Does not protect unsafe HTML rendering, bad third-party components, compromised dependencies, or dangerous DOM APIs",
				],
				[
					"Modern browser cookie defaults",
					"SameSite=Lax blocks many ambient cross-site cookie sends by default",
					"Does not remove the need for explicit CSRF protection on sensitive mutation flows",
				],
				[
					"CSP",
					"Constrains script sources and blocks many injected payloads from executing cleanly",
					"Does not rescue a site with wildly permissive policies, unsafe-inline everywhere, or already-trusted malicious scripts",
				],
				[
					"HTTP-only cookies",
					"Stops JavaScript from directly reading session cookies",
					"Does not stop XSS from performing authenticated actions through the victim browser",
				],
				[
					"Framework auth libraries",
					"Provide stronger defaults for sessions, headers, token rotation, and callbacks",
					"Cannot fix weak business logic, unsafe admin tools, or teams bypassing the library's secure defaults",
				],
			]}
		/>,
		<Callout key="modern-callout" type="warning" title="So Is Web Security 'Mostly Handled' Now?">
			No. The baseline is better, but the modern failure mode is more subtle: teams think the framework solved security,
			then reintroduce the exact old vulnerabilities through rich text, markdown, CMS integrations, third-party scripts,
			misconfigured cookies, permissive CSPs, or internal tools that never received production-grade hardening.
		</Callout>,

		<h2 key="prevention-title" className="text-xl font-bold text-white mt-10 mb-4">
			A Practical Modern Prevention Baseline
		</h2>,
		<Grid key="prevention-grid" cols={2} gap={6} className="my-8">
			<Card title="1. Treat All Rendered Input as Untrusted" description="Especially HTML, markdown, URLs, SVG, and CMS content.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Default to plain text rendering. If rich HTML is absolutely required, sanitize aggressively and keep the
					allowed tags tiny. Do not mix user data into script blocks, inline event handlers, CSS, or URL-building code
					without context-aware escaping.
				</p>
			</Card>
			<Card title="2. Store Auth Secrets Defensively" description="Session identifiers should be hard to read and easy to revoke.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Prefer <Highlight variant="primary">HttpOnly</Highlight>, <Highlight variant="primary">Secure</Highlight>,
					and at least <Highlight variant="primary">SameSite=Lax</Highlight> cookies. Avoid keeping high-value tokens in{" "}
					<code>localStorage</code> unless you have a very strong reason and understand the XSS tradeoff fully.
				</p>
			</Card>
			<Card title="3. Require Proof of Intent for Mutations" description="A session cookie alone should not authorize everything.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Use anti-CSRF tokens, Origin or Referer validation, non-idempotent HTTP methods, step-up authentication for
					sensitive operations, and confirmation UX for destructive account actions.
				</p>
			</Card>
			<Card title="4. Enforce Browser-Level Policies" description="The browser can become a strong ally if you configure it.">
				<p className="text-sm text-slate-300 leading-relaxed">
					Ship a strict CSP, deny framing where appropriate, minimize third-party scripts, use Subresource Integrity
					when possible, and log policy violations. Security headers are not glamorous, but they routinely stop
					expensive incidents from turning into platform-wide compromise.
				</p>
			</Card>
		</Grid>,
		<CodeBlock
			key="headers-code"
			title="security-headers.http"
			language="http"
			code={`Set-Cookie: session=...; Path=/; HttpOnly; Secure; SameSite=Lax
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<generated-per-request>'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()`}
		/>,
		<p key="closing" className="text-slate-300 leading-relaxed mt-8">
			The mature way to think about web security is not "will we ever eliminate XSS and CSRF forever?" It is:{" "}
			<strong>how many trust boundaries can we narrow, how many dangerous defaults can we remove, and how many layers
			of defense will still hold when one layer fails?</strong>&nbsp;That mindset is what separates a merely functional
			web app from a resilient one.
		</p>,
	],
};
