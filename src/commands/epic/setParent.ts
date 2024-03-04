import { Choice } from "@/@types/prompt";
import { configuration, getConfigBranch } from "@/configs/configs";
import { writeConfig } from "@/configs/updater";
import { chalk } from "@/utils/chalk";
import { Git } from "@/utils/git";
import { select } from "@inquirer/prompts";
import { program } from "commander";

export const setParentCommand = program
  .createCommand("set-parent")
  .description("set parent branch for current branch")
  .action(setParentAction);

async function setParentAction() {
  const epics = Object.entries(configuration.epics ?? {});

  const epic = await select<string>({
    message: "Select parent epic",
    choices: epics.map<Choice<string>>(([key, value]) => {
      return {
        name: `${key} (${chalk.magentaBright(value)})`,
        value: key,
      };
    }),
  });

  getConfigBranch(Git.currentBranch).parent = epic;
  writeConfig();
}
