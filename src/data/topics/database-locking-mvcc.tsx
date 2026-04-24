import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Lock, Eye, Gauge, ShieldCheck } from "lucide-react";

export const databaseLockingMvccTopic: Topic = {
  id: "database-locking-mvcc",
  title: "Database Locking, MVCC & Deadlocks",
  description:
    "Why writes do not always lock the whole database, how reads still work, and how production systems survive contention.",
  tags: ["database", "sql", "transactions", "mvcc"],
  icon: "Lock",
  content: [
    <p key="1">
      Yes, database locks are absolutely real. But the common beginner fear is
      slightly off: a normal write usually does <strong>not</strong> lock the
      entire database. Modern relational databases try very hard to lock the
      <strong> smallest possible thing</strong>, often a single row, while
      letting other readers and unrelated writers keep moving.
    </p>,
    <Grid key="2" cols={2} gap={6}>
      <FeatureCard
        icon={Lock}
        title="What Actually Gets Locked?"
        subtitle="The scope depends on the operation"
        theme="amber"
      >
        <p className="mt-2 text-sm leading-relaxed text-amber-100/75">
          A plain <code>UPDATE users SET ... WHERE id = 42</code> typically
          takes a <strong>row-level lock</strong>. A dangerous schema change
          like <code>ALTER TABLE</code> may take a <strong>table</strong> or
          <strong> metadata lock</strong>. The lock scope depends on the engine,
          the query shape, and the isolation level.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Eye}
        title="Why Reads Still Work"
        subtitle="MVCC is the secret weapon"
        theme="cyan"
      >
        <p className="mt-2 text-sm leading-relaxed text-cyan-100/75">
          PostgreSQL, InnoDB, and other modern engines use{" "}
          <strong>MVCC</strong> (Multi-Version Concurrency Control). Instead of
          forcing readers to wait on every writer, the database lets readers see
          an <strong>older committed snapshot</strong> while the new version is
          still being written.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Locking Reality Matrix
    </h3>,
    <Table
      key="4"
      headers={[
        "Operation",
        "Typical Lock Scope",
        "Can Other Reads Continue?",
        "Production Reality",
      ]}
      rows={[
        [
          "UPDATE one row by primary key",
          "Row lock",
          "Usually <strong>Yes</strong> via MVCC",
          "Very common. This is the normal case in OLTP systems.",
        ],
        [
          "SELECT ... FOR UPDATE",
          "Row lock",
          "Plain readers usually <strong>Yes</strong>",
          "Used intentionally to stop two workers from editing the same row at once.",
        ],
        [
          "Mass UPDATE touching many rows",
          "Many row locks",
          "Usually <strong>Yes</strong>, but contention rises",
          "Can create long waits, lock queues, bloat, and deadlocks.",
        ],
        [
          "ALTER TABLE / blocking migration",
          "Table or metadata lock",
          "Sometimes <strong>No</strong>",
          "This is the scary one that can freeze live traffic.",
        ],
        [
          "SQLite write transaction",
          "Single-writer / file-level coordination",
          "More limited than Postgres/MySQL",
          "Excellent for embedded apps, weaker for heavy concurrent writes.",
        ],
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      How a Read Can Succeed While a Write Is In Progress
    </h3>,
    <Step key="6" index={1}>
      <strong>Transaction A</strong> starts and updates row `id = 42`, but has
      not committed yet.
    </Step>,
    <Step key="7" index={2}>
      The database places a <strong>write lock</strong> on that row so another
      conflicting writer cannot mutate it at the same time.
    </Step>,
    <Step key="8" index={3}>
      <strong>Transaction B</strong> performs a normal `SELECT`. Under MVCC, it
      often reads the <strong>last committed version</strong> of that row
      instead of waiting on Transaction A.
    </Step>,
    <Step key="9" index={4}>
      Once Transaction A commits, future readers start seeing the new version.
      This is why writes and reads can overlap without the entire database
      freezing.
    </Step>,
    <Callout key="10" type="info" title="Locking Is Not the Same as a Race Condition">
      A lock is the database trying to <strong>prevent</strong> race
      conditions. The real bug appears when application code assumes two
      requests can safely read and write shared data without coordination,
      causing lost updates, double booking, or overselling.
    </Callout>,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      How Engineers Inspect Lock Problems
    </h3>,
    <p key="12">
      When people say "the DB is locked", what they usually mean is: one
      transaction is <strong>waiting</strong> behind another transaction's lock.
      You inspect the blocking session, the waiting session, and the exact SQL
      they are running.
    </p>,
    <CodeBlock
      key="13"
      title="postgres-lock-inspection.sql"
      language="sql"
      code={`
SELECT pid, usename, state, wait_event_type, wait_event, query
FROM pg_stat_activity
WHERE wait_event_type = 'Lock';

SELECT pid, pg_blocking_pids(pid) AS blocked_by, query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;
      `}
    />,
    <Table
      key="14"
      headers={["Database", "Where Teams Look", "What They Check"]}
      rows={[
        [
          "PostgreSQL",
          "`pg_stat_activity`, `pg_locks`, `pg_blocking_pids()`",
          "Waiting PIDs, blocking PIDs, query text, transaction age",
        ],
        [
          "MySQL / InnoDB",
          "`performance_schema.data_locks`, `data_lock_waits`, `SHOW ENGINE INNODB STATUS`",
          "Who holds the lock, who is waiting, latest deadlock trace",
        ],
        [
          "SQL Server",
          "`sys.dm_tran_locks`, `sys.dm_exec_requests`",
          "Blocked sessions, lock mode, wait time, blocking statement",
        ],
      ]}
    />,
    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      How Teams Handle This in Production
    </h3>,
    <Grid key="16" cols={2} gap={6}>
      <FeatureCard icon={Gauge} title="Keep Transactions Short" subtitle="The golden rule" theme="emerald">
        <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">
          Open transaction, do the minimum work, commit fast. Never hold a DB
          transaction open while calling an external API, waiting on a queue, or
          doing slow business logic.
        </p>
      </FeatureCard>
      <FeatureCard icon={ShieldCheck} title="Index Your Predicates" subtitle="Avoid accidental lock explosions" theme="teal">
        <p className="mt-2 text-sm leading-relaxed text-teal-100/75">
          If your `UPDATE ... WHERE status = 'pending'` scans 2 million rows,
          the database may touch and lock far more data than you expected.
          Proper indexes shrink both scan cost and contention windows.
        </p>
      </FeatureCard>
      <FeatureCard icon={Lock} title="Use Explicit Locking Carefully" subtitle="Only when business rules demand it" theme="amber">
        <p className="mt-2 text-sm leading-relaxed text-amber-100/75">
          For inventory, payments, or job queues, teams may use{" "}
          <code>SELECT ... FOR UPDATE</code>, <code>NOWAIT</code>, or{" "}
          <code>SKIP LOCKED</code> to coordinate competing workers safely.
        </p>
      </FeatureCard>
      <FeatureCard icon={Lock} title="Retry Deadlocks" subtitle="Deadlocks are normal, not mythical" theme="rose">
        <p className="mt-2 text-sm leading-relaxed text-rose-100/75">
          If Transaction A locks row 1 then row 2, while Transaction B locks row
          2 then row 1, the database detects a <strong>deadlock</strong> and
          kills one transaction. The application should catch that error and
          retry.
        </p>
      </FeatureCard>
    </Grid>,
    <CodeBlock
      key="17"
      title="safe-row-locking.sql"
      language="sql"
      code={`
BEGIN;

SELECT *
FROM inventory
WHERE sku = 'shoe-123'
FOR UPDATE;

UPDATE inventory
SET stock = stock - 1
WHERE sku = 'shoe-123' AND stock > 0;

COMMIT;
      `}
    />,
    <Callout key="18" type="tip" title="The Real Mental Model">
      Do not think "writing locks the whole DB". Think:{" "}
      <strong>
        every transaction creates a temporary bubble of visibility and locking
      </strong>
      . Good database engines make that bubble as small and short-lived as
      possible.
    </Callout>,
  ],
};
