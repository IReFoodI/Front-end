import { createBrowserRouter } from "react-router-dom"

import { FinancePage } from "@/domains/store/dashboard/FinancePage.jsx"
import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { DashBoardLayout } from "@/ui/layouts/DashboardLayout.jsx"

import App from "../App.jsx"

export const ROUTES = {
  ADDRESS: "/address",
  FINANCAS: "financas",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <DashBoardLayout />,
        children: [{ path: ROUTES.FINANCAS, element: <FinancePage /> }],
      },

      { path: ROUTES.ADDRESS, element: <AddressPage /> },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
])
