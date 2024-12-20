import react from "@vitejs/plugin-react-swc"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
})
