// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Weather-App/", // 👈 this must match your GitHub repo name exactly
  plugins: [react()],
})
