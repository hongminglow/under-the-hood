import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const paginationStrategiesTopic: Topic = {
  id: "pagination-strategies",
  title: "Pagination Strategies",
  description:
    "Offset vs Cursor vs Keyset — why your pagination approach can make or break API performance at scale.",
  tags: ["api", "databases", "performance", "system-design"],
  icon: "ListOrdered",
  content: [
    <p key="1">
      When an API returns 10 million records, you can't send them all at once.{" "}
      <strong>Pagination</strong> splits results into pages — but <em>how</em>{" "}
      you paginate has massive performance implications at scale.
    </p>,
    <Table
      key="2"
      headers={[
        "Strategy",
        "Mechanism",
        "Performance at Page 10,000",
        "Consistency",
      ]}
      rows={[
        [
          "Offset",
          "OFFSET 100000 LIMIT 25",
          "Terrible — DB scans 100,000 rows to skip them",
          "Inconsistent (new inserts shift pages)",
        ],
        [
          "Cursor (ID-based)",
          "WHERE id > last_seen_id LIMIT 25",
          "Constant O(1) — index seek",
          "Consistent (stable references)",
        ],
        [
          "Keyset (Compound)",
          "WHERE (date, id) > (last_date, last_id)",
          "Constant — index seek",
          "Consistent + supports sorting",
        ],
        [
          "Page Token",
          "Opaque encrypted cursor",
          "Depends on implementation",
          "Server-controlled, versioned",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Offset Pagination (Simple)">
        <CodeBlock
          language="sql"
          title="The Problem"
          code={`-- Page 1: fast
SELECT * FROM posts ORDER BY id LIMIT 25 OFFSET 0;

-- Page 4000: SLOW (DB must scan 100,000 rows to skip)
SELECT * FROM posts ORDER BY id LIMIT 25 OFFSET 100000;
-- PostgreSQL literally reads and discards 100K rows!`}
        />
      </Card>
      <Card title="Cursor Pagination (Scalable)">
        <CodeBlock
          language="sql"
          title="The Solution"
          code={`-- Page 1
SELECT * FROM posts ORDER BY id LIMIT 25;
-- last_id = 25

-- Any page: instant (index seek, no scanning)
SELECT * FROM posts
WHERE id > 25   -- cursor from previous page
ORDER BY id LIMIT 25;`}
        />
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="Which to Use?">
      <strong>Small datasets (&lt;10K rows):</strong> Offset is fine — simple
      and supports "jump to page 50."
      <strong> Large datasets:</strong> Always use cursor/keyset — constant
      performance regardless of page depth.
      <strong> Public APIs:</strong> Use opaque page tokens (encrypted cursors)
      to hide implementation and prevent abuse.
    </Callout>,
    <Callout key="5" type="warning" title="The Ghost Row Problem">
      With offset pagination, if a new row is inserted while a user is paging,
      every subsequent page <strong>shifts by one</strong> — the user either
      misses a row or sees a duplicate. Cursor pagination eliminates this
      entirely because the cursor is an{" "}
      <strong>absolute reference point</strong>.
    </Callout>,
  ],
};
