import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const gitInternalsTopic: Topic = {
	id: "git-internals",
	title: "Git Internals",
	description:
		"How Git's content-addressable object store, DAG commits, and refs create the most powerful version control system ever built.",
	tags: ["git", "devops", "data-structures"],
	icon: "GitBranch",
	content: [
		<p key="1">
			Git is not a "file backup tool". Under the hood, it's a <strong>content-addressable filesystem</strong> — a
			key-value store where the key is a SHA-1 hash of the content. Everything in Git (files, directories, commits) is
			an <em>object</em> stored in the <code>.git/objects</code> directory.
		</p>,
		<h4 key="2" className="text-xl font-bold mt-8 mb-4">
			The Four Object Types
		</h4>,
		<Grid key="3" cols={2} gap={6} className="mb-8">
			<Card title="Blob">
				<p className="text-sm text-muted-foreground">
					Stores the raw content of a single file. It does <strong>not</strong> store the filename — just pure bytes.
					Two files with identical content share the exact same blob object.
				</p>
			</Card>
			<Card title="Tree">
				<p className="text-sm text-muted-foreground">
					Represents a directory. It maps filenames to blob hashes (and nested tree hashes for subdirectories). This is
					how Git knows which blobs belong to which filenames.
				</p>
			</Card>
			<Card title="Commit">
				<p className="text-sm text-muted-foreground">
					Points to a single root Tree (the project snapshot), a parent commit (or parents for merges), an author, a
					timestamp, and a message. Commits form a Directed Acyclic Graph (DAG).
				</p>
			</Card>
			<Card title="Tag (Annotated)">
				<p className="text-sm text-muted-foreground">
					A named, signed pointer to a specific commit. Unlike lightweight tags (which are just refs), annotated tags
					are full objects with metadata.
				</p>
			</Card>
		</Grid>,
		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			How a Commit Actually Works
		</h4>,
		<Step key="5" index={1}>
			<strong>git add:</strong> Hashes each staged file's content into a Blob object in <code>.git/objects</code>.
			Updates the staging area (index).
		</Step>,
		<Step key="6" index={2}>
			<strong>git commit:</strong> Creates a Tree object from the current index (mapping filenames → blobs). Then
			creates a Commit object pointing to that Tree, referencing the previous commit as its parent.
		</Step>,
		<Step key="7" index={3}>
			<strong>Branch update:</strong> The current branch ref (e.g., <code>.git/refs/heads/main</code>) is updated to
			point to the new commit's SHA. Branches are literally just text files containing a hash.
		</Step>,
		<Callout key="8" type="tip" title="Why Rebasing Rewrites History">
			A commit's hash is derived from its content, parent, author, and timestamp. Rebasing changes the parent pointer,
			which changes the hash, which cascades through every descendant commit. This is why force-pushing after a rebase
			overwrites shared history.
		</Callout>,
	],
};
