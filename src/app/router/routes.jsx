import { createBrowserRouter } from "react-router-dom"

import { AlertSoundSettingsPage } from "@/domains/store/dashboard/AlertSoundSettingsPage.jsx"
import { FinancePage } from "@/domains/store/dashboard/FinancePage.jsx"
import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { PresentationContent } from "@/domains/user/components/authentication/PresentationContent.jsx"
import { SignIn } from "@/domains/user/components/authentication/SignIn.jsx"
import { SignUp } from "@/domains/user/components/authentication/SignUp.jsx"
import { AddEditCard } from "@/domains/user/components/credit-card/AddEditCard.jsx"
import { CardPage } from "@/domains/user/components/credit-card/CardPage.jsx"
import { Favorites } from "@/domains/user/components/favorites/Favorites.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { Home } from "@/domains/user/components/storesHome/Home.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { AuthenticationLayout } from "@/ui/layouts/AuthenticationLayout.jsx"
import { AuthenticationLayoutBusiness } from "@/ui/layouts/AuthenticationLayoutBusiness.jsx"
import { DashBoardLayout } from "@/ui/layouts/DashboardLayout.jsx"

import App from "../App.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"

export const ROUTES = {
  ADDRESS: "address",
  HOME: "home",
  FAVORITES: "favoritos",
  FINANCE: "financas",
  ALERTSETTINGS: "ajustes/alertas-sonoros",
  teste: "teste",
  CHANGE_PASSWORD: "alterar-senha",
  LOGIN: "entrar",
  CREATE_ACCOUNT: "criar-conta",
  CREATE_ACCOUNT_BUSINESS: "criar-conta-empresarial",
  USER_CREDIT_CARD: "cartoes",
  USER_ADD_CREDIT_CARD: "cartoes/adicionar",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        element: <PresentationContent />,
      },
      {
        path: ROUTES.LOGIN,
        element: <SignIn />,
      },
      {
        path: ROUTES.CREATE_ACCOUNT,
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/business",
    element: <AuthenticationLayoutBusiness />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: ROUTES.CREATE_ACCOUNT_BUSINESS,
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/user",
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
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <Favorites />,
      },
      {
        path: ROUTES.USER_CREDIT_CARD,
        element: <CardPage />,
      },
      {
        path: ROUTES.USER_ADD_CREDIT_CARD,
        element: <AddEditCard />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoardLayout />,
    children: [
      { path: ROUTES.FINANCE, element: <FinancePage /> },
      { path: ROUTES.ALERTSETTINGS, element: <AlertSoundSettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
])
