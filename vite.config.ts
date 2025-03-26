import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
  server: {
    host: 'localhost',  // Ensures the server runs locally
    port: 3000,         // Set Vue frontend port to 3000
    strictPort: true    // Ensures Vite fails if port 3000 is in use
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({ autoImport: true }),
    quasar({
      sassVariables: path.resolve(__dirname, './src/quasar-variables.sass')
    })
  ]
})