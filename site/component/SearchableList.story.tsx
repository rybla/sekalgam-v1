import { Badge, Box, Card, Group, Text } from "@mantine/core";
import {
  GameControllerIcon,
  MusicNotesIcon,
  PaletteIcon,
} from "@phosphor-icons/react";
import SearchableList from "@site/component/SearchableList";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sampleHobbies = [
  {
    key: "Gaming",
    element: (
      <Card withBorder radius="md" p="sm">
        <Group gap="sm">
          <GameControllerIcon
            size={24}
            color="var(--mantine-color-blue-filled)"
          />
          <Box>
            <Text fw={600} size="sm">
              Gaming
            </Text>
            <Text size="xs" c="gray.7">
              Playing role-playing games, strategy, and esports.
            </Text>
          </Box>
        </Group>
      </Card>
    ),
  },
  {
    key: "Painting & Art",
    element: (
      <Card withBorder radius="md" p="sm">
        <Group gap="sm">
          <PaletteIcon size={24} color="var(--mantine-color-teal-filled)" />
          <Box>
            <Text fw={600} size="sm">
              Painting & Art
            </Text>
            <Text size="xs" c="gray.7">
              Watercolors, oil paintings, and digital sketching.
            </Text>
          </Box>
        </Group>
      </Card>
    ),
  },
  {
    key: "Music Production",
    element: (
      <Card withBorder radius="md" p="sm">
        <Group gap="sm">
          <MusicNotesIcon size={24} color="var(--mantine-color-pink-filled)" />
          <Box>
            <Text fw={600} size="sm">
              Music Production
            </Text>
            <Text size="xs" c="gray.7">
              Synthesizers, audio mixing, and playing instruments.
            </Text>
          </Box>
        </Group>
      </Card>
    ),
  },
];

const meta: Meta<typeof SearchableList> = {
  title: "Components/SearchableList",
  component: SearchableList,
  decorators: [
    (Story) => (
      <Box p="xl" maw={500} mx="auto">
        <Story />
      </Box>
    ),
  ],
  args: {
    items: sampleHobbies,
  },
};

export default meta;
type Story = StoryObj<typeof SearchableList>;

export const Default: Story = {};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: "Filter Hobbies",
    placeholder: "Type to filter hobbies (e.g., painting, music)...",
    items: sampleHobbies,
  },
};

export const SimpleBadges: Story = {
  args: {
    placeholder: "Search fruits...",
    items: [
      {
        key: "Apple",
        element: (
          <Group justify="space-between">
            <Text size="sm">Apple</Text>
            <Badge color="red.8">Red Fruit</Badge>
          </Group>
        ),
      },
      {
        key: "Banana",
        element: (
          <Group justify="space-between">
            <Text size="sm">Banana</Text>
            <Badge color="yellow">Yellow Fruit</Badge>
          </Group>
        ),
      },
      {
        key: "Blueberry",
        element: (
          <Group justify="space-between">
            <Text size="sm">Blueberry</Text>
            <Badge color="blue.9">Blue Fruit</Badge>
          </Group>
        ),
      },
    ],
  },
};

export const CustomNoResultsMessage: Story = {
  args: {
    noResultsMessage:
      "Uh oh! We couldn't find any hobbies matching that search.",
    items: sampleHobbies,
  },
};
