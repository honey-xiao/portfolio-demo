import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Font variables on <html>, as in the site layout, so docs pages (MDX) see them too.
document.documentElement.classList.add(...fontVariables.split(" "));

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Same base text as <body> in src/app/layout.tsx.
  decorators: [
    (Story) => (
      <div className="font-sans text-body text-ink antialiased">
        <Story />
      </div>
    ),
  ],
};

export default preview;
