import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const paginationStrategiesTopic: Topic = {
  id: "pagination-strategies",
  title: "Pagination Strategies",
  description:
    "Why using standard 'Offset / Limit' to build your API destroys your database when users click 'Page 10,000'.",
  tags: ["backend", "database", "api-design"],
  icon: "BookOpen",
  content: [
    <p key="1">
      Pagination is more than just dividing a list into pages. It is a critical database performance decision. Choosing the wrong strategy (Offset vs. Keyset) can lead to <strong>Full Table Scans</strong> and 0% database availability as your data grows.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Offset vs. Keyset (Cursor) Pagination
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Offset Pagination", "Keyset (Cursor) Pagination"]}
      rows={[
        ["Performance", "Slower as you go deeper (O(N) scan).", "Constant speed (O(log N) index jump)."],
        ["Stability", "Inconsistent. Rows shift if data is added.", "Stable. Results are anchored to a 'Key'."],
        ["Navigation", "Supports 'Jump to Page 50'.", "Supports only 'Next' and 'Previous'."],
        ["Best For", "Small datasets with static UI.", "Infinite Scroll (Social Feeds, Activity Logs)."]
      ]}
    />,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="The OFFSET Trap">
        <p className="text-sm text-muted-foreground mb-2">
          <code>SELECT * FROM logs LIMIT 20 OFFSET 100000;</code>
        </p>
        <p className="text-xs text-muted-foreground italic">
          The database must <strong>load and discard</strong> the first 100,000 rows just to show you row 100,001. This consumes massive I/O and RAM.
        </p>
      </Card>
      <Card title="The Keyset Advantage">
        <p className="text-sm text-muted-foreground mb-2">
          <code>SELECT * FROM logs WHERE id &lt; 9821 LIMIT 20;</code>
        </p>
        <p className="text-xs text-muted-foreground italic">
          The database uses the B-Tree index to <strong>jump directly</strong> to the specified record. Page 1,000,000 is as fast as Page 1.
        </p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Hidden Performance Killer: 'Total Count'
    </h3>,
    <p key="6" className="mb-4">
      In most UI designs, we show "Page 1 of 48,291." To do this, the backend must run <code>SELECT count(*)</code>. In PostgreSQL/MySQL, this is a <strong>Full Table Scan</strong>.
    </p>,
    <Callout key="7" type="tip" title="Scaling Total Counts">
      On massive tables (billions of rows), never run a real count. Use <strong>Table Statistics</strong> (approximate count) from the database metadata, or implement a "Show More" button that doesn't reveal the total page count.
    </Callout>,
  ],
};
