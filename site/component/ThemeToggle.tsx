import { useMantineColorScheme } from "@mantine/core";
import classes from "@site/component/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return <div className={classes["component"]}>{/* [TODO] */}</div>;
}
