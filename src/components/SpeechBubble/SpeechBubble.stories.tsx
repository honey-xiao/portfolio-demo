import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpeechBubble } from "./SpeechBubble";

const description = `
**Що це.** Піксельна хмаринка з реплікою зайця. На першому екрані в ній позиціонування: хто я і що проєктую. Малюється в коді з квадратиків, тому розмір можна міняти, а текст лишається справжнім (його читають пошук і екранні читачі).

**Параметри.**
- \`children\` — текст репліки (обовʼязковий).
- \`cols\` — ширина тіла в піксель-арт пікселях, за замовчуванням 39.
- \`rows\` — висота тіла, за замовчуванням 12 (хвостик звисає ще на 3).
- \`tail\` — стовпчик, з якого починається хвостик, за замовчуванням 34.
- \`pixel\` — розмір одного піксель-арт пікселя на екрані, за замовчуванням 11.

**Варіанти і стани.** Інтерактивних станів немає. Розмір і місце хвостика задаються числами вище; текст не має виходити за межі — якщо не вміщається, збільште \`cols\` або \`rows\`.

**Токени.** \`art-line\` (контур), \`line\` (заливка), \`ink\` (текст), \`font-sans\`, \`text-body\`.

**Коли використовувати.** Репліка маскота: позиціонування, короткі підказки.

**Коли ні.** Довгі тексти (більше 3–5 рядків) і звичайні абзаци.

**Як брати в код.**
\`\`\`tsx
import { SpeechBubble } from "@/components/SpeechBubble/SpeechBubble";

<SpeechBubble cols={39} rows={12} tail={34} pixel={11}>
  Hello! I am Alisa or Xiao…
</SpeechBubble>
\`\`\`
`;

const meta = {
  title: "Components/SpeechBubble",
  component: SpeechBubble,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    children: { control: "text" },
    cols: { control: { type: "range", min: 20, max: 60, step: 1 } },
    rows: { control: { type: "range", min: 8, max: 20, step: 1 } },
    tail: { control: { type: "range", min: 3, max: 55, step: 1 } },
    pixel: { control: { type: "range", min: 6, max: 16, step: 1 } },
  },
  args: {
    children:
      "Hello! I am Alisa or Xiao. I’m a UI/UX designer for product teams — I design mobile apps and B2B web products, with a focus on clear logic and clean developer handoff.",
    cols: 39,
    rows: 12,
    tail: 34,
    pixel: 11,
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpeechBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
