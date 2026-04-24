import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GitBranchPlus, Rocket } from "lucide-react";

export const jenkinsCicdDeepDiveTopic: Topic = {
  id: "jenkins-cicd-deep-dive",
  title: "Jenkins & CI/CD Under the Hood",
  description:
    "How Jenkins orchestrates automated build, test, and deploy pipelines — from webhook triggers and branch strategies to parallel execution and how it compares to GitHub Actions, GitLab CI, and CircleCI.",
  tags: ["devops", "jenkins", "ci/cd", "pipelines", "automation", "github-actions"],
  icon: "GitMerge",
  content: [
    <p key="1">
      <strong>Continuous Integration / Continuous Delivery (CI/CD)</strong> is the
      practice of automatically building, testing, and deploying code every time a
      change is pushed. Jenkins is one of the oldest and most widely deployed
      open-source CI/CD servers in the world. Understanding how it works — and how
      it compares to cloud-native alternatives — is essential for any engineer
      working on team-scale software.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      What Problem CI/CD Actually Solves
    </h3>,
    <p key="3">
      Before CI/CD, teams would integrate code infrequently — sometimes only at
      the end of a sprint. Bugs accumulated, merge conflicts were massive, and
      deployments were manual and error-prone. CI/CD collapses that feedback loop
      by making every commit a potential release candidate.
    </p>,
    <Grid key="4" cols={2} gap={6}>
      <FeatureCard icon={GitBranchPlus} title="Continuous Integration" subtitle="The 'CI' part" theme="cyan">
        <p className="mt-2 text-sm leading-relaxed text-cyan-100/75">
          Every push triggers a build and test run automatically. The goal is to
          detect integration failures immediately — within minutes of the commit —
          while the context is still fresh in the developer's mind.
        </p>
      </FeatureCard>
      <FeatureCard icon={Rocket} title="Continuous Delivery / Deployment" subtitle="The 'CD' part" theme="emerald">
        <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">
          After tests pass, the pipeline packages the artifact and either{" "}
          <strong>gates it for a manual release button</strong> (Continuous
          Delivery) or <strong>ships it to production automatically</strong>{" "}
          (Continuous Deployment). The distinction often depends on risk tolerance.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Jenkins Architecture: How It Is Structured
    </h3>,
    <p key="6">
      Jenkins operates on a <strong>controller/agent model</strong> (previously
      called master/slave). The controller handles scheduling, the UI, and
      configuration. Agents are the worker nodes that actually execute pipeline
      steps — they can run on bare-metal servers, VMs, Docker containers, or
      Kubernetes pods.
    </p>,
    <Table
      key="7"
      headers={["Component", "Role", "Where It Usually Lives"]}
      rows={[
        [
          "Jenkins Controller",
          "Schedules jobs, stores config, serves the Web UI, manages agent connections.",
          "Dedicated VM or container — never runs builds itself in production.",
        ],
        [
          "Agent / Node",
          "Executes the actual pipeline steps: compiles code, runs tests, builds Docker images.",
          "Separate VMs, containers, or Kubernetes pods. Scale out for parallel builds.",
        ],
        [
          "Executor",
          "A single build slot on an agent. An agent with 4 executors can run 4 concurrent builds.",
          "Configuration on the agent node.",
        ],
        [
          "Jenkinsfile",
          "The pipeline-as-code definition committed alongside the source code.",
          "Root of the repository (version-controlled).",
        ],
        [
          "Plugin Ecosystem",
          "1,800+ plugins extend Jenkins: Git, Docker, Kubernetes, Slack, AWS, Vault, etc.",
          "Installed on the controller, affects agent behavior.",
        ],
      ]}
    />,
    <Callout key="8" type="tip" title="Why Separate Controller From Agents?">
      Running builds on the controller is a security and stability risk. If a
      malicious build script escapes, it has access to the controller's secrets
      and config. Agents are isolated and disposable — if a build corrupts one,
      you throw it away and spin up a new one.
    </Callout>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Trigger Conditions: What Actually Fires a Pipeline?
    </h3>,
    <p key="10">
      This is where most people have a vague mental model. Jenkins does not
      magically "watch" Git. Every trigger method has a specific mechanism behind
      it.
    </p>,
    <Table
      key="11"
      headers={["Trigger Type", "Mechanism", "Common Use Case"]}
      rows={[
        [
          "SCM Webhook (most common)",
          "Git host (GitHub/GitLab/Bitbucket) sends an HTTP POST to Jenkins when a push/PR happens. Jenkins receives the event and immediately queues the job.",
          "Push to any branch, open a PR, merge to main.",
        ],
        [
          "SCM Polling",
          "Jenkins asks Git host 'any new commits?' on a schedule (e.g., every 5 min). Latency = polling interval. Wastes resources if nothing changed.",
          "Legacy setups where inbound webhooks are blocked by firewall.",
        ],
        [
          "Scheduled (cron)",
          "Jenkins cron syntax (`H 2 * * *`). Runs at a fixed time regardless of activity.",
          "Nightly integration tests, weekly security scans, scheduled deployments.",
        ],
        [
          "Upstream job trigger",
          "Another Jenkins job completing its run triggers this one. Forms a dependency chain between jobs.",
          "Build artifact → trigger deploy job.",
        ],
        [
          "Manual trigger",
          "A human clicks 'Build Now' or calls the Jenkins API. Used with 'input()' steps for gated deployments.",
          "Prod deploys requiring human approval.",
        ],
        [
          "Generic Webhook Trigger plugin",
          "Any external system can POST to a Jenkins endpoint. Parse the payload to decide what to build.",
          "Trigger builds from Jira tickets, Slack commands, custom tooling.",
        ],
      ]}
    />,
    <Callout key="12" type="warning" title="Webhook vs Polling: Always Prefer Webhooks">
      Polling introduces latency proportional to your poll interval. A 5-minute
      poll means a push at 12:01 won't be noticed until 12:05. Webhooks fire{" "}
      <strong>within seconds</strong> of the push event. Always configure webhooks
      when your network allows it.
    </Callout>,
    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      Branch-Based Trigger Strategy: What Branch Triggers What?
    </h3>,
    <p key="14">
      This is the part that varies by team, but there are established patterns.
      The key tool in Jenkins is the{" "}
      <strong>Multibranch Pipeline</strong>, which automatically discovers branches
      and PRs in a repository and creates a pipeline for each one.
    </p>,
    <Table
      key="15"
      headers={["Branch / Event", "What Typically Triggers", "Why"]}
      rows={[
        [
          "Any feature branch push",
          "Compile + unit tests only. Fast, cheap feedback. Often 2–5 min.",
          "Developers push frequently. You want immediate but lightweight feedback.",
        ],
        [
          "Pull Request / Merge Request opened",
          "Full CI suite: lint + unit + integration tests. Possibly code coverage, static analysis.",
          "The PR is a candidate to enter a stable branch. Higher confidence required.",
        ],
        [
          "Merge to `dev` / `develop`",
          "CI suite + build Docker image + deploy to development environment.",
          "`dev` represents the integrated state of the team's current sprint work.",
        ],
        [
          "Merge to `staging` / `release`",
          "Full CI + E2E tests + deploy to staging environment + smoke tests.",
          "Staging mirrors production. Gates before going live.",
        ],
        [
          "Merge to `main` / `master`",
          "Full CI + build production artifact + deploy to production (or queue for approval).",
          "This is the source of truth for live software.",
        ],
        [
          "Tag / release push",
          "Build versioned artifact, publish to registry, create release notes.",
          "Explicit versioning for package releases or semantic versioning workflows.",
        ],
      ]}
    />,
    <CodeBlock
      key="16"
      title="Jenkinsfile — Declarative Pipeline With Branch Conditions"
      language="groovy"
      code={`pipeline {
  agent any

  triggers {
    // GitHub sends a webhook → Jenkins fires immediately
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Lint') {
      steps {
        sh 'npm ci'
        sh 'npm run lint'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm run test:unit'
      }
    }

    // Only run integration tests on PR or dev/main branches
    stage('Integration Tests') {
      when {
        anyOf {
          branch 'main'
          branch 'dev'
          changeRequest()   // PR / MR builds
        }
      }
      steps {
        sh 'npm run test:integration'
      }
    }

    // Only build & push Docker image on dev or main
    stage('Build Docker Image') {
      when {
        anyOf { branch 'main'; branch 'dev' }
      }
      steps {
        sh 'docker build -t myapp:\${GIT_COMMIT} .'
        sh 'docker push registry.example.com/myapp:\${GIT_COMMIT}'
      }
    }

    // Deploy to dev environment on merge to dev
    stage('Deploy → Dev') {
      when { branch 'dev' }
      steps {
        sh './deploy.sh dev \${GIT_COMMIT}'
      }
    }

    // Gated production deploy — requires human approval
    stage('Deploy → Production') {
      when { branch 'main' }
      steps {
        input message: 'Deploy to production?', ok: 'Ship It'
        sh './deploy.sh prod \${GIT_COMMIT}'
      }
    }
  }

  post {
    failure {
      slackSend channel: '#ci-alerts', message: "Build FAILED: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
    }
    success {
      slackSend channel: '#ci-alerts', message: "Build passed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
    }
  }
}`}
    />,
    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      How Jenkins Speeds Up the Pipeline
    </h3>,
    <p key="18">
      A naive pipeline runs every step sequentially. A well-optimized Jenkins
      pipeline uses several techniques to cut wall-clock time dramatically.
    </p>,
    <Grid key="19" cols={2} gap={6}>
      <Card title="Parallel Stages" description="Run independent steps at the same time">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Jenkins declarative pipelines support a <code>parallel</code> block.
          If unit tests, linting, and security scans are independent, they can
          all run simultaneously. If each takes 3 minutes and you have 3 agents,
          total time is 3 min instead of 9 min.
        </p>
      </Card>
      <Card title="Distributed Agents" description="Horizontal scale for builds">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Jenkins can launch agents on demand — Kubernetes plugin spins up a
          fresh pod per build, runs it, then destroys it. No queue waiting for a
          shared agent. Cost scales with demand instead of paying for idle
          machines.
        </p>
      </Card>
      <Card title="Dependency Caching" description="Don't redownload what hasn't changed">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Cache <code>node_modules</code>, Maven <code>.m2</code>, or Gradle
          caches between runs using the Jenkins Workspace or an external cache
          layer (S3, Artifactory). A warm cache turns a 4-minute{" "}
          <code>npm install</code> into a 10-second restore.
        </p>
      </Card>
      <Card title="Incremental Builds" description="Only rebuild what changed">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          In monorepos, tools like Nx or Turborepo detect which packages changed
          and only run tests for affected modules. Jenkins triggers the build;
          the build tool decides what to actually execute.
        </p>
      </Card>
      <Card title="Test Splitting" description="Divide test suite across agents">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Large test suites can be split across multiple agents. Jenkins collects
          and merges JUnit XML reports from all agents afterward. A 30-minute
          test suite distributed across 10 agents takes ~3 minutes.
        </p>
      </Card>
      <Card title="Docker Layer Caching" description="Reuse image layers">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Structure Dockerfiles so infrequently changing layers (OS, dependencies)
          come first. Jenkins with a local Docker daemon or BuildKit reuses cached
          layers, cutting image build time from minutes to seconds when only app
          code changes.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="20"
      title="Jenkinsfile — Parallel Stages Example"
      language="groovy"
      code={`stage('Parallel Checks') {
  parallel {
    stage('Unit Tests') {
      steps { sh 'npm run test:unit' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Security Scan') {
      steps { sh 'npm audit --audit-level=high' }
    }
    stage('Type Check') {
      steps { sh 'npx tsc --noEmit' }
    }
  }
  // All 4 stages run simultaneously — wall time = slowest stage, not sum
}`}
    />,
    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      The Full Jenkins Pipeline Lifecycle
    </h3>,
    <Flow
      key="22"
      steps={[
        {
          title: "1. Developer pushes code",
          description:
            "A git push to GitHub/GitLab triggers a webhook HTTP POST to the Jenkins controller within 1–2 seconds.",
        },
        {
          title: "2. Controller queues the build",
          description:
            "Jenkins controller parses the webhook payload, identifies the matching Multibranch Pipeline job, and adds a build to the queue.",
        },
        {
          title: "3. Agent is allocated",
          description:
            "An available agent (or a newly launched Kubernetes pod) is assigned. The workspace is checked out from Git.",
        },
        {
          title: "4. Stages execute sequentially (or in parallel)",
          description:
            "Each stage runs its steps. Parallel blocks fan out to multiple agents simultaneously. Results are reported back to the controller.",
        },
        {
          title: "5. Artifacts are archived",
          description:
            "Build outputs — JARs, Docker images, test reports, coverage data — are pushed to registries or artifact stores (Artifactory, Nexus, S3, ECR).",
        },
        {
          title: "6. Deploy stage (conditional)",
          description:
            "Conditional 'when' blocks decide whether to deploy. A gated stage pauses and waits for a human to click 'Approve' before proceeding to production.",
        },
        {
          title: "7. Post-build actions",
          description:
            "Notifications (Slack, email), test report publishing, badge updates on GitHub PRs, and workspace cleanup happen in the 'post' block.",
        },
      ]}
    />,
    <h3 key="23" className="text-xl font-bold mt-8 mb-4">
      Jenkins vs The Modern Alternatives
    </h3>,
    <p key="24">
      Jenkins was built in 2004 (originally as Hudson). The landscape has changed
      significantly. Here is how it compares to the dominant modern platforms.
    </p>,
    <Table
      key="25"
      headers={["Dimension", "Jenkins", "GitHub Actions", "GitLab CI", "CircleCI"]}
      rows={[
        [
          "Hosting model",
          "Self-hosted only (you manage the server, updates, plugins)",
          "Cloud-native SaaS; self-hosted runners available",
          "SaaS (gitlab.com) or self-hosted (GitLab Runner)",
          "SaaS-first; self-hosted runners available",
        ],
        [
          "Pipeline definition",
          "Jenkinsfile (Groovy DSL — declarative or scripted)",
          "YAML workflows in `.github/workflows/`",
          "YAML in `.gitlab-ci.yml`",
          "YAML in `.circleci/config.yml`",
        ],
        [
          "Setup complexity",
          "High — install controller, configure agents, install plugins, manage secrets",
          "Zero — already integrated with GitHub repositories",
          "Low — built into GitLab, just add the YAML file",
          "Low — link repo, add YAML file, done",
        ],
        [
          "Plugin ecosystem",
          "1,800+ plugins — biggest ecosystem but quality varies; plugin conflicts are common",
          "GitHub Marketplace (Actions) — large, curated, community actions",
          "Built-in integrations; Docker, Kubernetes, Terraform native support",
          "Orbs (reusable config packages) — smaller but high quality",
        ],
        [
          "Parallel execution",
          "Excellent — native parallel blocks, matrix builds, distributed agents",
          "Good — matrix strategy, jobs run in parallel by default",
          "Excellent — parallel jobs, DAG pipelines, needs: dependency graph",
          "Good — parallelism with resource classes",
        ],
        [
          "Cost model",
          "Free software but you pay for servers, maintenance, + ops time",
          "Free for public repos; GitHub-hosted minutes charged for private",
          "Free tier on gitlab.com; compute minutes model",
          "Free tier available; per-credit compute pricing",
        ],
        [
          "Native secret management",
          "Jenkins Credentials store (OK, but basic). Integrates with Vault/AWS.",
          "GitHub Encrypted Secrets + OIDC to cloud providers",
          "GitLab CI Variables (masked/protected) + Vault integration",
          "CircleCI Contexts for shared secrets across projects",
        ],
        [
          "Scalability",
          "Horizontally scalable with agents; Kubernetes plugin for on-demand pods",
          "GitHub scales managed runners; self-hosted runners scale manually",
          "GitLab Runner autoscales on cloud via Fleeting plugin",
          "CircleCI scales runners automatically on their cloud",
        ],
        [
          "Learning curve",
          "Steep — Groovy DSL, plugin management, agent configuration",
          "Gentle — YAML, well-documented, huge community examples",
          "Moderate — YAML with GitLab-specific concepts (stages, needs, rules)",
          "Moderate — YAML plus CircleCI-specific Orbs and resource classes",
        ],
        [
          "Best fit",
          "Complex enterprise pipelines, on-prem requirements, heavy customization",
          "Projects hosted on GitHub; fast setup; open-source projects",
          "Projects fully within GitLab; built-in security scanning, registry",
          "Teams wanting simplicity and fast SaaS pipelines without GitHub lock-in",
        ],
      ]}
    />,
    <Callout key="26" type="tip" title="The Modern Trend: YAML-Native Over Groovy">
      Jenkins' Groovy DSL is powerful but verbose and error-prone. GitHub Actions,
      GitLab CI, and CircleCI all use simpler YAML. The industry has largely moved
      toward{" "}
      <strong>
        declarative YAML pipelines colocated with source code
      </strong>
      , treating the pipeline as just another file in the repo. Jenkins adopted
      this with its Declarative Pipeline syntax, but YAML-native tools have a
      head start on ergonomics.
    </Callout>,
    <h3 key="27" className="text-xl font-bold mt-8 mb-4">
      When Jenkins Still Wins
    </h3>,
    <Grid key="28" cols={2} gap={6}>
      <Card title="Air-Gapped / On-Premise" description="No cloud allowed">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Banks, defense contractors, and regulated industries often cannot or
          will not send code to cloud CI providers. Jenkins runs entirely
          on-premises with no external dependency.
        </p>
      </Card>
      <Card title="Complex Multi-System Orchestration" description="Beyond simple build-test-deploy">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Jenkins excels at orchestrating complex, multi-team pipelines that span
          multiple repositories, artifact systems, environments, and approval
          gates — all wired together through its plugin ecosystem.
        </p>
      </Card>
      <Card title="Legacy Enterprise Investments" description="Already standardized on Jenkins">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Many enterprises have years of shared libraries, custom plugins, and
          team knowledge invested in Jenkins. Migration costs are real. Jenkins
          remains the dominant tool in large enterprise environments.
        </p>
      </Card>
      <Card title="Maximum Flexibility" description="Build anything">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Because Jenkins runs your own servers with your own plugins, you can
          wire nearly any tool into it. Building a pipeline that triggers a
          mainframe job, sends an MQTT message, and deploys to an on-prem
          Kubernetes cluster is entirely achievable.
        </p>
      </Card>
    </Grid>,
    <h3 key="29" className="text-xl font-bold mt-8 mb-4">
      Shared Libraries: Jenkins' Answer To DRY Pipelines
    </h3>,
    <p key="30">
      When you have dozens of repositories all doing similar CI steps, copying a
      Jenkinsfile into each one creates maintenance pain. Jenkins Shared Libraries
      solve this by storing reusable pipeline code in a separate Git repository
      and importing it like a module.
    </p>,
    <CodeBlock
      key="31"
      title="Jenkinsfile — Using a Shared Library"
      language="groovy"
      code={`// Load the shared library from the configured Git repo
@Library('my-company-pipeline-lib@main') _

// Call a reusable function defined in vars/deployService.groovy
deployService(
  serviceName: 'payment-api',
  dockerImage: "registry.example.com/payment-api:\${GIT_COMMIT}",
  environment: 'dev',
  healthCheckUrl: 'https://payment-api.dev.example.com/health'
)`}
    />,
    <Callout key="32" type="tip" title="The Bottom Line">
      Jenkins is the most flexible CI/CD tool ever built — and also one of the
      most operationally demanding. For greenfield projects on GitHub, GitHub
      Actions removes nearly all of that overhead. For established enterprises
      with on-prem requirements or complex multi-system pipelines, Jenkins
      remains the choice with the deepest capability. The right answer depends on
      your <strong>hosting constraints</strong>,{" "}
      <strong>team's existing expertise</strong>, and how much{" "}
      <strong>operational overhead</strong> you are willing to absorb for maximum
      flexibility.
    </Callout>,
  ],
};
