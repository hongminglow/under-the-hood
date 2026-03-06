import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const observabilityTopic: Topic = {
  id: "observability-monitoring",
  title: "Observability: Logs, Metrics & Traces",
  description:
    "The three pillars of observability that keep production systems alive — and why 'just add logging' is never enough.",
  tags: ["devops", "monitoring", "system-design", "production"],
  icon: "Activity",
  content: [
    <p key="1">
      <strong>Monitoring</strong> tells you <em>when</em> something is broken.{" "}
      <strong>Observability</strong> tells you <em>why</em>. In distributed
      systems with 50+ microservices, you can't SSH into every server to read
      logs. You need the <strong>three pillars of observability</strong> working
      together.
    </p>,
    <Grid key="2" cols={3} gap={6} className="my-8">
      <Card title="📝 Logs">
        <p className="text-sm">
          Discrete timestamped events:{" "}
          <code>[ERROR] Payment failed for user_42</code>. Provides rich context
          but <strong>high volume</strong>. Tools: ELK Stack (Elasticsearch,
          Logstash, Kibana), Loki, Datadog.
        </p>
      </Card>
      <Card title="📊 Metrics">
        <p className="text-sm">
          Numeric measurements over time: CPU usage, request latency (p99),
          error rate. <strong>Aggregated and cheap</strong> to store. Enables
          dashboards and alerts. Tools: Prometheus, Grafana, CloudWatch.
        </p>
      </Card>
      <Card title="🔗 Traces">
        <p className="text-sm">
          Follow a single request across <strong>multiple services</strong>. A
          trace shows: API Gateway → Auth Service (12ms) → Order Service (45ms)
          → Database (200ms). Find the bottleneck. Tools: Jaeger, Zipkin,
          OpenTelemetry.
        </p>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Pillar", "Answers", "Weakness"]}
      rows={[
        [
          "Logs",
          "What exactly happened?",
          "Too verbose at scale, hard to correlate",
        ],
        [
          "Metrics",
          "Is the system healthy? How fast?",
          "No context on individual failures",
        ],
        [
          "Traces",
          "Where did this request slow down?",
          "Expensive to capture for every request",
        ],
      ]}
    />,
    <Callout key="4" type="tip" title="The Golden Signals (Google SRE)">
      Google's SRE book defines <strong>4 golden signals</strong> to monitor:{" "}
      <strong>Latency</strong> (how fast), <strong>Traffic</strong> (how much),{" "}
      <strong>Errors</strong> (how often things fail),{" "}
      <strong>Saturation</strong> (how full). If your dashboard covers these 4
      metrics for every service, you have production-grade monitoring.
    </Callout>,
    <Callout key="5" type="info" title="OpenTelemetry: The Unified Standard">
      <strong>OpenTelemetry</strong> (OTel) is the industry-standard
      vendor-neutral framework that unifies logs, metrics, and traces into one
      SDK. Instrument once, export to any backend (Datadog, Grafana, Jaeger).
      Every major cloud provider supports it.
    </Callout>,
  ],
};
