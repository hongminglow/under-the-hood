import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const microservicesTopic: Topic = {
  id: "microservices",
  title: "Microservices vs Monolith",
  description:
    "The architectural tug-of-war between unified deployment simplicity and distributed scaling agility.",
  tags: ["architecture", "scaling", "dist-systems"],
  icon: "Server",
  content: [
    <p key="1">
      Software architectural patterns define how components interact. The
      evolution of massive tech giants shifted the industry standard from
      Monoliths to Microservices, but not without complex tradeoffs.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="The Majestic Monolith">
        <p className="mb-2 text-sm">
          All code—UI, business logic, background jobs, database access—is
          compiled into a single unified application and deployed together.
        </p>
        <ul className="space-y-2 list-disc pl-4 text-sm text-emerald-400">
          <li>Extremely easy to debug, test, and deploy (one pipeline).</li>
          <li>No network latency between function calls.</li>
          <li>
            Performance scaling involves merely cloning the entire app behind a
            load balancer.
          </li>
        </ul>
      </Card>
      <Card title="Microservice Architecture">
        <p className="mb-2 text-sm">
          The application is split into dozens of small, independently
          deployable services that communicate over the network (HTTP/gRPC).
        </p>
        <ul className="space-y-2 list-disc pl-4 text-sm text-emerald-400">
          <li>
            Services can scale independently (scale the video transcoder, not
            the billing UI).
          </li>
          <li>
            Polyglot environments (Auth in Go, AI in Python, API in Node).
          </li>
          <li>
            Fault isolation: if one service crashes, the whole app doesn't die.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="3" type="warning" title="The Distributed Big Ball of Mud">
      Microservices solve specific scaling problems (mostly
      organizational/team-scaling problems), but they introduce devastating
      technical complexity. You now have to deal with message queues, network
      latency, distributed tracing, and eventual consistency. If you split a
      monolith incorrectly, you end up with a "Distributed Monolith" that has
      the worst traits of both.
    </Callout>,
  ],
};
