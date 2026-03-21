import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const cspTopic: Topic = {
  id: "csp",
  title: "Content Security Policy (CSP)",
  description:
    "The ultimate iron-clad wall against XSS attacks that most frontend developers accidentally disable.",
  tags: ["security", "frontend", "headers"],
  icon: "ShieldAlert",
  content: [
    <p key="1">
      You can strictly sanitize all user inputs, but one rogue NPM package can still inject a malicious script into your DOM and steal your users' tokens. A <strong>Content Security Policy (CSP)</strong> is a strict set of rules sent via an HTTP Header from the backend telling the browser *exactly* what it is allowed to execute.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Ultimate Whitelist
    </h3>,
    <p key="3" className="mb-4">
      A strong CSP fundamentally breaks the browser's default behavior of "trusting everything."
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Blocking Inline Scripts">
        <p className="text-sm text-muted-foreground">
          By default, CSP violently blocks `<script>alert(1)</script>` written directly in the HTML. It forces you to put all JS into a separate `.js` file. If a hacker injects an inline script via a comment, the browser refuses to run it.
        </p>
      </Card>
      <Card title="Restricting Domains">
        <p className="text-sm text-muted-foreground">
          You can tell the browser: "Only download images from `my-s3-bucket.com` and only execute scripts from `cdn.my-startup.com`." Even if an attacker injects a script tag pointing to `evil.com`, the browser blocks the network request.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The 'unsafe-inline' Tragedy">
      Many developers get frustrated when their React app or Google Analytics breaks due to CSP rules. Instead of fixing it correctly (using Nonces or Hashes), they add `'unsafe-inline'` to their policy. This completely destroys the entire purpose of the CSP and immediately opens the door to XSS attacks again.
    </Callout>,
  ],
};
