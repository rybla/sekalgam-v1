import { Header } from "@site/component/Header";
import { render } from "@test-util";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders with correct title and navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header title="My Custom Page" />
      </MemoryRouter>
    );

    expect(screen.getByText("My Custom Page")).toBeInTheDocument();

    // Check for top-level links from site metadata
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Announcements")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
