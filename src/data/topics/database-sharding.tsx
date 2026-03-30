import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const databaseShardingTopic: Topic = {
  id: "database-sharding",
  title: "Database Sharding (Horizontal)",
  description:
    "How to hack a completely unscalable central SQL database across 10 independent massive servers without losing IDs.",
  tags: ["database", "architecture", "scale"],
  icon: "Scissors",
  content: [
    <p key="1">
      A single massive AWS PostgreSQL server instance (Vertical Scaling) caps out at around 128 Cores and 4000GB of RAM. If you are Facebook, one table containing billions of active 'Likes' will shatter that ceiling in weeks.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Sharding: Slicing the Beast
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Core Concept">
        <p className="text-sm text-muted-foreground mb-2">
          You take your `Users` table and slice it in half. You put Users A-M on Server 1 (London). You put Users N-Z on Server 2 (Tokyo). 
        </p>
        <p className="text-sm text-muted-foreground">
          If your frontend asks for John's details, your router (or backend logic) calculates a **Shard Key** and knows to hit the London database server. Scaling is now unlimited.
        </p>
      </Card>
      <Card title="The Absolute Chaos">
        <p className="text-sm text-muted-foreground mb-2">
          You lose the ability to write a powerful `JOIN` statement across shards. 
        </p>
        <p className="text-sm text-muted-foreground">
          To join a User (A-M) on Server 1 to their list of Comments (N-Z) residing on Server 2, your backend Node server has to make 2 separate network calls and join them together in memory.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="The Celebrity Problem (Hot Keys)">
      If you decide to shard all Instagram posts based on `author_id`, Server 5 might end up housing Cristiano Ronaldo's 800 million global followers. Server 5 becomes a bottleneck because it handles 95% of your company's network traffic alone, defeating the intended horizontal split. You must pick Shard Keys that distribute traffic evenly.
    </Callout>,
  ],
};
