import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const dnsSecurityTopic: Topic = {
  id: "dns-security",
  title: "DNS Security: DoH vs DoT",
  description:
    "Why standard DNS is a massive privacy leak, and how modern browsers are fighting back.",
  tags: ["security", "networking", "privacy"],
  icon: "Lock",
  content: [
    <p key="1">
      Your website runs on HTTPS, meaning your passwords and API payloads are heavily encrypted. But there is a massive glaring hole: The initial DNS lookup for "google.com" is sent as <strong>pure, unencrypted plaintext over UDP port 53.</strong>
    </p>,
    <p key="2" className="mt-4">
      This means the coffee shop WiFi owner, your Internet Service Provider, and the government can all easily read exactly what websites you are visiting, even if they can't read the specific pages on those sites.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Cryptographic Upgrades
    </h3>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="DNS over TLS (DoT)" description="Port 853">
        <p className="text-sm text-muted-foreground">
          DoT wraps the standard DNS UDP request inside a heavily encrypted TLS tunnel. Your ISP can see you are making a DNS request, but they cannot mathematically decrypt which domain you are asking for. It requires dedicated OS-level support.
        </p>
      </Card>
      <Card title="DNS over HTTPS (DoH)" description="Port 443">
        <p className="text-sm text-muted-foreground">
          DoH is much sneakier. It formats the DNS request as a standard HTTPS web request (literally `GET /dns-query?name=google.com`) and sends it over standard port 443. To network sniffers, this looks entirely identical to normal web browsing. Browsers (Chrome, Firefox) can do this natively without asking the OS.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="tip" title="Why Corporate IT Hates DoH">
      Companies rely on monitoring unencrypted DNS traffic to violently block employees from visiting malware or gambling sites. Because DoH fully encrypts and hides this traffic inside normal HTTPS streams, classic corporate firewall filters are completely blinded.
    </Callout>,
  ],
};
