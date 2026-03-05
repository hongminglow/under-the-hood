import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const tcpVsUdpTopic: Topic = {
  id: "tcp-vs-udp",
  title: "TCP vs UDP",
  description:
    "The foundational transport layer protocols driving the modern internet, balancing reliable delivery against raw speed.",
  tags: ["networking", "transport", "protocol"],
  icon: "Network",
  content: [
    <p key="1">
      At the Transport Layer (Layer 4) of the OSI model, data needs a way to get
      from one port to another. The two dominant paradigms are{" "}
      <strong>Transmission Control Protocol (TCP)</strong> and{" "}
      <strong>User Datagram Protocol (UDP)</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6} className="mt-6 mb-8">
      <Card title="TCP: The Reliable Courier">
        <ul className="space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Connection-Oriented:</strong> Requires a 3-way handshake
            (SYN, SYN-ACK, ACK) before sending data.
          </li>
          <li>
            <strong>Guaranteed Delivery:</strong> Packets are tracked and
            retransmitted if lost.
          </li>
          <li>
            <strong>Ordered:</strong> Packets are given sequence numbers and
            reassembled perfectly.
          </li>
          <li>
            <strong>Use Cases:</strong> Web browsing (HTTP/HTTPS), Email (SMTP),
            File transfer (FTP).
          </li>
        </ul>
      </Card>
      <Card title="UDP: The Speed Demon">
        <ul className="space-y-2 list-disc pl-4 mt-2">
          <li>
            <strong>Connectionless:</strong> Fires packets blindly into the
            void. No handshakes.
          </li>
          <li>
            <strong>No Guarantees:</strong> Packets can be lost, and UDP doesn't
            care.
          </li>
          <li>
            <strong>Unordered:</strong> Packets arrive whenever they arrive.
          </li>
          <li>
            <strong>Use Cases:</strong> Video streaming, VoIP calls, online
            gaming, DNS lookups.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mb-4">
      A Direct Comparison
    </h4>,
    <Table
      key="4"
      headers={["Feature", "TCP", "UDP"]}
      rows={[
        ["Connection setup", "Required (3-way handshake)", "None"],
        [
          "Reliability",
          "High (acknowledgment & retransmission)",
          "Low (best effort)",
        ],
        ["Speed", "Slower (overhead from tracking)", "Extremely Fast"],
        ["Header Size", "20 bytes minimum", "8 bytes fixed"],
        [
          "Congestion Control",
          "Yes (throttles if network is busy)",
          "None (sends at constant rate)",
        ],
      ]}
    />,
  ],
};
