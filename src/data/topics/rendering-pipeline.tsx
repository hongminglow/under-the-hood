import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Grid } from "@/components/ui/Grid";

export const renderingPipelineTopic: Topic = {
  id: "rendering-pipeline",
  title: "Critical Rendering Path",
  description:
    "How the browser progressively transforms raw HTML, CSS, and JavaScript source code bytes into painted pixels on your screen.",
  tags: ["browser", "performance", "rendering", "javascript"],
  icon: "Layout",
  content: [
    <p key="1">
      The <strong>Critical Rendering Path (CRP)</strong> is the series of steps
      the browser takes to convert HTML, CSS, and JS into actual visible pixels
      on the screen. Performance tuning on the client side starts exclusively
      here. Any script or style that interrupts this path effectively "blocks"
      the entire viewport.
    </p>,
    <div key="2" className="my-4">
      <Highlight variant="warning">
        Performance Bottleneck: Synchronous scripts and uncached CSS block the
        HTML parser.
      </Highlight>
    </div>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Object Models
    </h4>,
    <Grid key="4" cols={2} gap={6}>
      <Card title="Document Object Model (DOM)" description="The Content Tree">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Constructed incrementally as the browser streams HTML bytes.</li>
          <li>
            Parsed bytes translate to Characters -&gt; Tokens -&gt; Nodes -&gt;
            DOM Tree.
          </li>
          <li>
            Represents the <em>structural integrity</em> of your page content.
          </li>
        </ul>
      </Card>
      <Card title="CSS Object Model (CSSOM)" description="The Style Tree">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Unlike HTML, CSS is <strong>render-blocking</strong>. The CSSOM
            cannot be built incrementally; the entire tree must be built before
            yielding to the next step.
          </li>
          <li>
            Defines the exact styles to apply to DOM nodes via cascading rules.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      The Pipeline Sequence
    </h4>,
    <p key="6">
      The browser doesn't just blindly "paint" what it receives; it maps out a
      complex mathematical geometry of the entire document before any drawing
      occurs.
    </p>,
    <Step key="7" index={1}>
      <strong>DOM Construction:</strong> The browser parses HTML bytes into a
      node tree. Whenever it encounters a{" "}
      <code>&lt;link rel="stylesheet"&gt;</code>, it dispatches an async request
      to fetch it.
    </Step>,
    <Step key="8" index={2}>
      <strong>CSSOM Construction:</strong> The browser halts rendering here
      entirely until the CSSOM is constructed, because it would be inefficient
      to paint elements only to repaint them a millisecond later with new styles
      (resulting in a Flash of Unstyled Content/FOUC).
    </Step>,
    <Step key="9" index={3}>
      <strong>Script Execution:</strong> The parser encounters a{" "}
      <code>&lt;script&gt;</code>. By default, it pauses DOM construction,
      fetches the script, and completely executes it before resuming HTML
      parsing.
    </Step>,
    <Step key="10" index={4}>
      <strong>Render Tree Generation:</strong> The browser merges the DOM and
      CSSOM trees into a "Render Tree."{" "}
      <em>
        Crucially, this tree only contains nodes required to render the page
      </em>
      . (e.g., nodes marked <code>display: none</code> are excluded, but{" "}
      <code>visibility: hidden</code> are included because they affect spatial
      layout).
    </Step>,
    <Step key="11" index={5}>
      <strong>Layout (Reflow):</strong> The browser calculates the exact
      geometric position (x,y coordinates) and size of every node in the render
      tree. This process relies on the underlying generic box model.
    </Step>,
    <Step key="12" index={6}>
      <strong>Paint (Rasterization):</strong> The browser converts the
      calculated geometric models into actual device pixels, creating layers for
      complex z-indexes and shadows.
    </Step>,
    <Step key="13" index={7}>
      <strong>Composition:</strong> For complex applications, independent layers
      (like scrolling containers or CSS transforms) are drawn accurately on top
      of one another. The GPU handles layer composition to prevent hardware
      bottlenecks.
    </Step>,
    <Callout key="14" type="tip" title="Optimizing the CRP">
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>
          <strong>Preload/Prefetch:</strong> Fetch vital assets like fonts early
          with <code>&lt;link rel="preload"&gt;</code>.
        </li>
        <li>
          <strong>Defer Scripts:</strong> Use <code>&lt;script defer&gt;</code>{" "}
          to fetch JS asynchronously and execute it <em>after</em> the DOM
          parses.
        </li>
        <li>
          <strong>Inline Critical CSS:</strong> Minimize render-blocking time by
          placing "above the fold" CSS directly in a <code>&lt;style&gt;</code>{" "}
          tag in the head.
        </li>
      </ul>
    </Callout>,
  ],
};
