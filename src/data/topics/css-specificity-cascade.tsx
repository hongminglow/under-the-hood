import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const cssSpecificityCascadeTopic: Topic = {
  id: "css-specificity-cascade",
  title: "CSS Specificity, Inheritance & Cascade Layers",
  description:
    "The complete priority resolution algorithm: why your styles don't apply and exactly who wins when multiple rules clash.",
  tags: ["frontend", "css", "cascade", "specificity"],
  icon: "Layers",
  content: [
    <p key="1">
      Every CSS property on every element has exactly one winner. When multiple rules target the same element, the browser runs a strict{" "}
      <strong>priority resolution algorithm</strong> to pick one. Most developers know about specificity, but the full picture has three distinct layers:{" "}
      <strong>Origin &amp; Layer Order</strong>, then <strong>Specificity</strong>, then <strong>Inheritance</strong>. Understanding the exact order these run is what separates debugging nightmares from clean, predictable stylesheets.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Full Cascade Resolution Order (Highest → Lowest Priority)
    </h3>,

    <Flow
      key="3"
      steps={[
        {
          title: "1. Origin & Importance (!important)",
          description:
            "Browser user-agent styles < author styles < user styles. Flipping !important reverses this.",
        },
        {
          title: "2. Cascade Layer Order (@layer)",
          description:
            "Within author styles, explicitly declared @layers are ordered. Un-layered styles always win over layered ones.",
        },
        {
          title: "3. Specificity Score",
          description:
            "Inline styles (1,0,0,0) > IDs (0,1,0,0) > Classes/Attributes/Pseudo-classes (0,0,1,0) > Elements/Pseudo-elements (0,0,0,1).",
        },
        {
          title: "4. Source Order",
          description:
            "If everything else ties, the rule that appears last in the stylesheet wins.",
        },
        {
          title: "5. Inheritance (Fallback Only)",
          description:
            "If NO rule sets a property at all, some properties (color, font-size) are inherited from a parent. Non-inherited properties use their initial value.",
        },
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Layer 1 — Specificity: The Score System
    </h3>,

    <p key="5" className="mb-4">
      Specificity is calculated as a four-column score <code>(Inline, ID, Class, Element)</code>. These columns do NOT carry over — ten classes <strong>never</strong>&nbsp;beat one ID.
    </p>,

    <Table
      key="6"
      headers={["Selector", "Score (I-D-C-E)", "Example"]}
      rows={[
        ["Inline style", "1-0-0-0", '<div style="color:red">'],
        ["ID selector", "0-1-0-0", "#header"],
        ["Class selector", "0-0-1-0", ".btn"],
        ["Attribute selector", "0-0-1-0", '[type="text"]'],
        ["Pseudo-class", "0-0-1-0", ":hover, :focus, :nth-child(2)"],
        [":is(), :has(), :not()", "0-0-1-0 (uses highest arg)", ":is(#id, .cls) → 0-1-0-0"],
        ["Element / type selector", "0-0-0-1", "div, p, h1"],
        ["Pseudo-element", "0-0-0-1", "::before, ::after, ::placeholder"],
        ["Universal selector *", "0-0-0-0", "* { margin: 0 }"],
        ["!important (override)", "Breaks cascade", "color: red !important"],
      ]}
    />,

    <CodeBlock
      key="7"
      title="specificity-examples.css"
      language="css"
      code={`/* Score: 0-1-0-0 — ID */
#nav { color: blue; }

/* Score: 0-0-2-1 — 2 classes + 1 element */
ul.nav.active { color: green; }

/* Score: 0-1-1-0 — 1 ID + 1 class — WINS over green */
#nav.active { color: red; }

/* :is() takes the highest specificity of its arguments */
/* Score: 0-1-0-0 because #id is the highest arg */
:is(#id, .class, p) { color: purple; }

/* :where() always has 0 specificity — great for resets */
:where(h1, h2, h3) { margin: 0; }`}
    />,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Layer 2 — Cascade Layers (@layer): The New Priority Tier
    </h3>,

    <p key="9" className="mb-4">
      Introduced in 2022, <code>@layer</code> inserts a whole new tier <em>above</em> specificity. The key rule: <strong>un-layered styles always beat layered ones</strong>, regardless of specificity. Among layers, the order they are declared determines the winner (last declared layer wins).
    </p>,

    <CodeBlock
      key="10"
      title="cascade-layers.css"
      language="css"
      code={`/* Declare layer order FIRST — last declared = highest priority */
@layer base, components, utilities;

@layer base {
  /* Specificity: 0-0-0-1 — but very low layer priority */
  p { color: gray; }
}

@layer components {
  /* Specificity: 0-0-1-0 — but "components" layer wins over "base" */
  .text { color: blue; }
}

/* Un-layered CSS — ALWAYS wins over any @layer, even 0-specificity */
p { color: red; }  /* ← This wins! No layer = highest layer priority */`}
    />,

    <Grid key="11" cols={2} gap={6} className="my-8">
      <Card title="Why Use @layer?" description="Design for overridability">
        <p className="text-sm text-muted-foreground">
          Third-party libraries (Bootstrap, Material UI) can import into a low-priority <code>@layer base</code>. Your own un-layered utilities will <strong>always</strong> override them without needing <code>!important</code> or specificity wars.
        </p>
      </Card>
      <Card title="@layer vs !important" description="The priority flip">
        <p className="text-sm text-muted-foreground">
          <code>!important</code> reverses layer order — a <code>!important</code> rule in <code>@layer base</code> will <strong>beat</strong> a <code>!important</code> rule in <code>@layer utilities</code>. This makes them useful for defensive overrides in reset layers.
        </p>
      </Card>
    </Grid>,

    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      Layer 3 — Inheritance: The Quiet Fallback
    </h3>,

    <p key="13" className="mb-4">
      Inheritance only activates when the cascade produces <strong>no winner</strong> for a property. Some properties inherit by default; others do not. You can explicitly control this with the five special keywords.
    </p>,

    <Table
      key="14"
      headers={["Inherited by Default (Typography)", "NOT Inherited by Default (Layout)"]}
      rows={[
        ["color", "background-color"],
        ["font-family, font-size, font-weight", "margin, padding, border"],
        ["line-height, letter-spacing", "width, height, display"],
        ["text-align, text-transform", "position, top, left"],
        ["cursor, visibility", "box-shadow, border-radius"],
      ]}
    />,

    <CodeBlock
      key="15"
      title="inheritance-keywords.css"
      language="css"
      code={`/* inherit  — Force parent's computed value, even for non-inherited props */
.child { border: inherit; }

/* initial  — Reset to CSS spec's initial value (NOT browser default!) */
.reset { display: initial; }   /* → inline */

/* unset   — Inherits if the property inherits, else sets to initial */
.clean { color: unset; }       /* → inherits from parent */
.clean { margin: unset; }      /* → 0 (margin's initial value) */

/* revert  — Rolls back to browser UA stylesheet default */
.btn { all: revert; }

/* revert-layer — Rolls back to the previous @layer's value */
@layer components {
  .btn { color: revert-layer; } /* falls back to @layer base value */
}`}
    />,

    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      Head-to-Head: The Confusing Scenarios
    </h3>,

    <Table
      key="17"
      headers={["Scenario", "Who Wins?", "Why"]}
      rows={[
        [
          "ID vs 10 classes",
          "ID wins",
          "0-1-0-0 > 0-0-10-0 — columns never carry over",
        ],
        [
          "@layer utility .btn vs un-layered p",
          "Un-layered p wins",
          "No layer = above all layers regardless of specificity",
        ],
        [
          "!important in @layer base vs !important un-layered",
          "!important @layer base wins",
          "!important reverses layer order — base beats utilities",
        ],
        [
          ":is(#id, .cls) vs .cls",
          ":is(#id, .cls) wins",
          ":is() adopts the highest-specificity argument (ID = 0-1-0-0)",
        ],
        [
          ".parent color vs .child (no color set)",
          ".parent's color inherited",
          "color inherits by default — cascade had no winner for child",
        ],
        [
          "Inline style vs !important in stylesheet",
          "!important wins",
          "!important outranks inline style in the cascade origin tier",
        ],
        [
          "Two identical selectors in same stylesheet",
          "Last one wins",
          "Source order tie-breaker (step 4 in the cascade)",
        ],
      ]}
    />,

    <h3 key="18" className="text-xl font-bold mt-8 mb-4">
      Practical Debugging Workflow
    </h3>,

    <Flow
      key="19"
      steps={[
        {
          title: "1. Open DevTools → Computed Tab",
          description:
            "Find the exact computed value for the property. Struck-through rules were overridden.",
        },
        {
          title: "2. Check Layer Origin",
          description:
            'Is the winning rule inside a @layer? An un-layered rule from anywhere will always override it.',
        },
        {
          title: "3. Compare Specificity Scores",
          description:
            "Count (I-D-C-E). A single ID beats unlimited classes. Avoid using IDs in CSS selectors for component styles.",
        },
        {
          title: "4. Check Source Order",
          description:
            "Two identical selectors? The later one wins. Common bug with dynamically injected stylesheets.",
        },
        {
          title: "5. Check Inheritance vs Not Set",
          description:
            "If the property shows 'inherited', no explicit rule set it. Add an explicit rule on the element to override.",
        },
      ]}
    />,

    <Callout key="20" type="warning" title="The !important Trap">
      Using <code>!important</code> to fix specificity wars feels like a quick win, but it permanently removes that property from the normal cascade. The only legitimate uses are: (1) utility classes that must never be overridden (e.g., <code>.hidden</code>), (2) user accessibility overrides, and (3) fighting third-party libraries you cannot modify. In your own component styles, solving the root specificity problem is always the correct answer.
    </Callout>,

    <Callout key="21" type="tip" title="Modern Best Practice: Lock the Layer Order Early">
      At the top of your main CSS file, declare all layers in one line: <code>@layer reset, base, components, utilities;</code>. This ensures order is explicit and predictable regardless of which files load first — a critical pattern for design systems and large codebases using CSS Modules or PostCSS.
    </Callout>,
  ],
};
