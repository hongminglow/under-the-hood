import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const redisTopic: Topic = {
  id: "redis-in-memory",
  title: "Redis & In-Memory Stores",
  description:
    "How sacrificing hard drive durability for raw RAM access unlocks absurdly fast real-time scaling.",
  tags: ["databases", "caching", "architecture", "c++"],
  icon: "Zap",
  content: [
    <p key="1">
      Relational databases like Postgres are incredibly safe, permanently
      writing data to a solid-state drive (SSD). However, reading or writing to
      a disk is severely slower than keeping data entirely in the CPU's direct
      Line-of-Sight: the <strong>Random Access Memory (RAM)</strong>.
    </p>,
    <p key="2" className="mt-4 mb-8">
      <strong>Redis</strong> is the most famous In-Memory Key-Value store. Let's
      look at its fundamental trade-offs.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Key Features
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="Astounding Speed">
        Because Redis lives in RAM, latency is vastly sub-millisecond. A single
        Redis instance can handle roughly 100,000+ operations per second
        sequentially.
      </Card>
      <Card title="Data Structures">
        Unlike Memcached (which only handles basic strings), Redis natively
        stores complex variables like <strong>Sets, Hashes, Lists,</strong> and{" "}
        <strong>Sorted Sets</strong> for blazing fast internal computation like
        leaderboard rankings.
      </Card>
      <Card title="Single-Threaded">
        Redis completely avoids race conditions and CPU context-switching
        overhead by strictly processing every command one-at-a-time on a single
        thread.
      </Card>
      <Card title="Eventual Durability">
        If RAM loses power, all data vanishes. Redis counters this by
        periodically snapshotting to disk (RDB) or appending an Append-Only File
        (AOF) in the background.
      </Card>
    </Grid>,
    <CodeBlock
      key="5"
      language="bash"
      title="Common Redis Operations"
      code={`> SET session:123 "eyJhbG..Token..9" EX 3600    # SET Token, EXpiring in 1 hour
> INCR page_views:home                         # Atomic increment, perfect for rate limits
> ZADD global_leaderboard 5000 "player_1"      # Adds perfectly sorted rank in O(log(N))`}
    />,
    <Callout key="6" type="info" title="Common Use Cases">
      Redis is globally used for: <strong>Session Store Management</strong>{" "}
      (saving session IDs), <strong>Caching</strong> (storing heavy SQL query
      results),
      <strong>Message Brokering</strong> (Pub/Sub for WebSockets), and{" "}
      <strong>API Rate Limiting</strong> (using atomic token buckets).
    </Callout>,
  ],
};
