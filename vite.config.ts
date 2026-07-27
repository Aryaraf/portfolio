import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi standar Vite + React
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  }
})