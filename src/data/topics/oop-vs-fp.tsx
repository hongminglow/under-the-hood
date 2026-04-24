import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Boxes, FunctionSquare } from "lucide-react";

export const oopVsFpTopic: Topic = {
  id: "oop-vs-fp",
  title: "OOP vs FP",
  description:
    "The ideological war between mutating objects with state, versus piping pure data through isolated mathematical functions.",
  tags: ["core", "architecture"],
  icon: "Binary",
  content: [
    <p key="1">
      For decades, <span className="px-1.5 py-0.5 rounded-md border text-[13px] font-bold tracking-tight bg-amber-500/10 text-amber-300 border-amber-500/20">Object-Oriented Programming (OOP)</span> dominated the enterprise. You built a `Car` class with internal fuel state, and called `car.drive()`. But as apps got massive, tracking which object mutated the shared state became a nightmare. <span className="px-1.5 py-0.5 rounded-md border text-[13px] font-bold tracking-tight bg-emerald-500/10 text-emerald-300 border-emerald-500/20">Functional Programming (FP)</span> emerged to ban internal state completely.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Philosophies
    </h3>,
    <Grid key="2a" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Boxes} title="Object-Oriented Programming" subtitle="Mutable state inside long-lived objects" theme="amber">
        <p className="text-sm text-amber-100/75">
          OOP organizes behavior around entities that carry their own state. That feels intuitive for domains like cars,
          users, or services, but once mutation spreads across a large system, debugging who changed what becomes painful.
        </p>
      </FeatureCard>
      <FeatureCard icon={FunctionSquare} title="Functional Programming" subtitle="Pure functions over immutable data" theme="emerald">
        <p className="text-sm text-emerald-100/75">
          FP treats data as immutable values and pushes change through isolated functions. That makes flows more predictable,
          but can introduce its own tradeoffs in verbosity, cloning, and conceptual overhead.
        </p>
      </FeatureCard>
    </Grid>,
    <Table
      key="3"
      headers={["Concept", "OOP (Java, C++)", "FP (Haskell, React)"]}
      rows={[
        [
          "State",
          "Objects hold hidden variables. Methods mutate them directly.",
          "Data is strictly immutable. If you want to change data, you must return a brand new copy."
        ],
        [
          "Flow",
          "You call methods on objects in sequences layer by layer.",
          "You pass data inputs through a pipeline of pure mathematical functions."
        ],
        [
          "The Trap",
          "The 'Banana Gorilla' problem. You wanted a banana, but you got a gorilla holding the banana, and the entire jungle attached to it through inheritance.",
          "Prop drilling and excessive memory allocation because you are constantly cloning massive arrays instead of just pushing to them."
        ]
      ]}
    />,
    <CodeBlock 
      key="4"
      theme="emerald"
      title="The React Perspective"
      language="typescript"
      code={`
// React explicitly enforces functional programming. 
// You cannot mutate the state object directly!

// WRONG (OOP Style)
state.count = 5; 
state.render();

// CORRECT (FP Style)
// You must provide a brand new copy of the data
setCount(prev => prev + 1);
      `}
    />,
    <Callout key="5" type="tip" title="The Industry Convergence">
      Modern codebases use a hybrid. We use OOP for managing long-lived connections (Database classes, Service Singletons), but we use strict FP pure functions for UI rendering and data transformation (React components, array maps).
    </Callout>,
  ],
};
