import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const microservicesTopic: Topic = {
  id: "microservices",
  title: "Microservices",
  description:
    "Why splitting your clean monolith into 50 independent APIs solves organizational charts, but creates network hell.",
  tags: ["architecture", "scale", "backend"],
  icon: "Boxes",
  content: [
    <p key="1">
      A massive Node.js Monolith holding 200 developers working in the exact same GitHub repo is a chaotic nightmare of merge conflicts, hour-long deployment times, and one bad infinite loop crashing the entire company.
    </p>,
    <p key="2" className="mt-4">
      <strong>Microservices</strong> solves the "people" problem. You chop the App into 50 tiny apps (Auth Service, Payment Service, Email Service) run by 50 independent small teams who deploy multiple times a day independently.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Microservice Fallacy
    </h3>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Network Unreliability">
        <p className="text-sm text-muted-foreground">
          In a monolith, calling `auth.getUser()` is a sub-millisecond RAM memory operation. In a Microservice, `Auth Service` must send an HTTP request across a physical datacenter wire to `User Service`. That wire can snap, lag, or timeout. What used to be a simple function call is now a fragile distributed system requiring retries and Circuit Breakers.
        </p>
      </Card>
      <Card title="Data Isolation Hell">
        <p className="text-sm text-muted-foreground">
          Microservices mandate that EVERY service must have its very own independent SQL database. You can no longer write a beautiful `JOIN` query between the Users table and the Orders table, because they literally live on completely separate physical hard drives handled by different teams.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="Do not start with Microservices!">
      Startups building MVPs with Kubernetes and 10 microservices inevitably fail. Microservices are not a technical upgrade; they are an organizational scaling tactic for companies with 50+ engineers. Build the majestic monolith first.
    </Callout>,
  ],
};
