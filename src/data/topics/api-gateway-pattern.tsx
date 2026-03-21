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
        <p className="text-sm text-muted-foreground mb-2">
          The Gateway maps external URLs (<code>/orders</code>) to internal private IPs (<code>10.0.1.4</code>). It supports <strong>Canary Releases</strong> by routing 5% of traffic to a new version.
        </p>
      </Card>
      <Card title="BFF (Backend for Frontend)">
        <p className="text-sm text-muted-foreground mb-2">
          A mobile app needs a different JSON structure than a desktop app. The Gateway can <strong>Transform payloads</strong> on the fly, tailoring the response to the specific device.
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Feature", "The Internal Logic", "Why it Matters"]}
      rows={[
        [
          "Rate Limiting",
          "Uses Redis-backed <strong>Token Buckets</strong> to track requests per API Key.",
          "Protects fragile downstream microservices from being accidentally DDOSed by one buggy client."
        ],
        [
          "Protocol Translation",
          "Converts external <code>REST/JSON</code> calls into internal <code>gRPC/Protobuf</code> streams.",
          "Allows high-performance internal communication while maintaining easy-to-use external APIs."
        ],
        [
          "Global Error Handling",
          "If a microservice returns a 500, the Gateway returns a branded 'Friendly Error' JSON.",
          "Prevents leaking internal stack traces or database names to the public internet."
        ]
      ]}
    />,
    <Callout key="5" type="danger" title="The Single Point of Failure">
      Because literally 100% of your company's API traffic funnels through the Gateway, it is the most critical piece of infrastructure you own. It must be brutally load-balanced in an <strong>Active-Active cluster</strong>. If the Gateway drops, your company flatlines immediately.
    </Callout>,
  ],
};
