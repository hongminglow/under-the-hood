import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const sqlVsNosqlTopic: Topic = {
  id: "sql-vs-nosql",
  title: "SQL vs NoSQL",
  description:
    "The legendary database war: The rigid structural safety of PostgreSQL vs the raw chaotic scale of MongoDB.",
  tags: ["database", "backend", "system-design"],
  icon: "Database",
  content: [
    <p key="1">
      For 30 years, Relational Databases (SQL) completely ran the world. In the 2010s, developers realized that forcing dynamic modern web-app models into rigid 2D Excel-like tables was painful, giving rise to Document Databases (NoSQL).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Architectural Difference
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="SQL (PostgreSQL / MySQL)">
        <p className="text-sm text-muted-foreground mb-2">
          Data is aggressively broken apart (Normalized) into dozens of strict tables to prevent duplication. To load a User's profile, you must dynamically <code>JOIN</code> the User table with the Comments table and the Address table.
        </p>
        <p className="text-sm font-semibold mt-3">Best for:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
          <li>Financial systems requiring extreme ACID safety.</li>
          <li>Highly interconnected data (Social Networks).</li>
        </ul>
      </Card>
      <Card title="NoSQL (MongoDB / DynamoDB)">
        <p className="text-sm text-muted-foreground mb-2">
          Data is clumped together (Denormalized) into massive, flexible JSON blobs. To load a User's profile, you pull exactly 1 massive JSON document holding their Address and Comments naturally inside of it. Zero `JOIN`ing required.
        </p>
        <p className="text-sm font-semibold mt-3">Best for:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
          <li>Rapidly changing schemas (Startups).</li>
          <li>Catalog systems (Amazon Products) where every item has entirely different JSON specs.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Scaling Myth (Horizontal vs Vertical)">
      It is a known physics fact that joining 5 tables together is terribly slow, causing SQL databases to hit physical CPU limits (forcing expensive Vertical Scaling). NoSQL deliberately abandons relations entirely, which allows you to effortlessly split the database across 100 cheap servers (Horizontal Sharding) indefinitely without math conflicts.
    </Callout>,
  ],
};
