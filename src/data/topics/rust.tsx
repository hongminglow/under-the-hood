import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const rustTopic: Topic = {
  id: "rust",
  title: "Why Rust is Eating the World",
  description:
    "How the Borrow Checker revolutionized systems programming without a slow Garbage Collector.",
  tags: ["architecture", "rust", "performance"],
  icon: "Cpu",
  content: [
    <p key="1">
      For 40 years, C/C++ dominated the world's fastest systems (browsers, game engines, OS kernels). But they allowed developers to make massive memory mistakes, leading to catastrophic security crashes (like Segfaults and buffer overflows). 
    </p>,
    <p key="2" className="mt-4">
      Javascript, Python, and Java solved this by inventing the <strong>Garbage Collector (GC)</strong>—a background robot that safely sweeps up unused memory. The GC made programming safe, but it makes apps inherently slow and bloated.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Rust Innovation: The Borrow Checker
    </h3>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Zero-Cost Safety">
        <p className="text-sm text-muted-foreground">
          Rust achieves the blazing physical speeds of C/C++ combined with the memory safety of Javascript/Java, completely without a Garbage Collector. 
        </p>
      </Card>
      <Card title="The Compiler as a Teacher">
        <p className="text-sm text-muted-foreground">
          Rust refuses to compile your code if you write a memory bug or a race condition. It enforces strict "Ownership" rules: exactly one variable can own a piece of memory at a time. If another function needs it, it must physically "borrow" it.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Extreme Learning Curve">
      Web developers trying Rust often hit the "Wall". You cannot randomly pass objects around like in JavaScript. The compiler violently rejects bad architectural designs, forcing you to formally rethink exactly where and when memory is allocated before writing a single line of business logic.
    </Callout>,
  ],
};
