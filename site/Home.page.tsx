import { Text, Title } from "@mantine/core";
import classes from "@site/Home.page.module.css";

/**
 * Renders the Home page.
 * @returns The rendered Home page component.
 */
export default function HomePage() {
  return (
    <div className={classes["page"]}>
      <Title>
        <Text>Home</Text>
      </Title>
    </div>
  );
}
