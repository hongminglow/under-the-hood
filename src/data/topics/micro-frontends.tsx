import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const microFrontendsTopic: Topic = {
  id: "micro-frontends",
  title: "Micro-Frontends",
  description:
    "The microservices approach applied to frontend: independent teams, independent deploys, and one unified user experience.",
  tags: ["frontend", "architecture", "scaling", "devops"],
  icon: "LayoutGrid",
  content: [
    <p key="1">
      In large organizations, a <strong>monolithic frontend</strong> becomes a
      bottleneck: 20 teams committing to one React app, one CI/CD pipeline, one
      deployment artifact. <strong>Micro-frontends</strong> split the UI into{" "}
      <strong>
        independently developed, tested, and deployed applications
      </strong>{" "}
      that compose into a single user experience.
    </p>,
    <Table
      key="2"
      headers={["Approach", "How It Works", "Tradeoff"]}
      rows={[
        [
          "Module Federation (Webpack 5)",
          "Load remote webpack bundles at runtime",
          "Best DX, shared dependencies, complex config",
        ],
        [
          "iframe Isolation",
          "Each micro-app in its own iframe",
          "True isolation, but styling/communication is painful",
        ],
        [
          "Web Components",
          "Custom elements with Shadow DOM",
          "Framework-agnostic, native browser support",
        ],
        [
          "Build-time Composition",
          "npm packages assembled at build time",
          "Simple, but not independently deployable",
        ],
        [
          "Route-based (single-spa)",
          "Different apps own different URL paths",
          "Clean ownership, routing can be complex",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="✅ When Micro-Frontends Win">
        <p className="text-sm">
          <strong>Large orgs</strong> (10+ frontend teams). Teams need{" "}
          <strong>independent deployment</strong> (Team A deploys without
          waiting for Team B). Different parts of the app use{" "}
          <strong>different frameworks</strong> (React header, Vue dashboard).{" "}
          <strong>Conway's Law</strong> — match architecture to team structure.
        </p>
      </Card>
      <Card title="❌ When They're Overkill">
        <p className="text-sm">
          Small teams (&lt;5 devs) — the overhead of sharing state, styles, and
          routing across micro-apps isn't worth it.{" "}
          <strong>Consistent UX</strong> becomes harder (each app can diverge).{" "}
          <strong>Performance</strong> — multiple frameworks = larger bundles.
          Tooling complexity explodes.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="info" title="Module Federation: The Modern Standard">
      Webpack 5's <strong>Module Federation</strong> lets multiple independently
      built apps share modules at runtime. App A exposes a <code>Header</code>{" "}
      component; App B consumes it — no npm publish cycle. Shared dependencies
      (React, lodash) load once. This is the dominant micro-frontend approach in
      2025.
    </Callout>,
  ],
};
