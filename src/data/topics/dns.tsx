import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const dnsTopic: Topic = {
  id: "dns",
  title: "DNS Recursive Resolution",
  description:
    "How 'google.com' actually turns into an IP address, and why DNS latency impacts your website speed.",
  tags: ["networking", "dns", "backend"],
  icon: "Search",
  content: [
    <p key="1">
      DNS (Domain Name System) is the <strong>Hierarchical Database</strong> of the internet. It translates human-friendly hostnames (<code>google.com</code>) into machine-routable IP addresses (<code>142.250.190.46</code>).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Hierarchical Resolution
    </h3>,
    <Table
      key="3"
      headers={["Level", "Entity", "Responsibility"]}
      rows={[
        ["Level 0", "Local Cache / Hosts File", "The first place OS looks. Zero network cost."],
        ["Level 1", "Recursive Resolver (ISP/Cloudflare)", "The 'Messenger' that hunts down the IP for you."],
        ["Level 2", "Root Name Servers", "Points the resolver to the correct TLD (e.g., .com, .org)."],
        ["Level 3", "TLD Name Servers", "Managed by registries (e.g., Verisign). Points to Authoritative Nameserver."],
        ["Level 4", "Authoritative Nameserver", "The final source of truth (e.g., Route53, Cloudflare). Holds the records."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Common DNS Records
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="A & AAAA (The IPs)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>A:</strong> IPv4 address. <strong>AAAA:</strong> IPv6 address.
        </p>
        <p className="text-xs italic text-muted-foreground">
          The most common record. Maps <code>api.app.com</code> to a physical load balancer IP.
        </p>
      </Card>
      <Card title="CNAME (The Alias)">
        <p className="text-sm text-muted-foreground mb-2">
          Points a domain to <strong>another domain</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Useful for pointing <code>www.app.com</code> to <code>app.herokuapp.com</code>. CANNOT be used at the Apex (root domain).
        </p>
      </Card>
      <Card title="TXT (The Proof)">
        <p className="text-sm text-muted-foreground mb-2">
          Stores arbitrary text strings.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Used for domain verification (Google Workspace), SPF/DKIM for email security, and Let's Encrypt SSL challenges.
        </p>
      </Card>
      <Card title="MX (The Mailer)">
        <p className="text-sm text-muted-foreground mb-2">
          Mail Exchange. Points to <strong>Email Servers</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Tells the internet which server handles <code>@your-domain.com</code> incoming mail.
        </p>
      </Card>
    </Grid>,
    <Callout key="DNS-Opt" type="info" title="Optimization: dns-prefetch & preconnect">
      DNS lookups can take **20-120ms** depending on network conditions. This is why you'll often see <code>&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com"&gt;</code> in your <code>index.html</code>.
      <br /><br />
      - <strong>dns-prefetch:</strong> Resolves the DNS for <code>fonts.googleapis.com</code> in the background before the browser even needs the font.
      - <strong>preconnect:</strong> Goes a step further by performing the DNS lookup, TCP handshake, AND TLS negotiation (HTTPS) ahead of time.
      <br /><br />
      Google Fonts uses these to ensure that by the time your CSS discovers a font-family, the server connection is already "warm" and ready to stream data, skipping the "DNS Lookup" stall.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      DNSSEC: Preventing 'Cache Poisoning'
    </h3>,
    <p key="7" className="mb-4">
      Standard DNS is unencrypted and unauthenticated. A "Man-in-the-Middle" can intercept a DNS query and send back a fake IP (Cache Poisoning). <strong>DNSSEC</strong> adds digital signatures to DNS records, allowing the resolver to cryptographically verify that the IP address actually came from the Authoritative server.
    </p>,
    <Callout key="8" type="warning" title="Negative Caching">
      If a DNS query fails (NXDOMAIN), resolvers cache that <strong>failure</strong> for a specific time (SOA TTL). If you just created a record and it's not working, you might be stuck in a Negative Cache loop. Wait a few minutes before smashing refresh!
    </Callout>,
  ],
};
