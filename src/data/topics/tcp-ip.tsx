import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const tcpIpTopic: Topic = {
	id: "tcp-ip",
	title: "TCP 3-Way Handshake",
	description: "Why starting a database connection or API request takes time before data even starts moving.",
	tags: ["networking", "tcp", "latency", "backend"],
	icon: "Zap",
	content: [
		<p key="1">
			TCP (Transmission Control Protocol) is the <strong>Reliability Layer</strong> of the internet. It ensures that
			every byte of your API data arrives in order, without corruption, even if the underlying physical network is
			unreliable.
		</p>,
		<h3 key="2" className="text-xl font-bold mt-8 mb-4">
			The Protocol Hierarchy: OSI Context (7 Layers)
		</h3>,
		<p key="2a" className="mb-4">
			While the <strong>TCP/IP Model</strong> is what's used in practice (4 or 5 layers), the <strong>OSI Model</strong>{" "}
			(7 layers) is the standard reference for understanding how data moves through the stack.
		</p>,
		<Callout key="FunNote" type="info" title="Is there more? (Layer 8 & 9)">
			The OSI model stops at Layer 7, but engineers often joke about <strong>Layer 8 (The User)</strong> and{" "}
			<strong>Layer 9 (Politics/Organization)</strong> as the real bottlenecks in networking!
		</Callout>,
		<Table
			key="3"
			headers={["Layer", "Name", "Role in Your App"]}
			highlightedRows={[0, 3]}
			rows={[
				["Layer 7", "Application", "HTTP/REST, GraphQL, gRPC (The JSON data)."],
				["Layer 6", "Presentation", "Encoding, Encryption (SSL/TLS), Compression."],
				["Layer 5", "Session", "Session Management, Authentication, Reconnection."],
				["Layer 4", "Transport", '<strong>TCP</strong>, UDP (The "Ordering" logic, Port numbers).'],
				["Layer 3", "Network", "IP (Routing packets across routers)."],
				["Layer 2", "Data Link", "Ethernet/Wi-Fi (MAC addresses, local transfer)."],
				["Layer 1", "Physical", "Electrical signals, Fiber, Cables."],
			]}
		/>,
		<h3 key="3a" className="text-xl font-bold mt-8 mb-4">
			The Journey: Data Encapsulation
		</h3>,
		<p key="3b" className="mb-4 text-sm text-slate-300">
			When you call `fetch()`:
		</p>,
		<ul key="3c" className="list-decimal pl-5 text-sm text-slate-300 space-y-2 mb-8">
			<li>
				<strong>Data (Layer 7)</strong> is created (JSON).
			</li>
			<li>
				It's <strong>encrypted (Layer 6)</strong> and a session is managed (Layer 5).
			</li>
			<li>
				It's split into <strong>segments (Layer 4)</strong> where TCP adds sequence numbers.
			</li>
			<li>
				It's put into <strong>packets (Layer 3)</strong> with an IP address.
			</li>
			<li>
				It's wrapped in <strong>frames (Layer 2)</strong> for the Wi-Fi/Ethernet chip.
			</li>
			<li>
				It's pulsed out as <strong>bits (Layer 1)</strong> over the wire.
			</li>
		</ul>,
		<h3 key="4" className="text-xl font-bold mt-8 mb-4">
			The 3-Way Handshake (Latency Cost)
		</h3>,
		<p key="5" className="mb-4 text-sm text-muted-foreground">
			Every TCP connection starts with a "Hello" phase. This explains why first-time DB connections feel slow.
		</p>,
		<Grid key="6" cols={3} gap={4} className="my-8">
			<Card title="1. SYN">
				<p className="text-xs text-muted-foreground">Client → Server</p>
				<p className="text-xs italic mt-2 text-muted-foreground">"Is anyone there? Let's sync sequence numbers."</p>
			</Card>
			<Card title="2. SYN-ACK">
				<p className="text-xs text-muted-foreground">Server → Client</p>
				<p className="text-xs italic mt-2 text-muted-foreground">"I hear you. Synchronizing back. Acknowledged!"</p>
			</Card>
			<Card title="3. ACK">
				<p className="text-xs text-muted-foreground">Client → Server</p>
				<p className="text-xs italic mt-2 text-muted-foreground">"Copy that. I'm connected. Sending data now!"</p>
			</Card>
		</Grid>,
		<h3 key="7" className="text-xl font-bold mt-8 mb-4">
			Under the Hood: Flow & Congestion Control
		</h3>,
		<p key="8" className="mb-4">
			TCP isn't just about sending data; it's about <strong>protecting the network</strong>.
		</p>,
		<ul key="9" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
			<li>
				<strong>Sliding Window (Flow Control):</strong> The receiver tells the sender exactly how much data it can
				buffer. If the client is slow, the server physically slows down its transmission.
			</li>
			<li>
				<strong>Slow Start (Congestion Control):</strong> TCP starts by sending a tiny bit of data, then doubles the
				speed every successful trip. It "probes" the network until a packet is dropped, then immediately cuts its speed
				in half.
			</li>
		</ul>,
		<Callout key="10" type="warning" title="Head-of-Line (HoL) Blocking">
			In TCP, if Packet #2 is lost, Packets #3, #4, and #5 must wait in the buffer even if they arrive perfectly. This
			is "HoL Blocking." Modern <strong>HTTP/3 (QUIC/UDP)</strong> solves this by allowing streams to be independent, so
			one lost packet doesn't stall the entire connection.
		</Callout>,
	],
};
