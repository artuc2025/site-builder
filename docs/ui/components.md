# Каталог UI-компонентов

Документ фиксирует состав базовой библиотеки UI для конструктора сайтов, их назначение, состояния, требования по доступности и связь с дизайн‑токенами.

## 1. Группы компонентов

| Группа        | Компоненты |
| ------------- | ---------- |
| Формы         | Button, Input, Textarea, Select, Multiselect, Checkbox, Radio, Switch, Slider, FileUpload |
| Навигация     | Toolbar, Tabs, Breadcrumb, Pagination, SidebarNav |
| Отображение   | Card, KPI Badge, Tag, Table, Accordion, Avatar |
| Уведомления   | Toast, InlineAlert, Modal, Tooltip |

## 2. MVP-набор

Минимальный набор, который необходим для первого релиза конструктора:

- Button
- Input
- Select
- Textarea
- Checkbox
- Radio
- Switch
- Card
- Modal
- Toolbar
- Tabs
- Breadcrumb
- Toast

## 3. Карточки компонентов

Ниже приведена сводка по каждому компоненту: назначение, ключевые состояния, доступность, API и зависимость от токенов.

### Формы

| Компонент | Назначение | Состояния | A11y | API (props/events/slots) | Токены и утилиты |
| --------- | ---------- | --------- | ---- | ------------------------ | ---------------- |
| Button | CTA-кнопки, триггеры действий | `default`, `hover`, `focus`, `active`, `loading`, `success`, `danger`, `ghost`, размеры `sm/md/lg`, `is-disabled` | `role="button"`, `aria-pressed` для toggle, фокус по `Tab`, поддержка `Enter/Space` | props: `variant`, `size`, `loading`, `disabled`, `icon`, `iconPosition`; events: `click`; slot: `default`, `icon` | `$color-primary`, `$color-danger`, `$space-*`, `$radius-md`, mixin `focus-ring`, util `.is-loading` |
| Input | Текстовое поле | `default`, `focus`, `error`, `success`, `disabled`, `with-prefix`, `with-suffix` | `aria-invalid`, `aria-describedby`, связь с `<label>` и `id`; фокусное кольцо | props: `modelValue`, `type`, `state`, `prefix`, `suffix`, `placeholder`; events: `update:modelValue`, `focus`, `blur`; slots: `prefix`, `suffix` | `$space-*`, `$color-surface`, `$color-danger`, `$color-success`, `$radius-sm`, util `.is-disabled` |
| Select | Выпадающий список (single) | `default`, `focus`, `open`, `error`, `disabled`, `loading` | `role="combobox"`, `aria-expanded`, `aria-activedescendant`, клавиатурная навигация стрелками | props: `modelValue`, `options`, `searchable`, `state`, `placeholder`; events: `update:modelValue`, `open`, `close`, `search`; slots: `option`, `label` | `$shadow-soft`, `$color-surface`, `$space-*`, mixin `sr-only`, util `.is-loading` |
| Multiselect | Множественный выбор | состояния как у Select + `chips` | те же ARIA, дополнительно `aria-multiselectable` | props: `modelValue`, `options`, `tags`, `maxTags`; events: `update:modelValue`, `remove-tag`; slots: `tag`, `option` | `$color-primary`, `$color-text`, `$radius-sm`, `$space-1/2/3` |
| Textarea | Многострочное поле | `default`, `focus`, `error`, `disabled`, `auto-resize` | `aria-invalid`, `aria-describedby`, поддержка `Enter` | props: `modelValue`, `rows`, `autoResize`, `state`; events: `update:modelValue`, `input`; slots: `hint` | `$space-*`, `$radius-md`, util `.is-disabled` |
| Checkbox | Бинарный выбор | `checked`, `indeterminate`, `disabled`, `error` | использует `<input type="checkbox">`, `aria-checked`, поддержка `Space` | props: `modelValue`, `state`, `indeterminate`, `label`; events: `update:modelValue`, `focus`, `blur`; slots: `label`, `description` | `$color-primary`, `$color-danger`, `$radius-sm`, mixin `focus-ring` |
| Radio | Выбор из группы | `checked`, `disabled`, `error` | `<input type="radio">`, `role="radiogroup"` для группы | props: `modelValue`, `value`, `state`, `name`; events: `update:modelValue`; slots: `label` | `$color-primary`, `$space-2`, mixin `focus-ring` |
| Switch | Тумблер | `on`, `off`, `disabled`, `loading` | `role="switch"`, `aria-checked`, `aria-readonly` | props: `modelValue`, `disabled`, `loading`, `label`; events: `update:modelValue`; slots: `label`, `description` | `$color-primary`, `$color-surface`, `$radius-lg`, util `.is-loading` |
| Slider | Диапазон значений | `default`, `focus`, `disabled`, `with-markers`, `range` | `role="slider"`, `aria-valuenow`, `aria-valuemin/max`, `aria-labelledby` | props: `modelValue`, `min`, `max`, `step`, `marks`, `range`; events: `update:modelValue`; slots: `thumb`, `track` | `$color-primary`, `$color-surface`, `$space-2`, mixin `focus-ring` |
| FileUpload | Загрузка файлов | `default`, `hover`, `dragover`, `error`, `disabled`, `progress` | `role="button"`, `aria-disabled`, drag&drop `aria-describedby`; предоставлять инструкции для скринридеров | props: `accept`, `maxSize`, `multiple`, `state`; events: `select`, `upload`, `error`, `remove`; slots: `dropzone`, `preview` | `$color-surface`, `$shadow-soft`, `$space-*`, `$radius-lg`, util `.is-dragover` |

