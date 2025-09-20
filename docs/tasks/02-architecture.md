# Архитектура и инфраструктура — Подзадачи

## 0) Подготовка среды

- [x] Создать ADR-шаблон (`docs/adr/_template.md`) и каталог для решений
- [x] Определить формат документации по архитектуре (папки `docs/adr`, `docs/decisions`)

## 1) Структура проекта

- [x] Уточнить структуру директорий (`app`, `pages`, `components`, `layouts`, `modules`, `plugins`, `composables`, `server`)
- [x] Создать README в `app/` с краткой схемой структуры (по необходимости)
- [x] Внедрить алиасы для ключевых директорий (`@/components`, `@/composables`, `@/stores`, `@/modules`)
- [x] Проверить, что типы `autoImports`/`components` корректно генерируются Nuxt

## 2) Лэйауты и маршрутизация

- [x] Создать базовый лайаут `app/layouts/default.vue` с BEM-классами оболочки
- [x] Добавить пустую страницу `/builder` (`app/pages/builder/index.vue`) с заглушкой
- [x] Задокументировать стратегию маршрутов (builder, templates, settings) в `docs/adr`

## 3) Auto Imports и плагины

- [x] Настроить `nuxt.config.ts` → `imports.dirs` (например, `composables`, `utils`)
- [x] Настроить автоматическую регистрацию компонентов (если нужно ограничить пути)
- [x] Создать временный composable (`app/composables/useTheme.ts`) и проверить auto-import (тест удалён)

## 4) Runtime Config / Env

- [x] Определить переменные окружения и описать в `docs/adr`
- [x] Добавить секцию `runtimeConfig` в `nuxt.config.ts` (например, `public.apiBase`)
- [x] Создать `.env.example` с описанием ключей

## 5) Системные скрипты

- [x] Добавить npm-скрипт `dev:clean` (очистка `.nuxt`, `.output`)
- [x] Зафиксировать в README раздел «Архитектура & ADR»

## 6) Проверка

- [x] Запустить `npm run lint` и `npm run type-check` после изменений
- [x] Обновить `docs/plan.md` ссылкой на текущий файл и кратким статусом
- [x] Сделать коммит `feat: architecture groundwork`

## 7) Маршрутизация по ADR-0001

- [x] Подготовить структуры `app/pages/templates/` и `app/pages/settings/` с заглушками страниц.
- [x] Реализовать специализированные лайауты `app/layouts/builder.vue` и `app/layouts/settings.vue` согласно ADR.
- [x] Настроить перенаправление на актуальный проект в `app/pages/builder/index.vue` с использованием состояния `projectId`.
- [x] Обновить документацию (ADR, план) отражением внедрённых маршрутов и навигации (ADR-0001 и `docs/plan.md` дополнены новыми маршрутами).



