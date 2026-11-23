@AGENTS.md

# Портфоліо Аліси (Xiao)

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4, токени в блоці `@theme` у `src/app/globals.css`)

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт, тому перед кожним пушем питай мене.

## Токени

Єдине джерело значень — блок `@theme` у `src/app/globals.css`. Стандартну палітру, шкалу тексту, шрифти й радіуси Tailwind скинуто: класи на кшталт `text-white`, `bg-black`, `text-sm`, `rounded-lg` мовчки не працюють. Hex, rgb і значення в квадратних дужках (`p-[13px]`) у компонентах заборонені. Палітра світла, з першого екрана старого макета (portfolio-test).

- **Кольори:** `canvas` (фон сторінки), `surface` (тіло вікон, картки), `surface-tint` (низ градієнта внутрішнього екрана), `line` (рамки вікон, розділювачі), `accent` (заголовки вікон, контур фокусу), `on-accent` (текст на accent), `ink` (основний текст), `ink-muted` (другорядний текст), `danger` (текст помилки й межа поля з помилкою).
  Темне вікно терміналу: `surface-inverse`, `on-inverse`, `accent-on-inverse`.
  Кнопка Win98: `button` (заливка), `button-light` (світла фаска, hover), `button-dark`, `button-shadow` (темні фаски).
  Піксель-арт у коді: `art-line` (контур хмаринки), `art-highlight` (зіниці зайця).
- **Шрифти:** `font-pixel` (Pixelify Sans: заголовки вікон, «Portfolio»), `font-sans` (Space Grotesk: увесь читабельний текст), `font-mono` (IBM Plex Mono: підписи, шляхи), `font-terminal` (VT323: заголовок терміналу). Підключені в `src/app/fonts.ts`. JetBrains Mono — декоративний, у токени не входить.
- **Текст:** `text-caption`, `text-body`, `text-lead`, `text-heading`, `text-display`. Висота рядка, трекінг і жирність задані парами в `@theme`.
- **Радіуси:** `rounded-control`, `rounded-card` — обидва 0, кути прямі.
- **Відступи:** база 4px, дозволені кроки 4, 8, 12, 16, 24, 32 px → числа 1, 2, 3, 4, 6, 8 у класах. Крок 4 (`…-1`) — лише між кнопками керування вікна. Між великими секціями — `section` (`py-section`, `gap-section`).
- **Ширина контенту:** `max-w-content`.
- **Пропорції картинок:** `aspect-cover` (обкладинка кейса), `aspect-portrait` (портрет, аватар).
- **Тінь вікна:** `drop-shadow-window`.
- **Фаска кнопки Win98:** `shadow-bevel` (звичайна), `shadow-bevel-pressed` (натиснута). Будуються з кольорів `button-light`, `button-shadow`, `button-dark`.
- **Анімації (піксельні кроки):** `animate-caret`, `animate-bob`, `animate-breathe`, `animate-z-float`, `animate-laugh-peek`, `animate-laugh-bounce`, `animate-window-open`, `animate-window-close`. Завжди в парі з `motion-reduce:animate-none`.
- **Декоративний шрифт (не токен):** JetBrains Mono — лише рядки терміналу, через `jetbrainsMono.className` з `src/app/fonts.ts`.

Розташування вікон на першому екрані — геометрія старого макета 1440 × 1024 (числа в `src/components/Hero/Hero.tsx`), не токени. Картинки компонентів лежать у `src/assets/` і імпортуються; курсор сайту — `public/cursor.svg`.

Контраст: `ink` і `ink-muted` проходять 4,5:1 на `canvas`, `line` і `button`. На `surface` основний текст — лише `ink` (`ink-muted` там 3,43:1). Білий текст на `surface` не використовуємо.

## Компоненти

Кожен компонент лежить у `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx` (одна історія з Controls, документація на вкладці Docs у Storybook).

- **Button** (`src/components/Button/Button.tsx`) — піксельна кнопка Windows 98. Пропси: `children`, `size` (`md` | `lg`), `href` (стає `<a>`), `onClick`, `disabled`, `type`. Стани: hover, натискання (інвертована фаска), фокус (пунктир `accent`), disabled.
- **Window** — рамка вікна ретро-ОС (заголовок `accent`, кнопки керування). Пропси: `title`, `children`, `size` (`md` | `lg`), `onClose`, `closeLabel`, `titleAs`.
- **ProjectWindow** — картка кейса у вікні: `title`, `path`, `description`, `kind` (`web` | `mobile`), `href`, `onClose`.
- **ErrorWindow** — жартівливе вікно «Error» з кнопкою до контакту: `message`, `actionLabel`, `href`, `onClose`.
- **Terminal** — темне вікно cmd.exe з контактом: `email`, `lookingFor`, `status`.
- **SpeechBubble** — піксельна хмаринка з текстом: `children`, `cols`, `rows`, `tail`, `pixel`.
- **WatchingBunny** — маскот, очі стежать за курсором, кліпає, засинає: `width`, `initialMode`.
- **DesktopIcon** — іконка-папка в info.exe: `label`, `icon`, `iconWidth`, `onClick`, `expanded`, `iconRef`.
- **Hero** (секція, `Sections/Hero` у Storybook) — перший екран, збирає всі компоненти вище.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [PLAN.md](PLAN.md)
