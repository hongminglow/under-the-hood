import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";

export const webRequestLifecycleTopic: Topic = {
  id: "web-request-lifecycle",
  title: "Web Request Lifecycle",
  description:
    "The complete step-by-step developer breakdown of what physically happens when a user presses 'Enter' on a URL.",
  tags: ["networking", "latency", "system-design"],
  icon: "Waypoints",
  content: [
    <p key="1">
      The "Enter" button on a browser triggers one of the most complex distributed systems workflows in computing. Every millisecond of a web request is a battle against the speed of light, network congestion, and server processing overhead.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Phase 1: The Networking Hunt
    </h3>,
    <Table
      key="3"
      headers={["Step", "Technological Action", "The Bottleneck"]}
      rows={[
        ["1. DNS Lookup", "Browser checks cache → OS cache → Router → ISP Resolver.", "High RTT (Round Trip Time) if cache miss."],
        ["2. TCP Handshake", "SYN → SYN-ACK → ACK. Establishes a reliable connection.", "Adds 1.5 RTT of latency before data moves."],
        ["3. TLS Handshake", "Key exchange (Diffie-Hellman) + Certificate verification.", "Adds 1-2 RTT. Solved by TLS 1.3 (0-RTT)."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Phase 2: The Application Protocol
    </h3>,
    <Table
      key="5"
      headers={["Stage", "What Moves", "Latency Signal"]}
      rows={[
        ["HTTP Request", "The browser sends method, path, headers, cookies, user-agent, and accepted encodings.", "Cross-origin API calls may first pay an <strong>OPTIONS</strong> preflight round trip."],
        ["Server Processing", "Load balancer routes to Nginx, app code runs, DB/cache calls execute, and the first response bytes are prepared.", "<strong>TTFB</strong> reveals how long the server path took before the browser received the first byte."],
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Phase 3: The Browser Engine Pipeline
    </h3>,
    <p key="7" className="mb-4">
      The server sends <code>200 OK</code> and the HTML stream. The browser engine (Blink/WebKit) begins:
    </p>,
    <Flow
      key="8"
      steps={[
        { title: "1. Tokenization", description: "HTML strings are converted into DOM nodes." },
        { title: "2. CSSOM", description: "CSS is parsed so the browser can calculate styles for every element." },
        { title: "3. Layout", description: "The engine computes each box's x, y, width, and height." },
        { title: "4. Paint", description: "The layout tree becomes pixels and layers that the GPU can composite." },
      ]}
    />,
    <Callout key="9" type="info" title="The Critical Request Chain">
      If your HTML has a <code>&lt;script src="..."&gt;</code> in the <code>&lt;head&gt;</code>, the browser <strong>stops everything</strong>, downloads that script, executes it, and only <em>then</em> resumes painting. Use <code>async</code> or <code>defer</code> to unblock the lifecycle!
    </Callout>,
  ],
};
