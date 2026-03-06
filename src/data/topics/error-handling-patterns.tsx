import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const errorHandlingTopic: Topic = {
  id: "error-handling-patterns",
  title: "Error Handling Patterns",
  description:
    "Try-catch is just the beginning: Result types, error boundaries, centralized handlers, and the patterns that keep production stable.",
  tags: ["programming", "patterns", "fullstack", "best-practices"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      Poor error handling is the #1 cause of{" "}
      <strong>unhandled rejections</strong>, <strong>silent failures</strong>,
      and <strong>cryptic error messages</strong> in production. The difference
      between a junior and senior developer is often how they handle the{" "}
      <em>unhappy path</em>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Try-Catch (Imperative)">
        <CodeBlock
          language="typescript"
          title="The Basics"
          code={`try {
  const user = await db.getUser(id);
  return user;
} catch (error) {
  // Don't just log — handle meaningfully
  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: "User not found" });
  }
  // Re-throw unknown errors to global handler
  throw error;
}`}
        />
      </Card>
      <Card title="Result Type (Functional)">
        <CodeBlock
          language="typescript"
          title="Rust-inspired"
          code={`type Result<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };

function getUser(id: string): Result<User, string> {
  const user = db.find(id);
  if (!user) return { ok: false, error: "Not found" };
  return { ok: true, data: user };
}

const result = getUser("42");
if (!result.ok) handleError(result.error);`}
        />
      </Card>
    </Grid>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="React Error Boundaries">
        <p className="text-sm">
          Wrap component trees with <code>&lt;ErrorBoundary&gt;</code> to catch
          render errors and show a fallback UI instead of a white screen. Only
          catches <strong>rendering errors</strong>, not event handlers or async
          code.
        </p>
      </Card>
      <Card title="Express Global Error Handler">
        <p className="text-sm">
          A single <code>app.use((err, req, res, next))</code> middleware
          catches <strong>all unhandled errors</strong>, logs them, and returns
          a consistent error response. Individual routes just <code>throw</code>{" "}
          — the handler catches everything.
        </p>
      </Card>
      <Card title="Custom Error Classes">
        <p className="text-sm">
          Extend <code>Error</code> with specific types:{" "}
          <code>ValidationError</code>, <code>AuthorizationError</code>,{" "}
          <code>NotFoundError</code>. Use <code>instanceof</code> to handle each
          type differently (different status codes, messages).
        </p>
      </Card>
      <Card title="Graceful Degradation">
        <p className="text-sm">
          If a non-critical service fails (recommendations, analytics),{" "}
          <strong>don't crash the entire page</strong>. Show fallback content,
          log the error, and let the user continue with the critical features
          that still work.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="Never Swallow Errors Silently">
      <code>catch (e) {"{ /* empty */ }"}</code> is the worst anti-pattern in
      existence. The error happened, but nobody knows about it. Production
      breaks silently. At minimum: <strong>log the error</strong>,{" "}
      <strong>report to monitoring</strong> (Sentry), and{" "}
      <strong>return a meaningful response</strong>.
    </Callout>,
  ],
};
