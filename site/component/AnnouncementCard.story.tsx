import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AnnouncementCard from "@site/component/AnnouncementCard";

const meta: Meta<typeof AnnouncementCard> = {
  title: "Component/AnnouncementCard",
  component: AnnouncementCard,
  decorators: [
    (Story) => (
      <Box p="xl" maw={500} mx="auto">
        <Story />
      </Box>
    ),
  ],
  args: {
    title: "System Upgrade to Mantine v9",
    date: "July 10, 2026",
    tags: ["Infrastructure", "UI/UX", "Frontend"],
    description:
      "We have successfully migrated our entire component library to Mantine v9. This brings major performance boosts, cleaner styles APIs, and full support for modern CSS variables.",
  },
};

export default meta;
type Story = StoryObj<typeof AnnouncementCard>;

export const Default: Story = {};

export const ManyTags: Story = {
  args: {
    title: "Feature Launch: New Developer Console",
    date: "August 1, 2026",
    tags: ["Feature", "DevEx", "Console", "Cloud", "Beta"],
    description:
      "The new developer console is now live! Experience real-time log streaming, automated schema drift alerts, and direct integration with your existing GitHub action workflows.",
  },
};
