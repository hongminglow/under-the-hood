import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";

export const corsTopic: Topic = {
  id: "cors",
  title: "CORS (Cross-Origin Resource Sharing)",
  description:
    "Why your perfectly fine API fails entirely in the browser, but works perfectly fine in Postman.",
  tags: ["security", "frontend", "headers", "api-design"],
  icon: "Ban",
  content: [
    <p key="1">
      The most deeply hated error message in all of frontend development: <code>Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present</code>. 
    </p>,
    <p key="2" className="mt-4">
      As developers, we constantly assume CORS is our backend "blocking" the request, but <strong>CORS is entirely enforced by the Browser!</strong> It is a critical security protection to prevent a malicious website (`hackers.com`) from making silent background API requests to `your-bank.com` using your currently logged-in cookies.
    </p>,
    <h3 key="3" className="text-xl font-bold mt-8 mb-4">
      The Preflight `OPTIONS` Request
    </h3>,
    <p key="4" className="mb-4">
      If a React app at <code>localhost:3000</code> attempts to POST JSON data to <code>api.my-startup.com</code>, they are on two completely different domains (Origins).
    </p>,
    <Grid key="5" cols={2} gap={6} className="my-8">
      <Card title="The Browser's Paranoia">
        <p className="text-sm text-muted-foreground">
          Before sending your actual POST request, the browser halts completely. It sends a tiny, invisible <code>OPTIONS</code> request to your backend asking, "Hey Backend, my user is on `localhost`, are they mathematically allowed to send you this POST?"
        </p>
      </Card>
      <Card title="The Backend's Permission">
        <p className="text-sm text-muted-foreground">
          If your API server replies with the header <code>Access-Control-Allow-Origin: localhost:3000</code>, the browser sighs in relief and instantly fires the actual POST request. If the backend doesn't reply with that exact header, the browser instantly throws an error and destroys your request.
        </p>
      </Card>
    </Grid>,
    <Callout key="6" type="warning" title="Why Postman Doesn't Care">
      Postman is not a web browser. It is a desktop application. It couldn't care less about Cross-Origin policies, so it directly hits your API and retrieves the JSON flawlessly. The CORS error purely lives inside Chrome, Safari, and Firefox. 
    </Callout>,
    <Callout key="7" type="info" title="The Simple Backend Fix">
      Backend developers must install a CORS middleware (like the `cors` package in Express) and explicitly whitelist the exact frontend domains they wish to allow. Setting it to `*` is an epic vulnerability for authenticated systems, as it lets ANY domain hit your API.
    </Callout>,
  ],
};
