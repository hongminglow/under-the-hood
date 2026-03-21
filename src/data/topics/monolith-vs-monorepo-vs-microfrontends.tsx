import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const monolithVsMonorepoVsMicrofrontendsTopic: Topic = {
  id: "monolith-vs-monorepo-vs-microfrontends",
  title: "Monolith vs Monorepo vs Micro-Frontends",
  description:
    "How giant frontend teams organize their React code without stepping on each other's toes.",
  tags: ["architecture", "frontend", "scale", "system-design"],
  icon: "Component",
  content: [
    <p key="1">
      When you have 50 frontend engineers working on `ecommerce.com`, a classic "Monolith" React app becomes unmanageable. If Team A breaks the Shopping Cart CSS, it permanently destroys the deployment pipeline for Team B trying to launch the new Homepage.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Frontend Scaling War
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Monorepo (Nx / Turborepo)" description="One Repo, Many Apps">
        <p className="text-sm text-muted-foreground mb-2">
          You keep all UI code in one gigantic GitHub repository, but you fiercely isolate it using tools like Turborepo. 
        </p>
        <p className="text-sm text-muted-foreground">
          Team A owns `apps/checkout` and Team B owns `apps/homepage`. They securely share a `packages/ui-library`. When Team A commits, turborepo is smart enough to <em>only</em> re-compile and deploy the Checkout app, leaving the Homepage completely untouched.
        </p>
      </Card>
      <Card title="Micro-Frontends (Module Federation)" description="Many Repos, One App">
        <p className="text-sm text-muted-foreground mb-2">
          Team A and Team B have completely separate GitHub repos. They deploy their code entirely independently to different AWS S3 buckets.
        </p>
        <p className="text-sm text-muted-foreground">
          When the user opens `ecommerce.com`, Webpack (Module Federation) dynamically reaches across the internet, grabs the compiled Javascript from Team A's bucket and Team B's bucket, and stitches them together live in the browser.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="Micro-Frontends are Dangerous">
      Micro-Frontends (MFEs) are incredibly complex to debug. If Team A uses React 17 and Team B arbitrarily uses React 18, the user's poor browser is forced to download React twice, destroying performance. Monorepos are vastly superior for 90% of companies because they enforce strict version sharing natively.
    </Callout>,
  ],
};
