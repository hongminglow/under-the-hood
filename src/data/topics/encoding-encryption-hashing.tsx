import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const encodingEncryptionHashingTopic: Topic = {
  id: "encoding-encryption-hashing",
  title: "Encoding vs Encryption vs Hashing",
  description:
    "The three fundamental algorithms of computer science that junior developers constantly mix up.",
  tags: ["security", "computer-science", "backend"],
  icon: "Binary",
  content: [
    <p key="1">
      Confusion between <strong>Encoding</strong>, <strong>Encryption</strong>, and <strong>Hashing</strong> is a common source of security vulnerabilities. Each serves a distinct purpose in the data lifecycle, from transport to storage.
    </p>,
    <Grid key="2" cols={3} gap={4} className="my-8">
      <Card title="Encoding">
        <p className="text-xs text-muted-foreground">Purpose: <strong>Format Conversion</strong></p>
        <p className="text-xs mt-2 italic">Example: Base64, URL Encoding</p>
      </Card>
      <Card title="Encryption">
        <p className="text-xs text-muted-foreground">Purpose: <strong>Confidentiality</strong></p>
        <p className="text-xs mt-2 italic">Example: AES, RSA</p>
      </Card>
      <Card title="Hashing">
        <p className="text-xs text-muted-foreground">Purpose: <strong>Integrity/Fingerprinting</strong></p>
        <p className="text-xs mt-2 italic">Example: SHA-256, Argon2</p>
      </Card>
    </Grid>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      Encryption: Symmetric vs. Asymmetric
    </h3>,
    <Table
      key="4"
      headers={["Type", "Mechanism", "Best For"]}
      rows={[
        [
          "Symmetric",
          "One single password (key) used for both locking and unlocking.",
          "High-speed data at rest (Full disk encryption, AES-256)."
        ],
        [
          "Asymmetric",
          "A <strong>Public Key</strong> to lock, and a <strong>Private Key</strong> to unlock.",
          "Secure key exchange (TLS/SSL) and Digital Signatures."
        ]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      The Golden Rule of Passwords: Resetting & Salting
    </h3>,
    <p key="6" className="mb-4">
      You must <strong>never</strong> encrypt passwords; you must <strong>hash</strong> them. Specifically, you must use <strong>Salting</strong>—adding a random string to the password before hashing it.
    </p>,
    <Callout key="7" type="danger" title="Why Salting Matters">
      Without a salt, two users with the same password (e.g., "P@ssword123") will have the same hash in the database. A hacker with a <strong>Rainbow Table</strong> (a pre-computed list of billions of hashes) can instantly crack everyone's password. A unique salt ensures that even identical passwords produce unique, un-crackable hashes.
    </Callout>,
    <p key="8" className="mt-6 text-sm text-muted-foreground">
      <strong>Encoding is NOT security.</strong> Encoding a string to Base64 is like putting a letter in a clear plastic envelope—everyone can see it, it just keeps it dry.
    </p>,
  ],
};
