import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";

export const serviceWorkersTopic: Topic = {
  id: "service-workers-pwa",
  title: "Service Workers & PWAs",
  description:
    "The background scripts that let web apps work offline, receive push notifications, and install like native apps.",
  tags: ["frontend", "pwa", "offline", "performance"],
  icon: "Wifi",
  content: [
    <p key="1">
      A <strong>Service Worker</strong> is a JavaScript file that runs in a{" "}
      <strong>separate thread</strong> from your main page. It acts as a{" "}
      <strong>programmable network proxy</strong> — intercepting every fetch
      request your app makes and deciding whether to serve from cache, network,
      or a custom response.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      Service Worker Lifecycle
    </h4>,
    <Step key="3" index={1}>
      <strong>Register:</strong> Your page calls{" "}
      <code>navigator.serviceWorker.register('/sw.js')</code>. The browser
      downloads and parses the service worker.
    </Step>,
    <Step key="4" index={2}>
      <strong>Install:</strong> The <code>install</code> event fires. Pre-cache
      critical assets (HTML, CSS, JS, images).
    </Step>,
    <Step key="5" index={3}>
      <strong>Activate:</strong> The <code>activate</code> event fires. Clean up
      old caches from previous versions.
    </Step>,
    <Step key="6" index={4}>
      <strong>Fetch Interception:</strong> Every network request passes through
      the service worker's <code>fetch</code> event handler. Serve from cache →
      fall back to network → or vice versa.
    </Step>,
    <Grid key="7" cols={2} gap={6} className="my-8">
      <Card title="Cache-First Strategy">
        <p className="text-sm">
          Check cache first. If found, return instantly. If not, fetch from
          network and cache the response. Best for{" "}
          <strong>static assets</strong> that rarely change (logos, fonts,
          compiled bundles).
        </p>
      </Card>
      <Card title="Network-First Strategy">
        <p className="text-sm">
          Try network first. If online, return fresh data and update cache. If
          offline, fall back to cached version. Best for{" "}
          <strong>API responses</strong> that need freshness.
        </p>
      </Card>
      <Card title="Stale-While-Revalidate">
        <p className="text-sm">
          Return cached version <strong>immediately</strong> (fast) while
          simultaneously fetching fresh data from network to update the cache
          for next time. Best balance of speed and freshness.
        </p>
      </Card>
      <Card title="PWA Requirements">
        <p className="text-sm">
          <strong>Web App Manifest</strong> (defines app name, icons, theme),{" "}
          <strong>Service Worker</strong> (offline capability),{" "}
          <strong>HTTPS</strong> (security requirement). Meet these three and
          Chrome shows the "Install App" prompt.
        </p>
      </Card>
    </Grid>,
    <Callout key="8" type="warning" title="The Caching Trap">
      A misconfigured service worker can serve{" "}
      <strong>stale content forever</strong> — users see your old app even after
      you deploy updates. Always implement a <strong>cache versioning</strong>{" "}
      strategy and use <code>skipWaiting()</code> + <code>clients.claim()</code>{" "}
      to activate new workers immediately.
    </Callout>,
  ],
};
