import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Flow } from "@/components/ui/Flow";
import { Grid } from "@/components/ui/Grid";
import { Highlight } from "@/components/ui/Highlight";
import { MistakeCard } from "@/components/ui/MistakeCard";
import { SourceMarker } from "@/components/ui/SourceMarker";
import { Table } from "@/components/ui/Table";
import type { Topic } from "@/data/types";
import {
  Pickaxe,
  Coins,
  FileCode,
  Layers,
  KeyRound,
  Fingerprint,
  Hash,
} from "lucide-react";

export const web3BlockchainTopic: Topic = {
  id: "web3-blockchain-deep-dive",
  title: "Web3 & Blockchain: How the Crypto Chain Works Under the Hood",
  description:
    "What actually happens behind a blockchain — hash-linked blocks, digital signatures, consensus (PoW vs PoS), smart contracts, Layer 2, and the one question that decides whether you need any of it.",
  icon: "Boxes",
  tags: [
    "web3",
    "blockchain",
    "crypto",
    "bitcoin",
    "ethereum",
    "consensus",
    "proof of work",
    "proof of stake",
    "smart contracts",
    "decentralization",
    "distributed-systems",
  ],
  content: [
    <p key="intro" className="text-slate-700 dark:text-slate-400 leading-relaxed">
      Strip away the hype and a blockchain is a deceptively simple idea: a{" "}
      <strong>shared, append-only ledger that thousands of mutually distrusting
      computers keep in sync without any central authority</strong>. No bank, no
      admin, no master server. The magic isn't a single clever trick — it's the
      way cryptographic hashing, public-key signatures, peer-to-peer gossip, and
      an economic consensus game lock together so tightly that rewriting history
      becomes prohibitively expensive. This article walks the whole machine from
      the bytes of a single block up to the Web3 application stack — and ends
      with the question most projects skip: do you actually need one?
    </p>,

    <Callout key="terminology" type="info" title="Three words people conflate">
      <strong>Blockchain</strong> is the data structure and consensus mechanism.{" "}
      <strong>Crypto(currency)</strong> is one application built on top of it —
      a native token used to pay for and secure the network.{" "}
      <strong>Web3</strong> is the broader vision: applications whose backend
      logic and state live on a blockchain instead of a company's servers.
      Getting these confused is why so many "Web3" pitches are really just
      databases with extra steps.
    </Callout>,

    <h2 key="h-problem" className="text-xl font-bold mt-10 mb-4">
      The Core Problem: Double-Spend Without a Referee
    </h2>,

    <p key="problem-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      Digital money has one fatal flaw a paper bill doesn't: a file can be copied
      perfectly. If your "coin" is just a number in a database, what stops you
      from spending it twice — sending the same coin to two people before anyone
      notices? Traditional finance solves this with a{" "}
      <strong>trusted referee</strong>: a bank holds the authoritative ledger and
      serializes everyone's transactions. The blockchain's entire reason for
      existing, as laid out in the Bitcoin whitepaper{" "}
      <SourceMarker year={2008} />, is to solve double-spend{" "}
      <em>without</em> that referee — so no single party can be censored,
      coerced, or trusted to not cheat.
    </p>,

    <Callout key="problem-why" type="warning" title="Why this is hard">
      The moment you remove the central referee, you have a distributed agreement
      problem under adversarial conditions: messages arrive out of order, nodes
      lie, and networks split. If the network can't agree on a single ordering of
      transactions, the same coin gets spent twice and the currency is worthless.
      Every mechanism that follows exists to make that agreement both{" "}
      <strong>automatic</strong> and <strong>expensive to subvert</strong>.
    </Callout>,

    <h2 key="h-block" className="text-xl font-bold mt-10 mb-4">
      Anatomy of a Block
    </h2>,

    <p key="block-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      A block is two parts: a small <strong>header</strong> (the fields below)
      and a <strong>body</strong> (the list of transactions). Nodes hash only the
      header to identify a block — but the header commits to every transaction
      through the Merkle root, so you can't change one without changing the
      other.
    </p>,

    <Table
      key="block-table"
      headers={["Header Field", "What it stores", "Why it matters"]}
      rows={[
        [
          "Previous Block Hash",
          "Hash of the prior block's header",
          "Chains blocks together. Editing any old block changes its hash and orphans everything after it.",
        ],
        [
          "Merkle Root",
          "One hash summarizing all transactions in the block",
          "Lets a light client prove a transaction is included without downloading the full block.",
        ],
        [
          "Timestamp",
          "Approximate time the block was produced",
          "Feeds difficulty adjustment and rough ordering — it is not a precise clock.",
        ],
        [
          "Nonce",
          "A number producers change to search for a valid hash",
          "The literal 'work' in Proof of Work — billions of guesses per second on Bitcoin.",
        ],
        [
          "Difficulty Target",
          "The threshold the block hash must fall below",
          "Auto-tunes how hard production is to hold block time roughly constant.",
        ],
        [
          "Version",
          "Which consensus rules the producer follows",
          "Signals readiness for protocol upgrades and soft forks.",
        ],
      ]}
    />,

    <h2 key="h-chain" className="text-xl font-bold mt-10 mb-4">
      The Chain: Hash Pointers Make History Tamper-Evident
    </h2>,

    <p key="chain-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      The "chain" is not a metaphor. Each block header embeds the cryptographic
      hash of the previous header. A hash function like{" "}
      <Highlight variant="primary">SHA-256</Highlight> (Bitcoin) or{" "}
      <Highlight variant="primary">Keccak-256</Highlight> (Ethereum) is{" "}
      <strong>deterministic but avalanche-sensitive</strong>: flip a single bit
      of input and roughly half the output bits change unpredictably. That
      property is what makes the past tamper-evident.
    </p>,

    <CodeBlock
      key="chain-code"
      title="why-the-chain-holds.ts"
      language="typescript"
      code={`// Each block's identity is the hash of its header,
// and the header commits to the previous block.
block.hash = SHA256(SHA256(
  block.prevHash    + // ← links to the block before it
  block.merkleRoot  + // ← commits to every transaction in the body
  block.timestamp   +
  block.nonce
));

// Tamper with one old transaction →
//   that block's merkleRoot changes →
//   that block's hash changes →
//   the next block's prevHash no longer matches →
//   ...and every block after it is invalid.
// To rewrite history you must redo the work for ALL following blocks
// faster than the honest network adds new ones.`}
    />,

    <Callout key="chain-why" type="tip" title="The consequence">
      Immutability isn't a flag someone sets — it's an emergent cost. Each new
      block buried on top of a transaction multiplies the work needed to reverse
      it. This is exactly why exchanges wait for several{" "}
      <strong>confirmations</strong> before crediting a deposit: a 1-block-deep
      payment is cheap to reverse, a 100-block-deep one effectively isn't.
    </Callout>,

    <h2 key="h-crypto" className="text-xl font-bold mt-10 mb-4">
      Cryptographic Foundations: Hashing, Keys & Signatures
    </h2>,

    <p key="crypto-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      A blockchain has no usernames and no passwords. "Ownership" is purely
      cryptographic: whoever holds the private key controls the funds. Three
      primitives do all the work.
    </p>,

    <Grid key="crypto-grid" cols={3} gap={6}>
      <FeatureCard
        icon={Hash}
        title="Hashing"
        subtitle="One-way fingerprint"
        theme="sky"
      >
        <p className="text-sky-700 dark:text-sky-300/80 leading-relaxed mb-3">
          Maps any input to a fixed-size, practically irreversible digest.{" "}
          <strong className="text-sky-700 dark:text-sky-400">SHA-256</strong> and{" "}
          <strong className="text-sky-700 dark:text-sky-400">Keccak-256</strong> link blocks, build
          Merkle trees, and power Proof of Work.
        </p>
        <p className="text-sky-700 dark:text-sky-300/80 leading-relaxed">
          You cannot run a hash backward — only guess inputs and check. That
          asymmetry is the whole security model.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={KeyRound}
        title="Key Pairs"
        subtitle="Public address, private secret"
        theme="teal"
      >
        <p className="text-teal-700 dark:text-teal-300/80 leading-relaxed mb-3">
          Elliptic-curve cryptography over{" "}
          <strong className="text-teal-700 dark:text-teal-400">secp256k1</strong> generates a
          private key (the secret) and a public key. Your{" "}
          <strong className="text-teal-700 dark:text-teal-400">address</strong> is a hash of the
          public key.
        </p>
        <p className="text-teal-700 dark:text-teal-300/80 leading-relaxed">
          The public key can be shared freely; deriving the private key from it
          is computationally infeasible.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Fingerprint}
        title="Signatures"
        subtitle="Prove it without revealing it"
        theme="amber"
      >
        <p className="text-amber-700 dark:text-amber-300/80 leading-relaxed mb-3">
          To spend, you sign the transaction with your private key using{" "}
          <strong className="text-amber-700 dark:text-amber-400">ECDSA</strong>. Anyone can verify
          the signature against your public key.
        </p>
        <p className="text-amber-700 dark:text-amber-300/80 leading-relaxed">
          This proves you authorized the transfer without ever exposing the
          secret that controls the funds.
        </p>
      </FeatureCard>
    </Grid>,

    <Callout key="crypto-why" type="warning" title="There is no 'forgot password'">
      Because identity <em>is</em> the private key, losing it means losing the
      funds permanently — no support line can restore access. Conversely, anyone
      who copies your key owns everything in the account instantly. Self-custody
      is total: the security model that removes the bank also removes the safety
      net.
    </Callout>,

    <h2 key="h-merkle" className="text-xl font-bold mt-10 mb-4">
      Merkle Trees: Verifying Without Downloading Everything
    </h2>,

    <p key="merkle-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      Transactions in a block are hashed in pairs, then those hashes are hashed
      in pairs, repeatedly, up to a single <strong>Merkle root</strong> in the
      header. The payoff is practical: a phone wallet doesn't store the
      multi-hundred-gigabyte chain. It runs as a <strong>light client</strong>,
      downloading only headers and asking a full node for a short{" "}
      <em>Merkle proof</em> — a handful of hashes that prove "your transaction is
      in this block" without trusting the node's word for it.
    </p>,

    <Callout key="merkle-why" type="tip" title="Why it matters">
      Without Merkle proofs, every wallet would need the entire chain to verify a
      single payment — making mobile and embedded clients impossible.
      Merkle-backed verification is what lets billions of devices interact with a
      chain they could never store.
    </Callout>,

    <h2 key="h-lifecycle" className="text-xl font-bold mt-10 mb-4">
      The Life of a Transaction
    </h2>,

    <p key="lifecycle-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      From "tap send" to "irreversible," a transaction crosses the whole system.
      Each stage is a place where it can stall, get reordered, or be dropped.
    </p>,

    <Flow
      key="lifecycle-flow"
      steps={[
        {
          title: "Sign",
          description:
            "Your wallet signs the transaction with your private key (ECDSA / secp256k1). The signature proves authorization without revealing the key.",
        },
        {
          title: "Broadcast",
          description:
            "The signed transaction is gossiped peer-to-peer across the network. There is no single server it is 'sent to' — it floods outward.",
        },
        {
          title: "Mempool",
          description:
            "Every node holds it in a pending pool, typically ordered by fee. Low-fee transactions can wait — or be dropped — when the network is congested.",
        },
        {
          title: "Inclusion",
          description:
            "A miner (PoW) or validator (PoS) selects high-fee transactions, executes them, and packs them into a candidate block.",
        },
        {
          title: "Production",
          description:
            "The block is mined or proposed and propagated. Now the transaction has 1 confirmation — but it is still shallow and reversible.",
        },
        {
          title: "Finality",
          description:
            "More blocks pile on top. PoW finality is probabilistic (deeper = safer); Ethereum PoS reaches economic finality after ~2 epochs (~13 min).",
        },
      ]}
    />,

    <h2 key="h-consensus" className="text-xl font-bold mt-10 mb-4">
      Consensus: How Strangers Agree on One History
    </h2>,

    <p key="consensus-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      Consensus is the heart of the system: the rule that decides{" "}
      <em>whose</em> block becomes the next link, and how the network converges
      on one chain when two valid blocks appear at once (it follows the{" "}
      <strong>heaviest / longest valid chain</strong>). The job is to make
      producing blocks <strong>costly</strong> so that attacking the chain costs
      more than it could ever yield. Two designs dominate.
    </p>,

    <Grid key="consensus-grid" cols={2} gap={6}>
      <FeatureCard
        icon={Pickaxe}
        title="Proof of Work"
        subtitle="Security bought with energy"
        theme="orange"
      >
        <p className="text-orange-700 dark:text-orange-300/80 leading-relaxed mb-3">
          Miners race to find a <strong className="text-orange-700 dark:text-orange-400">nonce</strong>{" "}
          that makes the block hash fall below the difficulty target — pure
          brute-force guessing, billions of hashes per second. The first to
          succeed wins the block reward.
        </p>
        <p className="text-orange-700 dark:text-orange-300/80 leading-relaxed mb-3">
          Difficulty auto-retargets (every 2016 blocks on Bitcoin){" "}
          <SourceMarker year={2009} /> to hold block time near{" "}
          <strong className="text-orange-700 dark:text-orange-400">~10 minutes</strong> regardless of
          how much hash power joins.
        </p>
        <p className="text-orange-700 dark:text-orange-300/80 leading-relaxed">
          <strong className="text-orange-700 dark:text-orange-400">Failure mode:</strong> mining
          centralizes wherever electricity is cheapest, and small PoW chains with
          little total hash power are affordable to 51%-attack.
        </p>
      </FeatureCard>

      <FeatureCard
        icon={Coins}
        title="Proof of Stake"
        subtitle="Security bought with capital"
        theme="indigo"
      >
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed mb-3">
          Validators lock up capital as a{" "}
          <strong className="text-indigo-700 dark:text-indigo-400">stake</strong> (32 ETH on
          Ethereum). The protocol pseudo-randomly chooses one to propose each
          block; others attest. Ethereum switched to PoS at{" "}
          <strong className="text-indigo-700 dark:text-indigo-400">The Merge</strong>{" "}
          <SourceMarker year={2022} />.
        </p>
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed mb-3">
          Cheating is punished by <strong className="text-indigo-700 dark:text-indigo-400">slashing</strong>{" "}
          — the protocol destroys part of the offender's stake. This is what kills
          the old "nothing-at-stake" objection.
        </p>
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed">
          <strong className="text-indigo-700 dark:text-indigo-400">Failure mode:</strong> stake (and
          thus influence) concentrates in large staking pools, reintroducing a
          softer form of centralization.
        </p>
      </FeatureCard>
    </Grid>,

    <p key="consensus-table-intro" className="text-slate-700 dark:text-slate-400 text-sm mt-2 mb-2">
      The axes that actually decide which one a chain should use:
    </p>,

    <Table
      key="consensus-table"
      headers={[
        "Dimension",
        '<span style="color:#fed7aa">Proof of Work</span>',
        '<span style="color:#c7d2fe">Proof of Stake</span>',
      ]}
      rows={[
        [
          "Security comes from",
          "Burning real-world energy on hashing",
          "Capital at risk, destroyed (slashed) for cheating",
        ],
        [
          "Block time",
          "~10 min (Bitcoin)",
          "~12 s slots (Ethereum, post-Merge)",
        ],
        [
          "Energy use",
          "Very high — nation-scale draw",
          "~99%+ lower than equivalent PoW",
        ],
        [
          "Hardware floor",
          "Specialized ASICs / GPU farms",
          "Ordinary server + bonded stake",
        ],
        [
          "Cost to 51%-attack",
          "Acquire majority of hash power (hardware + power)",
          "Acquire majority of stake — then watch it get slashed",
        ],
        [
          "How it fails",
          "Mining centralizes on cheap power; small chains get reorged",
          "Stake concentrates in pools; complex slashing edge cases",
        ],
        [
          "Finality",
          "Probabilistic — bury it deeper (~6 confs)",
          "Economic finality after ~2 epochs (~13 min)",
        ],
        [
          "When to pick",
          "Maximal battle-tested security & censorship resistance",
          "Throughput, low energy, faster finality, programmability",
        ],
        [
          "Real chains",
          "Bitcoin, Litecoin, Dogecoin, Ethereum Classic",
          "Ethereum, Cardano, Cosmos chains, Solana (variant)",
        ],
      ]}
    />,

    <p key="reorg-intro" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-2">
      <strong>Forks and reorgs</strong> are the normal exhaust of consensus. When
      two valid blocks appear nearly simultaneously, the chain temporarily
      branches; nodes converge on whichever branch the next block extends, and
      the losing block becomes an <em>orphan</em>. A{" "}
      <strong>soft fork</strong> tightens rules (backward-compatible); a{" "}
      <strong>hard fork</strong> changes them incompatibly and can split a chain
      in two. A <strong>reorg</strong> is when already-published blocks get
      replaced — harmless when shallow, catastrophic when deep.
    </p>,

    <MistakeCard
      key="war-51"
      number={1}
      title="War Story: The 51% Attack on Ethereum Classic"
      problem={
        <>
          Because Ethereum Classic (a PoW chain) carries far less total hash
          power than Bitcoin or Ethereum, an attacker rented enough mining power
          to control the majority, secretly built a longer private chain, then
          released it to <strong>reorg</strong> blocks the network had already
          accepted. They double-spent coins on exchanges — depositing, trading
          out, then erasing the original deposit — causing losses in the millions
          of dollars <SourceMarker year={2020} />.
        </>
      }
      solution={
        <>
          51% resistance scales with the cost of the resource securing the chain.
          Bitcoin's hash power makes this economically absurd; a low-hash-rate
          chain does not. Exchanges responded by sharply increasing required
          confirmations for smaller chains — trading settlement speed for the
          finality those chains can't cheaply guarantee.
        </>
      }
    />,

    <h2 key="h-contracts" className="text-xl font-bold mt-10 mb-4">
      Smart Contracts & the EVM: The "World Computer"
    </h2>,

    <p key="contracts-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      Bitcoin tracks balances. Ethereum's leap was to put a small, deterministic
      virtual machine — the <strong>EVM</strong> — at every node, so the chain
      stores not just data but <em>programs</em>. A{" "}
      <strong>smart contract</strong> is code deployed to an address; calling it
      runs the same bytecode on every node, and they all must reach the identical
      result. That determinism is non-negotiable: if nodes disagreed on the
      output, consensus would break.
    </p>,

    <Grid key="contracts-grid" cols={2} gap={6}>
      <FeatureCard
        icon={FileCode}
        title="Gas: Metering Computation"
        subtitle="Why every operation has a price"
        theme="violet"
      >
        <p className="text-violet-700 dark:text-violet-300/80 leading-relaxed mb-3">
          Every EVM operation costs <strong className="text-violet-700 dark:text-violet-400">gas</strong>.
          Senders pay for the compute and storage they consume, and each block
          has a gas limit. This is the defense against the obvious attack: an
          infinite loop would otherwise freeze every node on Earth.
        </p>
        <p className="text-violet-700 dark:text-violet-300/80 leading-relaxed">
          <strong className="text-violet-700 dark:text-violet-400">EIP-1559</strong>{" "}
          <SourceMarker spec="EIP-1559" /> split fees into a protocol-set{" "}
          <em>base fee</em> (burned) plus a <em>priority tip</em> to the
          proposer — making fees more predictable and making ETH deflationary
          under load.
        </p>
        <CodeBlock
          theme="violet"
          title="gas-runs-out.sol"
          language="solidity"
          code={`// Run out of gas mid-execution and the whole
// transaction REVERTS — state rolls back — but the
// gas already burned is NOT refunded.
while (true) { x++; } // ⛔ halts at the gas limit`}
        />
      </FeatureCard>

      <FeatureCard
        icon={Coins}
        title="Token Standards"
        subtitle="Interfaces, not new chains"
        theme="indigo"
      >
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed mb-3">
          Most "coins" are not their own blockchains — they are contracts on
          Ethereum that follow a shared interface so wallets and exchanges can
          treat them uniformly.
        </p>
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed mb-3">
          <strong className="text-indigo-700 dark:text-indigo-400">ERC-20</strong>{" "}
          <SourceMarker spec="ERC-20" /> standardizes fungible tokens
          (interchangeable units). <strong className="text-indigo-700 dark:text-indigo-400">ERC-721</strong>{" "}
          <SourceMarker spec="ERC-721" /> standardizes non-fungible tokens —
          each one unique (NFTs).
        </p>
        <p className="text-indigo-700 dark:text-indigo-300/80 leading-relaxed">
          Because they're just contract methods, a single wallet can hold
          thousands of token types without the chain knowing anything special
          about them.
        </p>
      </FeatureCard>
    </Grid>,

    <MistakeCard
      key="war-dao"
      number={2}
      title="War Story: The DAO Reentrancy Hack"
      problem={
        <>
          A flagship Ethereum contract, "The DAO," sent ETH to a caller{" "}
          <em>before</em> updating its internal balance. An attacker's contract
          used its fallback function to call back in repeatedly during that
          window — draining roughly <strong>3.6 million ETH</strong> (tens of
          millions of dollars at the time) before any balance was decremented{" "}
          <SourceMarker year={2016} />. The code did exactly what it was written
          to do; "code is law" became a liability.
        </>
      }
      solution={
        <>
          Follow the <strong>checks-effects-interactions</strong> pattern: update
          state <em>before</em> making external calls, and use reentrancy guards.
          The deeper lesson is irreversibility — there was no admin to hit undo.
          The community's only fix was a contentious{" "}
          <strong>hard fork</strong> that rewrote history to refund victims,
          permanently splitting the network into Ethereum (ETH) and Ethereum
          Classic (ETC).
        </>
      }
    />,

    <h2 key="h-scaling" className="text-xl font-bold mt-10 mb-4">
      Scaling: The Trilemma & Layer 2
    </h2>,

    <p key="scaling-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      Every node re-executing every transaction is what makes a chain trustless —
      and also what makes it slow. Bitcoin handles on the order of{" "}
      <strong>~7 transactions per second</strong> and Ethereum L1 roughly{" "}
      <strong>15–30</strong> <SourceMarker year={2024} /> — orders of magnitude
      below a centralized network like Visa. The{" "}
      <strong>scalability trilemma</strong> frames the bind: it's easy to get any
      two of <em>decentralization</em>, <em>security</em>, and{" "}
      <em>scalability</em>, but hard to get all three at once.
    </p>,

    <p key="scaling-2" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      The dominant answer is <strong>Layer 2 (L2)</strong>: execute transactions
      off the main chain in bulk, then post a compressed summary plus a proof
      back to Layer 1, which still provides the security guarantees. Two families
      of <strong>rollups</strong> compete.
    </p>,

    <FeatureCard
      key="l2-card"
      icon={Layers}
      title="Rollups Inherit L1 Security"
      subtitle="Compute off-chain, settle on-chain"
      theme="cyan"
    >
      <p className="text-cyan-700 dark:text-cyan-300/80 leading-relaxed">
        A rollup batches thousands of transactions, executes them on a cheaper
        L2, and writes the result to Ethereum. Users get L2 speed and fees while
        disputes ultimately settle on L1 — so they don't have to trust the L2
        operator's honesty, only L1's. The difference between the two families is{" "}
        <strong className="text-cyan-700 dark:text-cyan-400">how they convince L1 the batch is
        valid</strong>.
      </p>
    </FeatureCard>,

    <Table
      key="l2-table"
      headers={["Dimension", "Optimistic Rollups", "ZK Rollups"]}
      rows={[
        [
          "Validity model",
          "Assume valid; allow challenges (fraud proofs)",
          "Prove validity up front (cryptographic validity proofs)",
        ],
        [
          "Withdrawal to L1",
          "~7-day challenge window before exit clears",
          "Minutes–hours, once the proof is verified",
        ],
        [
          "Cost profile",
          "Cheap to produce, expensive only if disputed",
          "Expensive proof generation, cheap to verify on L1",
        ],
        [
          "EVM compatibility",
          "Mature, close to drop-in",
          "Harder (zkEVM), but improving fast",
        ],
        [
          "How it fails / gotcha",
          "Long exit delays; safety needs at least one honest watcher to file fraud proofs",
          "Proving complexity & cost; younger, smaller tooling ecosystem",
        ],
        [
          "Examples",
          "Arbitrum, Optimism, Base",
          "zkSync, StarkNet, Polygon zkEVM, Linea",
        ],
      ]}
    />,

    <MistakeCard
      key="war-ronin"
      number={3}
      title="War Story: The Ronin Bridge Compromise"
      problem={
        <>
          Bridges that move assets between chains are a giant honeypot — they lock
          real value behind a multisig. The Ronin bridge used a 9-validator
          multisig requiring 5 signatures. An attacker phished and compromised
          enough validator keys to reach the threshold, then simply{" "}
          <strong>authorized withdrawals to themselves</strong> — making off with
          roughly <strong>$600M</strong> <SourceMarker year={2022} />, one of the
          largest crypto thefts ever.
        </>
      }
      solution={
        <>
          On-chain consensus was never broken; the <em>operational</em>{" "}
          trust boundary was. Bridges concentrate risk that the base chains
          deliberately distribute. Mitigations: higher signer thresholds,
          hardware-isolated keys, withdrawal rate limits and time delays, and
          favoring designs (like native rollup bridges) that minimize trusted
          off-chain signers. The lesson: a chain is only as safe as the weakest
          system holding its keys.
        </>
      }
    />,

    <h2 key="h-stack" className="text-xl font-bold mt-10 mb-4">
      The Web3 Application Stack
    </h2>,

    <p key="stack-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      A "dApp" still has a normal frontend — the difference is where state and
      logic live. Instead of calling your own API and database, the app talks to
      the chain through a standard <strong>JSON-RPC</strong> interface, with the
      user's <strong>wallet</strong> as the signing authority.
    </p>,

    <Flow
      key="stack-flow"
      steps={[
        {
          title: "Wallet",
          description:
            "Holds keys and signs transactions (MetaMask, hardware wallet). The private key never leaves the device — the app only ever receives a signature.",
        },
        {
          title: "dApp Frontend",
          description:
            "A normal React/JS app using a library like ethers.js or viem to encode read calls and build transactions.",
        },
        {
          title: "JSON-RPC",
          description:
            "A standardized API (eth_call, eth_sendRawTransaction, eth_getBalance) spoken over HTTPS or WebSocket. This is the chain's 'REST'.",
        },
        {
          title: "Node / RPC Provider",
          description:
            "A full node — your own or a provider like Infura/Alchemy — executes reads locally and relays signed transactions into the P2P network.",
        },
        {
          title: "Blockchain",
          description:
            "The transaction enters the mempool and follows the full lifecycle: included in a block, confirmed, finalized.",
        },
      ]}
    />,

    <CodeBlock
      key="stack-code"
      title="reads-are-free-writes-cost.ts"
      language="typescript"
      code={`// READ: runs on a node, touches no consensus, costs no gas.
const balance = await provider.getBalance(address);

// WRITE: must be signed by the wallet, broadcast, mined/proposed.
// It costs gas and changes shared state for everyone.
const tx = await contract.transfer(to, amount); // wallet prompts to sign
await tx.wait(); // block until it is confirmed on-chain`}
    />,

    <Callout key="stack-why" type="warning" title="The reliability shift">
      Notice what moved: there is no server you control to patch, roll back, or
      rate-limit. If your deployed contract has a bug, you generally can't edit
      it — you deploy a new one and migrate. Many teams underestimate this and
      ship unaudited contracts holding real money. On a public chain, a logic
      error isn't a hotfix — it's a permanent, publicly exploitable liability.
    </Callout>,

    <h2 key="h-decision" className="text-xl font-bold mt-10 mb-4">
      Do You Actually Need a Blockchain?
    </h2>,

    <p key="decision-1" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
      This is the question that separates engineering from hype. A blockchain buys
      you exactly one thing that a database can't: <strong>shared, tamper-evident
      state among parties who don't trust each other and refuse a central
      operator</strong>. Everything else — throughput, cost, latency, simplicity
      — is strictly worse than a normal database. So the honest comparison:
    </p>,

    <Table
      key="decision-table"
      headers={["Dimension", "Blockchain", "Traditional Database (e.g. Postgres)"]}
      rows={[
        [
          "Trust assumption",
          "No trusted party; mutually distrusting participants",
          "One trusted operator controls the data",
        ],
        [
          "Write throughput",
          "Low — on the order of tens of tx/s on L1",
          "Tens of thousands of tx/s on a single node",
        ],
        [
          "Cost per write",
          "Gas fees that spike under congestion",
          "Effectively negligible",
        ],
        [
          "Mutability",
          "Append-only; effectively immutable",
          "Update and delete freely",
        ],
        [
          "Access",
          "Permissionless on public chains — anyone can read",
          "You define exactly who can read and write",
        ],
        [
          "Failure / abuse mode",
          "51% attacks, bridge hacks, irreversible bugs (no undo)",
          "Operator compromise — but backups can restore",
        ],
        [
          "Best when",
          "Shared state across orgs that don't trust each other",
          "Almost everything else",
        ],
      ]}
    />,

    <p key="decision-checklist-intro" className="text-slate-700 dark:text-slate-400 leading-relaxed mb-2">
      A useful gate: reach for a blockchain only when{" "}
      <strong>all</strong> of these hold simultaneously —
    </p>,

    <Card key="decision-checklist" title="The 'You Might Need a Blockchain' Checklist">
      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
        <li>Multiple parties must write to shared state.</li>
        <li>Those parties actively distrust one another.</li>
        <li>There is no acceptable neutral intermediary they'd all trust.</li>
        <li>The state must be tamper-evident and auditable by everyone.</li>
        <li>You can tolerate low throughput, fees, and slow finality.</li>
      </ul>
    </Card>,

    <MistakeCard
      key="decision-mistake"
      number={4}
      title="The Most Common Mistake: Blockchain as a Database"
      problem={
        <>
          A single company adopts a chain for an <em>internal</em> use case where
          one entity already controls all the data and all the participants. They
          inherit every downside — low throughput, gas costs, irreversibility,
          operational complexity — to buy trustlessness they don't actually need,
          because the trusted party already exists: them.
        </>
      }
      solution={
        <>
          If one entity can be trusted to operate the system, a replicated SQL
          database with strict access control plus an{" "}
          <strong>append-only audit log</strong> (optionally hash-chained for
          tamper-evidence) delivers the integrity guarantees at a fraction of the
          cost and a thousand times the speed. Use a blockchain when removing the
          trusted intermediary is the <em>product requirement</em> — not the
          aesthetic.
        </>
      }
    />,

    <Callout key="final" type="tip" title="The bottom line">
      A blockchain is a slow, expensive, redundant database that earns its keep
      by deleting the need for trust. That trade is transformative for
      cross-organization settlement, censorship-resistant money, and
      permissionless ownership — and pure overhead for nearly everything else.
      Understand the machine well enough to know which side of that line your
      problem falls on.
    </Callout>,
  ],
};
