import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const reactServerComponentsTopic: Topic = {
  id: "react-server-components",
  title: "React Server Components",
  description:
    "React's paradigm shift: components that run on the server, send zero JavaScript to the browser, and fetch data without useEffect.",
  tags: ["react", "frontend", "nextjs", "architecture"],
  icon: "Server",
  content: [
    <p key="1">
      React Server Components (RSC) split your component tree into two worlds:{" "}
      <strong>Server Components</strong> (default in Next.js App Router) run
      only on the server — they can directly query databases, access the
      filesystem, and use secrets. <strong>Client Components</strong> (
      <code>"use client"</code>) run in the browser and handle interactivity.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Server Components (Default)">
        <CodeBlock
          language="tsx"
          title="app/page.tsx"
          code={`// No "use client" → Server Component
// Can directly access DB, no API route needed!
import { db } from "@/lib/db";

export default async function UsersPage() {
  const users = await db.user.findMany();
  // 👆 Runs on server. Zero JS sent to browser.

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`}
        />
      </Card>
      <Card title="Client Components">
        <CodeBlock
          language="tsx"
          title="components/Counter.tsx"
          code={`"use client"; // ← Opt-in to client-side

import { useState } from "react";

export function Counter() {
  // useState, onClick, etc. ONLY work
  // in Client Components
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c+1)}>
      Count: {count}
    </button>
  );
}`}
        />
      </Card>
    </Grid>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="✅ Benefits">
        <p className="text-sm">
          <strong>Zero JavaScript</strong> for data-heavy pages. Direct database
          access without API routes. Secrets stay on the server. Automatic
          code-splitting. <strong>Streaming</strong> with Suspense — show
          content as it loads, don't block on one slow query.
        </p>
      </Card>
      <Card title="⚠️ Limitations">
        <p className="text-sm">
          <strong>No hooks</strong> (useState, useEffect) in Server Components.
          No browser APIs (window, document). Can't pass{" "}
          <strong>functions as props</strong> to Client Components (functions
          aren't serializable). Mental model shift is steep for existing React
          developers.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Composition Pattern">
      Server Components can <strong>import</strong> Client Components, but not
      vice versa. The pattern: Server Component fetches data and{" "}
      <strong>passes it as props</strong> to a Client Component that handles
      interactivity. Think of Server Components as the "data layer" and Client
      Components as the "interaction layer".
    </Callout>,
  ],
};
