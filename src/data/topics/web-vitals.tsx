import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";

export const webVitalsTopic: Topic = {
  id: "web-vitals",
  title: "Core Web Vitals",
  description:
    "A deep dive into measuring, tracking, and actively fixing the three performance metrics that dictate your website's baseline SEO and user experience.",
  tags: ["frontend", "performance", "seo", "architecture"],
  icon: "Zap",
  content: [
    <p key="1" className="mb-6">
      Core Web Vitals are a set of standardized metrics established by Google to evaluate the perceived user experience of a webpage. If your <Highlight variant="primary">React dashboard</Highlight> looks beautiful on a high-end laptop but has an unresponsive UI on a 3G mobile device, users will bounce, and Google's algorithm will actively demote your search rankings. Understanding what they are is not enough; you must know exactly how to architect solutions for them.
    </p>,
    
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Vitals Overview
    </h3>,

    <Table
      key="3"
      headers={["Metric", "Definition", "The Target Score"]}
      rows={[
        ["LCP (Largest Contentful Paint)", "How long it takes the largest image or text block to become fully visible.", "< 2.5 seconds"],
        ["INP (Interaction to Next Paint)", "The latency of the UI responding to a physical user input (like a click).", "< 200 milliseconds"],
        ["CLS (Cumulative Layout Shift)", "The visual stability metric measuring unexpected layout movements.", "< 0.1 score"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Common Issues & Actionable Solutions
    </h3>,

    <Grid key="5" cols={1} gap={6} className="mb-8">
      <Card title="Fixing LCP (Loading Constraints)">
        <p className="text-sm text-foreground mb-4">
          <strong>The Problem:</strong> LCP is almost always bottlenecked by either slow server response times (TTFB) or client-side rendering architecture where a huge JavaScript bundle must be downloaded and parsed before an image even begins downloading.
        </p>
        <p className="text-sm font-semibold mb-2">Architectural Solutions:</p>
        <ul className="text-sm text-slate-400 list-disc pl-5 space-y-2">
          <li><strong>Server-Side Rendering (SSR):</strong> Use frameworks like Next.js or Astro to return fully constructed HTML instantly, sending the LCP element immediately to the browser without a Javascript wall.</li>
          <li><strong>Preloading Critical Assets:</strong> Add <code>&lt;link rel="preload" as="image" href="..." /&gt;</code> into the <code>&lt;head&gt;</code> for your hero image so the browser physically fetches it with priority immediately.</li>
          <li><strong>Asset Optimization:</strong> Serve images in modernized formats like WebP or AVIF and physically cache them heavily behind a global Edge CDN.</li>
        </ul>
      </Card>

      <Card title="Fixing INP (Responsiveness)">
        <p className="text-sm text-foreground mb-4">
          <strong>The Problem:</strong> INP fails when the browser's Main Thread is heavily blocked by synchronous JavaScript execution. If the user clicks a button but React is busy computing a massive 500-item state array, the visual click effect is delayed.
        </p>
        <p className="text-sm font-semibold mb-2">Architectural Solutions:</p>
        <ul className="text-sm text-slate-400 list-disc pl-5 space-y-2">
          <li><strong>Yielding to the Main Thread:</strong> Break massive, long-running mathematical or fetching tasks into smaller chunks utilizing <code>setTimeout</code> or <code>requestIdleCallback</code> so the browser has a scheduled gap to visually update.</li>
          <li><strong>Web Workers:</strong> Offload heavy data processing to a background Web Worker isolated thread entirely independent of the main UI thread.</li>
          <li><strong>Throttle & Debounce:</strong> For subsequent rapid inputs, ensure you debounce the UI state changes aggressively to prevent unnecessary re-rendering storms.</li>
        </ul>
      </Card>

      <Card title="Fixing CLS (Visual Stability)">
        <p className="text-sm text-foreground mb-4">
          <strong>The Problem:</strong> CLS happens when asynchronous visual elements suddenly arrive over the network and forcefully push existing DOM nodes downward, causing text jumps and frustrating mis-clicks.
        </p>
        <p className="text-sm font-semibold mb-2">Architectural Solutions:</p>
        <ul className="text-sm text-slate-400 list-disc pl-5 space-y-2">
          <li><strong>Explicit Dimensions:</strong> Always declare strict <code>width</code> and <code>height</code> attributes (or <code>aspect-ratio</code> in CSS) precisely on all images or iframes so the browser naturally reserves that exact box before data loads.</li>
          <li><strong>Layout Skeletons:</strong> Before a dynamic component loads, insert structured Skeleton loaders of the exact final dimensions to prevent pushing real content later.</li>
          <li><strong>Web Fonts Protection:</strong> Use <code>font-display: optional</code> to avoid the "Flash of Unstyled Text" (FOUT) jumping layout bug when custom fonts replace default fonts.</li>
        </ul>
      </Card>
    </Grid>,

    <Callout key="6" type="warning" title="The React useEffect Trap">
      A massive anti-pattern in pure Single Page Applications (SPAs) is the <code>useEffect</code> waterfall trap. Developers will often load a completely blank <code>&lt;div&gt;</code> screen to the user, purposefully wait for a backend HTTP Fetch request inside a `useEffect`, and only then render the Hero image. This mathematically destroys your LCP because the browser natively sits idle doing nothing while waiting sequentially. Adopt an SSR framework to render this critically immediately.
    </Callout>,
  ],
};
