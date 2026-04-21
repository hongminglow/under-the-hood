import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";

export const redisInMemoryTopic: Topic = {
  id: "redis-in-memory",
  title: "Redis & In-Memory Architectures",
  description:
    "Why you must slot a RAM cache between your API and SQL database — and how Redis stays blazingly fast on a single thread.",
  tags: ["backend", "redis", "caching", "database"],
  icon: "DatabaseZapper",
  content: [
    <p key="1">
      A Postgres query against a disk-backed table averages <strong>2-10ms</strong>. That sounds fine -- until 500,000 Black Friday shoppers hit the checkout button simultaneously. Your SSD melts. Redis solves this by keeping your hottest data in <strong>RAM</strong>, where reads cost <strong>~0.1ms</strong> -- 100x faster, no disk involved.
    </p>,

    <h3 key="h-why" className="text-xl font-bold mt-8 mb-4">
      The Speed Secret: Why RAM Obliterates Disk
    </h3>,
    <Table
      key="t-speed"
      headers={["Storage Type", "Typical Latency", "Throughput"]}
      highlightedRows={[1]}
      rows={[
        ["SSD (NVMe)", "~0.1 ms", "~500K IOPS"],
        ["RAM (Redis)", "~0.001 ms", "over 1M Ops/sec"],
        ["HDD", "~5–10 ms", "~200 IOPS"],
        ["Network DB call", "~2–10 ms", "Depends on connection pool"],
      ]}
    />,

    <h3 key="h-thread" className="text-xl font-bold mt-8 mb-4">
      The Paradox: Single-Threaded Yet Blazingly Fast
    </h3>,
    <p key="p-thread" className="mb-4">
      Redis intentionally runs its command processing on <strong>a single thread</strong>. This seems counterintuitive — modern servers have 64+ CPU cores. Why not use them all?
    </p>,
    <p key="p-thread2" className="mb-6">
      The answer is the <strong>race condition tax</strong>. In multi-threaded systems, when two threads try to write to the same key simultaneously, you need locks, mutexes, and synchronization. These primitives are expensive. Redis sidesteps the entire problem:
    </p>,
    <div key="steps-thread" className="my-6 pl-2">
      <Step index={1}>
        <strong>Request arrives</strong> — Client sends <code>INCR cart:user:42:total</code> over a TCP socket.
      </Step>
      <Step index={2}>
        <strong>Event loop picks it up</strong> — Redis uses an I/O multiplexer (<code>epoll</code> on Linux) to monitor thousands of sockets at once without blocking.
      </Step>
      <Step index={3}>
        <strong>Single thread executes</strong> — The command runs atomically. No lock needed. No other thread can interleave.
      </Step>
      <Step index={4}>
        <strong>Response sent</strong> — The result is written back immediately. Total time: ~100 microseconds.
      </Step>
    </div>,
    <Callout key="c-thread" type="info" title="Why doesn't the single thread become a bottleneck?">
      Because Redis commands are so fast (sub-millisecond RAM ops), the single thread processes <strong>100,000+ commands per second</strong> sequentially. The bottleneck is almost always network I/O — not the CPU. Redis 6+ added I/O threading for <em>reading/writing</em> from sockets, while keeping command execution single-threaded for safety.
    </Callout>,

    <h3 key="h-ds" className="text-xl font-bold mt-8 mb-4">
      Beyond Strings: Redis Data Structures
    </h3>,
    <p key="p-ds" className="mb-4">
      Beginners only use <code>GET</code> / <code>SET</code>. The real power is in Redis's native data types — each one is an optimised C implementation that's faster than you can build in application code.
    </p>,
    <Grid key="g-ds" cols={2} gap={6} className="my-8">
      <Card title="Sorted Sets (ZSET)" description="Leaderboards & Rankings">
        <p className="text-sm text-slate-400 mb-2">
          Store members with a float <strong>score</strong>. Redis keeps them sorted automatically in O(log N).
        </p>
        <p className="text-xs italic text-slate-400">
          Use case: Global game leaderboard — <code>ZADD leaderboard 50234 "player:99"</code> then <code>ZRANGE leaderboard 0 9 REV WITHSCORES</code> returns the top 10 instantly. No <code>ORDER BY</code> SQL scan needed.
        </p>
      </Card>
      <Card title="Pub/Sub + Streams" description="Real-time Events">
        <p className="text-sm text-slate-400 mb-2">
          Channels where publishers push messages and all subscribers receive them instantly.
        </p>
        <p className="text-xs italic text-slate-400">
          Use case: WebSocket chat backend. User sends a message → your Node server publishes to <code>PUBLISH room:42 message</code> → all other subscribers (Node instances) receive it and push to their connected clients. Zero polling.
        </p>
      </Card>
      <Card title="Hashes" description="Object Storage">
        <p className="text-sm text-slate-400 mb-2">
          A key maps to a sub-dictionary of field/value pairs — like a row in a table.
        </p>
        <p className="text-xs italic text-slate-400">
          Use case: <code>HSET user:42 name "Alice" plan "pro" credits 500</code>. Fetch one field: <code>HGET user:42 credits</code>. Avoids deserialising a full JSON blob to read one property.
        </p>
      </Card>
      <Card title="Lists" description="Queues & Activity Feeds">
        <p className="text-sm text-slate-400 mb-2">
          A doubly-linked list. Push/pop from either end in O(1).
        </p>
        <p className="text-xs italic text-slate-400">
          Use case: Job queue — workers <code>BRPOP jobs 0</code> (blocking pop) and wait for the next task. Also perfect for "last 100 activity feed items" with <code>LPUSH</code> + <code>LTRIM</code>.
        </p>
      </Card>
    </Grid>,

    <h3 key="h-ttl" className="text-xl font-bold mt-8 mb-4">
      TTL: The Self-Cleaning Cache
    </h3>,
    <p key="p-ttl" className="mb-4">
      Every Redis key can have a <strong>Time-To-Live (TTL)</strong> in seconds or milliseconds. When the timer expires, Redis atomically deletes the key — no cron jobs, no garbage collection needed.
    </p>,
    <CodeBlock
      key="cb-ttl"
      language="bash"
      title="Redis TTL examples"
      code={`# Store a session token that auto-expires in 15 minutes
SET session:user:42 "{userId:42, role:'admin'}" EX 900

# Store an API rate-limit counter — expires after 1 minute window
SET ratelimit:ip:192.168.1.1 0 EX 60
INCR ratelimit:ip:192.168.1.1

# Check remaining TTL (returns seconds)
TTL session:user:42
# -> 847

# Persist a key (remove TTL)
PERSIST session:user:42`}
    />,

    <h3 key="h-persist" className="text-xl font-bold mt-8 mb-4">
      "But RAM is volatile!" — Redis Persistence Options
    </h3>,
    <Table
      key="t-persist"
      headers={["Mode", "How it Works", "Data Loss Risk", "Use When"]}
      highlightedRows={[1]}
      rows={[
        ["RDB (Snapshot)", "Forks the process and writes a point-in-time .rdb snapshot every N mins", "Up to N minutes of data", "Cache — losing a few minutes is acceptable"],
        ["AOF (Append-Only File)", "Logs every write command to disk. Replays on restart.", "Near zero (last fsync)", "Session store / rate limiter — durability matters"],
        ["RDB + AOF", "Both combined for safety + fast restart", "Near zero", "Production critical data"],
        ["No persistence", "Pure in-memory, data lost on restart", "100% on crash", "Pure ephemeral cache only"],
      ]}
    />,

    <Callout key="c-cache" type="tip" title="Cache-Aside Pattern (The Standard)">
      Your app checks Redis first. On a <strong>cache miss</strong>, it queries Postgres, writes the result to Redis with a TTL, and returns it. Next request hits Redis. This pattern keeps your DB load flat even at massive scale. The hardest part: choosing the right TTL — too short and you thrash the DB, too long and users see stale data.
    </Callout>,

    <Callout key="c-notdb" type="warning" title="Redis is not a Primary Database">
      RAM is expensive and finite. Redis works best as a <strong>cache layer or auxiliary store</strong> alongside a persistent database. Don't store terabytes of user data in Redis — use it for hot paths: sessions, rate limits, leaderboards, feature flags, and pub/sub.
    </Callout>,
  ],
};
