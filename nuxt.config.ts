// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))
const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Runtime config drives per-environment behaviour
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || 'http://localhost:3000/api',
    mediaStorageBucket: process.env.NUXT_MEDIA_STORAGE_BUCKET || '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      cdnBase: process.env.NUXT_PUBLIC_CDN_BASE || '',
      analyticsKey: process.env.NUXT_PUBLIC_ANALYTICS_KEY || '',
    },
  },
  // Nuxt modules
  modules: ['@pinia/nuxt'],
  // Ensure auto imports pick new composables without restart
  imports: {
    dirs: [resolvePath('./composables')],
  },
  // Auto-register components from controlled directories
  components: [
    {
      path: resolvePath('./components'),
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],
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
          // Make SCSS tokens and mixins available in every SCSS file
          additionalData: [
            '@use "@/assets/styles/abstracts/variables" as *;',
            '@use "@/assets/styles/abstracts/mixins" as *;',
          ].join('\n'),
        },
      },
    },
  },
})
