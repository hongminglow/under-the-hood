import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const renderingPipelineTopic: Topic = {
  id: "rendering-pipeline",
  title: "Critical Rendering Path",
  description:
    "How the browser physically paints an HTML string into an interactive screen of pixels, and why JavaScript blocks the entire process.",
  tags: ["browser", "performance", "frontend"],
  icon: "Brush",
  content: [
    <p key="1">
      The <strong>Critical Rendering Path (CRP)</strong> is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the screen. Optimizing the CRP is the key to achieving 60fps animations and a "lightning-fast" user experience.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Browser Engine Pipeline
    </h3>,
    <Table
      key="3"
      headers={["Stage", "What It Processes", "The Output"]}
      rows={[
        ["1. DOM Construction", "Raw HTML bytes from the network.", "A Tree of Objects (The DOM)."],
        ["2. CSSOM Construction", "CSS Styles (External and Inline).", "The CSS Object Model Tree."],
        ["3. Render Tree", "Merges DOM and CSSOM.", "A Tree of everything <strong>Visible</strong>."],
        ["4. Layout (Reflow)", "Geometric calculations (width, height, position).", "The exact Box Model for every node."],
        ["5. Paint", "Colors, Borders, Shadows, and Text.", "Display Lists for the Graphics Card."],
        ["6. Composite", "Layers and Z-Index.", "The final image sent to the GPU."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Reflow vs. Repaint: The Performance Killer
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Layout (Reflow)">
        <p className="text-sm text-slate-400 mb-2">
          The most <strong>expensive</strong> operation.
        </p>
        <p className="text-xs italic text-slate-400">
          Triggered by changing <code>width</code>, <code>height</code>, or <code>margin</code>. Since elements affect each other, changing one box often forces the browser to recalculate the positions of <em>every other box</em> on the page.
        </p>
      </Card>
      <Card title="Repaint (Paint)">
        <p className="text-sm text-slate-400 mb-2">
          Cheaper but still heavy.
        </p>
        <p className="text-xs italic text-slate-400">
          Triggered by changing <code>color</code>, <code>visibility</code>, or <code>background-image</code>. Geometry doesn't change, so the browser just "re-inks" the existing boxes.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Secret Weapon: Compositing
    </h3>,
    <p key="7" className="mb-4">
      To achieve smooth 60fps, browsers use <strong>GPU Acceleration</strong>. By moving an element to its own "layer" (using <code>will-change: transform</code>), the browser can move, scale, or fade that layer using the graphics card without ever re-running a Reflow or Repaint.
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>Render-Blocking JS:</strong> By default, <code>&lt;script&gt;</code> tags block DOM construction. The browser halts everything to execute the JS, as the script might call <code>document.write()</code> and change the DOM.</li>
      <li><strong>CSS is Render-Blocking:</strong> The browser will <strong>not</strong> paint anything until the CSSOM is ready, preventing a "Flash of Unstyled Content" (FOUC).</li>
      <li><strong>Layout Thrashing:</strong> Reading a geometric property (like <code>offsetTop</code>) immediately after setting one (like <code>style.top</code>) forces the browser to run a synchronous reflow, creating massive stuttering.</li>
    </ul>,
    <Callout key="9" type="warning" title="The 'Deferred' Advantage">
      Always use <code>&lt;script defer&gt;</code>. This allows the browser to continue building the DOM while the script downloads in the background, executing only after the HTML is fully parsed.
    </Callout>,
  ],
};
