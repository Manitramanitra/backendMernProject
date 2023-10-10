import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../../pages/Home"));
const Profil = lazy(() => import("../../pages/Profil"));
const Trending = lazy(() => import("../../pages/Trending"));

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profil", element: <Profil/> },
  { path: "/trending", element: <Trending/> },
  { path: "*", element: <Home/> },
]);

export default router;
