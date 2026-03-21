import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const sseVsWebsocketTopic: Topic = {
  id: "sse-vs-websocket",
  title: "SSE vs WebSocket vs Long Polling",
  description:
    "Understanding the tradeoffs between the three dominant realtime streaming patterns.",
  tags: ["backend", "real-time", "architecture"],
  icon: "SignalHigh",
  content: [
    <p key="1">
      Modern real-time web applications require a persistent connection between the client and the server. Choosing the right protocol—<strong>SSE</strong>, <strong>WebSockets</strong>, or <strong>Long Polling</strong>—is a balance of <strong>Directionality</strong>, <strong>Overhead</strong>, and <strong>Scaling Ease</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Real-Time Spectrum
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Long Polling", "SSE (Server-Sent Events)", "WebSockets"]}
      rows={[
        ["Direction", "Unidirectional (Client Pull).", "<strong>Unidirectional</strong> (Server Push).", "<strong>Bidirectional</strong> (Full Duplex)."],
        ["Protocol", "HTTP/1.1 or HTTP/2.", "Strictly <strong>HTTP/2</strong> recommended.", "TCP Upgrade (<code>ws://</code>)."],
        ["Overhead", "High (Headers sent every time).", "Low (Single HTTP connection).", "Lowest (Binary framing)."],
        ["Reconnection", "Handled by the client loop.", "<strong>Automatic</strong> by the browser.", "Must be handled manually in code."],
        ["Data Type", "JSON / Text.", "Text-only (UTF-8).", "Binary or Text."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: SSE (The Managed Push)
    </h3>,
    <p key="5" className="mb-4 text-sm text-muted-foreground">
      SSE (Server-Sent Events) is a standard HTML5 API (<code>EventSource</code>). It's essentially <strong>one long-lived HTTP request</strong> that never closes. The server sends <code>Content-Type: text/event-stream</code> and keeps the connection open to pump data.
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="The HTTP/2 Advantage">
        <p className="text-sm text-muted-foreground mb-2">
          Bypassing the "6-Connection Limit."
        </p>
        <p className="text-xs italic text-muted-foreground">
          Under HTTP/1.1, browsers limited persistent connections. With <strong>HTTP/2 Multiplexing</strong>, you can open 100+ SSE streams over a <strong>single TCP pipe</strong>, making it incredibly lightweight for dashboards.
        </p>
      </Card>
      <Card title="Automatic Reconnect">
        <p className="text-sm text-muted-foreground mb-2">
          Resilience out of the box.
        </p>
        <p className="text-xs italic text-muted-foreground">
          If the network drops, the browser automatically retries the SSE connection. It even sends a <code>Last-Event-ID</code> header so the server can "replay" the missed messages.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      The "Full Duplex" Power: WebSockets
    </h3>,
    <p key="8" className="mb-4">
      WebSockets strictly start as an <strong>HTTP GET</strong> with an <code>Upgrade: websocket</code> header. If the server says "101 Switching Protocols," the connection <strong>stops being HTTP</strong> and becomes a raw TCP socket.
    </p>,
    <ul key="9" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>Use Case:</strong> Multi-player gaming, collaborative whiteboards (Figma), and high-frequency trading where the client also needs to "push" data constantly.</li>
      <li><strong>Scaling Headache:</strong> Because WebSockets are <strong>Stateful</strong>, a Load Balancer must use "Sticky Sessions" so a client stays on the same server, or you must use a <strong>Pub/Sub (Redis)</strong> backplane to sync messages across 100 server instances.</li>
    </ul>,
    <Callout key="10" type="tip" title="When to use SSE?">
      If your app is mostly <strong>Read-Only</strong> (like a stock price tracker, social media feed, or ChatGPT-style text streaming), <strong>SSE is almost always a better choice</strong> than WebSockets. It's easier to scale, works over standard HTTP, and has better firewall compatibility.
    </Callout>,
  ],
};
