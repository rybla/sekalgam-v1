import type { ComponentType } from "react";
import z from "zod";

export const pages = Object.entries(
  import.meta.glob("./page/**/*.page.tsx")
).reduce(
  (o, [filepath, load]) => {
    const name = fromFilepathToName(filepath);
    o[name] = {
      name,
      route: fromFilepathToRoute(filepath),
      load: load as () => Promise<{ default: ComponentType }>,
    };
    return o;
  },
  {} as {
    [name: string]: {
      name: string;
      route: string;
      load: () => Promise<{ default: ComponentType }>;
    };
  }
);

export type PageName = z.infer<typeof PageName>;
export const PageName = z.enum(Array.from(Object.keys(pages)));

/**
 * Resolves a route URL path to its corresponding page filepath.
 * @param route The URL route path.
 * @returns The corresponding relative file path of the page component.
 */
export function fromRouteToFilepath(route: string): string {
  if (route === "/") {
    route = "/Home";
  }

  return `./page/${route}.page.tsx`;
}

/**
 * Resolves a page filepath to its corresponding route URL path.
 * @param filepath The relative page file path.
 * @returns The corresponding route URL path.
 */
export function fromFilepathToRoute(filepath: string): string {
  const name = fromFilepathToName(filepath);
  const route = `/${name}`;
  return route;
}

/**
 * Extracts a logical page name from its page file path.
 * @param filepath The relative page file path.
 * @returns The extracted logical page name.
 */
export function fromFilepathToName(filepath: string): string {
  const name = filepath.match(
    /(?:\.\/)?(?:site\/page\/|page\/)?(.*)\.page\.tsx$/
  )?.[1];
  if (name === undefined) {
    throw new Error(`Invalid page filepath: ${filepath}`);
  }
  return name;
}
