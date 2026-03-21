import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const zeroTrustTopic: Topic = {
  id: "zero-trust",
  title: "Zero Trust Architecture",
  description:
    "Why modern infrastructure abandoned the 'Castle and Moat' VPN strategy.",
  tags: ["security", "system-design", "architecture"],
  icon: "EyeOff",
  content: [
    <p key="1">
      For 20 years, corporate security relied on the <strong>Castle and Moat</strong> model (VPNs). If you were outside the corporate network, you were blocked. If you logged into the VPN (showing you are inside the castle), you were blindly trusted to access any internal HR or Engineering server.
    </p>,
    <p key="2" className="mt-4">
      This failed spectacularly. If a hacker phished a single employee's VPN password, they instantly had full, trusted lateral movement across the entire company network.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      "Never Trust, Always Verify"
    </h3>,
    <p key="4" className="mb-4">
      <strong>Zero Trust (BeyondCorp)</strong> assumes the internal corporate network is already compromised. It does not care what WiFi network you are on.
    </p>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="Micro-Segmentation">
        <p className="text-sm text-muted-foreground">
          Instead of one giant trusted network, every single application is isolated. Just because you have access to the Jira server does not mean your laptop can even organically 'see' or ping the GitHub Enterprise server.
        </p>
      </Card>
      <Card title="Context-Aware Access">
        <p className="text-sm text-muted-foreground">
          Authentication is evaluated continuously on every single click. Even with a valid password, if you try to hit the Production DB, Zero Trust checks: Is it 3 AM? Is this a company-issued laptop? Does the laptop have the latest OS patch installed?
        </p>
      </Card>
    </Grid>,
    <Callout key="6" type="tip" title="Developer Impact: OAuth Everywhere">
      Zero Trust forces developers to add strict Identity-Aware Proxies (IAP) in front of everything. You can no longer run a "quick unprotected internal tool" on port 8080. Every internal dashboard must use SSO (Single Sign-On) and JWT validation as if it were facing the public internet.
    </Callout>,
  ],
};
