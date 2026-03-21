import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const tcpVsUdpTopic: Topic = {
  id: "tcp-vs-udp",
  title: "TCP vs UDP",
  description:
    "The fundamental difference between guaranteed delivery (TCP) and blazingly fast blasting (UDP).",
  tags: ["networking", "tcp", "udp"],
  icon: "Network",
  content: [
    <p key="1">
      At the Transport Layer (Layer 4), networking is a trade-off between <strong>Reliability</strong> and <strong>Speed</strong>. TCP ensures every byte arrives perfectly, while UDP prioritizes speed by stripping away almost all management overhead.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Head-to-Head Comparison
    </h3>,
    <Table
      key="3"
      headers={["Property", "TCP (The Reliable Courier)", "UDP (The Firehose)"]}
      rows={[
        ["Connection", "Connection-oriented (Handshake required).", "Connectionless (Just send it)."],
        ["Reliability", "Guaranteed delivery. Retransmits lost data.", "No guarantee. Packets may arrive out of order or not at all."],
        ["Speed", "Slower due to overhead and acknowledgments.", "Blazing fast. Zero overhead."],
        ["Header Size", "Large (20-60 bytes).", "Tiny (8 bytes)."],
        ["Flow Control", "Yes. Prevents overwhelming the receiver.", "No. Blasts data as fast as possible."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Error Correction Divide
    </h3>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="The TCP 'Wait' State">
        <p className="text-sm text-muted-foreground mb-2">
          TCP uses <strong>Automatic Repeat Request (ARQ)</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          If Packet #2 is missing, TCP stops the entire stream until the sender retransmits #2. This causes "Micro-stuttering" in real-time apps.
        </p>
      </Card>
      <Card title="The UDP 'Forgive' State">
        <p className="text-sm text-muted-foreground mb-2">
          UDP lets the <strong>Application</strong> handle errors.
        </p>
        <p className="text-xs italic text-muted-foreground">
          If a video packet is lost, the player just shows a glitchy pixel for 1/60th of a second and moves on. Performance is preserved.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The Game Changer: HTTP/3 (QUIC)
    </h3>,
    <p key="7" className="mb-4">
      For decades, the web (HTTP) relied on TCP. But TCP's 3-way handshake and head-of-line blocking became the bottleneck for modern low-latency apps. <strong>HTTP/3 uses QUIC</strong>, which runs on top of <strong>UDP</strong>, but re-implements reliability and encryption in userspace. It gets the speed of UDP with the safety of TCP.
    </p>,
    <Callout key="8" type="tip" title="When to use UDP?">
      If your data is "Temporal" (meaning it's useless if it's 2 seconds late), use <strong>UDP</strong>. Examples: VoIP, Live Video Streaming (WebRTC), and Multiplayer Gaming (Player coordinates). If your data is "Persistent" (SQL results, JSON, Files), use <strong>TCP</strong>.
    </Callout>,
  ],
};
