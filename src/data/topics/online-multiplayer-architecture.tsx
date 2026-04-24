import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Globe, Joystick, Database, Clock3 } from "lucide-react";

export const onlineMultiplayerArchitectureTopic: Topic = {
	id: "online-multiplayer-architecture",
	title: "Online PvP: Network & Server Architecture",
	description:
		"How modern multiplayer games handle thousands of concurrent players. Dive into tick rates, UDP vs TCP, deterministic game loops, matchmaking services, and why game databases look entirely different from web databases.",
	tags: ["gaming", "networking", "real-time", "udp", "architecture", "matchmaking"],
	icon: "Gamepad2",
	content: [
		<p key="1">
			Building an online PvP (Player vs Player) game like <em>Valorant</em>, <em>League of Legends</em>, or{" "}
			<em>Call of Duty</em> is fundamentally different from building a web application. Standard web servers are
			entirely stateless and react to events when you ask them to. A game server is an always-running, mathematically
			precise simulation of a virtual world that must synchronize state across dozens of clients in less than 30
			milliseconds.
		</p>,

		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			HTTP Server vs. Dedicated Game Server
		</h3>,

		<Grid key="3" cols={2} gap={6}>
			<FeatureCard icon={Globe} title="Web / HTTP Server" subtitle="Stateless, Request/Response" theme="cyan">
				<ul className="list-disc pl-5 mt-2 text-sm text-cyan-100/75 space-y-1">
					<li>
						<strong>Protocol:</strong> TCP / HTTP (Reliable, ordered, slow connection handshakes)
					</li>
					<li>
						<strong>Lifespan:</strong> Only wakes up when a client makes a request.
					</li>
					<li>
						<strong>State:</strong> Stateless. Drops all memory of you after responding (relies on DB/cookies).
					</li>
					<li>
						<strong>Scale:</strong> Horizontally scalable. Put a Load Balancer in front of 100 identical clones.
					</li>
				</ul>
			</FeatureCard>
			<FeatureCard icon={Joystick} title="Dedicated Game Server" subtitle="Stateful, Continuous Simulation" theme="violet">
				<ul className="list-disc pl-5 mt-2 text-sm text-violet-100/75 space-y-1">
					<li>
						<strong>Protocol:</strong> Custom UDP (Unreliable, unordered, but blazingly fast)
					</li>
					<li>
						<strong>Lifespan:</strong> Runs an infinite `while(true)` loop (The Game Loop) regardless of player input.
					</li>
					<li>
						<strong>State:</strong> Highly stateful. Keeps the exact position/health of every entity in RAM.
					</li>
					<li>
						<strong>Scale:</strong> Strictly vertical per match. Client A and Client B *must* connect to the exact same
						physical server instance.
					</li>
				</ul>
			</FeatureCard>
		</Grid>,

		<Callout key="4" type="info" title="Why UDP instead of TCP?">
			If a packet containing your character's position is lost over TCP, the protocol temporarily stops all incoming
			traffic, demands a resend, and waits. In real-time PvP, old positional data is entirely useless. If we missed
			where you were at frame 10, we don't care anymore — we need frame 11! UDP blasts data constantly without waiting
			for acknowledgements, preventing the "Head-of-line blocking" delay found in TCP.
		</Callout>,

		<h3 key="5" className="text-xl font-bold mt-8 mb-4">
			The "Tick Rate" and the Game Loop
		</h3>,

		<p key="6">
			A dedicated server doesn't "react" to player input the moment it arrives. Instead, it collects all inputs in a
			buffer and processes them in discrete time steps called <strong>Ticks</strong>. If a server has a 64Hz Tick Rate
			(like CS:GO), the server computes the state of the world 64 times every second (~every 15.6ms).
		</p>,

		<Flow
			key="7"
			steps={[
				{
					title: "1. Read Inputs",
					description:
						"The server consumes the network buffer, reading all UDP packets sent by players (e.g., 'Player A pressed FIRE', 'Player B moved Forward') since the last tick.",
				},
				{
					title: "2. Simulate World Physics",
					description:
						"The server applies physics (gravity, collision detection) and executes game logic (did Player A's bullet intersect Player B's hitbox?).",
				},
				{
					title: "3. Broadcast State",
					description:
						"The server packages the exact new positions, health pools, and events of the world, and blasts this UDP snapshot back out to all connected clients.",
				},
			]}
		/>,

		<h3 key="8" className="text-xl font-bold mt-8 mb-4">
			How Players Connect: The Matchmaking Flow
		</h3>,

		<p key="9">
			When a million players hit "Find Match", they aren't talking to game servers yet. They are talking to standard web
			infrastructure. The orchestrator must find 10 compatible players, spin up a dedicated server for them, and hand
			them the IP address.
		</p>,

		<Flow
			key="10"
			steps={[
				{
					title: "Player Client -> Lobby Server (TCP/WebSockets)",
					description:
						"Players form a party. Their client maintains a persistent WebSocket connection with a standard stateless microservice (Lobby Service).",
				},
				{
					title: "Matchmaker Service (Redis/Open Match)",
					description:
						"Players enter the matchmaking queue. A massive Redis cluster holds the MMR (Matchmaking Rating), ping parameters, and queue times for all active users. A background worker constantly scans this pool to form mathematically fair lobbies.",
				},
				{
					title: "Fleet Allocation (Kubernetes / Agones)",
					description:
						"Once a 10-player match is formed, the matchmaker tells the orchestrator (like Google Agones running on Kubernetes) to 'claim' a resting game server instance in a data center geographically closest to the players.",
				},
				{
					title: "Connection Handshake",
					description:
						"The Matchmaker sends the specific IP address and UDP Port of the allocated game server back to the players' clients. The clients drop their lobby connection and establish a UDP stream directly to the game server.",
				},
			]}
		/>,

		<h3 key="11" className="text-xl font-bold mt-8 mb-4">
			Hiding Network Latency (The Big Lies)
		</h3>,

		<p key="12">
			It takes around 50ms for a packet to reach the server, and 50ms to get back. A 100ms round-trip feels sluggish and
			unplayable to humans. To fix this, game clients flat-out lie to you using two core concepts:
		</p>,

		<Table
			key="13"
			headers={["Technique", "How It Tricks You", "The 'Snapback' Consequence"]}
			rows={[
				[
					"Client-Side Prediction",
					"When you press 'Forward', the client doesn't wait for server permission. It moves the camera immediately. It predicts what the server will do and assumes it worked.",
					"If the server says 'No, you hit a wall', your screen violently stutters backwards to match the true server state (Rubberbanding).",
				],
				[
					"Server Reconciliation",
					"Since the client predicted ahead, by the time the server's update arrives, it's already old data. The client keeps a history of its predicted inputs, rewinds to the server's update, re-applies the history, and resolves the difference.",
					"Requires holding a complex circular buffer of past inputs in RAM. If prediction fails drastically, the client corrects it seamlessly.",
				],
				[
					"Lag Compensation",
					"When you shoot a moving target, the target has actually already moved on the server by the time your input arrives. The server rewinds its hitboxes to the exact millisecond you pulled the trigger to calculate the hit fairly.",
					"Results in 'getting shot around corners'. Because the server honored the delayed shot of an enemy, you die slightly after taking cover on your own screen.",
				],
			]}
		/>,

		<h3 key="14" className="text-xl font-bold mt-8 mb-4">
			Database Architecture: Why Games Don't Query SQL
		</h3>,

		<p key="15">
			In web apps, the DB is the source of truth for every request.{" "}
			<strong>In games, the server's RAM is the ONLY source of truth.</strong> Querying a database during a 16ms tick
			window is catastrophic. If the game waits on a database lock, the entire match stutters for all players.
		</p>,

		<Grid key="16" cols={2} gap={6}>
			<FeatureCard icon={Clock3} title="The 'Hot Path' (In-Memory)" subtitle="Zero IO allowed" theme="emerald">
				<p className="mt-2 text-sm text-emerald-100/75 leading-relaxed">
					Player movement, HP pooling, ammo count, and spells are never written to disk during a match. They live
					entirely in C++/C#/Rust memory structs on the Dedicated Server instance. This ensures single-digit nanosecond
					access times.
				</p>
			</FeatureCard>
			<FeatureCard icon={Database} title="The 'Cold Path' (Asynchronous)" subtitle="Account Persistence" theme="amber">
				<p className="mt-2 text-sm text-amber-100/75 leading-relaxed">
					At the very end of a match, the server serializes the final state (e.g., 'Player A got 10 kills, gained 20
					XP'). It drops this message into an asynchronous queue (like Kafka or RabbitMQ). A separate backend worker
					slowly writes this to a persistent database (PostgreSQL / DynamoDB).
				</p>
			</FeatureCard>
		</Grid>,

		<Callout key="17" type="warning" title="What happens when a game server crashes?">
			Because nothing is saved mid-match to the central DB, if the EC2 node hosting the match shuts down, the match
			completely evaporates. The players are kicked back to the lobby, and no one gains or loses MMR, because the RAM
			state is permanently gone.
		</Callout>,

		<h3 key="18" className="text-xl font-bold mt-8 mb-4">
			The Specs: What hardware runs these games?
		</h3>,

		<p key="19">
			Game servers prioritize <strong>Single-Threaded CPU Performance</strong> over all else. Cloud providers often
			struggle with this because their hardware is optimized for multi-tenant, multi-core virtualization.
		</p>,

		<ul key="20" className="list-disc pl-5 space-y-2 mb-8 text-sm text-slate-400">
			<li>
				<strong className="text-muted-foreground">High Clock Speeds (GHz):</strong> A single game match physics
				simulation cannot easily be parallelized across multiple cores. It runs on one main thread. A 4.0GHz core
				provides much smoother tick rates than two 2.5GHz cores.
			</li>
			<li>
				<strong className="text-muted-foreground">Bare Metal Servers:</strong> Because hypervisors (VMs) introduce
				minute jitter, highly competitive games (like CS2 and Valorant) run on bare metal hardware. Riot Games famously
				built their own massive global ISP network (Riot Direct) just to bypass traditional BGP routing and guarantee
				minimal pings to their bare-metal data centers.
			</li>
			<li>
				<strong className="text-muted-foreground">Memory:</strong> They use very little memory compared to enterprise
				servers. A 64-player Battle Royale server might only take ~200-400MB of RAM.
			</li>
		</ul>,
	],
};
