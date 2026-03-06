import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const restApiDesignTopic: Topic = {
  id: "rest-api-design",
  title: "REST API Design Best Practices",
  description:
    "The unwritten rules of designing clean, scalable, and developer-friendly REST APIs that interviewers love to challenge.",
  tags: ["api", "architecture", "rest", "interview"],
  icon: "Route",
  content: [
    <p key="1">
      REST is <strong>not a protocol</strong> — it's an{" "}
      <strong>architectural style</strong> defined by 6 constraints (Roy
      Fielding's 2000 dissertation). Most "REST" APIs in production violate
      multiple constraints. Knowing the <em>real</em> rules sets you apart in
      interviews.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Core Design Rules
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Use Nouns, Not Verbs">
        <p className="text-sm">
          <code className="text-red-400">GET /getUsers</code> ❌ →{" "}
          <code className="text-green-400">GET /users</code> ✅. The HTTP method{" "}
          <em>is</em> the verb. The URI represents the <strong>resource</strong>{" "}
          (noun).
        </p>
      </Card>
      <Card title="Plural Resource Names">
        <p className="text-sm">
          <code>/users</code> (collection), <code>/users/42</code> (individual).
          Consistency matters — never mix <code>/user</code> and{" "}
          <code>/users</code> in the same API.
        </p>
      </Card>
      <Card title="Hierarchical Relationships">
        <p className="text-sm">
          <code>GET /users/42/orders</code> — orders <em>belonging to</em> user
          42. Nest only 1 level deep: <code>/users/42/orders/7/items</code> is
          too deep — flatten it.
        </p>
      </Card>
      <Card title="Proper Status Codes">
        <p className="text-sm">
          <code>200</code> OK, <code>201</code> Created, <code>204</code> No
          Content, <code>400</code> Bad Request, <code>401</code> Unauthorized,{" "}
          <code>403</code> Forbidden, <code>404</code> Not Found,{" "}
          <code>409</code> Conflict, <code>429</code> Rate Limited,{" "}
          <code>500</code> Server Error.
        </p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["HTTP Method", "CRUD Operation", "Idempotent?", "Safe?"]}
      rows={[
        ["GET", "Read", "Yes", "Yes"],
        ["POST", "Create", "No", "No"],
        ["PUT", "Full Replace", "Yes", "No"],
        ["PATCH", "Partial Update", "No*", "No"],
        ["DELETE", "Remove", "Yes", "No"],
      ]}
    />,
    <CodeBlock
      key="5"
      language="typescript"
      title="Pagination, Filtering & Sorting"
      code={`// Cursor-based pagination (preferred for large datasets)
GET /api/v1/users?cursor=eyJpZCI6NDJ9&limit=25

// Offset-based pagination (simpler but slower at scale)
GET /api/v1/users?page=3&per_page=25

// Filtering + Sorting
GET /api/v1/users?role=admin&sort=-created_at&fields=id,name,email

// Versioning in URL (most common approach)
GET /api/v1/users    // Version 1
GET /api/v2/users    // Version 2 (breaking changes)`}
    />,
    <Callout key="6" type="warning" title="PUT vs PATCH: The Interview Trap">
      <strong>PUT</strong> replaces the <em>entire</em> resource. If you PUT a
      user with only <code>{`{ "name": "John" }`}</code>, all other fields
      (email, role, etc.) are wiped to null. <strong>PATCH</strong> updates{" "}
      <em>only the specified fields</em>, leaving everything else untouched.
      Interviewers test this constantly.
    </Callout>,
  ],
};
