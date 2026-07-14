import { Box, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingBar from "@site/component/LoadingBar";

const meta: Meta<typeof LoadingBar> = {
  title: "Component/LoadingBar",
  component: LoadingBar,
  decorators: [
    (Story) => (
      <Box p="xl" maw={600} mx="auto">
        <Story />
      </Box>
    ),
  ],
  args: {
    progress: 0.5,
  },
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Default: Story = {};

export const Interactive: Story = {
  render: (args) => (
    <Stack>
      <Text size="sm">
        Loading Progress Indicator (Use controls to change progress value)
      </Text>
      <LoadingBar {...args} />
    </Stack>
  ),
};

export const Empty: Story = {
  args: {
    progress: 0,
  },
};

export const HalfFull: Story = {
  args: {
    progress: 0.5,
  },
};

export const Complete: Story = {
  args: {
    progress: 1,
  },
};
