import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const developerToolchainLayersTopic: Topic = {
  id: "developer-toolchain-layers",
  title: "APIs, SDKs & Libraries: The Developer's Toolchain Hierarchy",
  description:
    "Untangle the confusion between language built-ins, runtime APIs, browser APIs, SDKs, npm packages, and framework abstractions — and learn exactly when each layer kicks in.",
  icon: "Layers",
  tags: [
    "API",
    "SDK",
    "npm",
    "browser api",
    "standard library",
    "runtime",
    "language built-in",
    "toolchain",
  ],
  content: [
    <p key="intro" className="text-slate-300 leading-relaxed">
      Every time you call <code>Array.map()</code>, <code>fetch()</code>,{" "}
      <code>fs.readFile()</code>, or <code>stripe.charges.create()</code>, you
      are reaching into a different <em>layer</em> of the developer toolchain.
      These aren't all the same thing — they live at different levels of the
      stack, are shipped by different parties, and behave differently at runtime.
      This article builds the mental model that separates them clearly.
    </p>,

    <h2 key="h-pyramid" className="text-xl font-bold text-white mt-8 mb-4">
      The 6-Layer Hierarchy
    </h2>,

    <Flow
      key="flow-layers"
      steps={[
        {
          title: "Layer 1 — Language Built-ins",
          description:
            "Syntax, operators, primitive types, and core data structures baked into the language spec itself. Array, Object, Promise, Math. Needs no import, no install. Ships inside the JS engine (V8, SpiderMonkey).",
        },
        {
          title: "Layer 2 — Standard Library / Runtime APIs",
          description:
            "APIs provided by the runtime environment but NOT the language spec. Node.js: fs, path, http, crypto. Deno: Deno.readFile(). These are zero-install but environment-specific — they don't exist in a browser.",
        },
        {
          title: "Layer 3 — Platform / Host APIs",
          description:
            "APIs injected by the host environment (browser or OS). Browser: fetch, WebSocket, localStorage, document, navigator, Geolocation, Canvas, WebGL, IndexedDB. The browser ships these; W3C/WHATWG specifies them.",
        },
        {
          title: "Layer 4 — Client SDKs",
          description:
            "Curated packages officially produced by a service provider (Stripe, Firebase, AWS) to wrap their REST/gRPC API surface. They handle auth, retries, error parsing, and type safety so you call sdk.method() instead of raw fetch().",
        },
        {
          title: "Layer 5 — Open-Source Libraries / npm Packages",
          description:
            "Third-party code published to a package registry (npm, JSR, PyPI). Authored by the community or independent teams, not tied to any single service. lodash, axios, zod, dayjs, react-query.",
        },
        {
          title: "Layer 6 — Framework Abstractions",
          description:
            "APIs provided by an opinionated framework (React hooks, Next.js router, Express middleware). Built on top of all the layers below. They restrict your choices to improve consistency and productivity.",
        },
      ]}
    />,

    <h2 key="h-table" className="text-xl font-bold text-white mt-10 mb-4">
      Layer Comparison at a Glance
    </h2>,

    <Table
      key="table-layers"
      headers={["Layer", "Shipped By", "Install Required?", "Environment", "Examples"]}
      rows={[
        ["Language Built-in", "Language spec (TC39/ECMA)", "❌ Never", "Everywhere", "Array, Map, Promise, JSON, Math"],
        ["Runtime / Std Library", "Runtime vendor", "❌ Never", "Node / Deno / Bun only", "fs, path, http, crypto, os"],
        ["Browser / Platform API", "Browser vendor (W3C spec)", "❌ Never", "Browser only", "fetch, WebSocket, localStorage, document"],
        ["Client SDK", "Service provider (official)", "✅ npm install", "Any", "stripe, firebase, @aws-sdk/client-s3"],
        ["npm Library", "Community / OSS", "✅ npm install", "Any", "axios, lodash, zod, dayjs, react-query"],
        ["Framework API", "Framework authors", "✅ npm install", "Any", "useEffect, next/router, express()"],
      ]}
    />,

    <h2 key="h-deep" className="text-xl font-bold text-white mt-10 mb-4">
      Deep Dive: Each Layer Explained
    </h2>,

    <Grid key="grid-layers-1" cols={2} gap={6}>
      <Card
        title="Layer 1 — Language Built-ins"
        description="Zero-cost abstractions from the spec itself."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          Language built-ins are methods and constructors that are part of the
          ECMAScript (JavaScript) specification. The JS engine ships them. They
          require <strong>zero imports</strong> and are available in every
          environment — browser, Node, Deno, Cloudflare Workers, anywhere.
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="primary">Array.prototype.map</Highlight>{" "}
          <Highlight variant="primary">Object.keys</Highlight>{" "}
          <Highlight variant="primary">Promise</Highlight>{" "}
          <Highlight variant="primary">JSON.parse</Highlight>{" "}
          <Highlight variant="primary">Math.random</Highlight>{" "}
          <Highlight variant="primary">Date</Highlight>{" "}
          <Highlight variant="primary">RegExp</Highlight>
        </p>
        <p className="text-slate-400 text-sm mt-3">
          The TC39 committee governs these via yearly ECMAScript specs (ES2015,
          ES2017, ES2025…). New proposals take years. Polyfills exist to
          backfill old engines.
        </p>
      </Card>

      <Card
        title="Layer 2 — Runtime APIs (Std Library)"
        description="Zero-install, but only available in a specific runtime."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          Node.js, Deno, and Bun each ship their own standard library — extra
          APIs beyond the language spec that let you interact with the OS: file
          system, network, process, timers (the extended versions).
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="warning">Node.js only:</Highlight>{" "}
          <code>require('fs')</code>, <code>require('path')</code>,{" "}
          <code>require('http')</code>, <code>require('crypto')</code>,{" "}
          <code>process.env</code>
        </p>
        <p className="text-slate-400 text-sm mt-3">
          <strong>Key trap:</strong> <code>fetch()</code> used to be
          browser-only. Node 18+ ships it natively. Before that, you needed the
          npm <code>node-fetch</code> package — a classic example of a layer 5
          library filling a layer 2 gap.
        </p>
      </Card>

      <Card
        title="Layer 3 — Browser / Platform APIs"
        description="Injected by the host environment at runtime."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          When your JavaScript runs inside Chrome, Firefox, or Safari, the
          browser injects a huge set of additional global APIs. These are{" "}
          <strong>not</strong> part of JavaScript — they're part of the{" "}
          <em>Web Platform</em>, specified by W3C and WHATWG.
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="primary">document</Highlight>{" "}
          <Highlight variant="primary">window</Highlight>{" "}
          <Highlight variant="primary">fetch</Highlight>{" "}
          <Highlight variant="primary">localStorage</Highlight>{" "}
          <Highlight variant="primary">WebSocket</Highlight>{" "}
          <Highlight variant="primary">navigator.geolocation</Highlight>{" "}
          <Highlight variant="primary">IndexedDB</Highlight>{" "}
          <Highlight variant="primary">Canvas</Highlight>{" "}
          <Highlight variant="primary">Intersection­Observer</Highlight>
        </p>
        <p className="text-slate-400 text-sm mt-3">
          No install needed — but they only exist in browser runtimes. Trying
          to call <code>document</code> in a plain Node.js script will crash
          with <code>ReferenceError: document is not defined</code>.
        </p>
      </Card>

      <Card
        title="Layer 4 — Client SDKs"
        description="Official wrappers from service vendors — not just a library."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          An SDK (Software Development Kit) is a curated, opinionated package
          published by the maintainers of a service or platform. It wraps their
          HTTP/gRPC APIs with typed methods, built-in auth, automatic retries,
          and proper error objects.
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="info">stripe</Highlight> — Official Stripe
          Node SDK
          <br />
          <Highlight variant="info">firebase</Highlight> — Google's Firebase
          SDK
          <br />
          <Highlight variant="info">@aws-sdk/client-s3</Highlight> — AWS
          SDK v3 S3 client
          <br />
          <Highlight variant="info">@supabase/supabase-js</Highlight> —
          Supabase client SDK
          <br />
          <Highlight variant="info">openai</Highlight> — OpenAI official SDK
        </p>
        <p className="text-slate-400 text-sm mt-3">
          The key distinction: an SDK is <strong>provider-maintained</strong>.
          When Stripe updates their API, their SDK is updated to match. A
          community-built wrapper library would lag behind.
        </p>
      </Card>
    </Grid>,

    <Grid key="grid-layers-2" cols={2} gap={6}>
      <Card
        title="Layer 5 — npm Packages / Open-Source Libraries"
        description="Community-published. The broadest, most variable layer."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          This is the "anything goes" layer. Any developer can publish to npm
          (or JSR). These packages solve generic problems — HTTP clients,
          validation, date formatting, state management, testing utilities.
          They're not tied to any single service.
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="primary">axios</Highlight> — HTTP client
          <br />
          <Highlight variant="primary">zod</Highlight> — Schema validation
          <br />
          <Highlight variant="primary">dayjs</Highlight> — Date manipulation
          <br />
          <Highlight variant="primary">lodash</Highlight> — Utility functions
          <br />
          <Highlight variant="primary">react-query</Highlight> — Server state
          <br />
          <Highlight variant="primary">jest</Highlight> — Test runner
        </p>
        <p className="text-slate-400 text-sm mt-3">
          Quality varies enormously. Some packages have hundreds of millions of
          weekly downloads (lodash); others are abandoned after one commit.
          Supply chain attacks (e.g., event-stream) happen at this layer.
        </p>
      </Card>

      <Card
        title="Layer 6 — Framework Abstractions"
        description="Opinionated APIs that sit on top of everything else."
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          Frameworks like React, Next.js, Vue, or Express expose their own
          API surfaces. These are technically npm packages, but they're special
          because they <strong>control the execution model</strong> — they
          decide when your code runs, how state flows, how routing works.
        </p>
        <p className="text-slate-400 text-sm">
          <Highlight variant="warning">React:</Highlight>{" "}
          <code>useState</code>, <code>useEffect</code>,{" "}
          <code>useContext</code>
          <br />
          <Highlight variant="warning">Next.js:</Highlight>{" "}
          <code>next/router</code>, <code>getServerSideProps</code>,{" "}
          <code>next/image</code>
          <br />
          <Highlight variant="warning">Express:</Highlight>{" "}
          <code>app.get()</code>, <code>req</code>, <code>res</code>,{" "}
          <code>next()</code>
        </p>
        <p className="text-slate-400 text-sm mt-3">
          These are <em>not</em> language features you're calling — they're
          conventions enforced by the framework's runtime. They often abstract
          away Layers 2–5 underneath.
        </p>
      </Card>
    </Grid>,

    <h2 key="h-sdk-vs-lib" className="text-xl font-bold text-white mt-10 mb-4">
      SDK vs. Library — The Most Common Confusion
    </h2>,

    <Callout key="callout-sdklib" type="info" title="Mental Model">
      A <strong>library</strong> is a collection of reusable functions you call
      on your own terms. An <strong>SDK</strong> is a complete kit from a
      vendor — it includes the library PLUS documentation, auth helpers, type
      definitions, and often a CLI. All SDKs are libraries, but not all
      libraries are SDKs.
    </Callout>,

    <Table
      key="table-sdk-vs-lib"
      headers={["Dimension", "Library (npm package)", "SDK (vendor kit)"]}
      rows={[
        ["Author", "Community / OSS", "Service vendor (official)"],
        ["Scope", "Generic utility", "Specific platform/service"],
        ["Auth handling", "You handle it", "Built-in credential management"],
        ["Versioning", "Independent", "Mirrors vendor API version"],
        ["Trust level", "Variable", "Official — vendor owns it"],
        ["Example", "axios, lodash, zod", "stripe, firebase, @aws-sdk/*"],
      ]}
    />,

    <h2 key="h-code-ex" className="text-xl font-bold text-white mt-10 mb-4">
      The Same Task Across All Layers
    </h2>,

    <p key="p-code-intro" className="text-slate-400 mb-4">
      Sending an HTTP POST request — solved at every layer:
    </p>,

    <CodeBlock
      key="code-builtin"
      title="Layer 3 — Browser built-in (fetch API)"
      language="typescript"
      code={`// No install. Ships in all modern browsers & Node 18+.
const res = await fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "value" }),
});
const json = await res.json();`}
    />,

    <CodeBlock
      key="code-axios"
      title="Layer 5 — npm library (axios)"
      language="typescript"
      code={`// npm install axios
import axios from "axios";

// axios handles JSON serialization, error status codes, interceptors
const { data } = await axios.post("https://api.example.com/data", {
  key: "value",
});`}
    />,

    <CodeBlock
      key="code-stripe-sdk"
      title="Layer 4 — Client SDK (Stripe)"
      language="typescript"
      code={`// npm install stripe
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// No manual fetch. SDK manages auth headers, retries, error types.
const charge = await stripe.paymentIntents.create({
  amount: 2000,
  currency: "usd",
  payment_method_types: ["card"],
});
// charge.id, charge.status — fully typed by the SDK`}
    />,

    <CodeBlock
      key="code-node-crypto"
      title="Layer 2 — Node.js Runtime API (crypto)"
      language="typescript"
      code={`// No install. Ships with Node.js runtime.
import { createHash } from "crypto"; // runtime module, not a language built-in

const hash = createHash("sha256")
  .update("hello world")
  .digest("hex");
// Not available in a browser without a polyfill or Web Crypto API fallback`}
    />,

    <h2 key="h-runtime-env" className="text-xl font-bold text-white mt-10 mb-4">
      Runtime Environments & What Each Layer Has Access To
    </h2>,

    <Table
      key="table-env"
      headers={["", "Browser", "Node.js", "Deno", "Cloudflare Workers"]}
      rows={[
        ["Language Built-ins", "✅", "✅", "✅", "✅"],
        ["Node.js Runtime APIs (fs, path…)", "❌", "✅", "❌*", "❌"],
        ["Browser APIs (document, fetch…)", "✅", "❌**", "✅ (partial)", "✅ (partial)"],
        ["npm packages", "via bundler", "✅", "via npm:", "✅"],
        ["Client SDKs / Libraries", "via bundler", "✅", "✅", "limited"],
        ["Framework APIs", "via bundler", "✅", "✅", "limited"],
      ]}
    />,

    <p key="p-env-note" className="text-slate-400 text-sm mt-2">
      * Deno provides its own file system API (<code>Deno.readFile</code>). **
      Node 18+ added the global <code>fetch</code> and partial Web APIs.
    </p>,

    <h2 key="h-traps" className="text-xl font-bold text-white mt-10 mb-4">
      Common Traps & Misconceptions
    </h2>,

    <Grid key="grid-traps" cols={2} gap={6}>
      <Card title="🪤 Trap: 'fetch is a JS feature'" description="">
        <p className="text-slate-300 text-sm leading-relaxed">
          <code>fetch</code> is a <strong>Browser API</strong> (Layer 3), not
          part of JavaScript. It was later adopted into Node.js 18+. In Node
          17 and below, calling <code>fetch</code> throws{" "}
          <code>fetch is not defined</code>. This is why <code>node-fetch</code>{" "}
          existed — a Layer 5 polyfill for a Layer 3 concept.
        </p>
      </Card>

      <Card title="🪤 Trap: 'axios is better than fetch'" description="">
        <p className="text-slate-300 text-sm leading-relaxed">
          This is a layer confusion. <code>fetch</code> is a platform primitive
          — lightweight but low-level. <code>axios</code> is a utility library
          that adds interceptors, auto JSON parsing, and cleaner error handling.
          Neither is universally "better"; they solve different granularity
          problems.
        </p>
      </Card>

      <Card title="🪤 Trap: 'The SDK is just a wrapper'" description="">
        <p className="text-slate-300 text-sm leading-relaxed">
          SDKs are much more than thin wrappers. The AWS SDK v3 uses a modular
          middleware stack, exponential backoff, credential chains, regional
          endpoint resolution, and presigned URL support. Replacing it with raw{" "}
          <code>fetch</code> calls would take months to re-implement correctly.
        </p>
      </Card>

      <Card title="🪤 Trap: 'npm install fixes everything'" description="">
        <p className="text-slate-300 text-sm leading-relaxed">
          Reaching for npm first is a supply-chain risk. For built-in tasks
          (hashing, UUID generation, base64), prefer Layer 2 runtime APIs
          (Node <code>crypto</code>) or Layer 3 browser APIs (
          <code>crypto.subtle</code>). Every dependency is a security and
          maintenance surface.
        </p>
      </Card>
    </Grid>,

    <h2 key="h-decision" className="text-xl font-bold text-white mt-10 mb-4">
      Decision Framework: Which Layer Should I Reach For?
    </h2>,

    <Flow
      key="flow-decision"
      steps={[
        {
          title: "Step 1 — Does the language built-in do it?",
          description:
            "Array methods, String methods, Object utilities, Promise, Math — if the native API exists and is sufficient, stop here. No install, no risk.",
        },
        {
          title: "Step 2 — Does the runtime/platform API do it?",
          description:
            "Node crypto, fs, path? Browser fetch, localStorage, WebSocket, Canvas? These are first-class and dependency-free. Always prefer before installing.",
        },
        {
          title: "Step 3 — Is there an official vendor SDK?",
          description:
            "If you're integrating with a third-party service (Stripe, Firebase, S3), use their official SDK. It handles auth, versioning, and retries correctly. Don't roll your own HTTP layer against a complex API.",
        },
        {
          title: "Step 4 — Is there a battle-tested npm library?",
          description:
            "For generic utility needs not covered above (validation, date manipulation, complex state), choose well-maintained, audited libraries. Check weekly downloads, last publish date, and security advisories.",
        },
        {
          title: "Step 5 — Does a framework abstraction make sense?",
          description:
            "Only if you're already in that framework's paradigm. Don't pull in a full framework (React, Express) for a utility script. Frameworks add enormous surface area and lock-in.",
        },
      ]}
    />,

    <Callout key="callout-final" type="tip" title="The Golden Rule">
      Always prefer the lowest layer that solves the problem correctly. Built-in
      {">"} Runtime API {">"} Browser API {">"} SDK {">"} Library {">"}{" "}
      Framework. Going higher adds dependencies, complexity, and supply-chain
      risk.
    </Callout>,
  ],
};
