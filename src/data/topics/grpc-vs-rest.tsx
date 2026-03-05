import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const grpcVsRestTopic: Topic = {
  id: "grpc-vs-rest",
  title: "gRPC vs REST",
  description:
    "The transition from JSON text over HTTP/1.1 to hyper-efficient Protobuf binaries over HTTP/2 multiplexed streams.",
  tags: ["networking", "api", "architecture", "microservices"],
  icon: "WifiHigh",
  content: [
    <p key="1">
      When two microservices need to talk to each other, using standard REST
      APIs transmitting thick JSON payloads over HTTP/1.1 is incredibly slow.
      Google invented <strong>gRPC (gRPC Remote Procedure Calls)</strong> as a
      brutally fast communication protocol specifically for internal
      microservice ecosystems.
    </p>,
    <h4 key="2" className="text-xl font-bold mt-8 mb-4">
      JSON Text vs Protocol Buffers
    </h4>,
    <Grid key="3" cols={2} gap={6} className="mb-4">
      <Card title="REST (JSON)">
        <p className="text-sm">
          JSON is human-readable, huge in byte size, and requires heavy CPU
          cycles to parse string characters at runtime into actual objects.
        </p>
      </Card>
      <Card title="gRPC (Protobuf)">
        <p className="text-sm">
          Uses Protocol Buffers. Data is serialized into dense, unreadable
          binary bytes. It executes 5x to 10x faster and results in vastly
          smaller network payloads.
        </p>
      </Card>
    </Grid>,
    <p key="4" className="mb-4">
      Unlike REST, where you describe endpoints using somewhat arbitrary OpenAPI
      specs, gRPC strictly requires a <strong>`.proto` contract file</strong>.
      Both the client and backend automatically generate highly-typed stub
      classes directly from this file in any language.
    </p>,
    <CodeBlock
      key="5"
      language="protobuf"
      title="user_service.proto"
      code={`syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
  int32 id = 1;
}

message UserResponse {
  string first_name = 1;
  string last_name = 2;
}`}
    />,
    <h4 key="6" className="text-xl font-bold mt-8 mb-4">
      HTTP/2 By Default
    </h4>,
    <p key="7" className="mb-4">
      gRPC mandate the use of HTTP/2. This natively allows gRPC to take
      advantage of <strong>Multiplexing</strong> and{" "}
      <strong>Bi-Directional Streaming</strong>. A single TCP connection can
      stream thousands of concurrent calls, or have data pouring continually
      from Client to Server and Server to Client simultaneously.
    </p>,
    <Callout key="8" type="warning" title="gRPC in the Browser?">
      Browsers do not have low-level access to raw HTTP/2 frames, so standard
      gRPC from a browser tab to a server is impossible. You usually use
      REST/GraphQL between the browser and a Gateway, and then the Gateway uses
      gRPC to talk to the wildly scaled backend microservices.
    </Callout>,
  ],
};
