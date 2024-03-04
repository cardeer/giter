import { configuration } from "@/configs/configs";
import { chalk } from "@/utils/chalk";
import { program } from "commander";

export const listEpicsCommand = program
  .createCommand("list")
  .action(listEpicsAction);

function listEpicsAction() {
  console.log();

  for (const [key, value] of Object.entries(configuration.epics ?? {})) {
    console.log(`${key}:`, chalk.magentaBright(value));
  }

  console.log();
}
