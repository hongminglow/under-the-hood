import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FileText, FolderTree, GitCommitHorizontal, Tag, GitBranch } from "lucide-react";

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
			<FeatureCard icon={FileText} title="Blob" subtitle="Raw file content only" theme="teal">
				<p className="text-sm text-teal-100/75">
					Stores the raw content of a single file. It does <strong>not</strong> store the filename — just pure bytes.
					Two files with identical content share the exact same blob object.
				</p>
			</FeatureCard>
			<FeatureCard icon={FolderTree} title="Tree" subtitle="Directory mapping layer" theme="cyan">
				<p className="text-sm text-cyan-100/75">
					Represents a directory. It maps filenames to blob hashes (and nested tree hashes for subdirectories). This is
					how Git knows which blobs belong to which filenames.
				</p>
			</FeatureCard>
			<FeatureCard icon={GitCommitHorizontal} title="Commit" subtitle="Snapshot + lineage metadata" theme="violet">
				<p className="text-sm text-violet-100/75">
					Points to a single root Tree (the project snapshot), a parent commit (or parents for merges), an author, a
					timestamp, and a message. Commits form a Directed Acyclic Graph (DAG).
				</p>
			</FeatureCard>
			<FeatureCard icon={Tag} title="Tag (Annotated)" subtitle="Named release pointer with metadata" theme="amber">
				<p className="text-sm text-amber-100/75">
					A named, signed pointer to a specific commit. Unlike lightweight tags (which are just refs), annotated tags
					are full objects with metadata.
				</p>
			</FeatureCard>
		</Grid>,
		<h4 key="4" className="text-xl font-bold mt-8 mb-4">
			How a Commit Actually Works
		</h4>,
		<Grid key="5" cols={1} gap={4} className="mb-8">
			<FeatureCard icon={FileText} title="Step 1: git add" subtitle="Blob creation in the object store" theme="teal">
				<p className="text-sm text-teal-100/75">
					Git hashes each staged file's content into a <strong className="text-teal-300">Blob</strong> object inside
					<code className="text-teal-200">.git/objects</code>, then records that blob in the staging area (index).
				</p>
				<p className="mt-3 text-xs text-teal-200/70">
					Why it matters: Git is storing content first, not "saving files" in the way people usually imagine.
				</p>
			</FeatureCard>
			<FeatureCard
				icon={FolderTree}
				title="Step 2: git commit"
				subtitle="Tree snapshot plus Commit lineage"
				theme="cyan"
			>
				<p className="text-sm text-cyan-100/75">
					Git creates a <strong className="text-cyan-300">Tree</strong> from the index to map filenames to blob hashes,
					then writes a <strong className="text-cyan-300">Commit</strong> object that points to that tree and to the
					previous commit as its parent.
				</p>
				<p className="mt-3 text-xs text-cyan-200/70">
					Why it matters: a commit is really a labeled pointer to a project snapshot plus its place in history.
				</p>
			</FeatureCard>
			<FeatureCard
				icon={GitBranch}
				title="Step 3: branch update"
				subtitle="Refs move to the new commit"
				theme="violet"
			>
				<p className="text-sm text-violet-100/75">
					The current branch ref, such as <code className="text-violet-200">.git/refs/heads/main</code>, is updated to
					point at the new commit SHA. Branches are just lightweight named pointers, not separate copies of your project.
				</p>
				<p className="mt-3 text-xs text-violet-200/70">
					Why it matters: most "branch magic" is just pointer movement on top of immutable objects.
				</p>
			</FeatureCard>
		</Grid>,
		<Callout key="8" type="tip" title="Why Rebasing Rewrites History">
			A commit's hash is derived from its content, parent, author, and timestamp. Rebasing changes the parent pointer,
			which changes the hash, which cascades through every descendant commit. This is why force-pushing after a rebase
			overwrites shared history.
		</Callout>,
	],
};
