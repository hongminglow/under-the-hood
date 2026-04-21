import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const reactFiberReconciliationTopic: Topic = {
  id: "react-fiber-reconciliation",
  title: "React Fiber & Reconciliation",
  description:
    "How React mathematically computes what pixels to physically update on the screen without crashing the 60fps physics engine.",
  tags: ["frontend", "react", "architecture"],
  icon: "Cpu",
  content: [
    <p key="1">
      You call `setCount(5)`. The exact millisecond you execute that function, React does not touch the HTML. It instead kicks off an extremely complex background Javascript algorithm to figure out the minimal possible changes it needs to apply to the screen.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Reconciliation Algorithm
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Diffing Engine">
        <p className="text-sm text-muted-foreground mb-2">
          React maintains a massive invisible Javascript JSON object representing the DOM (The Virtual DOM). 
        </p>
        <p className="text-sm text-muted-foreground">
          When state changes, it generates a brand new JSON object. It then performs an exhaustive tree-diffing algorithm comparing the new JSON against the old JSON. It spots exactly three attributes that changed, and batches those changes into one native DOM instruction.
        </p>
      </Card>
      <Card title="The Fiber Scheduler">
        <p className="text-sm text-muted-foreground mb-2">
          Before React 16, this tree-diffing could not be stopped. A massive tree would lock up the browser for 200ms, creating jitter.
        </p>
        <p className="text-sm text-muted-foreground">
          Fiber introduced a pauseable stack. React can now pause its intense JSON calculation, let the browser quickly render a user typing frame (to hit 60FPS), and resume calculating the massive table update.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Key Prop Requirement">
      Why does React aggressively throw terrifying red warnings when mapping lists without `key` props? Because the diffing algorithm operates entirely based on array indexes. If you shift an array, React stupidly re-renders the entire list because the indexes changed. Passing a unique database `key` id tells React to simply perform a zero-cost DOM node movement instead of destroying the HTML.
    </Callout>,
  ],
};
