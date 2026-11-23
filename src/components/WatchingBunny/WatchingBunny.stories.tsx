import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WatchingBunny } from "./WatchingBunny";

const description = `
**Що це.** Маскот сайту — рожевий піксельний заєць із третім оком (Аліса з Країни чудес). Мило, але щось не так.

**Параметри.**
- \`width\` — ширина на екрані, px, за замовчуванням 186 (висота пропорційна). На першому екрані — 251.
- \`initialMode\` — \`"awake"\` (за замовчуванням) або \`"sleep"\`.

**Варіанти і стани.**
- Не спить: зіниці (\`art-highlight\`) стежать за курсором, заєць легенько підстрибує (\`animate-bob\`) і кліпає кожні 3–6 с.
- Спить: через 15 с без руху миші заплющує очі, дихає (\`animate-breathe\`), над ним пливе «Z» (\`animate-z-float\`).
- Наляканий: рух миші будить його — на мить широко розплющені очі.
- При «зменшеному русі» в системі анімації вимкнені, стеження очей лишається.

Перевірка: поводьте мишею навколо зайця; щоб побачити сон — оберіть \`initialMode: sleep\`, а потім ворухніть мишею.

**Токени.** \`art-highlight\` (зіниці), \`animate-bob\`, \`animate-breathe\`, \`animate-z-float\`. Сам заєць — картинки з \`src/assets/hero\`.

**Коли використовувати.** Перший екран; малі версії біля заголовків і у футері (за планом).

**Коли ні.** Не більше одного «живого» зайця на екрані: кілька зайців, що стежать за курсором, відволікають.

**Як брати в код.**
\`\`\`tsx
import { WatchingBunny } from "@/components/WatchingBunny/WatchingBunny";

<WatchingBunny width={251} />
\`\`\`
`;

const meta = {
  title: "Components/WatchingBunny",
  component: WatchingBunny,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    width: { control: { type: "range", min: 93, max: 372, step: 31 } },
    initialMode: { control: "select", options: ["awake", "sleep"] },
  },
  args: { width: 186, initialMode: "awake" },
  render: (args) => <WatchingBunny key={args.initialMode} {...args} />,
  decorators: [
    (Story) => (
      <div className="bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WatchingBunny>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
