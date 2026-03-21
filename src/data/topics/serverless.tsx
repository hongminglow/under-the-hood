import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const serverlessTopic: Topic = {
  id: "serverless",
  title: "Serverless (AWS Lambda)",
  description:
    "How developers stopped paying for idle servers and started running raw Javascript functions on demand.",
  tags: ["backend", "cloud", "architecture"],
  icon: "Cloud",
  content: [
    <p key="1">
      Historically, if you built a Python API, you rented a Linux server from AWS for $20 a month. It stayed turned on 24/7. Even if absolutely nobody visited your website at 3 AM, you were paying AWS for 100% of that idle electricity and CPU.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The "Function as a Service" Shift
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Promise" description="Pay per Millisecond">
        <p className="text-sm text-muted-foreground">
          You don't configure an Express server. You simply write one isolated Javascript function (<code>{"export const sendEmail = () => {...}"}</code>). AWS mathematically freezes your code.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          When an HTTP request arrives, AWS instantly boots up a micro-server, executes your 50ms script, and destroys the server immediately. You are billed exactly $0.000001 only for those 50ms of compute. <strong>At 3 AM, your bill is $0.00.</strong>
        </p>
      </Card>
      <Card title="The Nightmare" description="Cold Starts">
        <p className="text-sm text-muted-foreground">
          Serverless is not magic; AWS actually has to boot up a tiny Linux container from scratch to run your script. If your function hasn't been called in an hour, the first unlucky user suffers a <strong>Cold Start</strong>—waiting 2 whole seconds for AWS to download and boot your 50MB Node.js runtime before execution even begins.
        </p>
      </Card>
    </Grid>,
    <p key="4" className="mb-4">
      To fix cold starts, the industry is fiercely migrating away from heavy AWS Lambdas towards <strong>Edge Functions</strong> (like Cloudflare Workers or Vercel Edge). These run your code inside highly optimized V8 JavaScript engine isolates that boot in less than 5 milliseconds physically closer to the user.
    </p>,
    <Callout key="5" type="tip" title="Database Connection Pool Explosions">
      Traditional SQL databases only allow ~100 concurrent TCP connections. If 5,000 users hit your Serverless API instantly, AWS spins up 5,000 independent Lambda functions. Every single one opens a new Postgres connection, violently crashing your database. You MUST put a connection pool proxy (like standard Prisma or PgBouncer) in between!
    </Callout>,
  ],
};
