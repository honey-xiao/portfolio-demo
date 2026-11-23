import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";

const description = `
**Що це.** Перший екран сайту: «робочий стіл» ретро-ОС. Вікно info.exe з позиціонуванням у хмаринці, зайцем і папками трьох проєктів; термінал cmd.exe з контактом; стос вікон Error; велике «Portfolio» з підписом.

**Параметри.** Немає: тексти й посилання задані всередині компонента (\`PROJECTS\`, \`EMAIL\` у \`Hero.tsx\`).

**Як влаштований.** Екран — фіксований «стіл» 1440 × 1024 зі старого макета, який масштабується під ширину вікна браузера. Розташування вікон на столі — це геометрія макета (числа в \`Hero.tsx\`), а кольори, шрифти, розміри тексту, відступи всередині вікон і тіні — токени.

**Стани й взаємодії.**
- Папка в info.exe або кнопка «My projects» — відкриває вікна проєктів з анімацією Windows 98 (\`animate-window-open\`); хрестик закриває (\`animate-window-close\`). Клік по вікну піднімає його нагору.
- Вікна Error закриваються по одному; останнє не закривається — заєць виглядає з-за нього й сміється (\`animate-laugh-peek\`, \`animate-laugh-bounce\`).
- Заєць стежить за курсором, кліпає, засинає й лякається (див. WatchingBunny).
- При «зменшеному русі» вікна відкриваються без анімації.

**Токени.** \`canvas\`, \`ink\`, \`font-pixel\` + \`text-display\` («Portfolio»), \`font-mono\` + \`text-lead\` (підписи), \`accent\` (рамка анімації вікна), а також усі токени вкладених компонентів: Window, Button, DesktopIcon, SpeechBubble, WatchingBunny, Terminal, ProjectWindow, ErrorWindow.

**Коли використовувати.** Один раз — перший екран головної сторінки.

**Коли ні.** На вузьких екранах (телефон) «стіл» стає дуже дрібним — мобільну версію першого екрана треба зробити окремо. Перегляньте через кнопку Viewport у тулбарі Storybook.

**Як брати в код.**
\`\`\`tsx
import { Hero } from "@/components/Hero/Hero";

<main>
  <Hero />
</main>
\`\`\`
`;

const meta = {
  title: "Sections/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
