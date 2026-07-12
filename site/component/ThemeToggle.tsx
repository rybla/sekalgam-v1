import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import classes from "@site/component/ThemeToggle.module.css";

/**
 * A theme toggle button component that switches between light and dark color schemes.
 * @returns The rendered theme toggle component.
 */
export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      className={classes["component"]}
    >
      {dark ? (
        <SunIcon size={20} className={classes["icon"]} />
      ) : (
        <MoonIcon size={20} className={classes["icon"]} />
      )}
    </ActionIcon>
  );
}
