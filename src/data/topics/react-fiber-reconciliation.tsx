import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const reactFiberTopic: Topic = {
  id: "react-fiber-reconciliation",
  title: "React Fiber & Reconciliation",
  description:
    "How React's internal engine (Fiber) decides what to re-render, prioritizes updates, and enables concurrent features like Suspense.",
  tags: ["react", "frontend", "internals", "performance"],
  icon: "Atom",
  content: [
    <p key="1">
      React doesn't re-render the entire UI on every state change. It uses a{" "}
      <strong>reconciliation algorithm</strong> to compare the previous virtual
      tree with the new one and compute the{" "}
      <strong>minimum set of DOM mutations</strong>. Since React 16, this engine
      has been called <strong>Fiber</strong> — a complete rewrite that enables{" "}
      <strong>incremental rendering</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Stack Reconciler → Fiber
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Old Stack Reconciler (Pre-16)">
        <p className="text-sm">
          Processed the entire component tree in a{" "}
          <strong>single synchronous pass</strong>. If your tree was deep (1000+
          components), the main thread was <strong>blocked for 16ms+</strong>,
          causing visible jank and dropped frames.
        </p>
      </Card>
      <Card title="Fiber Architecture (React 16+)">
        <p className="text-sm">
          Breaks rendering into <strong>small units of work</strong> (fibers).
          Each fiber is a JavaScript object representing a single component.
          React can <strong>pause, resume, and prioritize</strong> work —
          yielding to the browser for animations and user input.
        </p>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      How Reconciliation Works
    </h4>,
    <Step key="5" index={1}>
      <strong>Render Phase:</strong> React walks the fiber tree, calling
      component functions and building a new tree of fiber nodes. This phase is{" "}
      <strong>interruptible</strong> — React can pause and resume.
    </Step>,
    <Step key="6" index={2}>
      <strong>Diffing:</strong> React compares old fibers with new fibers using
      the <strong>diffing heuristics</strong>: same type = update, different
      type = unmount old + mount new. The <code>key</code> prop tells React
      which list items are the same across re-renders.
    </Step>,
    <Step key="7" index={3}>
      <strong>Commit Phase:</strong> React applies all DOM mutations in a{" "}
      <strong>single synchronous batch</strong>. This phase is NOT interruptible
      — it must complete to avoid showing partial UI.
    </Step>,
    <CodeBlock
      key="8"
      language="typescript"
      title="Why Keys Matter"
      code={`// ❌ Without keys: React re-renders ALL items
<ul>
  {items.map(item => <li>{item.name}</li>)}
</ul>

// ✅ With stable keys: React reuses matching DOM nodes
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>

// ❌ NEVER use array index as key for dynamic lists
// Reordering items will cause incorrect recycling
{items.map((item, index) => <li key={index}>{item.name}</li>)}`}
    />,
    <Callout key="9" type="info" title="Concurrent Features (React 18+)">
      Fiber enabled <strong>Concurrent React</strong>:{" "}
      <code>startTransition()</code> marks updates as low-priority so user input
      stays responsive. <code>Suspense</code> pauses rendering until async data
      loads. <code>useDeferredValue</code> lets React show stale content while
      computing fresh content. All of this is only possible because Fiber can{" "}
      <strong>interrupt and prioritize</strong> work.
    </Callout>,
  ],
};
