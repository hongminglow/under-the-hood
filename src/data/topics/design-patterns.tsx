import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const designPatternsTopic: Topic = {
  id: "design-patterns",
  title: "Essential Design Patterns",
  description:
    "Time-tested, reusable solutions to recurring software design problems, from Singleton to Observer.",
  tags: ["architecture", "oop", "patterns"],
  icon: "Puzzle",
  content: [
    <p key="1">
      Design patterns are not copy-paste code snippets. They are{" "}
      <strong>vocabulary</strong> for communicating proven architectural
      solutions between engineers. The original 23 patterns were cataloged by
      the "Gang of Four" (GoF) in 1994 and remain foundational today.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Creational Patterns
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-8">
      <Card title="Singleton">
        <p className="text-sm mb-2">
          Guarantees only <strong>one instance</strong> of a class exists
          globally (e.g., a database connection pool or a logger).
        </p>
        <CodeBlock
          language="typescript"
          code={`class DB {
  private static instance: DB;
  private constructor() {}
  static getInstance() {
    if (!DB.instance) DB.instance = new DB();
    return DB.instance;
  }
}`}
        />
      </Card>
      <Card title="Factory">
        <p className="text-sm mb-2">
          Delegates object creation to a factory function/class, decoupling the
          caller from knowing the concrete class.
        </p>
        <CodeBlock
          language="typescript"
          code={`function createPayment(type: string) {
  if (type === "stripe") return new StripePayment();
  if (type === "paypal") return new PayPalPayment();
  throw new Error("Unknown type");
}`}
        />
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      Behavioral Patterns
    </h4>,
    <Grid key="5" cols={2} gap={6} className="mb-8">
      <Card title="Observer (Pub/Sub)">
        <p className="text-sm mb-2">
          Objects <strong>subscribe</strong> to events and get notified when the
          state changes. This is the backbone of reactive frameworks (React
          state, Vue refs, RxJS).
        </p>
        <CodeBlock
          language="typescript"
          code={`const listeners = new Set<Function>();
function subscribe(fn: Function) {
  listeners.add(fn);
}
function notify(data: any) {
  listeners.forEach(fn => fn(data));
}`}
        />
      </Card>
      <Card title="Strategy">
        <p className="text-sm mb-2">
          Defines a family of interchangeable algorithms and lets the client
          select one at runtime (e.g., different sorting or compression
          strategies).
        </p>
        <CodeBlock
          language="typescript"
          code={`interface Compressor {
  compress(data: Buffer): Buffer;
}
class GzipCompressor implements Compressor { ... }
class BrotliCompressor implements Compressor { ... }

function upload(data: Buffer, c: Compressor) {
  return send(c.compress(data));
}`}
        />
      </Card>
    </Grid>,
    <Callout key="6" type="info" title="Modern Relevance">
      You already use patterns daily without realizing it. React Hooks are a
      form of the <strong>Observer</strong> pattern. Express middleware is{" "}
      <strong>Chain of Responsibility</strong>. Redux reducers are{" "}
      <strong>Command</strong> pattern. Understanding the names helps you
      communicate architecture decisions clearly.
    </Callout>,
  ],
};
