import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Flow } from "@/components/ui/Flow";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Braces, ShieldCheck } from "lucide-react";

export const typescriptTypesTopic: Topic = {
  id: "typescript-types",
  title: "TypeScript vs JavaScript",
  description:
    "Why an extremely strict compiler became the undeniable enterprise standard for development, and why it completely vanishes before hitting the browser.",
  tags: ["core", "javascript", "typescript", "architecture"],
  icon: "FileCode",
  content: [
    <p key="1" className="mb-6">
      If you write <Highlight variant="primary">Vanilla JavaScript</Highlight>, you inherently trust that the variables you pass around are structurally correct. A simple typo or passing a string into a function expecting a number will successfully execute, only to cause a catastrophic crash days later in production. <Highlight variant="primary">TypeScript</Highlight> solves this by wrapping JS in an enterprise-grade static type-checker, mathematically proving your application logic works before the code is ever deployed.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      Static vs Dynamic Typing
    </h3>,
    
    <Table
      key="3"
      headers={[
        "Concept",
        "<span class='text-amber-300'>JavaScript (Dynamic)</span>",
        "<span class='text-cyan-300'>TypeScript (Static)</span>",
      ]}
      rows={[
        ["Type Discovery", "Interpreter blindly guesses types at the exact moment the code executes.", "Types are structurally enforced in real-time while you write code in the IDE."],
        ["Error Catching", "Fails in Production (users see the 500 error or broken UI).", "Fails in Development (compiler physically refuses to build the app)."],
        ["Code Refactoring", "Extremely dangerous. Changing an API response breaks 50 unknown files.", "Extremely safe. The compiler highlights every exact file you broke."],
        ["Auto-completion", "Basic IDE guessing based on previous usage context.", "Flawless, 100% accurate object property autocompletion."]
      ]}
    />,

    <h3 key="4" className="text-xl font-bold mt-12 mb-4">
      The "Type Erasure" Build Flow
    </h3>,

    <p key="4a" className="mb-6">
      <strong>The Problem:</strong> Browsers completely do not understand TypeScript natively. They only speak pure Vanilla JavaScript.
      <br/><br/>
      <strong>The Solution:</strong> TypeScript is physically just a "glorified linter" that runs in your terminal. After verifying your code is mathematically type-safe, the build tool surgically deletes every single type definition, leaving behind raw JavaScript. <strong>Static types absolutely do not exist at runtime.</strong>
    </p>,

    <Flow 
      key="5" 
      steps={[
        {
          title: "1. Write TypeScript",
          description: "You explicitly declare your structural interfaces, types, and strict function arguments."
        },
        {
          title: "2. The Compiler Engine",
          description: "`tsc` statically analyzes the AST (Abstract Syntax Tree) to mathematically prove no types are violated."
        },
        {
          title: "3. Type Erasure",
          description: "If compilation succeeds, the bundler physically strips away all TypeScript syntax, leaving naked code."
        },
        {
          title: "4. Raw JavaScript",
          description: "Pure, untouched dynamically valid Vanilla JS is emitted and natively shipped to the client browser."
        }
      ]}
    />,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Why does everyone prefer TypeScript now?
    </h3>,

    <Grid key="7" cols={1} gap={6} className="mb-8">
      <FeatureCard icon={Braces} title="Structural Autocompletion" subtitle="Self-documenting code" theme="cyan">
        <p className="mb-4 text-cyan-100/80">
          In large teams, passing a mysterious <code>user</code> object into a JavaScript function requires tracking down 5 different files to guess what properties exist inside it. In TypeScript, pressing <code>CMD + click</code> or typing a period instantly reveals the exact structural shape natively.
        </p>
        <Grid cols={2} gap={4}>
          <CodeBlock
            theme="cyan"
            title="Vanilla JS (Dangerous)"
            language="javascript"
            code={`// Is total a string or number? 
// Does cart have a 'items' property?
function checkout(cart) {
  return cart.total + tax();
}`}
          />
          <CodeBlock
            theme="cyan"
            title="TypeScript (Safe)"
            language="typescript"
            code={`interface Cart {
  items: string[];
  total: number;
}
function checkout(cart: Cart) {
  return cart.total + tax();
}`}
          />
        </Grid>
      </FeatureCard>

      <FeatureCard icon={ShieldCheck} title="Painless Enterprise Refactoring" subtitle="Compiler-guided change safety" theme="emerald">
        <p className="mb-4 text-emerald-100/80">
          <strong className="text-emerald-300">The Scenario:</strong> Your backend team decides to rename the API property <code>user_id</code> to <code>userId</code>.
        </p>
        <p className="text-emerald-100/75">
          In <strong>JavaScript</strong>, this is an absolute nightmare. You run a global "Find and Replace", pray you didn't accidentally overwrite a completely unrelated variable, push to production, and inevitably crash the checkout page.<br/><br/>
          In <strong>TypeScript</strong>, you simply update the base <code>User</code> interface definition. Instantly, the compiler throws up 45 red squiggly lines explicitly pinpointing the exact components and files that are now mathematically broken. You fix them, and deploy with complete algorithmic confidence.
        </p>
      </FeatureCard>
    </Grid>,

    <Callout key="8" type="warning" title="The Runtime Validation Trap">
      Because of <strong>Type Erasure</strong>, TypeScript cannot physically stop a backend server or a user from unexpectedly sending you a string instead of a number at runtime. The compiler strictly trusts your locally written <code>interface Post</code>. <br/><br/><strong>Solution:</strong> For external API data, you MUST pair TypeScript with runtime validation tools like <strong>Zod</strong> to natively parse and prove the incoming payload shape physically matches your static definitions.
    </Callout>,
  ],
};
