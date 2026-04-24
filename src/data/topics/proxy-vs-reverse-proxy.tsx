import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { UserRound, ServerCog } from "lucide-react";

export const proxyVsReverseProxyTopic: Topic = {
  id: "proxy-vs-reverse-proxy",
  title: "Proxy vs Reverse Proxy",
  description:
    "A practical look behind the scenes at how traffic is routed and protected in modern applications.",
  tags: ["networking", "system-design", "nginx", "infrastructure"],
  icon: "ArrowLeftRight",
  content: [
    <p key="1">
      At its simplest, a <strong>Proxy</strong> is a "Middleman." It intercepts a request from a sender and forwards it to a receiver. However, the <em>direction</em> of this middleman determines whether it's protecting a user's privacy or a server's stability.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Forward vs. Reverse: The Directional Divide
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Forward Proxy (Client Side)", "Reverse Proxy (Server Side)"]}
      rows={[
        ["Who it Protects", "The <strong>Client</strong> (Browser/User).", "The <strong>Server</strong> (API/Database)."],
        ["Visibility", "Internet thinks the Proxy is the User.", "User thinks the Proxy is the Application."],
        ["Main Use Case", "Anonymity, Content Filtering, Caching.", "Load Balancing, Security, SSL Termination."],
        ["Location", "Inside the User's network (e.g., VPN).", "Directly in front of the Application servers."],
        ["Example", "Corporate Firewalls, Squid, NordVPN.", "Nginx, HAProxy, AWS ALB, Cloudflare."]
      ]}
    />,
    <Callout key="CORS" type="info" title="Pro Tip: Bypassing CORS with Proxying">
      Ever hit a <strong>CORS error</strong> while fetching an API from the browser? This is because browsers block cross-origin requests for security.
      <br /><br />
      Developers often use a <strong>Proxy Server</strong> (like a small NodeJS server or a dev-server proxy) to "hide" the browser. The browser sends the request to the proxy (same-origin), and the proxy fetches from the target API (server-to-server). Since CORS is a <strong>browser security feature</strong>, the proxy-to-server request is never blocked!
    </Callout>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Power of the Reverse Proxy
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <FeatureCard icon={ServerCog} title="SSL Termination" subtitle="Offload TLS work to the edge" theme="emerald">
        <p className="text-sm text-emerald-100/75 mb-2">
          Decrypting HTTPS is <strong>computationally expensive</strong>.
        </p>
        <p className="text-xs italic text-emerald-200/70">
          The Reverse Proxy (Nginx) handles the heavy math. It sends plain HTTP to your internal microservices, saving significant CPU cycles on your app servers.
        </p>
      </FeatureCard>
      <FeatureCard icon={UserRound} title="Header Manipulation" subtitle="Forward the real client identity" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-2">
          Passing the "Original" User IP.
        </p>
        <p className="text-xs italic text-cyan-200/70">
          Because the backend only sees the Proxy's IP, the proxy injects an <code>X-Forwarded-For</code> header so your app knows exactly who the real user is.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Layer 4 vs. Layer 7 Proxying
    </h3>,
    <p key="7" className="mb-4">
      Modern proxies like <strong>Nginx</strong> or <strong>Envoy</strong> can operate at two different levels of the OSI stack:
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>L4 Proxy (Transport):</strong> Routes traffic based on IP and Port (TCP/UDP). It's blindingly fast because it doesn't look at the HTTP content.</li>
      <li><strong>L7 Proxy (Application):</strong> Decrypts the request to read URLs (<code>/api/v1</code>), headers (<code>User-Agent</code>), and cookies. It allows for "Smart" routing, like sending mobile users to a different set of servers.</li>
    </ul>,
    <Callout key="9" type="warning" title="The Single Point of Failure">
      A Reverse Proxy is the <strong>Gatekeeper</strong>. If your Nginx instance crashes, your entire backend is unreachable—even if your 100 NodeJS servers are perfectly healthy. High-availability setups use <strong>Keepalived</strong> or <strong>Floating IPs</strong> to ensure the proxy itself never goes down.
    </Callout>,
  ],
};
