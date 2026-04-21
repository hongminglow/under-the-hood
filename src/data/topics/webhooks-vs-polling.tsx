import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const webhooksVsPollingTopic: Topic = {
  id: "webhooks-vs-polling",
  title: "Webhooks vs Polling",
  description:
    "How to handle long-running, asynchronous tasks effectively without constantly burdening your backend API.",
  tags: ["backend", "system-design", "api-design"],
  icon: "RadioReceiver",
  content: [
    <p key="1">
      In asynchronous system design, "don't call me, I'll call you" is the mantra of efficiency. Choosing between <strong>Polling</strong> and <strong>Webhooks</strong> determines how much CPU, bandwidth, and battery life your application will consume while waiting for a task to finish.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Communication Patterns Compared
    </h3>,
    <Table
      key="3"
      headers={["Method", "Logic", "Overhead", "Use Case"]}
      rows={[
        ["Short Polling", "Client asks 'Is it done?' at fixed intervals (e.g., 5s).", "Very High. Millions of empty requests.", "Simple, non-critical status updates."],
        ["Long Polling", "Server holds the request open until data is ready or timeout.", "Moderate. Efficient but holds server threads.", "Basic chat apps without WebSockets."],
        ["Webhooks", "Server pushes data to a Client URL via HTTP POST.", "Zero. Passive wait, active push.", "Payments (Stripe), CI/CD (GitHub), SMS (Twilio)."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The "Are we there yet?" (Polling)
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Long Polling: The Middle Ground">
        <p className="text-sm text-slate-400 mb-2">
          Between polling and WebSockets lies <strong>Long Polling</strong>.
        </p>
        <p className="text-xs italic text-slate-400">
          The client sends a request. The server <strong>suspends</strong> it. If data arrives within 30s, it responds immediately. If not, it returns a 204 No Content, and the client loops back. It's the "stateless" way to fake real-time.
        </p>
      </Card>
      <Card title="The Polling CPU Trap">
        <p className="text-sm text-slate-400 mb-2">
          Short polling is <strong>Resource Exhaustion</strong> by design.
        </p>
        <p className="text-xs italic text-slate-400">
          Even if no data changes for 24 hours, your database will be queried 17,280 times (at 5s intervals). This creates "Thundering Herd" problems at scale.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The "Reverse API" (Webhooks)
    </h3>,
    <p key="7" className="mb-4">
      Webhooks are the holy grail of efficiency, but they introduce <strong>Security</strong> and <strong>Reliability</strong> challenges:
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>HMAC Signatures:</strong> Since your webhook endpoint is public, anyone can send fake data. Stripe/GitHub send an <code>X-Hub-Signature</code> header. Your code <em>must</em> hash the payload with a secret to verify the sender.</li>
      <li><strong>Idempotency:</strong> Webhooks travel over the internet. You might receive the "Payment Success" POST twice. Your handler must check your DB to ensure you don't ship the item twice!</li>
      <li><strong>Retries & DLQs:</strong> If your server is down when the webhook fires, the data is gone. Use a <strong>Dead Letter Queue (DLQ)</strong> or a system like SQS to store and retry failed deliveries.</li>
    </ul>,
    <Callout key="9" type="tip" title="Webhooks for Local Dev">
      Use <strong>Ngrok</strong> or <strong>Cloudflare Tunnel</strong>. They expose your <code>localhost:3000</code> to a public URL so external services can "reach" your local machine during development.
    </Callout>,
  ],
};
