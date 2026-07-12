import { Text, Typography } from "@mantine/core";
import classes from "@site/Home.page.module.css";
import { NormalLayout } from "@site/layout/NormalLayout";

/**
 * Renders the Home page.
 * @returns The rendered Home page component.
 */
export default function HomePage() {
  return (
    <NormalLayout title={"Home"}>
      <Text>
        <Typography>
          <p>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          </p>
          <p className={classes["pop-out"]}>{"This is a pop-out!"}</p>
          <p>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          </p>
        </Typography>
      </Text>
    </NormalLayout>
  );
}
