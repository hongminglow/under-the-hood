import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const nPlusOneTopic: Topic = {
  id: "n-plus-one-problem",
  title: "The N+1 Query Problem",
  description:
    "The ORM trap that turns 1 query into 101 queries — the single most common performance bug in fullstack applications.",
  tags: ["databases", "orm", "performance", "fullstack"],
  icon: "AlertTriangle",
  content: [
    <p key="1">
      You fetch 100 blog posts (1 query). Then for each post, you fetch its
      author (100 queries). Total: <strong>101 queries</strong> instead of 2.
      This is the <strong>N+1 problem</strong> — the single most common
      performance bug in applications using ORMs like Prisma, Sequelize, Django
      ORM, or ActiveRecord.
    </p>,
    <CodeBlock
      key="2"
      language="typescript"
      title="❌ The N+1 Problem (Prisma Example)"
      code={`// 1 query: SELECT * FROM posts LIMIT 100
const posts = await prisma.post.findMany({ take: 100 });

// 100 queries: SELECT * FROM users WHERE id = ? (once per post)
for (const post of posts) {
  const author = await prisma.user.findUnique({
    where: { id: post.authorId }
  });
  console.log(post.title, author.name);
}
// Total: 101 database round-trips! 🔥`}
    />,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Solutions
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="1. Eager Loading (include/join)">
        <CodeBlock
          language="typescript"
          title="✅ Prisma Eager Load"
          code={`// 2 queries total (posts + authors in batch)
const posts = await prisma.post.findMany({
  take: 100,
  include: { author: true }
});
// Prisma resolves this with a JOIN or
// a second batch query internally.`}
        />
      </Card>
      <Card title="2. DataLoader (Batching)">
        <CodeBlock
          language="typescript"
          title="✅ GraphQL DataLoader"
          code={`// Collects all author IDs from the batch,
// then fires ONE query:
// SELECT * FROM users WHERE id IN (1,2,3...)
const loader = new DataLoader(async (ids) => {
  const users = await db.users.findMany({
    where: { id: { in: ids } }
  });
  return ids.map(id => users.find(u => u.id === id));
});`}
        />
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="ORMs Hide the Problem">
      The N+1 problem is <strong>invisible in code</strong> — your loops look
      clean and readable. You only discover it in production when response times
      spike. Enable <strong>query logging</strong> in your ORM (Prisma:{" "}
      <code>log: ['query']</code>, Django: <code>DEBUG=True</code>) during
      development to spot N+1 patterns before they reach production.
    </Callout>,
    <Callout key="6" type="tip" title="The Interview Answer">
      "N+1 occurs when an ORM lazily loads associations inside a loop. Fix it
      with <strong>eager loading</strong> (JOINs/includes),{" "}
      <strong>DataLoader batching</strong> (GraphQL), or{" "}
      <strong>subqueries</strong>. Always enable query logging in dev."
    </Callout>,
  ],
};
