import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const deploymentStrategiesTopic: Topic = {
  id: "deployment-strategies",
  title: "Deployment Strategies",
  description:
    "A deep dive into Rolling, Blue-Green, and Canary deployments for achieving zero-downtime releases.",
  tags: ["devops", "kubernetes", "cloud", "automation", "zero-downtime"],
  icon: "Rocket",
  content: [
    <p key="intro" className="mb-6">
      Deployment strategies dictate how new code replaces old code in a production environment. The end goal for modern cloud-native architectures is <strong>Zero-Downtime Deployment</strong>, meaning the end user experiences no service interruption (e.g., no 503 HTTP errors) while the application is updated.
    </p>,
    
    <h3 key="h-comparison" className="text-2xl font-bold mt-8 mb-4">
      Strategy Comparison
    </h3>,
    
    <Table
      key="comparison-table"
      headers={["Strategy", "Traffic Switch", "Infrastructure Cost", "Rollback Speed", "Risk Mitigation"]}
      rows={[
        ["Rolling", "Incremental", "Low (No extra servers)", "Slow (Must roll back instance-by-instance)", "Medium"],
        ["Blue-Green", "Instant flip", "High (2x capacity required)", "Instant (Flip router back to Blue)", "High"],
        ["Canary", "Gradual (e.g., 5%, 10%, 100%)", "Low / Medium", "Fast (Stop directing traffic to Canary)", "Highest (Tests in prod)"],
      ]}
    />,

    <h3 key="h-rolling" className="text-xl font-bold mt-10 mb-4">
      1. Rolling Deployment
    </h3>,
    <p key="p-rolling" className="mb-4">
      A rolling deployment gradually replaces application instances with the new version. If you have 10 servers, the load balancer takes server #1 offline, deploys the new code to it, brings it back online, and then moves to server #2.
    </p>,
    <Grid key="grid-rolling" cols={2} gap={6}>
      <Card title="Scenario to Use">
        Standard web applications where budget is a constraint, and you cannot afford to spin up duplicate environments. Commonly the default in Kubernetes (`RollingUpdate`).
      </Card>
      <Card title="Key Consideration">
        <strong>Version Skew:</strong> Old and new versions will run simultaneously during the rollout. Database schemas and APIs <i>must</i> be backward compatible.
      </Card>
    </Grid>,

    <h3 key="h-bluegreen" className="text-xl font-bold mt-10 mb-4">
      2. Blue-Green Deployment
    </h3>,
    <p key="p-bluegreen" className="mb-4">
      This requires two identical environments. The "Blue" environment runs the current live version. The "Green" environment is provisioned with the new version. Once Green passes all health checks, the load balancer/router instantly switches 100% of user traffic from Blue to Green.
    </p>,
    <Grid key="grid-bluegreen" cols={2} gap={6}>
      <Card title="Scenario to Use">
        Mission-critical monoliths or enterprise applications where downtime is extremely costly and you need an instant "kill switch" to abort.
      </Card>
      <Card title="Key Consideration">
        <strong>Infrastructure Cost:</strong> You temporarily pay for double the compute power. State management (like active user sessions) must be stored externally (e.g., Redis).
      </Card>
    </Grid>,

    <h3 key="h-canary" className="text-xl font-bold mt-10 mb-4">
      3. Canary Deployment
    </h3>,
    <p key="p-canary" className="mb-4">
      Named after the "canary in a coal mine", this strategy routes a small percentage of total traffic (e.g., 5%) to the new version while the rest stays on the old version. Over time, observability metrics are monitored. If errors spike, the canary is killed; if successful, the traffic percentage is slowly ramped up to 100%.
    </p>,
    <Grid key="grid-canary" cols={2} gap={6}>
      <Card title="Scenario to Use">
        High-traffic consumer apps (like Netflix, Facebook) where you need to "test in production" with real, unpredictable user behavior before a full rollout.
      </Card>
      <Card title="Key Consideration">
        <strong>Complexity:</strong> Requires advanced traffic routing (e.g., Istio, Envoy) and highly tuned observability pipelines for automated metric evaluation.
      </Card>
    </Grid>,

    <div key="callout-conclusion" className="mt-10">
      <Callout type="info" title="A Note on Database Migrations">
        For <i>any</i> zero-downtime deployment strategy, you cannot execute blocking database schema changes (like `ALTER TABLE... DROP COLUMN`). You must use the <strong>Expand-and-Contract</strong> pattern (add new column, sync data, migrate code to read/write new column, then eventually drop old column months later).
      </Callout>
    </div>
  ],
};
