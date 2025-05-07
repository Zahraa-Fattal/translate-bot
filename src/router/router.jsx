import { createBrowserRouter } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import Chat from "../pages/chat";
import Welcome from "../pages/welcome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
export default router;
