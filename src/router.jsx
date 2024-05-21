import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import Login from "@/pages/Login";
import Appointments from "@/pages/Appointments";
import PatientAppointments from "@/pages/PatientAppointments";
import Services from "@/pages/Services";
import Slots from "@/pages/Slot";
import MainLayout from "@/layouts/MainLayout";

export var title = "Admin Panel";
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
        path: "/Services",
        element: <Services />,
      },
      {
        path: "/Slots",
        element: <Slots />,
      },
      {
        path: "/Patients",
        element: <Patients />,
      },
      {
        path: "/Appointments",
        element: <Appointments />,
      },
      {
        path: "/PatientAppointments",
        element: <PatientAppointments />,
      },
    ],
  },
  {
    path: "/Auth/Login",
    element: <Login />,
  },
]);
