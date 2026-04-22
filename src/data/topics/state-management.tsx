import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const stateManagementTopic: Topic = {
	id: "state-management",
	title: "State Management in React",
	description:
		"An architectural guide to solving Prop Drilling, preventing unnecessary React re-renders, and choosing the right global store.",
	tags: ["frontend", "architecture", "react", "state"],
	icon: "Database",
	content: [
		<p key="1" className="mb-6">
			As React applications scale, passing data down through 15 levels of components (known as{" "}
			<Highlight variant="warning">Prop Drilling</Highlight>) creates an unmaintainable architectural nightmare. State
			Management tools solve this by providing a unified "Global Store". However, choosing the wrong tool—or using
			Context incorrectly—can mathematically destroy your application's rendering performance.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Challenge: Rendering Performance
		</h3>,

		<p key="2a" className="mb-6">
			<strong>The Problem:</strong> Whenever a piece of React state updates, it forces an entire re-render sequence. If
			you store high-frequency data (like mouse coordinates or typing inputs) in a naive global store, your entire
			application will physically re-render on every keystroke.
			<br />
			<br />
			<strong>The Solution:</strong> You must choose a tool that allows for "atomic" or "fine-grained" reactivity,
			ensuring that only the specific components listening to the specific modified data are re-rendered.
		</p>,

		<h3 key="3" className="text-xl font-bold mt-8 mb-4">
			State Architecture Comparison
		</h3>,

		<Table
			key="4"
			headers={["Architecture", "How it Works", "Performance Risk", "Best Used For"]}
			rows={[
				[
					"React Context",
					"Built-in API that injects a value directly down the tree.",
					"High. Any state change forcefully re-renders ALL consuming components.",
					"Static configurations, Theme (Dark/Light), User Auth Session.",
				],
				[
					"Redux (Toolkit)",
					"A strict, single immutable store updated via dispatched Actions.",
					"Medium. Requires explicit useSelector hooks to avoid over-rendering.",
					"Massive enterprise apps needing strict state history / time-travel debugging.",
				],
				[
					"Zustand",
					"A lightweight, flexible hook-based external store.",
					"Low. Built-in atomic selectors ensure components only render when their exact slice changes.",
					"Most modern startups, dashboards, and complex UI states.",
				],
				[
					"React Query (TanStack)",
					"A specialized caching layer exclusively for Server Data.",
					"Low. Automatically batches updates and handles background fetching.",
					"HTTP API caching, pagination, caching database queries.",
				],
			]}
		/>,

		<h3 key="5" className="text-xl font-bold mt-8 mb-4">
			Deep Dive: Architecture Code Comparison
		</h3>,

		<Grid key="6" cols={2} gap={6} className="mb-8">
			<Card title="React Context (The Render Trap)">
				<p className="text-sm text-slate-300 mb-4">
					<strong>The Problem:</strong> Context lacks "selector" capabilities. If <code>user</code> updates, components
					only needing <code>theme</code> will wrongly re-render because they share the same provider.
				</p>
				<p className="text-sm font-semibold mb-2">Architectural Reality:</p>
				<CodeBlock
					title="ContextApp.jsx"
					language="javascript"
					code={`const AppContext = createContext();

function App() {
  const [data, setData] = useState({ user: 'John', theme: 'dark' });
  return (
    <AppContext.Provider value={data}>
      <Header /> 
      {/* Header re-renders even if only 'user' changes! */}
    </AppContext.Provider>
  );
}`}
				/>
			</Card>

			<Card title="Zustand (Atomic Reactivity)">
				<p className="text-sm text-slate-300 mb-4">
					<strong>The Solution:</strong> Zustand lives <em>outside</em> the React tree. Use a selector (
					<code>state.theme</code>) so the component physically ignores any updates to other unrelated state changes.
				</p>
				<p className="text-sm font-semibold mb-2">Architectural Solution:</p>
				<CodeBlock
					title="ZustandApp.jsx"
					language="javascript"
					code={`import { create } from 'zustand';

const useStore = create(() => ({ 
  user: 'John', theme: 'dark' 
}));

function Header() {
  // strictly subscribes ONLY to 'theme'
  const theme = useStore((state) => state.theme);
  
  return <div className={theme}>Header</div>;
}`}
				/>
			</Card>
		</Grid>,

		<Callout key="7" type="warning" title="Solution: Separate Server vs. Client State">
			The biggest mistake junior developers make is stuffing raw API data into Redux or Zustand.{" "}
			<Highlight variant="primary">Server State</Highlight> (users, posts) should be managed entirely by{" "}
			<strong>React Query (TanStack)</strong> which handles caching and loading states automatically. Your global store
			(Zustand/Context) should ONLY be used for <Highlight variant="primary">Client State</Highlight> (sidebar
			open/closed, dark mode, multi-step form progress).
		</Callout>,
	],
};
