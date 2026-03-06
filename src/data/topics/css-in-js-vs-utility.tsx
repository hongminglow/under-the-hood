import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const cssInJsVsUtilityTopic: Topic = {
  id: "css-in-js-vs-utility-css",
  title: "CSS-in-JS vs Utility CSS",
  description:
    "styled-components vs Tailwind vs CSS Modules — the styling war that divides every frontend team.",
  tags: ["css", "frontend", "react", "debate"],
  icon: "Palette",
  content: [
    <p key="1">
      How you write CSS in a component-based world is one of the most
      <strong> divisive debates</strong> in frontend development. Each approach
      solves the same core problems — scoping, reuse, maintainability — but
      makes radically different tradeoffs.
    </p>,
    <Table
      key="2"
      headers={["Approach", "Example", "Bundle Impact", "DX"]}
      rows={[
        [
          "CSS-in-JS (styled-components)",
          "const Btn = styled.button`color: red`",
          "Runtime JS overhead — styles computed on render",
          "Colocation, dynamic styles, TypeScript props",
        ],
        [
          "CSS-in-JS (Zero-Runtime)",
          "Panda CSS, Vanilla Extract, Linaria",
          "Extracted to static CSS at build time",
          "Best of both: colocation + zero runtime cost",
        ],
        [
          "Utility CSS (Tailwind)",
          'className="bg-blue-500 p-4 rounded"',
          "Tiny CSS — only used classes shipped",
          "Fast prototyping, consistent design tokens",
        ],
        [
          "CSS Modules",
          "import styles from './Btn.module.css'",
          "Static CSS, scoped class names",
          "Familiar CSS syntax, file-level scoping",
        ],
        [
          "Vanilla CSS + BEM",
          ".btn--primary { ... }",
          "No tooling overhead",
          "Simple but no scoping — naming collisions at scale",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="CSS-in-JS: The Rise & Fall">
        <p className="text-sm">
          styled-components and Emotion dominated 2018–2022. They offered
          <strong> dynamic styling based on props</strong> and perfect scoping.
          But the <strong>runtime cost</strong> (parsing template literals,
          injecting styles on every render) caused measurable performance hits.
          The React team now{" "}
          <strong>recommends against runtime CSS-in-JS</strong> with Server
          Components.
        </p>
      </Card>
      <Card title="Tailwind: The Counter-Movement">
        <p className="text-sm">
          Tailwind took the opposite approach: no custom CSS files, just{" "}
          <strong>utility classes in HTML</strong>. Critics call it "inline
          styles with extra steps." Fans say it's the fastest way to build
          consistent UIs. At scale, it produces{" "}
          <strong>tiny CSS bundles</strong> (only used classes ship) — a huge
          perf win over CSS-in-JS.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="4"
      language="tsx"
      title="Same Button, 3 Approaches"
      code={`// 1. styled-components (runtime CSS-in-JS)
const Button = styled.button<{ primary?: boolean }>\`
  padding: 8px 16px;
  background: \${p => p.primary ? '#3b82f6' : '#e5e7eb'};
\`;

// 2. Tailwind (utility classes)
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
  Click me
</button>

// 3. CSS Modules
import s from './Button.module.css';
<button className={s.primary}>Click me</button>`}
    />,
    <Callout key="5" type="tip" title="The 2025 Recommendation">
      <strong>New projects:</strong> Tailwind CSS or CSS Modules. Both are
      zero-runtime and work with React Server Components.{" "}
      <strong>Existing CSS-in-JS:</strong> Migrate to zero-runtime alternatives
      (Panda CSS, Vanilla Extract). The industry is moving away from runtime
      CSS-in-JS, but there's no single "winner" — pick what your team is
      productive with.
    </Callout>,
  ],
};
