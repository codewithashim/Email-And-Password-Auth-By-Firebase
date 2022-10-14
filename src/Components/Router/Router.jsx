import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Singup from "../Signup/Singup";
import Signin from "../Signin/Signin";
import Home from "../Home/Home";

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
        element: <Singup></Singup>,
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
