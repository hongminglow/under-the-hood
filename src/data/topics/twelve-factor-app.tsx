import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
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
      The <strong>Twelve-Factor App</strong> methodology is a set of best practices for building <strong>Software-as-a-Service (SaaS)</strong> applications. Created by the engineers at Heroku, these principles ensure that apps are scalable, portable across cloud providers, and easy to automate with CI/CD.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Tenets of Scalability
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="III. Config (Environment Vars)">
        <p className="text-sm text-muted-foreground mb-2">
          Store configuration in <strong>Environment Variables</strong>, not code. The same build artifact should run in Dev, Staging, and Prod without recompilation.
        </p>
      </Card>
      <Card title="VI. Processes (Statelessness)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>The Most Critical Factor:</strong> Processes must be stateless. Any data that needs to persist must be stored in a <strong>Backing Service</strong> (DB, Redis, S3).
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Factor", "Brief Description", "Technical Benefit"]}
      rows={[
        ["I. Codebase", "One repo, many deploys.", "Prevents 'diverged code' bugs across environments."],
        ["II. Dependencies", "Explicitly declare (npm/pip).", "Isolation; no 'works on my machine' errors."],
        ["V. Build, Release, Run", "Strict isolation of stages.", "Enables rollbacks to known-good releases."],
        ["VIII. Concurrency", "Scale out via process model.", "Horizontal scaling (adding more nodes) is trivial."],
        ["IX. Disposability", "Fast startup & graceful shutdown.", "Enables Blue/Green deploys and Autoscaling."],
        ["XI. Logs", "Treat logs as event streams.", "Centralized logging without managing .log files."]
      ]}
    />,
    <Callout key="5" type="tip" title="The Statelessness Rule">
      If your process stores a user's session in memory (e.g., a local variable), that user will be logged out if a Load Balancer directs them to a different server. By using <strong>Stateless Processes</strong>, you can kill and restart servers at will without affecting the user experience.
    </Callout>,
    <p key="6" className="mt-8 text-muted-foreground italic">
      Modern platforms like <strong>Kubernetes</strong> and <strong>Docker</strong> are essentially engines built to enforce the 12-Factor methodology at the infrastructure level.
    </p>,
  ],
};
