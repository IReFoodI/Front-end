import { createBrowserRouter } from "react-router-dom"

import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { CreateAccount } from "@/domains/user/components/login/CreateAccount.jsx"
import { Login } from "@/domains/user/components/login/Login.jsx"
import { PresentationContent } from "@/domains/user/components/login/PresentationContent.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { Layout } from "@/ui/layouts/LoginLayout.jsx"

import App from "../App.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"

export const ROUTES = {
  ADDRESS: "address",
  CHANGE_PASSWORD: "alterar-senha",
  LOGIN: "/entrar",
  CREATE_ACCOUNT: "/criar-conta",
}

export const router = createBrowserRouter([
  {
    path: "/home",
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
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
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
