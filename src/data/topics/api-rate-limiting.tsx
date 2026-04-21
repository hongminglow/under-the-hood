import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const apiRateLimitingTopic: Topic = {
  id: "api-rate-limiting",
  title: "API Rate Limiting",
  description:
    "How to defend your backend servers from scrapers, angry users, and accidental infinite loops.",
  tags: ["backend", "system-design", "security"],
  icon: "DatabaseZapper",
  content: [
    <p key="1">
      If you open a completely public API endpoint, you are one bad `while(true)` loop away from a client sending 50,000 requests per second to your database and costing you $5,000 in AWS bills. Rate limiting is the absolute mandatory defense system. It forcefully blocks requests by returning <strong>HTTP Status Code 429 (Too Many Requests)</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Core Algorithms Defined in Memcached/Redis
    </h3>,
    <Table
      key="3"
      headers={["Algorithm", "How It Blocks Traffic", "Developer Reality"]}
      rows={[
        [
          "Token Bucket",
          "You have a literal bucket of 10 virtual tokens. Every API call costs 1 token. After 10 calls, you hit 429. The bucket magically refills at a constant trickle of 1 token per second.",
          "The industry standard. Handles heavy sudden bursts beautifully while maintaining an easy-to-understand average pace. (Stripe uses this)."
        ],
        [
          "Leaky Bucket",
          "Requests enter a bucket with a hole in the bottom. No matter how fast they aggressively pour in, the hole only leaks them into your API server at exactly 1 per minute.",
          "Brilliant for aggressively smoothing out traffic spikes to literally guarantee your slow Node server never receives more than 1 per minute."
        ],
        [
          "Fixed Window",
          "Strictly sets a cap for a literal time window. E.g., Max 100 API pulls from 3:00 PM to 4:00 PM.",
          "Terrible flaw: If a hacker sends 100 requests at 3:59 PM and 100 requests at 4:01 PM, they achieved 200 requests within two minutes seamlessly bypassing the 'per hour' intent."
        ],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Architectural Placement">
        <p className="text-sm text-muted-foreground">
          Never write an API Rate Limiter locally in Node.js memory! If you have 5 load-balanced servers, a hacker will just hit all 5 servers independently. Rate limits must be stored rapidly into a centralized lightning-fast cache like <strong>Redis</strong> or pushed up entirely into an API Gateway like AWS API Gateway, keeping the malicious traffic extremely far away from your precious codebase.
        </p>
      </Card>
      <Card title="The Client Headers">
        <p className="text-sm text-muted-foreground">
          Good APIs strictly tell the frontend exactly how many tokens they have left so they do not blindly guess.
        </p>
        <ul className="text-xs mt-2 border-l border-border pl-3 text-muted-foreground/80 font-mono space-y-1">
          <li>X-RateLimit-Limit: 100</li>
          <li>X-RateLimit-Remaining: 32</li>
          <li>X-RateLimit-Reset: 1726058400</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="Limiting IP vs User IDs">
      Rate limiting by IP Address is a bad crutch. A single IP address might represent an entire university campus of 10,000 legitimate students sharing the same NAT IP router! Always strongly verify an authenticated `User-ID` from a JWT to accurately rate limit individuals.
    </Callout>,
  ],
};
