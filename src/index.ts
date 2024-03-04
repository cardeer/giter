#!/usr/bin/env bun

import { program } from "commander";
import { configCommand } from "./commands/config";
import { mergeCommand } from "./commands/merge";
import { chalk } from "./utils/chalk";
import { Git } from "./utils/git";

import { aliasCommand } from "./commands/alias";
import { branchCommand } from "./commands/branch";
import { checkoutCommand } from "./commands/checkout";
import { epicCommand } from "./commands/epic";
import "./configs/configs";

if (!Git.isRepository) {
  const message = chalk.red(
    `The current directory is not a git repository, please run ${chalk.underline.bold(
      "git init",
    )} first.`,
  );

  console.log(message);
  process.exit(0);
}

console.log(`\nRunning on branch :`, chalk.greenBright(Git.currentBranch));

program
  .addCommand(configCommand)
  .addCommand(mergeCommand)
  .addCommand(aliasCommand)
  .addCommand(checkoutCommand)
  .addCommand(epicCommand)
  .addCommand(branchCommand);

program.parse();
