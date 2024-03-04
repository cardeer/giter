import { chalk } from "@/utils/chalk";
import { Git } from "@/utils/git";
import { execSync } from "child_process";
import { program } from "commander";

export const swapBranchCommand = program
  .createCommand("swap")
  .option("-d, --develop", "swap to develop branch")
  .option("-f, --feature", "swap to feature branch")
  .action(swapBranchAction);

async function swapBranchAction(options) {
  const currentBranch = Git.currentBranch;

  if (options.develop) {
    if (currentBranch.includes("-develop")) {
      console.log(chalk.red("You are currently in develop branch"));
      process.exit(0);
    }

    try {
      execSync(`git checkout ${currentBranch}-develop`);
    } catch (error) {
      console.log(chalk.red(error));
    }
  } else if (options.feature) {
    if (!currentBranch.includes("-develop")) {
      console.log(chalk.red("You are not currently in develop branch"));
      process.exit(0);
    }

    const splitted = currentBranch.split("-develop");

    try {
      execSync(`git checkout ${splitted[0]}`);
    } catch (error) {
      execSync(`git checkout ${splitted[0]}`);
    }
  }
}
