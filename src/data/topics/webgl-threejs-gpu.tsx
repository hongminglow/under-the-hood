import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { MistakeCard } from "@/components/ui/MistakeCard";
import {
  Cpu,
  Layers,
  Zap,
  MemoryStick,
  Triangle,
  Eye,
  GitMerge,
} from "lucide-react";

export const webglThreejsGpuTopic: Topic = {
  id: "webgl-threejs-gpu",
  title: "WebGL & Three.js: GPU Rendering",
  description:
    "How the browser talks to the GPU — the full pipeline from JavaScript geometry to pixels on screen, and what Three.js abstracts away.",
  tags: ["webgl", "threejs", "gpu", "graphics", "3D"],
  icon: "Monitor",
  content: [
    <p key="1" className="text-slate-700 dark:text-slate-400 mb-6">
      Every 3D scene rendered in a browser goes through a precisely ordered
      hardware pipeline. WebGL is not a 3D library — it is a low-level{" "}
      <strong>JavaScript API that speaks directly to the GPU</strong> via your
      OS's graphics driver (OpenGL ES). Three.js sits on top and manages that
      complexity so you can think in scenes, meshes, and lights instead of
      buffer objects and shader programs.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Abstraction Stack
    </h3>,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <FeatureCard
        icon={Layers}
        title="Three.js / R3F"
        subtitle="Scene Graph API"
        theme="violet"
      >
        <p className="text-sm text-violet-700 dark:text-violet-100/75 mb-2">
          The developer-facing layer.
        </p>
        <p className="text-xs text-violet-700 dark:text-violet-300/70">
          You define{" "}
          <strong>Scenes, Meshes, Materials, Cameras, and Lights</strong>.
          Three.js translates these into the exact WebGL calls needed every
          frame.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={GitMerge}
        title="WebGL API"
        subtitle="Browser-level GPU bridge"
        theme="cyan"
      >
        <p className="text-sm text-cyan-700 dark:text-cyan-100/75 mb-2">
          The JavaScript-to-GPU contract.
        </p>
        <p className="text-xs text-cyan-700 dark:text-cyan-300/70">
          A stateful API (based on OpenGL ES 2.0/3.0). Manages GPU memory
          buffers, shader compilation, and draw calls. Runs on the browser's{" "}
          <strong>main thread</strong> or an OffscreenCanvas worker.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={Cpu}
        title="GPU Driver / Hardware"
        subtitle="Massively parallel execution"
        theme="amber"
      >
        <p className="text-sm text-amber-700 dark:text-amber-100/75 mb-2">
          The actual compute unit.
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-300/70">
          Receives compiled shader bytecode and geometry data. Executes
          thousands of tiny{" "}
          <strong>vertex and fragment shader programs in parallel</strong>{" "}
          across its shader cores.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      The GPU Rendering Pipeline (Per Frame)
    </h3>,
    <p key="5" className="text-slate-700 dark:text-slate-400 mb-6">
      Each call to{" "}
      <code className="text-cyan-700 dark:text-cyan-400 bg-slate-500/10 dark:bg-slate-800 px-1 rounded">
        renderer.render(scene, camera)
      </code>{" "}
      triggers a full pass through the following hardware pipeline.
      Understanding it is key to knowing where performance is lost.
    </p>,
    <Flow
      key="6"
      steps={[
        {
          title: "1. CPU: Scene Traversal & Frustum Culling",
          description:
            "Three.js walks the scene graph. Any mesh whose bounding box is outside the camera's view frustum is discarded entirely — never sent to the GPU.",
        },
        {
          title: "2. CPU → GPU: Buffer Upload (VBOs / IBOs)",
          description:
            "Geometry (vertex positions, normals, UVs) is packed into Vertex Buffer Objects (VBOs) and uploaded to GPU VRAM once. Subsequent frames reuse the same GPU memory unless the geometry changes.",
        },
        {
          title: "3. GPU: Vertex Shader (runs per vertex)",
          description:
            "Your GLSL vertex shader transforms each vertex from 3D model-space into 2D clip-space using the Model-View-Projection (MVP) matrix. This runs in parallel across all vertices simultaneously.",
        },
        {
          title: "4. GPU: Primitive Assembly & Rasterization",
          description:
            "Triangles are assembled from the transformed vertices and then 'rasterized' — converted into discrete pixel-sized fragments that cover the triangle on screen.",
        },
        {
          title: "5. GPU: Fragment Shader (runs per pixel)",
          description:
            "Your GLSL fragment shader determines the final color of each pixel. It samples textures, applies lighting equations, and outputs an RGBA color value. This is the most expensive stage for complex materials.",
        },
        {
          title: "6. GPU: Depth Test & Blending → Framebuffer",
          description:
            "The depth buffer (Z-buffer) decides if a fragment is visible or hidden behind another object. Surviving fragments are written to the framebuffer, which the browser then composites onto the screen.",
        },
      ]}
    />,

    <h3 key="7" className="text-xl font-bold mt-8 mb-4">
      Shaders: The Programs That Run on the GPU
    </h3>,
    <p key="8" className="text-slate-700 dark:text-slate-400 mb-4">
      Shaders are small programs written in <strong>GLSL</strong> (GL Shading
      Language) that compile and run directly on the GPU's shader cores. There
      are two mandatory types per draw call.
    </p>,
    <Grid key="9" cols={2} gap={6} className="my-8">
      <FeatureCard
        icon={Triangle}
        title="Vertex Shader"
        subtitle="Runs once per vertex"
        theme="sky"
      >
        <p className="text-sm text-sky-700 dark:text-sky-100/75 mb-3">
          Transforms geometry from 3D world → 2D screen.
        </p>
        <CodeBlock
          theme="sky"
          language="glsl"
          title="vertex.glsl"
          code={`// Three.js provides these uniforms automatically
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv; // pass UV to fragment shader
  gl_Position = projectionMatrix
    * modelViewMatrix
    * vec4(position, 1.0);
}`}
        />
      </FeatureCard>
      <FeatureCard
        icon={Eye}
        title="Fragment Shader"
        subtitle="Runs once per pixel fragment"
        theme="fuchsia"
      >
        <p className="text-sm text-fuchsia-700 dark:text-fuchsia-100/75 mb-3">
          Outputs the final pixel color.
        </p>
        <CodeBlock
          theme="fuchsia"
          language="glsl"
          title="fragment.glsl"
          code={`uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  // Sample a texture at the interpolated UV
  vec4 texColor = texture2D(uTexture, vUv);

  // gl_FragColor is the output pixel color
  gl_FragColor = texColor;
}`}
        />
      </FeatureCard>
    </Grid>,

    <Callout key="10" type="info" title="The MVP Matrix">
      The most critical concept in 3D rendering is the{" "}
      <strong>Model-View-Projection (MVP)</strong> matrix chain.{" "}
      <strong>Model</strong> matrix positions the object in world space.{" "}
      <strong>View</strong> matrix applies the camera transform.{" "}
      <strong>Projection</strong> matrix applies perspective (things farther
      away appear smaller). These are multiplied together and passed to the
      vertex shader as a single uniform.
    </Callout>,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      GPU Memory: Where Everything Lives
    </h3>,
    <Table
      key="12"
      headers={["Buffer Type", "What It Stores", "Upload Frequency"]}
      rows={[
        [
          "VBO (Vertex Buffer Object)",
          "Vertex positions, normals, UV coordinates, vertex colors",
          "Once on mesh creation",
        ],
        [
          "IBO / EBO (Index Buffer Object)",
          "Triangle indices — which 3 vertices form each triangle",
          "Once on mesh creation",
        ],
        [
          "Texture (Sampler2D)",
          "Image data (albedo, normal maps, roughness maps)",
          "Once, then cached in VRAM",
        ],
        [
          "UBO (Uniform Buffer Object)",
          "Per-frame data: MVP matrices, camera position, time, light positions",
          "Every frame",
        ],
        [
          "FBO (Framebuffer Object)",
          "Off-screen render target for shadows, post-processing, reflections",
          "Created once, written per frame",
        ],
      ]}
    />,

    <h3 key="12b" className="text-xl font-bold mt-8 mb-4">
      What Three.js Manages For You
    </h3>,
    <Grid key="13" cols={2} gap={6} className="my-8">
      <Card title="Material → Shader Compilation">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            <strong>MeshStandardMaterial</strong> compiles to a built-in PBR
            shader (Physically Based Rendering) with support for metalness,
            roughness, normal maps, and environment maps.
          </li>
          <li>
            <strong>ShaderMaterial</strong> lets you supply raw GLSL for full
            control.
          </li>
          <li>
            Three.js injects boilerplate uniforms (MVP matrices, fog, skinning)
            automatically via shader chunks (
            <code>#include &lt;common&gt;</code>).
          </li>
        </ul>
      </Card>
      <Card title="Scene Graph & Draw Call Batching">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            Every <strong>Mesh</strong> in the scene generates at minimum one
            WebGL draw call (<code>gl.drawElements</code>).
          </li>
          <li>
            <strong>InstancedMesh</strong> renders thousands of identical
            objects in a single draw call by passing a transformation matrix
            array to the GPU.
          </li>
          <li>
            <strong>Frustum culling</strong> skips the draw call entirely if the
            mesh is outside the camera's view.
          </li>
        </ul>
      </Card>
      <Card title="Texture Management">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            <strong>TextureLoader</strong> decodes images and uploads them to
            GPU VRAM via <code>gl.texImage2D</code>.
          </li>
          <li>
            <strong>Mipmaps</strong> are generated automatically — pre-scaled
            versions of a texture used at different distances to reduce aliasing
            and bandwidth.
          </li>
          <li>
            <strong>KTX2 / Basis</strong> compressed textures stay compressed in
            VRAM, reducing memory by 4–8×.
          </li>
        </ul>
      </Card>
      <Card title="Shadow Mapping">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
          <li>
            Shadows require a <strong>second render pass</strong>: the scene is
            rendered from the light's perspective into a depth texture (the
            shadow map).
          </li>
          <li>
            In the main pass, the fragment shader samples the shadow map to
            determine if a pixel is occluded from the light.
          </li>
          <li>
            This is why shadows are expensive — they{" "}
            <strong>double the number of draw calls</strong> per shadow-casting
            light.
          </li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="14" className="text-xl font-bold mt-8 mb-4">
      The CPU–GPU Bottleneck
    </h3>,
    <p key="15" className="text-slate-700 dark:text-slate-400 mb-6">
      The single biggest performance trap in WebGL is the{" "}
      <strong>CPU–GPU synchronization bottleneck</strong>. The CPU submits draw
      calls; the GPU executes them asynchronously. Anything that forces the CPU
      to wait for the GPU to finish (like reading pixels back with{" "}
      <code className="text-cyan-700 dark:text-cyan-400 bg-slate-500/10 dark:bg-slate-800 px-1 rounded">
        gl.readPixels
      </code>
      ) causes a pipeline stall and destroys frame rate.
    </p>,
    <Grid key="16" cols={2} gap={6} className="mb-8">
      <FeatureCard
        icon={Zap}
        title="Draw Call Budget"
        subtitle="The primary CPU metric"
        theme="amber"
      >
        <p className="text-sm text-amber-700 dark:text-amber-100/75 mb-2">
          More objects ≠ more GPU work — it means more CPU overhead.
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-300/70">
          Every <code>gl.drawElements</code> call has a fixed CPU cost
          regardless of the geometry complexity. A scene with 1,000 simple cubes
          as separate meshes will have a <strong>higher CPU overhead</strong>{" "}
          than one merged cube with 1,000× the triangles. Budget: aim for
          &lt;200 draw calls on mobile, &lt;1,000 on desktop.
        </p>
      </FeatureCard>
      <FeatureCard
        icon={MemoryStick}
        title="GPU Fill Rate"
        subtitle="The primary GPU metric"
        theme="indigo"
      >
        <p className="text-sm text-indigo-700 dark:text-indigo-100/75 mb-2">
          The number of pixels the GPU can shade per second.
        </p>
        <p className="text-xs text-indigo-700 dark:text-indigo-300/70">
          Overdraw (drawing the same pixel multiple times due to transparent
          objects layering on top of each other) is the primary fill-rate
          killer. Use <strong>depth pre-pass</strong> or sort transparent
          objects back-to-front to minimize wasted fragment shader executions.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      Common Performance Pitfalls
    </h3>,
    <Grid key="18" cols={2} gap={6}>
      <MistakeCard
        number={1}
        title="Too Many Draw Calls"
        problem="Scene has 500+ individual Mesh objects causing CPU to stall submitting draw calls at 60fps."
        solution="Use InstancedMesh for repeated objects. Use geometry merging (BufferGeometryUtils.mergeGeometries) for static objects. Use LOD (Level of Detail) to swap in lower-poly models at distance."
      />
      <MistakeCard
        number={2}
        title="Uploading New Buffers Every Frame"
        problem="Creating new BufferGeometry or new THREE.Texture inside the animation loop causes VRAM allocation churn."
        solution="Create buffers once outside the loop. If geometry changes (e.g. particle systems), use geometry.attributes.position.needsUpdate = true to update only the dirty data, not reallocate the buffer."
      />
      <MistakeCard
        number={3}
        title="Uncompressed Textures at Full Resolution"
        problem="Loading a 4K PNG texture uploads 64 MB of raw RGBA data to VRAM and takes seconds to decode on the CPU."
        solution="Use KTX2 + Basis Universal compressed textures (via Three.js KTX2Loader). They stay compressed in VRAM (4–8× smaller) and decode directly on the GPU without a CPU decode step."
      />
      <MistakeCard
        number={4}
        title="gl.readPixels / getBufferSubData Stalls"
        problem="Reading GPU data back to the CPU (for e.g. GPU picking or compute results) blocks the entire pipeline until the GPU finishes the frame."
        solution="Use asynchronous GPU queries where possible (WebGL 2 sync objects) or perform picking via raycasting on the CPU scene graph instead of reading framebuffer pixels."
      />
    </Grid>,

    <Callout key="19" type="tip" title="WebGPU: The Next Generation">
      <strong>WebGPU</strong> is the successor to WebGL, shipping in Chrome/Edge
      since 2023. Key improvements: explicit command buffers (no hidden driver
      overhead), compute shaders for GPGPU work, and a modern API design that
      mirrors Vulkan/Metal/D3D12 instead of the legacy OpenGL state machine.
      Three.js has a <strong>WebGPURenderer</strong> in active development.
    </Callout>,
  ],
};
