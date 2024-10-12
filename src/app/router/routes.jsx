import { createBrowserRouter } from "react-router-dom"

import { AlertSoundSettingsPage } from "@/domains/store/dashboard/AlertSoundSettingsPage.jsx"
import { FinancePage } from "@/domains/store/dashboard/FinancePage.jsx"
import { StoreProfilePage } from "@/domains/store/dashboard/StoreProfilePage.jsx"
import { AddressPage } from "@/domains/user/components/AddressPage.jsx"
import { PresentationContent } from "@/domains/user/components/authentication/PresentationContent.jsx"
import { SignIn } from "@/domains/user/components/authentication/SignIn.jsx"
import { SignUp } from "@/domains/user/components/authentication/SignUp.jsx"
import { AddEditCard } from "@/domains/user/components/credit-card/AddEditCard.jsx"
import { CardPage } from "@/domains/user/components/credit-card/CardPage.jsx"
import { Favorites } from "@/domains/user/components/favorites/Favorites.jsx"
import { OngoingOrder } from "@/domains/user/components/ongoingOrder/OngoingOrder.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { Home } from "@/domains/user/components/storesHome/Home.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { AuthenticationLayout } from "@/ui/layouts/AuthenticationLayout.jsx"
import { DashBoardLayout } from "@/ui/layouts/DashboardLayout.jsx"
import { ProtectedLayout } from "@/ui/layouts/ProtectedLayout.jsx"

import App from "../App.jsx"

export const ROUTES = {
  ADDRESS: "address",
  HOME: "home",
  FAVORITES: "favoritos",
  FINANCE: "financas",
  ALERTSETTINGS: "ajustes/alertas-sonoros",
  DASHBOARD: "dashboard",
  CHANGE_PASSWORD: "alterar-senha",
  LOGIN: "entrar",
  CREATE_ACCOUNT: "criar-conta",
  USER_CREDIT_CARD: "cartoes",
  USER_ADD_CREDIT_CARD: "cartoes/adicionar",
  ONGOING_ORDER: "pedidos/em-andamento",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedLayout />,
        children: [
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
          { path: ROUTES.ADDRESS, element: <AddressPage /> },
          { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
          {
            path: ROUTES.ONGOING_ORDER,
            element: <OngoingOrder />,
          },
        ],
      },

      {
        path: "autenticar",
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
        path: "dashboard",
        children: [
          {
            path: "autenticar",
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
            element: <DashBoardLayout />,
            children: [
              { index: true, element: <StoreProfilePage /> },
              { path: ROUTES.FINANCE, element: <FinancePage /> },
              {
                path: ROUTES.ALERTSETTINGS,
                element: <AlertSoundSettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
])
