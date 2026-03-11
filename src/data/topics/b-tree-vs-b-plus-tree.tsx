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
			When databases build indexes to prevent painful <code>O(N)</code> full-table scans, they rely on highly optimized,
			balanced tree structures. The two most debated structures in database internals are the <strong>B-Tree</strong>{" "}
			and the <strong>B+ Tree</strong>.
		</p>,
		<p key="2" className="mt-4">
			While they sound similar, a crucial architectural difference dictates why nearly all modern relational databases
			(like PostgreSQL and MySQL) use B+ Trees for their primary indexes.
		</p>,
		<h4 key="3" className="text-xl font-bold mt-8 mb-4">
			Structural Differences
		</h4>,
		<Grid key="4" cols={2} gap={6} className="mb-8">
			<Card title="The B-Tree">
				<p className="text-sm">
					In a standard B-Tree, <strong>every node</strong> (both internal nodes and leaf nodes) stores the actual data
					payload (or a direct pointer to the database row) alongside the key.
				</p>
			</Card>
			<Card title="The B+ Tree">
				<p className="text-sm">
					In a B+ Tree, data payloads are <strong>only stored in the leaf nodes</strong>. Internal and root nodes only
					store keys used for routing. Additionally, all leaf nodes are connected via a Linked List.
				</p>
			</Card>
		</Grid>,
		<h4 key="5" className="text-xl font-bold mt-8 mb-4">
			Why Databases Choose B+ Trees
		</h4>,
		<ul key="6" className="list-disc pl-6 space-y-3 mb-8 text-muted-foreground/90">
			<li>
				<strong className="text-foreground">Shallower Trees & Faster I/O:</strong> Because internal nodes in a B+ Tree
				don't waste space holding data payloads, they can pack significantly more routing keys into a single disk page
				(typically 4KB to 16KB). A higher "branching factor" means the entire tree is much shallower, requiring fewer
				expensive disk reads to find any specific record.
			</li>
			<li>
				<strong className="text-foreground">Blazing Fast Range Queries:</strong> In SQL, queries like{" "}
				<code>WHERE age BETWEEN 20 AND 30</code> are incredibly common. Because a B+ Tree connects all leaf nodes using
				a linked list, the database simply traverses down to find <code>20</code>, and then scans horizontally across
				the leaves until it hits <code>30</code>. A standard B-Tree would require erratic, expensive traversal up and
				down the tree to find all those values in order.
			</li>
		</ul>,
		<Callout key="7" type="info" title="When is a B-Tree better?">
			A standard B-Tree has one slight advantage: if the data you are looking for happens to be located in a high-level
			internal node (e.g., near the root), the search stops early. A B+ Tree always requires traversing all the way to
			the leaf node. However, this minor optimization is vastly outweighed by the range-query speed and shallower depth
			of the B+ Tree, which is why B+ Trees are the industry standard.
		</Callout>,
		<h4 key="8" className="text-xl font-bold mt-8 mb-4">
			Head-to-Head Comparison
		</h4>,
		<div key="9" className="mb-8">
			<Table
				headers={["Feature", "B-Tree", "B+ Tree"]}
				rows={[
					["Data Storage", "Internal and Leaf nodes", "Leaf nodes ONLY"],
					["Internal Node Size", "Larger (stores data payload)", "Smaller (keys only)"],
					["Tree Depth", "Deeper", "Shallower (Higher branching factor)"],
					["Range Queries", "Inefficient (tree traversal required)", "Extremely Fast (linked list of leaves)"],
					["Lookup Speed", "Variable (might find data near root)", "Consistent (always reaches leaf)"],
				]}
			/>
		</div>,
	],
};
