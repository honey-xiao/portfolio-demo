import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
**Що це.** Піксельна кнопка в стилі Windows 98 — єдина кнопка сайту. Світла фаска зверху-зліва, темна знизу-справа, прямі кути. Перенесена з кнопки старого першого екрана (BevelButton).

**Параметри.**
- \`children\` — текст кнопки (обовʼязковий).
- \`size\` — \`"md"\` (за замовчуванням) або \`"lg"\`.
- \`href\` — якщо задано, кнопка стає посиланням \`<a>\`.
- \`onClick\` — дія для кнопки без \`href\`.
- \`disabled\` — \`false\` за замовчуванням.
- \`type\` — \`"button"\` (за замовчуванням) або \`"submit"\` у формі.

**Варіанти і стани.**
- Розмір \`md\`: текст \`text-body\`, відступи 4 × 2. Кнопки в картках проєктів («View») і у вікнах помилки («Fix it!»).
- Розмір \`lg\`: текст \`text-lead\`, відступи 6 × 3. Головні кнопки першого екрана («About me», «My projects», «Contacts»).
- Наведення: заливка стає \`button-light\`.
- Натискання: фаска інвертується (\`shadow-bevel-pressed\`).
- Фокус з клавіатури: пунктирний контур \`accent\`.
- Недоступна: пласка, заливка \`line\`, текст \`ink-muted\`, без фаски.

**Токени.** \`button\`, \`button-light\`, \`button-dark\`, \`button-shadow\` (через \`shadow-bevel\` і \`shadow-bevel-pressed\`), \`ink\`, \`ink-muted\`, \`line\`, \`accent\`, \`font-sans\`, \`text-body\`, \`text-lead\`, \`rounded-control\`, відступи 2, 3, 4, 6.

**Коли використовувати.** Будь-яка дія чи перехід, який має виглядати кнопкою: навігація першого екрана, кнопки в картках проєктів, «Fix it!», надсилання форми.

**Коли ні.** Посилання всередині тексту (там звичайне підкреслене посилання). Кнопки керування вікном (згорнути, розгорнути, закрити) — це окремі піксельні іконки, не ця кнопка.

**Як брати в код.**
\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button size="lg" href="#about">About me</Button>
<Button onClick={openAllProjects}>My projects</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    href: { control: "text" },
    children: { control: "text" },
    onClick: { control: false },
    type: { control: false },
  },
  args: { children: "My projects", size: "md", disabled: false },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
