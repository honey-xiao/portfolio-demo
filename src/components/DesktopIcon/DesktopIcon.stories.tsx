import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import folderAbout from "@/assets/hero/folder-about.svg";
import folderContacts from "@/assets/hero/folder-contacts.svg";
import folderProjects from "@/assets/hero/folder-projects.svg";
import { DesktopIcon } from "./DesktopIcon";

const icons = { "folder-about": folderAbout, "folder-projects": folderProjects, "folder-contacts": folderContacts };

const description = `
**Що це.** Іконка-папка на «робочому столі» info.exe: піксельна картинка і підпис. Натискання відкриває вікно проєкту.

**Параметри.**
- \`label\` — підпис під іконкою (обовʼязковий).
- \`icon\` — картинка папки, імпорт з \`src/assets/hero\` (обовʼязкова).
- \`iconWidth\` — ширина іконки, px, за замовчуванням 71; на першому екрані 96.
- \`onClick\` — дія по кліку (відкрити проєкт).
- \`expanded\` — чи відкрите вікно проєкту, для екранних читачів; за замовчуванням \`false\`.
- \`iconRef\` — посилання на картинку, щоб вікно «вилітало» саме з неї.

**Варіанти і стани.** Наведення: іконка підскакує на крок 1. Фокус з клавіатури: пунктирний контур \`accent\`.

**Токени.** \`ink\` (підпис), \`accent\` (фокус), \`font-sans\`, \`text-body\`, відступи 1, 2.

**Коли використовувати.** Папки-проєкти чи розділи всередині вікна ретро-ОС.

**Коли ні.** Основна навігація сайту — для неї кнопки Button.

**Як брати в код.**
\`\`\`tsx
import { DesktopIcon } from "@/components/DesktopIcon/DesktopIcon";
import folder from "@/assets/hero/folder-projects.svg";

<DesktopIcon label="Folio.app" icon={folder} iconWidth={96} onClick={() => openProject("folio")} />
\`\`\`
`;

const meta = {
  title: "Components/DesktopIcon",
  component: DesktopIcon,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    label: { control: "text" },
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
    iconWidth: { control: { type: "range", min: 48, max: 144, step: 1 } },
    expanded: { control: "boolean" },
    onClick: { control: false },
    iconRef: { control: false },
  },
  args: {
    label: "Folio.app",
    icon: folderProjects,
    iconWidth: 96,
    expanded: false,
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-linear-to-b from-line to-surface-tint p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
