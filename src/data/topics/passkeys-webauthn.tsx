import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const passkeysTopic: Topic = {
  id: "passkeys-webauthn",
  title: "Passkeys & WebAuthn",
  description:
    "The cryptographic revolution permanently killing passwords through biometric public-key cryptography.",
  tags: ["security", "auth", "cryptography", "browser"],
  icon: "Fingerprint",
  content: [
    <p key="1">
      For 30 years, humans have reused weak passwords across multiple sites,
      leading to catastrophic data breaches and rampant phishing attacks.{" "}
      <strong>Passkeys</strong>
      (built on the WebAuthn standard) completely eliminate passwords.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Public-Key Cryptography
    </h4>,
    <p key="3" className="mb-4">
      Instead of sending a shared secret string ("my_password123") over the
      internet to the server database, Passkeys rely on asymmetric cryptography.
    </p>,
    <Grid key="4" cols={2} gap={6} className="mb-8">
      <Card title="The Private Key (Stays Safe)">
        Created securely on your device (in the Secure Enclave hardware of your
        iPhone/Mac/Android). This key <strong>never leaves your device</strong>.
        It usually requires biometric unlocking (FaceID / TouchID) to access.
      </Card>
      <Card title="The Public Key (Given to Server)">
        Stored on the target website's database. This key can only verify a
        cryptographic signature; it is absolutely useless to hackers if stolen.
      </Card>
    </Grid>,
    <h4 key="5" className="text-xl font-bold mt-8 mb-4">
      The Login Flow (Zero-Knowledge)
    </h4>,
    <Step key="6" index={1}>
      You want to login. The server generates a random string called a{" "}
      <code>Challenge</code> and sends it to your browser.
    </Step>,
    <Step key="7" index={2}>
      Your device prompts you for biometrics (FaceID). If successful, it takes
      the
      <code>Challenge</code> and encrypts/signs it using your{" "}
      <strong>Private Key</strong>.
    </Step>,
    <Step key="8" index={3}>
      Your browser sends the "Signed Challenge" back to the server. The server
      uses the stored <strong>Public Key</strong> to verify the signature. You
      are logged in!
    </Step>,
    <Callout key="9" type="warning" title="Phishing is impossible">
      Passkeys are cryptographically bound to the exact{" "}
      <strong>domain name</strong>
      (e.g., `google.com`). If an attacker tricks you into visiting `g00gle.com`
      and you try to use FaceID, the browser sees the domain mismatch and simply
      refuses to initiate the cryptographic signing. Phishing is dead.
    </Callout>,
  ],
};
