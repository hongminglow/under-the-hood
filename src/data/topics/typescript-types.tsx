import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const typescriptTypeTopic: Topic = {
  id: "typescript-type-system",
  title: "TypeScript Type System Deep Dive",
  description:
    "Exploring structural typing, generics, mapped types, and conditional types that make TypeScript the industry standard.",
  tags: ["typescript", "language-design", "types"],
  icon: "FileType",
  content: [
    <p key="1">
      TypeScript doesn't use <em>nominal</em> typing (Java/C# style where class
      names must match). It uses <strong>Structural Typing</strong>: if an
      object has the required shape, it's compatible — regardless of its
      declared name. This is called "duck typing" at the type level.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Advanced Type Utilities
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Generics">
        <p className="text-sm mb-2">
          Parameterize types to create reusable, type-safe abstractions.
        </p>
        <CodeBlock
          language="typescript"
          code={`function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
// first([1,2,3]) → type is number
// first(["a","b"]) → type is string`}
        />
      </Card>
      <Card title="Conditional Types">
        <p className="text-sm mb-2">
          Types that resolve based on a condition, like a ternary for types.
        </p>
        <CodeBlock
          language="typescript"
          code={`type IsString<T> = T extends string
  ? "yes"
  : "no";

type A = IsString<"hello">; // "yes"
type B = IsString<42>;      // "no"`}
        />
      </Card>
      <Card title="Mapped Types">
        <p className="text-sm mb-2">
          Transform every property of a type systematically.
        </p>
        <CodeBlock
          language="typescript"
          code={`type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};`}
        />
      </Card>
      <Card title="Template Literal Types">
        <p className="text-sm mb-2">
          String manipulation at the type level — incredibly powerful for API
          safety.
        </p>
        <CodeBlock
          language="typescript"
          code={`type EventName<T extends string> =
  \`on\${Capitalize<T>}\`;

type E = EventName<"click">;
// type E = "onClick"`}
        />
      </Card>
    </Grid>,
    <Callout
      key="4"
      type="info"
      title="TypeScript's Type System is Turing Complete"
    >
      You can write a fully functioning calculator, a JSON parser, or even a
      regex engine purely within TypeScript's type system. This power comes from
      recursive conditional types and template literal types working together.
    </Callout>,
  ],
};
