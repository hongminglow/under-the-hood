import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  Globe,
  Layers,
  Zap,
  Radio,
  Webhook,
  Cable,
  ArrowLeftRight,
  Workflow,
} from "lucide-react";

const paradigmLabelClass: Record<string, string> = {
  REST: "font-semibold text-red-300",
  GraphQL: "font-semibold text-amber-300",
  gRPC: "font-semibold text-cyan-300",
  "gRPC streaming": "font-semibold text-cyan-300",
  WebSockets: "font-semibold text-sky-300",
  SSE: "font-semibold text-indigo-300",
  tRPC: "font-semibold text-violet-300",
  Webhooks: "font-semibold text-fuchsia-300",
  SOAP: "font-semibold text-orange-300",
};

const paradigmChipClass: Record<string, string> = {
  REST:
    "inline-flex items-center rounded-full border border-red-700/50 bg-red-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200",
  GraphQL:
    "inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200",
  gRPC:
    "inline-flex items-center rounded-full border border-cyan-700/50 bg-cyan-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200",
  "gRPC streaming":
    "inline-flex items-center rounded-full border border-cyan-700/50 bg-cyan-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200",
  WebSockets:
    "inline-flex items-center rounded-full border border-sky-700/50 bg-sky-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200",
  SSE: "inline-flex items-center rounded-full border border-indigo-700/50 bg-indigo-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200",
  tRPC:
    "inline-flex items-center rounded-full border border-violet-700/50 bg-violet-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200",
  Webhooks:
    "inline-flex items-center rounded-full border border-fuchsia-700/50 bg-fuchsia-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200",
  SOAP:
    "inline-flex items-center rounded-full border border-orange-700/50 bg-orange-950/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200",
};

function paradigmLabel(name: string) {
  return <span className={paradigmLabelClass[name] ?? paradigmLabelClass.REST}>{name}</span>;
}

function paradigmChip(name: string) {
  return <span className={paradigmChipClass[name] ?? paradigmChipClass.REST}>{name}</span>;
}

