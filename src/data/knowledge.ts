export interface Topic {
	id: string;
	title: string;
	description: string;
	tags: string[];
	icon: string; // Specific icon for the topic
	content: string;
}

export interface Section {
	id: string;
	title: string;
	icon: string;
	topics: Topic[];
}

export const knowledgeBase: Section[] = [
	{
		id: "networking",
		title: "Networking",
		icon: "Network",
		topics: [
			{
				id: "tcp-ip",
				title: "TCP 3-Way Handshake",
				description: "The core synchronization mechanism for establishing full-duplex transmission control.",
				tags: ["tcp", "protocols", "low-level"],
				icon: "Zap",
				content: `
The **TCP three-way handshake** is the fundamental process for setting up a connection. It's essentially a protocol for synchronizing sequence numbers and ensuring reliability before data flows.

<Card title="Handshake Mechanism" description="SYN -> SYN-ACK -> ACK">
This 3-step sequence prevents stale connection attempts from confusing the server and allows both sides to agree on their **Initial Sequence Numbers (ISN)**.
</Card>

#### Implementation Steps
Modern network stacks perform this synchronization in the kernel before your application ever sees the connection.

<Step index={1}>
**Client -> Server (SYN):** The client picks a random ISN and sends a packet with the SYN flag set.
</Step>

<Step index={2}>
**Server -> Client (SYN-ACK):** The server increments the client's ISN, chooses its own ISN, and sends back a packet with both SYN and ACK flags.
</Step>

<Step index={3}>
**Client -> Server (ACK):** The client increments the server's ISN and sends a final ACK. The socket state now transitions to <Highlight variant="primary">ESTABLISHED</Highlight>.
</Step>

<Callout type="tip" title="Sequence Entropy">
Operating systems shift ISNs over time using cryptographic salts to protect against sequence prediction (TCP injection) attacks.
</Callout>

<Table
  headers={["Flag", "Full Name", "Description"]}
  rows={[
    ["SYN", "Synchronize", "Initiates connection & synchronizes sequence numbers."],
    ["ACK", "Acknowledgment", "Confirms receipt of a packet and sequence number."],
    ["FIN", "Finish", "Request to gracefully terminate the connection."],
    ["RST", "Reset", "Aborts the connection due to errors or port unavailability."]
  ]}
/>

<CodeBlock
  title="Packet Flag Inspection (tcpdump)"
  language="bash"
  code="
  # SYN
  IP 192.168.1.10.1234 > 192.168.1.20.80: Flags [S], seq 1234567
  # SYN-ACK
  IP 192.168.1.20.80 > 192.168.1.10.1234: Flags [S.], seq 9876543, ack 1234568
  # ACK
  IP 192.168.1.10.1234 > 192.168.1.20.80: Flags [.], ack 9876544
  "
/>
`,
			},
			{
				id: "dns",
				title: "Recursive Resolution",
				description: "Tracing the distributed hierarchy of domain names across root and TLD servers.",
				tags: ["dns", "infrastructure", "internet"],
				icon: "Search",
				content: `
DNS resolution is a lookup chain. When you type \`google.com\`, the browser triggers a recursive lookup that traverses several layers of authority.

<Callout type="info">Note: Browsers and operating systems cache these results at every layer to minimize latency.</Callout>

<CodeBlock
  title="DNS Resolution Chain"
  language="text"
  code="
  User -> Recursive Resolver
  Resolver -> Root Servers (.) -> TLD (.com) -> Authoritative (google.com)
  "
/>
`,
			},
			{
				id: "nat-addressing",
				title: "IP Addressing & NAT",
				description:
					"The separation of global public reachability from local private isolation via Network Address Translation.",
				tags: ["networking", "nat", "ip-addressing"],
				icon: "Network",
				content: `
The internet is divided into two distinct addressing spaces: **Public** and **Private**. The bridge between them is a mechanism called **NAT (Network Address Translation)**.

<Grid cols={2} gap={6}>
  <Card title="Public IP" description="The Global Identity">
    - Globally unique and routable.
    - Assigned by ISPs from IANA pools.
    - Directly reachable from any point on the internet.
  </Card>
  <Card title="Private IP" description="The Local Identity">
    - Used within local networks (Home, Office).
    - Can be reused across different networks globally.
    - Defined by <Highlight variant="warning">RFC 1918</Highlight> ranges.
  </Card>
</Grid>

#### Behind the Scenes: NAT Flow
Your router acts as a translator. When you send a message, it replaces your "Internal" identity with its "External" one.

<Step index={1}>
**Outbound Mapping:** A device (192.168.1.5:54321) requests a website. The router replaces the source with its Public IP (203.0.113.1) and a unique source port (e.g., 60001).
</Step>

<Step index={2}>
**Translation Table:** The router stores this mapping: <CodeBlock language="text" code="Out: 203.0.113.1:60001 <-> In: 192.168.1.5:54321" />
</Step>

<Step index={3}>
**Inbound Routing:** When the server responds to the Public IP/Port, the router reverses the lookup and delivers the packet to the correct internal device.
</Step>

<Callout type="tip" title="Rate Limiting & NAT">
When a server implements rate limiting, it typically sees your **External IP**. This is why a whole office building might get "Too Many Requests" errors if many people hit the same API—they all share one external identity!
</Callout>

#### Protocol Identification
Servers and proxies distinguish between these IPs using specific boundary logic.

<Table
  headers={["Context", "Header/Value", "Detection Method"]}
  rows={[
    ["Public Traffic", "X-Forwarded-For", "Proxies append the client's external IP to this header."],
    ["Private Range", "10.0.0.0/8", "RFC 1918 reserved space for internal-only routing."],
    ["Secure Edge", "X-Real-IP", "Used by Load Balancers to pass the actual connecting IP."]
  ]}
/>
`,
			},
			{
				id: "web-request-lifecycle",
				title: "Web Request Lifecycle",
				description:
					"The end-to-end journey of a web request: from URL parsing to routing, TLS negotiation, and final browser rendering.",
				tags: ["architecture", "http", "tls", "dns"],
				icon: "Waypoints",
				content: `
The lifecycle of a web request spans multiple layers of the OSI model, orchestrating distributed systems to deliver a visual layout from an initial string input.

<Card title="The Origin" description="User types a URL">
The browser parses the input, checking HSTS lists to verify if HTTPS is mandated, and queries local DNS caches before delegating to the OS network stack.
</Card>

#### End-to-End Traversal Sequence

<Step index={1}>**DNS Resolution:** The system resolves the human-readable domain (e.g., \`google.com\`) into a routable IP address via a recursive lookup chain across Root, TLD, and Authoritative nameservers.</Step>

<Step index={2}>**TCP Handshake:** The client establishes a reliable transmission channel via the 3-Way Handshake (SYN, SYN-ACK, ACK) with the target IP, typically on port 443.</Step>

<Step index={3}>**TLS Negotiation:** Cryptographic parameters are exchanged. The client verifies the server's certificate chain via a trusted Certificate Authority (CA) and establishes a symmetric session key.</Step>

<Step index={4}>**HTTP Execution:** An application payload (e.g., HTTP GET) is transmitted through the encrypted tunnel, carrying state (Cookies), context (User-Agent), and intent.</Step>

<Step index={5}>**Routing & Load Balancing:** Traffic traverses the public internet via BGP peering, ultimately terminating at a Load Balancer or Edge proxy, which acts as a reverse proxy to forward traffic to an upstream application node.</Step>

<Step index={6}>**Server Processing & Response:** The origin node executes business logic, retrieves data from databases or caches, and returns an HTTP response containing a designated status code and payload containing HTML bytes.</Step>

<Step index={7}>**Critical Rendering Path:** The browser receives byte chunks, constructs the DOM and CSSOM, computes layout geometries, and executes the final graphics paint cycle.</Step>

<Callout type="tip" title="Multiplexing & HTTP/2+">
Modern protocols avoid repeating this entire chain for subsequent requests. HTTP/2 multiplexes streams over a single TCP connection, while HTTP/3 operates over UDP (QUIC) to bypass head-of-line blocking.
</Callout>

<Grid cols={2} gap={6}>
  <Card title="Transport Scope" description="L3/L4 Duties">
    - IP Routing
    - Port allocation
    - Congestion control
  </Card>
  <Card title="Application Scope" description="L7 Duties">
    - Header parsing
    - Content caching
    - DOM reconciliation
  </Card>
</Grid>
`,
			},
		],
	},
	{
		id: "browser",
		title: "Browser Engine",
		icon: "Globe",
		topics: [
			{
				id: "rendering-pipeline",
				title: "Critical Rendering Path",
				description:
					"How browsers transform source bytes into visible pixels via synchronous and asynchronous parsing.",
				tags: ["browser", "performance", "rendering"],
				icon: "Layout",
				content: `
Performance tuning starts with understanding the Rendering Pipeline. Any script or style that interrupts this path effectively "blocks" the viewport.

<Highlight variant="warning">Warning: Synchronous scripts block the HTML parser.</Highlight>

#### The Pipeline Sequence
The browser doesn't just "paint"; it constructs a complex geometric map of your application.

<Step index={1}>
**DOM Construction:** Parsing HTML bytes into a node tree.
</Step>

<Step index={2}>
**CSSOM Construction:** Parsing CSS into a style rule tree.
</Step>

<Step index={3}>
**Render Tree:** Merging DOM and CSSOM to determine visibility.
</Step>

<Step index={4}>
**Layout (Reflow):** Calculating precise geometry for every visible pixel.
</Step>

<Step index={5}>
**Paint & Composite:** Final rasterization and GPU layer compositing.
</Step>
`,
			},
		],
	},
	{
		id: "security",
		title: "Security",
		icon: "ShieldAlert",
		topics: [
			{
				id: "cors",
				title: "Browser CORS Policy",
				description:
					"The protocol governing how browser-based applications safely negotiate cross-origin resource access.",
				tags: ["security", "sop", "cors"],
				icon: "Lock",
				content: `
Cross-Origin Resource Sharing (CORS) is a safety relaxation of the **Same-Origin Policy**. It allows your server to "allow-list" specific consumers.

<Card title="Preflight Requests" description="The OPTIONS handshake.">
For non-idempotent methods, the browser automatically injects a preflight request to confirm header and method allowance from the target origin.
</Card>
`,
			},
		],
	},
	{
		id: "architecture",
		title: "Software Architecture",
		icon: "Cpu",
		topics: [
			{
				id: "rust-systems",
				title: "Rust & Systems Architecture",
				description:
					"Why Rust dominates modern engine development, and the performance hierarchy of programming languages.",
				tags: ["rust", "compilers", "performance"],
				icon: "TerminalSquare",
				content: `
Rust has become the paradigm-shifting standard for writing high-performance engines, core libraries, and infrastructure. It achieves this by shifting safety checks from runtime to compile-time.

<Grid cols={2} gap={6}>
  <Card title="Memory Safety Without GC" description="The core of Rust's dominance">
    Unlike C/C++, Rust guarantees memory safety at compile-time via the <Highlight variant="primary">Ownership Model</Highlight> and Borrow Checker, eliminating entire classes of bugs (segmentation faults, data races) without the runtime overhead of a Garbage Collector.
  </Card>
  <Card title="Fearless Concurrency" description="Engine-grade multi-threading">
    Writing parallel engines is notoriously difficult. Rust's strict type system ensures thread safety, allowing engineers to write highly concurrent code without fear of deadlocks or race conditions.
  </Card>
</Grid>

#### Performance & Compile Complexity Hierarchy

The architectural trade-off in modern languages is typically between **Developer Velocity** (fast compilation, slower runtime) and **Execution Velocity** (slow compilation, fast runtime).

<Table
  headers={["Language", "Execution Speed", "Compile Complexity", "Under The Hood Architecture"]}
  rows={[
    ["C / C++", "⚡⚡⚡ Highest", "High (Manual AST/Linking)", "AOT (Ahead-of-Time) Compiled"],
    ["Rust", "⚡⚡⚡ Highest", "Very High (Borrow Checker, LLVM)", "AOT Compiled"],
    ["Go", "⚡⚡ High", "Very Low (Fast Compilation)", "AOT Compiled + GC"],
    ["Java / C#", "⚡ High", "Medium (Bytecode via JIT)", "JIT (Just-in-Time) Compiled + GC"],
    ["JavaScript / Python", "🐌 Lowest", "None (Interpreted)", "Interpreted / JIT Runtime"]
  ]}
/>

#### Why does a slow compile equal a fast runtime?

Rust compilation is notoriously slow comparing to Go or JavaScript iteration, but this is an intentional structural design to maximize instruction execution speed:

<Step index={1}>**The Borrow Checker:** Before emitting any code, the compiler mathematically proves that all memory access is safe, enforcing strict lifetime rules. This takes compilation time but completely removes the need for CPU-intensive runtime boundary checks or GC sweeps.</Step>

<Step index={2}>**Zero-Cost Abstractions:** Rust allows high-level, ergonomic code (like iterators or traits) but the compiler flattens them down to the exact equivalent of hand-written, optimized assembly during compilation.</Step>

<Step index={3}>**Aggressive LLVM Optimization:** Because Rust feeds extremely strictly-typed and constraint-rich intermediate representations to LLVM, LLVM can perform incredibly aggressive memory optimizations that C/C++ compilers often can't risk due to "pointer aliasing" ambiguity.</Step>

<Callout type="tip" title="The Architect's Trade-off">
You pay a massive front-loaded cost in compile time and developer learning curve so your execution environment never pays a cost in runtime latency or random application crashes. This makes it the ultimate ecosystem for **game engines, databases, JS runtimes (like Deno/Bun), and core network infrastructure**.
</Callout>
`,
			},
		],
	},
];

export function getAllTopics(): Topic[] {
	return knowledgeBase.flatMap((section) => section.topics);
}

export function getTopicById(id: string): Topic | undefined {
	for (const section of knowledgeBase) {
		const topic = section.topics.find((t) => t.id === id);
		if (topic) return topic;
	}
	return undefined;
}

export function getSectionByTopicId(topicId: string): Section | undefined {
	return knowledgeBase.find((section) => section.topics.some((t) => t.id === topicId));
}
