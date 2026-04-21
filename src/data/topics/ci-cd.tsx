import type { Topic } from "@/data/types";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Flow } from "@/components/ui/Flow";

export const ciCdTopic: Topic = {
	id: "ci-cd-pipelines",
	title: "CI/CD Pipelines",
	description: "The automation engines that safely continuously integrate, test, and deploy code at scale.",
	tags: ["devops", "automation", "git"],
	icon: "GitMerge",
	content: [
		<p key="1">
			Before CI/CD, developers would merge code manually, run tests locally, and literally drag-and-drop binaries onto a
			production server via FTP. This was chaotic and highly prone to human error. Modern CI/CD pipelines automate the
			entire journey from code commit to production traffic.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			Continuous Integration (CI)
		</h3>,
		<p key="2a" className="mb-4">
			The practice of frequently merging developer code changes into a central repository, where automated builds and
			tests run on every single push. The goal is to catch bugs <strong>within minutes</strong> of introduction, not
			days later during a manual QA cycle.
		</p>,
		<Step key="3" index={1}>
			<strong>Linting & Formatting:</strong> Analyzes raw code for syntax errors and style violations (ESLint, Prettier,
			Ruff). Enforces consistency across the entire team without code review overhead.
		</Step>,
		<Step key="4" index={2}>
			<strong>Compilation & Type Check:</strong> If using TypeScript/Rust/Go, code is compiled. If it fails, the
			pipeline halts immediately. This is the cheapest possible place to catch structural errors.
		</Step>,
		<Step key="5" index={3}>
			<strong>Automated Testing:</strong> Unit, integration, and E2E tests are executed in a headless environment. A
			single failed assertion aborts the merge process. Tests run in parallel containers for speed.
		</Step>,
		<Step key="6" index={4}>
			<strong>Security Scanning:</strong> Static Application Security Testing (SAST) and dependency vulnerability
			scanning (Snyk, Trivy, Dependabot) flag known CVEs before they reach production.
		</Step>,

		<h3 key="7" className="text-xl font-bold mt-8 mb-4">
			Continuous Delivery vs. Continuous Deployment
		</h3>,
		<Table
			key="8"
			headers={["Concept", "What Happens", "Human Involvement"]}
			rows={[
				[
					"Continuous Delivery",
					"Every commit that passes CI produces a release-ready artifact. Deployment to production requires a manual approval gate.",
					"A human clicks 'Deploy' after reviewing the staging environment.",
				],
				[
					"Continuous Deployment",
					"Every commit that passes CI is automatically deployed to production with zero human intervention.",
					"Fully automated. Requires extremely high test confidence and robust rollback.",
				],
			]}
		/>,

		<h3 key="9" className="text-xl font-bold mt-8 mb-4">
			Environment Promotion Chain
		</h3>,
		<p key="9a" className="mb-4">
			A well-architected CD pipeline promotes the <strong>same immutable artifact</strong> through progressively
			stricter environments. The code is never rebuilt — only the configuration changes.
		</p>,
		<Flow
			key="10"
			steps={[
				{ title: "Build", description: "CI produces a Docker image tagged with the Git SHA (e.g., app:a1b2c3d)." },
				{ title: "Dev / Preview", description: "Artifact auto-deploys. Developers verify feature branches." },
				{ title: "Staging", description: "Mirrors production. QA and integration tests run against real data shapes." },
				{ title: "Production", description: "Traffic shifts via Blue-Green, Canary, or Rolling strategy." },
			]}
		/>,

		<h3 key="11" className="text-xl font-bold mt-8 mb-4">
			Pipeline-as-Code
		</h3>,
		<p key="11a" className="mb-4">
			Modern pipelines are defined declaratively in version-controlled YAML files that live alongside the application
			code. This means the pipeline itself is peer-reviewed, auditable, and reproducible.
		</p>,
		<Grid key="12" cols={2} gap={6} className="my-8">
			<Card title="Why YAML?">
				<p className="text-sm text-muted-foreground">
					YAML pipelines (<code>.github/workflows/</code>, <code>.gitlab-ci.yml</code>, <code>Jenkinsfile</code>) are
					declarative, human-readable, and diffable in pull requests. Infrastructure teams can review pipeline changes
					with the same rigor as application code.
				</p>
			</Card>
			<Card title="Artifact Immutability">
				<p className="text-sm text-muted-foreground">
					A core principle: <strong>build once, deploy everywhere</strong>. The Docker image promoted to production is
					byte-for-byte identical to what ran in staging. Environment differences are injected via environment
					variables, never baked into the image.
				</p>
			</Card>
		</Grid>,

		<Callout key="13" type="info" title="Popular CI/CD Platforms">
			<strong>GitHub Actions</strong> (YAML, tight GitHub integration), <strong>GitLab CI</strong> (built-in container
			registry),
			<strong>Jenkins</strong> (self-hosted, infinitely customizable), <strong>CircleCI</strong> (fast parallelism),
			and&nbsp;
			<strong>Harness</strong> (AI-powered deployment verification). Each supports pipeline-as-code and container-based
			runners.
		</Callout>,

		<Callout key="14" type="warning" title="The 'Works on My Machine' Trap">
			If your CI runner uses a different Node/Python version than your local machine, tests pass locally but fail in CI.
			Solution: run CI inside <strong>Docker containers</strong> with pinned base images, so every developer and every
			pipeline run uses the exact same environment.
		</Callout>,
	],
};
