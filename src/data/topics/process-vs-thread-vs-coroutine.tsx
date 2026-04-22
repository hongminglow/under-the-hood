import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const processVsThreadTopic: Topic = {
	id: "process-vs-thread-vs-coroutine",
	title: "Process vs Thread vs Coroutine",
	description:
		"The OS-level fundamentals every backend developer must know: how work gets scheduled on CPU cores, and why Go chose goroutines.",
	tags: ["os", "concurrency", "interview", "cs"],
	icon: "Layers",
	content: [
		<p key="1">
			Every running program is a <strong>process</strong>. Within a process, you can spawn <strong>threads</strong> that
			share memory. Above threads, modern languages introduce <strong>coroutines</strong> (goroutines, async/await) —
			lightweight cooperative units that don't need OS-level context switches. Understanding all three is fundamental to
			system design and concurrency interviews.
		</p>,
		<Table
			key="2"
			headers={["Property", "Process", "Thread", "Coroutine"]}
			rows={[
				["Memory", "Isolated (own address space)", "Shared within process", "Shared (user-space stack)"],
				["Creation Cost", "Heavy (~10ms, MB of RAM)", "Medium (~1ms, ~1MB stack)", "Lightweight (~1µs, ~2KB stack)"],
				["Scheduling", "OS preemptive", "OS preemptive", "Cooperative (user-space scheduler)"],
				["Context Switch", "Expensive (full TLB flush)", "Cheaper (shared TLB)", "Near-zero (just swap stack pointer)"],
				[
					"Isolation",
					"Full — crash doesn't affect others",
					"Partial — one thread can crash entire process",
					"None — shares everything",
				],
				["Communication", "IPC (pipes, sockets, shared memory)", "Shared memory + locks", "Channels, async/await"],
				["Concurrency", "True parallelism", "True parallelism", "Concurrency (may not be parallel)"],
			]}
		/>,
		<Grid key="3" cols={3} gap={6} className="my-8">
			<Card title="Process">
				<p className="text-sm text-muted-foreground">
					<strong>Chrome tabs</strong>, <strong>Docker containers</strong>, and <strong>microservices</strong> each run
					as separate processes. Maximum isolation — one crashing process can't take down others. Communication requires
					IPC overhead.
				</p>
			</Card>
			<Card title="Thread">
				<p className="text-sm text-muted-foreground">
					<strong>Java, C++, Python</strong> use OS threads. They share heap memory but each has its own stack. Requires
					explicit <strong>locking</strong> (mutexes, semaphores) to prevent data races. Python's <strong>GIL</strong>{" "}
					limits threads to one core.
				</p>
			</Card>
			<Card title="Coroutine">
				<p className="text-sm text-muted-foreground">
					<strong>Go goroutines</strong>, <strong>Kotlin coroutines</strong>, <strong>JS async/await</strong>.
					Multiplexed onto a small pool of OS threads by a user-space scheduler. Go routinely runs{" "}
					<strong>millions</strong> of goroutines on 4 OS threads.
				</p>
			</Card>
		</Grid>,
		<Callout key="4" type="info" title="Why Go Chose Goroutines">
			A typical web server needs 10,000+ concurrent connections. Creating 10,000 OS threads ={" "}
			<strong>10GB of stack memory</strong>. Creating 10,000 goroutines = <strong>~20MB</strong>. Go's runtime schedules
			goroutines cooperatively across a small thread pool using an M:N scheduler, achieving massive concurrency with
			minimal overhead. This is why Go dominates cloud infrastructure.
		</Callout>,
		<Callout key="5" type="warning" title="The Interview Distinction">
			<strong>Concurrency ≠ Parallelism</strong>. Coroutines (and Node.js) are <em>concurrent</em> but may run on a{" "}
			<strong>single CPU core</strong> — interleaving tasks, not running simultaneously. True{" "}
			<strong>parallelism</strong> requires multiple CPU cores with OS threads or processes. Always clarify this in
			interviews.
		</Callout>,
	],
};
