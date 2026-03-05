import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";

export const jwtVsSessionTopic: Topic = {
  id: "jwt-vs-session",
  title: "JWT vs Session Authentication",
  description:
    "Evaluating Stateful vs Stateless authentication strategies for web applications and APIs.",
  tags: ["security", "auth", "jwt"],
  icon: "ShieldCheck",
  content: [
    <p key="1">
      When a user successfully logs in, the server must remember them for
      subsequent requests. We cross this boundary using exactly two primary
      philosophies: server-side memory (Sessions) or cryptographic signatures
      (JWTs).
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Stateful Session Auth">
        <ol className="list-decimal pl-4 space-y-2 mt-2 text-sm">
          <li>User logs in. Server checks DB.</li>
          <li>
            Server generates a random Opaque String (Session ID) and saves it in
            a fast DB (Redis).
          </li>
          <li>
            Server sends ID back as a <code>Set-Cookie</code>.
          </li>
          <li>
            On next request, browser sends Cookie. Server{" "}
            <Highlight variant="primary">looks up</Highlight> the ID in Redis to
            verify.
          </li>
        </ol>
      </Card>
      <Card title="Stateless JWT Auth">
        <ol className="list-decimal pl-4 space-y-2 mt-2 text-sm">
          <li>User logs in. Server checks DB.</li>
          <li>
            Server generates a JSON Web Token (JWT) containing user data,{" "}
            <Highlight variant="primary">cryptographically signed</Highlight>{" "}
            with a private key.
          </li>
          <li>Server sends JWT back to client.</li>
          <li>
            On next request, client sends JWT in the Header. Server only checks
            the math signature to verify. No DB lookup needed!
          </li>
        </ol>
      </Card>
    </Grid>,
    <h4 key="3" className="text-xl font-bold mb-4">
      The Critical Tradeoffs
    </h4>,
    <p key="4">
      JWTs are immensely popular for distributed microservices because they
      eliminate database lookups for API gateways. However, they introduce a
      massive flaw: <strong>Invalidation</strong>.
    </p>,
    <p key="5" className="mt-4">
      Because a JWT is a mathematical proof of access,{" "}
      <em>it remains valid until it expires</em>. If a user's account is
      compromised, or you ban them, the JWT they hold will continue to work! To
      solve this, companies introduce "JWT Blacklists" in Redis... completely
      destroying the "Stateless" advantage and turning it into a worse version
      of Session Auth.
    </p>,
  ],
};
