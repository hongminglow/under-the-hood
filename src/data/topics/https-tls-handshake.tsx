import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { KeyRound, Lock } from "lucide-react";

export const httpsTlsHandshakeTopic: Topic = {
  id: "https-tls-handshake",
  title: "HTTPS & TLS Handshake",
  description:
    "How two computers algorithmically agree on a completely secret password over an open, public wire.",
  tags: ["security", "networking", "encryption"],
  icon: "ShieldCheck",
  content: [
    <p key="1">
      HTTPS is the protocol for secure communication over a computer network. The "S" stands for Secure, and it's powered by <strong>TLS (Transport Layer Security)</strong>. It ensures <strong>Encryption</strong> (no eavesdropping), <strong>Integrity</strong> (no tampering), and <strong>Authentication</strong> (no impersonation).
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Hybrid Encryption Model
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={KeyRound} title="Asymmetric: The Handshake" subtitle="Public/private keys for the hello phase" theme="violet">
        <p className="text-sm text-violet-100/75 mb-2">
          Using <strong>Public/Private Keys</strong> (RSA/ECC) for the initial "Hello".
        </p>
        <p className="text-xs italic text-violet-200/70">
          Slower but secure. It allows two strangers to exchange a secret "Symmetric Key" without anyone else seeing it.
        </p>
      </FeatureCard>
      <FeatureCard icon={Lock} title="Symmetric: The Session" subtitle="Fast shared-key encryption for the real traffic" theme="emerald">
        <p className="text-sm text-emerald-100/75 mb-2">
          Using a <strong>Shared Secret</strong> (AES-256) for the actual data.
        </p>
        <p className="text-xs italic text-emerald-200/70">
          Blazing fast and hardware-accelerated. Once the secret is exchanged, the public/private keys are no longer used for the rest of the session.
        </p>
      </FeatureCard>
    </Grid>,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The TLS 1.3 "Single Round Trip" Handshake
    </h3>,
    <Table
      key="5"
      headers={["Message", "Who Sends", "What's Inside?"]}
      rows={[
        ["Client Hello", "Browser", "Supported Ciphers + <strong>Key Share</strong> (ECDHE)."],
        ["Server Hello", "Server", "Selected Cipher + <strong>Certificate</strong> + Server Key Share."],
        ["Encrypted Extensions", "Server", "Server proves it owns the certificate via Digital Signature."],
        ["Finished", "Both", "The connection is now encrypted. Total time: <strong>1 RTT</strong>."]
      ]}
    />,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Trust through Certificate Authorities (CAs)
    </h3>,
    <p key="7" className="mb-4">
      How do you know `google.com` is actually Google? A <strong>Certificate Authority</strong> (like Let's Encrypt) digitally signs the server's public key. Your browser comes pre-installed with the "Root Certificates" of these trusted CAs, forming a <strong>Chain of Trust</strong>.
    </p>,
    <ul key="8" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>Forward Secrecy:</strong> Even if a hacker steals your Server's Private Key 10 years from now, they <strong>cannot</strong> decrypt the traffic they recorded today. A fresh "Session Key" is generated and destroyed for every user.</li>
      <li><strong>OCSP Stapling:</strong> Instead of the browser asking a CA "Is this cert revoked?", the server "staples" a fresh, signed time-stamp from the CA to the handshake, saving a costly network trip.</li>
      <li><strong>HSTS:</strong> A header that tells the browser "Never, ever talk to me over unencrypted HTTP again for the next 1 year."</li>
    </ul>,
    <Callout key="9" type="info" title="The 0-RTT 'Early Data' Feature">
      TLS 1.3 allows <strong>0-RTT Resumption</strong>. If you've connected before, your browser can send encrypted data in the <em>very first packet</em>! While incredibly fast, it is vulnerable to <strong>Replay Attacks</strong>, so it's typically only used for "GET" requests.
    </Callout>,
  ],
};
