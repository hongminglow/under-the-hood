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
    "How to theoretically deliver your React logic across the globe so Google SEO doesn't viciously penalize you — and how Next.js 15 caching flips the entire model on its head.",
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
          "CSR",
          "Client-Side Rendering",
          "Traditional React. Sends empty HTML. The user's browser burns CPU building the entire UI from scratch via JavaScript.",
          "Internal SaaS dashboards hidden behind auth. SEO explicitly does not matter here.",
        ],
        [
          "SSR",
          "Server-Side Rendering",
          "A real Node server builds the full HTML string on every single request on-the-fly, then sends it. Great for SEO, but every request costs compute.",
          "Dynamic content that changes every second — Twitter feed, live stock prices, user-specific dashboards.",
        ],
        [
          "SSG",
          "Static-Site Generation",
          "During the CI/CD build phase, every page is pre-rendered into physical HTML files. Insanely fast (CDN-served), but requires a full re-deploy to update any content.",
          "Marketing sites, blogs, documentation pages where content changes infrequently.",
        ],
        [
          "ISR",
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
      headers={["Metric", "CSR", "SSR", "SSG / ISR", "What it measures"]}
      rows={[
        [
          "TTFB",
          "🟢 Fast",
          "🔴 Slow",
          "🟢 Instant",
          "Time until browser receives first byte from server.",
        ],
        [
          "FCP",
          "🔴 Slow (2–3s blank screen)",
          "🟢 Fast (~200ms)",
          "🟢 Instant (~50ms CDN)",
          "Time until first visible content appears on screen.",
        ],
        [
          "TTI",
          "🟡 Varies",
          "🟡 Varies",
          "🟡 Varies",
          "Time until page is fully interactive. ALL strategies wait for JS to hydrate.",
        ],
        [
          "LCP",
          "🔴 Penalized by Google",
          "🟢 Strong",
          "🟢 Strongest",
          "Largest Contentful Paint. Directly impacts Google ranking.",
        ],
        [
          "CLS",
          "🔴 High risk",
          "🟡 Medium risk",
          "🟢 Low risk",
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
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
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
        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
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

    /* ─── SECTION 5: Next.js Caching Layers ────────────────────────────── */
    <h3 key="cache-title" className="text-xl font-bold mt-12 mb-2">
      The Next.js 15 Caching Model — 4 Layers Deep
    </h3>,
    <p key="cache-sub" className="text-muted-foreground mb-6">
      Next.js has an aggressive, multi-layered caching system that most
      developers don't fully understand. Missing any one layer means either
      stale data or performance regressions. Here's the full stack:
    </p>,
    <Table
      key="cache-table"
      headers={["Cache Layer", "What it caches", "Storage", "Duration"]}
      rows={[
        [
          "Request Memoization",
          "Deduplicated fetch() calls within a single render pass",
          "In-memory (per request)",
          "Single render cycle only — cleared after each request",
        ],
        [
          "Data Cache",
          "fetch() responses tagged with cache config",
          "Server-side persistent cache (filesystem / Redis)",
          "Persistent until revalidated (revalidate: 3600 or revalidateTag)",
        ],
        [
          "Full Route Cache",
          "The entire rendered HTML + RSC payload of a route",
          "Server filesystem",
          "Persistent until revalidation or re-deploy",
        ],
        [
          "Router Cache",
          "RSC payloads prefetched for routes the user may navigate to",
          "Browser memory (client-side)",
          "30s for dynamic, 5 min for static — auto-invalidates",
        ],
      ]}
    />,

    /* ─── SECTION 6: fetch() Caching & Revalidation ────────────────────── */
    <h3 key="fetch-title" className="text-xl font-bold mt-12 mb-4">
      Controlling the Data Cache: <code>fetch()</code> Options
    </h3>,
    <p key="fetch-sub" className="text-muted-foreground mb-6">
      In Next.js App Router, the native <code>fetch()</code> API is extended
      with caching controls. This is the primary way you tune how aggressively
      your server caches external API or database responses:
    </p>,
    <Grid key="fetch-grid" cols={2} gap={6} className="mb-4">
      <Card
        title="force-cache — Static (SSG behaviour)"
        description="Cache forever until manually revalidated"
      >
        <CodeBlock
          title="fetch with force-cache"
          language="typescript"
          code={`// Cached on disk. Behaves like SSG.
// Re-fetched only on deploy OR revalidateTag()
const data = await fetch("https://api.shop.com/products", {
  cache: "force-cache",           // default in Next 13/14
  next: { tags: ["products"] },  // tag it for targeted invalidation
});`}
        />
        <p className="text-xs text-slate-400 mt-3">
          Use for: product catalogs, blog posts, CMS content — anything that
          doesn't change per-request.
        </p>
      </Card>
      <Card
        title="no-store — Dynamic (SSR behaviour)"
        description="Never cache — fresh fetch on every request"
      >
        <CodeBlock
          title="fetch with no-store"
          language="typescript"
          code={`// Never cached. Runs fresh on every single request.
// Behaves like classic SSR. Opts the entire route into dynamic rendering.
const data = await fetch("https://api.shop.com/cart", {
  cache: "no-store",
});`}
        />
        <p className="text-xs text-slate-400 mt-3">
          Use for: shopping cart, user-specific data, live prices, anything with
          auth headers.
        </p>
      </Card>
      <Card
        title="revalidate — Time-Based ISR"
        description="Cache for N seconds, then background refresh"
      >
        <CodeBlock
          title="fetch with revalidate"
          language="typescript"
          code={`// Cached for 3600 seconds (1 hour).
// After 1 hour, next request gets stale data while
// Next.js regenerates fresh data silently in the background.
const data = await fetch("https://api.shop.com/featured", {
  next: { revalidate: 3600 },
});`}
        />
        <p className="text-xs text-slate-400 mt-3">
          Use for: featured products, news headlines, anything acceptable to be
          slightly stale.
        </p>
      </Card>
      <Card
        title="tags — On-Demand Invalidation"
        description="Tag the cache, then surgically invalidate it from a Server Action"
      >
        <CodeBlock
          title="fetch with tags + revalidateTag"
          language="typescript"
          code={`// Tag the fetch in your component:
const data = await fetch("https://api.shop.com/product/42", {
  next: { tags: ["product-42", "products"] },
});

// Then in a Server Action (e.g., after a CMS webhook):
import { revalidateTag } from "next/cache";

export async function onProductUpdate() {
  revalidateTag("product-42"); // Surgically busts only this product's cache
}`}
        />
        <p className="text-xs text-slate-400 mt-3">
          Use for: CMS webhooks, admin panel updates — invalidating exactly what
          changed, nothing more.
        </p>
      </Card>
    </Grid>,

    /* ─── SECTION 7: cache() function ──────────────────────────────────── */
    <h3 key="cache-fn-title" className="text-xl font-bold mt-12 mb-4">
      React's <code>cache()</code> — Server-Side Request Deduplication
    </h3>,
    <p key="cache-fn-sub" className="text-muted-foreground mb-6">
      React 18 shipped a native <code>cache()</code> function for use with
      Server Components. It memoizes a function's return value{" "}
      <em>within a single server render pass</em>. If five different Server
      Components on the same page all call <code>getUser(userId)</code>, the
      actual database query only runs <strong>once</strong> — the result is
      shared across the render tree.
    </p>,
    <Grid key="cache-fn-grid" cols={2} gap={6} className="mb-4">
      <Card title="Without cache() — N database queries">
        <CodeBlock
          title="lib/data.ts — No deduplication"
          language="typescript"
          code={`// Called in Header, Sidebar, and ProfileCard on same page =
// 3 separate database queries for the same user!
export async function getUser(id: string) {
  return await db.users.findUnique({ where: { id } });
}`}
        />
      </Card>
      <Card title="With cache() — 1 database query, shared result">
        <CodeBlock
          title="lib/data.ts — React cache()"
          language="typescript"
          code={`import { cache } from "react";

// Wrap in cache(). Now ALL components calling getUser("123")
// in the same render share one single DB result.
export const getUser = cache(async (id: string) => {
  return await db.users.findUnique({ where: { id } });
});`}
        />
      </Card>
    </Grid>,
    <Callout
      key="cache-fn-note"
      type="info"
      title="cache() vs fetch() deduplication"
    >
      Next.js already deduplicates <code>fetch()</code> calls automatically
      within a single render pass. But <code>cache()</code> is for{" "}
      <strong>non-fetch operations</strong> — ORM queries (Prisma, Drizzle), SDK
      calls (Stripe, Twilio), or any async utility function that doesn't use{" "}
      <code>fetch</code> internally.
    </Callout>,

    /* ─── SECTION 8: Route Segment Config ──────────────────────────────── */
    <h3 key="segment-title" className="text-xl font-bold mt-12 mb-4">
      Route Segment Config — Page-Level Cache Overrides
    </h3>,
    <p key="segment-sub" className="text-muted-foreground mb-6">
      Beyond individual <code>fetch()</code> calls, you can control the entire
      route's rendering and caching strategy from the top of any{" "}
      <code>page.tsx</code> or <code>layout.tsx</code> using exported constants:
    </p>,
    <CodeBlock
      key="segment-code"
      title="app/shop/page.tsx — Route Segment Config"
      language="typescript"
      code={`// Force the ENTIRE route to be statically rendered at build time
export const dynamic = "force-static";

// OR: Force every visit to be dynamic (SSR, no cache)
export const dynamic = "force-dynamic";

// Time-based ISR at the route level (no need to set on every fetch)
export const revalidate = 3600; // 1 hour

// Control the runtime environment this route runs in
export const runtime = "edge"; // Deploy to Vercel Edge Network globally
// export const runtime = "nodejs"; // default — full Node.js capabilities`}
    />,
    <Table
      key="dynamic-table"
      headers={["dynamic value", "Behaviour", "Equivalent to"]}
      rows={[
        [
          "'auto' (default)",
          "Next.js decides based on fetch() options and APIs used",
          "Smart default — varies per component",
        ],
        [
          "'force-static'",
          "Force SSG. Dynamic functions (cookies, headers) return empty values",
          "SSG — cached at build time",
        ],
        [
          "'force-dynamic'",
          "Force SSR. Every request runs fresh. Cache is bypassed entirely",
          "SSR — no cache at all",
        ],
        [
          "'error'",
          "Force static but throw a build error if dynamic functions are used",
          "Strict SSG — catches mistakes at build time",
        ],
      ]}
    />,

    /* ─── SECTION 9: revalidatePath & revalidateTag ─────────────────────  */
    <h3 key="revalidate-title" className="text-xl font-bold mt-12 mb-4">
      On-Demand Revalidation: <code>revalidatePath</code> vs{" "}
      <code>revalidateTag</code>
    </h3>,
    <p key="revalidate-sub" className="text-muted-foreground mb-6">
      Time-based <code>revalidate</code> waits for the timer. But when a CMS
      editor publishes an article, you want the cache busted <em>right now</em>.
      Next.js provides two surgical tools for this via Server Actions or Route
      Handlers:
    </p>,
    <Grid key="revalidate-grid" cols={2} gap={6} className="mb-4">
      <Card
        title="revalidatePath()"
        description="Invalidates the Full Route Cache for a specific URL path"
      >
        <CodeBlock
          title="Route Handler — CMS webhook"
          language="typescript"
          code={`import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  // Bust the cache for one specific blog post page
  revalidatePath(\`/blog/\${slug}\`);

  // Or bust the entire /blog section
  revalidatePath("/blog", "layout");

  return Response.json({ revalidated: true });
}`}
        />
        <p className="text-xs text-slate-400 mt-3">
          ⚠️ Busts the <em>entire route's HTML cache</em>. Broader, but simpler.
          Good for simple CMS setups.
        </p>
      </Card>
      <Card
        title="revalidateTag()"
        description="Surgically invalidates the Data Cache for a specific tag"
      >
        <CodeBlock
          title="Server Action — After admin edit"
          language="typescript"
          code={`"use server";
import { revalidateTag } from "next/cache";

export async function updateProduct(id: string, data: FormData) {
  // 1. Update in database
  await db.products.update({ where: { id }, data: ... });

  // 2. Surgically bust only the cache entries tagged "products"
  // Any fetch() with next: { tags: ["products"] } is now stale
  revalidateTag("products");
  revalidateTag(\`product-\${id}\`); // even more targeted
}`}
        />
        <p className="text-xs text-slate-400 mt-3">
          ✅ More surgical — only re-fetches data, not full HTML. Perfect with
          fine-grained cache tags.
        </p>
      </Card>
    </Grid>,

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
