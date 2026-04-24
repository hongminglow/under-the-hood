import type { Topic } from "@/data/types";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Binary, Cpu } from "lucide-react";

export const webassemblyTopic: Topic = {
  id: "webassembly",
  title: "WebAssembly (Wasm)",
  description:
    "How to run hardcore physical C++ code inside a Google Chrome tab without blowing up the user's laptop.",
  tags: ["frontend", "performance", "architecture"],
  icon: "Cpu",
  content: [
    <p key="1">
      For 25 years, Javascript was the only programming language allowed to execute natively inside a Web Browser. If you tried to build Adobe Photoshop or a 3D Video Game purely in Javascript, it would crash the tab due to the heavy calculation of millions of pixels.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Wasm Revolution
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={Binary} title="The Translation" subtitle="Compile systems code into a browser-safe binary" theme="cyan">
        <p className="mb-3 text-cyan-100/80">
          You literally write standard C++ or Rust code: <code>fn calculate_physics()</code>. 
        </p>
        <p className="text-cyan-100/75">
          Instead of compiling it to an `.exe` file for Windows, you compile it into a highly compressed `.wasm` binary file format.
        </p>
      </FeatureCard>
      <FeatureCard icon={Cpu} title="The Native Speed" subtitle="Optimized bytes instead of parsed source text" theme="emerald">
        <p className="mb-3 text-emerald-100/80">
          Browsers have a secure underlying Virtual Machine specifically designed to read `.wasm` binaries. 
        </p>
        <p className="text-emerald-100/75">
          Because the Wasm file consists of parsed and optimized bytes, the browser skips reading expensive code and executes it natively at near-native CPU speeds.
        </p>
      </FeatureCard>
    </Grid>,
    <Callout key="4" type="warning" title="Not A Javascript Killer">
      WebAssembly does <strong>NOT</strong> replace Javascript. Wasm cannot directly access the `<div id="box"></div>` DOM. If your Wasm code calculates the physical gravity of a 3D cube, it MUST pass the exact coordinates back to Javascript so React can draw it.
    </Callout>,
  ],
};
