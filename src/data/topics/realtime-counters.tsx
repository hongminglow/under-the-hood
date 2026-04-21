import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Flow } from "@/components/ui/Flow";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const realtimeCountersTopic: Topic = {
  id: "realtime-counters",
  title: "Real-Time Counters & Live Metrics",
  description:
    "How platforms like npm, Twitch, and GitHub count billions of events blazingly fast and stream live updates to thousands of watching browsers simultaneously.",
  tags: ["system-design", "real-time", "redis", "streaming"],
  icon: "Activity",
  content: [
    <p key="intro">
      You've seen it: an npm package page where the download count visibly ticks
      upward. A Twitch stream where the viewer count updates every few seconds.
      A YouTube premiere where the live thumbs-up counter climbs in real time. A
      donation tracker that jumps the moment someone gives. These look
      instantaneous and magical — but the engineering behind them is a
      carefully-designed pipeline of <strong>event capture → aggregation →
      push delivery</strong>. The naive "one DB write per event" approach would
      destroy any production database at scale.
    </p>,

    /* ── SECTION 1: The Naive Approach & Why It Fails ─────────────────── */
    <h3 key="h3-naive" className="text-xl font-bold mt-12 mb-4">
      The Naive Approach (And Why It Explodes)
    </h3>,
    <p key="naive-sub" className="mb-6">
      The first instinct most developers have: every time someone runs{" "}
      <code>npm install react</code>, send a POST request to the registry that
      does <code>UPDATE packages SET downloads = downloads + 1</code>. This
      works at zero scale and completely collapses at real scale.
    </p>,
    <Grid key="naive-grid" cols={2} gap={6} className="mb-8">
      <Card title="What Actually Happens at Scale">
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
          <li>
            <strong>React gets downloaded ~50M times per week.</strong> That's
            roughly <strong>400 writes per second</strong>, sustained, 24/7.
          </li>
          <li>
            Each write takes a <strong>row-level lock</strong> on the{" "}
            <code>packages</code> table to safely increment the counter.
          </li>
          <li>
            With 400 concurrent lock contentions per second on <em>one row</em>,
            queries back up. Timeouts cascade. The database tips over.
          </li>
          <li>
            And React is just one package. There are over{" "}
            <strong>2 million packages</strong> on npm.
          </li>
        </ul>
      </Card>
      <Card title="The Fundamental Problem">
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
          <li>
            <strong>Hot Row Contention:</strong> A single counter row becomes a
            global bottleneck. Every INCR serializes behind the last.
          </li>
          <li>
            <strong>Write Amplification:</strong> For every 1 user "event", you
            generate 1 synchronous DB write — at scale this sum is enormous.
          </li>
          <li>
            <strong>Precision Overkill:</strong> Does it matter if the count
            shows 49,999,821 vs 50,000,000? For a download ticker, approximate
            accuracy seconds behind is perfectly acceptable.
          </li>
        </ul>
      </Card>
    </Grid>,

    /* ── SECTION 2: The Real Pipeline ───────────────────────────────────── */
    <h3 key="h3-pipeline" className="text-xl font-bold mt-12 mb-4">
      The Real Pipeline: Event → Aggregation → Push
    </h3>,
    <p key="pipeline-sub" className="mb-6">
      Production-grade real-time counters are never a direct DB write. They
      always follow a multi-stage pipeline that separates high-throughput{" "}
      <strong>event ingestion</strong> from lower-frequency{" "}
      <strong>storage writes</strong> and the final <strong>live push</strong>{" "}
      to browsers.
    </p>,
    <Flow
      key="flow"
      steps={[
        {
          title: "1. User Action",
          description:
            "npm install react, a Twitch viewer joins, a donation is submitted.",
        },
        {
          title: "2. Event Emitted",
          description:
            "A lightweight event is fired: { type: 'download', pkg: 'react', ts: ... }. This is fire-and-forget — the user's CLI/browser does NOT wait for the counter to persist.",
        },
        {
          title: "3. Redis INCR (In-Memory Counter)",
          description:
            "The event hits a server that runs a single atomic Redis INCR command. Redis is single-threaded — INCR takes ~100 nanoseconds with zero lock contention. Millions per second, no problem.",
        },
        {
          title: "4. Background Flush (Batch Write)",
          description:
            "A scheduled job (e.g. every 60 seconds) reads the Redis counter, writes the delta to the SQL/ClickHouse DB, then resets the Redis counter. One DB write covers thousands of events.",
        },
        {
          title: "5. Broadcast to Watchers (SSE / WebSocket)",
          description:
            "After the flush, the updated total is published via a pub/sub channel. All connected browsers subscribed to that channel receive the new count instantly.",
        },
      ]}
    />,

    /* ── SECTION 3: npm Download Count Specifically ─────────────────────── */
    <h3 key="h3-npm" className="text-xl font-bold mt-12 mb-4">
      How npm Specifically Counts Downloads
    </h3>,
    <p key="npm-sub" className="mb-4">
      npm (owned by GitHub/Microsoft) has published parts of their
      infrastructure. Downloads are NOT counted on install. They are counted at
      the <strong>CDN layer</strong> — when the registry CDN serves the
      tarball (the <code>.tgz</code> file) to your machine.
    </p>,
    <Grid key="npm-grid" cols={2} gap={6} className="mb-8">
      <Card title="What Gets Counted">
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
          <li>
            A "download" is recorded every time the CDN successfully delivers a
            package tarball (the physical <code>.tgz</code>).
          </li>
          <li>
            <strong>CI/CD pipelines count.</strong> This is why React's
            download numbers are astronomically higher than its actual user
            base — every CI run reinstalls packages.
          </li>
          <li>
            <strong>Not real time.</strong> The counter you see on npmjs.com is
            updated roughly <strong>once per 24 hours</strong>. It is an
            aggregated daily number, not a live ticker.
          </li>
        </ul>
      </Card>
      <Card title="The CDN Log Pipeline">
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
          <li>
            CDN edge nodes (Cloudflare, Fastly) log every tarball delivery as a
            structured access log line.
          </li>
          <li>
            These logs stream into a <strong>data pipeline</strong> (Kafka /
            Kinesis) where a processing job counts by package name + date.
          </li>
          <li>
            The aggregated counts are written to a <strong>ClickHouse</strong>{" "}
            or BigQuery table — an analytics database optimized for massive
            columnar writes, not transactional row locks.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="npm-callout" type="info" title="It Looks Faster Than It Is">
      The "blazingly fast" counter you see on some package docs sites (like
      bundlephobia or similar) is actually fetching from a{" "}
      <strong>cached API endpoint</strong> (e.g.{" "}
      <code>api.npmjs.org/downloads/point/last-week/react</code>), not from a
      live stream. That endpoint returns a number that is hours old — but
      React's count is so large it still looks dramatic when displayed.
    </Callout>,

    /* ── SECTION 4: Twitch / YouTube / Donation Counters ───────────────── */
    <h3 key="h3-live" className="text-xl font-bold mt-12 mb-4">
      Truly Live Counters: Twitch, YouTube, Donations
    </h3>,
    <p key="live-sub" className="mb-4">
      These are a completely different beast. A Twitch viewer count or a
      donation ticker <em>genuinely does update in seconds</em>. The full
      pipeline involves a persistent connection from your browser back to the
      platform.
    </p>,
    <Table
      key="live-table"
      headers={["Platform", "Transport", "Mechanism", "Update Frequency"]}
      rows={[
        [
          "Twitch (viewer count)",
          "WebSocket (Twitch PubSub)",
          "Twitch's WebSocket PubSub broadcasts a viewer-count update message to all viewers on a channel. Each client receives the push and updates the DOM.",
          "~5–10 seconds",
        ],
        [
          "YouTube Live (likes/viewers)",
          "Long Polling / SSE",
          "YouTube periodically polls a private endpoint that returns updated metadata. The \"liveness\" is simulated client-side with a number interpolation animation.",
          "~10–30 seconds (with animation to smooth it)",
        ],
        [
          "Streamlabs / Donation Alerts",
          "WebSocket",
          "Your browser connects to Streamlabs' WS server. When a donation hits Stripe/PayPal webhook → Streamlabs API → publishes to the WS channel → your overlay widget receives a push event instantly.",
          "Near-instant (~200ms after payment processed)",
        ],
        [
          "GitHub Stars",
          "Polling (API)",
          "No live push. The GitHub API is called periodically by third-party badge services (shields.io). Shields.io caches the result for ~60 seconds to avoid rate limiting.",
          "Cached, ~1 minute stale",
        ],
      ]}
    />,

    /* ── SECTION 5: The Donation Flow In Detail ─────────────────────────── */
    <h3 key="h3-donation" className="text-xl font-bold mt-12 mb-4">
      Deep Dive: How a Twitch Donation Appears Instantly
    </h3>,
    <Flow
      key="donation-flow"
      steps={[
        {
          title: "Viewer Submits Donation",
          description:
            "User fills out the Streamlabs donation form with amount + message. Stripe.js tokenizes the card client-side and sends the charge request.",
        },
        {
          title: "Stripe Webhook Fires",
          description:
            "Stripe processes the charge and immediately fires a webhook POST to Streamlabs' server: { event: 'payment_intent.succeeded', amount: 500 }.",
        },
        {
          title: "Streamlabs Validates & Persists",
          description:
            "Streamlabs' webhook handler validates the Stripe signature (HMAC), saves the donation record to their DB, then publishes a message to their internal pub/sub system.",
        },
        {
          title: "Pub/Sub Push to WebSocket Server",
          description:
            "A Redis PUBLISH or Kafka message notifies the WebSocket gateway: 'new donation for channel #xqc'. The WS gateway finds all connected sessions for that channel.",
        },
        {
          title: "Browser Overlay Receives Push",
          description:
            "The streamer's OBS overlay (a browser source) has an open WebSocket to Streamlabs. It instantly receives the donation payload and triggers the alert animation.",
        },
      ]}
    />,

    /* ── SECTION 6: Redis as the Counter Backbone ───────────────────────── */
    <h3 key="h3-redis" className="text-xl font-bold mt-12 mb-4">
      Redis: The Universal Counter Backbone
    </h3>,
    <p key="redis-sub" className="mb-4">
      Almost every platform at scale uses Redis for high-frequency counter
      operations before flushing to a persistent store. The key command is{" "}
      <code>INCR</code>, which is atomic, single-threaded, and runs in
      nanoseconds.
    </p>,
    <Grid key="redis-code-grid" cols={2} gap={6} className="mb-8">
      <Card title="Redis Counter Pattern">
        <CodeBlock
          language="javascript"
          code={`// Every npm install triggers this:
await redis.incr('downloads:react:2025-04-18');
// Redis INCR is atomic — no race conditions,
// no locks. O(1), ~100 nanoseconds.

// Background job runs every 60 seconds:
const delta = await redis.getdel('downloads:react:2025-04-18');
await db.query(
  'UPDATE package_stats SET downloads = downloads + $1 WHERE pkg = $2 AND date = $3',
  [delta, 'react', '2025-04-18']
);
// One DB write covers ~24,000 download events
// that arrived in the last 60 seconds.`}
        />
      </Card>
      <Card title="SSE Broadcast Pattern">
        <CodeBlock
          language="javascript"
          code={`// Server-Sent Events to push counter to browsers
// (perfect for read-only live numbers)
app.get('/live/downloads/:pkg', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Subscribe to Redis pub/sub
  redisSub.subscribe(\`counter:\${req.params.pkg}\`);
  redisSub.on('message', (channel, count) => {
    res.write(\`data: \${count}\\n\\n\`);
  });

  // Cleanup on disconnect
  req.on('close', () => redisSub.unsubscribe());
});`}
        />
      </Card>
    </Grid>,

    /* ── SECTION 7: Comparison of Transport Choices ─────────────────────── */
    <h3 key="h3-transport" className="text-xl font-bold mt-12 mb-4">
      Choosing the Right Transport for Live Counters
    </h3>,
    <Table
      key="transport-table"
      headers={["Transport", "Best For", "Scale Challenge", "Examples"]}
      rows={[
        [
          "SSE (Server-Sent Events)",
          "Read-only counters, live feeds, dashboards",
          "Each open connection holds a thread/handle. Need to fan-out via Redis Pub/Sub when multiple server instances exist.",
          "npm download ticker, live vote counters, sports scores",
        ],
        [
          "WebSockets",
          "Interactive, bi-directional live updates. User both sends and receives.",
          "Stateful connections — load balancers need sticky sessions or Redis WS adapter for multi-server fan-out.",
          "Twitch chat + viewer count, donation alerts, live auctions",
        ],
        [
          "Long Polling",
          "Environments where WebSocket/SSE is blocked (firewalls, legacy proxies)",
          "Each poll creates a full HTTP request. N active users = N pending connections held open.",
          "GitHub stars badges, some analytics dashboards",
        ],
        [
          "Polling (Short)",
          "Low-frequency, non-critical counters. Simplest to implement.",
          "Creates unnecessary load. Every client hits the API independently even if nothing changed.",
          "npm badge on a README (shields.io), analytics widgets",
        ],
      ]}
    />,

    /* ── SECTION 8: Common Mistakes ─────────────────────────────────────── */
    <h3 key="h3-mistakes" className="text-xl font-bold mt-12 mb-4">
      Common Engineering Mistakes
    </h3>,
    <MistakeCard
      key="m1"
      number={1}
      title="Counting Every Event With a Synchronous DB Write"
      problem="A developer builds a page-view counter using UPDATE page_views SET count = count + 1 on every request. At 5,000 page views/sec, the PostgreSQL row lock causes query timeouts and the entire API slows to a crawl."
      solution="Use Redis INCR as the write target. A background cron job flushes the Redis delta to PostgreSQL every 30 seconds. Your DB does 1 write per 30 seconds instead of 5,000 per second."
    />,
    <MistakeCard
      key="m2"
      number={2}
      title="Opening a WebSocket for a Read-Only Counter"
      problem="A team builds a live download counter widget using WebSockets because 'it sounds more real-time.' WebSockets are bi-directional and stateful. Scaling to 50,000 users watching the counter costs a meaningful amount in server memory and sticky session complexity."
      solution="Use Server-Sent Events (SSE) instead. SSE is one-way (server → client), works over plain HTTP, supports HTTP/2 multiplexing, and automatically reconnects. It is the correct primitive for a read-only live counter."
    />,
    <MistakeCard
      key="m3"
      number={3}
      title="Trusting the 'Live' Counter You See"
      problem="A developer sees that their package has '50,000 downloads this week' on npmjs.com and assumes this is updated the moment people install it. They build a feature that polls this number constantly expecting real-time feedback."
      solution="npm's download API is aggregated from CDN logs processed in daily batches. The numbers can be 12–24 hours behind reality. For genuinely real-time data, you need to instrument your own event pipeline, not rely on a registry's reporting endpoint."
    />,

    /* ── SECTION 9: The Frontend Animation Trick ────────────────────────── */
    <h3 key="h3-frontend-trick" className="text-xl font-bold mt-12 mb-4">
      The Frontend Illusion: Number Interpolation
    </h3>,
    <p key="frontend-trick-sub" className="mb-4">
      As discussed, maintaining genuine sub-second updates for a massive
      audience destroys server capacity. The industry standard trick is to
      poll every 5-10 seconds, and use client-side javascript to smoothly{" "}
      <strong>interpolate (animate)</strong> between the old number and the new
      number natively in the browser. 
    </p>,
    <Card key="frontend-trick-card" title="Interpolating a Counter in React">
        <CodeBlock
          language="tsx"
          code={`import { useState, useEffect } from 'react';

// Imagine this runs every 10 seconds (via Long Polling or SSE).
// The server tells us: "The count is now 9,999"
// But currently, the UI is showing "1,000".

export default function AnimatedCounter({ targetValue }: { targetValue: number }) {
  const [displayValue, setDisplayValue] = useState(targetValue);

  useEffect(() => {
    // 1. Calculate how far we have to jump
    const distance = targetValue - displayValue;
    if (distance === 0) return;

    // 2. We want to complete the animation in exactly 1.5 seconds.
    // Meaning the UI will "tick" up visually, instead of instantly snapping.
    const durationMs = 1500;
    const startObj = { value: displayValue };
    const startTime = performance.now();
    
    // 3. Use standard requestAnimationFrame to smoothly tick the number
    function updateCounter(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Easing function makes it slow down right before it hits the target
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.floor(startObj.value + distance * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }, [targetValue]); // Only runs when the server pushes a new targetValue

  return <div className="font-mono text-4xl">{displayValue.toLocaleString()}</div>;
}`}
        />
    </Card>,

    /* ── SECTION 10: Closing Callout ─────────────────────────────────────── */
    <Callout key="final-tip" type="tip" title="The Counter Illusion">
      Many "real-time" counters you see on the web are{" "}
      <strong>animated interpolations</strong> of infrequently-fetched numbers.
      YouTube's like counter doesn't jump from 10,432 to 10,500 instantly — it
      smoothly animates between polled values every few seconds using a
      client-side counter that increments locally. The animation is designed to{" "}
      <em>create the feeling</em> of liveness, even when the underlying data
      update frequency is much slower than it appears.
    </Callout>,
  ],
};
