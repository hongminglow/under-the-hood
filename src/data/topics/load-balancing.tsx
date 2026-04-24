import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { RotateCw, Waves, Hash, ShieldAlert, ShieldCheck } from "lucide-react";

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
      theme="slate"
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
      <FeatureCard icon={RotateCw} title="Round Robin" subtitle="The simple rotation strategy" theme="cyan">
        <p className="text-xs text-cyan-100/75 mb-2">Each server gets one request in a circular queue.</p>
        <p className="text-xs italic text-cyan-200/70">Best for identical, stateless server hardware.</p>
      </FeatureCard>
      <FeatureCard icon={Waves} title="Least Connections" subtitle="Favor the least-busy node" theme="emerald">
        <p className="text-xs text-emerald-100/75 mb-2">Sends traffic to the server with the fewest active sessions.</p>
        <p className="text-xs italic text-emerald-200/70">Best for long-lived tasks (WebSocket, Streaming).</p>
      </FeatureCard>
      <FeatureCard icon={Hash} title="Consistent Hashing" subtitle="Keep related traffic sticky" theme="violet">
        <p className="text-xs text-violet-100/75 mb-2">Ensures a specific user (by IP) always hits the same server.</p>
        <p className="text-xs italic text-violet-200/70">Essential for stateful apps using local caching.</p>
      </FeatureCard>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Health Checks: The 'Liveness' Signal
    </h3>,
    <p key="7" className="mb-4">
      A Load Balancer is only effective if it knows which servers are <em>actually</em>&nbsp;alive. It periodically pings a <code>/health</code> endpoint. If a server returns <code>503</code> or times out, the balancer instantly removes it from the rotation to prevent "Black-holing" user requests.
    </p>,
    <CodeBlock
      key="health-code"
      title="Health Check Endpoint Implementation"
      language="javascript"
      code={`// Express.js health check endpoint
app.get('/health', async (req, res) => {
  try {
    // 1. Check database connection
    await db.query('SELECT 1');
    
    // 2. Check Redis connection
    await redis.ping();
    
    // 3. Check critical dependencies
    const diskSpace = await checkDiskSpace();
    if (diskSpace < 10) throw new Error('Low disk space');
    
    // All checks passed
    res.status(200).json({
      status: 'healthy',
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  } catch (error) {
    // Fail health check - load balancer will remove this server
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Separate liveness check (is process running?)
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});`}
    />,
    <Callout key="health-tip" type="tip" title="Shallow vs Deep Health Checks">
      <strong>Shallow</strong>: Just return 200 (is the process alive?). Fast, but doesn't catch DB failures.<br/>
      <strong>Deep</strong>: Check all dependencies. Slower, but catches real issues. Use shallow for frequent checks (every 5s), deep for less frequent (every 30s).
    </Callout>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      GSLB: Scaling Across the Planet
    </h3>,
    <p key="9" className="mb-4">
      <strong>Global Server Load Balancing</strong> works at the DNS level. If a user in London pings <code>app.api.com</code>, GSLB identifies their location and returns the IP of the <code>London-Data-Center</code>, rather than a server in California. This reduces <strong>geographic latency</strong> (speed of light constraints).
    </p>,

    <h3 key="story-title" className="text-xl font-bold mt-8 mb-4">
      Real-World Failure Story: The AWS ELB Outage (2017)
    </h3>,
    <FeatureCard key="story-card" icon={ShieldAlert} title="What Happened" subtitle="A cascading health-check failure" theme="rose">
      <p className="text-sm text-rose-100/75 mb-2">
        On February 28, 2017, AWS S3 went down in us-east-1, taking down half the internet. But the root cause wasn't S3 itself — it was the <strong>Elastic Load Balancer (ELB) health checks</strong>.
      </p>
      <p className="text-sm text-rose-100/75 mb-2">
        <strong>The Chain Reaction:</strong>
      </p>
      <ol className="text-sm text-rose-100/75 space-y-2 pl-5">
        <li>1. An engineer ran a debugging command to remove a few S3 servers</li>
        <li>2. A typo removed <em>way more servers</em> than intended</li>
        <li>3. ELB health checks started failing because S3 was overloaded</li>
        <li>4. ELB marked healthy servers as unhealthy and removed them</li>
        <li>5. This created a <strong>cascading failure</strong> — fewer servers = more load = more failures</li>
        <li>6. The entire S3 region went down for 4 hours</li>
      </ol>
      <p className="text-sm text-rose-100/85 mt-4">
        <strong className="text-rose-300">Lesson:</strong>&nbsp;Health checks can cause cascading failures if they're too aggressive. Always implement <strong>circuit breakers</strong>&nbsp;and <strong>graceful degradation</strong>.
      </p>
    </FeatureCard>,

    <h3 key="affinity-title" className="text-xl font-bold mt-8 mb-4">
      Session Affinity Pitfalls
    </h3>,
    <p key="affinity-desc" className="mb-4">
      Sticky sessions sound great — same user always hits the same server. But what happens when that server dies mid-session?
    </p>,
    <Grid key="affinity-grid" cols={2} gap={6} className="my-8">
      <FeatureCard icon={ShieldAlert} title="The Problem" subtitle="Why sticky affinity breaks badly" theme="rose">
        <p className="text-sm text-rose-100/75 mb-2">
          User A is "stuck" to Server 1. Server 1 crashes. Load balancer detects failure and removes it. User A's next request goes to Server 2, but Server 2 has no idea who User A is. Session lost.
        </p>
      </FeatureCard>
      <FeatureCard icon={ShieldCheck} title="The Solution" subtitle="Centralize the state" theme="emerald">
        <p className="text-sm text-emerald-100/75 mb-2">
          <strong>Never store session state in memory</strong>. Use Redis or a database for session storage. Any server can handle any request because session data is centralized.
        </p>
      </FeatureCard>
    </Grid>,
    <CodeBlock
      key="affinity-code"
      title="Stateless Session with Redis"
      language="javascript"
      code={`// BAD: Session in memory (sticky sessions required)
const sessions = new Map();
app.get('/api/cart', (req, res) => {
  const cart = sessions.get(req.sessionId);
  res.json(cart);
});

// GOOD: Session in Redis (any server can handle request)
app.get('/api/cart', async (req, res) => {
  const cart = await redis.get(\`session:\${req.sessionId}\`);
  res.json(JSON.parse(cart));
});`}
    />,

    <Callout key="10" type="tip" title="Sticky Sessions">
      If your app stores state in memory (not recommended!), use <strong>Sticky Sessions</strong>. The Load Balancer sets a cookie on the first request, ensuring every subsequent request from that browser uses the same persistent TCP connection to the same physical backend node.
    </Callout>,
  ],
};
