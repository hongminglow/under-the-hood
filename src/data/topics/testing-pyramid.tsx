import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Pyramid, Trophy } from "lucide-react";

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
      <FeatureCard icon={Pyramid} title="The Traditional Pyramid" subtitle="Theme: speed and isolation" theme="amber">
        <p className="mb-3 text-amber-100/80">
          Focuses on <strong className="text-amber-300">Unit Tests</strong>. Great for complex logic and algorithms, but it
          can produce the classic failure mode: "tests pass, app broken" because the pieces were never verified together.
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-amber-300/80">Fast CI / Lower product confidence</p>
      </FeatureCard>
      <FeatureCard icon={Trophy} title="The Testing Trophy" subtitle="Theme: behavior confidence" theme="emerald">
        <p className="mb-3 text-red-100/80">
          Focuses on <strong className="text-red-300">Integration Tests</strong>. Components, hooks, and user events are
          exercised together, without paying the full cost of driving a real browser for every scenario.
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-red-300/80">Medium speed / High user confidence</p>
      </FeatureCard>
    </Grid>,
    <Table
      key="4"
      headers={["Level", "Technical Purpose", "Trade-offs"]}
      rows={[
        [
          "<span class='text-amber-300 font-black'>Unit</span>",
          "Verify pure functions and isolated logic (e.g., a regex or a math util).",
          "Executes in milliseconds; completely stable; zero network overhead."
        ],
        [
          "<span class='text-emerald-300 font-black'>Integration</span>",
          "Verify that a component and its children render and fire events correctly.",
          "Highest ROI; mocks the network but uses real React state/hooks."
        ],
        [
          "<span class='text-sky-300 font-black'>E2E (End-to-End)</span>",
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
