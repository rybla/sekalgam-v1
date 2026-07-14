import { Anchor, Stack, Title } from "@mantine/core";
import classes from "@site/Home.page.module.css";
import ArticleLayout from "@site/layout/ArticleLayout";
import { Link } from "react-router-dom";
import { pages } from "@site/meta";

/**
 * Renders the Home page.
 * @returns The rendered Home page component.
 */
export default function HomePage() {
  return (
    <ArticleLayout title="Home">
      <Title order={2}>Pages</Title>
      <Stack gap="md">
        {Object.values(pages).map((page) => (
          <Anchor
            key={page.name}
            component={Link}
            to={page.route}
            className={classes["page-link"]}
          >
            {page.name}
          </Anchor>
        ))}
      </Stack>
    </ArticleLayout>
  );
}
