import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const restApiDesignTopic: Topic = {
  id: "rest-api-design",
  title: "REST API Design",
  description:
    "The unwritten, unspoken rules of naming your HTTP endpoints so front-end developers don't hate you.",
  tags: ["backend", "api-design", "http"],
  icon: "Terminal",
  content: [
    <p key="1" className="mb-4">
      You are not forced to follow REST. You could name all your backend functions `POST /fetchUser` or `POST /doAction`. But REST (Representational State Transfer) is a strict architectural philosophy that centers around manipulating strict <strong>Nouns (Resources)</strong> using strictly mapped HTTP verbs.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Standard Conventions
    </h3>,
    <Table
      key="3"
      headers={["HTTP Verb", "Endpoint", "What the developer expects to happen"]}
      rows={[
        [
          "GET",
          "/users",
          "Returns an array of objects. Typically supports pagination `?page=2&limit=50`."
        ],
        [
          "POST",
          "/users",
          "Creates a completely new user. The backend strictly determines the ID and returns the new object."
        ],
        [
          "PUT",
          "/users/5",
          "Replaces User 5 as a complete resource. If the payload omits existing fields, the server may treat those fields as intentionally removed."
        ],
        [
          "PATCH",
          "/users/5",
          "Partially updates User 5. Send `{email: 'test@a.com'}` and only that field changes."
        ],
        [
          "DELETE",
          "/users/5",
          "Destroys User 5 permanently. Most companies now 'Soft Delete' by just setting an `is_deleted` boolean in Postgres instead."
        ]
      ]}
    />,
    <Callout key="4" type="warning" title="Nesting Nightmares">
      `GET /users/5/posts/12/comments/4` is an anti-pattern. If you are deeply hunting for Comment 4, just ask for it directly: `GET /comments/4`. Keep your URLs as flat and strictly noun-focused as possible.
    </Callout>,
  ],
};
