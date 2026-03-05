import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const tcpIpTopic: Topic = {
  id: "tcp-ip",
  title: "TCP 3-Way Handshake",
  description:
    "The core synchronization mechanism for establishing full-duplex transmission control.",
  tags: ["tcp", "protocols", "low-level"],
  icon: "Zap",
  content: [
    <p key="1">
      The <strong>TCP three-way handshake</strong> is the fundamental process
      for setting up a connection. It's essentially a protocol for synchronizing
      sequence numbers and ensuring reliability before data flows.
    </p>,
    <Card
      key="2"
      title="Handshake Mechanism"
      description="SYN -> SYN-ACK -> ACK"
    >
      This 3-step sequence prevents stale connection attempts from confusing the
      server and allows both sides to agree on their{" "}
      <strong>Initial Sequence Numbers (ISN)</strong>.
    </Card>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Implementation Steps
    </h4>,
    <p key="4">
      Modern network stacks perform this synchronization in the kernel before
      your application ever sees the connection.
    </p>,
    <Step key="5" index={1}>
      <strong>Client -&gt; Server (SYN):</strong> The client picks a random ISN
      and sends a packet with the SYN flag set.
    </Step>,
    <Step key="6" index={2}>
      <strong>Server -&gt; Client (SYN-ACK):</strong> The server increments the
      client's ISN, chooses its own ISN, and sends back a packet with both SYN
      and ACK flags.
    </Step>,
    <Step key="7" index={3}>
      <strong>Client -&gt; Server (ACK):</strong> The client increments the
      server's ISN and sends a final ACK. The socket state now transitions to{" "}
      <Highlight variant="primary">ESTABLISHED</Highlight>.
    </Step>,
    <Callout key="8" type="tip" title="Sequence Entropy">
      Operating systems shift ISNs over time using cryptographic salts to
      protect against sequence prediction (TCP injection) attacks.
    </Callout>,
    <Table
      key="9"
      headers={["Flag", "Full Name", "Description"]}
      rows={[
        [
          "SYN",
          "Synchronize",
          "Initiates connection & synchronizes sequence numbers.",
        ],
        [
          "ACK",
          "Acknowledgment",
          "Confirms receipt of a packet and sequence number.",
        ],
        ["FIN", "Finish", "Request to gracefully terminate the connection."],
        [
          "RST",
          "Reset",
          "Aborts the connection due to errors or port unavailability.",
        ],
      ]}
    />,
    <CodeBlock
      key="10"
      title="Packet Flag Inspection (tcpdump)"
      language="bash"
      code={`# SYN\nIP 192.168.1.10.1234 > 192.168.1.20.80: Flags [S], seq 1234567\n# SYN-ACK\nIP 192.168.1.20.80 > 192.168.1.10.1234: Flags [S.], seq 9876543, ack 1234568\n# ACK\nIP 192.168.1.10.1234 > 192.168.1.20.80: Flags [.], ack 9876544`}
    />,
  ],
};
