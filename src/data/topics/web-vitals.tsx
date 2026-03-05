import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const webVitalsTopic: Topic = {
  id: "core-web-vitals",
  title: "Core Web Vitals",
  description:
    "Google's definitive performance metrics that dictate whether your website feels fast or ranks highly on search.",
  tags: ["frontend", "performance", "browser"],
  icon: "TrendingUp",
  content: [
    <p key="1">
      Historically, developers measured performance by asking "When does the
      `window.onload` event fire?" But users don't care when background scripts
      finish loading; they care about when the site is visible, interactable,
      and stable. Google introduced <strong>Core Web Vitals</strong> to
      objectively measure the actual human experience of rendering.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Big Three
    </h4>,
    <Grid key="3" cols={3} gap={6} className="mb-8">
      <Card title="Largest Contentful Paint (LCP)">
        <p className="text-sm font-semibold mb-2">Goal: &lt; 2.5 seconds</p>
        <p className="text-sm text-emerald-300">
          Measures <em>Loading Performance</em>. It marks the exact millisecond
          when the single largest image or text block in the viewport finishes
          rendering on screen.
        </p>
      </Card>
      <Card title="Interaction to Next Paint (INP)">
        <p className="text-sm font-semibold mb-2">
          Goal: &lt; 200 milliseconds
        </p>
        <p className="text-sm text-emerald-300">
          Measures <em>Responsiveness</em>. If a user clicks an accordion menu,
          how long does the browser delay before actually drawing the visual
          change? Usually ruined by heavy JS blocking the main thread.
        </p>
      </Card>
      <Card title="Cumulative Layout Shift (CLS)">
        <p className="text-sm font-semibold mb-2">Goal: &lt; 0.1 score</p>
        <p className="text-sm text-emerald-300">
          Measures <em>Visual Stability</em>. Quantifies how much the UI jumps
          around as it loads. If reading text gets pushed down suddenly because
          an ad loaded above it, that's a CLS failure.
        </p>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      Fixing the Bottlenecks
    </h4>,
    <Table
      key="5"
      headers={["Metric", "Common Offender", "Primary Fix"]}
      rows={[
        [
          "LCP",
          "Massive unoptimized Hero Image.",
          "Use WebP/AVIF format. Preload the image immediately in the <head>.",
        ],
        [
          "INP",
          "React rendering a huge list blocking the thread.",
          "Code-split JS chunks, use requestIdleCallback, debounce inputs.",
        ],
        [
          "CLS",
          "Images without explicit width/height attributes.",
          "Always reserve physical space for images (aspect-ratio CSS) before they load over the network.",
        ],
      ]}
    />,
    <Callout key="6" type="info" title="Why These Matter">
      Google's web crawler actively profiles millions of websites globally on
      these exact metrics. Failing Core Web Vitals heavily penalizes your
      PageRank and SEO visibility.
    </Callout>,
  ],
};
