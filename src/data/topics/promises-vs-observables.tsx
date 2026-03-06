import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const promisesVsObservablesTopic: Topic = {
  id: "promises-vs-observables",
  title: "Promises vs Observables",
  description:
    "The async showdown: single-value Promises vs multi-value Observable streams — and why frameworks pick different sides.",
  tags: ["javascript", "rxjs", "async", "debate"],
  icon: "Repeat",
  content: [
    <p key="1">
      Both <strong>Promises</strong> and <strong>Observables</strong> handle
      asynchronous operations, but they are fundamentally different
      abstractions. A Promise represents a <strong>single future value</strong>.
      An Observable represents a <strong>stream of values over time</strong>.
      The choice between them is one of the most debated architectural decisions
      in frontend development.
    </p>,
    <Table
      key="2"
      headers={["Feature", "Promise", "Observable (RxJS)"]}
      rows={[
        ["Values", "Single value (resolve once)", "Multiple values over time"],
        [
          "Eagerness",
          "Eager — executes immediately on creation",
          "Lazy — executes only when subscribed",
        ],
        [
          "Cancellation",
          "Not natively cancellable",
          "Unsubscribe cancels the stream",
        ],
        [
          "Operators",
          "then/catch/finally only",
          "200+ operators (map, filter, debounce, switchMap...)",
        ],
        ["Retry", "Requires manual wrapper", "Built-in retry() operator"],
        [
          "Multicast",
          "Shares result by default",
          "Unicast by default; share() for multicast",
        ],
        [
          "Native?",
          "Built into the language (ES2015)",
          "Requires library (RxJS, ~30kb)",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="When to Use Promises">
        <p className="text-sm">
          Single HTTP requests, file reads, one-time async operations. When you
          need a value once and you're done. <code>fetch()</code>,{" "}
          <code>async/await</code> — the entire ecosystem speaks Promises
          natively.
        </p>
      </Card>
      <Card title="When to Use Observables">
        <p className="text-sm">
          WebSocket streams, user input (search-as-you-type with debounce),
          real-time data feeds, complex async coordination (race conditions,
          cancellation, retries). Angular chose Observables as its core async
          primitive for exactly these reasons.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="4"
      language="typescript"
      title="Search-As-You-Type: Observable Superiority"
      code={`import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// Observable: elegant, cancellable, debounced
fromEvent(searchInput, 'input').pipe(
  debounceTime(300),           // Wait 300ms after typing stops
  distinctUntilChanged(),      // Ignore if same query
  switchMap(e => fetch(url))   // Cancel previous request automatically
).subscribe(results => render(results));

// Promise equivalent: 15+ lines of manual debounce,
// AbortController management, and stale-closure bugs.`}
    />,
    <Callout key="5" type="info" title="The Framework War">
      <strong>Angular</strong> went all-in on Observables (RxJS) — HTTP client,
      forms, router all return Observables. <strong>React</strong> and{" "}
      <strong>Vue</strong> prefer Promises + their own reactivity systems
      (hooks, signals, refs). Neither is wrong — it's a tradeoff between{" "}
      <em>power</em> (Observables) and <em>simplicity</em> (Promises).
    </Callout>,
  ],
};
