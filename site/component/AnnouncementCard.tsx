import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import classes from "@site/component/AnnouncementCard.module.css";
import type { ReactNode } from "react";

/**
 * Props for the AnnouncementCard component.
 */
export interface AnnouncementCardProps {
  /**
   * The title of the announcement.
   */
  title: ReactNode;
  /**
   * The date the announcement was published.
   */
  date: string;
  /**
   * A list of tags categorized under the announcement.
   */
  tags: string[];
  /**
   * The main body text/description of the announcement.
   */
  description: ReactNode;
}

/**
 * Renders an announcement card containing a title, publish date, categorized tags, and description.
 * @param props The component props.
 * @returns The rendered AnnouncementCard component.
 */
export default function AnnouncementCard(props: AnnouncementCardProps) {
  return (
    <Card withBorder padding="lg" radius="md" className={classes["card"]}>
      <Stack gap="xs" h="100%" justify="space-between">
        <Stack gap="xs">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <CalendarBlankIcon
                size={16}
                color="var(--mantine-color-dimmed)"
              />
              <Text size="xs" c="gray.7" fw={500}>
                {props.date}
              </Text>
            </Group>
            <Group gap={4}>
              {props.tags.map((tag) => (
                <Badge key={tag} size="xs" variant="light" color="blue">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Group>

          <Title order={3} size="h4" className={classes["card-title"]}>
            {props.title}
          </Title>
        </Stack>

        <Text
          size="sm"
          c="gray.7"
          className={classes["card-description"]}
          mt="xs"
        >
          {props.description}
        </Text>
      </Stack>
    </Card>
  );
}
