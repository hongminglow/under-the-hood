import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const networkPayloadVulnerabilitiesTopic: Topic = {
  id: "network-payload-vulnerabilities",
  title: "Network Payload Vulnerabilities",
  description:
    "How proxies intercept HTTPS, Man-in-the-Middle (MitM) attacks, Replay Attacks, and how to prevent them using Certificate Pinning and HSTS.",
  tags: ["security", "https", "proxy", "mitm", "vulnerabilities"],
  icon: "ShieldAlert",
  content: [
    <p key="1" className="mb-4">
      HTTPS encrypts data in transit, but it is not a silver bullet. Tools like <strong>Burp Suite</strong> or <strong>Charles Proxy</strong> can still intercept and read HTTPS traffic. Let's deep dive into how HTTPS interception (Man-in-the-Middle) works behind the scenes, and explore other common network payload vulnerabilities.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      How HTTPS Interception Works (MitM)
    </h3>,
    <p key="3" className="mb-4">
      HTTPS relies on Public Key Infrastructure (PKI) and Certificate Authorities (CAs) to verify a server's identity. If an attacker can convince your device to trust a fake CA, they can intercept all traffic.
    </p>,
    <div key="4" className="space-y-4 mb-8">
      <Step index={1}><strong>Installation of Root Certificate:</strong> The user (or malware) installs a custom CA certificate (like Burp Suite's CA) into the device's or browser's Trusted Root Store.</Step>
      <Step index={2}><strong>Proxy Interception:</strong> The network traffic is routed through the proxy.</Step>
      <Step index={3}><strong>Dynamic Certificate Generation:</strong> When the device attempts to connect to <code>api.example.com</code>, the proxy intercepts the request and generates a fake certificate on-the-fly, signed by its custom CA.</Step>
      <Step index={4}><strong>Two Separated TLS Tunnels:</strong> The device establishes a secure connection with the proxy (thinking it's the real server), and the proxy establishes a secure connection with the real server. The proxy decrypts, inspects, and re-encrypts the payload in the middle.</Step>
    </div>,

    <Callout key="5" type="warning" title="Why is this a vulnerability?">
      Even if the request payload is strongly encrypted by TLS, the proxy sits in the middle and holds the keys for both TLS sessions. It can see the raw, decrypted JSON payload, headers, and authorization tokens, allowing it to easily tamper with requests before sending them to the real server.
    </Callout>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Preventing HTTPS Interception
    </h3>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Certificate Pinning">
        <p className="text-sm text-slate-400 mb-4">
          The app hardcodes the expected public key or certificate hash of the real server. Even if the device trusts the proxy's fake CA, the app will reject the connection because the fake certificate's hash doesn't match the pinned hash.
        </p>
        <CodeBlock
          title="Concept"
          language="json"
          code={`"pins": { "api.example.com": ["sha256/k2v6..."] }`}
        />
      </Card>
      <Card title="Message-Level Encryption (JWE)">
        <p className="text-sm text-slate-400 mb-2">
          Encrypt the payload itself <em>before</em> sending it over TLS. The client encrypts the JSON using the server's public key (e.g., using JWE). The proxy can intercept the TLS tunnel, but it only sees an encrypted blob that it cannot decrypt without the server's private key.
        </p>
      </Card>
    </Grid>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Other Network Payload Vulnerabilities
    </h3>,
    <p key="9" className="mb-4">
      Beyond basic MitM interception, attackers use other techniques to exploit network payloads even when TLS is present:
    </p>,
    <Table
      key="10"
      headers={["Vulnerability", "How it Works", "Prevention"]}
      rows={[
        [
          "Replay Attacks",
          "An attacker captures a valid, encrypted request (e.g., a money transfer) and simply resends it multiple times to duplicate the action without needing to decrypt it.",
          "Implement **Idempotency Keys**, Nonces, or timestamp checks on the server so duplicate requests are rejected."
        ],
        [
          "Downgrade Attacks",
          "The attacker forces the client and server to negotiate an older, vulnerable protocol (like SSLv3 or TLS 1.0) instead of TLS 1.3.",
          "Use **HSTS (HTTP Strict Transport Security)** and disable support for old TLS versions on the server."
        ],
        [
          "Session Hijacking",
          "Attacker steals the Session ID or JWT from cookies or headers (via XSS or MitM) and attaches it to their own payloads to impersonate the user.",
          "Use **HttpOnly, Secure, SameSite** cookies, and short-lived JWTs."
        ],
        [
          "Parameter Tampering",
          "Using a proxy, the attacker intercepts the decrypted payload and changes values (e.g., changing `price=100` to `price=1`) before it reaches the server.",
          "Never trust client data. Validate and authorize all inputs on the server. Use Message Authentication Codes (MAC)."
        ]
      ]}
    />,
  ],
};
