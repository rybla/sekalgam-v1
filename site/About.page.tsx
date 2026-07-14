import { CodeHighlight } from "@mantine/code-highlight";
import {
  Anchor,
  Badge,
  Button,
  Card,
  Code,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  ArrowRightIcon,
  AtomIcon,
  BookOpenIcon,
  CodeIcon,
  CpuIcon,
  GearIcon,
  GithubLogoIcon,
  GlobeIcon,
  LightningIcon,
  PackageIcon,
  PaletteIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import classes from "@site/About.page.module.css";
import ArticleLayout from "@site/layout/ArticleLayout";
import { Link } from "react-router-dom";

interface Technology {
  name: string;
  version: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ size?: number | string; color?: string }>;
  color: string;
  badge: string;
}

const TECHNOLOGIES: Technology[] = [
  {
    name: "React",
    version: "19.2",
    description:
      "Declarative, component-based UI library powering reactive application states.",
    url: "https://react.dev",
    icon: AtomIcon,
    color: "cyan",
    badge: "Frontend Core",
  },
  {
    name: "TypeScript",
    version: "5.9",
    description:
      "Strict syntactical superset of JavaScript providing robust type safety.",
    url: "https://www.typescriptlang.org",
    icon: CodeIcon,
    color: "blue",
    badge: "Language",
  },
  {
    name: "Mantine UI",
    version: "9.4",
    description:
      "Highly accessible, CSS-variables-driven component library and form-state hooks.",
    url: "https://mantine.dev",
    icon: PaletteIcon,
    color: "indigo",
    badge: "Design System",
  },
  {
    name: "Vite",
    version: "8.1",
    description:
      "Ultra-fast local build tool and bundler offering rapid Hot Module Replacement.",
    url: "https://vite.dev",
    icon: LightningIcon,
    color: "yellow",
    badge: "Build Tool",
  },
  {
    name: "Storybook",
    version: "10.5",
    description:
      "Isolated environment for designing, cataloging, and visually testing components.",
    url: "https://storybook.js.org",
    icon: BookOpenIcon,
    color: "pink",
    badge: "Dev Workshop",
  },
  {
    name: "Vitest",
    version: "4.1",
    description:
      "High-performance Jest-compatible test runner utilized for fast unit and DOM tests.",
    url: "https://vitest.dev",
    icon: ShieldCheckIcon,
    color: "green",
    badge: "Testing",
  },
  {
    name: "pnpm",
    version: "11.5",
    description:
      "Fast, disk-space efficient package manager used for handling monorepo dependencies.",
    url: "https://pnpm.io",
    icon: PackageIcon,
    color: "orange",
    badge: "Package Manager",
  },
  {
    name: "Phosphor Icons",
    version: "2.1",
    description:
      "Consistent, beautifully crafted iconography set designed for modern web layouts.",
    url: "https://phosphoricons.com",
    icon: CpuIcon,
    color: "grape",
    badge: "Iconography",
  },
];

/**
 * Renders the About page describing the template project and used technologies.
 * @returns The rendered About page component.
 */
