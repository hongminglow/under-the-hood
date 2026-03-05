import type { Topic } from "@/data/types";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";

export const httpEvolutionTopic: Topic = {
  id: "http-evolution",
  title: "HTTP/1.1 vs HTTP/2 vs HTTP/3",
  description:
    "Tracing the evolution of the web's transfer protocol from serial connections to QUIC-powered multiplexing.",
  tags: ["networking", "protocols", "performance"],
  icon: "ArrowRightLeft",
  content: [
    <p key="1">
      HTTP is the lingua franca of the web. But the original protocol was
      designed for simple document retrieval in the 1990s. Modern web apps
      demand thousands of concurrent resources (scripts, images, API calls),
      forcing the protocol to evolve dramatically.
    </p>,
    <Table
      key="2"
      headers={["Feature", "HTTP/1.1 (1997)", "HTTP/2 (2015)", "HTTP/3 (2022)"]}
      rows={[
        [
          "Transport",
          "TCP (one request per connection)",
          "TCP with multiplexing",
          "QUIC (UDP-based)",
        ],
        [
          "Head-of-Line Blocking",
          "Yes — a slow response blocks everything behind it",
          "Solved at HTTP layer, but still exists at TCP layer",
          "Fully solved — each stream is independent",
        ],
        [
          "Header Compression",
          "None (headers repeated verbatim per request)",
          "HPACK — static/dynamic table compression",
          "QPACK — improved for out-of-order delivery",
        ],
        [
          "Connection Setup",
          "TCP handshake + TLS handshake (2-3 RTTs)",
          "Same as HTTP/1.1",
          "0-RTT or 1-RTT via QUIC's integrated TLS 1.3",
        ],
        [
          "Server Push",
          "Not supported",
          "Supported (but rarely used in practice)",
          "Supported",
        ],
      ]}
    />,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Why HTTP/3 Chose UDP
    </h4>,
    <p key="4">
      TCP is deeply baked into operating system kernels and internet middleboxes
      (firewalls, NATs). Modifying TCP's behavior is effectively impossible at
      scale. Google's QUIC team built an entirely new transport protocol{" "}
      <em>on top of UDP</em>, giving them full control over congestion control,
      connection migration (seamlessly switching from Wi-Fi to cellular), and
      per-stream loss recovery — something TCP fundamentally cannot do.
    </p>,
    <Callout key="5" type="tip" title="Connection Migration">
      HTTP/3 connections survive network changes. If you walk from Wi-Fi to
      mobile data, your HTTP/3 downloads continue seamlessly because QUIC
      identifies connections by a Connection ID, not by the IP address + port
      tuple that TCP relies on.
    </Callout>,
  ],
};
