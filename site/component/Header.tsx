import { Text } from "@mantine/core";
import classes from "@site/component/Header.module.css";

/**
 *
 * @param props
 * @param props.title
 */
export function Header(props: { title: string }) {
  return (
    <div className={classes["header"]}>
      <Text>{props.title}</Text>
    </div>
  );
}
