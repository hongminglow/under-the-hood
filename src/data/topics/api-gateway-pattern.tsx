import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const apiGatewayPatternTopic: Topic = {
  id: "api-gateway-pattern",
  title: "API Gateway Pattern",
  description:
    "The bouncer at the club: How a single front door protects your 50 fragile backend microservices.",
  tags: ["architecture", "microservices", "API"],
  icon: "DoorOpen",
  content: [
    <p key="1">
      An API Gateway is the <strong>Strategic Perimeter</strong> of a microservice architecture. It handles the "Cross-Cutting Concerns" so your developers can focus on writing business logic without re-implementing auth, rate limiting, and logging 50 times.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Gateway's Multi-Role Architecture
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Reverse Proxy & Routing">
        <p className="text-sm text-slate-400 mb-2">
          The Gateway maps external URLs (<code>/orders</code>) to internal private IPs (<code>10.0.1.4</code>). It supports <strong>Canary Releases</strong> by routing 5% of traffic to a new version.
        </p>
      </Card>
      <Card title="BFF (Backend for Frontend)">
        <p className="text-sm text-slate-400 mb-2">
          A mobile app needs a different JSON structure than a desktop app. The Gateway can <strong>Transform payloads</strong> on the fly, tailoring the response to the specific device.
        </p>
      </Card>
    </Grid>,

    <h3 key="3a" className="text-xl font-bold mt-8 mb-4">
      Request Aggregation (API Composition)
    </h3>,
    <p key="3b" className="mb-4">
      A single frontend page often needs data from 5 different microservices (User, Orders, Inventory, Reviews, Recommendations). Without a gateway, the client makes 5 separate HTTP round trips. With <strong>Request Aggregation</strong>, the gateway fans out those 5 calls internally in parallel, merges the responses, and returns a single unified JSON payload to the client.
    </p>,
    <Grid key="3c" cols={2} gap={6} className="my-8">
      <Card title="Without Aggregation">
        <p className="text-sm text-slate-400">
          Client makes 5 sequential HTTP requests. Each incurs DNS, TCP handshake, and TLS overhead. Total latency: <strong>sum of all 5 calls</strong>. Mobile users on 3G suffer enormously.
        </p>
      </Card>
      <Card title="With Aggregation">
        <p className="text-sm text-slate-400">
          Client makes 1 request. Gateway fans out 5 internal calls <strong>in parallel</strong> over the private network (no TLS overhead). Total latency: <strong>max of the 5 calls</strong>. Dramatic improvement.
        </p>
      </Card>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Authentication Offloading
    </h3>,
    <p key="4a" className="mb-4">
      Instead of every microservice independently verifying JWTs or calling an OAuth provider, the gateway handles authentication <strong>once</strong> at the edge. Downstream services receive a pre-validated internal header (e.g., <code>X-User-Id: 42</code>) and implicitly trust it because traffic only arrives through the gateway's private network.
    </p>,

    <Table
      key="5"
      headers={["Feature", "The Internal Logic", "Why it Matters"]}
      rows={[
        [
          "Rate Limiting",
          "Uses Redis-backed Token Buckets to track requests per API Key.",
          "Protects fragile downstream microservices from being accidentally DDOSed by one buggy client."
        ],
        [
          "Protocol Translation",
          "Converts external REST/JSON calls into internal gRPC/Protobuf streams.",
          "Allows high-performance internal communication while maintaining easy-to-use external APIs."
        ],
        [
          "Global Error Handling",
          "If a microservice returns a 500, the Gateway returns a branded 'Friendly Error' JSON.",
          "Prevents leaking internal stack traces or database names to the public internet."
        ],
        [
          "Request/Response Transformation",
          "Strips sensitive headers, renames fields, or injects correlation IDs for tracing.",
          "Centralizes data sanitization instead of relying on each team to remember."
        ]
      ]}
    />,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Real-World Gateway Tools
    </h3>,
    <Table
      key="7"
      headers={["Tool", "Type", "Key Strength"]}
      rows={[
        ["Kong", "Open-source / Enterprise", "Plugin ecosystem for auth, rate-limiting, logging. Runs on Nginx/OpenResty."],
        ["AWS API Gateway", "Managed Cloud", "Tight integration with Lambda, Cognito, and CloudWatch. Pay-per-request pricing."],
        ["Envoy (Istio)", "Service Mesh Sidecar", "L7 proxy with advanced traffic splitting, circuit breaking, and mTLS built in."],
        ["NGINX Plus", "Commercial", "Battle-tested reverse proxy with advanced load balancing and health checks."],
        ["Traefik", "Cloud-native", "Auto-discovers services via Docker/K8s labels. Zero-config dynamic routing."]
      ]}
    />,

    <Callout key="8" type="danger" title="The Single Point of Failure">
      Because literally 100% of your company's API traffic funnels through the Gateway, it is the most critical piece of infrastructure you own. It must be brutally load-balanced in an <strong>Active-Active cluster</strong>. If the Gateway drops, your company flatlines immediately.
    </Callout>,

    <Callout key="9" type="info" title="API Gateway vs. Service Mesh">
      An API Gateway handles <strong>North-South traffic</strong> (external clients → your services). A <strong>Service Mesh</strong> (Istio/Linkerd) handles <strong>East-West traffic</strong> (service → service inside your cluster). They solve different problems and often coexist in production architectures.
    </Callout>,
  ],
};
