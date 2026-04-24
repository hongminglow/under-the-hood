import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export const natAddressingTopic: Topic = {
  id: "nat-addressing",
  title: "IP Addressing & NAT",
  description:
    "Why your laptop has a 192.168.x.x address, how routers juggle traffic, and how the internet didn't run out of IPs.",
  tags: ["networking", "ip", "nat"],
  icon: "Network",
  content: [
    <p key="1">
      NAT (Network Address Translation) was the "Band-Aid" that saved the internet from running out of IPv4 addresses. It allows an entire local network of thousands of devices to share a <strong>single Public IP address</strong> by mapping private internal addresses to unique ports on the router.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The NAT Translation Table
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      When your laptop (<code>192.168.1.5</code>) sends a request to Google, the router doesn't just pass it through. It <strong>rewrites the packet header</strong>.
    </p>,
    <Table
      key="4"
      headers={["Phase", "Source IP:Port", "Action", "Translated IP:Port"]}
      rows={[
        ["Outbound", "192.168.1.5:54321", "Router replaces Private with Public.", "203.0.113.1:10001"],
        ["Inbound", "203.0.113.1:10001", "Router looks up Port 10001 in table.", "192.168.1.5:54321"]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Types of NAT
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <FeatureCard icon={ArrowUpRight} title="SNAT (Source NAT)" subtitle="Private traffic going out" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-2">
          Used when internal devices go <strong>Out</strong> to the internet.
        </p>
        <p className="text-xs italic text-cyan-200/70">
          Your home router changing your phone's IP to the ISP's public IP.
        </p>
      </FeatureCard>
      <FeatureCard icon={ArrowDownLeft} title="DNAT (Destination NAT)" subtitle="Public traffic coming in" theme="emerald">
        <p className="text-sm text-emerald-100/75 mb-2">
          Used to allow external traffic <strong>In</strong> to a specific server.
        </p>
        <p className="text-xs italic text-emerald-200/70">
          Commonly known as <strong>Port Forwarding</strong>. Maps Public Port 80 → Internal Server Port 80.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      The P2P Nightmare: NAT Traversal
    </h3>,
    <p key="8" className="mb-4">
      Because NAT blocks unsolicited inbound traffic, Peer-to-Peer apps (Zoom, BitTorrent, Games) use <strong>ICE (Interactive Connectivity Establishment)</strong> which relies on:
    </p>,
    <ul key="9" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>STUN:</strong> A server that tells you: "Hey, from my perspective, your Public IP is X and your Port is Y." (Hole Punching).</li>
      <li><strong>TURN:</strong> If STUN fails (due to Symmetric NAT), a <strong>Relay Server</strong> sits in the middle and bounces the data between both peers. (Extremely expensive).</li>
    </ul>,
    <Callout key="10" type="danger" title="CGNAT (Carrier-Grade NAT)">
      Some ISPs (especially Mobile/Cellular) put you behind <strong>another</strong> giant NAT layer before you even hit the public internet. This "Double NAT" makes hosting servers or using P2P applications nearly impossible without a VPN or Tunnel (Tailscale/Cloudflare Tunnel).
    </Callout>,
  ],
};
