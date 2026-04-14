import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";

export const multithreadingDatabaseAccessTopic: Topic = {
  id: "multithreading-database-access",
  title: "Multithreading & Database Access",
  description:
    "How 1,000 concurrent Node.js requests safely read and write the same database row without corrupting data or crashing.",
  tags: ["database", "concurrency", "backend", "performance"],
  icon: "Layers",
  content: [
    <p key="1">
      Your Express API receives 1,000 requests per second. Each request spawns a handler that queries the database. Are those 1,000 handlers all talking to the database simultaneously? Does the database explode? <strong>No.</strong>&nbsp;Between your application threads and the database sits a critical piece of infrastructure: the <strong>Connection Pool</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Connection Pool: The Traffic Controller
    </h3>,
    <p key="3">
      Opening a TCP connection to PostgreSQL is expensive (~50ms). If every request opened a new connection, your database would die. Instead, your app maintains a <strong>pool of 10-50 persistent connections</strong>&nbsp;that are reused across thousands of requests.
    </p>,
    <Flow
      key="4"
      steps={[
        { title: "1. Request Arrives", description: "Express handler needs to query the database." },
        { title: "2. Pool Checkout", description: "Handler asks the pool for an available connection. If all are busy, it waits in a queue." },
        { title: "3. Query Execution", description: "Handler uses the connection to run SQL. The database handles locking internally." },
        { title: "4. Pool Return", description: "Handler returns the connection to the pool for the next request to use." }
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      What Happens When 2 Threads Read/Write the Same Row?
    </h3>,
    <p key="6">
      Imagine two API requests hit your server at the exact same millisecond, both trying to decrement the stock of the last iPhone in inventory. Here's what actually happens:
    </p>,
    <Table
      key="7"
      headers={["Scenario", "Without Proper Locking", "With Proper Locking"]}
      rows={[
        [
          "Thread A reads stock = 1",
          "Thread A: <code>SELECT stock FROM inventory WHERE id=5</code> → Returns 1",
          "Thread A: <code>SELECT stock FROM inventory WHERE id=5 FOR UPDATE</code> → Locks the row"
        ],
        [
          "Thread B reads stock = 1",
          "Thread B: <code>SELECT stock FROM inventory WHERE id=5</code> → Also returns 1 (race condition!)",
          "Thread B: Tries to <code>SELECT ... FOR UPDATE</code> → <strong>Waits</strong> because Thread A holds the lock"
        ],
        [
          "Both decrement",
          "Thread A: <code>UPDATE inventory SET stock=0 WHERE id=5</code><br/>Thread B: <code>UPDATE inventory SET stock=0 WHERE id=5</code><br/><strong>Result: Both succeed, oversold!</strong>",
          "Thread A: <code>UPDATE inventory SET stock=0 WHERE id=5</code> → Commits<br/>Thread B: Now acquires lock, reads stock=0, realizes it's sold out, returns error"
        ]
      ]}
    />,
    <Callout key="8" type="warning" title="The Lost Update Problem">
      This is called a <strong>Lost Update</strong>. Two threads read the same value, both compute a new value based on the old one, and both write back. The second write silently overwrites the first, causing data corruption. This is why <code>SELECT ... FOR UPDATE</code> exists.
    </Callout>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Connection Pool Configuration
    </h3>,
    <CodeBlock
      key="10"
      language="javascript"
      title="node-pg-pool.js"
      code={`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  max: 20,              // Maximum 20 connections
  idleTimeoutMillis: 30000,  // Close idle connections after 30s
  connectionTimeoutMillis: 2000  // Wait max 2s for a connection
});

// 1000 concurrent requests share these 20 connections
app.get('/api/product/:id', async (req, res) => {
  const client = await pool.connect();  // Waits if all 20 are busy
  try {
    const result = await client.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    res.json(result.rows[0]);
  } finally {
    client.release();  // CRITICAL: Return connection to pool
  }
});`}
    />,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Performance Impact: Pool Size vs Throughput
    </h3>,
    <Grid key="12" cols={2} gap={6}>
      <Card title="Too Few Connections (Pool Size = 5)">
        <p className="text-sm text-muted-foreground">
          If you have 100 concurrent requests but only 5 connections, 95 requests are waiting in the pool queue. Your API becomes slow even though the database is idle. <strong>Symptom:</strong>&nbsp;High request latency, low database CPU.
        </p>
      </Card>
      <Card title="Too Many Connections (Pool Size = 500)">
        <p className="text-sm text-muted-foreground">
          PostgreSQL has a hard limit (default 100 connections). If 10 app servers each open 500 connections, you hit 5,000 connections. The database spends all its time context-switching between connections instead of executing queries. <strong>Symptom:</strong>&nbsp;Database CPU at 100%, queries timeout.
        </p>
      </Card>
    </Grid>,
    <Callout key="13" type="tip" title="The Golden Rule">
      <strong>Pool Size = (Number of CPU Cores × 2) + Disk Spindles</strong><br/><br/>
      For a typical cloud database with 4 cores and SSDs, a pool of 10-20 connections per app server is optimal. Use a connection pooler like <strong>PgBouncer</strong>&nbsp;if you need to scale beyond this.
    </Callout>,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      Language-Specific Threading Models
    </h3>,
    <Table
      key="15"
      headers={["Language/Runtime", "Concurrency Model", "Database Access Pattern"]}
      rows={[
        [
          "Node.js",
          "Single-threaded event loop with async I/O",
          "One connection pool shared across all requests. Async/await prevents blocking."
        ],
        [
          "Python (Django/Flask)",
          "Multi-process (Gunicorn) or async (FastAPI)",
          "Each worker process has its own connection pool. Total connections = workers × pool_size."
        ],
        [
          "Java (Spring Boot)",
          "Multi-threaded (thread-per-request)",
          "Shared connection pool (HikariCP). Threads block waiting for connections."
        ],
        [
          "Go",
          "Goroutines (lightweight threads)",
          "Shared connection pool. Can handle 10,000+ concurrent goroutines with 20 DB connections."
        ]
      ]}
    />,
    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      Real-World Race Condition Example
    </h3>,
    <CodeBlock
      key="17"
      language="python"
      title="race-condition.py"
      code={`# BAD: Race condition (two requests can double-book)
def book_seat(seat_id):
    seat = db.query("SELECT * FROM seats WHERE id=?", seat_id)
    if seat.status == "available":
        time.sleep(0.1)  # Simulate slow business logic
        db.execute("UPDATE seats SET status='booked' WHERE id=?", seat_id)
        return "Success"
    return "Already booked"

# GOOD: Atomic operation with row locking
def book_seat_safe(seat_id):
    with db.transaction():
        seat = db.query("SELECT * FROM seats WHERE id=? FOR UPDATE", seat_id)
        if seat.status == "available":
            time.sleep(0.1)  # Business logic runs while row is locked
            db.execute("UPDATE seats SET status='booked' WHERE id=?", seat_id)
            return "Success"
        return "Already booked"`}
    />,
    <h3 key="18" className="text-xl font-bold mt-8 mb-4">
      When Connection Pools Aren't Enough
    </h3>,
    <p key="19">
      If you have 50 app servers, each with a pool of 20 connections, that's 1,000 connections to the database. Most databases can't handle this. <strong>Solutions:</strong>
    </p>,
    <Grid key="20" cols={2} gap={6}>
      <Card title="PgBouncer (Connection Pooler)">
        <p className="text-sm text-muted-foreground">
          A lightweight proxy that sits between your app and PostgreSQL. Your 50 app servers connect to PgBouncer (1,000 connections), but PgBouncer only opens 100 connections to the actual database. It multiplexes queries.
        </p>
      </Card>
      <Card title="Read Replicas">
        <p className="text-sm text-muted-foreground">
          Route read queries to replica databases. Your primary handles writes (100 connections), while 5 replicas handle reads (500 connections total). This horizontally scales read throughput.
        </p>
      </Card>
    </Grid>,
    <Callout key="21" type="info" title="The Mental Model">
      Your application threads are <strong>not</strong> directly talking to the database. They're talking to a connection pool, which is talking to the database. The pool is the bottleneck, not the threads. Optimize the pool size, not the thread count.
    </Callout>,
  ],
};
