import "./ui/styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { router } from "./app/router/routes"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </StrictMode>
)
