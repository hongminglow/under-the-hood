import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const stateManagementTopic: Topic = {
  id: "state-management",
  title: "State Management",
  description:
    "Why you should absolutely stop drilling twenty props through ten useless middle-man React components.",
  tags: ["frontend", "architecture", "react"],
  icon: "Database",
  content: [
    <p key="1">
      State management is the <strong>Synchronization of Truth</strong> across a UI. In React, state is local by default, but complex apps require <strong>Global Shared State</strong> to prevent the "Prop Drilling" nightmare.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Context vs. External Store Debate
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="React Context (Built-in)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>How it works:</strong> Injects data into the React Tree via a Provider.
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong>Cons:</strong> Updating a single value re-renders <em>all</em> consumers.</li>
          <li><strong>Cons:</strong> No built-in selector logic.</li>
          <li><strong>Best For:</strong> Static data like Themes or User Auth.</li>
        </ul>
      </Card>
      <Card title="External Stores (Zustand/Redux)">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>How it works:</strong> An immutable object lives <em>outside</em> React.
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong>Pros:</strong> Atomic updates via "Selectors".</li>
          <li><strong>Pros:</strong> Middleware support (logging, persistence).</li>
          <li><strong>Best For:</strong> High-frequency state like Carts or Forms.</li>
        </ul>
      </Card>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Technical "Why": Fine-Grained Reactivity
    </h3>,
    <p key="5">
      Modern libraries like <strong>Zustand</strong> use a <code>subscribeWithSelector</code> pattern. Instead of React watching the whole object, the library only triggers a re-render if the specific <em>property</em> you selected (e.g., <code>state.cartCount</code>) has changed by reference. This massive optimization prevents "Zombie Renders" in large dashboard UIs.
    </p>,
    <Callout key="6" type="tip" title="Server State vs. Client State">
      Don't store API data in Redux! Use <strong>React Query (TanStack)</strong>. It handles caching, revalidation, and loading states automatically, leaving your global state manager to handle only "Unsaved" local UI transitions.
    </Callout>,
  ],
};
