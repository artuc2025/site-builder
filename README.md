# Конструктор сайтов на Nuxt 3 — проект

Проект на Nuxt 3 с Vue 3, TypeScript, SCSS (BEM), Pinia, ESLint, Prettier и Stylelint.

Полная дорожная карта и подзадачи: `docs/plan.md`, `docs/tasks/01-setup.md`.

## Требования

- Node.js ≥ 18.17 (проверено на v23.x)
- Менеджер пакетов: npm

## Установка

```bash
npm install
```

## Скрипты

- `npm run dev` — запуск dev‑сервера (http://localhost:3000)
- `npm run build` — сборка продакшн
- `npm run preview` — предпросмотр сборки
- `npm run lint` — ESLint (Vue + TS + import‑order)
- `npm run lint:style` — Stylelint (SCSS + BEM)
- `npm run format` — Prettier форматирование
- `npm run type-check` — проверка типов TypeScript

## Структура проекта (основное)

- `app/` — файлы приложения Nuxt
- `assets/styles/` — SCSS архитектура
  - `abstracts/_variables.scss` — токены (цвета, типографика, отступы)
  - `abstracts/_mixins.scss` — миксины (container, focus-ring, sr-only)
  - `base/_base.scss` — базовые стили/normalize
  - `main.scss` — глобальная точка входа
- `stores/` — Pinia стойки (например, `app.ts`)
- `public/` — статические файлы
- `docs/` — план и подзадачи

## Примечания по стилям

- Глобальное подключение: `nuxt.config.ts: css: ['@/assets/styles/main.scss']`
- Vite инжектирует токены/миксины в каждый SCSS через `vite.css.preprocessorOptions.scss.additionalData`
- Для надёжности модули SCSS также явно делают `@use` токенов внутри файлов

## Полезные ссылки

- Документация Nuxt: https://nuxt.com/docs
- Деплой Nuxt: https://nuxt.com/docs/getting-started/deployment