### Навигация

| Компонент | Назначение | Состояния | A11y | API | Токены/утилиты |
| --------- | ---------- | --------- | ---- | --- | -------------- |
| Toolbar | Верхняя панель конструктора | `default`, `condensed`, `sticky`, `with-search`, `with-actions` | `role="toolbar"`, `aria-label`, управление стрелками для групп кнопок | props: `dense`, `title`, `actions`, `breadcrumbs`; slots: `title`, `actions`, `breadcrumbs`, `secondary` | `$space-2/4`, `$color-surface`, `$shadow-soft`, util `.is-sticky` |
| Tabs | Переключатель разделов | `default`, `active`, `disabled`, `scrollable` | `role="tablist"`, `aria-selected`, `aria-controls`, клавиатура: стрелки | props: `modelValue`, `items`, `orientation`, `variant`; events: `update:modelValue`, `change`; slots: `tab`, `panel` | `$color-primary`, `$color-text`, `$space-*`, `$radius-md` |
| Breadcrumb | Навигационная цепочка | `default`, `overflow`, `dropdown` | `nav` + `aria-label="breadcrumb"`, `aria-current` | props: `items`, `maxVisible`, `separator`; slots: `item`, `separator` | `$space-2`, `$color-text-muted`, util `.is-last` |
| Pagination | Постраничная навигация | `default`, `active`, `disabled`, `compact` | `nav` + `aria-label`, `aria-current`, поддержка клавиатуры | props: `page`, `pageCount`, `size`, `disabled`; events: `update:page`; slots: `prev`, `next` | `$space-2`, `$radius-sm`, `$color-primary`, util `.is-disabled` |
| SidebarNav | Структура разделов конструктора | `default`, `collapsed`, `active`, `with-badge` | `nav` + `aria-label`, `aria-expanded`, поддержка `Enter/Space` | props: `items`, `collapsible`, `badge`; events: `toggle`, `select`; slots: `item`, `footer` | `$color-surface`, `$space-4`, `$shadow-soft`, util `.is-collapsed` |

### Отображение

| Компонент | Назначение | Состояния | A11y | API | Токены/утилиты |
| --------- | ---------- | --------- | ---- | --- | -------------- |
| Card | Карточка контента/превью | `default`, `hover`, `selected`, `dragging`, `disabled` | `role="group"`, поддержка фокуса для перетаскивания | props: `variant`, `selectable`, `draggable`, `image`, `actions`; slots: `media`, `title`, `meta`, `footer` | `$shadow-soft`, `$radius-lg`, `$space-*`, util `.is-selected`, `.is-dragging` |
| KPI Badge | Показатели/ярлыки | `default`, `positive`, `warning`, `negative`, `muted` | `role="status"`, `aria-live="polite"` (если обновляется) | props: `variant`, `icon`, `trend`; slots: `default`, `icon` | `$color-success`, `$color-warning`, `$color-danger`, `$radius-sm`, util `.is-inline` |
| Tag | Метки ресурсов | `default`, `interactive`, `removable`, `disabled` | `aria-label` для кнопок удаления, фокус кольцо | props: `variant`, `closable`, `icon`; events: `remove`; slots: `default`, `icon` | `$color-surface`, `$color-primary`, `$radius-sm`, util `.is-closable` |
| Table | Табличные данные | `default`, `striped`, `hover`, `sortable`, `loading`, `empty` | семантический `<table>`, подписи, `scope`, `aria-sort` | props: `columns`, `rows`, `sortable`, `loading`, `emptyState`; events: `sort`, `rowClick`; slots: `cell`, `row`, `empty` | `$space-*`, `$color-surface`, util `.is-loading`, mixin `sr-only` |
| Accordion | Секции контента | `expanded`, `collapsed`, `disabled`, `nested` | `role="button"`, `aria-expanded`, `aria-controls`, клавиатура | props: `items`, `multiple`, `icon`; events: `toggle`; slots: `title`, `content`, `icon` | `$color-surface`, `$radius-md`, `$space-*`, util `.is-expanded` |
| Avatar | Отображение пользователей | `default`, `initials`, `image`, `with-status`, `stacked` | `img` + `alt`, `aria-label`, статус `aria-hidden` | props: `src`, `initials`, `size`, `status`, `badge`; slots: `default` | `$radius-lg`, `$space-1`, `$color-success`, `$color-danger` |

