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

- [ ] Создать базовый лайаут `app/layouts/default.vue` с BEM-классами оболочки
- [ ] Добавить пустую страницу `/builder` (`app/pages/builder/index.vue`) с заглушкой
- [ ] Задокументировать стратегию маршрутов (builder, templates, settings) в `docs/adr`

## 3) Auto Imports и плагины

- [x] Настроить `nuxt.config.ts` → `imports.dirs` (например, `composables`, `utils`)
- [ ] Настроить автоматическую регистрацию компонентов (если нужно ограничить пути)
- [x] Создать временный composable (`app/composables/useTheme.ts`) и проверить auto-import (тест удалён)

## 4) Runtime Config / Env

- [ ] Определить переменные окружения и описать в `docs/adr`
- [ ] Добавить секцию `runtimeConfig` в `nuxt.config.ts` (например, `public.apiBase`)
- [ ] Создать `.env.example` с описанием ключей

## 5) Системные скрипты

- [ ] Добавить npm-скрипт `dev:clean` (очистка `.nuxt`, `.output`)
- [ ] Подготовить `lint` для ADR/документации (опционально)
- [ ] Зафиксировать в README раздел «Архитектура & ADR»

## 6) Проверка

- [ ] Запустить `npm run lint` и `npm run type-check` после изменений
- [ ] Обновить `docs/plan.md` ссылкой на текущий файл и кратким статусом
- [ ] Сделать коммит `feat: architecture groundwork`
