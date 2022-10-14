import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import route from "./Components/Router/Router";
// import { getAuth } from "firebase/auth";
// const auth = getAuth();

function App() {
  return (
    <>
      <section>
        <RouterProvider router={route}></RouterProvider>
      </section>
    </>
  );
}

export default App;
