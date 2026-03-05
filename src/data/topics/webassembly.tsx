import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const webAssemblyTopic: Topic = {
  id: "webassembly",
  title: "WebAssembly (Wasm)",
  description:
    "The revolutionary binary instruction format bringing near-native speed and new languages (Rust, C++) to the web browser.",
  tags: ["browser", "frontend", "performance", "rust"],
  icon: "Cpu",
  content: [
    <p key="1">
      For 25 years, JavaScript was the only language capable of executing
      natively inside the web browser. While v8's JIT compilation made JS
      incredibly fast, it still suffers from parsing overhead, garbage
      collection pauses, and dynamic typing slowness.{" "}
      <strong>WebAssembly (Wasm)</strong> shatters this monopoly.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      What is WebAssembly?
    </h4>,
    <p key="3">
      Wasm is not a programming language like Python or C. It is a{" "}
      <strong>low-level binary format</strong> (like assembly language) designed
      as a compilation target. This means you can write code in languages like
      Rust, C++, Go, or Zig, compile it into a `.wasm` binary file, and the
      browser will execute it at near-native CPU speeds.
    </p>,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Why is Wasm so fast?">
        <ul className="text-sm space-y-1 list-disc pl-4 mt-2">
          <li>
            <strong>Zero Parsing Setup:</strong> Binaries don't need to be lexed
            or parsed like JS source code.
          </li>
          <li>
            <strong>Pre-optimized:</strong> Optimization is done at compile-time
            by LLVM, not at runtime by the browser's JIT.
          </li>
          <li>
            <strong>Manual Memory Management:</strong> No unpredictable Garbage
            Collector pauses destroying 60fps frame rates.
          </li>
        </ul>
      </Card>
      <Card title="Is JS Dead?">
        <ul className="text-sm space-y-1 list-disc pl-4 mt-2">
          <li>
            <strong>No.</strong> Wasm cannot directly manipulate the DOM. It
            must call JavaScript via bridges to update UI.
          </li>
          <li>JS remains the glue for UI and event handling.</li>
          <li>
            Wasm is strictly used for <strong>heavy computation</strong> (video
            editing, game engines, 3D rendering like Figma).
          </li>
        </ul>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="Wasm Beyond the Browser (WASI)">
      WebAssembly is now escaping the browser. Through the WebAssembly System
      Interface (WASI), `.wasm` binaries can run on backend servers, IoT
      devices, and Kubernetes clusters as an ultra-fast, ultra-secure,
      completely sandboxed lightweight alternative to Docker containers.
    </Callout>,
  ],
};
