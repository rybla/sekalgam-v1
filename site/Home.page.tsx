import { CodeHighlight } from "@mantine/code-highlight";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Title,
  Typography,
} from "@mantine/core";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CpuIcon,
  GaugeIcon,
  GearIcon,
  InfoIcon,
  LightningIcon,
  MegaphoneIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import LoadingBar from "@site/component/LoadingBar";
import RandomWheel from "@site/component/RandomWheel";
import SearchableList from "@site/component/SearchableList";
import classes from "@site/Home.page.module.css";
import ArticleLayout from "@site/layout/ArticleLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Renders the Home page.
 * @returns The rendered Home page component.
 */
export default function HomePage() {
  const [progress, setProgress] = useState(0.45);
  const [isSimulating, setIsSimulating] = useState(false);
  const [wheelSelection, setWheelSelection] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isSimulating) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsSimulating(false);
            clearInterval(intervalId);
            return 1;
          }
          return Math.min(1, prev + 0.02);
        });
      }, 50);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSimulating]);

  const handleWheelSelect = (option: string) => {
    setWheelSelection(option);
    if (option === "Simulate Build") {
      setProgress(0);
      setIsSimulating(true);
    }
  };

  const handleSliderChange = (val: number) => {
    setIsSimulating(false);
    setProgress(val);
  };

  const handleSimulateClick = () => {
    setProgress(0);
    setIsSimulating(true);
  };

  const handleResetClick = () => {
    setIsSimulating(false);
    setProgress(0);
  };

  const wheelOptions = [
    "Explore About",
    "Read Announcements",
    "Simulate Build",
    "Study Mantine Docs",
    "Take a break ☕",
    "Spin Again!",
  ];

  const listItems = [
    {
      key: "About Page - Learn about our mission and project background",
      element: (
        <Card
          withBorder
          padding="md"
          radius="md"
          className={classes["item-card"]}
        >
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <InfoIcon size={24} color="var(--mantine-color-blue-filled)" />
              <Text fw={700} size="lg">
                About Page
              </Text>
            </Group>
            <Badge color="blue" variant="light">
              Site Page
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Learn more about the purpose of this project, our vision, and the
            core development team.
          </Text>
          <Button
            component={Link}
            to="/About"
            variant="outline"
            rightSection={<ArrowRightIcon size={16} />}
          >
            Go to About
          </Button>
        </Card>
      ),
    },
    {
      key: "Announcements - Stay updated with our latest news and features",
      element: (
        <Card
          withBorder
          padding="md"
          radius="md"
          className={classes["item-card"]}
        >
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <MegaphoneIcon
                size={24}
                color="var(--mantine-color-teal-filled)"
              />
              <Text fw={700} size="lg">
                Announcements
              </Text>
            </Group>
            <Badge color="teal" variant="light">
              Site Page
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Check out the latest news, system updates, releases, and important
            announcements.
          </Text>
          <Button
            component={Link}
            to="/Announcements"
            variant="outline"
            color="teal"
            rightSection={<ArrowRightIcon size={16} />}
          >
            Go to Announcements
          </Button>
        </Card>
      ),
    },
    {
      key: "Storybook - View and test custom components in isolation",
      element: (
        <Card
          withBorder
          padding="md"
          radius="md"
          className={classes["item-card"]}
        >
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <BookOpenIcon
                size={24}
                color="var(--mantine-color-pink-filled)"
              />
              <Text fw={700} size="lg">
                Storybook Stories
              </Text>
            </Group>
            <Badge color="pink" variant="light">
              Dev Tool
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Browse our component catalog in isolation. Run{" "}
            <CodeHighlight
              language="shell"
              radius="md"
              code={"pnpm run storybook"}
            ></CodeHighlight>{" "}
            in your terminal to open the UI workshop.
          </Text>
        </Card>
      ),
    },
    {
      key: "Mantine UI Framework - Comprehensive collection of components",
      element: (
        <Card
          withBorder
          padding="md"
          radius="md"
          className={classes["item-card"]}
        >
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <LightningIcon
                size={24}
                color="var(--mantine-color-orange-filled)"
              />
              <Text fw={700} size="lg">
                Mantine Core
              </Text>
            </Group>
            <Badge color="orange" variant="light">
              Framework
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            We use Mantine UI for beautiful, accessible, and themeable React
            components, hooks, and form state management.
          </Text>
          <Button
            component="a"
            href="https://mantine.dev"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            color="orange"
            rightSection={<ArrowRightIcon size={16} />}
          >
            Mantine Docs
          </Button>
        </Card>
      ),
    },
    {
      key: "Vitest - High-performance testing with Jest compatibility",
      element: (
        <Card
          withBorder
          padding="md"
          radius="md"
          className={classes["item-card"]}
        >
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <GearIcon size={24} color="var(--mantine-color-violet-filled)" />
              <Text fw={700} size="lg">
                Vitest Runner
              </Text>
            </Group>
            <Badge color="violet" variant="light">
              Testing
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Vitest is our modern, fast test runner configured to run Unit and
            Storybook integration tests.
          </Text>
        </Card>
      ),
    },
  ];

  return (
    <ArticleLayout title={"Home"}>
      <Stack gap="xl">
        <Text>
          <Typography>
            <p>
              {
                "Welcome to the interactive showcase of our custom components! Here you can see our component library in action, including our customized progress indicator, an interactive wheel of fortune spinner, and a robust fuzzy-searchable resource index."
              }
            </p>
          </Typography>
        </Text>

        <Divider
          label={
            <Group gap={6}>
              <CpuIcon size={16} />
              <Text fw={500} size="xs">
                Interactive Showcase
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* Wheel Card */}
          <Paper
            withBorder
            p="xl"
            radius="md"
            className={classes["showcase-paper"]}
          >
            <Stack gap="sm">
              <Title order={3} className={classes["section-title"]}>
                Activity Wheel of Fortune
              </Title>
              <Text size="sm" c="dimmed">
                Spin the wheel to choose a random developer activity. If it
                lands on{" "}
                <Text span fw={600} c="blue">
                  Simulate Build
                </Text>
                , it will trigger the progress bar simulation on the right!
              </Text>

              <RandomWheel
                options={wheelOptions}
                onSelect={handleWheelSelect}
              />

              {wheelSelection && (
                <div className={classes["wheelSelectionContainer"]}>
                  <Text size="sm">
                    Last choice selection:{" "}
                    <Text span fw={700} c="blue">
                      {wheelSelection}
                    </Text>
                  </Text>
                  {wheelSelection === "Simulate Build" && (
                    <Badge color="blue" variant="dot" mt={4}>
                      Simulating progress...
                    </Badge>
                  )}
                  {wheelSelection === "Explore About" && (
                    <Button
                      component={Link}
                      to="/About"
                      size="xs"
                      variant="light"
                      mt={6}
                      rightSection={<ArrowRightIcon size={12} />}
                    >
                      Visit About Page
                    </Button>
                  )}
                  {wheelSelection === "Read Announcements" && (
                    <Button
                      component={Link}
                      to="/Announcements"
                      size="xs"
                      variant="light"
                      color="teal"
                      mt={6}
                      rightSection={<ArrowRightIcon size={12} />}
                    >
                      Visit Announcements
                    </Button>
                  )}
                </div>
              )}
            </Stack>
          </Paper>

          {/* LoadingBar Card */}
          <Paper
            withBorder
            p="xl"
            radius="md"
            className={classes["showcase-paper"]}
          >
            <Stack gap="lg" h="100%" justify="space-between">
              <Stack gap="xs">
                <Title order={3} className={classes["section-title"]}>
                  Simulated Progress Tracker
                </Title>
                <Text size="sm" c="dimmed">
                  This card features our custom loading indicator. You can use
                  the controls below to run a simulated background operation, or
                  adjust the slider to manually control the progress value.
                </Text>
              </Stack>

              <Stack gap="md" py="xl">
                <Group justify="space-between">
                  <Text
                    size="sm"
                    fw={600}
                    className={classes["progress-label"]}
                  >
                    Task Completion
                  </Text>
                  <Text size="sm" fw={700} c="blue">
                    {Math.round(progress * 100)}%
                  </Text>
                </Group>

                <LoadingBar progress={progress} />

                <Stack gap={4}>
                  <Text size="xs" c="dimmed">
                    Manual override:
                  </Text>
                  <Slider
                    value={progress}
                    onChange={handleSliderChange}
                    min={0}
                    max={1}
                    step={0.01}
                    label={(val) => `${Math.round(val * 100)}%`}
                    color="blue"
                  />
                </Stack>
              </Stack>

              <Group gap="sm" mt="auto">
                <Button
                  onClick={handleSimulateClick}
                  disabled={isSimulating}
                  variant="light"
                  leftSection={<PlayIcon size={16} />}
                  flex={1}
                >
                  Start Build
                </Button>
                <Button onClick={handleResetClick} variant="default" flex={1}>
                  Reset
                </Button>
              </Group>
            </Stack>
          </Paper>
        </SimpleGrid>

        <Divider
          label={
            <Group gap={6}>
              <GaugeIcon size={16} />
              <Text fw={500} size="xs">
                Resource Index & Fuzzy Search
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        {/* SearchableList component */}
        <Paper withBorder p="xl" radius="md">
          <Stack gap="md">
            <Title order={3} className={classes["section-title"]}>
              Quick Navigation Directory
            </Title>
            <Text size="sm" c="dimmed" mb="sm">
              Use the fuzzy search input below to filter site links,
              documentation pages, and developer tool summaries. Powered by our
              custom SearchableList component.
            </Text>

            <SearchableList
              items={listItems}
              placeholder="Type to search pages, frameworks, or tools (e.g. 'about', 'mantine', 'storybook')..."
              label="Search Directory"
              noResultsMessage="No matching resources or pages found. Try searching for something else!"
            />
          </Stack>
        </Paper>
      </Stack>
    </ArticleLayout>
  );
}
