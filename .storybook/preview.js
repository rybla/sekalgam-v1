import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { theme } from "@site/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect } from "react";
import { useGlobals } from "storybook/preview-api";
export const parameters = {
  layout: "fullscreen",
  options: {
    showPanel: false,
    storySort: (a, b) =>
      a.title.localeCompare(b.title, undefined, { numeric: true }),
  },
  backgrounds: { disable: true },
};
export const globalTypes = {
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
};
export const decorators = [
  (renderStory, context) => {
    const [{ theme: storybookTheme }, updateGlobals] = useGlobals();
    useEffect(() => {
      const onKeyDown = (event) => {
        const isMod = event.metaKey || event.ctrlKey;
        const isJ = event.code === "KeyJ";
        if (!isMod || !isJ) {
          return;
        }
        event.preventDefault();
        updateGlobals({ theme: storybookTheme === "dark" ? "light" : "dark" });
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [storybookTheme, updateGlobals]);
    const scheme = context.globals["theme"] || "light";
    return _jsxs(MantineProvider, {
      theme: theme,
      forceColorScheme: scheme,
      children: [_jsx(ColorSchemeScript, {}), renderStory()],
    });
  },
];
/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
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
};
export default preview;
