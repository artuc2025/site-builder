// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))
const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Nuxt modules
  modules: ['@pinia/nuxt'],
  // Ensure auto imports pick new composables without restart
  imports: {
    dirs: [resolvePath('./composables')],
  },
  // Global styles entry (prefer '@/...' for Vite/Nuxt 4)
  css: ['@/assets/styles/main.scss'],
  // Vite preprocessor options to auto-inject variables/mixins
  vite: {
    resolve: {
      alias: {
        '@': projectRoot,
        '~': projectRoot,
        '@components': resolvePath('./components'),
        '@composables': resolvePath('./composables'),
        '@stores': resolvePath('./stores'),
        '@modules': resolvePath('./modules'),
        '@plugins': resolvePath('./plugins'),
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
