import { Text } from "@mantine/core";
import classes from "@site/component/Footer.module.css";

/**
 * Renders the application footer.
 * @param props The component props.
 * @param props.title The title text to display in the footer.
 * @returns The rendered footer component.
 */
export function Footer(props: { title: string }) {
  return (
    <div className={classes["footer"]}>
      <Text>{props.title}</Text>
    </div>
  );
}
