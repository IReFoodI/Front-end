import { createBrowserRouter } from "react-router-dom"

import { Favoritos } from "@/domains/user/components/Favoritos/Favoritos"
import { Home } from "@/domains/user/components/Home/Home"
import { ProfileAddress } from "@/domains/user/components/Profile/ProfileAddress"
import { AddressForm } from "@/domains/user/components/Profile/ProfileAddressEdit"
import { CreateAccount } from "@/domains/user/components/CreateAccount"
import { InConstruction } from "@/domains/user/components/InConstruction"
import { Login } from "@/domains/user/components/Login"
import { PresentationContent } from "@/domains/user/components/PresentationContent"
import { Layout } from "@/ui/layouts/LoginLayout"
import { StoreProfilePage } from "@/domains/user/components/store/StoreProfilePage"
import { StoreInformationSectionPage } from "@/domains/user/components/store/storeInformationSectionPage.jsx"
import { MyOrdersPage } from "@/domains/user/components/MyOrders/MyOrdersPage.jsx"

import App from "../App.jsx"

export const ROUTES = {
  HOME: "/home",
  FAVORITOS: "/favoritos",
  LOJA: "/loja",
  LOJA_INFORMATION: "/loja/information",
  MY_ORDERS: "/my-orders",
  ENDERECOS: "/enderecos",
  ENDERECOS_EDIT: "/enderecos/edit",
  ENDERECOS_EDIT_ID: "/enderecos/edit/:addressId",
  LOGIN: "/login",
  CREATE_ACCOUNT: "/create-account",

  getEnderecosEditById: (id) => `/enderecos/edit/${id}`,

}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.FAVORITOS, element: <Favoritos /> },
      { path: ROUTES.LOJA, element: <StoreProfilePage /> },
      { path: ROUTES.LOJA_INFORMATION, element: <StoreInformationSectionPage /> },
      { path: ROUTES.MY_ORDERS, element: <MyOrdersPage /> },
      { path: ROUTES.ENDERECOS, element: <ProfileAddress /> },
      { path: ROUTES.ENDERECOS_EDIT, element: <AddressForm /> },
      { path: ROUTES.ENDERECOS_EDIT_ID, element: <AddressForm /> },
    ],
  },
  {
    path: "*",
    element: <InConstruction />,
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
