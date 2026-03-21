import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const browserStorageTopic: Topic = {
  id: "browser-storage",
  title: "Browser Storage & Tokens",
  description:
    "Where to store JWTs without getting instantly hacked via XSS or CSRF attacks.",
  tags: ["frontend", "security", "architecture"],
  icon: "Database",
  content: [
    <p key="1">
      You logged a user in safely. The backend responds with a `token: \"eyJhbGci...\"`. If you store this incorrectly, a rogue Chrome extension can steal it and drain the user's account. This is a massive security decision.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Storage Matrix
    </h3>,
    <Table
      key="3"
      headers={["Storage API", "Vulnerable To", "The Verdict"]}
      rows={[
        [
          "localStorage",
          "XSS (Cross-Site Scripting)",
          "Never store JWTs here. Any injected malicious Javascript can simply call `localStorage.getItem('token')` and steal it."
        ],
        [
          "sessionStorage",
          "XSS (Cross-Site Scripting)",
          "Same as localStorage. It simply clears when the tab closes. Do not store sensitive auth tokens here."
        ],
        [
          "Cookies (HttpOnly)",
          "CSRF (Cross-Site Request Forgery)",
          "The ONLY safe place. An HttpOnly cookie cannot be read by Javascript. It prevents XSS theft. However, you must configure SameSite rules to block CSRF."
        ]
      ]}
    />,
    <Callout key="4" type="warning" title="The CSRF Threat">
      If you use HttpOnly cookies, Javascript cannot see the token. The browser sends it automatically with every HTTP request. However, if a user visits `evil-site.com`, that site can trick the browser into sending a request to your API, and the browser will automatically attach the cookie! Always use `SameSite=Strict` or Anti-CSRF tokens to prevent this.
    </Callout>,
  ],
};
