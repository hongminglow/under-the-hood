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
      The <strong>Testing Pyramid</strong> is a framework for balancing test speed, cost, and confidence. While the traditional model prioritizes Unit tests, modern frontend development often shifts toward the <strong>Testing Trophy</strong>, emphasizing Integration tests for maximum ROI.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Pyramid vs. Trophy: Finding the Sweet Spot
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Traditional Pyramid">
        <p className="text-sm text-muted-foreground mb-2">
          Focuses on <strong>Unit Tests</strong>. Great for complex logic and algorithms, but can suffer from "tests pass, app broken" if the pieces don't fit together.
        </p>
        <p className="text-xs font-mono text-blue-500">Fast CI / Low Dev Confidence</p>
      </Card>
      <Card title="The Testing Trophy">
        <p className="text-sm text-muted-foreground mb-2">
          Focuses on <strong>Integration Tests</strong> (Testing Library). Tests how components interact as a user would, without the overhead of a full browser.
        </p>
        <p className="text-xs font-mono text-green-500">Medium Speed / High Confidence</p>
      </Card>
    </Grid>,
    <Table
      key="4"
      headers={["Level", "Technical Purpose", "Trade-offs"]}
      rows={[
        [
          "Unit",
          "Verify pure functions and isolated logic (e.g., a regex or a math util).",
          "Executes in milliseconds; completely stable; zero network overhead."
        ],
        [
          "Integration",
          "Verify that a component and its children render and fire events correctly.",
          "Highest ROI; mocks the network but uses real React state/hooks."
        ],
        [
          "E2E (End-to-End)",
          "Audit the full user flow (Login -> Dashboard) in a real browser.",
          "<strong>High Flakiness:</strong> Non-deterministic results due to timing, latency, or stale data."
        ]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Why E2E Tests Are Flaky
    </h3>,
    <p key="6" className="mb-4">
      E2E tests (Playwright/Cypress) are notorious for "flakiness"—tests that pass locally but fail in CI. This is usually caused by <strong>Race Conditions</strong>: the test script clicks a button before the JavaScript has finished mounting the event listener, or a network request takes 200ms longer than the timeout.
    </p>,
    <Callout key="7" type="warning" title="The False Confidence of 100% Coverage">
      Standard code coverage only measures if a line <em>executed</em>, not if it was <em>verified</em>. You can achieve 100% coverage with tests that have zero assertions. Focus on <strong>Scenario Coverage</strong> (user behaviors) rather than <strong>Line Coverage</strong>.
    </Callout>,
  ],
};
