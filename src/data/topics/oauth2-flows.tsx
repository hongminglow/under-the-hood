import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const oauth2FlowsTopic: Topic = {
  id: "oauth2-flows",
  title: "OAuth 2.0 Flows Deep Dive",
  description:
    "When to use PKCE, Client Credentials, or why the Implicit flow is dead.",
  tags: ["security", "auth", "architecture"],
  icon: "Workflow",
  content: [
    <p key="1">
      Implementing "Login with Google" is not just one button. OAuth 2.0 is a framework with multiple different "flows" (Grant Types) heavily mathematically tailored to exactly what type of application you are building (React vs iOS vs Server-to-Server).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Dominant Flows
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="Authorization Code w/ PKCE" description="For React, Vue, iOS, Android">
        <p className="text-sm text-muted-foreground mb-2">
          The absolute gold standard for public clients. Because a React app or iOS app can be decompiled by hackers, you cannot store a secret "Password" in the source code. 
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>PKCE (Pixy):</strong> The client temporarily generates a random secret math puzzle, hashes it, and sends the hash to Google. Google later demands the original puzzle's answer before handing over the access token, guaranteeing the token goes to the exact device that started the login.
        </p>
      </Card>
      <Card title="Client Credentials" description="For Machine-to-Machine (M2M)">
        <p className="text-sm text-muted-foreground mb-2">
          Your secure Node.js backend needs to talk to the AWS API or Stripe API. There is no human involved.
        </p>
        <p className="text-sm text-muted-foreground">
          Since the Node server is securely hidden from the public, it simply holds a hardcoded Client ID and Client Secret, hands them directly to Stripe, and receives an Access Token instantly. Pure, seamless backend automation.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="The Graveyard: Implicit Flow">
      Ten years ago, Single Page Apps (Angular) used the Implicit Flow, where the auth server returned the active Access Token directly in the URL hash (<code>#access_token=123</code>). Hackers easily stole these via malicious browser extensions or analyzing browser history logs. It is now officially deprecated. <strong>Never use it.</strong>
    </Callout>,
  ],
};
