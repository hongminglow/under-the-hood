import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const browserStorageTopic: Topic = {
  id: "browser-storage",
  title: "Browser Storage Mechanisms",
  description:
    "An exhaustive breakdown of where frontend applications store state locally: Cookies, LocalStorage, and IndexedDB.",
  tags: ["frontend", "browser", "javascript"],
  icon: "HardDrive",
  content: [
    <p key="1">
      Modern web applications need to store user preferences, session tokens,
      and offline data on the client device. The browser provides several wildly
      different APIs for this, each with strict limitations and security
      implications.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      The Three Main Storage APIs
    </h4>,
    <Grid key="3" cols={3} gap={6} className="mb-8">
      <Card title="Cookies">
        <p className="text-sm">
          A microscopic file (4KB limit) historically used for keeping users
          logged in. They are automatically sent by the browser on{" "}
          <em>every single HTTP request</em>.
        </p>
      </Card>
      <Card title="LocalStorage / SessionStorage">
        <p className="text-sm">
          A synchronous key-value store (usually 5MB limit). LocalStorage
          persists until manually cleared. SessionStorage dies the moment the
          browser tab is closed.
        </p>
      </Card>
      <Card title="IndexedDB">
        <p className="text-sm">
          A massive, asynchronous, transactional NoSQL database built into the
          browser itself. Can store hundreds of megabytes including blobs and
          files.
        </p>
      </Card>
    </Grid>,
    <h4 key="4" className="text-xl font-bold mt-8 mb-4">
      Security Implications
    </h4>,
    <p key="5" className="mb-4">
      A massive debate exists regarding where to store JWT Access Tokens.
    </p>,
    <Table
      key="6"
      headers={["Storage", "Vulnerability", "Reason"]}
      rows={[
        [
          "LocalStorage",
          "XSS (Cross-Site Scripting)",
          "Any malicious JS running on the page can easily read `localStorage.getItem('token')` and steal it.",
        ],
        [
          "Cookies (HttpOnly)",
          "CSRF (Cross-Site Request Forgery)",
          "JS cannot read an HttpOnly cookie. But attackers can trick the browser into sending it if CSRF tokens aren't used.",
        ],
      ]}
    />,
    <Callout key="7" type="info" title="The Modern Consensus on Tokens">
      Store authentication tokens in{" "}
      <strong>HttpOnly, Secure, SameSite=Strict Cookies</strong>. You are immune
      to XSS token theft. To defend against CSRF, use the `SameSite` attribute
      or implement anti-CSRF synchronizer tokens. Leave LocalStorage strictly
      for non-sensitive UI preferences like dark mode.
    </Callout>,
  ],
};
