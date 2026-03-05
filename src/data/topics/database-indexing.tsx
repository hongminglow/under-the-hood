import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const databaseIndexingTopic: Topic = {
  id: "database-indexing",
  title: "Database Indexing & B-Trees",
  description:
    "How structural B-Tree indexes turn agonizing O(N) full-table scans into blazing-fast O(log N) lookups.",
  tags: ["databases", "performance", "algorithms", "sql"],
  icon: "SearchCode",
  content: [
    <p key="1">
      If a database table has 10 million rows and you query `SELECT * FROM users
      WHERE email = 'john@doe.com'`, the database literally scans every single
      row sequentially out of the entire massive file on the hard drive. This is
      a <strong>Full Table Scan</strong> — the agonizing <code>O(N)</code> enemy
      of application performance.
    </p>,
    <p key="2" className="mt-4">
      To fix this, you create an <strong>Index</strong> on the `email` column.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The B-Tree (Balanced Tree)
    </h4>,
    <p key="4" className="mb-4">
      Instead of scanning the whole table, the database builds a separate,
      tightly packed data structure called a B-Tree. It acts exactly like the
      index at the back of a textbook, pointing alphabetical names directly to
      page numbers.
    </p>,
    <Grid key="5" cols={2} gap={6} className="mb-8">
      <Card title="Speed O(log N)">
        <p className="text-sm">
          B-Trees are extremely wide and shallow. Searching a billion rows
          usually only requires traversing 3 or 4 tree levels. It finds the
          exact pointer to the disk block immediately.
        </p>
      </Card>
      <Card title="The Write Penalty">
        <p className="text-sm">
          Indexes make reads fast, but they make <strong>writes slower</strong>.
          Every time you INSERT or UDPATE a row, the database must also
          re-balance and mutate every attached B-Tree index.
        </p>
      </Card>
    </Grid>,
    <h4 key="6" className="text-xl font-bold mt-8 mb-4">
      Clustered vs Non-Clustered
    </h4>,
    <ul
      key="7"
      className="list-disc pl-6 space-y-3 mb-8 text-muted-foreground/90"
    >
      <li>
        <strong className="text-foreground">Clustered Index:</strong> Defines
        the actual physical sorting order of the table on the hard drive itself.
        Because data can only be sorted one way, a table can only have{" "}
        <strong>one</strong> clustered index (usually the Primary Key).
      </li>
      <li>
        <strong className="text-foreground">
          Non-Clustered (Secondary) Index:
        </strong>{" "}
        A separate structure from the data. It sorts the columns requested, but
        its "leaf nodes" don't contain the data itself; they contain a pointer
        back to the main table row.
      </li>
    </ul>,
    <Callout key="8" type="info" title="Composite Indexes & Order">
      If you query by `WHERE first_name = 'John' AND last_name = 'Doe'`,
      creating an index on `(first_name, last_name)` creates a composite B-Tree.
      However, due to alphabetical sorting mechanics, querying just `WHERE
      last_name = 'Doe'` cannot use the index. Order explicitly matters!
    </Callout>,
  ],
};
