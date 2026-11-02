import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Retain the Vite 5 browser target during the security upgrade.
  build: { target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'] },
})
