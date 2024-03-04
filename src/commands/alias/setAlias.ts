import { getConfigBranch } from "@/configs/configs";
import { writeConfig } from "@/configs/updater";
import { Git } from "@/utils/git";
import { input } from "@inquirer/prompts";
import { program } from "commander";

export const setAliasCommand = program
  .createCommand("set")
  .action(setAliasAction);

async function setAliasAction() {
  const currentBranch = Git.currentBranch;

  const alias = await input({
    default: getConfigBranch(currentBranch).alias,
    message: `Alias for branch ${currentBranch}`,
  });

  getConfigBranch(currentBranch).alias = alias;
  writeConfig();
}
