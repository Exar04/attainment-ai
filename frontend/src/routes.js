import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage";
import { Bloom } from "./components/Bloom";
import { Co } from "./components/co";

export const router = createBrowserRouter([
    // {
    //   path: "/login",
    //   element: <LoginPage />,
    // },
    // {
    //   path: "/signup",
    //   element: <SignupPage />,
    // },
    {
      path: "/",
      element: <MainPage />,
      // errorElement: <NotFound />,
      children: [
        {
          path: "/co",
          element: <Co />,
        },
        {
          path: "/bloom",
          element: <Bloom />,
        },
        {
          path: "/aboutus",
          element: "hehe",
        },
        {
          path: "/",
          element: "hehe",
        },
      ],
    },
  ]);