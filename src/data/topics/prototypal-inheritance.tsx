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
      Unlike Java or C++ where objects are instances of <em>classes</em>,
      JavaScript objects inherit directly from <strong>other objects</strong>{" "}
      via the <strong>prototype chain</strong>. When you access a property on an
      object, JavaScript looks at the object first, then walks up the prototype
      chain until it finds the property or reaches <code>null</code>.
    </p>,
    <CodeBlock
      key="2"
      language="javascript"
      title="The Prototype Chain"
      code={`const animal = {
  speak() { return \`\${this.name} makes a sound\`; }
};

const dog = Object.create(animal); // dog.__proto__ === animal
dog.name = "Rex";
dog.bark = function() { return "Woof!"; };

dog.bark();  // → "Woof!"        (found on dog itself)
dog.speak(); // → "Rex makes a sound" (found on animal via __proto__)
dog.toString(); // found on Object.prototype (top of chain)

// Chain: dog → animal → Object.prototype → null`}
    />,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Classes Are Syntactic Sugar
    </h4>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="ES6 class (Sugar)">
        <CodeBlock
          language="javascript"
          title="What You Write"
          code={`class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() { return "Woof!"; }
}`}
        />
      </Card>
      <Card title="What JS Actually Does">
        <CodeBlock
          language="javascript"
          title="Under the Hood"
          code={`function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(
  Animal.prototype
);
Dog.prototype.bark = function() {
  return "Woof!";
};`}
        />
      </Card>
    </Grid>,
    <Callout key="5" type="info" title="The Interview Distinction">
      <strong>Classical inheritance</strong> (Java): objects are instances of
      classes; classes extend other classes.{" "}
      <strong>Prototypal inheritance</strong> (JS): objects delegate to other
      objects via <code>[[Prototype]]</code> links. ES6 <code>class</code>{" "}
      syntax looks classical but{" "}
      <strong>it's still prototypes underneath</strong>. This distinction is
      tested in every senior JS interview.
    </Callout>,
    <Callout key="6" type="warning" title="Performance Pitfall">
      Adding methods directly to instances (<code>this.bark = function...</code>
      ) creates a <strong>new function per instance</strong>. Adding them to the
      prototype (<code>Dog.prototype.bark</code>) shares{" "}
      <strong>one function across all instances</strong>. With 10,000 instances,
      that's 10,000 vs 1 function in memory.
    </Callout>,
  ],
};