export default function AboutPage() {
  return (
    <ArticleLayout title={"About"}>
      <Stack gap="xl">
        {/* Intro Section */}
        <Stack gap="xs" className={classes["introSection"]}>
          <Title order={2} className={classes["sectionTitle"]}>
            The Sekalgam Boilerplate Template
          </Title>
          <Text size="md" className={classes["subtitle"]}>
            Sekalgam is a highly optimized, fully typed React starter kit and
            monorepo scaffold designed to streamline the construction of
            interactive web interfaces and utility CLI command-line
            applications.
          </Text>
          <Text size="sm" c="dimmed" className={classes["lineHeight15"]}>
            It establishes opinionated boundaries for code reliability,
            featuring pre-configured environments for local sandbox component
            building, unified module boundary auditing, and continuous
            verification.
          </Text>
        </Stack>

        <Divider
          label={
            <Group gap={6}>
              <CpuIcon size={16} />
              <Text
                fw={600}
                size="xs"
                c="dimmed"
                className={classes["uppercaseLabel"]}
              >
                Technology Stack
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        {/* Technology Grid */}
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            This boilerplate template relies on modern, industry-standard web
            frameworks and developer tooling. Hover and click on any technology
            card below to visit its official documentation.
          </Text>

          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="md"
            className={classes["techGrid"]}
          >
            {TECHNOLOGIES.map((tech) => {
              const IconComponent = tech.icon;
              return (
                <Tooltip
                  key={tech.name}
                  label={`Visit official ${tech.name} documentation ↗`}
                  position="top"
                  withArrow
                  openDelay={200}
                >
                  <Card
                    component="a"
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    withBorder
                    padding="md"
                    radius="md"
                    className={classes["techCard"]}
                  >
                    <Stack justify="space-between" h="100%">
                      <Group justify="space-between" align="center">
                        <Group gap="xs">
                          <ThemeIcon
                            color={tech.color}
                            variant="light"
                            size="md"
                            radius="sm"
                          >
                            <IconComponent size={18} />
                          </ThemeIcon>
                          <Text fw={700} size="sm">
                            {tech.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            v{tech.version}
                          </Text>
                        </Group>
                        <Badge color={tech.color} variant="light" size="xs">
                          {tech.badge}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mt="xs">
                        {tech.description}
                      </Text>
                    </Stack>
                  </Card>
                </Tooltip>
              );
            })}
          </SimpleGrid>
        </Stack>

        <Divider
          label={
            <Group gap={6}>
              <GearIcon size={16} />
              <Text
                fw={600}
                size="xs"
                c="dimmed"
                className={classes["uppercaseLabel"]}
              >
                Architecture & Standards
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        {/* Monorepo Architecture */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder radius="md" p="md">
            <Group gap="xs" mb="xs">
              <ThemeIcon color="blue" variant="light">
                <TerminalIcon size={18} />
              </ThemeIcon>
              <Text fw={700} size="sm">
                Workspace Structure
              </Text>
            </Group>
            <Text
              size="xs"
              c="dimmed"
              mb="sm"
              className={classes["lineHeight15"]}
            >
              The project segregates source runtimes to enforce clear separation
              of concerns across boundaries:
            </Text>
            <Stack gap={6}>
              <Group gap="xs">
                <Code>site/</Code>
                <Text size="xs" c="dimmed">
                  React single-page application and UI components.
                </Text>
              </Group>
              <Group gap="xs">
                <Code>exe/</Code>
                <Text size="xs" c="dimmed">
                  Command-line Node.js executables and shell tools.
                </Text>
              </Group>
              <Group gap="xs">
                <Code>src/</Code>
                <Text size="xs" c="dimmed">
                  Shared domain business logic and core helpers.
                </Text>
              </Group>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="md">
            <Group gap="xs" mb="xs">
              <ThemeIcon color="green" variant="light">
                <ShieldCheckIcon size={18} />
              </ThemeIcon>
              <Text fw={700} size="sm">
                Strict Code Verification
              </Text>
            </Group>
            <Text
              size="xs"
              c="dimmed"
              mb="sm"
              className={classes["lineHeight15"]}
            >
              An automated, comprehensive verification pipeline guarantees
              consistent visual layout, code style, formatting, and safety.
            </Text>
            <Stack gap={4}>
              <Text size="xs" c="dimmed" mb={2}>
                Run code validation locally prior to any commit:
              </Text>
              <Group gap="xs">
                <CodeHighlight
                  className={classes["fullWidthCode"]}
                  language="shell"
                  radius="md"
                  code={"pnpm run validate"}
                ></CodeHighlight>
              </Group>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Action Links Footer */}
        <Group
          justify="space-between"
          mt="lg"
          pt="md"
          className={classes["footerDivider"]}
        >
          <Group gap="xs">
            <Anchor
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              c="dimmed"
              size="xs"
            >
              <Group gap={4}>
                <GithubLogoIcon size={14} />
                GitHub Repository
              </Group>
            </Anchor>
            <Text size="xs" c="dimmed">
              |
            </Text>
            <Anchor
              href="https://mantine.dev"
              target="_blank"
              rel="noopener noreferrer"
              c="dimmed"
              size="xs"
            >
              <Group gap={4}>
                <GlobeIcon size={14} />
                Mantine Docs
              </Group>
            </Anchor>
          </Group>

          <Button
            component={Link}
            to="/"
            variant="light"
            size="sm"
            rightSection={<ArrowRightIcon size={16} />}
            className={classes["quickLinkButton"]}
          >
            Back to Interactive Showcase
          </Button>
        </Group>
      </Stack>
    </ArticleLayout>
  );
}
