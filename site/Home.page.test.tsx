import HomePage from "@site/Home.page";
import { render } from "@test-util";
import { screen } from "@testing-library/react";

describe("HomePage", () => {
  it("renders the Home title", () => {
    render(<HomePage />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
