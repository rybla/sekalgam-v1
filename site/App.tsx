import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Router } from "@site/Router";
import { theme } from "@site/theme";
import { useEffect, useState } from "react";

// Set of listeners to call when a language is loaded.
const listeners = new Set<() => void>();

// Triggers a force update on all subscribed components.
const triggerUpdate = () => listeners.forEach((l) => l());

/**
 * Escapes special HTML characters in a string to prevent XSS and HTML parsing issues.
 * @param text The plain text to escape.
 * @returns The escaped HTML string.
 */
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const loadingLanguages = new Set<string>();

const shikiAdapter = createShikiAdapter(async () => {
  const { createHighlighterCore } = await import("shiki/core");
  const { createOnigurumaEngine } = await import("shiki/engine/oniguruma");
  const { bundledLanguages, bundledLanguagesAlias } =
    await import("shiki/bundle/web");

  const highlighter = await createHighlighterCore({
    langs: [],
    themes: [],
    engine: createOnigurumaEngine(import("shiki/wasm")),
  });

  const originalCodeToHtml = highlighter.codeToHtml;
  highlighter.codeToHtml = (
    code: string,
    options: Parameters<typeof originalCodeToHtml>[1]
  ) => {
    const lang = options?.lang;
    if (
      typeof lang === "string" &&
      !highlighter.getLoadedLanguages().includes(lang)
    ) {
      const bundle =
        bundledLanguages[lang as keyof typeof bundledLanguages] ||
        bundledLanguagesAlias[lang as keyof typeof bundledLanguagesAlias];
      if (bundle && !loadingLanguages.has(lang)) {
        loadingLanguages.add(lang);
        highlighter
          .loadLanguage(bundle)
          .then(() => {
            loadingLanguages.delete(lang);
            triggerUpdate();
          })
          .catch((err) => {
            loadingLanguages.delete(lang);
            console.error(`Failed to load language ${lang}:`, err);
          });
      }
      return escapeHtml(code);
    }
    return originalCodeToHtml.call(highlighter, code, options);
  };

  return highlighter;
});

/**
 * The main application component, which sets up the Mantine UI provider and the router.
 * @returns The rendered application component.
 */
export default function App() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Suppress unused state warning/error by evaluating tick
  void tick;

  return (
    <MantineProvider theme={theme}>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <Router />
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
