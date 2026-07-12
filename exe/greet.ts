#!/usr/bin/env pnpm -s tsx

import { greet } from "@/lib";
import { object, option, string, type InferValue } from "@optique/core";
import { run } from "@optique/run";
import packageConfig from "@package.json";

type CliArgs = InferValue<typeof cliArgsParser>;
const cliArgsParser = object({
  name: option("--name", string()),
});

/**
 * Main entrypoint for the greeting CLI.
 * @param args The parsed command line arguments.
 */
async function main(args: CliArgs) {
  console.log(greet(args.name));
}

await main(
  run(cliArgsParser, {
    help: "both",
    version: packageConfig.version,
    author: [{ type: "text", text: packageConfig.name }],
  })
);
