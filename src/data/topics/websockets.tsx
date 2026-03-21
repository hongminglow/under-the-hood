import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

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
        <p className="text-sm text-muted-foreground mb-2">
          TCP connections can "silently" die if no data moves.
        </p>
        <p className="text-xs italic text-muted-foreground">
          WebSockets use <strong>Ping</strong> frames from the server and <strong>Pong</strong> replies from the client to ensure the "pipe" is still physically open. If a Pong is missed, the server closes the socket to save RAM.
        </p>
      </Card>
      <Card title="Scaling: The Redis Factor">
        <p className="text-sm text-muted-foreground mb-2">
          WebSocket servers are <strong>Stateful</strong>.
        </p>
        <p className="text-xs italic text-muted-foreground">
          If User A is on Server 1 and User B is on Server 2, they can't chat! Solution: Use <strong>Redis Pub/Sub</strong> as a backbone. Server 1 publishes the message to Redis; all other servers listen and push it to their locally connected users.
        </p>
      </Card>
    </Grid>,
    <Callout key="9" type="danger" title="The 'Load Balancer' Trap">
      Standard Load Balancers (L4) close connections frequently. For WebSockets, you must enable <strong>Sticky Sessions</strong> (Session Affinity) or use an L7 Proxy (Nginx/Envoy) that explicitly supports the <code>Upgrade</code> header.
    </Callout>,
  ],
};
