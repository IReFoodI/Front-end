import "./ui/styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./app/App"
import { CreateAccount } from "./domains/user/components/login/CreateAccount"
import { InConstruction } from "./domains/user/components/login/InConstruction"
import { Login } from "./domains/user/components/login/Login"
import { PresentationContent } from "./domains/user/components/login/PresentationContent"
import { Layout } from "./ui/layouts/LoginLayout"

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    children: [],
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
