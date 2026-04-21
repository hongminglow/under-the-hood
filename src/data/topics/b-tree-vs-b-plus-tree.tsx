import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const bTreeVsBPlusTreeTopic: Topic = {
	id: "b-tree-vs-b-plus-tree",
	title: "B-Tree vs B+ Tree",
	description:
		"Why modern databases prefer B+ Trees over standard B-Trees for blazing fast full-table indexing and range queries.",
	tags: ["databases", "data-structures", "performance", "sql"],
	icon: "FolderTree",
	content: [
    <p key="1">
      B-Trees and B+ Trees are the backbone of modern database indexing. They are <strong>Self-Balancing</strong> search trees designed to work efficiently on block-oriented storage (SSDs/HDDs) where reading a large "Page" of data costs the same as reading a single byte.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Difference: Fan-out
    </h3>,
    <Table
      key="3"
      headers={["Feature", "B-Tree (The Balanced Tree)", "B+ Tree (The Database Standard)"]}
      rows={[
        ["Data Location", "Stored in <strong>every node</strong> (internal and leaf).", "Stored <strong>only in leaf nodes</strong>."],
        ["Fan-out", "Low. Internal nodes are bulky with data payloads.", "High. Internal nodes only store keys + pointers."],
        ["Range Queries", "Slow. Requires multiple up/down traversals.", "<strong>Extremely Fast</strong>. Leaves are a Linked List."],
        ["Search Time", "Variable (might find it at the root).", "Consistent (always <code>O(log n)</code> to the leaf)."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Why 'Fan-out' Matters for Disk I/O
    </h3>,
    <p key="5" className="mb-4">
      Disk I/O is the #1 bottleneck in databases. Data is read in <strong>Pages</strong> (usually 16KB). In a B+ Tree, because internal nodes don't store data, a single 16KB page can hold thousands of keys. This high <strong>Fan-out</strong> means a 3-level B+ Tree can index millions of rows, requiring only 3 disk reads to find any record.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="The Linked Leaf Chain">
        <p className="text-sm text-slate-400 mb-2">
          B+ Trees connect all leaf nodes via a <strong>Doubly Linked List</strong>.
        </p>
        <p className="text-xs italic text-slate-400">
          This allows the database engine to perform "Range Scans" (<code>WHERE id &gt; 100 AND id &lt; 500</code>) by finding the first leaf and simply walking horizontally.
        </p>
      </Card>
      <Card title="LSM Trees (The Alternative)">
        <p className="text-sm text-slate-400 mb-2">
          Used in NoSQL (Cassandra, RocksDB) for <strong>Write-Heavy</strong> workloads.
        </p>
        <p className="text-xs italic text-slate-400">
          Unlike B+ Trees which update in-place (slow random writes), LSM Trees append to an immutable log and "Merge" later. High write throughput, slower reads.
        </p>
      </Card>
    </Grid>,
    <Callout key="7" type="info" title="Industry Usage">
      Nearly every major Relational Database (PostgreSQL, MySQL, Oracle, SQL Server) uses <strong>B+ Trees</strong> as their default indexing structure because of their superior performance for range queries and predictable read latency.
    </Callout>,
	],
};
