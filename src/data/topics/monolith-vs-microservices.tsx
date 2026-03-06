import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const monolithVsMicroservicesTopic: Topic = {
  id: "monolith-vs-microservices",
  title: "Monolith vs Microservices: The Debate",
  description:
    "The eternal architecture war: Amazon proves microservices scale, but Prime Video migrated back to a monolith. Who's right?",
  tags: ["architecture", "debate", "system-design", "interview"],
  icon: "Blocks",
  content: [
    <p key="1">
      In 2023, <strong>Amazon Prime Video</strong> reduced costs by{" "}
      <strong>90%</strong> migrating a microservices architecture <em>back</em>{" "}
      to a monolith. The truth? <strong>Both are valid</strong> — the decision
      depends on team size, domain complexity, and deployment needs.
    </p>,
    <Table
      key="2"
      headers={["Dimension", "Monolith", "Microservices"]}
      rows={[
        ["Deployment", "Single atomic deploy", "Independent per-service"],
        [
          "Data Consistency",
          "ACID transactions",
          "Eventual consistency (Saga)",
        ],
        ["Debugging", "Single stack trace", "Distributed tracing required"],
        ["Latency", "In-process calls (~ns)", "Network calls (~ms)"],
        [
          "Team Scaling",
          "Hard beyond ~15 devs",
          "Teams own services independently",
        ],
        ["Operational Cost", "One pipeline", "N pipelines, K8s, service mesh"],
        ["Failure Blast Radius", "Entire app down", "Single service isolated"],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Modular Monolith: Third Way">
        <p className="text-sm">
          Structure code into <strong>well-defined modules</strong> with strict
          boundaries — but deploy as one unit. Shopify runs this at massive
          scale. Extract modules to services only when needed.
        </p>
      </Card>
      <Card title="The Senior Interview Answer">
        <p className="text-sm">
          "Start monolith, extract microservices when you hit a specific scaling
          wall." Never advocate microservices without a{" "}
          <strong>concrete business requirement</strong> justifying the
          distributed overhead.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="Conway's Law">
      Your system architecture will mirror your organization's communication
      structure. A 5-person team using microservices creates unnecessary
      overhead. A 500-person org using a monolith creates deployment
      bottlenecks. <strong>Match architecture to team structure.</strong>
    </Callout>,
  ],
};
