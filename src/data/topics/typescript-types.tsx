import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const typescriptTypesTopic: Topic = {
  id: "typescript-types",
  title: "TypeScript Type System",
  description:
    "Why Microsoft invented an incredibly strict structural type checker that completely vanishes before hitting the browser.",
  tags: ["core", "javascript", "architecture"],
  icon: "FileCode",
  content: [
    <p key="1">
      Native Vanilla Javascript allows you to pass a `string` into physical functions expecting an exact `number`. It causes catastrophic crashes directly in production servers. TypeScript mathematically solves this purely by wrapping JS in an absurdly strict enterprise-grade compile-time inference engine.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Structural Paradigm
    </h3>,
    <Table
      key="3"
      headers={["Concept", "The Traditional Rule", "The Typescript Way"]}
      rows={[
        [
          "Structural Typing",
          "If completely different classes `Bird` and `Plane` both have a `.fly()` function, Java throws a fatal type error expecting exactly `Plane`.",
          "TypeScript mathematically only cares about the physical shape. If it quacks like a duck, it is absolutely perfectly identical structurally. No class extensions strictly necessary."
        ],
        [
          "Type Erasure",
          "C# explicitly compiles all your strict interfaces down into massive native executable runtime object DLL checks.",
          "TypeScript completely surgically deletes all types during build time. The final compiled file is pure dynamically untyped raw Vanilla JS. Types exist cleanly entirely as a sophisticated developer linter."
        ],
        [
          "Union Narrowing",
          "Functions completely break apart checking `if (x instanceof User)` logic heavily everywhere.",
          "TypeScript intrinsically narrows branches. If variable is `string | number`, writing an `if (typeof x === 'string')` branch inherently forces the variable physically into a pure native string down safely."
        ]
      ]}
    />,
    <Callout key="4" type="danger" title="The 'any' Keyword Pandemic">
      Writing `const data: any = JSON.parse(res)` entirely disables the compiler. You forcefully command Typescript to ignore the object entirely, explicitly inviting runtime production crashes natively back into your architecture. Never bypass the engine blindly; use `unknown` and mathematically validate the physical shape directly before parsing.
    </Callout>,
  ],
};
