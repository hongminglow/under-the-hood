import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { KeyRound, Lock } from "lucide-react";

export const backendEncryptionMethodsTopic: Topic = {
  id: "backend-encryption-comparison",
  title: "Backend Payload Encryption",
  description:
    "A practical, developer-friendly guide to securing API payloads. Demystifying HMAC, AES, and JWE in everyday applications.",
  tags: ["security", "encryption", "backend", "cryptography", "jwe"],
  icon: "KeyRound",
  content: [
    <p key="1">
      Modern backend security requires a <strong>Defense in Depth</strong> strategy. While TLS/HTTPS handles <strong>Encryption in Transit</strong> (securing data as it travels across the wire), we often need <strong>Payload Encryption</strong> to secure data as it sits in a database or travels between untrusted microservices.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Hierarchy of Secrets
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Lock} title="Encryption in Transit" subtitle="TLS protects the wire" theme="emerald">
        <p className="text-sm text-emerald-200/80 mb-2">
          Handled by <strong className="text-emerald-300">TLS 1.3</strong>. Once the packet reaches your Load Balancer, it is typically decrypted (TLS Termination).
        </p>
      </FeatureCard>
      <FeatureCard icon={KeyRound} title="Encryption at Rest" subtitle="Storage-layer protection" theme="teal">
        <p className="text-sm text-teal-200/80 mb-2">
          Handled by the Cloud Provider (AWS EBS/RDS). Protects against someone physically walking away with a hard drive.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Enterprise Standard: KMS & Envelope Encryption
    </h3>,
    <p key="5" className="mb-4">
      In large-scale systems, you don't just hardcode an AES key in an environment variable. You use a <strong>Key Management Service (KMS)</strong>.
    </p>,
    <Table
      key="6"
      headers={["Concept", "Technical Logic", "Why It's Safe"]}
      rows={[
        [
          "Data Key (DEK)",
          "A random AES-256 key used to encrypt your actual database row or file.",
          "Stored directly next to the encrypted data."
        ],
        [
          "Master Key (CMK)",
          "A key that stays inside the KMS hardware (HSM). It never leaves the secure vault.",
          "Used only to <strong>Encrypt the Data Key</strong>. This is called 'Envelope Encryption'."
        ]
      ]}
    />,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Advanced Trick: Blind Indexing
    </h3>,
    <p key="8" className="mb-4">
      If you encrypt a user's email address with AES, you can no longer run <code>SELECT * FROM users WHERE email='alice@example.com'</code> because the email is now gibberish.
    </p>,
    <Callout key="9" type="tip" title="Search Encrypted Data">
      The solution is a <strong>Blind Index</strong>: You create a separate column containing a <strong>Hash</strong> of the email (using a separate secret salt). To search, you hash the search term and look for a match in the blind index column. You get the benefits of encryption with the speed of an index.
    </Callout>,
    <p key="10" className="mt-8 text-sm text-muted-foreground italic">
      Standard implementations like <strong>JWE (JSON Web Encryption)</strong> wrap these complexities into a single, web-friendly string format (Header.Key.IV.Ciphertext.Tag).
    </p>,
  ],
};
