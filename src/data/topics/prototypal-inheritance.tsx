import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const prototypalInheritanceTopic: Topic = {
  id: "prototypal-inheritance",
  title: "Prototypal Inheritance",
  description:
    "JavaScript's unique object system: no classes (under the hood), just objects linking to other objects via the prototype chain.",
  tags: ["javascript", "interview", "oop", "fundamentals"],
  icon: "GitBranch",
  content: [
    <p key="1">
      Prototypal Inheritance is JavaScript's implementation of <strong>Object Delegation</strong>. Unlike Classical inheritance (Java/C++), where classes are blueprints, JS objects are linked directly to other objects in a recursive hierarchy known as the <strong>Prototype Chain</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Prototype vs. __proto__
    </h3>,
    <p key="3" className="mb-4">
      The most common confusion is between <code>prototype</code> and <code>__proto__</code>.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="prototype">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>The Blueprint:</strong> Only exists on functions. It's the object that will become the <code>__proto__</code> of any instance created with <code>new</code>.
        </p>
      </Card>
      <Card title="__proto__">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>The Link:</strong> Exists on every object. It points to the object's parent in the chain. Modern JS recommends using <code>Object.getPrototypeOf()</code> instead.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="5"
      language="javascript"
      title="The Delegation Chain"
      code={`const animal = {
  speak() { return \`\${this.name} makes a sound\`; }
};

const dog = Object.create(animal); // dog.__proto__ === animal
dog.name = "Rex";
dog.bark = function() { return "Woof!"; };

dog.bark();  // → "Woof!" (found on dog)
dog.speak(); // → "Rex makes a sound" (found on animal via __proto__)`}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Zero-Prototype Objects
    </h3>,
    <p key="7" className="mb-4">
      Sometimes you want a "Pure" object with absolutely no built-in methods (like <code>toString</code> or <code>hasOwnProperty</code>). You can create one with <code>Object.create(null)</code>.
    </p>,
    <Callout key="8" type="tip" title="Why use Object.create(null)?">
      It's great for <strong>Hash Maps</strong> and performance-critical dictionaries. Because there's no prototype chain, the JS engine doesn't have to check for inherited properties, preventing accidental bugs with keys like "toString".
    </Callout>,
    <Callout key="9" type="warning" title="Classes Are Syntactic Sugar">
      ES6 <code>class</code> syntax is just a wrapper for prototypes. If you run <code>typeof MyClass</code>, it returns <code>"function"</code>. Under the hood, it's still manipulating <code>MyClass.prototype</code>.
    </Callout>,
  ],
};
