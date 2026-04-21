import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";

export const frameworksVsVanillaJsTopic: Topic = {
  id: "frameworks-vs-vanilla-js",
  title: "React vs Vanilla JS",
  description:
    "An in-depth analysis of the tradeoffs between the raw speed of Vanilla JavaScript and the declarative architectural power of React.",
  tags: ["frontend", "performance", "react", "architecture"],
  icon: "Zap",
  content: [
    <p key="1" className="mb-6">
      When building web applications, developers often face a critical choice: use <Highlight variant="primary">Vanilla JavaScript</Highlight> for maximum performance, or adopt a framework like <Highlight variant="primary">React</Highlight> for better developer experience and maintainability. Understanding the mechanical differences beneath the hood is essential for making the right architectural decision.
    </p>,
    
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Core Paradigms
    </h3>,
    
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Vanilla JS (Imperative)">
        <p className="text-sm text-slate-400 mb-4">
          You explicitly describe <strong>how</strong> to update the UI step-by-step. It interacts directly with the browser's Real DOM, making it blazingly fast but difficult to scale as state complexity grows.
        </p>
        <CodeBlock
          title="vanilla.js"
          language="javascript"
          code={`const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const count = parseInt(btn.innerText) + 1;
  btn.innerText = count;
});`}
        />
      </Card>
      <Card title="React (Declarative)">
        <p className="text-sm text-slate-400 mb-4">
          You describe <strong>what</strong> the UI should look like for a given state. React handles the underlying details of updating the DOM efficiently via its Virtual DOM and reconciliation algorithm.
        </p>
        <CodeBlock
          title="ReactComponent.jsx"
          language="javascript"
          code={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}`}
        />
      </Card>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Technical Comparison
    </h3>,

    <Table 
      key="5"
      headers={["Metric", "Vanilla JS", "React"]}
      rows={[
        ["Paradigm", "Imperative (How to do it)", "Declarative (What to show)"],
        ["DOM Interaction", "Directly mutates Real DOM", "Mutates Virtual DOM, diffs, then updates Real DOM"],
        ["Base Payload", "0 KB (Native to browsers)", "~130 KB (React + ReactDOM parsed)"],
        ["Execution Overhead", "Minimal to none", "High (Component render + Diffing engine)"],
        ["State Management", "Manual sync with DOM elements", "Automatic UI sync via React State"],
        ["Complexity Scaling", "Hard to maintain in large apps", "Highly scalable due to component architecture"]
      ]}
    />,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Virtual DOM: Tax or Optimization?
    </h3>,

    <p key="7" className="mb-6">
      A common misconception is that the <Highlight variant="primary">Virtual DOM</Highlight> makes React inherently faster than Vanilla JS. In real terms, the Virtual DOM is a computational tax. React must build a JavaScript representation of the DOM tree, compare it with the previous tree, compute the differences (reconciliation), and finally apply those specific changes to the physical browser DOM. This overhead guarantees UI consistency but uses CPU cycles.
    </p>,

    <Callout key="8" type="tip" title="When to Choose Which?">
      If you are building a highly interactive dashboard with massive amounts of changing state, the organizational benefits of <strong>React</strong> completely outweigh the execution tax. However, if you are building a content-heavy landing page, a blog, or a tiny widget, using <strong>Vanilla JS</strong> avoids sending unnecessary framework code over the wire, optimizing your Time to Interactive (TTI) and passing core web vitals easily.
    </Callout>
  ],
};
