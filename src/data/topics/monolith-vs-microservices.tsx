import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const monolithVsMicroservicesTopic: Topic = {
  id: "monolith-vs-microservices",
  title: "Monolith vs Microservices",
  description:
    "The eternal architectural debate: Keep everything in one big box, or chop it into 50 tiny ones?",
  tags: ["architecture", "backend", "scale"],
  icon: "Maximize",
  content: [
    <p key="1">
      Every single billion-dollar startup begins its life as a <strong>Majestic Monolith</strong>. The API, the database access, the HTML rendering, and the cron jobs are all glued together inside one gigantic NodeJS or Ruby on Rails codebase. Everything functions incredibly fast, and developers can visually trace any bug instantly across the whole codebase in VS Code.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      When The Monolith Fails
    </h3>,
    <p key="3" className="mb-4">
      If a Monolith is so fast and elegant, why does the tech industry violently transition into complex Microservices?
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The 'Blast Radius'" description="One bug kills everything">
        <p className="text-sm text-muted-foreground">
          In a Monolith, if Junior Dev #4 accidentally writes a `while(true)` loop inside a totally obscure API endpoint for generating PDF receipts, the CPU spikes to 100%. The entire server violently crashes. Suddenly, nobody in the world can even log in! 
        </p>
      </Card>
      <Card title="The Code Conflict" description="Developer Overlap">
        <p className="text-sm text-muted-foreground">
          When you have 300 developers pushing code to exactly one GitHub repository 50 times a day, the CI tests start taking 3 hours to compile. A tiny font change on the Homepage gets stuck waiting for the heavy Database Migration tests to clear.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Netflix Delusion">
      Junior developers often watch a Netflix conference talk and immediately try to build their brand new to-do list MVP using 8 Kubernetes microservices. Netflix has 10,000 engineers. Microservices introduce agonizing distributed networking bugs, extreme debugging complexity, and intense data synchronization issues. Build a Monolith until it physically breaks!
    </Callout>,
  ],
};
