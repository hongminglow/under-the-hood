import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const twelveFacorAppTopic: Topic = {
  id: "twelve-factor-app",
  title: "The Twelve-Factor App",
  description:
    "The 12 commandments of cloud-native application development — the methodology behind every modern SaaS deployment.",
  tags: ["devops", "cloud", "architecture", "best-practices"],
  icon: "ListChecks",
  content: [
    <p key="1">
      Written by the founders of Heroku in 2011, the{" "}
      <strong>Twelve-Factor App</strong> methodology defines 12 principles for
      building <strong>scalable, portable, cloud-native</strong> applications.
      Every modern deployment practice (Docker, Kubernetes, serverless) is
      fundamentally shaped by these factors.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="I. Codebase">
        <p className="text-sm">
          One codebase tracked in Git, many deploys (staging, production). Never
          multiple apps sharing one repo with different deploy paths.
        </p>
      </Card>
      <Card title="II. Dependencies">
        <p className="text-sm">
          Explicitly declare <strong>all</strong> dependencies via{" "}
          <code>package.json</code>, <code>requirements.txt</code>, etc. Never
          assume system-level packages exist.
        </p>
      </Card>
      <Card title="III. Config">
        <p className="text-sm">
          Store config (DB URLs, API keys) in{" "}
          <strong>environment variables</strong> — never in code. Same binary
          runs in dev, staging, and production with different env vars.
        </p>
      </Card>
      <Card title="IV. Backing Services">
        <p className="text-sm">
          Treat databases, caches, and queues as{" "}
          <strong>attached resources</strong> accessible via URL. Swap a local
          PostgreSQL for Amazon RDS by changing a config var.
        </p>
      </Card>
      <Card title="V. Build, Release, Run">
        <p className="text-sm">
          Strictly separate: <strong>Build</strong> (compile + bundle),{" "}
          <strong>Release</strong> (build + config = immutable artifact),{" "}
          <strong>Run</strong> (execute the release). Every release gets a
          unique version ID.
        </p>
      </Card>
      <Card title="VI. Processes">
        <p className="text-sm">
          The app runs as <strong>stateless processes</strong>. Any persistent
          data lives in backing services (DB, S3), never in process memory or
          local filesystem.
        </p>
      </Card>
      <Card title="VII. Port Binding">
        <p className="text-sm">
          The app is <strong>self-contained</strong> and exports HTTP by binding
          to a port. No external web server (Apache) required. Express, NestJS,
          and Flask all do this natively.
        </p>
      </Card>
      <Card title="VIII. Concurrency">
        <p className="text-sm">
          Scale out via <strong>multiple processes</strong>, not bigger
          machines. Run 10 instances of your API behind a load balancer instead
          of one massive server.
        </p>
      </Card>
      <Card title="IX. Disposability">
        <p className="text-sm">
          Processes should start <strong>fast</strong> and shut down{" "}
          <strong>gracefully</strong>. Handle SIGTERM, finish in-flight
          requests, then exit. Enables rapid deploys and autoscaling.
        </p>
      </Card>
      <Card title="X. Dev/Prod Parity">
        <p className="text-sm">
          Keep dev, staging, and production as{" "}
          <strong>similar as possible</strong>. Use the same database engine,
          same OS, same runtime. Docker containers solve this perfectly.
        </p>
      </Card>
      <Card title="XI. Logs">
        <p className="text-sm">
          Treat logs as <strong>event streams</strong> written to stdout. Never
          manage log files — let the platform (Docker, K8s) collect and route
          them to ELK, Datadog, or CloudWatch.
        </p>
      </Card>
      <Card title="XII. Admin Processes">
        <p className="text-sm">
          Run one-off tasks (migrations, data fixes) as{" "}
          <strong>isolated processes</strong> using the same codebase and
          config. Ship them alongside the app, not as separate scripts.
        </p>
      </Card>
    </Grid>,
    <Callout key="3" type="info" title="Why It Still Matters in 2025">
      Docker, Kubernetes, and serverless platforms{" "}
      <strong>enforce 12-Factor by design</strong>. If your app violates these
      principles (e.g., storing state in process memory, hardcoding config), it
      will fail in containerized environments.
    </Callout>,
  ],
};
