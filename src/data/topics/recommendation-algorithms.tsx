import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";
import { Flow } from "@/components/ui/Flow";
import { Highlight } from "@/components/ui/Highlight";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  Eye,
  Clock,
  ThumbsUp,
  TrendingUp,
  Users,
  Filter,
} from "lucide-react";

export const recommendationAlgorithmsTopic: Topic = {
  id: "recommendation-algorithms",
  title: "Recommendation Algorithms: YouTube & Netflix",
  description:
    "How AI, user signals, embedding models, and billion-scale ranking pipelines decide what you watch next — and why you can't stop scrolling.",
  tags: ["system-design", "machine-learning", "ai", "backend", "product"],
  icon: "Brain",
  content: [
    <p key="intro" className="text-slate-300">
      Both YouTube and Netflix have publicly documented their recommendation systems through
      engineering blog posts and research papers. The short answer to "is it AI?" is: yes, but the
      AI only ranks candidates — the hard engineering problem is generating those candidates from a
      library of millions of videos or titles in under 100ms, per user, per page load.
    </p>,

    /* ─── THE BIG PICTURE ─── */
    <h3 key="h-pipeline" className="text-xl font-bold mt-12 mb-4">
      The Two-Stage Funnel — How Both Companies Structure It
    </h3>,
    <p key="p-pipeline" className="text-slate-300 mb-6">
      Neither YouTube nor Netflix tries to rank every piece of content for you directly. That would
      be impossible at scale. Instead, both use a{" "}
      <strong>two-stage funnel</strong>: narrow millions to hundreds (Retrieval), then rank those
      hundreds to a final ordered list (Ranking). The entire pipeline must run in roughly{" "}
      <strong>100–200ms</strong>.
    </p>,
    <Flow
      key="flow-pipeline"
      steps={[
        {
          title: "1. Candidate Generation (Retrieval) — Millions → ~500",
          description:
            "A lightweight model looks at your user embedding and finds the ~500 most relevant candidates from the entire content library using Approximate Nearest Neighbour search (ANN) against a vector index. This step is fast but coarse — it prioritises recall over precision.",
        },
        {
          title: "2. Scoring & Ranking — ~500 → ~50",
          description:
            "A heavier, more accurate model (a deep neural network) scores each of the 500 candidates against a richer feature set: your watch history, time of day, device, video freshness, engagement signals. This narrows to ~50 ranked items.",
        },
        {
          title: "3. Post-Ranking & Business Rules — ~50 → Final Feed",
          description:
            "Hard business constraints are applied: diversity rules (no 3 videos from the same channel in a row), freshness boosts, sponsored/promoted content insertion, safety filters, and copyright restrictions. The final ordered list is sent to your client.",
        },
        {
          title: "4. Feedback Loop — Your Behaviour Updates the Model",
          description:
            "Everything you do — clicks, watch time, skips, explicit ratings, hovers — is logged as training data. Models are retrained continuously (YouTube) or nightly/weekly (Netflix). The system learns what actually drove satisfaction, not just what drove clicks.",
        },
      ]}
    />,

    /* ─── WHAT SIGNALS THEY ACTUALLY USE ─── */
    <h3 key="h-signals" className="text-xl font-bold mt-12 mb-4">
      The Signals — What Your Behaviour Actually Teaches the Algorithm
    </h3>,
    <p key="p-signals" className="text-slate-300 mb-6">
      This is the part most people are curious about. Yes, they track hover. Yes, they track partial
      watches. Here is what YouTube and Netflix have confirmed they use, ranked by signal strength.
    </p>,
    <Grid key="grid-signals" cols={2} gap={6} className="mb-10 items-stretch">
      <FeatureCard icon={Clock} title="Watch Time / Completion Rate" subtitle="Highest signal weight" theme="emerald">
        <p className="text-sm text-red-200/80 leading-relaxed mb-3">
          The single most important signal. Watching 90% of a video tells the system you found it
          genuinely valuable. YouTube confirmed in their 2016 Deep Neural Networks paper that they
          shifted from click-through rate to{" "}
          <strong className="text-red-400">watch time</strong> as the primary optimisation target
          precisely because clicks were being gamed by clickbait thumbnails.
        </p>
        <ul className="text-sm text-red-200/80 list-disc pl-4 space-y-1">
          <li>Watching &gt;70% → very strong positive signal</li>
          <li>Re-watching same content → extremely strong signal</li>
          <li>Watching &lt;10% and leaving → moderate negative signal</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={ThumbsUp} title="Explicit Ratings & Reactions" subtitle="High signal, low volume" theme="teal">
        <p className="text-sm text-teal-200/80 leading-relaxed mb-3">
          Likes, Dislikes (YouTube), Thumbs Up/Down (Netflix), and explicit "Not Interested" are
          very high-quality signals because they require deliberate user action. Netflix actually
          changed their 5-star rating to thumbs up/down in 2017 because{" "}
          <strong className="text-teal-400">engagement on ratings doubled</strong> — people rate more
          when it's binary.
        </p>
        <ul className="text-sm text-teal-200/80 list-disc pl-4 space-y-1">
          <li>Thumbs Up/Like → strong interest signal</li>
          <li>"Not Interested" / Hide → strong exclusion signal</li>
          <li>Adding to Watch Later or playlist → intent signal</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Eye} title="Click-Through Rate (CTR)" subtitle="Medium signal — gameable" theme="amber">
        <p className="text-sm text-amber-200/80 leading-relaxed mb-3">
          CTR is still measured and used, but it's weighted less heavily than watch time because it
          was being manipulated by misleading thumbnails and titles. YouTube uses CTR as a{" "}
          <strong className="text-amber-400">candidate filtering signal</strong>, not the primary
          ranking signal. High CTR + low watch time = penalised, not rewarded.
        </p>
        <ul className="text-sm text-amber-200/80 list-disc pl-4 space-y-1">
          <li>Click + immediate back = net negative signal</li>
          <li>Click + long watch = net positive signal</li>
          <li>High CTR + low completion = clickbait penalty</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={TrendingUp} title="Scroll & Hover Behaviour" subtitle="Implicit intent signal" theme="cyan">
        <p className="text-sm text-cyan-200/80 leading-relaxed mb-3">
          Neither company has formally published hover as a first-class signal, but both track
          impression data. Netflix tracks how long a title card is{" "}
          <strong className="text-cyan-400">visible on screen</strong> (impression time). YouTube
          tracks autoplay preview engagement. Hovering long enough to trigger a preview without
          clicking is a weak positive interest signal — you saw it but weren't convinced enough.
        </p>
        <ul className="text-sm text-cyan-200/80 list-disc pl-4 space-y-1">
          <li>Long hover + preview play → weak interest signal</li>
          <li>Thumbnail impression without click → neutral</li>
          <li>Scroll past immediately → implicit low interest</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Users} title="Session Context" subtitle="When and how you're watching" theme="indigo">
        <p className="text-sm text-indigo-200/80 leading-relaxed mb-3">
          The algorithm is context-aware. What you want at 11pm on a phone is different from what
          you want at 9am on a TV. Both platforms use{" "}
          <strong className="text-indigo-400">time of day, device type, and session length</strong>{" "}
          as context features. Netflix also uses your starting point (Trending row vs. Continue
          Watching vs. Search) to understand intent.
        </p>
        <ul className="text-sm text-indigo-200/80 list-disc pl-4 space-y-1">
          <li>TV device → lean-back, longer content preferred</li>
          <li>Mobile late night → short-form, comfort rewatching</li>
          <li>Weekday morning → news, tutorials, catchup</li>
        </ul>
      </FeatureCard>

      <FeatureCard icon={Filter} title="Search & Share Behaviour" subtitle="Strong explicit intent" theme="violet">
        <p className="text-sm text-violet-200/80 leading-relaxed mb-3">
          Searching for a topic and then watching results is a very strong explicit intent signal —
          you actively wanted that type of content. Sharing a video (copy link, social share) is one
          of the strongest satisfaction signals because it requires effort and reflects that you
          wanted someone else to see it.
        </p>
        <ul className="text-sm text-violet-200/80 list-disc pl-4 space-y-1">
          <li>Search → watch → complete = strong topic interest</li>
          <li>Share = very strong satisfaction signal</li>
          <li>Comment = strong engagement signal</li>
        </ul>
      </FeatureCard>
    </Grid>,

    /* ─── THE ML MODELS ─── */
    <h3 key="h-ml" className="text-xl font-bold mt-12 mb-4">
      The Machine Learning Behind It
    </h3>,
    <p key="p-ml" className="text-slate-300 mb-6">
      Both platforms have published research revealing the core ML architecture. The models are not
      simple — they combine ideas from collaborative filtering, deep learning, and transformer-based
      sequence modelling.
    </p>,
    <Grid key="grid-ml" cols={2} gap={6} className="mb-8 items-stretch">
      <Card title="Collaborative Filtering — 'People Like You'">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          The foundational technique. If you and 10,000 other users watched the same 50 videos, and
          those users also watched Video X, you're likely to enjoy Video X too. The system finds
          users with similar taste vectors and surfaces what they engaged with.
        </p>
        <p className="text-sm text-slate-400">
          <strong className="text-muted-foreground">Cold start problem:</strong>{" "}Fails for new
          users with no history. Both platforms fall back to popularity signals and explicit
          onboarding preferences.
        </p>
      </Card>

      <Card title="Matrix Factorisation & Embeddings">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Every user and every piece of content is represented as a{" "}
          <strong>dense vector (embedding)</strong> in a high-dimensional space. Content you like
          ends up geometrically close to you. The retrieval stage finds your nearest neighbours in
          this embedding space using ANN (Approximate Nearest Neighbour) — typically FAISS or ScaNN.
        </p>
        <p className="text-sm text-slate-400">
          Netflix published their use of{" "}
          <strong className="text-muted-foreground">row-based and session-based embeddings</strong>{" "}
          — your taste vector shifts slightly every session.
        </p>
      </Card>

      <Card title="YouTube's Deep Neural Network (2016 Paper)">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          YouTube's landmark paper "Deep Neural Networks for YouTube Recommendations" revealed a
          two-tower model: one tower for the user (watch history, demographics, context), one for
          the video (content features, engagement stats). The model is trained to predict{" "}
          <strong>watch time</strong>, not click probability.
        </p>
        <p className="text-sm text-slate-400">
          The paper also revealed they use "example age" as a feature — explicitly penalising
          older content to counteract the bias towards historically popular videos.
        </p>
      </Card>

      <Card title="Netflix's Sequence Models (2022+)">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Netflix moved beyond static user embeddings to{" "}
          <strong>session-aware sequence models</strong> that treat your viewing history as a
          sequence of tokens — similar to how a language model treats words. The model can detect
          "mood shifts" — if you've been watching thrillers for 3 sessions and suddenly watch a
          comedy, the recommendation mix shifts.
        </p>
        <p className="text-sm text-slate-400">
          This is transformer-architecture applied to user behaviour sequences, not text.
        </p>
      </Card>
    </Grid>,

    /* ─── HOW THEY DIFFER ─── */
    <h3 key="h-diff" className="text-xl font-bold mt-12 mb-4">
      YouTube vs Netflix — Key Algorithmic Differences
    </h3>,
    <Table
      key="table-diff"
      headers={["Dimension", "YouTube", "Netflix"]}
      rows={[
        [
          "Content freshness",
          "Heavily weights new content. Trending and recency are first-class signals. Old videos can resurface but compete hard.",
          "Less pressure on freshness — a 2019 Netflix original is equally valid. Completions drive the catalog.",
        ],
        [
          "Primary optimisation target",
          "Watch time + satisfaction survey scores (post-2016). Not raw clicks.",
          "Probability of watching + completion rate + likelihood of returning to Netflix.",
        ],
        [
          "Creator supply side",
          "Must serve both viewers AND creators. High-performing creators get distribution boosts. Demonetisation affects reach.",
          "Catalog is fixed and curated. No creator supply problem — Netflix controls what gets made.",
        ],
        [
          "Search intent",
          "Heavy reliance on search. Many users come with specific intent. Algorithm integrates search history.",
          "Most usage is browse-driven. Search is secondary. Homepage recommendation is the primary surface.",
        ],
        [
          "Explicit feedback",
          "Likes, dislikes (YouTube removed public dislike count), Save, Share, Subscribe.",
          "Thumbs up/down, percentage match score displayed, explicit 'Not Interested'.",
        ],
        [
          "A/B testing",
          "Continuous large-scale A/B experiments on ranking weights and UI treatments.",
          "Netflix famously A/B tests even thumbnail artwork per user segment.",
        ],
      ]}
    />,

    /* ─── THE THUMBNAIL RABBIT HOLE ─── */
    <h3 key="h-thumb" className="text-xl font-bold mt-12 mb-4">
      Netflix's Personalised Thumbnails — The Hidden Layer
    </h3>,
    <p key="p-thumb" className="text-slate-300 mb-4">
      One of the most underappreciated engineering facts about Netflix: the thumbnail you see for
      a title is <strong>not the same thumbnail everyone sees</strong>. Netflix runs large-scale
      A/B tests on artwork and then serves personalised artwork per user segment.
    </p>,
    <Callout key="callout-thumb" type="info" title="Netflix Artwork Personalisation (Real)">
      Netflix published a 2017 tech blog post confirming: if the model determines you have watched
      many films featuring a specific actor, and that actor appears in a movie you haven't seen yet,
      you will see a thumbnail <strong className="text-sky-300">cropped and framed to feature that actor</strong> — even if
      the default promotional art focuses on someone else. A user who watches many action films sees
      the action-heavy thumbnail. A user who watches dramas sees the drama-heavy thumbnail of the
      same title. This is served in real-time based on your user embedding.
    </Callout>,

    /* ─── THE "WHY CAN'T I STOP" ENGINEERING ─── */
    <h3 key="h-hook" className="text-xl font-bold mt-12 mb-4">
      The Engagement Engineering — Why You Can't Stop
    </h3>,
    <p key="p-hook" className="text-slate-300 mb-6">
      Both platforms use specific product and algorithmic mechanisms that exploit psychological
      patterns. These are documented engineering decisions — not conspiracy.
    </p>,
    <Grid key="grid-hook" cols={2} gap={6} className="mb-8">
      <Card title="YouTube Autoplay">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Autoplay removes the decision point. Instead of you actively choosing to watch another
          video, the algorithm makes that choice and presents it as a countdown. The 5-second window
          is psychologically short enough that interrupting it feels like effort. YouTube's own
          internal research showed autoplay significantly increases session length.
        </p>
        <p className="text-sm text-slate-400">
          <strong className="text-muted-foreground">Engineering note:</strong>{" "}The autoplay candidate
          is NOT the #1 ranked recommendation — it's selected for "session continuation" probability,
          which is a separate model output.
        </p>
      </Card>
      <Card title="Netflix 'Continue Watching' Placement">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          The "Continue Watching" row is not an algorithm output — it's a{" "}
          <strong>deliberate UI placement</strong> designed to reduce activation cost. Resuming is
          frictionless. Netflix's data showed that positioning this row prominently reduces the time
          from app open to play button by several seconds, which significantly reduces churn.
        </p>
        <p className="text-sm text-slate-400">
          <strong className="text-muted-foreground">Engineering note:</strong>{" "}Netflix tested
          removing "Continue Watching" in A/B experiments — retention dropped measurably.
        </p>
      </Card>
      <Card title="The 'Percentage Match' Score">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Netflix's "98% Match" badge is not a global quality score — it is a{" "}
          <strong>personalised predicted satisfaction score</strong> for you specifically.
          Two users watching the same row will see different percentage matches on the same title.
          The number is designed to reduce decision paralysis by giving users a signal of fit.
        </p>
        <p className="text-sm text-slate-400">
          It's the output of their ranking model's satisfaction probability, formatted as a
          percentage for UX clarity.
        </p>
      </Card>
      <Card title="YouTube's 'Rabbit Hole' Effect">
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          The "Up Next" panel reinforces topical gravity. Once you watch one video in a niche, the
          algorithm detects a strong session-level interest signal and loads the next several
          recommendations from that same topic cluster. This is not a bug — it maximises local
          session watch time. It can unintentionally create filter bubbles in news and political
          content.
        </p>
        <p className="text-sm text-slate-400">
          YouTube later introduced explicit diversity constraints to break out of these loops after
          internal and external criticism.
        </p>
      </Card>
    </Grid>,

    /* ─── THE COLD START PROBLEM ─── */
    <h3 key="h-cold" className="text-xl font-bold mt-12 mb-4">
      The Cold Start Problem — New User, New Video
    </h3>,
    <p key="p-cold" className="text-slate-300 mb-6">
      Collaborative filtering fails when there's no history to filter on. Both platforms have
      different strategies for two cold start scenarios.
    </p>,
    <Grid key="grid-cold" cols={2} gap={6} className="mb-8">
      <Card title="New User Cold Start">
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-2">
          <li>
            <strong className="text-muted-foreground">Explicit onboarding:</strong>{" "}Netflix asks you
            to rate 3+ titles on first login. YouTube uses your Google account signals.
          </li>
          <li>
            <strong className="text-muted-foreground">Geography defaults:</strong>{" "}Surface what's
            trending in your region as a starting point.
          </li>
          <li>
            <strong className="text-muted-foreground">Fast first-session learning:</strong>{" "}After
            just 2–3 interactions in the session, the model already starts personalising.
          </li>
          <li>
            <strong className="text-muted-foreground">Popularity fallback:</strong>{" "}Show broadly
            popular content with high average satisfaction across similar demographics.
          </li>
        </ul>
      </Card>
      <Card title="New Content Cold Start">
        <ul className="text-sm text-slate-400 list-disc pl-4 space-y-2">
          <li>
            <strong className="text-muted-foreground">Content-based features:</strong>{" "}Analyse the
            video's metadata, title, description, transcript, and visual frames to classify it before
            any user engagement exists.
          </li>
          <li>
            <strong className="text-muted-foreground">Exploration budget:</strong>{" "}New content gets
            a small "exploration" impression quota — shown to a random sample to gather initial
            engagement signals quickly.
          </li>
          <li>
            <strong className="text-muted-foreground">Creator reputation:</strong>{" "}A video from a
            channel with strong historic performance gets a larger initial distribution.
          </li>
        </ul>
      </Card>
    </Grid>,

    /* ─── WHAT THEY'VE PUBLICLY SAID ─── */
    <h3 key="h-papers" className="text-xl font-bold mt-12 mb-4">
      What YouTube and Netflix Have Actually Published
    </h3>,
    <Table
      key="table-papers"
      headers={["Source", "Year", "Key Revelation"]}
      rows={[
        [
          "YouTube — Deep Neural Networks for YouTube Recommendations",
          "2016",
          "Confirmed shift from CTR to watch time. Revealed two-tower DNN architecture. Introduced 'example age' feature to fight recency bias.",
        ],
        [
          "Netflix — Artwork Personalisation",
          "2017",
          "Confirmed per-user thumbnail personalisation based on actor affinity and genre taste vectors.",
        ],
        [
          "Netflix — Contextual Bandits for Personalisation",
          "2017",
          "Described using contextual bandit algorithms to balance exploration (show new content) vs. exploitation (show known-good content).",
        ],
        [
          "Netflix — Learning a Personalized Homepage",
          "2015",
          "Revealed the multi-row homepage is itself a ranking problem — rows are ranked per user, not just the items within rows.",
        ],
        [
          "YouTube — Lessons Learned from 1 Billion Users",
          "2019",
          "Admitted early watch-time optimisation unintentionally promoted 'clickbait-adjacent' content. Introduced satisfaction surveys as a second signal.",
        ],
        [
          "Netflix — Recommending for the World",
          "2022",
          "Revealed localisation layers: recommendations for content in minority languages are boosted for users whose profile data suggests cultural affinity.",
        ],
      ]}
    />,

    /* ─── THE INFRASTRUCTURE ─── */
    <h3 key="h-infra" className="text-xl font-bold mt-12 mb-4">
      The Infrastructure — Serving Recommendations at Scale
    </h3>,
    <p key="p-infra" className="text-slate-300 mb-6">
      The ML model is only part of the problem. Serving personalised recommendations to hundreds of
      millions of users simultaneously requires a purpose-built infrastructure stack.
    </p>,
    <Grid key="grid-infra" cols={2} gap={6} className="mb-8">
      <Card title="Vector Databases & ANN Search">
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          The retrieval stage uses Approximate Nearest Neighbour (ANN) search across billions of
          content embeddings. Google uses <strong>ScaNN</strong>. Netflix uses a combination of
          FAISS and custom indexes. The key engineering constraint: the entire retrieval step must
          complete in single-digit milliseconds.
        </p>
      </Card>
      <Card title="Feature Stores">
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          User features (your taste vector, recent watches, session context) must be available
          with &lt;10ms latency at serving time. Both companies use real-time feature stores —
          precomputed feature vectors stored in low-latency key-value stores (similar to Redis)
          that are updated continuously as you interact.
        </p>
      </Card>
      <Card title="A/B Testing Infrastructure">
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Netflix runs thousands of concurrent A/B experiments. Each user is assigned to experiment
          buckets that determine which ranking model, which UI layout, and which thumbnail they see.
          Changes to ranking weights are validated against downstream metrics (retention, completion
          rate) before full rollout.
        </p>
      </Card>
      <Card title="Logging & Training Pipelines">
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Every impression, hover, click, watch-second, and pause is logged and eventually flows
          into model retraining pipelines. YouTube processes petabytes of engagement events daily.
          The feedback loop from user action → logged event → model retrain → better recommendation
          can complete within hours on YouTube's infrastructure.
        </p>
      </Card>
    </Grid>,

    /* ─── QUICK SUMMARY ─── */
    <Callout key="callout-summary" type="tip" title="The Mental Model: What Actually Moves Your Feed">
      <ul className="space-y-2 mt-2 text-sm">
        <li>
          <Highlight variant="primary">Watch Time</Highlight>&nbsp;— The highest-weight signal.
          Finishing a video tells the algorithm more than 10 clicks.
        </li>
        <li>
          <Highlight variant="primary">Completion Rate</Highlight>&nbsp;— Watching 90% &gt; watching 30%.
          Drop-off point is tracked to the second.
        </li>
        <li>
          <Highlight variant="primary">Explicit Feedback</Highlight>&nbsp;— Likes, "Not Interested",
          thumbs are high-quality but low-volume signals.
        </li>
        <li>
          <Highlight variant="primary">Session Context</Highlight>&nbsp;— Your device, time of day,
          and what you've watched this session all shift the mix.
        </li>
        <li>
          <Highlight variant="primary">Hover / Impression</Highlight>&nbsp;— Weak implicit signal.
          Used but not primary. Autoplay preview engagement is stronger.
        </li>
        <li>
          <Highlight variant="primary">Lag is not server lag</Highlight>&nbsp;— The recommendation
          pipeline runs before you open the app. What you see is pre-computed and cached.
          Video buffering lag is a separate CDN/network problem entirely.
        </li>
      </ul>
    </Callout>,
  ],
};
