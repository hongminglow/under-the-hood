import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Step } from "@/components/ui/Step";

export const oauthFlowsTopic: Topic = {
  id: "oauth2-flows-deep-dive",
  title: "OAuth 2.0 Flows Deep Dive",
  description:
    "The 4 grant types of OAuth 2.0 decoded: when to use Authorization Code, PKCE, Client Credentials, and why Implicit is dead.",
  tags: ["security", "auth", "oauth", "interview"],
  icon: "KeyRound",
  content: [
    <p key="1">
      OAuth 2.0 defines <strong>4 grant types</strong> — each designed for a
      specific client type and trust level. Using the wrong flow is a{" "}
      <strong>security vulnerability</strong>. Interviewers test whether you
      know which flow to use and <em>why</em>.
    </p>,
    <Table
      key="2"
      headers={["Grant Type", "Client Type", "Has Backend?", "Security Level"]}
      rows={[
        [
          "Authorization Code",
          "Web apps (SPA + backend)",
          "Yes",
          "Highest — code exchanged server-side",
        ],
        [
          "Authorization Code + PKCE",
          "Mobile & SPA (no backend)",
          "No",
          "High — code verifier prevents interception",
        ],
        [
          "Client Credentials",
          "Machine-to-machine",
          "N/A",
          "High — no user involved, service identity",
        ],
        [
          "Implicit (DEPRECATED)",
          "Old SPAs",
          "No",
          "Low — token in URL fragment, easily stolen",
        ],
      ]}
    />,
    <h4 key="3" className="text-xl font-bold mt-8 mb-4">
      Authorization Code Flow (The Gold Standard)
    </h4>,
    <Step key="4" index={1}>
      App redirects user to <strong>Authorization Server</strong> (Google,
      Auth0). User logs in and consents.
    </Step>,
    <Step key="5" index={2}>
      Auth Server redirects back with a{" "}
      <strong>short-lived authorization code</strong> in the URL query param.
    </Step>,
    <Step key="6" index={3}>
      App's <strong>backend server</strong> exchanges the code + client secret
      for an <strong>access token</strong> via a secure server-to-server call.
      The token never touches the browser.
    </Step>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="PKCE (Proof Key for Code Exchange)">
        <p className="text-sm">
          For clients that <strong>can't store a client secret</strong> (mobile
          apps, SPAs). The client generates a random <code>code_verifier</code>,
          sends its hash (<code>code_challenge</code>) with the auth request,
          then proves possession when exchanging the code. Prevents
          authorization code interception attacks.
        </p>
      </Card>
      <Card title="Client Credentials">
        <p className="text-sm">
          No user involved — <strong>service-to-service auth</strong>. The
          backend sends its <code>client_id</code> + <code>client_secret</code>{" "}
          directly to the token endpoint. Used for cron jobs, internal
          microservice communication, and CI/CD pipelines.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="warning" title="Why Implicit Flow is Dead">
      The Implicit flow returned access tokens directly in the URL fragment (
      <code>#access_token=...</code>). Browser history, referrer headers, and
      JavaScript access made token theft trivial. It was officially{" "}
      <strong>deprecated by the OAuth Working Group</strong> in 2019. Use{" "}
      <strong>Authorization Code + PKCE</strong> for all public clients.
    </Callout>,
  ],
};
