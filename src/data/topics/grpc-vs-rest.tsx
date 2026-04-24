import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Globe, Zap } from "lucide-react";

export const grpcVsRestTopic: Topic = {
  id: "grpc-vs-rest",
  title: "gRPC vs REST",
  description:
    "Why massive microservice architectures abandon standard JSON REST APIs for lightning-fast binary protocols.",
  tags: ["backend", "api-design", "microservices"],
  icon: "Binary",
  content: [
    <p key="1">
      Choosing between REST and gRPC is a trade-off between <strong>Accessibility</strong> and <strong>Performance</strong>. While REST is the universal language of the web, gRPC is the high-performance engine for internal microservices.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Protocol Battle
    </h3>,
    <Table
      key="3"
      theme="slate"
      headers={["Feature", "REST (Representational State Transfer)", "gRPC (Google Remote Procedure Call)"]}
      rows={[
        ["Payload", "<strong>JSON</strong> (Text-based, Heavy).", "<strong>Protobuf</strong> (Binary, Lightweight)."],
        ["Transport", "HTTP/1.1 or HTTP/2.", "Strictly <strong>HTTP/2</strong>."],
        ["Contract", "Optional (Swagger/OpenAPI).", "Strictly Required (<code>.proto</code> files)."],
        ["Performance", "Slower (Text parsing overhead).", "Blazing fast (Minimal serialization)."],
        ["Streaming", "Client-to-Server (Request/Response).", "Bidirectional, Server-side, Client-side."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Under the Hood: Protocol Buffers (Protobuf)
    </h3>,
    <p key="5" className="mb-4 text-sm text-muted-foreground">
      JSON is <strong>Self-Describing</strong>; it sends both the key and value (e.g., <code>"userId": 123</code>). gRPC uses Protobuf, which strips away the keys and sends raw binary bytes based on a shared schema.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Zap} title="Code Generation" subtitle="gRPC's contract-first leverage" theme="violet">
        <p className="text-sm text-violet-100/75 mb-2">
          gRPC generates the <strong>Client & Server Stubs</strong>.
        </p>
        <p className="text-xs italic text-violet-200/70">
          You write a <code>service.proto</code> file. gRPC automatically compiles it into TypeScript, Go, or Python. You call <code>client.getUser()</code> as if it were a local function.
        </p>
      </FeatureCard>
      <FeatureCard icon={Globe} title="Streaming Capabilities" subtitle="What HTTP/2 unlocks" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-2">
          Harnessing the power of HTTP/2.
        </p>
        <p className="text-xs italic text-cyan-200/70">
          Supports <strong>Bidirectional Streaming</strong>: The server can push data elements one-by-one as they are processed, rather than waiting for a giant batch to finish.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Why not for the Browser? (gRPC-Web)
    </h3>,
    <p key="8" className="mb-4">
      Native gRPC requires access to low-level <strong>HTTP/2 Frames</strong>, which browsers (Chrome/Safari) do not expose to JavaScript. To use gRPC in a React app, you must use <strong>gRPC-Web</strong>, which requires a proxy (Envoy) to translate browser-friendly HTTP requests into native gRPC.
    </p>,
    <Callout key="9" type="info" title="Internal vs. External">
      Rule of thumb: Use <strong>REST</strong> for your public-facing API that third-party developers use. Use <strong>gRPC</strong> for your internal microservices (e.g., Auth service talking to Order service) to minimize latency and CPU usage.
    </Callout>,
  ],
};
