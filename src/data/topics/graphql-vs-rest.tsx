import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const graphqlVsRestTopic: Topic = {
  id: "graphql-vs-rest",
  title: "GraphQL vs REST",
  description:
    "Evolving API design from strict resource-based endpoints to flexible, consumer-driven queries.",
  tags: ["api", "architecture", "graphql", "rest"],
  icon: "Network",
  content: [
    <p key="1">
      APIs (Application Programming Interfaces) are how decoupled systems
      communicate. For over a decade, <strong>REST</strong> (Representational
      State Transfer) was the absolute standard. But modern data-intensive apps
      birthed a new paradigm: <strong>GraphQL</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      REST: Resource-Centric
    </h4>,
    <p key="3">
      In REST, everything revolves around resources identified by URLs. A single
      conceptual entity (like a User) might require multiple HTTP requests to
      fetch all its related data (Overfetching/Underfetching).
    </p>,
    <Grid key="4" cols={2} gap={4} className="mb-8 mt-4">
      <CodeBlock
        language="http"
        code={`GET /users/123\n=> { id: 123, name: "Alice", email: "..." }`}
      />
      <CodeBlock
        language="http"
        code={`GET /users/123/posts\n=> [{ id: 1, title: "Hello World" }]`}
      />
    </Grid>,
    <h4 key="5" className="text-xl font-bold mb-4">
      GraphQL: Client-Centric
    </h4>,
    <p key="6">
      Invented by Facebook to solve the mobile network crunch, GraphQL exposes a{" "}
      <em>single endpoint</em> (`/graphql`). The client dictates exactly the
      shape and size of the data it wants in a single request.
    </p>,
    <div key="7" className="mt-4">
      <CodeBlock
        language="graphql"
        code={`query {
  user(id: "123") {
    name
    posts {
      title
    }
  }
}`}
      />
    </div>,
    <Grid key="8" cols={2} gap={6} className="mt-8">
      <Card title="When to use REST">
        <ul className="space-y-2 list-disc pl-4 mt-2 text-sm">
          <li>Standardized architecture with HTTP-native caching.</li>
          <li>File uploads and binary data are easier to handle.</li>
          <li>Strict separation between microservices.</li>
        </ul>
      </Card>
      <Card title="When to use GraphQL">
        <ul className="space-y-2 list-disc pl-4 mt-2 text-sm">
          <li>
            Rapid frontend iteration (frontend devs don't need backend changes
            for new data structures).
          </li>
          <li>
            Aggregating data from multiple microservices into a unified graph.
          </li>
          <li>Heavily nested, interconnected data graphs.</li>
        </ul>
      </Card>
    </Grid>,
  ],
};
