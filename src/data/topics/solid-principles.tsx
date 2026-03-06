import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const solidPrinciplesTopic: Topic = {
  id: "solid-principles",
  title: "SOLID Principles",
  description:
    "The 5 foundational OOP design principles that every interviewer expects you to know — and apply correctly in code reviews.",
  tags: ["oop", "design-patterns", "interview", "clean-code"],
  icon: "BookOpen",
  content: [
    <p key="1">
      <strong>SOLID</strong> is an acronym for 5 design principles introduced by
      Robert C. Martin (Uncle Bob) that make software{" "}
      <strong>maintainable, extensible, and testable</strong>. They're asked in
      virtually every mid-to-senior engineering interview.
    </p>,
    <Grid key="2" cols={1} gap={6} className="my-8">
      <Card title="S — Single Responsibility Principle">
        <p className="text-sm">
          A class should have <strong>only one reason to change</strong>. If
          your <code>UserService</code> handles authentication, email sending,
          AND database queries, it has three reasons to change. Split it into{" "}
          <code>AuthService</code>, <code>EmailService</code>, and{" "}
          <code>UserRepository</code>.
        </p>
      </Card>
      <Card title="O — Open/Closed Principle">
        <p className="text-sm">
          Software entities should be{" "}
          <strong>open for extension but closed for modification</strong>. Add
          new behavior through interfaces and inheritance — not by editing
          existing code. A payment system should accept new payment methods via
          a <code>PaymentProcessor</code> interface, not <code>if/else</code>{" "}
          chains.
        </p>
      </Card>
      <Card title="L — Liskov Substitution Principle">
        <p className="text-sm">
          Subtypes must be <strong>substitutable</strong> for their base types
          without altering correctness. If <code>Square extends Rectangle</code>{" "}
          but setting width breaks height, it violates LSP. The classic
          interview trap.
        </p>
      </Card>
      <Card title="I — Interface Segregation Principle">
        <p className="text-sm">
          No client should be forced to implement interfaces it doesn't use. A{" "}
          <code>Worker</code> interface with <code>work()</code> and{" "}
          <code>eat()</code> forces robots to implement <code>eat()</code>.
          Split into <code>Workable</code> and <code>Eatable</code>.
        </p>
      </Card>
      <Card title="D — Dependency Inversion Principle">
        <p className="text-sm">
          High-level modules should not depend on low-level modules. Both should
          depend on <strong>abstractions</strong>. Your{" "}
          <code>OrderService</code> should depend on a <code>Database</code>{" "}
          interface, not directly on <code>PostgresClient</code>. This enables
          swapping implementations.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="3"
      language="typescript"
      title="Dependency Inversion in Practice"
      code={`// ❌ Tight coupling — OrderService depends on concrete PostgresDB
class OrderService {
  private db = new PostgresDB(); // Hard dependency
}

// ✅ Dependency Inversion — depend on abstraction
interface Database {
  save(data: unknown): Promise<void>;
}

class OrderService {
  constructor(private db: Database) {} // Injected abstraction
}

// Now you can swap PostgresDB, MongoDB, or a MockDB for testing`}
    />,
    <Callout key="4" type="tip" title="SOLID in Practice">
      Don't over-engineer. Applying SOLID to a 100-line script creates
      unnecessary abstraction. Apply it when code is{" "}
      <strong>likely to change or grow</strong>. The principles are{" "}
      <em>guidelines</em>, not laws — pragmatism beats dogma.
    </Callout>,
  ],
};
