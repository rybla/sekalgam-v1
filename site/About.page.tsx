import { Text, Title } from "@mantine/core";
import classes from "@site/About.page.module.css";

/**
 * Renders the About page.
 * @returns The rendered About page component.
 */
export default function AboutPage() {
  return (
    <div className={classes["page"]}>
      <Title>
        <Text>About</Text>
      </Title>
    </div>
  );
}
