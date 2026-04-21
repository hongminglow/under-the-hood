import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const databaseIndexingTopic: Topic = {
  id: "database-indexing",
  title: "Database Indexing (B-Trees)",
  description:
    "How adding exactly one line of SQL code turns a 10-second agonizing API request loading screen into a 0.01ms flash.",
  tags: ["database", "performance", "backend"],
  icon: "BookMarked",
  content: [
    <p key="1">
      If you run `SELECT * FROM users WHERE email = 'john@gmail.com'` on a massive 10-million row database, PostgreSQL historically performs a <strong>Sequential Scan</strong>. It manually reads Row 1, Row 2, Row 3... all the way to 10,000,000, just blindly comparing the exact string. This crashes production APIs instantly under minor traffic.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The B-Tree Miracle
    </h3>,
    <p key="3" className="mb-4">
      When you forcefully type <code>CREATE INDEX idx_email ON users(email);</code>, the database spends 30 minutes reading the massive table and silently builds a completely separate, heavily optimized mathematical data structure entirely inside RAM (The B-Tree Index).
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="O(log N) Searching" description="Sub-millisecond Jumps">
        <p className="text-sm text-muted-foreground">
          Instead of reading 10,000,000 rows sequentially like a mindless zombie, the database checks the root node of the Tree. "Is 'john' alphabetically before or after 'm'?" It strictly cuts half the database perfectly in half 20 times (Log N algorithms), instantly discovering John's exact hard-drive pointer in less than 24 physical jumps.
        </p>
      </Card>
      <Card title="The Hidden Tax" description="Slowing down Writes">
        <p className="text-sm text-muted-foreground">
          If Indexes are utterly magical, why don't you natively index all 50 columns? Because <strong>every single `INSERT` or `UPDATE`</strong> you commit suddenly forces Postgres to dynamically restructure almost all 50 mathematical B-Trees mathematically before returning `200 OK` to the API. It permanently slows down writes strictly for the benefit of blazing fast reads.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="Use Partial or Composite Indexes!">
      Stop creating random solitary indexes blindly! If your dashboard ALWAYS filters by `country` and sorts by `created_at`, explicitly drop the lonely indexes and write one extremely powerful <strong>Composite Index</strong>: <code>CREATE INDEX ON users(country, created_at)</code> to instantly cover that exact query flawlessly.
    </Callout>,
  ],
};
