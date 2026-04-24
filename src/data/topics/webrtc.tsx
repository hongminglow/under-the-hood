import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { MistakeCard } from "@/components/ui/MistakeCard";
import {
  Video,
  Wifi,
  Server,
  AlertTriangle,
  Globe,
  Zap,
  Users,
} from "lucide-react";

export const webRtcTopic: Topic = {
  id: "webrtc-p2p",
  title: "WebRTC: Peer-to-Peer Internals",
  description:
    "How browsers negotiate, connect, encrypt, and stream audio/video directly to each other — and why your video call lags.",
  tags: ["networking", "webrtc", "video", "browser", "p2p"],
  icon: "Video",
  content: [
    <p key="intro">
      WebRTC (Web Real-Time Communication) is the open standard that powers real-time audio, video,
      and data transfer directly between browsers — <strong>without a media server in the middle</strong>.
      It is the technology inside Google Meet, Discord video, Zoom's browser client, and even
      multiplayer browser games. Understanding it means understanding one of the most complex
      multi-protocol orchestrations in the modern web stack.
    </p>,

    /* ─── WHO USES IT ─── */
    <h3 key="h-who" className="text-xl font-bold mt-12 mb-4">
      Who Uses WebRTC — and Why They Chose It
    </h3>,
    <Grid key="grid-who" cols={2} gap={6} className="mb-10 items-stretch">
      <FeatureCard icon={Video} title="Google Meet" subtitle="Full browser P2P + SFU hybrid" theme="emerald">
        <p className="text-sm text-emerald-100/80 leading-relaxed mb-3">
          Meet uses WebRTC natively in Chrome (Google wrote the spec). For small calls it uses direct
          P2P connections. For group calls it routes through Google's global{" "}
          <strong className="text-emerald-300">SFU fleet</strong>, which allows participants to send
          one stream and receive individually quality-adapted streams per recipient.
        </p>
        <p className="text-sm text-emerald-100/70">
          Key tech: VP9/AV1 video codec, QUIC transport, per-region TURN servers.
        </p>
      </FeatureCard>

      <FeatureCard icon={Users} title="Discord" subtitle="SFU architecture, GoLive streams" theme="violet">
        <p className="text-sm text-violet-100/80 leading-relaxed mb-3">
          Discord Voice uses WebRTC for the media layer but replaces the signaling with their own
          custom UDP-based protocol. Their servers act as <strong className="text-violet-300">SFUs</strong>{" "}
          — participants upload once, and Discord forwards selectively. GoLive (screen share) uses
          higher bitrate video streams.
        </p>
        <p className="text-sm text-violet-100/70">
          Key tech: Opus audio codec, custom signaling, Elixir backend for presence.
        </p>
      </FeatureCard>

      <FeatureCard icon={Globe} title="Zoom (Browser)" subtitle="WebRTC fallback path" theme="teal">
        <p className="text-sm text-teal-100/80 leading-relaxed mb-3">
          Zoom's native app uses their own proprietary UDP stack optimised for packet recovery.
          Their browser client falls back to <strong className="text-teal-300">WebRTC</strong>, which
          is why browser Zoom is noticeably lower quality than the native app — they lose their custom
          forward error correction (FEC) layer.
        </p>
        <p className="text-sm text-teal-100/70">
          Key tech: H.264 video, custom FEC in native, Opus audio in both.
        </p>
      </FeatureCard>

      <FeatureCard icon={Zap} title="Figma / Miro Live Cursors" subtitle="RTCDataChannel for data" theme="cyan">
        <p className="text-sm text-cyan-100/80 leading-relaxed mb-3">
          Not all WebRTC is video. Figma's multiplayer cursor sync and real-time collaborative tools
          use <strong className="text-cyan-300">RTCDataChannel</strong> — the arbitrary data pipe in
          WebRTC. It gives them sub-50ms cursor position sync over a direct P2P UDP channel, bypassing
          WebSocket latency.
        </p>
        <p className="text-sm text-cyan-100/70">
          Key tech: SCTP over DTLS, ordered + unreliable channel mode for cursor drops.
        </p>
      </FeatureCard>
    </Grid>,

    /* ─── THE HANDSHAKE FLOW ─── */
    <h3 key="h-flow" className="text-xl font-bold mt-12 mb-4">
      How a P2P Connection Is Born — The Full Handshake
    </h3>,
    <p key="p-flow" className="text-muted-foreground mb-6">
      Before Alice and Bob can stream video, their browsers must go through a{" "}
      <strong>three-phase negotiation</strong>: Signaling → Discovery → Connection. None of this is
      visible to the user — it happens in the ~200–800ms before the call connects.
    </p>,
    <Flow
      key="flow-handshake"
      steps={[
        {
          title: "1. Signaling — Offer / Answer (SDP)",
          description:
            "Alice's browser creates an SDP Offer: a text blob describing what codecs it supports (H.264, VP8, Opus), what media tracks it has, and what security parameters it will use. This Offer is sent to Bob via YOUR signaling server (WebSocket or HTTP). Bob's browser replies with an SDP Answer. After this, both browsers know what they will speak — but not yet how to reach each other.",
        },
        {
          title: "2. Discovery — STUN & ICE Candidates",
          description:
            "Simultaneously, each browser asks a STUN server: 'What is my public IP:port?' It receives back ICE Candidates — a list of all possible addresses to reach this peer: local IP (192.168.x.x), public IP via STUN, and TURN relay address as fallback. These candidates are sent to the other peer via signaling (this process is called 'Trickle ICE' — candidates drip in as they're found).",
        },
        {
          title: "3. ICE — Connectivity Checks (STUN Binding Requests)",
          description:
            "The ICE agent tries every combination of local ↔ remote candidate pairs by firing STUN Binding Requests on each path. The fastest pair that responds first wins. This is called the 'nominated candidate pair'. On success, a direct UDP tunnel exists between the two peers.",
        },
        {
          title: "4. DTLS Handshake — Encryption Setup",
          description:
            "On top of the ICE tunnel, the browsers perform a DTLS (Datagram TLS) handshake. Both exchange self-signed certificates whose fingerprints were embedded in the SDP. This proves each peer is who they claim to be and establishes the shared encryption keys.",
        },
        {
          title: "5. SRTP — Encrypted Media Flows",
          description:
            "Audio and video are now encrypted with SRTP (Secure RTP) using the DTLS-derived keys. Media flows peer-to-peer in real-time. Your signaling server is completely out of the media path — it was only needed for the negotiation.",
        },
      ]}
    />,

    /* ─── SDP EXPLAINED ─── */
    <h3 key="h-sdp" className="text-xl font-bold mt-12 mb-4">
      What Is SDP? (The Ugly Negotiation Text)
    </h3>,
    <p key="p-sdp" className="text-slate-300 mb-4">
      SDP (Session Description Protocol) is a plain-text format that looks deceptively primitive for
      something this important. It is not a protocol — it's just a{" "}
      <strong>description of capabilities</strong>. Two browsers use it to agree on codecs, bitrates,
      encryption fingerprints, and media directions.
    </p>,
    <CodeBlock
      key="code-sdp"
      title="SDP Offer (Simplified) — What the Browser Actually Sends"
      language="bash"
      code={`v=0
o=- 4611731400430051336 2 IN IP4 127.0.0.1
s=-
t=0 0

# Media section: Video
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98
a=rtpmap:96 VP8/90000          # Codec: VP8 at 90kHz clock
a=rtpmap:97 VP9/90000          # Also supports VP9
a=rtpmap:98 H264/90000         # Also supports H.264
a=sendrecv                     # I will both send AND receive

# Media section: Audio
m=audio 9 UDP/TLS/RTP/SAVPF 111
a=rtpmap:111 opus/48000/2      # Opus codec, 48kHz stereo
a=fmtp:111 minptime=10;useinbandfec=1  # In-band FEC enabled

# ICE credentials (for connectivity checks)
a=ice-ufrag:F7gI
a=ice-pwd:x9cml/YzichV2+fjnkB4sLe

# DTLS fingerprint (certificate hash for verification)
a=fingerprint:sha-256 D2:FA:0E:C3:22...`}
    />,

    /* ─── STUN vs TURN ─── */
    <h3 key="h-nat" className="text-xl font-bold mt-12 mb-4">
      NAT Traversal — STUN, TURN, and the Firewall Problem
    </h3>,
    <p key="p-nat" className="text-slate-300 mb-6">
      The biggest engineering challenge in WebRTC is that most users sit behind NAT routers. Their
      device has a private IP (<code>192.168.1.5</code>) but the internet only sees the router's
      public IP. Two peers cannot directly address each other. ICE solves this with a hierarchy of
      fallbacks.
    </p>,
    <Grid key="grid-nat" cols={2} gap={6} className="mb-8 items-stretch">
      <FeatureCard icon={Wifi} title="STUN" subtitle="Session Traversal Utilities for NAT" theme="emerald">
        <p className="text-sm text-emerald-100/80 leading-relaxed mb-4">
          A lightweight server that reflects your public IP back to you. Your browser sends a UDP
          packet; the STUN server replies: "I received it from{" "}
          <strong className="text-emerald-300">203.0.113.42:54321</strong>." That's your ICE
          candidate — the address the other peer can try to reach you at.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-emerald-900/30">
          <ul className="text-sm text-emerald-100/70 space-y-1 list-disc pl-4">
            <li>Free to run (Google's is <code>stun.l.google.com:19302</code>)</li>
            <li>Works for ~80% of home/mobile NATs</li>
            <li>Fails on Symmetric NAT (strict corporate firewalls)</li>
          </ul>
        </div>
      </FeatureCard>

      <FeatureCard icon={Server} title="TURN" subtitle="Traversal Using Relays around NAT" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-4">
          When STUN fails (Symmetric NAT, double NAT, strict firewalls), all traffic is relayed
          through a TURN server. Both peers connect to TURN, and TURN proxies the media between them.
          The P2P dream is over — this is now a client-server architecture.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-amber-900/30">
          <ul className="text-sm text-amber-100/70 space-y-1 list-disc pl-4">
            <li>Expensive — all media bandwidth goes through YOUR server</li>
            <li>Needed for ~15–20% of connections (corporate networks)</li>
            <li>Must be provisioned per-region to avoid latency spikes</li>
          </ul>
        </div>
      </FeatureCard>
    </Grid>,

    /* ─── SCALING: MESH vs SFU vs MCU ─── */
    <h3 key="h-scale" className="text-xl font-bold mt-12 mb-4">
      Scaling Beyond 2 People — Mesh, SFU, and MCU
    </h3>,
    <p key="p-scale" className="text-muted-foreground mb-6">
      Pure P2P works beautifully for 1-on-1 calls. For group calls, the math breaks down fast. In a
      pure mesh, every participant must upload one stream per other participant — 6 people means 5
      simultaneous uploads, and your CPU is doing 5 separate encode jobs.
    </p>,
    <Table
      key="table-scale"
      headers={["Architecture", "How Media Flows", "CPU Cost", "Bandwidth Cost", "Used By"]}
      rows={[
        [
          "Mesh (Pure P2P)",
          "Each peer sends directly to every other peer",
          "Very High — N-1 encode jobs",
          "Very High — uploads multiply per participant",
          "Tiny apps, 2–3 person demos",
        ],
        [
          "SFU (Selective Forwarding Unit)",
          "Each peer sends 1 stream to the SFU; SFU forwards to others",
          "Low on client — 1 encode job",
          "Server pays bandwidth; client pays 1 upload",
          "Discord, Google Meet, Zoom, Daily.co",
        ],
        [
          "MCU (Multipoint Control Unit)",
          "Server decodes all streams, composites a grid, sends 1 stream",
          "Extreme server CPU — full decode + encode",
          "Low on client — 1 upload, 1 download",
          "Legacy video conferencing (Cisco Webex old)",
        ],
      ]}
    />,
    <Callout key="callout-sfu" type="tip" title="Why SFU Won">
      SFU is the dominant architecture because it offloads the heavy work to the server (routing)
      while keeping client encoding cheap (one stream). The SFU can also do{" "}
      <strong>Simulcast</strong> — each client sends 3 quality tiers (high/medium/low), and the SFU
      delivers the appropriate tier to each recipient based on their network conditions.
    </Callout>,

    /* ─── VIDEO CODECS ─── */
    <h3 key="h-codecs" className="text-xl font-bold mt-12 mb-4">
      Video Codecs — H.264 vs VP8 vs VP9 vs AV1
    </h3>,
    <Table
      key="table-codecs"
      headers={["Codec", "Owner", "Compression", "HW Acceleration", "WebRTC Support", "Typical Use"]}
      rows={[
        ["H.264 / AVC", "MPEG-LA (licensed)", "Good", "Universal — every chip", "All browsers", "Default fallback, native apps"],
        ["VP8", "Google (open)", "Moderate", "Limited", "All browsers", "Legacy WebRTC, older Meet"],
        ["VP9", "Google (open)", "30% better than H.264", "Most modern GPUs", "Chrome, Firefox, Edge", "Google Meet default"],
        ["AV1", "AOM (open, royalty-free)", "50% better than H.264", "New devices only", "Chrome 90+", "Meet premium, low-bandwidth calls"],
        ["H.265 / HEVC", "MPEG-LA (expensive license)", "35% better than H.264", "Universal", "Safari only", "Apple ecosystem"],
      ]}
    />,

    /* ─── LAG DIAGNOSIS ─── */
    <h3 key="h-lag" className="text-xl font-bold mt-12 mb-4">
      When Your Video Call Lags — What Is Actually Happening?
    </h3>,
    <p key="p-lag" className="text-slate-300 mb-6">
      "The call is lagging" can mean at least 6 different things, each with a different root cause
      and owner. Here is the engineering breakdown of every lag type and how to diagnose which one
      you're experiencing.
    </p>,
    <Grid key="grid-lag" cols={2} gap={6} className="mb-8 items-stretch">
      <FeatureCard icon={AlertTriangle} title="Packet Loss Lag" subtitle="Choppy / frozen frames" theme="rose">
        <p className="text-sm text-rose-100/80 leading-relaxed mb-3">
          UDP packets are dropped in transit. The decoder receives frames with missing data and has
          to either request a keyframe (causing a freeze) or use error concealment (causing blocky
          artifacts). This is the most common lag type on mobile or congested networks.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-rose-900/30">
          <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-1">Diagnosis</p>
          <p className="text-sm text-rose-100/70">
            Chrome: <code>chrome://webrtc-internals</code> → check{" "}
            <code>packetsLost</code> counter. &gt;2% loss = noticeable quality drop.
          </p>
        </div>
      </FeatureCard>

      <FeatureCard icon={AlertTriangle} title="Sender Bandwidth Lag" subtitle="Pixelated / low resolution" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          The <strong className="text-amber-300">sender's upload bandwidth</strong> is the bottleneck.
          WebRTC's congestion control (REMB / Transport-CC) detects the congestion and
          automatically drops the video bitrate and resolution. You see the other person become
          a pixelated mess — it's their upload, not your download.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-amber-900/30">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">Diagnosis</p>
          <p className="text-sm text-amber-100/70">
            Check <code>qualityLimitationReason: bandwidth</code> in WebRTC internals on
            the sender's side. The receiver's stats will show a resolution drop.
          </p>
        </div>
      </FeatureCard>

      <FeatureCard icon={AlertTriangle} title="CPU / Encoder Lag" subtitle="Consistent delay, not choppy" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          The encoder cannot keep up with the frame rate. This happens when using{" "}
          <strong className="text-amber-300">software encoding</strong> (no hardware GPU available) or
          when the CPU is overloaded by other tasks. Frames queue up and the call feels "behind" —
          everything said appears a second or two late.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-amber-900/30">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">Diagnosis</p>
          <p className="text-sm text-amber-100/70">
            Check <code>qualityLimitationReason: cpu</code>. High CPU% on task manager
            during call = software encoding bottleneck.
          </p>
        </div>
      </FeatureCard>

      <FeatureCard icon={AlertTriangle} title="TURN Relay Lag" subtitle="High latency, not packet loss" theme="rose">
        <p className="text-sm text-rose-100/80 leading-relaxed mb-3">
          When direct P2P failed and TURN is being used, all media is routed through a relay server.
          If that TURN server is in the wrong region (e.g., you're in KL but TURN is in Virginia),
          every packet makes a transatlantic round trip. Latency spikes to 200–400ms and the call
          feels like a satellite phone.
        </p>
        <div className="bg-black/30 rounded-lg p-3 border border-rose-900/30">
          <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-1">Diagnosis</p>
          <p className="text-sm text-rose-100/70">
            Check ICE candidate type in WebRTC internals. If{" "}
            <code>candidateType: relay</code> — you're on TURN. Check RTT; if &gt;150ms,
            the TURN server is too far away.
          </p>
        </div>
      </FeatureCard>
    </Grid>,

    <Callout key="callout-lag" type="info" title="The Key Insight: 'Is it the server?' — Usually, No.">
      In a well-built WebRTC app using an SFU, the signaling and SFU servers are NOT in the video
      path the way a traditional server would be. They forward packets without decoding. The lag you
      experience in Google Meet is almost always:{" "}
      <strong>your network → sender's network → packet loss → congestion control adapting</strong>.
      The Meet servers themselves rarely cause lag unless there's a genuine infrastructure outage.
    </Callout>,

    /* ─── CONGESTION CONTROL ─── */
    <h3 key="h-cc" className="text-xl font-bold mt-12 mb-4">
      How WebRTC Fights Lag — Congestion Control
    </h3>,
    <p key="p-cc" className="text-slate-300 mb-6">
      WebRTC is self-healing by design. Two algorithms work continuously to adapt to network
      conditions without any user action.
    </p>,
    <Grid key="grid-cc" cols={2} gap={6} className="mb-8">
      <Card title="REMB — Receiver Estimated Max Bitrate">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          The receiver continuously measures incoming packet arrival intervals and estimates the
          available bandwidth. It sends RTCP REMB feedback packets back to the sender saying
          "I can only receive 800 kbps right now." The sender adjusts its encoder bitrate
          downward.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong className="text-muted-foreground">Result:</strong> Resolution and frame rate drop
          gracefully instead of freezing.
        </p>
      </Card>
      <Card title="Transport-CC — Transport-Wide Congestion Control">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          A more modern approach. Every packet is stamped with a sequence number; the receiver
          reports back arrival timestamps for each one. The sender uses these to calculate
          packet delay variation and detect congestion before packet loss even occurs.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong className="text-muted-foreground">Result:</strong> Proactive adaptation —
          quality drops before freezing begins.
        </p>
      </Card>
    </Grid>,

    /* ─── COMMON MISTAKES ─── */
    <h3 key="h-mistakes" className="text-xl font-bold mt-12 mb-4">
      Common WebRTC Implementation Mistakes
    </h3>,
    <MistakeCard
      key="m1"
      number={1}
      title="No TURN Server Provisioned"
      problem="Developer builds a WebRTC app and tests it locally. Works perfectly. In production, 15–20% of users in corporate offices or hotels (Symmetric NAT) can't connect at all. The error is a silent ICE failure."
      solution="Always provision a TURN server (coturn is free, open source). Use services like Twilio TURN or Xirsys for managed global TURN infra. Test on a mobile hotspot — if it works, test behind a corporate VPN."
    />,
    <MistakeCard
      key="m2"
      number={2}
      title="Single-Region TURN Server"
      problem="Team sets up one TURN server in US East. Users in Southeast Asia or Europe who fall back to TURN get 250–400ms RTT added to every call. Video feels like a satellite phone."
      solution="Deploy TURN servers in at least 3 regions (US, EU, Asia-Pacific). Use GeoDNS to route each user to the nearest TURN server. Major providers (Twilio, Livekit) handle this automatically."
    />,
    <MistakeCard
      key="m3"
      number={3}
      title="Mesh Architecture for Group Calls"
      problem="Team builds a group video feature with pure P2P mesh. Works fine for 3 people. At 5 people, each participant uploads 4 simultaneous HD streams. CPU pegs at 100%, browser crashes. Users on mobile data run out of bandwidth in minutes."
      solution="Use an SFU (Selective Forwarding Unit). Open-source options: mediasoup, Janus, Pion. Managed options: Livekit, Agora, Daily.co. SFU reduces each client to 1 upload + N downloads."
    />,
    <MistakeCard
      key="m4"
      number={4}
      title="Renegotiating SDP on Every Track Change"
      problem="App adds a screen share track and triggers a full SDP renegotiation. During renegotiation, audio and video momentarily freeze. Users think the app crashed. This repeats every time a user mutes, unmutes, or shares a screen."
      solution="Use replaceTrack() instead of addTrack()/removeTrack() wherever possible — it avoids renegotiation entirely. For unavoidable renegotiations, use a loading indicator so the freeze feels intentional."
    />,

    /* ─── REAL WORLD SCENARIO ─── */
    <h3 key="h-scenario" className="text-xl font-bold mt-12 mb-4">
      Real-World Scenario: What Happens When You Join a Google Meet
    </h3>,
    <Flow
      key="flow-scenario"
      steps={[
        {
          title: "You click 'Join Now'",
          description:
            "Your browser calls getUserMedia() to request camera and microphone access. A MediaStream object is created containing your local audio and video tracks.",
        },
        {
          title: "RTCPeerConnection Created",
          description:
            "Your browser creates an RTCPeerConnection object with Meet's ICE server configuration (their STUN + TURN fleet). Your local tracks are added to this connection.",
        },
        {
          title: "SDP Offer Generated and Sent",
          description:
            "createOffer() generates your SDP. It's sent to Meet's signaling server via HTTPS. Meet's SFU responds with an SDP Answer. Both browsers call setLocalDescription / setRemoteDescription.",
        },
        {
          title: "ICE Candidates Trickle",
          description:
            "Your browser fires STUN requests to Google's STUN servers (stun.l.google.com:19302). It discovers your public IP and generates ICE candidates. These trickle to the SFU via the signaling channel.",
        },
        {
          title: "ICE Connectivity Checks",
          description:
            "Your browser and the SFU exchange STUN Binding Requests on every candidate pair. The fastest responding pair wins — usually your direct public IP → the nearest Meet PoP.",
        },
        {
          title: "DTLS Handshake",
          description:
            "On the winning ICE path, a DTLS handshake establishes encryption keys. Certificate fingerprints are verified against what was in the SDP.",
        },
        {
          title: "SRTP Media Flows",
          description:
            "Your camera frames are H.264/VP9 encoded, SRTP encrypted, and sent via UDP to Meet's SFU. The SFU forwards your stream (without decoding) to all other participants. Their SRTP-encrypted streams flow back to you. Total time from 'Join Now' to first video frame: 400–1200ms.",
        },
      ]}
    />,

    /* ─── QUICK REFERENCE ─── */
    <Callout key="callout-terms" type="info" title="WebRTC Protocol Stack Quick Reference">
      <ul className="space-y-2 mt-2 text-sm">
        <li><strong className="text-emerald-300">SDP</strong>&nbsp;— Session Description Protocol. The negotiation text. Not a protocol, just a format.</li>
        <li><strong className="text-emerald-300">ICE</strong>&nbsp;— Interactive Connectivity Establishment. The framework that finds the best network path.</li>
        <li><strong className="text-emerald-300">STUN</strong>&nbsp;— Discovers your public IP through NAT. Free, lightweight.</li>
        <li><strong className="text-emerald-300">TURN</strong>&nbsp;— Relays media when direct P2P fails. Expensive but essential.</li>
        <li><strong className="text-emerald-300">DTLS</strong>&nbsp;— Datagram TLS. Encrypts the connection before media flows.</li>
        <li><strong className="text-emerald-300">SRTP</strong>&nbsp;— Secure RTP. The encrypted audio/video stream itself.</li>
        <li><strong className="text-emerald-300">SFU</strong>&nbsp;— Selective Forwarding Unit. The server that routes streams in group calls.</li>
        <li><strong className="text-emerald-300">RTCDataChannel</strong>&nbsp;— Binary/text data pipe over WebRTC (SCTP). Used for file transfer, gaming, cursors.</li>
      </ul>
    </Callout>,
  ],
};
