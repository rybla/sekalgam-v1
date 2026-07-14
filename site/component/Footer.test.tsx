import { Footer } from "@site/component/Footer";
import { render } from "@test-util";
import { screen } from "@testing-library/react";

describe("Footer", () => {
  it("renders with title, scroll-to-top, and reference/social links", () => {
    render(<Footer title="My Page Footer" />);

    expect(screen.getByText("My Page Footer")).toBeInTheDocument();
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Mantine")).toBeInTheDocument();
  });
});
