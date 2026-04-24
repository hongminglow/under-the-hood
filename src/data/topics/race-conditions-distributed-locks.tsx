import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Database, RefreshCw, Minus, LockKeyhole } from "lucide-react";

export const raceConditionsDistributedLocksTopic: Topic = {
  id: "race-conditions-distributed-locks",
  title: "Race Conditions & Distributed Locks",
  description:
    "Why two users clicking 'Buy' at the exact same millisecond can oversell your last item — and how to prevent it.",
  tags: ["backend", "concurrency", "distributed-systems", "architecture"],
  icon: "Lock",
  content: [
    <p key="1">
      A <strong>Race Condition</strong> occurs when two or more operations read and modify shared state concurrently, and the final outcome depends on the unpredictable order of execution. In a single-server app, this means two threads. In a distributed system, this means two separate server instances both acting on the same data at the same time.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Classic Example: Inventory Oversell
    </h3>,
    <p key="2a" className="mb-4">
      Your database says <code>stock = 1</code>. Two users click "Buy" simultaneously. Both servers read <code>stock = 1</code>, both conclude "there's stock available," both decrement to <code>stock = 0</code>, and both confirm the order. You just sold 2 items when you only had 1.
    </p>,
    <Table
      key="3"
      headers={["Time", "Server A", "Server B", "Database (stock)"]}
      rows={[
        ["t0", "—", "—", "1"],
        ["t1", "READ stock → 1", "—", "1"],
        ["t2", "—", "READ stock → 1", "1"],
        ["t3", "stock >= 1? ✅ Proceed", "stock >= 1? ✅ Proceed", "1"],
        ["t4", "UPDATE stock = 0", "—", "0"],
        ["t5", "—", "UPDATE stock = 0", "0"],
        ["t6", "Order confirmed ✅", "Order confirmed ✅ (OVERSOLD!)", "0"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Solutions: From Simple to Distributed
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Database} title="1. Database-Level Locking" subtitle="Row locks inside one database" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-2">
          <strong>SELECT ... FOR UPDATE</strong> locks the row until the transaction commits. Server B's read blocks until Server A finishes.
        </p>
        <p className="text-xs italic text-cyan-200/70">
          Simple and correct for single-database architectures. But if you have multiple databases or microservices, the lock doesn't span across them.
        </p>
      </FeatureCard>
      <FeatureCard icon={RefreshCw} title="2. Optimistic Locking (Version Column)" subtitle="Retry when versions drift" theme="amber">
        <p className="text-sm text-amber-100/75 mb-2">
          Add a <code>version</code> column. On update: <code>UPDATE ... WHERE id = 1 AND version = 3</code>. If another process already bumped the version to 4, the update affects 0 rows and you retry.
        </p>
        <p className="text-xs italic text-amber-200/70">
          No physical locks held. Great for low-contention scenarios. Under heavy contention, retries can cascade and degrade performance.
        </p>
      </FeatureCard>
      <FeatureCard icon={Minus} title="3. Atomic Operations" subtitle="Do the whole mutation in one statement" theme="emerald">
        <p className="text-sm text-emerald-100/75 mb-2">
          <code>UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock &gt; 0</code>. The database executes this as a single atomic operation — no read-then-write gap exists.
        </p>
        <p className="text-xs italic text-emerald-200/70">
          The simplest and most effective solution for single-field decrements. Doesn't work when the logic is more complex than a simple arithmetic check.
        </p>
      </FeatureCard>
      <FeatureCard icon={LockKeyhole} title="4. Distributed Lock (Redis)" subtitle="Cross-system critical section control" theme="violet">
        <p className="text-sm text-violet-100/75 mb-2">
          Acquire a named lock in Redis (<code>SET lock:order:42 nx ex 10</code>) before processing. Only one server holds the lock. Others wait or fail fast.
        </p>
        <p className="text-xs italic text-violet-200/70">
          Essential when the critical section spans multiple services or databases. The <strong>Redlock algorithm</strong> uses 5 independent Redis instances for stronger guarantees.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Distributed Locking: The Dangers
    </h3>,
    <Table
      key="7"
      headers={["Problem", "What Happens", "Mitigation"]}
      rows={[
        ["Lock Expiry", "Server A acquires lock, then a GC pause freezes it for 15 seconds. Lock expires. Server B acquires it. Now both servers are inside the critical section.", "Use fencing tokens (monotonically increasing IDs). The resource rejects writes with a stale fencing token."],
        ["Clock Skew", "Lock TTL relies on time. If Redis clocks drift between nodes, the lock may expire early on some nodes.", "Use Redlock across 5 independent Redis instances. Requires majority agreement."],
        ["Deadlock", "Service A locks resource X, then tries to lock resource Y. Service B locks Y, then tries X. Both wait forever.", "Always acquire locks in a consistent global order. Set aggressive timeouts."],
        ["Network Partition", "The lock holder becomes isolated from the network but keeps processing. Meanwhile, a new lock is granted to another node.", "Use consensus-based locks (etcd, ZooKeeper) instead of Redis for safety-critical sections."]
      ]}
    />,

    <Callout key="8" type="warning" title="Martin Kleppmann's Critique">
      Distributed systems researcher Martin Kleppmann showed that <strong>Redis-based locks are fundamentally unsafe</strong> for correctness-critical operations (like financial transactions). Redis is an AP system — during a network partition, lock safety can be violated. For operations where correctness is non-negotiable, use <strong>consensus-based coordination</strong> (etcd, ZooKeeper) which provides linearizable guarantees.
    </Callout>,

    <Callout key="9" type="tip" title="The Golden Rule">
      If you can solve the problem with a single atomic SQL statement, <strong>do that</strong>. Only reach for distributed locks when the critical section spans multiple systems. Every distributed lock you add is a potential source of deadlocks, performance bottlenecks, and subtle correctness bugs.
    </Callout>,
  ],
};
