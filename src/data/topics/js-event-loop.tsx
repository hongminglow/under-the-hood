import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";

export const jsEventLoopTopic: Topic = {
	id: "js-event-loop",
	title: "JS Event Loop",
	description:
		"How JavaScript mechanically manages to process 10,000 concurrent network requests using only a single thread.",
	tags: ["core", "javascript", "backend", "architecture"],
	icon: "Cpu",
	content: [
		<p key="1" className="mb-6">
			<Highlight variant="primary">JavaScript is strictly single-threaded.</Highlight> It possesses only one Call Stack.
			If it executes a massive math calculation or blocks precisely to wait for a 500ms database query, the entire
			Node.js server mathematically drops dead for half a second. To prevent infinite blocking, Node relies on a secret
			mechanical weapon: The Event Loop.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Core Challenge: Thread Blocking
		</h3>,

		<p key="2a" className="mb-6">
			<strong>The Problem:</strong> When code runs synchronously, it fully occupies the JS engine. A single synchronous
			HTTP request would physically freeze all other 9,999 incoming user connections.
			<br />
			<br />
			<strong>The Solution:</strong> The engine must delegate the slow, heavy lifting (I/O, network requests, file
			reading) to background worker threads written in C++ (Libuv in Node.js, Web APIs in the Browser), and then safely
			route the answers back into the single JS thread.
		</p>,

		<h3 key="3" className="text-xl font-bold mt-12 mb-4">
			The Asynchronous State Flow
		</h3>,

		<Flow
			key="4"
			steps={[
				{
					title: "1. The Call Stack",
					description:
						"Executes Javascript functions line by line. When an async API is hit (like fetch), it delegates the work to workers and pops it off immediately.",
				},
				{
					title: "2. Web APIs / Libuv",
					description:
						"Secret background C++ workers that handle the actual heavy fetching, file reading, and timers completely outside of JavaScript.",
				},
				{
					title: "3. Task Queues",
					description:
						"Once background workers finish compiling the data, they push the callback responses into waiting queues.",
				},
				{
					title: "4. The Event Loop",
					description:
						"An infinite mechanical scanner. If the Call Stack is completely empty, it pushes the oldest item from the Task Queue onto the stack.",
				},
			]}
		/>,

		<h3 key="5" className="text-xl font-bold mt-8 mb-4">
			Microtasks vs. Macrotasks
		</h3>,

		<Table
			key="6"
			headers={["Queue Type", "What belongs here?", "Priority Level", "Execution Rule"]}
			rows={[
				[
					"Microtask Queue",
					"Promises (`.then`), `async`/`await`, `queueMicrotask`",
					"Highest Priority",
					"The Event Loop will utterly exhaust and execute EVERY Microtask entirely before moving on.",
				],
				[
					"Macrotask Queue",
					"`setTimeout`, `setInterval`, I/O Events",
					"Lower Priority",
					"The Event Loop executes exactly ONE Macrotask, and then immediately checks the Microtask queue again.",
				],
			]}
		/>,

		<h3 key="7" className="text-xl font-bold mt-8 mb-4">
			Common Issues & Actionable Solutions
		</h3>,

		<Grid key="8" cols={1} gap={6} className="mb-8">
			<Card title="The 'While(true)' Total Freeze">
				<p className="text-sm text-foreground mb-4">
					<strong>The Problem:</strong> Junior developers often write heavy CPU intensive code (calculating prime
					numbers, massive array sorting) inside a standard route handler. Because it is synchronous math, the Call
					Stack sits occupied indefinitely. The Event Loop physically cannot push finished network responses from the
					Queue up to the main thread. The server completely freezes and dies.
				</p>
				<p className="text-sm font-semibold mb-2">Architectural Solutions:</p>
				<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
					<li>
						<strong>Offload to Worker Threads:</strong> For Node.js, specifically spin up the{" "}
						<code>worker_threads</code> module to execute massive mathematical operations on entirely separate CPU
						cores.
					</li>
					<li>
						<strong>Yielding via Timers:</strong> If processing a massive 10,000-item array synchronously, break it down
						using <code>setImmediate()</code> or <code>setTimeout(..., 0)</code> chunks so the Event Loop has a physical
						opportunity to breathe and answer pending HTTP requests.
					</li>
				</ul>
			</Card>

			<Card title="The Promise Traps">
				<p className="text-sm text-foreground mb-4">
					<strong>The Problem:</strong> Assuming <code>setTimeout(() =&gt; console.log("A"), 0)</code> runs immediately
					instead of realizing it sits perfectly inside a lower-priority Macrotask Queue, causing bugs when state
					doesn't sync accurately with Promises.
				</p>
				<CodeBlock
					title="Interview Code Challenge"
					language="javascript"
					code={`console.log("1"); 
setTimeout(() => console.log("2"), 0); 
Promise.resolve().then(() => console.log("3")); 
console.log("4");

// Output: 1, 4, 3, 2`}
				/>
			</Card>
		</Grid>,

		<Callout key="9" type="warning" title="The Golden Rule: Never Block">
			Never, ever block the main thread. JavaScript is not designed for synchronous CPU-heavy algorithms. It is an I/O
			optimized coordinator. Write completely asynchronous non-blocking queries, properly await everything, and let the
			C++ background workers earn their salary.
		</Callout>,
	],
};
