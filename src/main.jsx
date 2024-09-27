import "./ui/styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./app/App.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </StrictMode>
)
