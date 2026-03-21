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
      A single massive AWS PostgreSQL server instance (Vertical Scaling) physically caps out at around 128 Cores and 4000GB of RAM. If you are Facebook, one table containing billions of active 'Likes' will brutally shatter that ceiling in weeks.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Sharding: Slicing the Beast
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Core Concept">
        <p className="text-sm text-muted-foreground mb-2">
          You take your singular `Users` table and mathematically slice it completely in half. You put Users A-M cleanly on Server 1 (London). You put Users N-Z organically on Server 2 (Tokyo). 
        </p>
        <p className="text-sm text-muted-foreground">
          If your frontend asks for John's details, your router (or backend logic) calculates a **Shard Key** and flawlessly knows to instantly hit the London database server exclusively. Scaling is now unlimited.
        </p>
      </Card>
      <Card title="The Absolute Chaos">
        <p className="text-sm text-muted-foreground mb-2">
          You completely permanently legally lose the ability to write a powerful `JOIN` statement. 
        </p>
        <p className="text-sm text-muted-foreground">
          To join a User (A-M) on Server 1 to their massive list of Comments (N-Z) naturally residing on Server 2, your backend Node server has to dynamically make 2 separate slow network calls and forcefully glue them together manually in Javascript RAM.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="The Celebrity Problem (Hot Keys)">
      You decide to shard all Instagram posts dynamically based exactly on `author_id`. Server 5 ends up organically housing Cristiano Ronaldo's 800 million global followers. Server 5 catches fire and violently melts because it handles 95% of your company's network traffic perfectly alone, completely defeating the actual intended horizontal split! You must fiercely pick Shard Keys that randomly distribute traffic perfectly evenly.
    </Callout>,
  ],
};
