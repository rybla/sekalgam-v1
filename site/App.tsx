import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Router } from "@site/Router";
import { theme } from "@site/theme";

const shikiAdapter = createShikiAdapter(async () => {
  const { createHighlighter } = await import("shiki");
  return await createHighlighter({
    langs: ["tsx", "css", "html", "bash", "json", "shell"],
    themes: [],
  });
});

/**
 * The main application component, which sets up the Mantine UI provider and the router.
 * @returns The rendered application component.
 */
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <Router />
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
