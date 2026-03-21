import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const databaseMigrationsTopic: Topic = {
  id: "database-migrations",
  title: "Database Migrations",
  description:
    "How to fundamentally surgically alter a live screaming 10-million row database organically entirely without dropping a single write.",
  tags: ["database", "backend", "architecture"],
  icon: "ArrowRightLeft",
  content: [
    <p key="1">
      In a production environment with millions of rows, you cannot just run <code>ALTER TABLE</code> and hope for the best. Database Migrations must be treated as <strong>Surgical Operations</strong>—executed in stages to avoid locking the table and crashing the application.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The 'Expand-Contract' (Parallel Change) Pattern
    </h3>,
    <p key="3" className="mb-4">
      To achieve zero-downtime while renaming a column or changing a data type, you must never do it in one step.
    </p>,
    <Table
      key="4"
      headers={["Phase", "Action", "Technical State"]}
      rows={[
        ["1. Expand", "Add the <strong>new</strong> column alongside the old one.", "App writes to <strong>both</strong> columns simultaneously."],
        ["2. Migrate", "Background script syncs old data to new column.", "App reads from the <strong>old</strong> column."],
        ["3. Switch", "Update app code to read from the <strong>new</strong> column.", "Old column is now 'dead' but still exists."],
        ["4. Contract", "Safely delete the old column.", "Clean state achieved with zero downtime."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Danger of Table Locks
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="The Lock Trap">
        <p className="text-sm text-muted-foreground mb-2">
          <code>ALTER TABLE users ADD bio TEXT DEFAULT 'N/A';</code>
        </p>
        <p className="text-xs text-muted-foreground italic">
          PostgreSQL must physically rewrite every row to add the default value. On 10M rows, this leads to an <strong>Exclusive Lock</strong>, blocking all Reads and Writes for minutes.
        </p>
      </Card>
      <Card title="The Safe Fix">
        <p className="text-sm text-muted-foreground mb-2">
          Add the column as <strong>NULL</strong> without a default.
        </p>
        <p className="text-xs text-muted-foreground italic">
          Adding a nullable column is a <strong>Metadata-only</strong> change (takes ~1ms). You then backfill the 'N/A' value in small chunks (e.g., 5,000 rows at a time).
        </p>
      </Card>
    </Grid>,
    <Callout key="7" type="warning" title="Backward Compatibility">
      During a <strong>Rolling Deployment</strong> (Blue/Green), two versions of your code are running at once. Your migration <strong>must</strong> be compatible with both. If Version A expects a column that Version B just deleted, your site will 500 for exactly half of your users.
    </Callout>,
  ],
};
