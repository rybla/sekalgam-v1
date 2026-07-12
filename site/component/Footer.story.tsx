import { Box } from "@mantine/core";
import packageInfo from "@package.json";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "@site/component/Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <Box p="xl" maw={900} mx="auto">
        <Story />
      </Box>
    ),
  ],
  args: {
    title: packageInfo.name,
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
