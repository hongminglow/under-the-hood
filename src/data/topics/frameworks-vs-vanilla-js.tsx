import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";
import { Highlight } from "@/components/ui/Highlight";

export const frameworksVsVanillaJsTopic: Topic = {
  id: "frameworks-vs-vanilla-js",
  title: "React/Vue vs Vanilla JS Performance",
  description:
    "When frameworks are faster, when they\'re slower, and what you pay (bytes, CPU, memory) for a better developer experience.",
  tags: ["frontend", "javascript", "performance", "react", "vue", "dom"],
  icon: "Gauge",
  content: [
    <p key="1">
      <strong>Vanilla JavaScript</strong> can be the fastest path to pixels
      because there is no extra runtime: you write DOM updates directly.{" "}
      <strong>Frameworks</strong> like React and Vue add a rendering engine that
      turns state into UI consistently, at the cost of extra code and work at
      runtime. That "framework tax" is often worth paying when the UI gets
      complex or the team gets large.
    </p>,
    <Callout key="2" type="info" title="Performance Has Two Bills">
      Most debates mix two different costs:{" "}
      <Highlight variant="primary">Startup</Highlight> (download, parse, execute,
      hydrate) and <Highlight variant="primary">Updates</Highlight> (how fast the
      UI responds after the app is running). Vanilla often wins startup for small
      features; frameworks often win updates once the UI has many moving parts.
    </Callout>,
    <Table
      key="3"
      headers={["Dimension", "Vanilla JS", "React/Vue (Typical)", "Tradeoff"]}
      rows={[
        [
          "Initial load",
          "Only your code",
          "Framework runtime + your code",
          <>
            <Highlight variant="warning">Cost</Highlight> extra JS to download
            and execute. <Highlight variant="info">Benefit</Highlight> consistent
            structure and tooling.
          </>,
        ],
        [
          "UI updates",
          "Manual DOM edits",
          "Declarative re-render + patch",
          <>
            <Highlight variant="warning">Cost</Highlight> scheduling and diffing
            work. <Highlight variant="info">Benefit</Highlight> fewer bugs and
            fewer "forgot to update this DOM node" states.
          </>,
        ],
        [
          "Memory",
          "DOM + your state",
          "DOM + state + framework bookkeeping",
          <>
            <Highlight variant="warning">Cost</Highlight> more allocations and
            GC pressure. <Highlight variant="info">Benefit</Highlight> cached
            trees, dependency tracking, and devtools.
          </>,
        ],
        [
          "Long-term maintainability",
          "You invent patterns",
          "Shared patterns (components, hooks, reactivity)",
          <>
            <Highlight variant="info">Benefit</Highlight> scales with team size.
            <Highlight variant="warning">Cost</Highlight> more abstraction and
            build complexity.
          </>,
        ],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="When React/Vue Is Better">
        <ul className="space-y-2 text-sm list-disc pl-4">
          <li>
            Your UI is <strong>app-like</strong>: routes, forms, validation,
            permissions, optimistic updates, offline caching.
          </li>
          <li>
            Lots of <strong>state-driven UI</strong> where correctness matters
            more than squeezing every byte (dashboards, SaaS, admin panels).
          </li>
          <li>
            Multiple engineers need a shared model: component boundaries,
            conventions, devtools, test patterns.
          </li>
          <li>
            You need ecosystem primitives: SSR/SSG, code-splitting, i18n,
            accessibility, battle-tested routing.
          </li>
        </ul>
      </Card>
      <Card title="When Vanilla JS Is Better">
        <ul className="space-y-2 text-sm list-disc pl-4">
          <li>
            The page is mostly static with <strong>small islands</strong> of
            interaction (marketing, docs, blog, landing pages).
          </li>
          <li>
            You are shipping an <strong>embed</strong> or a tiny widget where
            every KB matters (ads, third-party snippets, checkout embeds).
          </li>
          <li>
            The UI is simple and the logic is localized: you can update DOM
            directly without creating a maintenance trap.
          </li>
          <li>
            You can lean on <strong>native HTML</strong> (forms, details/summary,
            dialog) and modern CSS instead of JS.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="Frameworks Don't Fix Layout Thrash">
      Many "framework is slow" reports are really <strong>browser work</strong>:
      forced reflow, expensive paints, giant DOM trees, or overdraw. Frameworks
      add a JS layer, but the biggest performance cliffs are still DOM size,
      layout, and paint.
    </Callout>,
    <Card
      key="6"
      title="Behind The Scenes: What Happens When State Changes?"
      description="The simplified pipeline React and Vue run for you"
    >
      <Step index={1}>
        <strong>Event handler runs.</strong> Vanilla mutates variables and edits
        DOM. React/Vue mutate state through their APIs.
      </Step>
      <Step index={2}>
        <strong>Updates are scheduled and batched.</strong> Frameworks queue
        work so multiple state changes become one UI update (less DOM churn).
      </Step>
      <Step index={3}>
        <strong>A new UI description is produced.</strong> React re-executes
        component functions to produce a new element tree. Vue re-runs a render
        function generated from templates while tracking reactive reads.
      </Step>
      <Step index={4}>
        <strong>The minimal DOM mutations are computed.</strong> React/Vue diff
        old vs new virtual nodes and generate a patch.
      </Step>
      <Step index={5}>
        <strong>The browser turns DOM changes into pixels.</strong> Style
        calculation, layout, paint, and compositing happen here. If you trigger
        layout repeatedly (reading layout after writing), performance tanks
        regardless of framework.
      </Step>
    </Card>,
    <CodeBlock
      key="7"
      language="typescript"
      title="Vanilla JS: You Own The DOM Contract"
      code={`let count = 0;

const button = document.querySelector("#btn")!;
const label = document.querySelector("#label")!;

button.addEventListener("click", () => {
  count += 1;
  label.textContent = String(count); // direct DOM patch (fast, but manual)
});`}
    />,
    <CodeBlock
      key="8"
      language="tsx"
      title="React: Re-render + Reconcile + Commit"
      code={`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {count}
    </button>
  );
}

// On click:
// 1) setCount schedules work
// 2) Counter() re-runs to produce a new element tree
// 3) React diffs old vs new (reconciliation)
// 4) React commits the minimal DOM update (text node changes)`}
    />,
    <CodeBlock
      key="9"
      language="vue"
      title="Vue: Reactive Dependency Tracking + Patch"
      code={`<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>

// When count changes:
// 1) Vue knows exactly which render effects depend on it
// 2) It re-runs those effects and patches the DOM`}
    />,
    <Callout key="10" type="tip" title="The Real Cost of Better DX">
      Frameworks buy you a stable mental model: <strong>state</strong> drives{" "}
      <strong>UI</strong>. The cost is runtime work (diffing/scheduling), more
      memory overhead, and a build pipeline. If you keep JS small (code-split,
      lazy-load, avoid unnecessary re-renders), framework apps can feel just as
      fast as vanilla while scaling far better.
    </Callout>,
    <Callout key="11" type="success" title="Rule Of Thumb">
      Use vanilla for <strong>small, isolated interactions</strong>. Use a
      framework for <strong>application UIs</strong>. If performance is a hard
      requirement, measure a <strong>production build</strong> and optimize
      around the real bottleneck (JS execution vs layout/paint vs network).
    </Callout>,
  ],
};

