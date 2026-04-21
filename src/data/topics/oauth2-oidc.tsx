import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const oauth2OidcTopic: Topic = {
	id: "oauth2-oidc",
	title: "OAuth 2.0 & OpenID Connect",
	description:
		"How 'Sign in with Google' works, the difference between Authorization and Authentication, and which OAuth flow to use.",
	tags: ["security", "auth", "backend", "oauth", "oidc"],
	icon: "Key",
	content: [
		<p key="1">
			If you build an app that needs to access a user's Google Calendar, you <strong>never</strong>&nbsp;want the user
			to hand you their raw Google password!
		</p>,
		<p key="2" className="mt-4">
			<Highlight variant="primary">OAuth 2.0</Highlight> is the wildly successful industry standard that solves this. It
			allows Google to give your application a temporary, limited-access <strong>Token</strong>&nbsp;to peek at the
			user's calendar without ever exposing their password to you.
		</p>,

		<h3 key="3" className="text-xl font-bold mt-8 mb-4">
			OAuth is Not for Logging In (OIDC is)
		</h3>,
		<p key="4" className="mb-4">
			Technically speaking, OAuth 2.0 was designed strictly for <strong>Authorization</strong>&nbsp;(Giving permission
			to access something, like reading contacts or uploading a file). It was never meant to definitively prove{" "}
			<em>who</em>&nbsp;the person actually is (<strong>Authentication</strong>).
		</p>,
		<Grid key="5" cols={2} gap={6} className="my-8">
			<Card title="The OAuth 2.0 Access Token">
				<p className="text-sm text-muted-foreground">
					A purely opaque string designed only to unlock specific API doors (like an Arcade Token). It doesn't contain
					the user's name or email. It simply says "This token holder can read calendars."
				</p>
			</Card>
			<Card title="OIDC (OpenID Connect)">
				<p className="text-sm text-muted-foreground">
					An extension bolted directly on top of OAuth. It provides an <strong>ID Token</strong>&nbsp;(always a JWT)
					alongside the Access Token. The ID Token definitively answers "Who is this person? What is their email?" and
					allows true "Login with Google" systems to exist securely.
				</p>
			</Card>
		</Grid>,

		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			The 4 OAuth 2.0 Grant Types (Flows)
		</h3>,
		<p key="7" className="mb-4">
			OAuth 2.0 defines <strong>4 grant types</strong>&nbsp;— each designed for a specific client type and trust level.
			Using the wrong flow is a <strong>security vulnerability</strong>.
		</p>,
		<Table
			key="8"
			headers={["Grant Type", "Client Type", "Has Backend?", "Security Level"]}
			rows={[
				["Authorization Code", "Web apps (SPA + backend)", "Yes", "Highest — code exchanged server-side"],
				["Authorization Code + PKCE", "Mobile & SPA (no backend)", "No", "High — code verifier prevents interception"],
				["Client Credentials", "Machine-to-machine", "N/A", "High — no user involved, service identity"],
				["Implicit (DEPRECATED)", "Old SPAs", "No", "Low — token in URL fragment, easily stolen"],
			]}
		/>,

		<h3 key="9" className="text-xl font-bold mt-8 mb-4">
			Authorization Code Flow (The Gold Standard)
		</h3>,
		<p key="10" className="mb-4">
			For traditional web apps with a backend server. The token never touches the browser.
		</p>,
		<Flow
			key="11"
			steps={[
				{ title: "1. User Redirected", description: "App redirects to Authorization Server (Google, Auth0)" },
				{ title: "2. User Consents", description: "User logs in and grants permissions" },
				{ title: "3. Code Returned", description: "Auth server redirects back with short-lived authorization code" },
				{ title: "4. Token Exchange", description: "Backend exchanges code + client secret for access token" },
			]}
		/>,
		<CodeBlock
			key="12"
			title="Backend Token Exchange"
			language="javascript"
			code={`// Step 4: Backend exchanges code for token
const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code: authorizationCode,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET, // Never exposed to browser
    redirect_uri: 'https://yourapp.com/callback',
    grant_type: 'authorization_code'
  })
});

const { access_token, id_token } = await response.json();`}
		/>,

		<h3 key="13" className="text-xl font-bold mt-8 mb-4">
			PKCE: For Public Clients (Mobile & SPAs)
		</h3>,
		<p key="14" className="mb-4">
			For clients that <strong>can't store a client secret</strong>&nbsp;(mobile apps, SPAs). PKCE (Proof Key for Code
			Exchange, pronounced "pixy") prevents authorization code interception attacks.
		</p>,
		<Flow
			key="15"
			steps={[
				{ title: "1. Generate Code Verifier", description: "Client creates random string (43-128 chars)" },
				{ title: "2. Hash to Code Challenge", description: "SHA256 hash of verifier sent with auth request" },
				{ title: "3. Code Returned", description: "Auth server stores the challenge, returns code" },
				{ title: "4. Prove Possession", description: "Client sends original verifier with token request" },
			]}
		/>,
		<CodeBlock
			key="16"
			title="PKCE Implementation"
			language="javascript"
			code={`// Step 1: Generate code verifier
const codeVerifier = generateRandomString(128);
localStorage.setItem('code_verifier', codeVerifier);

// Step 2: Create code challenge
const codeChallenge = await sha256(codeVerifier);

// Step 3: Redirect to auth server
window.location = \`https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &code_challenge=\${codeChallenge}
  &code_challenge_method=S256\`;

// Step 4: Exchange code with verifier (no client secret needed!)
const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    code: authorizationCode,
    client_id: 'YOUR_CLIENT_ID',
    code_verifier: localStorage.getItem('code_verifier'),
    redirect_uri: 'https://yourapp.com/callback',
    grant_type: 'authorization_code'
  })
});`}
		/>,
		<Callout key="17" type="info" title="Why PKCE Works">
			Even if an attacker intercepts the authorization code, they can't exchange it for a token without the original{" "}
			<code>code_verifier</code>, which only exists on the legitimate client device.
		</Callout>,

		<h3 key="18" className="text-xl font-bold mt-8 mb-4">
			Client Credentials: Machine-to-Machine
		</h3>,
		<p key="19" className="mb-4">
			No user involved — <strong>service-to-service auth</strong>. Your backend talks to another API (Stripe, AWS,
			Twilio) without human interaction.
		</p>,
		<CodeBlock
			key="20"
			title="Client Credentials Flow"
			language="javascript"
			code={`// Backend service authenticates itself
const response = await fetch('https://api.stripe.com/oauth/token', {
  method: 'POST',
  headers: {
    'Authorization': \`Basic \${Buffer.from(\`\${CLIENT_ID}:\${CLIENT_SECRET}\`).toString('base64')}\`
  },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'read:invoices write:payments'
  })
});

const { access_token } = await response.json();
// Use token for API calls (cron jobs, microservices, CI/CD)`}
		/>,

		<h3 key="21" className="text-xl font-bold mt-8 mb-4">
			The Death of Implicit Flow
		</h3>,
		<Callout key="22" type="warning" title="Officially Deprecated in 2019">
			For years, developers returned the Token directly to the React app in the browser URL (
			<code>#access_token=...</code>). This was horrific for security (URL history logs, malicious scripts, browser
			extensions). The OAuth Working Group officially deprecated Implicit Flow.{" "}
			<strong>Use Authorization Code + PKCE instead</strong>.
		</Callout>,
		<Table
			key="23"
			headers={["Attack Vector", "Implicit Flow", "PKCE"]}
			rows={[
				["Browser History", "✅ Token visible in URL", "❌ Only code visible (useless without verifier)"],
				["Malicious Extensions", "✅ Can read URL fragments", "❌ Code verifier stored securely"],
				["Referrer Headers", "✅ Token leaked to third parties", "❌ No token in URL"],
				["XSS Attacks", "✅ Token in localStorage vulnerable", "❌ Short-lived code + verifier"],
			]}
		/>,

		<h3 key="24" className="text-xl font-bold mt-8 mb-4">
			Access Token vs ID Token vs Refresh Token
		</h3>,
		<Grid key="25" cols={3} gap={4} className="my-8">
			<Card title="Access Token">
				<p className="text-sm text-muted-foreground mb-2">
					<strong>Purpose</strong>: Access protected resources (APIs)
				</p>
				<p className="text-xs text-muted-foreground">
					• Opaque or JWT
					<br />
					• Short-lived (15 min - 1 hour)
					<br />• Sent with every API request
				</p>
			</Card>
			<Card title="ID Token (OIDC)">
				<p className="text-sm text-muted-foreground mb-2">
					<strong>Purpose</strong>: Prove user identity
				</p>
				<p className="text-xs text-muted-foreground">
					• Always JWT
					<br />
					• Contains user info (email, name)
					<br />• Used once at login
				</p>
			</Card>
			<Card title="Refresh Token">
				<p className="text-sm text-muted-foreground mb-2">
					<strong>Purpose</strong>: Get new access tokens
				</p>
				<p className="text-xs text-muted-foreground">
					• Opaque string
					<br />
					• Long-lived (days/months)
					<br />• Stored securely, never sent to APIs
				</p>
			</Card>
		</Grid>,

		<h3 key="26" className="text-xl font-bold mt-8 mb-4">
			Real-World Implementation Tips
		</h3>,
		<Grid key="27" cols={2} gap={6} className="my-8">
			<Card title="When to Use Each Flow">
				<ul className="text-sm text-muted-foreground space-y-2">
					<li>
						• <strong>React/Vue SPA</strong>: Authorization Code + PKCE
					</li>
					<li>
						• <strong>Next.js/Remix</strong>: Authorization Code (backend)
					</li>
					<li>
						• <strong>Mobile Apps</strong>: Authorization Code + PKCE
					</li>
					<li>
						• <strong>Microservices</strong>: Client Credentials
					</li>
					<li>
						• <strong>Cron Jobs</strong>: Client Credentials
					</li>
				</ul>
			</Card>
			<Card title="Security Best Practices">
				<ul className="text-sm text-muted-foreground space-y-2">
					<li>• Always use HTTPS for redirect URIs</li>
					<li>
						• Validate <code>state</code> parameter (CSRF protection)
					</li>
					<li>• Store refresh tokens in httpOnly cookies</li>
					<li>• Never log tokens (even in dev)</li>
					<li>• Rotate refresh tokens after use</li>
				</ul>
			</Card>
		</Grid>,

		<h3 key="28" className="text-xl font-bold mt-8 mb-4">
			Common Mistakes
		</h3>,
		<MistakeCard
			key="mistake-1"
			number={1}
			title="Using OAuth for Authentication"
			problem="OAuth 2.0 access tokens don't identify users. They only grant permission to access resources."
			solution="Use OIDC (OpenID Connect) which adds an ID token with user info. All major providers (Google, Auth0, Okta) support OIDC."
		/>,
		<MistakeCard
			key="mistake-2"
			number={2}
			title="Storing Tokens in localStorage"
			problem="Vulnerable to XSS attacks. Any malicious script can read localStorage and steal tokens."
			solution="Store access tokens in memory (React state). Store refresh tokens in httpOnly cookies (inaccessible to JavaScript)."
		/>,
		<MistakeCard
			key="mistake-3"
			number={3}
			title="Not Validating Redirect URI"
			problem="Attackers can steal authorization codes by registering malicious redirect URIs."
			solution="Whitelist exact redirect URIs in your OAuth provider settings. Never use wildcards in production."
		/>,

		<Callout key="32" type="tip" title="Quick Decision Tree">
			<strong>Need to access user's data?</strong>&nbsp;→ OAuth 2.0
			<br />
			<strong>Need to know who the user is?</strong>&nbsp;→ OIDC (OAuth + ID Token)
			<br />
			<strong>Have a backend?</strong>&nbsp;→ Authorization Code
			<br />
			<strong>No backend (SPA/Mobile)?</strong>&nbsp;→ Authorization Code + PKCE
			<br />
			<strong>Service-to-service?</strong>&nbsp;→ Client Credentials
		</Callout>,
	],
};
