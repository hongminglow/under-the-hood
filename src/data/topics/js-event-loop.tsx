import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";

export const eventLoopTopic: Topic = {
  id: "js-event-loop",
  title: "JavaScript Event Loop",
  description:
    "How a single-threaded language handles massive concurrency using the Call Stack, Web APIs, and Task Queues.",
  tags: ["javascript", "concurrency", "engine"],
  icon: "RotateCcw",
  content: [
    <p key="1">
      JavaScript is single-threaded. It has exactly one Call Stack and executes
      one instruction at a time. So how can a Node.js server handle 10,000
      concurrent network requests without freezing? The answer is asynchronous
      concurrency managed by the <strong>Event Loop</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="The Call Stack">
        The V8 engine's execution context. Functions are pushed on top and
        popped off when they return. If a function takes 5 seconds to compute,
        it "blocks the main thread."
      </Card>
      <Card title="Web / Node APIs">
        C++ background threads provided by the browser (or Node's libuv). This
        is where <code>setTimeout</code>, <code>fetch</code>, and database I/O
        actually happen concurrently.
      </Card>
      <Card title="Microtask Queue">
        The VIP line. Promises (<code>.then()</code>, <code>await</code>) and{" "}
        <code>queueMicrotask</code> queue their callbacks here. High priority.
      </Card>
      <Card title="Macrotask Queue">
        The regular line. <code>setTimeout</code>, <code>setInterval</code>, and
        DOM events queue their callbacks here.
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mb-4">
      The Loop Algorithm
    </h4>,
    <ol
      key="4"
      className="list-decimal pl-6 space-y-2 mb-8 text-muted-foreground/90 font-medium"
    >
      <li>
        Execute the synchronous code currently on the Call Stack until it is
        empty.
      </li>
      <li>
        If the Call Stack is empty, process <strong>ALL</strong> tasks in the{" "}
        <strong>Microtask Queue</strong> until it is entirely empty.
      </li>
      <li>(Browser only) Render any UI updates to the screen.</li>
      <li>
        If the Call Stack remains empty, take exactly <strong>ONE</strong> task
        from the <strong>Macrotask Queue</strong> and push it onto the Call
        Stack.
      </li>
      <li>Repeat infinitely.</li>
    </ol>,
    <Callout key="5" type="warning" title="Event Loop Starvation">
      If a Microtask recursively queues another Microtask (e.g., an infinite
      Promise loop), the engine will never proceed to rendering the DOM or
      executing Macrotasks. The browser tab will freeze!
    </Callout>,
  ],
};
