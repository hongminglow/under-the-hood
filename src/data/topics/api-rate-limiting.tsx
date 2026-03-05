import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const apiRateLimitingTopic: Topic = {
  id: "api-rate-limiting",
  title: "API Rate Limiting & Throttling",
  description:
    "Protecting backend services from abuse by intelligently restricting request volume per consumer.",
  tags: ["api", "security", "scaling"],
  icon: "Gauge",
  content: [
    <p key="1">
      Without rate limiting, a single malicious actor (or a buggy client loop)
      can overwhelm your servers with millions of requests, causing a
      Denial-of-Service (DoS). Rate limiting enforces fair usage by capping the
      number of requests a client can make within a time window.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Common Algorithms
    </h4>,
    <Step key="3" index={1}>
      <strong>Fixed Window Counter:</strong> Count requests in fixed time
      windows (e.g., 100 requests per minute). Simple to implement but
      susceptible to burst at window boundaries — a client can send 100 requests
      at 11:59:59 and 100 more at 12:00:00.
    </Step>,
    <Step key="4" index={2}>
      <strong>Sliding Window Log:</strong> Tracks the timestamp of every
      request. On each new request, count how many fall within the sliding
      window. Precise but memory-intensive.
    </Step>,
    <Step key="5" index={3}>
      <strong>Token Bucket:</strong> A bucket holds up to N tokens. Each request
      consumes one token. Tokens are refilled at a steady rate. Allows small
      bursts while enforcing an average rate. This is the most popular algorithm
      (used by AWS, Stripe, GitHub).
    </Step>,
    <Step key="6" index={4}>
      <strong>Leaky Bucket:</strong> Requests enter a FIFO queue drained at a
      constant rate. If the queue overflows, new requests are rejected. Shapes
      traffic into a perfectly smooth output stream.
    </Step>,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      HTTP Response Headers
    </h4>,
    <Grid key="8" cols={3} gap={4} className="mb-8">
      <Card title="X-RateLimit-Limit">
        Total allowed requests in the current window.
      </Card>
      <Card title="X-RateLimit-Remaining">
        How many requests the client can still make.
      </Card>
      <Card title="Retry-After">
        Seconds until the rate limit resets (sent with a 429 status code).
      </Card>
    </Grid>,
    <Callout key="9" type="warning" title="Distributed Rate Limiting">
      If you have 10 API servers behind a load balancer, each server's local
      counter only sees 1/10th of the traffic. You need a centralized store
      (Redis with INCR + EXPIRE) to maintain a global, atomic request count
      across all instances.
    </Callout>,
  ],
};
