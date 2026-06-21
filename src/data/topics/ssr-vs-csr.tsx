import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const ssrVsCsrTopic: Topic = {
  id: "ssr-vs-csr",
  title: "SSR vs CSR vs SSG vs ISR",
  description:
    "How React rendering strategies trade off SEO, speed, and server cost — and how React Server Components and Suspense streaming reshape the model.",
  tags: ["frontend", "architecture", "react", "nextjs"],
  icon: "Globe",
  content: [
    <p key="intro-1">
      When you run <code>create-react-app</code>, your physical HTML file is
      literally empty: <code>{'<div id="root"></div>'}</code>. The user stares
      at a stark white screen for 3 seconds while your massive 2MB{" "}
      <code>bundle.js</code> downloads and magically injects the entire DOM via
      JavaScript. Every rendering strategy since has been an attempt to solve
      this exact problem.
    </p>,

    /* ─── SECTION 1: The Rendering Matrix ──────────────────────────────── */
    <h3 key="matrix-title" className="text-xl font-bold mt-12 mb-4">
      The Next.js Rendering Matrix
    </h3>,
    <Table
      key="matrix-table"
      headers={["Acronym", "Name", "How it renders HTML", "Best For"]}
      rows={[
        [
          "<span class='text-amber-700 dark:text-amber-400'>CSR</span>",
          "Client-Side Rendering",
          "Traditional React. Sends empty HTML. The user's browser burns CPU building the entire UI from scratch via JavaScript.",
          "Internal SaaS dashboards hidden behind auth. SEO explicitly does not matter here.",
        ],
        [
          "<span class='text-cyan-700 dark:text-cyan-400'>SSR</span>",
          "Server-Side Rendering",
          "A real Node server builds the full HTML string on every single request on-the-fly, then sends it. Great for SEO, but every request costs compute.",
          "Dynamic content that changes every second — Twitter feed, live stock prices, user-specific dashboards.",
        ],
        [
          "<span class='text-emerald-700 dark:text-emerald-400'>SSG</span>",
          "Static-Site Generation",
          "During the CI/CD build phase, every page is pre-rendered into physical HTML files. Insanely fast (CDN-served), but requires a full re-deploy to update any content.",
          "Marketing sites, blogs, documentation pages where content changes infrequently.",
        ],
        [
          "<span class='text-teal-700 dark:text-teal-400'>ISR</span>",
          "Incremental Static Regeneration",
          "SSG with a background refresh timer. 'Regenerate this specific page at most once every 60 seconds.' Old cache is served instantly while the new one is built silently.",
          "E-commerce product pages where prices update periodically but don't need millisecond accuracy.",
        ],
      ]}
    />,
    <Callout
      key="hydration-callout"
      type="warning"
      title="The Hydration tax — every SSR/SSG page pays this"
    >
      If a server sends pure HTML (SSR/SSG/ISR), it <em>looks</em> great
      instantly, but buttons won't work yet. React must download the full
      JavaScript bundle in the background and silently re-attach event listeners
      to the static DOM nodes. This process is called <strong>Hydration</strong>{" "}
      and it is the reason TTI (Time to Interactive) lags behind FCP (First
      Contentful Paint) even on SSR pages.
    </Callout>,

    /* ─── SECTION 2: Performance Metrics ───────────────────────────────── */
    <h3 key="perf-title" className="text-xl font-bold mt-12 mb-4">
      Core Web Vitals Breakdown
    </h3>,
    <Table
      key="perf-table"
      headers={[
        "Metric",
        "<span class='text-amber-700 dark:text-amber-400'>CSR</span>",
        "<span class='text-cyan-700 dark:text-cyan-400'>SSR</span>",
        "<span class='text-emerald-700 dark:text-emerald-400'>SSG</span> / <span class='text-teal-700 dark:text-teal-400'>ISR</span>",
        "What it measures",
      ]}
      rows={[
        [
          "TTFB",
          "Fast",
          "Slower",
          "Instant",
          "Time until browser receives first byte from server.",
        ],
        [
          "FCP",
          "Slow (2-3s blank screen)",
          "Fast (~200ms)",
          "Instant (~50ms CDN)",
          "Time until first visible content appears on screen.",
        ],
        [
          "TTI",
          "Varies",
          "Varies",
          "Varies",
          "Time until page is fully interactive. ALL strategies wait for JS to hydrate.",
        ],
        [
          "LCP",
          "Penalized by Google",
          "Strong",
          "Strongest",
          "Largest Contentful Paint. Directly impacts Google ranking.",
        ],
        [
          "CLS",
          "High risk",
          "Medium risk",
          "Low risk",
          "Cumulative Layout Shift — SSR/SSG HTMLs prevent jarring layout jumps.",
        ],
      ]}
    />,

    /* ─── SECTION 3: React Server Components — The Architecture Shift ──── */
    <h3 key="rsc-title" className="text-xl font-bold mt-12 mb-2">
      React Server Components (RSC) — The Paradigm Shift
    </h3>,
    <p key="rsc-sub" className="text-muted-foreground mb-6">
      Next.js 13+ App Router introduced <strong>React Server Components</strong>
      , which is the single biggest architectural shift in React since hooks.
      RSC is <em>not</em> the same as SSR. It changes <em>where</em> components
      live permanently, not just where they render initially.
    </p>,
    <Grid key="rsc-grid" cols={2} gap={6} className="mb-8">
      <Card
        title="Server Component (default in App Router)"
        description="Renders on server. Never ships to client."
      >
        <ul className="text-sm text-slate-700 dark:text-slate-400 space-y-2 list-disc pl-4">
          <li>
            Can <code>async/await</code> directly inside the component — no{" "}
            <code>useEffect</code> needed.
          </li>
          <li>Can access databases, file system, secret env vars directly.</li>
          <li>
            <strong>Zero JavaScript sent to the browser</strong> for this
            component.
          </li>
          <li>
            Cannot use <code>useState</code>, <code>useEffect</code>, or any
            browser API.
          </li>
          <li>
            Cannot attach event handlers (<code>onClick</code>,{" "}
            <code>onChange</code>).
          </li>
        </ul>
        <CodeBlock
          title="app/products/page.tsx — Server Component"
          language="typescript"
          code={`// No "use client" directive = Server Component by default
// This async/await runs on the server. DB secret never exposed!
export default async function ProductsPage() {
  const products = await db.query("SELECT * FROM products");
  return <ProductList items={products} />;
}`}
        />
      </Card>
      <Card
        title="Client Component ('use client')"
        description="Hydrated on client. Ships JS to browser."
      >
        <ul className="text-sm text-slate-700 dark:text-slate-400 space-y-2 list-disc pl-4">
          <li>
            Requires <code>'use client'</code> at the top of the file.
          </li>
          <li>
            Can use <code>useState</code>, <code>useEffect</code>, browser APIs,
            event handlers.
          </li>
          <li>
            Ships JavaScript to the browser — the component is hydrated on the
            client.
          </li>
          <li>
            Cannot directly <code>await</code> a database query.
          </li>
          <li>Is the boundary where interactivity begins.</li>
        </ul>
        <CodeBlock
          title="components/AddToCart.tsx — Client Component"
          language="typescript"
          code={`'use client'
// Anything below here ships JavaScript to the browser
import { useState } from "react";

export function AddToCart({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}`}
        />
      </Card>
    </Grid>,
    <Callout
      key="rsc-insight"
      type="tip"
      title="The Golden Rule: Push 'use client' as deep as possible"
    >
      Your page tree should be mostly Server Components (free, fast, zero JS)
      with <code>'use client'</code> islands pushed to small, interactive leaf
      nodes. A common mistake is marking an entire layout as a Client Component
      — this ships the entire component's JS to the browser unnecessarily and
      defeats the purpose of RSC.
    </Callout>,

    /* ─── SECTION 4: Suspense & Streaming ──────────────────────────────── */
    <h3 key="streaming-title" className="text-xl font-bold mt-12 mb-4">
      Suspense Streaming — Solving the SSR Waterfall
    </h3>,
    <p key="streaming-sub" className="text-muted-foreground mb-6">
      Traditional SSR had a brutal "all-or-nothing" problem: the server had to
      finish <em>all</em> data fetching before it could send a{" "}
      <em>single byte</em> of HTML. If one slow database query took 3 seconds,
      the user waited 3 seconds for a blank screen.{" "}
      <strong>Streaming with Suspense</strong> solves this by sending HTML in
      chunks.
    </p>,
    <Flow
      key="streaming-flow"
      steps={[
        {
          title: "1. Shell Sent First",
          description:
            "The server immediately streams the page <shell> — header, nav, layout, static content — the moment the request hits. No waiting for any data.",
        },
        {
          title: "2. Suspense Boundaries",
          description:
            "Slow sections (product list, user feed) are wrapped in <Suspense fallback={<Skeleton/>}>. These render a loading skeleton instantly.",
        },
        {
          title: "3. Async Chunks Stream In",
          description:
            "As each async Server Component resolves its data fetch, Next.js streams the completed chunk of HTML into the page — replacing the skeleton inline.",
        },
        {
          title: "4. Progressive Hydration",
          description:
            "Client Components within each chunk hydrate independently as their chunk arrives. Interactivity unlocks progressively, not all at once.",
        },
      ]}
    />,
    <CodeBlock
      key="streaming-code"
      title="app/page.tsx — Streaming with Suspense"
      language="typescript"
      code={`import { Suspense } from "react";
import { ProductList } from "./ProductList";     // slow DB query component
import { Recommendations } from "./Recs";         // even slower ML query
import { Skeleton } from "@/components/Skeleton";

// Shell renders IMMEDIATELY. No waiting!
export default function Page() {
  return (
    <main>
      <h1>Welcome</h1>  {/* Streamed instantly */}

      <Suspense fallback={<Skeleton rows={5} />}>
        <ProductList />  {/* Streams in when its DB query resolves */}
      </Suspense>

      <Suspense fallback={<Skeleton rows={3} />}>
        <Recommendations />  {/* Streams in independently — doesn't block ProductList */}
      </Suspense>
    </main>
  );
}`}
    />,

    /* ─── SECTION 5: How Next.js Maps Strategies to Caching ─────────────── */
    <h3 key="cache-title" className="text-xl font-bold mt-12 mb-4">
      How Next.js Maps These Strategies to Caching
    </h3>,
    <p key="cache-sub" className="text-muted-foreground mb-6">
      In the App Router you don't flip a global "SSR" or "SSG" switch — you pick
      a <strong>caching behaviour per data fetch</strong>, and Next.js derives
      the rendering strategy from it. The mental model is four cache layers
      stacked from request to browser:
    </p>,
    <Table
      key="cache-table"
      headers={["Cache Layer", "What it caches", "Lifetime"]}
      rows={[
        [
          "Request Memoization",
          "Duplicate fetch() calls within one render pass",
          "Single render only",
        ],
        [
          "Data Cache",
          "fetch() responses, keyed by time or tag",
          "Until revalidated",
        ],
        [
          "Full Route Cache",
          "Rendered HTML + RSC payload of a route",
          "Until revalidation / redeploy",
        ],
        [
          "Router Cache",
          "Prefetched RSC payloads for likely navigations",
          "Seconds–minutes (client memory)",
        ],
      ]}
    />,
    <Callout key="cache-knobs" type="tip" title="The knobs that pick your strategy">
      You tune the Data Cache with three <code>fetch()</code> options:{" "}
      <code>cache: "force-cache"</code> (static, SSG-like),{" "}
      <code>cache: "no-store"</code> (dynamic, SSR-like), and{" "}
      <code>next: {"{"} revalidate: N {"}"}</code> (time-based ISR). Tag a fetch with{" "}
      <code>next: {"{"} tags: [...] {"}"}</code> and you can bust it on demand from a
      Server Action via <code>revalidateTag()</code> — the surgical alternative
      to waiting for a timer. That per-fetch decision is what "SSR vs SSG vs ISR"
      actually becomes in modern Next.js.
    </Callout>,

    /* ─── SECTION 10: The SEO Reality ──────────────────────────────────── */
    <h3 key="seo-title" className="text-xl font-bold mt-12 mb-4">
      The SEO Reality
    </h3>,
    <p key="seo-1" className="mb-4">
      Google's crawler <em>can</em> execute JavaScript and index CSR apps, but
      it's unreliable and slow. If your site takes 5 seconds to render
      client-side, Google may give up or rank you lower.{" "}
      <strong>SSR/SSG guarantee</strong> that the HTML is immediately crawlable,
      making them mandatory for content-heavy sites (blogs, e-commerce,
      marketing pages).
    </p>,
    <Callout key="seo-callout" type="info" title="Googlebot and ISR/RSC">
      With ISR and RSC, Googlebot gets the best of both worlds: statically
      served, fully-rendered HTML at CDN speed. Google's Core Web Vitals crawler
      measures TTFB, LCP, and CLS — all of which ISR + Suspense streaming
      optimize aggressively. This is why Next.js App Router is effectively the
      SEO gold standard for React apps in 2025.
    </Callout>,

    /* ─── SECTION 11: Common Mistakes ──────────────────────────────────── */
    <h3 key="mistakes-title" className="text-xl font-bold mt-12 mb-6">
      Common Caching & Rendering Mistakes
    </h3>,
    <MistakeCard
      key="m1"
      number={1}
      title="Marking entire layouts as 'use client'"
      problem="Developer adds 'use client' to app/layout.tsx or a large wrapper because they need one interactive button deep in the tree. Now 100% of the page's JS ships to the browser — zero RSC benefit."
      solution="Keep layouts and pages as Server Components. Extract only the interactive button/form into its own tiny 'use client' file. Push the client boundary as deep down the tree as possible."
    />,
    <MistakeCard
      key="m2"
      number={2}
      title="Using no-store on non-dynamic data"
      problem="Developer sees 'stale data' once and defensively adds cache: 'no-store' to every single fetch(). The entire app becomes SSR — every page re-fetches everything on every request. Server costs triple."
      solution="Use no-store ONLY for genuinely user-specific or real-time data (cart, auth state, live prices). Use revalidate or tags for everything else that just needs to be reasonably fresh."
    />,
    <MistakeCard
      key="m3"
      number={3}
      title="Forgetting that cookies()/headers() opts routes into dynamic rendering"
      problem="Developer calls cookies() or headers() inside a Server Component to read auth. They expect the page to be cached (SSG), but Next.js automatically upgrades the entire route to dynamic (SSR) because these APIs are inherently request-specific."
      solution={
        <>
          Move auth-dependent logic into a separate nested layout or use{" "}
          <code>export const dynamic = 'force-static'</code> carefully.
          Alternatively, use middleware to handle auth before the route layer,
          keeping the page itself cache-friendly.
        </>
      }
    />,
    <MistakeCard
      key="m4"
      number={4}
      title="Not using Suspense boundaries — the full-page loading problem"
      problem="A page has one slow component (a recommendation engine taking 3s). Without Suspense, the entire page waits 3 seconds before sending any HTML. The user sees a blank screen for longer than a pure CSR app."
      solution="Wrap every independently-loading data section in its own <Suspense fallback={<Skeleton/>}>. The page shell and fast sections stream instantly; slow sections arrive progressively."
    />,
  ],
};
