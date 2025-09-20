# Инициализация проекта и инструменты — Подзадачи

Ниже — детальный чек‑лист для раздела «Инициализация проекта и инструменты».

## 0) Предварительные требования

- [x] Node.js ≥ 18.17 (проверено: v23.11.0)
- [x] Выбран менеджер пакетов: npm
- [x] Установить VS Code расширения: Vue - Volar, ESLint, Prettier, Stylelint (через `code --install-extension`), см. .vscode/settings.json
- [x] Настроить `.editorconfig` и автосохранение форматирования в IDE (см. `.vscode/settings.json`)

## 1) Бутстрап Nuxt 3 + TypeScript

- [x] Инициализирован проект в текущей папке: `npx nuxi@latest init . --force --packageManager npm --no-install`
- [x] Установлены зависимости: `npm i`
- [x] Включён строгий TS: `tsconfig.json` → `compilerOptions.strict: true`
- [x] Настроены алиасы в `tsconfig.json` (`@` → `./`, `~` → `./`)

Пример `tsconfig.json` (фрагмент):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "types": ["node"]
  }
}
```

## 2) Настройка SCSS и структуры стилей (BEM)

- [x] Установить зависимости: `sass` (dev)
- [x] Создать структуру `assets/styles`:

```
assets/styles/
  abstracts/   // переменные, функции, миксины
  base/        // normalize, base, типографика
  components/  // стили компонентов
  layout/      // сетки, контейнеры, области макета
  utilities/   // хелперы, утилитарные классы
  main.scss    // точка входа
```

- [x] Добавить глобальные стили в `nuxt.config.ts` → `css: ['@/assets/styles/main.scss']`
- [x] Включить автоподключение переменных/миксинов через Vite:

Пример `nuxt.config.ts` (фрагмент):

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/abstracts/variables" as *;\n@use "~/assets/styles/abstracts/mixins" as *;\n`,
        },
      },
    },
  },
})
```

## 3) Подключение Pinia

- [x] Установить: `@pinia/nuxt`
- [x] Добавить модуль в `nuxt.config.ts` → `modules: ['@pinia/nuxt']`
- [x] Создать директорию `stores/` и пример стора `stores/app.ts`

Пример стора:

```ts
// stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    ready: false,
  }),
  actions: {
    setReady(v: boolean) {
      this.ready = v
    },
  },
})
```

## 4) ESLint + Prettier

- [x] Установить ESLint и плагины:
  - `eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-config-prettier eslint-plugin-prettier -D`
- [x] Создать `.eslintrc.cjs` c поддержкой Vue 3 + TS
- [x] Создать `.eslintignore` (например: `.nuxt`, `.output`, `node_modules`)
- [x] Создать `.prettierrc` и `.prettierignore`

Пример `.eslintrc.cjs`:

```js
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['vue', '@typescript-eslint', 'import'],
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
}
```

Пример `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

## 5) Stylelint (SCSS + BEM)

- [x] Установить: `stylelint stylelint-config-standard-scss stylelint-config-prettier-scss stylelint-order -D`
- [x] Создать `.stylelintrc.cjs`
- [x] Добавить правило именования классов под BEM через `selector-class-pattern`
- [x] Создать `.stylelintignore` (например: `.nuxt`, `.output`, `node_modules`)

Пример `.stylelintrc.cjs`:

```js
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': [
      // block, block__element, block--modifier
      '^[a-z]([a-z0-9-]*)(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      { resolveNestedSelectors: true },
    ],
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-rules',
      'declarations',
      { type: 'at-rule', name: 'supports' },
      { type: 'at-rule', name: 'media' },
      'rules',
    ],
    'order/properties-alphabetical-order': true,
  },
}
```

## 6) Husky + lint-staged

- [x] Установить: `husky lint-staged -D`
- [ ] Инициализировать Husky: `npx husky init` (или `pnpm dlx husky init`)
- [x] Добавить в `package.json` раздел `lint-staged`
- [x] В хук `pre-commit` добавить `npx lint-staged`

Пример `package.json` (фрагмент):

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix"],
    "*.{css,scss}": ["stylelint --fix"],
    "*": ["prettier --write"]
  }
}
```

## 7) Скрипты `package.json`

- [x] Добавить: `dev`, `build`, `preview`, `lint`, `lint:style`, `format`, `type-check`

Пример (фрагмент):

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "lint": "eslint . --ext .ts,.vue",
    "lint:style": "stylelint \"**/*.{css,scss}\"",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

## 8) Рекомендации по DX

- [x] Добавить `.editorconfig`
- [x] Добавить `.vscode/settings.json` (включить форматирование Prettier, использовать Volar)
- [x] Обновить `README.md`: требования, запуск, скрипты, структура проекта

## 9) Верификация

- [x] Запустить `dev` и проверить импорт глобальных стилей
- [x] Запустить `lint`, `lint:style`, `format`, `type-check` — убедиться, что проходят
- [ ] Первый коммит: baseline проекта
