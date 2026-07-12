import { theme } from "@site/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import { useGlobals } from "storybook/preview-api";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Mantine color scheme",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },

  decorators: [
    (renderStory, context) => {
      const [{ theme: storybookTheme }, updateGlobals] = useGlobals();

      useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
          const isMod = event.metaKey || event.ctrlKey;
          const isJ = event.code === "KeyJ";

          if (!isMod || !isJ) {
            return;
          }

          event.preventDefault();
          updateGlobals({
            theme: storybookTheme === "dark" ? "light" : "dark",
          });
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
      }, [storybookTheme, updateGlobals]);

      const scheme = (context.globals["theme"] || "light") as "light" | "dark";
      return (
        <MantineProvider theme={theme} forceColorScheme={scheme}>
          <ColorSchemeScript />
          {renderStory()}
        </MantineProvider>
      );
    },
  ],
};

export default preview;
