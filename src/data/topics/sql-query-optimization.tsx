import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const sqlQueryOptimizationTopic: Topic = {
  id: "sql-query-optimization",
  title: "SQL Query Optimization",
  description:
    "How to turn a 30-second query into a 30ms query using EXPLAIN ANALYZE, proper indexing, and understanding the query planner.",
  tags: ["databases", "sql", "performance", "interview"],
  icon: "SearchCode",
  content: [
    <p key="1">
      A single slow SQL query can bring down your entire application. The
      difference between a <strong>30-second full table scan</strong> and a{" "}
      <strong>30ms indexed lookup</strong> often comes down to understanding how
      the database <strong>query planner</strong> decides to execute your query.
    </p>,
    <CodeBlock
      key="2"
      language="sql"
      title="EXPLAIN ANALYZE — Your Best Friend"
      code={`-- See exactly how PostgreSQL executes your query
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 42 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 10;

-- Look for these red flags in the output:
-- ❌ Seq Scan        → Full table scan, no index used
-- ❌ Sort            → Sorting in memory, not via index
-- ❌ Nested Loop     → O(n*m) join, possibly missing index
-- ✅ Index Scan      → Using an index, fast lookup
-- ✅ Index Only Scan → Reading directly from index, fastest`}
    />,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Top Optimization Techniques
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="1. Add the Right Index">
        <p className="text-sm">
          <code>
            CREATE INDEX idx_orders_user_status ON orders(user_id, status)
          </code>
          . A <strong>composite index</strong> on the columns in your WHERE
          clause. Column order matters — put the most selective column first.
        </p>
      </Card>
      <Card title="2. Avoid SELECT *">
        <p className="text-sm">
          <code>SELECT id, name, email</code> is faster than{" "}
          <code>SELECT *</code>. Fetching fewer columns means less I/O, and
          enables <strong>index-only scans</strong> (covering indexes).
        </p>
      </Card>
      <Card title="3. Use LIMIT Early">
        <p className="text-sm">
          If you only need 10 rows, say so. The query planner can stop scanning
          after finding 10 matches instead of computing the entire result set
          then truncating.
        </p>
      </Card>
      <Card title="4. Avoid Functions on Indexed Columns">
        <p className="text-sm">
          <code>WHERE LOWER(email) = 'foo@bar.com'</code> ❌ — the{" "}
          <code>LOWER()</code> function prevents index usage. Use a functional
          index or store normalized data instead.
        </p>
      </Card>
    </Grid>,
    <Table
      key="5"
      headers={["Anti-Pattern", "Problem", "Fix"]}
      rows={[
        [
          "SELECT * FROM big_table",
          "Fetches all columns, defeats covering indexes",
          "SELECT only needed columns",
        ],
        [
          "WHERE col LIKE '%search%'",
          "Leading wildcard prevents index usage",
          "Use full-text search (GIN index)",
        ],
        [
          "OR conditions on different columns",
          "Planner can't use a single index",
          "UNION two indexed queries instead",
        ],
        [
          "Implicit type casting",
          "WHERE varchar_col = 123 casts every row",
          "Match types: WHERE col = '123'",
        ],
        [
          "Missing LIMIT on large JOINs",
          "Computes millions of rows before truncating",
          "Push LIMIT into subqueries",
        ],
      ]}
    />,
    <Callout key="6" type="tip" title="The 80/20 Rule of SQL Performance">
      <strong>80% of slow queries</strong> are fixed by adding the right index.
      Before rewriting queries, always run <code>EXPLAIN ANALYZE</code> first
      and check if the planner is doing a <strong>Seq Scan</strong> on a table
      that should have an index.
    </Callout>,
  ],
};
