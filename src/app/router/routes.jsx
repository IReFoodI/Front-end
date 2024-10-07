import { createBrowserRouter } from "react-router-dom"

import { StoreProfilePage } from "@/domains/store/dashboard/StoreProfilePage.jsx"
import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"

import App from "../App.jsx"

export const ROUTES = {
  ADDRESS: "/address",
  CHANGE_PASSWORD: "/alterar-senha",
  DASHBOARD: "dashboard",
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTES.ADDRESS, element: <AddressPage /> },
      { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
      { path: ROUTES.DASHBOARD, element: <StoreProfilePage /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
])
