import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Window } from "./Window";

const description = `
**Що це.** Рамка вікна ретро-ОС (Windows 98) — основа для info.exe, вікон проєктів і вікон Error. Сама по собі нічого не знає про вміст: усе, що всередині, передається як \`children\`.

**Параметри.**
- \`title\` — назва в смузі заголовка (обовʼязкова).
- \`children\` — вміст під смугою заголовка (обовʼязковий).
- \`size\` — \`"md"\` (за замовчуванням) або \`"lg"\`.
- \`onClose\` — якщо задано, хрестик стає кнопкою «Закрити».
- \`closeLabel\` — підпис хрестика для екранних читачів, за замовчуванням \`Close {title}\`.
- \`titleAs\` — \`"p"\` (за замовчуванням) або \`"h2"\`, коли назва вікна — заголовок картки.

**Варіанти і стани.**
- \`md\`: відступи 3, кнопки керування розміру 6. Вікна проєктів і помилок.
- \`lg\`: відступи 4, вища смуга заголовка (py-2), кнопки керування розміру 8. Велике вікно info.exe.
- Без \`onClose\` кнопки керування декоративні; з \`onClose\` хрестик фокусується з клавіатури (пунктир \`on-accent\`).

**Токени.** \`surface\` (тіло), \`line\` (рамка), \`accent\` (смуга заголовка), \`on-accent\` (назва), \`font-pixel\`, \`text-heading\`, \`rounded-card\`, \`drop-shadow-window\`, відступи 1, 2, 3, 4.

**Коли використовувати.** Будь-який блок, що має виглядати як вікно ОС: вікна першого екрана, картки кейсів, майбутні вікна «Про мене» чи контактів.

**Коли ні.** Темне вікно терміналу — це окремий компонент \`Terminal\`. Звичайні секції сторінки без рамки вікна.

**Як брати в код.**
\`\`\`tsx
import { Window } from "@/components/Window/Window";

<Window title="info.exe" size="lg">
  <p className="px-4 font-sans text-body text-ink">…</p>
</Window>
\`\`\`
`;

const meta = {
  title: "Components/Window",
  component: Window,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    title: { control: "text" },
    size: { control: "select", options: ["md", "lg"] },
    titleAs: { control: "select", options: ["p", "h2"] },
    children: { control: false },
    onClose: { control: false },
    closeLabel: { control: "text" },
  },
  args: {
    title: "info.exe",
    size: "md",
    titleAs: "p",
    onClose: fn(),
    children: <p className="px-3 font-sans text-body text-ink">Window content goes here.</p>,
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        {/* story frame only: a typical window width on the hero */}
        <div style={{ width: 350 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
