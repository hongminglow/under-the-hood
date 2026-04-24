import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Lock, ShieldAlert } from "lucide-react";

export const encodingEncryptionHashingTopic: Topic = {
  id: "encoding-encryption-hashing",
  title: "Encoding vs Encryption vs Hashing",
  description:
    "The core cryptographic concepts developers constantly mix up. Demystifying HMAC, breaking MD5, and understanding why Base64 provides zero security.",
  tags: ["security", "architecture", "backend"],
  icon: "Lock",
  content: [
    <p key="1" className="mb-6">
      The most common security vulnerability junior developers introduce is blindly assuming that <Highlight variant="primary">Encoding</Highlight> (like Base64) is mathematically secure. It isn't. To properly architect a backend, you must categorically divide data translation, data scrambling, and data fingerprinting into three intensely distinct paradigms.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Fundamental Core Differences
    </h3>,

    <Table
      key="3"
      headers={["Concept", "The Goal", "Reversibility", "Classic Algorithm"]}
      rows={[
        ["Encoding", "Merely reformats data so systems can physically parse it (e.g., sending binary images strictly as text over JSON).", "100% Reversible. Anyone can decode it instantly without any password.", "Base64, URL Encoding"],
        ["Encryption", "Guarantees ultimate confidentiality. Mathematically scrambles the payload.", "Only reversible if you actively hold the identically correct cryptographic Key.", "AES-256 (Symmetric), RSA (Asymmetric)"],
        ["Hashing", "Generates an irreversible 'Fingerprint' of the data to verify its ultimate integrity or securely store passwords.", "Physically impossible to reverse mathematically.", "SHA-256, bcrypt, Bcrypt"]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-12 mb-4">
      The "JWT / HMAC" Confusion Explained
    </h3>,

    <p key="4a" className="mb-6">
      <strong>The Problem:</strong> Developers look at a JWT (JSON Web Token) or an HMAC string and assume the data is "Encrypted" because it looks like a scrambled mess. Because JSON payloads natively use Base64 to transport safely over HTTP, developers falsely believe the data is protected and secretly stash passwords in it.
      <br/><br/>
      <strong>The Reality:</strong> An HMAC (Hash-based Message Authentication Code) does absolutely NOT encrypt the payload. It is a mathematical <Highlight variant="primary">Signature / Authenticator</Highlight>.
    </p>,

    <Grid key="5" cols={1} gap={6} className="mb-8">
      <FeatureCard icon={Lock} title="How HMAC-SHA256 Actually Works" subtitle="Signature, not secrecy" theme="cyan">
        <p className="text-sm text-cyan-100/75 mb-4">
          HMAC strictly guarantees that a payload was absolutely not tampered with during network transit. It mathematically combines the raw, exposed Payload with a highly classified Secret Key, and Hashes the result securely to prove identity.
        </p>
        <CodeBlock
          theme="cyan"
          title="The HMAC Signature Flow"
          language="javascript"
          code={`// 1. You purely Base64-ENCODE the payload so it transports cleanly. (NOT ENCRYPTED!)
const payload = "eyJ1c2VyIjogIkpvaG4ifQ"; // Literally just decodes to: { user: "John" }

// 2. You Hash the plain Payload mathematically glued together with a Secret Password.
const signature = HMAC_SHA256(payload, "MY_SUPER_SECRET_BACKEND_KEY");

// 3. You attach the signature. If a hacker intercepts and alters "John" to "Admin", 
// the server's Hash recalculation will mathematically completely fail!`}
        />
      </FeatureCard>
    </Grid>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: The Cryptographic Algorithms
    </h3>,

    <Table
      key="7"
      headers={["Algorithm", "The Mechanism", "The Use Case"]}
      rows={[
        ["AES-256 (Encryption)", "Symmetric: Uses exactly one shared password to both rapidly lock and unlock a vault.", "High-speed execution. Full disk encryption, raw database row encryption."],
        ["RSA (Encryption)", "Asymmetric: Uses a widely distributed Public Key to lock the vault, but requires a totally isolated, mathematically linked Private Key to unlock it.", "Strict SSL/TLS handshakes, Secure SSH key exchanges."],
        ["SHA-256 (Hashing)", "A one-way deterministic meat-grinder. Whether you feed it a 1-character string or a 50-Gigabyte 4K movie, it always outputs exactly 64 hexadecimal characters (256 bits).", "File integrity checking, Blockchain mining arrays, HMAC authentications."]
      ]}
    />,

    <h3 key="8" className="text-xl font-bold mt-12 mb-4">
      Why is SHA-256 so strong, and why did MD5 die?
    </h3>,

    <Grid key="9" cols={2} gap={6} className="mb-8">
      <FeatureCard icon={Lock} title="The Power of SHA-256" subtitle="Why it still holds up" theme="emerald">
        <p className="text-sm text-emerald-100/85 mb-2">
          <strong>The Avalanche Effect:</strong> If you change a single literal bit in a massive 50GB file, the entire resulting 256-bit (64-character) SHA-256 hash completely and wildly scrambles. You cannot reverse-engineer patterns.
        </p>
        <p className="text-sm text-emerald-100/75">
          <strong>The Scale of 2^256:</strong> There are theoretically more possible SHA-256 hashes than there are physical atoms in the entire observable universe. It is physically impossible for modern hardware computers to blindly guess or bruteforce the input mathematically.
        </p>
      </FeatureCard>
      <FeatureCard icon={ShieldAlert} title="The Ruin of MD5 & SHA-1" subtitle="Broken for modern trust models" theme="rose">
        <p className="text-sm text-rose-100/85 mb-2">
          <strong>Collision Attacks:</strong> Hackers discovered severe mathematical weaknesses in MD5 and SHA-1 where two completely different files could magically generate the exact same Hash (a Collision). This destroys file integrity.
        </p>
        <p className="text-sm text-rose-100/75">
          <strong>Speed Vulnerability:</strong> MD5 hashes run so rapidly efficiently that a modern GPU can compute 100 Billion variants per second. This makes it utterly trivial to crack using a <strong>Rainbow Table</strong> (a pre-calculated 100TB database of common passwords and their known resulting hashes).
        </p>
      </FeatureCard>
    </Grid>,

    <Callout key="10" type="warning" title="Architectural Solution: Salting Passwords">
      Because raw Hashes alone are acutely vulnerable to Rainbow Tables, you must mathematically force every hash to be unique. <strong>Salting</strong> explicitly forces a completely random string (like "x8F2!") onto the user's password before hashing it into the database. Even if two users foolishly both choose "password123", their salted database Hashes will look entirely alien to each other, completely destroying the Rainbow Table attack.
    </Callout>,
  ],
};
