import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login"
import Write from "./pages/Write"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthContextProvider } from "./context/authContext";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {path:"/write",
         element:<Write/>
        },
        {path:"/post/:id",
         element:<Single/>
        },
      ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/post",
    element: <Single/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
]);

function App() {
  return (
    <AuthContextProvider>
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>  
  </div>
  </AuthContextProvider>
  );
}

export default App;

