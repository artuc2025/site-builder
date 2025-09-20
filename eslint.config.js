// ESLint flat config for Nuxt 3 + Vue 3 + TypeScript
// Keep comments in English.
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '*.cjs',
      'eslint.config.js',
      '.husky/**',
    ],
  },
  // Base JS rules
  js.configs.recommended,
  // TypeScript recommended (no type-aware to avoid tsconfig requirement here)
  ...tseslint.configs.recommended,
  // Vue 3 recommended flat config
  ...vue.configs['flat/recommended'],
  // Project-specific tweaks and plugins
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  // Enable Prettier as a lint rule and compatible settings
  prettierRecommended,
]
