import "./ui/styles/index.css"
import "@fontsource/inter"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { router } from "./app/router/routes"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors duration={2000} />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
