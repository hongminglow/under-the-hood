import type { Topic } from "@/data/types";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";

export const promisesVsObservablesTopic: Topic = {
  id: "promises-vs-observables",
  title: "Promises vs Observables",
  description:
    "Handling single HTTP requests versus managing an infinite firehose of real-time WebSocket events.",
  tags: ["core", "javascript", "backend"],
  icon: "RefreshCw",
  content: [
    <p key="1">
      You need to fetch user data. A Promise is perfect. But what if you need to track the user's mouse coordinates 60 times a second, filter out the clicks, and debounce the data? A Promise physically cannot fire more than once. This is where Observables explicitly dominate.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-6">
      The Execution Lifecycle
    </h3>,
    <div key="3" className="mb-8">
      <Step index={1}>
        <strong>The Promise (One and Done)</strong>: You ask for data. 
        It executes immediately. It either Resolves or Rejects once. 
        It is fundamentally impossible to cancel a Promise natively once it starts.
      </Step>
      <Step index={2}>
        <strong>The Observable (The River)</strong>: You establish a pipe. 
        It waits lazily until someone subscribes. It can emit zero times, or a million times over five years.
      </Step>
      <Step index={3}>
        <strong>The Teardown</strong>: You can actively unsubscribe from an Observable, which cleanly terminates the HTTP request or WebSocket listener mid-flight without memory leaks.
      </Step>
    </div>,
    <CodeBlock 
      key="4"
      title="The RxJS Observable Pipe"
      language="typescript"
      code={`
import { fromEvent, debounceTime, map } from 'rxjs';

// Listen to an infinite stream of search box typing
const searchInput = document.getElementById('search');

const searchStream$ = fromEvent(searchInput, 'input').pipe(
  debounceTime(500), // Ignore spamming typing
  map(event => event.target.value) // Extract the text
);

// Start the stream
const sub = searchStream$.subscribe(text => api.fetch(text));

// You can cancel this entirely at any time!
sub.unsubscribe();
      `}
    />,
    <Callout key="5" type="danger" title="The Angular Penalty">
      While powerful, RxJS Observables have an extremely steep learning curve. The React community largely rejected them in favor of simple native Promises for basic tasks, but Angular baked Observables deeply into its core routing and HTTP engines.
    </Callout>,
  ],
};
