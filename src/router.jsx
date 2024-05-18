import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import Login from "@/pages/Login";
import MainLayout from "@/layouts/MainLayout";
export const router = new createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Patients",
        element: <Patients />,
      },
      {
        path: "/Appointments",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/Auth/Login",
    element: <Login />,
  },
]);
