import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const monorepoVsPolyrepoTopic: Topic = {
	id: "monorepo-vs-polyrepo",
	title: "Monorepo vs Polyrepo",
	description:
		"The fiercely debated repository strategy: one giant repo for everything, or many small repos per service?",
	tags: ["devops", "architecture", "git", "debate"],
	icon: "FolderGit2",
	content: [
		<p key="1">
			Should your entire organization's code live in <strong>one repository</strong> (monorepo) or should each
			microservice, library, and app get its <strong>own repository</strong> (polyrepo)? Google, Meta, and Twitter use
			monorepos. Netflix, Amazon, and Spotify use polyrepos. Both approaches work at extreme scale — the debate is about{" "}
			<em>which tradeoffs you're willing to accept</em>.
		</p>,
		<Grid key="2" cols={2} gap={6} className="my-8">
			<Card title="Monorepo">
				<p className="text-sm text-muted-foreground">
					<strong>All</strong> projects, services, and shared libraries live in a single Git repository. Tools like{" "}
					<strong>Nx, Turborepo, Bazel</strong> handle selective builds so only changed packages are rebuilt.
				</p>
			</Card>
			<Card title="Polyrepo">
				<p className="text-sm text-muted-foreground">
					Each service or library has its <strong>own Git repository</strong> with independent CI/CD pipelines,
					versioning, and access control. Dependencies are consumed via package registries (npm, Maven).
				</p>
			</Card>
		</Grid>,
		<Table
			key="3"
			headers={["Dimension", "Monorepo", "Polyrepo"]}
			rows={[
				[
					"Code Sharing",
					"Trivial — import directly from sibling packages.",
					"Requires publishing to a registry and versioning.",
				],
				[
					"Atomic Refactors",
					"One PR changes API + all consumers simultaneously.",
					"Requires coordinated multi-repo PRs and deployments.",
				],
				[
					"CI/CD Speed",
					"Slower without smart caching (Nx/Turborepo/Bazel).",
					"Fast — each repo only builds its own code.",
				],
				["Access Control", "Complex — CODEOWNERS files per directory.", "Native — repo-level permissions."],
				[
					"Git Performance",
					"Degrades with millions of files (needs sparse checkout).",
					"Always fast — repos stay small.",
				],
				[
					"Dependency Hell",
					"Single lockfile, one version of everything.",
					"Each repo can drift to incompatible versions.",
				],
			]}
		/>,
		<Callout key="4" type="info" title="The Real Answer (For Interviews)">
			Neither is universally better. <strong>Monorepos</strong> excel when teams share lots of code and need atomic
			cross-cutting changes. <strong>Polyrepos</strong> excel when teams are autonomous, deploy independently, and use
			different tech stacks. The best answer in an interview is to explain <em>both tradeoffs</em> and ask about the
			organization's team structure and deployment model.
		</Callout>,
	],
};
