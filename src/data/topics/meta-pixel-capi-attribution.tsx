import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Flow } from "@/components/ui/Flow";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Fingerprint, History, MousePointerClick, Server, Target, Waypoints } from "lucide-react";

export const metaPixelCapiAttributionTopic: Topic = {
  id: "meta-pixel-capi-attribution",
  title: "Meta Pixel, CAPI & Ad Attribution",
  description:
    "How Meta turns website, app, offline, and messaging events into matching, measurement, and ad delivery signals — and how the stack changed from the pixel-only era to the modern privacy-constrained world.",
  tags: ["meta", "advertising", "tracking", "attribution", "architecture"],
  icon: "Target",
  content: [
    <p key="1">
      When people say "Meta is tracking what users like," the real mechanism is less magic and more
      event pipeline. Businesses send signals from websites, apps, CRMs, stores, and messaging
      flows into Meta's measurement stack. Meta then tries to answer three separate questions:{" "}
      <strong>Who was this?</strong>, <strong>what did they do?</strong>, and{" "}
      <strong>should future ads optimize toward people with similar behavior?</strong>
    </p>,

    <h3 key="2" className="text-xl font-bold mt-12 mb-4">
      Then vs Now: The Big Shift
    </h3>,
    <Grid key="3" cols={2} gap={6} className="mb-8 items-stretch">
      <FeatureCard icon={History} title="Then" subtitle="pixel-first, browser-heavy era" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          The older stack leaned heavily on the <strong className="text-amber-300">browser pixel</strong>,
          cookies, and mobile ad IDs. A user viewed a product, added it to cart, or purchased, and
          the browser fired the event directly. Measurement was more deterministic when the browser
          cooperated, but the whole setup was fragile.
        </p>
        <p className="text-sm text-amber-100/70">
          If the browser blocked scripts, dropped cookies, or the app ecosystem removed device-level
          identifiers, the signal simply disappeared.
        </p>
      </FeatureCard>
      <FeatureCard icon={Waypoints} title="Now" subtitle="hybrid, privacy-constrained measurement" theme="cyan">
        <p className="text-sm text-cyan-100/80 leading-relaxed mb-3">
          The modern stack is <strong className="text-cyan-300">hybrid</strong>: pixel in the
          browser, Conversions API from the server, app events, offline conversions, and messaging
          events. The goal is not just "track the click," but to rebuild enough clean signal for
          attribution, optimization, and audience modeling.
        </p>
        <p className="text-sm text-cyan-100/70">
          It is more resilient than pixel-only tracking, but also more privacy-constrained, more
          first-party dependent, and more reliant on matching quality and modeling.
        </p>
      </FeatureCard>
    </Grid>,

    <Table
      key="4"
      headers={["Dimension", "<span class='text-amber-200/85'>Then</span>", "<span class='text-cyan-200/85'>Now</span>"]}
      rows={[
        [
          "Main collection path",
          "Browser JavaScript pixel and app SDKs carried most of the load.",
          "Pixel + server-side CAPI + app + offline + messaging events all feed the same optimization system.",
        ],
        [
          "Identity signal quality",
          "Cookies and mobile ad IDs were easier to access, so deterministic linking was stronger.",
          "Signal is more consent-gated and fragmented, so matching leans harder on first-party data and event quality.",
        ],
        [
          "Reliability",
          "Browser failures, ad blockers, and client-side drop-off removed events entirely.",
          "Server-side delivery is less exposed to browser loading errors and ad blockers, so measurement is more resilient.",
        ],
        [
          "Optimization style",
          "Closer to direct event feedback loops from the browser.",
          "More multi-source, more modeled, and more dependent on which events are actually matchable and attributable.",
        ],
        [
          "Privacy environment",
          "Looser cross-site and device-level tracking assumptions.",
          "Post-ATT and browser privacy changes force a more constrained, explicitly policy-aware measurement stack.",
        ],
      ]}
    />,

    <h3 key="5" className="text-xl font-bold mt-12 mb-4">
      The Four Moving Parts
    </h3>,
    <Grid key="6" cols={2} gap={6} className="mb-10 items-stretch">
      <FeatureCard icon={MousePointerClick} title="Meta Pixel" subtitle="browser-side event capture" theme="amber">
        <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
          The pixel sits on a website and fires events such as <code>PageView</code>,{" "}
          <code>ViewContent</code>, <code>Search</code>, <code>AddToCart</code>, and{" "}
          <code>Purchase</code>. It is excellent for capturing immediate page behavior and user-path
          context directly in the browser.
        </p>
        <p className="text-sm text-amber-100/70">
          Weakness: browser-side collection is exposed to script failures, ad blockers, consent
          banners, and privacy restrictions.
        </p>
      </FeatureCard>

      <FeatureCard icon={Server} title="Conversions API" subtitle="server-side event delivery" theme="cyan">
        <p className="text-sm text-cyan-100/80 leading-relaxed mb-3">
          CAPI sends events from your <strong className="text-cyan-300">server, CRM, app backend,
          or store system</strong> directly to Meta. That includes website events, app events,
          offline sales, customer scores, messaging outcomes, and post-purchase actions.
        </p>
        <p className="text-sm text-cyan-100/70">
          It exists to improve reliability, event matching, measurement, and optimization when the
          browser alone is no longer enough.
        </p>
      </FeatureCard>

      <FeatureCard icon={Fingerprint} title="Identity Matching" subtitle="turn events into attributable people" theme="violet">
        <p className="text-sm text-violet-100/80 leading-relaxed mb-3">
          An event is only useful if Meta can connect it to an account or user journey with enough
          confidence. Matching is strengthened by better first-party data quality, better event
          metadata, and consistent business instrumentation across the funnel.
        </p>
        <p className="text-sm text-violet-100/70">
          This is why marketers obsess over <strong className="text-violet-300">event match quality</strong>:
          weak matching means weaker attribution and weaker optimization.
        </p>
      </FeatureCard>

      <FeatureCard icon={Target} title="Ad Delivery & Attribution" subtitle="what the system does with the signal" theme="orange">
        <p className="text-sm text-orange-100/80 leading-relaxed mb-3">
          Once events are matched and accepted, they feed two jobs:{" "}
          <strong className="text-orange-300">measurement</strong> (which campaign likely influenced
          this outcome?) and <strong className="text-orange-300">optimization</strong> (what kind of
          people should see more of this ad?).
        </p>
        <p className="text-sm text-orange-100/70">
          This is the layer that makes ads feel personalized: the system is not only counting
          conversions, it is using them as future ranking feedback.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="7" className="text-xl font-bold mt-12 mb-4">
      What Behavior Actually Becomes Signal?
    </h3>,
    <Table
      key="8"
      headers={["Source", "Examples of Events", "Why Meta Cares"]}
      rows={[
        [
          "<span class='text-slate-200 font-semibold'>Website Pixel</span>",
          "Page view, content view, search, add to cart, checkout start, purchase",
          "High-intent web behavior helps retargeting, attribution, and purchase optimization.",
        ],
        [
          "<span class='text-slate-200 font-semibold'>Server / CAPI</span>",
          "Server-confirmed purchase, lead qualification, subscription activation, customer value score",
          "Richer and more durable signal, especially for later-funnel and post-purchase actions.",
        ],
        [
          "<span class='text-slate-200 font-semibold'>App Events</span>",
          "App open, registration, tutorial completion, in-app purchase, retention milestones",
          "Tells Meta which ads drive actual mobile app outcomes, not just installs.",
        ],
        [
          "<span class='text-slate-200 font-semibold'>Offline / CRM</span>",
          "In-store purchase, phone sale, qualified lead, closed deal",
          "Lets Meta optimize toward business value that happens after the click, outside the browser.",
        ],
        [
          "<span class='text-slate-200 font-semibold'>Messaging</span>",
          "Business chat started, purchase through Messenger/Instagram/WhatsApp",
          "Extends optimization into conversational commerce and support flows.",
        ],
        [
          "<span class='text-slate-200 font-semibold'>Meta First-Party Behavior</span>",
          "What people watch, like, click, save, follow, or engage with on Meta's own apps",
          "This is Meta's native behavioral graph and remains important even without any external pixel.",
        ],
      ]}
    />,

    <h3 key="9" className="text-xl font-bold mt-12 mb-4">
      The Pipeline: From User Action to "You Might Like This"
    </h3>,
    <Flow
      key="10"
      steps={[
        {
          title: "1. A user does something meaningful",
          description:
            "They view a product, search for a category, start checkout, purchase, open an app, or buy later in a store.",
        },
        {
          title: "2. The business emits an event",
          description:
            "The event is sent by the browser pixel, a mobile SDK, the Conversions API, or an offline/messaging integration.",
        },
        {
          title: "3. The event gets enriched",
          description:
            "The payload carries metadata such as event type, timestamp, value, currency, content category, and customer information the business is allowed to share.",
        },
        {
          title: "4. Meta tries to match it",
          description:
            "The system attempts to connect that event to a Meta account or journey strongly enough for measurement and ad optimization.",
        },
        {
          title: "5. Attribution and reporting update",
          description:
            "Meta decides whether the event should count as a result influenced by a specific ad exposure or click, then reports it back in Events Manager and Ads Manager.",
        },
        {
          title: "6. Delivery models learn from it",
          description:
            "Future ranking and bidding systems use those accepted outcomes to look for similar users or contexts more likely to generate the same kind of result.",
        },
      ]}
    />,

    <h3 key="11" className="text-xl font-bold mt-12 mb-4">
      Why the Ads Feel Eerily Relevant
    </h3>,
    <Table
      key="12"
      headers={["What You Notice", "What Is Probably Happening Behind the Scenes"]}
      rows={[
        [
          "You viewed shoes, then saw the exact same shoes later.",
          "Classic retargeting loop: product-page view or add-to-cart event fed a remarketing audience.",
        ],
        [
          "You never bought, but you keep seeing similar products.",
          "The system learned category intent from view/search/cart events and kept optimizing around that interest cluster.",
        ],
        [
          "You bought in-store and ads suddenly changed.",
          "The business may be sending offline or CRM outcomes back to Meta, which changes attribution and future audience modeling.",
        ],
        [
          "You clicked an ad on mobile, then converted later on desktop.",
          "Attribution may still work if Meta can connect the journey strongly enough across account-level behavior and business signals.",
        ],
        [
          "You still get relevant ads even when a pixel misses.",
          "Modern optimization is not pixel-only anymore. Meta can combine server-side business events with its own first-party engagement data. This is an inference from Meta's public descriptions of optimization, matching, and AI-driven ad systems.",
        ],
      ]}
    />,

    <Callout key="13" type="warning" title="What CAPI Is Not">
      <strong>CAPI is not an official bypass for privacy rules.</strong> Meta explicitly says the
      Conversions API is not designed to circumvent Apple's App Tracking Transparency framework or
      privacy rules such as the ePrivacy Directive in Europe. What it does do is move more of the
      measurement stack into first-party, server-side infrastructure where browser breakage hurts
      less.
    </Callout>,

    <Callout key="14" type="info" title="What Changed After ATT and Browser Privacy Tightening">
      Since <strong className="text-sky-300">April 26, 2021</strong>, iOS apps have needed ATT
      permission to track users or access the advertising identifier. That pushed the ecosystem away
      from assuming rich device-level tracking was always available. The modern Meta stack is
      therefore more hybrid, more consent-aware, and more dependent on clean first-party events than
      the old pixel-only world.
    </Callout>,
  ],
};
