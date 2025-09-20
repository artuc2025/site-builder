// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Nuxt modules
  modules: ['@pinia/nuxt'],
  // Global styles entry (prefer '@/...' for Vite/Nuxt 4)
  css: ['@/assets/styles/main.scss'],
  // Vite preprocessor options to auto-inject variables/mixins
  vite: {
    resolve: {
      alias: {
        '@': projectRoot,
        '~': projectRoot,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            // Make SCSS tokens and mixins available in every SCSS file
            `@use "@/assets/styles/abstracts/variables" as *;\n` +
            `@use "@/assets/styles/abstracts/mixins" as *;\n`,
        },
      },
    },
  },
})
