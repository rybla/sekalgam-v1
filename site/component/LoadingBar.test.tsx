import LoadingBar from "@site/component/LoadingBar";
import { render } from "@test-util";
import { screen } from "@testing-library/react";

describe("LoadingBar", () => {
  it("renders with progress bar and correct attributes", () => {
    render(<LoadingBar progress={0.5} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "50");
  });

  it("caps the progress within 0 and 100 percent", () => {
    render(<LoadingBar progress={1.5} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });
});
