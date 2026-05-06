# mfe-vue-sandbox

Песочница, в которой я ковыряю микрофронтенды на Vue 3 + Module Federation.
Бизнес-логики тут почти нет — мне интереснее как это всё склеивается на рантайме,
кто кому что отдаёт и как это собирать в монорепо.

## Стек

- Vue 3, TS, Vite
- npm workspaces + turbo
- Module Federation (`@originjs/vite-plugin-federation`)
- Vitest, ESLint, Storybook (для ui-kit)

## Что внутри

```
apps/
  shell-app       # хост: роутинг, сессия, runtime manifest, error boundary для ремоутов
  dashboard-mfe   # /dashboard — метрики, инциденты, деплои
  profile-mfe     # /profile   — форма + история входов + уведомления
  billing-mfe     # /billing   — таблица счетов + модалка с детализацией
packages/
  ui-kit          # компоненты + темы (PfButton, PfStat, PfBadge, PfModal, ...)
  shared-core     # auth, шина событий, логгер, флаги, ошибки
  api-sdk         # клиент к (моковому) API
  shared-types    # общие типы
  eslint-config, ts-config
```

Зависимости идут в одну сторону: `apps/*` → `packages/*`. Внутри пакетов
`api-sdk` тянет `shared-core` и `shared-types`, `shared-core` —
только `shared-types`. См. `docs/architecture.md` для деталей.

Внутри каждого MFE раскладка такая:

```
src/
  RemoteModule.vue      # тонкий, только склейка
  composables/use*.ts   # реактивная бизнес-логика, ходит в api
  components/*.vue      # презентация, не знает про api
  lib/format.ts         # чистые функции
```

## Запуск

```bash
npm install
npm run dev:full
```

Это соберёт три ремоута, поднимет их в `vite preview` на 4174/4175/4176 и
запустит shell в `vite dev` на http://localhost:5173. Открываешь shell,
ходишь по `/dashboard`, `/profile`, `/billing`.

Зачем такой костыль: `@originjs/vite-plugin-federation` не отдаёт
`remoteEntry.js` в обычном `vite dev`, только после билда. Поэтому
ремоуты живут в `preview`. HMR из-за этого работает только для shell-а;
если меняешь код MFE — пересобирай через `npm run build:mfe` или
рестартуй `dev:full`.

Если работаешь только над одним MFE (без shell-а) — у каждого свой
`main.ts` и нормальный HMR:

```bash
npm run dev -w @platform/profile-mfe   # http://localhost:5175
```

Storybook для ui-kit:

```bash
npm run storybook
```

## Что внутри shell-а интересного

- **Runtime manifest.** Адреса ремоутов читаются из `/remotes.json` в
  рантайме (а не из `vite.config.ts` на билде). См.
  `apps/shell-app/src/platform/manifest.ts`. Можно подменить манифест
  под окружение и shell перецепится.
- **Error boundary для ремоутов.** Загрузка федеративного модуля
  обёрнута в `loadRemote()` с тихими retry, fallback-компонентом
  `RemoteFailed` и таймаутом. Чтобы посмотреть в действии:
  ```bash
  kill $(lsof -t -i:4174)
  ```
  `/dashboard` покажет фолбэк, остальные роуты продолжат работать.

## Проверки

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

То же самое крутится в CI на PR и пуше в main.

## Docker

```bash
docker compose up --build
```

Каждое приложение собирается в свой образ на nginx. В бою адреса
ремоутов хочется получать из мфе-реестра, тут пока статический
`remotes.json` в `public/`.

## Что бы ещё хотелось попробовать

- contract-тесты на федеративные модули (схема props/events `Module`)
- проверка совместимости shared-зависимостей по версии
- что-нибудь с OpenTelemetry в браузере
- visual regression для ui-kit
