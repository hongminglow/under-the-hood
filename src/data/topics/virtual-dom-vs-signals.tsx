import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const virtualDomVsSignalsTopic: Topic = {
  id: "virtual-dom-vs-signals",
  title: "Virtual DOM vs Signals",
  description:
    "Why new heavily hyped frameworks are officially abandoning React's core VDOM architecture entirely.",
  tags: ["frontend", "react", "architecture"],
  icon: "Layers",
  content: [
    <p key="1">
      For ten years, React's Virtual DOM was considered the pinnacle of engineering. However, the physical reality is that comparing two massive identical JSON trees mathematically millions of times per minute just to hunt for a single changed <code>{"<label>"}</code> wastes heavy CPU cycles and mobile battery.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Next Paradigm
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The VDOM Tax (React)">
        <p className="text-sm text-muted-foreground mb-2">
          When a parent component updates state, React natively re-runs the entire function for practically every single child component down the tree automatically. 
        </p>
        <p className="text-sm text-muted-foreground">
          You are entirely forced to manually write `React.memo` or `useMemo` specifically everywhere to stop this top-down execution logic cascade. It shifts extreme architectural burden to the developer.
        </p>
      </Card>
      <Card title="Signals (Solid, Preact)">
        <p className="text-sm text-muted-foreground mb-2">
          Signals are mathematically reactive nodes. When <code>count</code> updates, only the exact <code>{"<span>count</span>"}</code> string physically updates directly. 
        </p>
        <p className="text-sm text-muted-foreground">
          There is absolutely zero VDOM overhead. It skips the parent component. It skips the children components. It targets the physical DOM pixel surgically. It operates exactly like an Excel spreadsheet cell.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Inevitable Convergence">
      React is fully aware of its intense CPU tax. They are officially building a 'React Compiler' that analyzes component trees deeply and artificially inserts `useMemo` perfectly across the entire architecture automatically, aiming to achieve the exact performance profile inherently provided by Signals without the developer rewriting their codebase.
    </Callout>,
  ],
};
