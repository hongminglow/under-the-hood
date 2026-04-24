import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Split, Rocket } from "lucide-react";

export const httpEvolutionTopic: Topic = {
  id: "http-evolution",
  title: "HTTP/1.1 vs HTTP/2 vs HTTP/3",
  description:
    "Why front-end web developers moved from bundling static JS to enjoying multiplexed UDP streams.",
  tags: ["networking", "http", "browser-engine"],
  icon: "ArrowRightLeft",
  content: [
    <p key="1">
      The evolution of HTTP is a story of <strong>Latency Reduction</strong>. As web pages grew from simple text to hundreds of assets (JS, CSS, Images), the limitations of the underlying Transport Layer (TCP) forced a complete re-engineering of how browsers and servers talk.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Generational Comparison
    </h3>,
    <Table
      key="3"
      theme="slate"
      headers={["Feature", "HTTP/1.1 (The Original)", "HTTP/2 (The Multiplex)", "HTTP/3 (The Modern)"]}
      rows={[
        ["Transport", "TCP", "TCP", "<strong>UDP (QUIC)</strong>"],
        ["Format", "Plain Text (Readable)", "Binary Framing", "Binary Framing"],
        ["Multiplexing", "None (Sequential requests).", "Yes. Many streams on 1 connection.", "Yes. Streams are independent."],
        ["Header Compression", "None (Bulky headers).", "HPACK (Static/Dynamic tables).", "QPACK (Optimized for UDP)."],
        ["HoL Blocking", "At Request level.", "At TCP level (Packet loss).", "<strong>None</strong> (UDP streams)."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Binary Framing Layer (HTTP/2)
    </h3>,
    <p key="5" className="mb-4">
      HTTP/2 moved away from text (<code>GET /index.html</code>) to a <strong>Binary Framing Layer</strong>. This allows the browser to interleave multiple requests over a single TCP connection.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Split} title="Multiplexing vs. Pipelining" subtitle="HTTP/2's big shift" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-2">
          HTTP/1.1 used "Pipelining" (sending multiple requests without waiting for responses), but it was buggy and suffered from <strong>Head-of-Line Blocking</strong> (if request #1 is slow, #2 is stuck).
        </p>
        <p className="text-xs italic text-cyan-200/70">
          HTTP/2 Multiplexing allows the server to send pieces of Image A and JavaScript B simultaneously, reassembling them at the destination perfectly.
        </p>
      </FeatureCard>
      <FeatureCard icon={Rocket} title="Server Push" subtitle="An HTTP/2-era optimization" theme="violet">
        <p className="text-sm text-violet-100/75 mb-2">
          The server can send assets <strong>before the browser asks</strong>.
        </p>
        <p className="text-xs italic text-violet-200/70">
          If a user asks for <code>index.html</code>, the server knows they'll need <code>styles.css</code>, so it "pushes" the CSS immediately, saving a full round-trip.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Solving TCP's Flaws: HTTP/3 (QUIC)
    </h3>,
    <p key="8" className="mb-4">
      Even with HTTP/2, a single lost TCP packet stops <em>all</em> streams (TCP Head-of-Line Blocking). <strong>HTTP/3 runs on QUIC/UDP</strong>, where each stream is independent. If a packet for Stream A is lost, Stream B continues at full speed.
    </p>,
    <Callout key="9" type="tip" title="0-RTT Handshake">
      Standard HTTPS requires multiple round-trips for TCP and TLS handshakes. HTTP/3 (QUIC) combines them into a single step and supports <strong>0-RTT</strong> (Zero Round Trip Time), allowing the client to send encrypted data in the very first packet if it has talked to the server before.
    </Callout>,
  ],
};
