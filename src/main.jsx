import "@fontsource/inter"
import "./ui/styles/index.css"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { router } from "./app/router/routes"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      duration={2000}
      closeButton
      toastOptions={{
        classNames: {
          toast: "mt-8 md:mt-14 ", // Flexbox para alinhar o conteúdo e o botão
          closeButton: "ml-[95%]",
        },
      }}
    />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
