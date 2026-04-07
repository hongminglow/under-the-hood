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
      The Three Style Origins: Who Writes the CSS?
    </h3>,

    <p key="2b" className="mb-4">
      Before specificity or <code>@layer</code> even enters the picture, the browser asks a more fundamental question:{" "}
      <strong>where did this style come from?</strong> There are exactly three origins, and the cascade ranks them in a fixed priority order.
      As a developer, <strong>every line of CSS you write is Author style</strong> — the middle tier.
    </p>,

    <Grid key="2c" cols={3} gap={6} className="my-8">
      <Card title="1. User-Agent (Browser) Styles" description="The browser's built-in defaults">
        <p className="text-sm text-muted-foreground mb-2">
          Every browser ships with a hidden built-in stylesheet called the <strong>User-Agent (UA) stylesheet</strong>.
          It is the reason an unstyled HTML page still looks readable — headings are bold, links are blue and underlined,
          lists have bullets, and <code>&lt;h1&gt;</code> is larger than <code>&lt;h2&gt;</code>.
        </p>
        <p className="text-sm text-muted-foreground">
          You never write this. It is baked into Chrome, Firefox, and Safari. Each browser has a slightly different
          UA stylesheet, which is why a totally blank CSS page can look marginally different across browsers.
          This is the <strong>lowest priority</strong> origin — anything you write overrides it automatically.
        </p>
      </Card>
      <Card title="2. User Styles" description="The end-user's personal overrides">
        <p className="text-sm text-muted-foreground mb-2">
          These are CSS rules the <strong>person visiting your website</strong> has applied themselves — not you the developer.
          This origin exists primarily for <strong>accessibility</strong>: a user with low vision might install a browser extension
          or OS setting that forces all text to be at least 20px, or overrides all colors to a high-contrast theme.
        </p>
        <p className="text-sm text-muted-foreground">
          In practice, most users never set these. But when they do, their <code>!important</code> user styles outrank your
          <code>!important</code> author styles — the cascade deliberately protects the user's accessibility needs above your design choices.
        </p>
      </Card>
      <Card title="3. Author Styles" description="Everything YOU write as a developer">
        <p className="text-sm text-muted-foreground mb-2">
          This is <strong>every single CSS file you write</strong>. Your <code>index.css</code>, your Tailwind utilities,
          your CSS Modules, styled-components, SCSS, inline <code>style</code> attributes — all of it is Author style.
          It outranks UA styles automatically, which is why writing <code>a {"{"} color: black {"}"}</code> removes the browser's default blue link color.
        </p>
        <p className="text-sm text-muted-foreground">
          The <code>@layer</code> feature only operates <em>within</em> the Author origin — it lets you order your own
          stylesheets predictably (e.g., third-party library layers vs your own utility layers).
        </p>
      </Card>
    </Grid>,

    <CodeBlock
      key="2d"
      title="style-origins-annotated.css"
      language="css"
      code={`/* ─── Origin 1: User-Agent stylesheet (inside the browser binary) ───────
   You never write or see this file. It looks roughly like this:
   Chrome's built-in defaults for every HTML element.             */

h1 { display: block; font-size: 2em;   font-weight: bold; margin: 0.67em 0; }
h2 { display: block; font-size: 1.5em; font-weight: bold; margin: 0.83em 0; }
p  { display: block; margin: 1em 0; }
a  { color: -webkit-link; text-decoration: underline; cursor: pointer; }
ul { display: block; list-style-type: disc; margin: 1em 0; padding-left: 40px; }
b, strong { font-weight: bold; }

/* ─── Origin 2: User stylesheet (end-user personal overrides) ───────────
   A user installs "Dark Reader" or sets OS accessibility preferences.
   Most users never configure this — but when they do, it looks like:  */

/* User's personal browser stylesheet — set via browser extensions/prefs */
* { font-size: 18px !important; }           /* forces minimum readable size */
body { background: #000 !important;
       color: #fff !important; }            /* high-contrast accessibility mode */

/* ─── Origin 3: Author stylesheet ← THIS IS YOU, THE DEVELOPER ──────────
   Everything below is Author style. Your framework, your components,
   your inline styles — they all live here.                           */

/* CSS Reset (still Author!) — overrides UA defaults intentionally */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: Inter, sans-serif; }
a { color: inherit; text-decoration: none; }   /* removes blue + underline */

/* Your component CSS (Author) */
.btn {
  background-color: #6366f1;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}

/* Tailwind utility (Author) */
/* .text-red-500 { color: rgb(239 68 68); } — generated by Tailwind, still Author */

/* Inline style attribute (Author — highest specificity within Author origin) */
/* <div style="color: red"> — still Author, not a separate origin */`}
    />,

    <Callout key="2e" type="info" title="What About CSS Resets (Normalize.css, Tailwind Preflight)?">
      CSS resets like <code>normalize.css</code> or Tailwind's <code>preflight</code> are <strong>still Author styles</strong>.
      They are just Author styles deliberately written to neutralize UA defaults — effectively filling in a blank canvas before your
      own design rules apply. They win over UA styles purely because of origin priority, not because of anything special about them.
    </Callout>,

    <Table
      key="2f"
      headers={["Origin", "Who Writes It?", "Common Examples", "Priority (Normal)", "Priority (!important)"]}
      rows={[
        [
          "User-Agent (Browser)",
          "The browser vendor",
          "h1 bold, a underlined blue, ul with bullets, p with margins",
          "Lowest (1st)",
          "Highest when !important (rare)",
        ],
        [
          "User",
          "The website visitor",
          "Dark Reader extension, OS high-contrast mode, browser font size override",
          "Middle (2nd)",
          "Highest — beats author !important",
        ],
        [
          "Author",
          "You, the developer",
          "Your index.css, Tailwind, CSS Modules, styled-components, inline style=\"\"",
          "Highest (3rd) — wins by default",
          "Overrides UA !important, but not User !important",
        ],
      ]}
    />,

    <Callout key="2g" type="tip" title="How to Inspect UA Styles in DevTools">
      In Chrome DevTools, open the <strong>Elements → Styles</strong> panel and scroll to the bottom.
      You will see a section labelled <em>"user agent stylesheet"</em> — these are the grey, struck-through rules
      showing exactly what the browser applied before your CSS overrode them. This is the fastest way to understand
      why an element has unexpected default spacing, display behaviour, or font sizing.
    </Callout>,

    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Full Cascade Resolution Order (Highest → Lowest Priority)
    </h3>,

    <Flow
      key="3f"
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
