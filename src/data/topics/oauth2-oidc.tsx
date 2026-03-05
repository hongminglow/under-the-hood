import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Grid } from "@/components/ui/Grid";

export const oauthOidcTopic: Topic = {
  id: "oauth2-oidc",
  title: "OAuth 2.0 & OIDC",
  description:
    "The modern identity layer framing how applications securely delegate access and authenticate users globally.",
  tags: ["security", "auth", "oauth", "jwt"],
  icon: "KeySquare",
  content: [
    <p key="1">
      Historically, if an application wanted access to your calendar, you had to
      give it your raw username and password. This was profoundly insecure.{" "}
      <strong>OAuth 2.0</strong> was created to solve{" "}
      <em>Delegated Authorization</em>
      —allowing an app to access your data without ever seeing your password.
    </p>,
    <div key="2" className="my-4">
      <Highlight variant="warning">
        Crucial Distinction: OAuth 2.0 is NOT an authentication protocol. It
        proves you gave permission, not WHO you are. OIDC (OpenID Connect) was
        built on top of OAuth 2.0 to provide that missing Identity piece.
      </Highlight>
    </div>,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      The Actors in the Flow
    </h4>,
    <Grid key="4" cols={2} gap={6}>
      <Card title="Resource Owner">
        You. The user who ultimately owns the data sitting in the database.
      </Card>
      <Card title="Client">
        The application (e.g., a startup's web app) requesting access to your
        data.
      </Card>
      <Card title="Authorization Server">
        The bouncer (e.g., Google's Auth Server). It verifies who you are and
        issues the security tokens.
      </Card>
      <Card title="Resource Server">
        The API (e.g., Google Calendar API) that holds the actual data and
        requires a token to unlock.
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      Authorization Code Flow
    </h4>,
    <p key="6">
      This is the safest and most standard flow for web applications running on
      a backend server.
    </p>,
    <Step key="7" index={1}>
      <strong>The Redirect:</strong> The Client app redirects you to the
      Authorization Server (e.g., "Sign in with Google"). The URL contains what
      scopes (permissions) it wants.
    </Step>,
    <Step key="8" index={2}>
      <strong>The Consent:</strong> You log in safely on Google's domain and
      click "Allow". You are redirected back to the Client with a temporary{" "}
      <code>authorization_code</code>.
    </Step>,
    <Step key="9" index={3}>
      <strong>The Backend Exchange:</strong> The Client's backend server
      secretly contacts the Auth Server, trading that temporary code plus its
      own secret credentials for an <strong>Access Token</strong>. (This keeps
      the token off the frontend browser where it could be stolen).
    </Step>,
    <Step key="10" index={4}>
      <strong>API Access:</strong> The Client app now attaches the Access Token
      in the `Authorization: Bearer &lt;token&gt;` header to fetch data from the
      Resource Server.
    </Step>,
    <h4 key="11" className="text-xl font-bold mt-8 mb-4">
      Deconstructing JSON Web Tokens (JWT)
    </h4>,
    <p key="12">
      Access tokens are commonly structured as stateless JWTs. A JWT contains
      all the claims (permissions and expirations) within the token itself,
      cryptographically signed by the Auth Server so the Resource Server doesn't
      need to do a database lookup to verify it.
    </p>,
    <CodeBlock
      key="13"
      title="Anatomy of a JWT"
      language="json"
      code={`// Header (Algorithm used)
{ "alg": "RS256", "typ": "JWT" }

// Payload (The actual claims)
{
  "sub": "user_12345",
  "name": "John Doe",
  "scope": "read:calendar",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
RSASHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  server_private_key
)`}
    />,
    <Callout key="14" type="info" title="OIDC: The ID Token">
      If a client also requests the <code>openid</code> scope, the Auth Server
      returns an additional <strong>ID Token</strong> alongside the Access
      Token. This is definitively an authentication token—it contains standard
      profile information (email, name, picture) allowing the client application
      to safely log the user in locally.
    </Callout>,
  ],
};
