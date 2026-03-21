import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const circuitBreakerTopic: Topic = {
  id: "circuit-breaker",
  title: "Circuit Breaker Pattern",
  description:
    "How to prevent a dead microservice from cascading and violently taking down the rest of your company.",
  tags: ["architecture", "microservices", "system-design"],
  icon: "ChevronsRightLeft",
  content: [
    <p key="1">
      Imagine your front-end calls the API server, which calls the User server, which calls the Email server. If the Email server crashes and takes exactly 30 seconds to timeout, you just forced your blazing-fast front-end to stare at a freezing loading screen for 30 seconds on EVERY single request.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Trip the Wire
    </h3>,
    <p key="3" className="mb-4">
      If a third-party API is brutally down, continuously hitting it 1,000 times a second and waiting 30 seconds to time out wastes hundreds of your own precious AWS connections. Just like the electrical box in your physical house, you use a <strong>Circuit Breaker</strong>.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Circuit CLOSED (Normal)" description="Green Light">
        <p className="text-sm text-muted-foreground">
          Your code runs normally. `stripe.charge()` fires successfully. But internally, the router is counting physical errors. "Oh boy, Stripe timed out 5 times in a row within the last 10 seconds."
        </p>
      </Card>
      <Card title="Circuit OPEN (Tripped)" description="Red Light">
        <p className="text-sm text-muted-foreground">
          The code violently trips the circuit! For the next 60 seconds, any developer code calling `stripe.charge()` instantly throws an error in 1 millisecond. We don't even bother attempting to hit the network! 
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="info" title="The Half-Open State (The Scout)">
      After the 60 seconds expire, the Circuit Breaker enters "Half-Open". It very cautiously permits exactly 1 single HTTP request to sneak through to Stripe. If it succeeds, the breaker resets to Closed (Normal). If it fails again, it violently snaps back to Open (Red) for another 60 seconds.
    </Callout>,
  ],
};
