import { createBrowserRouter } from "react-router-dom"

import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { InConstruction } from "@/domains/user/components/InConstruction.jsx"

import App from "../App.jsx"

export const ROUTES = {
  ADDRESS: "/address",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: ROUTES.ADDRESS, element: <AddressPage /> }],
  },
  {
    path: "*",
    element: <InConstruction />,
  },
])
