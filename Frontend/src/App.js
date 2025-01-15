import React from "react";
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FindPatient from "./pages/search";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

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
      path: "/dashboard",
      element: (
        <>
          <Dashboard />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;