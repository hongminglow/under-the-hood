import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const websocketsTopic: Topic = {
  id: "websockets",
  title: "WebSockets & Real-Time",
  description:
    "Moving beyond stateless HTTP request/response to persistent, bi-directional event streams.",
  tags: ["networking", "realtime", "protocols"],
  icon: "Radio",
  content: [
    <p key="1">
      Traditional HTTP is strictly unidirectional and stateless: the client
      makes a request, the server responds, and the connection is closed. It is
      incapable of letting the server push updates instantly to the client. This
      birthed workarounds and eventually <strong>WebSockets</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Evolution of Real-Time Data
    </h4>,
    <Table
      key="3"
      headers={["Technique", "Mechanism", "Downside"]}
      rows={[
        [
          "Short Polling",
          "setInterval HTTP requests every 5 seconds.",
          "Massive overhead. Most responses are 'no new data', wasting resources.",
        ],
        [
          "Long Polling",
          "Server holds the HTTP connection open until data is ready, then closes it.",
          "Complex to manage timeouts and scale connections.",
        ],
        [
          "Server-Sent Events",
          "A unidirectional persistent HTTP connection (Server -> Client only).",
          "Client cannot easily push data back using the same stream.",
        ],
        [
          "WebSockets (WS)",
          "A persistent 1-to-1 duplex TCP connection.",
          "Stateful; tricky to load balance across thousands of servers.",
        ],
      ]}
    />,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      The WebSocket Protocol (RFC 6455)
    </h4>,
    <p key="5">
      WebSockets aren't purely HTTP, but they gracefully downgrade. A WS
      connection actually starts as a standard HTTP GET request with an{" "}
      <code>Upgrade: websocket</code> header. If the server agrees, it responds
      with a <code>101 Switching Protocols</code> status. From that moment on,
      the HTTP protocol is abandoned, and a raw, bi-directional TCP tunnel is
      left open for real-time framing.
    </p>,
    <div key="6" className="my-8">
      <Callout type="tip" title="Are WebSockets Always The Best Choice?">
        No! WebSockets are stateful, meaning maintaining millions of idle
        concurrent connections requires significant RAM and sticky-session load
        balancing layers. If you are building a Stock Ticker (Server updating
        Clients), <strong>Server-Sent Events</strong> over HTTP/2 multiplexing
        is often vastly superior and easier to scale.
      </Callout>
    </div>,
  ],
};
