import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const webhooksTopic: Topic = {
  id: "webhooks-vs-polling",
  title: "Webhooks vs Polling",
  description:
    "How systems notify each other of events: the stark difference between constantly asking and being told.",
  tags: ["networking", "api", "architecture"],
  icon: "RadioReceiver",
  content: [
    <p key="1">
      When two independent systems need to sync data (e.g., Stripe processing a
      payment and telling your backend to unlock a user's account), they must
      communicate. The two primary paradigms are <strong>Polling</strong> and{" "}
      <strong>Webhooks</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title='API Polling (The "Are we there yet?" approach)'>
        <p className="text-sm mb-3">
          Your server repeatedly makes HTTP requests to the third-party API on
          an interval (e.g., every 5 seconds) to check if a status has changed.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ Extremely simple to implement.</li>
          <li>✅ You control the rate of ingestion.</li>
          <li>
            ❌ 99% of requests return "No changes", wasting CPU and bandwidth.
          </li>
          <li>❌ High latency (up to the interval duration).</li>
        </ul>
      </Card>
      <Card title="Webhooks (The &quot;Don't call us, we'll call you&quot; approach)">
        <p className="text-sm mb-3">
          You provide the third-party API a URL (e.g.,{" "}
          <code>https://yourapi.com/webhook</code>). When the event happens,
          they send an HTTP POST request to your URL containing the payload.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ Asynchronous and instantly real-time.</li>
          <li>✅ Zero wasted requests or overhead on idle.</li>
          <li>❌ Harder to debug locally (requires tunneling like Ngrok).</li>
          <li>❌ You must handle bursts of traffic securely.</li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Webhook Security and Reliability
    </h4>,
    <p key="4">
      Because your webhook Endpoint must be publicly accessible on the internet,
      anyone can send a POST request to it pretending to be Stripe. To prevent
      this, webhooks are <strong>cryptographically signed</strong>.
    </p>,
    <CodeBlock
      key="5"
      language="javascript"
      title="Verifying a Webhook Signature"
      code={`const crypto = require('crypto');

function verifyWebhook(payload, signatureHeader, secret) {
  // Hash the raw body using your shared secret
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Ensure the computed hash matches the header signature
  return hash === signatureHeader;
}`}
    />,
    <Callout key="6" type="warning" title="Idempotency is Required">
      Webhooks typically operate on a <strong>At-Least-Once</strong> delivery
      guarantee. If a network blip occurs, the provider might send the exact
      same event twice. Your webhook handler must be <em>idempotent</em> (safely
      ignoring duplicates using an event ID table).
    </Callout>,
  ],
};
