import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const fullAppHostingDeploymentTopic: Topic = {
  id: "full-app-hosting-deployment",
  title: "Full App Hosting & Deployment Lifecycle",
  description:
    "The complete path from buying a domain to serving a live HTTPS application across multiple subdomains and deployment platforms.",
  tags: ["devops", "dns", "cloudflare", "deployment", "hosting"],
  icon: "Globe",
  content: [
    <p key="1">
      A successfully hosted app is not just "uploaded code". It is a chain of
      systems working together: <strong>domain registrar</strong>,{" "}
      <strong>DNS provider</strong>, <strong>CDN / reverse proxy</strong>,
      <strong>TLS certificates</strong>,{" "}
      <strong>application hosting platform</strong>, and your{" "}
      <strong>deployment pipeline</strong>. If one link is wrong, the site
      appears broken even when your code is perfectly fine.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Full Cycle
    </h3>,
    <Step key="3" index={1}>
      <strong>Buy a domain</strong> from a registrar like Namecheap, Porkbun,
      Cloudflare Registrar, or GoDaddy. This gives you ownership of a name like{" "}
      <code>example.com</code>.
    </Step>,
    <Step key="4" index={2}>
      <strong>Choose where DNS lives</strong>. Many teams move DNS to Cloudflare
      by changing the domain's <strong>nameservers</strong> at the registrar to
      Cloudflare's nameservers.
    </Step>,
    <Step key="5" index={3}>
      <strong>Create DNS records</strong> for your root domain and subdomains
      like <code>app.example.com</code>, <code>api.example.com</code>, and{" "}
      <code>admin.example.com</code>.
    </Step>,
    <Step key="6" index={4}>
      <strong>Connect each hostname to a real origin</strong>: a frontend host,
      backend VM, serverless function, Kubernetes ingress, or managed platform
      like Vercel, Railway, Fly, Render, or Cloudflare Workers.
    </Step>,
    <Step key="7" index={5}>
      <strong>Issue TLS certificates</strong> so HTTPS works. With Cloudflare,
      there may be a certificate at the edge <em>and</em> another certificate on
      the origin, depending on your SSL mode.
    </Step>,
    <Step key="8" index={6}>
      <strong>Deploy code</strong> from CI/CD or the hosting platform. Future
      deploys usually replace the artifact behind the same hostname without
      changing DNS again.
    </Step>,
    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Domain, DNS, Hosting: They Are Not the Same Thing
    </h3>,
    <Table
      key="10"
      headers={["Layer", "What It Does", "Example"]}
      rows={[
        [
          "Registrar",
          "Sells and legally registers the domain name",
          "You buy `example.com` from Namecheap or Cloudflare Registrar",
        ],
        [
          "DNS Provider",
          "Answers the question: 'Which IP or hostname should this domain point to?'",
          "Cloudflare DNS says `api.example.com` points to a backend origin",
        ],
        [
          "Hosting Platform",
          "Runs your application code or serves your built files",
          "Vercel for frontend, Railway/Render/Fly for backend, S3 for assets",
        ],
        [
          "CDN / Proxy",
          "Sits in front of the origin for caching, routing, WAF, and TLS termination",
          "Cloudflare orange-cloud proxy, NGINX, AWS ALB",
        ],
      ]}
    />,
    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      A Typical Monorepo Setup with Subdomains
    </h3>,
    <Table
      key="12"
      headers={[
        "Subdomain",
        "Monorepo App",
        "Typical Platform",
        "Why Split It",
      ]}
      rows={[
        [
          "example.com",
          "Marketing site / landing page",
          "Vercel, Netlify, static bucket, or Cloudflare Pages",
          "Fast static delivery, separate from app release cycle",
        ],
        [
          "app.example.com",
          "Main frontend",
          "Vercel, Cloudflare Pages, or a Node server",
          "Independent frontend deploys",
        ],
        [
          "api.example.com",
          "Backend API",
          "VM, container host, Kubernetes, Railway, Render, Fly, Workers",
          "Keeps API runtime separate from frontend hosting",
        ],
        [
          "admin.example.com",
          "Internal admin dashboard",
          "Same as frontend platform or separate locked-down app",
          "Different auth, traffic, and release cadence",
        ],
      ]}
    />,
    <CodeBlock
      key="13"
      title="mental-model.md"
      language="text"
      code={`
monorepo/
  apps/
    web/      -> app.example.com
    api/      -> api.example.com
    admin/    -> admin.example.com
    landing/  -> example.com
      `}
    />,
    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      What Happens When a User Opens `https://api.example.com`
    </h3>,
    <Step key="15" index={1}>
      The browser asks DNS: <code>Where is api.example.com?</code>
    </Step>,
    <Step key="16" index={2}>
      If Cloudflare is the DNS/proxy, the browser usually gets a{" "}
      <strong>Cloudflare edge IP</strong>, not your backend server's real IP.
    </Step>,
    <Step key="17" index={3}>
      The browser opens a TCP/QUIC connection and performs the{" "}
      <strong>TLS handshake</strong> with Cloudflare. The browser checks a
      certificate proving Cloudflare is allowed to serve{" "}
      <code>api.example.com</code>.
    </Step>,
    <Step key="18" index={4}>
      Cloudflare receives the HTTP request, inspects the hostname, applies WAF
      or cache rules, and forwards the request to the configured origin.
    </Step>,
    <Step key="19" index={5}>
      If you use Cloudflare SSL mode <strong>Full</strong> or{" "}
      <strong>Full (Strict)</strong>, Cloudflare also opens an HTTPS connection
      to your origin, which may need its <strong>own certificate</strong>.
    </Step>,
    <Step key="20" index={6}>
      Your backend responds. Cloudflare sends the response back to the browser,
      possibly caching static assets at the edge.
    </Step>,
    <Callout key="21" type="tip" title="This Is Why the Flow Feels Confusing">
      With a proxied setup, the browser is often not talking directly to your
      real server at all. It talks to <strong>Cloudflare first</strong>, and
      Cloudflare talks to your origin behind the scenes.
    </Callout>,
    <h3 key="22" className="text-xl font-bold mt-8 mb-4">
      Why HTTPS May Need More Than One Certificate
    </h3>,
    <Grid key="23" cols={2} gap={6}>
      <Card title="Edge Certificate" description="Browser -> Cloudflare">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          This certificate is presented to the user's browser. It proves the
          browser is securely talking to the hostname it requested, such as{" "}
          <code>app.example.com</code>.
        </p>
      </Card>
      <Card title="Origin Certificate" description="Cloudflare -> Your server">
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          If Cloudflare connects to your backend over HTTPS, the origin may also
          need a certificate. In <strong>Full (Strict)</strong>, Cloudflare
          validates that origin certificate instead of blindly trusting it.
        </p>
      </Card>
    </Grid>,
    <Table
      key="24"
      headers={[
        "Cloudflare SSL Mode",
        "Browser -> Cloudflare",
        "Cloudflare -> Origin",
        "Reality",
      ]}
      rows={[
        [
          "Flexible",
          "HTTPS",
          "HTTP only",
          "Works, but weak and not recommended for serious production setups",
        ],
        [
          "Full",
          "HTTPS",
          "HTTPS, but origin cert may be self-signed or loosely validated",
          "Better, but still less strict",
        ],
        [
          "Full (Strict)",
          "HTTPS",
          "HTTPS with a valid origin certificate",
          "Recommended production setup",
        ],
      ]}
    />,
    <h3 key="25" className="text-xl font-bold mt-8 mb-4">
      Common DNS Record Shapes
    </h3>,
    <Table
      key="26"
      headers={["Record Type", "Use It For", "Example"]}
      rows={[
        [
          "A",
          "Pointing a hostname directly to an IPv4 address",
          "`api.example.com -> 203.0.113.10`",
        ],
        [
          "AAAA",
          "Pointing directly to an IPv6 address",
          "`api.example.com -> 2001:db8::10`",
        ],
        [
          "CNAME",
          "Pointing one hostname to another hostname",
          "`app.example.com -> project.vercel.app`",
        ],
        [
          "TXT",
          "Verification or metadata",
          "Domain ownership verification for platform setup or email auth",
        ],
      ]}
    />,
    <Callout key="27" type="warning" title="Apex vs Subdomain">
      The root domain <code>example.com</code> is special. Some providers solve
      root-domain limitations with <strong>CNAME flattening</strong> or ANAME
      behavior, which is why apex routing often feels trickier than a normal
      subdomain like <code>app.example.com</code>.
    </Callout>,
    <h3 key="28" className="text-xl font-bold mt-8 mb-4">
      What a Deployment Usually Changes
    </h3>,
    <Table
      key="29"
      headers={["Layer", "Changes Often?", "Example"]}
      rows={[
        [
          "DNS records",
          "Rarely",
          "You usually configure them once unless you move platforms",
        ],
        [
          "Certificates",
          "Renew automatically if managed correctly",
          "Let's Encrypt or Cloudflare edge cert rotation",
        ],
        [
          "Application artifact",
          "Constantly",
          "Each git push builds and deploys a new version of `apps/web`",
        ],
        [
          "Environment variables / secrets",
          "Sometimes",
          "New API keys, DB URLs, or OAuth redirect URLs",
        ],
      ]}
    />,
    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Typical Production Flow After a Git Push
    </h3>,
    <Step key="31" index={1}>
      CI detects which monorepo app changed, such as <code>apps/web</code> or{" "}
      <code>apps/api</code>.
    </Step>,
    <Step key="32" index={2}>
      The platform builds that app only, using its own build command and
      environment variables.
    </Step>,
    <Step key="33" index={3}>
      The host publishes a new artifact: static files, a container image, or a
      serverless bundle.
    </Step>,
    <Step key="34" index={4}>
      The platform swaps live traffic to the new version, either instantly or
      with a rollout strategy.
    </Step>,
    <Step key="35" index={5}>
      The domain stays the same. Users still hit <code>app.example.com</code>;
      only the underlying deployed artifact changes.
    </Step>,
    <h3 key="36" className="text-xl font-bold mt-8 mb-4">
      The Full Mental Model
    </h3>,
    <p key="37">
      Buying a domain gives you the <strong>name</strong>. DNS tells the
      internet where that name should go. Cloudflare can sit in the middle as a
      <strong> global front door</strong>. TLS certificates secure the
      connection. Your hosting platform runs the real code. Deployment replaces
      the code behind the hostname while the DNS and domain identity usually
      stay the same.
    </p>,
  ],
};
