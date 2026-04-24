import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const rsaCryptographyTopic: Topic = {
	id: "rsa-cryptography",
	title: "RSA Cryptography Deep Dive",
	description:
		"How RSA's two-key system works, who holds which key, the critical difference between encryption and signing, and why the private key can decrypt what the public key encrypts — without the other side ever knowing it.",
	tags: ["security", "cryptography", "rsa", "encryption", "digital-signatures", "tls"],
	icon: "KeyRound",
	content: [
		<p key="1" className="mb-4">
			RSA is one of the most misunderstood concepts in computing because it does two <em>opposite</em> things depending
			on context — and developers often confuse them. The core confusion:{" "}
			<strong>
				"If the private key can decrypt, how did the message get encrypted correctly if the sender doesn't have the
				private key?"
			</strong>{" "}
			The answer requires understanding that RSA has <em>two completely different operation modes</em> that work in
			opposite key directions.
		</p>,

		<Callout key="2" type="info" title="The Single Most Important Concept">
			RSA is used in two totally different modes: <strong>Encryption</strong> (to send a secret) and{" "}
			<strong>Digital Signing</strong> (to prove identity). In each mode, the keys are used in{" "}
			<em>opposite directions</em>. Mixing up these two modes is the root of all RSA confusion.
		</Callout>,

		<h3 key="3" className="text-xl font-bold mt-8 mb-4">
			The Key Pair: Who Holds What?
		</h3>,
		<p key="4" className="mb-4">
			RSA generates a mathematically linked pair of keys. They are inseparable — what one key does, only the other key
			can undo. The owner of the pair decides what to share and what to keep secret.
		</p>,
		<Grid key="5" cols={2} gap={6} className="my-6">
			<Card title="Public Key">
				<p className="text-sm text-muted-foreground mb-2">
					Published openly. Posted on your website, your TLS certificate, your SSH profile.{" "}
					<strong>Everyone gets a copy.</strong>
				</p>
				<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
					<li>
						Used to <strong>encrypt</strong> data for the owner
					</li>
					<li>
						Used to <strong>verify</strong> a signature from the owner
					</li>
					<li>Cannot decrypt anything the public key encrypted</li>
					<li>Cannot forge a signature</li>
				</ul>
			</Card>
			<Card title="Private Key">
				<p className="text-sm text-muted-foreground mb-2">
					Never shared. Hidden on the server's disk, in a hardware security module (HSM), or in a smart card.{" "}
					<strong>Only the owner holds this.</strong>
				</p>
				<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
					<li>
						Used to <strong>decrypt</strong> data that was encrypted with the public key
					</li>
					<li>
						Used to <strong>sign</strong> data to prove identity
					</li>
					<li>Cannot be derived from the public key (computationally infeasible)</li>
				</ul>
			</Card>
		</Grid>,

		<h3 key="6" className="text-xl font-bold mt-8 mb-4">
			Mode 1: Encryption — Sending a Secret to Someone
		</h3>,
		<p key="7" className="mb-4">
			When Alice wants to send a message to Bob that only Bob can read, she uses Bob's{" "}
			<strong>public key to encrypt</strong> it. Only Bob's private key can decrypt it. Alice never needs the private
			key.
		</p>,
		<div key="8" className="space-y-3 mb-6">
			<Step index={1}>
				<strong>Bob publishes his public key</strong> — anyone can download it. Alice gets Bob's public key.
			</Step>
			<Step index={2}>
				<strong>Alice encrypts</strong> her message using Bob's public key → produces ciphertext (unreadable garbage).
			</Step>
			<Step index={3}>
				<strong>Alice sends</strong> the ciphertext over any channel — even an insecure one. An attacker who intercepts
				it cannot decrypt it; they don't have Bob's private key.
			</Step>
			<Step index={4}>
				<strong>Bob decrypts</strong> using his own private key. He's the only person on earth who can do this.
			</Step>
		</div>,
		<Callout key="9" type="success" title="Why This Solves the Key Exchange Problem">
			Before RSA, if Alice and Bob wanted to communicate privately, they had to first meet in person to share a secret
			key. RSA eliminates this: Alice can encrypt for Bob over a public, untrusted channel, without ever having met Bob,
			because she only needed his <em>public</em> key. This is the "asymmetric" breakthrough.
		</Callout>,

		<h3 key="10" className="text-xl font-bold mt-8 mb-4">
			Mode 2: Digital Signing — Proving You Are Who You Say You Are
		</h3>,
		<p key="11" className="mb-4">
			This is the mode that confuses most developers. Here the key direction is <strong>reversed</strong>: the private
			key is used first, and the public key is used to verify. The goal is not secrecy — it's{" "}
			<strong>authentication and integrity</strong>.
		</p>,
		<div key="12" className="space-y-3 mb-6">
			<Step index={1}>
				<strong>Alice hashes her message</strong> — produces a fixed-length digest (e.g., SHA-256 hash of the document).
			</Step>
			<Step index={2}>
				<strong>Alice encrypts the hash with her own private key</strong> — this encrypted hash is the{" "}
				<em>signature</em>. Only Alice could have produced it.
			</Step>
			<Step index={3}>
				<strong>Alice sends</strong> the original message + the signature to Bob.
			</Step>
			<Step index={4}>
				<strong>Bob decrypts the signature</strong> using Alice's public key → recovers the original hash.
			</Step>
			<Step index={5}>
				<strong>Bob hashes the message himself</strong> and compares his hash to the one he decrypted from the
				signature.
			</Step>
			<Step index={6}>
				<strong>If the hashes match</strong> → the message is authentic (came from Alice, unmodified). If they don't →
				tampered or forged.
			</Step>
		</div>,
		<Callout key="13" type="warning" title="Why This Proves Identity">
			Because Alice's public key successfully decrypted the signature, it mathematically proves that{" "}
			<strong>Alice's private key created it</strong> — and only Alice has her private key. The message is also{" "}
			<strong>tamper-proof</strong>: if anyone changed even one byte after signing, the hashes wouldn't match.
		</Callout>,

		<h3 key="14" className="text-xl font-bold mt-8 mb-4">
			The Key Comparison: Encryption vs Signing
		</h3>,
		<Table
			key="15"
			headers={["", "Encryption Mode", "Signing Mode"]}
			rows={[
				[
					"Goal",
					"Keep a message secret from everyone except the recipient",
					"Prove who created the message; ensure it wasn't tampered with",
				],
				["Who uses private key?", "The recipient (to decrypt)", "The sender (to sign)"],
				["Who uses public key?", "The sender (to encrypt)", "Anyone (to verify the signature)"],
				[
					"Direction",
					"Public key → locks it. Private key → unlocks it.",
					"Private key → signs it. Public key → verifies it.",
				],
				["Provides Secrecy?", "✅ Yes", "❌ No (message is still readable)"],
				["Provides Authentication?", "❌ Not directly", "✅ Yes"],
				["Provides Integrity?", "❌ Not directly", "✅ Yes (hash mismatch = tampered)"],
				[
					"Real-world examples",
					"TLS key exchange, encrypted email (PGP)",
					"TLS certificates, SSH login, JWTs, code signing",
				],
			]}
		/>,

		<h3 key="16" className="text-xl font-bold mt-8 mb-4">
			The Math Behind RSA (Without the Terror)
		</h3>,
		<p key="17" className="mb-4">
			RSA is built on a mathematical trapdoor:{" "}
			<strong>
				multiplying two large prime numbers is trivial, but factoring the result back into those primes is
				computationally infeasible
			</strong>
			. This one-way property is what makes the key pair work.
		</p>,
		<CodeBlock
			key="18"
			title="RSA key generation — simplified"
			language="text"
			code={`1. Choose two large primes: p = 61, q = 53  (in real RSA these are 1024+ bit numbers)

2. Compute n = p × q = 3233
   n is the "modulus" — part of BOTH the public and private key

3. Compute φ(n) = (p-1)(q-1) = 60 × 52 = 3120

4. Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
   e = 17  → this is the "public exponent"

5. Compute d such that (d × e) mod φ(n) = 1
   d = 2753  → this is the "private exponent"

Public Key  = (n=3233, e=17)   ← share this with everyone
Private Key = (n=3233, d=2753) ← never share this

─────────────────────────────────────────────────

Encrypt message M = 65:
  C = M^e mod n  =  65^17 mod 3233  =  2790   ← ciphertext

Decrypt ciphertext C = 2790:
  M = C^d mod n  =  2790^2753 mod 3233  =  65  ← original message ✓

The magic: knowing n alone cannot give you d. 
You'd have to factor n back into p and q — impossible for 2048-bit numbers.`}
		/>,
		<Callout key="18a" type="success" title="The Mathematical Link: Why They Aren't Random">
			This is the exact reason why a message encrypted with the private key can be decrypted with the public key (and
			vice-versa). The two keys are **mathematically locked together** because they share the exact same Modulus (`n`).
			They are not just two random strings of characters; they are inverse mathematical operations operating on the
			exact same underlying prime framework.
		</Callout>,

		<h3 key="19" className="text-xl font-bold mt-8 mb-4">
			How This Plays Out in HTTPS / TLS
		</h3>,
		<p key="20" className="mb-4">
			When you visit <code>https://example.com</code>, RSA is used in the <strong>handshake phase</strong> — not to
			encrypt your actual HTTP data (that's done by a much faster symmetric cipher like AES). RSA's role is to securely
			exchange that AES key.
		</p>,
		<div key="21" className="space-y-3 mb-6">
			<Step index={1}>
				<strong>Server presents its TLS certificate</strong> — which contains the server's public key, signed by a
				Certificate Authority (CA) like DigiCert or Let's Encrypt.
			</Step>
			<Step index={2}>
				<strong>Your browser verifies the CA's signature</strong> on the certificate using the CA's public key
				(pre-installed in your OS/browser). This proves the certificate is legitimate and belongs to the real server.
			</Step>
			<Step index={3}>
				<strong>Your browser generates a random session key</strong> (the AES key for this session) and encrypts it with
				the server's public key.
			</Step>
			<Step index={4}>
				<strong>Only the server can decrypt it</strong> — using its private key. Now both sides have the same AES key
				without it ever crossing the network in plaintext.
			</Step>
			<Step index={5}>
				<strong>All further HTTP data</strong> is encrypted/decrypted symmetrically using AES. RSA is never used again
				for that session.
			</Step>
		</div>,
		<Callout key="22" type="info" title="Why Not Use RSA for All Traffic?">
			RSA encryption is ~1000× slower than AES. For a 1MB download, RSA would take seconds. Modern TLS uses RSA (or its
			modern replacement, ECDH) only to <em>negotiate</em> a symmetric AES key, then drops it. This is called a{" "}
			<strong>hybrid cryptosystem</strong>: asymmetric for key exchange, symmetric for bulk data.
		</Callout>,

		<h3 key="23" className="text-xl font-bold mt-8 mb-4">
			Who Signs What in the Real World?
		</h3>,
		<Table
			key="24"
			headers={["Scenario", "Who Signs", "With Which Key", "Who Verifies", "With Which Key"]}
			rows={[
				[
					"HTTPS TLS Certificate",
					"Certificate Authority (e.g., Let's Encrypt)",
					"CA's private key",
					"Your browser/OS",
					"CA's public key (pre-installed)",
				],
				[
					"SSH Login",
					"The user (you)",
					"Your SSH private key (~/.ssh/id_rsa)",
					"The server",
					"Your public key (in ~/.ssh/authorized_keys)",
				],
				[
					"JWT Token",
					"The backend auth server",
					"Server's private key",
					"Any microservice",
					"Server's public key (shared internally)",
				],
				[
					"Git Commit Signing",
					"The developer",
					"Their GPG private key",
					"Anyone (GitHub, teammates)",
					"Developer's public GPG key",
				],
				[
					"Code Signing (app releases)",
					"Software vendor (Apple, Microsoft, etc.)",
					"Vendor's private key",
					"OS installer / App Store",
					"Vendor's public key (in OS trust store)",
				],
			]}
		/>,

		<h3 key="25" className="text-xl font-bold mt-8 mb-4">
			The Concerns & Weaknesses of RSA
		</h3>,
		<Grid key="26" cols={2} gap={6} className="my-6">
			<Card title="Known Vulnerabilities">
				<ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
					<li>
						<strong className="text-muted-foreground">Small key sizes:</strong> 512-bit RSA was broken in 1999. 1024-bit
						is now considered weak. The standard minimum is <strong>2048-bit</strong>, with 4096-bit recommended for
						long-lived keys.
					</li>
					<li>
						<strong className="text-muted-foreground">PKCS#1 v1.5 padding attacks (Bleichenbacher):</strong> A 1998
						attack that exploits weak padding schemes to decrypt RSA without the private key given enough oracle
						queries.
					</li>
					<li>
						<strong className="text-muted-foreground">Quantum threat:</strong> Shor's algorithm running on a
						sufficiently powerful quantum computer could factor RSA's modulus in polynomial time — breaking all existing
						RSA keys.
					</li>
					<li>
						<strong className="text-muted-foreground">No Forward Secrecy:</strong> Classic RSA key exchange means if the
						server's private key is ever compromised, all past recorded sessions can be decrypted retroactively.
					</li>
				</ul>
			</Card>
			<Card title="Modern Mitigations">
				<ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
					<li>
						<strong className="text-muted-foreground">OAEP padding:</strong> Replaces vulnerable PKCS#1 v1.5 with
						Optimal Asymmetric Encryption Padding — prevents padding oracle attacks.
					</li>
					<li>
						<strong className="text-muted-foreground">ECDH/ECDSA replacing RSA:</strong> Elliptic Curve Diffie-Hellman
						provides equivalent security with much smaller keys (256-bit ECDH ≈ 3072-bit RSA). TLS 1.3 mandates ECDH for
						key exchange.
					</li>
					<li>
						<strong className="text-muted-foreground">Perfect Forward Secrecy (PFS):</strong> TLS 1.3 generates
						ephemeral session keys — even if the server's private key leaks, past sessions are safe.
					</li>
					<li>
						<strong className="text-muted-foreground">Post-quantum cryptography:</strong> NIST has standardized
						CRYSTALS-Kyber (key exchange) and CRYSTALS-Dilithium (signatures) as quantum-resistant replacements.
					</li>
				</ul>
			</Card>
		</Grid>,

		<Callout key="27" type="tip" title="Mental Model to Never Confuse Encryption vs Signing Again">
			Think of a <strong>padlock</strong> for encryption: the public key is the open padlock (anyone can click it shut
			to lock a message), the private key is the key that opens it (only the owner can open it). <br />
			<br />
			Think of a <strong>wax seal</strong> for signing: the private key is the signet ring (only the owner can stamp
			it), the public key is the knowledge of what that seal looks like (anyone can verify it matches). <br />
			<br />
			Locks work in one direction. Seals prove who made them.
		</Callout>,
	],
};
