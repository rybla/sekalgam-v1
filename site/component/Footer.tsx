import { Text } from "@mantine/core";
import classes from "@site/component/Footer.module.css";

/**
 *
 * @param props
 * @param props.title
 */
export function Footer(props: { title: string }) {
  return (
    <div className={classes["footer"]}>
      <Text>{props.title}</Text>
    </div>
  );
}
