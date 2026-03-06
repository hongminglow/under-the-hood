import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const apiGatewayTopic: Topic = {
  id: "api-gateway-pattern",
  title: "API Gateway Pattern",
  description:
    "The single entry point that sits in front of all your microservices — routing, auth, rate limiting, and response aggregation in one place.",
  tags: ["architecture", "microservices", "system-design", "api"],
  icon: "DoorOpen",
  content: [
    <p key="1">
      Without an API Gateway, every client (web, mobile, IoT) must know the
      address of every single microservice. A mobile app calling 10 services
      makes 10 separate network requests over a slow cellular connection. The{" "}
      <strong>API Gateway</strong> consolidates all of this behind a{" "}
      <strong>single URL</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      What It Does
    </h4>,
    <Step key="3" index={1}>
      <strong>Request Routing:</strong> Maps <code>/api/users</code> → User
      Service, <code>/api/orders</code> → Order Service.
    </Step>,
    <Step key="4" index={2}>
      <strong>Authentication:</strong> Validates JWT/API keys <em>once</em> at
      the gateway — individual services don't need to.
    </Step>,
    <Step key="5" index={3}>
      <strong>Rate Limiting:</strong> Enforces quotas per client before requests
      hit your backend services.
    </Step>,
    <Step key="6" index={4}>
      <strong>Response Aggregation:</strong> Combines data from multiple
      services into a single response (BFF — Backend For Frontend pattern).
    </Step>,
    <Table
      key="7"
      headers={["Gateway", "Type", "Strengths"]}
      rows={[
        [
          "Kong",
          "Open-source / Enterprise",
          "Plugin ecosystem, Lua extensibility, Postgres-backed",
        ],
        [
          "AWS API Gateway",
          "Managed Cloud",
          "Lambda integration, auto-scaling, zero infra management",
        ],
        [
          "Nginx",
          "Reverse Proxy + Gateway",
          "Raw performance, config-driven, SSL termination",
        ],
        [
          "Express Gateway",
          "Node.js-native",
          "JavaScript config, middleware pipeline, easy for Node teams",
        ],
        [
          "Envoy / Istio",
          "Service Mesh",
          "L7 routing, mTLS, observability built-in",
        ],
      ]}
    />,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="✅ Benefits">
        <p className="text-sm">
          Single entry point. Cross-cutting concerns (auth, logging, rate
          limiting) handled once. Clients simplified. Protocol translation
          (HTTP↔gRPC). Response caching at the edge.
        </p>
      </Card>
      <Card title="⚠️ Risks">
        <p className="text-sm">
          <strong>Single point of failure</strong> — must be highly available.
          Added latency (extra network hop). Can become a bottleneck if
          over-loaded with business logic. Configuration complexity at scale.
        </p>
      </Card>
    </Grid>,
    <Callout key="9" type="tip" title="BFF Pattern (Backend For Frontend)">
      Instead of one generic gateway, create a{" "}
      <strong>dedicated gateway per client type</strong>: one for web (rich
      responses), one for mobile (minimal payloads), one for IoT (binary). Each
      BFF aggregates and transforms data specifically for its client's needs.
    </Callout>,
  ],
};
