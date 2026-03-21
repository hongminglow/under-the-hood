import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const webassemblyTopic: Topic = {
  id: "webassembly",
  title: "WebAssembly (Wasm)",
  description:
    "How to run hardcore physical C++ code inside a Google Chrome tab without blowing up the user's laptop.",
  tags: ["frontend", "performance", "architecture"],
  icon: "Cpu",
  content: [
    <p key="1">
      For 25 years, Javascript was the only biological programming language allowed to execute natively inside a Web Browser. If you tried to build Adobe Photoshop or an intense 3D Video Game purely in Javascript, it would fundamentally crash the tab trying to mathematically calculate millions of pixels.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Wasm Revolution
    </h3>,
    <Grid key="3" cols={2} gap={6} className="my-8">
      <Card title="The Translation (Compilation)">
        <p className="text-sm text-muted-foreground mb-2">
          You literally write standard C++ or Rust code: <code>fn calculate_physics()</code>. 
        </p>
        <p className="text-sm text-muted-foreground">
          Instead of compiling it to an `.exe` file for Windows, you strictly compile it into a highly compressed, magical `.wasm` binary file format.
        </p>
      </Card>
      <Card title="The Native Speed">
        <p className="text-sm text-muted-foreground mb-2">
          Browsers have a secure underlying magical Virtual Machine completely specifically designed strictly to read `.wasm` binaries. 
        </p>
        <p className="text-sm text-muted-foreground">
          Because the Wasm file is already mathematically parsed and physically optimized bytes, the browser skips reading expensive code and executes it natively at near-native physical CPU speeds seamlessly.
        </p>
      </Card>
    </Grid>,
    <Callout key="4" type="warning" title="Not A Javascript Killer">
      WebAssembly does natively precisely organically <strong>NOT</strong> logically replace Javascript securely. Wasm logically natively magically cannot directly access the `<div id="box"></div>` DOM. If your Wasm code mathematically precisely calculates the physical gravity of a 3D cube, it strictly natively MUST organically pass the exact coordinates back clearly directly logically successfully fully magically seamlessly purely logically dynamically magically properly nicely practically natively to Javascript so React can securely optimally natively draw identically optimally identically optimally functionally it.
    </Callout>,
  ],
};
