import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
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
      Configuration management is the process of decoupling your application logic from its environment. The <strong>Twelve-Factor App</strong> methodology dictates that 100% of configuration should be stored in <strong>Environment Variables</strong>.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Secret Lifecycle: Build-time vs. Runtime
    </h3>,
    <p key="3" className="mb-4">
      Mixing these up is a common source of production bugs.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Build-time Variables">
        <p className="text-sm text-slate-400 mb-2">
          Injected during <code>docker build</code> or <code>npm run build</code>.
        </p>
        <p className="text-xs italic text-red-500 font-bold underline">Warning: Hardcoded in the final JS bundle / Image layer.</p>
      </Card>
      <Card title="Runtime Variables">
        <p className="text-sm text-slate-400 mb-2">
          Injected when the container starts (<code>process.env</code>). 
        </p>
        <p className="text-xs italic text-green-500 font-bold underline">Success: Secure and hot-swappable without rebuilding.</p>
      </Card>
    </Grid>,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Industrial Secret Management (Vault)
    </h3>,
    <p key="6" className="mb-4">
      In high-security environments, secrets aren't even passed as env vars. You use a <strong>Secret Injection Sidecar</strong> (like HashiCorp Vault Agent).
    </p>,
    <Table
      key="7"
      headers={["Method", "Technical Implementation", "Security Level"]}
      rows={[
        [".env (Local)", "Plaintext files in <code>.gitignore</code>.", "Low (Human error risk)"],
        ["Cloud Manager", "AWS Secrets Manager / GCP Secret Manager.", "High (Encryption at rest)"],
        ["Dynamic Secrets", "Vault generates a <strong>temporary</strong> DB credential for one hour.", "Highest (Zero permanent secrets)"]
      ]}
    />,
    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Preventing Leaks Before They Happen
    </h3>,
    <ul className="list-disc pl-5 mb-8 text-sm space-y-2">
      <li><strong>Git Hooks (Husky):</strong> Run <code>gitleaks</code> or <code>trufflehog</code> in a <code>pre-commit</code> hook to scan for API keys before the push.</li>
      <li><strong>GitHub Secret Scanning:</strong> Automatically revokes tokens from known providers (AWS/Stripe) if they are pushed to a public repo.</li>
    </ul>,
    <Callout key="9" type="danger" title="The Git History Trap">
      Deleting a secret from a file and committing isn't enough. The secret remains in the <strong>Git History</strong> (the <code>.git</code> folder). You must <strong>immediately rotate</strong> (deactivate) the secret and use tools like <code>BFG Repo-Cleaner</code> to purge the history.
    </Callout>,
  ],
};
