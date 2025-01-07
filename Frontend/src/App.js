import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";

function App() {
  const router = createBrowserRouter([
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