### Уведомления

| Компонент | Назначение | Состояния | A11y | API | Токены/утилиты |
| --------- | ---------- | --------- | ---- | --- | -------------- |
| Toast | Временные уведомления | `info`, `success`, `warning`, `error`, `loading`, `persistent` | `role="status"`/`role="alert"`, `aria-live`, автофокус не требуется | props: `variant`, `title`, `message`, `autoClose`, `timeout`; events: `close`, `action`; slots: `default`, `title`, `actions` | `$color-success`, `$color-warning`, `$color-danger`, `$shadow-soft`, util `.is-dismissible` |
| InlineAlert | Встраиваемые сообщения | `info`, `success`, `warning`, `error`, `dismissible` | `role="alert"`, `aria-live`, кнопка закрытия с `aria-label` | props: `variant`, `title`, `dismissible`; events: `close`; slots: `default`, `title`, `actions` | `$color-*`, `$radius-md`, `$space-*` |
| Modal | Диалог | `default`, `fullscreen`, `confirm`, `with-form`, `loading` | `role="dialog"`, `aria-modal`, фокус ловушка, закрытие по Esc | props: `modelValue`, `size`, `title`, `closeOnBackdrop`, `loading`; events: `update:modelValue`, `confirm`, `cancel`; slots: `header`, `default`, `footer`, `aside` | `$shadow-strong`, `$radius-lg`, `$color-surface`, util `.is-open` |
| Tooltip | Подсказки | `top/right/bottom/left`, `interactive`, `persistent` | `role="tooltip"`, `aria-describedby`, управление через фокус/hover | props: `content`, `placement`, `trigger`, `delay`; slots: `default`, `content` | `$color-text`, `$color-surface`, `$space-2`, util `.is-visible` |

## 4. Матрица сценариев

| Сценарий конструктора | Ключевые компоненты | Приоритет |
| --------------------- | ------------------- | --------- |
| Панель инструментов конструктора | Toolbar, Tabs, Breadcrumb, Button, Dropdown (Select) | P0 |
| Форма настройки блока | Input, Select, Textarea, Checkbox, Radio, Switch, Slider, FileUpload | P0 |
| Менеджер страниц | SidebarNav, Breadcrumb, Card, Button, Modal | P1 |
| Галерея шаблонов | Card, Tabs, Toolbar, Toast | P1 |
| Диалог публикации | Modal, InlineAlert, Button, Switch | P1 |
| Отчёты/аналитика | Table, KPI Badge, Tag, Toolbar | P2 |
| Уведомления о статусе | Toast, InlineAlert, Tooltip | P0 |
| Управление ресурсами (медиа) | Card, FileUpload, Tabs, Toast | P1 |

Приоритеты: `P0` — необходим в первом релизе, `P1` — сразу после запуска MVP, `P2` — план после стабилизации.

## 5. Требования по доступности

- Все интерактивные элементы должны быть доступны через клавиатуру (`Tab`, `Shift+Tab`, `Enter`, `Space`, стрелки).
- Для `role="dialog"` (Modals) реализовать ловушку фокуса и возврат фокуса по закрытию.
- Компоненты с динамическими сообщениями (`Toast`, `InlineAlert`) используют `aria-live="polite"` или `assertive` в зависимости от критичности.
- У компонентов с состоянием ошибки/успеха использовать `aria-invalid`, `aria-describedby`, `aria-errormessage` и визуальное обозначение токенами `$color-danger`/`$color-success`.
- Навигационные компоненты должны объявлять `aria-label` или `aria-labelledby`.

## 6. Следующие шаги

1. Согласовать документ с продуктом/дизайном и зафиксировать финальную версию.
2. На основании матрицы приоритизировать создание Vue/SCSS заготовок (`P0` → `P1` → `P2`).
3. Добавить задачи в бэклог (issue tracker) по компонентам и сценариям.

