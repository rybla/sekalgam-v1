import { CodeHighlight } from "@mantine/code-highlight";
import {
  Badge,
  Button,
  Card,
  Code,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  Typography,
} from "@mantine/core";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CodeIcon,
  CpuIcon,
  GaugeIcon,
  GearIcon,
  InfoIcon,
  LightningIcon,
  MegaphoneIcon,
  PackageIcon,
  PlayIcon,
  ShieldCheckIcon,
  TerminalIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import LoadingBar from "@site/component/LoadingBar";
import RandomWheel from "@site/component/RandomWheel";
import SearchableList from "@site/component/SearchableList";
import classes from "@site/Demo.page.module.css";
import DashboardLayout from "@site/layout/DashboardLayout";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "action" | "success" | "warn";
  message: string;
}

/**
 * Renders the Demo page.
 * @returns The rendered Demo page component.
 */
export default function DemoPage() {
  const [progress, setProgress] = useState(0.45);
  const [isSimulating, setIsSimulating] = useState(false);
  const [wheelSelection, setWheelSelection] = useState<string | null>(null);

  // Advanced dashboard console logs state (using lazy initialization to prevent Date calls in render)
  const [logs, setLogs] = useState<LogEntry[]>(() => [
    {
      id: "init-console",
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "Console initialized. System telemetry standing by.",
    },
    {
      id: "init-modules",
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "Detected 3 custom interactive modules on board.",
    },
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const loggedThresholdsRef = useRef<Record<number, boolean>>({});

  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
      },
    ]);
  };

  // Build simulator timer effect
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

  // Decoupled log observer for progress milestones (eliminates synchronous setState warnings)
  useEffect(() => {
    if (!isSimulating) {
      loggedThresholdsRef.current = {};
      return;
    }

    const percent = Math.round(progress * 100);

    const checkAndLog = (
      threshold: number,
      message: string,
      type: LogEntry["type"] = "info"
    ) => {
      if (percent >= threshold && !loggedThresholdsRef.current[threshold]) {
        loggedThresholdsRef.current[threshold] = true;
        addLog(message, type);
      }
    };

    checkAndLog(
      1,
      "INFO: Initializing compiler and loading environment...",
      "info"
    );
    checkAndLog(
      20,
      "INFO: Analyzing project dependencies (155 modules)...",
      "info"
    );
    checkAndLog(
      40,
      "COMPILE: Transpiling site/Demo.page.tsx and component modules...",
      "info"
    );
    checkAndLog(
      60,
      "BUNDLE: Generating CSS modules, applying autoContrast...",
      "info"
    );
    checkAndLog(80, "TEST: Executing 19 Vitest storybook tests...", "info");
    checkAndLog(
      96,
      "BUNDLE: Optimizing production bundles & tree-shaking...",
      "info"
    );
    checkAndLog(
      100,
      "SUCCESS: Build completed successfully! 19 tests passed.",
      "success"
    );
  }, [progress, isSimulating]);

  const handleWheelSelect = (option: string) => {
    setWheelSelection(option);
    addLog(`WHEEL: Activity selection changed to "${option}"`, "action");

    if (option === "Simulate Build") {
      addLog("Starting automated build process via Activity Wheel...", "info");
      setProgress(0);
      setIsSimulating(true);
    } else if (option === "Explore About") {
      addLog(
        "RECOMMENDATION: Navigate to the About Page to read about our mission.",
        "success"
      );
    } else if (option === "Read Announcements") {
      addLog(
        "RECOMMENDATION: Read the Announcements to stay updated.",
        "success"
      );
    } else if (option === "Study Mantine Docs") {
      addLog("RECOMMENDATION: Visit the external Mantine Docs.", "info");
    } else if (option === "Take a break ☕") {
      addLog("RECOMMENDATION: Relax and grab a coffee!", "success");
    } else if (option === "Spin Again!") {
      addLog("RECOMMENDATION: Give the wheel another spin!", "warn");
    }
  };

  const handleSliderChange = (val: number) => {
    setIsSimulating(false);
    setProgress(val);
  };

  const handleSliderChangeEnd = (val: number) => {
    addLog(
      `Manual override: Progress set to ${Math.round(val * 100)}%`,
      "warn"
    );
  };

  const handleSimulateClick = () => {
    addLog(
      "Manually triggered: Starting automated build simulation...",
      "info"
    );
    setProgress(0);
    setIsSimulating(true);
  };

  const handleResetClick = () => {
    addLog("Manually triggered: Build progress has been reset.", "warn");
    setIsSimulating(false);
    setProgress(0);
  };

  const handleClearLogs = () => {
    setLogs([
      {
        id: "cleared-console",
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: "Console cleared by administrator.",
      },
    ]);
  };

  const wheelOptions = [
    "Explore About",
    "Read Announcements",
    "Simulate Build",
    "Study Mantine Docs",
    "Take a break ☕",
    "Spin Again!",
  ];

  // Build simulation current task label
  const getProgressStage = (p: number) => {
    if (p === 0) return "Ready to start build.";
    if (p < 0.15) return "Initializing environment...";
    if (p < 0.35) return "Analyzing dependency graph...";
    if (p < 0.55) return "Transpiling page & components...";
    if (p < 0.75) return "Compiling CSS modules...";
    if (p < 0.95) return "Running Vitest stories...";
    if (p < 1) return "Optimizing bundles...";
    return "Build successful! Production-ready.";
  };

  // Dashboard Stats Definitions
  const stats = [
    {
      title: "SYSTEM STATUS",
      value: "Operational",
      sub: "All services online",
      color: "teal",
      icon: <ShieldCheckIcon size={20} />,
    },
    {
      title: "TEST COVERAGE",
      value: "100%",
      sub: "19 / 19 tests passed",
      color: "blue",
      icon: <TerminalIcon size={20} />,
    },
    {
      title: "BUILD STATUS",
      value: isSimulating
        ? "Compiling"
        : progress === 1
          ? "Success"
          : "Healthy",
      sub: isSimulating ? "Build is in progress..." : "Optimized bundles ready",
      color: isSimulating ? "yellow" : "green",
      icon: <LightningIcon size={20} />,
    },
    {
      title: "DIRECTORY INDEX",
      value: "5 Resources",
      sub: "Fuzzy-search enabled",
      color: "pink",
      icon: <PackageIcon size={20} />,
    },
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
    <DashboardLayout title={"Demo"}>
      <Stack gap="xl" p="xl">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Text>
            <Typography>
              <p>
                Welcome to the interactive showcase of our custom components!
                Here you can see our component library in action, including our
                customized progress indicator, an interactive wheel of fortune
                spinner, and a robust fuzzy-searchable resource index.
              </p>
            </Typography>
          </Text>
          <Group gap="xs" className={classes["nowrap-group"]} visibleFrom="sm">
            <Badge size="md" color="blue" variant="light">
              Env: dev
            </Badge>
            <Badge size="md" color="green" variant="light">
              Online
            </Badge>
          </Group>
        </Group>

        {/* 1. KEY PERFORMANCE INDICATORS GRID */}
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
          {stats.map((stat) => (
            <Paper
              key={stat.title}
              withBorder
              p="md"
              radius="md"
              className={classes["stat-card"]}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Stack gap={0}>
                  <Text
                    size="xs"
                    c="dimmed"
                    fw={700}
                    className={classes["stat-title"]}
                  >
                    {stat.title}
                  </Text>
                  <Text size="xl" fw={700} mt={4}>
                    {stat.value}
                  </Text>
                </Stack>
                <ThemeIcon
                  color={stat.color}
                  variant="light"
                  size="xl"
                  radius="md"
                >
                  {stat.icon}
                </ThemeIcon>
              </Group>
              <Text size="xs" c="dimmed" mt="xs">
                {stat.sub}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>

        <Divider
          label={
            <Group gap={6}>
              <GaugeIcon size={16} />
              <Text fw={500} size="xs">
                Control Center
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        {/* 2. MAIN ASYMMETRIC GRID LAYOUT */}
        <Grid gap="xl">
          {/* Main Column (8 of 12 spans) */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              {/* Build Simulator Panel */}
              <Paper
                withBorder
                p="xl"
                radius="md"
                className={classes["showcase-paper"]}
              >
                <Stack gap="lg" h="100%" justify="space-between">
                  <Stack gap="xs">
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <CpuIcon
                          size={20}
                          color="var(--mantine-color-blue-filled)"
                        />
                        <Title order={3} className={classes["section-title"]}>
                          Automated Build Simulator
                        </Title>
                      </Group>
                      {isSimulating && (
                        <Badge color="yellow" variant="light">
                          Compiling...
                        </Badge>
                      )}
                    </Group>
                    <Text size="sm" c="dimmed">
                      Trigger background build pipelines and monitor completion.
                      Adjust the slider for manual override or spin the decision
                      helper wheel.
                    </Text>
                  </Stack>

                  <Stack gap="md" py="xs">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Text
                          size="sm"
                          fw={600}
                          className={classes["progress-label"]}
                        >
                          Stage:
                        </Text>
                        <Text size="sm" fw={600} c="blue">
                          {getProgressStage(progress)}
                        </Text>
                      </Group>
                      <Text size="sm" fw={700} c="blue">
                        {Math.round(progress * 100)}%
                      </Text>
                    </Group>

                    <LoadingBar progress={progress} />

                    <Stack gap={4}>
                      <Text size="xs" c="dimmed">
                        Manual pipeline control (click & drag to adjust value):
                      </Text>
                      <Slider
                        value={progress}
                        onChange={handleSliderChange}
                        onChangeEnd={handleSliderChangeEnd}
                        min={0}
                        max={1}
                        step={0.01}
                        label={(val) => `${Math.round(val * 100)}%`}
                        color="blue"
                      />
                    </Stack>
                  </Stack>

                  <Group gap="sm">
                    <Button
                      onClick={handleSimulateClick}
                      disabled={isSimulating}
                      variant="light"
                      leftSection={<PlayIcon size={16} />}
                      flex={1}
                    >
                      Start Build
                    </Button>
                    <Button
                      onClick={handleResetClick}
                      variant="default"
                      leftSection={<ArrowClockwiseIcon size={16} />}
                      flex={1}
                    >
                      Reset
                    </Button>
                  </Group>
                </Stack>
              </Paper>

              {/* Developer Live Terminal Console */}
              <Paper
                withBorder
                p="md"
                radius="md"
                className={classes["dark-paper"]}
              >
                <Stack gap="xs">
                  <Group justify="space-between" align="center">
                    <Group gap="xs">
                      <TerminalIcon
                        size={18}
                        color="var(--mantine-color-teal-filled)"
                      />
                      <Text
                        fw={700}
                        size="sm"
                        className={classes["white-text"]}
                      >
                        Live Operational Feed
                      </Text>
                      <Badge color="teal" size="xs" variant="dot">
                        Live Feed
                      </Badge>
                    </Group>
                    <Tooltip label="Clear terminal feed" position="left">
                      <Button
                        onClick={handleClearLogs}
                        variant="subtle"
                        color="gray"
                        size="xs"
                        px={4}
                        className={classes["clear-btn"]}
                      >
                        <TrashIcon size={14} />
                      </Button>
                    </Tooltip>
                  </Group>

                  <div className={classes["terminal-console"]}>
                    <ScrollArea h={120} type="auto">
                      <div className={classes["terminal-viewport"]}>
                        {logs.map((log) => (
                          <div
                            key={log.id}
                            className={classes["terminal-line"]}
                          >
                            <span className={classes["terminal-line-time"]}>
                              [{log.timestamp}]
                            </span>
                            <span
                              className={classes[`terminal-line-${log.type}`]}
                            >
                              {log.message}
                            </span>
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                      </div>
                    </ScrollArea>
                  </div>
                </Stack>
              </Paper>

              {/* Fuzzy Searchable Navigation Directory */}
              <Paper withBorder p="xl" radius="md">
                <Stack gap="md">
                  <Group gap="xs">
                    <GearIcon
                      size={20}
                      color="var(--mantine-color-blue-filled)"
                    />
                    <Title order={3} className={classes["section-title"]}>
                      Fuzzy-Search Navigation Index
                    </Title>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Filter across workspace components, developer tools, custom
                    frameworks, and site pages in real-time.
                  </Text>

                  <SearchableList
                    items={listItems}
                    placeholder="Search resources (e.g. 'about', 'storybook', 'vitest')..."
                    label="Search Directory"
                    noResultsMessage="No matching resources or pages found. Try searching for something else!"
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Sidebar Column (4 of 12 spans) */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl">
              {/* Activity Wheel Paper */}
              <Paper
                withBorder
                p="xl"
                radius="md"
                className={classes["showcase-paper"]}
              >
                <Stack gap="sm">
                  <Group gap="xs">
                    <GearIcon
                      size={20}
                      color="var(--mantine-color-pink-filled)"
                    />
                    <Title order={3} className={classes["section-title"]}>
                      Decision Helper Wheel
                    </Title>
                  </Group>
                  <Text size="sm" c="dimmed" mb="xs">
                    Spin the wheel to select a random development activity. Land
                    on{" "}
                    <Text span fw={600} c="blue">
                      Simulate Build
                    </Text>{" "}
                    to trigger the automated compiler.
                  </Text>

                  <RandomWheel
                    options={wheelOptions}
                    onSelect={handleWheelSelect}
                  />

                  {wheelSelection && (
                    <div className={classes["wheelSelectionContainer"]}>
                      <Text size="xs" c="dimmed">
                        Active Selection:
                      </Text>
                      <Text size="sm" fw={700} c="pink" mt={2}>
                        {wheelSelection}
                      </Text>

                      {wheelSelection === "Simulate Build" && (
                        <Badge color="blue" variant="dot" mt={4}>
                          Automated compile in progress...
                        </Badge>
                      )}
                      {wheelSelection === "Explore About" && (
                        <Button
                          component={Link}
                          to="/About"
                          size="xs"
                          variant="light"
                          mt={8}
                          rightSection={<ArrowRightIcon size={12} />}
                          fullWidth
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
                          mt={8}
                          rightSection={<ArrowRightIcon size={12} />}
                          fullWidth
                        >
                          Visit Announcements
                        </Button>
                      )}
                    </div>
                  )}
                </Stack>
              </Paper>

              {/* Developer Environment & Quick Tips Card */}
              <Paper
                withBorder
                p="xl"
                radius="md"
                className={classes["tip-card"]}
              >
                <Stack gap="md">
                  <Group gap="xs">
                    <CodeIcon
                      size={20}
                      color="var(--mantine-color-blue-filled)"
                    />
                    <Text fw={700} size="md">
                      Developer Quick Reference
                    </Text>
                  </Group>

                  <Divider />

                  <Stack gap="xs">
                    <div>
                      <Text size="xs" fw={700}>
                        Code Validation
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Run <Code>pnpm run validate</Code> to check for types,
                        ESLint rules, dependencies, and formatting.
                      </Text>
                    </div>

                    <div>
                      <Text size="xs" fw={700}>
                        Component Workshop
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Run <Code>pnpm run storybook</Code> to see, configure,
                        and isolate your React component stories.
                      </Text>
                    </div>

                    <div>
                      <Text size="xs" fw={700}>
                        Unit Testing Suite
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Tests are powered by Vitest. Run{" "}
                        <Code>pnpm run test</Code> to run all test files.
                      </Text>
                    </div>

                    <div>
                      <Text size="xs" fw={700}>
                        Theme Consistency
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Always use CSS variables of the form{" "}
                        <Code>--mantine-color-*</Code> for color consistency.
                      </Text>
                    </div>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
