import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
export const router = new createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/Patients",
    element: <Dashboard />,
  },
  {
    path: "/Appointments",
    element: <Dashboard />,
  },
  {
    path: "/Auth/Login",
    element: <Login />,
  },
]);
