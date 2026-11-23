import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ProjectWindow } from "./ProjectWindow";

const description = `
**Що це.** Картка кейса у вигляді вікна ретро-ОС. На першому екрані такі вікна «вилітають» з папок info.exe або всі разом з кнопки «My projects».

**Параметри.**
- \`title\` — назва файлу проєкту: LorryDesk.exe, Folio.app, VSL.app (обовʼязкова).
- \`path\` — шлях під заголовком: тип і суть продукту (обовʼязковий).
- \`description\` — 1–2 речення: що за продукт і моя роль (обовʼязковий).
- \`kind\` — \`"web"\` (за замовчуванням, іконка монітора) або \`"mobile"\` (іконка телефона).
- \`href\` — куди ведуть кнопки «View» і «Wanna see», за замовчуванням \`#projects\`.
- \`onClose\` — закриття вікна хрестиком.

**Варіанти і стани.** Іконка \`web\` / \`mobile\`. Кнопки — компонент Button розміру \`md\` з усіма його станами. Хрестик фокусується з клавіатури, коли є \`onClose\`.

**Токени.** Усі токени Window, плюс \`ink\` (шлях і опис), \`font-mono\` + \`text-caption\` (шлях), \`font-sans\` + \`text-lead\` (опис), відступи 3.

**Коли використовувати.** Короткий анонс кейса на першому екрані чи в списку робіт.

**Коли ні.** Повна сторінка кейса. Довгий текст: опис має вміщатися в 2–4 рядки.

**Як брати в код.**
\`\`\`tsx
import { ProjectWindow } from "@/components/ProjectWindow/ProjectWindow";

<ProjectWindow
  title="Folio.app"
  path="mobile > book discussion app"
  kind="mobile"
  description="An app for discussing books with other readers."
  onClose={() => closeProject("folio")}
/>
\`\`\`
`;

const meta = {
  title: "Components/ProjectWindow",
  component: ProjectWindow,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    title: { control: "text" },
    path: { control: "text" },
    description: { control: "text" },
    kind: { control: "select", options: ["web", "mobile"] },
    href: { control: "text" },
    onClose: { control: false },
  },
  args: {
    title: "Folio.app",
    path: "mobile > book discussion app",
    description: "An app for discussing books with other readers. Solo project — research to final UI.",
    kind: "mobile",
    href: "#projects",
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        {/* story frame only: the window width on the hero */}
        <div style={{ width: 350 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
