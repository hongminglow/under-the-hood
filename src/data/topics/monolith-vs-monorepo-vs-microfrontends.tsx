import type { Topic } from "@/data/types";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const monolithVsMonorepoVsMicrofrontendsTopic: Topic = {
  id: "monolith-vs-monorepo-vs-microfrontends",
  title: "Monolith vs Monorepo vs Micro-Frontends",
  description:
    "These are often confused because they sound similar, but they solve different problems: deployment boundaries, repo boundaries, and UI composition boundaries.",
  tags: ["architecture", "system-design", "devops", "frontend", "org-design"],
  icon: "Sitemap",
  content: [
    <p key="1">
      A lot of architecture debates go in circles because people compare patterns
      that live on <strong>different axes</strong>. <strong>Monolith vs
      microservices</strong> is about <em>runtime deployment boundaries</em>.
      <strong>Monorepo vs polyrepo</strong> is about <em>source control and
      change management boundaries</em>. <strong>Micro-frontends</strong> is
      about <em>frontend ownership and UI composition boundaries</em>.
    </p>,
    <Callout key="2" type="info" title="They are not competing patterns">
      You can run microservices in a monorepo. You can build a monolith in a
      polyrepo. You can ship micro-frontends from a monorepo. The real question
      is: <Highlight variant="primary">which boundary do you need</Highlight>{" "}
      and what overhead are you willing to pay to get it?
    </Callout>,
    <Table
      key="3"
      headers={["Pattern", "Boundary Type", "What It Optimizes", "Hidden Cost", "Use When"]}
      rows={[
        [
          "Monolith",
          "Deployment",
          "Simplicity, fast local dev, easy debugging",
          "One deploy pipeline becomes a bottleneck as teams grow",
          "Small to medium teams, one domain, tight coordination",
        ],
        [
          "Modular Monolith",
          "Deployment + code boundaries",
          "Monolith simplicity with strict internal module boundaries",
          "Requires discipline: boundaries are conventions, not network",
          "You want a safe default with a clear extraction path",
        ],
        [
          "Microservices",
          "Deployment + data boundaries",
          "Team autonomy, independent deploys, scaling per service",
          "Distributed systems tax: tracing, ops, eventual consistency",
          "Large orgs with multiple bounded contexts and real autonomy needs",
        ],
        [
          "Monorepo",
          "Repository",
          "Atomic refactors, shared libs, consistent tooling",
          "Needs build orchestration (caching, affected builds, CI scaling)",
          "Many apps/services share code and change together frequently",
        ],
        [
          "Polyrepo",
          "Repository",
          "Hard isolation, independent versioning, simpler per-repo CI",
          "Cross-repo refactors are painful; dependency version drift",
          "Teams are truly independent and share minimal code",
        ],
        [
          "Micro-Frontends",
          "UI composition",
          "Independent frontend deploys aligned to team ownership",
          "UX consistency + shared state + bundle/runtime complexity",
          "10+ frontend teams or fragmented ownership causing release traffic jams",
        ],
      ]}
    />,
    <Grid key="4" cols={3} gap={6} className="my-8">
      <Card title="Axis 1: Deployment Boundary">
        <p className="text-sm">
          Monolith vs microservices is mainly about{" "}
          <Highlight variant="primary">how many deployables</Highlight> you run
          in production and how failures/rollouts behave. The win is independent
          deploys. The cost is distributed systems complexity.
        </p>
      </Card>
      <Card title="Axis 2: Repo Boundary">
        <p className="text-sm">
          Monorepo vs polyrepo is about{" "}
          <Highlight variant="primary">how changes flow</Highlight> through the
          organization: atomic refactors and shared tooling vs strong isolation
          and independent versioning.
        </p>
      </Card>
      <Card title="Axis 3: UI Boundary">
        <p className="text-sm">
          Micro-frontends are about{" "}
          <Highlight variant="primary">frontend team autonomy</Highlight>. The
          win is independent release. The cost is runtime composition: shared
          dependencies, styling, routing, and state.
        </p>
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-10 mb-4">
      Common “good” combinations (what most mature orgs converge to)
    </h4>,
    <Table
      key="6"
      headers={["Org Stage", "Backend", "Repo Strategy", "Frontend", "Why It Works"]}
      rows={[
        [
          "Early (1-10 devs)",
          "Modular monolith",
          "Monorepo",
          "Single SPA",
          "Fast iteration, lowest ops overhead, clean boundaries from day 1",
        ],
        [
          "Growth (10-50 devs)",
          "Monolith + selective service extraction",
          "Monorepo (with Nx/Turbo/Bazel)",
          "Single SPA or route-based ownership",
          "Keep velocity while extracting only proven bottlenecks",
        ],
        [
          "Large (50+ devs)",
          "Microservices (bounded contexts)",
          "Monorepo or polyrepo (both can work)",
          "Micro-frontends (only if needed)",
          "Align architecture to team topology and release autonomy",
        ],
      ]}
    />,
    <Callout key="7" type="warning" title="The #1 failure mode: distributed monolith">
      Microservices without true ownership boundaries often become a “distributed
      monolith”: shared databases, tight coupling, synchronized deploys, and
      constant cross-team coordination, but with all the latency and observability
      pain of a distributed system.
    </Callout>,
    <h4 key="8" className="text-xl font-bold mt-10 mb-4">
      Decision checklist (fast, practical)
    </h4>,
    <div key="9" className="mt-6">
      <Step index={1}>
        <strong>Start with the boundary you need:</strong> do you need
        independent backend deploys (microservices), independent frontend deploys
        (micro-frontends), or just better code sharing and refactoring (monorepo)?
      </Step>
      <Step index={2}>
        <strong>Validate the organizational driver:</strong> if you can’t name a
        concrete bottleneck (release traffic jam, team interference, domain scale),
        prefer the simpler default (modular monolith + monorepo).
      </Step>
      <Step index={3}>
        <strong>Budget for the tax:</strong> microservices require strong ops
        (CI/CD, observability, SRE maturity). micro-frontends require strong UI
        governance (design system, shared routing/state strategy).
      </Step>
    </div>,
    <h4 key="10" className="text-xl font-bold mt-10 mb-4">
      Example structures (what “it looks like” in a repo)
    </h4>,
    <CodeBlock
      key="11"
      language="text"
      title="Typical monorepo (apps + packages)"
      code={`repo/
  apps/
    web/            # SPA (or shell for micro-frontends)
    admin/
    api/            # monolith or gateway
  packages/
    ui/             # design system
    shared/         # shared utilities, types
    config/         # lint/tsconfig/tailwind presets
  tools/
    scripts/`}
    />,
    <CodeBlock
      key="12"
      language="text"
      title="Micro-frontend monorepo (shell + remotes)"
      code={`repo/
  apps/
    shell/          # host container (routing, layout, auth)
    checkout/       # remote
    catalog/        # remote
    profile/        # remote
  packages/
    ui/
    shared/
    auth/`}
    />,
    <Callout key="13" type="tip" title="How to answer this in interviews">
      Separate the axes out loud: deployment boundary (monolith/microservices),
      repo boundary (monorepo/polyrepo), and UI boundary (micro-frontends). Then
      recommend a default path: <strong>modular monolith + monorepo</strong>,
      extracting services or micro-frontends only when a specific scaling wall
      appears.
    </Callout>,
  ],
};

