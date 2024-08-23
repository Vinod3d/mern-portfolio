import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server : {
    proxy: {
      '/api': {
        target: 'https://myportfoliosite-02yh.onrender.com',
        secure: true,
        changeOrigin: true,
      },
    },
  },
  
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
