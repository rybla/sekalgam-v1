import { MantineProvider } from "@mantine/core";
import { theme } from "@site/theme";
import { render as testingLibraryRender } from "@testing-library/react";

/**
 * Renders a component wrapped in MantineProvider for testing purposes.
 * @param ui The React node to render.
 * @returns The render result from Testing Library.
 */
export function render(ui: React.ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme} env="test">
        {children}
      </MantineProvider>
    ),
  });
}
