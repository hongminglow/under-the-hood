import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const stateManagementTopic: Topic = {
  id: "state-management-patterns",
  title: "State Management Patterns",
  description:
    "Redux vs Context vs Zustand vs Signals — the endless frontend debate about where state should live and how it should flow.",
  tags: ["frontend", "react", "state", "debate"],
  icon: "SlidersHorizontal",
  content: [
    <p key="1">
      Every frontend app needs to answer:{" "}
      <strong>where does shared state live?</strong> Component state (
      <code>useState</code>) works for local UI. But when 5 components need the
      same data, prop drilling becomes a nightmare. The solution space has
      exploded — and the debate over which approach is "best" never ends.
    </p>,
    <Table
      key="2"
      headers={[
        "Library",
        "Pattern",
        "Bundle Size",
        "Learning Curve",
        "Best For",
      ]}
      rows={[
        [
          "useState/useReducer",
          "Local component state",
          "0kb (built-in)",
          "Low",
          "Simple component logic",
        ],
        [
          "React Context",
          "Provider/Consumer tree",
          "0kb (built-in)",
          "Low",
          "Theming, auth, infrequent updates",
        ],
        [
          "Redux Toolkit",
          "Single store, actions, reducers",
          "~11kb",
          "Medium",
          "Large apps, time-travel debugging",
        ],
        [
          "Zustand",
          "Hook-based store, no Provider",
          "~1kb",
          "Very Low",
          "Medium apps, simplicity-first",
        ],
        [
          "Jotai",
          "Atomic (bottom-up)",
          "~2kb",
          "Low",
          "Fine-grained reactivity, derived state",
        ],
        [
          "TanStack Query",
          "Server-state cache",
          "~12kb",
          "Medium",
          "API data fetching, caching, sync",
        ],
        [
          "Signals (Preact/Angular)",
          "Reactive primitives",
          "~1kb",
          "Low",
          "Fine-grained DOM updates",
        ],
      ]}
    />,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Client State vs Server State">
        <p className="text-sm">
          <strong>Client state</strong>: UI toggles, form inputs, modals.
          Managed by useState/Zustand/Redux. <strong>Server state</strong>: API
          data, cached responses. Managed by TanStack Query/SWR. Mixing them is
          the #1 architecture mistake in React apps.
        </p>
      </Card>
      <Card title="The Context Performance Trap">
        <p className="text-sm">
          React Context re-renders <strong>every consumer</strong> when the
          provider value changes — even if only one property changed. For
          frequently updating state (mouse position, timers), Context causes
          massive re-renders. Use libraries with{" "}
          <strong>selector-based subscriptions</strong> instead.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="tip" title="The Senior Answer">
      "Use <strong>useState</strong> for component state.{" "}
      <strong>TanStack Query</strong> for server state. If you still need shared
      client state, use <strong>Zustand</strong> for its simplicity. Only reach
      for Redux if you need middleware, time-travel debugging, or your team
      already knows it." This is the pragmatic 2025 answer.
    </Callout>,
  ],
};
