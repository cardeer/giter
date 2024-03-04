import { chalk } from "@/utils/chalk";
import { Git } from "@/utils/git";
import { input } from "@inquirer/prompts";
import { execSync } from "child_process";
import { program } from "commander";

export const checkoutCommand = program
  .createCommand("checkout")
  .option("-b", "create a new branch")
  .action(checkoutAction);

async function checkoutAction(options) {
  const branchName = await input({
    message: "Enter branch name",
  });

  try {
    execSync(
      `git checkout ${options.b ? "-b " : ""}${Git.branchPrefix}${branchName}`,
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
}
