import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { Table } from "@/components/ui/Table";

export const cdnTopic: Topic = {
  id: "cdn-under-the-hood",
  title: "CDN Under the Hood",
  description:
    "How Content Delivery Networks serve your assets from servers just 20ms away — and why every system design answer should mention one.",
  tags: ["networking", "performance", "system-design", "caching"],
  icon: "Globe2",
  content: [
    <p key="1">
      Without a CDN, if your server is in Virginia and a user is in Singapore,
      every single image, CSS file, and JavaScript bundle travels{" "}
      <strong>16,000 km round-trip</strong> — adding{" "}
      <strong>200–400ms of latency</strong> per asset. A CDN caches your content
      on <strong>hundreds of edge servers worldwide</strong>, so that same
      Singapore user gets assets from a server <strong>just 20ms away</strong>.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      How a CDN Request Works
    </h4>,
    <Step key="3" index={1}>
      <strong>DNS Resolution:</strong> User requests{" "}
      <code>static.yourapp.com</code>. DNS resolves to the{" "}
      <strong>nearest CDN edge server</strong> (via Anycast or geo-DNS).
    </Step>,
    <Step key="4" index={2}>
      <strong>Cache Hit:</strong> If the edge server has a cached copy, it
      returns it <strong>immediately</strong>. Response time: 5–20ms.
    </Step>,
    <Step key="5" index={3}>
      <strong>Cache Miss:</strong> If not cached, the edge server fetches from
      the <strong>origin server</strong>, caches the response, then serves the
      user. Subsequent requests to that edge are served from cache.
    </Step>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Push CDN">
        <p className="text-sm">
          You <strong>upload content</strong> to the CDN proactively (during
          deploy). The CDN stores it permanently. Best for static assets that
          rarely change (logos, fonts, compiled JS bundles).
        </p>
      </Card>
      <Card title="Pull CDN">
        <p className="text-sm">
          The CDN <strong>fetches on first request</strong> and caches it. Best
          for dynamic or frequently updated content. Users experience a
          cold-start penalty on the first request only.
        </p>
      </Card>
    </Grid>,
    <Table
      key="7"
      headers={["Feature", "Without CDN", "With CDN"]}
      rows={[
        ["Latency (Singapore→Virginia)", "200-400ms", "5-20ms"],
        ["Origin Server Load", "Handles every request", "Only cache misses"],
        ["DDoS Protection", "Vulnerable", "CDN absorbs attack traffic"],
        ["SSL Handshake", "Full round-trip to origin", "Terminates at edge"],
        ["Global Availability", "Single region", "200+ edge locations"],
      ]}
    />,
    <Callout key="8" type="tip" title="Cache Invalidation: The Hard Problem">
      <em>
        "There are only two hard things in computer science: cache invalidation
        and naming things."
      </em>{" "}
      CDNs use <strong>TTL (Time To Live)</strong> headers to auto-expire cache,
      or <strong>cache busting</strong> (appending content hashes to filenames
      like <code>app.3f2a1b.js</code>). Purge APIs allow manual cache
      invalidation. In system design interviews, always discuss your CDN
      invalidation strategy.
    </Callout>,
  ],
};
