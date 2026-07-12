import { useState } from "react";
import { Box, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import RandomWheel from "@site/component/RandomWheel";

const meta: Meta<typeof RandomWheel> = {
  title: "Components/RandomWheel",
  component: RandomWheel,
  decorators: [
    (Story) => (
      <Box p="xl" maw={600} mx="auto">
        <Story />
      </Box>
    ),
  ],
  args: {
    options: ["Apple", "Banana", "Cherry", "Dates", "Elderberry"],
    onSelect: (option) => console.log("Selected:", option),
  },
};

export default meta;
type Story = StoryObj<typeof RandomWheel>;

export const Default: Story = {};

export const CoinFlip: Story = {
  args: {
    options: ["Yes", "No"],
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
      "Option 7",
      "Option 8",
      "Option 9",
      "Option 10",
    ],
  },
};

export const OneOption: Story = {
  args: {
    options: ["Solo Champion"],
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [selected, setSelected] = useState<string | null>(null);
    const options = [
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Sci-Fi",
    ];

    return (
      <Stack align="center" gap="md">
        <Text size="lg" fw={700}>
          Interactive Movie Genre Picker
        </Text>
        <RandomWheel options={options} onSelect={setSelected} />
        {selected && (
          <Text size="md" c="blue.9" fw={600}>
            Callback received: Selected "{selected}"!
          </Text>
        )}
      </Stack>
    );
  },
};
