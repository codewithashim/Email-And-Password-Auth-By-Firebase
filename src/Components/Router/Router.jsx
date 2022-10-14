import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Signin from "../Signin/Signin";
import Home from "../Home/Home";
import SignupFrom from "../SignupFrom/SignupFrom";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignupFrom></SignupFrom>,
      }
      ,
      {
        path: "/login",
        element: <Signin></Signin>,
      },
    ],
  },
]);

export default route;
