import { createBrowserRouter } from "react-router-dom"

import { AlertSoundSettingsPage } from "@/domains/store/dashboard/AlertSoundSettingsPage.jsx"
import { ConfigurationPage } from "@/domains/store/dashboard/configuration-page/ConfigurationPage.jsx"
import { FinancePage } from "@/domains/store/dashboard/FinancePage.jsx"
import { StoreMenu } from "@/domains/store/dashboard/menu/StoreMenu.jsx"
import { OrderDetails } from "@/domains/store/dashboard/OrderDetails/OrderDetails.jsx"
import { StoreProfilePage } from "@/domains/store/dashboard/StoreProfilePage.jsx"
import { StoreAddressEdit } from "@/domains/store/dashboard/storesAddress/StoreAdress.jsx"
import { StoreProfileSettings } from "@/domains/store/dashboard/StoreSettings/StoreProfileSettings.jsx"
import { PresentationContent } from "@/domains/user/components/authentication/PresentationContent.jsx"
import { SignIn } from "@/domains/user/components/authentication/SignIn.jsx"
import { SignUp } from "@/domains/user/components/authentication/SignUp.jsx"
import { ChangeData } from "@/domains/user/components/change-data/ChangeData.jsx"
import { AddEditCard } from "@/domains/user/components/credit-card/AddEditCard.jsx"
import { CardPage } from "@/domains/user/components/credit-card/CardPage.jsx"
import { Favorites } from "@/domains/user/components/favorites/Favorites.jsx"
import { OngoingOrder } from "@/domains/user/components/ongoingOrder/OngoingOrder.jsx"
import { ChangePassword } from "@/domains/user/components/password/ChangePassword.jsx"
import { RecoverPasswordPage } from "@/domains/user/components/password/RecoverPasswordPage.jsx"
import { ResetPasswordPage } from "@/domains/user/components/password/ResetPasswordPage.jsx"
import { AddressPage } from "@/domains/user/components/profile/address/AddressPage.jsx"
import { ProfileAddressForm } from "@/domains/user/components/profile/address/ProfileAddressForm.jsx"
import { Home } from "@/domains/user/components/storesHome/Home.jsx"
import { PageNotFound } from "@/ui/components/PageNotFound.jsx"
import { AuthenticationLayout } from "@/ui/layouts/AuthenticationLayout.jsx"
import { AuthenticationLayoutBusiness } from "@/ui/layouts/AuthenticationLayoutBusiness.jsx"
import { DashBoardLayout } from "@/ui/layouts/DashboardLayout.jsx"
import { ProfileManagementLayout } from "@/ui/layouts/ProfileManagementLayout.jsx"
import { ProtectedLayout } from "@/ui/layouts/ProtectedLayout.jsx"
import { UserLayout } from "@/ui/layouts/UserLayout.jsx"

import App from "../App.jsx"
// import { ProtectedRoute } from "./ProtectedRoute.jsx"
import { PublicRoute } from "./PublicRoute.jsx"

export const ROUTES = {
  ADDRESS: "endereco",
  ADDRESS_EDIT: "endereco/adicionar",
  ADDRESS_EDIT_ID: "endereco/editar/:addressId",
  HOME: "home",
  FAVORITES: "favoritos",
  FINANCE: "financas",
  ALERTSETTINGS: "ajustes/alertas-sonoros",
  DASHBOARD: "dashboard",
  CHANGE_PASSWORD: "alterar-senha",
  LOGIN: "entrar",
  CREATE_ACCOUNT: "criar-conta",
  CREATE_ACCOUNT_BUSINESS: "criar-conta",
  USER_CREDIT_CARD: "cartoes",
  USER_ADD_CREDIT_CARD: "cartoes/adicionar",
  STORE_ADDRESS: "ajustes/endereco",
  MENU: "cardapio",
  ONGOING_ORDER: "pedidos/em-andamento",
  RECOVER_PASSWORD: "recuperar-senha",
  RESET_PASSWORD: "redefinir-senha/:token",
  CHANGE_DATA: "alterar-dados",
  DASHBOARD_CONFIG: "ajustes/configuracoes",
  PROFILE_SETTINGS: "ajustes/perfil",
  ORDER_DETAILS: "pedidos",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          // <ProtectedRoute redirect="/autenticar/entrar">
          <UserLayout />
          // </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Home /> },

          {
            element: <ProtectedLayout />,
            children: [
              { path: ROUTES.USER_CREDIT_CARD, element: <CardPage /> },
              { path: ROUTES.USER_ADD_CREDIT_CARD, element: <AddEditCard /> },
              { path: ROUTES.ONGOING_ORDER, element: <OngoingOrder /> },
              {
                element: <ProfileManagementLayout />,
                children: [
                  { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
                  { path: ROUTES.ADDRESS, element: <AddressPage /> },
                  {
                    path: ROUTES.ADDRESS_EDIT,
                    element: <ProfileAddressForm />,
                  },
                  {
                    path: ROUTES.ADDRESS_EDIT_ID,
                    element: <ProfileAddressForm />,
                  },
                  { path: ROUTES.FAVORITES, element: <Favorites /> },
                  { path: ROUTES.CHANGE_DATA, element: <ChangeData /> },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "dashboard",
        children: [
          {
            element: <DashBoardLayout />,
            children: [
              { index: true, element: <StoreProfilePage /> },
              { path: ROUTES.FINANCE, element: <FinancePage /> },
              {
                path: ROUTES.ALERTSETTINGS,
                element: <AlertSoundSettingsPage />,
              },
              { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
              { path: ROUTES.MENU, element: <StoreMenu /> },
              { path: ROUTES.STORE_ADDRESS, element: <StoreAddressEdit /> },
              {
                path: ROUTES.PROFILE_SETTINGS,
                element: <StoreProfileSettings />,
              },
              { path: ROUTES.ORDER_DETAILS, element: <OrderDetails /> },
              { path: ROUTES.DASHBOARD_CONFIG, element: <ConfigurationPage /> },
            ],
          },
        ],
      },
      {
        path: "autenticar",
        children: [
          {
            path: "",
            element: (
              <PublicRoute>
                <AuthenticationLayout />
              </PublicRoute>
            ),
            children: [
              { index: true, element: <PresentationContent /> },
              {
                path: ROUTES.LOGIN,
                element: (
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                ),
              },
              {
                path: ROUTES.CREATE_ACCOUNT,
                element: (
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                ),
              },
              {
                path: ROUTES.RECOVER_PASSWORD,
                element: <RecoverPasswordPage />,
              },
            ],
          },
          {
            path: "negocios",
            element: (
              <PublicRoute>
                <AuthenticationLayoutBusiness />
              </PublicRoute>
            ),
            children: [
              {
                index: true,
                element: (
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                ),
              },
              {
                path: ROUTES.CREATE_ACCOUNT_BUSINESS,
                element: (
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                ),
              },
              {
                path: ROUTES.RECOVER_PASSWORD,
                element: (
                  <PublicRoute>
                    <RecoverPasswordPage />
                  </PublicRoute>
                ),
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