export const apiParadigmsComparisonTopic: Topic = {
  id: "api-paradigms-comparison",
  title: "API Paradigms: The Complete Map",
  description:
    "REST, GraphQL, gRPC, WebSockets, SSE, tRPC, Webhooks, and SOAP — when to reach for each, and the architectural tradeoffs behind every choice.",
  tags: ["api-design", "architecture", "backend", "networking"],
  icon: "Cable",
  content: [
    <p key="intro">
      Every time two systems need to talk, an engineer makes a choice — often unconsciously. REST is
      chosen because everyone knows it. WebSockets because someone said "real-time." gRPC because
      the tech lead read a Google blog post. This topic maps the full landscape of communication
      paradigms, the hidden costs of each, and the architectural reasoning behind picking one over
      another.
    </p>,

    /* ─── SECTION 1: The Paradigm Map ─────────────────────────────────── */
    <h3 key="h-map" className="text-xl font-bold mt-12 mb-4">
      The 8 API Paradigms At a Glance
    </h3>,
    <p key="p-map" className="text-muted-foreground mb-6">
      Each paradigm solves a different communication problem. The mistake most engineers make is
      treating REST as the default for every situation.
    </p>,
    <Grid key="grid-paradigms" cols={2} gap={6} className="mb-10 items-stretch">
      <FeatureCard icon={Globe} title="REST" subtitle="Representational State Transfer" theme="emerald">
        <p className="text-sm text-red-100/80 leading-relaxed mb-4">
          Resources exposed via HTTP verbs (<code>GET</code>, <code>POST</code>, <code>PUT</code>,{" "}
          <code>DELETE</code>) on predictable URLs. Stateless — every request carries all context. The
          universal language of the public web.
        </p>
        <ul className="text-sm text-red-100/70 list-disc pl-4 space-y-1">
          <li>Public-facing APIs consumed by third parties</li>
          <li>CRUD-heavy services (users, products, orders)</li>
          <li>Where HTTP caching and CDN edge caching matter</li>
          <li>Teams unfamiliar with schema-first tools</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Layers} title="GraphQL" subtitle="Query Language for APIs" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-4">
          One endpoint, client-driven queries. The frontend specifies exactly which fields it needs.
          Solves over-fetching and under-fetching — but shifts complexity from the server to the
          query layer and kills standard HTTP caching.
        </p>
        <ul className="text-sm text-amber-100/70 list-disc pl-4 space-y-1">
          <li>Complex frontends with many aggregated data views</li>
          <li>Mobile apps where bandwidth is precious</li>
          <li>BFF (Backend-for-Frontend) translation layers</li>
          <li>Rapid product iteration where schema evolves fast</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Zap} title="gRPC" subtitle="Google Remote Procedure Call" theme="cyan">
        <p className="text-sm text-cyan-200/80 leading-relaxed mb-4">
          Binary protocol (Protobuf) over HTTP/2. Strict contracts via{" "}
          <code>.proto</code> files. Generates typed client/server stubs in any language. Up to{" "}
          <strong className="text-cyan-300">10x smaller payloads</strong> than JSON. Supports
          bidirectional streaming natively.
        </p>
        <ul className="text-sm text-cyan-200/70 list-disc pl-4 space-y-1">
          <li>Internal microservice-to-microservice calls</li>
          <li>High-throughput, latency-sensitive pipelines</li>
          <li>Polyglot teams (Go ↔ Python ↔ Java)</li>
          <li>Streaming RPC (video ingestion, ML inference)</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Radio} title="WebSockets" subtitle="Full-Duplex TCP Channel" theme="sky">
        <p className="text-sm text-sky-200/80 leading-relaxed mb-4">
          An HTTP Upgrade handshake opens a persistent, bidirectional TCP tunnel. Both sides can push
          data at any time. Stateful by nature — each open socket is memory on your server.
        </p>
        <ul className="text-sm text-sky-200/70 list-disc pl-4 space-y-1">
          <li>Live chat and collaborative editing (Figma, Notion)</li>
          <li>Multiplayer games requiring &lt;50ms latency</li>
          <li>Live trading terminals and order books</li>
          <li>IoT device telemetry streams</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={ArrowLeftRight} title="SSE" subtitle="Server-Sent Events" theme="indigo">
        <p className="text-sm text-indigo-200/80 leading-relaxed mb-4">
          A persistent HTTP connection where the <em>server pushes</em> a stream of events to the
          client. Uni-directional only. Built-in auto-reconnect. Works over plain HTTP/2 — no special
          infrastructure needed. The quiet winner for many "real-time" use cases.
        </p>
        <ul className="text-sm text-indigo-200/70 list-disc pl-4 space-y-1">
          <li>AI response streaming (ChatGPT-style word-by-word)</li>
          <li>Live dashboards and notification feeds</li>
          <li>Stock tickers, live sports scores</li>
          <li>CI/CD build log tailing</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Workflow} title="tRPC" subtitle="TypeScript RPC" theme="violet">
        <p className="text-sm text-violet-200/80 leading-relaxed mb-4">
          End-to-end type safety between a TypeScript server and client — zero code generation, zero
          schema files. Router procedures are inferred types. The client call is indistinguishable
          from calling a local function. Only works in TypeScript monorepos.
        </p>
        <ul className="text-sm text-violet-200/70 list-disc pl-4 space-y-1">
          <li>Full-stack TypeScript apps (Next.js, Remix)</li>
          <li>Internal tools where teams own both ends</li>
          <li>Rapid prototyping with zero API boilerplate</li>
          <li>Teams that have abandoned REST for internal use</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Webhook} title="Webhooks" subtitle="Push-Based HTTP Callbacks" theme="fuchsia">
        <p className="text-sm text-fuchsia-100/80 leading-relaxed mb-4">
          Your system registers a URL. When an event occurs on the provider's side (payment
          succeeds, PR merged), they <code>POST</code> a JSON payload to your URL. You react to
          events instead of polling. The entire third-party integration ecosystem runs on this.
        </p>
        <ul className="text-sm text-fuchsia-100/70 list-disc pl-4 space-y-1">
          <li>Payment confirmations (Stripe, PayPal)</li>
          <li>CI/CD triggers (GitHub push → deploy pipeline)</li>
          <li>SaaS event notifications (Slack, Shopify)</li>
          <li>Any event-driven cross-system integration</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Cable} title="SOAP" subtitle="Simple Object Access Protocol" theme="orange">
        <p className="text-sm text-orange-100/80 leading-relaxed mb-4">
          XML-based RPC with strict WSDL contracts. Verbose, heavy, but enterprise-grade — built-in
          WS-Security, transactions, and ACID guarantees over HTTP. Legacy dominant in banking,
          healthcare (HL7/FHIR), and government systems.
        </p>
        <ul className="text-sm text-orange-100/70 list-disc pl-4 space-y-1">
          <li>Banking and financial transaction APIs</li>
          <li>Government and healthcare integrations</li>
          <li>Enterprise B2B systems requiring formal contracts</li>
          <li>When you have no choice (legacy partner APIs)</li>
        </ul>
      </FeatureCard>
    </Grid>,

    /* ─── SECTION 2: Master Comparison Table ───────────────────────────── */
    <h3 key="h-table" className="text-xl font-bold mt-12 mb-4">
      Side-by-Side Technical Comparison
    </h3>,
    <Table
      key="table-comparison"
      headers={["Paradigm", "Transport", "Payload", "Direction", "Contract", "Browser Native"]}
      rows={[
        [paradigmLabel("REST"), "HTTP/1.1-3", "JSON / XML", "Request-Response", "OpenAPI (optional)", "Yes"],
        [paradigmLabel("GraphQL"), "HTTP (POST)", "JSON", "Request-Response", "SDL Schema (required)", "Yes"],
        [paradigmLabel("gRPC"), "HTTP/2", "Protobuf (binary)", "Streaming + R/R", ".proto (required)", "Needs proxy"],
        [paradigmLabel("WebSockets"), "TCP (ws://)", "Any (text/binary)", "Full-Duplex", "None", "Yes"],
        [paradigmLabel("SSE"), "HTTP", "text/event-stream", "Server -> Client", "None", "Yes"],
        [paradigmLabel("tRPC"), "HTTP / WS", "JSON", "Request-Response", "TypeScript types", "Yes (TS only)"],
        [paradigmLabel("Webhooks"), "HTTP (POST)", "JSON", "Provider -> Consumer", "Provider docs", "Yes"],
        [paradigmLabel("SOAP"), "HTTP / SMTP", "XML", "Request-Response", "WSDL (required)", "Complex"],
      ]}
    />,

    /* ─── SECTION 3: The Communication Pattern Decision ───────────────── */
    <h3 key="h-patterns" className="text-xl font-bold mt-12 mb-4">
      Communication Patterns — The Root Decision
    </h3>,
    <p key="p-patterns" className="text-muted-foreground mb-6">
      Before picking a paradigm, identify your communication pattern. This is the most important
      question — not "which is fastest" or "which is most popular."
    </p>,
    <Flow
      key="flow-patterns"
      steps={[
        {
          title: "Request-Response (Synchronous)",
          description:
            "Client asks. Server answers. Connection closes. → REST, GraphQL, gRPC Unary, tRPC. The default for CRUD, search, and data fetching.",
        },
        {
          title: "Server Push (Unidirectional)",
          description:
            "Server emits data without a client request. → SSE, Webhooks. Ideal for notifications, AI streaming, event feeds where the client just listens.",
        },
        {
          title: "Full-Duplex (Bidirectional)",
          description:
            "Both sides speak simultaneously over one connection. → WebSockets, gRPC Bidirectional Streaming. Required for chat, gaming, real-time collaboration.",
        },
        {
          title: "Event-Driven (Async Callback)",
          description:
            "Your system registers interest. Provider notifies you when events occur. → Webhooks, Message Queues. For cross-system integrations where polling is wasteful.",
        },
      ]}
    />,

    /* ─── SECTION 4: The Decision Framework ───────────────────────────── */
    <h3 key="h-decision" className="text-xl font-bold mt-12 mb-4">
      The Decision Framework
    </h3>,
    <Table
      key="table-decision"
      headers={["Scenario", "Recommended Paradigm", "Why"]}
      rows={[
        [
          "Public API for third-party developers",
          paradigmLabel("REST"),
          "Universally understood, great tooling, CDN-cacheable",
        ],
        ["Complex SPA with many data views", paradigmLabel("GraphQL"), "Eliminates N+1 round-trips, client-driven shape"],
        ["Internal microservice mesh", paradigmLabel("gRPC"), "Binary speed, strict contracts, streaming, polyglot"],
        ["Live chat / collaborative editing", paradigmLabel("WebSockets"), "True bidirectional, sub-50ms latency"],
        ["AI token streaming / live feeds", paradigmLabel("SSE"), "Simpler than WS, auto-reconnect, scales on HTTP/2"],
        ["Full-stack TypeScript monorepo", paradigmLabel("tRPC"), "Zero boilerplate, end-to-end types, DX velocity"],
        ["Payment / CI-CD event notifications", paradigmLabel("Webhooks"), "Push model, no polling, 3rd-party standard"],
        ["Enterprise banking / healthcare B2B", paradigmLabel("SOAP"), "Formal contracts, WS-Security, legacy compliance"],
        [
          "High-throughput ML inference pipeline",
          paradigmLabel("gRPC streaming"),
          "Binary + bidirectional stream, low serialisation cost",
        ],
      ]}
    />,

    /* ─── SECTION 5: Pros & Cons Deep Dive ────────────────────────────── */
    <h3 key="h-tradeoffs" className="text-xl font-bold mt-12 mb-4">
      Architectural Tradeoffs — The Honest List
    </h3>,
    <Grid key="grid-tradeoffs" cols={2} gap={6} className="mb-8 items-stretch">
      <FeatureCard icon={Globe} title="REST" subtitle="Strengths" theme="emerald">
        <ul className="text-sm text-red-100/75 list-disc pl-4 space-y-2">
          <li>Universal adoption — every HTTP client works</li>
          <li>Native CDN and browser caching via <code>GET</code> URLs</li>
          <li>Stateless — trivially horizontally scalable</li>
          <li>Enormous tooling ecosystem (Swagger, Postman, etc.)</li>
          <li>Easy to monitor per-endpoint latency and error rates</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Globe} title="REST" subtitle="Weaknesses" theme="emerald">
        <ul className="text-sm text-red-100/75 list-disc pl-4 space-y-2">
          <li>Over-fetching: returns far more fields than the client needs</li>
          <li>Under-fetching: complex views require multiple sequential calls</li>
          <li>No versioning standard — <code>/v1</code> vs <code>/v2</code> is convention, not spec</li>
          <li>No built-in streaming or push model</li>
          <li>Loose contracts unless OpenAPI is strictly enforced</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Layers} title="GraphQL" subtitle="Strengths" theme="amber">
        <ul className="text-sm text-amber-100/75 list-disc pl-4 space-y-2">
          <li>Client dictates exact data shape — zero bandwidth waste</li>
          <li>Single endpoint reduces API surface area</li>
          <li>Schema is self-documenting via introspection</li>
          <li>Subscriptions enable real-time data over WebSockets</li>
          <li>Ideal for aggregating multiple backend services into one layer</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Layers} title="GraphQL" subtitle="Weaknesses" theme="amber">
        <ul className="text-sm text-amber-100/75 list-disc pl-4 space-y-2">
          <li>HTTP caching breaks — all queries go to one POST endpoint</li>
          <li>N+1 problem re-emerges at the resolver level (requires DataLoader)</li>
          <li>File uploads are awkward — requires multipart extensions</li>
          <li>Complex queries can cause accidental DoS (unbounded depth)</li>
          <li>High learning curve for backend teams used to REST</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Zap} title="gRPC" subtitle="Strengths" theme="cyan">
        <ul className="text-sm text-cyan-100/75 list-disc pl-4 space-y-2">
          <li>Protobuf payloads up to 10x smaller than JSON</li>
          <li>Strong typed contracts across every language</li>
          <li>Native bidirectional streaming over HTTP/2</li>
          <li>Auto-generated client/server stubs — no manual SDK work</li>
          <li>Built-in deadline propagation and cancellation</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Zap} title="gRPC" subtitle="Weaknesses" theme="cyan">
        <ul className="text-sm text-cyan-100/75 list-disc pl-4 space-y-2">
          <li>Not browser-native — requires gRPC-Web + Envoy proxy</li>
          <li>Binary payload not human-readable — debugging is harder</li>
          <li>Strict schema evolution — field changes require care</li>
          <li>Steeper learning curve than REST for most teams</li>
          <li>Overkill for simple public-facing CRUD endpoints</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Radio} title="WebSockets" subtitle="Strengths" theme="sky">
        <ul className="text-sm text-sky-100/75 list-disc pl-4 space-y-2">
          <li>True full-duplex — lowest latency for bidirectional messages</li>
          <li>No HTTP overhead after the initial handshake</li>
          <li>Browser native — no special setup needed client-side</li>
          <li>Sub-frame binary messaging possible</li>
        </ul>
      </FeatureCard>
      <FeatureCard icon={Radio} title="WebSockets" subtitle="Weaknesses" theme="sky">
        <ul className="text-sm text-sky-100/75 list-disc pl-4 space-y-2">
          <li>Stateful — each open socket holds memory on the server</li>
          <li>Load balancers need sticky sessions (breaks standard L4 LBs)</li>
          <li>No built-in reconnection — must implement exponential backoff</li>
          <li>Difficult to scale horizontally without Redis Pub/Sub backbone</li>
          <li>Overkill for one-way data pushes (SSE is simpler)</li>
        </ul>
      </FeatureCard>
    </Grid>,

    /* ─── SECTION 6: SSE vs WebSocket Detail ─────────────────────────── */
    <Callout key="callout-sse" type="tip" title="The SSE vs WebSocket Decision Most Engineers Get Wrong">
      If your use case is <strong>server → client only</strong> (AI streaming, live notifications,
      score updates, build logs), SSE is almost always the better choice. It works over plain HTTP,
      reconnects automatically, is trivially scalable behind any load balancer, and requires zero
      special infrastructure. WebSockets are only justified when the <em>client</em> also needs to
      push data back with low latency — chat, gaming, collaborative cursors.
    </Callout>,

    /* ─── SECTION 7: Code Examples ─────────────────────────────────────── */
    <h3 key="h-code" className="text-xl font-bold mt-12 mb-4">
      The Same Operation — Across Every Paradigm
    </h3>,
    <p key="p-code" className="text-slate-300 mb-6">
      Fetching a user's profile. See how each paradigm shapes the wire format and client contract.
    </p>,
    <Grid key="grid-code" cols={2} gap={6} className="mb-8">
      <FeatureCard icon={Globe} title="REST" subtitle="Request / Response Shape" theme="emerald">
        <CodeBlock
          theme="emerald"
          language="bash"
          code={`GET /users/42
Authorization: Bearer <token>

# Response
{
  "id": 42,
  "name": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "createdAt": "2024-01-01",
  "lastLogin": "2025-04-23"
  // ... 20 more fields you didn't ask for
}`}
        />
      </FeatureCard>
      <FeatureCard icon={Layers} title="GraphQL" subtitle="Client-Shaped Query" theme="amber">
        <CodeBlock
          theme="amber"
          language="graphql"
          code={`# Client asks for EXACTLY what it needs
query {
  user(id: 42) {
    name
    email
  }
}

# Response — only what was requested
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`}
        />
      </FeatureCard>
      <FeatureCard icon={Zap} title="gRPC" subtitle=".proto Contract" theme="cyan">
        <CodeBlock
          theme="cyan"
          language="protobuf"
          code={`syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest { int32 id = 1; }
message UserResponse {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

// Client call (TypeScript, auto-generated stub)
const user = await client.getUser({ id: 42 });`}
        />
      </FeatureCard>
      <FeatureCard icon={Workflow} title="tRPC" subtitle="Type-Inferred Procedure" theme="violet">
        <CodeBlock
          theme="violet"
          language="typescript"
          code={`// Server router (Next.js API)
export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.user.findUnique({ where: { id: input.id } });
    }),
});

// Client call — fully typed, zero schema files
const user = await trpc.user.getUser.query({ id: 42 });
// user.name ← autocompleted. Compile-time safe.`}
        />
      </FeatureCard>
    </Grid>,

    /* ─── SECTION 8: The "Use Both" Pattern ────────────────────────────── */
    <h3 key="h-hybrid" className="text-xl font-bold mt-12 mb-4">
      The "Use Both" Architecture — Real-World Patterns
    </h3>,
    <p key="p-hybrid" className="text-muted-foreground mb-6">
      Production systems rarely use a single paradigm. The right answer is often a deliberate
      combination.
    </p>,
    <Grid key="grid-hybrid" cols={2} gap={6} className="mb-8">
      <FeatureCard icon={ArrowLeftRight} title="Pattern 1" subtitle="REST External, gRPC Internal" theme="cyan">
        <p className="text-sm text-cyan-100/80 leading-relaxed mb-3">
          Public-facing API consumers get a clean REST interface. Internally, microservices
          communicate via gRPC for speed and strong typing. An API Gateway translates REST → gRPC.
        </p>
        <p className="text-sm text-cyan-200/70">
          <strong className="text-cyan-300">Used by:</strong> Google, Netflix, Uber
        </p>
      </FeatureCard>
      <FeatureCard icon={ArrowLeftRight} title="Pattern 2" subtitle="REST + WebSocket Hybrid" theme="sky">
        <p className="text-sm text-sky-100/80 leading-relaxed mb-3">
          REST handles all CRUD operations. WebSockets handle only real-time events. The client fetches
          initial data via REST on load, then subscribes to a WebSocket channel for live delta updates.
        </p>
        <p className="text-sm text-sky-200/70">
          <strong className="text-sky-300">Used by:</strong> Slack, Figma, Linear
        </p>
      </FeatureCard>
      <FeatureCard icon={ArrowLeftRight} title="Pattern 3" subtitle="GraphQL BFF + REST Backends" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          A GraphQL "Backend for Frontend" layer aggregates data from multiple REST and gRPC
          microservices. Each downstream service keeps its simple REST contract; the BFF composes
          them for the specific client.
        </p>
        <p className="text-sm text-amber-200/70">
          <strong className="text-amber-300">Used by:</strong> Airbnb, GitHub
        </p>
      </FeatureCard>
      <FeatureCard icon={ArrowLeftRight} title="Pattern 4" subtitle="REST + SSE for AI Streaming" theme="indigo">
        <p className="text-sm text-indigo-100/80 leading-relaxed mb-3">
          A <code>POST /chat</code> REST request initiates a conversation. The response is streamed
          back as an SSE text stream, word by word. The client renders tokens as they arrive.
          WebSockets are not needed — the client never pushes mid-stream.
        </p>
        <p className="text-sm text-indigo-200/70">
          <strong className="text-indigo-300">Used by:</strong> OpenAI, Anthropic, Vercel AI SDK
        </p>
      </FeatureCard>
    </Grid>,

    /* ─── SECTION 9: Common Mistakes ───────────────────────────────────── */
    <h3 key="h-mistakes" className="text-xl font-bold mt-12 mb-4">
      Common Paradigm Mistakes
    </h3>,
    <Table
      key="table-mistakes"
      headers={["Mistake", "What Goes Wrong", "The Fix"]}
      rows={[
        [
          "Using WebSockets for one-way notifications",
          "Stateful connections waste server memory. Load balancers need sticky sessions. Complex reconnection logic.",
          "Use SSE instead — same result, runs over plain HTTP, auto-reconnects, scales without sticky sessions.",
        ],
        [
          "Using GraphQL for a simple internal CRUD service",
          "Overkill schema setup. N+1 resolver problems. Cache invalidation complexity. Hard to monitor per-operation.",
          "Use REST or tRPC for internal services. GraphQL only pays off with complex, aggregated data views.",
        ],
        [
          "Using REST for microservice-to-microservice calls",
          "JSON serialization overhead at scale. No streaming. No strict contracts. Slower than necessary.",
          "Switch internal calls to gRPC. Keep REST only at the edge for external consumers.",
        ],
        [
          "Polling instead of Webhooks",
          "Thousands of empty HTTP requests per minute per client. CPU waste. Artificial latency.",
          "Register a Webhook endpoint. The provider calls you. Zero polling, event-driven, instant.",
        ],
        [
          "No schema enforcement on REST APIs",
          "Clients and servers silently drift apart. Breaking changes deploy undetected. Type errors at runtime.",
          "Enforce OpenAPI spec and generate client SDKs from it. Or switch to tRPC / gRPC for compile-time safety.",
        ],
      ]}
    />,

    /* ─── SECTION 10: Quick Reference ──────────────────────────────────── */
    <Callout key="callout-mental-model" type="info" title="The One-Line Mental Models">
      <ul className="space-y-2 mt-2">
        <li>
          {paradigmChip("REST")}&nbsp;— Standard HTTP CRUD. Universal, cacheable,
          everyone knows it.
        </li>
        <li>
          {paradigmChip("GraphQL")}&nbsp;— Client-shaped queries. One endpoint.
          Kills bandwidth waste.
        </li>
        <li>
          {paradigmChip("gRPC")}&nbsp;— Binary RPC over HTTP/2. Internal
          microservices. Fastest.
        </li>
        <li>
          {paradigmChip("WebSockets")}&nbsp;— Persistent pipe. Both sides push.
          Chat, gaming.
        </li>
        <li>
          {paradigmChip("SSE")}&nbsp;— Server pushes only. AI streaming,
          notifications. Simpler than WS.
        </li>
        <li>
          {paradigmChip("tRPC")}&nbsp;— TypeScript-only RPC. Zero schema files.
          Monorepo DX.
        </li>
        <li>
          {paradigmChip("Webhooks")}&nbsp;— Event callbacks. Third-party
          integrations. No polling.
        </li>
        <li>
          {paradigmChip("SOAP")}&nbsp;— XML contracts. Enterprise legacy.
          Use when forced.
        </li>
      </ul>
    </Callout>,
  ],
};
