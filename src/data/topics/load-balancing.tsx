import type { Topic } from "@/data/types";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const loadBalancingTopic: Topic = {
  id: "load-balancing",
  title: "Load Balancing Strategies",
  description:
    "How network traffic directors efficiently distribute millions of requests across server fleets to prevent bottlenecks.",
  tags: ["architecture", "scaling", "networking"],
  icon: "Scale",
  content: [
    <p key="1">
      A Load Balancer acts as the traffic cop sitting in front of your servers
      and routing client requests across all servers capable of fulfilling those
      requests in a manner that maximizes speed and capacity utilization.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Routing Algorithms
    </h4>,
    <Step key="3" index={1}>
      <strong>Round Robin:</strong> Requests are distributed sequentially.
      Server A, then Server B, then Server C, then back to A. Easy, but ignores
      current server load.
    </Step>,
    <Step key="4" index={2}>
      <strong>Least Connections:</strong> Routes traffic to the server with the
      fewest active connections. Ideal when requests take a long, variable time
      to complete.
    </Step>,
    <Step key="5" index={3}>
      <strong>IP Hashing:</strong> The client's IP address is mathematically
      hashed to consistently assign them to the <em>same</em> server. Crucial
      for stateful applications like WebSockets.
    </Step>,
    <h4 key="6" className="text-xl font-bold mt-8 mb-4">
      L4 vs L7 Balancing
    </h4>,
    <p key="7">Load balancers operate at different OSI layers:</p>,
    <ul key="8" className="list-disc pl-6 space-y-2 mb-8 mt-4">
      <li>
        <strong>Layer 4 (Transport):</strong> Routes purely based on IP and Port
        (TCP/UDP segments). Absolutely lightning fast, but completely blind to
        the content (HTTP headers/URLs).
      </li>
      <li>
        <strong>Layer 7 (Application):</strong> Inspects the actual HTTP
        requests. It can route `/api` traffic to a Node server and `/images`
        traffic to an S3 bucket. Slower overhead, but infinitely smarter.
      </li>
    </ul>,
    <Callout key="9" type="info" title="Health Checks">
      Load balancers constantly ping the underlying servers (e.g., checking
      `/healthz`). If a server fails checking three times, it is removed from
      the rotation pool automatically, ensuring high availability (HA).
    </Callout>,
  ],
};
