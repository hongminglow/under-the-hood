import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { SourceMarker } from "@/components/ui/SourceMarker";
import {
  Play,
  Film,
  Layers,
  Radio,
  Gauge,
  Zap,
  Server,
  AlertTriangle,
  Activity,
  Eye,
} from "lucide-react";

export const videoStreamingUnderTheHoodTopic: Topic = {
  id: "video-streaming-under-the-hood",
  title: "Video Streaming Under the Hood",
  description:
    "How Netflix, YouTube, and modern streaming platforms encode, chunk, deliver, and adaptively play video — and why your stream buffers, what decides quality, and how to fix it.",
  tags: [
    "networking",
    "streaming",
    "video",
    "HLS",
    "DASH",
    "ABR",
    "CDN",
    "buffering",
    "netflix",
    "youtube",
    "codec",
    "encoding",
  ],
  icon: "MonitorPlay",
  content: [
    <p key="intro-1">
      When you press play on Netflix, the browser does <strong>not</strong>{" "}
      download a single giant video file from a single server. Instead, a deeply
      layered pipeline kicks in:{" "}
      <strong>
        the original master file was already pre-encoded into dozens of quality
        variants, chopped into tiny segments, distributed across a global CDN,
        and now an adaptive algorithm on your device picks the best quality your
        connection can handle — segment by segment, in real time
      </strong>
      . When the spinner appears, it means one or more layers of this pipeline
      failed to keep up. Understanding each layer is the key to diagnosing and
      fixing streaming issues.
    </p>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 1 — THE FULL PIPELINE                                      */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-pipeline" className="text-xl font-bold mt-8 mb-4">
      The End-to-End Streaming Pipeline
    </h3>,
    <p key="p-pipeline" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      Every frame you see on screen has passed through this chain. A failure at
      any stage causes buffering, quality drops, or playback failure.
    </p>,
    <Flow
      key="flow-pipeline"
      steps={[
        {
          title: "1. Ingest & Transcode",
          description:
            "The studio uploads a master file (often ProRes / DNxHR, 4K+). The platform's encoding farm transcodes it into a ladder of bitrate variants — e.g. 240p through 4K HDR — using codecs like H.264, H.265/HEVC, VP9, or AV1.",
        },
        {
          title: "2. Segment & Package",
          description:
            "Each quality variant is chopped into small segments (typically 2–10 seconds). A manifest file (HLS .m3u8 or DASH .mpd) is generated listing every segment URL and its metadata.",
        },
        {
          title: "3. CDN Distribution",
          description:
            "Segments and manifests are pushed to edge servers worldwide. When a user in Singapore plays a US show, the segments come from a nearby POP — not from the US origin.",
        },
        {
          title: "4. Client Requests Manifest",
          description:
            "The player fetches the manifest, discovers available quality levels, and begins requesting segments starting from the lowest or a mid-tier quality.",
        },
        {
          title: "5. ABR Algorithm Decides Quality",
          description:
            "The Adaptive Bitrate (ABR) algorithm monitors buffer level, throughput, and latency to pick the optimal quality for each next segment. This is why quality ramps up after pressing play.",
        },
        {
          title: "6. Decode & Render",
          description:
            "The browser or app decodes each segment using hardware (GPU) or software decoders and composites frames onto the video surface at the target frame rate.",
        },
      ]}
    />,
    <Callout key="call-pipeline" type="warning" title="Where Buffering Happens">
      The spinner you see is almost always the player waiting at Step 5: it
      requested the next segment but the CDN response has not arrived fast enough
      to keep the playback buffer above zero seconds. The root cause can be
      upstream (network, CDN, ISP throttling) or downstream (device decode
      bottleneck, ABR over-shooting quality). The rest of this article breaks
      down each layer.
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 2 — ENCODING & THE BITRATE LADDER                          */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-encoding" className="text-xl font-bold mt-8 mb-4">
      Encoding & the Bitrate Ladder
    </h3>,
    <p key="p-encoding" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      A single movie on Netflix exists as{" "}
      <strong className="text-slate-700 dark:text-slate-300">dozens of encoded variants</strong>.
      The encoding farm produces a{" "}
      <strong className="text-slate-700 dark:text-slate-300">bitrate ladder</strong> — a set of
      resolution × bitrate pairs that the ABR algorithm can switch between.
    </p>,
    <Table
      key="tbl-ladder"
      headers={["Resolution", "Typical Bitrate", "Use Case"]}
      rows={[
        [
          "426 × 240",
          "~300 kbps",
          "Extremely constrained mobile networks (2G/3G edge cases)",
        ],
        ["640 × 360", "~700 kbps", "Low-bandwidth mobile, background tabs"],
        [
          "1280 × 720",
          "~3 Mbps",
          "Standard HD — most common quality on mobile Wi-Fi",
        ],
        [
          "1920 × 1080",
          "~5–8 Mbps",
          "Full HD — default for desktop and smart TV",
        ],
        [
          "3840 × 2160 (4K)",
          "~15–25 Mbps",
          "Ultra HD — requires fast, stable connection and HEVC/AV1",
        ],
        [
          "4K HDR (Dolby Vision)",
          "~20–40 Mbps",
          "Premium tier — HDR metadata adds overhead",
        ],
      ]}
    />,
    <Grid key="grid-encode" cols={2} gap={6}>
      <FeatureCard
        icon={Film}
        title="Per-Title Encoding"
        subtitle="Netflix's signature optimization"
        theme="emerald"
      >
        <p className="mt-2 text-sm leading-relaxed text-emerald-700 dark:text-emerald-300/80">
          <strong className="text-emerald-700 dark:text-emerald-400">Netflix</strong>
          &nbsp;analyzes each title's visual complexity (action scenes need more
          bits than static dialogue) and builds a{" "}
          <strong className="text-emerald-700 dark:text-emerald-400">
            custom bitrate ladder per movie
          </strong>
          .&nbsp;
          <SourceMarker vendor="Netflix Tech Blog" /> An animated show might
          look great at 1080p / 4 Mbps, while a fast-paced thriller needs 8 Mbps
          for the same perceptual quality. This saves bandwidth without quality
          loss.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Layers}
        title="Per-Shot Encoding"
        subtitle="The next evolution"
        theme="amber"
      >
        <p className="mt-2 text-sm leading-relaxed text-amber-700 dark:text-amber-300/80">
          Netflix extended per-title to{" "}
          <strong className="text-amber-700 dark:text-amber-400">per-shot</strong>: each scene cut
          gets its own optimal bitrate.&nbsp;
          <SourceMarker vendor="Netflix Tech Blog" year={2018} /> A dark
          dialogue scene encodes at 1.5 Mbps while the explosion that follows
          gets 12 Mbps — both at 1080p. The manifest stitches them together
          seamlessly.
        </p>
      </FeatureCard>
    </Grid>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 3 — CODECS                                                 */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-codecs" className="text-xl font-bold mt-8 mb-4">
      Video Codecs: The Compression Battle
    </h3>,
    <p key="p-codecs" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      The codec determines how efficiently bits represent visual information. A
      better codec means the same quality at fewer bits — or higher quality at
      the same bandwidth.
    </p>,
    <Table
      key="tbl-codecs"
      headers={[
        "Codec",
        "Era",
        "Compression Efficiency vs H.264",
        "Hardware Decode Support",
        "Licensing",
      ]}
      rows={[
        [
          "H.264 / AVC",
          "2003+",
          "Baseline (1×)",
          "Universal — every phone, TV, browser",
          "MPEG LA patent pool (fees apply)",
        ],
        [
          "H.265 / HEVC",
          "2013+",
          "~40–50% smaller files",
          "Most modern devices, but Safari/iOS leads; patchy on older Android",
          "Complex, expensive patent pools",
        ],
        [
          "VP9",
          "2013+",
          "~30–40% smaller files",
          "Chrome, Android, smart TVs — no Safari",
          "Royalty-free (Google)",
        ],
        [
          "AV1",
          "2018+",
          "~50–60% smaller files",
          "Growing — new phones, browsers, GPUs (2022+)",
          "Royalty-free (Alliance for Open Media)",
        ],
      ]}
    />,
    <Callout key="call-codec" type="tip" title="Why This Matters For Your Buffer">
      If your device can hardware-decode AV1, Netflix can send a{" "}
      <strong>50% smaller file</strong> at the same visual quality. That means
      4K streaming at ~12 Mbps instead of ~25 Mbps with H.264. On a congested
      Wi-Fi network, that is the difference between smooth playback and constant
      buffering.
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 4 — HLS vs DASH                                            */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-protocols" className="text-xl font-bold mt-8 mb-4">
      Streaming Protocols: HLS vs DASH
    </h3>,
    <p
      key="p-protocols"
      className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed"
    >
      Two protocols dominate adaptive streaming. Both work similarly — manifest
      + segments over HTTP — but differ in ecosystem, DRM, and flexibility.
    </p>,
    <Grid key="grid-protocols" cols={2} gap={6}>
      <FeatureCard
        icon={Play}
        title="HLS (HTTP Live Streaming)"
        subtitle="Apple's protocol — the industry default"
        theme="cyan"
      >
        <ul className="mt-2 text-sm text-cyan-700 dark:text-cyan-300/80 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">Origin:</strong> Created by Apple
            for iOS in 2009.&nbsp;
            <SourceMarker vendor="Apple" spec="RFC 8216" />
          </li>
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">Manifest:</strong>{" "}
            <code className="text-cyan-700 dark:text-cyan-400">.m3u8</code> playlist files
            (plain-text, line-based)
          </li>
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">Segments:</strong> Typically{" "}
            <code className="text-cyan-700 dark:text-cyan-400">.ts</code> (MPEG-TS) or{" "}
            <code className="text-cyan-700 dark:text-cyan-400">.fmp4</code> (fragmented MP4)
          </li>
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">Default segment:</strong> 6
            seconds (Apple recommendation), often tuned to 2–4s for lower
            latency
          </li>
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">DRM:</strong> FairPlay (Apple
            ecosystem), Widevine via fMP4
          </li>
          <li>
            <strong className="text-cyan-700 dark:text-cyan-400">Support:</strong> Native on
            Safari, iOS, macOS; via hls.js on Chrome, Firefox, Edge
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Radio}
        title="DASH (Dynamic Adaptive Streaming over HTTP)"
        subtitle="The open standard"
        theme="violet"
      >
        <ul className="mt-2 text-sm text-violet-700 dark:text-violet-300/80 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-violet-700 dark:text-violet-400">Origin:</strong> ISO/IEC
            standard, MPEG-DASH.&nbsp;
            <SourceMarker spec="ISO 23009-1" />
          </li>
          <li>
            <strong className="text-violet-700 dark:text-violet-400">Manifest:</strong>{" "}
            <code className="text-violet-700 dark:text-violet-400">.mpd</code> (XML-based Media
            Presentation Description)
          </li>
          <li>
            <strong className="text-violet-700 dark:text-violet-400">Segments:</strong> Fragmented
            MP4 (<code className="text-violet-700 dark:text-violet-400">.m4s</code>) with
            initialization segments
          </li>
          <li>
            <strong className="text-violet-700 dark:text-violet-400">Default segment:</strong> 2–6
            seconds, fully configurable
          </li>
          <li>
            <strong className="text-violet-700 dark:text-violet-400">DRM:</strong> Widevine (Google),
            PlayReady (Microsoft) via CENC
          </li>
          <li>
            <strong className="text-violet-700 dark:text-violet-400">Support:</strong> Chrome,
            Firefox, Edge, smart TVs, Android — not Safari
          </li>
        </ul>
      </FeatureCard>
    </Grid>,
    <Table
      key="tbl-hls-dash"
      headers={[
        "Dimension",
        "HLS",
        "DASH",
        "What Breaks If You Ignore This",
      ]}
      rows={[
        [
          "Browser coverage",
          "Native Safari + hls.js everywhere else",
          "dash.js / Shaka Player — no Safari",
          "Choose wrong protocol → black screen on Apple or Android",
        ],
        [
          "Segment format",
          ".ts legacy, .fmp4 modern",
          ".m4s (fMP4 only)",
          ".ts segments waste ~15% more bytes than fMP4 due to container overhead",
        ],
        [
          "Latency floor",
          "LL-HLS: ~2–3s with Apple's partial segments",
          "LL-DASH: ~2–3s with chunked transfer",
          "Default HLS can be 15–30s behind live — fine for VOD, painful for sports",
        ],
        [
          "DRM ecosystem",
          "FairPlay (Apple only) + Widevine via fMP4",
          "Widevine + PlayReady via CENC",
          "Need both protocols to cover all devices with DRM content",
        ],
        [
          "Industry adoption",
          "~80% of streaming services ship HLS",
          "YouTube, Netflix (alongside HLS)",
          "HLS is the safer default; DASH adds flexibility for advanced use cases",
        ],
      ]}
    />,
    <Callout
      key="call-protocol-war"
      type="info"
      title="Why Netflix Uses Both"
    >
      Netflix serves <strong>HLS to Apple devices</strong> (Safari, iOS,
      Apple TV) and <strong>DASH to everything else</strong> (Chrome, Android,
      smart TVs, game consoles). This dual-protocol strategy is common at scale
      because no single protocol covers every DRM + device combination.&nbsp;
      <SourceMarker vendor="Netflix" />
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 5 — ABR ALGORITHMS                                         */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-abr" className="text-xl font-bold mt-8 mb-4">
      Adaptive Bitrate (ABR): The Brain of the Player
    </h3>,
    <p key="p-abr" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      ABR is why your video starts blurry and sharpens after a few seconds. The
      player continuously estimates what quality it can sustain without
      rebuffering, and switches quality between segments.
    </p>,
    <Grid key="grid-abr" cols={2} gap={6}>
      <FeatureCard
        icon={Gauge}
        title="Throughput-Based ABR"
        subtitle="Classic approach"
        theme="sky"
      >
        <p className="mt-2 text-sm leading-relaxed text-sky-700 dark:text-sky-300/80">
          Measures download speed of recent segments. If the last three 1080p
          segments downloaded at 8 Mbps and the next 1080p segment needs 5 Mbps,
          the algorithm stays at 1080p. If throughput drops to 3 Mbps, it drops
          to 720p immediately.
        </p>
        <p className="mt-2 text-sm text-sky-700 dark:text-sky-400/70">
          <strong className="text-sky-700 dark:text-sky-400">Weakness:</strong> Reacts after
          congestion is already happening — oscillates between qualities on
          unstable networks.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Activity}
        title="Buffer-Based ABR"
        subtitle="Netflix's BBA approach"
        theme="indigo"
      >
        <p className="mt-2 text-sm leading-relaxed text-indigo-700 dark:text-indigo-300/80">
          Instead of measuring speed, it watches the{" "}
          <strong className="text-indigo-700 dark:text-indigo-400">buffer level</strong>. When the
          buffer is deep (30+ seconds ahead), it picks higher quality. When the
          buffer drains toward empty, it aggressively drops quality.&nbsp;
          <SourceMarker vendor="Netflix" year={2014} />
        </p>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400/70">
          <strong className="text-indigo-700 dark:text-indigo-400">Advantage:</strong> More stable
          quality decisions — avoids the throughput estimation noise that causes
          oscillation.
        </p>
      </FeatureCard>
    </Grid>,
    <Card key="card-abr-hybrid" title="Modern Hybrid ABR" description="What platforms actually ship today">
      <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed mb-3">
        Production ABR algorithms combine both signals plus additional heuristics:
        device capability, content complexity metadata from encoding, viewer
        history (Netflix knows your typical bandwidth), and even time-of-day
        patterns. YouTube's ABR also factors in{" "}
        <strong className="text-muted-foreground">
          viewport size
        </strong>{" "}
        — there is no point streaming 4K to a 360p phone widget.
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
        <strong className="text-muted-foreground">Why it matters:</strong> A
        poorly tuned ABR algorithm causes the "quality yo-yo" where video
        flickers between sharp and blurry every few seconds — more annoying to
        viewers than consistently lower quality.
      </p>
    </Card>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 6 — CDN DELIVERY                                           */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-cdn" className="text-xl font-bold mt-8 mb-4">
      CDN & Delivery Architecture
    </h3>,
    <p key="p-cdn" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      Video segments are the heaviest assets on the internet. Netflix alone
      accounts for ~15% of global downstream internet traffic.&nbsp;
      <SourceMarker vendor="Sandvine" year={2023} /> The CDN layer is what makes
      this possible.
    </p>,
    <Grid key="grid-cdn" cols={2} gap={6}>
      <FeatureCard
        icon={Server}
        title="Netflix Open Connect"
        subtitle="Netflix's private CDN"
        theme="emerald"
      >
        <ul className="mt-2 text-sm text-emerald-700 dark:text-emerald-300/80 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-emerald-700 dark:text-emerald-400">
              Custom hardware appliances
            </strong>
            &nbsp;deployed inside ISP data centers worldwide
          </li>
          <li>
            Each box holds ~200 TB+ of flash storage with the most popular
            content pre-cached
          </li>
          <li>
            Off-peak hours: fill caches with predicted content using ML
            popularity models
          </li>
          <li>
            Peak hours: serve 90%+ of requests from within the ISP network
            — traffic never crosses the public internet
          </li>
          <li>
            <strong className="text-emerald-700 dark:text-emerald-400">Result:</strong> ~100 Gbps+
            served from a single appliance&nbsp;
            <SourceMarker vendor="Netflix Open Connect" />
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Server}
        title="YouTube's Google Edge"
        subtitle="Google's global edge network"
        theme="amber"
      >
        <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300/80 space-y-2 list-disc pl-4">
          <li>
            <strong className="text-amber-700 dark:text-amber-400">
              Google Global Cache (GGC)
            </strong>
            &nbsp;nodes inside ISPs, plus Google's own massive edge network
          </li>
          <li>
            Long-tail content (obscure videos) may not be edge-cached and
            requires origin fetch — causes slower initial playback
          </li>
          <li>
            YouTube aggressively transcodes to VP9/AV1 to reduce bandwidth cost
            at scale
          </li>
          <li>
            <strong className="text-amber-700 dark:text-amber-400">QUIC protocol:</strong>{" "}
            YouTube pioneered HTTP/3 (QUIC) for faster connection setup and
            multiplexed segment delivery&nbsp;
            <SourceMarker spec="RFC 9114" />
          </li>
        </ul>
      </FeatureCard>
    </Grid>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 7 — WHY THE SPINNER APPEARS                                */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-buffer" className="text-xl font-bold mt-8 mb-4">
      Why the Spinner Appears: Buffering Root Causes
    </h3>,
    <p key="p-buffer" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      The "spinning circle" means the player's buffer has{" "}
      <strong className="text-slate-700 dark:text-slate-300">drained to zero</strong> — it cannot
      play the next frame because the next segment has not arrived and been
      decoded yet. Here is every layer that can cause it:
    </p>,
    <Table
      key="tbl-buffer"
      headers={[
        "Layer",
        "Root Cause",
        "Symptom",
        "How to Diagnose",
      ]}
      rows={[
        [
          "Your network (Wi-Fi / LAN)",
          "Congested Wi-Fi, weak signal, packet loss, bandwidth < video bitrate",
          "Frequent stalls at all quality levels, slow initial load",
          "Run a speed test — if < 5 Mbps, 1080p will stall; < 25 Mbps, 4K will stall",
        ],
        [
          "ISP throttling",
          "ISP deprioritizes or rate-limits streaming traffic (peak hours)",
          "HD works at 2 AM but not at 8 PM; VPN fixes it",
          "Compare speed test to Netflix/YouTube specific speed (fast.com). If general speed is fine but streaming is slow, throttling is likely",
        ],
        [
          "CDN edge miss",
          "Requested segment not cached at nearest POP — origin fetch adds latency",
          "First few segments of a niche title load slowly, then stabilize",
          "Browser DevTools Network tab: check response headers for cache HIT vs MISS",
        ],
        [
          "ABR overshoot",
          "Algorithm picked a quality too high for current throughput",
          "Brief clear playback then sudden stall as buffer drains",
          "Quality indicator shows 4K/1080p but connection cannot sustain it",
        ],
        [
          "Server / origin overload",
          "Platform infrastructure under pressure (major release, live event)",
          "Affects all users simultaneously, error pages appear",
          "Check platform status page, social media reports",
        ],
        [
          "Device decode bottleneck",
          "Old hardware cannot decode HEVC/AV1 in real time, or GPU driver issues",
          "Frame drops, stuttering even with buffer full, high CPU usage",
          "Check Task Manager / Activity Monitor — if CPU pegged at 100% during playback, decode is the bottleneck",
        ],
        [
          "DNS resolution delay",
          "Slow DNS lookup for CDN segment hostnames",
          "Playback starts very slowly, then runs fine",
          "Use DNS benchmarking tools; switch to 1.1.1.1 or 8.8.8.8",
        ],
      ]}
    />,
    <Callout
      key="call-buffer-key"
      type="warning"
      title="The #1 Cause: Network vs Bitrate Mismatch"
    >
      In the vast majority of cases, buffering is caused by your{" "}
      <strong>available bandwidth dropping below the video's bitrate</strong>.
      1080p needs ~5 Mbps sustained. 4K needs ~25 Mbps sustained. "Sustained"
      is the key word — a speed test showing 50 Mbps peak does not mean your
      Wi-Fi sustains 50 Mbps while your family streams on three other devices.
      Shared bandwidth, Wi-Fi interference, and ISP contention during peak hours
      are the most common culprits.
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 8 — ARCHITECTURE DEEP DIVE                                 */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-arch" className="text-xl font-bold mt-8 mb-4">
      Platform Architecture: How Netflix Serves 250M+ Subscribers
    </h3>,
    <Flow
      key="flow-netflix"
      steps={[
        {
          title: "1. Content Ingest",
          description:
            "Studios upload master files to Netflix's encoding pipeline. Each title gets per-shot analysis to determine scene complexity.",
        },
        {
          title: "2. Encoding Farm",
          description:
            "Thousands of cloud VMs transcode each shot into the optimal bitrate ladder across H.264, HEVC, VP9, and AV1. A single movie can produce 1,200+ encoded files.",
        },
        {
          title: "3. Open Connect Fill",
          description:
            "During off-peak hours, encoded segments are pushed to Open Connect Appliances (OCAs) inside ISP networks worldwide. Popular titles are everywhere; niche titles are placed based on ML predictions.",
        },
        {
          title: "4. Play Request",
          description:
            "User presses play → Netflix API (running on AWS) authenticates the user, selects the best OCA, and returns a manifest URL with segment locations pointing at the nearest OCA.",
        },
        {
          title: "5. Segment Streaming",
          description:
            "The player fetches segments directly from the OCA inside the user's ISP. 90%+ of bytes never cross the public internet. ABR adjusts quality segment-by-segment.",
        },
        {
          title: "6. Telemetry Loop",
          description:
            "The player reports buffer health, bitrate switches, rebuffer events, and start time back to Netflix. This data feeds into ABR tuning and CDN placement decisions.",
        },
      ]}
    />,
    <Callout key="call-arch" type="info" title="Control Plane vs Data Plane">
      Netflix uses <strong>AWS for the control plane</strong> (user auth, API,
      recommendations, billing, A/B testing) but serves{" "}
      <strong>all video bytes from its own Open Connect CDN</strong>.&nbsp;
      <SourceMarker vendor="Netflix" /> This separation means an AWS outage
      might prevent you from logging in, but if you are already watching, the
      stream keeps flowing from the OCA.
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 9 — LIVE STREAMING DIFFERENCES                             */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-live" className="text-xl font-bold mt-8 mb-4">
      Live Streaming: A Harder Problem
    </h3>,
    <p key="p-live" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      VOD (Video on Demand) lets you pre-encode everything. Live streaming
      removes that luxury — encoding, segmenting, and distribution must happen{" "}
      <strong className="text-slate-700 dark:text-slate-300">in real time</strong>.
    </p>,
    <Table
      key="tbl-live-vod"
      headers={["Dimension", "VOD (Netflix, Disney+)", "Live (Twitch, YouTube Live, Sports)"]}
      rows={[
        [
          "Encoding time",
          "Hours to days — per-shot optimization possible",
          "Real-time — must encode as fast as frames arrive",
        ],
        [
          "CDN caching",
          "Segments pre-distributed to edge before anyone watches",
          "Segments must propagate to edge in real time — cache fill races playback",
        ],
        [
          "Latency tolerance",
          "Irrelevant (content is pre-recorded)",
          "Critical: 2–5s for sports, <1s for interactive/gaming",
        ],
        [
          "ABR startup",
          "Can buffer aggressively — 30s+ buffer before play",
          "Must start fast with minimal buffer to stay near live edge",
        ],
        [
          "Failure impact",
          "Rebuffer, then resume from where you were",
          "Miss the goal, the punchline, or the play — viewer frustration is orders of magnitude higher",
        ],
      ]}
    />,
    <Grid key="grid-live" cols={2} gap={6}>
      <FeatureCard
        icon={Zap}
        title="Low-Latency HLS (LL-HLS)"
        subtitle="Apple's live latency solution"
        theme="cyan"
      >
        <p className="mt-2 text-sm leading-relaxed text-cyan-700 dark:text-cyan-300/80">
          Instead of waiting for complete 6s segments, LL-HLS uses{" "}
          <strong className="text-cyan-700 dark:text-cyan-400">partial segments</strong> (~200ms
          parts) delivered via HTTP/2 push or blocking playlist
          reload.&nbsp;
          <SourceMarker vendor="Apple" version="HLS v12" /> Target latency:
          2–3 seconds from camera to screen.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Zap}
        title="Low-Latency DASH (LL-DASH)"
        subtitle="DASH's answer with CMAF"
        theme="violet"
      >
        <p className="mt-2 text-sm leading-relaxed text-violet-700 dark:text-violet-300/80">
          Uses{" "}
          <strong className="text-violet-700 dark:text-violet-400">
            CMAF chunked transfer encoding
          </strong>
          : the CDN starts forwarding a segment before the encoder finishes
          writing it. Combined with HTTP/1.1 chunked transfer or HTTP/2
          streaming, latency approaches 2–3 seconds.&nbsp;
          <SourceMarker spec="ISO 23000-19 (CMAF)" />
        </p>
      </FeatureCard>
    </Grid>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 10 — DRM                                                   */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-drm" className="text-xl font-bold mt-8 mb-4">
      DRM: Why Quality Depends on Your Browser
    </h3>,
    <p key="p-drm" className="text-sm text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
      You may have noticed Netflix caps quality at 720p on some browsers.
      This is <strong className="text-slate-700 dark:text-slate-300">DRM-enforced</strong>. The
      studio demands different protection levels depending on the device's
      trusted execution environment.
    </p>,
    <Table
      key="tbl-drm"
      headers={[
        "DRM System",
        "Max Quality on Browser",
        "Where It Runs",
        "Why the Limit Exists",
      ]}
      rows={[
        [
          "Widevine L1 (hardware)",
          "4K HDR",
          "Android certified devices, Chromebooks, smart TVs",
          "Decryption happens inside a hardware-protected TEE — content cannot be screen-captured",
        ],
        [
          "Widevine L3 (software)",
          "720p",
          "Chrome on desktop, Firefox",
          "Software-only decryption is trivially bypassable — studios refuse to send HD content",
        ],
        [
          "FairPlay",
          "4K HDR",
          "Safari, iOS, Apple TV, macOS",
          "Apple's hardware key chain protects content end-to-end",
        ],
        [
          "PlayReady SL3000",
          "4K HDR",
          "Edge on Windows, Xbox, certified smart TVs",
          "Hardware-backed DRM on Windows via Microsoft's trusted path",
        ],
      ]}
    />,
    <Callout
      key="call-drm"
      type="warning"
      title="The Chrome 720p Cap"
    >
      Netflix on Chrome desktop maxes out at{" "}
      <strong>720p</strong> because Chrome only supports Widevine L3
      (software DRM). Switch to the <strong>Netflix Windows app</strong>{" "}
      (PlayReady) or <strong>Safari/Edge</strong> to unlock 1080p or 4K. This is
      not a bug — it is a studio content protection requirement.
    </Callout>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 11 — COMMON MISTAKES                                       */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-mistakes" className="text-xl font-bold mt-8 mb-4">
      Common Misconceptions & Real Fixes
    </h3>,
    <MistakeCard
      key="mistake-1"
      number={1}
      title="Sufficient Bandwidth vs Streaming Buffer"
      problem="I have 100 Mbps internet, why is Netflix buffering?"
      solution="Your speed test measures peak download to a nearby server. Streaming quality depends on sustained throughput to the specific CDN edge, which can be bottlenecked by Wi-Fi congestion (too many devices on the same channel), router QoS settings, ISP peering congestion to Netflix/YouTube edge, or the 2.4 GHz vs 5 GHz band you are connected to. Try: (1) connect via Ethernet, (2) use 5 GHz Wi-Fi, (3) reduce concurrent devices, (4) check fast.com specifically for Netflix throughput."
    />,
    <MistakeCard
      key="mistake-2"
      number={2}
      title="Platform Outage vs Local Issues"
      problem="Buffering means the streaming platform's servers are down."
      solution="Server-side outages affect all users globally and show error pages, not spinners. A spinner on your end almost always means the next segment could not arrive before your buffer emptied — a local network or ISP issue. Check: can you stream fine on the same network from your phone? If yes, the issue is your device or its Wi-Fi connection, not the platform."
    />,
    <MistakeCard
      key="mistake-3"
      number={3}
      title="VPN Benefits for Streaming"
      problem="Using a VPN should improve streaming quality."
      solution="VPNs add latency and encryption overhead, reducing effective throughput. They can help only in one specific case: if your ISP is actively throttling streaming traffic (detectable via DPI). In that case, the VPN hides the traffic type. In all other cases, a VPN makes streaming worse."
    />,
    <MistakeCard
      key="mistake-4"
      number={4}
      title="Bandwidth Requirements for 4K"
      problem="4K streaming requires 100+ Mbps internet."
      solution="4K with AV1 needs ~12–15 Mbps. 4K with HEVC needs ~15–25 Mbps. 4K with H.264 needs ~25–40 Mbps. Most 25 Mbps connections handle 4K fine with modern codecs — the bottleneck is usually Wi-Fi stability, not raw speed."
    />,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 12 — WAR STORY                                             */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-war" className="text-xl font-bold mt-8 mb-4">
      War Story: The Super Bowl Streaming Catastrophe
    </h3>,
    <FeatureCard
      key="fc-war"
      icon={AlertTriangle}
      title="Fox Sports Super Bowl LIII Stream (2019)"
      subtitle="When CDN capacity meets unpredictable demand"
      theme="rose"
    >
      <p className="mt-2 text-sm leading-relaxed text-rose-700 dark:text-rose-300/80">
        Fox streamed Super Bowl LIII to millions of concurrent viewers. During
        halftime, viewers who had paused their streams all resumed
        simultaneously, creating a{" "}
        <strong className="text-rose-700 dark:text-rose-400">
          thundering herd of segment requests
        </strong>
        &nbsp;that exceeded CDN edge capacity in multiple regions. The result:
        widespread rebuffering, quality drops to 240p, and complete stream
        failures lasting 30–60+ seconds during the most-watched event of the
        year.
      </p>
      <p className="mt-3 text-sm text-rose-700 dark:text-rose-400/70">
        <strong className="text-rose-700 dark:text-rose-400">Lesson:</strong> Live streaming at
        massive scale requires pre-warmed CDN capacity, predictive auto-scaling,
        and fallback origin paths. The encoding pipeline was fine — the delivery
        layer buckled under coordinated demand spikes.
      </p>
    </FeatureCard>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 13 — PERFORMANCE OPTIMIZATION                              */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-perf" className="text-xl font-bold mt-8 mb-4">
      How to Improve Streaming Performance
    </h3>,
    <Grid key="grid-perf-viewer" cols={1} gap={6}>
      <Card
        title="For Viewers (Consumer-Side Fixes)"
        description="Things you can control right now"
      >
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            <strong>Use 5 GHz Wi-Fi or Ethernet</strong> — 2.4 GHz suffers from
            interference from microwaves, Bluetooth, and neighbors
          </li>
          <li>
            <strong>Reduce concurrent devices</strong> — four simultaneous 4K
            streams need 60–100 Mbps sustained
          </li>
          <li>
            <strong>Enable router QoS</strong> — prioritize streaming traffic
            over bulk downloads
          </li>
          <li>
            <strong>Use the native app, not the browser</strong> — apps get
            hardware DRM (= higher quality) and optimized decoders
          </li>
          <li>
            <strong>Update GPU drivers</strong> — hardware decode for AV1/HEVC
            requires recent drivers
          </li>
          <li>
            <strong>Lower quality manually</strong> — if your connection is
            marginal, locking to 720p prevents ABR oscillation and delivers
            smoother playback than constantly chasing 1080p
          </li>
          <li>
            <strong>Switch DNS</strong> — slow DNS resolution delays initial
            segment fetches; use Cloudflare 1.1.1.1 or Google 8.8.8.8
          </li>
        </ul>
      </Card>
    </Grid>,
    <Grid key="grid-perf-eng" cols={1} gap={6}>
      <Card
        title="For Engineers (Platform-Side Optimizations)"
        description="How streaming platforms reduce buffering"
      >
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            <strong>Multi-CDN strategy</strong> — route to the fastest CDN per
            user session, failover if one CDN is congested
          </li>
          <li>
            <strong>Predictive prefill</strong> — use ML to predict what content
            will be popular and pre-cache it on edge nodes before demand spikes
          </li>
          <li>
            <strong>Shorter segments</strong> — 2s segments reduce startup
            latency and allow faster ABR adaptation vs 10s segments
          </li>
          <li>
            <strong>CMAF + chunked encoding</strong> — begin transmitting
            segments before encoding finishes (critical for live)
          </li>
          <li>
            <strong>AV1 adoption</strong> — 50% bandwidth reduction at same
            quality means cheaper CDN bills and fewer rebuffers on slow
            connections
          </li>
          <li>
            <strong>Server-side ABR hints</strong> — the CDN can observe its own
            congestion and hint the client to downshift before the client detects
            throughput loss
          </li>
          <li>
            <strong>Pre-roll buffer tuning</strong> — Netflix targets ~5s buffer
            before playback starts; YouTube starts at ~2s for faster perceived
            startup
          </li>
        </ul>
      </Card>
    </Grid>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 14 — MANIFEST EXAMPLES                                     */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-manifest" className="text-xl font-bold mt-8 mb-4">
      What a Manifest Looks Like
    </h3>,
    <Grid key="grid-manifests" cols={2} gap={6}>
      <FeatureCard
        icon={Eye}
        title="HLS Master Playlist"
        subtitle=".m3u8 manifest"
        theme="cyan"
      >
        <CodeBlock
          theme="cyan"
          title="master.m3u8"
          language="text"
          code={`#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1280x720
720p/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=8000000,RESOLUTION=1920x1080
1080p/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=15000000,RESOLUTION=3840x2160
4k/playlist.m3u8`}
        />
        <p className="mt-2 text-xs text-cyan-700 dark:text-cyan-400/60">
          The player reads BANDWIDTH values and picks the highest one sustainable
          on the current connection.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Eye}
        title="DASH MPD (simplified)"
        subtitle=".mpd manifest"
        theme="violet"
      >
        <CodeBlock
          theme="violet"
          title="stream.mpd"
          language="xml"
          code={`<MPD type="static" mediaPresentationDuration="PT1H30M">
  <Period>
    <AdaptationSet mimeType="video/mp4">
      <Representation id="360p" bandwidth="800000"
        width="640" height="360">
        <SegmentTemplate media="360p/seg-$Number$.m4s"
          duration="4" />
      </Representation>
      <Representation id="1080p" bandwidth="8000000"
        width="1920" height="1080">
        <SegmentTemplate media="1080p/seg-$Number$.m4s"
          duration="4" />
      </Representation>
    </AdaptationSet>
  </Period>
</MPD>`}
        />
        <p className="mt-2 text-xs text-violet-700 dark:text-violet-400/60">
          XML-based, more verbose but more flexible than HLS for advanced
          features like multi-period content and ad insertion.
        </p>
      </FeatureCard>
    </Grid>,

    /* ──────────────────────────────────────────────────────────────────── */
    /*  SECTION 15 — DECISION FRAME                                        */
    /* ──────────────────────────────────────────────────────────────────── */
    <h3 key="h-decision" className="text-xl font-bold mt-8 mb-4">
      How to Pick: Protocol, Codec & Architecture Decisions
    </h3>,
    <Table
      key="tbl-decision"
      headers={[
        "Decision",
        "When to Pick Option A",
        "When to Pick Option B",
        "What Breaks If You Choose Wrong",
      ]}
      rows={[
        [
          "HLS vs DASH",
          "HLS: need Apple device support, simpler toolchain, wider CDN compatibility",
          "DASH: need advanced ad insertion, multi-DRM without FairPlay, ISO standard compliance",
          "HLS-only: no native Safari DASH support. DASH-only: no iOS support",
        ],
        [
          "H.264 vs AV1",
          "H.264: universal device support required, short-lived content not worth re-encoding",
          "AV1: bandwidth-constrained users, long-lived catalog, CDN cost matters at scale",
          "AV1-only: old devices show black screen. H.264-only: 2× CDN cost at scale, poor quality at low bitrates",
        ],
        [
          "Own CDN vs Third-Party CDN",
          "Own (Open Connect model): 100M+ users, ISP negotiation leverage, predictable traffic patterns",
          "Third-party (Akamai, CloudFront): startup, unpredictable traffic, global reach without ops team",
          "Own CDN too early: massive CapEx wasted. Third-party at Netflix scale: CDN bills exceed infrastructure cost",
        ],
        [
          "Short segments (2s) vs Long segments (6s+)",
          "Short: live streaming, fast ABR adaptation, lower latency required",
          "Long: VOD catalog, reduce manifest overhead, better compression efficiency per segment",
          "Short for everything: HTTP request overhead at scale. Long for live: 15–30s latency unacceptable for sports",
        ],
      ]}
    />,
    <Callout key="call-summary" type="tip" title="The Big Picture">
      Video streaming is not just "downloading a file fast." It is a{" "}
      <strong>real-time negotiation</strong> between the encoder's output, the
      CDN's proximity, the network's capacity, the ABR algorithm's predictions,
      and the device's decode capability. When any single layer falls behind,
      the buffer drains and the spinner appears. The platforms winning this game
      — Netflix, YouTube — invest billions into custom CDNs, codec research,
      and per-shot encoding not for vanity, but because each 1% efficiency gain
      at their scale saves hundreds of millions in bandwidth costs and
      prevents millions of rebuffer events.
    </Callout>,
  ],
};
