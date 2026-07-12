import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Router } from "@site/Router";
import { theme } from "@site/theme";

/**
 * The main application component, which sets up the Mantine UI provider and the router.
 * @returns The rendered application component.
 */
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
