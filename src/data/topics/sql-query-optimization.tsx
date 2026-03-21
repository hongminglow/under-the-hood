import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const sqlQueryOptimizationTopic: Topic = {
  id: "sql-query-optimization",
  title: "SQL Query Optimization (EXPLAIN ANALYZE)",
  description:
    "How to medically diagnose exactly why your massive complex JOIN query is suddenly taking 14 agonizing seconds.",
  tags: ["database", "performance", "sql"],
  icon: "SearchCode",
  content: [
    <p key="1">
      SQL optimization isn't about "writing better queries"; it's about <strong>Helping the Query Planner</strong> find the most efficient execution path through your data's physical storage.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Anatomy of a Slow Query
    </h3>,
    <p key="3" className="mb-4">
      When you send a query, the <strong>Query Planner</strong> uses <code>Statistics</code> (histograms of your data distribution) to decide between a <strong>Sequential Scan</strong> or an <strong>Index Scan</strong>. If your statistics are stale, the planner might choose a "Seq Scan" even if an index exists!
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Index Scan vs. Seq Scan">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Index Scan:</strong> Uses the B-Tree to find exactly the pages needed.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Seq Scan:</strong> Reads the entire table from disk. Used by the planner if it expects to return &gt;20% of the table.
        </p>
      </Card>
      <Card title="Covering Indexes">
        <p className="text-sm text-muted-foreground mb-2">
          Use <code>INCLUDE</code> to store extra columns in the index itself.
        </p>
        <p className="text-sm text-muted-foreground">
          This allows an <strong>Index Only Scan</strong>, meaning the database never even touches the main "Heap" table!
        </p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Common Performance Killers
    </h3>,
    <Table
      key="6"
      headers={["Mistake", "Why it's Slow", "The Technical Fix"]}
      rows={[
        [
          "SELECT *",
          "Forces a Heap fetch and wastes IO/Network bandwidth.",
          "Select only the specific columns your UI needs."
        ],
        [
          "OR clauses",
          "Often forces the planner to abandon indexes entirely.",
          "Use <code>UNION ALL</code> to combine two indexed queries."
        ],
        [
          "Functions in WHERE",
          "<code>WHERE LOWER(email)</code> invalidates the standard index.",
          "Create a <strong>Functional Index</strong> on the expression."
        ]
      ]}
    />,
    <Callout key="7" type="tip" title="Run ANALYZE Regularly">
      Postgres keeps internal counts of how many rows are in each table. If you just did a massive 1M row import, the planner will be "blind" until you run <code>ANALYZE</code> to refresh its internal statistics.
    </Callout>,
  ],
};
