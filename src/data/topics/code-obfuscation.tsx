import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";

export const codeObfuscationTopic: Topic = {
  id: "code-obfuscation",
  title: "Code Obfuscation",
  description:
    "Not encryption. Not masking. Obfuscation is the art of making source code functionally identical but cognitively unreadable — a critical layer in IP protection, client-side security, and anti-tampering strategies.",
  tags: ["security", "frontend", "architecture", "deployment"],
  icon: "EyeOff",
  content: [
    <p key="1" className="mb-6">
      Developers frequently conflate{" "}
      <Highlight variant="warning">obfuscation</Highlight>,{" "}
      <Highlight variant="primary">encryption</Highlight>, and{" "}
      <Highlight variant="info">masking</Highlight> as interchangeable terms.
      They are not. Obfuscation is a{" "}
      <strong>source-level transformation</strong> that deliberately destroys
      human readability while preserving exact runtime behaviour — the code
      still runs perfectly, it just becomes incomprehensible to a reverse
      engineer trying to read it.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Distinction: Obfuscation vs Encryption vs Masking
    </h3>,

    <Table
      key="3"
      headers={[
        "Technique",
        "What Changes",
        "Reversible?",
        "Runtime Requirement",
        "Primary Goal",
      ]}
      rows={[
        [
          "Obfuscation",
          "Source symbols, structure, logic flow",
          "Yes — with effort",
          "None. Runs natively as obfuscated code.",
          "Intellectual property (IP) protection, anti-reverse-engineering",
        ],
        [
          "Encryption",
          "The actual data payload (bytes)",
          "Yes — with the key",
          "Must decrypt before execution (adds overhead)",
          "Confidentiality of data at rest or in transit",
        ],
        [
          "Masking / Tokenisation",
          "Sensitive field values (e.g. PAN, SSN)",
          "Yes — via vault lookup",
          "None — masked values are substitutes, not transformed logic",
          "Compliance (PCI DSS, GDPR) for data exposure",
        ],
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-12 mb-4">
      How Obfuscation Actually Works: The Seven Mechanisms
    </h3>,

    <p key="4a" className="mb-6">
      Modern obfuscators combine multiple independent techniques into a
      pipeline. Each pass strips away another dimension of legibility.
    </p>,

    <Grid key="5" cols={2} gap={6} className="mb-8">
      <Card title="1. Identifier Mangling">
        <p className="text-sm text-muted-foreground mb-2">
          Every meaningful variable, function, and class name is replaced with a
          meaningless single-character or random token.{" "}
          <code>calculateInvoiceTotal()</code> becomes <code>a()</code>.
        </p>
        <p className="text-sm text-muted-foreground">
          This is the most universally applied layer. It eliminates semantic
          hints that guide a human reader through unfamiliar code structure.
        </p>
      </Card>
      <Card title="2. String Encryption">
        <p className="text-sm text-muted-foreground mb-2">
          Hardcoded string literals (<code>"api.internal.corp"</code>,{" "}
          <code>"SECRET_ROUTE"</code>) are replaced with runtime-decryption
          calls that only materialise the value at execution time.
        </p>
        <p className="text-sm text-muted-foreground">
          Without this, even heavily mangled code leaks intent through its
          string constants — endpoints, feature flags, error messages.
        </p>
      </Card>
      <Card title="3. Control Flow Flattening">
        <p className="text-sm text-muted-foreground mb-2">
          A clean <code>if/else</code> or <code>for</code> loop is decomposed
          into a giant <code>switch</code> dispatch table driven by an opaque
          state variable. The logic is functionally identical but the structural
          story is gone.
        </p>
        <p className="text-sm text-muted-foreground">
          Static analysis tools and disassemblers fail to reconstruct a coherent
          call graph.
        </p>
      </Card>
      <Card title="4. Dead Code Injection">
        <p className="text-sm text-muted-foreground mb-2">
          Hundreds of fake branches, unreachable functions, and bogus
          computations are inserted. A reverse engineer cannot distinguish real
          logic from noise without executing every branch.
        </p>
        <p className="text-sm text-muted-foreground">
          Cost: binary/bundle size grows. Used surgically only in the
          highest-sensitivity modules.
        </p>
      </Card>
      <Card title="5. Opaque Predicates">
        <p className="text-sm text-muted-foreground mb-2">
          Boolean conditions that always evaluate to the same value (always-true
          or always-false) are built from mathematically complex expressions.
          Tools cannot statically determine the branch outcome.
        </p>
        <p className="text-sm text-muted-foreground">
          Example: <code>if ((x*x + x) % 2 === 0)</code> is always true for any
          integer <code>x</code>, but a static analyser may not know that.
        </p>
      </Card>
      <Card title="6. Anti-Debugging Traps">
        <p className="text-sm text-muted-foreground mb-2">
          Code that actively detects if a debugger is attached (via timing
          attacks, <code>debugger</code> statement loops, or DevTools detection)
          and deliberately crashes or misbehaves when one is found.
        </p>
        <p className="text-sm text-muted-foreground">
          Common in DRM implementations, mobile banking apps, and game
          anti-cheat systems.
        </p>
      </Card>
    </Grid>,

    <CodeBlock
      key="6"
      title="Before & After: Identifier Mangling + String Encryption"
      language="javascript"
      code={`// ─── BEFORE OBFUSCATION ─────────────────────────────────────────────
function validateLicenseKey(userKey) {
  const validKeys = ["PROD-2024-ENTERPRISE", "PROD-2024-STARTER"];
  return validKeys.includes(userKey);
}

// ─── AFTER OBFUSCATION (Terser + javascript-obfuscator) ─────────────
// Identifiers mangled, strings encrypted, control flow flattened:
var _0x1a2b = ["\x50\x52\x4f\x44\x2d\x32\x30\x32\x34\x2d\x45\x4e\x54\x45\x52\x50\x52\x49\x53\x45",
               "\x50\x52\x4f\x44\x2d\x32\x30\x32\x34\x2d\x53\x54\x41\x52\x54\x45\x52"];
function a(_0x3f4e) {
  return _0x1a2b['\x69\x6e\x63\x6c\x75\x64\x65\x73'](_0x3f4e);
}
// The logic is bit-for-bit identical. The intent is invisible.`}
    />,

    <h3 key="7" className="text-xl font-bold mt-12 mb-4">
      The Obfuscation Pipeline in a Modern Build
    </h3>,

    <Flow
      key="8"
      steps={[
        {
          title: "1. Transpile",
          description:
            "TypeScript/JSX → ES5 via Babel or tsc. Strips types and modern syntax.",
        },
        {
          title: "2. Bundle",
          description:
            "Webpack/Vite/Rollup merges modules, removes dead imports (tree-shaking), inlines dependencies.",
        },
        {
          title: "3. Minify",
          description:
            "Terser removes whitespace, shortens locals. First layer of readability destruction.",
        },
        {
          title: "4. Obfuscate",
          description:
            "javascript-obfuscator / ProGuard / R8 (mobile) applies mangling, string encryption, control flow transforms.",
        },
        {
          title: "5. Source Map Decision",
          description:
            "Source maps are NEVER shipped publicly. They're uploaded privately to Sentry/DataDog for internal crash symbolication only.",
        },
        {
          title: "6. Deploy",
          description:
            "The obfuscated bundle is served from CDN. No human-readable artefact ever reaches the client device.",
        },
      ]}
    />,

    <h3 key="9" className="text-xl font-bold mt-12 mb-4">
      Real-World Use Cases: When Is It Actually Deployed?
    </h3>,

    <Table
      key="10"
      headers={[
        "Industry / Context",
        "Why Obfuscation Is Applied",
        "Tooling Used",
      ]}
      rows={[
        [
          "Frontend SaaS (JS bundles)",
          "Protect proprietary algorithms, pricing logic, feature-flag keys baked into client-side JS from competitors scraping the bundle.",
          "javascript-obfuscator, Terser, Webpack obfuscation plugins",
        ],
        [
          "Mobile Banking & Fintech",
          "Prevent runtime hooking and reverse engineering of HMAC signing keys, certificate pinning logic, and fraud-detection heuristics.",
          "ProGuard / R8 (Android), LLVM obfuscation (iOS / Objective-C)",
        ],
        [
          "Game Anti-Cheat",
          "Conceal memory addresses, server-tick timings, and validation checksum locations from cheat engine developers.",
          "Custom native obfuscators, VMProtect, Themida",
        ],
        [
          "DRM & Media Players",
          "Hide decryption key derivation logic (Widevine, FairPlay) that unlocks protected video content.",
          "Native binary obfuscation, white-box cryptography",
        ],
        [
          "Licensing & Activation",
          "Make it computationally expensive to patch out license validation checks in offline-activated desktop software.",
          "MSIL Obfuscator (.NET), ProGuard, custom packers",
        ],
        [
          "IoT / Embedded Firmware",
          "Prevent competitors from cloning proprietary device firmware and re-flashing onto generic hardware.",
          "Binary obfuscation, encrypted firmware images",
        ],
      ]}
    />,

    <h3 key="11" className="text-xl font-bold mt-12 mb-4">
      What Obfuscation Does NOT Do
    </h3>,

    <Callout
      key="12"
      type="warning"
      title="Obfuscation Is Not a Security Boundary"
    >
      Obfuscation is a <strong>deterrent, not a defence</strong>. A sufficiently
      motivated attacker with enough time <em>will</em> reverse it. It raises
      the cost of reverse engineering — it does not make it cryptographically
      impossible. Never rely on obfuscation to protect secrets that require
      absolute confidentiality. Those must live server-side, protected by
      authentication and authz at the API layer. Any secret embedded in
      client-side code — no matter how obfuscated — must be treated as
      eventually compromised.
    </Callout>,

    <Grid key="13" cols={2} gap={6} className="mb-8 mt-6">
      <Card title="✅ Obfuscation Protects Against">
        <p className="text-sm text-muted-foreground">
          - Casual competitor bundle inspection
          <br />
          - Automated scraping of proprietary algorithms
          <br />
          - Script-kiddie tampering
          <br />
          - Leaking business logic encoded in client JS
          <br />- Reverse engineering of non-critical licence checks
        </p>
      </Card>
      <Card title="❌ Obfuscation Does NOT Protect Against">
        <p className="text-sm text-muted-foreground">
          - A determined security researcher with a deobfuscator tool
          <br />
          - Runtime inspection via breakpoints on a live execution
          <br />
          - Network-level traffic analysis (use TLS for that)
          <br />
          - Hardcoded API keys (they will eventually be found)
          <br />- Server-side data breaches (wrong threat model entirely)
        </p>
      </Card>
    </Grid>,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      Obfuscation vs Minification: The Key Difference
    </h3>,

    <Table
      key="15"
      headers={["", "Minification", "Obfuscation"]}
      rows={[
        [
          "Primary Goal",
          "Reduce file size for faster network transfer",
          "Destroy cognitive readability to deter reverse engineering",
        ],
        [
          "Identifier Renaming",
          "Yes, but predictably short (a, b, c)",
          "Yes, to cryptic random tokens (_0x1a2b, \\x50\\x52)",
        ],
        [
          "String Literals",
          "Untouched",
          "Encrypted and replaced with runtime decoders",
        ],
        [
          "Control Flow",
          "Untouched",
          "Flattened, reordered, injected with dead branches",
        ],
        [
          "Performance Impact",
          "Positive (smaller = faster parse)",
          "Slight negative (extra runtime decode overhead)",
        ],
        [
          "Always Applied in Prod?",
          "Yes — universally",
          "Selectively — high-sensitivity modules or full bundle",
        ],
      ]}
    />,

    <Callout
      key="16"
      type="tip"
      title="Architectural Pattern: White-Box Cryptography"
    >
      The most advanced obfuscation technique in production is{" "}
      <strong>white-box cryptography</strong> — a mathematical approach where an
      AES or RSA key is baked directly into a transformed algorithm such that
      the key is never stored as a discrete value anywhere in memory. Even with
      full runtime access and memory dumps, the key cannot be extracted. Used in
      Widevine L1 (Google) and FairPlay (Apple) CDM implementations for premium
      video streaming.
    </Callout>,
  ],
};
