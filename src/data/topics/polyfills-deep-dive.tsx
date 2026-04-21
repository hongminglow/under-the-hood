import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const polyfillsDeepDiveTopic: Topic = {
  id: "polyfills-deep-dive",
  title: "Polyfills & Transpilation",
  description:
    "How modern JavaScript runs on ancient browsers. Understanding the mechanics of polyfills, standard overrides, and Babel's AST transformations.",
  tags: ["frontend", "javascript", "compilers"],
  icon: "Puzzle",
  content: [
    <p key="1">
      JavaScript evolves constantly, but user browsers update sporadically. A <strong>Polyfill</strong> is a piece of code (usually JavaScript) used to provide modern functionality on older browsers that do not natively support it. But it's often confused with <strong>Transpilation</strong>. Understanding both is critical for frontend bundling.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Polyfill vs. Transpilation: The Core Difference
    </h3>,

    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Polyfills (API Patching)" description="Adding missing objects and functions">
        <p className="text-sm text-muted-foreground mb-2">
          A polyfill detects if an API is missing on the global <code>window</code> object (like <code>Promise</code>, <code>fetch</code>, or <code>Array.prototype.includes</code>) and <strong>injects a custom implementation</strong> mimicking the standard.
        </p>
        <p className="text-sm text-muted-foreground">
          It happens <em>at runtime</em> in the browser. It creates objects that didn't exist.
        </p>
      </Card>
      <Card title="Transpilation (Syntax Conversion)" description="Rewriting modern syntax to old syntax">
        <p className="text-sm text-muted-foreground mb-2">
          Older browsers cannot parse modern syntax like Arrow Functions (<code>{"() => {}"}</code>) or Optional Chaining (<code>?.</code>). A browser will throw a fatal <code>SyntaxError</code> before any code runs.
        </p>
        <p className="text-sm text-muted-foreground">
          Transpilers (like Babel, SWC) rewrite the code <em>during the build step</em> into older, compatible syntax.
        </p>
      </Card>
    </Grid>,

    <CodeBlock
      key="4"
      title="syntax-vs-api.js"
      language="javascript"
      code={`// --- SYNTAX: Requires Transpilation ---
const add = (a, b) => a + b;
// Older browser engine physically cannot parse '=>'. 
// Polyfill cannot fix this! It must be compiled to:
// var add = function(a, b) { return a + b; };

// --- API: Requires a Polyfill ---
const hasValue = myArray.includes(5);
// Older browser CAN parse the dot notation, but 'includes' is undefined.
// A polyfill will detect this and manually inject Array.prototype.includes = function() {...}`}
    />,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      How a Polyfill Actually Works Under the Hood
    </h3>,

    <p key="6" className="mb-4">
      The mechanism of a polyfill is astonishingly simple: it checks the environment using an <code>if</code> statement. If the sought-after feature is undefined, it attaches an equivalent JavaScript object or function to the global scope or prototype chain.
    </p>,

    <CodeBlock
      key="7"
      title="Array.prototype.includes.polyfill.js"
      language="javascript"
      code={`// Step 1: Detect if the feature is naturally missing in this browser environment
if (!Array.prototype.includes) {
  
  // Step 2: Inject the implementation directly onto the native prototype
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {
      
      // Step 3: Provide the spec-compliant logic using older, widely supported JS
      if (this == null) { throw new TypeError('"this" is null or not defined'); }
      
      // The old way of finding an item in an array
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) { return false; }
      
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      
      while (k < len) {
        if (o[k] === searchElement) { return true; }
        k++;
      }
      return false;
    },
    // Make sure it matches spec behavior (not enumerable in for...in loops)
    enumerable: false,
    configurable: true,
    writable: true
  });
}`}
    />,

    <Callout key="8" type="warning" title="Monkey Patching Native Prototypes">
      Modifying native prototypes (like <code>Array.prototype</code>) is formally known as <strong>Monkey Patching</strong>. Doing this in application code is heavily frowned upon because if two libraries patch the same object differently, they conflict. However, Polyfills are the <em>one exception</em> to this rule, because their explicit goal is to exactly replicate official ECMAScript specifications.
    </Callout>,

    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      When Should You Use Polyfills?
    </h3>,

    <Flow
      key="10"
      steps={[
        {
          title: "Browser Compatibility & Fragmentation",
          description: "When supporting legacy browsers (IE11, older iPhones/Android WebViews) while wanting to use new Web APIs (IntersectionObserver, fetch).",
        },
        {
          title: "Node.js Environment Bridging",
          description: "When running browser code in tests or SSR (Server-Side Rendering). E.g., injecting a 'fetch' polyfill (like node-fetch) because older Node didn't have it natively.",
        },
        {
          title: "Experimental Features (Prolyfills)",
          description: "Writing code against upcoming ES spec proposals (Stage 3) before they are fully implemented in any browser engines.",
        },
      ]}
    />,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Modern Bundling: Automated Polyfilling
    </h3>,

    <p key="12" className="mb-4">
      Manually writing or importing polyfills (like <code>core-js</code>) used to bloat bundles massively. Today, modern toolchains (Vite, Webpack, SWC) automate this completely using <strong>Browserlist</strong>.
    </p>,

    <Table
      key="13"
      headers={["Tooling Layer", "What it Does", "Output Result"]}
      rows={[
        [".browserslistrc", "Defines target environments (e.g. '> 0.2%, not dead, iOS 12')", "A precise matrix of supported engine versions"],
        ["@babel/preset-env", "Cross-references your code against the browserslist database", "Identifies exactly which syntax to transpile"],
        ["core-js (useBuiltIns: usage)", "Injects polyfills ONLY for APIs you actually used, ONLY if the target browser needs them", "Optimized, tiny bundle without redundant code"],
      ]}
    />,

    <CodeBlock
      key="14"
      title="babel.config.json"
      language="json"
      code={`{
  "presets": [
    [
      "@babel/preset-env",
      {
        // "usage" automatically adds core-js imports when it detects
        // unsupported APIs in your code. No manual imports needed.
        "useBuiltIns": "usage",
        "corejs": "3.32" 
      }
    ]
  ]
}`}
    />,

    <Callout key="15" type="tip" title="The Polyfill Service Pattern (Cloudflare / Webpack)">
      A modern approach is dynamically fetching polyfills at runtime via script tags. Services like `polyfill.io` (now deprecated due to malicious takeovers, but conceptually important) analyze the incoming HTTP request's `User-Agent` header. If an old browser connected, the server dynamically baked a custom polyfill chunk. If a modern Chrome connected, the server sent back an empty file — meaning modern users downloaded zero polyfill bytes.
    </Callout>,
  ],
};
