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
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Distributed Transaction Problem
    </h3>,
    <p key="7">
      In a monolith, wrapping operations in a database transaction is trivial: <code>BEGIN; INSERT INTO orders; UPDATE inventory; COMMIT;</code>. If anything fails, the entire transaction rolls back atomically.<br/><br/>
      In microservices, the Order Service and Inventory Service have separate databases. If the Order Service succeeds but the Inventory Service crashes, you've sold a product you don't have. <strong>Solutions:</strong>
    </p>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Saga Pattern">
        <p className="text-sm text-muted-foreground">
          Break the transaction into a series of local transactions. If one fails, execute compensating transactions to undo previous steps (e.g., "Cancel Order" if inventory update fails).
        </p>
      </Card>
      <Card title="Two-Phase Commit (2PC)">
        <p className="text-sm text-muted-foreground">
          A coordinator asks all services to "prepare" the transaction. If all agree, it sends "commit". If any fail, it sends "rollback". Slow and fragile (coordinator is a single point of failure).
        </p>
      </Card>
    </Grid>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Service Discovery & Load Balancing
    </h3>,
    <p key="10">
      In a monolith, calling <code>auth.getUser()</code> is a function call. In microservices, the Order Service needs to find the Auth Service's IP address. <strong>Service Discovery</strong>&nbsp;tools (Consul, Eureka, Kubernetes DNS) maintain a registry of all running services. When Auth Service scales to 5 instances, the load balancer distributes requests across them.
    </p>,
  ],
};
