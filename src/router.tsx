import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import SeriesDetail from "./routes/SeriesDetail";
import MyPage from "./routes/MyPage";
import FirstPage from "./routes/FirstPage";
import SignUpPage from "./routes/SignUpPage";
import WishlistPage from "./routes/WishlistPage";
import SettingPage from "./routes/SettingPage";
import GithubConfirm from "./routes/GithubConfirm";

const router = createBrowserRouter([
  {
    path: "/user/",
    errorElement: <NotFound />,
    children: [
      {
        path: "log-in",
        element: <LoginPage />,
      },
      {
        path: "sign-in",
        element: <SignUpPage />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "series/:seriesPk/",
        element: <SeriesDetail />,
      },
      {
        path: "me",
        element: <MyPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
    ],
  },
]);

export default router;
