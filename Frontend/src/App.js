import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SearchPatient from "./pages/search";
import Visualize from "./pages/visualize";
import BoundingBox from "./components/tools/BoundingBox";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/search",
      element: (
        <>
          <SearchPatient />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Dashboard />
        </>
      ),
    },
    {
      path: "/visualize",
      element: (
        <>
          <Visualize />
        </>
      ),
    },
    {
      element: (
        <>
          <Visualize />
        </>
      ),
    },
    {
      path: "/BoundingBox",
      element: (
        <>
          <BoundingBox />
        </>
      ),
    }

  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
