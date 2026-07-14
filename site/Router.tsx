import { pages } from "@site/meta";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = lazy(() => import("@site/page/Home.page"));

const router = createBrowserRouter(
  [
    // automatically generated page routes
    ...Object.entries(pages).map(([_, page]) => {
      const Component = lazy(async () => {
        const module = await page.load();
        return { default: module.default };
      });

      return {
        path: page.route,
        element: <Component />,
      };
    }),
    // statically-defined routes
    {
      path: "/",
      element: <HomePage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

/**
 * Renders the router component configured with all application routes.
 * @returns The rendered RouterProvider component.
 */
export function Router() {
  return <RouterProvider router={router} />;
}
