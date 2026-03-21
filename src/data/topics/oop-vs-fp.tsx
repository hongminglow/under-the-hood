import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";

export const oopVsFpTopic: Topic = {
  id: "oop-vs-fp",
  title: "OOP vs FP",
  description:
    "The ideological war between mutating objects with state, versus piping pure data through isolated mathematical functions.",
  tags: ["core", "architecture"],
  icon: "Binary",
  content: [
    <p key="1">
      For decades, <Highlight variant="info">Object-Oriented Programming (OOP)</Highlight> dominated the enterprise. You built a `Car` class with internal fuel state, and called `car.drive()`. But as apps got massive, tracking which object mutated the shared state became a nightmare. <Highlight variant="primary">Functional Programming (FP)</Highlight> emerged to ban internal state completely.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Philosophies
    </h3>,
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
