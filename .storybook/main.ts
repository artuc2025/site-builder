import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)', '../docs/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async config => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': rootDir,
      '~': rootDir,
      '@components': join(rootDir, 'components'),
      '@composables': join(rootDir, 'composables'),
      '@stores': join(rootDir, 'stores'),
      '@modules': join(rootDir, 'modules'),
      '@plugins': join(rootDir, 'plugins'),
    }

    config.css = config.css || {}
    config.css.preprocessorOptions = config.css.preprocessorOptions || {}
    config.css.preprocessorOptions.scss = {
      ...(config.css.preprocessorOptions.scss || {}),
      additionalData: '@use "@/assets/styles/abstracts" as *;',
    }

    const plugins = Array.isArray(config.plugins) ? config.plugins : []
    const hasVuePlugin = plugins.some(plugin => {
      const name = (plugin as PluginOption & { name?: string })?.name
      return name === 'vite:vue'
    })

    config.plugins = hasVuePlugin ? plugins : [...plugins, vue()]

    return config
  },
}

export default config
