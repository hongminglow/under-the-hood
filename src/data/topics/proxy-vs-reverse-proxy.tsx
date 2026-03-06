import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const proxyVsReverseProxyTopic: Topic = {
  id: "proxy-vs-reverse-proxy",
  title: "Proxy vs Reverse Proxy",
  description:
    "The commonly confused interview topic: forward proxies protect clients, reverse proxies protect servers. Know the difference.",
  tags: ["networking", "system-design", "nginx", "interview"],
  icon: "ArrowLeftRight",
  content: [
    <p key="1">
      Both "proxy" and "reverse proxy" sit{" "}
      <strong>between clients and servers</strong>, but they face in{" "}
      <strong>opposite directions</strong>. Interviewers constantly test whether
      candidates understand which side each proxy protects and why they exist.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Forward Proxy (Client-Side)">
        <p className="text-sm">
          Sits in front of <strong>clients</strong>. The client sends requests
          to the proxy, which forwards them to the internet. The server{" "}
          <strong>never sees</strong> the real client IP.
        </p>
        <p className="text-sm mt-2">
          <strong>Use cases:</strong> Corporate content filtering, bypassing
          geo-restrictions, anonymity (Tor), caching for client networks.
        </p>
      </Card>
      <Card title="Reverse Proxy (Server-Side)">
        <p className="text-sm">
          Sits in front of <strong>servers</strong>. The client thinks it's
          talking to the real server, but the reverse proxy intercepts the
          request and routes it. The client <strong>never sees</strong> the real
          server IPs.
        </p>
        <p className="text-sm mt-2">
          <strong>Use cases:</strong> Load balancing, SSL termination, caching,
          DDoS protection, API gateway.
        </p>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Aspect", "Forward Proxy", "Reverse Proxy"]}
      rows={[
        [
          "Deployed by",
          "Client / organization",
          "Server / infrastructure team",
        ],
        ["Protects", "Client identity", "Server identity & infrastructure"],
        [
          "Client aware?",
          "Yes — client configured to use it",
          "No — client doesn't know it exists",
        ],
        [
          "Server aware?",
          "No — server sees proxy IP",
          "Yes — server sits behind it",
        ],
        [
          "SSL",
          "Can decrypt client traffic (MITM)",
          "Terminates SSL for backend servers",
        ],
        [
          "Examples",
          "Squid, corporate firewalls, VPNs",
          "Nginx, HAProxy, Cloudflare, AWS ALB",
        ],
      ]}
    />,
    <Callout key="4" type="info" title="Nginx: The Swiss Army Knife">
      <strong>Nginx</strong> is the world's most popular reverse proxy. It
      handles SSL termination (offloading HTTPS decryption), load balances
      across backend servers, caches static assets, and compresses responses —
      all before the request even reaches your application server. Nearly every
      production deployment uses one.
    </Callout>,
    <Callout key="5" type="warning" title="Interview Tip">
      When an interviewer says "proxy" without qualification, they almost always
      mean <strong>reverse proxy</strong>. But always clarify: "Are we talking
      about a forward proxy or a reverse proxy?" — this instantly signals you
      understand the distinction.
    </Callout>,
  ],
};
