import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OtpVerification from "../pages/auth/OtpVerification";
import ResetPassword from "../pages/auth/ResetPassword";
import AuthSuccess from "../pages/auth/AuthSuccess";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Dispatch from "../pages/dispatch/DispatchPage";
import AssignLoadsPage from "../pages/assign_loads/AssignLoadsPage";
import POCode from "../pages/po_code/PoCodePage";
import PickupPage from "../pages/pickup/PickupPage";
import MaterialsPage from "../pages/materials/MaterialsPage";
import FscPage from "../pages/fsc/FscPage";
import ContractorsPage from "../pages/contractors/ContractorsPage";
import ContractorDetailsPage from "../pages/contractors/ContractorDetailsPage";
import AddDriverPage from "../pages/contractors/AddDriverPage";
import AddTruckPage from "../pages/contractors/AddTruckPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <OtpVerification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth-success",
    element: <AuthSuccess />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dispatch",
        element: <Dispatch />,
      },
      {
        path: "assign-loads",
        element: <AssignLoadsPage />,
      },
      {
        path: "po-code",
        element: <POCode />,
      },
      {
        path: "pickup-deliver",
        element: <PickupPage />,
      },
      {
        path: "materials",
        element: <MaterialsPage />,
      },
      {
        path: "fsc",
        element: <FscPage />,
      },
      {
        path: "contractors",
        element: <ContractorsPage />,
      },
      {
        path: "contractors/view/:id",
        element: <ContractorDetailsPage />,
      },
      {
        path: "contractors/add-driver",
        element: <AddDriverPage />,
      },
      {
        path: "contractors/add-truck",
        element: <AddTruckPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
