import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const cdnUnderTheHoodTopic: Topic = {
  id: "cdn-under-the-hood",
  title: "CDN Under the Hood",
  description:
    "How deploying a globally distributed caching network drastically slashes website loading times.",
  tags: ["networking", "performance", "caching"],
  icon: "Globe",
  content: [
    <p key="1">
      A <strong>Content Delivery Network (CDN)</strong> is a globally distributed network of "Edge" servers that store copies of your website's content. By placing data physically closer to the user, CDNs bypass the speed-of-light limitations of long-distance undersea cables.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      How a CDN Routes Traffic: Anycast DNS
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      When you type <code>netflix.com</code>, you aren't hitting one IP. CDNs use <strong>Anycast DNS</strong>, where multiple servers around the world share the <em>same</em> IP address. BGP routing automatically sends your request to the topologically closest server.
    </p>,
    <Table
      key="4"
      headers={["Process", "What Happens", "Result"]}
      rows={[
        ["1. Origin Fetch", "CDN asks your main server (Origin) for the file.", "The 'First' request is slow (Cache Miss)."],
        ["2. Edge Caching", "CDN saves the file to its local SDD in the city.", "Subsequent requests are instant (Cache Hit)."],
        ["3. Shielding", "CDN serves traffic instead of your server.", "Your backend CPU usage drops by 90%."],
        ["4. Purging", "You tell the CDN to delete its old copy.", "The CDN fetches the new version on the next request."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Cache Control: The Browser-to-CDN Contract
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="s-maxage vs. max-age">
        <p className="text-sm text-muted-foreground mb-2">
          Fine-tuning how long content lives.
        </p>
        <p className="text-xs italic text-muted-foreground">
          <code>max-age</code> tells the <strong>browser</strong> to cache it. <code>s-maxage</code> tells the <strong>CDN</strong> to cache it. This allows you to cache an image on the CDN for a year, but only in the browser for an hour.
        </p>
      </Card>
      <Card title="Stale-While-Revalidate">
        <p className="text-sm text-muted-foreground mb-2">
          Zero-latency updates.
        </p>
        <p className="text-xs italic text-muted-foreground">
          The CDN serves the old (stale) version immediately while silently fetching the new version from your origin in the background. The user never waits for a loading spinner.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Beyond Caching: Edge Computing
    </h3>,
    <p key="8" className="mb-4">
      Modern CDNs (Cloudflare, Vercel) aren't just for images. They support <strong>Edge Functions</strong> (Wasm/JavaScript). You can run logic like:
    </p>,
    <ul key="9" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>A/B Testing:</strong> Randomly serve different HTML files to users based on an Edge cookie.</li>
      <li><strong>Authentication:</strong> Verify a JWT token before the request even reaches your database.</li>
      <li><strong>Image Optimization:</strong> Resize and convert a JPEG to WebP on-the-fly at the Edge.</li>
    </ul>,
    <Callout key="10" type="tip" title="The 'Cache Busting' Pattern">
      Purging a CDN can take 30 seconds to several minutes globally. For instant updates, always use <strong>Content-Hashed Filenames</strong> (e.g., <code>main.abc123.js</code>). Since the filename is unique, the CDN treats it as new content and fetches it immediately.
    </Callout>,
  ],
};
