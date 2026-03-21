import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const webVitalsTopic: Topic = {
  id: "web-vitals",
  title: "Core Web Vitals",
  description:
    "Google's mathematical algorithm for permanently deleting your entire business from search results if your website is physically slow.",
  tags: ["frontend", "performance", "seo"],
  icon: "Zap",
  content: [
    <p key="1">
      You built an incredibly complex React dashboard. It looks beautiful on your Macbook Pro. However, when users with budget Android phones on 3G connections attempt to load it, they abandon the screen after 6 seconds. Google punishes poor UX and enforces SEO ranking heavily based on three strict technical measurements.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Big Three Measurements
    </h3>,
    <Table
      key="3"
      headers={["Metric", "What it Measures", "The Developer Fix"]}
      rows={[
        [
          "LCP",
          "Largest Contentful Paint. Measures when the absolute largest image or text block physically renders on screen. Must be under 2.5 seconds.",
          "Lazy load images below the fold. Compress hero images to WebP. Avoid client-side rendering for critical content."
        ],
        [
          "INP",
          "Interaction to Next Paint. When a user taps a button, how many milliseconds until the UI physically reacts? Must be under 200ms.",
          "Stop writing massive heavy synchronous Javascript tasks that block the Event Loop. Use Web Workers or break up logic."
        ],
        [
          "CLS",
          "Cumulative Layout Shift. How much the website physically jerks around randomly while loading, causing mis-clicks. Must be near zero.",
          "Never load an image without explicit strict height and width CSS constraints. The browser must reserve the space."
        ]
      ]}
    />,
    <Callout key="4" type="danger" title="The React useEffect Trap">
      React developers often suffer terrible LCP scores because they render a blank div, wait for a `useEffect` HTTP request to finish, and then finally render the giant Hero image. The browser must wait entirely for the Javascript cascade. SSR or SSG frameworks natively solve this logic.
    </Callout>,
  ],
};
