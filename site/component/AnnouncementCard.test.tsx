import AnnouncementCard from "@site/component/AnnouncementCard";
import { render } from "@test-util";
import { screen } from "@testing-library/react";

describe("AnnouncementCard", () => {
  it("renders with correct title, date, tags, and description", () => {
    render(
      <AnnouncementCard
        title="Test Title"
        date="June 1, 2026"
        tags={["tag1", "tag2"]}
        description="This is a test description of the announcement."
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("June 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description of the announcement.")
    ).toBeInTheDocument();
  });
});
