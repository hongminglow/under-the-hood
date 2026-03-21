import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const redisInMemoryTopic: Topic = {
  id: "redis-in-memory",
  title: "Redis & In-Memory Architectures",
  description:
    "Why you absolutely must slot a massive RAM cache violently between your API and your SQL database.",
  tags: ["backend", "redis", "caching", "database"],
  icon: "DatabaseZapper",
  content: [
    <p key="1">
      A heavy Postgres database takes approximately 2 to 10 milliseconds to physically spin a hard drive disk or hit an SSD to return your user's shopping cart. While 10ms sounds fast, if you have 500,000 simultaneous Black Friday shoppers organically hammering your poor machine, the SSD crashes instantly.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Redis: Single-Threaded Rocket Fuel
    </h3>,
    <p key="3" className="mb-4">
      Redis famously completely skips touching persistent hard drives entirely. It exclusively locks a tiny, highly-structured `Key-Value` grid physically into the machine's RAM memory sticks, retrieving JSON blobs in literally 0.05 milliseconds.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Insane Read Consistency" description="Single Threading">
        <p className="text-sm text-muted-foreground">
          Redis runs perfectly on just ONE single core thread in an era where Node servers run 16 threads. Why? Because managing mathematical \"Race Conditions\" (who updates the shopping cart first?) across 16 threads is painfully slow. By forcing absolutely everything through 1 tiny lightning-fast thread sequentially, it scales instantly past 100,000 Ops/Second safely.
        </p>
      </Card>
      <Card title="Not Just Text Strings" description="Complex Data">
        <p className="text-sm text-muted-foreground">
          Beginners only use <code>{"SET user_5 '{data}'"}</code>. But Redis securely natively runs complex internal modules like <code>Sorted Sets</code> (For global gaming Leaderboards without <code>ORDER BY</code> SQL scans) and <code>PubSub</code> (For organically powering your entire WebSocket chat backend network instantly).
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="Use Redis for Temporary Auth Tokens (Sessions)">
      Because Redis organically supports a `TTL (Time-To-Live)`, developers exclusively use it to perfectly securely store JSON Session Tokens. \"Set this exact user_id payload to disappear completely organically from RAM in exactly 15 minutes.\" Zero garbage collection queries required!
    </Callout>,
  ],
};
