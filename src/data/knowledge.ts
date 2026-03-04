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
        description:
          "The core synchronization mechanism for establishing full-duplex transmission control.",
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
        description:
          "Tracing the distributed hierarchy of domain names across root and TLD servers.",
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
  return knowledgeBase.find((section) =>
    section.topics.some((t) => t.id === topicId),
  );
}
