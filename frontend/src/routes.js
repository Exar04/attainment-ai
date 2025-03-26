import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage";
import { Bloom } from "./components/Bloom";
import { Co } from "./components/co";
import { Aboutus } from "./components/Aboutus";
import { CourseExitSurveyForm } from "./components/courseExitSurveyForm";
import { Attainments } from "./components/Attainment";

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
          path: "/Attainment",
          element: <Attainments />,
        },
        {
          path: "/feedbackForm",
          element: <CourseExitSurveyForm />,
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