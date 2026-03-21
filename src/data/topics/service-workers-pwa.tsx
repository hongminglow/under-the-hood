import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const serviceWorkersPwaTopic: Topic = {
  id: "service-workers-pwa",
  title: "Service Workers & PWAs",
  description:
    "How to turn a website into an offline-capable, installable application using background proxy scripts and manifests.",
  tags: ["frontend", "architecture", "pwa"],
  icon: "Link",
  content: [
    <p key="1">
      A <strong>Progressive Web App (PWA)</strong> is a website that uses modern web capabilities to deliver an app-like experience. The "magic" happens via the <strong>Service Worker</strong>, a special type of Web Worker that acts as a programmable <strong>Network Proxy</strong> sitting between your browser and the internet.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Service Worker Lifecycle
    </h3>,
    <p key="3" className="mb-4 text-sm text-muted-foreground">
      Unlike standard JS, a Service Worker is <strong>event-driven</strong>. It doesn't run continuously; it wakes up only when needed (e.g., a push notification arrives or a fetch is made).
    </p>,
    <Table
      key="4"
      headers={["Event", "What Happens", "Developer Goal"]}
      rows={[
        ["install", "The worker is downloaded.", "Pre-cache the 'App Shell' (HTML, CSS, JS)."],
        ["activate", "The old worker is replaced.", "Clean up old <code>CacheStorage</code> versions."],
        ["fetch", "Every network request is intercepted.", "Decide: Serve from cache or go to network?"],
        ["sync", "Network connection is restored.", "Re-send failed 'POST' requests (like a chat message)."]
      ]}
    />,
    <h3 key="5" className="text-xl font-bold mt-8 mb-4">
      Advanced Caching Strategies
    </h3>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="Stale-While-Revalidate">
        <p className="text-sm text-muted-foreground mb-2">
          Serve <strong>instantly</strong> from cache, then update in background.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Perfect for avatars and news feeds. User gets speed now, fresh data in the next visit.
        </p>
      </Card>
      <Card title="Cache-First (Offline-First)">
        <p className="text-sm text-muted-foreground mb-2">
          Only check network if the cache is empty.
        </p>
        <p className="text-xs italic text-muted-foreground">
          Best for static fonts, icons, and CSS. This makes your app feel like it's running locally on the SSD.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      The PWA "App Shell" Architecture
    </h3>,
    <p key="8" className="mb-4">
      To make a PWA feel fast, developers separate the <strong>App Shell</strong> (the UI structure: header, sidebar, loading state) from the <strong>Dynamic Content</strong> (the data from the API).
    </p>,
    <ul key="9" className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li><strong>Manifest.json:</strong> A JSON file that defines the app's name, icons, and start URL. This allows the browser to show the "Add to Home Screen" prompt.</li>
      <li><strong>HTTPS Mandatory:</strong> Service Workers have "God Mode" over your traffic. For security, they <strong>only</strong> work over encrypted HTTPS connections (except localhost).</li>
      <li><strong>IndexedDB:</strong> For large amounts of offline data, use <strong>IndexedDB</strong> rather than the Cache API.</li>
    </ul>,
    <Callout key="10" type="warning" title="The 'Skip Waiting' Gotcha">
      By default, a new Service Worker won't take control until the user closes <strong>all</strong> open tabs of your site. This is why many PWAs show a "New version available! Reload now" toast—it triggers <code>skipWaiting()</code> to force the update immediately.
    </Callout>,
  ],
};
