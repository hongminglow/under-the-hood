import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const dnsTopic: Topic = {
  id: "dns",
  title: "DNS Recursive Resolution",
  description:
    "A deep dive into the Domain Name System, tracing the distributed hierarchy of domain names across root and TLD servers.",
  tags: ["dns", "infrastructure", "internet", "networking"],
  icon: "Search",
  content: [
    <p key="1">
      The <strong>Domain Name System (DNS)</strong> is the "phonebook" of the
      internet. It translates human-readable domain names (like{" "}
      <code>google.com</code>) into IP addresses (like{" "}
      <code>142.250.190.46</code>) so browsers can establish connections. When
      you type a URL, it kicks off a complex, highly distributed lookup chain.
    </p>,
    <Callout key="2" type="tip" title="DNS Transport Protocols">
      DNS traditionally operates over{" "}
      <Highlight variant="primary">UDP Port 53</Highlight> for speed. However,
      if a response exceeds 512 bytes, it falls back to TCP Port 53. Modern
      standards like <strong>DoH (DNS over HTTPS)</strong> and{" "}
      <strong>DoT (DNS over TLS)</strong> encrypt this traffic to prevent
      interception.
    </Callout>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Resolution Hierarchy
    </h4>,
    <Grid key="4" cols={2} gap={6}>
      <Card title="1. Recursive Resolver" description="The ISP or Public DNS">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Provided by your ISP or services like Google (8.8.8.8) or Cloudflare
            (1.1.1.1).
          </li>
          <li>
            Acts as the middleman. If it doesn't have the answer cached, it asks
            the authoritative servers on your behalf.
          </li>
        </ul>
      </Card>
      <Card title="2. Root Nameserver (.)" description="The Top Level">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>There are 13 logical root servers globally.</li>
          <li>
            They don't know the IP of your site, but they know who controls the
            TLD (e.g., <code>.com</code>).
          </li>
        </ul>
      </Card>
      <Card title="3. TLD Nameserver" description="Top Level Domain">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Maintains information for all domain names that share a common
            extension like <code>.com</code> or <code>.net</code>.
          </li>
          <li>Points to the Authoritative server for the specific domain.</li>
        </ul>
      </Card>
      <Card
        title="4. Authoritative Nameserver"
        description="The Source of Truth"
      >
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Managed by the domain owner (often via Route53, Cloudflare, etc.).
          </li>
          <li>
            Holds the actual IP address (A/AAAA records) for the requested
            domain.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      The Full Lookup Chain
    </h4>,
    <p key="6">
      If a user types <code>example.com</code> into their browser, the system
      performs the following sequence (assuming no layer has cached it yet):
    </p>,
    <Step key="7" index={1}>
      <strong>Local Cache Checks:</strong> The OS checks its local resolver
      cache. The browser also checks its own internal DNS cache.
    </Step>,
    <Step key="8" index={2}>
      <strong>Query the Recursive Resolver:</strong> The OS asks the configured
      resolver (e.g., your home router or ISP).
    </Step>,
    <Step key="9" index={3}>
      <strong>Root Server:</strong> The resolver asks a Root Server:{" "}
      <em>"Where is example.com?"</em> The Root replies with the IP of the{" "}
      <code>.com</code> TLD server.
    </Step>,
    <Step key="10" index={4}>
      <strong>TLD Server:</strong> The resolver asks the <code>.com</code>{" "}
      server. The TLD replies with the IP of the Authoritative Nameserver
      registered by the domain owner.
    </Step>,
    <Step key="11" index={5}>
      <strong>Authoritative Server:</strong> The resolver finally asks the
      Authoritative server. It replies with the A record (e.g.,{" "}
      <code>93.184.216.34</code>).
    </Step>,
    <Step key="12" index={6}>
      <strong>Client Response & Cache:</strong> The recursive resolver caches
      the result (based on the TTL - Time to Live) and returns the IP to the
      browser.
    </Step>,
    <CodeBlock
      key="13"
      title="Trace a DNS Query using 'dig'"
      language="bash"
      code={`$ dig +trace google.com\n\n; <<>> DiG 9.10.6 <<>> +trace google.com\n.                       282110  IN      NS      a.root-servers.net.\n...\ncom.                    172800  IN      NS      a.gtld-servers.net.\n...\ngoogle.com.             172800  IN      NS      ns1.google.com.\n...\ngoogle.com.             300     IN      A       142.250.190.46`}
    />,
    <h4 key="14" className="text-xl font-bold mt-8 mb-4">
      Common DNS Record Types
    </h4>,
    <Table
      key="15"
      headers={["Type", "Name", "Purpose"]}
      rows={[
        ["A", "Address", "Maps a hostname to an IPv4 address."],
        ["AAAA", "IPv6 Address", "Maps a hostname to an IPv6 address."],
        [
          "CNAME",
          "Canonical Name",
          "Aliases one name to another (e.g., www to root).",
        ],
        ["MX", "Mail Exchange", "Directs email to a mail server."],
        [
          "TXT",
          "Text Record",
          "Holds arbitrary text, often used for email verification (SPF, DKIM).",
        ],
        [
          "NS",
          "Name Server",
          "Delegates a DNS zone to an authoritative server.",
        ],
      ]}
    />,
  ],
};
