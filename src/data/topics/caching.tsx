import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const cachingTopic: Topic = {
  id: "caching",
  title: "Caching Strategies (Redis)",
  description:
    "The mathematical art of storing expensive data in cheap RAM so you don't instantly bankrupt your SQL database.",
  tags: ["backend", "performance", "redis"],
  icon: "DatabaseZapper",
  content: [
    <p key="1">
      Relational databases (PostgreSQL) are heavy. They parse complex string queries, join multiple tables on physical spinning hard-drives, and do safety checks. If 10,000 users look at the front page of your blog in one minute, making your SQL server execute that massive query 10,000 times will melt its CPU.
    </p>,
    <p key="2" className="mt-4">
      <strong>Redis</strong> is an in-memory Key-Value store. It strictly holds tiny text strings in raw server RAM, responding in sub-milliseconds because it skips the hard drive entirely.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Core Strategies
    </h3>,
    <Table
      key="4"
      headers={["Strategy", "How It Works", "Developer Tradeoff"]}
      rows={[
        [
          "Cache-Aside (Lazy Loading)",
          "App asks Redis for the Blog Post. If missing (Cache Miss), App runs the expensive SQL query, hands it to user, and shoves a copy into Redis for the next guy.",
          "The easiest to build. But the very first user always suffers a slow load time. Data can easily go 'stale' if you don't TTL it."
        ],
        [
          "Write-Through",
          "Whenever a user edits their Profile, the App aggressively writes the new profile into Redis ALWAYS, and then quietly writes it to SQL.",
          "Zero slow 'first loads'. But Redis quickly fills up with millions of garbage profiles nobody ever actually reads again."
        ],
      ]}
    />,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Eviction (LRU)">
        <p className="text-sm text-muted-foreground">
          RAM is expensive! You can't fit a 500GB database inside 16GB of Redis memory. When Redis gets full, it uses <strong>Least Recently Used (LRU)</strong> to mercilessly delete the blog post nobody has clicked on in 3 weeks to make room for today's viral news.
        </p>
      </Card>
      <Card title="The Stampede Problem">
        <p className="text-sm text-muted-foreground">
          What if the cache expires for a highly viral video? 1,000 simultaneous users get a Cache Miss at the exact same millisecond, and they ALL rush your SQL database, crushing it instantly. Developers fix this using locking mechanisms to let only ONE user fetch the DB update.
        </p>
      </Card>
    </Grid>,
    <Callout key="6" type="warning" title="Caching is not a Silver Bullet">
      Never use Redis to patch a poorly written `N+1` SQL query. Fix your terrible database queries with proper indexing first. Only add caching when your optimized database is physically reaching its absolute scaling limits.
    </Callout>,
  ],
};
