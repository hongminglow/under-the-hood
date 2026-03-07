import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Highlight } from "@/components/ui/Highlight";

export const tauriUnderTheHoodTopic: Topic = {
  id: "tauri-under-the-hood",
  title: "Tauri Under the Hood",
  description:
    "A deep dive into Tauri's architecture, its cross-platform capabilities, and how the frontend and Rust core communicate.",
  tags: ["tauri", "rust", "cross-platform", "mobile", "architecture"],
  icon: "Laptop",
  content: [
    <p key="1">
      Tauri is a toolkit for building highly-secure, performant, and
      cross-platform native applications using web technologies. Unlike
      Electron, which bundles a complete Chromium instance and Node.js
      environment into every app, Tauri leverages the system's native WebView to
      render the UI while relying on a lightweight Rust backend.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="The Webview Engine (Frontend)">
        <p className="mb-2 text-sm">
          Tauri apps render HTML/CSS/JS exactly like a browser. But instead of
          shipping a massive browser engine, it uses the OS's native webview
          component:
        </p>
        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
          <li>
            <strong>Windows:</strong> Edge WebView2
          </li>
          <li>
            <strong>macOS/iOS:</strong> WebKit (WKWebView)
          </li>
          <li>
            <strong>Linux:</strong> WebKitGTK
          </li>
          <li>
            <strong>Android:</strong> Android System WebView
          </li>
        </ul>
      </Card>
      <Card title="The Rust Core (Backend)">
        The backend is written in Rust, which provides extreme security, safety,
        and performance. It handles computationally heavy tasks, native OS API
        access (like file systems or notifications), and provides a secure
        bridge for the frontend to communicate with the operating system.
      </Card>
    </Grid>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      Cross-Platform: Web, Desktop, & Mobile
    </h3>,
    <p key="4" className="mb-4">
      Yes, you really can use one codebase across Web, Desktop, Windows, Mac,
      Linux, iOS, and Android! However, the way Tauri approaches mobile
      development is fundamentally different from React Native.
    </p>,
    <Callout key="5" type="tip" title="Tauri Mobile vs React Native">
      <p className="mb-2">
        <Highlight variant="primary">React Native</Highlight> does not use
        HTML/CSS. It executes your JavaScript UI logic in a background thread
        and binds those instructions directly to native OS widgets (like
        `UIView` on iOS or `View` on Android).
      </p>
      <p>
        <Highlight variant="primary">Tauri Mobile</Highlight> wraps your
        frontend application inside a native webview component. It completely
        lifts the exact HTML/CSS/JS from your desktop build directly onto the
        mobile device. The UI visually renders exactly the same, but you still
        have access to native device APIs (camera, vibration, sensors) via Rust
        plugins.
      </p>
    </Callout>,
    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      The `src` vs `src-tauri` Architecture
    </h3>,
    <p key="7" className="mb-4">
      A typical Tauri project enforces a strict boundary between the UI logic
      and backend logic. They run in entirely separate OS processes.
    </p>,
    <Grid key="8" cols={2} gap={6} className="my-8">
      <Card title={'The "src" Directory'}>
        Contains your standard frontend framework (React, Vue, Svelte, etc.).
        When you change code here, Vite/Webpack hot-reloads the UI in the
        development webview.{" "}
        <strong>It has no direct interaction with Rust compilation.</strong>
      </Card>
      <Card title={'The "src-tauri" Directory'}>
        Contains the Rust application server. You touch this folder only to
        define custom native commands, adjust security permissions, or configure
        app menus. Changing code here triggers the Tauri CLI to automatically
        recompile the Rust binary.
      </Card>
    </Grid>,
    <Callout key="9" type="info" title="How Do They Communicate?">
      When your React app (in `src`) needs to trigger a native OS action, it
      uses Tauri's JS package. This sends an{" "}
      <strong>Inter-Process Communication (IPC)</strong> message across a secure
      bridge. The Rust backend intercepts the message, executes the native
      routine, and asynchronously returns the result back to JavaScript.
    </Callout>,
  ],
};
