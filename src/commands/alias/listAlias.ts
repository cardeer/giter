import { configuration } from "@/configs/configs";
import { chalk } from "@/utils/chalk";
import { program } from "commander";

export const listAliasCommand = program
  .createCommand("list")
  .action(listAliasAction);

async function listAliasAction() {
  console.log();

  if (
    !configuration.branches ||
    Object.keys(configuration.branches).length === 0
  ) {
    console.log(chalk.red("No alias found"));
  }

  for (const [key, value] of Object.entries(configuration.branches ?? {})) {
    console.log(`${key}:`, chalk.blueBright(value.alias));
  }

  console.log();
}
