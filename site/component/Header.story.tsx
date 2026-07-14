import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@site/component/Header";

const meta: Meta<typeof Header> = {
  title: "Component/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={["/Home"]}>
      <Box p="xl" maw={900} mx="auto">
        <Header {...args} />
      </Box>
    </MemoryRouter>
  ),
  args: {
    title: "Home",
  },
};

export const AboutHeader: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={["/About"]}>
      <Box p="xl" maw={900} mx="auto">
        <Header {...args} />
      </Box>
    </MemoryRouter>
  ),
  args: {
    title: "About Us",
  },
};
