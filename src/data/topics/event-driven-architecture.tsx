import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const eventDrivenArchitectureTopic: Topic = {
  id: "event-driven-architecture",
  title: "Event-Driven Architecture",
  description:
    "Moving from tight synchronous function calls to asynchronous Publish-Subscribe models.",
  tags: ["architecture", "system-design", "async"],
  icon: "PlaySquare",
  content: [
    <p key="1">
      In a standard REST architecture, the `Order Service` makes a strict HTTP GET call to the `Inventory Service` to check warehouse stock. What happens if the Inventory team goes completely offline for a 3-hour database maintenance window? The `Order Service` instantly breaks, and you lose $50,000 in sales.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Publish, Don't Point
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Synchronous Web Web">
        <p className="text-sm text-muted-foreground mb-2">
          Services are strictly coupled. They specifically demand things from each other: `EmailServer.send(userId)`. When one server struggles, the latency propagates mathematically across all tight functions until the entire app freezes.
        </p>
      </Card>
      <Card title="Event-Driven (PubSub)">
        <p className="text-sm text-muted-foreground">
          The `Order Service` never talks to the `Email Service`. Instead, when an order is placed, it just screams a message into the void (Kafka/RabbitMQ): "EVENT OCCURRED: USER 5 ORDERED A MACBOOK." 
        </p>
      </Card>
    </Grid>,
    <p key="4" className="mb-4">
      The `Email Service` is constantly independently listening to that Kafka queue. It hears the scream, picks it up, and emails the user. The `Inventory Service` also happened to be organically listening, and deducts a MacBook independently.
    </p>,
    <Callout key="5" type="tip" title="The Benefit of Extensibility">
      A year later, the Data Science team wants to track all orders in real-time. Without Event-Driven architecture, you have to formally update the `Order Service` codebase to physically run `DataScienceServer.push()`. With EDA, they just silently subscribe to the Kafka queue entirely independently. The `Order Service` doesn't even know they exist!
    </Callout>,
  ],
};
