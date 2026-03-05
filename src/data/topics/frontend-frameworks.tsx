import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const frontendFrameworksTopic: Topic = {
  id: "frontend-frameworks",
  title: "React vs Vue vs Angular",
  description:
    "Analyzing the mental models, rendering strategies, and reactivity systems of the Big Three frontend powerhouses.",
  tags: ["frontend", "javascript", "react", "vue", "angular"],
  icon: "LayoutTemplate",
  content: [
    <p key="1">
      Modern web development is dominated by Single Page Application (SPA)
      architectures. Instead of rendering HTML on the server, the browser
      downloads an empty shell and a massive JavaScript bundle that mounts the
      UI based on state.
    </p>,
    <Grid key="2" cols={3} gap={6} className="my-8">
      <Card title="React (Meta)">
        <p className="mb-4 text-sm text-muted-foreground">
          The Unopinionated Library
        </p>
        <ul className="space-y-2 text-sm list-disc pl-4">
          <li>
            <strong>Mental Model:</strong> UI is a pure function of State [ UI =
            f(state) ].
          </li>
          <li>
            <strong>Reactivity:</strong> Pull-based. When state updates, it
            re-renders the component tree and runs a diff against the Virtual
            DOM.
          </li>
          <li>
            <strong>Ecosystem:</strong> Massive, but fragmented. You bring your
            own router and state manager.
          </li>
        </ul>
      </Card>
      <Card title="Vue.js (Evan You)">
        <p className="mb-4 text-sm text-muted-foreground">
          The Progressive Framework
        </p>
        <ul className="space-y-2 text-sm list-disc pl-4">
          <li>
            <strong>Mental Model:</strong> HTML templates compiled to render
            functions with fine-grained reactive dependencies.
          </li>
          <li>
            <strong>Reactivity:</strong> Push-based via Proxies. It knows
            exactly which components depend on which pieces of state.
          </li>
          <li>
            <strong>Ecosystem:</strong> Core libraries (Router, Pinia) are
            officially maintained, striking a balance.
          </li>
        </ul>
      </Card>
      <Card title="Angular (Google)">
        <p className="mb-4 text-sm text-muted-foreground">
          The Enterprise Behemoth
        </p>
        <ul className="space-y-2 text-sm list-disc pl-4">
          <li>
            <strong>Mental Model:</strong> MVC architecture with strong OOP
            patterns, Dependency Injection, and heavy TypeScript.
          </li>
          <li>
            <strong>Reactivity:</strong> Traditionally Zone.js (dirty checking),
            transitioning to Signals for fine-grained reactivity.
          </li>
          <li>
            <strong>Ecosystem:</strong> Batteries included. Everything (routing,
            HTTP client, forms) is built-in and standardized.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="3" type="warning" title="The Virtual DOM Myth">
      React popularized the Virtual DOM algorithm because DOM operations were
      inherently slow. However, modern frameworks like Svelte or Solid.js prove
      that ditching the Virtual DOM and using direct, surgically precise DOM
      updates via Signals can yield significantly faster performance.
    </Callout>,
  ],
};
