import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const tauriUnderTheHoodTopic: Topic = {
  id: "tauri-under-the-hood",
  title: "Tauri Under the Hood",
  description:
    "Why developers are flocking from Electron to Tauri for building desktop applications using web technologies.",
  tags: ["tauri", "rust", "cross-platform", "architecture"],
  icon: "Laptop",
  content: [
    <p key="1">
      Tauri is a polyglot framework that allows developers to build <strong>Native Desktop & Mobile</strong> apps using standard web technologies. Its core mission is to provide a more secure, lightweight, and performant alternative to Electron.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Tauri vs. Electron: The Technical Shift
    </h3>,
    <Table
      key="3"
      headers={["Feature", "Electron (Chromium)", "Tauri (WebView)"]}
      rows={[
        ["Binary Size", "Huge (~100MB+ due to bundled Chrome).", "Tiny (~2-10MB, uses OS native engine)."],
        ["Memory Usage", "High (separate Chrome instance).", "Low (shared system resources)."],
        ["Language", "Node.js (Main) / JS (Renderer).", "<strong>Rust</strong> (Main) / Web (Renderer)."],
        ["Security", "Full Node.js access in renderer (unsafe).", "Strictly sandboxed with a <strong>Capabilities</strong> system."]
      ]}
    />,
    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The Inner Engine: WRY & TAO
    </h3>,
    <p key="5" className="mb-4">
      Tauri doesn't build a window from scratch. It uses two key Rust libraries:
    </p>,
    <Grid key="6" cols={2} gap={6} className="my-8">
      <Card title="TAO (Window Manager)">
        <p className="text-sm text-muted-foreground mb-2">
          Handles the <strong>Windowing</strong> logic across Windows, macOS, Linux, and now Mobile.
        </p>
        <p className="text-xs italic text-muted-foreground">
          It creates the physical OS window, manages menus, and handles native system events (resize, minimize).
        </p>
      </Card>
      <Card title="WRY (WebView Render)">
        <p className="text-sm text-muted-foreground mb-2">
          Hooks into the <strong>System WebView</strong> (WebView2, WebKit).
        </p>
        <p className="text-xs italic text-muted-foreground">
          It creates the 'Frame' where your React/JS lives. Because it use the OS's engine, security updates are handled by the OS, not the app.
        </p>
      </Card>
    </Grid>,
    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      The Isolation Pattern
    </h3>,
    <p key="8" className="mb-4 text-sm text-muted-foreground">
      Tauri v2 introduces the <strong>Isolation Pattern</strong>. Instead of the frontend calling Rust directly, all messages pass through an 'Isolation Layer' (an iframe) that injects a secure bridge. This prevents <strong>XSS attacks</strong> in your frontend from ever reaching your privileged Rust code.
    </p>,
    <Callout key="9" type="info" title="Mobile Support (Tauri v2)">
      Tauri v2 is no longer just for Desktop. It now targets <strong>iOS (Swift/UIKit)</strong> and <strong>Android (Kotlin/WebView)</strong> using the same Rust core logic. Your business logic stays in Rust, while your UI can remain in React/Vite.
    </Callout>,
  ],
};
