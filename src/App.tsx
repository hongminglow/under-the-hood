import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { TopicView } from "./pages/TopicView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/networking/tcp-ip" replace />, // Default home
      },
      {
        path: ":sectionId/:topicId",
        element: <TopicView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
