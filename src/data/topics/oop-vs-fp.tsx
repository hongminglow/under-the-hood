import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const oopVsFpTopic: Topic = {
  id: "oop-vs-fp",
  title: "OOP vs FP Paradigms",
  description:
    "Object-Oriented state mutation versus Functional Programming data immutability spanning decades of debate.",
  tags: ["cs-fundamentals", "architecture", "patterns"],
  icon: "Code2",
  content: [
    <p key="1">
      At the highest level, programming paradigms dictate how a developer
      conceptualizes problems. The two giants dominating enterprise software are
      <strong>Object-Oriented Programming (OOP)</strong> and{" "}
      <strong>Functional Programming (FP)</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Object-Oriented Programming (OOP)">
        <p className="text-sm font-semibold mb-2">Java, C#, C++, Python</p>
        <p className="text-sm">
          Everything is modeled as "Objects" (Nouns) which encapsulate both{" "}
          <strong>State</strong> (Data) and <strong>Behavior</strong> (Methods).
        </p>
        <ul className="text-sm space-y-1 list-disc pl-4 mt-4 text-emerald-400">
          <li>
            <strong>Encapsulation:</strong> Hiding internal state (`private`).
          </li>
          <li>
            <strong>Inheritance:</strong> Classes inherit behavior from parent
            classes.
          </li>
          <li>
            <strong>Polymorphism:</strong> Treating subclasses identically
            through interfaces.
          </li>
          <li>
            <strong>Mutation:</strong> Objects frequently mutate their internal
            state.
          </li>
        </ul>
      </Card>
      <Card title="Functional Programming (FP)">
        <p className="text-sm font-semibold mb-2">
          Haskell, Clojure, Elixir, Rust/TS (Hybrid)
        </p>
        <p className="text-sm">
          Everything is modeled as mathematical "Functions" (Verbs). Data is
          passed through pipelines of transformations.
        </p>
        <ul className="text-sm space-y-1 list-disc pl-4 mt-4 text-emerald-400">
          <li>
            <strong>Immutability:</strong> Data is never changed. Copies are
            returned instead.
          </li>
          <li>
            <strong>Pure Functions:</strong> Same input ALWAYS yields same
            output. No side effects.
          </li>
          <li>
            <strong>Higher-Order:</strong> Functions can take functions as
            arguments or return them.
          </li>
          <li>
            <strong>Composition:</strong> Small functions combined into complex
            ones.
          </li>
        </ul>
      </Card>
    </Grid>,
    <Table
      key="3"
      headers={["Concept", "OOP Focus", "FP Focus"]}
      rows={[
        [
          "Data management",
          "Encapsulated & Mutated",
          "Immutable & Transformed",
        ],
        [
          "Code organization",
          "Classes & Interfaces",
          "Modules & Pure Functions",
        ],
        [
          "Concurrency",
          "Hard (Requires locks/mutexes on shared state)",
          "Easy (No shared mutable state)",
        ],
        [
          "Testing",
          "Requires heavy mocking of stateful objects",
          "Trivial (input -> output assertions)",
        ],
      ]}
    />,
    <Callout key="4" type="tip" title="The Hybrid Reality">
      Modern language design heavily favors <strong>Multi-Paradigm</strong>{" "}
      patterns. JavaScript, Kotlin, and Scala elegantly mix both. React shifted
      the UI industry from OOP (Class Components with `this.state`) to FP (Pure
      Function Components with Hooks) due to predictable immutability.
    </Callout>,
  ],
};
