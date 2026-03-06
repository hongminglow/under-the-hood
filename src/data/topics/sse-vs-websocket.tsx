import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const sseVsWebSocketTopic: Topic = {
  id: "sse-vs-websocket-vs-polling",
  title: "SSE vs WebSocket vs Long Polling",
  description:
    "Three approaches to real-time web communication: when to use each, their trade-offs, and why ChatGPT chose Server-Sent Events.",
  tags: ["networking", "realtime", "frontend", "interview"],
  icon: "Radio",
  content: [
    <p key="1">
      HTTP was designed for <strong>request → response</strong>. But modern apps
      need real-time updates: chat messages, stock prices, AI streaming
      responses. There are three main approaches, and choosing wrong leads to
      either over-engineering or poor user experience.
    </p>,
    <Table
      key="2"
      headers={[
        "Feature",
        "Long Polling",
        "Server-Sent Events (SSE)",
        "WebSocket",
      ]}
      rows={[
        [
          "Direction",
          "Server → Client (simulated)",
          "Server → Client only",
          "Bidirectional",
        ],
        [
          "Protocol",
          "HTTP (repeated requests)",
          "HTTP/2 with text/event-stream",
          "ws:// (upgraded from HTTP)",
        ],
        [
          "Connection",
          "New request after each response",
          "Persistent, auto-reconnect",
          "Persistent, full-duplex",
        ],
        [
          "Browser Support",
          "Universal",
          "All modern browsers",
          "All modern browsers",
        ],
        [
          "Complexity",
          "Simplest to implement",
          "Simple, built-in EventSource API",
          "Most complex (state management)",
        ],
        [
          "Best For",
          "Low-frequency updates, compatibility",
          "Notifications, feeds, AI streaming",
          "Chat, gaming, collaborative editing",
        ],
      ]}
    />,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <Card title="Long Polling">
        <p className="text-sm">
          Client sends a request. Server <strong>holds it open</strong> until
          data is available, then responds. Client immediately sends another
          request. Simple but creates many connections and can't handle
          high-frequency updates.
        </p>
      </Card>
      <Card title="SSE (Server-Sent Events)">
        <p className="text-sm">
          Server pushes events over a <strong>single HTTP connection</strong>.
          Built-in <code>EventSource</code> API handles reconnection
          automatically. Perfect for <strong>one-way streaming</strong> — this
          is how ChatGPT streams responses.
        </p>
      </Card>
      <Card title="WebSocket">
        <p className="text-sm">
          Full <strong>bidirectional</strong> communication over a single TCP
          connection. Both client and server can send messages anytime. Required
          for interactive apps (multiplayer games, collaborative editing) but
          adds complexity.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="4"
      language="typescript"
      title="SSE: How ChatGPT Streams Responses"
      code={`// Server (Express)
app.get("/api/chat", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Stream tokens one by one
  for await (const token of llm.stream(prompt)) {
    res.write(\`data: \${JSON.stringify({ token })}\\n\\n\`);
  }
  res.write("data: [DONE]\\n\\n");
  res.end();
});

// Client (Browser)
const source = new EventSource("/api/chat");
source.onmessage = (event) => {
  if (event.data === "[DONE]") return source.close();
  const { token } = JSON.parse(event.data);
  output.textContent += token;  // Append each token
};`}
    />,
    <Callout key="5" type="tip" title="Decision Guide">
      <strong>Need one-way server pushes?</strong> → SSE (simplest,
      auto-reconnect). <strong>Need bidirectional?</strong> → WebSocket.{" "}
      <strong>Need max compatibility?</strong> → Long Polling.{" "}
      <strong>Streaming AI responses?</strong> → SSE (it's literally what
      OpenAI, Anthropic, and Google use for their chat APIs).
    </Callout>,
  ],
};
