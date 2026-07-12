import { Text, Title } from "@mantine/core";
import classes from "@site/Announcements.page.module.css";

/**
 * Renders the Announcements page.
 * @returns The rendered Announcements page component.
 */
export default function AnnouncementsPage() {
  return (
    <div className={classes["page"]}>
      <Title>
        <Text>Announcements</Text>
      </Title>
    </div>
  );
}
