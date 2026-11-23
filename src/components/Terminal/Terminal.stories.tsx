import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Terminal } from "./Terminal";

const description = `
**Що це.** Темне вікно cmd.exe з контактом для рекрутера: формат роботи, статус, пошта і посилання «[ Send message ]». У кінці блимає курсор.

**Параметри.**
- \`email\` — пошта для рядка \`email:\` і посилання «Send message» (обовʼязкова).
- \`lookingFor\` — формат роботи, за замовчуванням \`full-time\`.
- \`status\` — статус пошуку, за замовчуванням \`available\`.

**Варіанти і стани.** Один вигляд. Пошта підкреслюється при наведенні; «Send message» при наведенні світлішає (\`accent-on-inverse\` → \`on-inverse\`). Курсор блимає (\`animate-caret\`), а при «зменшеному русі» в системі стоїть нерухомо.

**Токени.** \`surface-inverse\` (фон), \`on-inverse\` (текст), \`accent-on-inverse\` (посилання), \`line\` (рамки), \`font-terminal\` + \`text-heading\` (назва), \`text-caption\` і \`text-body\` (рядки), \`drop-shadow-window\`, \`animate-caret\`, відступи 1, 2, 3, 4, 6. Рядки команд набрані декоративним JetBrains Mono — це не токен, тільки для цього вікна.

**Коли використовувати.** Блок контакту в стилі ретро-ОС: перший екран, футер.

**Коли ні.** Звичайний текст сторінки. JetBrains Mono поза цим вікном не використовуємо.

**Як брати в код.**
\`\`\`tsx
import { Terminal } from "@/components/Terminal/Terminal";

<Terminal email="hello@example.com" />
\`\`\`
`;

const meta = {
  title: "Components/Terminal",
  component: Terminal,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    email: { control: "text" },
    lookingFor: { control: "text" },
    status: { control: "text" },
  },
  args: { email: "alisa.hordon@gmail.com", lookingFor: "full-time", status: "available" },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        {/* story frame only: the terminal width on the hero */}
        <div style={{ width: 350 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
