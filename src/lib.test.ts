import { greet } from "@/lib";

describe("lib", () => {
  expect(greet("Bob")).toBe("Greetings, Bob!");
});
