import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const ssrVsCsrTopic: Topic = {
  id: "ssr-vs-csr",
  title: "SSR vs CSR vs SSG vs ISR",
  description:
    "The critical rendering strategy spectrum: when to render HTML on the server, the client, at build time, or incrementally.",
  tags: ["frontend", "performance", "seo", "nextjs"],
  icon: "Monitor",
  content: [
    <p key="1">
      <strong>Where</strong> your HTML is generated has massive implications for
      performance, SEO, and user experience. Modern meta-frameworks like
      Next.js, Nuxt, and SvelteKit allow mixing strategies per-route.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Client-Side Rendering (CSR)">
        <p className="text-sm mb-3">
          The server sends an empty HTML shell with a large JS bundle. The
          browser downloads, parses, and executes JS to render the UI.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ Simple hosting (any static CDN).</li>
          <li>✅ Rich interactivity after initial load.</li>
          <li>❌ Blank page until JS loads (poor First Contentful Paint).</li>
          <li>❌ Bad for SEO (crawlers see empty HTML).</li>
        </ul>
      </Card>
      <Card title="Server-Side Rendering (SSR)">
        <p className="text-sm mb-3">
          The server runs the framework on every request, generates full HTML,
          and sends it to the browser. JS then "hydrates" it for interactivity.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ Instant First Contentful Paint.</li>
          <li>✅ Great SEO (crawlers see full content).</li>
          <li>❌ Higher server cost (CPU per request).</li>
          <li>❌ Hydration mismatch bugs can be subtle.</li>
        </ul>
      </Card>
      <Card title="Static Site Generation (SSG)">
        <p className="text-sm mb-3">
          All pages are pre-rendered to HTML at <strong>build time</strong>. The
          output is pure static files served from a CDN.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ Fastest possible TTFB (pre-built HTML from CDN).</li>
          <li>✅ Zero server runtime cost.</li>
          <li>❌ Stale data until the next re-build.</li>
          <li>❌ Build times explode with thousands of pages.</li>
        </ul>
      </Card>
      <Card title="Incremental Static Regen (ISR)">
        <p className="text-sm mb-3">
          Pages are statically generated but automatically re-generated in the
          background after a configurable <code>revalidate</code> interval.
        </p>
        <ul className="text-sm space-y-1 text-emerald-400 list-disc pl-4">
          <li>✅ CDN speed with near-real-time data freshness.</li>
          <li>✅ No full re-builds needed.</li>
          <li>❌ Stale-while-revalidate means first visitor gets old data.</li>
          <li>❌ Primarily a Next.js / Vercel feature.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="3" type="tip" title="The Hybrid Approach">
      The best architectures mix strategies per route. A marketing landing page
      uses SSG for speed. A dashboard uses CSR for interactivity. A product page
      uses ISR for SEO + freshness. A checkout page uses SSR for personalization
      and security.
    </Callout>,
  ],
};
