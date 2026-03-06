import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const virtualDomVsSignalsTopic: Topic = {
  id: "virtual-dom-vs-signals",
  title: "Virtual DOM vs Signals",
  description:
    "The hottest frontend debate of 2024-25: is the Virtual DOM an outdated abstraction, or do Signals just solve a different problem?",
  tags: ["frontend", "react", "solidjs", "debate"],
  icon: "Signal",
  content: [
    <p key="1">
      For a decade, the <strong>Virtual DOM</strong> was the undisputed king of
      frontend rendering: build a lightweight JS tree, diff it against the
      previous one, and patch the real DOM. React, Vue 2, and Preact all use it.
      Then <strong>Signals</strong> arrived (SolidJS, Angular 16+, Vue's
      reactivity, Preact Signals) claiming to be{" "}
      <strong>faster and simpler</strong> by skipping the diff entirely.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Virtual DOM (React, Vue, Preact)">
        <p className="text-sm">
          On state change: re-run the component function → produce a new virtual
          tree → <strong>diff</strong> old vs new → patch the real DOM with the
          minimal changes. The diffing is the overhead — <code>O(n)</code> where
          n = number of virtual nodes.
        </p>
      </Card>
      <Card title="Signals (SolidJS, Angular, Svelte 5)">
        <p className="text-sm">
          A signal is a <strong>reactive primitive</strong> that knows exactly
          which DOM nodes depend on it. On change, it updates{" "}
          <strong>only those specific DOM nodes</strong> — no tree diffing, no
          component re-execution. Surgical <code>O(1)</code> updates.
        </p>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Property", "Virtual DOM", "Signals"]}
      rows={[
        [
          "Update Granularity",
          "Component-level (re-runs entire function)",
          "DOM-node-level (surgical)",
        ],
        ["Diffing Cost", "O(n) tree comparison", "No diffing — direct binding"],
        [
          "Memory",
          "Two trees in memory (current + previous)",
          "No virtual tree needed",
        ],
        [
          "DX (Developer Experience)",
          "Familiar, React's mental model",
          "Requires understanding reactive primitives",
        ],
        [
          "Bundle Size",
          "Needs runtime reconciler (~40kb)",
          "Minimal runtime (~7kb for SolidJS)",
        ],
        [
          "Ecosystem",
          "Massive (React, 10+ years)",
          "Growing fast (SolidJS, Angular 16+)",
        ],
      ]}
    />,
    <CodeBlock
      key="4"
      language="typescript"
      title="The Same Counter, Different Worlds"
      code={`// React (Virtual DOM) — entire function re-executes on change
function Counter() {
  const [count, setCount] = useState(0);
  console.log("Component re-rendered"); // Logs on EVERY click
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// SolidJS (Signals) — function runs ONCE, signal updates DOM directly
function Counter() {
  const [count, setCount] = createSignal(0);
  console.log("Runs ONCE only"); // Never re-runs — it's not a re-render
  return <button onClick={() => setCount(c => c + 1)}>{count()}</button>;
}`}
    />,
    <Callout key="5" type="info" title="The Nuanced Truth">
      The Virtual DOM is not "slow" — React's reconciler is incredibly fast for
      most applications. Signals shine in <strong>highly dynamic UIs</strong>{" "}
      with thousands of updates (data grids, dashboards, animations). For
      typical CRUD apps, the difference is negligible. The real win of Signals
      is <strong>eliminating unnecessary re-renders by default</strong>, which
      React achieves through <code>memo</code>/<code>useMemo</code> — but that's
      opt-in.
    </Callout>,
  ],
};
