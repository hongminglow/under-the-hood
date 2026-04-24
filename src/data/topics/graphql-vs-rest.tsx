import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Database, Network } from "lucide-react";

export const graphqlVsRestTopic: Topic = {
  id: "graphql-vs-rest",
  title: "GraphQL vs REST",
  description:
    "Why front-end engineers fell in love with a single endpoint, and backend engineers secretly hated it.",
  tags: ["api-design", "architecture", "frontend"],
  icon: "Database",
  content: [
    <p key="1">
      REST defines a strict, multi-endpoint architecture (`GET /users/5`, `GET /posts/12`). If a React developer building a complex dashboard needs the user's name AND their last 5 posts AND the comments, they suddenly have to make 7 separate slow API calls.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Over-Fetching vs Under-Fetching War
    </h3>,
    <Table
      key="3"
      headers={["Problem", "REST Reality", "The GraphQL Fix"]}
      rows={[
        [
          "Under-fetching",
          "`GET /users` only returns IDs. The frontend must then fire 10 more loops to `GET /users/:id` to get names. (The N+1 Problem).",
          "GraphQL asks for deeply nested data in exactly one single POST request to `/graphql`. Zero sequential waterfalls."
        ],
        [
          "Over-fetching",
          "`GET /movie/12` returns 900 fields of data, even though the mobile app only wanted the 'title'. Massive bandwidth waste.",
          "The frontend explicitly dictates exactly which 2 fields it wants. The backend strictly trims the fat before sending."
        ]
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Database} title="The Frontend Utopia" subtitle="Why app teams love GraphQL" theme="violet">
        <p className="text-sm text-violet-100/75">
          Frontend engineers dictate the entire data shape using declarative queries. They no longer have to beg backend teams to "please build a custom endpoint for my specific mobile screen."
        </p>
      </FeatureCard>
      <FeatureCard icon={Network} title="The Backend Nightmare" subtitle="Why infra teams stay cautious" theme="amber">
        <p className="text-sm text-amber-100/75">
          Caching completely dies. REST caches perfectly on standard CDNs because `GET /users/5` is an immutable URL string. GraphQL sends everything wildly as unique POST bodies, destroying edge caches and forcing backend devs to build insanely complex 'DataLoader' systems to prevent their SQL database from catching fire.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="5" type="tip" title="BFF Pattern (Backend for Frontend)">
      Modern companies often stick to pure REST/gRPC for their core microservices, but build a tiny GraphQL translation layer purely to serve their React apps securely.
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The N+1 Query Problem (Both Suffer)
    </h3>,
    <p key="7">
      In REST, fetching a list of 10 blog posts and their authors requires 11 requests: <code>GET /posts</code> (1 request) + <code>GET /users/:id</code> (10 requests).<br/><br/>
      GraphQL <em>appears</em> to solve this with one query, but if the backend resolver is naive, it still fires 10 separate SQL queries. The solution is <strong>DataLoader</strong>, which batches and caches database calls within a single request.
    </p>,
    <CodeBlock
      key="8"
      theme="violet"
      language="graphql"
      title="GraphQL Query"
      code={`query {
  posts {
    title
    author {
      name
      email
    }
  }
}`}
    />,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      When REST Wins
    </h3>,
    <ul key="10" className="list-disc pl-6 space-y-2 text-sm">
      <li><strong>Simple CRUD APIs:</strong>&nbsp;If your API is just basic Create/Read/Update/Delete, REST is simpler.</li>
      <li><strong>File Uploads:</strong>&nbsp;GraphQL struggles with multipart form data. REST handles it natively.</li>
      <li><strong>HTTP Caching:</strong>&nbsp;CDNs and browsers cache <code>GET /users/5</code> automatically. GraphQL requires custom cache keys.</li>
      <li><strong>Monitoring:</strong>&nbsp;REST endpoints are easy to monitor (track <code>/api/orders</code> latency). GraphQL is one endpoint with infinite query variations.</li>
    </ul>,
  ],
};
