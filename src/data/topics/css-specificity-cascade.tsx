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

    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      The Two Extra Cascade Slots: Animations & Transitions
    </h3>,

    <p key="23" className="mb-4">
      The cascade has <strong>more than three origins</strong>. The full CSS spec (Cascade Level 5) inserts two extra priority slots — one for <code>@keyframes</code> animations and one for transitions — at positions that initially look bizarre. Understanding <em>why</em> they sit where they do makes the logic click immediately.
    </p>,

    <Table
      key="24"
      headers={["Priority (Low → High)", "Cascade Slot", "What Lives Here"]}
      rows={[
        ["1 (Lowest)", "UA normal", "Browser built-in defaults — h1 bold, a blue, etc."],
        ["2", "User normal", "End-user accessibility preferences, Dark Reader extension"],
        ["3", "Author @layer (low → high)", "Your layered styles in declared order"],
        ["4", "Author normal (un-layered)", "Your regular CSS rules — the majority of your code"],
        ["5 ⚡", "CSS Animations (@keyframes)", "Active animation keyframe values — overrides normal styles"],
        ["6", "Author !important", "Your !important rules — can stop an animation"],
        ["7", "User !important", "User accessibility !important — beats your !important"],
        ["8", "UA !important", "Browser's rare !important overrides"],
        ["9 👑 (Highest)", "CSS Transitions", "Interpolated in-flight values — beats everything including !important"],
      ]}
    />,

    <h3 key="25" className="text-xl font-bold mt-8 mb-4">
      Why Animations (Slot 5) Sit Above Normal Author Styles
    </h3>,

    <p key="26" className="mb-4">
      A <code>@keyframes</code> animation needs to <strong>temporarily override an element's normal CSS values</strong> while it is running — otherwise the animation would have no visible effect. If your stylesheet says <code>opacity: 1</code> and your animation says <code>opacity: 0</code> at the 50% keyframe, the animation value must win during playback. That is why animations are placed in slot 5, above all normal author rules.
    </p>,

    <p key="27" className="mb-4">
      But animations deliberately sit <strong>below <code>!important</code> (slot 6)</strong>. This means you can forcibly halt or override a running animation with <code>!important</code> — a useful escape hatch for accessibility (e.g., the <code>prefers-reduced-motion</code> media query).
    </p>,

    <CodeBlock
      key="28"
      title="animation-cascade.css"
      language="css"
      code={`/* Normal author rule — slot 4 */
.box { opacity: 1; background: blue; }

/* Animation — slot 5, beats slot 4 during playback */
@keyframes fade {
  50% { opacity: 0; }   /* ← wins over the 'opacity: 1' rule above */
}
.box { animation: fade 2s infinite; }

/* !important — slot 6, can STOP the animation mid-track */
@media (prefers-reduced-motion: reduce) {
  .box { animation: none !important; }
  /* This beats slot 5 → animation is disabled for motion-sensitive users */
}

/* Practical proof — the animation WINS over normal rules */
.box { opacity: 0.9; }   /* slot 4 — overridden by the keyframe at 50% */
.box { opacity: 0.9 !important; } /* slot 6 — WOULD override the keyframe */`}
    />,

    <h3 key="29" className="text-xl font-bold mt-8 mb-4">
      Why Transitions (Slot 9) Sit Above Everything — Even !important
    </h3>,

    <p key="30" className="mb-4">
      This is the most counterintuitive part. CSS transitions sit at the <strong>absolute top of the cascade</strong>, beating every origin including <code>!important</code> from all sources. Here is the reason:
    </p>,

    <p key="31" className="mb-4">
      When a transition fires, the browser is computing <strong>intermediate interpolated values</strong> between a start state and an end state — frame by frame, 60 times per second. If any stylesheet rule could override those interpolated values mid-flight, the element would instantly snap to the final value and <strong>no animation would be visible at all</strong>. The transition <em>must</em> own that property for its entire duration, or it physically cannot produce the smooth visual effect.
    </p>,

    <CodeBlock
      key="32"
      title="transition-cascade.css"
      language="css"
      code={`/* The transition is declared on the element */
.btn {
  background: blue;
  transition: background 0.4s ease;
}

/* When the user hovers, background wants to change to red */
.btn:hover { background: red; }

/* During the 0.4s transition, the browser computes values like:
   frame 1:  background: rgb(15, 15, 245)   ← interpolated, slot 9
   frame 12: background: rgb(130, 0, 125)   ← interpolated, slot 9
   frame 24: background: rgb(239, 0, 15)    ← interpolated, slot 9

   ALL of these beat your normal CSS AND your !important rules.
   If they didn't, the element would jump directly to 'red' on hover,
   and the 0.4s visual fade would never render. */

/* Even this cannot interrupt an in-flight transition: */
.btn { background: green !important; }
/* ↑ slot 6 — transition slot 9 still wins during the animation frames */

/* The ONLY way to stop a transition mid-flight is to remove it: */
.btn { transition: none !important; }
/* ↑ Removing the transition property itself — then there is nothing to interpolate */`}
    />,

    <Grid key="33" cols={2} gap={6} className="my-8">
      <Card title="Animation — The Temporary Override" description="Slot 5: above normal, below !important">
        <p className="text-sm text-muted-foreground mb-2">
          Animations need to override your normal property values <em>while playing</em>, but you retain the ability to stop them cold with <code>!important</code>. This is intentional — accessibility rules like <code>prefers-reduced-motion</code> must be able to kill animations unconditionally.
        </p>
        <p className="text-sm text-muted-foreground">
          When the animation ends or is paused, the normal cascade resumes and the element reverts to its authored styles.
        </p>
      </Card>
      <Card title="Transition — The Interpolation Lock" description="Slot 9: above everything, even !important">
        <p className="text-sm text-muted-foreground mb-2">
          Transitions lock the interpolated intermediate value into the top of the cascade for each frame. Without this, the browser would have no mechanism to render smooth state changes — the element would teleport instantly to its final value.
        </p>
        <p className="text-sm text-muted-foreground">
          Once the transition completes, the lock is released and the normal cascade takes over again. The "winner" at the end is just your regular CSS.
        </p>
      </Card>
    </Grid>,

    <Callout key="34" type="info" title="The Practical Consequence: Why Your !important Sometimes Doesn't Work">
      If you add <code>color: red !important</code> to an element that is mid-transition, you will still see the smooth colour animation complete before red takes hold. This is the transition cascade slot in action. To truly interrupt a live transition, set <code>transition: none</code> on the element — removing the transition removes its cascade slot entirely, and your <code>!important</code> rule immediately wins.
    </Callout>,

    <Callout key="21" type="tip" title="Modern Best Practice: Lock the Layer Order Early">
      At the top of your main CSS file, declare all layers in one line: <code>@layer reset, base, components, utilities;</code>. This ensures order is explicit and predictable regardless of which files load first — a critical pattern for design systems and large codebases using CSS Modules or PostCSS.
    </Callout>,

    <h3 key="35" className="text-xl font-bold mt-8 mb-4">
      Common Misconception: "Inheritance Can Outrun Specificity"
    </h3>,

    <Callout key="36" type="warning" title="Inheritance Is Actually the Weakest Force — Not the Strongest">
      Inheritance sits at the <strong>very bottom</strong> of the cascade. It is the last resort, not the first.
      An inherited value is only used when <strong>zero</strong> cascade rules explicitly set that property on the element.
      Even a universal selector <code>* {"{"} color: blue {"}"}</code> with 0-0-0-0 specificity beats an inherited value from a parent
      with a massive specificity score like <code>#a #b #c .d .e .f {"{"} color: red {"}"}</code>. The parent's specificity is completely irrelevant
      to the child — <strong>specificity is only compared between rules targeting the exact same element</strong>.
    </Callout>,

    <p key="37" className="mb-4">
      The reason people get confused is a subtle but critical rule: <strong>specificity scores do not travel with the inherited value</strong>.
      When a browser resolves a property on an element, it only compares rules that <em>directly target that element</em>.
      A parent rule — no matter how specific — contributes only a naked, weightless inherited value to the child.
    </p>,

    <CodeBlock
      key="38"
      title="case-A-selector-includes-child.css"
      language="css"
      code={`/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CASE A — The long selector ENDS with 'a', so it directly targets <a>.
   Both rules are explicit on <a>. Specificity decides between them.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Selector ends with 'a' — targets <a> directly. Score on <a>: 0-1-3-2 */
#header .nav ul.list li a { color: red; }

/* Also targets <a> directly. Score on <a>: 0-0-0-1 */
a { color: blue; }

/* RESULT: RED ✅
   Both rules directly target <a>, so specificity competes as normal.
   0-1-3-2  vs  0-0-0-1  →  red wins by a wide margin.

   No inheritance involved here at all. The long selector is not
   "targeting the parent" — the word 'a' at the end means it applies
   directly to the <a> element. The ancestors (#header, .nav, ul…) are
   just context conditions that must be satisfied, not the target.     */`}
    />,

    <CodeBlock
      key="38b"
      title="case-B-selector-stops-at-parent.css"
      language="css"
      code={`/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CASE B — The selector ends at 'ul'. It does NOT include 'a'.
   The <a>'s color only comes from inheritance. That's the key change.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Selector ends with 'ul' — targets <ul> directly. Score on <ul>: 0-2-0-1
   The <a> inside the <ul> is NOT targeted. It only picks up the color
   value via inheritance (color is an inherited property).             */
#wrapper #nav ul { color: red; }

/* Targets <a> directly. Score on <a>: 0-0-0-1 */
a { color: blue; }

/* RESULT: BLUE ✅
   Here is where inheritance = zero weight matters:

   The browser is now resolving 'color' for the <a> element.
   It finds two candidates:
     1. Inherited value from #wrapper #nav ul  →  "red"  (zero weight, no score)
     2. Explicit rule  'a { color: blue }'     →  "blue" (score: 0-0-0-1)

   These are NOT compared by specificity score against each other.
   The inherited value is immediately set aside. Any explicit rule at
   any specificity — even 0-0-0-1 — beats a bare inherited value.
   So blue wins.

   The 0-2-0-1 score on #wrapper #nav ul is IRRELEVANT to the <a>.
   That score only mattered when competing against other rules on <ul>. */`}
    />,

    <CodeBlock
      key="39"
      title="case-C-zero-specificity-beats-inheritance.css"
      language="css"
      code={`/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CASE C — Extreme proof: even 0-0-0-0 beats inheritance.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Parent with 10 chained classes — score on parent: 0-0-10-0 (very high) */
.a.b.c.d.e.f.g.h.i.j { color: red; }

/* Child <p> inherits color:red from the parent.
   That inherited value has score: nothing. Zero. It doesn't even have a slot.  */

/* Universal selector on every element — score: 0-0-0-0 (the floor) */
* { color: blue; }

/* RESULT: <p> is BLUE ✅

   Even though the parent's rule scored 0-0-10-0, the <p> never sees
   that score at all. The <p> only receives the raw value "red" with
   no score attached. The * rule is explicit on <p> with 0-0-0-0.
   0-0-0-0 > "no score"  →  blue wins.

   THE ONE-SENTENCE RULE:
   Explicit always beats inherited. Specificity is never compared
   between an explicit rule and an inherited value. They are not
   even in the same category of competition.                          */`}
    />,

    <Grid key="40" cols={2} gap={6} className="my-8">
      <Card title="The Rule to Internalize" description="Specificity is always per-element">
        <p className="text-sm text-muted-foreground mb-2">
          Specificity scores are <strong>only compared between rules targeting the same element</strong>.
          A rule on a parent, no matter how specific, <em>does not compete on specificity</em> for the child's properties.
          It only contributes an inheritance value, which has zero weight in the child's cascade.
        </p>
        <p className="text-sm text-muted-foreground">
          This is why design systems never rely on specificity from ancestor selectors to style children —
          any direct rule on the child, however weak, will silently override it.
        </p>
      </Card>
      <Card title="When Developers Get Burned" description="The classic parent trap">
        <p className="text-sm text-muted-foreground mb-2">
          A common real-world bug: a designer adds <code>#app .theme-dark p {"{"} color: white {"}"}</code> expecting all paragraphs to be white.
          But a CSS reset somewhere contains <code>p {"{"} color: inherit {"}"}</code> or even <code>p {"{"} color: #333 {"}"}</code> —
          and that low-specificity rule directly on <code>p</code> silently wins over the inherited white.
        </p>
        <p className="text-sm text-muted-foreground">
          The fix: target the <code>p</code> directly with at least matching specificity, or use <code>@layer</code> to control priority structurally.
        </p>
      </Card>
    </Grid>,

    <Table
      key="41"
      headers={["Value Type", "Has Specificity?", "Can It Lose to a Lower Explicit Rule?", "Example"]}
      rows={[
        [
          "Explicit rule on element",
          "Yes — full score",
          "Only to a higher-specificity explicit rule",
          ".btn { color: red } — score 0-0-1-0",
        ],
        [
          "Inherited value from parent",
          "No — zero weight",
          "Yes — loses to ANY explicit rule, even * (0-0-0-0)",
          "color: red inherited from #parent { color: red }",
        ],
        [
          "Initial value (browser default)",
          "No — zero weight",
          "Yes — same as inheritance, overridden by any explicit rule",
          "display: inline — the spec default before any CSS",
        ],
      ]}
    />,

    <Callout key="42" type="success" title="The Corrected Mental Model">
      Inheritance is a <strong>passive fallback</strong>, not an active cascade participant. Think of it as a default value that gets
      filled in only when the cascade produces no winner. Once even a single explicit rule targets a property on an element —
      regardless of specificity — the cascade fires and inheritance is skipped entirely. The phrase "high-specificity parent overrides the child"
      only holds true when the selector itself includes the child (e.g. <code>#parent .child</code> directly targeting <code>.child</code>), not
      when it targets the parent alone and relies on inheritance to reach the child.
    </Callout>,

  ],
};
