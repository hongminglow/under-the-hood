import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";

export const garbageCollectionTopic: Topic = {
	id: "garbage-collection",
	title: "Garbage Collection & Memory",
	description:
		"Why JS garbage collection freezes your app, how Go optimizes it, and why Rust completely destroyed the concept altogether.",
	tags: ["core", "javascript", "backend", "performance", "architecture"],
	icon: "Database",
	content: [
		<p key="1" className="mb-6">
			In primitive languages like C/C++, you must explicitly write manual instructions to allocate bytes in physical
			memory and strictly command the system to free them. If you forget, the program leaks memory endlessly. High-level
			languages introduced automated <Highlight variant="primary">Garbage Collection (GC)</Highlight> to solve this, but
			that automation comes with a brutal performance tax: "Stop-The-World" pauses.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Language Architecture Comparison
		</h3>,

		<p key="2a" className="mb-6">
			Not all Memory Management is created equal. The way your chosen backend language natively handles memory dictates
			your application's absolute performance ceiling.
		</p>,

		<Table
			key="3"
			headers={["Language", "Memory Model", "Performance Impact", "The Architecture"]}
			rows={[
				[
					"JavaScript (V8)",
					"Mark & Sweep GC",
					"High Latency Spikes",
					"Uses intense 'Stop-The-World' pauses. When GC runs, the entire single JS thread freezes. Unpredictable latency.",
				],
				[
					"Go (Golang)",
					"Concurrent Mark & Sweep",
					"Low Latency (<1ms)",
					"Go's GC runs simultaneously on background CPU threads alongside your code. It heavily prioritizes keeping pause times strictly under 1 millisecond.",
				],
				[
					"Rust",
					"Ownership & Borrowing (No GC)",
					"Zero Overhead",
					"There is absolutely no Garbage Collector. The Rust compiler mathematically calculates exactly when memory should be freed at compile time. Absolute maximum raw performance.",
				],
			]}
		/>,

		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			Why is JavaScript's GC "Bad"?
		</h3>,

		<p key="4a" className="mb-6">
			<strong>The Problem:</strong> JavaScript strictly runs on a single thread. When the V8 Engine needs to violently
			clean up memory to prevent a crash, it cannot easily do it in the background without risking unsafe data race
			conditions. Therefore, it mathematically forces your entire application to pause to execute the "Mark and Sweep"
			algorithm.
		</p>,

		<Flow
			key="5"
			steps={[
				{
					title: "1. V8 Executes JS",
					description: "Your code runs normally, rapidly allocating millions of temporary objects in the JS Heap.",
				},
				{
					title: "2. Stop The World",
					description:
						"Heap limit reached. JavaScript execution is physically paused. The Event Loop completely freezes.",
				},
				{
					title: "3. Mark & Sweep",
					description:
						"The engine walks the memory graph, marks alive objects, and explicitly deletes unreachable orphans.",
				},
				{
					title: "4. Resume Execution",
					description:
						"The main thread unlocks. If step 3 took 150ms, your app just helplessly dropped frames for 150ms.",
				},
			]}
		/>,

		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			Common Issues & Actionable Solutions
		</h3>,

		<Grid key="7" cols={1} gap={6} className="mb-8">
			<Card title="The Hot-Loop Allocation Spike">
				<p className="text-sm text-slate-300 mb-3">
					<strong className="text-red-400">The Problem:</strong> If you rapidly create millions of temporary objects
					inside a hot loop, like rendering a huge 3D canvas or chart, V8 is forced to trigger repeated GC pauses just
					to clean up the churn. That is when framerate suddenly falls apart.
				</p>
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">What to do instead</p>
				<ul className="text-sm text-slate-400 list-disc pl-5 space-y-2">
					<li>
						<strong className="text-emerald-300">Object Pooling:</strong> Pre-allocate reusable objects and update their
						properties instead of constantly creating and discarding brand new ones.
					</li>
					<li>
						<strong className="text-emerald-300">Mutating vs Spreading:</strong> In very hot paths, operations like
						<code>[...arr, newItem]</code> create brand new arrays every tick. Prefer direct mutation such as
						<code>arr.push()</code> when the local logic safely allows it.
					</li>
				</ul>
				<p className="mt-4 text-xs text-slate-500">
					Why it works: the less temporary allocation you generate per frame, the less often the runtime has to freeze
					and clean up after you.
				</p>
			</Card>

			<Card title="The Closure Memory Leak">
				<p className="text-sm text-slate-300 mb-3">
					<strong className="text-red-400">The Problem:</strong> If a closure keeps a reference to a huge array, that
					array stays alive. If an event listener captures that closure and the component unmounts without cleanup, the
					GC still cannot reclaim the memory.
				</p>
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">What to do instead</p>
				<CodeBlock
					title="Memory Leak Prevention"
					language="javascript"
					code={`useEffect(() => {
  const hugeData = new Array(10000).fill("Data");
  
  const handler = () => console.log(hugeData.length);
  window.addEventListener('resize', handler);

  // Solution: ALWAYS return a cleanup function to explicitly destroy the reference!
  return () => window.removeEventListener('resize', handler);
}, []);`}
				/>
				<p className="mt-4 text-xs text-slate-500">
					Why it works: once the listener is removed, the closure chain breaks and the large captured data becomes
					eligible for collection again.
				</p>
			</Card>
		</Grid>,

		<Callout key="8" type="warning" title="When to abandon JS entirely">
			If you are architecting a real-time multiplayer game server, a high-frequency trading bot, or a system where a
			random 100ms garbage collection pause will mathematically ruin your user's experience, you must abandon Node.js.
			Use <Highlight variant="primary">Go</Highlight> for fantastic concurrent latency, or{" "}
			<Highlight variant="primary">Rust</Highlight> for absolute bare-metal memory predictability.
		</Callout>,
	],
};
