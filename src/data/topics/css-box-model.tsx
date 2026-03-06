import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const cssBoxModelTopic: Topic = {
  id: "css-box-model-layout",
  title: "CSS Box Model & Layout Engines",
  description:
    "The foundation of every pixel on screen: content, padding, border, margin — and why Flexbox and Grid changed everything.",
  tags: ["css", "frontend", "layout", "interview"],
  icon: "Square",
  content: [
    <p key="1">
      Every HTML element is a <strong>rectangular box</strong>. The CSS Box
      Model defines how that box's size is calculated:{" "}
      <strong>Content → Padding → Border → Margin</strong> (inside out). Getting
      this wrong is the #1 cause of layout bugs.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="content-box (Default)">
        <p className="text-sm">
          <code>width: 200px</code> means the <em>content</em> is 200px. Add
          20px padding + 2px border = the actual rendered box is{" "}
          <strong>244px wide</strong>. Confusing and bug-prone.
        </p>
      </Card>
      <Card title="border-box (Modern Standard)">
        <p className="text-sm">
          <code>width: 200px</code> means the <em>entire box</em> (content +
          padding + border) is 200px. The content shrinks to fit. Almost every
          CSS reset sets:{" "}
          <code>
            *, *::before, *::after {"{"} box-sizing: border-box {"}"}
          </code>
        </p>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Layout Engines
    </h4>,
    <Grid key="4" cols={3} gap={6} className="mb-8">
      <Card title="Flexbox (1D)">
        <p className="text-sm">
          Distributes space along a <strong>single axis</strong> (row or
          column). Powers navbars, card rows, centering.{" "}
          <code>
            display: flex; justify-content: center; align-items: center;
          </code>{" "}
          — the holy grail of CSS centering.
        </p>
      </Card>
      <Card title="Grid (2D)">
        <p className="text-sm">
          Defines <strong>rows AND columns</strong> simultaneously. Powers full
          page layouts, dashboards, image galleries.{" "}
          <code>
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          </code>{" "}
          — responsive without media queries.
        </p>
      </Card>
      <Card title="Position (Escape Hatch)">
        <p className="text-sm">
          <code>relative</code>: offset from normal flow. <code>absolute</code>:
          positioned to nearest positioned ancestor. <code>fixed</code>:
          relative to viewport. <code>sticky</code>: switches from relative to
          fixed at a scroll threshold.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="5"
      language="css"
      title="The Modern CSS Reset"
      code={`/* Every professional project starts with this */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* The centering trick every dev should memorize */
.center-anything {
  display: grid;
  place-items: center;  /* 1 line, perfectly centered */
}`}
    />,
    <Callout key="6" type="tip" title="Flexbox vs Grid: When to Use What">
      Use <strong>Flexbox</strong> when you have items flowing in{" "}
      <em>one direction</em> (nav items, button groups, card rows). Use{" "}
      <strong>Grid</strong> when you need <em>two-dimensional</em> control (page
      layouts, dashboards). In practice, most layouts use <strong>both</strong>{" "}
      — Grid for the page skeleton, Flexbox for component internals.
    </Callout>,
  ],
};
