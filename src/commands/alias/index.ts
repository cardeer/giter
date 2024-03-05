import { getConfigBranch } from "@/configs/configs";
import { Git } from "@/utils/git";
import chalk from "chalk";
import { program } from "commander";
import { listAliasCommand } from "./listAlias";
import { setAliasCommand } from "./setAlias";

export const aliasCommand = program
  .createCommand("alias")
  .addCommand(setAliasCommand)
  .addCommand(listAliasCommand)
  .action(showCurrentAlias);

async function showCurrentAlias() {
  console.log(
    `Current branch alias is`,
    chalk.blueBright(getConfigBranch(Git.currentBranch).alias ?? "unknown"),
  );
}
