import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Highlight } from "@/components/ui/Highlight";
import { Step } from "@/components/ui/Step";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const corsTopic: Topic = {
  id: "cors",
  title: "Browser CORS Policy",
  description:
    "An intricate exploration of the protocol governing how browser-based applications safely negotiate and enforce cross-origin HTTP boundary access.",
  tags: ["security", "sop", "cors", "http"],
  icon: "Lock",
  content: [
    <p key="1">
      By default, web browsers strictly enforce the{" "}
      <strong>Same-Origin Policy (SOP)</strong>. If a script on{" "}
      <code>https://cats.com</code> tries to read data from{" "}
      <code>https://dogs.com</code>, the browser aggressively blocks the
      request. This prevents malicious scripts from hijacking a user's
      authenticated session on other websites.
    </p>,
    <p key="2">
      <strong>Cross-Origin Resource Sharing (CORS)</strong> is an HTTP-header
      based safety relaxation mechanism of the SOP. It allows your server to
      officially "allow-list" specific consumer origins.
    </p>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      When does CORS apply?
    </h4>,
    <p key="4">
      CORS applies to cross-origin requests. An origin is defined by the
      combination of its <strong>Scheme/Protocol</strong> (<code>https://</code>
      ), <strong>Host</strong> (<code>example.com</code>), and{" "}
      <strong>Port</strong> (<code>:443</code>).
    </p>,
    <Grid key="5" cols={2} gap={6} className="my-6">
      <Card title="Same Origin" description="Allowed by Default">
        <code>http://foo.com/app</code> talking to{" "}
        <code>http://foo.com/api</code>
      </Card>
      <Card title="Cross Origin" description="Blocked without CORS Headers">
        <code>https://foo.com</code> talking to <code>http://foo.com</code>{" "}
        (differing protocol) or <code>https://api.foo.com</code> (differing
        subdomain).
      </Card>
    </Grid>,
    <h4 key="6" className="text-xl font-bold mt-8 mb-4">
      The Preflight Request (OPTIONS)
    </h4>,
    <Callout key="7" type="info" title="What is a preflight?">
      Certain types of HTTP requests could permanently alter server state (like
      a DELETE or an authenticated POST). The browser won't just fire the
      request and hope; it first asks for permission via an{" "}
      <strong>OPTIONS</strong> request.
    </Callout>,
    <Step key="8" index={1}>
      <strong>The Browser Ask:</strong> The browser pauses the actual API call
      and fires a preflight <code>OPTIONS</code> request containing headers like{" "}
      <code>Origin</code> and <code>Access-Control-Request-Method</code>.
    </Step>,
    <Step key="9" index={2}>
      <strong>The Server Response:</strong> The API server examines the headers.
      If it trusts the origin, it responds with an empty 204 No Content or 200
      OK. The crucial part of the response is the{" "}
      <code>Access-Control-Allow-Origin</code> header.
    </Step>,
    <Step key="10" index={3}>
      <strong>The Real Execution:</strong> Only if the preflight yields trusted
      headers will the browser execute the primary (e.g., POST) request.
    </Step>,
    <h4 key="11" className="text-xl font-bold mt-8 mb-4">
      Key CORS Headers Checklist
    </h4>,
    <ul
      key="12"
      className="list-disc pl-5 space-y-4 my-6 text-foreground/80 leading-relaxed text-sm"
    >
      <li>
        <Highlight variant="primary">Access-Control-Allow-Origin</Highlight>:
        Indicates whether the response can be shared. Usually set to a specific
        origin or <code>*</code> for public APIs.
      </li>
      <li>
        <Highlight variant="primary">Access-Control-Allow-Methods</Highlight>:
        Specifies the method or methods allowed when accessing the resource
        (e.g. <code>GET, POST, PUT, DELETE</code>).
      </li>
      <li>
        <Highlight variant="primary">Access-Control-Allow-Headers</Highlight>:
        Used in response to a preflight request to indicate which HTTP headers
        can be used during the actual request.
      </li>
      <li>
        <Highlight variant="primary">
          Access-Control-Allow-Credentials
        </Highlight>
        : Set to <code>true</code> if the server permits cookies or
        authorization headers. Note: If this is true, the Allow-Origin header{" "}
        <strong>cannot</strong> be <code>*</code>!
      </li>
      <li>
        <Highlight variant="primary">Access-Control-Max-Age</Highlight>: How
        long the browser should cache the preflight response so it doesn't have
        to send OPTIONS requests on every API call.
      </li>
    </ul>,
    <CodeBlock
      key="13"
      title="Sample Preflight Handshake"
      language="http"
      code={`# 1. Browser sends Preflight:\nOPTIONS /api/data HTTP/1.1\nOrigin: https://my-frontend.com\nAccess-Control-Request-Method: POST\n\n# 2. Server authorises:\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://my-frontend.com\nAccess-Control-Allow-Methods: POST, GET, OPTIONS\nAccess-Control-Max-Age: 86400`}
    />,
  ],
};
