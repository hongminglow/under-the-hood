import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const loadBalancingTopic: Topic = {
  id: "load-balancing",
  title: "Load Balancing Strategies",
  description:
    "How to distribute 100,000 incoming requests across your backend without overwhelming a single server.",
  tags: ["backend", "system-design", "scalability"],
  icon: "Scale",
  content: [
    <p key="1">
      Load Balancing is the art of <strong>Horizontal Scalability</strong>. Instead of buying a bigger server (Vertical Scaling), we use a "Traffic Cop" to distribute millions of requests across an array of identical, smaller servers.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      L4 Transport vs. L7 Application Balancing
    </h3>,
    <Table
      key="3"
      headers={["Feature", "L4 (Network Load Balancer)", "L7 (Application Load Balancer)"]}
      rows={[
        ["Data Awareness", "Only sees IP & Port. Fast, blind routing.", "Sees URL, Headers, Cookies, JSON. Smart routing."],
        ["Performance", "Extreme throughput. Does not decrypt TLS.", "Slower. Must decrypt TLS to 'see' the request."],
        ["Routing Logic", "Round Robin, IP Hash.", "Path-based (<code>/api/v1</code>), Header-based."],
        ["Example", "AWS NLB, Maglev (Google).", "AWS ALB, Nginx, HAProxy, Envoy."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Algorithms
    </h3>,
    <Grid key="5" cols={3} gap={4} className="my-8">
      <Card title="Round Robin">
        <p className="text-xs text-muted-foreground mb-2">Each server gets one request in a circular queue.</p>
        <p className="text-xs italic">Best for identical, stateless server hardware.</p>
      </Card>
      <Card title="Least Connections">
        <p className="text-xs text-muted-foreground mb-2">Sends traffic to the server with the fewest active sessions.</p>
        <p className="text-xs italic">Best for long-lived tasks (WebSocket, Streaming).</p>
      </Card>
      <Card title="Consistent Hashing">
        <p className="text-xs text-muted-foreground mb-2">Ensures a specific user (by IP) always hits the same server.</p>
        <p className="text-xs italic">Essential for stateful apps using local caching.</p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Health Checks: The 'Liveness' Signal
    </h3>,
    <p key="7" className="mb-4">
      A Load Balancer is only effective if it knows which servers are <em>actually</em> alive. It periodically pings a <code>/health</code> endpoint. If a server returns <code>503</code> or times out, the balancer instantly removes it from the rotation to prevent "Black-holing" user requests.
    </p>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      GSLB: Scaling Across the Planet
    </h3>,
    <p key="9" className="mb-4">
      <strong>Global Server Load Balancing</strong> works at the DNS level. If a user in London pings <code>app.api.com</code>, GSLB identifies their location and returns the IP of the <code>London-Data-Center</code>, rather than a server in California. This reduces <strong>geographic latency</strong> (speed of light constraints).
    </p>,
    <Callout key="10" type="tip" title="Sticky Sessions">
      If your app stores state in memory (not recommended!), use <strong>Sticky Sessions</strong>. The Load Balancer sets a cookie on the first request, ensuring every subsequent request from that browser uses the same persistent TCP connection to the same physical backend node.
    </Callout>,
  ],
};
