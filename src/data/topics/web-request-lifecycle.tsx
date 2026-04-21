import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

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
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="The HTTP Request">
        <p className="text-sm text-slate-400 mb-2">
          The browser sends the <strong>HTTP GET/POST</strong> header.
        </p>
        <p className="text-xs italic text-slate-400">
          Include Cookies, User-Agent, and Accept-Encoding. If it's a cross-origin API call, the browser first sends an <strong>OPTIONS (CORS Pre-flight)</strong> request.
        </p>
      </Card>
      <Card title="Server Processing (TTFB)">
        <p className="text-sm text-slate-400 mb-2">
          The backend wakes up. Load Balancer → Nginx → Application Code.
        </p>
        <p className="text-xs italic text-slate-400">
          <strong>Time to First Byte (TTFB)</strong> measures how long the server took to query the DB and start streaming the response back.
        </p>
      </Card>
    </Grid>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Phase 3: The Browser Engine Pipeline
    </h3>,
    <p key="7" className="mb-4">
      The server sends <code>200 OK</code> and the HTML stream. The browser engine (Blink/WebKit) begins:
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>Tokenization:</strong> Converting HTML strings into DOM Nodes.</li>
      <li><strong>CSSOM:</strong> Parsing CSS to calculate styles for every element.</li>
      <li><strong>Layout (Reflow):</strong> Calculating the geometry (x, y, width, height) of every box on the screen.</li>
      <li><strong>Paint:</strong> Converting the layout tree into actual pixels on the GPU.</li>
    </ul>,
    <Callout key="9" type="info" title="The Critical Request Chain">
      If your HTML has a <code>&lt;script src="..."&gt;</code> in the <code>&lt;head&gt;</code>, the browser <strong>stops everything</strong>, downloads that script, executes it, and only <em>then</em> resumes painting. Use <code>async</code> or <code>defer</code> to unblock the lifecycle!
    </Callout>,
  ],
};
