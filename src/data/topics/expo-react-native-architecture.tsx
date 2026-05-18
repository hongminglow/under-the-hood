import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { Card } from "@/components/ui/Card";
import { MistakeCard } from "@/components/ui/MistakeCard";
import {
  Smartphone,
  Layers,
  Zap,
  Cloud,
  Package,
  ArrowLeftRight,
  ShieldCheck,
  Server,
  Cpu,
  Trash2,
  FileArchive,
} from "lucide-react";

export const expoReactNativeArchitectureTopic: Topic = {
  id: "expo-react-native-architecture",
  title: "Expo & React Native: Mobile Architecture",
  description:
    "How Expo lets you scan a QR code and instantly run your app on a phone — the full architecture from JavaScript bundle to native pixels, and what separates Expo from bare React Native.",
  tags: ["mobile", "react-native", "expo", "architecture", "cross-platform"],
  icon: "Smartphone",
  content: [
    <p key="1" className="text-slate-300 mb-6">
      Expo is not just a convenience wrapper around React Native — it is a{" "}
      <strong>complete platform</strong> that includes an SDK of pre-built
      native modules, a cloud build service, an over-the-air update system, and
      a development client that lets you preview apps instantly by scanning a QR
      code. Understanding its architecture reveals why it can do things that
      seem magical and where those abstractions have limits.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Abstraction Stack
    </h3>,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <FeatureCard
        icon={Smartphone}
        title="Your App Code"
        subtitle="React components + Expo SDK"
        theme="violet"
      >
        <p className="text-sm text-violet-100/75 mb-2">
          The layer you write every day.
        </p>
        <p className="text-xs text-violet-200/70">
          Standard React components, hooks, and navigation — plus the{" "}
          <strong>Expo SDK</strong> (Camera, Notifications, FileSystem, etc.)
          that exposes native device APIs as JavaScript imports.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Layers}
        title="React Native Runtime"
        subtitle="JS → Native bridge"
        theme="cyan"
      >
        <p className="text-sm text-cyan-100/75 mb-2">
          The engine under the hood.
        </p>
        <p className="text-xs text-cyan-200/70">
          Hermes (JS engine) executes your bundle. The{" "}
          <strong>New Architecture</strong> (JSI + Fabric + TurboModules)
          provides synchronous, zero-copy communication between JavaScript and
          native platform code — replacing the old async JSON bridge.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Package}
        title="Native Platform Layer"
        subtitle="iOS (UIKit) / Android (Views)"
        theme="amber"
      >
        <p className="text-sm text-amber-100/75 mb-2">
          Real native UI — not a WebView.
        </p>
        <p className="text-xs text-amber-200/70">
          React Native renders actual native views (UILabel, TextView,
          ScrollView). Your JS code describes <strong>what</strong> to render;
          the native layer handles <strong>how</strong> to render it on each
          platform.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      How the QR Code Magic Works
    </h3>,
    <p key="5" className="text-slate-300 mb-6">
      When you run <code className="text-cyan-300 bg-slate-800 px-1 rounded">npx expo start</code>,
      the CLI boots <strong>Metro Bundler</strong> (a JavaScript bundler
      purpose-built for React Native) on your development machine. The QR code
      encodes a URL pointing to that bundler over your local network. Here is
      what happens when you scan it:
    </p>,
    <Flow
      key="6"
      steps={[
        {
          title: "1. QR Code → Network URL",
          description:
            "The QR code contains a URL like exp://192.168.1.42:8081. Expo Go (or your dev client) reads this URL to locate your development machine on the LAN.",
        },
        {
          title: "2. Expo Go Requests the JS Bundle",
          description:
            "The Expo Go app sends an HTTP request to Metro Bundler asking for the full JavaScript bundle. Metro compiles your TypeScript/JSX into a single JS file on the fly.",
        },
        {
          title: "3. Bundle Downloads to Phone",
          description:
            "The compiled JS bundle (typically 1–5 MB in dev mode) is downloaded to the phone over WiFi. This is pure JavaScript — no native compilation happens.",
        },
        {
          title: "4. Hermes Engine Executes the Bundle",
          description:
            "The Hermes JavaScript engine on the phone parses and executes the bundle. React Native's renderer translates your React tree into native view commands.",
        },
        {
          title: "5. Live Reload / Fast Refresh",
          description:
            "Metro keeps a WebSocket connection open. When you save a file, only the changed module is sent to the phone and hot-swapped — preserving component state.",
        },
      ]}
    />,

    <Callout key="7" type="info" title="Why No Compilation?">
      This is the key insight: Expo Go already contains a{" "}
      <strong>pre-compiled native runtime</strong> with every Expo SDK module
      baked in. Your app is just a JavaScript bundle that runs inside that
      pre-built shell. That is why you never need Xcode or Android Studio during
      development — the native code is already on the phone.
    </Callout>,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Expo Go vs Development Builds vs Production
    </h3>,
    <Table
      key="9"
      headers={["", "Expo Go", "Development Build", "Production Build"]}
      rows={[
        [
          "What it is",
          "Pre-built app from App Store with the full Expo SDK embedded.",
          "Custom native binary compiled with your specific native modules.",
          "Final .ipa/.apk/.aab submitted to App Store / Google Play.",
        ],
        [
          "Native modules",
          "Only Expo SDK modules. Cannot use custom native code or third-party native libs.",
          "Any native module — same flexibility as bare React Native.",
          "Same as dev build — your exact native dependency set.",
        ],
        [
          "Build required?",
          "No. Scans QR code and runs immediately.",
          "Yes. Built once via EAS Build or locally. Then uses QR for JS updates.",
          "Yes. Full optimized build via EAS Build.",
        ],
        [
          "Best for",
          "Quick prototyping, learning, simple apps that only need Expo SDK.",
          "Real-world apps with custom native code, production-grade development.",
          "App Store / Play Store distribution.",
        ],
      ]}
    />,

    <h3 key="10" className="text-xl font-bold mt-8 mb-4">
      React Native's Bridge: Old vs New Architecture
    </h3>,
    <p key="11" className="text-slate-300 mb-6">
      The bridge is how JavaScript communicates with native platform code. This
      is the single most important architectural concept in React Native — and
      the old design was its biggest bottleneck.
    </p>,
    <Grid key="12" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={ArrowLeftRight}
        title="Old Architecture (Bridge)"
        subtitle="Async JSON serialization"
        theme="emerald"
      >
        <p className="text-sm text-red-100/75 mb-2">
          Every call between JS and native was serialized as{" "}
          <strong>JSON</strong>, passed across an async bridge, and deserialized
          on the other side.
        </p>
        <ul className="text-xs text-red-200/70 list-disc pl-4 space-y-1">
          <li>All communication was asynchronous and batched.</li>
          <li>JSON serialization added measurable overhead per message.</li>
          <li>
            Gesture-heavy UIs stuttered because JS couldn't respond to native
            events synchronously.
          </li>
          <li>
            The bridge was a single-lane road — high-frequency events (scroll,
            gestures) caused traffic jams.
          </li>
        </ul>
      </FeatureCard>
      <FeatureCard
        icon={Zap}
        title="New Architecture (JSI + Fabric)"
        subtitle="Synchronous, zero-copy C++ interface"
        theme="cyan"
      >
        <p className="text-sm text-cyan-100/75 mb-2">
          JavaScript talks to native code through{" "}
          <strong>JSI (JavaScript Interface)</strong> — a C++ layer that
          exposes native objects directly to the JS runtime.
        </p>
        <ul className="text-xs text-cyan-200/70 list-disc pl-4 space-y-1">
          <li>
            <strong>JSI:</strong> JS can call C++ functions synchronously — no
            JSON, no bridge, no async overhead.
          </li>
          <li>
            <strong>Fabric:</strong> New rendering system that creates native
            view trees in C++, enabling concurrent rendering.
          </li>
          <li>
            <strong>TurboModules:</strong> Native modules load lazily and
            communicate synchronously via JSI.
          </li>
          <li>
            <strong>Codegen:</strong> TypeScript types generate C++ interfaces
            at build time for type-safe native bindings.
          </li>
        </ul>
      </FeatureCard>
    </Grid>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      EAS: Expo Application Services
    </h3>,
    <p key="14" className="text-slate-300 mb-6">
      EAS is Expo's cloud infrastructure for building, deploying, and updating
      apps. It solves the hardest operational problems in mobile development:
      native compilation and app store distribution.
    </p>,
    <Grid key="15" cols={3} gap={6} className="my-8">
      <FeatureCard
        icon={Server}
        title="EAS Build"
        subtitle="Cloud-native compilation"
        theme="sky"
      >
        <p className="text-sm text-sky-100/75 mb-2">
          Compiles your native iOS/Android binaries in the cloud.
        </p>
        <p className="text-xs text-sky-200/70">
          You don't need a Mac for iOS builds. EAS runs Xcode and Gradle on
          cloud machines, producing signed <strong>.ipa</strong> and{" "}
          <strong>.aab</strong> artifacts. Manages certificates and provisioning
          profiles automatically.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Cloud}
        title="EAS Update (OTA)"
        subtitle="Bypass the App Store for JS changes"
        theme="violet"
      >
        <p className="text-sm text-violet-100/75 mb-2">
          Push JavaScript updates directly to users' devices.
        </p>
        <p className="text-xs text-violet-200/70">
          Since the native shell doesn't change, you can update the JS bundle
          over-the-air without an App Store review cycle. The app checks for
          updates on launch and downloads the new bundle in the background.
          Critical for hotfixes.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={ShieldCheck}
        title="EAS Submit"
        subtitle="Automated store distribution"
        theme="amber"
      >
        <p className="text-sm text-amber-100/75 mb-2">
          Submits builds to Apple App Store and Google Play.
        </p>
        <p className="text-xs text-amber-200/70">
          Handles the metadata, screenshots, and binary upload. Integrates with
          Apple's App Store Connect and Google Play Console APIs directly from
          your CI/CD pipeline.
        </p>
      </FeatureCard>
    </Grid>,

    <Callout key="16" type="warning" title="OTA Update Limits">
      Over-the-air updates can only change the <strong>JavaScript bundle</strong>{" "}
      and assets (images, fonts). If you add a new native module, change native
      configuration (app.json splash screen, permissions), or upgrade the Expo
      SDK version, you <strong>must</strong> submit a new native binary through
      the App Store. Apple's guidelines also prohibit OTA updates that change the
      app's core purpose or functionality.
    </Callout>,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      How OTA Updates Work Internally
    </h3>,
    <Flow
      key="18"
      steps={[
        {
          title: "1. Developer Publishes an Update",
          description:
            "Running 'eas update' bundles the JS code + assets and uploads them to Expo's CDN, tagged to a specific branch and runtime version.",
        },
        {
          title: "2. App Checks on Launch",
          description:
            "The expo-updates library embedded in the native shell checks Expo's servers for a new bundle matching the app's runtime version and update channel.",
        },
        {
          title: "3. Background Download",
          description:
            "If a new update exists, it downloads in the background while the user sees the current version. No loading spinner or interruption.",
        },
        {
          title: "4. Atomic Swap on Next Launch",
          description:
            "On the next app launch, the new bundle is swapped in atomically. If the new bundle crashes, the app automatically rolls back to the previous working version.",
        },
      ]}
    />,

    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      Expo vs Bare React Native
    </h3>,
    <Table
      key="20"
      headers={["Dimension", "Expo (Managed)", "Bare React Native"]}
      rows={[
        [
          "Setup time",
          "Minutes. npx create-expo-app and go.",
          "Hours. Requires Xcode, Android Studio, CocoaPods, Gradle configuration.",
        ],
        [
          "Native module access",
          "Full access since Expo SDK 50+. Use 'expo prebuild' to generate native projects when custom native code is needed.",
          "Full access. You own the native projects (ios/ and android/ folders) directly.",
        ],
        [
          "OTA updates",
          "Built-in via EAS Update. One command to push JS updates.",
          "Requires manual setup with CodePush or a custom solution.",
        ],
        [
          "Cloud builds",
          "EAS Build handles iOS and Android compilation. No Mac needed for iOS.",
          "Must set up your own CI (Fastlane, GitHub Actions, Bitrise) and maintain a Mac for iOS.",
        ],
        [
          "Config management",
          "app.json / app.config.ts — declarative. 'expo prebuild' generates native config.",
          "Manual Info.plist, build.gradle, AndroidManifest.xml editing.",
        ],
        [
          "Upgrade path",
          "expo upgrade — handles dependency version alignment across SDK + RN + native modules.",
          "Manual. Upgrading React Native often requires merging native project diffs (react-native-upgrade-helper).",
        ],
        [
          "Vendor lock-in",
          "Minimal since SDK 50. 'npx expo prebuild' ejects to a bare project at any time. EAS is optional.",
          "None — but you accept all the operational burden.",
        ],
      ]}
    />,

    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      The Prebuild System: Continuous Native Generation
    </h3>,
    <p key="22" className="text-slate-300 mb-6">
      Modern Expo uses a paradigm called{" "}
      <strong>Continuous Native Generation (CNG)</strong>. Instead of
      maintaining native iOS/Android project files by hand, you define your
      native configuration declaratively in{" "}
      <code className="text-cyan-300 bg-slate-800 px-1 rounded">app.json</code>{" "}
      and Expo config plugins. Running{" "}
      <code className="text-cyan-300 bg-slate-800 px-1 rounded">npx expo prebuild</code>{" "}
      generates the native projects from scratch.
    </p>,
    <Grid key="23" cols={1} gap={6} className="my-8">
      <Card title="Why CNG Matters">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            <strong>ios/ and android/ are gitignored.</strong> They are
            generated artifacts, not source code. This eliminates merge conflicts
            on native files.
          </li>
          <li>
            <strong>Upgrading React Native becomes trivial.</strong> You bump the
            SDK version in app.json and re-run prebuild. No more diffing native
            project templates.
          </li>
          <li>
            <strong>Config plugins replace manual native editing.</strong> Need
            to add a permission to AndroidManifest.xml? Write a plugin or use an
            existing one — the native file is regenerated with every prebuild.
          </li>
          <li>
            <strong>Reproducible builds.</strong> Any developer can clone the repo
            and run prebuild to get identical native projects without copying
            generated folders.
          </li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="24" className="text-xl font-bold mt-8 mb-4">
      Common Pitfalls
    </h3>,
    <Grid key="25" cols={2} gap={6}>
      <MistakeCard
        number={1}
        title="Using Expo Go for Production-Grade Apps"
        problem="Expo Go can't include custom native modules (e.g. react-native-ble-plx, custom TurboModules). Developers hit a wall when they need native code beyond the Expo SDK."
        solution="Use Development Builds instead. Run 'npx expo prebuild' then 'npx expo run:ios/android' to create a custom dev client with your exact native dependencies. Expo Go is for prototyping only."
      />
      <MistakeCard
        number={2}
        title="Assuming OTA Updates Replace App Store Releases"
        problem="Developers push native config changes (new permissions, new native modules) via OTA and wonder why the app crashes."
        solution="OTA only updates JavaScript and assets. Any native-level change (new permissions, new native module, SDK version bump) requires a full native rebuild and App Store submission."
      />
      <MistakeCard
        number={3}
        title="Ignoring Bundle Size in Development"
        problem="Dev bundles are unoptimized and huge. Developers assume production will be similarly slow."
        solution="Dev mode disables Hermes bytecode compilation and minification. Production builds compile JS to Hermes bytecode (.hbc) which is 30-50% smaller and executes significantly faster. Always profile on production builds."
      />
      <MistakeCard
        number={4}
        title="Fighting the Prebuild System"
        problem="Developers manually edit ios/ and android/ folders, then those changes vanish when prebuild runs again."
        solution="Write Expo config plugins to modify native files declaratively. Plugins run during prebuild and apply your changes every time. Never hand-edit generated native projects."
      />
    </Grid>,

    <Callout key="26" type="tip" title="Expo Router: File-Based Mobile Routing">
      <strong>Expo Router</strong> brings Next.js-style file-based routing to
      mobile apps. Drop a file into the <code>app/</code> directory and it
      becomes a screen. It supports nested layouts, typed routes, deep linking,
      and universal rendering (same route can serve web and native). This is the
      direction the React Native ecosystem is converging toward.
    </Callout>,

    <h3 key="27" className="text-xl font-bold mt-8 mb-4">
      Hermes: The JavaScript Engine Built for Mobile
    </h3>,
    <p key="28" className="text-slate-300 mb-6">
      React Native doesn't use V8 (Chrome's engine) or JavaScriptCore (Safari's
      engine) by default anymore. It uses <strong>Hermes</strong> — an engine
      Meta built specifically to solve mobile JavaScript performance problems.
    </p>,
    <Grid key="29" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Cpu}
        title="Ahead-of-Time (AOT)"
        subtitle="Bytecode Compilation"
        theme="indigo"
      >
        <p className="text-xs text-indigo-200/70">
          Unlike V8 which parses and JIT-compiles JavaScript at runtime, Hermes compiles
          your JS to bytecode (<code>.hbc</code>) at <em>build time</em>. The
          phone never parses raw JavaScript, which dramatically reduces cold-start time.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Zap}
        title="No JIT Compiler"
        subtitle="Memory Over Throughput"
        theme="amber"
      >
        <p className="text-xs text-amber-200/70">
          Hermes intentionally omits Just-In-Time compilation. JIT compilers consume 
          significant memory and CPU during warmup. On mobile, the memory savings from 
          skipping JIT outweigh the peak throughput gains it would provide.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Trash2}
        title="Optimized GC"
        subtitle="Tuned for Mobile Memory"
        theme="cyan"
      >
        <p className="text-xs text-cyan-200/70">
          Hermes uses a generational, moving Garbage Collector tuned for mobile memory 
          patterns. Short-lived UI allocations are collected cheaply, and GC pauses are 
          minimized to avoid frame drops during animations.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={FileArchive}
        title="Smaller Bundle Size"
        subtitle="30-50% Reduction"
        theme="fuchsia"
      >
        <p className="text-xs text-fuchsia-200/70">
          Pre-compiled bytecode is typically 30–50% smaller than equivalent minified 
          JavaScript. This significantly reduces download times over cellular networks 
          and lowers storage usage on the device.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="30" className="text-xl font-bold mt-8 mb-4">
      Metro Bundler: Why Not Vite or Webpack?
    </h3>,
    <p key="31" className="text-slate-300 mb-6">
      Metro is React Native's dedicated JavaScript bundler. It exists because
      web bundlers like Vite and Webpack were designed for browsers, and mobile
      has fundamentally different requirements:
    </p>,
    <Grid key="32" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Package}
        title="Platform-Aware Resolution"
        subtitle="One codebase, two platforms"
        theme="sky"
      >
        <p className="text-xs text-sky-200/70">
          When you import <code>./Button</code>, Metro automatically resolves to{" "}
          <code>Button.ios.tsx</code> or <code>Button.android.tsx</code> based on
          the target platform. Web bundlers have no concept of this. Metro also
          resolves <code>.native.tsx</code> extensions as a fallback hierarchy.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Zap}
        title="Incremental Builds & HMR"
        subtitle="Sub-second refresh cycles"
        theme="violet"
      >
        <p className="text-xs text-violet-200/70">
          Metro keeps the entire dependency graph in memory. When you save a file,
          it only retransforms the changed module and sends a delta update over
          WebSocket — no full rebundle. Combined with React Fast Refresh
          (which preserves component state), edit-to-screen time is typically
          under 200ms.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="33" className="text-xl font-bold mt-8 mb-4">
      Cross-Platform Landscape: Where Does Expo Fit?
    </h3>,
    <p key="34" className="text-slate-300 mb-6">
      Expo/React Native is one of several cross-platform approaches. Each makes
      fundamentally different architectural tradeoffs:
    </p>,
    <Table
      key="35"
      headers={["", "Expo / React Native", "Flutter", "PWA (Web App)"]}
      rows={[
        [
          "Rendering",
          "Native platform views (UIKit/Android Views). The OS renders the UI.",
          "Custom Skia rendering engine. Flutter draws every pixel itself — no platform views.",
          "Browser renders HTML/CSS. Runs inside the browser engine (WebView or standalone).",
        ],
        [
          "Language",
          "JavaScript/TypeScript. Huge existing ecosystem and talent pool.",
          "Dart. Smaller ecosystem but strong tooling and type safety.",
          "JavaScript/TypeScript + HTML/CSS. Standard web stack.",
        ],
        [
          "Performance",
          "Near-native. New Architecture (JSI) eliminates bridge overhead. Animation-heavy apps may need native modules.",
          "Near-native. Skia renders at 60/120fps. No bridge — Dart compiles to ARM natively.",
          "Browser-constrained. Limited by WebView performance, no direct hardware access.",
        ],
        [
          "Platform feel",
          "Native look and feel by default — uses actual platform widgets.",
          "Pixel-identical across platforms. Custom Material/Cupertino widgets simulate native feel.",
          "Web-native feel. Does not match iOS/Android platform conventions without significant effort.",
        ],
        [
          "OTA updates",
          "Built-in via EAS Update. JS bundle swaps without app store review.",
          "Not natively supported. Shorebird offers a third-party solution but it's less mature.",
          "Instant — every page load fetches the latest version. No app store involved.",
        ],
        [
          "App Store required?",
          "Yes for native distribution. Can also target web via Expo's universal platform.",
          "Yes for native distribution.",
          "No. Installable via browser (Add to Home Screen). But limited API access.",
        ],
      ]}
    />,

    <Callout key="36" type="info" title="Why React Native Wins for Web Teams">
      If your team already writes React for the web, Expo/React Native has the
      lowest context-switching cost. Your component model, state management
      (Redux, Zustand, Jotai), navigation patterns, and even some UI libraries
      transfer directly. Flutter requires learning Dart and an entirely different
      widget paradigm. PWAs avoid native entirely but sacrifice access to
      platform APIs like push notifications (on iOS), Bluetooth, NFC, and
      background processing.
    </Callout>,
  ],
};
