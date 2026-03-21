import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";

export const microFrontendsTopic: Topic = {
  id: "micro-frontends",
  title: "Micro-Frontends",
  description:
    "How fifty enterprise developer teams can build one single giant website without murdering each other over deployment conflicts.",
  tags: ["frontend", "architecture"],
  icon: "Layers",
  content: [
    <p key="1">
      Micro-Frontends (MFE) apply the <strong>Microservices</strong> philosophy to the frontend. Instead of a single Monolith, the UI is split into independent apps (Remotes) that are stitched together by a <strong>Container (Host)</strong> at runtime.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Composition Strategies
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Vertical Split">
        <p className="text-sm text-muted-foreground mb-2">
          One team owns the <strong>entire page</strong> (e.g., Team Checkout owns <code>/checkout</code>).
        </p>
        <p className="text-xs italic text-muted-foreground">
          Simplest to implement. The Shell just swaps out the <code>Remote</code> based on the URL. Minimal cross-team friction.
        </p>
      </Card>
      <Card title="Horizontal Split">
        <p className="text-sm text-muted-foreground mb-2">
          Multiple teams own <strong>fragments of a single page</strong> (e.g., Search, Cart, Profile).
        </p>
        <p className="text-xs italic text-muted-foreground">
          Requires <strong>Module Federation</strong>. Multiple JS bundles are loaded simultaneously into one DOM. High complexity.
        </p>
      </Card>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Inner Engineering: Module Federation
    </h3>,
    <p key="5" className="mb-4">
      Modern MFE architectures use <strong>Module Federation</strong> (Webpack 5 / Vite) to share code at runtime without NPM installs.
    </p>,
    <Table
      key="6"
      headers={["Concept", "Technical Action", "Objective"]}
      rows={[
        ["Remote Entry", "A tiny manifest (JSON) fetched from a CDN at runtime.", "Tells the Shell exactly which JS chunks to download for a feature."],
        ["Shared Singletons", "Flags <code>react</code> or <code>lodash</code> as 'Shared' in the config.", "Prevents downloading 10 copies of React; the Shell provides its own instance."],
        ["Bidirectional Versioning", "Remotes can consume the Shell's dependencies and vice-versa.", "Allows independent team upgrades without breaking the global UI."]
      ]}
    />,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Inter-App Communication
    </h3>,
    <p key="8" className="mb-4 text-sm">
      How does Team "Cart" talk to Team "NavBar"? Use <strong>Browser Custom Events</strong> or a <strong>Global Event Bus</strong>. Avoid shared Redux stores as they create tight coupling and version conflicts.
    </p>,
    <Callout key="9" type="danger" title="The 'White Screen' Risk">
      Micro-frontends introduce a <strong>distributed failure model</strong>. If Team A's CDN goes down, the entire page might crash. Use <strong>Error Boundaries</strong> around every Remote to ensure that if one feature fails, the rest of the app remains functional.
    </Callout>,
  ],
};
