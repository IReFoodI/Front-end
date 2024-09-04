import "./ui/styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Login } from "./domains/user/components/login"
import { PresentationContent } from "./domains/user/components/loginPresentation/PresentationContent"
import { Layout } from "./ui/layouts/LoginLayout"

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [],
  // },
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
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
