import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const webSecurityTopic: Topic = {
	id: "web-security",
	title: "Web Security (XSS & CSRF)",
	description:
		"The two most fundamental vulnerabilities that plague poorly constructed web applications and how to defeat them.",
	tags: ["security", "frontend", "backend"],
	icon: "ShieldAlert",
	content: [
		<p key="1">
			You can have the most heavily encrypted AES-GCM database payloads in the world, but if a hacker sneaks simple
			malicious Javascript into your frontend React app, your entire application is fundamentally compromised.
		</p>,
		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			XSS vs CSRF
		</h3>,
		<Grid key="3" cols={2} gap={6} className="my-8">
			<Card title="XSS (Cross-Site Scripting)" description="Stealing from the inside">
				<p className="text-sm text-muted-foreground">
					A hacker uploads a comment to a forum containing a literal <code>&lt;script&gt;</code> tag. Your React app
					blindly renders it into the DOM. The script physically executes on a victim's browser, instantly stealing
					their `localStorage` JWT token and emailing it to the hacker.
				</p>
				<p className="text-sm font-semibold mt-3">The Fix:</p>
				<ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
					<li>
						React inherently defeats 90% of XSS by escaping all <code>{"{variables}"}</code>.
					</li>
					<li>
						Never use <code>dangerouslySetInnerHTML</code> unless strictly passing it through DOMPurify first!
					</li>
				</ul>
			</Card>
			<Card title="CSRF (Cross-Site Request Forgery)" description="Tricking the browser">
				<p className="text-sm text-muted-foreground">
					You are logged into `bank.com` securely. You wander to `evil.com`. `evil.com` places a hidden image tag on the
					page pointing to <code>https://bank.com/transfer?amount=10000</code>. Since you legally have bank cookies,
					your browser automatically attaches them to the image request, transferring your money silently!
				</p>
				<p className="text-sm font-semibold mt-3">The Fix:</p>
				<ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
					<li>Ensure all sensitive actions are HTTP POST, never GET.</li>
					<li>
						Mark your backend authentication cookies strictly as <code>SameSite=Lax</code> or{" "}
						<code>SameSite=Strict</code> so the browser outright refuses to send them if the request originates from
						`evil.com`.
					</li>
				</ul>
			</Card>
		</Grid>,
		<Callout key="4" type="info" title="The Content Security Policy (CSP)">
			Modern developers deploy a CSP HTTP Header on their web servers to categorically state: "Browser, absolutely
			refuse to execute any Javascript on my site unless it comes directly from my official domain. Ignore all inline
			scripts." This acts as an iron-clad failsafe against XSS.
		</Callout>,
	],
};
