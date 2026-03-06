import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Table } from "@/components/ui/Table";

export const envConfigTopic: Topic = {
  id: "env-config-secrets",
  title: "Environment Variables & Secrets",
  description:
    "How to manage configuration across dev, staging, and production without leaking API keys or hardcoding values.",
  tags: ["devops", "security", "config", "twelve-factor"],
  icon: "Settings",
  content: [
    <p key="1">
      <strong>Hardcoding secrets in source code</strong> is the #1 security
      mistake developers make. API keys, database URLs, and encryption secrets
      must live in <strong>environment variables</strong> — never in Git. The
      same binary should run in dev, staging, and production with only env vars
      changing.
    </p>,
    <Table
      key="2"
      headers={["Method", "Security", "Best For", "Risk"]}
      rows={[
        [
          ".env files",
          "Low — plaintext on disk",
          "Local development",
          "Accidentally committed to Git",
        ],
        [
          "CI/CD Variables",
          "Medium — encrypted at rest",
          "Build-time injection",
          "Visible in build logs if echoed",
        ],
        [
          "Cloud Secrets Manager",
          "High — encrypted, audited, rotated",
          "Production",
          "Vendor lock-in, latency",
        ],
        [
          "Vault (HashiCorp)",
          "Highest — dynamic secrets, TTL",
          "Enterprise",
          "Operational complexity",
        ],
      ]}
    />,
    <CodeBlock
      key="3"
      language="typescript"
      title="Environment Config in Node.js"
      code={`// .env (NEVER commit this file — add to .gitignore)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=super-secret-key-here
REDIS_URL=redis://localhost:6379

// app.ts — validate env vars at startup, fail fast
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

// Throws immediately if any env var is missing or invalid
export const env = envSchema.parse(process.env);`}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="The .env.example Pattern">
        <p className="text-sm">
          Commit a <code>.env.example</code> with all required variable names
          (no values) to Git. Developers copy it to <code>.env</code> and fill
          in their local values. Documents which variables are needed without
          leaking secrets.
        </p>
      </Card>
      <Card title="Secrets Rotation">
        <p className="text-sm">
          API keys and passwords should be <strong>rotated regularly</strong>.
          Cloud secrets managers (AWS Secrets Manager, GCP Secret Manager)
          support <strong>automatic rotation</strong> — the secret changes
          periodically without any code changes.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Git History Trap">
      If you accidentally commit a secret,{" "}
      <strong>removing it from the latest commit isn't enough</strong> — it's
      still in Git history. You must{" "}
      <strong>rotate the secret immediately</strong> (generate a new one), then
      either use <code>git filter-branch</code> or BFG Repo Cleaner to purge
      history. GitHub automatically scans for leaked secrets via{" "}
      <strong>Secret Scanning</strong>.
    </Callout>,
  ],
};
