import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FileSearch, Wifi } from "lucide-react";

export const nPlusOneProblemTopic: Topic = {
  id: "n-plus-one-problem",
  title: "The N+1 Query Problem",
  description:
    "The legendary silent ORM assassin that generates 500 database requests mathematically entirely behind your back.",
  tags: ["database", "backend", "performance"],
  icon: "Bug",
  content: [
    <p key="1">
      The <strong>N+1 Problem</strong> is the most common cause of database performance degradation in modern ORM-based applications. It happens when you fetch a list of items (1 query) and then fetch a related item for each row individually (N queries).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Anatomy of the Failure
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={FileSearch} title="The Naive Code" subtitle="One query becomes N more" theme="rose">
        <p className="text-sm font-mono text-rose-100/80 border-l border-rose-800/50 pl-3 mt-2 whitespace-pre-wrap">
{"// Query 1\nconst users = await db.user.findMany();\n\n// N Queries (Loop)\nusers.map(u => u.getOrders());"}
        </p>
      </FeatureCard>
      <FeatureCard icon={Wifi} title="The Network Cost" subtitle="RTT dominates the slowdown" theme="amber">
        <p className="text-sm text-amber-100/75">
          Even if each query takes 1ms, doing 100 queries means 100ms of <strong>Network Round-Trip Time (RTT)</strong>. Your app spends more time waiting for the wire than the database spends searching.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Three Levels of Defense
    </h3>,
    <Table
      key="5"
      headers={["Technique", "How it Works", "Best For"]}
      rows={[
        [
          "Eager Loading (JOIN)",
          "The ORM generates a single <code>LEFT JOIN</code> query.",
          "Simple 1-to-many relationships in REST APIs."
        ],
        [
          "Batch Loading (IN)",
          "Collects all IDs and sends <code>WHERE id IN (...)</code>.",
          "Large datasets where a JOIN would create massive duplication."
        ],
        [
          "Dataloader (GraphQL)",
          "Uses a <strong>memoized cache</strong> to prevent redundant fetches in a single request.",
          "Highly nested GraphQL trees where the same user is fetched multiple times."
        ]
      ]}
    />,
    <Callout key="6" type="tip" title="Always check your SQL logs!">
      Most modern ORMs allow you to log raw SQL to the console. If you see a "wall of text" of nearly identical queries scrolling past your screen, you have an N+1 bug.
    </Callout>,
  ],
};
