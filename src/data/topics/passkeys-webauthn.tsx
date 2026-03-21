import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const passkeysWebauthnTopic: Topic = {
  id: "passkeys-webauthn",
  title: "Passkeys & WebAuthn",
  description:
    "Why the tech industry is aggressively killing passwords in favor of biometric cryptography.",
  tags: ["security", "auth", "frontend"],
  icon: "Fingerprint",
  content: [
    <p key="1">
      Passwords are a catastrophic failure of human psychology. Users reuse `Password123!` across 50 websites. If one tiny forum gets hacked, the attacker instantly compromises their bank account.
    </p>,
    <p key="2" className="mt-4">
      <strong>WebAuthn (Web Authentication API)</strong> is the browser standard that powers Passkeys. It completely replaces typing text with cryptographically unbreakable Asymmetric hardware keys (like Apple's FaceID or Windows Hello).
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Mathematical Registration
    </h3>,
    <Step key="4" index={1}>
      <strong>The Creation:</strong> The user clicks "Register". The browser's WebAuthn API asks their phone's secure hardware chip to generate a brand new, unique Asymmetric Keypair (Public & Private Key).
    </Step>,
    <Step key="5" index={2}>
      <strong>The Vault:</strong> The Private Key is locked deeply inside the phone's physical hardware. It never leaves the device. The Public Key is sent to your backend database.
    </Step>,
    <Step key="6" index={3}>
      <strong>The Login Challenge:</strong> Next time they log in, the backend sends a random string (a "Challenge"). The user scans their face (FaceID), which physically unlocks the Private Key for a millisecond to mathematically sign the challenge and send it back. The backend verifies the signature using the Public Key.
    </Step>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Immune to Data Breaches">
        <p className="text-sm text-muted-foreground">
          If a hacker steals your entire SQL database, they only get Public Keys. Unlike stolen password hashes (which can be brute-forced), a Public Key is mathematically useless for logging in.
        </p>
      </Card>
      <Card title="Immune to Phishing">
        <p className="text-sm text-muted-foreground">
          WebAuthn inherently ties the cryptographic signature to the exact URL domain (`google.com`). If a user is tricked into visiting a fake clone `g00gle.com` and scans their face, the signature generated will strictly be for `g00gle.com`, and the real Google backend will instantly reject it.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="info" title="What is a 'Passkey'?">
      WebAuthn requires physical devices (like a YubiKey). A "Passkey" is simply Apple/Google realizing that forcing users to carry USB sticks is terrible UX. A Passkey takes the WebAuthn Private Key and securely syncs it across your iCloud/Google Cloud, so if you lose your phone, you don't lose your accounts.
    </Callout>,
  ],
};
