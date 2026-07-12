import SearchableList from "@site/component/SearchableList";
import { render } from "@test-util";
import { fireEvent, screen } from "@testing-library/react";

describe("SearchableList", () => {
  const sampleItems = [
    { key: "Apple", element: <div data-testid="item-apple">Apple Fruit</div> },
    {
      key: "Banana",
      element: <div data-testid="item-banana">Banana Fruit</div>,
    },
    {
      key: "Apricot",
      element: <div data-testid="item-apricot">Apricot Fruit</div>,
    },
  ];

  it("renders the search input and all items initially", () => {
    render(
      <SearchableList items={sampleItems} placeholder="Search fruits..." />
    );

    // Check search input is present with custom placeholder
    const input = screen.getByPlaceholderText("Search fruits...");
    expect(input).toBeInTheDocument();

    // Check all items are rendered
    expect(screen.getByTestId("item-apple")).toBeInTheDocument();
    expect(screen.getByTestId("item-banana")).toBeInTheDocument();
    expect(screen.getByTestId("item-apricot")).toBeInTheDocument();
  });

  it("filters items based on fuzzy search input", () => {
    render(<SearchableList items={sampleItems} />);

    const input = screen.getByPlaceholderText("Search...");

    // Type "ap" into search input
    fireEvent.change(input, { target: { value: "ap" } });

    // Apple and Apricot should be visible (fuzzy match with "ap")
    expect(screen.getByTestId("item-apple")).toBeInTheDocument();
    expect(screen.getByTestId("item-apricot")).toBeInTheDocument();

    // Banana should NOT be visible
    expect(screen.queryByTestId("item-banana")).not.toBeInTheDocument();
  });

  it("shows fallback message when no items match the query", () => {
    render(
      <SearchableList
        items={sampleItems}
        noResultsMessage="No matches for your search"
      />
    );

    const input = screen.getByPlaceholderText("Search...");

    // Type a query with no matches
    fireEvent.change(input, { target: { value: "xyz" } });

    // None of the items should be in the document
    expect(screen.queryByTestId("item-apple")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-banana")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-apricot")).not.toBeInTheDocument();

    // The fallback message should be visible
    expect(screen.getByText("No matches for your search")).toBeInTheDocument();
  });

  it("renders clear button when query is present and clears the query on click", () => {
    render(<SearchableList items={sampleItems} />);

    const input = screen.getByPlaceholderText("Search...");

    // Initially, clear button should not be present
    expect(
      screen.queryByRole("button", { name: /clear search/i })
    ).not.toBeInTheDocument();

    // Type something to make clear button appear
    fireEvent.change(input, { target: { value: "banana" } });

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    // Only banana is shown
    expect(screen.getByTestId("item-banana")).toBeInTheDocument();
    expect(screen.queryByTestId("item-apple")).not.toBeInTheDocument();

    // Click the clear button
    fireEvent.click(clearButton);

    // Input value should be cleared
    expect(input).toHaveValue("");

    // Clear button should be gone
    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument();

    // All items should be restored
    expect(screen.getByTestId("item-apple")).toBeInTheDocument();
    expect(screen.getByTestId("item-banana")).toBeInTheDocument();
    expect(screen.getByTestId("item-apricot")).toBeInTheDocument();
  });
});
