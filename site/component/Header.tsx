import { Text } from "@mantine/core";
import classes from "@site/component/Header.module.css";

/**
 * Renders the application header.
 * @param props The component props.
 * @param props.title The title text to display in the header.
 * @returns The rendered header component.
 */
export function Header(props: { title: string }) {
  return (
    <div className={classes["header"]}>
      <Text>{props.title}</Text>
    </div>
  );
}
