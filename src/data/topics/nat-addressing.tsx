import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";

export const natAddressingTopic: Topic = {
  id: "nat-addressing",
  title: "IP Addressing & NAT",
  description:
    "The separation of global public reachability from local private isolation via Network Address Translation.",
  tags: ["networking", "nat", "ip-addressing"],
  icon: "Network",
  content: [
    <p key="1">
      The internet is divided into two distinct addressing spaces:{" "}
      <strong>Public</strong> and <strong>Private</strong>. The bridge between
      them is a mechanism called{" "}
      <strong>NAT (Network Address Translation)</strong>.
    </p>,
    <Grid key="2" cols={2} gap={6}>
      <Card title="Public IP" description="The Global Identity">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Globally unique and routable.</li>
          <li>Assigned by ISPs from IANA pools.</li>
          <li>Directly reachable from any point on the internet.</li>
        </ul>
      </Card>
      <Card title="Private IP" description="The Local Identity">
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Used within local networks (Home, Office).</li>
          <li>Can be reused across different networks globally.</li>
          <li>
            Defined by <Highlight variant="warning">RFC 1918</Highlight> ranges.
          </li>
        </ul>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Behind the Scenes: NAT Flow
    </h4>,
    <p key="4">
      Your router acts as a translator. When you send a message, it replaces
      your "Internal" identity with its "External" one.
    </p>,
    <Step key="5" index={1}>
      <strong>Outbound Mapping:</strong> A device (192.168.1.5:54321) requests a
      website. The router replaces the source with its Public IP (203.0.113.1)
      and a unique source port (e.g., 60001).
    </Step>,
    <Step key="6" index={2}>
      <strong>Translation Table:</strong> The router stores this mapping:{" "}
      <CodeBlock
        language="text"
        code="Out: 203.0.113.1:60001 <-> In: 192.168.1.5:54321"
      />
    </Step>,
    <Step key="7" index={3}>
      <strong>Inbound Routing:</strong> When the server responds to the Public
      IP/Port, the router reverses the lookup and delivers the packet to the
      correct internal device.
    </Step>,
    <Callout key="8" type="tip" title="Rate Limiting & NAT">
      When a server implements rate limiting, it typically sees your{" "}
      <strong>External IP</strong>. This is why a whole office building might
      get "Too Many Requests" errors if many people hit the same API—they all
      share one external identity!
    </Callout>,
    <h4 key="9" className="text-xl font-bold mt-8 mb-4">
      Protocol Identification
    </h4>,
    <p key="10">
      Servers and proxies distinguish between these IPs using specific boundary
      logic.
    </p>,
    <Table
      key="11"
      headers={["Context", "Header/Value", "Detection Method"]}
      rows={[
        [
          "Public Traffic",
          "X-Forwarded-For",
          "Proxies append the client's external IP to this header.",
        ],
        [
          "Private Range",
          "10.0.0.0/8",
          "RFC 1918 reserved space for internal-only routing.",
        ],
        [
          "Secure Edge",
          "X-Real-IP",
          "Used by Load Balancers to pass the actual connecting IP.",
        ],
      ]}
    />,
  ],
};
