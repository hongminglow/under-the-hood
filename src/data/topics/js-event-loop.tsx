import type { Topic } from "@/data/types";
import { Table } from "@/components/ui/Table";
import { Callout } from "@/components/ui/Callout";

export const jsEventLoopTopic: Topic = {
  id: "js-event-loop",
  title: "JS Event Loop",
  description:
    "How Javascript physically manages to handle 10,000 concurrent network requests using only a single-threaded processor core.",
  tags: ["core", "javascript", "backend"],
  icon: "Cpu",
  content: [
    <p key="1">
      Javascript mathematically executes strictly on one single thread. If it pauses to wait 500ms for a database SQL query to finish, the entire application drops dead for half a second. A global `while(true)` loop locks the entire architecture. Node runs thousands of massive enterprise apps successfully because of one secret weapon: The Event Loop.
    </p>,
    <h3 key="2" className="text-xl font-bold mt-8 mb-4">
      The Asynchronous Dance
    </h3>,
    <Table
      key="3"
      headers={["Component", "Its Job", "The Metaphor"]}
      rows={[
        [
          "The Call Stack",
          "Executes Javascript functions line by line. It must ideally be completely empty at all times.",
          "The Chef. He can only chop one tomato at a time. Never ask him to wait for water to boil."
        ],
        [
          "Web APIs / C++ Libuv",
          "The secret background workers. They handle the hard API fetching, file reading, and timers offline.",
          "The Sous-Chefs. The Chef delegates boiling the water to them, and immediately goes back to chopping."
        ],
        [
          "The Task Queue",
          "When the Sous-Chef finishes boiling water, they drop a callback message into this queue.",
          "The ticket window holding finished meal orders waiting to be served."
        ],
        [
          "The Event Loop",
          "An infinite C++ scanner. If the Call Stack is totally empty, it grabs the oldest message from the Task Queue and hands it to the Call Stack.",
          "The constantly spinning conveyor belt seamlessly feeding new tasks to the Chef."
        ]
      ]}
    />,
    <Callout key="4" type="danger" title="The Golden Rule">
      Never Block The Main Thread. If you run a massive mathematically intense <code>{"for(let i = 0; i < 1 billion; i++)"}</code> loop calculating prime numbers, the Call Stack sits occupied. The Event Loop physically cannot push finished network responses up to the Chef. The server times out and crashes. Always offload heavy CPU math to Worker Threads.
    </Callout>,
  ],
};
