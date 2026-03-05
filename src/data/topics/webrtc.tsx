import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const webRtcTopic: Topic = {
  id: "webrtc-p2p",
  title: "WebRTC & Peer-to-Peer",
  description:
    "How browsers stream high-definition video and audio directly to each other without a central server.",
  tags: ["networking", "browser", "streaming"],
  icon: "Video",
  content: [
    <p key="1">
      If a user on a laptop wants to video call a friend via a web browser,
      routing heavy 4K video feeds through a central company server is
      impossibly expensive and creates massive latency.{" "}
      <strong>WebRTC (Web Real-Time Communication)</strong> was created to allow
      two browsers to directly stream bytes entirely Peer-to-Peer (P2P).
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Initial Handshake (Signaling)
    </h4>,
    <p key="3" className="mb-4">
      Browsers don't inherently know each other's IP addresses. You still need a
      traditional server temporarily just to introduce them. This is called
      <strong>Signaling</strong> (often done using WebSockets).
    </p>,
    <Step key="4" index={1}>
      Alice creates an "Offer" containing her video codecs and network data.
    </Step>,
    <Step key="5" index={2}>
      Alice sends this Offer to a generic WebSocket Server, which forwards it to
      Bob.
    </Step>,
    <Step key="6" index={3}>
      Bob receives it, creates an "Answer", and sends it back to Alice.
    </Step>,
    <p key="7" className="mt-4 mb-8">
      They now know each other's parameters, but there's a massive problem:
      routers and firewalls.
    </p>,
    <h4 key="8" className="text-xl font-bold mt-8 mb-4">
      Busting through NAT
    </h4>,
    <Grid key="9" cols={2} gap={6} className="mb-8">
      <Card title="STUN Servers">
        Most devices don't have public IP addresses (Network Address
        Translation). They sit behind home routers. A STUN server is a public,
        ultra-lightweight server that simply answers the question, "What is my
        public IP and port?" Alice pings the STUN server to find out what she
        looks like to the internet.
      </Card>
      <Card title="TURN Servers">
        If massive corporate firewalls completely block direct P2P connections,
        WebRTC falls back to a TURN server. This server relays the{" "}
        <em>actual</em>
        video data bytes. It acts as an expensive middleman when direct P2P
        fails.
      </Card>
    </Grid>,
    <Callout key="10" type="warning" title="UDP Transport">
      WebRTC exclusively uses <strong>UDP</strong> underneath (not TCP) because
      missing a single video frame is perfectly acceptable, but pausing a live
      video call to re-transmit a dropped packet (TCP's behavior) would cause
      horrendous stuttering.
    </Callout>,
  ],
};
