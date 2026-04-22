import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { Step } from "@/components/ui/Step";
import { Highlight } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const dnsTopic: Topic = {
	id: "dns",
	title: "DNS: The Full Network Lifecycle",
	description:
		"Every hop from the moment a user types 'google.com' to the HTML landing in their browser — DNS resolver, root servers, registrar, CDN, TLS, hosting, and back.",
	tags: ["networking", "dns", "backend", "devops"],
	icon: "Search",
	content: [
		<p key="intro-1">
			DNS (Domain Name System) is often described as "the internet's phonebook." But that analogy barely scratches the
			surface. To a DevOps engineer, DNS is a{" "}
			<strong>hierarchical, globally-distributed, time-cached lookup system</strong> that every single network request
			on earth depends on. Let's trace the entire lifecycle of one URL from keystroke to HTML.
		</p>,

		/* ─── SECTION 1: The Full Flow ─────────────────────────────────────── */
		<h3 key="flow-title" className="text-xl font-bold mt-12 mb-2">
			Phase 1 — Browser to IP Address (DNS Resolution)
		</h3>,
		<p key="flow-sub" className="text-muted-foreground mb-6">
			Before a single byte of your webpage can be fetched, the browser must hunt down the raw IP address for the
			hostname. This is the <strong>DNS Resolution</strong> phase. It can involve up to 5 different actors.
		</p>,
		<Flow
			key="dns-flow"
			steps={[
				{
					title: "1. Browser Cache",
					description:
						"First stop. Chrome/Firefox keep their own in-memory DNS cache (separate from the OS). If the record hasn't expired, resolution is over in microseconds.",
				},
				{
					title: "2. OS / Hosts File",
					description: (
						<span>
							The OS checks <code>/etc/hosts</code> (Linux/Mac) or{" "}
							<code className="break-all">C:\Windows\System32\drivers\etc\hosts</code> (Windows) first, then its own DNS
							cache. Critical for local dev overrides.
						</span>
					),
				},
				{
					title: "3. Recursive Resolver",
					description:
						"Usually your ISP's server or a public one (1.1.1.1 Cloudflare, 8.8.8.8 Google). This is the 'detective' that does all the hunting on your behalf.",
				},
				{
					title: "4. Root Name Servers",
					description:
						"13 logical root servers (operated by ICANN, NASA, etc.). They don't know the IP — they point the resolver to the correct TLD server (.com, .io, .my).",
				},
				{
					title: "5. TLD Name Servers",
					description:
						"Managed by registries: Verisign runs .com, PIR runs .org. They know which Authoritative server is responsible for your specific domain.",
				},
				{
					title: "6. Authoritative Nameserver",
					description:
						"The final source of truth. This is where YOU set your DNS records (Cloudflare DNS, AWS Route 53, GoDaddy DNS). It returns the actual IP.",
				},
			]}
		/>,

		/* ─── SECTION 2: The Actors Explained ──────────────────────────────── */
		<h3 key="actors-title" className="text-xl font-bold mt-12 mb-4">
			The DNS Actors — Who Runs What?
		</h3>,
		<Grid key="actors-grid" cols={2} gap={6} className="mb-8">
			<Card title="Recursive Resolver" description="Run By: ISP / Public DNS Providers">
				<p className="text-sm text-muted-foreground mb-3">
					This is the server your computer actually <em>talks to</em>. You configure it in your Network Settings (DHCP
					usually assigns your ISP's resolver automatically). Popular alternatives:
				</p>
				<ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
					<li>
						<code>1.1.1.1</code> — Cloudflare (fastest globally)
					</li>
					<li>
						<code>8.8.8.8</code> — Google Public DNS
					</li>
					<li>
						<code>9.9.9.9</code> — Quad9 (privacy-focused)
					</li>
				</ul>
				<p className="text-xs mt-3 border-t border-border pt-3 text-muted-foreground">
					The resolver caches every answer it gets from Root/TLD/Authoritative servers for the duration of the record's
					TTL. This is why changing your DNS record doesn't propagate instantly — every resolver on earth has to wait
					for its own cached copy to expire.
				</p>
			</Card>
			<Card title="Authoritative Nameserver" description="Run By: You (via your DNS Provider)">
				<p className="text-sm text-muted-foreground mb-3">
					This is the server you actually control as a developer/DevOps engineer.{" "}
					<strong>This is where you set your A, CNAME, MX records.</strong> When you buy a domain from Namecheap or
					GoDaddy, you configure which Authoritative Nameserver to use:
				</p>
				<ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
					<li>
						<strong>AWS Route 53</strong> — enterprise, latency-based routing
					</li>
					<li>
						<strong>Cloudflare DNS</strong> — free tier, proxied CDN records
					</li>
					<li>
						<strong>GoDaddy / Namecheap DNS</strong> — included with domain purchase
					</li>
				</ul>
				<p className="text-xs mt-3 border-t border-border pt-3 text-muted-foreground">
					The Registrar (where you bought the domain) points the TLD server to YOUR chosen Authoritative Nameserver via
					NS records.
				</p>
			</Card>
			<Card title="Domain Registrar" description="Run By: ICANN-Accredited Companies">
				<p className="text-sm text-muted-foreground mb-3">
					The company you <em>rent</em> your domain name from (Namecheap, GoDaddy, Google Domains, Cloudflare
					Registrar). Their one critical job in DNS is to update the TLD Registry's database with your{" "}
					<strong>NS (Nameserver) records</strong> — telling the world which Authoritative DNS server is in charge of
					your domain.
				</p>
				<p className="text-xs mt-3 border-t border-border pt-3 text-muted-foreground">
					Registrar ≠ DNS Provider. You can buy from Namecheap but use Cloudflare as your DNS. You do this by setting
					custom nameservers in your Registrar's dashboard.
				</p>
			</Card>
			<Card title="Root Name Servers" description="Run By: 12 Organisations (ICANN Oversight)">
				<p className="text-sm text-muted-foreground mb-3">
					There are only <strong>13 sets of Root Name Servers</strong> (labeled A–M), operated by ICANN, NASA, RIPE NCC,
					and others. In reality, hundreds of physical machines worldwide respond to those 13 addresses via{" "}
					<strong>Anycast routing</strong>. They are the very top of the DNS tree.
				</p>
				<p className="text-xs mt-3 border-t border-border pt-3 text-muted-foreground">
					They do NOT hold domain records. They only know: "For <code>.com</code> TLD, go ask Verisign's servers at{" "}
					<code>a.gtld-servers.net</code>."
				</p>
			</Card>
		</Grid>,

		/* ─── SECTION 3: Detailed Step-By-Step ─────────────────────────────── */
		<h3 key="steps-title" className="text-xl font-bold mt-12 mb-6">
			The Detective Work — A Full Recursive Lookup
		</h3>,
		<p key="steps-sub" className="text-muted-foreground mb-6">
			Let's say a user types <code>https://app.myshop.com</code> into Chrome. Their ISP's Recursive Resolver has a cold
			cache. Here is every network hop that happens before Chrome renders a single pixel:
		</p>,
		<Card key="steps-card" className="mb-8">
			<div className="space-y-4">
				<Step index={1}>
					<strong>Browser checks its own DNS cache.</strong> Miss. TTL expired on last visit.
				</Step>
				<Step index={2}>
					<strong>
						OS checks <code className="break-all">/etc/hosts</code> file.
					</strong>{" "}
					No manual override entry. OS checks its own socket cache. Miss.
				</Step>
				<Step index={3}>
					<strong>OS asks the Recursive Resolver</strong> (<code>1.1.1.1</code>): "What's the IP for{" "}
					<code>app.myshop.com</code>?" — The resolver checks its own massive cache. Cold miss.
				</Step>
				<Step index={4}>
					<strong>Resolver asks a Root Name Server:</strong> "Who handles <code>.com</code>?" Root responds: "Ask
					Verisign at <code className="break-all">a.gtld-servers.net</code>."
				</Step>
				<Step index={5}>
					<strong>Resolver asks the .com TLD Server (Verisign):</strong> "Who is authoritative for{" "}
					<code>myshop.com</code>?" TLD responds: "Ask Cloudflare at{" "}
					<code className="break-all">erin.ns.cloudflare.com</code>." (These are the NS records your Registrar set.)
				</Step>
				<Step index={6}>
					<strong>Resolver asks YOUR Authoritative Nameserver (Cloudflare/Route53):</strong> "What is the A record for{" "}
					<code>app.myshop.com</code>?" Cloudflare responds: "It's <code>104.21.55.12</code>, TTL=300."
				</Step>
				<Step index={7}>
					<strong>Resolver caches</strong> <code>app.myshop.com → 104.21.55.12</code> for 300 seconds and hands the
					answer back to your browser.
				</Step>
				<Step index={8}>
					<strong>Browser initiates TCP connection</strong> to <code>104.21.55.12:443</code>. DNS is now completely
					DONE. The rest of the request is a separate concern (TCP Handshake → TLS → HTTP).
				</Step>
			</div>
		</Card>,

		/* ─── SECTION 4: After DNS — The Full Request Journey ──────────────── */
		<h3 key="after-dns-title" className="text-xl font-bold mt-12 mb-4">
			Phase 2 — IP to HTML (After DNS Resolves)
		</h3>,
		<p key="after-dns-sub" className="text-muted-foreground mb-6">
			The IP is resolved. Now the browser makes the actual HTTP(S) request. From a DevOps perspective, what that IP
			address points to determines the entire infrastructure chain:
		</p>,
		<Flow
			key="request-flow"
			steps={[
				{
					title: "TCP Handshake",
					description:
						"Browser opens a raw TCP socket to the IP on port 443. 3-way SYN → SYN-ACK → ACK. Adds ~1 RTT of latency.",
				},
				{
					title: "TLS Handshake",
					description:
						"Client Hello → Server presents SSL Certificate → browser validates against CA (Let's Encrypt, DigiCert) → shared secret negotiated. Adds ~1-2 RTT.",
				},
				{
					title: "CDN Edge Node",
					description:
						"Often the IP belongs to Cloudflare/CloudFront. The request hits the nearest PoP (Point of Presence) — NOT your origin server. CDN checks its cache.",
				},
				{
					title: "Load Balancer",
					description:
						"If the CDN misses, request passes to your origin. An AWS ALB or Nginx load balancer distributes it across your fleet of app servers.",
				},
				{
					title: "Application Server",
					description:
						"Your Node.js / Django / Go server receives the HTTP request, runs business logic, queries the database.",
				},
				{
					title: "Response Flows Back",
					description:
						"App → Load Balancer → CDN (caches it) → TLS encrypted → TCP → browser. Browser renders HTML. Total time: 50–500ms.",
				},
			]}
		/>,

		/* ─── SECTION 5: DNS Records Deep Dive ─────────────────────────────── */
		<h3 key="records-title" className="text-xl font-bold mt-12 mb-4">
			DNS Record Types — The DevOps Reference
		</h3>,
		<Table
			key="records-table"
			headers={["Record", "Purpose", "Example Value", "DevOps Use Case"]}
			rows={[
				["A", "Maps hostname → IPv4", "104.21.55.12", "Point apex domain to load balancer IP or CDN origin."],
				["AAAA", "Maps hostname → IPv6", "2606:4700::6812:37f5", "Dual-stack IPv6 support. Growing in importance."],
				[
					"CNAME",
					"Maps hostname → another hostname",
					"app.myshop.com → shop.vercel.app",
					"Alias to a PaaS (Vercel, Heroku, AWS). Cannot be used on apex root domain.",
				],
				[
					"NS",
					"Delegates zone to nameservers",
					"erin.ns.cloudflare.com",
					"Set by Registrar to point to your DNS Provider. THE most important record.",
				],
				[
					"MX",
					"Mail exchange routing",
					"aspmx.l.google.com (priority 1)",
					"Point @yourdomain.com email to Google Workspace or Zoho.",
				],
				[
					"TXT",
					"Arbitrary text",
					"v=spf1 include:_spf.google.com ~all",
					"Domain verification, SPF/DKIM email auth, Let's Encrypt SSL challenges.",
				],
				[
					"CNAME Apex",
					"N/A — not supported",
					"—",
					"Do NOT put CNAME on root apex. Use ANAME/ALIAS record (Cloudflare/Route53 specific).",
				],
				[
					"SRV",
					"Service location records",
					"_https._tcp.example.com 443",
					"Kubernetes service discovery, XMPP servers.",
				],
				[
					"CAA",
					"Restrict which CAs can issue SSL",
					'0 issue "letsencrypt.org"',
					"Prevents unauthorized SSL certificate issuance for your domain.",
				],
			]}
		/>,

		/* ─── SECTION 6: TTL & Propagation ─────────────────────────────────── */
		<h3 key="ttl-title" className="text-xl font-bold mt-12 mb-4">
			TTL — The Most Misunderstood Number in DevOps
		</h3>,
		<p key="ttl-sub" className="text-muted-foreground mb-6">
			TTL (Time To Live) is set on each DNS record in seconds. It tells every Recursive Resolver on earth how long to
			cache your answer before asking again. This single number is the root cause of <em>all</em> "why isn't my DNS
			change live yet?" frustration.
		</p>,
		<Grid key="ttl-grid" cols={3} gap={6} className="mb-8">
			<Card title="Low TTL (60–300s)" description="Use Before: Migrations, Deployments">
				<p className="text-sm text-muted-foreground">
					Set TTL to 60s <strong>24–48 hours before a major migration</strong>. When you flip the A record, resolvers
					worldwide will pick up the change within 60 seconds instead of days.
				</p>
				<p className="text-xs text-muted-foreground mt-3 border-t border-border pt-2">
					⚠️ Cost: More DNS queries = more load on your Authoritative server.
				</p>
			</Card>
			<Card title="High TTL (3600–86400s)" description="Use For: Stable Production Records">
				<p className="text-sm text-muted-foreground">
					Stable records (MX, NS, CAA) can have very high TTLs. Resolvers cache aggressively, reducing your DNS query
					volume and improving performance for all users globally.
				</p>
				<p className="text-xs text-muted-foreground mt-3 border-t border-border pt-2">
					⚠️ Cost: Slow rollback if something goes wrong — you're stuck for up to 24 hours.
				</p>
			</Card>
			<Card title="Negative TTL (SOA)" description="The Forgotten Cache">
				<p className="text-sm text-muted-foreground">
					When a domain doesn't exist (NXDOMAIN), resolvers cache <em>that failure</em> based on the SOA record's
					minimum TTL. If you just registered a domain and DNS is "not found" — this is why.
				</p>
				<p className="text-xs text-muted-foreground mt-3 border-t border-border pt-2">
					Fix: Wait it out. You cannot force remote resolvers to clear their negative cache.
				</p>
			</Card>
		</Grid>,

		/* ─── SECTION 7: CDN & Cloudflare Proxied Records ──────────────────── */
		<h3 key="cdn-title" className="text-xl font-bold mt-12 mb-4">
			The Cloudflare Proxy — When DNS Does More Than Resolve
		</h3>,
		<p key="cdn-sub" className="text-muted-foreground mb-6">
			When you enable Cloudflare's orange-cloud proxy on a record, DNS stops being just a lookup system. The A record no
			longer points to your server — it points to <strong>Cloudflare's edge network</strong>. Your real server IP
			becomes completely hidden from the public internet.
		</p>,
		<Grid key="cdn-grid" cols={2} gap={6} className="mb-8">
			<Card title="DNS-Only Mode (Grey Cloud)">
				<p className="text-sm text-slate-400">
					The A record exposes your <strong>real server IP</strong> to the world. Any <code>dig app.myshop.com</code>{" "}
					command returns your actual EC2/VPS IP. Your server handles TLS, DDoS, caching — everything.
				</p>
				<CodeBlock
					title="dig output — DNS Only"
					language="bash"
					code={`$ dig app.myshop.com
;; ANSWER SECTION:
app.myshop.com.   300   IN   A   152.42.189.33
# ^ Your real server IP is publicly visible`}
				/>
			</Card>
			<Card title="Proxied Mode (Orange Cloud)">
				<p className="text-sm text-slate-400">
					Cloudflare's edge IP is returned. All traffic flows through Cloudflare's global PoPs first. Your origin IP is{" "}
					<strong>hidden</strong>. You get free DDoS protection, CDN caching, and WAF.
				</p>
				<CodeBlock
					title="dig output — Proxied"
					language="bash"
					code={`$ dig app.myshop.com
;; ANSWER SECTION:
app.myshop.com.   300   IN   A   104.21.55.12
# ^ Cloudflare's IP. Your server is invisible.`}
				/>
			</Card>
		</Grid>,
		<Callout key="cdn-callout" type="info" title="Cloudflare Proxied Records Break Some Things">
			When a record is proxied, only HTTP/HTTPS (ports 80/443) traffic is forwarded to your origin. If your app uses a
			custom TCP port (e.g., a game server on port 25565 or a DB on 5432), it will silently fail. Use{" "}
			<strong>DNS-Only</strong> mode for non-HTTP services.
		</Callout>,

		/* ─── SECTION 8: DNSSEC ─────────────────────────────────────────────── */
		<h3 key="dnssec-title" className="text-xl font-bold mt-12 mb-4">
			DNSSEC — Cryptographic Chain of Trust
		</h3>,
		<p key="dnssec-sub" className="mb-4 text-muted-foreground">
			Standard DNS is completely unauthenticated. A <Highlight variant="warning">Man-in-the-Middle attacker</Highlight>{" "}
			on the same network as a resolver can intercept a query and inject a fake response — redirecting{" "}
			<code>yourbank.com</code> to a malicious clone. This is called <strong>DNS Cache Poisoning</strong>. DNSSEC fixes
			this.
		</p>,
		<Grid key="dnssec-grid" cols={2} gap={6} className="mb-4">
			<Card title="Without DNSSEC" description="Status: Vulnerable">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>DNS responses are plain UDP packets with no authentication.</li>
					<li>Any resolver between you and the authoritative server can forge a response.</li>
					<li>
						Attack: Attacker stuffs resolver cache with <code>bank.com → attacker-ip</code>.
					</li>
					<li>Victims are silently redirected with zero indication of tampering.</li>
				</ul>
			</Card>
			<Card title="With DNSSEC" description="Status: Cryptographically Verified">
				<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
					<li>
						Each DNS record is <strong>digitally signed</strong> with a private key held by the zone owner.
					</li>
					<li>
						The resolver can verify the signature against the public key published in the DNS zone (DNSKEY record).
					</li>
					<li>Chain of trust: Root → TLD → Authoritative, each layer signs the next.</li>
					<li>Tampered records produce an invalid signature → resolver refuses them.</li>
				</ul>
			</Card>
		</Grid>,

		/* ─── SECTION 9: Common DNS Tools ──────────────────────────────────── */
		<h3 key="tools-title" className="text-xl font-bold mt-12 mb-4">
			DevOps DNS Toolkit
		</h3>,
		<Table
			key="tools-table"
			headers={["Command", "What It Does", "When to Use It"]}
			rows={[
				[
					"dig app.myshop.com",
					"Queries your configured resolver for a record.",
					"First debug step. Shows the answer + TTL remaining.",
				],
				[
					"dig @8.8.8.8 app.myshop.com",
					"Queries Google's resolver specifically.",
					"Check if a record has propagated to a specific resolver.",
				],
				[
					"dig app.myshop.com +trace",
					"Traces the full recursive resolution path.",
					"See exactly which Root → TLD → Authoritative servers are being hit.",
				],
				["nslookup app.myshop.com", "Windows-friendly DNS lookup.", "Quick check on Windows environments."],
				["dig app.myshop.com MX", "Queries MX (mail) records.", "Debug email routing / Google Workspace setup."],
				["dig app.myshop.com TXT", "Queries TXT records.", "Verify SPF, DKIM, domain ownership, SSL challenge."],
				[
					"whois myshop.com",
					"Shows Registrar, expiry date, NS records.",
					"Check who owns a domain and when it expires.",
				],
			]}
		/>,
		<CodeBlock
			key="dig-example"
			title="dig +trace — Following the Full Resolution Chain"
			language="bash"
			code={`$ dig app.myshop.com +trace

# Step 1: Asks a Root Server → gets .com TLD servers
.                       518400 IN NS   a.root-servers.net.

# Step 2: Asks Verisign's .com TLD server → gets NS records
myshop.com.             172800 IN NS   erin.ns.cloudflare.com.
myshop.com.             172800 IN NS   dave.ns.cloudflare.com.

# Step 3: Asks Cloudflare Authoritative → gets final A record
app.myshop.com.         300    IN A    104.21.55.12

# TTL=300: This resolver will cache this answer for 5 minutes`}
		/>,

		/* ─── SECTION 10: Common Mistakes ──────────────────────────────────── */
		<h3 key="mistakes-title" className="text-xl font-bold mt-12 mb-6">
			Common DNS Mistakes (DevOps War Stories)
		</h3>,
		<MistakeCard
			key="m1"
			number={1}
			title="Changing DNS Records Without Lowering TTL First"
			problem="Engineer needs to migrate servers. They update the A record from old IP to new IP. 12 hours later half of users are still hitting the old server. TTL was 86400 (24 hours)."
			solution="Always reduce TTL to 60–300s at least 48 hours before a planned migration. After migration is confirmed stable, raise TTL back to 3600."
		/>,
		<MistakeCard
			key="m2"
			number={2}
			title="Using CNAME on the Apex/Root Domain"
			problem="Developer puts a CNAME record on the naked domain (myshop.com) pointing to shop.vercel.app. DNS spec prohibits this — CNAME cannot coexist with other records (like MX, NS). Email breaks silently."
			solution="Use Cloudflare's CNAME Flattening / AWS Route 53 ALIAS record type at the apex. These are vendor-specific extensions that resolve like an A record but allow CNAME semantics."
		/>,
		<MistakeCard
			key="m3"
			number={3}
			title="Expecting 'Instant' DNS Propagation"
			problem="Developer adds an A record and immediately tries to hit the domain. Gets NXDOMAIN. Panics. The DNS changes are 'not working.'"
			solution={
				<>
					Propagation is limited by TTL. Use <code>dig @8.8.8.8 domain.com</code> and{" "}
					<code>dig @1.1.1.1 domain.com</code> to check specific resolvers. Use <code>dnschecker.org</code> to see
					global propagation status visually.
				</>
			}
		/>,
		<MistakeCard
			key="m4"
			number={4}
			title="Forgetting to Set NS Records After Changing DNS Provider"
			problem="Team moves from GoDaddy DNS to Cloudflare. They configure all A/CNAME records in Cloudflare but forget to update the NS records in GoDaddy's dashboard. The domain continues to point to GoDaddy's (now empty) nameservers. Website goes down."
			solution="After switching DNS providers, ALWAYS update the Nameserver (NS) records in your Registrar's control panel to point to the new provider's nameservers. This is the single most common DNS migration failure."
		/>,

		/* ─── SECTION 11: Optimization ─────────────────────────────────────── */
		<Callout key="perf-callout" type="tip" title="Browser Hint: dns-prefetch & preconnect">
			DNS resolution takes 20–120ms per domain. If your page loads resources from a third-party domain (Google Fonts,
			Stripe, Segment), the browser has to resolve that domain's DNS before fetching anything. You can eliminate this
			latency by hinting the browser to resolve early:
			<br />
			<br />
			<code>&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com" /&gt;</code> — Resolves DNS in background
			before the resource is needed.
			<br />
			<code>&lt;link rel="preconnect" href="https://fonts.googleapis.com" /&gt;</code> — Goes further: DNS + TCP + TLS
			handshake, all before the CSS even parses.
		</Callout>,
	],
};
