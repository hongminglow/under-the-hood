import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Highlight } from "@/components/ui/Highlight";

export const oauth2OidcTopic: Topic = {
  id: "oauth2-oidc",
  title: "OAuth 2.0 & OIDC",
  description:
    "How 'Sign in with Google' fundamentally works, and the difference between Authorization and Authentication.",
  tags: ["security", "auth", "backend"],
  icon: "Key",
  content: [
    <p key="1">
      If you build an app that needs to access a user's Google Calendar, you <strong>never</strong> want the user to hand you their raw Google password! 
    </p>,
    <p key="2" className="mt-4">
      <Highlight variant="primary">OAuth 2.0</Highlight> is the wildly successful industry standard that solves this. It allows Google to give your application a temporary, limited-access <strong>Token</strong> to peek at the user's calendar without ever exposing their password to you.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      OAuth is Not for Logging In (OIDC is)
    </h3>,
    <p key="4" className="mb-4">
      Technically speaking, OAuth 2.0 was designed strictly for <strong>Authorization</strong> (Giving permission to access something, like reading contacts or uploading a file). It was never meant to definitively prove <em>who</em> the person actually is (<strong>Authentication</strong>). 
    </p>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="The OAuth 2.0 Access Token">
        <p className="text-sm text-muted-foreground">
          A purely opaque string designed only to unlock specific API doors (like an Arcade Token). It doesn't contain the user's name or email. It simply says "This token holder can read calendars."
        </p>
      </Card>
      <Card title="OIDC (OpenID Connect)">
        <p className="text-sm text-muted-foreground">
          An extension bolted directly on top of OAuth. It provides an <strong>ID Token</strong> (always a JWT) alongside the Access Token. The ID Token definitively answers "Who is this person? What is their email?" and allows true "Login with Google" systems to exist securely.
        </p>
      </Card>
    </Grid>,
    <Callout key="6" type="warning" title="The Death of Implicit Flow">
      For years, developers returned the Token directly to the React app in the browser URL. This was horrific for security (URL history logs, malicious scripts). Modern OAuth fiercely enforces the <strong>PKCE Flow</strong>, ensuring the Token is strictly traded highly securely between the backend servers, completely bypassing raw exposure in the frontend.
    </Callout>,
  ],
};
