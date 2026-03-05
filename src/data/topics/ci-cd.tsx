import type { Topic } from "@/data/types";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const ciCdTopic: Topic = {
  id: "ci-cd-pipelines",
  title: "CI/CD Pipelines",
  description:
    "The automation engines that safely continuously integrate, test, and deploy code at scale.",
  tags: ["devops", "automation", "git"],
  icon: "GitMerge",
  content: [
    <p key="1">
      Before CI/CD, developers would merge code manually, run tests locally, and
      literally drag-and-drop binaries onto a production server via FTP. This
      was chaotic and highly prone to human error.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Continuous Integration (CI)
    </h4>,
    <p key="3">
      The practice of frequently merging developer code changes into a central
      repository, where automated builds and tests are run.
    </p>,
    <Step key="4" index={1}>
      <strong>Linting & Formatting:</strong> Analyzes raw code for syntax errors
      and style violations.
    </Step>,
    <Step key="5" index={2}>
      <strong>Compilation:</strong> If using TypeScript/Rust/Go, code is
      compiled. If it fails, the pipeline halts.
    </Step>,
    <Step key="6" index={3}>
      <strong>Automated Testing:</strong> Unit, integration, and E2E tests are
      executed in a headless environment. A single failed assertion aborts the
      merge process.
    </Step>,

    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      Continuous Deployment (CD)
    </h4>,
    <p key="8">
      The automated release of validated code to a repository (Delivery) or
      directly to live production servers (Deployment).
    </p>,
    <Step key="9" index={4}>
      <strong>Artifact Generation:</strong> Creating the immutable build,
      usually packaging it into a Docker Container.
    </Step>,
    <Step key="10" index={5}>
      <strong>Infrastructure as Code (IaC):</strong> Using tools like Terraform
      to ensure the cloud environment is provisioned correctly.
    </Step>,
    <Step key="11" index={6}>
      <strong>Rollout Strategy:</strong> Executing a Zero-Downtime deployment
      (e.g., Blue-Green or Canary deployment) to migrate live user traffic to
      the new version seamlessly.
    </Step>,

    <div key="12" className="mt-8">
      <Callout type="info" title="Popular Tools">
        GitHub Actions, GitLab CI, Jenkins, and CircleCI dominate this space,
        allowing pipelines to be defined declaratively in YAML files.
      </Callout>
    </div>,
  ],
};
