// main.js or index.js
import "./ui/styles/index.css"; // Importa os estilos globais

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app/App.jsx";
import { Favoritos } from "@/domains/user/components/Favoritos";
import { Home } from "@/domains/user/components/Home"; // Adicionei importação para Home

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favoritos", element: <Favoritos /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
