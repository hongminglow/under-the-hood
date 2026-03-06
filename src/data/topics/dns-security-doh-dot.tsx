import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const dnsOverHttpsTopic: Topic = {
  id: "dns-security-doh-dot",
  title: "DNS Security: DoH vs DoT",
  description:
    "Traditional DNS is plaintext — your ISP sees every domain you visit. DoH and DoT encrypt DNS queries, but the debate rages on.",
  tags: ["security", "networking", "dns", "privacy"],
  icon: "ShieldCheck",
  content: [
    <p key="1">
      Every time you visit a website, your browser sends a DNS query in{" "}
      <strong>plain text over UDP port 53</strong>. Your ISP, coffee shop Wi-Fi
      operator, and any network eavesdropper can see{" "}
      <strong>every domain you resolve</strong>. DNS over HTTPS (DoH) and DNS
      over TLS (DoT) encrypt these queries — but they take very different
      approaches.
    </p>,
    <Table
      key="2"
      headers={[
        "Property",
        "Traditional DNS",
        "DoT (DNS over TLS)",
        "DoH (DNS over HTTPS)",
      ]}
      rows={[
        [
          "Encryption",
          "None (plaintext)",
          "TLS on port 853",
          "HTTPS on port 443",
        ],
        [
          "Visibility",
          "ISP sees all queries",
          "ISP sees DNS-specific traffic",
          "Indistinguishable from HTTPS",
        ],
        [
          "Blocking",
          "Easy to intercept/modify",
          "Easy to block port 853",
          "Very hard — it's HTTPS traffic",
        ],
        [
          "Performance",
          "Fastest (no handshake)",
          "TLS handshake overhead",
          "HTTP/2 multiplexing, persistent conn",
        ],
        [
          "Centralization Risk",
          "Distributed (ISP resolvers)",
          "Distributed",
          "Centralizes to Cloudflare/Google",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Privacy Argument (Pro DoH)">
        <p className="text-sm">
          DoH hides DNS queries inside regular HTTPS traffic, making it{" "}
          <strong>impossible for ISPs to snoop or censor</strong>. Firefox and
          Chrome enable DoH by default. Users get privacy without changing any
          settings.
        </p>
      </Card>
      <Card title="The Control Argument (Anti DoH)">
        <p className="text-sm">
          DoH <strong>centralizes DNS</strong> to a few providers (Cloudflare,
          Google). Enterprises lose visibility into DNS traffic for security
          monitoring. Network admins can't block malicious domains. It{" "}
          <strong>bypasses corporate DNS policies</strong>.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="info" title="The Enterprise Compromise">
      Most enterprises deploy <strong>DoT internally</strong> (encrypted but on
      a dedicated port they control) and block external DoH providers. For
      personal privacy, DoH to Cloudflare (1.1.1.1) or Quad9 (9.9.9.9) is the
      recommended approach. The debate is <strong>privacy vs control</strong> —
      and the "right" answer depends on who you're protecting.
    </Callout>,
  ],
};
