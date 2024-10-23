import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage";
import { Bloom } from "./components/Bloom";
import { Co } from "./components/co";
import { Aboutus } from "./components/Aboutus";

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
          element: <Aboutus />,
        },
        {
          path: "/",
          element: <Aboutus />,
        },
      ],
    },
  ]);