import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const jwtVsSessionTopic: Topic = {
  id: "jwt-vs-session",
  title: "JWT vs Session Storage",
  description:
    "The massive architectural debate over how to properly keep users logged into your application.",
  tags: ["security", "auth", "backend"],
  icon: "Cookie",
  content: [
    <p key="1">
      Once a user supplies a valid email and password, how do you remember they are logged in on the next request? HTTP is entirely stateless. You must pass a special token back and forth with every request.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Stateful Server vs The Stateless Token
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Sessions (Stateful)", "JWTs (Stateless)"]}
      rows={[
        [
          "How it works",
          "Server saves 'user_id=5' in a Redis database. Hands the browser a short random string (Session ID).",
          "Server cryptographically signs a string containing 'user_id=5' and hands it to the browser."
        ],
        [
          "Database Trips",
          "Slow. Every single API request requires the backend to query Redis to ensure the session hasn't expired.",
          "Fast! The backend just verifies the cryptography mathematically. Zero database queries."
        ],
        [
          "Log Out / Revocation",
          "Instant! The backend just deletes the ID from Redis, banning the user completely.",
          "Terrible. Because it's stateless, you literally cannot mathematically revoke a JWT before it expires. You must rely on complicated 'Token Blacklists'."
        ],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="LocalStorage Nightmare for JWTs">
        <p className="text-sm text-muted-foreground">
          Millions of tutorials tell developers to save JWTs in React's `localStorage`. This is catastrophically vulnerable to XSS (Cross Site Scripting). If a hacker runs 1 line of JS on your website, they steal the raw token instantly.
        </p>
      </Card>
      <Card title="The HttpOnly Cookie Saving Grace">
        <p className="text-sm text-muted-foreground">
          Always store tokens (Session IDs or JWTs) inside an <code>HttpOnly, Secure</code> browser cookie. Javascript cannot physically read these cookies. The browser securely attaches them to API requests automatically.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="Use Both (Refresh + Access Tokens)">
      The enterprise standard is giving the user a 15-minute <strong>JWT Access Token</strong> (blazing fast API calls, mathematically secured) and a very long-lived <strong>Session Refresh Token</strong> securely stored in an HttpOnly cookie. If the user's JWT expires, the backend uses the Refresh token in Redis to hand out a new JWT, giving you the extreme speed of JWTs and the instant ban capability of Sessions.
    </Callout>,
  ],
};
