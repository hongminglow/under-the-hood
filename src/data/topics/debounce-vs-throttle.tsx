import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const debounceThrottleTopic: Topic = {
  id: "debounce-vs-throttle",
  title: "Debounce vs Throttle",
  description:
    "The two most asked frontend performance interview questions: controlling how often expensive functions fire in response to rapid events.",
  tags: ["javascript", "performance", "interview", "frontend"],
  icon: "Timer",
  content: [
    <p key="1">
      When a user types in a search box, the <code>input</code> event fires on{" "}
      <strong>every single keystroke</strong>. Sending an API call per keystroke
      is wasteful. <strong>Debounce</strong> and <strong>Throttle</strong> are
      two strategies to control how often a function executes — but they work
      very differently.
    </p>,
    <Grid key="2" cols={2} gap={6} className="my-8">
      <Card title="Debounce: Wait Until Calm">
        <p className="text-sm mb-4">
          <strong>Delays execution</strong> until the user{" "}
          <strong>stops firing events</strong> for N milliseconds. If a new
          event fires before the delay, the timer resets.
        </p>
        <CodeBlock
          language="typescript"
          title="Debounce Implementation"
          code={`function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);  // Reset timer
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// Only fires 300ms AFTER user stops typing
const search = debounce((query: string) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

input.addEventListener("input", (e) => {
  search(e.target.value);
});`}
        />
      </Card>
      <Card title="Throttle: Max Frequency">
        <p className="text-sm mb-4">
          <strong>Limits execution</strong> to at most{" "}
          <strong>once every N milliseconds</strong>. Events during the cooldown
          are ignored, but the function fires at a steady rate.
        </p>
        <CodeBlock
          language="typescript"
          title="Throttle Implementation"
          code={`function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): T {
  let inThrottle = false;
  return ((...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false }, limit);
    }
  }) as T;
}

// Fires at most once per 100ms during scroll
const onScroll = throttle(() => {
  console.log(window.scrollY);
}, 100);

window.addEventListener("scroll", onScroll);`}
        />
      </Card>
    </Grid>,
    <Callout key="3" type="tip" title="When to Use Which?">
      <strong>Debounce</strong> → search inputs, form validation, auto-save,
      window resize calculations. You want the <strong>final value</strong>{" "}
      after the user stops. <strong>Throttle</strong> → scroll handlers, mouse
      move tracking, real-time game inputs. You want{" "}
      <strong>regular updates during continuous action</strong>.
    </Callout>,
  ],
};
