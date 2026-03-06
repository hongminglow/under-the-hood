import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const httpsTlsTopic: Topic = {
  id: "https-tls-handshake",
  title: "HTTPS & TLS Handshake",
  description:
    "How your browser establishes a secure encrypted connection in ~100ms — the handshake that protects every byte of web traffic.",
  tags: ["networking", "security", "encryption", "interview"],
  icon: "Lock",
  content: [
    <p key="1">
      HTTPS is just <strong>HTTP over TLS</strong>. TLS (Transport Layer
      Security) encrypts the entire HTTP conversation so that anyone
      intercepting the traffic sees only <strong>random gibberish</strong>. But
      before any encrypted data flows, the client and server must perform a{" "}
      <strong>TLS handshake</strong> to agree on encryption keys.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      TLS 1.3 Handshake (Modern — 1 Round-Trip)
    </h4>,
    <Step key="3" index={1}>
      <strong>Client Hello:</strong> Browser sends supported cipher suites and a{" "}
      <strong>key share</strong> (public key for Diffie-Hellman) in the very
      first message.
    </Step>,
    <Step key="4" index={2}>
      <strong>Server Hello:</strong> Server picks a cipher suite, sends its own
      key share, its <strong>TLS certificate</strong> (proving identity), and
      the handshake is done — all in <strong>one round-trip</strong>.
    </Step>,
    <Step key="5" index={3}>
      <strong>Symmetric Keys Derived:</strong> Both sides independently compute
      the same <strong>session key</strong> using Diffie-Hellman. All subsequent
      data is encrypted with this fast symmetric key (AES).
    </Step>,
    <Table
      key="6"
      headers={["Property", "TLS 1.2", "TLS 1.3"]}
      rows={[
        ["Handshake Round-Trips", "2 RTTs", "1 RTT (0-RTT for resumption)"],
        ["Cipher Suites", "Many (some insecure)", "Only 5, all secure"],
        ["Perfect Forward Secrecy", "Optional", "Mandatory"],
        ["RSA Key Exchange", "Supported (vulnerable)", "Removed entirely"],
        [
          "Session Resumption",
          "Session tickets",
          "PSK (Pre-Shared Key) + 0-RTT",
        ],
      ]}
    />,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Asymmetric vs Symmetric">
        <p className="text-sm">
          The handshake uses <strong>asymmetric encryption</strong> (slow,
          public/private keys) to exchange keys. Then all actual data uses{" "}
          <strong>symmetric encryption</strong> (fast, shared secret key). This
          hybrid approach gives you both security and performance.
        </p>
      </Card>
      <Card title="Certificate Chain">
        <p className="text-sm">
          The server's cert is signed by an Intermediate CA, which is signed by
          a Root CA (pre-installed in browsers). The browser walks this{" "}
          <strong>chain of trust</strong> to verify the server is legitimate.
          Let's Encrypt automates free certificate issuance.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="info" title="0-RTT Resumption: The Speed Trick">
      If you've connected to a server before, TLS 1.3 can send{" "}
      <strong>encrypted data in the very first packet</strong> using a cached
      key. Zero round-trips — the connection "just works" instantly. Tradeoff:
      0-RTT data can be replayed by attackers, so it's only safe for idempotent
      requests (GETs).
    </Callout>,
  ],
};
