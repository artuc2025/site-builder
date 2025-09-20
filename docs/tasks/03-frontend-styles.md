# Фронтенд-стили и UI (SCSS + BEM) — задачи

## 1) Структура SCSS

- [x] Согласовать набор слоёв (`abstracts`, `base`, `components`, `layout`, `utilities`) и зафиксировать описание в плане (см. `assets/styles/*/_README.md`)
- [x] Создать директорию `assets/styles` и подпапки под каждый слой
- [x] Добавить стартовые файлы (`_index.scss`, `_README.md`) в каждом слое с описанием назначения
- [x] Настроить глобальные подключения SCSS в `nuxt.config.ts` (поля `css`, `vite.css.preprocessorOptions`)

## 2) Дизайн-токены и утилиты

- [x] Определить перечень токенов (цвета, типографика, сетка, состояния) и описать их в `docs/tokens.md`
- [x] Создать `_tokens.scss` с переменными темы и подключить к слоям стилей
- [x] Подготовить `_mixins.scss` и `_functions.scss` для повторяемых паттернов (см. `assets/styles/abstracts/_mixins.scss`, `_functions.scss`)

## 3) BEM-конвенции и контроль качества

- [x] Описать правила именования BEM (блоки, элементы, модификаторы) в `docs/conventions/bem.md`
- [x] Настроить Stylelint и BEM-плагин для валидации классов (`stylelint-selector-bem-pattern`)

## 4) Базовая библиотека UI

- [ ] Составить список базовых UI-компонентов (button, input, card, modal, toolbar, tabs и т.д.) с требуемыми состояниями
- [ ] Создать каркас Vue-компонентов и SCSS-файлов для каждого элемента
- [ ] Прописать требования к токенам и модификаторам для компонентов

## 5) Storybook

- [ ] Установить `@storybook/vue3`, `@storybook/addon-essentials`, `@storybook/addon-interactions`
- [ ] Сгенерировать `.storybook/main.ts` и `.storybook/preview.ts`, подключить глобальные стили
- [ ] Добавить пример `Button.stories.ts` и настроить CSF-формат
- [ ] Создать npm-скрипты `storybook` и `build-storybook` в `package.json`
- [ ] Спланировать публикацию Storybook (Chromatic или статика из `dist-storybook`)
