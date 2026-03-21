import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const viteVsWebpackTopic: Topic = {
  id: "vite-vs-webpack",
  title: "Vite vs Webpack",
  description:
    "Why your React server used to take 45 seconds to start, and why Vite starts in 100 milliseconds.",
  tags: ["frontend", "performance", "architecture"],
  icon: "Zap",
  content: [
    <p key="1">
      For years, developers accepted that saving a file in React meant waiting 15 seconds for the browser to refresh. Webpack was the enterprise standard, but it slowly strangled productivity. Then Vite arrived and mathematically changed the entire paradigm of local development.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Paradigm Shift
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Webpack (The Monolithic Builder)">
        <p className="text-sm text-muted-foreground mb-2">
          When you run <code>npm start</code>, Webpack must physically crawl every single Javascript file, every CSS file, and every image in your entire 10,000-file project. 
        </p>
        <p className="text-sm text-muted-foreground">
          It then mashes them all together into massive bundle files before it can even turn the local server on. This is why enormous legacy projects can take minutes to boot.
        </p>
      </Card>
      <Card title="Vite (The Native ES Module Server)">
        <p className="text-sm text-muted-foreground mb-2">
          Vite skips bundling entirely during development. It leverages modern browser support for <code>import x from './y'</code> directly in the HTML.
        </p>
        <p className="text-sm text-muted-foreground">
          When you load a page, the browser asks Vite for only the exact files needed for the current screen. Vite instantly serves those untouched, raw Javascript files. The server boots in 100ms because it isn't doing any bundling math.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="Production Builds">
      Vite still bundles your code for Production! It uses Rollup under the hood to ensure everything is minified and compressed. The magic of Vite is exclusively heavily focused on making the local Developer Experience lightning fast.
    </Callout>,
  ],
};
