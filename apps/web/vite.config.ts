import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import relay from "vite-plugin-relay"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), relay],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
