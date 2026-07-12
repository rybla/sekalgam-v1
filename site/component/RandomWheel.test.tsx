import RandomWheel from "@site/component/RandomWheel";
import { render } from "@test-util";
import { fireEvent, screen } from "@testing-library/react";

describe("RandomWheel", () => {
  it("renders empty message when no options are provided", () => {
    render(<RandomWheel options={[]} onSelect={() => {}} />);
    expect(
      screen.getByText(
        /No options available. Please provide a list of options/i
      )
    ).toBeInTheDocument();
  });

  it("renders options on the wheel", () => {
    const options = ["Apple", "Banana", "Cherry"];
    render(<RandomWheel options={options} onSelect={() => {}} />);

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("renders the Spin button and changes state to Spinning when clicked", () => {
    const options = ["Apple", "Banana", "Cherry"];
    const handleSelect = vi.fn();
    render(<RandomWheel options={options} onSelect={handleSelect} />);

    const spinButton = screen.getByRole("button", { name: /Spin/i });
    expect(spinButton).toBeInTheDocument();
    expect(spinButton).toBeEnabled();

    // Click the spin button
    fireEvent.click(spinButton);

    // Button should be disabled during spin
    expect(spinButton).toBeDisabled();

    // Should display Spinning...
    expect(screen.getByText(/Spinning.../i)).toBeInTheDocument();
  });
});
