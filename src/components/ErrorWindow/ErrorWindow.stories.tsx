import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ErrorWindow } from "./ErrorWindow";

const description = `
**Що це.** Жартівливе вікно «Error» з першого екрана: «Fatal error: designer not hired yet.» і кнопка, що веде до контакту. На екрані їх шість стосом: закриваються по одному, а останнє не закривається — замість цього з-за нього виглядає заєць і сміється.

**Параметри.**
- \`message\` — текст помилки, за замовчуванням «Fatal error: designer not hired yet.».
- \`actionLabel\` — текст кнопки, за замовчуванням «Fix it!».
- \`href\` — куди веде кнопка (зазвичай \`mailto:\`).
- \`onClose\` — закриття хрестиком.

**Варіанти і стани.** Один вигляд. Кнопка — Button \`md\` з усіма станами. Хрестик фокусується з клавіатури, коли є \`onClose\`.

**Токени.** Усі токени Window, плюс \`ink\`, \`font-sans\`, \`text-body\`, відступи 2, 3. Колір \`danger\` тут навмисно не використовується: це жарт, а не справжня помилка.

**Коли використовувати.** Лише як декоративний жарт-заклик написати. Ширина вікна на екрані — 208.

**Коли ні.** Справжні помилки форм — для них текст і рамка \`danger\`.

**Як брати в код.**
\`\`\`tsx
import { ErrorWindow } from "@/components/ErrorWindow/ErrorWindow";

<ErrorWindow href="mailto:hello@example.com" onClose={closeError} />
\`\`\`
`;

const meta = {
  title: "Components/ErrorWindow",
  component: ErrorWindow,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    message: { control: "text" },
    actionLabel: { control: "text" },
    href: { control: "text" },
    onClose: { control: false },
  },
  args: {
    message: "Fatal error: designer not hired yet.",
    actionLabel: "Fix it!",
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        {/* story frame only: the window width on the hero */}
        <div style={{ width: 208 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
