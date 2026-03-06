import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const testingPyramidTopic: Topic = {
  id: "testing-pyramid",
  title: "Testing Pyramid & Strategies",
  description:
    "Unit vs Integration vs E2E — the pyramid that defines how many of each test you should write, and why teams always get it wrong.",
  tags: ["testing", "devops", "best-practices", "fullstack"],
  icon: "FlaskConical",
  content: [
    <p key="1">
      The <strong>Testing Pyramid</strong> (Martin Fowler) dictates:{" "}
      <strong>lots of unit tests</strong> at the base (fast, cheap),{" "}
      <strong>fewer integration tests</strong> in the middle, and{" "}
      <strong>very few E2E tests</strong> at the top (slow, expensive). But in
      practice, many teams build an <strong>inverted pyramid</strong> (the "Ice
      Cream Cone" anti-pattern) — heavy on E2E, light on unit.
    </p>,
    <Table
      key="2"
      headers={["Level", "Scope", "Speed", "Cost", "Confidence"]}
      rows={[
        [
          "Unit Tests",
          "Single function/component",
          "~1ms each",
          "Cheapest",
          "Low (tests in isolation)",
        ],
        [
          "Integration Tests",
          "Multiple modules together",
          "~100ms each",
          "Medium",
          "Medium (real interactions)",
        ],
        [
          "E2E Tests",
          "Full user journey (browser)",
          "~10s each",
          "Expensive",
          "Highest (real-world behavior)",
        ],
        [
          "Contract Tests",
          "API interface between services",
          "~10ms each",
          "Low",
          "Medium (prevents breaking changes)",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Unit Tests (70%)">
        <p className="text-sm">
          Test pure functions and components in{" "}
          <strong>complete isolation</strong>. Mock all external dependencies.
          Fast enough to run on every save. Tools:{" "}
          <strong>Jest, Vitest, pytest</strong>.
        </p>
      </Card>
      <Card title="Integration Tests (20%)">
        <p className="text-sm">
          Test how modules <strong>work together</strong> — API routes hitting a
          test database, React components with real state. Can use real or
          containerized dependencies. Tools:{" "}
          <strong>Supertest, Testing Library, Testcontainers</strong>.
        </p>
      </Card>
      <Card title="E2E Tests (10%)">
        <p className="text-sm">
          Simulate a real user clicking through the app in a browser. Full
          confidence but slow, flaky, and expensive to maintain. Cover only{" "}
          <strong>critical user paths</strong> (login, checkout, signup). Tools:{" "}
          <strong>Playwright, Cypress</strong>.
        </p>
      </Card>
      <Card title="The Ice Cream Cone ❌">
        <p className="text-sm">
          Many E2E, some integration, few unit tests. Slow CI pipelines (30+
          minutes), flaky test suites, deployments blocked by browser tests.
          Teams lose trust in their test suite and skip tests entirely.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Pragmatic Rule">
      Every <strong>bug fix</strong> should start with a failing test that
      reproduces the bug, then the fix, then a passing test. This naturally
      builds coverage over time without requiring "100% coverage" mandates that
      encourage meaningless tests.
    </Callout>,
  ],
};
