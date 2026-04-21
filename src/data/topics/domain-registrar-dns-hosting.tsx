import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const domainRegistrarDnsHostingTopic: Topic = {
  id: "domain-registrar-dns-hosting",
  title: "Domain Registrar vs DNS vs Hosting",
  description:
    "Why buying a domain is not the same as hosting a website, what registrars really do behind the scenes, and where the actual server fits in.",
  tags: ["devops", "dns", "hosting", "registrar", "web-infrastructure"],
  icon: "Globe",
  content: [
    <p key="1">
      One of the biggest beginner-to-intermediate infrastructure confusions is
      assuming that <strong>buying a domain</strong> means someone is now
      “hosting your website.” That is usually <strong>not</strong> what
      happened. A registrar mainly helps you <strong>reserve ownership of a
      public name</strong> like <code>myapp.com</code>. The real website is
      typically served by a different layer: a static host, a Node server, a
      VM, a container platform, a serverless runtime, or an edge network.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Clean Mental Model
    </h3>,
    <Table
      key="3"
      headers={["Layer", "What It Really Does", "What It Does Not Do"]}
      rows={[
        [
          "Registry",
          "Operates the top-level domain itself, such as `.com`, `.org`, or `.io`.",
          "It usually does not build or host your application.",
        ],
        [
          "Registrar",
          "Sells the right to register a domain name under a TLD and manages renewal/contact records.",
          "It does not automatically run your app code just because you bought the domain there.",
        ],
        [
          "DNS Provider",
          "Answers queries like `Where should api.myapp.com go?` by returning records.",
          "It does not necessarily serve HTML, APIs, or database-backed logic.",
        ],
        [
          "Hosting Platform",
          "Runs your application or serves your built static files.",
          "It does not own your domain unless it also happens to sell domains.",
        ],
        [
          "CDN / Reverse Proxy",
          "Sits in front of origins for caching, TLS, routing, WAF, or edge logic.",
          "It is not the same thing as domain ownership either.",
        ],
      ]}
    />,
    <Callout key="4" type="tip" title="The One-Sentence Answer">
      A domain is the <strong>name</strong>. DNS is the{" "}
      <strong>address book</strong>. Hosting is the{" "}
      <strong>place the app actually runs</strong>. A CDN or proxy is often
      the <strong>front door</strong> in between.
    </Callout>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Why Registrars Exist At All
    </h3>,
    <Grid key="6" cols={2} gap={6}>
      <Card title="Global Coordination" description="Names must be unique">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The internet cannot allow two unrelated people to both own{" "}
          <code>example.com</code> at the same time. Registrars exist as the
          retail layer that interacts with domain registries and standardized
          governance systems so name ownership stays globally unique.
        </p>
      </Card>
      <Card title="Operational Management" description="Renewals and records">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Registrars handle registration periods, renewals, transfer locks,
          nameserver updates, ownership/contact metadata, and policy-related
          operations so domain management is not done manually against each TLD
          operator.
        </p>
      </Card>
    </Grid>,
    <p key="7">
      Under the hood, the chain is usually:
      <strong> ICANN / policy ecosystem</strong>
      {" -> "}
      <strong>registry operator</strong>
      {" -> "}
      <strong>registrar</strong>
      {" -> "}
      <strong>you</strong>. The registrar is the commercial interface you use,
      but it is not the root authority over the whole internet. It is one
      participant in a larger naming system.
    </p>,
    <h3 key="7b" className="text-xl font-bold mt-8 mb-4">
      If It Sounds “Easy”, Why Doesn’t Everyone Become A Registrar?
    </h3>,
    <Table
      key="7c"
      headers={["Barrier", "Why It Stops Random Companies", "Reality"]}
      rows={[
        [
          "Accreditation and compliance",
          "Registrars operate inside policy, contractual, and abuse-handling frameworks.",
          "This is not just a weekend side project selling names from a spreadsheet.",
        ],
        [
          "Operational responsibility",
          "They must handle renewals, transfers, dispute processes, account recovery, and nameserver delegation reliably.",
          "A failure can take customer businesses offline.",
        ],
        [
          "Payments, fraud, and support",
          "Domains are a fraud-heavy, support-heavy business with global customers.",
          "Running the billing and recovery pipeline at scale is real operational work.",
        ],
        [
          "Thin margins and competition",
          "Domain registration alone is often not a giant-margin business.",
          "Many companies make more from upsells like hosting, DNS, email, or security.",
        ],
      ]}
    />,
    <Callout key="7d" type="warning" title="The Misleading Part">
      It can look easy because the customer sees a simple UI: search a name,
      pay money, done. Underneath that simple screen is a regulated,
      reliability-sensitive naming business with transfer flows, registry
      coordination, lifecycle management, and support burden.
    </Callout>,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      What A Registrar Actually Stores And Controls
    </h3>,
    <Table
      key="9"
      headers={["Responsibility", "What Happens Behind The Scenes", "Why It Matters"]}
      rows={[
        [
          "Domain registration",
          "The registrar submits or updates records with the relevant registry for your chosen TLD.",
          "This is what makes `myapp.com` legally delegated to your account.",
        ],
        [
          "Nameserver delegation",
          "The registrar stores which authoritative nameservers the domain should use.",
          "This is the handoff point that decides where DNS authority lives.",
        ],
        [
          "Renewal lifecycle",
          "The registrar tracks expiration, grace periods, auto-renew, redemption windows, and transfers.",
          "A forgotten renewal can break the whole site even if hosting is healthy.",
        ],
        [
          "Ownership metadata",
          "Contact and registration metadata are maintained, often exposed via RDAP rather than old WHOIS-only workflows.",
          "This affects transfers, recovery, and compliance.",
        ],
      ]}
    />,
    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      What Happens After You Buy `myapp.com`
    </h3>,
    <Flow
      key="11"
      steps={[
        {
          title: "1. Registration",
          description:
            "You pay a registrar, which registers the domain through the correct TLD ecosystem.",
        },
        {
          title: "2. Delegation",
          description:
            "You choose authoritative nameservers, either the registrar's DNS or another DNS provider like Cloudflare or Route 53.",
        },
        {
          title: "3. DNS records",
          description:
            "Inside that DNS provider, you create A, AAAA, CNAME, TXT, MX, or other records.",
        },
        {
          title: "4. Hosting connection",
          description:
            "Those DNS records point at a real origin such as a VM, container service, Pages host, serverless app, or edge platform.",
        },
        {
          title: "5. Request serving",
          description:
            "Users hit the hostname, DNS resolves it, and traffic reaches the platform actually serving your content or backend logic.",
        },
      ]}
    />,
    <h3 key="12" className="text-xl font-bold mt-8 mb-4">
      So Does A Website Need A “Server”?
    </h3>,
    <Table
      key="13"
      headers={["Hosting Style", "Is There A Server Somewhere?", "What You Manage"]}
      rows={[
        [
          "Shared hosting",
          "Yes. Usually one physical or virtual machine runs many customer sites.",
          "Very little. Upload files or a PHP app and the provider handles the rest.",
        ],
        [
          "VPS / VM",
          "Yes. You get a virtual machine with your own OS-level environment.",
          "You manage the web server, runtime, patching, and deployment.",
        ],
        [
          "Container / PaaS",
          "Yes. Containers or managed runtimes still execute on servers.",
          "You manage the app artifact; the platform manages much of the infrastructure.",
        ],
        [
          "Serverless functions",
          "Yes, but the platform hides the server lifecycle from you.",
          "You deploy functions, not the underlying fleet or scaling machinery.",
        ],
        [
          "Static hosting / CDN pages",
          "Yes. Static files still live on storage and are served by edge servers.",
          "Usually just the build output and domain mapping.",
        ],
        [
          "Edge compute",
          "Yes. Your code runs on distributed edge infrastructure rather than one obvious server box.",
          "You manage code and platform config, not machine provisioning.",
        ],
      ]}
    />,
    <Callout key="14" type="warning" title="Important Clarification">
      “No server” almost never means <strong>no machine exists</strong>. It
      means <strong>you are not directly managing the servers</strong>. The app
      still runs on someone’s compute, storage, and network infrastructure.
    </Callout>,
    <h3 key="15" className="text-xl font-bold mt-8 mb-4">
      Is The Registrar Using Its Own Server To Host Your Domain?
    </h3>,
    <Grid key="16" cols={2} gap={6}>
      <Card title="Sometimes They Also Offer Hosting" description="Bundled services exist">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Some registrars also sell shared hosting, WordPress hosting, email,
          or basic site builders. In those cases the same company may provide
          both the domain registration layer and the hosting layer.
        </p>
      </Card>
      <Card title="But Those Are Separate Roles" description="Same company, different job">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Even if one dashboard sells both, the jobs remain conceptually
          different. The registrar function controls the name. The hosting
          function serves the files or application logic behind that name.
        </p>
      </Card>
    </Grid>,
    <p key="17">
      So the correct answer is: <strong>sometimes yes, often no</strong>. A
      company like GoDaddy may sell you the domain and also try to sell hosting.
      A company like Cloudflare may control DNS and sit in front of the traffic
      even when the actual application is hosted on Vercel, Render, Railway,
      Fly.io, AWS, or your own VPS.
    </p>,
    <h3 key="17b" className="text-xl font-bold mt-8 mb-4">
      What People Mean By “DNS Hosting”
    </h3>,
    <Table
      key="17c"
      headers={["Phrase", "What It Actually Means", "What It Does Not Mean"]}
      rows={[
        [
          "DNS hosting",
          "A provider hosts the authoritative DNS zone and answers DNS queries for your domain.",
          "It does not automatically mean they host your web app or API.",
        ],
        [
          "Domain hosting",
          "Often used loosely in marketing to mean domain-related services.",
          "It is not a precise technical phrase like web hosting or DNS hosting.",
        ],
        [
          "Web hosting",
          "A provider serves your site files or runs your backend.",
          "It does not automatically imply domain registration ownership.",
        ],
      ]}
    />,
    <Callout key="17d" type="tip" title="Short Version">
      DNS hosting means <strong>they host the address book</strong>. Web
      hosting means <strong>they host the app or files</strong>. A registrar
      may sell you the name and then leave the hosting decision entirely to you
      unless you also buy another service from them.
    </Callout>,
    <h3 key="18" className="text-xl font-bold mt-8 mb-4">
      A Real Request Path: `https://app.myapp.com`
    </h3>,
    <Flow
      key="19"
      steps={[
        {
          title: "1. Browser asks DNS",
          description:
            "The browser needs to know where `app.myapp.com` should go.",
        },
        {
          title: "2. DNS answers",
          description:
            "The authoritative DNS provider returns an IP or target hostname, sometimes for a CDN/proxy rather than your origin directly.",
        },
        {
          title: "3. Browser connects",
          description:
            "The browser opens TCP or QUIC and completes the TLS handshake with the endpoint it reached.",
        },
        {
          title: "4. Edge or origin routes",
          description:
            "A CDN, reverse proxy, or platform router decides which app/service should handle that hostname.",
        },
        {
          title: "5. App responds",
          description:
            "Static files are returned directly, or backend logic executes and generates the response.",
        },
      ]}
    />,
    <CodeBlock
      key="20"
      title="dns-example.txt"
      language="text"
      code={`Registrar:
  domain: myapp.com
  nameservers:
    - ns1.cloudflare.com
    - ns2.cloudflare.com

DNS Provider:
  myapp.com        -> A      198.51.100.20
  www.myapp.com    -> CNAME  myapp.com
  app.myapp.com    -> CNAME  myteam.vercel.app
  api.myapp.com    -> A      203.0.113.10

Hosting:
  myapp.com        -> static frontend or reverse proxy
  app.myapp.com    -> frontend platform
  api.myapp.com    -> backend server or container service`}
    />,
    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      The Three Most Common Real-World Setups
    </h3>,
    <Table
      key="22"
      headers={["Setup", "Where The Code Lives", "Where DNS Lives", "Who Owns The Domain"]}
      rows={[
        [
          "All-in-one beginner setup",
          "Same provider's shared host or site builder",
          "Same provider",
          "Registrar account at same provider",
        ],
        [
          "Modern split setup",
          "Frontend on Vercel, backend on Render or Railway, assets on cloud storage",
          "Cloudflare or Route 53",
          "Namecheap, Porkbun, Cloudflare Registrar, etc.",
        ],
        [
          "Self-managed infra",
          "Your own VPS, Docker host, or Kubernetes cluster",
          "Cloudflare, Route 53, or registrar DNS",
          "Any registrar you choose",
        ],
      ]}
    />,
    <h3 key="23" className="text-xl font-bold mt-8 mb-4">
      Why Hosting Feels Magical On Platforms Like Vercel Or Netlify
    </h3>,
    <p key="24">
      These platforms compress many layers into one smooth workflow. You push
      code, they build it, publish the artifact, provision TLS, attach the
      domain, and operate the serving layer. That convenience can make it feel
      like “the domain just hosts the app,” but what is really happening is a
      managed stack is hiding <strong>servers, storage, routing, certificates,
      and global edge delivery</strong> behind a much simpler UI.
    </p>,
    <Grid key="25" cols={2} gap={6}>
      <Card title="What The Platform Abstracts" description="Infra you stop thinking about">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Build images, deployment rollouts, reverse proxies, TLS termination,
          cache headers, global replication, health checks, and often log or
          metrics plumbing.
        </p>
      </Card>
      <Card title="What Still Exists" description="The hidden machinery is still real">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          DNS records, routing tables, edge POPs, object storage, compute
          fleets, and some form of origin execution still exist even if you
          never SSH into a box.
        </p>
      </Card>
    </Grid>,
    <h3 key="26" className="text-xl font-bold mt-8 mb-4">
      Common Confusions And The Fix
    </h3>,
    <Table
      key="27"
      headers={["Confusion", "What Is Actually Wrong", "How To Think About It Correctly"]}
      rows={[
        [
          "I bought a domain, why is the site still offline?",
          "Ownership exists, but DNS or hosting is not configured yet.",
          "Buying the name and serving a site are separate steps.",
        ],
        [
          "I changed DNS but nothing happened immediately.",
          "Resolvers and caches may still hold older records until TTLs expire.",
          "DNS changes are distributed state, not instant truth everywhere.",
        ],
        [
          "My provider says serverless, so there is no server.",
          "The platform still runs your code on managed infrastructure.",
          "Serverless means no server management, not no compute machines.",
        ],
        [
          "Cloudflare is serving my site, so Cloudflare must be my host.",
          "Cloudflare may be proxying traffic while the real origin runs elsewhere.",
          "The front door and the actual origin can be different layers.",
        ],
      ]}
    />,
    <Callout key="28" type="success" title="The Best Mental Model">
      The registrar gives you the <strong>right to use the name</strong>. DNS
      tells the world <strong>where that name should point</strong>. Hosting
      provides the <strong>compute or storage that serves the app</strong>. A
      CDN or reverse proxy may stand in front to improve performance, TLS, and
      security. That is why one app can have one domain owner, another DNS
      provider, a third-party CDN, and a completely different hosting platform
      behind it.
    </Callout>,
  ],
};
