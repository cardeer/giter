import { selectTheme } from "@/constants/theme";
import { chalk } from "@/utils/chalk";
import { Git } from "@/utils/git";
import { select } from "@inquirer/prompts";
import { execSync } from "child_process";
import { program } from "commander";

export const swapBranchCommand = program
  .createCommand("swap")
  .option("-d, --develop", "swap to develop branch")
  .option("-f, --feature", "swap to feature branch")
  .action(swapBranchAction);

async function swapBranchAction(options) {
  const currentBranch = Git.currentBranch;
  const branchMeta = Git.getBranchMeta(currentBranch);
  const isFeature = !branchMeta.suffix;

  if (!options.develop || !options.feature) {
    const result = await select({
      message: "Select type",
      theme: selectTheme,
      choices: [
        {
          name: "Develop",
          value: "develop",
          disabled: !isFeature,
        },
        {
          name: "Feature",
          value: "feature",
          disabled: isFeature,
        },
      ],
    });

    if (result === "develop") {
      options.develop = true;
    } else if (result === "feature") {
      options.feature = true;
    }
  }

  if (options.develop) {
    if (!isFeature) {
      console.log(chalk.red("You are currently in develop branch"));
      process.exit(0);
    }

    try {
      execSync(`git checkout ${branchMeta.name}-develop`);
    } catch (error) {
      console.log(chalk.red(error));
    }
  } else if (options.feature) {
    if (isFeature) {
      console.log(chalk.red("You are not currently in develop branch"));
      process.exit(0);
    }

    try {
      execSync(`git checkout ${branchMeta.name}`);
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
}
