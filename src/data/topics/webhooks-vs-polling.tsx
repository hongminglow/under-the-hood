import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { AlertTriangle, Hourglass } from "lucide-react";

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
        ["<span class='text-amber-300 font-black'>Short Polling</span>", "Client asks 'Is it done?' at fixed intervals (e.g., 5s).", "Very High. Millions of empty requests.", "Simple, non-critical status updates."],
        ["<span class='text-cyan-300 font-black'>Long Polling</span>", "Server holds the request open until data is ready or timeout.", "Moderate. Efficient but holds server threads.", "Basic chat apps without WebSockets."],
        ["<span class='text-emerald-300 font-black'>Webhooks</span>", "Server pushes data to a Client URL via HTTP POST.", "Zero. Passive wait, active push.", "Payments (Stripe), CI/CD (GitHub), SMS (Twilio)."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The "Are we there yet?" (Polling)
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Hourglass} title="Long Polling" subtitle="The middle ground" theme="cyan">
        <p className="mb-3 text-cyan-100/80">
          Between short polling and WebSockets lies <strong className="text-cyan-300">Long Polling</strong>.
        </p>
        <p className="text-cyan-100/70">
          The client sends a request. The server <strong>suspends</strong> it. If data arrives within 30s, it responds immediately. If not, it returns a 204 No Content, and the client loops back. It's the "stateless" way to fake real-time.
        </p>
      </FeatureCard>
      <FeatureCard icon={AlertTriangle} title="The Polling CPU Trap" subtitle="Short polling at scale" theme="amber">
        <p className="mb-3 text-amber-100/80">
          Short polling is <strong className="text-amber-300">resource exhaustion</strong> by design.
        </p>
        <p className="text-amber-100/70">
          Even if no data changes for 24 hours, your database will be queried 17,280 times (at 5s intervals). This creates "Thundering Herd" problems at scale.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The "Reverse API" (Webhooks)
    </h3>,
    <p key="7" className="mb-4">
      Webhooks are the holy grail of efficiency, but they introduce <strong>Security</strong> and <strong>Reliability</strong> challenges:
    </p>,
    <Table
      key="8"
      headers={["Concern", "Why It Happens", "Required Defense"]}
      rows={[
        ["HMAC Signatures", "Webhook endpoints are public URLs, so anyone can attempt to POST fake data.", "Verify provider signatures such as Stripe/GitHub HMAC headers using a shared secret."],
        ["Idempotency", "Internet delivery can retry, duplicate, or arrive out of order.", "Store event IDs and make handlers safe to execute more than once."],
        ["Retries & DLQs", "Your server may be down exactly when the provider sends the event.", "Queue failed deliveries with SQS, a dead-letter queue, or provider replay tooling."],
      ]}
    />,
    <Callout key="9" type="tip" title="Webhooks for Local Dev">
      Use <strong>Ngrok</strong> or <strong>Cloudflare Tunnel</strong>. They expose your <code>localhost:3000</code> to a public URL so external services can "reach" your local machine during development.
    </Callout>,
  ],
};
