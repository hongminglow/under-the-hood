import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const errorHandlingTopic: Topic = {
  id: "error-handling-patterns",
  title: "Error Handling Patterns",
  description:
    "Try-catch is just the beginning: Result types, error boundaries, centralized handlers, and the patterns that keep production stable.",
  tags: ["programming", "patterns", "fullstack", "best-practices"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      Robust error handling is the difference between a minor glitch and a system-wide outage. Beyond <code>try/catch</code>, modern applications use <strong>Centralized Error Handlers</strong> and <strong>Result Types</strong> to ensure every failure is predicted or gracefully managed.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Trusted vs. Untrusted Errors
    </h3>,
    <p key="3" className="mb-4">
      An <strong>Operational Error</strong> (Trusted) is a predicted failure like "User Not Found" or "Invalid Input." A <strong>Programmer Error</strong> (Untrusted) is an unpredicted bug like <code>TypeError: cannot read property 'x' of undefined</code>.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Operational (Trusted)">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>User input validation failed.</li>
          <li>External API timeout.</li>
          <li>Database connection loss.</li>
        </ul>
        <p className="text-xs mt-4 text-green-500 font-bold">Strategy: Handle & Continue.</p>
      </Card>
      <Card title="Programmer (Untrusted)">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Reading property of null.</li>
          <li>Passing wrong types to functions.</li>
          <li>Infinite loops.</li>
        </ul>
        <p className="text-xs mt-4 text-red-500 font-bold">Strategy: Restart the Process.</p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Centralized Error Management
    </h3>,
    <Table
      key="6"
      headers={["Layer", "Technical Implementation", "Purpose"]}
      rows={[
        ["Express Middleware", "<code>app.use((err, req, res, next))</code>", "A single source of truth for all API error responses."],
        ["React Boundary", "<code>getDerivedStateFromError</code>", "Prevents a single component crash from white-screening the whole app."],
        ["Global Listeners", "<code>process.on('unhandledRejection')</code>", "The final safety net to log errors before the process dies."]
      ]}
    />,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Production Observability
    </h3>,
    <p key="8" className="mb-4">
      In production, <code>console.error</code> is useless. You need tools like <strong>Sentry</strong> or <strong>LogRocket</strong> that capture the <strong>Stack Trace</strong>, local variables, and the user's breadcrumbs (exactly what they clicked) leading up to the crash.
    </p>,
    <Callout key="9" type="warning" title="The Fail-Fast Rule">
      If an <strong>Untrusted Error</strong> happens, the internal state of your app is now corrupted. Do not try to keep the process alive. Log the error to Sentry, <strong>panic</strong>, and let <strong>PM2</strong> or <strong>Kubernetes</strong> restart the container in a clean state.
    </Callout>,
  ],
};
