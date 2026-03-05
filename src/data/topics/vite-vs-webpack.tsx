import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const viteVsWebpackTopic: Topic = {
  id: "vite-vs-webpack",
  title: "Vite vs Webpack",
  description:
    "How native ES Modules (ESM) and esbuild utterly destroyed the slow, monolithic Javascript bundler era.",
  tags: ["frontend", "tooling", "devops", "javascript"],
  icon: "Zap",
  content: [
    <p key="1">
      For years, <strong>Webpack</strong> was the undisputed king of frontend
      tooling. But as JavaScript apps grew massive, Webpack's development server
      started taking 30+ seconds to spin up, and 5 seconds to reflect a simple
      CSS change. <strong>Vite</strong> changed the fundamental paradigm of how
      code is served during development.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Webpack Architecture (Bundle First)
    </h4>,
    <p key="3" className="mb-4">
      Before Webpack can serve your application locally, it crawls your{" "}
      <em>entire</em>
      source code, resolves every single `import`, and bundles thousands of
      files into a few massive JavaScript files. If your app has 2,000 modules,
      you wait for all 2,000 to be bundled before you can see the home page.
    </p>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      The Vite Architecture (Native ESM)
    </h4>,
    <p key="5" className="mb-4">
      Vite relies on the fact that modern browsers natively understand ES
      Modules (<code>&lt;script type="module"&gt;</code>). It divides your app
      into two categories:
    </p>,
    <Grid key="6" cols={2} gap={6} className="mb-8">
      <Card title="Dependencies (Node_Modules)">
        Vite aggressively pre-bundles massive dependencies (like React or
        Lodash) using <strong>esbuild</strong> — a bundler written in Go that is
        10-100x faster than JavaScript-based bundlers. It does this once and
        caches it.
      </Card>
      <Card title="Source Code">
        Vite does <strong>not</strong> bundle your source code. When the browser
        requests the `Home.tsx` file, Vite transforms only that file (stripping
        TS and JSX) and sends it. It exclusively loads the exact files requested
        by the current URL.
      </Card>
    </Grid>,
    <h4 key="7" className="text-xl font-bold mt-8 mb-4">
      Hot Module Replacement (HMR)
    </h4>,
    <Step key="8" index={1}>
      <strong>Webpack:</strong> Rebuilds the bundle. The larger the app, the
      slower the HMR update.
    </Step>,
    <Step key="9" index={2}>
      <strong>Vite:</strong> Directly invalidates a single module's cache.
      Regardless of whether your app has 10 components or 10,000, Vite HMR
      updates the screen in milliseconds.
    </Step>,
    <Callout key="10" type="info" title="Production Builds">
      Keep in mind that Vite still completely bundles your app for{" "}
      <em>Production</em>
      (currently using Rollup). Shipping a thousand unbundled Native ESM files
      over the network to a real user would cause hundreds of slow HTTP
      round-trips.
    </Callout>,
  ],
};
