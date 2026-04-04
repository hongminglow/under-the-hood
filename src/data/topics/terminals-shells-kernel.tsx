import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Step } from "@/components/ui/Step";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const terminalsShellsKernelTopic: Topic = {
  id: "terminals-shells-kernel",
  title: "Terminals, Shells & the Kernel",
  description:
    "Demystifying the difference between a Kernel, OS, Terminal Emulator, Shell, and command languages like Bash and Zsh. Covers macOS, Windows, and Linux environments.",
  tags: ["os", "terminal", "shell", "bash", "zsh", "kernel", "devops"],
  icon: "Terminal",
  content: [
    <p key="1" className="mb-4">
      Most developers use these terms interchangeably, but they refer to <strong>entirely different layers of abstraction</strong> of your operating system. Understanding the difference between a Kernel, a Shell, and a Terminal Emulator is fundamental to becoming a confident command-line user.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Layered Model: From Hardware to Your Prompt
    </h3>,
    <p key="3" className="mb-4">
      Think of it as a stack. Each layer talks only to the layer directly above or below it. A command you type travels down this entire stack to make something happen on hardware.
    </p>,
    <div key="4" className="space-y-3 mb-8">
      <Step index={1}><strong>Hardware</strong> — Your actual CPU, RAM, disk, and peripherals.</Step>
      <Step index={2}><strong>Kernel</strong> — The core of the OS. It speaks directly to hardware and exposes safe, controlled system calls (<code>read()</code>, <code>write()</code>, <code>fork()</code>) so programs never touch hardware directly.</Step>
      <Step index={3}><strong>Operating System</strong> — The full software platform above the Kernel: system libraries, package managers, filesystem drivers, file system structure, and the user space.</Step>
      <Step index={4}><strong>Shell</strong> — A program (Bash, Zsh, Fish) that runs inside the OS. It reads your text commands, interprets them, and issues syscalls to the OS/Kernel on your behalf.</Step>
      <Step index={5}><strong>Terminal Emulator</strong> — A GUI application (iTerm2, Windows Terminal, Hyper) that renders text, listens to keyboard input, and pipes them into the shell. It is purely a display layer — it is not the shell itself.</Step>
    </div>,

    <Callout key="5" type="info" title="The Critical Distinction">
      The <strong>Terminal Emulator</strong> is the window you see. The <strong>Shell</strong> is the interpreter that runs inside it. You can run Bash inside iTerm2, or Zsh inside the default macOS Terminal.app — they are separate, swappable programs.
    </Callout>,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Kernels by Operating System
    </h3>,
    <Table
      key="7"
      headers={["OS", "Kernel", "Kernel Type", "Notes"]}
      rows={[
        ["Linux (Ubuntu, Arch, Fedora...)", "Linux Kernel (Linus Torvalds)", "Monolithic", "One kernel serves all Linux distributions. Ubuntu and Fedora both run the same kernel code, just with different default tooling on top."],
        ["macOS", "XNU (\"X is Not Unix\")", "Hybrid (Mach + BSD)", "Apple's kernel merges Mach microkernel (for IPC and memory) with FreeBSD components (POSIX APIs, filesystem). This is why macOS is formally UNIX-certified."],
        ["Windows 10/11", "Windows NT Kernel", "Hybrid", "The NT Kernel is proprietary. NOT POSIX-compliant natively. WSL2 (Windows Subsystem for Linux) solves this by running a real Linux kernel in a lightweight VM."],
        ["Android", "Linux Kernel (modified)", "Monolithic", "Android runs a modified Linux kernel, but without GNU userland tools — so it's Linux-based but not a 'Linux distro'."],
        ["iOS / iPadOS", "XNU (same as macOS)", "Hybrid", "Apple uses the same XNU kernel across macOS, iOS, and watchOS with different user-space restrictions."],
      ]}
    />,

    <h3 key="8" className="text-xl font-bold mt-8 mb-4">
      Shells: Bash vs. Zsh vs. Fish vs. PowerShell
    </h3>,
    <p key="9" className="mb-4">
      A shell is a <strong>command language interpreter</strong> — it parses your words, handles scripting logic (<code>if</code>, <code>for</code>, <code>while</code>), manages environment variables, and invokes system binaries. Your shell choice significantly affects scripting power and interactive comfort.
    </p>,
    <Table
      key="10"
      headers={["Shell", "Standard", "Default On", "Key Traits"]}
      rows={[
        ["sh (Bourne Shell)", "POSIX", "Ancient Unix / lowest common denominator", "The original, minimal shell. Scripts written in sh run anywhere. No interactive extras."],
        ["Bash (Bourne Again Shell)", "POSIX superset", "Linux distros, macOS (pre-Catalina)", "Most universal shell in DevOps/CI. Adds arrays, brace expansion, command history. The de-facto standard for shell scripting."],
        ["Zsh (Z Shell)", "POSIX superset", "macOS (Catalina+, default since 2019)", "Much more interactive than Bash: sharing history across sessions, smarter tab completion, themes (Oh My Zsh), and spelling correction. Fully Bash-script compatible."],
        ["Fish (Friendly Interactive Shell)", "Not POSIX", "No default OS; user-installed", "Prioritizes interactivity and discoverability. Syntax highlighting as you type, autosuggestions from history. Trade-off: Fish scripts are NOT Bash-compatible."],
        ["PowerShell (pwsh)", "Microsoft proprietary", "Windows (all), macOS/Linux (optional)", "Object-oriented shell. Pipes pass .NET/C# objects, not plain text strings. Powerful for Windows management. The modern 'pwsh' is cross-platform."],
        ["cmd.exe", "Windows proprietary", "Windows (legacy)", "The old Windows Command Prompt. Limited scripting, no POSIX. Still common in legacy batch scripting (.bat / .cmd files)."],
      ]}
    />,

    <h3 key="11" className="text-xl font-bold mt-8 mb-4">
      Terminal Emulators by Platform
    </h3>,
    <Grid key="12" cols={3} gap={6} className="my-8">
      <Card title="macOS">
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Terminal.app</strong> — Built-in, basic</li>
          <li><strong>iTerm2</strong> — Community favorite; split panes, rich profiles</li>
          <li><strong>Warp</strong> — AI-powered, blocks output</li>
          <li><strong>Hyper</strong> — Electron-based, JS extensible</li>
        </ul>
      </Card>
      <Card title="Windows">
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Windows Terminal</strong> — Microsoft's modern multi-tab emulator</li>
          <li><strong>cmd.exe</strong> — Classic, legacy</li>
          <li><strong>ConEmu / Cmder</strong> — Popular third-party emulators</li>
          <li><strong>VS Code Terminal</strong> — Integrated, runs any shell</li>
        </ul>
      </Card>
      <Card title="Linux">
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>GNOME Terminal</strong> — Default on Ubuntu/GNOME</li>
          <li><strong>Konsole</strong> — Default on KDE Plasma</li>
          <li><strong>Alacritty</strong> — GPU-accelerated, minimal</li>
          <li><strong>Kitty</strong> — Feature-rich, GPU-rendered</li>
        </ul>
      </Card>
    </Grid>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      Bash vs. Zsh: The Most Common Confusion
    </h3>,
    <p key="14" className="mb-4">
      These are the two shells most developers will encounter day-to-day. They are <strong>both POSIX-compatible</strong> languages, meaning most scripts written for one will run in the other. The differences are primarily in interactive quality-of-life features.
    </p>,
    <CodeBlock
      key="15"
      title="Checking your current shell"
      language="bash"
      code={`echo $SHELL         # Shows the default login shell path (e.g. /bin/zsh)
echo $0             # Shows the currently running shell binary
bash --version      # Check Bash version
zsh --version       # Check Zsh version`}
    />,
    <Table
      key="16"
      headers={["Feature", "Bash", "Zsh"]}
      rows={[
        ["Default on macOS (Catalina+)", "No (was pre-2019)", "✅ Yes"],
        ["Default on most Linux distros", "✅ Yes (Ubuntu, Fedora, Arch)", "No (user opt-in)"],
        ["POSIX script compatibility", "✅ Yes", "✅ Yes"],
        ["Plugin framework", "Limited (bash-it)", "Oh My Zsh, Prezto"],
        ["Tab-completion", "Basic", "Context-aware, menu-driven"],
        ["Spell correction", "No", "✅ Yes (setopt CORRECT)"],
        ["Shared history across tabs", "No", "✅ Yes"],
        ["Inline syntax highlighting", "No (needs plugin)", "✅ Yes (with zsh-syntax-highlighting)"],
        ["Theming / Prompts", "Basic PS1", "Powerlevel10k, Starship"],
        ["Array handling", "Indexed only", "Indexed + Associative (more powerful)"],
      ]}
    />,

    <h3 key="17" className="text-xl font-bold mt-8 mb-4">
      Windows: The Special Case — WSL2
    </h3>,
    <p key="18" className="mb-4">
      Windows does not natively run POSIX-compliant shells. Historically, developers used Git Bash (a Bash port via MinGW) or Cygwin (a POSIX emulation layer). The modern answer is <strong>WSL2 (Windows Subsystem for Linux 2)</strong>.
    </p>,
    <Grid key="19" cols={2} gap={6} className="my-8">
      <Card title="WSL1 (Legacy)">
        <p className="text-sm text-muted-foreground">
          Translated Linux syscalls into Windows NT syscalls. Fast file I/O on the Windows filesystem, but incomplete Linux compatibility — some syscalls were missing or broken.
        </p>
      </Card>
      <Card title="WSL2 (Current Standard)">
        <p className="text-sm text-muted-foreground">
          Runs a <strong>real Linux Kernel</strong> in a lightweight Hyper-V VM. Near-100% Linux compatibility. You get a genuine Ubuntu/Debian/Kali instance running alongside Windows. The trade-off is slightly slower cross-filesystem I/O (Linux ↔ Windows drives).
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="20"
      title="Setting up WSL2 & Ubuntu on Windows"
      language="powershell"
      code={`# Run in PowerShell (Admin) — one command installs WSL2 + Ubuntu
wsl --install

# List available Linux distros
wsl --list --online

# Install a specific distro
wsl --install -d kali-linux

# Set WSL2 as default version
wsl --set-default-version 2`}
    />,

    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      Quick Reference: Who Has What?
    </h3>,
    <Table
      key="22"
      headers={["Platform", "Default Shell", "Default Terminal", "Kernel"]}
      rows={[
        ["macOS", "Zsh", "Terminal.app", "XNU (Hybrid)"],
        ["Ubuntu / Debian Linux", "Bash", "GNOME Terminal", "Linux (Monolithic)"],
        ["Arch Linux", "Bash", "None (user picks)", "Linux (Monolithic)"],
        ["Windows 11", "PowerShell / cmd.exe", "Windows Terminal", "NT Kernel (Hybrid)"],
        ["Windows 11 + WSL2", "Bash (inside WSL distro)", "Windows Terminal", "Linux Kernel (in VM)"],
        ["Android", "sh / mksh", "No GUI (ADB shell)", "Linux (Modified)"],
        ["iOS", "No user shell", "N/A", "XNU"],
      ]}
    />,

    <Callout key="23" type="tip" title="Developer Recommendation">
      <strong>macOS/Linux:</strong> Stick with Zsh + Oh My Zsh + the <em>Powerlevel10k</em> theme. It gives you Bash-compatible scripting with a dramatically better interactive experience. <br /><br />
      <strong>Windows:</strong> Install WSL2 (Ubuntu) immediately. Run Windows Terminal with your WSL2 instance as the default profile. You get native Linux Bash/Zsh inside Windows without dual-booting.
    </Callout>,
  ],
};
