import { createBrowserRouter } from "react-router-dom"

import { AlertSoundSettingsPage } from "@/domains/store/dashboard/AlertSoundSettingsPage.jsx"
import { FinancePage } from "@/domains/store/dashboard/FinancePage.jsx"
import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { CreateAccount } from "@/domains/user/components/login/CreateAccount.jsx"
import { Login } from "@/domains/user/components/login/Login.jsx"
import { PresentationContent } from "@/domains/user/components/login/PresentationContent.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { DashBoardLayout } from "@/ui/layouts/DashboardLayout.jsx"
import { Layout } from "@/ui/layouts/LoginLayout.jsx"

import App from "../App.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"

export const ROUTES = {
  ADDRESS: "address",
  CHANGE_PASSWORD: "alterar-senha",
  LOGIN: "/entrar",
  CREATE_ACCOUNT: "/criar-conta",
  FINANCAS: "financas",
  AJUSTEALERTAS: "ajustes/alertas-sonoros",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: ROUTES.ADDRESS,
        element: (
          <ProtectedRoute>
            <AddressPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      { path: ROUTES.ADDRESS, element: <AddressPage /> },
      { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
      {
        path: "dashboard",
        element: <DashBoardLayout />,
        children: [
          { path: ROUTES.FINANCAS, element: <FinancePage /> },
          { path: ROUTES.AJUSTEALERTAS, element: <AlertSoundSettingsPage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/auth",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PresentationContent />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.CREATE_ACCOUNT,
        element: <CreateAccount />,
      },
    ],
  },
])
