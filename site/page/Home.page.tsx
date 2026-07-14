import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  ArrowRightIcon,
  HouseIcon,
  InfoIcon,
  MegaphoneIcon,
  GameControllerIcon,
  CpuIcon,
  type Icon,
} from "@phosphor-icons/react";
import classes from "@site/page/Home.page.module.css";
import ArticleLayout from "@site/layout/ArticleLayout";
import { Link } from "react-router-dom";
import { pages } from "@site/meta";

interface PageMeta {
  description: string;
  icon: Icon;
  color: string;
  badge: string;
}

const PAGE_META: Record<keyof typeof pages, PageMeta> = {
  Home: {
    description:
      "The central landing page and navigational directory of the website.",
    icon: HouseIcon,
    color: "blue",
    badge: "Core",
  },
  About: {
    description:
      "Learn more about the Sekalgam boilerplate template, tech stack, and workspace architectures.",
    icon: InfoIcon,
    color: "indigo",
    badge: "System",
  },
  "About/Announcements": {
    description:
      "Stay up to date with the latest news, releases, and developments of the Sekalgam project.",
    icon: MegaphoneIcon,
    color: "pink",
    badge: "Updates",
  },
  Demo: {
    description:
      "Explore interactive state synchronization, live performance showcase, and utility components.",
    icon: GameControllerIcon,
    color: "teal",
    badge: "Interactive",
  },
};

const DEFAULT_META: PageMeta = {
  description: "Explore this page in the Sekalgam application.",
  icon: CpuIcon,
  color: "gray",
  badge: "Page",
};

/**
 * Renders the Home page.
 * @returns The rendered Home page component.
 */
export default function HomePage() {
  const sortedPages = Object.values(pages).sort((a, b) => {
    // Keep Home first, then sort others alphabetically
    if (a.name === "Home") return -1;
    if (b.name === "Home") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <ArticleLayout title="Home">
      <Stack gap="xl" className={classes["container"]}>
        {/* Intro Section */}
        <Stack gap="xs" className={classes["introSection"]}>
          <Title order={2} className={classes["sectionTitle"]}>
            Welcome to Sekalgam
          </Title>
          <Text size="md" className={classes["subtitle"]}>
            A highly optimized, fully typed React starter kit and monorepo
            boilerplate template. Explore the main sections of the website
            below.
          </Text>
        </Stack>

        {/* Directory Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {sortedPages.map((page) => {
            const meta = PAGE_META[page.name] || DEFAULT_META;
            const IconComponent = meta.icon;

            return (
              <Card
                key={page.name}
                component={Link}
                to={page.route}
                withBorder
                padding="lg"
                radius="md"
                className={classes["pageCard"]}
              >
                <Group
                  justify="space-between"
                  align="flex-start"
                  wrap="nowrap"
                  h="100%"
                >
                  <Group
                    gap="md"
                    align="flex-start"
                    wrap="nowrap"
                    className={classes["cardContent"]}
                  >
                    <ThemeIcon
                      color={meta.color}
                      variant="light"
                      size="xl"
                      radius="md"
                      className={classes["iconWrapper"]}
                    >
                      <IconComponent size={24} weight="duotone" />
                    </ThemeIcon>
                    <Stack gap={4} className={classes["textContainer"]}>
                      <Group gap="xs" align="center">
                        <Text
                          fw={700}
                          size="sm"
                          className={classes["cardTitle"]}
                        >
                          {page.name}
                        </Text>
                        <Badge color={meta.color} variant="light" size="xs">
                          {meta.badge}
                        </Badge>
                      </Group>
                      <Text
                        size="xs"
                        c="dimmed"
                        className={classes["cardDescription"]}
                      >
                        {meta.description}
                      </Text>
                    </Stack>
                  </Group>
                  <ArrowRightIcon size={16} className={classes["arrowIcon"]} />
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </ArticleLayout>
  );
}
