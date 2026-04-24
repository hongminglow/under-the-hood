import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";
import { Gauge, ShieldCheck } from "lucide-react";

export const tcpVsUdpTopic: Topic = {
	id: "tcp-vs-udp",
	title: "TCP vs UDP",
	description: "The fundamental difference between guaranteed delivery (TCP) and blazingly fast blasting (UDP).",
	tags: ["networking", "tcp", "udp"],
	icon: "Network",
	content: [
		<p key="1">
			At the Transport Layer (Layer 4), networking is a trade-off between <strong>Reliability</strong>&nbsp;and{" "}
			<strong>Speed</strong>. TCP ensures every byte arrives perfectly, while UDP prioritizes speed by stripping away
			almost all management overhead.
		</p>,
		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			Head-to-Head Comparison
		</h3>,
		<Table
			key="3"
			headers={[
				"Property",
				"<span class='text-cyan-300'>TCP (The Reliable Courier)</span>",
				"<span class='text-amber-300'>UDP (The Firehose)</span>",
			]}
			rows={[
				["Connection", "Connection-oriented (Handshake required).", "Connectionless (Just send it)."],
				[
					"Reliability",
					"Guaranteed delivery. Retransmits lost data.",
					"No guarantee. Packets may arrive out of order or not at all.",
				],
				["Speed", "Slower due to overhead and acknowledgments.", "Blazing fast. Zero overhead."],
				["Header Size", "Large (20-60 bytes).", "Tiny (8 bytes)."],
				["Flow Control", "Yes. Prevents overwhelming the receiver.", "No. Blasts data as fast as possible."],
				["Ordering", "Packets arrive in order via sequence numbers.", "No ordering guarantees. App must handle."],
				["Congestion Control", "Built-in (Slow Start, Congestion Avoidance).", "None. Can flood the network."],
				["Use Cases", "HTTP, SSH, Email, File Transfer", "DNS, VoIP, Gaming, Live Streaming"],
			]}
		/>,

		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			The TCP Three-Way Handshake: The Hidden Latency Tax
		</h3>,
		<p key="5" className="mb-4">
			Before TCP can send a single byte of application data, it must complete a <strong>three-way handshake</strong>.
			This adds <Highlight variant="warning">1 full Round-Trip Time (RTT)</Highlight>&nbsp;to every new connection.
		</p>,
		<Flow
			key="6"
			steps={[
				{ title: "1. SYN", description: "Client sends SYN packet to server" },
				{ title: "2. SYN-ACK", description: "Server responds with SYN-ACK" },
				{ title: "3. ACK", description: "Client sends ACK back" },
				{ title: "4. Data Transfer", description: "Application data finally flows" },
			]}
		/>,
		<Callout key="7" type="warning" title="Real-World Impact">
			On a 100ms RTT connection, the handshake alone costs <strong>100ms</strong>&nbsp;before any data moves. For
			microservices making hundreds of requests per second, this compounds into seconds of wasted time. This is why{" "}
			<strong>connection pooling</strong>&nbsp;and <strong>HTTP keep-alive</strong>&nbsp;are critical optimizations.
		</Callout>,

		<h3 key="8" className="text-xl font-bold mt-8 mb-4">
			The Error Correction Divide
		</h3>,
		<Grid key="9" cols={2} gap={6} className="my-8">
			<FeatureCard icon={ShieldCheck} title="The TCP Wait State" subtitle="reliability blocks until repaired" theme="cyan">
				<p className="text-sm text-cyan-100/75 mb-2">
					TCP uses <strong className="text-cyan-300">Automatic Repeat Request (ARQ)</strong>.
				</p>
				<p className="text-sm text-cyan-100/75">
					If Packet #2 is missing, TCP stops the entire stream until the sender retransmits #2. This causes
					"Micro-stuttering" in real-time apps.
				</p>
			</FeatureCard>
			<FeatureCard icon={Gauge} title="The UDP Forgive State" subtitle="freshness beats repair" theme="amber">
				<p className="text-sm text-amber-100/75 mb-2">
					UDP lets the <strong className="text-amber-300">Application</strong>&nbsp;handle errors.
				</p>
				<p className="text-sm text-amber-100/75">
					If a video packet is lost, the player just shows a glitchy pixel for 1/60th of a second and moves on.
					Performance is preserved.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="10" className="text-xl font-bold mt-8 mb-4">
			Head-of-Line Blocking: TCP's Achilles Heel
		</h3>,
		<p key="11" className="mb-4">
			TCP's reliability guarantee creates a critical bottleneck called <strong>Head-of-Line (HOL) Blocking</strong>.
			Because TCP guarantees in-order delivery, a single lost packet blocks <em>all subsequent packets</em>&nbsp;from
			being processed, even if they've already arrived.
		</p>,
		<CodeBlock
			key="12"
			title="HOL Blocking Scenario"
			language="text"
			code={`Timeline:
t=0ms:  Packets 1, 2, 3, 4, 5 sent
t=50ms: Packets 1, 3, 4, 5 arrive (Packet 2 lost)
t=50ms: Application receives Packet 1
t=50ms: Packets 3, 4, 5 sit in TCP buffer, blocked
t=150ms: Packet 2 retransmitted and arrives
t=150ms: Application finally receives 2, 3, 4, 5

Result: 100ms delay for packets that were already there.`}
		/>,
		<p key="13" className="mb-4">
			This is devastating for multiplayer games. Imagine your character's position update (Packet 3) being delayed
			because an unrelated chat message (Packet 2) was lost. UDP avoids this entirely by letting the application decide
			what to do with out-of-order data.
		</p>,

		<h3 key="14" className="text-xl font-bold mt-8 mb-4">
			TCP Congestion Control: The Self-Throttling Algorithm
		</h3>,
		<p key="15" className="mb-4">
			TCP includes sophisticated congestion control algorithms (<strong>Slow Start</strong>,{" "}
			<strong>Congestion Avoidance</strong>, <strong>Fast Retransmit</strong>) that automatically reduce transmission
			speed when packet loss is detected. This prevents network collapse but can be overly conservative.
		</p>,
		<Grid key="16" cols={2} gap={6} className="my-8">
			<FeatureCard icon={ShieldCheck} title="TCP Slow Start" subtitle="polite ramp-up" theme="cyan">
				<p className="text-sm text-cyan-100/75 mb-2">
					TCP starts by sending just <strong className="text-cyan-300">1-10 packets</strong>, then doubles the window size every RTT until loss
					occurs.
				</p>
				<p className="text-sm text-cyan-100/75">
					On high-bandwidth networks, this means it takes several RTTs to "ramp up" to full speed. For short-lived
					connections (like API requests), you never reach full throughput.
				</p>
			</FeatureCard>
			<FeatureCard icon={Gauge} title="UDP: No Brakes" subtitle="speed with responsibility pushed upward" theme="amber">
				<p className="text-sm text-amber-100/75 mb-2">
					UDP has <strong className="text-amber-300">zero congestion control</strong>. It will happily flood the network at line rate.
				</p>
				<p className="text-sm text-amber-100/75">
					This is why protocols like QUIC and WebRTC implement their own congestion control on top of UDP. Raw UDP can
					be a "bad network citizen" if misused.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="17" className="text-xl font-bold mt-8 mb-4">
			Real-World War Stories
		</h3>,
		<Card key="18" title="Story 1: Netflix's UDP Migration">
			<p className="text-sm text-muted-foreground mb-2">
				Netflix experimented with UDP for video streaming to reduce buffering. The result?{" "}
				<strong>30% reduction in rebuffering events</strong>&nbsp;on lossy networks. By implementing custom Forward
				Error Correction (FEC) on top of UDP, they could recover from packet loss without waiting for retransmissions.
			</p>
		</Card>,
		<Card key="19" title="Story 2: The DNS UDP Limit">
			<p className="text-sm text-muted-foreground mb-2">
				DNS uses UDP for speed, but UDP packets are limited to <strong>512 bytes</strong>&nbsp;(originally) to avoid
				fragmentation. When DNSSEC responses grew larger, DNS had to fall back to TCP, adding 100ms+ latency. The
				solution? <strong>EDNS0</strong>&nbsp;extended UDP to 4096 bytes, and modern resolvers use TCP only as a last
				resort.
			</p>
		</Card>,
		<Card key="20" title="Story 3: Gaming's 'Lag Compensation'">
			<p className="text-sm text-muted-foreground mb-2">
				Call of Duty and Fortnite use UDP for player movement but implement <strong>client-side prediction</strong>
				&nbsp;and <strong>server reconciliation</strong>. If a UDP packet is lost, the client predicts where you'll be,
				and the server corrects it later. This creates the illusion of smooth gameplay even with 5-10% packet loss.
			</p>
		</Card>,

		<h3 key="21" className="text-xl font-bold mt-8 mb-4">
			The Game Changer: HTTP/3 (QUIC)
		</h3>,
		<p key="22" className="mb-4">
			For decades, the web (HTTP) relied on TCP. But TCP's 3-way handshake and head-of-line blocking became the
			bottleneck for modern low-latency apps. <strong>HTTP/3 uses QUIC</strong>, which runs on top of{" "}
			<strong>UDP</strong>, but re-implements reliability and encryption in userspace. It gets the speed of UDP with the
			safety of TCP.
		</p>,
		<Table
			key="23"
			headers={[
				"Feature",
				"<span class='text-cyan-300'>TCP (HTTP/2)</span>",
				"<span class='text-amber-300'>QUIC (HTTP/3 over UDP)</span>",
			]}
			rows={[
				["Handshake", "3-way (1 RTT) + TLS (1-2 RTT) = 2-3 RTT", "0-RTT or 1-RTT combined"],
				["HOL Blocking", "Yes (single stream blocks all)", "No (independent streams)"],
				["Connection Migration", "No (IP change = reconnect)", "Yes (connection ID survives IP change)"],
				["Encryption", "Optional (TLS on top)", "Mandatory (built-in)"],
			]}
		/>,
		<Callout key="24" type="success" title="QUIC's Killer Feature">
			<strong>0-RTT Resumption</strong>: If you've connected to a server before, QUIC can send application data in the{" "}
			<em>very first packet</em>, with no handshake. This is impossible with TCP+TLS.
		</Callout>,

		<h3 key="25" className="text-xl font-bold mt-8 mb-4">
			Practical Implementation Tips
		</h3>,
		<Grid key="26" cols={2} gap={6} className="my-8">
			<FeatureCard icon={ShieldCheck} title="When to Choose TCP" subtitle="completeness matters" theme="cyan">
				<ul className="text-sm text-cyan-100/75 space-y-2 list-disc pl-4">
					<li>File transfers (FTP, SFTP)</li>
					<li>Database queries (PostgreSQL, MySQL)</li>
					<li>RESTful APIs (HTTP/1.1, HTTP/2)</li>
					<li>Email (SMTP, IMAP)</li>
					<li>SSH remote shells</li>
				</ul>
				<p className="text-sm text-cyan-100/75 mt-4">
					Rule: If <strong className="text-cyan-300">every byte matters</strong>&nbsp;and latency is acceptable, use TCP.
				</p>
			</FeatureCard>
			<FeatureCard icon={Gauge} title="When to Choose UDP" subtitle="freshness matters" theme="amber">
				<ul className="text-sm text-amber-100/75 space-y-2 list-disc pl-4">
					<li>VoIP (Zoom, Discord voice)</li>
					<li>Live video streaming (Twitch, WebRTC)</li>
					<li>Online gaming (player positions)</li>
					<li>DNS lookups</li>
					<li>IoT sensor data (temperature, GPS)</li>
				</ul>
				<p className="text-sm text-amber-100/75 mt-4">
					Rule: If <strong className="text-amber-300">freshness &gt; completeness</strong>&nbsp;and you can tolerate loss, use UDP.
				</p>
			</FeatureCard>
		</Grid>,

		<h3 key="27" className="text-xl font-bold mt-8 mb-4">
			Code Example: Detecting Protocol in Node.js
		</h3>,
		<CodeBlock
			key="28"
			title="server.js"
			language="javascript"
			code={`const net = require('net');
const dgram = require('dgram');

// TCP Server
const tcpServer = net.createServer((socket) => {
  console.log('TCP client connected');
  socket.on('data', (data) => {
    console.log('TCP received:', data.toString());
    socket.write('ACK'); // Guaranteed delivery
  });
});
tcpServer.listen(8080);

// UDP Server
const udpServer = dgram.createSocket('udp4');
udpServer.on('message', (msg, rinfo) => {
  console.log(\`UDP received from \${rinfo.address}:\${rinfo.port}\`);
  // No acknowledgment sent - fire and forget
});
udpServer.bind(8081);`}
		/>,

		<h3 key="29" className="text-xl font-bold mt-8 mb-4">
			Performance Benchmarks
		</h3>,
		<Table
			key="30"
			headers={[
				"Metric",
				"<span class='text-cyan-300'>TCP</span>",
				"<span class='text-amber-300'>UDP</span>",
				"<span class='text-teal-300'>QUIC</span>",
			]}
			rows={[
				["Connection Setup", "50-150ms (3-way + TLS)", "0ms (connectionless)", "0-50ms (0-RTT or 1-RTT)"],
				["Throughput (1Gbps link)", "~850 Mbps (overhead)", "~980 Mbps (minimal overhead)", "~900 Mbps"],
				["Latency (per packet)", "+5-20ms (ACKs)", "<1ms", "+2-10ms"],
				["Packet Loss Recovery", "100-300ms (retransmit)", "N/A (app handles)", "50-150ms (selective retransmit)"],
			]}
		/>,

		<Callout key="31" type="tip" title="When to use UDP?">
			If your data is "Temporal" (meaning it's useless if it's 2 seconds late), use <strong>UDP</strong>. Examples:
			VoIP, Live Video Streaming (WebRTC), and Multiplayer Gaming (Player coordinates). If your data is "Persistent"
			(SQL results, JSON, Files), use <strong>TCP</strong>.
		</Callout>,

		<h3 key="32" className="text-xl font-bold mt-8 mb-4">
			The Hybrid Approach: Reliable UDP
		</h3>,
		<p key="33" className="mb-4">
			Many modern protocols implement <strong>selective reliability</strong>&nbsp;on top of UDP. Instead of
			retransmitting everything (TCP) or nothing (raw UDP), they retransmit only critical packets.
		</p>,
		<Card key="34" title="Example: WebRTC Data Channels">
			<p className="text-sm text-muted-foreground mb-2">WebRTC lets you configure per-channel reliability:</p>
			<ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
				<li>
					<strong>Reliable ordered</strong>: Chat messages (TCP-like)
				</li>
				<li>
					<strong>Unreliable unordered</strong>: Mouse positions (raw UDP)
				</li>
				<li>
					<strong>Reliable unordered</strong>: File chunks (no HOL blocking)
				</li>
			</ul>
		</Card>,

		<Callout key="35" type="info" title="The Future">
			The industry is converging on <strong>UDP + custom reliability</strong>. QUIC, WebRTC, and even game engines like
			Unreal Engine 5's replication system all follow this pattern. TCP's one-size-fits-all approach is being replaced
			by application-specific protocols that use UDP as a fast, flexible foundation.
		</Callout>,
	],
};
