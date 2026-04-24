import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GitMerge, ArrowUpToLine, Combine, Copy } from "lucide-react";

export const gitRebaseMergeSquashTopic: Topic = {
  id: "git-rebase-merge-squash",
  title: "Git Merge vs Rebase vs Squash vs Cherry-Pick",
  description:
    "Four ways to move or combine commits — each leaving a radically different history. Know which one to reach for and exactly why.",
  tags: ["git", "devops", "version-control"],
  icon: "GitBranch",
  content: [
    <p key="1">
      Every time you need to reconcile work across branches, Git gives you four fundamentally different tools:{" "}
      <strong>merge</strong>, <strong>rebase</strong>, <strong>squash</strong>, and <strong>cherry-pick</strong>.
      They all move or combine commits, but they produce completely different histories.
      Choosing the wrong one means a polluted log, a broken bisect, or a force-push that wrecks your teammates' branches.
    </p>,

    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Core Mental Model: What Each Command Does to History
    </h3>,

    <Grid key="3" cols={2} gap={6} className="my-8">
      <FeatureCard icon={GitMerge} title="git merge" subtitle="Preserves all history, adds a merge commit" theme="cyan">
        <p className="text-sm text-cyan-100/75">
          Takes two branch tips and creates a new <strong>merge commit</strong> that has two parents.
          Every original commit stays intact with its original SHA and timestamp.
          History is a <em>non-linear DAG</em> (directed acyclic graph), not a straight line.
        </p>
      </FeatureCard>
      <FeatureCard icon={ArrowUpToLine} title="git rebase" subtitle="Rewrites commits onto a new base" theme="amber">
        <p className="text-sm text-amber-100/75">
          Lifts your branch's commits off their original base and replays them one-by-one on top of the target.
          Each commit gets a <strong>new SHA</strong>. History stays a perfectly straight line — as if the branch
          was always started from the new base.
        </p>
      </FeatureCard>
      <FeatureCard icon={Combine} title="Squash merge / git rebase --squash" subtitle="Collapses N commits into 1" theme="emerald">
        <p className="text-sm text-emerald-100/75">
          All commits from a feature branch are <strong>combined into a single new commit</strong> on the target branch.
          Individual commit history from the branch is completely discarded after the merge.
          Produces the cleanest main branch log.
        </p>
      </FeatureCard>
      <FeatureCard icon={Copy} title="git cherry-pick" subtitle="Copy a specific commit anywhere" theme="violet">
        <p className="text-sm text-violet-100/75">
          Takes any commit by its SHA from any branch and <strong>replays it as a new commit</strong> on the current branch.
          The original commit is unchanged. You end up with two commits that contain the same change but with different SHAs.
        </p>
      </FeatureCard>
    </Grid>,

    <h3 key="4" className="text-xl font-bold mt-8 mb-4">
      Visual History Comparison
    </h3>,

    <CodeBlock
      key="5"
      theme="slate"
      title="git-history-comparison.txt"
      language="bash"
      code={`# Starting state: feature branch diverged from main at commit C
main:    A ─── B ─── C
feature:           └── D ─── E

# ─────────────────────────────────────────────────
# git merge feature (into main)
# Creates a merge commit M with two parents
main:    A ─── B ─── C ─────────── M
feature:           └── D ─── E ──┘
# result: Non-linear history, both D and E preserved

# ─────────────────────────────────────────────────
# git rebase main (run on feature branch)
# D and E are replayed as D' and E' with new SHAs
main:    A ─── B ─── C
feature (rebased):       └── D' ─── E'
# Then fast-forward merge → perfectly linear history:
main:    A ─── B ─── C ─── D' ─── E'

# ─────────────────────────────────────────────────
# git merge --squash feature (into main)
# D and E are collapsed into one new commit S
main:    A ─── B ─── C ─── S
# result: feature branch commits never appear in main's log

# ─────────────────────────────────────────────────
# git cherry-pick E (copy just commit E onto main)
main:    A ─── B ─── C ─── E'
# E' is a new commit with same changes as E, different SHA`}
    />,

    <h3 key="6" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: git merge
    </h3>,

    <p key="7" className="mb-4">
      Merge is the <strong>safest, most honest</strong> integration strategy. It never rewrites history —
      every commit keeps its original SHA, author, and timestamp. The trade-off is a branchy, non-linear log
      that becomes hard to navigate over time.
    </p>,

    <CodeBlock
      key="8"
      theme="cyan"
      title="git-merge.sh"
      language="bash"
      code={`# Standard merge — always creates a merge commit
git checkout main
git merge feature/login

# Fast-forward merge — no merge commit if history is linear
# (only possible if main hasn't diverged from feature's base)
git merge --ff-only feature/login

# Force a merge commit even on a fast-forward-eligible branch
# Useful to make merges explicit and traceable in the log
git merge --no-ff feature/login

# View the resulting non-linear graph
git log --oneline --graph --all`}
    />,

    <h3 key="9" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: git rebase
    </h3>,

    <p key="10" className="mb-4">
      Rebase creates a <strong>clean, linear history</strong> by replaying commits onto a new base.
      The critical consequence: every rebased commit gets a new SHA. This is why the
      golden rule exists — <strong>never rebase commits that have been pushed to a shared branch</strong>.
    </p>,

    <CodeBlock
      key="11"
      theme="amber"
      title="git-rebase.sh"
      language="bash"
      code={`# Sync your feature branch with the latest main
git checkout feature/login
git rebase main
# → D and E are now replayed on top of C as D', E'

# Interactive rebase — rewrite, reorder, squash, or drop commits
# Most powerful rewriting tool in Git
git rebase -i main
# Opens editor with:
#   pick abc1234 Add login form
#   pick def5678 Fix typo in login form
#   pick ghi9012 Add validation
# Change 'pick' to:
#   'squash' → merge into previous commit
#   'reword' → edit the commit message
#   'drop'   → remove the commit completely
#   'edit'   → pause and amend the commit

# After resolving conflicts during a rebase:
git add .
git rebase --continue

# Abort and go back to the original state
git rebase --abort

# After rebasing, push requires force (rewrites remote history)
# ONLY do this on your own private branch!
git push --force-with-lease origin feature/login`}
    />,

    <Callout key="12" type="warning" title="The Golden Rule of Rebase">
      <strong>Never rebase a branch that others are working on.</strong>&nbsp;When you rebase,
      every commit SHA changes. Anyone who cloned or fetched the original branch will have a
      completely diverged history and will be forced into a painful manual recovery.
      Reserve <code>git rebase</code> for local feature branches that only exist on your machine,
      or branches where you are the sole author.
    </Callout>,

    <h3 key="13" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: Squash Merge
    </h3>,

    <p key="14" className="mb-4">
      Squash gives you the <strong>cleanest possible main branch log</strong>. An entire feature —
      no matter how many WIP commits, typo fixes, or "oops" commits it contains — lands as a single,
      well-described commit. The individual commit history lives on in the feature branch until it is deleted.
    </p>,

    <CodeBlock
      key="15"
      theme="emerald"
      title="git-squash.sh"
      language="bash"
      code={`# Method 1: Squash via git merge --squash
git checkout main
git merge --squash feature/login
# Stages all changes as one uncommitted diff
git commit -m "feat: add login feature (#42)"
# Note: feature branch is NOT merged — it's still a separate branch

# Method 2: Squash via interactive rebase (--autosquash)
git checkout feature/login
git rebase -i main
# In editor, mark commits:
#   pick abc1234 Add login form
#   squash def5678 Fix typo          ← merged into previous
#   squash ghi9012 Add validation    ← merged into previous
# → All three become one commit

# Method 3: Soft reset (manual squash)
git reset --soft main
git commit -m "feat: add login feature"
# Collapses all commits since main into one staged diff`}
    />,

    <h3 key="16" className="text-xl font-bold mt-8 mb-4">
      Deep Dive: git cherry-pick
    </h3>,

    <p key="17" className="mb-4">
      Cherry-pick is a <strong>surgical copy</strong> operation. It takes the diff introduced by any commit
      and replays that exact change on the current branch as a new commit. It does not move or remove the original commit.
      The result is two commits with the same change but different SHAs on different branches.
    </p>,

    <CodeBlock
      key="18"
      theme="violet"
      title="git-cherry-pick.sh"
      language="bash"
      code={`# Copy a single commit from another branch
git checkout main
git cherry-pick a1b2c3d

# Cherry-pick multiple commits (in order)
git cherry-pick a1b2c3d e4f5a6b

# Cherry-pick a range of commits (exclusive of start, inclusive of end)
git cherry-pick a1b2c3d..e4f5a6b

# Cherry-pick without auto-committing (stage changes only)
git cherry-pick --no-commit a1b2c3d
# Useful when combining multiple patches into one commit

# After a conflict during cherry-pick:
git add .
git cherry-pick --continue

# Abort the cherry-pick
git cherry-pick --abort

# Real-world scenario: hotfix ported to multiple release branches
git checkout release/v2.1
git cherry-pick hotfix-commit-sha   # apply security fix to v2.1

git checkout release/v2.2
git cherry-pick hotfix-commit-sha   # apply same fix to v2.2`}
    />,

    <h3 key="19" className="text-xl font-bold mt-8 mb-4">
      Side-by-Side Comparison
    </h3>,

    <Table
      key="20"
      theme="slate"
      headers={[
        "Property",
        '<span class="text-cyan-300">Merge</span>',
        '<span class="text-amber-300">Rebase</span>',
        '<span class="text-emerald-300">Squash Merge</span>',
        '<span class="text-violet-300">Cherry-Pick</span>',
      ]}
      rows={[
        ["History shape", "Non-linear (DAG)", "Linear", "Linear", "Linear"],
        ["Original SHAs preserved?", "✅ Yes", "❌ No (new SHAs)", "❌ No", "❌ No (new SHA)"],
        ["Creates merge commit?", "✅ Yes", "❌ No", "✅ Yes", "❌ No"],
        ["Individual commits visible on main?", "✅ Yes", "✅ Yes", "❌ Collapsed into 1", "✅ Yes (copied)"],
        ["Rewrites history?", "❌ No", "✅ Yes", "Partial", "Partial"],
        ["Safe to use on shared branches?", "✅ Always safe", "⚠️ Never on shared", "✅ Always safe", "✅ Yes"],
        ["Preserves authorship?", "✅ Yes", "✅ Yes", "⚠️ Partial (squash commit)", "✅ Yes"],
        ["git bisect friendly?", "⚠️ Harder", "✅ Yes (linear)", "✅ Yes", "✅ Yes"],
      ]}
    />,

    <h3 key="21" className="text-xl font-bold mt-8 mb-4">
      Decision Framework: Which to Use When
    </h3>,

    <Flow
      key="22"
      steps={[
        {
          title: "Merging a long-lived branch (release branch, main → develop)?",
          description:
            "Use git merge --no-ff. Preserves full history and makes the integration point explicit. Never squash release merges.",
        },
        {
          title: "Integrating a short-lived feature PR with messy WIP commits?",
          description:
            "Use squash merge. One clean commit per feature on main. GitHub/GitLab's 'Squash and merge' button does exactly this.",
        },
        {
          title: "Syncing your local feature branch with an updated main?",
          description:
            "Use git rebase main on your private branch. Keeps history linear and eliminates unnecessary merge commits.",
        },
        {
          title: "Porting a bug fix or hotfix to another release branch?",
          description:
            "Use git cherry-pick <sha>. Surgical and precise — copies only the fix without dragging in unrelated commits.",
        },
        {
          title: "Cleaning up your own commits before a code review?",
          description:
            "Use git rebase -i to squash WIP commits, reword messages, and drop debugging commits before opening a PR.",
        },
      ]}
    />,

    <h3 key="23" className="text-xl font-bold mt-8 mb-4">
      Team Strategy Cheat Sheet
    </h3>,

    <Table
      key="24"
      theme="slate"
      headers={["Team Pattern", "GitHub PR Strategy", "Local Dev Habit", "Main Branch Log"]}
      rows={[
        [
          "GitHub Flow (simple)",
          "Squash and merge",
          "Rebase onto main before PR",
          "One commit per feature — very clean",
        ],
        [
          "GitFlow (releases + hotfixes)",
          "Merge --no-ff",
          "Rebase feature onto develop",
          "Full DAG, merge commits explicit",
        ],
        [
          "Trunk-Based Development",
          "Squash merge or rebase merge",
          "Rebase + push often",
          "Near-linear, high velocity",
        ],
        [
          "Hotfix to multiple release branches",
          "Cherry-pick from hotfix branch",
          "Cherry-pick specific SHAs",
          "Parallel fix commits on each branch",
        ],
      ]}
    />,

    <Callout key="25" type="tip" title="Interactive Rebase Before Every PR">
      Before opening a pull request, run <code>git rebase -i origin/main</code> and clean up your commits.
      Squash all "WIP", "fix typo", and "oops" commits. Write meaningful commit messages for what remains.
      Reviewers read commit history as documentation — a clean history communicates your thought process
      and makes future <code>git blame</code> and <code>git bisect</code> dramatically more useful.
    </Callout>,

    <Callout key="26" type="info" title="--force-with-lease vs --force">
      When force-pushing a rebased branch, always use <code>git push --force-with-lease</code> instead of <code>--force</code>.
      The lease variant checks that nobody else has pushed to the remote branch since your last fetch.
      A plain <code>--force</code> will silently overwrite any commits your teammate pushed in the meantime.
    </Callout>,
  ],
};
