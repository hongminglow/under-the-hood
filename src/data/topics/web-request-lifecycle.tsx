import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Grid } from "@/components/ui/Grid";

export const webRequestLifecycleTopic: Topic = {
  id: "web-request-lifecycle",
  title: "Web Request Lifecycle",
  description:
    "An exhaustive end-to-end journey of a web request: from URL parsing to routing, TLS negotiation, and final browser rendering.",
  tags: ["architecture", "http", "tls", "dns"],
  icon: "Waypoints",
  content: [
    <p key="1">
      What happens when you press Enter in the browser? The lifecycle of a web
      request spans multiple layers of the OSI model, orchestrating distributed
      systems to deliver a visual layout from an initial string input.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Phase 1: Parsing and Lookup
    </h4>,
    <Step key="3" index={1}>
      <strong>URL Parsing & Security Checks:</strong> The browser parses the
      input URL. It checks the{" "}
      <strong>HSTS (HTTP Strict Transport Security)</strong> preload list to
      verify if HTTPS is mandated before even making a network request.
    </Step>,
    <Step key="4" index={2}>
      <strong>DNS Resolution:</strong> The system resolves the human-readable
      domain (e.g., <code>google.com</code>) into a routable IP address via a
      recursive lookup chain across Root, TLD, and Authoritative nameservers.
    </Step>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Phase 2: Connection Establishment
    </h4>,
    <p key="6">
      Before HTTP data can flow, the client and server must establish secure
      boundary connections.
    </p>,
    <Step key="7" index={3}>
      <strong>TCP 3-Way Handshake:</strong> The client establishes a reliable
      transmission channel (SYN, SYN-ACK, ACK) with the target IP, ensuring
      sequence numbers are synchronized and the port (443 for HTTPS) is open.
    </Step>,
    <Step key="8" index={4}>
      <strong>TLS Negotiation (Handshake):</strong> The client and server agree
      on cryptographic parameters (Cipher Suites, TLS version). The client
      validates the server's certificate chain via its trusted Root CAs. Thanks
      to <strong>SNI (Server Name Indication)</strong>, the server knows which
      certificate to return. They finally generate a symmetric session key.
    </Step>,
    <Callout key="9" type="info" title="Zero Round Trip Time (0-RTT)">
      With TLS 1.3, if the client has connected to the server previously, it can
      send HTTP payload data in the very first packet of the handshake,
      significantly reducing latency.
    </Callout>,
    <h4 key="10" className="text-xl font-bold mt-8 mb-4">
      Phase 3: The HTTP Layer
    </h4>,
    <Step key="11" index={5}>
      <strong>HTTP Execution:</strong> An application payload (e.g., HTTP GET)
      is transmitted through the encrypted tunnel. This carries state (Cookies),
      context (User-Agent, Accept-Encoding), and the request path.
    </Step>,
    <Step key="12" index={6}>
      <strong>Routing & Load Balancing:</strong> Traffic traverses the public
      internet via BGP (Border Gateway Protocol) peering. It often hits an Edge
      Reverse Proxy or CDN (like Cloudflare). A Load Balancer then distributes
      the request to a healthy upstream web server node.
    </Step>,
    <Step key="13" index={7}>
      <strong>Application Server Processing:</strong> The web framework executes
      business logic. It may parse request parameters, execute database queries,
      cache results in Redis, and finally compose an HTTP response.
    </Step>,
    <Step key="14" index={8}>
      <strong>HTTP Response:</strong> A response is returned with a Status Code
      (e.g., 200 OK), caching headers (Cache-Control), compression
      (gzip/brotli), and the actual HTML payload.
    </Step>,
    <h4 key="15" className="text-xl font-bold mt-8 mb-4">
      Phase 4: Critical Rendering Path
    </h4>,
    <Step key="16" index={9}>
      <strong>Browser Rendering:</strong> The browser streams the incoming HTML
      byte chunks parsing them into the DOM. It fetches subresources (CSS, JS,
      Images), builds the CSSOM, calculates layout geometries, and executes the
      final graphics paint cycle.
    </Step>,
    <Grid key="17" cols={2} gap={6} className="mt-8">
      <Card title="Transport Scope" description="L3/L4 Duties">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>IP Routing / BGP</li>
          <li>Port allocation / Sockets</li>
          <li>Congestion window control</li>
        </ul>
      </Card>
      <Card title="Application Scope" description="L7 Duties">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Header parsing & Authentication</li>
          <li>Content caching & Compression</li>
          <li>DOM reconciliation & JS Execution</li>
        </ul>
      </Card>
    </Grid>,
    <CodeBlock
      key="18"
      title="Simplified Raw Request"
      language="http"
      code={`GET / HTTP/2\nHost: example.com\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nAccept-Encoding: gzip, deflate, br\nConnection: keep-alive`}
    />,
  ],
};
