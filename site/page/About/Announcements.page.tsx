import { InlineCodeHighlight } from "@mantine/code-highlight";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import AnnouncementCard from "@site/component/AnnouncementCard";
import ArticleLayout from "@site/layout/ArticleLayout";
import classes from "@site/page/About.page.module.css";
import type { ReactNode } from "react";

interface Announcement {
  id: string;
  title: ReactNode;
  tags: string[];
  date: string;
  description: ReactNode;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "system-upgrade-to-mantine-v9",
    title: <>System Upgrade to Mantine v9</>,
    tags: ["Infrastructure", "UI/UX", "Frontend"],
    date: "July 10, 2026",
    description: (
      <>
        We have successfully migrated our entire component library to Mantine
        v9. This brings major performance boosts, cleaner styles APIs, and full
        support for modern CSS variables.
      </>
    ),
  },
  {
    id: "storybook-integration-completed",
    title: <>Storybook Integration Completed</>,
    tags: ["DevEx", "Testing", "Documentation"],
    date: "July 5, 2026",
    description: (
      <>
        Our core UI components now have fully configured Storybook stories. You
        can view, configure, and test custom components in isolation by running{" "}
        <InlineCodeHighlight language="shell" code="pnpm run storybook" />.
      </>
    ),
  },
  {
    id: "fuzzy-searchable-navigation-added",
    title: <>Fuzzy-Searchable Navigation Added</>,
    tags: ["Features", "UX"],
    date: "June 28, 2026",
    description: (
      <>
        Finding resources across our ecosystem is now faster than ever. We've
        introduced a fuzzy-searchable quick navigation directory powered by the
        fast-fuzzy engine.
      </>
    ),
  },
  {
    id: "automated-verification-pipeline-enabled",
    title: <>Automated Verification Pipeline Enabled</>,
    tags: ["CI/CD", "Quality Assurance"],
    date: "June 20, 2026",
    description: (
      <>
        We have integrated a comprehensive validation suite running ESLint,
        Stylelint, TypeScript checks, and Vitest browser stories to ensure code
        stability on every commit.
      </>
    ),
  },
];

/**
 * Renders the About page.
 * @returns The rendered About page component.
 */
export default function AboutPage() {
  return (
    <ArticleLayout title={"Announcements"}>
      <Stack gap="xl" className={classes["container"]}>
        <Text size="md" c="dimmed">
          Stay up to date with the latest news, releases, and developments of
          the Sekalgam project.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {ANNOUNCEMENTS.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              date={announcement.date}
              tags={announcement.tags}
              description={announcement.description}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </ArticleLayout>
  );
}
