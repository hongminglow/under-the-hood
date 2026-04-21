import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const serverlessTopic: Topic = {
  id: "serverless-computing",
  title: "Serverless Computing",
  description:
    "The ultimate abstraction of infrastructure: paying exclusively for exact ms of execution time per request.",
  tags: ["cloud", "architecture", "devops", "aws"],
  icon: "CloudLightning",
  content: [
    <p key="1">
      First came physical servers. Then came Virtual Machines (EC2). Then came
      Containers (Docker). The final evolution is <strong>Serverless</strong>{" "}
      (AWS Lambda, Cloudflare Workers). You write a pure function, upload it to
      the cloud provider, and they handle everything else.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Execution Model
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Traditional Servers">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2 text-emerald-300">
          <li>
            <strong>Always on:</strong> The server process is running 24/7.
          </li>
          <li>
            <strong>Billing:</strong> You pay by the hour, even if nobody visits
            your site at 3 AM.
          </li>
          <li>
            <strong>Scaling:</strong> Takes minutes to boot a new VM or
            container when traffic spikes.
          </li>
          <li>
            <strong>Overhead:</strong> OS updates, security patching,
            Dockerfiles.
          </li>
        </ul>
      </Card>
      <Card title="Serverless Functions">
        <ul className="text-sm space-y-2 list-disc pl-4 mt-2 text-emerald-300">
          <li>
            <strong>Ephemeral:</strong> The function spins up instantly on a
            request, returns a response, and dies.
          </li>
          <li>
            <strong>Billing:</strong> You pay purely by the millisecond of
            execution time. (0 traffic = $0 bill).
          </li>
          <li>
            <strong>Scaling:</strong> Can handle 0 to 10,000 requests per second
            instantaneously.
          </li>
          <li>
            <strong>Overhead:</strong> Zero. Just code.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      The Cold Start Problem
    </h4>,
    <p key="5">
      Because serverless functions don't run 24/7, when a request hits an{" "}
      <em>idle</em>
      function, the cloud provider must allocate hardware, copy your code, boot
      a micro-VM (like Firecracker), and load the runtime (Node.js/Python). This
      initial spin-up can take anywhere from 100ms to 2 seconds — a severe
      latency penalty known as a <strong>Cold Start</strong>. After the first
      request, the function stays "warm" in memory for a short period (~15 mins)
      to instantly process subsequent requests.
    </p>,
    <Callout key="6" type="tip" title="Edge Computing">
      V8 Isolates (used by Cloudflare Workers and Vercel Edge) solve cold starts
      by instantly loading pure JS functions without booting a full Node.js or
      OS environment. They run at the network edge, incredibly close to the
      user, with 0ms cold starts.
    </Callout>,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      Serverless Limitations
    </h4>,
    <Grid key="8" cols={2} gap={6} className="mb-8">
      <Card title="Execution Time Limits">
        <p className="text-sm text-muted-foreground">
          AWS Lambda has a 15-minute maximum execution time. Long-running tasks (video encoding, ML training) must use traditional servers or Step Functions to orchestrate multiple Lambda invocations.
        </p>
      </Card>
      <Card title="Statelessness">
        <p className="text-sm text-muted-foreground">
          Functions are ephemeral. You cannot store data in memory between invocations. Use external storage (S3, DynamoDB, Redis) for state. WebSocket connections require special handling (API Gateway WebSocket APIs).
        </p>
      </Card>
    </Grid>,
    <h4 key="9" className="text-xl font-bold mt-8 mb-4">
      Cost Comparison
    </h4>,
    <Table
      key="10"
      headers={["Scenario", "Traditional Server (EC2)", "Serverless (Lambda)"]}
      rows={[
        ["Low Traffic (100 req/day)", "$10/month (t3.micro always on)", "$0.20/month (pay per request)"],
        ["High Traffic (1M req/day)", "$50/month (larger instance)", "$200/month (but auto-scales)"],
        ["Spiky Traffic", "Must overprovision for peaks", "Scales instantly, pay only for actual usage"]
      ]}
    />,
    <Callout key="11" type="info" title="When to Use Serverless">
      Perfect for: Event-driven workloads (image processing on S3 upload), APIs with unpredictable traffic, scheduled tasks (cron jobs).<br/><br/>
      Avoid for: Long-running processes, high-throughput sustained workloads (cheaper to run a dedicated server), applications requiring persistent connections.
    </Callout>,
  ],
};
