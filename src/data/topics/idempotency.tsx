import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const idempotencyTopic: Topic = {
  id: "idempotency",
  title: "Idempotency (Safe API Retries)",
  description:
    "How to guarantee a user isn't violently charged $10,000 when their internet connection stutters during checkout.",
  tags: ["backend", "api-design", "architecture", "system-design"],
  icon: "RefreshCcw",
  content: [
    <p key="1">
      A user taps "Pay $50.00" on their mobile app right as they enter a subway tunnel. The React app sends an HTTP POST. The backend deducts $50.00 successfully! But the server's HTTP `200 OK` response gets permanently lost in the subway cell tower.
    </p>,
    <p key="2" className="mt-4">
      The terrified user is staring at an endless spinning wheel. So what do they do? <strong>They aggressively mash the 'Pay' button exactly 5 more times.</strong>
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Idempotency Key Rescue
    </h3>,
    <p key="4" className="mb-4">
      Idempotency mathematically guarantees that no matter how many hundreds of times a client violently repeats an action, the system strictly applies it <strong>exactly once.</strong>
    </p>,
    <Step key="5" index={1}>
      <strong>The UUID:</strong> When the User hits checkout, the React frontend generates a massive random string (`Idempotency-Key: efa9...`) and glues it strictly to the HTTP POST header.
    </Step>,
    <Step key="6" index={2}>
      <strong>The Lock:</strong> The backend checks Redis. "Have I ever seen this UUID string before?" Since it hasn't, the backend strictly saves the UUID to Redis, processes the payment, and saves the successful `200 OK` JSON shape into Redis mapped exactly to the UUID.
    </Step>,
    <Step key="7" index={3}>
      <strong>The Retry Block:</strong> Two seconds later, the user violently taps "Pay" again. The backend checks Redis. "Wait, I vividly remember this UUID from 2 seconds ago!" It entirely completely ignores the business logic, and just lazily returns the cached `200 OK` JSON from Redis.
    </Step>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Idempotent HTTP Verbs">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong>GET / PUT / DELETE</strong>: Inherently safe. Deleting User 5 mathematically always leaves User 5 deleted, whether you do it 1 time or 100 times.</li>
          <li><strong>POST / PATCH</strong>: Highly dangerous. Always explicitly implement UUID caching.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="9" type="info" title="Integrating with Stripe">
      Stripe practically demands Idempotency Keys across their entire API stack. If Stripe's massive AWS servers crash while you are executing a refund, you can safely write a `while(true)` loop to retry hitting Stripe every 2 seconds forever until it works, entirely without fear of bankrupting your business.
    </Callout>,
  ],
};
