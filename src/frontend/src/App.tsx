import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import Conveyance from "./pages/Conveyance";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Luggage from "./pages/Luggage";
import Messages from "./pages/Messages";
import Networking from "./pages/Networking";
import Profile from "./pages/Profile";
import Safety from "./pages/Safety";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const conveyanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/conveyance",
  component: Conveyance,
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: Discover,
});

const safetyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety",
  component: Safety,
});

const luggageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/luggage",
  component: Luggage,
});

const networkingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/networking",
  component: Networking,
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: Messages,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  profileRoute,
  conveyanceRoute,
  discoverRoute,
  safetyRoute,
  luggageRoute,
  networkingRoute,
  messagesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}
