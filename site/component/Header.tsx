import { Anchor, Group, Title } from "@mantine/core";
import { pages } from "@site/meta";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@site/component/ThemeToggle";
import classes from "@site/component/Header.module.css";

/**
 * Renders the application header with the page title and quick navigation links.
 * @param props The component props.
 * @param props.title The title text to display in the header.
 * @returns The rendered header component.
 */
export function Header(props: { title: string }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Filter top-level pages: pages that do not have "/" in their names
  const topLevelPages = Object.values(pages)
    .filter((page) => !page.name.includes("/"))
    .sort((a, b) => {
      // Keep Home first, then sort others alphabetically
      if (a.name === "Home") return -1;
      if (b.name === "Home") return 1;
      return a.name.localeCompare(b.name);
    });

  return (
    <header className={classes["header"]}>
      <Group justify="space-between" align="center" wrap="wrap">
        <Title order={1} className={classes["title"]}>
          {props.title}
        </Title>
        <nav>
          <Group gap="md">
            {topLevelPages.map((page) => {
              // Standardize comparisons since /Home is equivalent to / in some contexts
              const isActive =
                currentPath === page.route ||
                (page.route === "/Home" && currentPath === "/");

              return (
                <Anchor
                  key={page.name}
                  component={Link}
                  to={page.route}
                  className={`${classes["nav-link"]} ${isActive ? classes["nav-link-active"] : ""}`}
                  data-text={page.name}
                >
                  {page.name}
                </Anchor>
              );
            })}
            <ThemeToggle />
          </Group>
        </nav>
      </Group>
    </header>
  );
}
