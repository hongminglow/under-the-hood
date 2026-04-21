import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const reactServerComponentsTopic: Topic = {
  id: "react-server-components",
  title: "React Server Components",
  description:
    "Why rendering UI logic strictly on the physical backend node server solves massive Javascript execution issues.",
  tags: ["frontend", "architecture", "react"],
  icon: "Cpu",
  content: [
    <p key="1">
      React Server Components (RSC) represent a paradigm shift in web architecture. Unlike traditional SSR, which is a "one-off" HTML generation, RSC is a <strong>Continuous Serialization Stream</strong> that allows the server and client to share a single component tree.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      SSR vs. RSC: The Technical Breakdown
    </h3>,
    <Table
      key="3"
      headers={["Feature", "SSR (Server Side Rendering)", "RSC (Server Components)"]}
      rows={[
        ["Payload", "Sends <strong>HTML</strong> for the initial page load.", "Sends <strong>RSC Stream (Flight)</strong> for dynamic UI updates."],
        ["State", "Loses all client state on navigation (full page).", "Preserves client state (inputs, scroll) during updates."],
        ["Bundle Size", "Frontend JS includes all component code.", "Component code stays on the server (0kb JS sent)."],
        ["Interactivity", "Requires <strong>Hydration</strong> to become interactive.", "Non-interactive; only Client Components hydrate."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Inner Workings: Flight Format
    </h3>,
    <p key="5" className="mb-4">
      When you navigate in an RSC app, the server doesn't send HTML. It sends a specialized <strong>Flight Stream</strong> (JSON-like text).
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Async Components">
        <p className="text-sm text-muted-foreground mb-2">
          Server Components can be <code>async</code>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          You can <code>await db.query()</code> directly inside the component body. No <code>useEffect</code> or <code>fetch()</code> waterfalls are needed.
        </p>
      </Card>
      <Card title="Server Actions">
        <p className="text-sm text-muted-foreground mb-2">
          The built-in RPC (Remote Procedure Call) layer.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Functions marked with <code>'use server'</code> can be called directly from client buttons. React handles the POST request and state synchronization automatically.
        </p>
      </Card>
    </Grid>,
    <Callout key="7" type="warning" title="The Serialization Boundary">
      When passing data from a Server Component to a Client Component, the data <strong>must be serializable</strong>. You cannot pass functions or Class instances because they cannot be represented in the Flight Stream.
    </Callout>,
  ],
};
