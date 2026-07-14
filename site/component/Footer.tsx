import { Anchor, Group, Stack, Text } from "@mantine/core";
import packageInfo from "@package.json";
import {
  ArrowUpIcon,
  GithubLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import classes from "@site/component/Footer.module.css";
import { ThemeToggle } from "@site/component/ThemeToggle";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Renders the application footer with social links and scroll to top capability.
 * @param props The component props.
 * @param props.title The title text to display in the footer.
 * @returns The rendered footer component.
 */
export function Footer(props: { title: string }) {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={classes["footer"]}>
      <Group
        justify="space-between"
        align="center"
        className={classes["content"]}
        wrap="wrap"
      >
        <Stack gap={4}>
          <Text className={classes["title"]}>{props.title}</Text>
          <Text className={classes["copyright"]}>
            © {CURRENT_YEAR} {packageInfo.name}. All rights reserved.
          </Text>
        </Stack>

        <Group gap="xl" wrap="wrap">
          <Group gap="md">
            <Anchor
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes["link"]}
            >
              <Group gap={4} align="center">
                <TwitterLogoIcon size={16} />
                <Text size="sm">X.com</Text>
              </Group>
            </Anchor>
            <Anchor
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes["link"]}
            >
              <Group gap={4} align="center">
                <GithubLogoIcon size={16} />
                <Text size="sm">GitHub</Text>
              </Group>
            </Anchor>
            <Anchor
              href="#top"
              onClick={handleScrollToTop}
              className={classes["top-link"]}
            >
              <Group gap={4} align="center">
                <ArrowUpIcon size={16} />
                <Text size="sm">Back to top</Text>
              </Group>
            </Anchor>
          </Group>

          <ThemeToggle />
        </Group>
      </Group>
    </footer>
  );
}
