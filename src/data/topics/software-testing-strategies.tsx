import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const softwareTestingStrategiesTopic: Topic = {
  id: "software-testing-strategies",
  title: "Software Testing Strategies",
  description:
    "A comprehensive comparison of software testing strategies, when to employ them, and their expected coverage.",
  tags: ["testing", "quality-assurance", "devops", "engineering"],
  icon: "CheckCircle",
  content: [
    <p key="1">
      Modern software development relies on a diverse array of testing strategies to ensure quality, performance, and security. No single strategy can catch every bug; instead, teams layer different types of tests to achieve comprehensive coverage.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Testing Spectrum
    </h3>,
    <Table
      key="3"
      headers={["Strategy", "What it Tests", "When to Use", "Coverage Focus"]}
      rows={[
        ["Unit Testing", "Individual functions, methods, or classes in isolation.", "During active development; TDD.", "High code coverage; branch/statement level."],
        ["Integration Testing", "Interaction between components, APIs, or database modules.", "When combining multiple units or external dependencies.", "Module boundaries; data flow between layers."],
        ["End-to-End (E2E)", "The entire application flow from the user's perspective.", "Before major releases to ensure critical paths work.", "User journey coverage; UI/Backend integration."],
        ["Smoke Testing", "Basic functionality of critical features to ensure build stability.", "Immediately after a new build or deployment.", "Minimal lines of code, but high business value paths."],
        ["Regression Testing", "Verification that new code hasn't broken existing functionality.", "After bug fixes, refactoring, or adding new features.", "Historical bugs and previously working core features."],
        ["Performance Testing", "System responsiveness and stability under various workloads.", "Before scaling up or expecting high traffic events.", "Throughput, latency, and resource utilization."],
        ["UAT (User Acceptance)", "Validation by actual end-users against business requirements.", "Final phase before a product is fully released.", "Business requirement coverage; user satisfaction."],
        ["Chaos Testing", "The system's ability to withstand turbulent and unexpected conditions.", "In complex distributed systems (e.g., microservices).", "Resilience; failover and recovery mechanisms."],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Smoke vs. Sanity Testing">
        <p className="text-sm text-slate-400 mb-2">
          Often confused, but serve different purposes in the release cycle.
        </p>
        <p className="text-xs italic text-slate-400">
          <strong>Smoke Testing</strong> checks if the build is stable enough to test at all (e.g., "Does the app crash on startup?"). <strong>Sanity Testing</strong> checks if a specific recent change or bug fix actually works.
        </p>
      </Card>
      <Card title="TDD vs. BDD">
        <p className="text-sm text-slate-400 mb-2">
          Methodologies driving how tests are written.
        </p>
        <p className="text-xs italic text-slate-400">
          <strong>Test-Driven Development (TDD)</strong> tests the implementation details (developer-focused). <strong>Behavior-Driven Development (BDD)</strong> tests the user behavior often using plain English syntax like Gherkin (product-focused).
        </p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Advanced: Mutation Testing
    </h3>,
    <p key="6" className="mb-4">
      How do you test your tests? <strong>Mutation Testing</strong> introduces small, intentional bugs (mutations) into your code—like changing a <code>&lt;</code> to a <code>&lt;=</code>. If your test suite passes despite the mutation, your tests are weak (the mutation "survived"). If your tests fail, they are strong (the test "killed" the mutant). It evaluates the <em>quality</em> of your test suite, not just line coverage.
    </p>,
    <Callout key="7" type="info" title="Coverage Metrics vs. Real Confidence">
      Achieving 100% code coverage does not guarantee bug-free software. Coverage only proves that code was executed during a test, not that all edge cases or states were verified. Strike a balance between high unit coverage and meaningful integration/E2E scenarios that map to real user behavior.
    </Callout>,
  ],
};
