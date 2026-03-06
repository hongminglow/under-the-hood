import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const encodingEncryptionHashingTopic: Topic = {
  id: "encoding-encryption-hashing",
  title: "Encoding vs Encryption vs Hashing",
  description:
    "Three fundamentally different operations that everyone confuses: one transforms format, one protects secrets, one creates fingerprints.",
  tags: ["security", "interview", "fundamentals", "backend"],
  icon: "Binary",
  content: [
    <p key="1">
      "Is Base64 encryption?" <strong>No.</strong> "Can I decrypt a hash back to
      the password?" <strong>No.</strong> These are the most common
      misconceptions in security interviews. The three operations serve{" "}
      <strong>completely different purposes</strong>.
    </p>,
    <Table
      key="2"
      headers={["Property", "Encoding", "Encryption", "Hashing"]}
      rows={[
        [
          "Purpose",
          "Format transformation",
          "Confidentiality",
          "Integrity / fingerprinting",
        ],
        [
          "Reversible?",
          "Yes (anyone can decode)",
          "Yes (with the correct key)",
          "No (one-way function)",
        ],
        ["Key Required?", "No key", "Encryption key required", "No key"],
        [
          "Security?",
          "None — NOT for secrets",
          "Strong — protects data",
          "Strong — verifies integrity",
        ],
        [
          "Output Size",
          "Variable (often larger)",
          "Similar to input",
          "Fixed size (always)",
        ],
        [
          "Examples",
          "Base64, URL encoding, UTF-8",
          "AES-256, RSA, ChaCha20",
          "SHA-256, bcrypt, argon2",
        ],
      ]}
    />,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <Card title="Encoding">
        <p className="text-sm">
          Transforms data into a different <strong>format</strong>, NOT for
          security. Base64 encodes binary to ASCII for safe transport.{" "}
          <strong>Anyone can decode it</strong> — it's just a format. Never
          store passwords as Base64.
        </p>
      </Card>
      <Card title="Encryption">
        <p className="text-sm">
          Transforms data so <strong>only someone with the key</strong> can read
          it. <strong>Symmetric</strong>: same key encrypts and decrypts (AES).{" "}
          <strong>Asymmetric</strong>: public key encrypts, private key decrypts
          (RSA). Used for HTTPS, at-rest encryption.
        </p>
      </Card>
      <Card title="Hashing">
        <p className="text-sm">
          Produces a <strong>fixed-size fingerprint</strong>. Same input always
          produces same output. <strong>Cannot be reversed</strong>. Used for
          password storage, data integrity checks, digital signatures.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="4"
      language="typescript"
      title="Password Storage Done Right"
      code={`// ❌ NEVER: Plain text, Base64, MD5, SHA-256 (too fast, rainbow tables)
db.save({ password: "mypassword" });           // Plain text 🔥
db.save({ password: btoa("mypassword") });     // Base64 — NOT encryption!
db.save({ password: sha256("mypassword") });   // Fast hash — crackable

// ✅ CORRECT: bcrypt/argon2 (slow by design, with salt)
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash("mypassword", 12); // 12 salt rounds
db.save({ password: hash });
// "$2b$12$LJ3m4ys..." — salted, slow to brute-force

// Verification (no decryption needed — compare hashes)
const valid = await bcrypt.compare("mypassword", hash); // → true`}
    />,
    <Callout key="5" type="warning" title="SHA-256 Is NOT for Passwords">
      SHA-256 computes <strong>billions of hashes per second</strong> on a GPU.
      An attacker can brute-force an 8-character password in hours.{" "}
      <strong>bcrypt</strong> and <strong>argon2</strong> are intentionally slow
      (~100ms per hash), making brute-force attacks computationally infeasible.
    </Callout>,
  ],
};
