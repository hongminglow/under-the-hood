import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";

export const websocketsTopic: Topic = {
  id: "websockets",
  title: "WebSockets & Real-Time",
  description:
    "How to keep a permanent, bi-directional pipe open between the browser and the server for instant communication.",
  tags: ["networking", "real-time", "websockets", "backend"],
  icon: "Radio",
  content: [
    <p key="1">
      WebSockets provide a <strong>Full-Duplex</strong>, persistent communication channel over a single TCP connection. Unlike HTTP's request-response model, WebSockets allow the server to push data to the client at any time, making it the industry standard for chat, live trading, and collaborative editing.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Handshake: Upgrading HTTP
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      Every WebSocket starts as a standard HTTP/1.1 request with specific headers that tell the server: "I'd like to change the rules of this connection."
    </p>,
    <Table
      key="4"
      headers={["Header", "Value", "Purpose"]}
      rows={[
        ["Connection", "Upgrade", "Tells the server to switch protocols."],
        ["Upgrade", "websocket", "Specifies the target protocol."],
        ["Sec-WebSocket-Key", "Base64 Nonce", "Prevents caching proxies from misinterpreting the request."],
        ["101 Switching Protocols", "Response Code", "Server agrees to the upgrade. The TCP pipe is now a WebSocket."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Under the Hood: Data Framing
    </h3>,
    <p key="6" className="mb-4">
      Once upgraded, data is sent in <strong>Frames</strong> rather than HTTP packets. A frame includes:
    </p>,
    <ul key="7" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>FIN bit:</strong> Indicates if this is the final fragment of a message.</li>
      <li><strong>Opcode:</strong> Defines the data type (Text, Binary, Close, Ping, Pong).</li>
      <li><strong>Masking Key:</strong> All data from client to server <em>must</em> be XOR-masked to prevent "Cache Poisoning" in intermediate proxies.</li>
    </ul>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title="Heartbeats: Ping & Pong">
        <p className="text-sm text-slate-300 mb-2">
          TCP connections can "silently" die if no data moves.
        </p>
        <p className="text-xs text-slate-400">
          WebSockets use <strong>Ping</strong> frames from the server and <strong>Pong</strong> replies from the client to ensure the "pipe" is still physically open. If a Pong is missed, the server closes the socket to save RAM.
        </p>
      </Card>
      <Card title="Scaling: The Redis Factor">
        <p className="text-sm text-slate-300 mb-2">
          WebSocket servers are <strong>Stateful</strong>.
        </p>
        <p className="text-xs text-slate-400">
          If User A is on Server 1 and User B is on Server 2, they can't chat! Solution: Use <strong>Redis Pub/Sub</strong> as a backbone. Server 1 publishes the message to Redis; all other servers listen and push it to their locally connected users.
        </p>
      </Card>
    </Grid>,
    <Callout key="9" type="danger" title="The 'Load Balancer' Trap">
      Standard Load Balancers (L4) close connections frequently. For WebSockets, you must enable <strong>Sticky Sessions</strong> (Session Affinity) or use an L7 Proxy (Nginx/Envoy) that explicitly supports the <code>Upgrade</code> header.
    </Callout>,

    <h3 key="code-title" className="text-xl font-bold mt-8 mb-4">
      Code Example: WebSocket Client & Server
    </h3>,
    <Grid key="code-grid" cols={2} gap={6} className="my-8">
      <Card title="Client (Browser)">
        <CodeBlock
          language="javascript"
          code={`// Connect to WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Connection opened
ws.onopen = () => {
  console.log('Connected!');
  ws.send(JSON.stringify({ type: 'join', room: 'chat' }));
};

// Listen for messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

// Handle errors
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Connection closed
ws.onclose = () => {
  console.log('Disconnected');
};`}
        />
      </Card>
      <Card title="Server (Node.js)">
        <CodeBlock
          language="javascript"
          code={`const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          data: data
        }));
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});`}
        />
      </Card>
    </Grid>,

    <h3 key="comparison-title" className="text-xl font-bold mt-8 mb-4">
      WebSockets vs SSE vs Long Polling
    </h3>,
    <Table
      key="comparison-table"
      headers={["Feature", "<span class='text-emerald-300'>WebSockets</span>", "<span class='text-cyan-300'>Server-Sent Events (SSE)</span>", "<span class='text-amber-300'>Long Polling</span>"]}
      rows={[
        ["Direction", "Bi-directional (client ↔ server)", "Uni-directional (server → client)", "Uni-directional (server → client)"],
        ["Protocol", "ws:// or wss://", "HTTP/HTTPS (HTTP/2 recommended)", "HTTP/HTTPS"],
        ["Browser Support", "All modern browsers", "All modern (not IE)", "Universal"],
        ["Connection", "Persistent TCP", "Persistent HTTP", "Repeated HTTP requests"],
        ["Overhead", "Low (binary frames)", "Medium (HTTP headers)", "High (new request each time)"],
        ["Use Case", "Chat, gaming, collaboration", "Live feeds, notifications, streaming", "Legacy systems, simple updates"],
        ["Reconnection", "Manual (exponential backoff)", "<strong>Automatic</strong> (browser handles)", "Built-in (new request)"],
        ["Firewall/Proxy", "Can be blocked", "Works everywhere (HTTP)", "Works everywhere (HTTP)"],
        ["HTTP/2 Multiplexing", "N/A (not HTTP)", "<strong>100+ streams</strong> over single TCP", "N/A"],
        ["Last-Event-ID", "N/A", "<strong>Replay missed messages</strong> on reconnect", "N/A"]
      ]}
    />,
    <Callout key="sse-tip" type="tip" title="When to Choose SSE Over WebSockets">
      If your app is mostly <strong>Read-Only</strong>&nbsp;(stock tickers, social feeds, ChatGPT-style streaming, live dashboards), <strong>SSE is almost always better</strong>&nbsp;than WebSockets. It's easier to scale, works over standard HTTP, has automatic reconnection, and better firewall compatibility. With HTTP/2, you can open 100+ SSE streams over a single TCP connection, bypassing the old "6-connection limit" from HTTP/1.1.
    </Callout>,

    <Callout key="queue-warning" type="warning" title="Queue Size Limits">
      Always set a maximum queue size (e.g., 100 messages) to prevent memory leaks if the connection stays down for extended periods. Drop oldest messages when the limit is reached.
    </Callout>,
  ],
};
