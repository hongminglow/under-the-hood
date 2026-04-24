import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Globe, Route, ShieldCheck, Zap } from "lucide-react";

export const cdnUnderTheHoodTopic: Topic = {
  id: "cdn-under-the-hood",
  title: "CDN Under the Hood",
  description:
    "How Cloudflare-style edge networks intercept traffic, use anycast IPs, cache content near users, and still forward misses back to your real origin server.",
  tags: ["networking", "performance", "caching", "cloudflare", "cdn"],
  icon: "Globe",
  content: [
    <p key="1">
      A <strong>Content Delivery Network (CDN)</strong> is a globally
      distributed layer of edge servers that can sit{" "}
      <strong>in front of your real infrastructure</strong>. It does not replace
      the idea of an origin by magic. Instead, it becomes the first machine the
      user usually talks to, and then decides whether it can answer from a
      nearby cache or whether it must fetch from your real backend or static
      origin.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Mental Model Most People Need
    </h3>,
    <Table
      key="3"
      headers={["Layer", "What It Does", "Example In Your Stack"]}
      rows={[
        [
          "Registrar",
          "Lets you own the domain name and choose nameservers.",
          "Cloudflare Registrar or another registrar",
        ],
        [
          "DNS",
          "Answers which IP or hostname the domain should resolve to.",
          "Cloudflare DNS record for `api.example.com`",
        ],
        [
          "CDN / Proxy",
          "Receives user traffic first, terminates TLS, caches when possible, and forwards misses.",
          "Cloudflare edge POP",
        ],
        [
          "Origin",
          "The real place the uncached request eventually goes.",
          "AWS EC2 instance",
        ],
        [
          "Reverse proxy",
          "Routes requests inside your origin box or cluster.",
          "NGINX on the EC2 VM",
        ],
        [
          "App runtime",
          "Actually runs your code.",
          "Docker container behind NGINX",
        ],
      ]}
    />,
    <Callout key="4" type="tip" title="Your Cloudflare Stack Is Closer To This">
      <strong>User</strong>
      {" -> "}
      <strong>DNS resolution</strong>
      {" -> "}
      <strong>Cloudflare edge</strong>
      {" -> "}
      <strong>Cloudflare cache decision</strong>
      {" -> "}
      <strong>AWS EC2</strong>
      {" -> "}
      <strong>NGINX</strong>
      {" -> "}
      <strong>Docker container</strong>. The domain layer is not a box in the
      middle of that traffic path. It is the naming and routing control plane.
    </Callout>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Why The Same Hostname Can Reach The Nearest CDN Server
    </h3>,
    <p key="6">
      This is the part that feels strange at first: the domain may resolve to a{" "}
      <strong>
        Cloudflare IP that is advertised from many physical locations at once
      </strong>
      . That is not normal unicast routing to one machine. It is usually{" "}
      <strong>anycast</strong>.
    </p>,
    <Grid key="7" cols={2} gap={6}>
      <FeatureCard icon={Globe} title="Same IP, Many Places" subtitle="Anycast" theme="emerald">
        <p className="mt-2 text-sm leading-relaxed text-emerald-200/80">
          Multiple Cloudflare edge locations advertise the same public IP
          prefixes. Internet routers use BGP to send your packets toward the
          best topological path, which is often the nearest or best-connected
          Cloudflare point of presence.
        </p>
      </FeatureCard>
      <FeatureCard icon={Route} title="Not DNS Magic Alone" subtitle="Routing still matters" theme="teal">
        <p className="mt-2 text-sm leading-relaxed text-teal-200/80">
          DNS gives the browser an IP, but <strong className="text-teal-300">BGP path selection</strong>
          &nbsp;is what steers packets to a nearby edge server sharing that same
          IP. So “nearest CDN node” is a networking result, not just a DNS
          trick.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      What Happens When A User Opens Your Site Through Cloudflare
    </h3>,
    <Flow
      key="9"
      steps={[
        {
          title: "1. Resolver gets DNS answer",
          description:
            "The user's resolver asks for your hostname. Cloudflare DNS returns an IP that belongs to Cloudflare's edge network when the record is proxied.",
        },
        {
          title: "2. Internet routes to a POP",
          description:
            "BGP sends the packets to a nearby Cloudflare POP advertising that IP range.",
        },
        {
          title: "3. Edge terminates TLS",
          description:
            "Cloudflare completes the HTTPS handshake with the browser and now sees the HTTP request.",
        },
        {
          title: "4. Cache lookup happens",
          description:
            "Cloudflare checks whether the requested asset can be served from cache at the edge.",
        },
        {
          title: "5. Miss goes to origin",
          description:
            "If the object is not cacheable or the cache is cold, Cloudflare fetches from your EC2 origin.",
        },
        {
          title: "6. Origin chain continues",
          description:
            "Your EC2 box receives the request, NGINX routes it, and the Docker container returns the response.",
        },
      ]}
    />,
    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      Cache Hit vs Cache Miss In Your Exact Stack
    </h3>,
    <Table
      key="11"
      headers={[
        "Situation",
        "Where The Response Comes From",
        "Does EC2/NGINX/App Run?",
      ]}
      rows={[
        [
          "Static asset cache hit",
          "Cloudflare edge cache near the user",
          "No. Origin is bypassed for that request.",
        ],
        [
          "Static asset cache miss",
          "Cloudflare fetches from EC2 origin first, then stores result",
          "Yes, for the first miss or after expiration/purge.",
        ],
        [
          "Dynamic API request",
          "Usually origin, unless you explicitly cache API responses",
          "Yes. EC2, NGINX, and your app handle it.",
        ],
        [
          "Edge-generated logic",
          "Cloudflare edge runtime or rules engine",
          "Sometimes no, if the request is answered or blocked at the edge.",
        ],
      ]}
    />,
    <CodeBlock
      key="12"
      title="mental-model.txt"
      language="text"
      code={`Proxied Cloudflare request:
user browser
  -> DNS resolves hostname to Cloudflare edge IP
  -> nearby Cloudflare POP receives request
  -> cache lookup / WAF / TLS / rules
  -> if cache miss: forward to AWS EC2 origin
  -> NGINX on EC2
  -> Docker container app
  -> response returns through Cloudflare
  -> Cloudflare may cache and serve future requests locally`}
    />,
    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      Proxied Record vs DNS-Only Record
    </h3>,
    <Table
      key="14"
      headers={[
        "Mode",
        "DNS Returns",
        "Who The Browser Connects To",
        "CDN Behavior",
      ]}
      rows={[
        [
          "Proxied / orange cloud",
          "Cloudflare-owned edge IPs",
          "Cloudflare first",
          "Cloudflare can cache, inspect, filter, and forward to origin",
        ],
        [
          "DNS only / grey cloud",
          "Your origin IP or target hostname",
          "Your origin directly",
          "Cloudflare is only DNS here, not the traffic path",
        ],
      ]}
    />,
    <Callout key="15" type="warning" title="This Is The Key Distinction">
      If a Cloudflare record is <strong>proxied</strong>, the browser usually
      does <strong>not</strong> connect straight to your EC2 Elastic IP. It
      connects to Cloudflare first. Only Cloudflare then connects to your EC2
      origin behind the scenes.
    </Callout>,
    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      What Actually Gets Cached
    </h3>,
    <Grid key="17" cols={2} gap={6}>
      <FeatureCard icon={Zap} title="Commonly Cached" subtitle="Easy wins" theme="emerald">
        <p className="mt-2 text-sm leading-relaxed text-emerald-200/80">
          Images, CSS, JS bundles, fonts, public static files, video segments,
          and versioned assets with long cache headers are the classic CDN wins.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={ShieldCheck}
        title="More Dangerous To Cache"
        subtitle="Needs deliberate rules"
        theme="amber"
      >
        <p className="mt-2 text-sm leading-relaxed text-amber-200/80">
          Personalized HTML, authenticated dashboards, cart state, and many API
          responses can go wrong if cached blindly because the response may be
          user-specific or short-lived.
        </p>
      </FeatureCard>
    </Grid>,
    <Table
      key="18"
      headers={["Header / Signal", "Who It Influences", "Why It Matters"]}
      rows={[
        [
          "`Cache-Control: max-age=...`",
          "Browser cache primarily",
          "Tells the browser how long it can reuse the asset.",
        ],
        [
          "`Cache-Control: s-maxage=...`",
          "Shared caches like CDNs",
          "Lets CDN and browser behave differently.",
        ],
        [
          "`ETag` / `Last-Modified`",
          "Browser and intermediary validation",
          "Supports conditional revalidation instead of full download.",
        ],
        [
          "`stale-while-revalidate`",
          "Cache strategy",
          "Allows old content to be served while a new copy is fetched.",
        ],
      ]}
    />,
    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      Why Cloudflare Can Feel Like DNS Provider, Registrar, And CDN At Once
    </h3>,
    <Table
      key="20"
      headers={[
        "Cloudflare Role",
        "What It Means",
        "Same Company, Different Layer",
      ]}
      rows={[
        [
          "Registrar",
          "You buy or transfer the domain to Cloudflare Registrar.",
          "Ownership and renewal layer",
        ],
        [
          "DNS provider",
          "Cloudflare authoritative nameservers answer record queries.",
          "Control plane for hostname resolution",
        ],
        [
          "CDN / reverse proxy",
          "Cloudflare edge receives and handles proxied traffic.",
          "Data plane for real request handling",
        ],
      ]}
    />,
    <p key="21">
      This is why the product can feel confusing. One dashboard may expose all
      three layers, but they are still conceptually different jobs. The
      registrar manages the <strong>name ownership</strong>. DNS answers{" "}
      <strong>where traffic should go</strong>. The CDN/proxy handles{" "}
      <strong>actual request traffic</strong>.
    </p>,
    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      Beyond Caching
    </h3>,
    <Grid key="23" cols={2} gap={6}>
      <FeatureCard icon={ShieldCheck} title="Security & Filtering" subtitle="Edge before origin" theme="cyan">
        <p className="mt-2 text-sm leading-relaxed text-cyan-200/80">
          Cloudflare can enforce WAF rules, block bad bots, rate-limit abusive
          clients, inspect paths, and sometimes stop attacks before they ever
          touch your EC2 box.
        </p>
      </FeatureCard>
      <FeatureCard icon={Zap} title="Edge Logic" subtitle="Not just static caching" theme="sky">
        <p className="mt-2 text-sm leading-relaxed text-sky-200/80">
          Modern CDNs can rewrite headers, redirect traffic, verify tokens,
          resize images, personalize simple logic, or run edge code without
          waking your main origin for every request.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="24" type="tip" title="The Real Picture">
      A CDN does not merely “return cache.” It is often a global programmable
      front door with{" "}
      <strong>
        anycast routing, TLS termination, cache storage, request filtering, and
        origin forwarding
      </strong>
      . Caching is only one of its jobs.
    </Callout>,
    <h3 key="25" className="text-xl font-bold mt-8 mb-4">
      The Best Mental Model
    </h3>,
    <p key="26">
      If you use Cloudflare with EC2, NGINX, and Docker, the browser usually
      reaches <strong>Cloudflare first</strong>, not your Elastic IP directly.
      Cloudflare then decides: <strong>serve cached content nearby</strong>,
      <strong>run edge rules</strong>, or{" "}
      <strong>forward to your origin</strong>. The reason the same hostname can
      reach a nearby server is that the request is routed onto Cloudflare’s
      anycast network, where many edge POPs advertise the same IP space and the
      internet sends the user to the best available edge path.
    </p>,
  ],
};
