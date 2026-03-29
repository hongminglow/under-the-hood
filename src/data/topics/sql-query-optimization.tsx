import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";

export const sqlQueryOptimizationTopic: Topic = {
  id: "sql-query-optimization",
  title: "SQL Query Optimization (EXPLAIN ANALYZE)",
  description:
    "How to medically diagnose exactly why your massive complex JOIN query is suddenly taking 14 agonizing seconds.",
  tags: ["database", "performance", "sql"],
  icon: "SearchCode",
  content: [
    <p key="1">
      SQL optimization is not "sprinkling indexes everywhere" or guessing from
      vibes. It is the process of helping the <strong>Query Planner</strong>{" "}
      choose the cheapest execution path through your data's physical storage,
      then verifying that choice with real runtime evidence.
    </p>,
    <Callout key="2" type="tip" title="The Golden Rule">
      Never optimize blind. Run <code>EXPLAIN ANALYZE</code> first. The plan
      tells you whether the problem is too many rows scanned, a bad join
      strategy, a disk sort, stale statistics, or an ORM generating absurd SQL.
    </Callout>,
    <CodeBlock
      key="3"
      title="measure-first.sql"
      language="sql"
      code={`
EXPLAIN (ANALYZE, BUFFERS)
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid'
  AND o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC
LIMIT 50;
      `}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      First Diagnose the Type of Slowness
    </h3>,
    <Table
      key="5"
      headers={["Symptom in the Plan", "What It Usually Means", "Best First Move"]}
      rows={[
        [
          "Huge <code>actual rows</code> count",
          "The database is reading far more data than your API actually needs.",
          "Filter earlier, add the right index, or reduce the result set."
        ],
        [
          "<code>Seq Scan</code> on a giant table",
          "The planner thinks scanning everything is cheaper than using an index.",
          "Check selectivity, stale stats, and whether the filter matches an index shape."
        ],
        [
          "<code>Sort Method: external merge Disk</code>",
          "The result needed sorting and spilled to disk.",
          "Add an index that matches the sort, or reduce rows before sorting."
        ],
        [
          "Nested loop with huge loop counts",
          "The inner lookup is running thousands or millions of times.",
          "Index the join key, pre-filter harder, or consider a different join strategy."
        ],
        [
          "Estimated rows wildly different from actual rows",
          "The planner is making decisions with bad statistics or skewed data assumptions.",
          "Run <code>ANALYZE</code>, inspect data distribution, and revisit index design."
        ],
        [
          "Fast DB time but endpoint still slow",
          "The bottleneck may be network round trips or ORM N+1 behavior, not one query.",
          "Batch requests, eager load, or collapse N queries into 1 or 2."
        ],
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Scan and Join Strategy Comparison
    </h3>,
    <Table
      key="7"
      headers={["Plan Strategy", "What It Does", "When It Is Good", "When It Is Bad"]}
      rows={[
        [
          "Sequential Scan",
          "Reads the table page by page from start to finish.",
          "Small tables, or queries returning a large percentage of the table.",
          "Terrible for selective lookups on very large tables."
        ],
        [
          "Index Scan",
          "Uses the index to jump to matching rows, then fetches heap pages.",
          "Highly selective filters like `WHERE email = ?` or recent-range queries.",
          "Can degrade if too many heap fetches are needed."
        ],
        [
          "Index Only Scan",
          "Answers directly from the index without visiting the table heap.",
          "Read-heavy queries where the index already contains all needed columns.",
          "Not possible if the query needs columns missing from the index."
        ],
        [
          "Bitmap Heap Scan",
          "Collects many index hits first, then fetches table pages in batches.",
          "Medium-selectivity queries returning more than a tiny handful of rows.",
          "Still expensive if the predicate matches too much data."
        ],
        [
          "Nested Loop Join",
          "For each outer row, probe the inner relation again.",
          "Excellent when the outer side is small and the inner side is indexed.",
          "Disastrous when both sides are large."
        ],
        [
          "Hash Join",
          "Build a hash table for one side, then probe it from the other side.",
          "Great for larger joins on equality conditions.",
          "Can spill memory or struggle if the join input is huge and poorly filtered."
        ],
        [
          "Merge Join",
          "Walks two already-sorted inputs together.",
          "Great for large sorted inputs or when indexes already provide order.",
          "Needs sort work if the inputs are not already ordered."
        ],
      ]}
    />,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Seq Scan vs Index Scan" description="Use the right mental model">
        <p className="text-sm text-muted-foreground mb-2">
          A <strong>Seq Scan</strong> is not automatically bad. If you need 40%
          of a table, hopping through an index can be slower than reading the
          pages sequentially.
        </p>
        <p className="text-sm text-muted-foreground">
          An <strong>Index Scan</strong> wins when the predicate is selective
          enough that jumping directly to a few rows avoids massive IO.
        </p>
      </Card>
      <Card title="Hash Join vs Nested Loop" description="The classic trade-off">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Nested Loop</strong> is amazing when you already reduced the
          outer rows to a tiny set and the inner side is indexed.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Hash Join</strong> usually wins when joining larger sets on an
          equality key, especially after light filtering.
        </p>
      </Card>
    </Grid>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Optimization Strategy Matrix: When To Use Which
    </h3>,
    <Table
      key="10"
      headers={["Strategy", "Best For", "Use It When", "Hidden Cost / Warning"]}
      rows={[
        [
          "Single-column Index",
          "Simple equality or range lookups",
          "You frequently filter by one column like `email`, `user_id`, or `created_at`.",
          "Too many lonely indexes slow down writes and may still not help combined filters."
        ],
        [
          "Composite Index",
          "Multi-column filter/sort patterns",
          "Your query often does `WHERE status = ? AND created_at > ? ORDER BY created_at`.",
          "Column order matters. A bad order makes the index much less useful."
        ],
        [
          "Covering Index (`INCLUDE`)",
          "Read-heavy endpoints returning a small fixed shape",
          "You already filter by indexed columns but still see expensive heap fetches.",
          "Makes the index larger and increases write overhead."
        ],
        [
          "Partial Index",
          "Hot subsets like `status = 'active'` or `deleted_at IS NULL`",
          "Most queries care about only one small slice of a giant table.",
          "Only helps queries matching the same predicate."
        ],
        [
          "Functional Index",
          "Queries using expressions",
          "You filter on `LOWER(email)` or `DATE(created_at)`.",
          "A normal index will not help if the query transforms the column."
        ],
        [
          "Query Rewrite",
          "Planner-hostile SQL patterns",
          "You have `OR`, giant subqueries, unnecessary `SELECT *`, or expensive correlated lookups.",
          "Can make code less pretty, so measure before and after."
        ],
        [
          "Keyset Pagination",
          "Large infinite-scroll lists",
          "Offset pagination gets slower as page number climbs.",
          "Harder to implement than `OFFSET/LIMIT`, but much more scalable."
        ],
        [
          "Materialized View / Pre-Aggregation",
          "Expensive repeated dashboards and reports",
          "You keep recalculating the same grouping or summary data.",
          "Trades freshness for speed. You must refresh or maintain it."
        ],
        [
          "Partitioning",
          "Huge tables with natural time or tenant boundaries",
          "The table is so large that most queries only care about one partition.",
          "Adds operational complexity and is not a substitute for indexing."
        ],
      ]}
    />,
    <CodeBlock
      key="11"
      title="index-patterns.sql"
      language="sql"
      code={`
-- Composite index for filter + sort
CREATE INDEX idx_orders_status_created_at
ON orders (status, created_at DESC);

-- Partial index for the hot subset only
CREATE INDEX idx_orders_active_recent
ON orders (created_at DESC)
WHERE status = 'paid';

-- Functional index for expression-based lookups
CREATE INDEX idx_users_lower_email
ON users (LOWER(email));

-- Covering index for index-only scans
CREATE INDEX idx_orders_status_created_at_include
ON orders (status, created_at DESC)
INCLUDE (total, user_id);
      `}
    />,
    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      Common Performance Killers and the Correct Fix
    </h3>,
    <Table
      key="13"
      headers={["Mistake", "Why It Hurts", "Prefer This Instead"]}
      rows={[
        [
          "`SELECT *` everywhere",
          "Pulls extra columns, increases IO, and often blocks index-only scans.",
          "Select only the columns the endpoint actually returns."
        ],
        [
          "`OFFSET 100000` pagination",
          "The database still has to walk and discard the skipped rows.",
          "Use keyset/cursor pagination on a stable indexed column."
        ],
        [
          "`WHERE LOWER(email) = ...` on a plain index",
          "The expression breaks the normal B-Tree match.",
          "Use a functional index or normalize the data before storage."
        ],
        [
          "Large `OR` predicates",
          "They often confuse the planner and reduce index usefulness.",
          "Try `UNION ALL` of two selective indexed queries when it fits."
        ],
        [
          "Joining before filtering",
          "You create a giant intermediate result set too early.",
          "Reduce each side as early as possible before the join."
        ],
        [
          "Using the DB for live dashboard aggregation on every request",
          "Repeated `GROUP BY` on huge tables crushes CPU and memory.",
          "Pre-aggregate, cache, or use a materialized view."
        ],
      ]}
    />,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      A Practical Optimization Workflow
    </h3>,
    <Step key="15" index={1}>
      Capture the exact slow SQL and its real parameters. Never optimize the
      wrong query shape.
    </Step>,
    <Step key="16" index={2}>
      Run <code>EXPLAIN ANALYZE</code> and look for the highest-cost node, huge
      row counts, repeated loops, or disk sorts.
    </Step>,
    <Step key="17" index={3}>
      Decide whether the real problem is{" "}
      <strong>too many rows, bad access path, bad join strategy, or doing work
      too often</strong>.
    </Step>,
    <Step key="18" index={4}>
      Choose the fix that matches that problem: index design, query rewrite,
      pagination change, pre-aggregation, or partitioning.
    </Step>,
    <Step key="19" index={5}>
      Re-run the plan and compare. If the improvement does not show up in the
      actual plan, the fix was probably the wrong one.
    </Step>,
    <Callout key="20" type="warning" title="Run ANALYZE Regularly">
      Postgres bases its plan on internal statistics. After a huge import,
      delete wave, or skew change, the planner can become "confidently wrong."
      If estimated rows and actual rows are far apart, refresh statistics before
      you redesign everything.
    </Callout>,
  ],
};
