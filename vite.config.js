import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname )
const outDir = resolve(__dirname, 'dist' )

// https://vitejs.dev/config/
export default defineConfig({
  base : '/chrome_extension_word/',
  plugins: [react()],
})
