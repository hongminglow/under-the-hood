import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const dependencyInjectionTopic: Topic = {
  id: "dependency-injection",
  title: "Dependency Injection (IoC)",
  description:
    "Why hardcoding 'new Database()' inside your classes makes them completely impossible to unit test.",
  tags: ["architecture", "programming", "testing"],
  icon: "Syringe",
  content: [
    <p key="1">
      <strong>Dependency Injection (DI)</strong> is a design pattern that implements <strong>Inversion of Control (IoC)</strong>. Instead of a class creating its own dependencies, they are "injected" from the outside.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The "Hollywood Principle"
    </h3>,
    <p key="3" className="mb-4">
      <em>"Don't call us, we'll call you."</em> In a DI architecture, your low-level components (Database, Logger) don't decide when they are used. A high-level <strong>IoC Container</strong> (like NestJS or Awilix) manages their lifecycle and wiring.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Tight Coupling (Fragile)">
        <p className="text-sm text-muted-foreground mb-4">
          A class uses <code>new Database()</code>. If you change the database name or credentials, you must search and replace every file in your app.
        </p>
        <p className="text-sm text-red-500 font-bold">Un-testable without a real DB.</p>
      </Card>
      <Card title="Loose Coupling (Flexible)">
        <p className="text-sm text-muted-foreground mb-4">
          A class accepts <code>IDatabase</code>. It doesn't care if it's Postgres, MongoDB, or a Mock.
        </p>
        <p className="text-sm text-green-500 font-bold">Swap implementations in 1 line of config.</p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Benefits of DI
    </h3>,
    <Table
      key="6"
      headers={["Benefit", "Technical Explanation"]}
      rows={[
        [
          "Testability",
          "Pass a <strong>Mock Object</strong> into the constructor to simulate failures without using a network."
        ],
        [
          "Single Responsibility",
          "Classes focus on <strong>using</strong> tools, not <strong>configuring</strong> or creating them."
        ],
        [
          "Code Reuse",
          "The same <code>AuthService</code> can be injected into a Web Server, a CLI tool, or a Lambda function."
        ]
      ]}
    />,
    <Callout key="7" type="info" title="What is an IoC Container?">
      In large apps, manually doing <code>new A(new B(new C()))</code> is exhausting. An <strong>IoC Container</strong> scans your code, finds all the "demands" in constructors, and automatically instantiates and injects everything in the correct order.
    </Callout>,
  ],
};
