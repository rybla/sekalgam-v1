import { useState } from "react";
import type { ReactNode } from "react";
import { CloseButton, Text, TextInput } from "@mantine/core";
import { MagnifyingGlass } from "@phosphor-icons/react";
import classes from "@site/component/SearchableList.module.css";
import { search } from "fast-fuzzy";

/**
 * A fuzzy-searchable list of items, where each item is searched by its key.
 *
 * @param props The component props.
 * @param props.items The list of items to search and render.
 * @param props.placeholder Optional placeholder for the search input.
 * @param props.label Optional label for the search input.
 * @param props.noResultsMessage Optional message to display when no search results are found.
 * @returns The rendered SearchableList component.
 */
export default function SearchableList(props: {
  /**
   * The list of items to search and render.
   */
  items: {
    key: string;
    element: ReactNode;
  }[];
  /**
   * Optional placeholder for the search input.
   */
  placeholder?: string;
  /**
   * Optional label for the search input.
   */
  label?: string;
  /**
   * Optional message to display when no search results are found.
   */
  noResultsMessage?: string;
}) {
  const {
    items,
    placeholder = "Search...",
    label,
    noResultsMessage = "No results found",
  } = props;

  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();

  const filteredItems = trimmedQuery
    ? search(trimmedQuery, items, { keySelector: (item) => item.key })
    : items;

  return (
    <div className={classes["container"]}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        leftSection={<MagnifyingGlass size={16} />}
        rightSection={
          query ? (
            <CloseButton
              aria-label="Clear search"
              onClick={() => setQuery("")}
            />
          ) : null
        }
        mb="md"
      />

      <div className={classes["list"]}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.key} className={classes["item"]}>
              {item.element}
            </div>
          ))
        ) : (
          <Text c="gray.7" size="sm" ta="center" py="xl">
            {noResultsMessage}
          </Text>
        )}
      </div>
    </div>
  );
}
