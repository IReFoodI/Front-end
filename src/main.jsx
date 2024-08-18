import "./ui/styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./app/App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
