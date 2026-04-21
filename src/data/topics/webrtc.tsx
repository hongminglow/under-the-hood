import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const webRtcTopic: Topic = {
  id: "webrtc-p2p",
  title: "WebRTC & Peer-to-Peer",
  description:
    "How to establish a high-bandwidth, sub-second latency video stream by cutting out the middleman server.",
  tags: ["networking", "webrtc", "video", "browser"],
  icon: "Video",
  content: [
    <p key="1">
      WebRTC (Web Real-Time Communication) is the technology behind modern video conferencing (Zoom, Discord). It allows browsers to exchange <strong>Audio, Video, and Arbitrary Data</strong> directly between peers (Browser-to-Browser) with sub-second latency, bypassing the need for a central media server.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Three Pillars: Signaling, Connecting, and Securing
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      Establishing a P2P connection is a multi-stage dance because browsers don't know each other's IP addresses and are usually trapped behind strict NAT firewalls.
    </p>,
    <Table
      key="4"
      headers={["Phase", "Protocol/Tool", "What It Does"]}
      rows={[
        ["1. Signaling", "HTTP/WebSocket + <strong>SDP</strong>", "The Peers exchange 'Offer' and 'Answer' (media capabilities/codecs)."],
        ["2. Discovery", "<strong>STUN</strong>", "Peers discover their Public IP and Port. They generate <strong>ICE Candidates</strong>."],
        ["3. Connecting", "<strong>ICE</strong>", "The browsers try every possible network path (Local IP, STUN, TURN) to connect."],
        ["4. Securing", "<strong>DTLS / SRTP</strong>", "Every millisecond of video is encrypted using a unique session key."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Bypassing the Firewall: STUN vs. TURN
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="STUN (Session Traversal Utilities for NAT)">
        <p className="text-sm text-muted-foreground mb-2">
          A "Mirror" server. You ask it: "What's my Public IP?"
        </p>
        <p className="text-xs italic text-muted-foreground">
          Free, very fast, and handles ~80% of consumer internet connections. It allows <strong>Hole Punching</strong> through common NAT routers.
        </p>
      </Card>
      <Card title="TURN (Traversal Using Relays around NAT)">
        <p className="text-sm text-muted-foreground mb-2">
          The "Relay" fallback. If STUN fails, traffic is routed <strong>Through</strong> this server.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Expensive (bandwidth costs). Used for strict corporate firewalls (Symmetric NAT) that block direct UDP traffic.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Scaling Video: P2P vs. Mesh vs. SFU
    </h3>,
    <p key="8" className="mb-4">
      In a group call, <strong>Mesh (Pure P2P)</strong> kills your CPU because you must upload a stream to <em>every</em> participant. Enterprise apps use an <strong>SFU (Selective Forwarding Unit)</strong> architecture.
    </p>,
    <Table
      key="9"
      headers={["Architecture", "How it Works", "Trade-off"]}
      rows={[
        ["Mesh (Pure P2P)", "User A sends to B, C, and D directly.", "Melts CPU/Bandwidth for >3 users."],
        ["SFU (Selective Forwarding)", "User A sends 1 stream to Server. Server clones it to B, C, D.", "Best balance. Used by Discord/Zoom."],
        ["MCU (Multipoint Control)", "Server decodes all videos, makes a 'grid', and sends 1 video.", "Very expensive server CPU. Fixed layout."]
      ]}
    />,
    <Callout key="10" type="info" title="The RTCDataChannel">
      WebRTC isn't just for video! The <strong>RTCDataChannel</strong> uses <strong>SCTP</strong> over UDP. It provides the reliability of TCP with the speed of UDP. This is used for peer-to-peer file sharing (BitTorrent in the browser) and ultra-low latency multiplayer gaming.
    </Callout>,
  ],
};
