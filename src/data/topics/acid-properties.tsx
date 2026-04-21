import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const acidPropertiesTopic: Topic = {
  id: "acid-properties",
  title: "A.C.I.D Properties of SQL",
  description:
    "The 4 fundamental guarantees a Relational Database enforces to stop you from accidentally giving a user infinite money.",
  tags: ["database", "architecture", "sql", "acid"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      If a user initiates a $50 bank transfer, the database mathematically performs two commands: `UPDATE user1 = user1 - 50` and `UPDATE user2 = user2 + 50`. What happens if the physical power cable to the server sparks and violently trips immediately after line 1? User 1 lost $50 permanently, and User 2 never received it. The money evaporated. 
    </p>,
    <p key="2" className="mt-4">
      <strong>ACID</strong> is a set of iron-clad guarantees implemented directly into the deepest core of PostgreSQL and MySQL to prevent these architectural nightmares.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The ACID Matrix
    </h3>,
    <Table
      key="4"
      headers={["Letter", "Property", "The Developer Translation"]}
      rows={[
        [
          "A",
          "Atomicity",
          "To fix the bank transfer power issue, you wrap both SQL lines in a `BEGIN;` and `COMMIT;`. It magically morphs the 2 queries into exactly 1 atomic bomb. Either all 2 lines successfully write cleanly, or 0 lines write."
        ],
        [
          "C",
          "Consistency",
          "The database physically reads your strict constraints (`CHECK amount > 0`) before permitting the transaction. If the transaction scientifically breaks your rules, the database violently rolls the entire action back."
        ],
        [
          "I",
          "Isolation",
          "If 10,000 thousands users violently attempt to buy the absolute last pair of limited Nike shoes physically at the exact same millisecond, the database invisibly isolates the requests and sequentially enforces a queue so exact money-checks don't organically bleed."
        ],
        [
          "D",
          "Durability",
          "Once the SQL database sends the \"COMMIT SUCCESS\", it mathematically guarantees the data is physically burned onto the SSD hard drive. Even if you rip the power plug out 1 nanosecond later, the data survives."
        ]
      ]}
    />,
    <Callout key="5" type="warning" title="NoSQL Abandons ACID (Historically)">
      To achieve massive horizontal cloud scale in the 2010s, databases like Cassandra and early MongoDB historically abandoned the 'I' (Isolation) or 'C' (Consistency) to run blazing fast. This is exactly why 99% of global massive banking and fintech institutions strictly use rigid SQL Postgres arrays for their core ledgers, avoiding NoSQL for financial transactions entirely.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Isolation Levels: The Hidden Complexity
    </h3>,
    <p key="7">
      The "I" in ACID isn't binary. SQL databases offer multiple <strong>Isolation Levels</strong>&nbsp;that trade consistency for performance:
    </p>,
    <Table
      key="8"
      headers={["Level", "Behavior", "Risk"]}
      rows={[
        ["Read Uncommitted", "Can read data from uncommitted transactions.", "Dirty Reads (reading data that gets rolled back)."],
        ["Read Committed", "Only reads committed data. Default in PostgreSQL.", "Non-Repeatable Reads (same query returns different results)."],
        ["Repeatable Read", "Guarantees same query returns same result within a transaction.", "Phantom Reads (new rows can appear)."],
        ["Serializable", "Full isolation. Transactions execute as if they ran one-at-a-time.", "Slowest. Can cause deadlocks."]
      ]}
    />,
    <Callout key="9" type="info" title="Modern NoSQL Evolution">
      Modern NoSQL databases have evolved. MongoDB 4.0+ supports multi-document ACID transactions. DynamoDB offers <strong>Transactions</strong>&nbsp;for up to 25 items. The line between SQL and NoSQL is blurring.
    </Callout>,

    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      Under the Hood: Write-Ahead Logging (WAL)
    </h3>,
    <p key="11" className="mb-4">
      How does a database guarantee <strong>Durability</strong>&nbsp;without destroying performance? The secret is <strong>Write-Ahead Logging</strong>&nbsp;(WAL). Before modifying any data page in memory, the database first writes the change to a sequential append-only log file on disk.
    </p>,
    <Grid key="12" cols={2} gap={6} className="my-8">
      <Card title="Why WAL is Fast">
        <p className="text-sm text-slate-400 mb-2">
          Sequential writes vs. random writes.
        </p>
        <p className="text-xs italic text-slate-400">
          Writing to the end of a log file is <strong>100x faster</strong>&nbsp;than seeking to random disk locations to update data pages. SSDs and HDDs both optimize for sequential I/O. PostgreSQL's WAL can sustain 10,000+ writes/sec on commodity hardware.
        </p>
      </Card>
      <Card title="Crash Recovery">
        <p className="text-sm text-slate-400 mb-2">
          Replaying the log after power loss.
        </p>
        <p className="text-xs italic text-slate-400">
          On restart, the database reads the WAL from the last checkpoint and replays every committed transaction. Uncommitted transactions are discarded. This is how PostgreSQL guarantees <strong>zero data loss</strong>&nbsp;even during kernel panics.
        </p>
      </Card>
    </Grid>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      The Hidden Cost: Lock Contention
    </h3>,
    <p key="14" className="mb-4">
      <strong>Isolation</strong>&nbsp;isn't free. To prevent race conditions, databases use <strong>locks</strong>. When Transaction A reads a row, it acquires a <strong>Shared Lock</strong>. When Transaction B tries to update that same row, it must wait for a <strong>Exclusive Lock</strong>, creating contention.
    </p>,
    <Table
      key="15"
      headers={["Lock Type", "Acquired By", "Blocks"]}
      rows={[
        ["Shared Lock (S)", "SELECT queries", "Exclusive locks (writes must wait)"],
        ["Exclusive Lock (X)", "UPDATE, DELETE", "All other locks (reads and writes blocked)"],
        ["Row-Level Lock", "UPDATE WHERE id = 5", "Only that specific row"],
        ["Table-Level Lock", "ALTER TABLE", "Entire table (disaster for high-traffic apps)"]
      ]}
    />,
    <Callout key="16" type="danger" title="Real-World War Story: The Accidental Table Lock">
      In 2019, a developer ran <code>ALTER TABLE users ADD COLUMN preferences JSON</code>&nbsp;on a production PostgreSQL database with 50 million users. The migration acquired an <strong>ACCESS EXCLUSIVE</strong>&nbsp;lock, blocking all reads and writes for 8 minutes. The entire application went down. Lesson: Use tools like <code>pg_repack</code>&nbsp;or <code>pt-online-schema-change</code>&nbsp;for zero-downtime migrations.
    </Callout>,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      MVCC: How PostgreSQL Avoids Locking Reads
    </h3>,
    <p key="18" className="mb-4">
      PostgreSQL uses <strong>Multi-Version Concurrency Control</strong>&nbsp;(MVCC) to allow reads and writes to happen simultaneously without blocking. Instead of locking rows, it keeps multiple versions of each row.
    </p>,
    <CodeBlock
      key="19"
      title="How MVCC Works Internally"
      language="sql"
      code={`-- Transaction 1 (started at time T1)
BEGIN;
SELECT balance FROM accounts WHERE id = 100;  -- Reads version at T1
-- Returns: $1000

-- Transaction 2 (started at time T2, after T1)
BEGIN;
UPDATE accounts SET balance = 500 WHERE id = 100;  -- Creates NEW version
COMMIT;  -- New version is now visible to future transactions

-- Back to Transaction 1
SELECT balance FROM accounts WHERE id = 100;  -- Still reads T1 version
-- Returns: $1000 (not $500!)
-- This is "Repeatable Read" isolation in action`}
    />,
    <p key="20" className="mt-4 text-sm text-muted-foreground">
      Each row has hidden metadata: <code>xmin</code>&nbsp;(transaction ID that created it) and <code>xmax</code>&nbsp;(transaction ID that deleted it). PostgreSQL uses these to determine which version of a row each transaction should see.
    </p>,

    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      The Phantom Read Problem
    </h3>,
    <p key="22" className="mb-4">
      Even with <strong>Repeatable Read</strong>, a subtle anomaly can occur: <strong>Phantom Reads</strong>. Your transaction reads a range of rows twice, but new rows appear in the second read because another transaction inserted them.
    </p>,
    <CodeBlock
      key="23"
      title="Phantom Read Example"
      language="sql"
      code={`-- Transaction A
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT COUNT(*) FROM orders WHERE status = 'pending';
-- Returns: 10

-- Transaction B (runs concurrently)
BEGIN;
INSERT INTO orders (status) VALUES ('pending');
COMMIT;

-- Back to Transaction A
SELECT COUNT(*) FROM orders WHERE status = 'pending';
-- Returns: 11 (phantom row appeared!)

-- To prevent this, use SERIALIZABLE isolation
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Now PostgreSQL will detect the conflict and abort one transaction`}
    />,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Common ACID Mistakes
    </h3>,
    <MistakeCard
      key="25"
      number={1}
      title="Forgetting to Use Transactions"
      problem="Running multiple related UPDATE statements without BEGIN/COMMIT. If one fails, the database is left in an inconsistent state."
      solution="Always wrap related operations in explicit transactions. Use BEGIN, COMMIT, and ROLLBACK to ensure atomicity."
    >
      <CodeBlock
        language="sql"
        code={`-- BAD: No transaction
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- If second query fails, money disappears!

-- GOOD: Wrapped in transaction
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- Both succeed or both fail`}
      />
    </MistakeCard>,
    <MistakeCard
      key="26"
      number={2}
      title="Using Read Uncommitted in Production"
      problem="Setting isolation level to READ UNCOMMITTED to 'boost performance' allows dirty reads—reading data from uncommitted transactions that might get rolled back."
      solution="Use READ COMMITTED (PostgreSQL default) or REPEATABLE READ. The performance gain from READ UNCOMMITTED is negligible and the data integrity risk is catastrophic."
    />,
    <MistakeCard
      key="27"
      number={3}
      title="Long-Running Transactions"
      problem="Keeping transactions open for minutes or hours (e.g., waiting for user input) causes lock buildup, bloats the WAL, and prevents VACUUM from cleaning up dead rows."
      solution="Keep transactions as short as possible. Never wait for user input inside a transaction. Use application-level locking (optimistic concurrency with version columns) for long-running workflows."
    >
      <CodeBlock
        language="sql"
        code={`-- BAD: Transaction waits for user
BEGIN;
SELECT * FROM cart WHERE user_id = 123;
-- Wait 5 minutes for user to click "Checkout"...
UPDATE cart SET status = 'purchased';
COMMIT;

-- GOOD: Optimistic locking
SELECT *, version FROM cart WHERE user_id = 123;
-- User takes 5 minutes...
UPDATE cart SET status = 'purchased', version = version + 1
WHERE user_id = 123 AND version = 5;  -- Fails if version changed`}
      />
    </MistakeCard>,

    <h3 key="28" className="text-xl font-bold mt-8 mb-4">
      Performance Tradeoffs: When to Relax ACID
    </h3>,
    <p key="29" className="mb-4">
      Full ACID compliance has a cost. For certain use cases, you can trade guarantees for speed:
    </p>,
    <Table
      key="30"
      headers={["Scenario", "Optimization", "Risk"]}
      rows={[
        ["Analytics queries", "Use READ UNCOMMITTED or read replicas", "Slightly stale data (acceptable for dashboards)"],
        ["High-throughput logging", "Disable fsync (synchronous_commit = off)", "Last few seconds of logs lost on crash"],
        ["Idempotent operations", "Use eventual consistency (NoSQL)", "Temporary inconsistency (acceptable for likes/views)"],
        ["Bulk imports", "Use UNLOGGED tables", "Data lost on crash (re-import from source)"]
      ]}
    />,
    <Callout key="31" type="warning" title="The fsync Controversy">
      PostgreSQL's <code>fsync</code>&nbsp;setting forces the OS to flush WAL writes to physical disk before returning success. Disabling it (<code>synchronous_commit = off</code>) can <strong>triple write throughput</strong>, but you risk losing the last few seconds of committed transactions during a crash. Only disable for non-critical data like session logs or metrics.
    </Callout>,

    <h3 key="32" className="text-xl font-bold mt-8 mb-4">
      Real-World War Story: The Lost Bitcoin Transaction
    </h3>,
    <p key="33" className="mb-4">
      In 2013, a cryptocurrency exchange suffered a catastrophic bug. Their custom database layer implemented "optimistic ACID"—it assumed transactions would succeed and only checked constraints <strong>after</strong>&nbsp;committing to disk. A race condition allowed two concurrent withdrawals to drain an account below zero.
    </p>,
    <Grid key="34" cols={2} gap={6} className="my-8">
      <Card title="What Went Wrong">
        <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
          <li>Custom database bypassed PostgreSQL's constraint checking</li>
          <li>Two threads read balance = $1000 simultaneously</li>
          <li>Both approved $800 withdrawals</li>
          <li>Final balance: -$600 (impossible in ACID system)</li>
        </ul>
      </Card>
      <Card title="The Fix">
        <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
          <li>Migrated to PostgreSQL with CHECK constraints</li>
          <li>Used SELECT FOR UPDATE to lock rows during reads</li>
          <li>Added SERIALIZABLE isolation for critical paths</li>
          <li>Result: Zero balance violations in 10+ years</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="35" type="tip" title="Pro Tip: Use SELECT FOR UPDATE for Critical Reads">
      When you need to read a value and then update it based on that value (like checking a balance before withdrawal), use <code>SELECT FOR UPDATE</code>&nbsp;to acquire an exclusive lock immediately. This prevents race conditions without requiring SERIALIZABLE isolation.
    </Callout>,
    <CodeBlock
      key="36"
      title="Preventing Race Conditions"
      language="sql"
      code={`-- Without locking (RACE CONDITION!)
BEGIN;
SELECT balance FROM accounts WHERE id = 100;  -- Returns 1000
-- Another transaction can modify balance here!
UPDATE accounts SET balance = balance - 800 WHERE id = 100;
COMMIT;

-- With SELECT FOR UPDATE (SAFE)
BEGIN;
SELECT balance FROM accounts WHERE id = 100 FOR UPDATE;  -- Locks the row
-- No other transaction can modify this row until we commit
UPDATE accounts SET balance = balance - 800 WHERE id = 100;
COMMIT;`}
    />,
  ],
};
