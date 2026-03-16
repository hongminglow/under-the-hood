import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Highlight } from "@/components/ui/Highlight";

export const backendEncryptionMethodsTopic: Topic = {
  id: "backend-encryption-comparison",
  title: "Modern Backend Payload Encryption",
  description:
    "An in-depth comparison of modern backend payload encryption methods: AES-GCM, ChaCha20-Poly1305, JWE, and HMAC, including sample outputs.",
  tags: ["security", "encryption", "backend", "cryptography", "jwe", "aead"],
  icon: "KeyRound",
  content: [
    <p key="1">
      When securing backend payloads, relying on standard HTTPS (TLS) protects data <em>in transit</em>, but sensitive data often requires end-to-end payload encryption at the application layer. This requires choosing the right cryptographic methods. While HMAC provides authenticity, modern full encryption requires Authenticated Encryption with Associated Data (AEAD) like <strong>AES-GCM</strong> or <strong>ChaCha20-Poly1305</strong>, and standardized wrappers like <strong>JWE</strong>.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      1. HMAC (Hash-based Message Authentication Code)
    </h3>,
    <p key="3" className="mb-4">
      HMAC is not encryption; it provides <Highlight variant="primary">integrity</Highlight> and <Highlight variant="primary">authenticity</Highlight>. It ensures a payload has not been tampered with and comes from a trusted source possessing a shared secret key. However, the payload itself remains entirely in plaintext.
    </p>,
    <Callout key="4" type="info" title="Sample HMAC Output">
      <p className="mb-2"><strong>Payload:</strong> <code>&#x7B;"user_id": 123&#x7D;</code></p>
      <p><strong>HMAC-SHA256 Output (usually a raw buffer, hex, or base64):</strong></p>
      <pre className="bg-background/50 p-3 rounded-md mt-2 mb-0 overflow-x-auto text-sm border whitespace-pre-wrap">
        e1a263158c89423bdfc512726487e38ba5b0db1d6728ac7c9be9e712f5a3e142
      </pre>
    </Callout>,

    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      2. AES-GCM (Advanced Encryption Standard - Galois/Counter Mode)
    </h3>,
    <p key="6" className="mb-4">
      AES-GCM is the industry leading standard for AEAD. It simultaneously encrypts the data (confidentiality) and computes an authentication tag (integrity). It is heavily optimized through dedicated hardware acceleration instructions (AES-NI) on modern server processors.
    </p>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Strengths">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Unbeatable speed on desktop/server hardware with AES-NI support.</li>
          <li>Universally approved by compliance standards like FIPS and NIST.</li>
          <li>Provides built-in tamper detection via the 16-byte GCM authentication tag.</li>
        </ul>
      </Card>
      <Card title="Weaknesses">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Catastrophic security failure if the Nonce (IV) is ever reused with the same key.</li>
          <li>Can be slower on cheap IoT devices lacking dedicated AES hardware chips.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="8" type="info" title="Sample AES-GCM Output Structure">
      <p className="mb-2 text-sm text-muted-foreground">The final output isn't a single string natively, but 3 distinct components commonly concatenated by the developer:</p>
      <pre className="bg-background/50 p-3 rounded-md mt-2 overflow-x-auto text-sm border font-mono whitespace-pre-wrap">
        IV (Nonce, 12 bytes): a3b4c5d6e7f8a9b0c1d2e3f4
        Ciphertext: 4b6f123c8a90d4e5f6...
        Tag (16 bytes): 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d
      </pre>
    </Callout>,

    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      3. ChaCha20-Poly1305
    </h3>,
    <p key="10" className="mb-4">
      Developed by Google, ChaCha20 is a stream cipher, and Poly1305 is its MAC. Together, they form an AEAD primitive that serves as a highly popular alternative to AES-GCM. It is designed to be extremely fast and secure entirely in <em>software</em>, making it the preferred choice for mobile phones, IoT devices, or older CPUs.
    </p>,
    <Grid key="11" cols={2} gap={6} className="my-8">
      <Card title="Strengths">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Blazing fast on ARM processors and mobile devices without AES hardware.</li>
          <li>Immune to CPU timing side-channel attacks by design.</li>
          <li>XChaCha20 variant allows for larger nonces, eliminating accidental nonce collisions.</li>
        </ul>
      </Card>
      <Card title="Weaknesses">
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Slightly slower than AES-GCM on high-end enterprise servers that utilize AES-NI.</li>
          <li>Lacks the deep legacy compliance certifications that AES holds in legacy enterprise banking.</li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="12" type="info" title="Sample ChaCha20-Poly1305 Output Structure">
      <p className="mb-2 text-sm text-muted-foreground">Often structured similarly to AES-GCM, yielding an IV, ciphertext, and a tag.</p>
      <pre className="bg-background/50 p-3 rounded-md mt-2 overflow-x-auto text-sm border font-mono whitespace-pre-wrap">
        Nonce (12 or 24 bytes): e6c7...
        Ciphertext: 8a9b0c...
        Poly1305 Tag (16 bytes): 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
      </pre>
    </Callout>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      4. JWE (JSON Web Encryption)
    </h3>,
    <p key="14" className="mb-4">
      While AES and ChaCha20 are raw cryptographic algorithms that spit out unformatted byte buffers, <strong>JWE</strong> is a higher-level standardized data format (RFC 7516). JWE wraps your payload using symmetric AEAD algorithms (like AES-GCM) into a clean, URL-safe, tokenized string format. It is used constantly in web APIs to transmit encrypted payloads over HTTP natively.
    </p>,
    <Callout key="15" type="tip" title="JWE vs JWS vs JWT">
      <ul className="list-disc pl-5 mb-0 text-sm space-y-1">
        <li><Highlight variant="primary">JWS (JSON Web Signature):</Highlight> Signs the data for integrity (like an HMAC). Payload is base64url encoded, but remains entirely readable!</li>
        <li><Highlight variant="primary">JWE (JSON Web Encryption):</Highlight> Encrypts the payload for confidentiality. It's unreadable without the decryption key.</li>
        <li><Highlight variant="primary">JWT (JSON Web Token):</Highlight> An abstract token pattern. A JWT can be physically implemented as either a JWS or a JWE.</li>
      </ul>
    </Callout>,
    <Callout key="16" type="info" title="Sample JWE Compact Output Format">
      <p className="mb-2 text-sm text-muted-foreground">A JWE consists of 5 Base64Url-encoded segments separated by dots (<code>.</code>):</p>
      <pre className="bg-background/50 p-3 rounded-md mt-2 overflow-x-auto text-sm border font-mono whitespace-pre-wrap break-all leading-snug">
        <span className="text-red-400">eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ</span>.<span className="text-blue-400">OKOawDo13gNp2...</span>.<span className="text-green-400">48V1_ALb6US04U3b</span>.<span className="text-yellow-400">5eym8TW_c...</span>.<span className="text-purple-400">XFBoMYUZodetZdvTiFvSkQ</span>
      </pre>
      <div className="mt-4 text-xs text-muted-foreground space-y-1.5 font-mono">
        <p><span className="text-red-400 font-bold">1. Header:</span> Defines algorithms (e.g., <code>&#123;"alg":"RSA-OAEP"&#125;</code> for key wrap, <code>&#123;"enc":"A256GCM"&#125;</code> for payload encryption).</p>
        <p><span className="text-blue-400 font-bold">2. Encrypted Key:</span> The symmetric AES key securely wrapped/encrypted by the recipient's public RSA key.</p>
        <p><span className="text-green-400 font-bold">3. IV (Initialization Vector):</span> The nonce used for the AEAD algorithm.</p>
        <p><span className="text-yellow-400 font-bold">4. Ciphertext:</span> The actual encrypted payload data.</p>
        <p><span className="text-purple-400 font-bold">5. Auth Tag:</span> The AEAD integrity verification tag output.</p>
      </div>
    </Callout>,
  ],
};
